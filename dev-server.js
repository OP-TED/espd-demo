/**
 * Development server with TED API proxy.
 * Serves static files and proxies /api/ted/* requests to the TED API
 * to avoid CORS issues during development.
 *
 * Usage: node dev-server.js
 * Serves on http://localhost:3000
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { request as httpsRequest } from 'node:https';
import { HttpsProxyAgent } from 'https-proxy-agent';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;
const TED_API_BASE = 'https://api.ted.europa.eu';

// Pick up proxy from environment
const PROXY_URL = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || null;
const proxyAgent = PROXY_URL ? new HttpsProxyAgent(PROXY_URL) : null;

if (PROXY_URL) {
  console.log(`Using proxy`);
} else {
  console.log('No HTTP proxy configured (set HTTPS_PROXY environment variable if needed)');
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Handle CORS preflight for the proxy
  if (req.method === 'OPTIONS' && (url.pathname.startsWith('/api/ted/') || url.pathname.startsWith('/api/itb/'))) {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  // Proxy: /api/itb/* → https://www.itb.ec.europa.eu/espd/api/*
  if (url.pathname.startsWith('/api/itb/')) {
    await proxyItbApi(req, res, url);
    return;
  }

  // Proxy: /api/ted/* → https://api.ted.europa.eu/*
  if (url.pathname.startsWith('/api/ted/')) {
    await proxyTedApi(req, res, url);
    return;
  }

  // Static file serving
  await serveStatic(req, res, url);
});

/**
 * Proxy requests to the TED API, using the corporate proxy if configured.
 */
async function proxyTedApi(req, res, url) {
  const tedPath = url.pathname.replace('/api/ted/', '/');
  const tedUrl = `${TED_API_BASE}${tedPath}${url.search}`;

  console.log(`[TED API] ${req.method} ${tedUrl}`);

  try {
    // Collect request body
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }

    // Use https-proxy-agent if a proxy is configured
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: req.method !== 'GET' ? body : undefined
    };

    if (proxyAgent) {
      fetchOptions.agent = proxyAgent;
    }

    // Use Node's native https for proxy support
    const tedResp = await new Promise((resolve, reject) => {
      const parsedUrl = new URL(tedUrl);
      const options = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        agent: proxyAgent || undefined
      };

      const proxyReq = httpsRequest(options, (proxyRes) => {
        let data = '';
        proxyRes.on('data', chunk => { data += chunk; });
        proxyRes.on('end', () => {
          resolve({
            status: proxyRes.statusCode,
            contentType: proxyRes.headers['content-type'] || 'application/json',
            body: data
          });
        });
      });

      proxyReq.on('error', reject);
      proxyReq.setTimeout(15000, () => {
        proxyReq.destroy(new Error('Request timeout'));
      });

      if (body && req.method !== 'GET') {
        proxyReq.write(body);
      }
      proxyReq.end();
    });

    // Log non-OK responses from TED API
    if (tedResp.status >= 400) {
      console.error(`[TED API Error] ${req.method} ${tedUrl} → HTTP ${tedResp.status}`);
      console.error(`[TED API Error] Response body: ${tedResp.body.substring(0, 500)}`);
    }

    // Return with CORS headers
    res.writeHead(tedResp.status, {
      'Content-Type': tedResp.contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    });
    res.end(tedResp.body);

  } catch (err) {
    console.error(`[TED API Error] ${req.method} ${tedUrl} → Network error: ${err.message}`);
    if (err.stack) {
      console.error(`[TED API Error] Stack: ${err.stack}`);
    }
    res.writeHead(502, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ error: `Proxy error: ${err.message}` }));
  }
}

/**
 * Proxy requests to the ITB ESPD Validator API.
 * Mirrors the TED proxy pattern.
 */
async function proxyItbApi(req, res, url) {
  const itbPath = url.pathname.replace('/api/itb/', '/xml/rest/espd/api/');
  const itbUrl = `https://www.itb.ec.europa.eu${itbPath}`;

  try {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }

    const parsedUrl = new URL(itbUrl);
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      agent: proxyAgent || undefined
    };

    const itbResp = await new Promise((resolve, reject) => {
      const proxyReq = httpsRequest(options, (proxyRes) => {
        let data = '';
        proxyRes.on('data', chunk => { data += chunk; });
        proxyRes.on('end', () => {
          resolve({
            status: proxyRes.statusCode,
            contentType: proxyRes.headers['content-type'] || 'application/json',
            body: data
          });
        });
      });

      proxyReq.on('error', reject);
      proxyReq.setTimeout(30000, () => {
        proxyReq.destroy(new Error('Request timeout'));
      });

      if (body && req.method !== 'GET') {
        proxyReq.write(body);
      }
      proxyReq.end();
    });

    res.writeHead(itbResp.status, {
      'Content-Type': itbResp.contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    });
    res.end(itbResp.body);

  } catch (err) {
    console.error('ITB proxy error:', err.message);
    res.writeHead(502, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ error: `ITB proxy error: ${err.message}` }));
  }
}

/**
 * Serve static files from the project root.
 */
async function serveStatic(req, res, url) {
  let filePath = join(__dirname, url.pathname === '/' ? 'index.html' : url.pathname);

  try {
    const fileStat = await stat(filePath);

    // If directory, look for index.html
    if (fileStat.isDirectory()) {
      filePath = join(filePath, 'index.html');
    }

    const content = await readFile(filePath);
    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);

  } catch (err) {
    if (err.code === 'ENOENT') {
      // SPA fallback: serve index.html for missing routes
      try {
        const indexContent = await readFile(join(__dirname, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexContent);
      } catch {
        res.writeHead(404);
        res.end('Not Found');
      }
    } else {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
}

server.listen(PORT, () => {
  console.log(`ESPD Service running at http://localhost:${PORT}`);
  console.log(`TED API proxy at http://localhost:${PORT}/api/ted/...`);
});

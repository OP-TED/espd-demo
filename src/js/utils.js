const COUNTRY_LIST = [
  { value: null, text: 'Please select an option' },
  { value: 'AT', text: 'Austria' },
  { value: 'BE', text: 'Belgium' },
  { value: 'BG', text: 'Bulgaria' },
  { value: 'HR', text: 'Croatia' },
  { value: 'CY', text: 'Cyprus' },
  { value: 'CZ', text: 'Czechia' },
  { value: 'DK', text: 'Denmark' },
  { value: 'EE', text: 'Estonia' },
  { value: 'FI', text: 'Finland' },
  { value: 'FR', text: 'France' },
  { value: 'DE', text: 'Germany' },
  { value: 'GR', text: 'Greece' },
  { value: 'HU', text: 'Hungary' },
  { value: 'IE', text: 'Ireland' },
  { value: 'IT', text: 'Italy' },
  { value: 'LV', text: 'Latvia' },
  { value: 'LT', text: 'Lithuania' },
  { value: 'LU', text: 'Luxembourg' },
  { value: 'MT', text: 'Malta' },
  { value: 'NL', text: 'Netherlands' },
  { value: 'PL', text: 'Poland' },
  { value: 'PT', text: 'Portugal' },
  { value: 'RO', text: 'Romania' },
  { value: 'SK', text: 'Slovakia' },
  { value: 'SI', text: 'Slovenia' },
  { value: 'ES', text: 'Spain' },
  { value: 'SE', text: 'Sweden' },
]


/**
 * Auxiliary function for Bootsrap toast messages
 * 
 * @param {string} message - the message to be displayed 
 * @param {string} title - title of the window
 * @param {string} type - type of message box
 * @param {string} href - the link to be displayed
 */
function showToast(message, title = 'Message from server', type = 'info', href = '') {
  window.app.$bvToast.toast(message,
    {
      title: title,
      toaster: 'b-toaster-top-center',
      href: href,
      solid: true,
      variant: type,
      noAutoHide: true,
      appendToast: true
    })
}

/**
 * Setup Web Worker
 */
var webConsultant = null
if (window.Worker) {
  console.log('Web Worker enbaled!');

  webConsultant = new Worker("src/js/worker.js")
  webConsultant.postMessage("INIT")

  webConsultant.onmessage = (e) => {
    console.log(e.data);
  }
}

/**
 * Fetch a remote file for inclusion in ZIP archive
 * 
 * @param {string} url - the URL from which to fetch the file 
 */
function urlToPromise(url) {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * Create a link to download a file with a specific name
 * 
 * @param {string} filename - the name of the file to be downloaded 
 * @param {string} text - the content of the file 
 */
function download(filename, text) {
  var element = document.createElement('a');
  //var bb = new Blob([text], {type: 'text/plain'})

  //element.setAttribute('href', window.URL.createObjectURL(bb));
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  //element.dataset.downloadurl = ['text/plain', element.download, element.href].join(':');
  //element.draggable = true; 
  //element.classList.add('dragout');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/**
 * Get the day of the year based on the supplied date 
 * for the current year since 01 Jan
 * 
 * @param {Date} date - the date, default value today's date 
 * @returns {int} - the number of the day since 01.Jan current year
 */
function getDay(date = new Date()) {
  return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
}

/**
 * 
 * Convert date and time from JavaScript format to XML format
 * 
 * @param {string} what 
 * @param {Date} date 
 * @returns {string} result
 */
function JS2XML(what, date = new Date()) {
  let result = ''
  switch (what) {
    case 'date':
      result = date.toISOString().substring(0, 10)
      break;

    case 'time':
      result = date.toISOString().substring(11)
      break;
    default:
      break;
  }

  return result
}

/**
 *  Transofrom a string into a JavaScript Property
 *  JavaScript identfier can nontain Unicode letters, $, _ and digits, and may not start with a digit
 * 
 * @param {string} str - the string to be transformed to JSON property 
 */
function stringToProperty(str) {

  const dict = [
    { what_to_replace: '-', to_replace_with: '__' },
    { what_to_replace: '/', to_replace_with: '$' },
    { what_to_replace: '@', to_replace_with: '$$' }
  ]

  let result = str

  for (const element of dict) {
    result = result.replaceAll(element.what_to_replace, element.to_replace_with)
  }

  return result
}

/**
 * Transform XML GC format to JSON
 * 
 * @param {string} xmlsource - XML string to be converted to JSON 
 */
function gc2JSON(xmlsource) {
  let crt_list = {
    'ShortName': '',
    'LongName': '',
    'ListID': '',
    'Version': '',
    'CanonicalUri': '',
    'CanonicalVersionUri': '',
    'LocationUri': '',
    'AgencyLongName': '',
    'AgencyIdentifier': '',
    'type': '',
    'name': '',
    'table': [],
    'fields': {}
  }

  let gcJSON = xmlbuilder2.create(xmlsource).end({ format: 'object' })

  crt_list.ShortName = gcJSON['gc:CodeList']['Identification']['ShortName']
  crt_list.LongName = Array.isArray(gcJSON['gc:CodeList']['Identification']['LongName']) ? gcJSON['gc:CodeList']['Identification']['LongName'][0] : gcJSON['gc:CodeList']['Identification']['LongName']['#']
  crt_list.ListID = Array.isArray(gcJSON['gc:CodeList']['Identification']['LongName']) ? gcJSON['gc:CodeList']['Identification']['LongName'][1]['#'] : gcJSON['gc:CodeList']['Identification']['LongName']['#']
  crt_list.Version = gcJSON['gc:CodeList']['Identification']['Version']
  crt_list.CanonicalUri = gcJSON['gc:CodeList']['Identification']['CanonicalUri']
  crt_list.CanonicalVersionUri = gcJSON['gc:CodeList']['Identification']['CanonicalVersionUri']
  crt_list.LocationUri = gcJSON['gc:CodeList']['Identification']['LocationUri']
  crt_list.AgencyLongName = gcJSON['gc:CodeList']['Identification']?.['Agency']?.['LongName'] ?? ''
  crt_list.AgencyIdentifier = gcJSON['gc:CodeList']['Identification']?.['Agency']?.['Identifier']?.['@Identifier'] ?? ''
  crt_list.type = (crt_list.CanonicalUri.startsWith('https://github.com/')) ? 'technical' : 'external'
  crt_list.name = (crt_list.type == 'external') ? crt_list.LongName : crt_list.ListID

  gcJSON['gc:CodeList']['SimpleCodeList']['Row'].forEach(element => {
    let nodename = element['Value'][1]['@ColumnRef'] == 'Name' ? element['Value'][1]['SimpleValue'] :
      (element['Value'][0]['@ColumnRef'].toLowerCase() == 'code' ? element['Value'][0]['SimpleValue'] : '__PLACEHOLDER__')
    element['Value'].forEach(elm => {
      if (!Object.hasOwn(crt_list.fields, nodename)) crt_list.fields[nodename] = {}
      switch (elm['@ColumnRef'].toLowerCase()) {
        case 'code':
          if (Object.hasOwn(crt_list.fields, '__PLACEHOLDER__')) {
            crt_list.fields[nodename] = crt_list.fields['__PLACEHOLDER__']
            delete crt_list.fields['__PLACEHOLDER__']
          }
          crt_list.fields[nodename]["Code"] = elm['SimpleValue']
          break;

        case 'name':
          if (nodename == '__PLACEHOLDER__') nodename = elm['SimpleValue']
          if (Object.hasOwn(crt_list.fields, '__PLACEHOLDER__')) {
            crt_list.fields[nodename] = crt_list.fields['__PLACEHOLDER__']
            delete crt_list.fields['__PLACEHOLDER__']
          }
          crt_list.fields[nodename]["Name"] = elm['SimpleValue']
          break;

        case 'status':
          crt_list.fields[nodename]["Status"] = elm['SimpleValue']
          break;

        default:
          //check for specific labels
          crt_list.fields[nodename][elm['@ColumnRef'].replace('name-', '').replace('_label', '')] = elm['SimpleValue']
          break;
      }
    })

  });

  crt_list.table = []
  for (const fld in crt_list.fields) {
    crt_list.table.push(crt_list.fields[fld])
  }

  return crt_list
}



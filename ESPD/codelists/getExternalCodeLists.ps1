#PowerShell tool for downloading external files v1.2
#
#This tool downloads external Code List files from EU Vocabulary
#specified in a JSON object 
#

# Convert String to Pwershell Array
$externalCL = Get-Content '.\external_code_list.json' | Out-String | ConvertFrom-Json
$proxyCredentials = Get-Credential -Message 'Please enter your credentials for the proxy server.'

# Loop thorough each external Code List and get the right version
Foreach ($ecl in $externalCL) {
    Write-Host "entering " $ecl.folder  
    Set-Location $ecl.folder
    if (Test-Path $ecl.filename) {
        Remove-Item $ecl.filename
    }
    Invoke-WebRequest -Proxy $env:proxy -ProxyCredential $proxyCredentials -OutFile $ecl.filename -Uri $ecl.uri.replace('https://github.com/OP-TED/ESPD-EDM/tree', 'https://raw.githubusercontent.com/OP-TED/ESPD-EDM')
    Set-Location ..\..
}

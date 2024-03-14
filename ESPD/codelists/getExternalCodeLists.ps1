#PowerShell tool for downloading external files v1.1
#
#This tool downloads external Code List files from EU Vocabulary
#specified in a JSON object 
#

$extCL = '[ 
    { 
        "folder" : "v3.3.0\\access-right",
        "filename": "AccessRight.gc",
        "uri": "http://publications.europa.eu/resource/distribution/access-right/20220316-0/xml/gc/AccessRight.gc"
    },
    { 
        "folder" : "v3.3.0\\country",
        "filename": "Country.gc",
        "uri": "http://publications.europa.eu/resource/distribution/country/20220928-0/xml/gc/Country.gc"
    },
    { 
        "folder" : "v3.3.0\\criterion",
        "filename": "Criterion.gc",
        "uri": "http://publications.europa.eu/resource/distribution/criterion/20230315-0/xml/gc/Criterion.gc"
    },
    { 
        "folder" : "v3.3.0\\currency",
        "filename": "Currency.gc",
        "uri": "http://publications.europa.eu/resource/distribution/currency/20220928-0/xml/gc/Currency.gc"
    },
    { 
        "folder" : "v3.3.0\\docrefcontent-type",
        "filename": "DocRefContentType.gc",
        "uri": "http://publications.europa.eu/resource/distribution/docrefcontent-type/20220928-0/xml/gc/DocrefcontentType.gc"
    },
    { 
        "folder" : "v3.3.0\\economic-operator-size",
        "filename": "EconomicOperatorSize.gc",
        "uri": "http://publications.europa.eu/resource/distribution/economic-operator-size/20220316-0/xml/gc/EconomicOperatorSize.gc"
    },
    { 
        "folder" : "v3.3.0\\eo-role-type",
        "filename": "EoRoleType.gc",
        "uri": "http://publications.europa.eu/resource/distribution/eo-role-type/20211208-0/xml/gc/EoRoleType.gc"
    },
    { 
        "folder" : "v3.3.0\\language",
        "filename": "Language.gc",
        "uri": "http://publications.europa.eu/resource/distribution/language/20220928-0/xml/gc/Language.gc"
    },
    { 
        "folder" : "v3.3.0\\occupation",
        "filename": "Occupation.gc",
        "uri": "http://publications.europa.eu/resource/distribution/occupation/20221214-0/xml/gc/Occupation.gc"
    },
    { 
        "folder": "v3.2.0\\access-right", 
        "filename":"AccessRight.gc", 
        "uri":"http://publications.europa.eu/resource/distribution/access-right/20220316-0/xml/gc/AccessRight.gc" 
    },
    { 
        "folder": "v3.2.0\\country", 
        "filename":"Country.gc", 
        "uri":"http://publications.europa.eu/resource/distribution/country/20220928-0/xml/gc/Country.gc" 
    },
    { 
        "folder": "v3.2.0\\criterion", 
        "filename":"Criterion.gc", 
        "uri":"http://publications.europa.eu/resource/distribution/criterion/20230315-0/xml/gc/Criterion.gc" 
    },
    { 
        "folder": "v3.2.0\\currency", 
        "filename":"Currency.gc", 
        "uri":"http://publications.europa.eu/resource/distribution/currency/20220928-0/xml/gc/Currency.gc" 
    },
    { 
        "folder": "v3.2.0\\docrefcontent-type", 
        "filename":"DocRefContentType.gc", 
        "uri":"http://publications.europa.eu/resource/distribution/docrefcontent-type/20220928-0/xml/gc/DocrefcontentType.gc" 
    },
    { 
        "folder": "v3.2.0\\economic-operator-size", 
        "filename":"EconomicOperatorSize.gc", 
        "uri":"http://publications.europa.eu/resource/distribution/economic-operator-size/20220316-0/xml/gc/EconomicOperatorSize.gc" 
    },
    { 
        "folder": "v3.2.0\\eo-role-type", 
        "filename":"EoRoleType.gc", 
        "uri":"http://publications.europa.eu/resource/distribution/eo-role-type/20211208-0/xml/gc/EoRoleType.gc" 
    },
    { 
        "folder": "v3.2.0\\language", 
        "filename":"Language.gc", 
        "uri":"http://publications.europa.eu/resource/distribution/language/20220928-0/xml/gc/Language.gc" 
    },
    { 
        "folder": "v3.2.0\\occupation", 
        "filename":"Occupation.gc", 
        "uri":"http://publications.europa.eu/resource/distribution/occupation/20221214-0/xml/gc/Occupation.gc" 
    }

]';

# Convert String to Pwershell Array
$externalCL = ConvertFrom-Json -InputObject $extCL;

# Loop thorough each external Code List and get the right version
Foreach ($ecl in $externalCL) {
    Write-Host "entering " $ecl.folder  
    Set-Location $ecl.folder
    if (Test-Path $ecl.filename) {
        Remove-Item $ecl.filename
    }
    Invoke-WebRequest -OutFile $ecl.filename -Uri $ecl.uri
    Set-Location ..\..
}
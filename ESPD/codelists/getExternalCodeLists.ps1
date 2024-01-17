$extCL = '[ 
    { 
        "folder" : "access-right",
        "filename": "AccessRight.gc",
        "uri": "http://publications.europa.eu/resource/distribution/access-right/20220316-0/xml/gc/AccessRight.gc"
    },
    { 
        "folder" : "country",
        "filename": "Country.gc",
        "uri": "http://publications.europa.eu/resource/distribution/country/20220928-0/xml/gc/Country.gc"
    },
    { 
        "folder" : "criterion",
        "filename": "Criterion.gc",
        "uri": "http://publications.europa.eu/resource/distribution/criterion/20230315-0/xml/gc/Criterion.gc"
    },
    { 
        "folder" : "currency",
        "filename": "Currency.gc",
        "uri": "http://publications.europa.eu/resource/distribution/currency/20220928-0/xml/gc/Currency.gc"
    },
    { 
        "folder" : "docrefcontent-type",
        "filename": "DocRefContentType.gc",
        "uri": "http://publications.europa.eu/resource/distribution/docrefcontent-type/20220928-0/xml/gc/DocrefcontentType.gc"
    },
    { 
        "folder" : "economic-operator-size",
        "filename": "EconomicOperatorSize.gc",
        "uri": "http://publications.europa.eu/resource/distribution/economic-operator-size/20220316-0/xml/gc/EconomicOperatorSize.gc"
    },
    { 
        "folder" : "eo-role-type",
        "filename": "EoRoleType.gc",
        "uri": "http://publications.europa.eu/resource/distribution/eo-role-type/20211208-0/xml/gc/EoRoleType.gc"
    },
    { 
        "folder" : "language",
        "filename": "Language.gc",
        "uri": "http://publications.europa.eu/resource/distribution/language/20220928-0/xml/gc/Language.gc"
    },
    { 
        "folder" : "occupation",
        "filename": "Occupation.gc",
        "uri": "http://publications.europa.eu/resource/distribution/occupation/20221214-0/xml/gc/Occupation.gc"
    }
]';

# Convert String to Pwershell Array
$externalCL = ConvertFrom-Json -InputObject $extCL;

# Loop thorough each external Code List and get the right version
Foreach($ecl in $externalCL)
{
    Write-Host "entering " $ecl.folder  
    cd $ecl.folder
    if(Test-Path $ecl.filename) 
    {
        rm $ecl.filename
    }
    wget -OutFile $ecl.filename -Uri $ecl.uri
    cd ..
}
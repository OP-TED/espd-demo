Vue.component("distribution", {
    data: function () {
        return {
            version: '',
            versions: [],
            sources: {},
            espd_model: {},
            raw_data: {},
            show: true
        }
    },

    methods: {
        selectVersion(event) {
            //console.log(event);
            //TODO - reload data for Code Lists and Model

            const dataURL = ['ESPD/excel/']

            const getData = async () => {
                try {
                    //Load the ESPD Model in JSON format
                    let thecall = await fetch(`${this.raw_data[this.version].model.source}`)
                    let data = await thecall.json()
                    if (thecall.ok) {
                        this.espd_model = data
                    }

                    //Load the XML files in sources
                    //get the list of all Code Lists for this version
                    thecall = await fetch(this.raw_data[this.version].codelists.source)
                    data = await thecall.json()
                    if (thecall.ok) {
                        let cl = data.code_lists[this.version]
                        for (const it of cl) {
                            this.sources[this.version][it] = {}
                            this.sources[this.version][it].ShortName = it
                            thecall = await fetch(`ESPD/codelists/${this.version}/${it}.gc`)
                            data = await thecall.text()
                            if (thecall.ok) {
                                //this.sources[this.version][it] = data
                                //populate each filed with the corresponding value
                                const parser = new DOMParser();
                                function nsResolver(prefix) {
                                    const ns = {
                                        xs: "http://www.w3.org/2001/XMLSchema",
                                        fn: "http://www.w3.org/2005/xpath-functions",
                                        ss: "urn:schemas-microsoft-com:office:spreadsheet",
                                        gc: "http://docs.oasis-open.org/codelist/ns/genericode/1.0/",
                                        xsi: "http://www.w3.org/2001/XMLSchema-instance"
                                    };
                                    return ns[prefix] || null;
                                }
                                const gcXML = parser.parseFromString(data, "text/xml");
                                this.sources[this.version][it].ShortName = gcXML.evaluate('/gc:CodeList/Identification/ShortName', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].LongName = gcXML.evaluate('/gc:CodeList/Identification/LongName', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].ListID = gcXML.evaluate('/gc:CodeList/Identification/LongName[@Identifier="listId"]', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].Version = gcXML.evaluate('/gc:CodeList/Identification/Version', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].CanonicalUri = gcXML.evaluate('/gc:CodeList/Identification/CanonicalUri', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].CanonicalVersionUri = gcXML.evaluate('/gc:CodeList/Identification/CanonicalVersionUri', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].LocationUri = gcXML.evaluate('/gc:CodeList/Identification/LocationUri', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].AgencyLongName = gcXML.evaluate('/gc:CodeList/Identification/Agency/LongName', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].AgencyIdentifier = gcXML.evaluate('/gc:CodeList/Identification/Agency/Identifier/@Identifier', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].type = (this.sources[this.version][it].CanonicalUri.startsWith('https://github.com/')) ? 'technical' : 'external'
                                this.sources[this.version][it].name = (this.sources[this.version][it].type == 'external') ? this.sources[this.version][it].LongName : this.sources[this.version][it].ListID
                                if (!this.sources[this.version][it].LongName) this.sources[this.version][it].LongName = this.sources[this.version][it].ShortName
                                //extract fields infromation
                                if (this.sources[this.version][it].type == 'technical') {
                                    this.sources[this.version][it].fields = {}

                                    const scl = gcXML.evaluate('/gc:CodeList/SimpleCodeList/Row', gcXML, nsResolver, XPathResult.ANY_TYPE, null)
                                    let node = null
                                    while (node = scl.iterateNext()) {
                                        if (node.hasChildNodes()) {
                                            let children = node.childNodes, nodename = ''
                                            for (const n of children) {
                                                if (n.nextSibling && n.nextSibling.attributes) {
                                                    let key = n.nextSibling.getAttribute('ColumnRef'), val = n.nextSibling.getElementsByTagName('SimpleValue')[0].textContent
                                                    switch (key.toLowerCase()) {
                                                        case 'code':
                                                            nodename = val
                                                            if (!Object.hasOwn(this.sources[this.version][it].fields, nodename)) this.sources[this.version][it].fields[val] = {}
                                                            this.sources[this.version][it].fields[nodename]["Code"] = val
                                                            break;
                                                        case 'status':
                                                            this.sources[this.version][it].fields[nodename]["Status"] = val
                                                            break;
                                                        default:
                                                            this.sources[this.version][it].fields[nodename][key.replace('name-', '').replace('_label', '')] = val
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }

                    }

                } catch (error) {
                    console.log("Error!", error)
                }
            }

            getData()
        },

        ExportExcel(what) {
            console.log(what);
            //Create Excel for Code List
            if (what == 'codelist') {
                const wb = new ExcelJS.Workbook();

                //Excelify the XMLs from this.sources[this.version][<Code List name>]

                const exportKeys = ['ShortName', 'LongName', 'ListID',
                    'Version', 'CanonicalUri', 'CanonicalVersionUri',
                    'LocationUri', 'AgencyLongName', 'AgencyIdentifier'],
                    language_fields = [
                        "bul", "spa", "ces", "dan", "deu", "est", "ell",
                        "eng", "fra", "gle", "hrv", "ita", "lav", "lit",
                        "hun", "mlt", "nld", "pol", "por", "ron", "slk",
                        "slv", "fin", "swe"
                    ]
                for (const key in this.sources[this.version]) {
                    let ws = wb.addWorksheet(this.sources[this.version][key].ShortName)
                    let row = 1, maxAColWidth = 0
                    for (const elm of exportKeys) {
                        if (Object.hasOwn(this.sources[this.version][key], elm)) {
                            ws.getCell(`A${row}`).value = elm
                            maxAColWidth = Math.max(maxAColWidth, elm.length + 1)
                            ws.getCell(`A${row}`).font = { bold: true }
                            ws.getCell(`B${row}`).value = this.sources[this.version][key][elm]
                            row++
                        }
                        //Set the width for Column A
                        ws.getColumn('A').width = maxAColWidth

                    }
                    //Export the table part after the mandatory fields
                    const tableKeys = ['Code', 'Name', 'Status'].concat(language_fields)

                    if (Object.hasOwn(this.sources[this.version][key], 'fields')) {
                        //Add table
                        let cols = [], rows = []

                        tableKeys.forEach(elm => {
                            cols.push({
                                name: elm,
                                filterButton: true
                            })
                        })

                        for (const elm in this.sources[this.version][key]['fields']) {
                            let crt_row = []
                            tableKeys.forEach(val => {
                                crt_row.push(this.sources[this.version][key]['fields'][elm][val])
                            })
                            rows.push(crt_row)
                        }

                        ws.addTable({
                            name: `${this.sources[this.version][key].ShortName}_tbl`,
                            ref: `A${row}`,
                            headerRow: true,
                            totalsRow: false,
                            style: {
                                theme: 'TableStyleMedium9',
                                showRowStripes: true,
                            },
                            columns: cols,
                            rows: rows,
                        })
                    }
                }

                let fn_version = this.version
                //wrap up the file and send it to the browser
                wb.xlsx.writeBuffer({ base64: true })
                    .then(function (xls64) {
                        var data = new Blob([xls64], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                        var url = URL.createObjectURL(data);
                        let a = document.getElementById('excel_file_codelist')
                        a.href = url
                        a.download = `CodeList_${fn_version}.xlsx`
                        a.click()
                        URL.revokeObjectURL(url);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            }

            //Create Excel for ESPD EDM
            if (what == 'model') {
                const wb = new ExcelJS.Workbook();

                let header_row_1 =
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                        21, 22, 23, 24, 25, 26, 27, 28, 29, 30
                    ],
                    header_row_2 =
                        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
                            "Name", "Description", "Value (example)", "Cardinality",
                            "Property Data Type", "Element UUID", "Element Code", "Code List",
                            "XML ID Request", "XML ID Response", "XML ID Response (1)", "XML ID Response (2)", "XML ID Response (3)"
                        ]
                key2col = {
                    'name': 18,
                    'description': 19,
                    'examplevalue': 20,
                    'buyervalue': 20,
                    'cardinality': 21,
                    'propertydatatype': 22,
                    'elementUUID': 23,
                    'elementcode': 24,
                    'codelist': 25,
                    'requestpath': 26,
                    'responsepath': 27,
                    'responsecontent1':28,
                    'responsecontent2':29,
                    'responsecontent3':30
                },
                    crt_col = 1,
                    renderComponents = function (ws, component) {
                        crt_col++
                        //console.log(component)
                        for (const key in component) {
                            if (Object.hasOwn(component, key)) {
                                const element = component[key]
                                let crt_row = []
                                crt_row[crt_col] = key
                                //one line component vs containers
                                if (Object.hasOwn(element, 'components')) {
                                    crt_row[crt_col + 1] = `{${element.type}`
                                    for (const k in key2col) {
                                        if (Object.hasOwn(element, k)) {
                                            crt_row[key2col[k]] = element[k]
                                        }
                                    }
                                    ws.addRow(crt_row)
                                    renderComponents(ws, element.components)
                                    crt_row = []
                                    crt_row[crt_col] = `${element.type}}`
                                    ws.addRow(crt_row)
                                    crt_col--
                                } else {
                                    crt_row[crt_col + 1] = `{${element.type}}`
                                    for (const k in key2col) {
                                        if (Object.hasOwn(element, k)) {
                                            crt_row[key2col[k]] = element[k]
                                        }
                                    }
                                    ws.addRow(crt_row)
                                }

                            }
                        }
                        //crt_col--
                    };

                for (const key in this.espd_model) {

                    if (Object.hasOwn(this.espd_model, key)) {
                        const element = this.espd_model[key];

                        let ws = wb.addWorksheet(`${element.tag}_${element.elementcode}`)
                        //create header
                        ws.addRow(header_row_1)
                        ws.addRow(header_row_2)
                        //transform JSON structure to Excel table
                        crt_col = 1
                        let crt_row = []
                        crt_row[crt_col] = key
                        crt_row[crt_col + 1] = `{${element.type}`
                        for (const k in key2col) {
                            if (Object.hasOwn(element, k)) {
                                crt_row[key2col[k]] = element[k]
                            }
                        }
                        ws.addRow(crt_row)

                        //render components
                        if (Object.hasOwn(element, 'components')) renderComponents(ws, element.components, crt_col)
                        crt_col--
                        crt_row = []
                        crt_row[crt_col + 1] = `${element.type}}`
                        ws.addRow(crt_row)

                        //fix column widhts for columns 1..17
                        for (let index = 1; index <= 17; index++) {
                            let maxColWidht = 0
                            let tmp_col = ws.getColumn(index)
                            tmp_col.eachCell(function (cell, rowNr) {
                                maxColWidht = Math.max(maxColWidht, cell.text.length + 1)
                            })
                            tmp_col.width = maxColWidht
                        }
                    }
                }

                let fn_version = this.version
                //wrap up the file and send it to the browser
                wb.xlsx.writeBuffer({ base64: true })
                    .then(function (xls64) {
                        var data = new Blob([xls64], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                        var url = URL.createObjectURL(data);
                        let a = document.getElementById('excel_file_model')
                        a.href = url
                        a.download = `ESPD_EDM_criterion_${fn_version}.xlsx`
                        a.click()
                        URL.revokeObjectURL(url);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            }
        },
        DownloadZIP(what) {
            if (what == 'codelist') {
                //type == external => fetch; type == technical => build XML
                var XMLzip = new JSZip()
                XMLzip.file("codelists/README.md", `Code List GC files version ${this.version}`)

                const getAllXMLFiles = async () => {
                    try {

                        let thecall = await fetch(this.raw_data[this.version].codelists.source)
                        let data = await thecall.json()
                        if (thecall.ok) {
                            for (const fn of data.code_lists[this.version]) {
                                XMLzip.file(`codelists/${this.version}/${fn}.gc`,
                                    urlToPromise(`ESPD/codelists/${this.version}/${fn}.gc`),
                                    { binary: true })
                            }
                        }

                        let fn_version = this.version
                        XMLzip.generateAsync({ type: "blob" })
                            .then(function (blob) {
                                saveAs(blob, `codelist_${fn_version}.zip`);
                            });
                    } catch (error) {
                        console.log(error);
                    }
                }
                getAllXMLFiles()
            }

        }
    },

    created() {
        const dataURL = ['ESPD/excel/']

        const getData = async () => {
            try {
                let thecall = await fetch(`${dataURL}/excel.json`)
                let data = await thecall.json()
                if (thecall.ok) {
                    this.raw_data = data.versions

                    for (const key in this.raw_data) {
                        if (Object.hasOwn(this.raw_data, key)) {
                            this.versions.push(key)
                            this.sources[key] = {}
                        }
                    }
                    this.version = this.versions[0]

                    //Load the ESPD Model in JSON format
                    thecall = await fetch(`${this.raw_data[this.version].model.source}`)
                    data = await thecall.json()
                    if (thecall.ok) {
                        this.espd_model = data
                    }

                    //Load the XML files in sources
                    //get the list of all Code Lists for this version
                    thecall = await fetch(this.raw_data[this.version].codelists.source)
                    data = await thecall.json()
                    if (thecall.ok) {
                        let cl = data.code_lists[this.version]
                        for (const it of cl) {
                            this.sources[this.version][it] = {}
                            this.sources[this.version][it].ShortName = it
                            thecall = await fetch(`ESPD/codelists/${this.version}/${it}.gc`)
                            data = await thecall.text()
                            if (thecall.ok) {
                                //this.sources[this.version][it] = data
                                //populate each filed with the corresponding value
                                const parser = new DOMParser();
                                function nsResolver(prefix) {
                                    const ns = {
                                        xs: "http://www.w3.org/2001/XMLSchema",
                                        fn: "http://www.w3.org/2005/xpath-functions",
                                        ss: "urn:schemas-microsoft-com:office:spreadsheet",
                                        gc: "http://docs.oasis-open.org/codelist/ns/genericode/1.0/",
                                        xsi: "http://www.w3.org/2001/XMLSchema-instance"
                                    };
                                    return ns[prefix] || null;
                                }
                                const gcXML = parser.parseFromString(data, "text/xml");
                                this.sources[this.version][it].ShortName = gcXML.evaluate('/gc:CodeList/Identification/ShortName', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].LongName = gcXML.evaluate('/gc:CodeList/Identification/LongName', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].ListID = gcXML.evaluate('/gc:CodeList/Identification/LongName[@Identifier="listId"]', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].Version = gcXML.evaluate('/gc:CodeList/Identification/Version', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].CanonicalUri = gcXML.evaluate('/gc:CodeList/Identification/CanonicalUri', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].CanonicalVersionUri = gcXML.evaluate('/gc:CodeList/Identification/CanonicalVersionUri', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].LocationUri = gcXML.evaluate('/gc:CodeList/Identification/LocationUri', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].AgencyLongName = gcXML.evaluate('/gc:CodeList/Identification/Agency/LongName', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].AgencyIdentifier = gcXML.evaluate('/gc:CodeList/Identification/Agency/Identifier/@Identifier', gcXML, nsResolver, XPathResult.STRING_TYPE, null).stringValue
                                this.sources[this.version][it].type = (this.sources[this.version][it].CanonicalUri.startsWith('https://github.com/')) ? 'technical' : 'external'
                                this.sources[this.version][it].name = (this.sources[this.version][it].type == 'external') ? this.sources[this.version][it].LongName : this.sources[this.version][it].ListID
                                if (!this.sources[this.version][it].LongName) this.sources[this.version][it].LongName = this.sources[this.version][it].ShortName
                                //extract fields infromation
                                if (this.sources[this.version][it].type == 'technical') {
                                    this.sources[this.version][it].fields = {}

                                    const scl = gcXML.evaluate('/gc:CodeList/SimpleCodeList/Row', gcXML, nsResolver, XPathResult.ANY_TYPE, null)
                                    let node = null
                                    while (node = scl.iterateNext()) {
                                        if (node.hasChildNodes()) {
                                            let children = node.childNodes, nodename = ''
                                            for (const n of children) {
                                                if (n.nextSibling && n.nextSibling.attributes) {
                                                    let key = n.nextSibling.getAttribute('ColumnRef'), val = n.nextSibling.getElementsByTagName('SimpleValue')[0].textContent
                                                    switch (key.toLowerCase()) {
                                                        case 'code':
                                                            nodename = val
                                                            if (!Object.hasOwn(this.sources[this.version][it].fields, nodename)) this.sources[this.version][it].fields[val] = {}
                                                            this.sources[this.version][it].fields[nodename]["Code"] = val
                                                            break;
                                                        case 'status':
                                                            this.sources[this.version][it].fields[nodename]["Status"] = val
                                                            break;
                                                        default:
                                                            this.sources[this.version][it].fields[nodename][key.replace('name-', '').replace('_label', '')] = val
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }

            } catch (error) {
                console.log("Error!", error)
            }
        }

        getData()

    },

    template: `
  <b-card title="ESPD Distribution">
    <b-card-text>
    Select the ESPD version and click the corresponding buttons to generate the ESPD Distribution ZIP files. The Excel files contain the Code Lists definition, and the ESPD EDM data structure. The archives contain Code Lists in GC format.
    </b-card-text>
    <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" content-cols="3" label="ESPD version" label-for="input-espdversion">
        <b-form-select id="input-espdversion" v-model="version" :options="versions" @change="selectVersion($event)"></b-form-select>
    </b-form-group>

    <b-row>
        <b-col >
        Code Lists
        </b-col>
        <b-col  cols="10">
        <a href="#" id='excel_file_codelist' name='excel_file_codelist' class="card-link"></a>
        <b-button class="mb-3 mr-sm-2" pill @click="ExportExcel('codelist')" variant="warning">Download Excel</b-button>
        <b-button class="mb-3" pill @click="DownloadZIP('codelist')" variant="success">Download all XML files as ZIP archive</b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col >
        Model and Data structure
        </b-col>
        <b-col  cols="10">
        <a href="#" id='excel_file_model' name='excel_file_model' class="card-link"></a>
        <b-button class="mb-3 mr-sm-2" pill @click="ExportExcel('model')" variant="warning">Download Excel</b-button>
        </b-col>
    </b-row>   

  </b-card> 
    `
});
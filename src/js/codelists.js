Vue.component("codelists", {
    data: function () {
        return {
            raw_data: {},
            codelist: null,
            codelists: [],
            sources: {},
            versions: [],
            version: null,
            crt_list: {
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
            },
            details_fields: [
                { key: 'Code', label: 'Code' },
                { key: 'Name', label: 'Name' },
                { key: 'Description', label: 'Description' },
                { key: 'Status', label: 'Status' },
                'show_details'
            ],
            language_fields: [
                "bul",
                "spa",
                "ces",
                "dan",
                "deu",
                "est",
                "ell",
                "eng",
                "fra",
                "gle",
                "hrv",
                "ita",
                "lav",
                "lit",
                "hun",
                "mlt",
                "nld",
                "pol",
                "por",
                "ron",
                "slk",
                "slv",
                "fin",
                "swe"
            ],
            scl_fileds: [
                'Code', 'Status'
            ],
            theFile: '',
            show: true
        }
    },

    methods: {
        selectCodeList(event) {
            this.crt_list = this.sources[event]
            this.crt_list.table = []
            for (const fld in this.sources[event].fields) {
                this.crt_list.table.push(this.sources[this.codelist].fields[fld])
            }
            //console.log(this.crt_list.table);
        },

        selectVersion(event) {
            //console.log(event);
            //load the lista data from server
            const dataURL = ['ESPD/codelists/']
            this.version = event
            this.sources = {}

            const getData = async () => {
                this.codelists = this.raw_data[this.version]

                //load only the 1st version lists
                //each time when the version or lists are changed 
                for (const elm of this.codelists) {
                    if (!Object.hasOwn(this.sources, elm)) this.sources[elm] = {}
                    thecall = await fetch(`${dataURL}/${this.version}/${elm}/${elm}.json`)
                    data = await thecall.json()
                    if (thecall.ok) {
                        this.sources[elm] = data
                        //console.log(data);
                    }
                }

                this.codelist = this.codelists[0]
                const toplevelfields = ['ShortName', 'LongName', 'ListID', 'Version',
                    'CanonicalUri', 'CanonicalVersionUri', 'LocaltionUri',
                    'AgencyLongName', 'AgencyIdentifier', 'type', 'name']
                this.crt_list = this.sources[this.codelist]
                this.crt_list.table = []
                for (const fld in this.sources[this.codelist].fields) {
                    this.crt_list.table.push(this.sources[this.codelist].fields[fld])
                }

            }
            getData()
        },

        ExportExcel() {
            const wb = new ExcelJS.Workbook();

            //Excelify the JSON object this.sources

            const exportKeys = ['ShortName', 'LongName', 'ListID',
                'Version', 'CanonicalUri', 'CanonicalVersionUri',
                'LocationUri', 'AgencyLongName', 'AgencyIdentifier']
            for (const key in this.sources) {
                let ws = wb.addWorksheet(this.sources[key].ShortName)
                let row = 1, maxAColWidth = 0
                for (const elm of exportKeys) {
                    if (Object.hasOwn(this.sources[key], elm)) {
                        ws.getCell(`A${row}`).value = elm
                        maxAColWidth = Math.max(maxAColWidth, elm.length + 1)
                        ws.getCell(`A${row}`).font = { bold: true }
                        ws.getCell(`B${row}`).value = this.sources[key][elm]
                        row++
                    }
                    //Set the width for Column A
                    ws.getColumn('A').width = maxAColWidth

                }
                //Export the table part after the mandatory fields
                const tableKeys = ['Code', 'Name', 'Description', 'Status'].concat(this.language_fields)

                if (Object.hasOwn(this.sources[key], 'fields')) {
                    //Add table
                    let cols = [], rows = []

                    tableKeys.forEach(elm => {
                        cols.push({
                            name: elm,
                            filterButton: true
                        })
                    })

                    for (const elm in this.sources[key]['fields']) {
                        let crt_row = []
                        tableKeys.forEach(val => {
                            crt_row.push(this.sources[key]['fields'][elm][val])
                        })
                        rows.push(crt_row)
                    }

                    ws.addTable({
                        name: `${this.sources[key].ShortName}_tbl`,
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
                    //the name of the file can not be setup programatically :( you will get some randomly generated name
                    //window.open(url, "_blank");
                    let a = document.getElementById('excel_file')
                    a.href = url
                    a.download = `CodeList_${fn_version}.xlsx`
                    a.click()
                    URL.revokeObjectURL(url);
                })
                .catch(function (error) {
                    console.log(error.message);
                });

        },

        DownloadZIP() {
            //type == external => fetch; type == technical => build XML
            var XMLzip = new JSZip()
            XMLzip.file("codelists/README.md", "Code List GC files")

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

            const getAllXMLFiles = async () => {
                try {
                    for (const key in this.sources) {
                        //fetch the file from the local server
                        //it is not possible to fetch files from another servers using JavaScript in browser
                        //getExternalCodeLists.ps1 script to download the external files so that they can be loaded from local server
                        XMLzip.file(`codelists/${this.version}/${this.sources[key].ShortName}.gc`,
                            urlToPromise(`ESPD/codelists/${this.version}/${this.sources[key].LongName}/${this.sources[key].ShortName}.gc`), 
                            { binary: true })
                    }
                    XMLzip.generateAsync({ type: "blob" })
                        .then(function (blob) {
                            saveAs(blob, "codelist.zip");
                        });
                } catch (error) {
                    console.log(error);
                }
            }

            getAllXMLFiles()

        },

        ViewXML() {
            let item = this.crt_list
            //fetch the file and show it
            window.open(item.LocationUri.replace('https://github.com/OP-TED/ESPD-EDM/tree', 'https://raw.githubusercontent.com/OP-TED/ESPD-EDM'), "_blank")
        }
    },

    created() {
        const dataURL = ['ESPD/codelists/']

        const getData = async () => {
            try {
                let thecall = await fetch(`${dataURL}/codelist.json`)
                let data = await thecall.json()
                if (thecall.ok) {
                    this.raw_data = data.code_lists

                    //console.log(data)

                    //get the rest of the files
                    for (const ver in this.raw_data) {
                        if (Object.hasOwnProperty.call(this.raw_data, ver)) {
                            const v = this.raw_data[ver];
                            this.versions.push(ver)
                            //console.log(v);
                        }
                    }
                    this.version = this.versions[0]
                    this.codelists = this.raw_data[this.versions[0]]

                    //load only the 1st version lists
                    //each time when the version or lists are changed 
                    for (const elm of this.codelists) {
                        if (!Object.hasOwn(this.sources, elm)) this.sources[elm] = {}
                        thecall = await fetch(`${dataURL}/${this.version}/${elm}/${elm}.json`)
                        data = await thecall.json()
                        if (thecall.ok) {
                            this.sources[elm] = data
                            //console.log(data);
                        }
                    }

                    this.codelist = this.codelists[0]
                    const toplevelfields = ['ShortName', 'LongName', 'ListID', 'Version',
                        'CanonicalUri', 'CanonicalVersionUri', 'LocaltionUri',
                        'AgencyLongName', 'AgencyIdentifier', 'type', 'name']
                    this.crt_list = this.sources[this.codelist]
                    this.crt_list.table = []
                    for (const fld in this.sources[this.codelist].fields) {
                        this.crt_list.table.push(this.sources[this.codelist].fields[fld])
                    }


                }
            } catch (error) {
                console.log("Error!", error)
            }
        }

        getData()
    },

    template: `

    <b-card title="ESPD Code Lists" footer-tag="footer">

        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="ESPD version" label-for="input-espdversion">
            <b-form-select id="input-espdversion" v-model="version" :options="versions" @change="selectVersion($event)"></b-form-select>
        </b-form-group>

        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Code list" label-for="input-codelist">
            <b-form-select id="input-codelist" v-model="codelist" :options="codelists" @change="selectCodeList($event)"></b-form-select>
        </b-form-group>

        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Short Name" label-for="input-shortname">
            <b-form-input id="input-shortname" v-model="crt_list.ShortName"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Long Name" label-for="input-longname">
            <b-form-input id="input-longname" v-model="crt_list.LongName"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="List ID" label-for="input-listid">
            <b-form-input id="input-listid" v-model="crt_list.ListID"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Version" label-for="input-version">
            <b-form-input id="input-version" v-model="crt_list.Version"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Canonical URI" label-for="input-canonicaluri">
            <b-form-input id="input-canonicaluri" v-model="crt_list.CanonicalUri"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Canonical Version URI" label-for="input-canonicalversionuri">
            <b-form-input id="input-canonicalversionuri" v-model="crt_list.CanonicalVersionUri"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Location URI" label-for="input-locationuri">
            <b-form-input id="input-lsocationuri" v-model="crt_list.LocationUri"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Agency Long Name" label-for="input-agencylongname">
            <b-form-input id="input-agencylongname" v-model="crt_list.AgencyLongName"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Agency Identifier" label-for="input-agencyidentifier">
            <b-form-input id="input-agencyidentifier" v-model="crt_list.AgencyIdentifier"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Name" label-for="input-name">
            <b-form-input id="input-name" v-model="crt_list.name"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Type" label-for="input-type">
            <b-form-input id="input-type" v-model="crt_list.type"></b-form-input>
        </b-form-group>

        <b-table striped hover responsive :items="crt_list.table" :fields="details_fields">
        <template #cell(show_details)="row">
            <b-button pill variant="warning" size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Close' : 'Details'}}
            </b-button>
        </template>
        <template #row-details="row">
            <b-card>
                <b-table stacked :items="[row.item]" :fields="language_fields"></b-table>
            </b-card>
        </template>
        </b-table>

        <template #footer>
            <b-row>
                <b-col class="pb-2">
                    <b-button pill @click="ViewXML" variant="primary">View XML file</b-button>
                </b-col>
                <b-col class="pb-2 text-right">
                    <a href="#" id='excel_file' name='excel_file' class="card-link"></a>
                    <b-button pill @click="ExportExcel" variant="warning">Export to Excel</b-button>
                    <b-button pill @click="DownloadZIP" variant="success">Download all XML files as ZIP archive</b-button>
                </b-col>
            </b-row>
        </template>
    </b-card>

    `
});
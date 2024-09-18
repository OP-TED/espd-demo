Vue.component("codelists", {
    data() {
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
            loading: true,
            show: true
        }
    },

    methods: {
        selectCodeList(event) {
            //transform XML to JSON
            this.crt_list = {
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

            let gcJSON = xmlbuilder2.create(this.sources[event]).end({ format: 'object' })
            this.crt_list.ShortName = gcJSON['gc:CodeList']['Identification']['ShortName']
            this.crt_list.LongName = gcJSON['gc:CodeList']['Identification']['LongName'][0]
            this.crt_list.ListID = gcJSON['gc:CodeList']['Identification']['LongName'][1]['#']
            this.crt_list.Version = gcJSON['gc:CodeList']['Identification']['Version']
            this.crt_list.CanonicalUri = gcJSON['gc:CodeList']['Identification']['CanonicalUri']
            this.crt_list.CanonicalVersionUri = gcJSON['gc:CodeList']['Identification']['CanonicaVersionlUri']
            this.crt_list.LocationUri = gcJSON['gc:CodeList']['Identification']['LocationUri']
            this.crt_list.AgencyLongName = gcJSON['gc:CodeList']['Identification']['Agency']['LongName']
            this.crt_list.AgencyIdentifier = gcJSON['gc:CodeList']['Identification']['Agency']['Identifier']['@Identifier']
            this.crt_list.type = (this.crt_list.CanonicalUri.startsWith('https://github.com/ESPD/ESPD-EDM/')) ? 'technical' : 'external'
            this.crt_list.name = (this.crt_list.type == 'external') ? this.crt_list.LongName : this.crt_list.ListID

            gcJSON['gc:CodeList']['SimpleCodeList']['Row'].forEach(element => {
                let nodename = element['Value'][1]['@ColumnRef'] == 'Name' ? element['Value'][1]['SimpleValue'] : '__PLACEHOLDER__'
                element['Value'].forEach(elm => {
                    if (!Object.hasOwn(this.crt_list.fields, nodename)) this.crt_list.fields[nodename] = {}
                    switch (elm['@ColumnRef'].toLowerCase()) {
                        case 'code':
                            this.crt_list.fields[nodename]["Code"] = elm['SimpleValue']
                            break;

                        case 'name':
                            if (nodename == '__PLACEHOLDER__') nodename = elm['SimpleValue']
                            if (Object.hasOwn(this.crt_list.fields, '__PLACEHOLDER__')) {
                                this.crt_list.fields[nodename] = this.crt_list.fields['__PLACEHOLDER__']
                                delete this.crt_list.fields['__PLACEHOLDER__']
                            }
                            this.crt_list.fields[nodename]["Name"] = elm['SimpleValue']
                            break;

                        case 'status':
                            this.crt_list.fields[nodename]["Status"] = elm['SimpleValue']
                            break;

                        default:
                            //check for specific labels
                            this.crt_list.fields[nodename][elm['@ColumnRef'].replace('name-', '').replace('_label', '')] = elm['SimpleValue']
                            break;
                    }
                })

            });

            this.crt_list.table = []
            for (const fld in this.crt_list.fields) {
                this.crt_list.table.push(this.crt_list.fields[fld])
            }

        },

        selectVersion(event) {
            //console.log(event);
            //load the lista data from server
            const dataURL = ['ESPD/codelists/']
            this.version = event
            this.sources = {}

            const getData = async () => {
                this.loading = true
                this.codelists = this.raw_data[this.version]

                //load only the 1st version lists
                //each time when the version or lists are changed 
                for (const elm of this.codelists) {
                    if (!Object.hasOwn(this.sources, elm)) this.sources[elm] = {}
                    thecall = await fetch(`${dataURL}/${this.version}/${elm}.gc`)
                    data = await thecall.text()
                    if (thecall.ok) {
                        this.sources[elm] = data
                        //console.log(data);
                    }
                }

                this.codelist = this.codelists[0]
                const toplevelfields = ['ShortName', 'LongName', 'ListID', 'Version',
                    'CanonicalUri', 'CanonicalVersionUri', 'LocaltionUri',
                    'AgencyLongName', 'AgencyIdentifier', 'type', 'name']
                //transform XML to JSON
                this.crt_list = {
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


                let gcJSON = xmlbuilder2.create(this.sources[this.codelist]).end({ format: 'object' })
                this.crt_list.ShortName = gcJSON['gc:CodeList']['Identification']['ShortName']
                this.crt_list.LongName = gcJSON['gc:CodeList']['Identification']['LongName'][0]
                this.crt_list.ListID = gcJSON['gc:CodeList']['Identification']['LongName'][1]['#']
                this.crt_list.Version = gcJSON['gc:CodeList']['Identification']['Version']
                this.crt_list.CanonicalUri = gcJSON['gc:CodeList']['Identification']['CanonicalUri']
                this.crt_list.CanonicalVersionUri = gcJSON['gc:CodeList']['Identification']['CanonicaVersionlUri']
                this.crt_list.LocationUri = gcJSON['gc:CodeList']['Identification']['LocationUri']
                this.crt_list.AgencyLongName = gcJSON['gc:CodeList']['Identification']['Agency']['LongName']
                this.crt_list.AgencyIdentifier = gcJSON['gc:CodeList']['Identification']['Agency']['Identifier']['@Identifier']
                this.crt_list.type = (this.crt_list.CanonicalUri.startsWith('https://github.com/ESPD/ESPD-EDM/')) ? 'technical' : 'external'
                this.crt_list.name = (this.crt_list.type == 'external') ? this.crt_list.LongName : this.crt_list.ListID

                gcJSON['gc:CodeList']['SimpleCodeList']['Row'].forEach(element => {
                    let nodename = element['Value'][1]['@ColumnRef'] == 'Name' ? element['Value'][1]['SimpleValue'] : '__PLACEHOLDER__'
                    element['Value'].forEach(elm => {
                        if (!Object.hasOwn(this.crt_list.fields, nodename)) this.crt_list.fields[nodename] = {}
                        switch (elm['@ColumnRef'].toLowerCase()) {
                            case 'code':
                                this.crt_list.fields[nodename]["Code"] = elm['SimpleValue']
                                break;

                            case 'name':
                                if (nodename == '__PLACEHOLDER__') nodename = elm['SimpleValue']
                                if (Object.hasOwn(this.crt_list.fields, '__PLACEHOLDER__')) {
                                    this.crt_list.fields[nodename] = this.crt_list.fields['__PLACEHOLDER__']
                                    delete this.crt_list.fields['__PLACEHOLDER__']
                                }
                                this.crt_list.fields[nodename]["Name"] = elm['SimpleValue']
                                break;

                            case 'status':
                                this.crt_list.fields[nodename]["Status"] = elm['SimpleValue']
                                break;

                            default:
                                //check for specific labels
                                this.crt_list.fields[nodename][elm['@ColumnRef'].replace('name-', '').replace('_label', '')] = elm['SimpleValue']
                                break;
                        }
                    })

                });

                this.crt_list.table = []
                for (const fld in this.crt_list.fields) {
                    this.crt_list.table.push(this.crt_list.fields[fld])
                }
                this.loading = false
            }
            getData()
        },

        ViewXML() {
            let item = this.crt_list
            //fetch the file and show it
            //technical code lists should be fetched from the site the others from their remote locaitons
            if (item.type == 'technical') {
                fetch(`ESPD/codelists/${this.version}/${item.ShortName}.gc`)
                    .then(res => res.text()) // Gets the response and returns it as a blob
                    .then(txt => {
                        let blob = new Blob([txt], { type: 'text/xml' });
                        let url = URL.createObjectURL(blob);
                        window.open(url, "_blank");
                        URL.revokeObjectURL(url);
                    })
            } else {
                window.open(item.LocationUri, "_blank")
            }
        }
    },

    created() {
        const dataURL = ['ESPD/codelists/']

        const getData = async () => {
            try {
                this.loading = true
                let thecall = await fetch(`${dataURL}/codelist.json`)
                let data = await thecall.json()
                if (thecall.ok) {
                    this.raw_data = data.code_lists

                    //console.log(data)
                    this.versions = []
                    //get the rest of the files
                    for (const ver in this.raw_data) {
                        if (Object.hasOwnProperty.call(this.raw_data, ver)) {
                            const v = this.raw_data[ver];
                            this.versions.push(ver)
                            //console.log(v);
                        }
                    }
                    this.versions.sort()
                    this.version = this.versions[0]
                    this.codelists = this.raw_data[this.versions[0]]

                    //load only the 1st version lists
                    //each time when the version or lists are changed 
                    for (const elm of this.codelists) {
                        if (!Object.hasOwn(this.sources, elm)) this.sources[elm] = {}
                        thecall = await fetch(`${dataURL}/${this.version}/${elm}.gc`)
                        //data is in XML format
                        data = await thecall.text()
                        if (thecall.ok) {
                            this.sources[elm] = data
                            //console.log(JSON.stringify(xmlbuilder2.create(data).end({format: 'object'}), null, 4));
                        }
                    }

                    this.codelist = this.codelists[0]
                    const toplevelfields = ['ShortName', 'LongName', 'ListID', 'Version',
                        'CanonicalUri', 'CanonicalVersionUri', 'LocaltionUri',
                        'AgencyLongName', 'AgencyIdentifier', 'type', 'name']
                    //transform XML to JSON
                    this.crt_list = {
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

                    let gcJSON = xmlbuilder2.create(this.sources[this.codelist]).end({ format: 'object' })
                    this.crt_list.ShortName = gcJSON['gc:CodeList']['Identification']['ShortName']
                    this.crt_list.LongName = gcJSON['gc:CodeList']['Identification']['LongName'][0]
                    this.crt_list.ListID = gcJSON['gc:CodeList']['Identification']['LongName'][1]['#']
                    this.crt_list.Version = gcJSON['gc:CodeList']['Identification']['Version']
                    this.crt_list.CanonicalUri = gcJSON['gc:CodeList']['Identification']['CanonicalUri']
                    this.crt_list.CanonicalVersionUri = gcJSON['gc:CodeList']['Identification']['CanonicaVersionlUri']
                    this.crt_list.LocationUri = gcJSON['gc:CodeList']['Identification']['LocationUri']
                    this.crt_list.AgencyLongName = gcJSON['gc:CodeList']['Identification']['Agency']['LongName']
                    this.crt_list.AgencyIdentifier = gcJSON['gc:CodeList']['Identification']['Agency']['Identifier']['@Identifier']
                    this.crt_list.type = (this.crt_list.CanonicalUri.startsWith('https://github.com/ESPD/ESPD-EDM/')) ? 'technical' : 'external'
                    this.crt_list.name = (this.crt_list.type == 'external') ? this.crt_list.LongName : this.crt_list.ListID

                    gcJSON['gc:CodeList']['SimpleCodeList']['Row'].forEach(element => {
                        let nodename = element['Value'][1]['@ColumnRef'] == 'Name' ? element['Value'][1]['SimpleValue'] : '__PLACEHOLDER__'
                        element['Value'].forEach(elm => {
                            if (!Object.hasOwn(this.crt_list.fields, nodename)) this.crt_list.fields[nodename] = {}
                            switch (elm['@ColumnRef'].toLowerCase()) {
                                case 'code':
                                    this.crt_list.fields[nodename]["Code"] = elm['SimpleValue']
                                    break;

                                case 'name':
                                    if (nodename == '__PLACEHOLDER__') nodename = elm['SimpleValue']
                                    if (Object.hasOwn(this.crt_list.fields, '__PLACEHOLDER__')) {
                                        this.crt_list.fields[nodename] = this.crt_list.fields['__PLACEHOLDER__']
                                        delete this.crt_list.fields['__PLACEHOLDER__']
                                    }
                                    this.crt_list.fields[nodename]["Name"] = elm['SimpleValue']
                                    break;

                                case 'status':
                                    this.crt_list.fields[nodename]["Status"] = elm['SimpleValue']
                                    break;

                                default:
                                    //check for specific labels
                                    this.crt_list.fields[nodename][elm['@ColumnRef'].replace('name-', '').replace('_label', '')] = elm['SimpleValue']
                                    break;
                            }
                        })

                    });

                    this.crt_list.table = []
                    for (const fld in this.crt_list.fields) {
                        this.crt_list.table.push(this.crt_list.fields[fld])
                    }
                    this.loading = false

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

        <div v-if="loading">
            <div class="d-flex justify-content-center mb-3">
                <b-spinner label="Loading Code List data ..."></b-spinner>
            </div>
        </div>
        <div v-else>
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

        <b-table striped hover responsive :items="crt_list.table" :fields="details_fields" :no-local-sorting=true>
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
        </div>

        <template #footer>
            <b-row v-if="!loading">
                <b-col class="pb-2">
                    <b-button pill @click="ViewXML" variant="primary">View XML file</b-button>
                </b-col>
            </b-row>
        </template>
    </b-card>

    `
});
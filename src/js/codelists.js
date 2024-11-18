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
                "bul","spa","ces","dan","deu","est","ell","eng","fra","gle","hrv","ita","lav","lit","hun","mlt","nld","pol","por","ron","slk","slv","fin","swe"
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
            //this.loading = true
            this.crt_list = gc2JSON(this.sources[event])
            this.$nextTick(function () {
                //console.log(this.$el.textContent) // => 'updated'
                this.loading = false
              })
        },

        selectVersion(event) {
            //console.log(event);
            //load the lista data from server
            const dataURL = ['ESPD/codelists/']
            this.version = event
            this.sources = {}
            this.loading = true

            const getData = async () => {

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
                this.crt_list = gc2JSON(this.sources[this.codelist])
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
            this.loading = true
            try {
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
                            //console.log(JSON.stringify(xmlbuilder2.create(data).end({ format: 'object' }), null, 4));
                        }
                    }
                    this.codelist = this.codelists[0]
                    this.crt_list = gc2JSON(this.sources[this.codelist])
                    this.loading = false

                }
            } catch (error) {
                console.log("Error!", error)
            }
        }

        getData()
    },

    template: `
    <template>
    <div>

    <b-card title="ESPD Code Lists" footer-tag="footer">
    <b-card-text>
    Select the ESPD version and the code list to explore the contents. At the bottom of the page, you can view the translations for each entry in the code list.
    </b-card-text>
    <b-row>
        <b-col lg="4">
        <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" content-cols="3" label="ESPD version" label-for="input-espdversion">
            <b-form-select id="input-espdversion" v-model="version" :options="versions" @change="selectVersion($event)"></b-form-select>
        </b-form-group>
        </b-col>
        <b-col lg="4">
        <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" content-cols="3" label="Code list" label-for="input-codelist">
            <b-form-select id="input-codelist" v-model="codelist" :options="codelists" @change="selectCodeList($event)"></b-form-select>
        </b-form-group>
        </b-col>
        <b-col lg="4">
        <em>Type: </em>{{crt_list.type}}
        </b-col>
    </b-row>

        <!-- Display read only data as static HTML -->
        <b>Short Name: </b>{{crt_list.ShortName}}
        <b> Long Name: </b>{{crt_list.LongName}}<br/>
        <b>List ID: </b>{{crt_list.ListID}}
        <b> Version: </b>{{crt_list.Version}}<br/>
        <b>Canonical URI: </b>{{crt_list.CanonicalUri}}<br/>
        <b>Canonical Version URI: </b>{{crt_list.CanonicalVersionUri}}<br/>
        <b>Location URI: </b>{{crt_list.LocationUri}}<br/>
        <b>Agency Long Name: </b>{{crt_list.AgencyLongName}}<br/>
        <b>Agency Identifier: </b>{{crt_list.AgencyIdentifier}}<br/>
    
        <b-table striped hover responsive :items="crt_list.table" :fields="details_fields" :no-local-sorting=true>
        <template #cell(show_details)="row">
            <b-button pill variant="warning" size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Close' : 'Translations'}}
            </b-button>
        </template>
        <template #row-details="row">
            <b-card>
                <b-table stacked :items="[row.item]" :fields="language_fields"></b-table>
            </b-card>
        </template>
        </b-table>

        <template #footer>
            <b-row v-if="!loading">
                <b-col class="pb-2">
                    <b-button pill @click="ViewXML" variant="primary">View XML file</b-button>
                </b-col>
            </b-row>
        </template>
    </b-card>
    <b-overlay :show="loading" no-wrap>
    </b-overlay>
    </div>
    </template>
    `
});
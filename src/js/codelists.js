Vue.component("codelists", {
    data() {
        return {
            codelist: null,
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
                "bul", "spa", "ces", "dan", "deu", "est", "ell", "eng", "fra", "gle", "hrv", "ita", "lav", "lit", "hun", "mlt", "nld", "pol", "por", "ron", "slk", "slv", "fin", "swe"
            ],
            scl_fileds: [
                'Code', 'Status'
            ],
            theFile: '',
            loading: true,
            show: true
        }
    },

    computed: {
        versions() {
            return this.$store.state.esdp_versions
        },
        codelists() {
            return this.$store.state.code_list[this.version]
        }
    },

    methods: {

        selectCodeList(event) {
            this.loading = true
            this.crt_list = this.$store.state.cl_files[`${this.version}_${event}`]
            this.$nextTick(function () {
                //console.log(this.$el.textContent) // => 'updated'
                this.loading = false
            })
        },

        selectVersion(event) {
            this.loading = true
            this.version = event
            this.codelist = this.codelists[0]
            this.crt_list = this.$store.state.cl_files[`${this.version}_${this.codelist}`]
            this.loading = false
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
        if (this.versions.length > 0) {
            this.versions.sort()
            this.version = this.versions[0]
            this.codelist = this.codelists[0]
            this.crt_list = this.$store.state.cl_files[`${this.version}_${this.codelist}`]
            this.loading = false
        } else {
            console.log('Data initialization failed. Consult the log console for errors!')
        }
    },

    template: `
    <b-card class="mt-2" title="ESPD Code Lists" footer-tag="footer">
    <b-card-text>
    Select the ESPD version and the code list to explore the contents. At the bottom of the page, you can view the translations for each entry in the code list.
    </b-card-text>
    <b-form-row class="mb-2" align-v="center">
        <b-col cols="2" class="text-right">
            <label class="mr-sm-2" for="input-espdversion">ESPD version</label>
        </b-col>
        <b-col cols="1">
            <b-form-select id="input-espdversion" size="sm" v-model="version" :options="versions" @change="selectVersion($event)"></b-form-select>
        </b-col>
        <b-col cols="2" class="text-right">
            <label class="mr-sm-2" for="input-codelist">Code list</label>
        </b-col>
        <b-col cols="3">
            <b-form-select id="input-codelist" size="sm" v-model="codelist" :options="codelists" @change="selectCodeList($event)"></b-form-select>
        </b-col>
        <b-col lg="4">
            <em>Type: </em>{{crt_list.type}}
        </b-col>
    </b-form-row>
    
        <!-- Display read only data as static HTML -->
        <b>Short Name: </b>{{crt_list.ShortName}}&nbsp;&nbsp;
        <b>Long Name: </b>{{crt_list.LongName}}<br/>
        <b>Agency Long Name: </b>{{crt_list.AgencyLongName}}&nbsp;&nbsp;
        <b>Agency Identifier: </b>{{crt_list.AgencyIdentifier}}<br/>
        <b>List ID: </b>{{crt_list.ListID}}&nbsp;&nbsp;
        <b>Version: </b>{{crt_list.Version}}<br/>
        <b>Canonical URI: </b>{{crt_list.CanonicalUri}}<br/>
        <b>Canonical Version URI: </b>{{crt_list.CanonicalVersionUri}}<br/>
        <b>Location URI: </b>{{crt_list.LocationUri}}<br/>
    
        <b-table class="mt-2" striped hover responsive :items="crt_list.table" :fields="details_fields" :no-local-sorting=true>
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
    `
});
Vue.component("codelists", {
    data: function () {
        return {
            codelist: null,
            codelists: [],
            sources: {},
            crt_list: {
                'ShortName': '',
                'LongName': '',
                'ListID': '',
                'Version': '',
                'CanonicalUri': '',
                'CanonicalVersionUri': '',
                'LocaltionUri': '',
                'AgencyLongName': '',
                'AgencyIdentifier': '',
                'type': '',
                'name': '',
                'table': []
            },
            details_fields:[
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
        }
    },

    created() {
        const dataURL = ['ESPD/codelists/']

        const getData = async () => {
            try {
                let thecall = await fetch(`${dataURL}/codelist.json`)
                let data = await thecall.json()
                if (thecall.ok) {
                    this.codelists = data.code_lists
                    //console.log(data)

                    //get the rest of the files
                    for (const elm of this.codelists) {
                        if (!Object.hasOwn(this.sources, elm)) this.sources[elm] = {}
                        thecall = await fetch(`${dataURL}/${elm}/${elm}.json`)
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
    <template>
    <b-container fluid class="m-auto">
    ESPD Code Lists
    <div>
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

    </div>

    </b-container>
    </template>
    `
});
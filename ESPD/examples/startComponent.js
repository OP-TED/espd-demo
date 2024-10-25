Vue.component("startComponent", {
    data() {
        return {
            raw_data: null,
            versions: [{ value: null, text: 'Select an option' }],
            exp: {
                espd_version: null,
                role: null,
                country: null
            },
            role_opt: [
                { value: 'ca', text: 'Contracting authority - ESPD Request' },
                { value: 'eo', text: 'Economic operator - ESPD Response' }
            ],
            country_list: [
                { value: 'EUR', text: 'European Union' }
            ],
            show: true
        }
    },

    methods: {
        selectVersion(event){
            this.exp.espd_version = event
            window.espd_doc.espd_version = this.exp.espd_version

            const getData = async () => {
                try {
                    //load the model too
                    let thecall = await fetch(`${window.raw_data[window.espd_doc.espd_version].model.source}`)
                    let data = await thecall.json()
                    if (thecall.ok) {
                        window.espd_model = data
                        //build the components for this version on demand
                        //factoryComponents()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            getData()
        }
    },

    updated(){
        saveData(this.exp)
        this.$store.commit('savekv', {key:'start', value:this.exp})  
    },

    created(){
        const dataURL = ['ESPD/examples/']

        const getData = async () => {
            try {
                let thecall = await fetch(`${dataURL}/espd.json`)
                let data = await thecall.json()
                if (thecall.ok) {
                    window.raw_data = data.versions
                    this.versions = []
                    for (const key in window.raw_data) {
                        if (Object.hasOwn(window.raw_data, key)) {
                            this.versions.push(key)
                            this.exp.espd_version = this.versions[0]
                            window.espd_doc.espd_version = this.exp.espd_version
                        }
                    }
                    this.exp.role = 'ca'
                    this.exp.country = 'EUR'
                    window.espd_doc.role = this.exp.role
                    window.espd_doc.country = this.exp.country
                    //load the model too
                    thecall = await fetch(`${window.raw_data[window.espd_doc.espd_version].model.source}`)
                    data = await thecall.json()
                    if (thecall.ok) {
                        window.espd_model = data
                        window.espd_data = {}
                        //create the components for this version based on the model
                        //factoryComponents()
                    }
                }
            } catch (error) {
                console.log("Error!", error);
            }
        }

        getData()
    },

    template: `
    <template>
        <b-conatiner>
            <b-row>
                <b-col>
                    <div>
                        <h6>Start</h6>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-st1 variant="info">A. Select initial parameters</b-button>
        </b-card-header>
        <b-collapse id="accordion-st1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
                <b-form-group id="fieldset-espd" label-cols-sm="4" label-cols-lg="3" description="Select ESPD version" label="ESPD version" label-for="sel-espd">
                    <b-form-select id="sel-espd" v-model="exp.espd_version" :options="versions" @change="selectVersion($event)"></b-form-select>
                </b-form-group>
                
                <b-form-group id="fieldset-role" label-cols-sm="4" label-cols-lg="3" description="Select your role" label="Select your role" label-for="sel-role">
                    <b-form-select id="sel-role" v-model="exp.role" :options="role_opt"></b-form-select>
                </b-form-group>

                <b-form-group id="fieldset-country" label-cols-sm="4" label-cols-lg="3" description="Select your country" label="Country" label-for="sel-country">
                <b-form-select id="sel-country" v-model="exp.country" :options="country_list"></b-form-select>
                </b-form-group>  
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>
                </b-col>
            </b-row>
        </b-container>
    </template>
    `

})
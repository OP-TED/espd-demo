Vue.component("startComponent", {
    data() {
        return {
            espd_version: '3.3.0',
            role: null,
            country: null,
            espd_opt: [
                { value: '3.3.0', text: 'ESPD v3.3.0' }
            ],
            role_opt: [
                { value: null, text: 'Please select a Role'},
                { value: 'ca', text: 'Contracting authority - ESPD Request' },
                { value: 'eo', text: 'Economic operator - ESPD Response' }
            ],
            country_list: [
                { value: null, text: 'Please select a Country'},
                { value: 'lu', text: 'Luxembourg' }
            ],
            show: true
        }
    },

    watch: {
        espd_version: function (oldV, newV) {
            this.updateESPDDoc()
        },
        country: function (oldV, newV) {
            this.updateESPDDoc()
        },
        role: function (oldV, newV) {
            this.updateESPDDoc()
        }

    },
    emits: ['updateESPDDoc'],

    methods: {
        updateESPDDoc() {
            this.$emit('updateESPDDoc',{
                espd_version: this.espd_version,
                role: this.role,
                country: this.country
            })
        }
    },

    template: `
    <template>
        <div>
        <b-form-group id="fieldset-espd" label-cols-sm="4" label-cols-lg="3" description="Select ESPD version" label="ESPD version" label-for="sel-espd">
            <b-form-select id="sel-espd" v-model="espd_version" :options="espd_opt"></b-form-select>
        </b-form-group>
        
        <b-form-group id="fieldset-role" label-cols-sm="4" label-cols-lg="3" description="Select your role" label="Select your role" label-for="sel-role">
            <b-form-select id="sel-role" v-model="role" :options="role_opt"></b-form-select>
        </b-form-group>

        <b-form-group id="fieldset-country" label-cols-sm="4" label-cols-lg="3" description="Select your country" label="Country" label-for="sel-country">
        <b-form-select id="sel-country" v-model="country" :options="country_list"></b-form-select>
        </b-form-group>
            
        </div>
    </template>
    `

})
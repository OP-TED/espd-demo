Vue.component("service", {

    data() {
        return {
            crt_step: 0,
            steps: [
                { icon: 'collection-play', label: 'Start', component: 'startComponent' },
                { icon: 'bank', label: 'Procedure', component: 'procedureComponent' },
                { icon: 'exclamation-octagon', label: 'Exclusion', component: 'exclusionGrounds' },
                { icon: 'shield-fill-check', label: 'Selection', component: 'selectionCriteria' },
                { icon: 'cloud-download', label: 'Finish', component: 'ESPDdownload' }
            ],
            show: true
        }
    },

    methods: {
        nextStep() {
            //Get the data from child components using $refs, check and merge with data from window
            /*
            let key = this.steps[this.crt_step].component
            switch (key) {
                case 'startComponent':
                    console.log(this.$refs[key]._data)
                    break;
                case 'procedureComponent': case 'exclusionGrounds': case 'selectionCriteria': case 'ESPDdownload':
                    console.log(this.$refs[key]._data)
                    for (const el in window.espd_model) {
                        if (Object.hasOwn(window.espd_model, el)) {
                            const element = window.espd_model[el];
                            if(Object.hasOwn(this.$refs[key].$refs, `${window.espd_doc.espd_version}-${el}`))
                                console.log(this.$refs[key]?.$refs[`${window.espd_doc.espd_version}-${el}`][0]._data)
                        }
                    }
                    break
                default:
                    console.log(key)
                    break;
            }
            */
            this.crt_step = Math.min(this.crt_step + 1, this.steps.length - 1)

        },
        previousStep() {
            this.crt_step = Math.max(this.crt_step - 1, 0)
        }
    },

    created() {
        if (window.espd_doc) delete window.espd_doc
        window.espd_doc = {}
    },

    template: `
    <b-card title="ESPD Examples Generator">
        <b-card-text>
        Select desired ESPD version and generate ESPD Request examples as Contracting Authority and ESPD Response examples Economic Operator.
        </b-card-text>

        <div>
        <b-conatiner>
            <b-row>
                <b-col class="text-left">
                <b-button pill variant="success" @click='previousStep'>Previous</b-button>
                </b-col>
                <b-col class="text-center">
                   [ Step: {{crt_step}} / {{steps.length-1}} ] <b-icon :icon=steps[crt_step].icon aria-hidden='true'></b-icon> <strong>{{steps[crt_step].label}}</strong>
                </b-col>
                <b-col class="text-right">
                <b-button pill variant="success" @click='nextStep()'>Next</b-button>
                </b-col>
            </b-row>
        
        <b-row class="my-2">
        <b-col col-span=3>
        <component v-bind:is="steps[crt_step].component" :ref="steps[crt_step].component"></component>
        </b-col>
        </b-row>
        </b-container>
        </div>
    </b-card> 
    `
});
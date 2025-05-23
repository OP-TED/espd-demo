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
            if(this.crt_step==4){
                this.crt_step = 0
            }else{
                this.crt_step = Math.min(this.crt_step + 1, this.steps.length - 1)
            }
        },
        previousStep() {
            this.crt_step = Math.max(this.crt_step - 1, 0)
        }
    },

    created() {
        window.espd_doc = {}
    },

    template: `
    <b-card class="mt-2" title="ESPD Examples Generator">
        <b-card-text>
        Select the desired ESPD version and generate either ESPD Request examples as a Contracting Authority, or ESPD Response examples as an Economic Operator. Fill in the corresponding fields and click Next to complete the forms. You can download the generated XML document at the end.
        </b-card-text>

        <div>
        <b-conatiner>
            <b-row>
                <b-col class="text-left">
                <b-button :disabled="crt_step==0" pill variant="success" @click='previousStep'>Previous</b-button>
                </b-col>
                <b-col class="text-center">
                   [ Step: {{crt_step}} / {{steps.length-1}} ] <b-icon :icon=steps[crt_step].icon aria-hidden='true'></b-icon> <strong>{{steps[crt_step].label}}</strong>
                </b-col>
                <b-col class="text-right">
                <b-button pill variant="success" @click='nextStep()'>{{(crt_step==4)?'Start Again':'Next'}}</b-button>
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
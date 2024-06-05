Vue.component('ESPDdownload',{
    data(){
        return {
            show: true
        }
    },

    emits: ['updateESPDDoc'],

    methods: {
        updateESPDDoc() {
            this.$emit('updateESPDDoc',{
            })
        }
    },

    template: `
    <template>
    <b-conatiner>
    <b-row>
    <b-col>
    <div>
    <h6>Finish</h6>
    </div>
    </b-col>
    </b-row>
    <b-row>
    <b-col>
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info">A. Save ESPD</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
            
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
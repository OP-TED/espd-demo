Vue.component('ESPDdownload',{
    data(){
        return {
            show: true
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
            <b-button block v-b-toggle.accordion-fn1 variant="info">A. Save ESPD</b-button>
        </b-card-header>
        <b-collapse id="accordion-fn1" accordion="my-accordion" role="tabpanel">
            <b-card-body class='text-center'>
            <b-button variant="warning">Download ESPD {{ window.espd_doc.role=='ca'?'Request':'Response'}}</b-button>
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
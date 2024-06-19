Vue.component('selectionCriteria',{
    data(){
        return {
            meta_espd_doc: window.raw_data[window.espd_doc.espd_version],
            espd_model: window.espd_model,
            show: true
        }
    },

    template: `
    <template>
    <b-conatiner>
    <b-row>
    <b-col>
    <div>
    <h6>Part IV: Selection criteria</h6>
    </div>
    </b-col>
    </b-row>
    <b-row>
    <b-col>
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s1 variant="info">A: Suitability</b-button>
        </b-card-header>
        <b-collapse id="accordion-s1" accordion="my-accordion" role="tabpanel">
        <b-card-body v-for="item in meta_espd_doc['partIV']['A']">
            <strong>{{ espd_model[item].name }}</strong>
            <p>{{ espd_model[item].description }}</p>
        </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s2 variant="info">B: Economic and financial standing</b-button>
        </b-card-header>
        <b-collapse id="accordion-s2" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in meta_espd_doc['partIV']['B']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s3 variant="info">C: Technical and professional ability</b-button>
        </b-card-header>
        <b-collapse id="accordion-s3" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in meta_espd_doc['partIV']['C']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s4 variant="info">D: Quality assurance schemes and environmental management standards</b-button>
        </b-card-header>
        <b-collapse id="accordion-s4" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in meta_espd_doc['partIV']['D']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
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
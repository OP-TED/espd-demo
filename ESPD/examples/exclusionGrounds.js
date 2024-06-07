Vue.component('exclusionGrounds', {
    data(){
        return {
            meta_espd_doc: window.raw_data[window.espd_doc.espd_version],
            espd_model: window.espd_model,
            show: true
        }
    },

    created(){
        console.log('exclusion grounds')
    },

    template: `
    <template>
    <b-conatiner>
    <b-row>
    <b-col>
    <div>
    <h6>Part III: Exclusion grounds</h6>
    </div>
    </b-col>
    </b-row>
    <b-row>
    <b-col>
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-e1 variant="info">A: Grounds relating to criminal convictions</b-button>
        </b-card-header>
        <b-collapse id="accordion-e1" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in meta_espd_doc['partIII']['A']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-e2 variant="info">B: Grounds relating to the payment of taxes or social security contributions </b-button>
        </b-card-header>
        <b-collapse id="accordion-e2" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in meta_espd_doc['partIII']['B']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-e3 variant="info">C: Grounds relating to insolvency, conflicts of interests or professional misconduct</b-button>
        </b-card-header>
        <b-collapse id="accordion-e3" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in meta_espd_doc['partIII']['C']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-e4 variant="info">D: Purely national exclusion grounds</b-button>
        </b-card-header>
        <b-collapse id="accordion-e4" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in meta_espd_doc['partIII']['D']">
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
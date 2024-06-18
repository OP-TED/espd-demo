Vue.component('selectionCriteria',{
    data(){
        return {
            meta_espd_doc: window.raw_data[window.espd_doc.espd_version],
            espd_model: window.espd_model,
            SIV_a: false,
            optYN: [
                { text: 'YES', value: false },
                { text: 'NO', value: true }
            ],
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
        <div>
        <p>Contracting authorities must indicate which selection criteria will be applied by 'ticking' the checkbox placed before the relevant criterion.</p>
        <b-form-group label="Do you want to use the selection criteria from A to D?" v-slot="{ ariaDescribedby }">
        <b-form-radio-group id="radio-group-1" v-model="SIV_a" :options="optYN" :aria-describedby="ariaDescribedby" name="radio-options"></b-form-radio-group>
        </div>
    </b-col>
    </b-row
    <b-row>
    <b-col>
    <div v-if="SIV_a" class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-sa1 variant="info">ɑ: Global indication for all selection criteria</b-button>
        </b-card-header>
        <b-collapse id="accordion-sa1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
            <strong>Concerning the selection criteria the economic operator declares that</strong>
            <p>It satisfies all the required selection criteria</p>
        </b-card-body>
        </b-collapse>
        </b-card>

    </div>
    <div v-else class="accordion" role="tablist">
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
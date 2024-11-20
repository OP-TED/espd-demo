Vue.component('selectionCriteria', {
    data() {
        return {
            meta_espd_doc: window.raw_data[window.espd_doc.espd_version],
            lots: [],
            options: [],
            espd_model: window.espd_model,
            espd_structure: {
                partIV: {
                    A: [],
                    B: [],
                    C: [],
                    D: []
                }
            },
            show: true
        }
    },

    computed: {
        getTag(item) {
            return item.substring(item.indexOf('-') + 1)
        }
    },

    created() {
        window.espd_doc.options = []
        for (let index = 0; index < window.espd_doc.procedure.number_of_lots; index++) {
            window.espd_doc.options.push(`LOT-${index.toString().padStart(4, "0")}`)
            this.options.push(`LOT-${index.toString().padStart(4, "0")}`)
        }
        for (const key in this.meta_espd_doc.partIV) {
            if (Object.hasOwn(this.meta_espd_doc.partIV, key)) {
                for (const el of this.meta_espd_doc.partIV[key]) {
                    this.espd_structure.partIV[key].push(`${window.espd_doc.espd_version}-${el}`)
                    window.espd_model[el].lots = this.options
                    window.espd_model[el].selected = 'OK'
                }
            }
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
        <b-collapse id="accordion-s1" accordion="my-accordion" visible role="tabpanel">
            <b-card-body v-for="item in espd_structure['partIV']['A']">
                <component v-bind:is="item"  :ref="item"></component>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s2 variant="info">B: Economic and financial standing</b-button>
        </b-card-header>
        <b-collapse id="accordion-s2" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in espd_structure['partIV']['B']">
                <component v-bind:is="item"  :ref="item"></component>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s3 variant="info">C: Technical and professional ability</b-button>
        </b-card-header>
        <b-collapse id="accordion-s3" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in espd_structure['partIV']['C']">
                <component v-bind:is="item"  :ref="item"></component>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s4 variant="info">D: Quality assurance schemes and environmental management standards</b-button>
        </b-card-header>
        <b-collapse id="accordion-s4" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in espd_structure['partIV']['D']">
                <component v-bind:is="item"  :ref="item"></component>
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
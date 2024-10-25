Vue.component('procedureComponent', {
    data() {
        return {
            espd_structure: {
                partI:{ A:[], B:[], C:[]},
                partII: { A: [], B: [], C: [], D: []}
            },
            meta_espd_doc: window.raw_data[window.espd_doc.espd_version],
            espd_model: window.espd_model
        }
    },

    created() {        
        //Build the UI part for each Criteria
        for (const key in this.meta_espd_doc.partI) {
            if (Object.hasOwn(this.meta_espd_doc.partI, key)) {
                for (const el of this.meta_espd_doc.partI[key]) {
                    this.espd_structure.partI[key].push(`${el}`)                    
                }
            }
        }
        if(window.espd_doc.role == 'eo'){
            for (const key in this.meta_espd_doc.partII) {
                if (Object.hasOwn(this.meta_espd_doc.partII, key)) {
                    for (const el of this.meta_espd_doc.partII[key]) {
                        this.espd_structure.partII[key].push(el.startsWith("PII")?el:`${window.espd_doc.espd_version}-${el}`)                    
                    }
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
    <h6>Part I: Information concerning the procurement procedure and the contracting authority or contracting entity</h6>
    </div>
    </b-col>
    </b-row>
    <b-row>
    <b-col>
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-p1 variant="info">A. Information about publication</b-button>
        </b-card-header>
        <b-collapse id="accordion-p1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in espd_structure['partI']['A']">
                <component v-bind:is="item" :ref="item"></component>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-p2 variant="info">B. Identity of the procurer</b-button>
        </b-card-header>
        <b-collapse id="accordion-p2" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in espd_structure['partI']['B']">
                <component v-bind:is="item" :ref="item"></component>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-p3 variant="info">C. Information about the procurement procedure</b-button>
        </b-card-header>
        <b-collapse id="accordion-p3" accordion="my-accordion" role="tabpanel">
            <b-card-body v-for="item in espd_structure['partI']['C']">
                <component v-bind:is="item" :ref="item"></component>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>
    </b-col>
    </b-row>
    <b-row v-if="window.espd_doc.role=='eo'">
        <b-col>
        <div>
        <h6>Part II: Information concerning the economic operator</h6>
        </div>
        </b-col>
    </b-row>
    <b-row v-if="window.espd_doc.role=='eo'">
        <b-col>
        <div class="accordion" role="tablist">
            <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-p4 variant="info">A: Information about the economic operator</b-button>
            </b-card-header>
            <b-collapse id="accordion-p4" accordion="my-accordion" role="tabpanel">
                   
            <b-card-body v-for="item in espd_structure['partII']['A']">
                <component v-bind:is="item"  :ref="item"></component>
            </b-card-body>

            </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-p5 variant="info">B: Information about representatives of the economic operator</b-button>
            </b-card-header>
            <b-collapse id="accordion-p5" accordion="my-accordion" role="tabpanel">
                
            <b-card-body v-for="item in espd_structure['partII']['B']">
                <component v-bind:is="item"  :ref="item"></component>
            </b-card-body>

            </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-p6 variant="info">C: Information about reliance on the capacities of other entities</b-button>
            </b-card-header>
            <b-collapse id="accordion-p6" accordion="my-accordion" role="tabpanel">
                <b-card-body v-for="item in espd_structure['partII']['C']">
                    <component v-bind:is="item"  :ref="item"></component>
                </b-card-body>
            </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-p7 variant="info">D: Information concerning subcontractors on whose capacity the economic operator does not rely</b-button>
            </b-card-header>
            <b-collapse id="accordion-p7" accordion="my-accordion" role="tabpanel">
                <b-card-body v-for="item in espd_structure['partII']['D']">
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
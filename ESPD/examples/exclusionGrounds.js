Vue.component('exclusionGrounds', {
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
    <h6>Part III: Exclusion grounds</h6>
    </div>
    </b-col>
    </b-row>
    <b-row>
    <b-col>
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info">A: Grounds relating to criminal convictions</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
            
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="info">B: Grounds relating to the payment of taxes or social security contributions </b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
            
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-3 variant="info">C: Grounds relating to insolvency, conflicts of interests or professional misconduct</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>

            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-4 variant="info">D: Purely national exclusion grounds</b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
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
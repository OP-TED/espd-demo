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
        getTag(item){
            return item.substring(item.indexOf('-')+1)
        }
    },

    created() {
        for (let index = 1; index <= window.espd_doc.procedure.number_of_lots; index++) {
            this.options.push(`LOT-${index.toString().padStart(4,"0")}`)
        }
        if (window.espd_doc.role == 'ca'){
            for (const key in this.meta_espd_doc.partIV) {
                if (Object.hasOwn(this.meta_espd_doc.partIV, key)) {
                    for (const el of this.meta_espd_doc.partIV[key]) {
                        this.espd_structure.partIV[key].push(`${window.espd_doc.espd_version}-${el}`)
                        window.espd_model[el].lots = this.options
                    }
                }
            }
        }
        //Build the UI part for each Criteria
        if (window.espd_doc.role == 'eo') {
            for (const key in this.meta_espd_doc.partIV) {
                if (Object.hasOwn(this.meta_espd_doc.partIV, key)) {
                    for (const el of this.meta_espd_doc.partIV[key]) {
                        this.espd_structure.partIV[key].push(`${window.espd_doc.espd_version}-${el}`)
                        window.espd_model[el].lots = this.options
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
            <b-card-body v-if="window.espd_doc.role=='ca'" v-for="item in meta_espd_doc['partIV']['A']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
                <!-- LOT management -->
                <b-form-group label="LOT Management" label-for="tags-component-select_item">
                <b-form-tags id="tags-component-select_item" v-model="espd_model[item].lots"
                    size="lg" class="mb-2" add-on-change no-outer-focus>
                    <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                        </li>
                    </ul>
                    <b-form-select v-bind="inputAttrs" v-on="inputHandlers" :disabled="disabled || options.length === 0" :options="options">
                        <template #first>
                        <!-- This is required to prevent bugs with Safari -->
                        <option disabled value="">Choose a LOT...</option>
                        </template>
                    </b-form-select>
                    </template>
                </b-form-tags>
                </b-form-group>
            </b-card-body>
            <b-card-body v-if="window.espd_doc.role=='eo'" v-for="item in espd_structure['partIV']['A']">
                
                <!-- LOT management -->
                <b-form-group label="LOT Management" label-for="tags-component-select_item">
                <b-form-tags id="tags-component-select_item" v-model="espd_model[item.substring(item.indexOf('-')+1)].lots"
                    size="lg" class="mb-2" add-on-change no-outer-focus>
                    <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                        </li>
                    </ul>
                    <b-form-select v-bind="inputAttrs" v-on="inputHandlers" :disabled="disabled || options.length === 0" :options="options">
                        <template #first>
                        <!-- This is required to prevent bugs with Safari -->
                        <option disabled value="">Choose a LOT...</option>
                        </template>
                    </b-form-select>
                    </template>
                </b-form-tags>
                </b-form-group>
                
                <component v-bind:is="item"></component>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s2 variant="info">B: Economic and financial standing</b-button>
        </b-card-header>
        <b-collapse id="accordion-s2" accordion="my-accordion" role="tabpanel">
            <b-card-body v-if="window.espd_doc.role=='ca'" v-for="item in meta_espd_doc['partIV']['B']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
                <!-- LOT management -->
                <b-form-group label="LOT Management" label-for="tags-component-select_item">
                <b-form-tags id="tags-component-select_item" v-model="espd_model[item].lots"
                    size="lg" class="mb-2" add-on-change no-outer-focus>
                    <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                        </li>
                    </ul>
                    <b-form-select v-bind="inputAttrs" v-on="inputHandlers" :disabled="disabled || options.length === 0" :options="options">
                        <template #first>
                        <!-- This is required to prevent bugs with Safari -->
                        <option disabled value="">Choose a LOT...</option>
                        </template>
                    </b-form-select>
                    </template>
                </b-form-tags>
                </b-form-group>                
            </b-card-body>
            <b-card-body v-if="window.espd_doc.role=='eo'" v-for="item in espd_structure['partIV']['B']">
                <component v-bind:is="item"></component>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s3 variant="info">C: Technical and professional ability</b-button>
        </b-card-header>
        <b-collapse id="accordion-s3" accordion="my-accordion" role="tabpanel">
            <b-card-body v-if="window.espd_doc.role=='ca'" v-for="item in meta_espd_doc['partIV']['C']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
                <!-- LOT management -->
                <b-form-group label="LOT Management" label-for="tags-component-select_item">
                <b-form-tags id="tags-component-select_item" v-model="espd_model[item].lots"
                    size="lg" class="mb-2" add-on-change no-outer-focus>
                    <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                        </li>
                    </ul>
                    <b-form-select v-bind="inputAttrs" v-on="inputHandlers" :disabled="disabled || options.length === 0" :options="options">
                        <template #first>
                        <!-- This is required to prevent bugs with Safari -->
                        <option disabled value="">Choose a LOT...</option>
                        </template>
                    </b-form-select>
                    </template>
                </b-form-tags>
                </b-form-group>
            </b-card-body>
            <b-card-body v-if="window.espd_doc.role=='eo'" v-for="item in espd_structure['partIV']['C']">
                <component v-bind:is="item"></component>
            </b-card-body>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-s4 variant="info">D: Quality assurance schemes and environmental management standards</b-button>
        </b-card-header>
        <b-collapse id="accordion-s4" accordion="my-accordion" role="tabpanel">
            <b-card-body v-if="window.espd_doc.role=='ca'" v-for="item in meta_espd_doc['partIV']['D']">
                <strong>{{ espd_model[item].name }}</strong>
                <p>{{ espd_model[item].description }}</p>
                <!-- LOT management -->
                <b-form-group label="LOT Management" label-for="tags-component-select_item">
                <b-form-tags id="tags-component-select_item" v-model="espd_model[item].lots"
                    size="lg" class="mb-2" add-on-change no-outer-focus>
                    <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                        </li>
                    </ul>
                    <b-form-select v-bind="inputAttrs" v-on="inputHandlers" :disabled="disabled || options.length === 0" :options="options">
                        <template #first>
                        <!-- This is required to prevent bugs with Safari -->
                        <option disabled value="">Choose a LOT...</option>
                        </template>
                    </b-form-select>
                    </template>
                </b-form-tags>
                </b-form-group>
            </b-card-body>
            <b-card-body v-if="window.espd_doc.role=='eo'" v-for="item in espd_structure['partIV']['D']">
                <component v-bind:is="item"></component>
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
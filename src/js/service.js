Vue.component("service", {
    data() {
        return {
            espd_doc: '',
            raw_data: null,
            versions: [{ value: null, text: 'Select an option' }],
            models: [{ value: null, text: 'Select an option' }],
            version: '',
            model: '',
            startComponent: 'startComponent',
            procedureComponent: 'procedureComponent',
            exclusionComponent: 'exclusionGrounds',
            selectionComponent: 'selectionCriteria',
            finishComponent: 'ESPDdownload',
            show: true
        }
    },

    methods: {
        updateESPDDoc(item) {
            //console.log(item);
            for (const key in item) {
                if (Object.hasOwn(item, key)) {
                    this.espd_doc[key] = item[key];
                }
            }
        }
    },

    created() {
        const dataURL = ['ESPD/model/']

        const getData = async () => {
            try {
                let thecall = await fetch(`${dataURL}/model.json`)
                let data = await thecall.json()
                if (thecall.ok) {
                    this.raw_data = data.models
                    this.versions = []
                    this.models = []
                    for (const key in this.raw_data) {
                        if (Object.hasOwn(this.raw_data, key)) {
                            this.versions.push(key)
                            this.version = this.versions[0]
                            this.models = this.raw_data[key]
                            this.model = this.models[0].value
                        }
                    }
                }
            } catch (error) {
                console.log("Error!", error);
            }
        }

        getData()
    },

    template: `
    <b-card title="ESPD Examples Generator">
        <b-card-text>
        Select the ESPD version and generate the ESPD Request and Response examples as Contracting Authority or Economic Operator.
        You can create and test ESDP Requests as Contracting Authority and ESPD Responses as Economic Operator.
        </b-card-text>

        <div>
        <b-tabs content-class="mt-3" justified>
            <b-tab>
            <template #title>
                <b-icon icon="collection-play" aria-hidden="true"></b-icon> <strong>Start</strong>
            </template>
            <component v-bind:is="startComponent" v-on:updateESPDDoc="updateESPDDoc"></component>
            </b-tab>
            
            <b-tab>
            <template #title>
                <b-icon icon="bank" aria-hidden="true"></b-icon> <strong>Procedure</strong>
            </template>
            <component v-bind:is="procedureComponent" v-on:updateESPDDoc="updateESPDDoc"></component>
            </b-tab>
            
            <b-tab>
            <template #title>
                <b-icon icon="exclamation-octagon" aria-hidden="true"></b-icon> <strong>Exclusion</strong>
            </template>
            <component v-bind:is="exclusionComponent" v-on:updateESPDDoc="updateESPDDoc"></component>
            </b-tab>
            
            <b-tab>
            <template #title>
                <b-icon icon="shield-fill-check" aria-hidden="true"></b-icon> <strong>Selection</strong>
            </template>
            <component v-bind:is="selectionComponent" v-on:updateESPDDoc="updateESPDDoc"></component>
            </b-tab>
            
            <b-tab>
            <template #title>
                <b-icon icon="cloud-download" aria-hidden="true"></b-icon> <strong>Finish</strong>
            </template>
            <component v-bind:is="finishComponent" v-on:updateESPDDoc="updateESPDDoc"></component>
            </b-tab>
        </b-tabs>
        </div>
    </b-card> 
    `
});
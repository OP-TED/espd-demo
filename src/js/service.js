Vue.component("service",{
    data(){
        return {
            startComponent: 'startComponent',
            procedureComponent: 'procedureComponent',
            show: true
        }
    },

    created(){
        //Create new empty document in PouchDB
        delsert('esdp_doc')
    },

    template: `
    <b-card title="ESPD Examples Generator">
        <b-card-text>
        Select the ESPD version and generate the ESPD Request and Response examples as Contracting Authority or Economic Operator.
        You can create, edit and test ESDP Requests and ESPD Responses.
        </b-card-text>

        <div>
        <b-tabs content-class="mt-3" justified>
            <b-tab>
            <template #title>
                <b-icon icon="collection-play" aria-hidden="true"></b-icon> <strong>Start</strong>
            </template>
            <component v-bind:is="startComponent"></component>
            </b-tab>
            
            <b-tab>
            <template #title>
                <b-icon icon="bank" aria-hidden="true"></b-icon> <strong>Procedure</strong>
            </template>

            <component v-bind:is="procedureComponent"></component>
            </b-tab>
            
            <b-tab>
                <template #title>
                    <b-icon icon="exclamation-octagon" aria-hidden="true"></b-icon> <strong>Exclusion</strong>
                </template>
                <p>I'm the tab with the very, very long title</p>
            </b-tab>
            
            <b-tab>
                <template #title>
                    <b-icon icon="shield-fill-check" aria-hidden="true"></b-icon> <strong>Selection</strong>
                </template>
                <p>I'm a disabled tab!</p>
            </b-tab>
            
            <b-tab>
            <template #title>
                <b-icon icon="cloud-download" aria-hidden="true"></b-icon> <strong>Finish</strong>
            </template>
                <p>Last step</p>
            </b-tab>
        </b-tabs>
        </div>
    </b-card> 
    `
});
Vue.component("service", {

    data() {
        
        return {
            survey: ESPD_SURVEY,
            show: true
        }
    },

    created() {
        window.espd_doc = {}
        //build this.survey based on the espd_edm_vx.x.x.json files, plase pay attention to version specific sections
    },

    template: `
    <b-card class="mt-2" title="ESPD Examples Generator">
        <b-card-text>
        Select the desired ESPD version and generate either ESPD Request examples as a Contracting Authority, or ESPD Response examples as an Economic Operator. Fill in the corresponding fields and click Next to complete the forms. You can download the generated XML document at the end.
        </b-card-text>
        <survey :survey="survey" />        
    </b-card> 
    `
});
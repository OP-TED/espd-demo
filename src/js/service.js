Vue.component("service",{
    data: function(){
        return {
            show: true
        }
    },

    template: `
    <b-card title="ESPD Examples Generator">
    <b-card-text>
    Select the ESPD version and generate the ESPD Request and Response examples as Contracting Authority or Economic Operator.
    You can create, edit and test ESDP Requests and ESPD Responses.
    </b-card-text>
  </b-card> 
    `
});
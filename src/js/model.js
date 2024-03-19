Vue.component("model", {
  data: function () {
    return {
      show: true
    }
  },

  template: `
  <b-card title="ESPD Model viewer">
    <b-card-text>
    Select the ESPD version and the Criterion and show the HTML represenation of the ESPD model.
    </b-card-text>
  </b-card>  
    `
});
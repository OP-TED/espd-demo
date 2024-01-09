Vue.component("home",{
    data: function(){
        return {
            show: true
        }
    },

    template: `
    <b-container fluid class="m-auto">
    <p>This site is a collection of Demo applications allowing you to get familiar with ESPD model
    and service. This site is provide for educational and training purpouse. It does not constitute an
    official implementation of the ESPD service.</p>
    <p>Feel free to download or copy-and-paste any parts of this example.</p>
    </b-container>
    `
});
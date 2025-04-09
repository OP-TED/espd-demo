Vue.component("home",{
    data: function(){
        return {
            show: true
        }
    },
    methods: {
        quickTour(){
            this.$root.$emit('bv::popover::show', 'povDistribution')
        }
    },

    template: `
        <b-jumbotron class="mt-2" >
            <template #header>
                ESPD Demo Site
            </template>
            <template #lead>
                Your ESPD journey starts here! We would like to guide and assist you in succeeding in your ESPD Service implementation.
            </template>

            <hr class="my-4">
            <p>ESPD Demo website is a collection of tools that allow you to download ESPD artefacts, explore the ESPD model, and generate ESPD request and response examples. The site is provided for educational and training purposes only - it is not an implementation of an ESPD Service. The ESPD Demo is a playground that you can explore to get familiar with the ESPD, follow the user experience, and generate ESPD documents.</p> 
            
            <p>
            We would like your feedback. For any issues or comments you have with or about this site please contact us via email at <br/> <h2><a href="mailto:OPESPD@publications.europa.eu">OPESPD@publications.europa.eu</a>,</h2> or <a href="https://github.com/OP-TED/espd-demo/issues">open a ticket on GitHub</a>. Feel free to download or use any parts of the code of this site from our <a href="https://github.com/OP-TED/espd-demo">GitHub repository</a>. The code is distributed under the <a href="https://github.com/OP-TED/espd-demo/blob/main/LICENCE">EUROPEAN UNION PUBLIC LICENCE v. 1.2</a>.</p>

            <p>If you are new to the ESPD Demo site, we recommend that you take our quick tour.</p>
            <b-button @click="quickTour"  variant="primary">Start Quick Tour</b-button>

        </b-jumbotron>
    `
});

Vue.component("home",{
    data: function(){
        return {
            show: true
        }
    },

    template: `
    
        <b-jumbotron class="mt-2" >
            <template #header>ESPD Demo Site</template>

            <template #lead>
            <p>ESPD Demo website is a collection of tools that allow you to download ESPD artefacts, explore the ESPD model, and generate ESPD request and response examples. The site is provided for educational and training purposes only - it is not an implementation of an ESPD Service. The ESPD Demo is a playground that you can explore to get familiar with the ESPD, follow the user experience, and generate ESPD documents.</p> 
            
            <p>
            We would like your feedback. For any issues or comments you have with or about this site please contact us via email at <a href="mailto:OPESPD@publications.europa.eu">OPESPD@publications.europa.eu</a>, or <a href="https://github.com/OP-TED/espd-demo/issues">open a ticket on GitHub</a>. Feel free to download or use any parts of the code of this site from our <a href="https://github.com/OP-TED/espd-demo">GitHub repository</a>. The code is distributed under the <a href="https://github.com/OP-TED/espd-demo/blob/main/LICENCE">EUROPEAN UNION PUBLIC LICENCE v. 1.2</a>.</p>
            </template>

            <hr class="my-4">

            <p>
            Your ESPD journey starts here! We would like to guide and assist you in succeeding in your ESPD Service implementation.
            </p>

        </b-jumbotron>
    `
});
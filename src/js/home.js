Vue.component("home",{
    data: function(){
        return {
            show: true
        }
    },

    template: `
    <b-container fluid class="m-auto">
        <b-jumbotron class="mt-2">
            <template #header>ESPD Demo Site</template>

            <template #lead>
            <p>ESPD Demo web site is a collection of Tools allowing you to download ESPD arterfacts, to explore ESPD model and to generate ESPD Request and ESPD Response examples. This site is provided for educational and training purpouses. It does not constitute an official implementation of the ESPD Service. ESDP Demo is a Playground to get familiar with ESPD, to enjoy the User Experience, and to generate ESDP documents.</p> 
            
            <p>We would like to get your feedback. You can contact us via email at <a href="mailto:OPESPD@publications.europa.eu">OPESPD@publications.europa.eu</a>, for any issues with this site you can <a href="https://github.com/OP-TED/espd-demo/issues">open a ticket on GitHub</a>. Feel free to download or use any parts of the code of this site from our <a href="https://github.com/OP-TED/espd-demo">GitHub repository</a>. The code is distributed under <a href="https://github.com/OP-TED/espd-demo/blob/main/LICENCE">EUROPEAN UNION PUBLIC LICENCE v. 1.2</a>.</p>
            
            </template>

            <hr class="my-4">

            <p>
            Your ESPD journey starts here! We would like to guide and assist you in your successful ESPD Service implementation.
            </p>

        </b-jumbotron>
    </b-container>
    `
});
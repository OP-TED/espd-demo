Vue.component("distribution",{
    data: function(){
        return {
            version:'',
            versions: [],
            show: true
        }
    },

    methods:{
        selectVersion(event){
            console.log(event);
        },
        ExportExcel(what){

        },
        DownloadZIP(what){

        }
    },

    created(){

    },

    template: `
  <b-card title="ESPD Distribution">
    <b-card-text>
    Select the ESPD version and generate the ESPD Distribution ZIP files. The archives contain Code Lists and Model files. The Excel files can be downloaded separately.
    </b-card-text>

    <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="ESPD version" label-for="input-espdversion">
            <b-form-select id="input-espdversion" v-model="version" :options="versions" @change="selectVersion($event)"></b-form-select>
        </b-form-group>
    
    <b-row>
        <b-col >
        Code Lists
        </b-col>
        <b-col  cols="10">
        <a href="#" id='excel_file' name='excel_file' class="card-link"></a>
        <b-button class="mb-3 mr-sm-2" pill @click="ExportExcel('codelist')" variant="warning">Create Excel</b-button>
        <b-button class="mb-3" pill @click="DownloadZIP('codelist')" variant="success">Download all XML files as ZIP archive</b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col >
        Model and Data structure
        </b-col>
        <b-col  cols="10">
        <a href="#" id='excel_file' name='excel_file' class="card-link"></a>
        <b-button class="mb-3 mr-sm-2" pill @click="ExportExcel('codelist')" variant="warning">Create Excel</b-button>
        </b-col>
    </b-row>   

  </b-card> 
    `
});
Vue.component("model", {
  data: function () {
    return {
      raw_data: null,
      versions: [{value: null, text:'Select an option'}],
      models: [{value: null, text:'Select an option'}],
      version: '',
      model: '',
      show: true
    }
  },

  methods:{
    selectVersion(event){
      console.log(event);
      this.models = this.raw_data[this.version]
      this.model = this.models[0].value
    },
    selectModel(event){
      console.log(event)
      this.model = event

    }
  },

  created(){
    const dataURL = ['ESPD/model/']

    const getData = async () => {
      try {
        let thecall = await fetch(`${dataURL}/model.json`)
        let data = await thecall.json()
        if (thecall.ok) {
            this.raw_data = data.models
            this.versions= []
            this.models = []
            for (const key in this.raw_data) {
              if (Object.hasOwn(this.raw_data, key)) {
                this.versions.push(key)
              }
            }
            this.version = this.versions[0]
            this.models = this.raw_data[this.version]
            this.model = this.models[0].value
        }
      }catch(error){
        console.log("Error!", error);
      }
    }

    getData()
  },

  template: `
  <b-card title="ESPD Model viewer">
    <b-card-text>
    Select the desired ESPD version and Criterion to show the HTML representation of the ESPD Model.    
    </b-card-text>
    
  <b-form-row class="mb-2" align-v="center">
    <b-col class="text-right">
    <label class="mr-sm-2" for="input-espdversion">ESPD version</label>
    </b-col>
    <b-col cols="1">
    <b-form-select id="input-espdversion" size="sm" v-model="version" :options="versions" @change="selectVersion($event)"></b-form-select>
    </b-col>
    <b-col cols="1" class="text-right">
    <label class="mr-sm-2" for="input-model">Criterion</label>
    </b-col>
    <b-col cols="8">
    <b-form-select id="input-model" size="sm" v-model="model" :options="models" @change="selectModel($event)"></b-form-select>
  </b-col>
  </b-form-row>
    <component :is="model"></component>
  </b-card>  
    `
});
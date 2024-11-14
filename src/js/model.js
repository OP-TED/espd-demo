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
    Select the ESPD version and the Criterion and show the HTML represenation of the ESPD model.
    </b-card-text>
  <b-row>
    <b-col  lg="4">
    <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" content-cols="2" label="ESPD version" label-for="input-espdversion">
            <b-form-select id="input-espdversion" v-model="version" :options="versions" @change="selectVersion($event)"></b-form-select>
    </b-form-group>
    </b-col>
    <b-col  lg="8">
    <b-form-group label-cols="1" label-cols-lg="1" label-size="sm" content-cols="10" label="Cirterion" label-for="input-model">
        <b-form-select id="input-model" v-model="model" :options="models" @change="selectModel($event)"></b-form-select>
    </b-form-group>
    </b-col>
  </b-row>
    <comonent :is="model"></component>
  </b-card>  
    `
});
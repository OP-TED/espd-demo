//Create i18n instance with options
const i18n = new VueI18n({
	locale: 'eu', // set locale
	fallbackLocale: 'eu', // set fallback locale
	messages, // set locale messages
	// If you need to specify other options, you can set other options
})

if (localStorage.getItem("language")) {
	i18n.locale = localStorage.getItem("language");
} else {
	sessionStorage.setItem("language", i18n.feedbackLocale);
}


Vue.use(Vuex)
/**
 * VueX global store
 */
const store = new Vuex.Store({
	state() {
		return {
			espd_doc: {},
			code_list: {},
			esdp_versions:[],
			cl_files: {},
		}
	},
	mutations: {
		savekv(state, payload) {
			state.espd_doc[payload.key] = payload.value
		},
		init_code_list(state) {
			GlobalPouchDB.get('code_lists', function (err, doc) {
				if (err) return console.log(err)
				state.code_list=doc.data
				state.esdp_versions = Object.keys(doc.data)
				let keys = []
				state.esdp_versions.forEach((v) => state.code_list[v].forEach((fn) => { keys.push(`${v}_${fn}`)}))
				GlobalPouchDB.allDocs({include_docs: true, keys: keys}, function(err, response){
					if (err) return console.log(err)
					for (const element of response.rows) {
						state.cl_files[element.doc._id] = element.doc.data
					}
				})
			})
		}
	}
})

// 1. Create a vue root instance
window.app = new Vue({
	i18n,
	store,
	el: '#app',
	data: {
		currentHeader: 'publicHeader',
		currentFooter: 'publicFooter',
		mainComponent: 'home',
		locales: ['eu', 'fr', 'ro'],
		povDistribution: false,
		povCodeLists: false,
		povUUID: false,
		povView: false,
		povExamples: false
	},

	methods: {
		showLayout(layout = { currentHeader: 'publicHeader', mainComponent: 'home', currentFooter: 'publicFooter' }) {
			this.mainComponent = layout.mainComponent
			this.currentHeader = layout.currentHeader
			this.currentFooter = layout.currentFooter
		},
		doShow(component) {
			this.showLayout({ currentHeader: 'publicHeader', mainComponent: component, currentFooter: 'publicFooter' })
			console.log(`show ${component}`)
		},
		showNext(step){
			this.povDistribution = false
			this.povCodeLists = false
			this.povUUID = false
			this.povView = false
			this.povExamples = false
			switch (step) {
				case 0:
					//
					break;
				case 1:
					this.povCodeLists = true
					break;
				case 2:
					this.povUUID = true
					break;
				case 3:
					this.povView = true
					break;
				case 4:
					this.povExamples = true
					break;
										
				default:
					this.povDistribution = false
					this.povCodeLists = false
					this.povUUID = false
					break;
			}
		}
	},

	mounted(){
		this.$root.$on('bv::popover::show', bvEventObj => {
			this[bvEventObj] = true
			console.log('bvEventObj:', bvEventObj)
		})
	}

})

window.app.showLayout({ currentHeader: 'publicHeader', mainComponent: 'home', currentFooter: 'publicFooter' })
store.commit('init_code_list')

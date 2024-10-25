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
			espd_doc: {}
		}
	},
	mutations: {
		savekv(state, payload) {
			state.espd_doc[payload.key] = payload.value
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
	}

})




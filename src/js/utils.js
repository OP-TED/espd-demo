// 0. Create i18n instance with options
const i18n = new VueI18n({
	locale: 'gb', // set locale
	fallbackLocale: 'gb', // set fallback locale
	messages, // set locale messages
	// If you need to specify other options, you can set other options
})

if (localStorage.getItem("language")) {
	i18n.locale = localStorage.getItem("language");
} else {
	sessionStorage.setItem("language", i18n.feedbackLocale);
}

//Global application database for local browser storage
var pdb = PouchDB('espd_demo')

//Auxiliary funciton for Bootsrap toast messages
function showToast(message, title='Message from server', type='info', href=''){
 window.app.$bvToast.toast(message,
   {
    title: title,
    toaster: 'b-toaster-bottom-center',
    href: href,
    solid: true,
    variant: type,
    appendToast: true
   })
}


const COUNTRY_LIST = [
  { value: null, text: 'Please select an option' },
  { value: 'AT', text: 'Austria' },
  { value: 'BE', text: 'Belgium' },
  { value: 'BG', text: 'Bulgaria' },
  { value: 'HR', text: 'Croatia' },
  { value: 'CY', text: 'Cyprus' },
  { value: 'CZ', text: 'Czechia' },
  { value: 'DK', text: 'Denmark' },
  { value: 'EE', text: 'Estonia' },
  { value: 'FI', text: 'Finland' },
  { value: 'FR', text: 'France' },
  { value: 'DE', text: 'Germany' },
  { value: 'GR', text: 'Greece' },
  { value: 'HU', text: 'Hungary' },
  { value: 'IE', text: 'Ireland' },
  { value: 'IT', text: 'Italy' },
  { value: 'LV', text: 'Latvia' },
  { value: 'LT', text: 'Lithuania' },
  { value: 'LU', text: 'Luxembourg' },
  { value: 'MT', text: 'Malta' },
  { value: 'NL', text: 'Netherlands' },
  { value: 'PL', text: 'Poland' },
  { value: 'PT', text: 'Portugal' },
  { value: 'RO', text: 'Romania' },
  { value: 'SK', text: 'Slovakia' },
  { value: 'SI', text: 'Slovenia' },
  { value: 'ES', text: 'Spain' },
  { value: 'SE', text: 'Sweden' },
]

//Get the day of the year
function getDay(date = new Date()) {
  return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
}

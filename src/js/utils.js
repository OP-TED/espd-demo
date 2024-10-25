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

/**
 * Auxiliary function for Bootsrap toast messages
 * 
 * @param {string} message - the message to be displayed 
 * @param {string} title - title of the window
 * @param {string} type - type of message box
 * @param {string} href - the link to be displayed
 */
function showToast(message, title = 'Message from server', type = 'info', href = '') {
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

/**
 * PouchDB global variable - browser persistent storage
 */

var GlobalPouchDB = new PouchDB('espd_demo')

/**
 * Upsert document in PouchDB
 *  - update if existing
 *  - insert if not existing
 * 
 * @param {string} docid - _id of the document 
 * @param {*} docdata - object containing data
 * @returns OK | NOK
 */
const pdb_upsert = async (docid, docdata) => {
  try {
    const tmp_doc = await GlobalPouchDB.get(docid)
    const response = await GlobalPouchDB.put({ _id: docid, _rev: tmp_doc._rev, data: docdata })
    console.log(response)
    return 'OK'
  } catch (error) {
    if (error.status == '404') {
      try {
        const response = await GlobalPouchDB.put({ _id: docid, data: docdata })
        console.log(response)
        return 'OK'
      } catch (err) {
        console.log(err)
        return 'KO'
      }
    }
    console.log(error)
    return 'KO'
  }
}

/**
 * Load data - the general structure
 * {
 *  _id: [code_lists | espd_meta | espd_edm_v3.3.0 | espd_edm_v4.0.0 | uuid]
 *  data: <object with specific data>
 * }
 */
const loadData = async () => {
  try {

    let myCall = await fetch('ESPD/codelists/codelist.json')
    let data = await myCall.json()
    if (myCall.ok) {
      //store code_lists in PouchDB
      const response = await pdb_upsert('code_lists', data.code_lists)
      console.log(response);
    }

    myCall = await fetch('ESPD/examples/espd.json')
    data = await myCall.json()
    if (myCall.ok) {
      const response = await pdb_upsert('espd_meta', data.versions)
      console.log(response)
    }

    myCall = await fetch('ESPD/model/espd_edm_v3.3.0.json')
    data = await myCall.json()
    if (myCall.ok) {
      const response = await pdb_upsert('espd_edm_v3.3.0', data)
      console.log(response)
    }

    myCall = await fetch('ESPD/model/espd_edm_v4.0.0.json')
    data = await myCall.json()
    if (myCall.ok) {
      const response = await pdb_upsert('espd_edm_v4.0.0', data)
      console.log(response)
    }

    myCall = await fetch('ESPD/uuid/uuid.json')
    data = await myCall.json()
    if (myCall.ok) {
      const response = await pdb_upsert('uuid', data.uuid_files)
      console.log(response)
    }
  } catch (error) {
    console.log(error)

  }
}
loadData()


/**
 * Setup Web Worker
 */
var webConsultant = null
if (window.Worker) {
  console.log('Web Worker enbaled!');

  webConsultant = new Worker("src/js/worker.js")
  webConsultant.postMessage("INIT")

  webConsultant.onmessage = (e) => {
    console.log(e.data);

  }
}
//function to fetch a remote file for inclusion in ZIP archive
function urlToPromise(url) {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};


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

/**
 * ESPD specific structures
 */

//Tags mapped to elements from the Excel 
const tag_map = {
  'CRITERION': 'C',
  'ADDITIONAL_DESCRIPTION_LINE': 'ADL',
  'SUBCRITERION': 'SBC',
  'LEGISLATION': 'L',
  'REQUIREMENT_GROUP': 'RG',
  'QUESTION_GROUP': 'QG',
  'REQUIREMENT_SUBGROUP': 'RSG',
  'QUESTION_SUBGROUP': 'QSG',
  'CAPTION': 'CA',
  'REQUIREMENT': 'RQ',
  'QUESTION': 'Q',
  'RESPONSE': 'R',
  'RESPONSE VALUE': 'RV',
  'EVIDENCE SUPPLIED': 'RES',
  'APPLICABLE PERIOD': 'RAP',
}


function download(filename, text) {
  var element = document.createElement('a');
  //var bb = new Blob([text], {type: 'text/plain'})

  //element.setAttribute('href', window.URL.createObjectURL(bb));
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  //element.dataset.downloadurl = ['text/plain', element.download, element.href].join(':');
  //element.draggable = true; 
  //element.classList.add('dragout');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/**
 * 
 * Convert date and time from JavaScript format to XML format
 * 
 * @param {string} what 
 * @param {Date} date 
 * @returns {string} result
 */
function JS2XML(what, date = new Date()) {
  let result = ''
  switch (what) {
    case 'date':
      result = date.toISOString().substring(0, 10)
      break;

    case 'time':
      result = date.toISOString().substring(11)
      break;
    default:
      break;
  }

  return result
}

/**
 *  Transofrom a string into a JavaScript Property
 *  JavaScript identfier can nontain Unicode letters, $, _ and digits, and may not start with a digit
 */
var stringToProperty = function(str){

  const dict = [
      { what_to_replace: '-', to_replace_with: '__'},
      { what_to_replace: '/', to_replace_with: '$'},
      { what_to_replace: '@', to_replace_with: '$$'}
  ]

  let result= str

  for (const element of dict) {
      result = result.replaceAll(element.what_to_replace, element.to_replace_with)
  }

  return result
}

/**
 * Render the elementes of JSON to XML ESPD Request, and ESPD Response - the Request part
 * 
 * @param {*} obj - the ESPD Request or part of ESPD Request to be rendered
 * @param {*} [part=window.espd_request] - ESPD Response XML document 
 * @param {boolean} [EG_FLAG=true] - true if the part is an Exclusion Ground 
 */
function render_request(obj, part = window.espd_request, EG_FLAG = true) {
  let tmp = part, schemeVersionID = window.espd_doc.espd_version.substring(1)
  for (const elm in obj) {

    if (Object.hasOwn(obj, elm)) {
      const element = obj[elm]
      switch (element.type) {
        case "CRITERION":

          //All Selection Criteria must have a Lot
          if (element.tag.endsWith('SC')) {
            tmp = part.com(` Criterion: ${element.name} `)
              .ele('@cac', 'TenderingCriterion')
              .ele('@cbc', 'ID', { 'schemeID': 'Criterion', 'schemeAgencyID': 'OP', 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
              .ele('@cbc', 'CriterionTypeCode', { 'listID': "http://publications.europa.eu/resource/authority/criterion", 'listAgencyID': "OP", 'listVersionID': "20230315-0" }).txt(element.elementcode).up()
              .ele('@cbc', 'Name').txt(element.name).up()
              .ele('@cbc', 'Description').txt(element.description).up()

            //add lots here cac:ProcurementProjectLot
            for (let index = 0; index < element.lots.length; index++) {
              tmp = tmp.ele('@cac', 'ProcurementProjectLotReference')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "OP", 'schemeVersionID': schemeVersionID }).txt(element.lots[index]).up()
                .up()
            }
          } else {
            tmp = part.com(` Criterion: ${element.name} `)
              .ele('@cac', 'TenderingCriterion')
              .ele('@cbc', 'ID', { 'schemeID': 'Criterion', 'schemeAgencyID': 'OP', 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
              .ele('@cbc', 'CriterionTypeCode', { 'listID': "http://publications.europa.eu/resource/authority/criterion", 'listAgencyID': "OP", 'listVersionID': "20230315-0" }).txt(element.elementcode).up()
              .ele('@cbc', 'Name').txt(element.name).up()
              .ele('@cbc', 'Description').txt(element.description).up()
          }
          //create the inner elements
          if (Object.hasOwn(element, 'components')) render_request(element.components, tmp, element.tag.endsWith('- EG'))
          part.up()

          break;
        case "SUBCRITERION":
          tmp = part.ele('@cac', 'SubTenderingCriterion')
            .ele('@cbc', 'ID', { 'schemeID': 'Criterion', 'schemeAgencyID': 'OP', 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
            .ele('@cbc', 'Name').txt(element.name).up()
            .ele('@cbc', 'Description').txt(element.description).up()
          //create the inner elements
          if (Object.hasOwn(element, 'components')) render_request(element.components, tmp, EG_FLAG)
          part.up()
          break;
        case "LEGISLATION":
          tmp = part.ele('@cac', 'Legislation')
            .ele('@cbc', 'ID', { 'schemeID': 'Criterion', 'schemeAgencyID': 'OP', 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
            .ele('@cbc', 'Title').txt('[Legislation Title]').up()
            .ele('@cbc', 'Description').txt('[Legislation Description]').up()
            .ele('@cbc', 'JurisdictionLevel').txt('EU').up()
            .ele('@cbc', 'Article').txt('[Article, e.g. Article 2.I.a]').up()
            .ele('@cbc', 'URI').txt('http://eur-lex.europa.eu/').up()
            .ele('@cac', 'Language')
            .ele('@cbc', 'LocaleCode', { 'listID': "http://publications.europa.eu/resource/authority/language", 'listAgencyID': "ISO", 'listVersionID': "20220928-0" }).txt('ENG').up()
            .up()
            .up()
          //create the inner elements
          if (Object.hasOwn(element, 'components')) render_request(element.components, tmp, EG_FLAG)
          part.up()
          break;
        case "ADDITIONAL_DESCRIPTION_LINE":
          tmp = part.ele('@cbc', 'Description').txt(element.description).up()
          /*
          if (!EG_FLAG)
            tmp = part.ele('@cac', 'ProcurementProjectLotReference')
              .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "OP", 'schemeVersionID': schemeVersionID }).txt('LOT-0000').up()
              .up()
          */
          //create the inner elements
          if (Object.hasOwn(element, 'components')) render_request(element.components, tmp, EG_FLAG)
          part.up()
          break;
        case "REQUIREMENT_GROUP": case "QUESTION_GROUP":
          //render only 1st occurence in Request
          if (Object.hasOwn(element, 'cardinality') && typeof element.cardinality === 'string') {
            //log(element.cardinality, typeof element.cardinality)              
            if (element.cardinality.indexOf("(2)") != -1 ||
              element.cardinality.indexOf("(3)") != -1 ||
              element.cardinality.indexOf("(4)") != -1)
              break;
          }
          tmp = part.ele('@cac', 'TenderingCriterionPropertyGroup')
            .ele('@cbc', 'ID', { 'schemeID': 'Criterion', 'schemeAgencyID': 'OP', 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
            .ele('@cbc', 'PropertyGroupTypeCode', { 'listID': "property-group-type", 'listAgencyID': "OP", 'listVersionID': schemeVersionID }).txt(element.elementcode).up()

          //create the inner elements
          if (Object.hasOwn(element, 'components')) render_request(element.components, tmp, EG_FLAG)
          part.up()
          break;
        case "REQUIREMENT_SUBGROUP": case "QUESTION_SUBGROUP":
          //render only 1st occurence in Request
          if (Object.hasOwn(element, 'cardinality') && typeof element.cardinality === 'string') {
            //log(element.cardinality, typeof element.cardinality)
            if (element.cardinality.indexOf("(2)") != -1 ||
              element.cardinality.indexOf("(3)") != -1 ||
              element.cardinality.indexOf("(4)") != -1)
              break;
          }
          tmp = part.ele('@cac', 'SubsidiaryTenderingCriterionPropertyGroup')
            .ele('@cbc', 'ID', { 'schemeID': 'Criterion', 'schemeAgencyID': 'OP', 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
            .ele('@cbc', 'PropertyGroupTypeCode', { 'listID': "property-group-type", 'listAgencyID': "OP", 'listVersionID': schemeVersionID }).txt(element.elementcode).up()

          //create the inner elements
          if (Object.hasOwn(element, 'components')) render_request(element.components, tmp, EG_FLAG)
          part.up()
          break;
        case "QUESTION": case "CAPTION":
          element.elementUUID = crypto.randomUUID()
          part.ele('@cac', 'TenderingCriterionProperty')
            .ele('@cbc', 'ID', { 'schemeID': 'Criterion', 'schemeAgencyID': 'OP', 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
            .ele('@cbc', 'Name').txt(element.name).up()
            .ele('@cbc', 'Description').txt(element.description).up()
            .ele('@cbc', 'TypeCode', { 'listID': "criterion-element-type", 'listAgencyID': "OP", 'listVersionID': schemeVersionID }).txt(element.type).up()
            .ele('@cbc', 'ValueDataTypeCode', { 'listID': "response-data-type", 'listAgencyID': "OP", 'listVersionID': schemeVersionID }).txt(Object.hasOwn(element, 'propertydatatype') ? element.propertydatatype : 'NONE').up()
            .up()
          break;
        case "REQUIREMENT":
          element.elementUUID = crypto.randomUUID()
          tmp = part.ele('@cac', 'TenderingCriterionProperty')
            .ele('@cbc', 'ID', { 'schemeID': 'Criterion', 'schemeAgencyID': 'OP', 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
            .ele('@cbc', 'Name').txt(element.name).up()
            .ele('@cbc', 'Description').txt(element.description).up()
            .ele('@cbc', 'TypeCode', { 'listID': "criterion-element-type", 'listAgencyID': "OP", 'listVersionID': schemeVersionID }).txt(element.type).up()
            .ele('@cbc', 'ValueDataTypeCode', { 'listID': "response-data-type", 'listAgencyID': "OP", 'listVersionID': schemeVersionID }).txt(Object.hasOwn(element, 'propertydatatype') ? element.propertydatatype : 'NONE').up()
            .com(' No answer is expected here from the economic operator, as this is a REQUIREMENT issued by the contracting authority. Hence the element "cbc:ValueDataTypeCode" contains the type of value of the requirement issued by the contracting authority  ')

          switch (element.propertydatatype) {
            case 'AMOUNT':
              tmp.ele('@cbc', 'ExpectedAmount', { 'currencyID': 'EUR' }).txt(element.sellervalue ? element.sellervalue : 0).up()
              break;
            case 'IDENTIFIER': case "EVIDENCE_IDENTIFIER": case "ECONOMIC_OPERATOR_IDENTIFIER": case "LOT_IDENTIFIER":
              tmp.ele('@cbc', 'ExpectedID', { 'schemeAgencyID': 'OP' }).txt(element.sellervalue).up()
              break;
            case 'CODE_BOOLEAN':
              tmp.ele('@cbc', 'ExpectedCode', { 'listID': 'boolean-gui-control-type', 'listAgencyID': 'OP', 'listVersionID': schemeVersionID }).txt(element.sellervalue).up()
              break;
            case 'CODE_COUNTRY':
              tmp.ele('@cbc', 'ExpectedCode', { 'listID': "http://publications.europa.eu/resource/authority/country", 'listName': "country", 'listAgencyID': "ISO", 'listVersionID': "20220928-0" }).txt(element.sellervalue).up()
              break;
            case 'ECONOMIC_OPERATOR_ROLE_CODE':
              tmp.ele('@cbc', 'ExpectedCode', { 'listID': "http://publications.europa.eu/resource/authority/eo-role-type", 'listAgencyID': "OP", 'listVersionID': "20211208-0" }).txt(element.sellervalue).up()
              break;
            case 'DESCRIPTION':
              tmp.ele('@cbc', 'ExpectedDescription').txt(element.sellervalue).up()
              break;
            case 'PERCENTAGE':
              tmp.ele('@cbc', 'ValueUnitCode').txt('PERCENTAGE').up()
                .ele('@cbc', 'ExpectedValueNumeric').txt(element.sellervalue ? element.sellervalue : 0).up()
              break;
            case 'DATE': case 'PERIOD':
              tmp.ele('@cac', 'ApplicablePeriod')
                .ele('@cbc', 'StartDate').txt(element.sellervalue ? element.sellervalue : '2000-01-01').up()
                .ele('@cbc', 'EndDate').txt(element.sellervalue ? element.sellervalue : '2000-12-31').up()
                .up()
              break;
            case 'QUANTITY_INTEGER': case 'QUANTITY_YEAR': case 'QUANTITY':
              tmp.ele('@cbc', 'ExpectedValueNumeric').txt(element.sellervalue ? element.sellervalue : 0).up()
              break;
            case 'MAXIMUM_AMOUNT':
              tmp.ele('@cbc', 'MaximumAmount', { 'currencyID': 'EUR' }).txt(element.sellervalue ? element.sellervalue : 0).up()
              break;
            case 'MINIMUM_AMOUNT':
              tmp.ele('@cbc', 'MinimumAmount', { 'currencyID': 'EUR' }).txt(element.sellervalue ? element.sellervalue : 0).up()
              break;
            case 'MAXIMUM_VALUE_NUMERIC':
              tmp.ele('@cbc', 'MaximumValueNumeric').txt(element.sellervalue).up()
              break;
            case 'MINIMUM_VALUE_NUMERIC':
              tmp.ele('@cbc', 'MinimumValuenumeric').txt(element.sellervalue).up()
              break;
            case 'TRANSLATION_TYPE_CODE':
              tmp.ele('@cbc', 'TranslationTypeCode').txt(element.sellervalue).up()
              break;
            case 'COPY_QUALITY_TYPE_CODE':
              tmp.ele('@cbc', 'CopyQualityTypeCode').txt(element.sellervalue).up()
              break;
            case 'CERTIFICATION_LEVEL_DESCRIPTION':
              tmp.ele('@cbc', 'CertificationLevelDescription').txt(element.sellervalue).up()
              break;

            case 'CODE':
              if (element.codelist == 'Occupation') tmp.ele('@cbc', 'ExpectedCode', { 'listID': "http://publications.europa.eu/resource/authority/occupation", 'listAgencyID': "EMPL", 'listVersionID': "20221214-0" }).txt('DV').up()
              if (element.codelist == 'FinancialRatioType') tmp.ele('@cbc', 'ExpectedCode', { 'listID': "financial-ratio-type", 'listAgencyID': "OP", 'listVersionID': schemeVersionID }).txt('DV').up()
              if (element.codelist == 'EORoleType') tmp.ele('@cbc', 'ExpectedCode', { 'listID': "http://publications.europa.eu/resource/authority/eo-role-type", 'listAgencyID': "OP", 'listVersionID': "20211208-0" }).txt('DV').up()
              break;

            default:
              tmp.com(' PropertyDataType not defined')
              break;
          }

          part.up()
          break;
        default:
          part.com(` Unkown ${element.type} - UBL mapping not implemented `).up()
          break;
      }
    }
  }
}

/**
 * Render the elements of JSON to XML ESPD Response
 * 
 * @param {*} obj - the ESPD Response or part of ESPD Response to be rendered
 * @param {*} [part=window.espd_response] - ESPD Response XML document
 * @param {string} [crt_criterion='NONE'] - current criterion to be rendered
 */
function render_response(obj, part = window.espd_response, crt_criterion = 'NONE') {
  let tmp = part, schemeVersionID = window.espd_doc.espd_version.substring(1)

  for (const elm in obj) {
    if (Object.hasOwn(obj, elm)) {
      const element = obj[elm];

      switch (element.type) {
        case 'CRITERION':
          //Check for LOT-0001
          if (Object.hasOwn(element, 'lots') && element.lots.indexOf('LOT-0001') == -1) return
          //create the inner elements
          if (Object.hasOwn(element, 'components')) render_response(element.components, tmp, element.name)
          break;
        case "QUESTION_GROUP": case "QUESTION_SUBGROUP":
          //check for QUESTIONS that are INDICATOR and render only the components that are ON*,
          //and ONTRUE or ONFALSE depending on the value of the INDICATOR
          let tmpComponents = {}, QI_FLAG = false, INDICATOR_value = null;
          if (Object.hasOwn(element, 'components')) {
            for (const key in element.components) {
              if (Object.hasOwn(element.components, key)) {
                const e = element.components[key]
                tmpComponents[key] = e
                if (e.type == 'QUESTION' && e.propertydatatype == 'INDICATOR') {
                  QI_FLAG = true
                  INDICATOR_value = 'true'
                }
              }
            }
            if (QI_FLAG) {
              for (const cmp in tmpComponents) {
                if (Object.hasOwn(tmpComponents, cmp)) {
                  const c = tmpComponents[cmp]
                  if (['QUESTION_GROUP', 'QUESTION_SUBGROUP'].indexOf(c.type) != -1) {
                    if ((c.elementcode == 'ONTRUE' && INDICATOR_value == 'false') ||
                      (c.elementcode == 'ONFALSE' && INDICATOR_value == 'true')) {
                      delete tmpComponents[cmp]
                    }
                  }
                }
              }
            }
            render_response(tmpComponents, part, crt_criterion)
          }

          break;
        case "REQUIREMENT_GROUP":
        case "REQUIREMENT_SUBGROUP":
        case 'SUBCRITERION':
        case 'LEGISLATION': case 'ADDITIONAL_DESCRIPTION_LINE':
        case 'REQUIREMENT': case 'CAPTION':
          //create the inner elements
          if (Object.hasOwn(element, 'components')) render_response(element.components, tmp, crt_criterion)
          break;
        case 'QUESTION':
          tmp = part.com(`  Answer to Criterion:${crt_criterion}  `)
            .com(` Property: ${element.description} (PropertyID: ${element.elementUUID}) `)
            .ele('@cac', 'TenderingCriterionResponse')
            .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
            .ele('@cbc', 'ValidatedCriterionPropertyID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()

          switch (element.propertydatatype) {
            case 'PERIOD':
              tmp.ele('@cac', 'ApplicablePeriod')
                .ele('@cbc', 'StartDate').txt('2017-01-01').up()
                .ele('@cbc', 'EndDate').txt('2017-12-12').up()
                .up()
              break;
            case 'EVIDENCE_IDENTIFIER':
              tmp.ele('@cac', 'EvidenceSupplied')
                .ele('@cbc', 'ID', { 'schemeAgencyID': 'OP' }).txt('EVIDENCE-001').up()
                .up()
              break;
            case 'DESCRIPTION':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'Description').txt(element.sellervalue ? element.sellervalue : 'Dummy Description').up()
                .up()
              break;
            case 'INDICATOR':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseIndicator').txt('true').up()
                .up()
              break;
            case 'IDENTFIER':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseID', { 'schemeAgencyID': 'OP' }).txt(element.sellervalue ? element.sellervalue : 'Dummy ID').up()
                .up()
              break;
            case 'ECONOMIC_OPERATOR_IDENTIFIER':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseID', { 'schemeAgencyID': 'XXXEOIDXXX' }).txt(element.sellervalue ? element.sellervalue : 'Dummy EO_ID').up()
                .up()
              break;
            case 'QUAL_IDENTIFIER':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseID', { 'schemeAgencyID': 'XXXQUALIDXXX' }).txt(element.sellervalue ? element.sellervalue : 'Dummy QUAL_ID').up()
                .up()
              break;
            case 'URL':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseURI').txt(element.sellervalue ? element.sellervalue : 'www.no-such-site.eu').up()
                .up()
              break;
            case 'AMOUNT':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseAmount', { 'currencyID': 'EUR' }).txt(1000000000).up()
                .up()
              break;
            case 'PERCENTAGE':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseNumeric', { 'format': 'PERCENTAGE' }).txt(element.sellervalue ? element.sellervalue : 3.14).up()
                .up()
              break;
            case 'QUANTITY_INTEGER':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseQuantity', { 'unitCode': 'INTEGER' }).txt(element.sellervalue ? element.sellervalue : 42).up()
                .up()
              break;
            case 'QUANTITY_YEAR':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseQuantity', { 'unitCode': 'YEAR' }).txt(element.sellervalue ? element.sellervalue : 2000).up()
                .up()
              break;
            case 'QUANTITY':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseQuantity').txt(element.sellervalue ? element.sellervalue : 60).up()
                .up()
              break;
            case 'DATE':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseDate').txt('2000-01-01').up()
                .up()
              break;
            case 'TIME':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseTime').txt(element.sellervalue ? element.sellervalue : '00:00:00+00:00').up()
                .up()
              break;
            case 'CODE_COUNTRY':
              tmp.ele('@cac', 'ResponseValue')
                .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                .ele('@cbc', 'ResponseCode', { 'listID': "http://publications.europa.eu/resource/authority/country", 'listName': "country", 'listAgencyID': "ISO", 'listVersionID': "20220928-0" }).txt('BEL').up()
                .up()
              break;
            case 'CODE':
              if (element.codelist == 'Occupation') {
                tmp.ele('@cac', 'ResponseValue')
                  .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                  .ele('@cbc', 'ResponseCode', { 'listAgencyID': "EMPL", 'listVersionID': "20221214-0", 'listID': "http://publications.europa.eu/resource/authority/occupation" }).txt('dummy-value').up()
                  .up()
              } else if (element.codelist == 'FinancialRatioType') {
                tmp.ele('@cac', 'ResponseValue')
                  .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                  .ele('@cbc', 'ResponseCode', { 'listAgencyID': "OP", 'listVersionID': schemeVersionID, 'listID': "financial-ratio-type" }).txt('dummy-value').up()
                  .up()
              } else if (element.codelist == 'EoRoleType') {
                tmp.ele('@cac', 'ResponseValue')
                  .ele('@cbc', 'ID', { 'schemeID': "Criterion", 'schemeAgencyID': "XXXESPD-SERVICEXXX", 'schemeVersionID': schemeVersionID }).txt(element.elementUUID).up()
                  .ele('@cbc', 'ResponseCode', { 'listAgencyID': "OP", 'listVersionID': "20211208-0", 'listID': "http://publications.europa.eu/resource/authority/eo-role-type" }).txt('dummy-value').up()
                  .up()
              }

              break;
            default:
              break;
          }

          tmp.up()
          //part.up()
          break;

        default:
          break;
      }
    }
  }
}

/**
 * Render HTML/Bootstrap from JSON data for ESPD Example
 * The JSON object is stored in window.espd_doc
 * Each criteria is a root level entry
 * 
 * @param {string} part - the JSON path to be rendered as HTML
 * @param {object} data_load  - the data collected from the corresponding fragment
 * 
 * @returns - HTML with the part populated with data that can be inserted into the page
 */
function renderHTML(part, data_load) {
  console.log(part, data_load)
  let result = `${part}::${Date.now()}`

  //build HTML fragment for each part based on the ESPD EDM corresponding structure
  let tag = `${part.substring(0, part.indexOf('_'))}`, target = part.split('/'), dest = window.espd_model[tag]
  //store the data on window.espd_data
  //mimic cardinality so that when building the response path
  let root = target[0].substring(0, target[0].indexOf('_'))
  if(!Object.hasOwn(window.espd_data, root)) window.espd_data[root] = {}
  let parent = window.espd_data[root]
  for (let index = 1; index < target.length; index++) {
    //TODO - build the reccursion path elements Rx
    //Build an array of objects
    if(!Object.hasOwn(parent, target[index])) parent[target[index]] = []
    parent = parent[target[index]]
    dest = dest.components[target[index]]
  }
  console.log(dest)

  result = `<div class="card mb-1" id='${part}'>
  <div class="card-body">
  `
  for (const key in dest.components) {
    if (Object.hasOwn(dest.components, key)) {
      const element = dest.components[key]

      switch (element.type) {
        case 'QUESTION':
          result += `[Q] ${element.description} :: ${element.responsepath}<br/>`
          break;
      
        default:
          console.log(`Unknown element ${element.type}`);
          
          break;
      }
      
    }
  }

  result += `  
     </div>
     <div class="card-footer">
     <button onclick="deleteHTML('${part}')" type="button" class="btn btn-outline-danger">
     Delete
    </button>
  </div>
  </div>
  `
  
  return result
}

function deleteHTML(part) {
  console.log(part);
  window.app.$children[6].$refs['procedureComponent'].$refs['v4.0.0-C61'][0]._data[`html_${stringToProperty(part)}`]=''
}

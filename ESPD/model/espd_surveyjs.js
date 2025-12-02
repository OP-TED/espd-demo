let ESPD_SURVEY = {}

/**
 * Transform a plain array of labels into  SurveyJS choice list
 */
function arrayToChoices(arr) {
  let result = []
  arr.forEach(element => {
    result.push({ value: element, text: element })
  });
  return result
}

/**
 * Transform JSON ESPD EDM to JSON SurveyJS
 * 
 * @param {string} part - part of ESPD EDM to be processed
 * @param {string} section  - section of ESPD to be rendered
 * @returns - JSON SurveyJS frament to be rendered
 */
function renderJSONFragment(part, section) {
  let result = []

  const jsonify = (fragment) => {
    //console.log(fragment)
    let response = {}

    switch (fragment.type) {
      case 'CRITERION':

        response = {
          "type": "panel",
          "name": fragment.requestpath,
          "title": fragment.name,
          visibleIf: `{espd_version} = \'${fragment.espd_version}\'`,
          "elements": [
            {
              "type": "html",
              "name": fragment.elementcode,
              "html": fragment.description
            }
          ]
        }
        //render components
        if (Object.hasOwn(fragment, 'components')) {
          for (const key in fragment.components) {
            if (Object.hasOwn(fragment.components, key)) {
              const element = fragment.components[key]
              response.elements.push(jsonify(element))
            }
          }
        }

        break;

      case 'REQUIREMENT_GROUP':
        //This is a container element, render the elements inside
        if (fragment.cardinality.toString().trim().endsWith('n')) {
          response = {
            "type": "paneldynamic",
            "name": fragment.responsepath,
            "title": '\n',
            panelCount: 1,
            "templateElements": []
          }
          if (Object.hasOwn(fragment, 'components')) {
            //Check if this is CODE_BOOLEAN and RADIO_BUTTON_TRUE block
            let Q_ref = ''
            for (const k in fragment.components) {
              if (Object.hasOwn(fragment.components, k)) {
                if (fragment.components[k].propertydatatype == 'CODE_BOOLEAN' && fragment.components[k].buyervalue == 'RADIO_BUTTON_TRUE') {
                  Q_ref = fragment.components[k].requestpath
                  break
                }
              }
            }
            for (const key in fragment.components) {
              if (Object.hasOwn(fragment.components, key)) {
                const element = fragment.components[key]
                element.indicator_id = Q_ref
                element.paneldynamic = true
                response.templateElements.push(jsonify(element))
              }
            }
          }
        } else {

          response = {
            "type": "panel",
            "name": fragment.responsepath,
            "elements": []
          }

          //render components and manage INDICATOR questions
          if (Object.hasOwn(fragment, 'components')) {
            //Check if this is an INDICATOR block
            let Q_ref = ''
            for (const k in fragment.components) {
              if (Object.hasOwn(fragment.components, k)) {
                if (fragment.components[k].propertydatatype == 'CODE_BOOLEAN' && fragment.components[k].buyervalue == 'RADIO_BUTTON_TRUE') {
                  Q_ref = fragment.components[k].responsepath
                  break
                }
              }
            }
            for (const key in fragment.components) {
              if (Object.hasOwn(fragment.components, key)) {
                const element = fragment.components[key]
                element.indicator_id = Q_ref
                if (fragment.paneldynamic) element.paneldynamic = true
                response.elements.push(jsonify(element))
              }
            }
          }
        }

        break;

      case 'REQUIREMENT_SUBGROUP':
        //This is a container element, render the elements inside
        if (fragment.cardinality.toString().trim().endsWith('n')) {
          response = {
            "type": "paneldynamic",
            "name": fragment.responsepath,
            "title": '\n',
            panelCount: 1,
            "templateElements": []
          }
          if (fragment.indicator_id && fragment.indicator_id.length > 0) {
            response.visibleIf = `{${fragment.paneldynamic ? 'panel.' : ''}${fragment.indicator_id}} = '${fragment.elementcode}'`
          }
          if (Object.hasOwn(fragment, 'components')) {
            //Check if this is CODE_BOOLEAN and RADIO_BUTTON_TRUE block
            let Q_ref = ''
            for (const k in fragment.components) {
              if (Object.hasOwn(fragment.components, k)) {
                if (fragment.components[k].propertydatatype == 'CODE_BOOLEAN' && fragment.components[k].buyervalue == 'RADIO_BUTTON_TRUE') {
                  Q_ref = fragment.components[k].requestpath
                  break
                }
              }
            }
            for (const key in fragment.components) {
              if (Object.hasOwn(fragment.components, key)) {
                const element = fragment.components[key]
                element.indicator_id = Q_ref
                element.paneldynamic = true
                response.templateElements.push(jsonify(element))
              }
            }
          }
        } else {

          response = {
            "type": "panel",
            "name": fragment.responsepath,
            "elements": []
          }
          if (fragment.indicator_id && fragment.indicator_id.length > 0) {
            response.visibleIf = `{${fragment.paneldynamic ? 'panel.' : ''}${fragment.indicator_id}} = '${fragment.elementcode}'`
          }
          //render components and manage INDICATOR questions
          if (Object.hasOwn(fragment, 'components')) {
            //Check if this is an INDICATOR block
            let Q_ref = ''
            for (const k in fragment.components) {
              if (Object.hasOwn(fragment.components, k)) {
                if (fragment.components[k].propertydatatype == 'CODE_BOOLEAN' && fragment.components[k].buyervalue == 'RADIO_BUTTON_TRUE') {
                  Q_ref = fragment.components[k].responsepath
                  break
                }
              }
            }
            for (const key in fragment.components) {
              if (Object.hasOwn(fragment.components, key)) {
                const element = fragment.components[key]
                element.indicator_id = Q_ref
                if (fragment.paneldynamic) element.paneldynamic = true
                response.elements.push(jsonify(element))
              }
            }
          }
        }

        break;


      case 'QUESTION_GROUP':
        //This is a container element, render the elements inside
        if (fragment.cardinality.toString().trim().endsWith('n')) {
          response = {
            "type": "paneldynamic",
            "name": fragment.responsepath,
            "title": '\n',
            panelCount: 1,
            visibleIf: '{role} = \'eo\'',
            "templateElements": []
          }
          if (Object.hasOwn(fragment, 'components')) {
            //Check if this is an INDICATOR block
            let Q_ref = ''
            for (const k in fragment.components) {
              if (Object.hasOwn(fragment.components, k)) {
                if (fragment.components[k].propertydatatype == 'INDICATOR') {
                  Q_ref = fragment.components[k].responsepath
                  break
                }
              }
            }
            for (const key in fragment.components) {
              if (Object.hasOwn(fragment.components, key)) {
                const element = fragment.components[key]
                element.indicator_id = Q_ref
                element.paneldynamic = true
                response.templateElements.push(jsonify(element))
              }
            }
          }
        } else {

          response = {
            "type": "panel",
            "name": fragment.responsepath,
            visibleIf: '{role} = \'eo\'',
            "elements": []
          }

          //render components and manage INDICATOR questions
          if (Object.hasOwn(fragment, 'components')) {
            //Check if this is an INDICATOR block
            let Q_ref = ''
            for (const k in fragment.components) {
              if (Object.hasOwn(fragment.components, k)) {
                if (fragment.components[k].propertydatatype == 'INDICATOR') {
                  Q_ref = fragment.components[k].responsepath
                  break
                }
              }
            }
            for (const key in fragment.components) {
              if (Object.hasOwn(fragment.components, key)) {
                const element = fragment.components[key]
                element.indicator_id = Q_ref
                if (fragment.paneldynamic) element.paneldynamic = true
                response.elements.push(jsonify(element))
              }
            }
          }
        }

        break;

      case 'QUESTION_SUBGROUP':
        if (fragment.cardinality.toString().trim().endsWith('n')) {
          response = {
            "type": "paneldynamic",
            "name": fragment.responsepath,
            "title": '\n',
            visibleIf: '{role} = \'eo\'',
            panelCount: 1,
            "templateElements": []
          }
          if (fragment.indicator_id && fragment.indicator_id.length > 0) {
            if (fragment.elementcode == 'ONTRUE') response.visibleIf = `{${fragment.paneldynamic ? 'panel.' : ''}${fragment.indicator_id}}`
            if (fragment.elementcode == 'ONFALSE') response.visibleIf = `!{${fragment.paneldynamic ? 'panel.' : ''}${fragment.indicator_id}}`
          }
          if (Object.hasOwn(fragment, 'components')) {
            //Check if this is an INDICATOR block
            let Q_ref = ''
            for (const k in fragment.components) {
              if (Object.hasOwn(fragment.components, k)) {
                if (fragment.components[k].propertydatatype == 'INDICATOR') {
                  Q_ref = fragment.components[k].responsepath
                  break
                }
              }
            }
            for (const key in fragment.components) {
              if (Object.hasOwn(fragment.components, key)) {
                const element = fragment.components[key]
                element.indicator_id = Q_ref
                element.paneldynamic = true
                response.templateElements.push(jsonify(element))
              }
            }
          }
        } else {
          response = {
            "type": "panel",
            "name": fragment.responsepath,
            visibleIf: '{role} = \'eo\'',
            "elements": []
          }

          if (fragment.indicator_id && fragment.indicator_id.length > 0) {
            if (fragment.elementcode == 'ONTRUE') response.visibleIf = `{${fragment.paneldynamic ? 'panel.' : ''}${fragment.indicator_id}}`
            if (fragment.elementcode == 'ONFALSE') response.visibleIf = `!{${fragment.paneldynamic ? 'panel.' : ''}${fragment.indicator_id}}`
          }
          //render components and manage INDICATOR questions
          if (Object.hasOwn(fragment, 'components')) {
            //Check if this is an INDICATOR block inside the structure
            let Q_ref = ''
            for (const k in fragment.components) {
              if (Object.hasOwn(fragment.components, k)) {
                if (fragment.components[k].propertydatatype == 'INDICATOR') {
                  Q_ref = fragment.components[k].responsepath
                  break
                }
              }
            }


            for (const key in fragment.components) {
              if (Object.hasOwn(fragment.components, key)) {
                const element = fragment.components[key]
                element.indicator_id = Q_ref
                if (fragment.paneldynamic) element.paneldynamic = true
                response.elements.push(jsonify(element))
              }
            }
          }
        }
        break;

      case 'REQUIREMENT':

        switch (fragment.propertydatatype) {
          case 'CODE_BOOLEAN':
            if (fragment.buyervalue == 'RADIO_BUTTON_TRUE') {
              response = {
                "type": "dropdown",
                "name": fragment.requestpath,
                "title": fragment.description,
                "description": "REQUIREMENT",
                "choices": arrayToChoices(fragment.elementcode.replaceAll('[', '').replaceAll(']', '').split(', '))
              }
            } else {
              response = {
                "type": "text",
                "name": fragment.requestpath,
                "title": fragment.description,
                "description": "REQUIREMENT"
              }
            }
            break;
          case 'LOT_IDENTIFIER':
            response = {
              "type": "tagbox",
              "name": fragment.requestpath,
              "title": fragment.description,
              "isRequired": true,
              "choicesLazyLoadEnabled": true,
              //"choicesLazyLoadPageSize": 10000,
              defaultValue: ['LOT-0000'],
              "choices": [
                {
                  "value": "LOT-0000",
                  "text": "LOT-0000"
                }
              ],
              "showSelectAllItem": true,
              "minSelectedChoices": 1,
              "hideSelectedItems": true,
              "closeOnSelect": true
            }
            break;
          default:
            response = {
              "type": "text",
              "name": fragment.requestpath,
              "title": fragment.description,
              "description": "REQUIREMENT"
            }
            break;
        }


        break;

      case 'QUESTION':
        switch (fragment.propertydatatype) {
          case 'INDICATOR':
            response = {
              "type": "boolean",
              "name": fragment.responsepath,
              "title": fragment.description,
              defaultValue: false,
              swapOrder: true
            }
            break;

          case 'DESCRIPTION':
            response = {
              "type": "comment",
              "name": fragment.responsepath,
              "title": fragment.description
            }
            break;

          case 'EVIDENCE_IDENTIFIER':
            if (fragment.cardinality.toString().trim().endsWith('n')) {
              response = {
                "type": "paneldynamic",
                "name": fragment.responsepath,
                "title": fragment.description,
                panelCount: 1,
                "templateElements": [
                  {
                    "type": "text",
                    "name": "EVIDENCE_ID",
                    "title": "\n"
                  }
                ]
              }
            } else {
              response = {
                "type": "text",
                "name": fragment.responsepath,
                "title": fragment.description
              }
            }
            break;

          case 'ECONOMIC_OPERATOR_IDENTIFIER': case 'CODE': case 'PERIOD': case 'CODE_COUNTRY':
            response = {
              "type": "text",
              "name": fragment.responsepath,
              "title": fragment.description
            }
            break;

          case 'QUANTITY_INTEGER': case 'AMOUNT': case 'PERCENTAGE': case 'QUANTITY': case 'QUANTITY_YEAR': case 'QUAL_IDENTIFIER':
            response = {
              "type": "text",
              "name": fragment.responsepath,
              "title": fragment.description,
              inputType: "number"
            }
            break;

          case 'URL':
            response = {
              "type": "text",
              "name": fragment.responsepath,
              "title": fragment.description,
              inputType: "url"
            }
            break;


          case 'DATE':
            response = {
              "type": "text",
              "name": fragment.responsepath,
              "title": fragment.description,
              inputType: "date"
            }
            break;

          default:
            console.log(`Question type: ${fragment.propertydatatype} not implemented.`);
            break;
        }

        break;

      case 'SUBCRITERION':
        response = {
          "type": "html",
          "name": fragment.requestpath,
          "html": 'National Legislation with specific configuration that has to be rendered for User. The information has to be retrieved from eCertis corresponding to UUID of this Criterion.'
        }
        break;

      case 'LEGISLATION':
        response = {
          "type": "html",
          "name": fragment.requestpath,
          "html": 'EU Legislation that has to be fetched from eCertis corresponding to UUID of this Criterion.'
        }
        break;

      case 'ADDITIONAL_DESCRIPTION_LINE': case 'CAPTION':
        //This is terminal element no components
        response = {
          "type": "html",
          "name": fragment.requestpath,
          "html": fragment.description
        }
        break;

      default:
        console.log(`Not implemented ${fragment.type}`);
        break;
    }

    return response
  }

  //for all versions render the Criterion
  for (const key in window.esdp_edm) {
    for (const criterion of window.esdp_edm[key][part][section]) {
      if (criterion.startsWith('C')) {
        //console.log(key, criterion, window.esdp_edm[key].edm[criterion])
        result.push(jsonify({ ...window.esdp_edm[key].edm[criterion], espd_version: key }))
      }
    }
  }

  console.log(result)

  return result
}

/**
 * Build JSON representing the ESPD EDM to SurveyJS JSON 
 * this will be rendered by the web application
 */
const JSONtoSurvey = async () => {
  //this is the initial call, manage the parsing of model from espd_meta document
  try {
    //load all information in window.espd_edm
    let result = await GlobalPouchDB.get('espd_meta')
    window.esdp_edm = result.data
    for (const key in window.esdp_edm) {
      if (Object.hasOwn(window.esdp_edm, key)) {
        const element = window.esdp_edm[key]
        result = await GlobalPouchDB.get(`espd_edm_${key}`)
        window.esdp_edm[key].edm = result.data
      }
    }

    //Intialize SurveyJS object (static)
    ESPD_SURVEY = {
      "title": "ESPD Demo",
      "description": "Create ESPD Request or ESPD Response documents",
      "completedHtml": `<h3>Thank you for completing ESPD document</h3> <div style="display: flex; justify-content: center;">
      <table>
		<tbody>
			<tr>
				<td align="center"><button type='button' onclick='exportXMLExample()'>Download ESPD Document in XML format</button></td>
			</tr>
			<tr>
				<td  align="center"><button type='button' onclick='exportPDFExample()'>Download ESPD Document in PDF format</button></td>
			</tr>
			<tr>
				<td align="center"><button type='button' onclick='ESPD_SURVEY.clear(false, true)'>Restart</button></td>
			</tr>
		</tbody>
	</table>
       </div>`,
      "completedBeforeHtml": "<h3>You have already completed this ESDP document.</h3>",
      "loadingHtml": "<h3>Loading data...</h3>",
      "sendResultOnPageNext": true,
      "showTitle": false,
      "showQuestionNumbers": "off",
      "showProgressBar": "auto",
      "progressBarType": "questions",
      "widthMode": "responsive",
      "pages": []
    }

    //Each page contains static and dynamically generated parts
    //Add Start page (static)
    ESPD_SURVEY.pages.push(
      {
        "name": "start",
        "title": "Start",
        "description": "A. Select initial parameters",
        "elements": [
          {
            "type": "panel",
            "name": "SA",
            "elements": [
              {
                "type": "dropdown",
                "name": "espd_version",
                "title": "ESPD Version",
                "description": "Select ESPD version",
                "isRequired": true,
                "choices": [
                  "v3.3.0",
                  "v4.0.0"
                ]
              },
              {
                "type": "dropdown",
                "name": "role",
                "title": "Role",
                "description": "Select your role",
                "isRequired": true,
                "choices": [
                  {
                    "value": "ca",
                    "text": "Contracting authority - ESPD Request"
                  },
                  {
                    "value": "eo",
                    "text": "Economic operator - ESPD Response"
                  }
                ]
              },
              {
                "type": "dropdown",
                "name": "country",
                "title": "Country",
                "description": "Select the country",
                "isRequired": true,
                "choices": [
                  {
                    "value": "EUR",
                    "text": "European Union"
                  }
                ]
              }
            ]
          }
        ]
      }
    )

    //Add Procedure Part I page (static)
    ESPD_SURVEY.pages.push(
      {
        "name": "partI",
        "title": "Part I: Information concerning the procurement procedure and the contracting authority or contracting entity",
        "elements": [
          {
            "type": "multipletext",
            "name": "PIA",
            "title": "A. Information about publication",
            "items": [
              {
                "name": "received_notice_number",
                "title": "Received notice number"
              },
              {
                "name": "OJS_notice_number",
                "title": "Notice number in the OJS",
                placeholder: '[][][][]/S [][][]-[][][][][][]'
              },
              {
                "name": "OJS_URL",
                "title": "OJS URL",
                inputType: 'url'
              },
              {
                "name": "national_official_journal",
                "title": "National Official Journal"
              }
            ]
          },
          {
            "type": "multipletext",
            "name": "PIB",
            "title": "B. Identity of the procurer",
            "items": [
              {
                "name": "name",
                "title": "Official name"
              },
              {
                "name": "country",
                "title": "Country"
              },
              {
                "name": "website",
                "title": "Website",
                inputType: 'url'
              },
              {
                "name": "vat",
                "title": "V.A.T number"
              },
              {
                "name": "city",
                "title": "City"
              },
              {
                "name": "street_and_number",
                "title": "Street and Number"
              },
              {
                "name": "postcode",
                "title": "Post code"
              },
              {
                "name": "contact_person",
                "title": "Contact person"
              },
              {
                "name": "telephone",
                "title": "Telephone",
                inputType: 'tel'
              },
              {
                "name": "email",
                "title": "E-mail",
                inputType: 'e-mail'
              }
            ]
          },
          {
            "type": "multipletext",
            "name": "PIC",
            "title": "C. Information about the procurement procedure",
            defaultValue: {
              number_of_lots: 1
            },
            "items": [
              {
                "name": "title",
                "title": "Title"
              },
              {
                "name": "short_description",
                "title": "Short description"
              },
              {
                "name": "file_reference",
                "title": "File reference number"
              },
              {
                "name": "number_of_lots",
                "title": "Number of lots",
                inputType: 'number',
                minValueExpression: '1'
              }
            ]
          }
        ]
      }
    )

    //Add Procedure Part II page (mixed)
    ESPD_SURVEY.pages.push(
      {
        "name": "partIIA",
        "visibleIf": "{role} = 'eo'",
        "title": "Part II: Information concerning the economic operator",
        "elements": [
          {
            "type": "panel",
            "name": "PIIA",
            "elements": [
              {
                "type": "multipletext",
                "name": "PIAEOInfo",
                "title": "A: Information about the economic operator",
                "items": [
                  {
                    "name": "name",
                    "title": "Official name"
                  },
                  {
                    "name": "country",
                    "title": "Country"
                  },
                  {
                    "name": "website",
                    "title": "Website",
                    inputType: 'url'
                  },
                  {
                    "name": "vat",
                    "title": "V.A.T number"
                  },
                  {
                    "name": "city",
                    "title": "City"
                  },
                  {
                    "name": "street_and_number",
                    "title": "Street and Number"
                  },
                  {
                    "name": "postcode",
                    "title": "Post code"
                  },
                  {
                    "name": "contact_person",
                    "title": "Contact person"
                  },
                  {
                    "name": "telephone",
                    "title": "Telephone",
                    inputType: 'tel'
                  },
                  {
                    "name": "email",
                    "title": "E-mail",
                    inputType: 'e-mail'
                  },
                  {
                    "name": "role",
                    "title": "Role"
                  }
                ]
              },
              {
                "type": "panel",
                "name": "PIIAInformation",
                "elements": renderJSONFragment('partII', 'A')
              }
            ]
          }
        ]
      }
    )
    ESPD_SURVEY.pages.push(
      {
        "name": "partIIB",
        "visibleIf": "{role} = 'eo'",
        "title": "Part II: Information concerning the economic operator",
        "elements": [
          {
            "type": "paneldynamic",
            "name": "PIIB",
            "title": "B: Information about representatives of the economic operator",
            panelCount: 1,
            "templateElements": [
              {
                "type": "multipletext",
                "name": "Representative",
                "title": "Representative's information",
                "items": [
                  {
                    "name": "name",
                    "title": "First Name"
                  },
                  {
                    "name": "familyname",
                    "title": "Last Name"
                  },
                  {
                    "name": "dateofbirth",
                    "title": "Date of Birth",
                    inputType: 'date'
                  },
                  {
                    "name": "placeofbirth",
                    "title": "Place of Birth"
                  },
                  {
                    "name": "country",
                    "title": "Country"
                  },
                  {
                    "name": "website",
                    "title": "Website",
                    inputType: 'url'
                  },
                  {
                    "name": "role",
                    "title": "Role"
                  },
                  {
                    "name": "city",
                    "title": "City"
                  },
                  {
                    "name": "street_and_number",
                    "title": "Street and Number"
                  },
                  {
                    "name": "postcode",
                    "title": "Post code"
                  },
                  {
                    "name": "telephone",
                    "title": "Telephone",
                    inputType: 'tel'
                  },
                  {
                    "name": "email",
                    "title": "E-mail",
                    inputType: 'e-mail'
                  },
                  {
                    "name": "details",
                    "title": "Detailed information"
                  }
                ]
              }
            ]
          }
        ]
      }
    )
    ESPD_SURVEY.pages.push(
      {
        "name": "partIIC",
        "visibleIf": "{role} = 'eo'",
        "title": "Part II: Information concerning the economic operator",
        "elements": [
          {
            "type": "panel",
            "name": "PIIC",
            "title": "C: Information about reliance on the capacities of other entities",
            "elements": renderJSONFragment('partII', 'C')
          }
        ]
      }
    )
    ESPD_SURVEY.pages.push(
      {
        "name": "partIID",
        "visibleIf": "{role} = 'eo'",
        "title": "Part II: Information concerning the economic operator",
        "elements": [
          {
            "type": "panel",
            "name": "PIID",
            "title": "D: Information concerning subcontractors on whose capacity the economic operator does not rely",
            "elements": renderJSONFragment('partII', 'D')
          }
        ]
      }
    )
    //Add Exclusion Grouds Part III page (dynamic)
    ESPD_SURVEY.pages.push(
      {
        "name": "partIIIA",
        "title": "Part III: Exclusion grounds",
        "elements": [
          {
            "type": "panel",
            "name": "PIIIA",
            "title": "A: Grounds relating to criminal convictions",
            "elements": renderJSONFragment('partIII', 'A')
          }
        ]
      }
    )
    ESPD_SURVEY.pages.push(
      {
        "name": "partIIIB",
        "title": "Part III: Exclusion grounds",
        "elements": [
          {
            "type": "panel",
            "name": "PIIIB",
            "title": "B: Grounds relating to the payment of taxes or social security contributions ",
            "elements": renderJSONFragment('partIII', 'B')
          }
        ]
      }
    )
    ESPD_SURVEY.pages.push(
      {
        "name": "partIIIC",
        "title": "Part III: Exclusion grounds",
        "elements": [
          {
            "type": "panel",
            "name": "PIIIC",
            "title": "C: Grounds relating to insolvency, conflicts of interests or professional misconduct",
            "elements": renderJSONFragment('partIII', 'C')
          }
        ]
      }
    )
    ESPD_SURVEY.pages.push(
      {
        "name": "partIIID",
        "title": "Part III: Exclusion grounds",
        "elements": [
          {
            "type": "panel",
            "name": "PIIID",
            "title": "D: Purely national exclusion grounds",
            "elements": renderJSONFragment('partIII', 'D')
          }
        ]
      }
    )

    //Add Selection Criteria Part IV page (dynamic)
    ESPD_SURVEY.pages.push(
      {
        "name": "partIVA",
        "title": "Part IV: Selection criteria",
        "elements": [
          {
            "type": "panel",
            "name": "PIVA",
            "title": "A: Suitability",
            "elements": renderJSONFragment('partIV', 'A')
          }
        ]
      }
    )
    ESPD_SURVEY.pages.push(
      {
        "name": "partIVB",
        "title": "Part IV: Selection criteria",
        "elements": [
          {
            "type": "panel",
            "name": "PIVB",
            "title": "B: Economic and financial standing",
            "elements": renderJSONFragment('partIV', 'B')
          }
        ]
      }
    )
    ESPD_SURVEY.pages.push(
      {
        "name": "partIVC",
        "title": "Part IV: Selection criteria",
        "elements": [
          {
            "type": "panel",
            "name": "PIVC",
            "title": "C: Technical and professional ability",
            "elements": renderJSONFragment('partIV', 'C')
          }
        ]
      }
    )
    ESPD_SURVEY.pages.push(
      {
        "name": "partIVD",
        "title": "Part IV: Selection criteria",
        "elements": [
          {
            "type": "panel",
            "name": "PIVD",
            "title": "D: Quality assurance schemes and environmental management standards",
            "elements": renderJSONFragment('partIV', 'D')
          }
        ]
      }
    )

    //Add Finish Part V page (dynamic)
    ESPD_SURVEY.pages.push(
      {
        "name": "partV",
        "title": "Part V: Reduction of the number of qualified candidates",
        "visibleIf": "{role} = 'eo'",
        "elements": [
          {
            "type": "panel",
            "name": "PVA",
            "title": "A: The Economic Operator Declaration",
            "elements": renderJSONFragment('partV', 'A')
          }
        ]
      }
    )



    //The JSON is now complete - transform it into an object that can be rendered by VueJS
    SurveyVue.settings.lazyRender.enabled = true
    ESPD_SURVEY = new SurveyVue.Model(ESPD_SURVEY)

    ESPD_SURVEY.onComplete.add(function (sender, options) {
      // Display the "Saving..." message (pass a string value to display a custom message)
      console.log(JSON.stringify(sender.data))
      //this.$store.commit('savekv', {key:'start', value: sender.data})
      window.espd_doc = sender.data
      options.showSaveInProgress();
      options.showSaveSuccess();
    });

    ESPD_SURVEY.onChoicesLazyLoad.add((_, options) => {
      //dynamically populate the LOTs
      if (options.question.getType() === 'tagbox' && options.question.title.startsWith('LOT')) {
        let data = Array(parseInt(ESPD_SURVEY.data.PIC.number_of_lots)).fill().map((_, index) => {
          let lot = `${index}`.padStart(4, '0')
          return { value: `LOT-${lot}`, text: `LOT-${lot}` }
        })
        options.setItems(data, data.length)
      }
    })

    //console.log(mdoc)
  } catch (error) {
    console.log(error)
  }
}

JSONtoSurvey()


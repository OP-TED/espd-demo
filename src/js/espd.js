/**
 * ESPD Library
 */


/**
 * ESPD specific structures
 * 
 * tag_map - Tags mapped to elements from the Excel
 */
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
    let tag = `${part.substring(0, part.indexOf('_'))}`, target = part.split('/'), dest = window.espd_ds.get(tag).store
    target.shift()
    //store the data on window.espd_data
    //mimic cardinality so that when building the response path
    
    for (const element of target) {
        if(Array.isArray(dest)){
            dest = dest.find((elm) => elm.has(element))
        }else{
            dest = Array.isArray(dest.get(element))?
                   dest.get(element).at(-1):
                   dest.get(element)
        }
    }
    //check if the element only element of the array contains values or it is the 1st time they are storing something
    //this is an initialization arterfact
    //store the values in a new datastructure entry at the end of the array
    let INIT = false
    dest.forEach( (v,k) => {
        if (!INIT) INIT = Array.isArray(v) && v.length > 0
    })
    console.log(INIT, dest, target)
    
    if (!INIT){
        //use this structure to store data
    }else{
        //create a new structure an add it to the end
    }

    result = `<div class="card mb-1" id='${part}'>
    <div class="card-body">
    `
    /*
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
    */
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
    let cmp = `${window.espd_doc.espd_version}-${part.substring(0,part.indexOf('_'))}`, 
    parent = window.app.$refs['mainComponent'].$refs['startComponent'] ??
             window.app.$refs['mainComponent'].$refs['procedureComponent'] ??
             window.app.$refs['mainComponent'].$refs['selectionCriteria'] ??
             window.app.$refs['mainComponent'].$refs['exclusionGrounds'] ??
             window.app.$refs['mainComponent'].$refs['ESPDDownload']

    parent.$refs[cmp][0]._data[`html_${stringToProperty(part)}`] = ''
}

/**
 * Produce on demand the Vue components for ESPD example part
 * The ESPD structure must be in window.espd_model
 * The ESPD version is stored in window.espd_doc_espd_version
 */
function componentsFactory() {
    //console.log(window.espd_doc.espd_version, window.espd_model)
    switch (window.espd_doc.espd_version) {
        case 'v3.3.0':
            //not implemented
            break;
        case 'v4.0.0':
            //Build Vue UI components
            json2ESPD_v4(window.espd_model)
            //Build the underlying data structure
            window.espd_ds = new Map()
            for (const key in window.espd_model) {
                if (Object.hasOwn(window.espd_model, key)) {
                    const element = window.espd_model[key];
                    window.espd_ds.set(key, new ESPD(key, element))
                }
            }
            break;
        default:
            console.log(`Version ${window.espd_doc.espd_version} not supported.`);
            break;
    }
}

/**
 * Auxiliary function to transform espd_json to Vue components that can be used in ESPD Response
 * JSON to BootstrapVue for ESPD v4.0.0 tranformation
 * @param {*} fragment - JSON object to be processed
 * @param {*} result - JSON object to conserver the result
 */
function json2ESPD_v4(fragment, result = { sel_count: 0, template: ''}) {

    var last_sel_count = 0

    for (const el in fragment) {
        if (Object.hasOwn(fragment, el)) {
            switch (fragment[el].type) {
                case 'CRITERION':
                    last_sel_count = Math.min(last_sel_count, result.sel_count)
                    result.data_part = {}
                    result.exp = {}
                    //log(last_sel_count)
                    if (fragment[el].tag.endsWith('- SC')) {
                        result.exp[`cb_${el}`] = true
                        result.template =
                            `<div>
                        <b-form-checkbox id="checkbox-${el}" v-model="exp['cb_${el}']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-${el}">
                            <strong>${fragment[el].name}</strong>
                            <p>${fragment[el].description}</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_${el}']">
                        `
                    } else {
                        result.template =
                            `<div>
                            <strong>${fragment[el].name}</strong>
                            <p>${fragment[el].description}</p>
                            `
                    }
                    if (Object.hasOwn(fragment[el], 'components')) result = json2ESPD_v4(fragment[el].components, result)
                    if (fragment[el].tag.endsWith('- SC')) result.template += `</template>`
                    result.template += `
                    </div>`
                    //Produce Vue component
                    // exp: {} - is data that is exchanged at top level
                    // 

                    last_sel_count = Math.max(last_sel_count, result.sel_count)
                    let d = result.data_part 
                    d.exp = result.exp

                    Vue.component(`${window.espd_doc.espd_version}-${el}`, {
                        data() { return {...d}},
                        template: `${result.template}`,
                        created(){
                            window.espd_ds.get(el).save(el, this.exp)
                        }
                    })
                
            
                    //DONE - return result
                    break;

                case 'SUBCRITERION':
                    result.template += `<div>`
                    if (Object.hasOwn(fragment[el], 'components')) result = json2ESPD_v4(fragment[el].components, result) 
                    result.template += `</div>`
                    break;

                case 'REQUIREMENT_GROUP':
                    result.template += `<div>`
                    if (fragment[el].cardinality.toString().trim().endsWith('..n')) {
                        result.data_part[`html_${stringToProperty(fragment[el].requestpath)}`] = ''
                        result.template += `<div v-html="html_${stringToProperty(fragment[el].requestpath)}"></div><b-card footer-tag="footer">`
                    }

                    if (Object.hasOwn(fragment[el], 'components')) result = json2ESPD_v4(fragment[el].components, result)

                    if (fragment[el].cardinality.toString().trim().endsWith('..n')) {
                        result.template += `<template #footer>
                    <b-button variant="success" @click="html_${stringToProperty(fragment[el].requestpath)} = renderHTML('${fragment[el].requestpath}', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>`
                    }
                    result.template += `</div>`

                    break;

                case 'REQUIREMENT_SUBGROUP':
                    result.template += `<div>`

                    if (fragment[el].cardinality.toString().trim().endsWith('..n')) {
                        result.data_part[`html_${stringToProperty(fragment[el].requestpath)}`]=''
                        result.template += `<div v-html="html_${stringToProperty(fragment[el].requestpath)}"></div><b-card footer-tag="footer">`
                    }

                    let is_radio_group = false, select_variable = "", option_variable = ""
                    if (Object.hasOwn(fragment[el], 'components')) {
                        for (const e in fragment[el].components) {
                            if (Object.hasOwn(fragment[el].components, e)) {
                                const tmp_cmp = fragment[el].components[e]
                                if (tmp_cmp.type == 'REQUIREMENT') {
                                    if (tmp_cmp.buyervalue == 'RADIO_BUTTON_TRUE') {
                                        //The list of values is in elementcode field
                                        //This is a list of exclusive values for a group or radio buttons
                                        result.sel_count++
                                        let local_indicator = (result.sel_count + '').padStart(2, '0')
                                        is_radio_group = true
                                        select_variable = `${stringToProperty(tmp_cmp.responsepath)}`
                                        option_variable = `opt_${tmp_cmp.responsepath.replaceAll("-", "__").substring(0, tmp_cmp.responsepath.indexOf("/"))}`
                                        let tc = 0,
                                            opt_var = tmp_cmp.elementcode.replace("[", "").replace("]", "").split(",").map(x => { return { text: x.trim(), value: tc++ } })
                                        result.data_part[`${option_variable}`] = opt_var
                                        result.data_part[`${select_variable}`] = opt_var[0].value

                                        result[option_variable] = opt_var
                                        result.exp[`${select_variable}`] = result[option_variable][0].value
                                        result.template += `<b-form-group label-class="font-weight-bold"  label="[R] ${tmp_cmp.description}" v-slot="{ ariaDescribedby }">
                                    <b-form-radio-group
                                        id="radio-group-${local_indicator}"
                                        v-model="exp.${select_variable}"
                                        :options="${option_variable}"
                                        :aria-describedby="ariaDescribedby"
                                        name="radio-options"
                                    ></b-form-radio-group>
                                    </b-form-group>
                                    `
                                    } else {
                                        //render normally this element
                                        result = json2ESPD_v4({ e: tmp_cmp }, result)
                                    }
                                } else if (tmp_cmp.type == 'REQUIREMENT_SUBGROUP') {
                                    if (is_radio_group) {
                                        //The section is shown depending on the value in elementcode field
                                        result.template += `<template v-if="exp.${select_variable}===${result[option_variable].find(ae => ae.text == tmp_cmp.elementcode).value}">`
                                        result = json2ESPD_v4({ e: tmp_cmp }, result)
                                        result.template += `</template>`
                                    } else {
                                        //render normally this element
                                        result = json2ESPD_v4({ e: tmp_cmp }, result)
                                    }
                                } else {
                                    //render normally this element
                                    result = json2ESPD_v4({ e: tmp_cmp }, result)
                                }
                            }
                        }
                    }

                    if (fragment[el].cardinality.toString().trim().endsWith('..n')) {
                        result.template += `<template #footer>
                        <b-button variant="success" @click="html_${stringToProperty(fragment[el].requestpath)} = renderHTML('${fragment[el].requestpath}', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card>`
                    }
                    result.template += `</div>`

                    break;

                case 'QUESTION_GROUP':
                    let local_indicator = ''
                    result.template += `
                        <div v-if="window.espd_doc.role == 'eo'">`
                    if (fragment[el].cardinality.toString().trim().endsWith('..n')) {
                        result.data_part[`html_${stringToProperty(fragment[el].requestpath)}`] = ''
                        result.template += `<div v-html="html_${stringToProperty(fragment[el].requestpath)}"></div>
                        <b-card  v-if="window.espd_doc.role == 'eo'" footer-tag="footer">`
                    }
                    if (Object.hasOwn(fragment[el], 'components')) {
                        for (const e in fragment[el].components) {
                            if (Object.hasOwn(fragment[el].components, e)) {
                                let tmp_cmp = fragment[el].components[e]
                                if (tmp_cmp.type == 'QUESTION') {
                                    if (tmp_cmp.propertydatatype == 'INDICATOR') {
                                        //log(e, '\t', tmp_cmp.propertydatatype)
                                        result.exp[`${stringToProperty(tmp_cmp.responsepath)}`] = false
                                        //result.sel_count++
                                        //local_indicator = (result.sel_count + '').padStart(2, '0')
                                        local_indicator = `${stringToProperty(fragment[el].requestpath)}`
                                        result.template += `
                                            <b-form-checkbox v-model="exp['${local_indicator}']" name="check-button" inline="true" switch>
                                                     [Q] ${tmp_cmp.description} <b>[{{ exp['${local_indicator}']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            `
                                    } else {
                                        //render normally
                                        result = json2ESPD_v4({ e: tmp_cmp }, result)
                                    }
                                }

                                if (['QUESTION_GROUP', 'QUESTION_SUBGROUP'].indexOf(tmp_cmp.type) != -1) {
                                    if (['ONTRUE', 'ONFALSE'].indexOf(tmp_cmp.elementcode) != -1) {
                                        result.template += `
                                        <div v-if="window.espd_doc.role == 'eo' && ${tmp_cmp.elementcode == 'ONTRUE' ? '' : '!'}exp['${local_indicator}']">
                                        `
                                        result = json2ESPD_v4({ e: tmp_cmp }, result)
                                        result.template += `
                                        </div>`
                                    }
                                    if (tmp_cmp.elementcode == 'ON*') {
                                        result.template += `<div  v-if="window.espd_doc.role == 'eo'">`
                                        result = json2ESPD_v4({ e: tmp_cmp }, result)
                                        result.template += '</div>'
                                    }
                                }

                                if (tmp_cmp.type == 'CAPTION') {
                                    result.template += `<div v-if="window.espd_doc.role == 'eo'">${tmp_cmp.description ?? 'CAPTION'}</div>`
                                }

                                if (tmp_cmp.type == 'LEGISLATION') {
                                    result.template += `<em>LEGISLATION</em>`
                                }
                            }
                        }
                    }

                    if (fragment[el].cardinality.toString().trim().endsWith('..n')) {
                        result.template += `<template #footer>
                    <b-button variant="success" @click="html_${stringToProperty(fragment[el].requestpath)} = renderHTML('${fragment[el].requestpath}', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>`
                    }

                    result.template += `
                        </div>`
                    break;

                case 'QUESTION_SUBGROUP':
                    let local_indicator_qsg = ''
                    if (fragment[el].cardinality.toString().trim().endsWith('..n')) {
                        result.data_part[`html_${stringToProperty(fragment[el].responsepath)}`] = ''
                        result.template += `<div v-html="html_${stringToProperty(fragment[el].responsepath)}"></div>
                        <b-card  v-if="window.espd_doc.role == 'eo'" footer-tag="footer">`
                    }

                    if (Object.hasOwn(fragment[el], 'components')) {
                        for (const e in fragment[el].components) {
                            if (Object.hasOwn(fragment[el].components, e)) {
                                let tmp_cmp = fragment[el].components[e]
                                if (tmp_cmp.type == 'QUESTION') {
                                    if (tmp_cmp.propertydatatype == 'INDICATOR') {
                                        result.exp[`${stringToProperty(tmp_cmp.responsepath)}`] = false
                                        local_indicator_qsg = `${stringToProperty(tmp_cmp.responsepath)}`
                                        result.template += `
                                            <b-form-checkbox v-model="exp['${local_indicator_qsg}']" name="check-button" inline="true" switch>
                                                    [Q] ${tmp_cmp.description}  <b>[{{ exp['${local_indicator_qsg}']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            `
                                    } else {
                                        //render as usual
                                        result = json2ESPD_v4({ e: tmp_cmp }, result)
                                    }
                                }

                                if (['QUESTION_GROUP', 'QUESTION_SUBGROUP'].indexOf(tmp_cmp.type) != -1) {
                                    if (['ONTRUE', 'ONFALSE'].indexOf(tmp_cmp.elementcode) != -1) {
                                        result.template += `
                                        <div v-if="window.espd_doc.role == 'eo' && ${tmp_cmp.elementcode == 'ONTRUE' ? '' : '!'}exp['${local_indicator_qsg}']">
                                        `
                                        result = json2ESPD_v4({ e: tmp_cmp }, result)
                                        result.template += `
                                        </div>`
                                    }
                                    if (tmp_cmp.elementcode == 'ON*') {
                                        result.template += `<div  v-if="window.espd_doc.role == 'eo'">`
                                        result = json2ESPD_v4({ e: tmp_cmp }, result)
                                        result.template += '</div>'
                                    }
                                }

                                if (tmp_cmp.type == 'CAPTION') {
                                    result.template += `<div v-if="window.espd_doc.role == 'eo'">${tmp_cmp.description ?? 'CAPTION'}</div>`
                                }

                                if (tmp_cmp.type == 'LEGISLATION') {
                                    result.template += `<em>LEGISLATION</em>`
                                }
                            }
                        }
                    }

                    if (fragment[el].cardinality.toString().trim().endsWith('..n')) {
                        result.template += `<template #footer>
                    <b-button variant="success" @click="html_${stringToProperty(fragment[el].responsepath)} = renderHTML('${fragment[el].requestpath}', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>`
                    }
                    break;

                case 'QUESTION':
                    if (fragment[el].propertydatatype != 'INDICATOR') {
                        result.exp[`${stringToProperty(fragment[el].responsepath)}`] = []
                        //result[fragment[el].responsepath] = true
                        if (fragment[el].cardinality.toString().trim().endsWith('..n')) {
                            result.template += `<b-form-group  v-if="window.espd_doc.role == 'eo'" label="[Q] ${fragment[el].description}" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['${stringToProperty(fragment[el].responsepath)}']" placeholder="Add value"></b-form-tags></b-form-group>`
                        } else {
                            result.template += `
                                <b-form-group  v-if="window.espd_doc.role == 'eo'" label="[Q] ${fragment[el].description}" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="${fragment[el].propertydatatype}" v-model="exp['${stringToProperty(fragment[el].responsepath)}'][0]"></b-form-input>
                                </b-form-group>`
                        }
                    } else {
                        //This should be rendered inside the QG/QSG
                        result.exp[`${stringToProperty(fragment[el].responsepath)}`] = true
                        result.sel_count++
                        //let local_indicator = `${result.sel_count}`.padStart(2, '0')
                        let tmp_li = `${stringToProperty(fragment[el].responsepath)}`
                        result.template += `
                        <b-form-checkbox  v-if="window.espd_doc.role == 'eo'" v-model="exp['${tmp_li}" name="check-button" inline="true" switch>
                        [Q] ${fragment[el].description}  <b>[{{ exp['${tmp_li}']?'Yes':'No' }}]</b>
                        </b-form-checkbox>`
                    }
                    break;

                case 'LEGISLATION':
                    result.template += `<em>LEGISLATION</em>`
                    break;

                case 'ADDITIONAL_DESCRIPTION_LINE': case 'CAPTION':
                    result.template += `<div>${fragment[el].description ?? 'ADDITIONAL CAPTION'}</div>`
                    break;

                case 'REQUIREMENT':
                    result.exp[`${stringToProperty(fragment[el].responsepath)}`] = ''
                    //result[fragment[el].responsepath] = ''    
                    //LOT management
                    if (fragment[el].propertydatatype == 'LOT_IDENTIFIER') {
                        result.exp[`lotid_${fragment[el].responsepath.substring(0, fragment[el].responsepath.indexOf('_'))}`] =
                         window.espd_model[fragment[el].responsepath.substring(0, fragment[el].responsepath.indexOf('_'))].lots ?? []

                        result.template += `
                        <b-form-group label-class="font-weight-bold" label="[R] ${fragment[el].description}" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_${fragment[el].responsepath.substring(0, fragment[el].responsepath.indexOf('_'))}']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_${fragment[el].responsepath.substring(0, fragment[el].responsepath.indexOf('_'))}'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_${fragment[el].responsepath.substring(0, fragment[el].responsepath.indexOf('_'))}'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        `

                    } else {

                        result.template += `
                    <b-form-group label-class="font-weight-bold" label="[R] ${fragment[el].description}"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="${fragment[el].propertydatatype}"></b-form-input>
                    </b-form-group>
                    `
                    }
                    break;

                default:
                    console.log('unknown element: ', fragment[el], '\t', fragment[el].type)
                    break;
            }

        }
    }

    return result
}

/**
 * Class to store the data for ESPD and the structure
 * 
 */
class ESPD {
    tag = ''
    store = new Map()
    structure = new Map()
    cardinalities = new Map()
    raw_data
    static #tags = ['QUESTION', 'REQUIREMENT', 'REQUIREMENT_GROUP', 'REQUIREMENT_SUBGROUP', 'QUESTION_GROUP', 'QUESTION_SUBGROUP', 'SUBCRITERION']

    constructor(tag, obj){
        this.tag = tag
        this.raw_data = obj
        this.structure = this.#exploreComponents(obj.components)
        this.store = this.#buildStore(obj.components)
        this.cardinalities = this.#buildCardinalities(obj.components)
    }

    get tag(){
        return this.tag
    }

    save(path, obj){
        console.log(path, obj)
        if (path == this.tag){
        //strore the entrire structure, only values, zero size arrays do not matter
            for (const key in obj) {
                if (Object.hasOwn(obj, key)) {
                    const element = obj[key]
                    if (!Array.isArray(element)){
                        //store this value
                        let target = path.split('/').slice(1) 
                        //dest = window.espd_ds.get(tag).store
                        //target.shift()
                    }
                }
            }
            
        }else{
        //add sub structure
        }

    }

    #buildCardinalities(obj){
        let result = new Map()
        for (const key in obj) {
            if (Object.hasOwn(obj, key)) {
                const element = obj[key];
                if (Object.hasOwn(element, 'components')){
                    result.set(key, {cardinality: key.cardinality??1,  components:this.#buildCardinalities(element.components)})
                }else{
                    result.set(key, {cardinality: element.cardinality})
                }
            }
        }
        return result
    }

    #exploreComponents(obj){
        let result = new Map()
        for (const key in obj) {
            if (Object.hasOwn(obj, key)) {
                const element = obj[key];
                if(Object.hasOwn(element, 'components')){
                    result.set(key, this.#exploreComponents(element.components))
                }else{
                    result.set(key, null)
                }
            }
        }
        return result
    }

    #buildStore(obj){
        let result = new Map()
        for (const key in obj) {
            if (Object.hasOwn(obj, key)) {
                const element = obj[key];
                if(ESPD.#tags.indexOf(element.type) == -1) continue
                if(Object.hasOwn(element, 'components')){
                    result.set(key, [this.#buildStore(element.components)])
                }else{
                    result.set(key, [])
                }
            }
        }
        return result
    }

    renderHTML(path){
        let result = ''
        return result
    }


}
/**
 * PouchDB Utils
 */


/**
 * PouchDB global variable - browser persistent storage
 */

var GlobalPouchDB = new PouchDB('espd_demo', { auto_compaction: true})

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
      //get the files process them and store them as JSON document
      for(const ver in data.code_lists) {
          if (Object.hasOwn(data.code_lists, ver)) {
             const fname_arr = data.code_lists[ver]
             for (const fname of fname_arr) {
              let thecall = await fetch(`ESPD/codelists/${ver}/${fname}.gc`)
              let xmldata = await thecall.text()
               if (thecall.ok) {
                   const res = await pdb_upsert(`${ver}_${fname}`, {ver: ver, fname: fname, ... gc2JSON(xmldata)})
               }
               
             }
           }
      }
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

//Initialize PouchDB with data from server - no remote database
loadData()
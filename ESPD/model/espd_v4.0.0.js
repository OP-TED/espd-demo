/**
 * VueJS components for ESDP-EDM 
 * generated on 2024-08-28T12:23:18.486Z 
 */



/**
 * Component - CC1 - EG - Participation in a criminal organisation
 */
Vue.component("CC1 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected01": true,
 "selected02": true,
 "selected03": true,
 "selected04": true
}
                        },
                        template: `<div>
                        <b-card title="CC1 - EG - Participation in a criminal organisation">
                            <b-card-text>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for participation in a criminal organisation, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 2 of Council Framework Decision 2008/841/JHA of 24 October 2008 on the fight against organised crime (OJ L 300, 11.11.2008, p. 42).</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-01" v-model="selected01" :options="options" name="radio-options01">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-01" v-model="selected01" name="radio-options01" switch>QUESTION - Your Answer [1]<b>({{ selected01?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-02" v-model="selected02" :options="options" name="radio-options02">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-02" v-model="selected02" name="radio-options02" switch>QUESTION - Your answer [1]<b>({{ selected02?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected02">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Date of conviction [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Reason [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Who has been convicted [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Length of the period of exclusion [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-03" v-model="selected03" :options="options" name="radio-options03">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-03" v-model="selected03" name="radio-options03" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected03?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected03">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-04" v-model="selected04" :options="options" name="radio-options04">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-04" v-model="selected04" name="radio-options04" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected04?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected04">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC2 - EG - Corruption
 */
Vue.component("CC2 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected05": true,
 "selected06": true,
 "selected07": true,
 "selected08": true
}
                        },
                        template: `<div>
                        <b-card title="CC2 - EG - Corruption">
                            <b-card-text>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for corruption, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 3 of the Convention on the fight against corruption involving officials of the European Communities or officials of Member States of the European Union, OJ C 195, 25.6.1997, p. 1, and in Article 2(1) of Council Framework Decision 2003/568/JHA of 22 July 2003 on combating corruption in the private sector (OJ L 192, 31.7.2003, p. 54). This exclusion ground also includes corruption as defined in the national law of the contracting authority (contracting entity) or the economic operator.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-05" v-model="selected05" :options="options" name="radio-options05">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-05" v-model="selected05" name="radio-options05" switch>QUESTION - Your Answer [1]<b>({{ selected05?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-06" v-model="selected06" :options="options" name="radio-options06">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-06" v-model="selected06" name="radio-options06" switch>QUESTION - Your answer [1]<b>({{ selected06?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected06">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Date of conviction [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Reason [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Who has been convicted [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Length of the period of exclusion [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-07" v-model="selected07" :options="options" name="radio-options07">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-07" v-model="selected07" name="radio-options07" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected07?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected07">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-08" v-model="selected08" :options="options" name="radio-options08">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-08" v-model="selected08" name="radio-options08" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected08?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected08">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC3 - EG - Fraud
 */
Vue.component("CC3 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected09": true,
 "selected10": true,
 "selected11": true,
 "selected12": true
}
                        },
                        template: `<div>
                        <b-card title="CC3 - EG - Fraud">
                            <b-card-text>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for fraud, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? Within the meaning of Article 1 of the Convention on the protection of the European Communities' financial interests (OJ C 316, 27.11.1995, p. 48).</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-09" v-model="selected09" :options="options" name="radio-options09">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-09" v-model="selected09" name="radio-options09" switch>QUESTION - Your Answer [1]<b>({{ selected09?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-10" v-model="selected10" :options="options" name="radio-options10">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-10" v-model="selected10" name="radio-options10" switch>QUESTION - Your answer [1]<b>({{ selected10?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected10">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Date of conviction [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Reason [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Who has been convicted [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Length of the period of exclusion [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-11" v-model="selected11" :options="options" name="radio-options11">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-11" v-model="selected11" name="radio-options11" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected11?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected11">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-12" v-model="selected12" :options="options" name="radio-options12">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-12" v-model="selected12" name="radio-options12" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected12?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected12">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC4 - EG - Terrorist offences or offences linked to terrorist activities
 */
Vue.component("CC4 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected13": true,
 "selected14": true,
 "selected15": true,
 "selected16": true
}
                        },
                        template: `<div>
                        <b-card title="CC4 - EG - Terrorist offences or offences linked to terrorist activities">
                            <b-card-text>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for terrorist offences or offences linked to terrorist activities, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Articles 1 and 3 of Council Framework Decision of 13 June 2002 on combating terrorism (OJ L 164, 22.6.2002, p. 3). This exclusion ground also includes inciting or aiding or abetting or attempting to commit an offence, as referred to in Article 4 of that Framework Decision.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-13" v-model="selected13" :options="options" name="radio-options13">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-13" v-model="selected13" name="radio-options13" switch>QUESTION - Your Answer [1]<b>({{ selected13?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-14" v-model="selected14" :options="options" name="radio-options14">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-14" v-model="selected14" name="radio-options14" switch>QUESTION - Your answer [1]<b>({{ selected14?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected14">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Date of conviction [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Reason [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Who has been convicted [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Length of the period of exclusion [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-15" v-model="selected15" :options="options" name="radio-options15">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-15" v-model="selected15" name="radio-options15" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected15?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected15">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-16" v-model="selected16" :options="options" name="radio-options16">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-16" v-model="selected16" name="radio-options16" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected16?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected16">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC5 - EG - Money laundering or terrorist financing
 */
Vue.component("CC5 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected17": true,
 "selected18": true,
 "selected19": true,
 "selected20": true
}
                        },
                        template: `<div>
                        <b-card title="CC5 - EG - Money laundering or terrorist financing">
                            <b-card-text>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for money laundering or terrorist financing, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 1 of Directive 2005/60/EC of the European Parliament and of the Council of 26 October 2005 on the prevention of the use of the financial system for the purpose of money laundering and terrorist financing (OJ L 309, 25.11.2005, p. 15).</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-17" v-model="selected17" :options="options" name="radio-options17">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-17" v-model="selected17" name="radio-options17" switch>QUESTION - Your Answer [1]<b>({{ selected17?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-18" v-model="selected18" :options="options" name="radio-options18">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-18" v-model="selected18" name="radio-options18" switch>QUESTION - Your answer [1]<b>({{ selected18?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected18">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Date of conviction [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Reason [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Who has been convicted [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Length of the period of exclusion [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-19" v-model="selected19" :options="options" name="radio-options19">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-19" v-model="selected19" name="radio-options19" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected19?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected19">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-20" v-model="selected20" :options="options" name="radio-options20">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-20" v-model="selected20" name="radio-options20" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected20?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected20">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC6 - EG - Child labour and other forms of trafficking in human beings
 */
Vue.component("CC6 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected21": true,
 "selected22": true,
 "selected23": true,
 "selected24": true
}
                        },
                        template: `<div>
                        <b-card title="CC6 - EG - Child labour and other forms of trafficking in human beings">
                            <b-card-text>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for child labour and other forms of trafficking in human beings, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 2 of Directive 2011/36/EU of the European Parliament and of the Council of 5 April 2011 on preventing and combating trafficking in human beings and protecting its victims, and replacing Council Framework Decision 2002/629/JHA (OJ L 101, 15.4.2011, p. 1).</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-21" v-model="selected21" :options="options" name="radio-options21">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-21" v-model="selected21" name="radio-options21" switch>QUESTION - Your Answer [1]<b>({{ selected21?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-22" v-model="selected22" :options="options" name="radio-options22">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-22" v-model="selected22" name="radio-options22" switch>QUESTION - Your answer [1]<b>({{ selected22?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected22">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Date of conviction [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Reason [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Who has been convicted [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Length of the period of exclusion [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-23" v-model="selected23" :options="options" name="radio-options23">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-23" v-model="selected23" name="radio-options23" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected23?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected23">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-24" v-model="selected24" :options="options" name="radio-options24">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-24" v-model="selected24" name="radio-options24" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected24?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected24">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC7 - EG - Payment of taxes
 */
Vue.component("CC7 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected25": true,
 "selected26": true,
 "selected27": true,
 "selected28": true,
 "selected29": true,
 "selected30": true
}
                        },
                        template: `<div>
                        <b-card title="CC7 - EG - Payment of taxes">
                            <b-card-text>Has the economic operator breached its obligations relating to the payment of taxes, both in the country in which it is established and in Member State of the contracting authority or contracting entity if other than the country of establishment?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-25" v-model="selected25" :options="options" name="radio-options25">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-25" v-model="selected25" name="radio-options25" switch>QUESTION - Your Answer [1]<b>({{ selected25?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Minimum Amount Threshold [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Additional Information [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Your answer [1]">
                                                <b-form-radio-group id="radio-group-26" v-model="selected26" :options="options" name="radio-options26">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-26" v-model="selected26" name="radio-options26" switch>QUESTION - Your answer [1]<b>({{ selected26?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected26">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Country or member state concerned [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="CODE_COUNTRY"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Amount concerned [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Has this breach of obligations been established by means other than a judicial or administrative decision? [1]">
                                                <b-form-radio-group id="radio-group-27" v-model="selected27" :options="options" name="radio-options27">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-27" v-model="selected27" name="radio-options27" switch>QUESTION - Has this breach of obligations been established by means other than a judicial or administrative decision? [1]<b>({{ selected27?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected27">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe which means were used [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected27">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? [1]">
                                                <b-form-radio-group id="radio-group-28" v-model="selected28" :options="options" name="radio-options28">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-28" v-model="selected28" name="radio-options28" switch>QUESTION - If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? [1]<b>({{ selected28?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected28">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please indicate the date of conviction or decision [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - In case of a conviction insofar as established directly therein, the length of the period of exclusion [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the taxes contributions due, including, where applicable, any interest accrued or fines? [1]">
                                                <b-form-radio-group id="radio-group-29" v-model="selected29" :options="options" name="radio-options29">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-29" v-model="selected29" name="radio-options29" switch>QUESTION - Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the taxes contributions due, including, where applicable, any interest accrued or fines? [1]<b>({{ selected29?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected29">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-30" v-model="selected30" :options="options" name="radio-options30">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-30" v-model="selected30" name="radio-options30" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected30?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected30">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                        </b-card>
                                        </div></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC8 - EG - Payment of social security contributions
 */
Vue.component("CC8 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected31": true,
 "selected32": true,
 "selected33": true,
 "selected34": true,
 "selected35": true,
 "selected36": true
}
                        },
                        template: `<div>
                        <b-card title="CC8 - EG - Payment of social security contributions">
                            <b-card-text>Has the economic operator breached its obligations relating to the payment of social security contributions, both in the country in which it is established and in Member State of the contracting authority or contracting entity if other than the country of establishment?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-31" v-model="selected31" :options="options" name="radio-options31">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-31" v-model="selected31" name="radio-options31" switch>QUESTION - Your Answer [1]<b>({{ selected31?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Minimum Amount Threshold [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Additional Information [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Your answer [1]">
                                                <b-form-radio-group id="radio-group-32" v-model="selected32" :options="options" name="radio-options32">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-32" v-model="selected32" name="radio-options32" switch>QUESTION - Your answer [1]<b>({{ selected32?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected32">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Country or member state concerned [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="CODE_COUNTRY"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Amount concerned [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Has this breach of obligations been established by means other than a judicial or administrative decision? [1]">
                                                <b-form-radio-group id="radio-group-33" v-model="selected33" :options="options" name="radio-options33">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-33" v-model="selected33" name="radio-options33" switch>QUESTION - Has this breach of obligations been established by means other than a judicial or administrative decision? [1]<b>({{ selected33?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected33">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe which means were used [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected33">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? [1]">
                                                <b-form-radio-group id="radio-group-34" v-model="selected34" :options="options" name="radio-options34">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-34" v-model="selected34" name="radio-options34" switch>QUESTION - If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? [1]<b>({{ selected34?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected34">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please indicate the date of conviction or decision [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - In case of a conviction insofar as established directly therein, the length of the period of exclusion [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the social security contributions due, including, where applicable, any interest accrued or fines? [1]">
                                                <b-form-radio-group id="radio-group-35" v-model="selected35" :options="options" name="radio-options35">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-35" v-model="selected35" name="radio-options35" switch>QUESTION - Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the social security contributions due, including, where applicable, any interest accrued or fines? [1]<b>({{ selected35?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected35">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-36" v-model="selected36" :options="options" name="radio-options36">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-36" v-model="selected36" name="radio-options36" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected36?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected36">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                        </b-card>
                                        </div></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC9 - EG - Breaching of obligations in the fields of environmental law
 */
Vue.component("CC9 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected37": true,
 "selected38": true,
 "selected39": true,
 "selected40": true
}
                        },
                        template: `<div>
                        <b-card title="CC9 - EG - Breaching of obligations in the fields of environmental law">
                            <b-card-text>Has the economic operator, to its knowledge, breached its obligations in the fields of environmental law? As referred to for the purposes of this procurement in national law, in the ESPD, the relevant notice or the in the ESPD, the relevant notice or , in Article 18(2) of Directive 2014/24/EU or in the ESPD.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-37" v-model="selected37" :options="options" name="radio-options37">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-37" v-model="selected37" name="radio-options37" switch>QUESTION - Your Answer [1]<b>({{ selected37?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-38" v-model="selected38" :options="options" name="radio-options38">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-38" v-model="selected38" name="radio-options38" switch>QUESTION - Your answer [1]<b>({{ selected38?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected38">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-39" v-model="selected39" :options="options" name="radio-options39">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-39" v-model="selected39" name="radio-options39" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected39?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected39">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-40" v-model="selected40" :options="options" name="radio-options40">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-40" v-model="selected40" name="radio-options40" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected40?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected40">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC10 - EG - Breaching of obligations in the fields of social law
 */
Vue.component("CC10 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected41": true,
 "selected42": true,
 "selected43": true,
 "selected44": true
}
                        },
                        template: `<div>
                        <b-card title="CC10 - EG - Breaching of obligations in the fields of social law">
                            <b-card-text>Has the economic operator, to its knowledge, breached its obligations in the fields of social law? As referred to for the purposes of this procurement in national law, in the ESPD, the relevant notice or the in the ESPD, the relevant notice or in Article 18(2) of Directive 2014/24/EU.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-41" v-model="selected41" :options="options" name="radio-options41">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-41" v-model="selected41" name="radio-options41" switch>QUESTION - Your Answer [1]<b>({{ selected41?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-42" v-model="selected42" :options="options" name="radio-options42">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-42" v-model="selected42" name="radio-options42" switch>QUESTION - Your answer [1]<b>({{ selected42?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected42">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-43" v-model="selected43" :options="options" name="radio-options43">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-43" v-model="selected43" name="radio-options43" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected43?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected43">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-44" v-model="selected44" :options="options" name="radio-options44">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-44" v-model="selected44" name="radio-options44" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected44?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected44">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC11 - EG - Breaching of obligations in the fields of labour law
 */
Vue.component("CC11 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected45": true,
 "selected46": true,
 "selected47": true,
 "selected48": true
}
                        },
                        template: `<div>
                        <b-card title="CC11 - EG - Breaching of obligations in the fields of labour law">
                            <b-card-text>Has the economic operator, to its knowledge, breached its obligations in the fields of labour law? As referred to for the purposes of this procurement in national law, in the relevant notice or the in the ESPD, the relevant notice or in Article 18(2) of Directive 2014/24/EU.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-45" v-model="selected45" :options="options" name="radio-options45">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-45" v-model="selected45" name="radio-options45" switch>QUESTION - Your Answer [1]<b>({{ selected45?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-46" v-model="selected46" :options="options" name="radio-options46">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-46" v-model="selected46" name="radio-options46" switch>QUESTION - Your answer [1]<b>({{ selected46?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected46">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-47" v-model="selected47" :options="options" name="radio-options47">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-47" v-model="selected47" name="radio-options47" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected47?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected47">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-48" v-model="selected48" :options="options" name="radio-options48">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-48" v-model="selected48" name="radio-options48" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected48?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected48">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC12 - EG - Bankruptcy
 */
Vue.component("CC12 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected49": true,
 "selected50": true,
 "selected51": true
}
                        },
                        template: `<div>
                        <b-card title="CC12 - EG - Bankruptcy">
                            <b-card-text>Is the economic operator bankrupt? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-49" v-model="selected49" :options="options" name="radio-options49">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-49" v-model="selected49" name="radio-options49" switch>QUESTION - Your Answer [1]<b>({{ selected49?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-50" v-model="selected50" :options="options" name="radio-options50">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-50" v-model="selected50" name="radio-options50" switch>QUESTION - Your answer [1]<b>({{ selected50?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected50">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Indicate reasons for being nevertheless to perform the contract [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-51" v-model="selected51" :options="options" name="radio-options51">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-51" v-model="selected51" name="radio-options51" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected51?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected51">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC13 - EG - Insolvency
 */
Vue.component("CC13 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected52": true,
 "selected53": true,
 "selected54": true
}
                        },
                        template: `<div>
                        <b-card title="CC13 - EG - Insolvency">
                            <b-card-text>Is the economic operator the subject of insolvency or winding-up? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-52" v-model="selected52" :options="options" name="radio-options52">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-52" v-model="selected52" name="radio-options52" switch>QUESTION - Your Answer [1]<b>({{ selected52?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-53" v-model="selected53" :options="options" name="radio-options53">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-53" v-model="selected53" name="radio-options53" switch>QUESTION - Your answer [1]<b>({{ selected53?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected53">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Indicate reasons for being nevertheless to perform the contract [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-54" v-model="selected54" :options="options" name="radio-options54">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-54" v-model="selected54" name="radio-options54" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected54?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected54">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC14 - EG - Arrangement with creditors
 */
Vue.component("CC14 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected55": true,
 "selected56": true,
 "selected57": true
}
                        },
                        template: `<div>
                        <b-card title="CC14 - EG - Arrangement with creditors">
                            <b-card-text>Is the economic operator in arrangement with creditors? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-55" v-model="selected55" :options="options" name="radio-options55">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-55" v-model="selected55" name="radio-options55" switch>QUESTION - Your Answer [1]<b>({{ selected55?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-56" v-model="selected56" :options="options" name="radio-options56">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-56" v-model="selected56" name="radio-options56" switch>QUESTION - Your answer [1]<b>({{ selected56?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected56">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Indicate reasons for being nevertheless to perform the contract [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-57" v-model="selected57" :options="options" name="radio-options57">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-57" v-model="selected57" name="radio-options57" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected57?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected57">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC15 - EG - Analogous situation like bankruptcy under national law
 */
Vue.component("CC15 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected58": true,
 "selected59": true,
 "selected60": true
}
                        },
                        template: `<div>
                        <b-card title="CC15 - EG - Analogous situation like bankruptcy under national law">
                            <b-card-text>Is the economic operator in any analogous situation like bankruptcy arising from a similar procedure under national laws and regulations? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-58" v-model="selected58" :options="options" name="radio-options58">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-58" v-model="selected58" name="radio-options58" switch>QUESTION - Your Answer [1]<b>({{ selected58?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-59" v-model="selected59" :options="options" name="radio-options59">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-59" v-model="selected59" name="radio-options59" switch>QUESTION - Your answer [1]<b>({{ selected59?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected59">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Indicate reasons for being nevertheless to perform the contract [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-60" v-model="selected60" :options="options" name="radio-options60">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-60" v-model="selected60" name="radio-options60" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected60?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected60">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC16 - EG - Assets being administered by liquidator
 */
Vue.component("CC16 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected61": true,
 "selected62": true,
 "selected63": true
}
                        },
                        template: `<div>
                        <b-card title="CC16 - EG - Assets being administered by liquidator">
                            <b-card-text>Are the assets of the economic operator being administered by a liquidator or by the court? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-61" v-model="selected61" :options="options" name="radio-options61">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-61" v-model="selected61" name="radio-options61" switch>QUESTION - Your Answer [1]<b>({{ selected61?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-62" v-model="selected62" :options="options" name="radio-options62">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-62" v-model="selected62" name="radio-options62" switch>QUESTION - Your answer [1]<b>({{ selected62?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected62">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Indicate reasons for being nevertheless to perform the contract [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-63" v-model="selected63" :options="options" name="radio-options63">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-63" v-model="selected63" name="radio-options63" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected63?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected63">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC17 - EG - Business activities are suspended
 */
Vue.component("CC17 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected64": true,
 "selected65": true,
 "selected66": true
}
                        },
                        template: `<div>
                        <b-card title="CC17 - EG - Business activities are suspended">
                            <b-card-text>Are the business activities of the economic operator suspended? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-64" v-model="selected64" :options="options" name="radio-options64">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-64" v-model="selected64" name="radio-options64" switch>QUESTION - Your Answer [1]<b>({{ selected64?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-65" v-model="selected65" :options="options" name="radio-options65">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-65" v-model="selected65" name="radio-options65" switch>QUESTION - Your answer [1]<b>({{ selected65?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected65">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Indicate reasons for being nevertheless to perform the contract [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-66" v-model="selected66" :options="options" name="radio-options66">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-66" v-model="selected66" name="radio-options66" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected66?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected66">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC18 - EG - Guilty of grave professional misconduct
 */
Vue.component("CC18 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected67": true,
 "selected68": true,
 "selected69": true,
 "selected70": true
}
                        },
                        template: `<div>
                        <b-card title="CC18 - EG - Guilty of grave professional misconduct">
                            <b-card-text>Is the economic operator guilty of grave professional misconduct? Where applicable, see definitions in national law, the relevant notice or the procurement documents.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-67" v-model="selected67" :options="options" name="radio-options67">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-67" v-model="selected67" name="radio-options67" switch>QUESTION - Your Answer [1]<b>({{ selected67?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-68" v-model="selected68" :options="options" name="radio-options68">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-68" v-model="selected68" name="radio-options68" switch>QUESTION - Your answer [1]<b>({{ selected68?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected68">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability [1]">
                                                <b-form-radio-group id="radio-group-69" v-model="selected69" :options="options" name="radio-options69">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-69" v-model="selected69" name="radio-options69" switch>QUESTION - Have you taken measures to demonstrate your reliability [1]<b>({{ selected69?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected69">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-70" v-model="selected70" :options="options" name="radio-options70">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-70" v-model="selected70" name="radio-options70" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected70?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected70">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC19 - EG - Agreements with other economic operators aimed at distorting competition
 */
Vue.component("CC19 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected71": true,
 "selected72": true,
 "selected73": true,
 "selected74": true
}
                        },
                        template: `<div>
                        <b-card title="CC19 - EG - Agreements with other economic operators aimed at distorting competition">
                            <b-card-text>Has the economic operator entered into agreements with other economic operators aimed at distorting competition?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-71" v-model="selected71" :options="options" name="radio-options71">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-71" v-model="selected71" name="radio-options71" switch>QUESTION - Your Answer [1]<b>({{ selected71?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-72" v-model="selected72" :options="options" name="radio-options72">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-72" v-model="selected72" name="radio-options72" switch>QUESTION - Your answer [1]<b>({{ selected72?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected72">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability [1]">
                                                <b-form-radio-group id="radio-group-73" v-model="selected73" :options="options" name="radio-options73">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-73" v-model="selected73" name="radio-options73" switch>QUESTION - Have you taken measures to demonstrate your reliability [1]<b>({{ selected73?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected73">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-74" v-model="selected74" :options="options" name="radio-options74">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-74" v-model="selected74" name="radio-options74" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected74?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected74">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC20 - EG - Conflict of interest due to its participation in the procurement procedure
 */
Vue.component("CC20 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected75": true,
 "selected76": true,
 "selected77": true
}
                        },
                        template: `<div>
                        <b-card title="CC20 - EG - Conflict of interest due to its participation in the procurement procedure">
                            <b-card-text>Is the economic operator aware of any conflict of interest, as indicated in national law, the relevant notice or in the ESPD, the relevant notice or due to its participation in the procurement procedure?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-75" v-model="selected75" :options="options" name="radio-options75">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-75" v-model="selected75" name="radio-options75" switch>QUESTION - Your Answer [1]<b>({{ selected75?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-76" v-model="selected76" :options="options" name="radio-options76">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-76" v-model="selected76" name="radio-options76" switch>QUESTION - Your answer [1]<b>({{ selected76?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected76">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-77" v-model="selected77" :options="options" name="radio-options77">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-77" v-model="selected77" name="radio-options77" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected77?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected77">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC21 - EG - Direct or indirect involvement in the preparation of this procurement procedure
 */
Vue.component("CC21 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected78": true,
 "selected79": true,
 "selected80": true
}
                        },
                        template: `<div>
                        <b-card title="CC21 - EG - Direct or indirect involvement in the preparation of this procurement procedure">
                            <b-card-text>Has the economic operator or an undertaking related to it advised the contracting authority or contracting entity or otherwise been involved in the preparation of the procurement procedure?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-78" v-model="selected78" :options="options" name="radio-options78">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-78" v-model="selected78" name="radio-options78" switch>QUESTION - Your Answer [1]<b>({{ selected78?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-79" v-model="selected79" :options="options" name="radio-options79">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-79" v-model="selected79" name="radio-options79" switch>QUESTION - Your answer [1]<b>({{ selected79?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected79">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-80" v-model="selected80" :options="options" name="radio-options80">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-80" v-model="selected80" name="radio-options80" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected80?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected80">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC22 - EG - Early termination, damages or other comparable sanctions
 */
Vue.component("CC22 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected81": true,
 "selected82": true,
 "selected83": true,
 "selected84": true
}
                        },
                        template: `<div>
                        <b-card title="CC22 - EG - Early termination, damages or other comparable sanctions">
                            <b-card-text>Has the economic operator experienced that a prior public contract, a prior contract with a contracting entity or a prior concession contract was terminated early, or that damages or other comparable sanctions were imposed in connection with that prior contract?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-81" v-model="selected81" :options="options" name="radio-options81">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-81" v-model="selected81" name="radio-options81" switch>QUESTION - Your Answer [1]<b>({{ selected81?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-82" v-model="selected82" :options="options" name="radio-options82">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-82" v-model="selected82" name="radio-options82" switch>QUESTION - Your answer [1]<b>({{ selected82?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected82">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]">
                                                <b-form-radio-group id="radio-group-83" v-model="selected83" :options="options" name="radio-options83">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-83" v-model="selected83" name="radio-options83" switch>QUESTION - Have you taken measures to demonstrate your reliability (Self-Cleaning)? [1]<b>({{ selected83?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected83">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-84" v-model="selected84" :options="options" name="radio-options84">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-84" v-model="selected84" name="radio-options84" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected84?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected84">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC23 - EG - Guilty of misrepresentation, withheld information, unable to provide required documents and obtained confidential information of this procedure
 */
Vue.component("CC23 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected85": true,
 "selected86": true,
 "selected87": true
}
                        },
                        template: `<div>
                        <b-card title="CC23 - EG - Guilty of misrepresentation, withheld information, unable to provide required documents and obtained confidential information of this procedure">
                            <b-card-text>Can the economic operator confirm that:</b-card-text>
                        <b-card-text>ADDITIONAL_DESCRIPTION_LINE - a) It has been guilty of serious misrepresentation in supplying the information required for the verification of the absence of grounds for exclusion or the fulfilment of the selection criteria,</b-card-text><b-card-text>ADDITIONAL_DESCRIPTION_LINE - b) It has withheld such information,</b-card-text><b-card-text>ADDITIONAL_DESCRIPTION_LINE - c) It has not been able, without delay, to submit the supporting documents required by a contracting authority or contracting entity, and</b-card-text><b-card-text>ADDITIONAL_DESCRIPTION_LINE - d) It has undertaken to unduly influence the decision making process of the contracting authority or contracting entity, to obtain confidential information that may confer upon it undue advantages in the procurement procedure or to negligently provide misleading information that may have a material influence on decisions concerning exclusion, selection or award?</b-card-text><b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-85" v-model="selected85" :options="options" name="radio-options85">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-85" v-model="selected85" name="radio-options85" switch>QUESTION - Your Answer [1]<b>({{ selected85?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer [1]">
                                            <b-form-radio-group id="radio-group-86" v-model="selected86" :options="options" name="radio-options86">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-86" v-model="selected86" name="radio-options86" switch>QUESTION - Your answer [1]<b>({{ selected86?'Yes':'No' }})</b-form-checkbox><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-87" v-model="selected87" :options="options" name="radio-options87">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-87" v-model="selected87" name="radio-options87" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected87?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected87">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC24 - EG - Purely national exclusion grounds
 */
Vue.component("CC24 - EG",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected88": true,
 "selected89": true
}
                        },
                        template: `<div>
                        <b-card title="CC24 - EG - Purely national exclusion grounds">
                            <b-card-text>Other exclusion grounds that may be foreseen in the national legislation of the contracting authority's or contracting entity's Member State. Has the economic operator breached its obligations relating to the purely national grounds of exclusion, which are specified in the relevant notice or in the procurement documents?</b-card-text>
                        <b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - undefined</b-card-text><b-card class="my-1"> <p>Cardinality [<em>1..n</em>]</p><b-card-text>CAPTION - [Text describing the national criterion]</b-card-text><b-card-text>CAPTION - [Type of evidence from e-Certis]</b-card-text>
                                        <!--    
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                                <b-form-radio-group id="radio-group-88" v-model="selected88" :options="options" name="radio-options88">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-88" v-model="selected88" name="radio-options88" switch>QUESTION - Your answer? [1]<b>({{ selected88?'Yes':'No' }})</b-form-checkbox><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-89" v-model="selected89" :options="options" name="radio-options89">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-89" v-model="selected89" name="radio-options89" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected89?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected89">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC25 - SC - Enrolment in a relevant professional register
 */
Vue.component("CC25 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected90": true,
 "selected91": true,
 "selected92": true,
 "selected93": true,
 "selected94": true,
 "selected95": true,
 "selected96": true,
 "selected97": true,
 "selected98": true,
 "selected99": true,
 "selected100": true,
 "selected101": true,
 "selected102": true,
 "selected103": true,
 "selected104": true,
 "selected105": true,
 "selected106": true
}
                        },
                        template: `<div>
                        <b-card title="CC25 - SC - Enrolment in a relevant professional register">
                            <b-card-text>It is enrolled in relevant professional registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-90" v-model="selected90" :options="options" name="radio-options90">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-90" v-model="selected90" name="radio-options90" switch>QUESTION - Your Answer [1]<b>({{ selected90?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - occupation [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-91" v-model="selected91" :options="options" name="radio-options91">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-91" v-model="selected91" name="radio-options91" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected91?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected91">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-92" v-model="selected92" :options="options" name="radio-options92">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-92" v-model="selected92" name="radio-options92" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected92?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected92">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                                <b-form-radio-group id="radio-group-93" v-model="selected93" :options="options" name="radio-options93">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-93" v-model="selected93" name="radio-options93" switch>QUESTION - Your Answer [1]<b>({{ selected93?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected93">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Registration number [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected93">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Reasons why your are not registered [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-94" v-model="selected94" :options="options" name="radio-options94">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-94" v-model="selected94" name="radio-options94" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected94?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected94">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card>
                    <b-form-group label="REQUIREMENT - occupation [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-95" v-model="selected95" :options="options" name="radio-options95">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-95" v-model="selected95" name="radio-options95" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected95?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected95">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-96" v-model="selected96" :options="options" name="radio-options96">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-96" v-model="selected96" name="radio-options96" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected96?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected96">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                                <b-form-radio-group id="radio-group-97" v-model="selected97" :options="options" name="radio-options97">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-97" v-model="selected97" name="radio-options97" switch>QUESTION - Your Answer [1]<b>({{ selected97?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected97">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Registration number [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected97">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Reasons why your are not registered [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-98" v-model="selected98" :options="options" name="radio-options98">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-98" v-model="selected98" name="radio-options98" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected98?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected98">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - occupation [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-99" v-model="selected99" :options="options" name="radio-options99">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-99" v-model="selected99" name="radio-options99" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected99?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected99">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-100" v-model="selected100" :options="options" name="radio-options100">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-100" v-model="selected100" name="radio-options100" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected100?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected100">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                                <b-form-radio-group id="radio-group-101" v-model="selected101" :options="options" name="radio-options101">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-101" v-model="selected101" name="radio-options101" switch>QUESTION - Your Answer [1]<b>({{ selected101?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected101">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Registration number [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected101">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Reasons why your are not registered [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-102" v-model="selected102" :options="options" name="radio-options102">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-102" v-model="selected102" name="radio-options102" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected102?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected102">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card>
                    <b-form-group label="REQUIREMENT - occupation [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-103" v-model="selected103" :options="options" name="radio-options103">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-103" v-model="selected103" name="radio-options103" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected103?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected103">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-104" v-model="selected104" :options="options" name="radio-options104">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-104" v-model="selected104" name="radio-options104" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected104?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected104">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                                <b-form-radio-group id="radio-group-105" v-model="selected105" :options="options" name="radio-options105">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-105" v-model="selected105" name="radio-options105" switch>QUESTION - Your Answer [1]<b>({{ selected105?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected105">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Registration number [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected105">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Reasons why your are not registered [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-106" v-model="selected106" :options="options" name="radio-options106">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-106" v-model="selected106" name="radio-options106" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected106?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected106">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC26 - SC - Enrolment in a trade register
 */
Vue.component("CC26 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected107": true,
 "selected108": true,
 "selected109": true,
 "selected110": true,
 "selected111": true
}
                        },
                        template: `<div>
                        <b-card title="CC26 - SC - Enrolment in a trade register">
                            <b-card-text>It is enrolled in trade registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-107" v-model="selected107" :options="options" name="radio-options107">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-107" v-model="selected107" name="radio-options107" switch>QUESTION - Your Answer [1]<b>({{ selected107?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Register name [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - URL [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-108" v-model="selected108" :options="options" name="radio-options108">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-108" v-model="selected108" name="radio-options108" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected108?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected108">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-109" v-model="selected109" :options="options" name="radio-options109">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-109" v-model="selected109" name="radio-options109" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected109?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected109">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                                <b-form-radio-group id="radio-group-110" v-model="selected110" :options="options" name="radio-options110">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-110" v-model="selected110" name="radio-options110" switch>QUESTION - Your Answer [1]<b>({{ selected110?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected110">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Registration number [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected110">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Reasons why your are not registered [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-111" v-model="selected111" :options="options" name="radio-options111">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-111" v-model="selected111" name="radio-options111" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected111?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected111">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC27 - SC - For service contracts: authorisation of particular organisation needed
 */
Vue.component("CC27 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected112": true,
 "selected113": true,
 "selected114": true,
 "selected115": true,
 "selected116": true,
 "selected117": true
}
                        },
                        template: `<div>
                        <b-card title="CC27 - SC - For service contracts: authorisation of particular organisation needed">
                            <b-card-text>Is a particular authorisation of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-112" v-model="selected112" :options="options" name="radio-options112">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-112" v-model="selected112" name="radio-options112" switch>QUESTION - Your Answer [1]<b>({{ selected112?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected112">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - If yes, please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        <!--    
                                        <b-form-group label="QUESTION - Indicate whether the economic operator has it [0..1]">
                                                <b-form-radio-group id="radio-group-113" v-model="selected113" :options="options" name="radio-options113">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-113" v-model="selected113" name="radio-options113" switch>QUESTION - Indicate whether the economic operator has it [0..1]<b>({{ selected113?'Yes':'No' }})</b-form-checkbox>
                                    </b-card>
                                    </div>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Register name [0..1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - URL [0..1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-114" v-model="selected114" :options="options" name="radio-options114">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-114" v-model="selected114" name="radio-options114" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected114?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected114">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-115" v-model="selected115" :options="options" name="radio-options115">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-115" v-model="selected115" name="radio-options115" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected115?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected115">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                                <b-form-radio-group id="radio-group-116" v-model="selected116" :options="options" name="radio-options116">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-116" v-model="selected116" name="radio-options116" switch>QUESTION - Your Answer [1]<b>({{ selected116?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected116">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Registration number [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected116">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Reasons why your are not registered [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-117" v-model="selected117" :options="options" name="radio-options117">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-117" v-model="selected117" name="radio-options117" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected117?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected117">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC28 - SC - For service contracts: membership of particular organisation needed
 */
Vue.component("CC28 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected118": true,
 "selected119": true,
 "selected120": true,
 "selected121": true,
 "selected122": true,
 "selected123": true
}
                        },
                        template: `<div>
                        <b-card title="CC28 - SC - For service contracts: membership of particular organisation needed">
                            <b-card-text>Is a particular membership of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-118" v-model="selected118" :options="options" name="radio-options118">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-118" v-model="selected118" name="radio-options118" switch>QUESTION - Your Answer [1]<b>({{ selected118?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected118">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - If yes, please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        <!--    
                                        <b-form-group label="QUESTION - Indicate whether the economic operator has it [0..1]">
                                                <b-form-radio-group id="radio-group-119" v-model="selected119" :options="options" name="radio-options119">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-119" v-model="selected119" name="radio-options119" switch>QUESTION - Indicate whether the economic operator has it [0..1]<b>({{ selected119?'Yes':'No' }})</b-form-checkbox>
                                    </b-card>
                                    </div>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Register name [0..1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - URL [0..1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-120" v-model="selected120" :options="options" name="radio-options120">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-120" v-model="selected120" name="radio-options120" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected120?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected120">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-121" v-model="selected121" :options="options" name="radio-options121">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-121" v-model="selected121" name="radio-options121" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected121?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected121">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                                <b-form-radio-group id="radio-group-122" v-model="selected122" :options="options" name="radio-options122">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-122" v-model="selected122" name="radio-options122" switch>QUESTION - Your Answer [1]<b>({{ selected122?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected122">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Registration number [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected122">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Reasons why your are not registered [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-123" v-model="selected123" :options="options" name="radio-options123">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-123" v-model="selected123" name="radio-options123" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected123?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected123">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC29 - SC - General yearly turnover
 */
Vue.component("CC29 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected124": true,
 "selected125": true,
 "selected126": true,
 "selected127": true,
 "selected128": true
}
                        },
                        template: `<div>
                        <b-card title="CC29 - SC - General yearly turnover">
                            <b-card-text>Its general yearly turnover for the number of financial years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-124" v-model="selected124" :options="options" name="radio-options124">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-124" v-model="selected124" name="radio-options124" switch>QUESTION - Your Answer [1]<b>({{ selected124?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Number of fiscal years [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Threshold per year [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE_BOOLEAN"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Minimum amount requirement [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-125" v-model="selected125" :options="options" name="radio-options125">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-125" v-model="selected125" name="radio-options125" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected125?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected125">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-126" v-model="selected126" :options="options" name="radio-options126">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-126" v-model="selected126" name="radio-options126" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected126?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected126">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Start date; End date [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Amount [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-127" v-model="selected127" :options="options" name="radio-options127">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-127" v-model="selected127" name="radio-options127" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected127?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected127">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                            <b-form-group label="QUESTION - In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading: [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-128" v-model="selected128" :options="options" name="radio-options128">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-128" v-model="selected128" name="radio-options128" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected128?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected128">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC30 - SC - Average yearly turnover
 */
Vue.component("CC30 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected129": true,
 "selected130": true,
 "selected131": true,
 "selected132": true,
 "selected133": true
}
                        },
                        template: `<div>
                        <b-card title="CC30 - SC - Average yearly turnover">
                            <b-card-text>Its average yearly turnover for the number of years required in the relevant notice, the procurement documents or the ESPD is as follows:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-129" v-model="selected129" :options="options" name="radio-options129">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-129" v-model="selected129" name="radio-options129" switch>QUESTION - Your Answer [1]<b>({{ selected129?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Number of fiscal years [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Minimum amount requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-130" v-model="selected130" :options="options" name="radio-options130">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-130" v-model="selected130" name="radio-options130" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected130?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected130">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-131" v-model="selected131" :options="options" name="radio-options131">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-131" v-model="selected131" name="radio-options131" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected131?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected131">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Average for the required period [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Additional information [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-132" v-model="selected132" :options="options" name="radio-options132">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-132" v-model="selected132" name="radio-options132" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected132?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected132">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                            <b-form-group label="QUESTION - In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading: [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-133" v-model="selected133" :options="options" name="radio-options133">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-133" v-model="selected133" name="radio-options133" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected133?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected133">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC31 - SC - Specific average turnover
 */
Vue.component("CC31 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected134": true,
 "selected135": true,
 "selected136": true,
 "selected137": true,
 "selected138": true
}
                        },
                        template: `<div>
                        <b-card title="CC31 - SC - Specific average turnover">
                            <b-card-text>Its specific average yearly turnover in the business area covered by the contract for the number of years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-134" v-model="selected134" :options="options" name="radio-options134">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-134" v-model="selected134" name="radio-options134" switch>QUESTION - Your Answer [1]<b>({{ selected134?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Number of fiscal years [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Business domain description [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Minimum amount requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-135" v-model="selected135" :options="options" name="radio-options135">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-135" v-model="selected135" name="radio-options135" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected135?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected135">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-136" v-model="selected136" :options="options" name="radio-options136">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-136" v-model="selected136" name="radio-options136" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected136?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected136">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Start date; End date [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Amount [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-137" v-model="selected137" :options="options" name="radio-options137">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-137" v-model="selected137" name="radio-options137" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected137?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected137">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                            <b-form-group label="QUESTION - In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading: [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-138" v-model="selected138" :options="options" name="radio-options138">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-138" v-model="selected138" name="radio-options138" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected138?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected138">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC32 - SC - Specific yearly turnover
 */
Vue.component("CC32 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected139": true,
 "selected140": true,
 "selected141": true,
 "selected142": true,
 "selected143": true,
 "selected144": true,
 "selected145": true,
 "selected146": true,
 "selected147": true
}
                        },
                        template: `<div>
                        <b-card title="CC32 - SC - Specific yearly turnover">
                            <b-card-text>Its specific yearly turnover in the business area covered by the contract for the number of financial years required in the relevant notice, in the ESPD, the relevant notice or the ESPD is as follows:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-139" v-model="selected139" :options="options" name="radio-options139">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-139" v-model="selected139" name="radio-options139" switch>QUESTION - Your Answer [1]<b>({{ selected139?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Number of fiscal years [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Business domain description [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Minimum amount requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-140" v-model="selected140" :options="options" name="radio-options140">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-140" v-model="selected140" name="radio-options140" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected140?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected140">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-141" v-model="selected141" :options="options" name="radio-options141">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-141" v-model="selected141" name="radio-options141" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected141?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected141">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Start date; End date [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Amount [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-142" v-model="selected142" :options="options" name="radio-options142">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-142" v-model="selected142" name="radio-options142" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected142?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected142">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                            <b-form-group label="QUESTION - In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading: [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-143" v-model="selected143" :options="options" name="radio-options143">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-143" v-model="selected143" name="radio-options143" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected143?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected143">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Number of fiscal years [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Business domain description [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Minimum amount requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-144" v-model="selected144" :options="options" name="radio-options144">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-144" v-model="selected144" name="radio-options144" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected144?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected144">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-145" v-model="selected145" :options="options" name="radio-options145">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-145" v-model="selected145" name="radio-options145" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected145?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected145">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Start date; End date [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Amount [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-146" v-model="selected146" :options="options" name="radio-options146">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-146" v-model="selected146" name="radio-options146" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected146?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected146">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                            <b-form-group label="QUESTION - In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading: [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-147" v-model="selected147" :options="options" name="radio-options147">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-147" v-model="selected147" name="radio-options147" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected147?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected147">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC34 - SC - Financial ratio
 */
Vue.component("CC34 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected148": true,
 "selected149": true,
 "selected150": true
}
                        },
                        template: `<div>
                        <b-card title="CC34 - SC - Financial ratio">
                            <b-card-text>Concerning the financial ratios specified in the relevant notice, the in the ESPD, the relevant notice or the ESPD, the economic operator declares that the actual values for the required ratios are as follows:</b-card-text>
                        <b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Select the periods applicable for all ratios [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="PERIOD"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Ratio Type [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Definition [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Minimum ratio requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY"></b-form-input>
                    </b-form-group>
                    </b-card>
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-148" v-model="selected148" :options="options" name="radio-options148">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-148" v-model="selected148" name="radio-options148" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected148?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected148">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-149" v-model="selected149" :options="options" name="radio-options149">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-149" v-model="selected149" name="radio-options149" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected149?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected149">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Please provide your ratio [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-150" v-model="selected150" :options="options" name="radio-options150">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-150" v-model="selected150" name="radio-options150" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected150?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected150">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC35 - SC - Professional risk indemnity insurance
 */
Vue.component("CC35 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected151": true,
 "selected152": true,
 "selected153": true,
 "selected154": true,
 "selected155": true,
 "selected156": true
}
                        },
                        template: `<div>
                        <b-card title="CC35 - SC - Professional risk indemnity insurance">
                            <b-card-text>The insured amount in its professional risk indemnity insurance is the following:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-151" v-model="selected151" :options="options" name="radio-options151">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-151" v-model="selected151" name="radio-options151" switch>QUESTION - Your Answer [1]<b>({{ selected151?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Type of insurance [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Minimum amount [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-152" v-model="selected152" :options="options" name="radio-options152">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-152" v-model="selected152" name="radio-options152" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected152?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected152">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-153" v-model="selected153" :options="options" name="radio-options153">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-153" v-model="selected153" name="radio-options153" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected153?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected153">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Amount [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                        <!--    
                                        <b-form-group label="QUESTION - As an EO I will commit to obtain the minimum amount required [1]">
                                                <b-form-radio-group id="radio-group-154" v-model="selected154" :options="options" name="radio-options154">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-154" v-model="selected154" name="radio-options154" switch>QUESTION - As an EO I will commit to obtain the minimum amount required [1]<b>({{ selected154?'Yes':'No' }})</b-form-checkbox>
                                        <!--    
                                        <b-form-group label="QUESTION - I am exempt [1]">
                                                <b-form-radio-group id="radio-group-155" v-model="selected155" :options="options" name="radio-options155">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-155" v-model="selected155" name="radio-options155" switch>QUESTION - I am exempt [1]<b>({{ selected155?'Yes':'No' }})</b-form-checkbox><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-156" v-model="selected156" :options="options" name="radio-options156">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-156" v-model="selected156" name="radio-options156" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected156?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected156">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC36 - SC - Other economic or financial requirements
 */
Vue.component("CC36 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected157": true,
 "selected158": true,
 "selected159": true,
 "selected160": true
}
                        },
                        template: `<div>
                        <b-card title="CC36 - SC - Other economic or financial requirements">
                            <b-card-text>Concerning the other economic or financial requirements, if any, that may have been specified in the relevant notice or in the ESPD, the economic operator declares that:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-157" v-model="selected157" :options="options" name="radio-options157">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-157" v-model="selected157" name="radio-options157" switch>QUESTION - Your Answer [1]<b>({{ selected157?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - undefined</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Select the type of requirement (Economic or Financial; Rating; Descriptive) [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE_BOOLEAN"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Description of the economic or financial requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Minimum amount [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Start date; End date [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="PERIOD"></b-form-input>
                    </b-form-group>
                    
                                            <b-form-group label="QUESTION - Amount [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-158" v-model="selected158" :options="options" name="radio-options158">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-158" v-model="selected158" name="radio-options158" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected158?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected158">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card><b-card>
                    <b-form-group label="REQUIREMENT - Rating scheme description [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Minimum rating [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY"></b-form-input>
                    </b-form-group>
                    
                                            <b-form-group label="QUESTION - Rating [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-159" v-model="selected159" :options="options" name="radio-options159">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-159" v-model="selected159" name="radio-options159" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected159?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected159">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card><b-card>
                    <b-form-group label="REQUIREMENT - Descriptive requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <b-form-group label="QUESTION - [Description] [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-160" v-model="selected160" :options="options" name="radio-options160">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-160" v-model="selected160" name="radio-options160" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected160?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected160">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC37 - SC - For works contracts: performance of works of the specified type
 */
Vue.component("CC37 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected161": true,
 "selected162": true,
 "selected163": true
}
                        },
                        template: `<div>
                        <b-card title="CC37 - SC - For works contracts: performance of works of the specified type">
                            <b-card-text>For public works contracts only: During the reference period, the economic operator has performed the following works of the specified type. Contracting authorities may require up to five years and allow experience dating from more than five years.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-161" v-model="selected161" :options="options" name="radio-options161">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-161" v-model="selected161" name="radio-options161" switch>QUESTION - Your Answer [1]<b>({{ selected161?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Minimum number of references [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - undefined</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </b-card></b-card><b-card-text>CAPTION - undefined</b-card-text><b-card class="my-1"> <p>Cardinality [<em>1..n</em>]</p>
                                            <b-form-group label="QUESTION - Reference description [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Total amount [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Activity of the economic operator [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Specific amount [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Period (Start and End dates) [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                        <!--    
                                        <b-form-group label="QUESTION - Confidential [0..1]">
                                                <b-form-radio-group id="radio-group-162" v-model="selected162" :options="options" name="radio-options162">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-162" v-model="selected162" name="radio-options162" switch>QUESTION - Confidential [0..1]<b>({{ selected162?'Yes':'No' }})</b-form-checkbox><b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Recipient name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Contact person name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Contact email [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Contact telephone [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-163" v-model="selected163" :options="options" name="radio-options163">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-163" v-model="selected163" name="radio-options163" switch>QUESTION - Is this information available online? [1]<b>({{ selected163?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected163">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC38 - SC - For supply contracts: performance of deliveries of the specified type
 */
Vue.component("CC38 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected164": true,
 "selected165": true,
 "selected166": true
}
                        },
                        template: `<div>
                        <b-card title="CC38 - SC - For supply contracts: performance of deliveries of the specified type">
                            <b-card-text>For public supply contracts only: During the reference period, the economic operator has delivered the following principal deliveries of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-164" v-model="selected164" :options="options" name="radio-options164">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-164" v-model="selected164" name="radio-options164" switch>QUESTION - Your Answer [1]<b>({{ selected164?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Minimum number of references [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - undefined</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </b-card></b-card><b-card-text>CAPTION - undefined</b-card-text><b-card class="my-1"> <p>Cardinality [<em>1..n</em>]</p>
                                            <b-form-group label="QUESTION - Reference description [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Total amount [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Activity of the economic operator [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Specific amount [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Period (Start and End dates) [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                        <!--    
                                        <b-form-group label="QUESTION - Confidential [0..1]">
                                                <b-form-radio-group id="radio-group-165" v-model="selected165" :options="options" name="radio-options165">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-165" v-model="selected165" name="radio-options165" switch>QUESTION - Confidential [0..1]<b>({{ selected165?'Yes':'No' }})</b-form-checkbox><b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Recipient name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Contact person name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Contact email [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Contact telephone [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-166" v-model="selected166" :options="options" name="radio-options166">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-166" v-model="selected166" name="radio-options166" switch>QUESTION - Is this information available online? [1]<b>({{ selected166?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected166">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC39 - SC - For service contracts: performance of services of the specified type
 */
Vue.component("CC39 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected167": true,
 "selected168": true,
 "selected169": true
}
                        },
                        template: `<div>
                        <b-card title="CC39 - SC - For service contracts: performance of services of the specified type">
                            <b-card-text>For public service contracts only: During the reference period, the economic operator has provided the following main services of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-167" v-model="selected167" :options="options" name="radio-options167">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-167" v-model="selected167" name="radio-options167" switch>QUESTION - Your Answer [1]<b>({{ selected167?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Minimum number of references [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - undefined</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </b-card></b-card><b-card-text>CAPTION - undefined</b-card-text><b-card class="my-1"> <p>Cardinality [<em>1..n</em>]</p>
                                            <b-form-group label="QUESTION - Reference description [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Total amount [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Activity of the economic operator [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Specific amount [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Period (Start and End dates) [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                        <!--    
                                        <b-form-group label="QUESTION - Confidential [0..1]">
                                                <b-form-radio-group id="radio-group-168" v-model="selected168" :options="options" name="radio-options168">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-168" v-model="selected168" name="radio-options168" switch>QUESTION - Confidential [0..1]<b>({{ selected168?'Yes':'No' }})</b-form-checkbox><b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Recipient name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Contact person name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Contact email [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Contact telephone [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group></b-card><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-169" v-model="selected169" :options="options" name="radio-options169">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-169" v-model="selected169" name="radio-options169" switch>QUESTION - Is this information available online? [1]<b>({{ selected169?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected169">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC40 - SC - Technicians or technical bodies for quality control
 */
Vue.component("CC40 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected170": true,
 "selected171": true,
 "selected172": true,
 "selected173": true,
 "selected174": true
}
                        },
                        template: `<div>
                        <b-card title="CC40 - SC - Technicians or technical bodies for quality control">
                            <b-card-text>It can call upon the following technicians or technical bodies, especially those responsible for quality control. For technicians or technical bodies not belonging directly to the economic operator's undertaking but on whose capacities the economic operator relies as set out under Part II, Section C, separate ESPD forms must be filled in.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-170" v-model="selected170" :options="options" name="radio-options170">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-170" v-model="selected170" name="radio-options170" switch>QUESTION - Your Answer [1]<b>({{ selected170?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-171" v-model="selected171" :options="options" name="radio-options171">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-171" v-model="selected171" name="radio-options171" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected171?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected171">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-172" v-model="selected172" :options="options" name="radio-options172">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-172" v-model="selected172" name="radio-options172" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected172?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected172">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div><b-card-text>CAPTION - undefined</b-card-text><b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - First name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Last name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Profession [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Experience [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Other information [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - How long with EO [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-173" v-model="selected173" :options="options" name="radio-options173">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-173" v-model="selected173" name="radio-options173" switch>QUESTION - Is this information available online? [1]<b>({{ selected173?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected173">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card><b-card-text>CAPTION - undefined</b-card-text><b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Name [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Experience area [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Other information [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-174" v-model="selected174" :options="options" name="radio-options174">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-174" v-model="selected174" name="radio-options174" switch>QUESTION - Is this information available online? [1]<b>({{ selected174?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected174">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC41 - SC - In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:
 */
Vue.component("CC41 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected175": true,
 "selected176": true,
 "selected177": true,
 "selected178": true,
 "selected179": true
}
                        },
                        template: `<div>
                        <b-card title="CC41 - SC - In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:">
                            <b-card-text>In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:</b-card-text>
                        <b-card><p>[Description of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-175" v-model="selected175" :options="options" name="radio-options175">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-175" v-model="selected175" name="radio-options175" switch>QUESTION - Your Answer [1]<b>({{ selected175?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card><p>Requirement Group to define different lots with different requirements <em>Requirement Group to define different lots with different requirements</em> [<em>1..n</em>]</p>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-176" v-model="selected176" :options="options" name="radio-options176">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-176" v-model="selected176" name="radio-options176" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected176?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected176">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-177" v-model="selected177" :options="options" name="radio-options177">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-177" v-model="selected177" name="radio-options177" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected177?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected177">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div><b-card-text>CAPTION - undefined</b-card-text><b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - First name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Last name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Profession [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Experience [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Other information [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - How long with EO [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-178" v-model="selected178" :options="options" name="radio-options178">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-178" v-model="selected178" name="radio-options178" switch>QUESTION - Is this information available online? [1]<b>({{ selected178?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected178">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card><b-card-text>CAPTION - undefined</b-card-text><b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Name [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Experience area [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Other information [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-179" v-model="selected179" :options="options" name="radio-options179">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-179" v-model="selected179" name="radio-options179" switch>QUESTION - Is this information available online? [1]<b>({{ selected179?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected179">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC42 - SC - Technical facilities and measures for ensuring quality
 */
Vue.component("CC42 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected180": true,
 "selected181": true,
 "selected182": true,
 "selected183": true
}
                        },
                        template: `<div>
                        <b-card title="CC42 - SC - Technical facilities and measures for ensuring quality">
                            <b-card-text>It uses the following technical facilities and measures for ensuring quality and its study and research facilities are as follows:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-180" v-model="selected180" :options="options" name="radio-options180">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-180" v-model="selected180" name="radio-options180" switch>QUESTION - Your Answer [1]<b>({{ selected180?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-181" v-model="selected181" :options="options" name="radio-options181">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-181" v-model="selected181" name="radio-options181" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected181?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected181">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-182" v-model="selected182" :options="options" name="radio-options182">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-182" v-model="selected182" name="radio-options182" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected182?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected182">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-183" v-model="selected183" :options="options" name="radio-options183">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-183" v-model="selected183" name="radio-options183" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected183?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected183">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC43 - SC - Study and research facilities
 */
Vue.component("CC43 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected184": true,
 "selected185": true,
 "selected186": true,
 "selected187": true
}
                        },
                        template: `<div>
                        <b-card title="CC43 - SC - Study and research facilities">
                            <b-card-text>It uses the following study and research facilities are as follows:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-184" v-model="selected184" :options="options" name="radio-options184">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-184" v-model="selected184" name="radio-options184" switch>QUESTION - Your Answer [1]<b>({{ selected184?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-185" v-model="selected185" :options="options" name="radio-options185">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-185" v-model="selected185" name="radio-options185" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected185?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected185">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-186" v-model="selected186" :options="options" name="radio-options186">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-186" v-model="selected186" name="radio-options186" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected186?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected186">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-187" v-model="selected187" :options="options" name="radio-options187">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-187" v-model="selected187" name="radio-options187" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected187?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected187">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC44 - SC - Supply chain management
 */
Vue.component("CC44 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected188": true,
 "selected189": true,
 "selected190": true,
 "selected191": true
}
                        },
                        template: `<div>
                        <b-card title="CC44 - SC - Supply chain management">
                            <b-card-text>It will be able to apply the following supply chain management and tracking systems when performing the contract:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-188" v-model="selected188" :options="options" name="radio-options188">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-188" v-model="selected188" name="radio-options188" switch>QUESTION - Your Answer [1]<b>({{ selected188?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-189" v-model="selected189" :options="options" name="radio-options189">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-189" v-model="selected189" name="radio-options189" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected189?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected189">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-190" v-model="selected190" :options="options" name="radio-options190">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-190" v-model="selected190" name="radio-options190" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected190?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected190">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-191" v-model="selected191" :options="options" name="radio-options191">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-191" v-model="selected191" name="radio-options191" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected191?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected191">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC45 - SC - Environmental management measures
 */
Vue.component("CC45 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected192": true,
 "selected193": true,
 "selected194": true,
 "selected195": true
}
                        },
                        template: `<div>
                        <b-card title="CC45 - SC - Environmental management measures">
                            <b-card-text>The economic operator will be able to apply the following environmental management measures when performing the contract:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-192" v-model="selected192" :options="options" name="radio-options192">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-192" v-model="selected192" name="radio-options192" switch>QUESTION - Your Answer [1]<b>({{ selected192?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-193" v-model="selected193" :options="options" name="radio-options193">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-193" v-model="selected193" name="radio-options193" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected193?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected193">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-194" v-model="selected194" :options="options" name="radio-options194">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-194" v-model="selected194" name="radio-options194" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected194?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected194">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-195" v-model="selected195" :options="options" name="radio-options195">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-195" v-model="selected195" name="radio-options195" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected195?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected195">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC46 - SC - Tools, plant or technical equipment
 */
Vue.component("CC46 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected196": true,
 "selected197": true,
 "selected198": true,
 "selected199": true
}
                        },
                        template: `<div>
                        <b-card title="CC46 - SC - Tools, plant or technical equipment">
                            <b-card-text>The following tools, plant or technical equipment will be available to it for performing the contract:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-196" v-model="selected196" :options="options" name="radio-options196">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-196" v-model="selected196" name="radio-options196" switch>QUESTION - Your Answer [1]<b>({{ selected196?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-197" v-model="selected197" :options="options" name="radio-options197">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-197" v-model="selected197" name="radio-options197" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected197?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected197">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-198" v-model="selected198" :options="options" name="radio-options198">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-198" v-model="selected198" name="radio-options198" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected198?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected198">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-199" v-model="selected199" :options="options" name="radio-options199">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-199" v-model="selected199" name="radio-options199" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected199?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected199">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC47 - SC - Educational and professional qualifications
 */
Vue.component("CC47 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected200": true,
 "selected201": true,
 "selected202": true,
 "selected203": true
}
                        },
                        template: `<div>
                        <b-card title="CC47 - SC - Educational and professional qualifications">
                            <b-card-text>The following educational and professional qualifications are held by the service provider or the contractor itself, and/or (depending on the requirements set out in the relevant notice or the in the ESPD, the relevant notice or by its managerial staff.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-200" v-model="selected200" :options="options" name="radio-options200">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-200" v-model="selected200" name="radio-options200" switch>QUESTION - Your Answer [1]<b>({{ selected200?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-201" v-model="selected201" :options="options" name="radio-options201">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-201" v-model="selected201" name="radio-options201" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected201?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected201">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-202" v-model="selected202" :options="options" name="radio-options202">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-202" v-model="selected202" name="radio-options202" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected202?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected202">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div><b-card-text>CAPTION - undefined</b-card-text><b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - First name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Last name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Please describe the educational or professional qualification [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - If possible please indicate the ESCO identifier for this qualification [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="URL"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - If possible please describe the ESCO qualification [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Qualification name [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Qualification number [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUAL_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Qualification issuing date [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Qualification issuing body [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-203" v-model="selected203" :options="options" name="radio-options203">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-203" v-model="selected203" name="radio-options203" switch>QUESTION - Is this information available online? [1]<b>({{ selected203?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected203">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC48 - SC - Special requierements check
 */
Vue.component("CC48 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected204": true,
 "selected205": true,
 "selected206": true,
 "selected207": true,
 "selected208": true
}
                        },
                        template: `<div>
                        <b-card title="CC48 - SC - Special requierements check">
                            <b-card-text>For complex products or services to be supplied or, exceptionally, for products or services which are required for a special purpose: The economic operator will allow checks to be conducted on the production capacities or the technical capacity of the economic operator and, where necessary, on the means of study and research which are available to it and on the quality control measures? The check is to be performed by the contracting authority or, in case the latter consents to this, on its behalf by a competent official body of the country in which the supplier or service provider is established.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-204" v-model="selected204" :options="options" name="radio-options204">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-204" v-model="selected204" name="radio-options204" switch>QUESTION - Your Answer [1]<b>({{ selected204?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-205" v-model="selected205" :options="options" name="radio-options205">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-205" v-model="selected205" name="radio-options205" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected205?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected205">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-206" v-model="selected206" :options="options" name="radio-options206">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-206" v-model="selected206" name="radio-options206" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected206?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected206">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Do you allow checks? [1]">
                                                <b-form-radio-group id="radio-group-207" v-model="selected207" :options="options" name="radio-options207">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-207" v-model="selected207" name="radio-options207" switch>QUESTION - Do you allow checks? [1]<b>({{ selected207?'Yes':'No' }})</b-form-checkbox><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-208" v-model="selected208" :options="options" name="radio-options208">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-208" v-model="selected208" name="radio-options208" switch>QUESTION - Is this information available online? [1]<b>({{ selected208?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected208">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC49 - SC - Number of managerial staff
 */
Vue.component("CC49 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected209": true,
 "selected210": true,
 "selected211": true,
 "selected212": true
}
                        },
                        template: `<div>
                        <b-card title="CC49 - SC - Number of managerial staff">
                            <b-card-text>The economic operator’s number of managerial staff for the last three years were as follows:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-209" v-model="selected209" :options="options" name="radio-options209">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-209" v-model="selected209" name="radio-options209" switch>QUESTION - Your Answer [1]<b>({{ selected209?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Minimum number of years [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Additional information [0..1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-210" v-model="selected210" :options="options" name="radio-options210">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-210" v-model="selected210" name="radio-options210" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected210?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected210">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-211" v-model="selected211" :options="options" name="radio-options211">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-211" v-model="selected211" name="radio-options211" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected211?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected211">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Year [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Number [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_INTEGER"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-212" v-model="selected212" :options="options" name="radio-options212">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-212" v-model="selected212" name="radio-options212" switch>QUESTION - Is this information available online? [1]<b>({{ selected212?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected212">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC50 - SC - Average annual manpower
 */
Vue.component("CC50 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected213": true,
 "selected214": true,
 "selected215": true,
 "selected216": true
}
                        },
                        template: `<div>
                        <b-card title="CC50 - SC - Average annual manpower">
                            <b-card-text>The economic operator’s average annual manpower for the last three years were as follows:</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-213" v-model="selected213" :options="options" name="radio-options213">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-213" v-model="selected213" name="radio-options213" switch>QUESTION - Your Answer [1]<b>({{ selected213?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Minimum number of years [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="REQUIREMENT - Additional information [0..1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-214" v-model="selected214" :options="options" name="radio-options214">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-214" v-model="selected214" name="radio-options214" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected214?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected214">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-215" v-model="selected215" :options="options" name="radio-options215">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-215" v-model="selected215" name="radio-options215" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected215?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected215">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                            <b-form-group label="QUESTION - Year [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Number [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_INTEGER"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-216" v-model="selected216" :options="options" name="radio-options216">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-216" v-model="selected216" name="radio-options216" switch>QUESTION - Is this information available online? [1]<b>({{ selected216?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected216">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC51 - SC - Subcontracting proportion
 */
Vue.component("CC51 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected217": true,
 "selected218": true,
 "selected219": true,
 "selected220": true
}
                        },
                        template: `<div>
                        <b-card title="CC51 - SC - Subcontracting proportion">
                            <b-card-text>The economic operator intends possibly to subcontract the following proportion (i.e. percentage) of the contract. Please note that if the economic operator has decided to subcontract a part of the contract and relies on the subcontractor’s capacities to perform that part, then please fill in a separate ESPD for such subcontractors, see Part II, Section C above.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-217" v-model="selected217" :options="options" name="radio-options217">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-217" v-model="selected217" name="radio-options217" switch>QUESTION - Your Answer [1]<b>({{ selected217?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                            <b-form-radio-group id="radio-group-218" v-model="selected218" :options="options" name="radio-options218">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-218" v-model="selected218" name="radio-options218" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected218?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="!selected218">
                                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-219" v-model="selected219" :options="options" name="radio-options219">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-219" v-model="selected219" name="radio-options219" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected219?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected219">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                    </b-card>
                                    </div>
                    </b-card>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <b-form-group label="QUESTION - Please specify [1]" 
                                        label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                        <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                        </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-220" v-model="selected220" :options="options" name="radio-options220">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-220" v-model="selected220" name="radio-options220" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected220?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected220">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC52 - SC - For supply contracts: samples, descriptions or photographs without certification of authenticity
 */
Vue.component("CC52 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected221": true,
 "selected222": true,
 "selected223": true,
 "selected224": true,
 "selected225": true
}
                        },
                        template: `<div>
                        <b-card title="CC52 - SC - For supply contracts: samples, descriptions or photographs without certification of authenticity">
                            <b-card-text>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied, which do not need to be accompanied by certifications of authenticity.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-221" v-model="selected221" :options="options" name="radio-options221">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-221" v-model="selected221" name="radio-options221" switch>QUESTION - Your Answer [1]<b>({{ selected221?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                            <b-form-radio-group id="radio-group-222" v-model="selected222" :options="options" name="radio-options222">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-222" v-model="selected222" name="radio-options222" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected222?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="!selected222">
                                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-223" v-model="selected223" :options="options" name="radio-options223">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-223" v-model="selected223" name="radio-options223" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected223?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected223">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                    </b-card>
                                    </div>
                    </b-card>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                            <b-form-radio-group id="radio-group-224" v-model="selected224" :options="options" name="radio-options224">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-224" v-model="selected224" name="radio-options224" switch>QUESTION - Your answer? [1]<b>({{ selected224?'Yes':'No' }})</b-form-checkbox><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-225" v-model="selected225" :options="options" name="radio-options225">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-225" v-model="selected225" name="radio-options225" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected225?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected225">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC53 - SC - For supply contracts: samples, descriptions or photographs with certification of authenticity
 */
Vue.component("CC53 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected226": true,
 "selected227": true,
 "selected228": true,
 "selected229": true,
 "selected230": true
}
                        },
                        template: `<div>
                        <b-card title="CC53 - SC - For supply contracts: samples, descriptions or photographs with certification of authenticity">
                            <b-card-text>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied and will provide certifications of authenticity where applicable.</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-226" v-model="selected226" :options="options" name="radio-options226">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-226" v-model="selected226" name="radio-options226" switch>QUESTION - Your Answer [1]<b>({{ selected226?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                            <b-form-radio-group id="radio-group-227" v-model="selected227" :options="options" name="radio-options227">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-227" v-model="selected227" name="radio-options227" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected227?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="!selected227">
                                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-228" v-model="selected228" :options="options" name="radio-options228">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-228" v-model="selected228" name="radio-options228" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected228?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected228">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                    </b-card>
                                    </div>
                    </b-card>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                            <b-form-radio-group id="radio-group-229" v-model="selected229" :options="options" name="radio-options229">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-229" v-model="selected229" name="radio-options229" switch>QUESTION - Your answer? [1]<b>({{ selected229?'Yes':'No' }})</b-form-checkbox><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-230" v-model="selected230" :options="options" name="radio-options230">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-230" v-model="selected230" name="radio-options230" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected230?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected230">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC54 - SC - For supply contracts: certificates by quality control institutes
 */
Vue.component("CC54 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected231": true,
 "selected232": true,
 "selected233": true,
 "selected234": true,
 "selected235": true
}
                        },
                        template: `<div>
                        <b-card title="CC54 - SC - For supply contracts: certificates by quality control institutes">
                            <b-card-text>Can the economic operator provide the required certificates drawn up by official quality control institutes or agencies of recognised competence attesting the conformity of products clearly identified by references to the technical specifications or standards, which are set out in the relevant notice or the in the ESPD, the relevant notice or ?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-231" v-model="selected231" :options="options" name="radio-options231">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-231" v-model="selected231" name="radio-options231" switch>QUESTION - Your Answer [1]<b>({{ selected231?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-232" v-model="selected232" :options="options" name="radio-options232">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-232" v-model="selected232" name="radio-options232" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected232?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected232">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-233" v-model="selected233" :options="options" name="radio-options233">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-233" v-model="selected233" name="radio-options233" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected233?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected233">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                                <b-form-radio-group id="radio-group-234" v-model="selected234" :options="options" name="radio-options234">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-234" v-model="selected234" name="radio-options234" switch>QUESTION - Your answer? [1]<b>({{ selected234?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected234">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - If not, please explain why and state which other means of proof can be provided: [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-235" v-model="selected235" :options="options" name="radio-options235">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-235" v-model="selected235" name="radio-options235" switch>QUESTION - Is this information available online? [1]<b>({{ selected235?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected235">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC55 - SC - Certificates by independent bodies about quality assurance standards
 */
Vue.component("CC55 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected236": true,
 "selected237": true,
 "selected238": true,
 "selected239": true,
 "selected240": true
}
                        },
                        template: `<div>
                        <b-card title="CC55 - SC - Certificates by independent bodies about quality assurance standards">
                            <b-card-text>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required quality assurance standards, including accessibility for disabled persons?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-236" v-model="selected236" :options="options" name="radio-options236">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-236" v-model="selected236" name="radio-options236" switch>QUESTION - Your Answer [1]<b>({{ selected236?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-237" v-model="selected237" :options="options" name="radio-options237">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-237" v-model="selected237" name="radio-options237" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected237?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected237">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-238" v-model="selected238" :options="options" name="radio-options238">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-238" v-model="selected238" name="radio-options238" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected238?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected238">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                                <b-form-radio-group id="radio-group-239" v-model="selected239" :options="options" name="radio-options239">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-239" v-model="selected239" name="radio-options239" switch>QUESTION - Your answer? [1]<b>({{ selected239?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected239">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - If not, please explain why and state which other means of proof can be provided: [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-240" v-model="selected240" :options="options" name="radio-options240">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-240" v-model="selected240" name="radio-options240" switch>QUESTION - Is this information available online? [1]<b>({{ selected240?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected240">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC56 - SC - Certificates by independent bodies about environmental management systems or standards
 */
Vue.component("CC56 - SC",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected241": true,
 "selected242": true,
 "selected243": true,
 "selected244": true,
 "selected245": true
}
                        },
                        template: `<div>
                        <b-card title="CC56 - SC - Certificates by independent bodies about environmental management systems or standards">
                            <b-card-text>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required environmental management systems or standards?</b-card-text>
                        <b-card><p>[Name of the National Criterion] <em>[Description of the National Criterion ]</em> [<em>0..n</em>]</p>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - [Additional information; e.g. no evidences online]</b-card-text>
                                        <!--
                                        <b-form-group label="QUESTION - Your Answer [1]">
                                            <b-form-radio-group id="radio-group-241" v-model="selected241" :options="options" name="radio-options241">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-241" v-model="selected241" name="radio-options241" switch>QUESTION - Your Answer [1]<b>({{ selected241?'Yes':'No' }})</b-form-checkbox>
                    </b-card></b-card><b-card-text class="my-1">LEGISLATION [<em>0..n</em>]</b-card-text><b-card>
                    <b-form-group label="REQUIREMENT - LOT Identifier [1..n]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <b-card>
                    <b-form-group label="REQUIREMENT - Requirement [1]"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                        <!--    
                                        <b-form-group label="QUESTION - Does the EO fulfil the criteria by itself? [1]">
                                                <b-form-radio-group id="radio-group-242" v-model="selected242" :options="options" name="radio-options242">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-242" v-model="selected242" name="radio-options242" switch>QUESTION - Does the EO fulfil the criteria by itself? [1]<b>({{ selected242?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected242">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - In the case of no – Relied upon or not [1]">
                                                <b-form-radio-group id="radio-group-243" v-model="selected243" :options="options" name="radio-options243">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-243" v-model="selected243" name="radio-options243" switch>QUESTION - In the case of no – Relied upon or not [1]<b>({{ selected243?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected243">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div>
                                        </b-card>
                                        </div>
                                        <!--    
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                                <b-form-radio-group id="radio-group-244" v-model="selected244" :options="options" name="radio-options244">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-244" v-model="selected244" name="radio-options244" switch>QUESTION - Your answer? [1]<b>({{ selected244?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="!selected244">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - If not, please explain why and state which other means of proof can be provided: [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available online? [1]">
                                                <b-form-radio-group id="radio-group-245" v-model="selected245" :options="options" name="radio-options245">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-245" v-model="selected245" name="radio-options245" switch>QUESTION - Is this information available online? [1]<b>({{ selected245?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected245">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card></b-card></b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC57 - OT - Economic operator is a sheltered workshop
 */
Vue.component("CC57 - OT",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected246": true,
 "selected247": true
}
                        },
                        template: `<div>
                        <b-card title="CC57 - OT - Economic operator is a sheltered workshop">
                            <b-card-text>Only in case the procurement is reserved: is the economic operator a sheltered workshop, a 'social business' or will it provide for the performance of the contract in the context of sheltered employment programmes?</b-card-text>
                        
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                            <b-form-radio-group id="radio-group-246" v-model="selected246" :options="options" name="radio-options246">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-246" v-model="selected246" name="radio-options246" switch>QUESTION - Your answer? [1]<b>({{ selected246?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected246">
                                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - What is the corresponding percentage of disabled or disadvantaged workers? [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERCENTAGE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - If required, please provide details on whether the employees concerned belong to a specific category of disabled or disadvantaged workers? [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-247" v-model="selected247" :options="options" name="radio-options247">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-247" v-model="selected247" name="radio-options247" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected247?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected247">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC58 - OT - Economic operator registered in a pre qualification system
 */
Vue.component("CC58 - OT",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected248": true,
 "selected249": true,
 "selected250": true,
 "selected251": true,
 "selected252": true
}
                        },
                        template: `<div>
                        <b-card title="CC58 - OT - Economic operator registered in a pre qualification system">
                            <b-card-text>Does the country of the economic operator have an official list of approved economic operators or an equivalent certificate (e.g. under a national (pre)qualification system)?</b-card-text>
                        
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                            <b-form-radio-group id="radio-group-248" v-model="selected248" :options="options" name="radio-options248">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-248" v-model="selected248" name="radio-options248" switch>QUESTION - Your answer? [1]<b>({{ selected248?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected248">
                                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is the economic operator registered on an official list of approved economic operators or does it have an equivalent certificate? [1]">
                                                <b-form-radio-group id="radio-group-249" v-model="selected249" :options="options" name="radio-options249">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-249" v-model="selected249" name="radio-options249" switch>QUESTION - Is the economic operator registered on an official list of approved economic operators or does it have an equivalent certificate? [1]<b>({{ selected249?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected249">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Please provide the name of the list or certificate and the relevant registration or certification number, if applicable [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - If the certificate of registration or certification is available electronically, please state where [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="URL"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Please state the references on which the registration or certification is based, and, where applicable, the classification obtained in the official list [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Does the registration or certification cover all of the required selection criteria? [1]">
                                                <b-form-radio-group id="radio-group-250" v-model="selected250" :options="options" name="radio-options250">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-250" v-model="selected250" name="radio-options250" switch>QUESTION - Does the registration or certification cover all of the required selection criteria? [1]<b>({{ selected250?'Yes':'No' }})</b-form-checkbox></b-card>
                                        </b-card>
                                        </div>
                                        <div v-if="!selected249">
                                        <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Will the economic operator be able to provide a certificate with regard to the payment of social security contributions and taxes or provide information enabling the contracting authority or contracting entity to obtaining it directly by accessing a national database in any Member State that is available free of charge? [1]">
                                                <b-form-radio-group id="radio-group-251" v-model="selected251" :options="options" name="radio-options251">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-251" v-model="selected251" name="radio-options251" switch>QUESTION - Will the economic operator be able to provide a certificate with regard to the payment of social security contributions and taxes or provide information enabling the contracting authority or contracting entity to obtaining it directly by accessing a national database in any Member State that is available free of charge? [1]<b>({{ selected251?'Yes':'No' }})</b-form-checkbox>
                                        </b-card>
                                        </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-252" v-model="selected252" :options="options" name="radio-options252">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-252" v-model="selected252" name="radio-options252" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected252?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected252">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                                    </b-card>
                                    </div>
                                    <div v-if="!selected248">
                                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p><b-card-text>CAPTION - The country of the economic operator does not have an official list of approved economic operators or an equivalent certificate (e.g. under a national (pre)qualification system).</b-card-text>
                                    </b-card>
                                    </div>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC59 - OT - Economic Operator together with others
 */
Vue.component("CC59 - OT",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected253": true,
 "selected254": true
}
                        },
                        template: `<div>
                        <b-card title="CC59 - OT - Economic Operator together with others">
                            <b-card-text>Is the economic operator participating in the procurement procedure together with others?</b-card-text>
                        
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                            <b-form-radio-group id="radio-group-253" v-model="selected253" :options="options" name="radio-options253">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-253" v-model="selected253" name="radio-options253" switch>QUESTION - Your answer? [1]<b>({{ selected253?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected253">
                                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Please indicate the role of the economic operator in the group (leader, responsible for specific tasks...) [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="CODE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Please identify the other economic operators participating in the procurement procedure together [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Where applicable, name of the participating group: [0..1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-254" v-model="selected254" :options="options" name="radio-options254">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-254" v-model="selected254" name="radio-options254" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected254?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected254">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC60 - OT - Relied on entities
 */
Vue.component("CC60 - OT",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected255": true,
 "selected256": true
}
                        },
                        template: `<div>
                        <b-card title="CC60 - OT - Relied on entities">
                            <b-card-text>Does the economic operator rely on the capacities of other entities in order to meet the selection criteria set out under Part IV and the criteria and rules (if any) set out under Part V below?</b-card-text>
                        
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                            <b-form-radio-group id="radio-group-255" v-model="selected255" :options="options" name="radio-options255">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-255" v-model="selected255" name="radio-options255" switch>QUESTION - Your answer? [1]<b>({{ selected255?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected255">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-256" v-model="selected256" :options="options" name="radio-options256">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-256" v-model="selected256" name="radio-options256" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected256?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected256">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC61 - OT - Not relied on entities
 */
Vue.component("CC61 - OT",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected257": true,
 "selected258": true
}
                        },
                        template: `<div>
                        <b-card title="CC61 - OT - Not relied on entities">
                            <b-card-text>Does the economic operator intend to subcontract any share of the contract to third parties?</b-card-text>
                        
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                            <b-form-radio-group id="radio-group-257" v-model="selected257" :options="options" name="radio-options257">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-257" v-model="selected257" name="radio-options257" switch>QUESTION - Your answer? [1]<b>({{ selected257?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected257">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..n</em>]</p>
                                            <b-form-group label="QUESTION - Name of the entity [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - ID of the subcontractor [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-258" v-model="selected258" :options="options" name="radio-options258">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-258" v-model="selected258" name="radio-options258" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected258?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected258">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC63 - OT - Reduction of the number of qualified candidates
 */
Vue.component("CC63 - OT",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected259": true,
 "selected260": true
}
                        },
                        template: `<div>
                        <b-card title="CC63 - OT - Reduction of the number of qualified candidates">
                            <b-card-text>The economic operator declares that It meets the objective and non discriminatory criteria or rules to be applied in order to limit the number of candidates in the following way:</b-card-text>
                        <b-card-text>ADDITIONAL_DESCRIPTION_LINE - In case certain certificates or other forms of documentary evidence are required, please indicate for each whether the economic operator has the required documents</b-card-text>
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                            <b-form-radio-group id="radio-group-259" v-model="selected259" :options="options" name="radio-options259">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-259" v-model="selected259" name="radio-options259" switch>QUESTION - Your answer? [1]<b>({{ selected259?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected259">
                                    <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Please describe them [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-260" v-model="selected260" :options="options" name="radio-options260">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-260" v-model="selected260" name="radio-options260" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected260?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected260">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })

/**
 * Component - CC65 - OT - Economic Operator Micro, Small or Medium-sized Enterprise
 */
Vue.component("CC65 - OT",
                    { 
                        data(){
                            return {
 "options": [
  {
   "text": "Yes",
   "value": "yes"
  },
  {
   "text": "No",
   "value": "no"
  }
 ],
 "selected261": true,
 "selected262": true
}
                        },
                        template: `<div>
                        <b-card title="CC65 - OT - Economic Operator Micro, Small or Medium-sized Enterprise">
                            <b-card-text>Is the economic operator a Micro, a Small or Medium-sized Enterprise?</b-card-text>
                        
                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--
                                        <b-form-group label="QUESTION - Your answer? [1]">
                                            <b-form-radio-group id="radio-group-261" v-model="selected261" :options="options" name="radio-options261">
                                            </b-form-radio-group>
                                        </b-form-group>
                                        -->
                                        <b-form-checkbox id="radio-group-261" v-model="selected261" name="radio-options261" switch>QUESTION - Your answer? [1]<b>({{ selected261?'Yes':'No' }})</b-form-checkbox>
                                    <div v-if="selected261">
                                    <b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                            <b-form-group label="QUESTION - Number of employees [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_INTEGER"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="QUESTION - Turnover [1]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                    </b-card>
                                    </div><b-card class="my-1"> <p>Cardinality [<em>1</em>]</p>
                                        <!--    
                                        <b-form-group label="QUESTION - Is this information available electronically? [1]">
                                                <b-form-radio-group id="radio-group-262" v-model="selected262" :options="options" name="radio-options262">
                                                </b-form-radio-group>
                                            </b-form-group>
                                            -->
                                        <b-form-checkbox id="radio-group-262" v-model="selected262" name="radio-options262" switch>QUESTION - Is this information available electronically? [1]<b>({{ selected262?'Yes':'No' }})</b-form-checkbox>
                                        <div v-if="selected262">
                                        <b-card class="my-1"> <p>Cardinality [<em>0..1</em>]</p>
                                            <b-form-group label="QUESTION - Evidence Supplied [1..n]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                        </div></b-card>
                    </b-card></b-card>
                    </div>`
                    })
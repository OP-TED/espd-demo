

/**
 * Component - C1 - EG - Participation in a criminal organisation
 */
Vue.component("v4.0.0-C1",
                        { 
                            data(){
                                return {
                                "html_C1_EG_crime__org$SBC1": '', 
"html_C1_EG_crime__org$QG1$QSG1": '', 

                                exp:{
                                "C1_EG_crime__org$SBC1$QG1$Q1" : false,
"C1_EG_crime__org$QG1$Q1" : false,
"C1_EG_crime__org$QG1$QSG1$Q1" : [],
"C1_EG_crime__org$QG1$QSG1$Q2" : [],
"C1_EG_crime__org$QG1$QSG1$Q3" : [],
"C1_EG_crime__org$QG1$QSG1$Q4" : [],
"C1_EG_crime__org$QG1$QSG1$QSG1$Q1" : false,
"C1_EG_crime__org$QG1$QSG1$QSG1$QSG1$Q1" : [],
"C1_EG_crime__org$QG1$QSG1$QSG2$Q1" : false,
"C1_EG_crime__org$QG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Participation in a criminal organisation</strong>
                            <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for participation in a criminal organisation, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 2 of Council Framework Decision 2008/841/JHA of 24 October 2008 on the fight against organised crime (OJ L 300, 11.11.2008, p. 42).</p>
                            <div><div v-html="html_C1_EG_crime__org$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C1_EG_crime__org$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C1_EG_crime__org$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C1_EG_crime__org$SBC1 = renderHTML('C1_EG_crime-org/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C1_EG_crime__org$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C1_EG_crime__org$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C1_EG_crime__org$QG1']">
                                        <div v-html="html_C1_EG_crime__org$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Date of conviction" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C1_EG_crime__org$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Reason" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C1_EG_crime__org$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Who has been convicted" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C1_EG_crime__org$QG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Length of the period of exclusion" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C1_EG_crime__org$QG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C1_EG_crime__org$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C1_EG_crime__org$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C1_EG_crime__org$QG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C1_EG_crime__org$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C1_EG_crime__org$QG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C1_EG_crime__org$QG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C1_EG_crime__org$QG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C1_EG_crime__org$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C1_EG_crime__org$QG1$QSG1 = renderHTML('C1_EG_crime-org/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - C2 - EG - Corruption
 */
Vue.component("v4.0.0-C2",
                        { 
                            data(){
                                return {
                                "html_C2_EG_corruption$SBC1": '', 
"html_C2_EG_corruption$QG1$QSG1": '', 

                                exp:{
                                "C2_EG_corruption$SBC1$QG1$Q1" : false,
"C2_EG_corruption$QG1$Q1" : false,
"C2_EG_corruption$QG1$QSG1$Q1" : [],
"C2_EG_corruption$QG1$QSG1$Q2" : [],
"C2_EG_corruption$QG1$QSG1$Q3" : [],
"C2_EG_corruption$QG1$QSG1$Q4" : [],
"C2_EG_corruption$QG1$QSG1$QSG1$Q1" : false,
"C2_EG_corruption$QG1$QSG1$QSG1$QSG1$Q1" : [],
"C2_EG_corruption$QG1$QSG1$QSG2$Q1" : false,
"C2_EG_corruption$QG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Corruption</strong>
                            <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for corruption, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 3 of the Convention on the fight against corruption involving officials of the European Communities or officials of Member States of the European Union, OJ C 195, 25.6.1997, p. 1, and in Article 2(1) of Council Framework Decision 2003/568/JHA of 22 July 2003 on combating corruption in the private sector (OJ L 192, 31.7.2003, p. 54). This exclusion ground also includes corruption as defined in the national law of the contracting authority (contracting entity) or the economic operator.</p>
                            <div><div v-html="html_C2_EG_corruption$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C2_EG_corruption$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C2_EG_corruption$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C2_EG_corruption$SBC1 = renderHTML('C2_EG_corruption/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C2_EG_corruption$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C2_EG_corruption$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C2_EG_corruption$QG1']">
                                        <div v-html="html_C2_EG_corruption$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Date of conviction" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C2_EG_corruption$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Reason" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C2_EG_corruption$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Who has been convicted" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C2_EG_corruption$QG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Length of the period of exclusion" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C2_EG_corruption$QG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C2_EG_corruption$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C2_EG_corruption$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C2_EG_corruption$QG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C2_EG_corruption$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C2_EG_corruption$QG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C2_EG_corruption$QG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C2_EG_corruption$QG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C2_EG_corruption$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C2_EG_corruption$QG1$QSG1 = renderHTML('C2_EG_corruption/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - C3 - EG - Fraud
 */
Vue.component("v4.0.0-C3",
                        { 
                            data(){
                                return {
                                "html_C3_EG_fraud$SBC1": '', 
"html_C3_EG_fraud$QG1$QSG1": '', 

                                exp:{
                                "C3_EG_fraud$SBC1$QG1$Q1" : false,
"C3_EG_fraud$QG1$Q1" : false,
"C3_EG_fraud$QG1$QSG1$Q1" : [],
"C3_EG_fraud$QG1$QSG1$Q2" : [],
"C3_EG_fraud$QG1$QSG1$Q3" : [],
"C3_EG_fraud$QG1$QSG1$Q4" : [],
"C3_EG_fraud$QG1$QSG1$QSG1$Q1" : false,
"C3_EG_fraud$QG1$QSG1$QSG1$QSG1$Q1" : [],
"C3_EG_fraud$QG1$QSG1$QSG2$Q1" : false,
"C3_EG_fraud$QG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Fraud</strong>
                            <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for fraud, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? Within the meaning of Article 1 of the Convention on the protection of the European Communities' financial interests (OJ C 316, 27.11.1995, p. 48).</p>
                            <div><div v-html="html_C3_EG_fraud$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C3_EG_fraud$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C3_EG_fraud$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C3_EG_fraud$SBC1 = renderHTML('C3_EG_fraud/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C3_EG_fraud$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C3_EG_fraud$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C3_EG_fraud$QG1']">
                                        <div v-html="html_C3_EG_fraud$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Date of conviction" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C3_EG_fraud$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Reason" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C3_EG_fraud$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Who has been convicted" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C3_EG_fraud$QG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Length of the period of exclusion" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C3_EG_fraud$QG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C3_EG_fraud$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C3_EG_fraud$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C3_EG_fraud$QG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C3_EG_fraud$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C3_EG_fraud$QG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C3_EG_fraud$QG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C3_EG_fraud$QG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C3_EG_fraud$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C3_EG_fraud$QG1$QSG1 = renderHTML('C3_EG_fraud/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - C4 - EG - Terrorist offences or offences linked to terrorist activities
 */
Vue.component("v4.0.0-C4",
                        { 
                            data(){
                                return {
                                "html_C4_EG_terr__offence$SBC1": '', 
"html_C4_EG_terr__offence$QG1$QSG1": '', 

                                exp:{
                                "C4_EG_terr__offence$SBC1$QG1$Q1" : false,
"C4_EG_terr__offence$QG1$Q1" : false,
"C4_EG_terr__offence$QG1$QSG1$Q1" : [],
"C4_EG_terr__offence$QG1$QSG1$Q2" : [],
"C4_EG_terr__offence$QG1$QSG1$Q3" : [],
"C4_EG_terr__offence$QG1$QSG1$Q4" : [],
"C4_EG_terr__offence$QG1$QSG1$QSG1$Q1" : false,
"C4_EG_terr__offence$QG1$QSG1$QSG1$QSG1$Q1" : [],
"C4_EG_terr__offence$QG1$QSG1$QSG2$Q1" : false,
"C4_EG_terr__offence$QG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Terrorist offences or offences linked to terrorist activities</strong>
                            <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for terrorist offences or offences linked to terrorist activities, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Articles 1 and 3 of Council Framework Decision of 13 June 2002 on combating terrorism (OJ L 164, 22.6.2002, p. 3). This exclusion ground also includes inciting or aiding or abetting or attempting to commit an offence, as referred to in Article 4 of that Framework Decision.</p>
                            <div><div v-html="html_C4_EG_terr__offence$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C4_EG_terr__offence$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C4_EG_terr__offence$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C4_EG_terr__offence$SBC1 = renderHTML('C4_EG_terr-offence/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C4_EG_terr__offence$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C4_EG_terr__offence$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C4_EG_terr__offence$QG1']">
                                        <div v-html="html_C4_EG_terr__offence$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Date of conviction" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C4_EG_terr__offence$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Reason" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C4_EG_terr__offence$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Who has been convicted" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C4_EG_terr__offence$QG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Length of the period of exclusion" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C4_EG_terr__offence$QG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C4_EG_terr__offence$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C4_EG_terr__offence$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C4_EG_terr__offence$QG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C4_EG_terr__offence$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C4_EG_terr__offence$QG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C4_EG_terr__offence$QG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C4_EG_terr__offence$QG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C4_EG_terr__offence$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C4_EG_terr__offence$QG1$QSG1 = renderHTML('C4_EG_terr-offence/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - C5 - EG - Money laundering or terrorist financing
 */
Vue.component("v4.0.0-C5",
                        { 
                            data(){
                                return {
                                "html_C5_EG_finan__laund$SBC1": '', 
"html_C5_EG_finan__laund$QG1$QSG1": '', 

                                exp:{
                                "C5_EG_finan__laund$SBC1$QG1$Q1" : false,
"C5_EG_finan__laund$QG1$Q1" : false,
"C5_EG_finan__laund$QG1$QSG1$Q1" : [],
"C5_EG_finan__laund$QG1$QSG1$Q2" : [],
"C5_EG_finan__laund$QG1$QSG1$Q3" : [],
"C5_EG_finan__laund$QG1$QSG1$Q4" : [],
"C5_EG_finan__laund$QG1$QSG1$QSG1$Q1" : false,
"C5_EG_finan__laund$QG1$QSG1$QSG1$QSG1$Q1" : [],
"C5_EG_finan__laund$QG1$QSG1$QSG2$Q1" : false,
"C5_EG_finan__laund$QG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Money laundering or terrorist financing</strong>
                            <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for money laundering or terrorist financing, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 1 of Directive 2005/60/EC of the European Parliament and of the Council of 26 October 2005 on the prevention of the use of the financial system for the purpose of money laundering and terrorist financing (OJ L 309, 25.11.2005, p. 15).</p>
                            <div><div v-html="html_C5_EG_finan__laund$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C5_EG_finan__laund$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C5_EG_finan__laund$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C5_EG_finan__laund$SBC1 = renderHTML('C5_EG_finan-laund/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C5_EG_finan__laund$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C5_EG_finan__laund$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C5_EG_finan__laund$QG1']">
                                        <div v-html="html_C5_EG_finan__laund$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Date of conviction" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C5_EG_finan__laund$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Reason" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C5_EG_finan__laund$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Who has been convicted" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C5_EG_finan__laund$QG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Length of the period of exclusion" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C5_EG_finan__laund$QG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C5_EG_finan__laund$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C5_EG_finan__laund$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C5_EG_finan__laund$QG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C5_EG_finan__laund$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C5_EG_finan__laund$QG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C5_EG_finan__laund$QG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C5_EG_finan__laund$QG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C5_EG_finan__laund$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C5_EG_finan__laund$QG1$QSG1 = renderHTML('C5_EG_finan-laund/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - C6 - EG - Child labour and other forms of trafficking in human beings
 */
Vue.component("v4.0.0-C6",
                        { 
                            data(){
                                return {
                                "html_C6_EG_human__traffic$SBC1": '', 
"html_C6_EG_human__traffic$QG1$QSG1": '', 

                                exp:{
                                "C6_EG_human__traffic$SBC1$QG1$Q1" : false,
"C6_EG_human__traffic$QG1$Q1" : false,
"C6_EG_human__traffic$QG1$QSG1$Q1" : [],
"C6_EG_human__traffic$QG1$QSG1$Q2" : [],
"C6_EG_human__traffic$QG1$QSG1$Q3" : [],
"C6_EG_human__traffic$QG1$QSG1$Q4" : [],
"C6_EG_human__traffic$QG1$QSG1$QSG1$Q1" : false,
"C6_EG_human__traffic$QG1$QSG1$QSG1$QSG1$Q1" : [],
"C6_EG_human__traffic$QG1$QSG1$QSG2$Q1" : false,
"C6_EG_human__traffic$QG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Child labour and other forms of trafficking in human beings</strong>
                            <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for child labour and other forms of trafficking in human beings, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 2 of Directive 2011/36/EU of the European Parliament and of the Council of 5 April 2011 on preventing and combating trafficking in human beings and protecting its victims, and replacing Council Framework Decision 2002/629/JHA (OJ L 101, 15.4.2011, p. 1).</p>
                            <div><div v-html="html_C6_EG_human__traffic$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C6_EG_human__traffic$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C6_EG_human__traffic$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C6_EG_human__traffic$SBC1 = renderHTML('C6_EG_human-traffic/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C6_EG_human__traffic$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C6_EG_human__traffic$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C6_EG_human__traffic$QG1']">
                                        <div v-html="html_C6_EG_human__traffic$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Date of conviction" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C6_EG_human__traffic$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Reason" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C6_EG_human__traffic$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Who has been convicted" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C6_EG_human__traffic$QG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Length of the period of exclusion" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C6_EG_human__traffic$QG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C6_EG_human__traffic$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C6_EG_human__traffic$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C6_EG_human__traffic$QG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C6_EG_human__traffic$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C6_EG_human__traffic$QG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C6_EG_human__traffic$QG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C6_EG_human__traffic$QG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C6_EG_human__traffic$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C6_EG_human__traffic$QG1$QSG1 = renderHTML('C6_EG_human-traffic/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - C7 - EG - Payment of taxes
 */
Vue.component("v4.0.0-C7",
                        { 
                            data(){
                                return {
                                "html_C7_EG_tax__pay$SBC1": '', 

                                exp:{
                                "C7_EG_tax__pay$SBC1$QG1$Q1" : false,
"C7_EG_tax__pay$RG1$RQ1$R1" : '',
"C7_EG_tax__pay$RG1$RQ2$R1" : '',
"C7_EG_tax__pay$RG1$QSG1$Q1" : false,
"C7_EG_tax__pay$RG1$QSG1$QSG1$Q1" : [],
"C7_EG_tax__pay$RG1$QSG1$QSG1$Q2" : [],
"C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$Q1" : false,
"C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG1$Q1" : [],
"C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG2$Q1" : false,
"C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG2$QSG1$Q1" : [],
"C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG2$QSG1$Q2" : [],
"C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG3$Q1" : false,
"C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG3$QSG1$Q1" : [],
"C7_EG_tax__pay$RG1$QSG1$QSG1$QSG2$Q1" : false,
"C7_EG_tax__pay$RG1$QSG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Payment of taxes</strong>
                            <p>Has the economic operator breached its obligations relating to the payment of taxes, both in the country in which it is established and in Member State of the contracting authority or contracting entity if other than the country of establishment?</p>
                            <div><div v-html="html_C7_EG_tax__pay$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C7_EG_tax__pay$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C7_EG_tax__pay$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C7_EG_tax__pay$SBC1 = renderHTML('C7_EG_tax-pay/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum Amount Threshold"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Additional Information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C7_EG_tax__pay$RG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C7_EG_tax__pay$RG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C7_EG_tax__pay$RG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Country or member state concerned" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="CODE_COUNTRY" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Amount concerned" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Has this breach of obligations been established by means other than a judicial or administrative decision? <b-form-checkbox v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe which means were used" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? <b-form-checkbox v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Please indicate the date of conviction or decision" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] In case of a conviction insofar as established directly therein, the length of the period of exclusion" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG2$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>[Q] Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the taxes contributions due, including, where applicable, any interest accrued or fines? <b-form-checkbox v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG3$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG3$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG3$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG3$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                        </div></div>
                    </div>`
                        })

/**
 * Component - C8 - EG - Payment of social security contributions
 */
Vue.component("v4.0.0-C8",
                        { 
                            data(){
                                return {
                                "html_C8_EG_socsec__pay$SBC1": '', 

                                exp:{
                                "C8_EG_socsec__pay$SBC1$QG1$Q1" : false,
"C8_EG_socsec__pay$RG1$RQ1$R1" : '',
"C8_EG_socsec__pay$RG1$RQ2$R1" : '',
"C8_EG_socsec__pay$RG1$QSG1$Q1" : false,
"C8_EG_socsec__pay$RG1$QSG1$QSG1$Q1" : [],
"C8_EG_socsec__pay$RG1$QSG1$QSG1$Q2" : [],
"C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$Q1" : false,
"C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG1$Q1" : [],
"C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG2$Q1" : false,
"C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG2$QSG1$Q1" : [],
"C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG2$QSG1$Q2" : [],
"C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG3$Q1" : false,
"C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG3$QSG1$Q1" : [],
"C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG2$Q1" : false,
"C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Payment of social security contributions</strong>
                            <p>Has the economic operator breached its obligations relating to the payment of social security contributions, both in the country in which it is established and in Member State of the contracting authority or contracting entity if other than the country of establishment?</p>
                            <div><div v-html="html_C8_EG_socsec__pay$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C8_EG_socsec__pay$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C8_EG_socsec__pay$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C8_EG_socsec__pay$SBC1 = renderHTML('C8_EG_socsec-pay/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum Amount Threshold"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Additional Information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C8_EG_socsec__pay$RG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C8_EG_socsec__pay$RG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C8_EG_socsec__pay$RG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Country or member state concerned" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="CODE_COUNTRY" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Amount concerned" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Has this breach of obligations been established by means other than a judicial or administrative decision? <b-form-checkbox v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe which means were used" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? <b-form-checkbox v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Please indicate the date of conviction or decision" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] In case of a conviction insofar as established directly therein, the length of the period of exclusion" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG2$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>[Q] Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the social security contributions due, including, where applicable, any interest accrued or fines? <b-form-checkbox v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG3$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG3$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG3$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG3$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                        </div></div>
                    </div>`
                        })

/**
 * Component - C9 - EG - Breaching of obligations in the fields of environmental law
 */
Vue.component("v4.0.0-C9",
                        { 
                            data(){
                                return {
                                "html_C9_EG_envir__law$SBC1": '', 

                                exp:{
                                "C9_EG_envir__law$SBC1$QG1$Q1" : false,
"C9_EG_envir__law$QG1$Q1" : false,
"C9_EG_envir__law$QG1$QSG1$Q1" : false,
"C9_EG_envir__law$QG1$QSG1$QSG1$Q1" : [],
"C9_EG_envir__law$QG1$QSG2$Q1" : false,
"C9_EG_envir__law$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Breaching of obligations in the fields of environmental law</strong>
                            <p>Has the economic operator, to its knowledge, breached its obligations in the fields of environmental law? As referred to for the purposes of this procurement in national law, in the ESPD, the relevant notice or the in the ESPD, the relevant notice or , in Article 18(2) of Directive 2014/24/EU or in the ESPD.</p>
                            <div><div v-html="html_C9_EG_envir__law$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C9_EG_envir__law$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C9_EG_envir__law$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C9_EG_envir__law$SBC1 = renderHTML('C9_EG_envir-law/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C9_EG_envir__law$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C9_EG_envir__law$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C9_EG_envir__law$QG1']">
                                        
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C9_EG_envir__law$QG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C9_EG_envir__law$QG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C9_EG_envir__law$QG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C9_EG_envir__law$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C9_EG_envir__law$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C9_EG_envir__law$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C9_EG_envir__law$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C9_EG_envir__law$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C10 - EG - Breaching of obligations in the fields of social law
 */
Vue.component("v4.0.0-C10",
                        { 
                            data(){
                                return {
                                "html_C10_EG_socsec__law$SBC1": '', 

                                exp:{
                                "C10_EG_socsec__law$SBC1$QG1$Q1" : false,
"C10_EG_socsec__law$QG1$Q1" : false,
"C10_EG_socsec__law$QG1$QSG1$Q1" : false,
"C10_EG_socsec__law$QG1$QSG1$QSG1$Q1" : [],
"C10_EG_socsec__law$QG1$QSG2$Q1" : false,
"C10_EG_socsec__law$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Breaching of obligations in the fields of social law</strong>
                            <p>Has the economic operator, to its knowledge, breached its obligations in the fields of social law? As referred to for the purposes of this procurement in national law, in the ESPD, the relevant notice or the in the ESPD, the relevant notice or in Article 18(2) of Directive 2014/24/EU.</p>
                            <div><div v-html="html_C10_EG_socsec__law$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C10_EG_socsec__law$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C10_EG_socsec__law$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C10_EG_socsec__law$SBC1 = renderHTML('C10_EG_socsec-law/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C10_EG_socsec__law$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C10_EG_socsec__law$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C10_EG_socsec__law$QG1']">
                                        
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C10_EG_socsec__law$QG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C10_EG_socsec__law$QG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C10_EG_socsec__law$QG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C10_EG_socsec__law$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C10_EG_socsec__law$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C10_EG_socsec__law$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C10_EG_socsec__law$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C10_EG_socsec__law$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C11 - EG - Breaching of obligations in the fields of labour law
 */
Vue.component("v4.0.0-C11",
                        { 
                            data(){
                                return {
                                "html_C11_EG_labour__law$SBC1": '', 

                                exp:{
                                "C11_EG_labour__law$SBC1$QG1$Q1" : false,
"C11_EG_labour__law$QG1$Q1" : false,
"C11_EG_labour__law$QG1$QSG1$Q1" : false,
"C11_EG_labour__law$QG1$QSG1$QSG1$Q1" : [],
"C11_EG_labour__law$QG1$QSG2$Q1" : false,
"C11_EG_labour__law$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Breaching of obligations in the fields of labour law</strong>
                            <p>Has the economic operator, to its knowledge, breached its obligations in the fields of labour law? As referred to for the purposes of this procurement in national law, in the relevant notice or the in the ESPD, the relevant notice or in Article 18(2) of Directive 2014/24/EU.</p>
                            <div><div v-html="html_C11_EG_labour__law$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C11_EG_labour__law$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C11_EG_labour__law$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C11_EG_labour__law$SBC1 = renderHTML('C11_EG_labour-law/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C11_EG_labour__law$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C11_EG_labour__law$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C11_EG_labour__law$QG1']">
                                        
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C11_EG_labour__law$QG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C11_EG_labour__law$QG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C11_EG_labour__law$QG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C11_EG_labour__law$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C11_EG_labour__law$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C11_EG_labour__law$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C11_EG_labour__law$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C11_EG_labour__law$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C12 - EG - Bankruptcy
 */
Vue.component("v4.0.0-C12",
                        { 
                            data(){
                                return {
                                "html_C12_EG_bankruptcy$SBC1": '', 

                                exp:{
                                "C12_EG_bankruptcy$SBC1$QG1$Q1" : false,
"C12_EG_bankruptcy$QG1$Q1" : false,
"C12_EG_bankruptcy$QG1$QSG1$Q1" : [],
"C12_EG_bankruptcy$QG1$QSG1$Q2" : [],
"C12_EG_bankruptcy$QG1$QSG2$Q1" : false,
"C12_EG_bankruptcy$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Bankruptcy</strong>
                            <p>Is the economic operator bankrupt? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                            <div><div v-html="html_C12_EG_bankruptcy$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C12_EG_bankruptcy$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C12_EG_bankruptcy$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C12_EG_bankruptcy$SBC1 = renderHTML('C12_EG_bankruptcy/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C12_EG_bankruptcy$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C12_EG_bankruptcy$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C12_EG_bankruptcy$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C12_EG_bankruptcy$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C12_EG_bankruptcy$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C12_EG_bankruptcy$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C12_EG_bankruptcy$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C12_EG_bankruptcy$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C12_EG_bankruptcy$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C13 - EG - Insolvency
 */
Vue.component("v4.0.0-C13",
                        { 
                            data(){
                                return {
                                "html_C13_EG_insolvency$SBC1": '', 

                                exp:{
                                "C13_EG_insolvency$SBC1$QG1$Q1" : false,
"C13_EG_insolvency$QG1$Q1" : false,
"C13_EG_insolvency$QG1$QSG1$Q1" : [],
"C13_EG_insolvency$QG1$QSG1$Q2" : [],
"C13_EG_insolvency$QG1$QSG2$Q1" : false,
"C13_EG_insolvency$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Insolvency</strong>
                            <p>Is the economic operator the subject of insolvency or winding-up? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                            <div><div v-html="html_C13_EG_insolvency$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C13_EG_insolvency$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C13_EG_insolvency$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C13_EG_insolvency$SBC1 = renderHTML('C13_EG_insolvency/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C13_EG_insolvency$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C13_EG_insolvency$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C13_EG_insolvency$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C13_EG_insolvency$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C13_EG_insolvency$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C13_EG_insolvency$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C13_EG_insolvency$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C13_EG_insolvency$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C13_EG_insolvency$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C14 - EG - Arrangement with creditors
 */
Vue.component("v4.0.0-C14",
                        { 
                            data(){
                                return {
                                "html_C14_EG_cred__arran$SBC1": '', 

                                exp:{
                                "C14_EG_cred__arran$SBC1$QG1$Q1" : false,
"C14_EG_cred__arran$QG1$Q1" : false,
"C14_EG_cred__arran$QG1$QSG1$Q1" : [],
"C14_EG_cred__arran$QG1$QSG1$Q2" : [],
"C14_EG_cred__arran$QG1$QSG2$Q1" : false,
"C14_EG_cred__arran$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Arrangement with creditors</strong>
                            <p>Is the economic operator in arrangement with creditors? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                            <div><div v-html="html_C14_EG_cred__arran$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C14_EG_cred__arran$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C14_EG_cred__arran$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C14_EG_cred__arran$SBC1 = renderHTML('C14_EG_cred-arran/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C14_EG_cred__arran$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C14_EG_cred__arran$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C14_EG_cred__arran$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C14_EG_cred__arran$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C14_EG_cred__arran$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C14_EG_cred__arran$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C14_EG_cred__arran$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C14_EG_cred__arran$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C14_EG_cred__arran$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C15 - EG - Analogous situation like bankruptcy under national law
 */
Vue.component("v4.0.0-C15",
                        { 
                            data(){
                                return {
                                "html_C15_EG_bankr__nat$SBC1": '', 

                                exp:{
                                "C15_EG_bankr__nat$SBC1$QG1$Q1" : false,
"C15_EG_bankr__nat$QG1$Q1" : false,
"C15_EG_bankr__nat$QG1$QSG1$Q1" : [],
"C15_EG_bankr__nat$QG1$QSG1$Q2" : [],
"C15_EG_bankr__nat$QG1$QSG2$Q1" : false,
"C15_EG_bankr__nat$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Analogous situation like bankruptcy under national law</strong>
                            <p>Is the economic operator in any analogous situation like bankruptcy arising from a similar procedure under national laws and regulations? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                            <div><div v-html="html_C15_EG_bankr__nat$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C15_EG_bankr__nat$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C15_EG_bankr__nat$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C15_EG_bankr__nat$SBC1 = renderHTML('C15_EG_bankr-nat/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C15_EG_bankr__nat$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C15_EG_bankr__nat$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C15_EG_bankr__nat$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C15_EG_bankr__nat$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C15_EG_bankr__nat$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C15_EG_bankr__nat$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C15_EG_bankr__nat$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C15_EG_bankr__nat$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C15_EG_bankr__nat$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C16 - EG - Assets being administered by liquidator
 */
Vue.component("v4.0.0-C16",
                        { 
                            data(){
                                return {
                                "html_C16_EG_liq__admin$SBC1": '', 

                                exp:{
                                "C16_EG_liq__admin$SBC1$QG1$Q1" : false,
"C16_EG_liq__admin$QG1$Q1" : false,
"C16_EG_liq__admin$QG1$QSG1$Q1" : [],
"C16_EG_liq__admin$QG1$QSG1$Q2" : [],
"C16_EG_liq__admin$QG1$QSG2$Q1" : false,
"C16_EG_liq__admin$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Assets being administered by liquidator</strong>
                            <p>Are the assets of the economic operator being administered by a liquidator or by the court? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                            <div><div v-html="html_C16_EG_liq__admin$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C16_EG_liq__admin$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C16_EG_liq__admin$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C16_EG_liq__admin$SBC1 = renderHTML('C16_EG_liq-admin/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C16_EG_liq__admin$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C16_EG_liq__admin$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C16_EG_liq__admin$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C16_EG_liq__admin$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C16_EG_liq__admin$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C16_EG_liq__admin$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C16_EG_liq__admin$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C16_EG_liq__admin$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C16_EG_liq__admin$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C17 - EG - Business activities are suspended
 */
Vue.component("v4.0.0-C17",
                        { 
                            data(){
                                return {
                                "html_C17_EG_susp__act$SBC1": '', 

                                exp:{
                                "C17_EG_susp__act$SBC1$QG1$Q1" : false,
"C17_EG_susp__act$QG1$Q1" : false,
"C17_EG_susp__act$QG1$QSG1$Q1" : [],
"C17_EG_susp__act$QG1$QSG1$Q2" : [],
"C17_EG_susp__act$QG1$QSG2$Q1" : false,
"C17_EG_susp__act$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Business activities are suspended</strong>
                            <p>Are the business activities of the economic operator suspended? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                            <div><div v-html="html_C17_EG_susp__act$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C17_EG_susp__act$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C17_EG_susp__act$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C17_EG_susp__act$SBC1 = renderHTML('C17_EG_susp-act/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C17_EG_susp__act$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C17_EG_susp__act$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C17_EG_susp__act$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C17_EG_susp__act$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C17_EG_susp__act$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C17_EG_susp__act$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C17_EG_susp__act$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C17_EG_susp__act$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C17_EG_susp__act$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C18 - EG - Guilty of grave professional misconduct
 */
Vue.component("v4.0.0-C18",
                        { 
                            data(){
                                return {
                                "html_C18_EG_prof__misconduct$SBC1": '', 

                                exp:{
                                "C18_EG_prof__misconduct$SBC1$QG1$Q1" : false,
"C18_EG_prof__misconduct$QG1$Q1" : false,
"C18_EG_prof__misconduct$QG1$QSG1$Q1" : [],
"C18_EG_prof__misconduct$QG1$QSG1$QSG1$Q1" : false,
"C18_EG_prof__misconduct$QG1$QSG1$QSG1$QSG1$Q1" : [],
"C18_EG_prof__misconduct$QG1$QSG2$Q1" : false,
"C18_EG_prof__misconduct$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Guilty of grave professional misconduct</strong>
                            <p>Is the economic operator guilty of grave professional misconduct? Where applicable, see definitions in national law, the relevant notice or the procurement documents.</p>
                            <div><div v-html="html_C18_EG_prof__misconduct$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C18_EG_prof__misconduct$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C18_EG_prof__misconduct$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C18_EG_prof__misconduct$SBC1 = renderHTML('C18_EG_prof-misconduct/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C18_EG_prof__misconduct$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C18_EG_prof__misconduct$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C18_EG_prof__misconduct$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C18_EG_prof__misconduct$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability <b-form-checkbox v-model="exp['C18_EG_prof__misconduct$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C18_EG_prof__misconduct$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C18_EG_prof__misconduct$QG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C18_EG_prof__misconduct$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C18_EG_prof__misconduct$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C18_EG_prof__misconduct$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C18_EG_prof__misconduct$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C18_EG_prof__misconduct$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C19 - EG - Agreements with other economic operators aimed at distorting competition
 */
Vue.component("v4.0.0-C19",
                        { 
                            data(){
                                return {
                                "html_C19_EG_distorsion$SBC1": '', 

                                exp:{
                                "C19_EG_distorsion$SBC1$QG1$Q1" : false,
"C19_EG_distorsion$QG1$Q1" : false,
"C19_EG_distorsion$QG1$QSG1$Q1" : [],
"C19_EG_distorsion$QG1$QSG1$QSG1$Q1" : false,
"C19_EG_distorsion$QG1$QSG1$QSG1$QSG1$Q1" : [],
"C19_EG_distorsion$QG1$QSG2$Q1" : false,
"C19_EG_distorsion$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Agreements with other economic operators aimed at distorting competition</strong>
                            <p>Has the economic operator entered into agreements with other economic operators aimed at distorting competition?</p>
                            <div><div v-html="html_C19_EG_distorsion$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C19_EG_distorsion$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C19_EG_distorsion$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C19_EG_distorsion$SBC1 = renderHTML('C19_EG_distorsion/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C19_EG_distorsion$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C19_EG_distorsion$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C19_EG_distorsion$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C19_EG_distorsion$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability <b-form-checkbox v-model="exp['C19_EG_distorsion$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C19_EG_distorsion$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C19_EG_distorsion$QG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C19_EG_distorsion$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C19_EG_distorsion$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C19_EG_distorsion$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C19_EG_distorsion$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C19_EG_distorsion$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C20 - EG - Conflict of interest due to its participation in the procurement procedure
 */
Vue.component("v4.0.0-C20",
                        { 
                            data(){
                                return {
                                "html_C20_EG_partic__confl$SBC1": '', 

                                exp:{
                                "C20_EG_partic__confl$SBC1$QG1$Q1" : false,
"C20_EG_partic__confl$QG1$Q1" : false,
"C20_EG_partic__confl$QG1$QSG1$Q1" : [],
"C20_EG_partic__confl$QG1$QSG2$Q1" : false,
"C20_EG_partic__confl$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Conflict of interest due to its participation in the procurement procedure</strong>
                            <p>Is the economic operator aware of any conflict of interest, as indicated in national law, the relevant notice or in the ESPD, the relevant notice or due to its participation in the procurement procedure?</p>
                            <div><div v-html="html_C20_EG_partic__confl$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C20_EG_partic__confl$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C20_EG_partic__confl$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C20_EG_partic__confl$SBC1 = renderHTML('C20_EG_partic-confl/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C20_EG_partic__confl$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C20_EG_partic__confl$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C20_EG_partic__confl$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C20_EG_partic__confl$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C20_EG_partic__confl$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C20_EG_partic__confl$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C20_EG_partic__confl$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C20_EG_partic__confl$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C21 - EG - Direct or indirect involvement in the preparation of this procurement procedure
 */
Vue.component("v4.0.0-C21",
                        { 
                            data(){
                                return {
                                "html_C21_EG_prep__confl$SBC1": '', 

                                exp:{
                                "C21_EG_prep__confl$SBC1$QG1$Q1" : false,
"C21_EG_prep__confl$QG1$Q1" : false,
"C21_EG_prep__confl$QG1$QSG1$Q1" : [],
"C21_EG_prep__confl$QG1$QSG2$Q1" : false,
"C21_EG_prep__confl$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Direct or indirect involvement in the preparation of this procurement procedure</strong>
                            <p>Has the economic operator or an undertaking related to it advised the contracting authority or contracting entity or otherwise been involved in the preparation of the procurement procedure?</p>
                            <div><div v-html="html_C21_EG_prep__confl$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C21_EG_prep__confl$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C21_EG_prep__confl$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C21_EG_prep__confl$SBC1 = renderHTML('C21_EG_prep-confl/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C21_EG_prep__confl$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C21_EG_prep__confl$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C21_EG_prep__confl$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C21_EG_prep__confl$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C21_EG_prep__confl$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C21_EG_prep__confl$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C21_EG_prep__confl$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C21_EG_prep__confl$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C22 - EG - Early termination, damages or other comparable sanctions
 */
Vue.component("v4.0.0-C22",
                        { 
                            data(){
                                return {
                                "html_C22_EG_sanction$SBC1": '', 

                                exp:{
                                "C22_EG_sanction$SBC1$QG1$Q1" : false,
"C22_EG_sanction$QG1$Q1" : false,
"C22_EG_sanction$QG1$QSG1$Q1" : [],
"C22_EG_sanction$QG1$QSG1$QSG1$Q1" : false,
"C22_EG_sanction$QG1$QSG1$QSG1$QSG1$Q1" : [],
"C22_EG_sanction$QG1$QSG2$Q1" : false,
"C22_EG_sanction$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Early termination, damages or other comparable sanctions</strong>
                            <p>Has the economic operator experienced that a prior public contract, a prior contract with a contracting entity or a prior concession contract was terminated early, or that damages or other comparable sanctions were imposed in connection with that prior contract?</p>
                            <div><div v-html="html_C22_EG_sanction$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C22_EG_sanction$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C22_EG_sanction$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C22_EG_sanction$SBC1 = renderHTML('C22_EG_sanction/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C22_EG_sanction$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C22_EG_sanction$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C22_EG_sanction$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C22_EG_sanction$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="exp['C22_EG_sanction$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C22_EG_sanction$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C22_EG_sanction$QG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C22_EG_sanction$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C22_EG_sanction$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C22_EG_sanction$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C22_EG_sanction$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C22_EG_sanction$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C23 - EG - Guilty of misrepresentation, withheld information, unable to provide required documents and obtained confidential information of this procedure
 */
Vue.component("v4.0.0-C23",
                        { 
                            data(){
                                return {
                                "html_C23_EG_misrepresent$SBC1": '', 

                                exp:{
                                "C23_EG_misrepresent$SBC1$QG1$Q1" : false,
"C23_EG_misrepresent$QG1$Q1" : false,
"C23_EG_misrepresent$QG1$QSG1$Q1" : false,
"C23_EG_misrepresent$QG1$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Guilty of misrepresentation, withheld information, unable to provide required documents and obtained confidential information of this procedure</strong>
                            <p>Can the economic operator confirm that:</p>
                            <div>a) It has been guilty of serious misrepresentation in supplying the information required for the verification of the absence of grounds for exclusion or the fulfilment of the selection criteria,</div><div>b) It has withheld such information,</div><div>c) It has not been able, without delay, to submit the supporting documents required by a contracting authority or contracting entity, and</div><div>d) It has undertaken to unduly influence the decision making process of the contracting authority or contracting entity, to obtain confidential information that may confer upon it undue advantages in the procurement procedure or to negligently provide misleading information that may have a material influence on decisions concerning exclusion, selection or award?</div><div><div v-html="html_C23_EG_misrepresent$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C23_EG_misrepresent$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C23_EG_misrepresent$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C23_EG_misrepresent$SBC1 = renderHTML('C23_EG_misrepresent/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Your answer <b-form-checkbox v-model="exp['C23_EG_misrepresent$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C23_EG_misrepresent$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C23_EG_misrepresent$QG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C23_EG_misrepresent$QG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C23_EG_misrepresent$QG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C23_EG_misrepresent$QG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C24 - EG - Purely national exclusion grounds
 */
Vue.component("v4.0.0-C24",
                        { 
                            data(){
                                return {
                                "html_C24_EG_nati__ground$QG1$QSG1": '', 

                                exp:{
                                "C24_EG_nati__ground$QG1$QSG1$Q1" : false,
"C24_EG_nati__ground$QG1$QSG1$QSG1$Q1" : false,
"C24_EG_nati__ground$QG1$QSG1$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Purely national exclusion grounds</strong>
                            <p>Other exclusion grounds that may be foreseen in the national legislation of the contracting authority's or contracting entity's Member State. Has the economic operator breached its obligations relating to the purely national grounds of exclusion, which are specified in the relevant notice or in the procurement documents?</p>
                            <em>LEGISLATION</em>
                        <div><div>CAPTION</div><div><div v-html="html_C24_EG_nati__ground$QG1$QSG1"></div><b-card footer-tag="footer"><div>[Text describing the national criterion]</div><div>[Type of evidence from e-Certis]</div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C24_EG_nati__ground$QG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C24_EG_nati__ground$QG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C24_EG_nati__ground$QG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C24_EG_nati__ground$QG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C24_EG_nati__ground$QG1$QSG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C24_EG_nati__ground$QG1$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C24_EG_nati__ground$QG1$QSG1 = renderHTML('C24_EG_nati-ground/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C25 - SC - Enrolment in a relevant professional register
 */
Vue.component("v4.0.0-C25",
                        { 
                            data(){
                                return {
                                "html_C25_SC_prof__regist$SBC1": '', 
"html_C25_SC_prof__regist$RG1": '', 
"html_C25_SC_prof__regist$RG1$RSG1": '', 

                                exp:{
                                "cb_C25": window.espd_model['C25'].selected, 
"C25_SC_prof__regist$SBC1$QG1$Q1" : false,
"C25_SC_prof__regist$RG1$RQ1$R1$R1" : '',
"lotid_C25" : window.espd_model['C25'].lots,
"C25_SC_prof__regist$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C25_SC_prof__regist$RG1$RSG1$QSG1$Q1" : false,
"C25_SC_prof__regist$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C25_SC_prof__regist$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C25_SC_prof__regist$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C25_SC_prof__regist$RG1$RSG1$QSG2$Q1" : false,
"C25_SC_prof__regist$RG1$RSG1$QSG2$QSG1$Q1" : [],
"C25_SC_prof__regist$RG1$RSG1$QSG2$QSG2$Q1" : [],
"C25_SC_prof__regist$RG1$RSG1$QSG2$QSG3$Q1" : false,
"C25_SC_prof__regist$RG1$RSG1$QSG2$QSG3$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C25" v-model="exp['cb_C25']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C25" value="OK" unchecked-value="KO">
                            <strong>Enrolment in a relevant professional register</strong>
                            <p>It is enrolled in relevant professional registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C25'] ==='OK'">
                        <div><div v-html="html_C25_SC_prof__regist$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C25_SC_prof__regist$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C25_SC_prof__regist$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C25_SC_prof__regist$SBC1 = renderHTML('C25_SC_prof-regist/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C25_SC_prof__regist$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C25']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C25'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C25'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C25_SC_prof__regist$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C25_SC_prof__regist$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C25_SC_prof__regist$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C25_SC_prof__regist$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C25_SC_prof__regist$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C25_SC_prof__regist$RG1$RSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Registration number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!exp['C25_SC_prof__regist$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Reasons why your are not registered" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$QSG3$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C25_SC_prof__regist$RG1$RSG1$QSG2$QSG3$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$QSG3$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C25_SC_prof__regist$RG1$RSG1 = renderHTML('C25_SC_prof-regist/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C25_SC_prof__regist$RG1 = renderHTML('C25_SC_prof-regist/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C26 - SC - Enrolment in a trade register
 */
Vue.component("v4.0.0-C26",
                        { 
                            data(){
                                return {
                                "html_C26_SC_trade__regist$SBC1": '', 
"html_C26_SC_trade__regist$RG1": '', 
"html_C26_SC_trade__regist$RG1$RSG1": '', 

                                exp:{
                                "cb_C26": window.espd_model['C26'].selected, 
"C26_SC_trade__regist$SBC1$QG1$Q1" : false,
"C26_SC_trade__regist$RG1$RQ1$R1$R1" : '',
"lotid_C26" : window.espd_model['C26'].lots,
"C26_SC_trade__regist$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C26_SC_trade__regist$RG1$RSG1$RQ2$R1$R1$R1" : '',
"C26_SC_trade__regist$RG1$RSG1$QSG1$Q1" : false,
"C26_SC_trade__regist$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C26_SC_trade__regist$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C26_SC_trade__regist$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C26_SC_trade__regist$RG1$RSG1$QSG2$Q1" : false,
"C26_SC_trade__regist$RG1$RSG1$QSG2$QSG1$Q1" : [],
"C26_SC_trade__regist$RG1$RSG1$QSG2$QSG2$Q1" : [],
"C26_SC_trade__regist$RG1$RSG1$QSG2$QSG3$Q1" : false,
"C26_SC_trade__regist$RG1$RSG1$QSG2$QSG3$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C26" v-model="exp['cb_C26']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C26" value="OK" unchecked-value="KO">
                            <strong>Enrolment in a trade register</strong>
                            <p>It is enrolled in trade registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C26'] ==='OK'">
                        <div><div v-html="html_C26_SC_trade__regist$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C26_SC_trade__regist$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C26_SC_trade__regist$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C26_SC_trade__regist$SBC1 = renderHTML('C26_SC_trade-regist/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C26_SC_trade__regist$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C26']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C26'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C26'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C26_SC_trade__regist$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C26_SC_trade__regist$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C26_SC_trade__regist$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C26_SC_trade__regist$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C26_SC_trade__regist$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C26_SC_trade__regist$RG1$RSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Registration number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!exp['C26_SC_trade__regist$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Reasons why your are not registered" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$QSG3$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C26_SC_trade__regist$RG1$RSG1$QSG2$QSG3$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$QSG3$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C26_SC_trade__regist$RG1$RSG1 = renderHTML('C26_SC_trade-regist/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C26_SC_trade__regist$RG1 = renderHTML('C26_SC_trade-regist/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C27 - SC - For service contracts: authorisation of particular organisation needed
 */
Vue.component("v4.0.0-C27",
                        { 
                            data(){
                                return {
                                "html_C27_SC_authorisation$SBC1": '', 
"html_C27_SC_authorisation$SBC1$QG1$QSG1": '', 
"html_C27_SC_authorisation$RG1": '', 
"html_C27_SC_authorisation$RG1$RSG1": '', 

                                exp:{
                                "cb_C27": window.espd_model['C27'].selected, 
"C27_SC_authorisation$SBC1$QG1$Q1" : false,
"C27_SC_authorisation$SBC1$QG1$QSG1$Q1" : [],
"C27_SC_authorisation$SBC1$QG1$QSG1$Q2" : false,
"C27_SC_authorisation$RG1$RQ1$R1$R1" : '',
"lotid_C27" : window.espd_model['C27'].lots,
"C27_SC_authorisation$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C27_SC_authorisation$RG1$RSG1$RQ2$R1$R1$R1" : '',
"C27_SC_authorisation$RG1$RSG1$QSG1$Q1" : false,
"C27_SC_authorisation$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C27_SC_authorisation$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C27_SC_authorisation$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C27_SC_authorisation$RG1$RSG1$QSG2$Q1" : false,
"C27_SC_authorisation$RG1$RSG1$QSG2$QSG1$Q1" : [],
"C27_SC_authorisation$RG1$RSG1$QSG2$QSG2$Q1" : [],
"C27_SC_authorisation$RG1$RSG1$QSG2$QSG3$Q1" : false,
"C27_SC_authorisation$RG1$RSG1$QSG2$QSG3$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C27" v-model="exp['cb_C27']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C27" value="OK" unchecked-value="KO">
                            <strong>For service contracts: authorisation of particular organisation needed</strong>
                            <p>Is a particular authorisation of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C27'] ==='OK'">
                        <div><div v-html="html_C27_SC_authorisation$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C27_SC_authorisation$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C27_SC_authorisation$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C27_SC_authorisation$SBC1$QG1']">
                                        <div v-html="html_C27_SC_authorisation$SBC1$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] If yes, please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C27_SC_authorisation$SBC1$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                            <br/>[Q] Indicate whether the economic operator has it <b-form-checkbox v-model="exp['C27_SC_authorisation$SBC1$QG1$QSG1$Q2']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C27_SC_authorisation$SBC1$QG1$QSG1$Q2']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <template #footer>
                    <b-button variant="success" @click="html_C27_SC_authorisation$SBC1$QG1$QSG1 = renderHTML('C27_SC_authorisation/SBC1/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div><template #footer>
                        <b-button variant="success" @click="html_C27_SC_authorisation$SBC1 = renderHTML('C27_SC_authorisation/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C27_SC_authorisation$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C27']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C27'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C27'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C27_SC_authorisation$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C27_SC_authorisation$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C27_SC_authorisation$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C27_SC_authorisation$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C27_SC_authorisation$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C27_SC_authorisation$RG1$RSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C27_SC_authorisation$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Registration number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!exp['C27_SC_authorisation$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Reasons why your are not registered" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG2$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG2$QSG3$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C27_SC_authorisation$RG1$RSG1$QSG2$QSG3$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C27_SC_authorisation$RG1$RSG1$QSG2$QSG3$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG2$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C27_SC_authorisation$RG1$RSG1 = renderHTML('C27_SC_authorisation/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C27_SC_authorisation$RG1 = renderHTML('C27_SC_authorisation/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C28 - SC - For service contracts: membership of particular organisation needed
 */
Vue.component("v4.0.0-C28",
                        { 
                            data(){
                                return {
                                "html_C28_SC_membership$SBC1": '', 
"html_C28_SC_membership$SBC1$QG1$QSG1": '', 
"html_C28_SC_membership$RG1": '', 
"html_C28_SC_membership$RG1$RSG1": '', 

                                exp:{
                                "cb_C28": window.espd_model['C28'].selected, 
"C28_SC_membership$SBC1$QG1$Q1" : false,
"C28_SC_membership$SBC1$QG1$QSG1$Q1" : [],
"C28_SC_membership$SBC1$QG1$QSG1$Q2" : false,
"C28_SC_membership$RG1$RQ1$R1$R1" : '',
"lotid_C28" : window.espd_model['C28'].lots,
"C28_SC_membership$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C28_SC_membership$RG1$RSG1$RQ2$R1$R1$R1" : '',
"C28_SC_membership$RG1$RSG1$QSG1$Q1" : false,
"C28_SC_membership$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C28_SC_membership$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C28_SC_membership$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C28_SC_membership$RG1$RSG1$QSG2$Q1" : false,
"C28_SC_membership$RG1$RSG1$QSG2$QSG1$Q1" : [],
"C28_SC_membership$RG1$RSG1$QSG2$QSG2$Q1" : [],
"C28_SC_membership$RG1$RSG1$QSG2$QSG3$Q1" : false,
"C28_SC_membership$RG1$RSG1$QSG2$QSG3$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C28" v-model="exp['cb_C28']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C28" value="OK" unchecked-value="KO">
                            <strong>For service contracts: membership of particular organisation needed</strong>
                            <p>Is a particular membership of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C28'] ==='OK'">
                        <div><div v-html="html_C28_SC_membership$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C28_SC_membership$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C28_SC_membership$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C28_SC_membership$SBC1$QG1']">
                                        <div v-html="html_C28_SC_membership$SBC1$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] If yes, please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C28_SC_membership$SBC1$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                            <br/>[Q] Indicate whether the economic operator has it <b-form-checkbox v-model="exp['C28_SC_membership$SBC1$QG1$QSG1$Q2']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C28_SC_membership$SBC1$QG1$QSG1$Q2']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <template #footer>
                    <b-button variant="success" @click="html_C28_SC_membership$SBC1$QG1$QSG1 = renderHTML('C28_SC_membership/SBC1/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div><template #footer>
                        <b-button variant="success" @click="html_C28_SC_membership$SBC1 = renderHTML('C28_SC_membership/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C28_SC_membership$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C28']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C28'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C28'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C28_SC_membership$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C28_SC_membership$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C28_SC_membership$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C28_SC_membership$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C28_SC_membership$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C28_SC_membership$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C28_SC_membership$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C28_SC_membership$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C28_SC_membership$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C28_SC_membership$RG1$RSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C28_SC_membership$RG1$RSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C28_SC_membership$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Registration number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C28_SC_membership$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!exp['C28_SC_membership$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] Reasons why your are not registered" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C28_SC_membership$RG1$RSG1$QSG2$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C28_SC_membership$RG1$RSG1$QSG2$QSG3$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C28_SC_membership$RG1$RSG1$QSG2$QSG3$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C28_SC_membership$RG1$RSG1$QSG2$QSG3$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C28_SC_membership$RG1$RSG1$QSG2$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C28_SC_membership$RG1$RSG1 = renderHTML('C28_SC_membership/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C28_SC_membership$RG1 = renderHTML('C28_SC_membership/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C29 - SC - General yearly turnover
 */
Vue.component("v4.0.0-C29",
                        { 
                            data(){
                                return {
                                "html_C29_SC_gen__year__to$SBC1": '', 
"html_C29_SC_gen__year__to$RG1": '', 
"html_C29_SC_gen__year__to$RG1$RSG1": '', 
"html_C29_SC_gen__year__to$RG1$RSG1$QSG2": '', 

                                exp:{
                                "cb_C29": window.espd_model['C29'].selected, 
"C29_SC_gen__year__to$SBC1$QG1$Q1" : false,
"C29_SC_gen__year__to$RG1$RQ1$R1$R1" : '',
"lotid_C29" : window.espd_model['C29'].lots,
"C29_SC_gen__year__to$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C29_SC_gen__year__to$RG1$RSG1$RQ2$R1$R1$R1" : '',
"C29_SC_gen__year__to$RG1$RSG1$RQ3$R1$R1$R1" : '',
"C29_SC_gen__year__to$RG1$RSG1$QSG1$Q1" : false,
"C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C29_SC_gen__year__to$RG1$RSG1$QSG2$Q1" : [],
"C29_SC_gen__year__to$RG1$RSG1$QSG2$Q2" : [],
"C29_SC_gen__year__to$RG1$RSG1$QSG2$QSG1$Q1" : false,
"C29_SC_gen__year__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],
"C29_SC_gen__year__to$RG1$RSG1$QSG3$Q1" : [],
"C29_SC_gen__year__to$RG1$RSG1$QSG3$QSG1$Q1" : false,
"C29_SC_gen__year__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C29" v-model="exp['cb_C29']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C29" value="OK" unchecked-value="KO">
                            <strong>General yearly turnover</strong>
                            <p>Its general yearly turnover for the number of financial years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C29'] ==='OK'">
                        <div><div v-html="html_C29_SC_gen__year__to$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C29_SC_gen__year__to$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C29_SC_gen__year__to$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C29_SC_gen__year__to$SBC1 = renderHTML('C29_SC_gen-year-to/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C29_SC_gen__year__to$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C29']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C29'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C29'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C29_SC_gen__year__to$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Threshold per year"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE_BOOLEAN"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div v-html="html_C29_SC_gen__year__to$RG1$RSG1$QSG2"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Start date; End date" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C29_SC_gen__year__to$RG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C29_SC_gen__year__to$RG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C29_SC_gen__year__to$RG1$RSG1$QSG2 = renderHTML('C29_SC_gen-year-to/RG1/RSG1/QSG2', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                <b-form-group label="[Q] In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG3$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG3$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C29_SC_gen__year__to$RG1$RSG1$QSG3$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C29_SC_gen__year__to$RG1$RSG1$QSG3$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C29_SC_gen__year__to$RG1$RSG1 = renderHTML('C29_SC_gen-year-to/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C29_SC_gen__year__to$RG1 = renderHTML('C29_SC_gen-year-to/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C30 - SC - Average yearly turnover
 */
Vue.component("v4.0.0-C30",
                        { 
                            data(){
                                return {
                                "html_C30_SC_aver__year__to$SBC1": '', 
"html_C30_SC_aver__year__to$RG1": '', 

                                exp:{
                                "cb_C30": window.espd_model['C30'].selected, 
"C30_SC_aver__year__to$SBC1$QG1$Q1" : false,
"C30_SC_aver__year__to$RG1$RQ1$R1$R1" : '',
"lotid_C30" : window.espd_model['C30'].lots,
"C30_SC_aver__year__to$RG1$RSG1$RQ1$R1$R1" : '',
"C30_SC_aver__year__to$RG1$RSG1$RQ2$R1$R1" : '',
"C30_SC_aver__year__to$RG1$RSG1$QSG1$Q1" : false,
"C30_SC_aver__year__to$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C30_SC_aver__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C30_SC_aver__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C30_SC_aver__year__to$RG1$RSG1$QSG2$Q1" : [],
"C30_SC_aver__year__to$RG1$RSG1$QSG2$Q2" : [],
"C30_SC_aver__year__to$RG1$RSG1$QSG2$QSG1$Q1" : false,
"C30_SC_aver__year__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],
"C30_SC_aver__year__to$RG1$RSG1$QSG3$Q1" : [],
"C30_SC_aver__year__to$RG1$RSG1$QSG3$QSG1$Q1" : false,
"C30_SC_aver__year__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C30" v-model="exp['cb_C30']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C30" value="OK" unchecked-value="KO">
                            <strong>Average yearly turnover</strong>
                            <p>Its average yearly turnover for the number of years required in the relevant notice, the procurement documents or the ESPD is as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C30'] ==='OK'">
                        <div><div v-html="html_C30_SC_aver__year__to$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C30_SC_aver__year__to$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C30_SC_aver__year__to$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C30_SC_aver__year__to$SBC1 = renderHTML('C30_SC_aver-year-to/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C30_SC_aver__year__to$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C30']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C30'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C30'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div>
                    <b-form-group label-class="font-weight-bold" label="[R] Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C30_SC_aver__year__to$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C30_SC_aver__year__to$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C30_SC_aver__year__to$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C30_SC_aver__year__to$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                <b-form-group label="[Q] Average for the required period" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Additional information" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C30_SC_aver__year__to$RG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C30_SC_aver__year__to$RG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                <b-form-group label="[Q] In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG3$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG3$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C30_SC_aver__year__to$RG1$RSG1$QSG3$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C30_SC_aver__year__to$RG1$RSG1$QSG3$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div><template #footer>
                    <b-button variant="success" @click="html_C30_SC_aver__year__to$RG1 = renderHTML('C30_SC_aver-year-to/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C31 - SC - Specific average turnover
 */
Vue.component("v4.0.0-C31",
                        { 
                            data(){
                                return {
                                "html_C31_SC_spec__aver__to$SBC1": '', 
"html_C31_SC_spec__aver__to$RG1": '', 

                                exp:{
                                "cb_C31": window.espd_model['C31'].selected, 
"C31_SC_spec__aver__to$SBC1$QG1$Q1" : false,
"C31_SC_spec__aver__to$RG1$RQ1$R1$R1" : '',
"lotid_C31" : window.espd_model['C31'].lots,
"C31_SC_spec__aver__to$RG1$RSG1$RQ1$R1$R1" : '',
"C31_SC_spec__aver__to$RG1$RSG1$RQ2$R1$R1" : '',
"C31_SC_spec__aver__to$RG1$RSG1$RQ3$R1$R1" : '',
"C31_SC_spec__aver__to$RG1$RSG1$QSG1$Q1" : false,
"C31_SC_spec__aver__to$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C31_SC_spec__aver__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C31_SC_spec__aver__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C31_SC_spec__aver__to$RG1$RSG1$QSG2$Q1" : [],
"C31_SC_spec__aver__to$RG1$RSG1$QSG2$Q2" : [],
"C31_SC_spec__aver__to$RG1$RSG1$QSG2$QSG1$Q1" : false,
"C31_SC_spec__aver__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],
"C31_SC_spec__aver__to$RG1$RSG1$QSG3$Q1" : [],
"C31_SC_spec__aver__to$RG1$RSG1$QSG3$QSG1$Q1" : false,
"C31_SC_spec__aver__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C31" v-model="exp['cb_C31']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C31" value="OK" unchecked-value="KO">
                            <strong>Specific average turnover</strong>
                            <p>Its specific average yearly turnover in the business area covered by the contract for the number of years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C31'] ==='OK'">
                        <div><div v-html="html_C31_SC_spec__aver__to$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C31_SC_spec__aver__to$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C31_SC_spec__aver__to$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C31_SC_spec__aver__to$SBC1 = renderHTML('C31_SC_spec-aver-to/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C31_SC_spec__aver__to$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C31']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C31'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C31'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div>
                    <b-form-group label-class="font-weight-bold" label="[R] Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Business domain description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C31_SC_spec__aver__to$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C31_SC_spec__aver__to$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C31_SC_spec__aver__to$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                <b-form-group label="[Q] Start date; End date" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C31_SC_spec__aver__to$RG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                <b-form-group label="[Q] In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG3$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG3$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C31_SC_spec__aver__to$RG1$RSG1$QSG3$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG3$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div><template #footer>
                    <b-button variant="success" @click="html_C31_SC_spec__aver__to$RG1 = renderHTML('C31_SC_spec-aver-to/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C32 - SC - Specific yearly turnover
 */
Vue.component("v4.0.0-C32",
                        { 
                            data(){
                                return {
                                "html_C32_SC_spec__year__to$SBC1": '', 
"html_C32_SC_spec__year__to$RG1": '', 
"html_C32_SC_spec__year__to$RG1$RSG1$QSG2": '', 

                                exp:{
                                "cb_C32": window.espd_model['C32'].selected, 
"C32_SC_spec__year__to$SBC1$QG1$Q1" : false,
"C32_SC_spec__year__to$RG1$RQ1$R1$R1" : '',
"lotid_C32" : window.espd_model['C32'].lots,
"C32_SC_spec__year__to$RG1$RSG1$RQ1$R1$R1" : '',
"C32_SC_spec__year__to$RG1$RSG1$RQ2$R1$R1" : '',
"C32_SC_spec__year__to$RG1$RSG1$RQ3$R1$R1" : '',
"C32_SC_spec__year__to$RG1$RSG1$QSG1$Q1" : false,
"C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C32_SC_spec__year__to$RG1$RSG1$QSG2$Q1" : [],
"C32_SC_spec__year__to$RG1$RSG1$QSG2$Q2" : [],
"C32_SC_spec__year__to$RG1$RSG1$QSG2$QSG1$Q1" : false,
"C32_SC_spec__year__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],
"C32_SC_spec__year__to$RG1$RSG1$QSG3$Q1" : [],
"C32_SC_spec__year__to$RG1$RSG1$QSG3$QSG1$Q1" : false,
"C32_SC_spec__year__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C32" v-model="exp['cb_C32']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C32" value="OK" unchecked-value="KO">
                            <strong>Specific yearly turnover</strong>
                            <p>Its specific yearly turnover in the business area covered by the contract for the number of financial years required in the relevant notice, in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C32'] ==='OK'">
                        <div><div v-html="html_C32_SC_spec__year__to$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C32_SC_spec__year__to$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C32_SC_spec__year__to$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C32_SC_spec__year__to$SBC1 = renderHTML('C32_SC_spec-year-to/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C32_SC_spec__year__to$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C32']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C32'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C32'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div>
                    <b-form-group label-class="font-weight-bold" label="[R] Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Business domain description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div v-html="html_C32_SC_spec__year__to$RG1$RSG1$QSG2"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Start date; End date" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C32_SC_spec__year__to$RG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C32_SC_spec__year__to$RG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C32_SC_spec__year__to$RG1$RSG1$QSG2 = renderHTML('C32_SC_spec-year-to/RG1/RSG1/QSG2', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                <b-form-group label="[Q] In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG3$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG3$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C32_SC_spec__year__to$RG1$RSG1$QSG3$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C32_SC_spec__year__to$RG1$RSG1$QSG3$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div><template #footer>
                    <b-button variant="success" @click="html_C32_SC_spec__year__to$RG1 = renderHTML('C32_SC_spec-year-to/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C34 - SC - Financial ratio
 */
Vue.component("v4.0.0-C34",
                        { 
                            data(){
                                return {
                                "html_C34_SC_finan__rat$RG1": '', 
"html_C34_SC_finan__rat$RG1$RSG1": '', 
"html_C34_SC_finan__rat$RG1$RSG1$RSG1": '', 

                                exp:{
                                "cb_C34": window.espd_model['C34'].selected, 
"C34_SC_finan__rat$RG1$RQ1$R1$R1" : '',
"lotid_C34" : window.espd_model['C34'].lots,
"C34_SC_finan__rat$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C34_SC_finan__rat$RG1$RSG1$RSG1$RQ1$R1$R1$R1$R1" : '',
"C34_SC_finan__rat$RG1$RSG1$RSG1$RQ2$R1$R1$R1$R1" : '',
"C34_SC_finan__rat$RG1$RSG1$RSG1$RQ3$R1$R1$R1$R1" : '',
"C34_SC_finan__rat$RG1$RSG1$QSG1$Q1" : false,
"C34_SC_finan__rat$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C34_SC_finan__rat$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C34_SC_finan__rat$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C34_SC_finan__rat$RG1$RSG1$QSG2$Q1" : [],
"C34_SC_finan__rat$RG1$RSG1$QSG2$QSG1$Q1" : false,
"C34_SC_finan__rat$RG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C34" v-model="exp['cb_C34']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C34" value="OK" unchecked-value="KO">
                            <strong>Financial ratio</strong>
                            <p>Concerning the financial ratios specified in the relevant notice, the in the ESPD, the relevant notice or the ESPD, the economic operator declares that the actual values for the required ratios are as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C34'] ==='OK'">
                        <em>LEGISLATION</em><div><div v-html="html_C34_SC_finan__rat$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C34']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C34'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C34'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C34_SC_finan__rat$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Select the periods applicable for all ratios"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="PERIOD"></b-form-input>
                    </b-form-group>
                    <div><div v-html="html_C34_SC_finan__rat$RG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Ratio Type"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Definition"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum ratio requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY"></b-form-input>
                    </b-form-group>
                    <template #footer>
                        <b-button variant="success" @click="html_C34_SC_finan__rat$RG1$RSG1$RSG1 = renderHTML('C34_SC_finan-rat/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div>
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C34_SC_finan__rat$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C34_SC_finan__rat$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C34_SC_finan__rat$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C34_SC_finan__rat$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C34_SC_finan__rat$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C34_SC_finan__rat$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C34_SC_finan__rat$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C34_SC_finan__rat$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                <b-form-group label="[Q] Please provide your ratio" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY" v-model="exp['C34_SC_finan__rat$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C34_SC_finan__rat$RG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C34_SC_finan__rat$RG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C34_SC_finan__rat$RG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C34_SC_finan__rat$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C34_SC_finan__rat$RG1$RSG1 = renderHTML('C34_SC_finan-rat/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C34_SC_finan__rat$RG1 = renderHTML('C34_SC_finan-rat/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C35 - SC - Professional risk indemnity insurance
 */
Vue.component("v4.0.0-C35",
                        { 
                            data(){
                                return {
                                "html_C35_SC_indem__insu$SBC1": '', 
"html_C35_SC_indem__insu$RG1": '', 
"html_C35_SC_indem__insu$RG1$RSG1": '', 

                                exp:{
                                "cb_C35": window.espd_model['C35'].selected, 
"C35_SC_indem__insu$SBC1$QG1$Q1" : false,
"C35_SC_indem__insu$RG1$RQ1$R1$R1" : '',
"lotid_C35" : window.espd_model['C35'].lots,
"C35_SC_indem__insu$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C35_SC_indem__insu$RG1$RSG1$RQ2$R1$R1$R1" : '',
"C35_SC_indem__insu$RG1$RSG1$QSG1$Q1" : false,
"C35_SC_indem__insu$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C35_SC_indem__insu$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C35_SC_indem__insu$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C35_SC_indem__insu$RG1$RSG1$QSG2$Q1" : [],
"C35_SC_indem__insu$RG1$RSG1$QSG2$Q2" : false,
"C35_SC_indem__insu$RG1$RSG1$QSG2$Q3" : false,
"C35_SC_indem__insu$RG1$RSG1$QSG2$QSG1$Q1" : false,
"C35_SC_indem__insu$RG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C35" v-model="exp['cb_C35']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C35" value="OK" unchecked-value="KO">
                            <strong>Professional risk indemnity insurance</strong>
                            <p>The insured amount in its professional risk indemnity insurance is the following:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C35'] ==='OK'">
                        <div><div v-html="html_C35_SC_indem__insu$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C35_SC_indem__insu$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C35_SC_indem__insu$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C35_SC_indem__insu$SBC1 = renderHTML('C35_SC_indem-insu/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C35_SC_indem__insu$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C35']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C35'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C35'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C35_SC_indem__insu$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Type of insurance"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum amount"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C35_SC_indem__insu$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C35_SC_indem__insu$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C35_SC_indem__insu$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C35_SC_indem__insu$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                <b-form-group label="[Q] Amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                            <br/>[Q] As an EO I will commit to obtain the minimum amount required <b-form-checkbox v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG2$Q2']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C35_SC_indem__insu$RG1$RSG1$QSG2$Q2']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                            <br/>[Q] I am exempt <b-form-checkbox v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG2$Q3']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C35_SC_indem__insu$RG1$RSG1$QSG2$Q3']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C35_SC_indem__insu$RG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C35_SC_indem__insu$RG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C35_SC_indem__insu$RG1$RSG1 = renderHTML('C35_SC_indem-insu/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C35_SC_indem__insu$RG1 = renderHTML('C35_SC_indem-insu/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C36 - SC - Other economic or financial requirements
 */
Vue.component("v4.0.0-C36",
                        { 
                            data(){
                                return {
                                "html_C36_SC_finan__requ$SBC1": '', 
"html_C36_SC_finan__requ$RG1": '', 
"html_C36_SC_finan__requ$RG1$RSG1": '', 
"opt_C36_SC_finan__req" : [{"text":"Economic or Financial","value":0},{"text":"Rating","value":1},{"text":"Descriptive","value":2}],
"C36_SC_finan__requ$RG1$RSG1$RSG1$RQ1$R1$R1$R1" : 0,
"html_C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1": '', 

                                exp:{
                                "cb_C36": window.espd_model['C36'].selected, 
"C36_SC_finan__requ$SBC1$QG1$Q1" : false,
"C36_SC_finan__requ$RG1$RQ1$R1$R1" : '',
"lotid_C36" : window.espd_model['C36'].lots,
"C36_SC_finan__requ$RG1$RSG1$RSG1$RQ1$R1$R1$R1": 0, 
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$RQ1$R1$R1$R1$R1" : '',
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$RQ2$R1$R1$R1$R1" : '',
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$RQ3$R1$R1$R1$R1" : '',
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$QSG1$Q1" : [],
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$QSG1$QSG1$Q1" : false,
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$RQ1$R1$R1$R1" : '',
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$RQ2$R1$R1$R1" : '',
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$QSG1$Q1" : [],
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$QSG1$QSG1$Q1" : false,
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$QSG1$QSG1$QSG1$Q1" : [],
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$RQ1$R1$R1$R1" : '',
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$Q1" : [],
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$QSG1$Q1" : false,
"C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C36" v-model="exp['cb_C36']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C36" value="OK" unchecked-value="KO">
                            <strong>Other economic or financial requirements</strong>
                            <p>Concerning the other economic or financial requirements, if any, that may have been specified in the relevant notice or in the ESPD, the economic operator declares that:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C36'] ==='OK'">
                        <div><div v-html="html_C36_SC_finan__requ$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C36_SC_finan__requ$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C36_SC_finan__requ$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C36_SC_finan__requ$SBC1 = renderHTML('C36_SC_finan-requ/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C36_SC_finan__requ$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C36']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C36'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C36'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C36_SC_finan__requ$RG1$RSG1"></div><b-card footer-tag="footer"><div>ADDITIONAL CAPTION</div><div><b-form-group label-class="font-weight-bold"  label="[R] Select the type of requirement (Economic or Financial; Rating; Descriptive)" v-slot="{ ariaDescribedby }">
                                    <b-form-radio-group
                                        id="radio-group-01"
                                        v-model="exp.C36_SC_finan__requ$RG1$RSG1$RSG1$RQ1$R1$R1$R1"
                                        :options="opt_C36_SC_finan__req"
                                        :aria-describedby="ariaDescribedby"
                                        name="radio-options"
                                    ></b-form-radio-group>
                                    </b-form-group>
                                    <template v-if="exp.C36_SC_finan__requ$RG1$RSG1$RSG1$RQ1$R1$R1$R1===0"><div><div v-html="html_C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Description of the economic or financial requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum amount"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Start date; End date"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="PERIOD"></b-form-input>
                    </b-form-group>
                    
                                <b-form-group label="[Q] Amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$QSG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1 = renderHTML('C36_SC_finan-requ/RG1/RSG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></template><template v-if="exp.C36_SC_finan__requ$RG1$RSG1$RSG1$RQ1$R1$R1$R1===1"><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Rating scheme description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum rating"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY"></b-form-input>
                    </b-form-group>
                    
                                <b-form-group label="[Q] Rating" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY" v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$QSG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div></template><template v-if="exp.C36_SC_finan__requ$RG1$RSG1$RSG1$RQ1$R1$R1$R1===2"><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Descriptive requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                <b-form-group label="[Q] [Description]" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div></template></div><template #footer>
                        <b-button variant="success" @click="html_C36_SC_finan__requ$RG1$RSG1 = renderHTML('C36_SC_finan-requ/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C36_SC_finan__requ$RG1 = renderHTML('C36_SC_finan-requ/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C37 - SC - For works contracts: performance of works of the specified type
 */
Vue.component("v4.0.0-C37",
                        { 
                            data(){
                                return {
                                "html_C37_SC_work__perform$SBC1": '', 
"html_C37_SC_work__perform$RG1": '', 
"html_C37_SC_work__perform$RG1$RSG1$QSG1": '', 
"html_C37_SC_work__perform$RG1$RSG1$QSG1$QSG1": '', 
"html_C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1": '', 

                                exp:{
                                "cb_C37": window.espd_model['C37'].selected, 
"C37_SC_work__perform$SBC1$QG1$Q1" : false,
"C37_SC_work__perform$RG1$RQ1$R1$R1" : '',
"lotid_C37" : window.espd_model['C37'].lots,
"C37_SC_work__perform$RG1$RSG1$RQ1$R1$R1" : '',
"C37_SC_work__perform$RG1$RSG1$RSG1$RSG1$RQ1$R1$R1" : '',
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q1" : [],
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q2" : [],
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q3" : [],
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q4" : [],
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q5" : [],
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q6" : false,
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q3" : [],
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q4" : [],
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1" : false,
"C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C37" v-model="exp['cb_C37']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C37" value="OK" unchecked-value="KO">
                            <strong>For works contracts: performance of works of the specified type</strong>
                            <p>For public works contracts only: During the reference period, the economic operator has performed the following works of the specified type. Contracting authorities may require up to five years and allow experience dating from more than five years.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C37'] ==='OK'">
                        <div><div v-html="html_C37_SC_work__perform$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C37_SC_work__perform$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C37_SC_work__perform$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C37_SC_work__perform$SBC1 = renderHTML('C37_SC_work-perform/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C37_SC_work__perform$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C37']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C37'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C37'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div>
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum number of references"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <div><div>ADDITIONAL CAPTION</div><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><div v-html="html_C37_SC_work__perform$RG1$RSG1$QSG1"></div><b-card footer-tag="footer"><div>CAPTION</div><div><div v-html="html_C37_SC_work__perform$RG1$RSG1$QSG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Reference description" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Total amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Activity of the economic operator" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Specific amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Period (Start and End dates)" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q5'][0]"></b-form-input>
                                </b-form-group>
                                            <br/>[Q] Confidential <b-form-checkbox v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q6']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$Q6']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div><div v-html="html_C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Recipient name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Contact person name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Contact email" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Contact telephone" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group><template #footer>
                    <b-button variant="success" @click="html_C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG1 = renderHTML('C37_SC_work-perform/RG1/RSG1/QSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C37_SC_work__perform$RG1$RSG1$QSG1$QSG1 = renderHTML('C37_SC_work-perform/RG1/RSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C37_SC_work__perform$RG1$RSG1$QSG1 = renderHTML('C37_SC_work-perform/RG1/RSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C37_SC_work__perform$RG1 = renderHTML('C37_SC_work-perform/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C38 - SC - For supply contracts: performance of deliveries of the specified type
 */
Vue.component("v4.0.0-C38",
                        { 
                            data(){
                                return {
                                "html_C38_SC_supply__perform$SBC1": '', 
"html_C38_SC_supply__perform$RG1": '', 
"html_C38_SC_supply__perform$RG1$RSG1$QSG1": '', 
"html_C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1": '', 
"html_C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1": '', 

                                exp:{
                                "cb_C38": window.espd_model['C38'].selected, 
"C38_SC_supply__perform$SBC1$QG1$Q1" : false,
"C38_SC_supply__perform$RG1$RQ1$R1$R1" : '',
"lotid_C38" : window.espd_model['C38'].lots,
"C38_SC_supply__perform$RG1$RSG1$RQ1$R1$R1" : '',
"C38_SC_supply__perform$RG1$RSG1$RSG1$RSG1$RQ1$R1$R1" : '',
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q1" : [],
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q2" : [],
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q3" : [],
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q4" : [],
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q5" : [],
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q6" : false,
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q3" : [],
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q4" : [],
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1" : false,
"C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C38" v-model="exp['cb_C38']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C38" value="OK" unchecked-value="KO">
                            <strong>For supply contracts: performance of deliveries of the specified type</strong>
                            <p>For public supply contracts only: During the reference period, the economic operator has delivered the following principal deliveries of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C38'] ==='OK'">
                        <div><div v-html="html_C38_SC_supply__perform$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C38_SC_supply__perform$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C38_SC_supply__perform$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C38_SC_supply__perform$SBC1 = renderHTML('C38_SC_supply-perform/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C38_SC_supply__perform$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C38']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C38'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C38'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div>
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum number of references"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <div><div>ADDITIONAL CAPTION</div><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><div v-html="html_C38_SC_supply__perform$RG1$RSG1$QSG1"></div><b-card footer-tag="footer"><div>CAPTION</div><div><div v-html="html_C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Reference description" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Total amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Activity of the economic operator" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Specific amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Period (Start and End dates)" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q5'][0]"></b-form-input>
                                </b-form-group>
                                            <br/>[Q] Confidential <b-form-checkbox v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q6']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$Q6']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div><div v-html="html_C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Recipient name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Contact person name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Contact email" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Contact telephone" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group><template #footer>
                    <b-button variant="success" @click="html_C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG1 = renderHTML('C38_SC_supply-perform/RG1/RSG1/QSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1 = renderHTML('C38_SC_supply-perform/RG1/RSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C38_SC_supply__perform$RG1$RSG1$QSG1 = renderHTML('C38_SC_supply-perform/RG1/RSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C38_SC_supply__perform$RG1 = renderHTML('C38_SC_supply-perform/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C39 - SC - For service contracts: performance of services of the specified type
 */
Vue.component("v4.0.0-C39",
                        { 
                            data(){
                                return {
                                "html_C39_SC_service__perform$SBC1": '', 
"html_C39_SC_service__perform$RG1": '', 
"html_C39_SC_service__perform$RG1$RSG1$QSG1": '', 
"html_C39_SC_service__perform$RG1$RSG1$QSG1$QSG1": '', 
"html_C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1": '', 

                                exp:{
                                "cb_C39": window.espd_model['C39'].selected, 
"C39_SC_service__perform$SBC1$QG1$Q1" : false,
"C39_SC_service__perform$RG1$RQ1$R1$R1" : '',
"lotid_C39" : window.espd_model['C39'].lots,
"C39_SC_service__perform$RG1$RSG1$RQ1$R1$R1" : '',
"C39_SC_service__perform$RG1$RSG1$RSG1$RSG1$RQ1$R1$R1" : '',
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q1" : [],
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q2" : [],
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q3" : [],
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q4" : [],
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q5" : [],
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q6" : false,
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q3" : [],
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q4" : [],
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1" : false,
"C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C39" v-model="exp['cb_C39']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C39" value="OK" unchecked-value="KO">
                            <strong>For service contracts: performance of services of the specified type</strong>
                            <p>For public service contracts only: During the reference period, the economic operator has provided the following main services of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C39'] ==='OK'">
                        <div><div v-html="html_C39_SC_service__perform$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C39_SC_service__perform$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C39_SC_service__perform$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C39_SC_service__perform$SBC1 = renderHTML('C39_SC_service-perform/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C39_SC_service__perform$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C39']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C39'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C39'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div>
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum number of references"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <div><div>ADDITIONAL CAPTION</div><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><div v-html="html_C39_SC_service__perform$RG1$RSG1$QSG1"></div><b-card footer-tag="footer"><div>CAPTION</div><div><div v-html="html_C39_SC_service__perform$RG1$RSG1$QSG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Reference description" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Total amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Activity of the economic operator" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Specific amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Period (Start and End dates)" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q5'][0]"></b-form-input>
                                </b-form-group>
                                            <br/>[Q] Confidential <b-form-checkbox v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q6']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$Q6']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div><div v-html="html_C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Recipient name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Contact person name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Contact email" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Contact telephone" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group><template #footer>
                    <b-button variant="success" @click="html_C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG1 = renderHTML('C39_SC_service-perform/RG1/RSG1/QSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C39_SC_service__perform$RG1$RSG1$QSG1$QSG1 = renderHTML('C39_SC_service-perform/RG1/RSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C39_SC_service__perform$RG1$RSG1$QSG1 = renderHTML('C39_SC_service-perform/RG1/RSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C39_SC_service__perform$RG1 = renderHTML('C39_SC_service-perform/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C40 - SC - Technicians or technical bodies for quality control
 */
Vue.component("v4.0.0-C40",
                        { 
                            data(){
                                return {
                                "html_C40_SC_qual__cont__tech$SBC1": '', 
"html_C40_SC_qual__cont__tech$RG1": '', 
"html_C40_SC_qual__cont__tech$RG1$RSG1$RSG1": '', 
"html_C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1": '', 
"html_C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1": '', 

                                exp:{
                                "cb_C40": window.espd_model['C40'].selected, 
"C40_SC_qual__cont__tech$SBC1$QG1$Q1" : false,
"C40_SC_qual__cont__tech$RG1$RQ1$R1$R1" : '',
"lotid_C40" : window.espd_model['C40'].lots,
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$RQ1$R1$R1$R1" : '',
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$Q1" : false,
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$Q1" : false,
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q1" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q2" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q3" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q4" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q5" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q6" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1" : false,
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$QSG1$Q1" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q1" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q2" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q3" : [],
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$Q1" : false,
"C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C40" v-model="exp['cb_C40']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C40" value="OK" unchecked-value="KO">
                            <strong>Technicians or technical bodies for quality control</strong>
                            <p>It can call upon the following technicians or technical bodies, especially those responsible for quality control. For technicians or technical bodies not belonging directly to the economic operator's undertaking but on whose capacities the economic operator relies as set out under Part II, Section C, separate ESPD forms must be filled in.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C40'] ==='OK'">
                        <div><div v-html="html_C40_SC_qual__cont__tech$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C40_SC_qual__cont__tech$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C40_SC_qual__cont__tech$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C40_SC_qual__cont__tech$SBC1 = renderHTML('C40_SC_qual-cont-tech/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C40_SC_qual__cont__tech$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C40']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C40'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C40'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div>[Additional information; e.g. no evidences online]</div><div><div v-html="html_C40_SC_qual__cont__tech$RG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>CAPTION</div><div><div v-html="html_C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] First name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Last name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Profession" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Experience" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Other information" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q5'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] How long with EO" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_YEAR" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q6'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1 = renderHTML('C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG2/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><div>CAPTION</div><div><div v-html="html_C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Experience area" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Other information" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1 = renderHTML('C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG3/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                        <b-button variant="success" @click="html_C40_SC_qual__cont__tech$RG1$RSG1$RSG1 = renderHTML('C40_SC_qual-cont-tech/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="html_C40_SC_qual__cont__tech$RG1 = renderHTML('C40_SC_qual-cont-tech/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C41 - SC - In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:
 */
Vue.component("v4.0.0-C41",
                        { 
                            data(){
                                return {
                                "html_C41_SC_work__tech$SBC1": '', 
"html_C41_SC_work__tech$RG1": '', 
"html_C41_SC_work__tech$RG1$RSG1$RSG1": '', 
"html_C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1": '', 
"html_C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1": '', 

                                exp:{
                                "cb_C41": window.espd_model['C41'].selected, 
"C41_SC_work__tech$SBC1$QG1$Q1" : false,
"C41_SC_work__tech$RG1$RQ1$R1$R1" : '',
"lotid_C41" : window.espd_model['C41'].lots,
"C41_SC_work__tech$RG1$RSG1$RSG1$RQ1$R1$R1$R1" : '',
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$Q1" : false,
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$Q1" : false,
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q1" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q2" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q3" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q4" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q5" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q6" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1" : false,
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$QSG1$Q1" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q1" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q2" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q3" : [],
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$Q1" : false,
"C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C41" v-model="exp['cb_C41']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C41" value="OK" unchecked-value="KO">
                            <strong>In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:</strong>
                            <p>In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C41'] ==='OK'">
                        <div><div v-html="html_C41_SC_work__tech$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C41_SC_work__tech$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C41_SC_work__tech$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C41_SC_work__tech$SBC1 = renderHTML('C41_SC_work-tech/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C41_SC_work__tech$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C41']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C41'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C41'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div>[Additional information; e.g. no evidences online]</div><div><div v-html="html_C41_SC_work__tech$RG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>CAPTION</div><div><div v-html="html_C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] First name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Last name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Profession" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Experience" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Other information" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q5'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] How long with EO" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_YEAR" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$Q6'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1 = renderHTML('C41_SC_work-tech/RG1/RSG1/RSG1/QSG2/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><div>CAPTION</div><div><div v-html="html_C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Experience area" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Other information" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1 = renderHTML('C41_SC_work-tech/RG1/RSG1/RSG1/QSG3/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                        <b-button variant="success" @click="html_C41_SC_work__tech$RG1$RSG1$RSG1 = renderHTML('C41_SC_work-tech/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="html_C41_SC_work__tech$RG1 = renderHTML('C41_SC_work-tech/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C42 - SC - Technical facilities and measures for ensuring quality
 */
Vue.component("v4.0.0-C42",
                        { 
                            data(){
                                return {
                                "html_C42_SC_qual__facil$SBC1": '', 
"html_C42_SC_qual__facil$RG1": '', 
"html_C42_SC_qual__facil$RG1$RSG1$RSG1": '', 

                                exp:{
                                "cb_C42": window.espd_model['C42'].selected, 
"C42_SC_qual__facil$SBC1$QG1$Q1" : false,
"C42_SC_qual__facil$RG1$RQ1$R1$R1" : '',
"lotid_C42" : window.espd_model['C42'].lots,
"C42_SC_qual__facil$RG1$RSG1$RSG1$RQ1$R1$R1$R1" : '',
"C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$Q1" : false,
"C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$QSG1$Q1" : false,
"C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C42_SC_qual__facil$RG1$RSG1$RSG1$QSG2$Q1" : [],
"C42_SC_qual__facil$RG1$RSG1$RSG1$QSG2$QSG1$Q1" : false,
"C42_SC_qual__facil$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C42" v-model="exp['cb_C42']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C42" value="OK" unchecked-value="KO">
                            <strong>Technical facilities and measures for ensuring quality</strong>
                            <p>It uses the following technical facilities and measures for ensuring quality and its study and research facilities are as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C42'] ==='OK'">
                        <div><div v-html="html_C42_SC_qual__facil$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C42_SC_qual__facil$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C42_SC_qual__facil$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C42_SC_qual__facil$SBC1 = renderHTML('C42_SC_qual-facil/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C42_SC_qual__facil$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C42']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C42'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C42'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div>[Additional information; e.g. no evidences online]</div><div><div v-html="html_C42_SC_qual__facil$RG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C42_SC_qual__facil$RG1$RSG1$RSG1 = renderHTML('C42_SC_qual-facil/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="html_C42_SC_qual__facil$RG1 = renderHTML('C42_SC_qual-facil/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C43 - SC - Study and research facilities
 */
Vue.component("v4.0.0-C43",
                        { 
                            data(){
                                return {
                                "html_C43_SC_research__fac$SBC1": '', 
"html_C43_SC_research__fac$RG1": '', 
"html_C43_SC_research__fac$RG1$RSG1$RSG1": '', 

                                exp:{
                                "cb_C43": window.espd_model['C43'].selected, 
"C43_SC_research__fac$SBC1$QG1$Q1" : false,
"C43_SC_research__fac$RG1$RQ1$R1$R1" : '',
"lotid_C43" : window.espd_model['C43'].lots,
"C43_SC_research__fac$RG1$RSG1$RSG1$RQ1$R1$R1$R1" : '',
"C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$Q1" : false,
"C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$QSG1$Q1" : false,
"C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C43_SC_research__fac$RG1$RSG1$RSG1$QSG2$Q1" : [],
"C43_SC_research__fac$RG1$RSG1$RSG1$QSG2$QSG1$Q1" : false,
"C43_SC_research__fac$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C43" v-model="exp['cb_C43']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C43" value="OK" unchecked-value="KO">
                            <strong>Study and research facilities</strong>
                            <p>It uses the following study and research facilities are as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C43'] ==='OK'">
                        <div><div v-html="html_C43_SC_research__fac$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C43_SC_research__fac$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C43_SC_research__fac$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C43_SC_research__fac$SBC1 = renderHTML('C43_SC_research-fac/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C43_SC_research__fac$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C43']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C43'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C43'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div>[Additional information; e.g. no evidences online]</div><div><div v-html="html_C43_SC_research__fac$RG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C43_SC_research__fac$RG1$RSG1$RSG1 = renderHTML('C43_SC_research-fac/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="html_C43_SC_research__fac$RG1 = renderHTML('C43_SC_research-fac/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C44 - SC - Supply chain management
 */
Vue.component("v4.0.0-C44",
                        { 
                            data(){
                                return {
                                "html_C44_SC_chain__manage$SBC1": '', 
"html_C44_SC_chain__manage$RG1": '', 
"html_C44_SC_chain__manage$RG1$RSG1$RSG1": '', 

                                exp:{
                                "cb_C44": window.espd_model['C44'].selected, 
"C44_SC_chain__manage$SBC1$QG1$Q1" : false,
"C44_SC_chain__manage$RG1$RQ1$R1$R1" : '',
"lotid_C44" : window.espd_model['C44'].lots,
"C44_SC_chain__manage$RG1$RSG1$RSG1$RQ1$R1$R1$R1" : '',
"C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$Q1" : false,
"C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$QSG1$Q1" : false,
"C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C44_SC_chain__manage$RG1$RSG1$RSG1$QSG2$Q1" : [],
"C44_SC_chain__manage$RG1$RSG1$RSG1$QSG2$QSG1$Q1" : false,
"C44_SC_chain__manage$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C44" v-model="exp['cb_C44']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C44" value="OK" unchecked-value="KO">
                            <strong>Supply chain management</strong>
                            <p>It will be able to apply the following supply chain management and tracking systems when performing the contract:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C44'] ==='OK'">
                        <div><div v-html="html_C44_SC_chain__manage$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C44_SC_chain__manage$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C44_SC_chain__manage$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C44_SC_chain__manage$SBC1 = renderHTML('C44_SC_chain-manage/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C44_SC_chain__manage$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C44']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C44'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C44'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div>[Additional information; e.g. no evidences online]</div><div><div v-html="html_C44_SC_chain__manage$RG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C44_SC_chain__manage$RG1$RSG1$RSG1 = renderHTML('C44_SC_chain-manage/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="html_C44_SC_chain__manage$RG1 = renderHTML('C44_SC_chain-manage/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C45 - SC - Environmental management measures
 */
Vue.component("v4.0.0-C45",
                        { 
                            data(){
                                return {
                                "html_C45_SC_envir__measure$SBC1": '', 
"html_C45_SC_envir__measure$RG1": '', 
"html_C45_SC_envir__measure$RG1$RSG1$RSG1": '', 

                                exp:{
                                "cb_C45": window.espd_model['C45'].selected, 
"C45_SC_envir__measure$SBC1$QG1$Q1" : false,
"C45_SC_envir__measure$RG1$RQ1$R1$R1" : '',
"lotid_C45" : window.espd_model['C45'].lots,
"C45_SC_envir__measure$RG1$RSG1$RSG1$RQ1$R1$R1$R1" : '',
"C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$Q1" : false,
"C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$QSG1$Q1" : false,
"C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C45_SC_envir__measure$RG1$RSG1$RSG1$QSG2$Q1" : [],
"C45_SC_envir__measure$RG1$RSG1$RSG1$QSG2$QSG1$Q1" : false,
"C45_SC_envir__measure$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C45" v-model="exp['cb_C45']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C45" value="OK" unchecked-value="KO">
                            <strong>Environmental management measures</strong>
                            <p>The economic operator will be able to apply the following environmental management measures when performing the contract:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C45'] ==='OK'">
                        <div><div v-html="html_C45_SC_envir__measure$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C45_SC_envir__measure$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C45_SC_envir__measure$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C45_SC_envir__measure$SBC1 = renderHTML('C45_SC_envir-measure/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C45_SC_envir__measure$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C45']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C45'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C45'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div>[Additional information; e.g. no evidences online]</div><div><div v-html="html_C45_SC_envir__measure$RG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C45_SC_envir__measure$RG1$RSG1$RSG1 = renderHTML('C45_SC_envir-measure/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="html_C45_SC_envir__measure$RG1 = renderHTML('C45_SC_envir-measure/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C46 - SC - Tools, plant or technical equipment
 */
Vue.component("v4.0.0-C46",
                        { 
                            data(){
                                return {
                                "html_C46_SC_tech__equip$SBC1": '', 
"html_C46_SC_tech__equip$RG1": '', 
"html_C46_SC_tech__equip$RG1$RSG1$RSG1": '', 

                                exp:{
                                "cb_C46": window.espd_model['C46'].selected, 
"C46_SC_tech__equip$SBC1$QG1$Q1" : false,
"C46_SC_tech__equip$RG1$RQ1$R1$R1" : '',
"lotid_C46" : window.espd_model['C46'].lots,
"C46_SC_tech__equip$RG1$RSG1$RSG1$RQ1$R1$R1$R1" : '',
"C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$Q1" : false,
"C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$QSG1$Q1" : false,
"C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C46_SC_tech__equip$RG1$RSG1$RSG1$QSG2$Q1" : [],
"C46_SC_tech__equip$RG1$RSG1$RSG1$QSG2$QSG1$Q1" : false,
"C46_SC_tech__equip$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C46" v-model="exp['cb_C46']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C46" value="OK" unchecked-value="KO">
                            <strong>Tools, plant or technical equipment</strong>
                            <p>The following tools, plant or technical equipment will be available to it for performing the contract:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C46'] ==='OK'">
                        <div><div v-html="html_C46_SC_tech__equip$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C46_SC_tech__equip$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C46_SC_tech__equip$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C46_SC_tech__equip$SBC1 = renderHTML('C46_SC_tech-equip/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C46_SC_tech__equip$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C46']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C46'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C46'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div>[Additional information; e.g. no evidences online]</div><div><div v-html="html_C46_SC_tech__equip$RG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C46_SC_tech__equip$RG1$RSG1$RSG1 = renderHTML('C46_SC_tech-equip/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="html_C46_SC_tech__equip$RG1 = renderHTML('C46_SC_tech-equip/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C47 - SC - Educational and professional qualifications
 */
Vue.component("v4.0.0-C47",
                        { 
                            data(){
                                return {
                                "html_C47_SC_qualification$SBC1": '', 
"html_C47_SC_qualification$RG1": '', 
"html_C47_SC_qualification$RG1$RSG1$RSG1": '', 
"html_C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1": '', 

                                exp:{
                                "cb_C47": window.espd_model['C47'].selected, 
"C47_SC_qualification$SBC1$QG1$Q1" : false,
"C47_SC_qualification$RG1$RQ1$R1$R1" : '',
"lotid_C47" : window.espd_model['C47'].lots,
"C47_SC_qualification$RG1$RSG1$RSG1$RQ1$R1$R1$R1" : '',
"C47_SC_qualification$RG1$RSG1$RSG1$QSG1$Q1" : false,
"C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$Q1" : false,
"C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q1" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q2" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q3" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q4" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q5" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q6" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q7" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q8" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q9" : [],
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1" : false,
"C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C47" v-model="exp['cb_C47']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C47" value="OK" unchecked-value="KO">
                            <strong>Educational and professional qualifications</strong>
                            <p>The following educational and professional qualifications are held by the service provider or the contractor itself, and/or (depending on the requirements set out in the relevant notice or the in the ESPD, the relevant notice or by its managerial staff.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C47'] ==='OK'">
                        <div><div v-html="html_C47_SC_qualification$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C47_SC_qualification$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C47_SC_qualification$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C47_SC_qualification$SBC1 = renderHTML('C47_SC_qualification/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C47_SC_qualification$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C47']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C47'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C47'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div>[Additional information; e.g. no evidences online]</div><div><div v-html="html_C47_SC_qualification$RG1$RSG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>CAPTION</div><div><div v-html="html_C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] First name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Last name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Please describe the educational or professional qualification" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] If possible please indicate the ESCO identifier for this qualification" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="URL" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q4'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] If possible please describe the ESCO qualification" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q5'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Qualification name" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q6'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Qualification number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUAL_IDENTIFIER" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q7'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Qualification issuing date" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q8'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Qualification issuing body" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$Q9'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1 = renderHTML('C47_SC_qualification/RG1/RSG1/RSG1/QSG2/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                        <b-button variant="success" @click="html_C47_SC_qualification$RG1$RSG1$RSG1 = renderHTML('C47_SC_qualification/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="html_C47_SC_qualification$RG1 = renderHTML('C47_SC_qualification/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C48 - SC - Special requierements check
 */
Vue.component("v4.0.0-C48",
                        { 
                            data(){
                                return {
                                "html_C48_SC_spec__req__check$SBC1": '', 
"html_C48_SC_spec__req__check$RG1": '', 
"html_C48_SC_spec__req__check$RG1$RSG1": '', 

                                exp:{
                                "cb_C48": window.espd_model['C48'].selected, 
"C48_SC_spec__req__check$SBC1$QG1$Q1" : false,
"C48_SC_spec__req__check$RG1$RQ1$R1$R1" : '',
"lotid_C48" : window.espd_model['C48'].lots,
"C48_SC_spec__req__check$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C48_SC_spec__req__check$RG1$RSG1$QSG1$Q1" : false,
"C48_SC_spec__req__check$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C48_SC_spec__req__check$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C48_SC_spec__req__check$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C48_SC_spec__req__check$RG1$RSG1$QSG2$Q1" : false,
"C48_SC_spec__req__check$RG1$RSG1$QSG2$QSG1$Q1" : false,
"C48_SC_spec__req__check$RG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C48" v-model="exp['cb_C48']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C48" value="OK" unchecked-value="KO">
                            <strong>Special requierements check</strong>
                            <p>For complex products or services to be supplied or, exceptionally, for products or services which are required for a special purpose: The economic operator will allow checks to be conducted on the production capacities or the technical capacity of the economic operator and, where necessary, on the means of study and research which are available to it and on the quality control measures? The check is to be performed by the contracting authority or, in case the latter consents to this, on its behalf by a competent official body of the country in which the supplier or service provider is established.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C48'] ==='OK'">
                        <div><div v-html="html_C48_SC_spec__req__check$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C48_SC_spec__req__check$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C48_SC_spec__req__check$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C48_SC_spec__req__check$SBC1 = renderHTML('C48_SC_spec-req-check/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C48_SC_spec__req__check$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C48']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C48'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C48'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C48_SC_spec__req__check$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C48_SC_spec__req__check$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C48_SC_spec__req__check$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C48_SC_spec__req__check$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C48_SC_spec__req__check$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C48_SC_spec__req__check$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C48_SC_spec__req__check$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C48_SC_spec__req__check$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C48_SC_spec__req__check$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                            <br/>[Q] Do you allow checks? <b-form-checkbox v-model="exp['C48_SC_spec__req__check$RG1$RSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C48_SC_spec__req__check$RG1$RSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C48_SC_spec__req__check$RG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C48_SC_spec__req__check$RG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C48_SC_spec__req__check$RG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C48_SC_spec__req__check$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C48_SC_spec__req__check$RG1$RSG1 = renderHTML('C48_SC_spec-req-check/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C48_SC_spec__req__check$RG1 = renderHTML('C48_SC_spec-req-check/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C49 - SC - Number of managerial staff
 */
Vue.component("v4.0.0-C49",
                        { 
                            data(){
                                return {
                                "html_C49_SC_manage__staff$SBC1": '', 
"html_C49_SC_manage__staff$RG1": '', 
"html_C49_SC_manage__staff$RG1$RSG1$QSG2": '', 

                                exp:{
                                "cb_C49": window.espd_model['C49'].selected, 
"C49_SC_manage__staff$SBC1$QG1$Q1" : false,
"C49_SC_manage__staff$RG1$RQ1$R1$R1" : '',
"lotid_C49" : window.espd_model['C49'].lots,
"C49_SC_manage__staff$RG1$RSG1$RQ1$R1$R1" : '',
"C49_SC_manage__staff$RG1$RSG1$RQ2$R1$R1" : '',
"C49_SC_manage__staff$RG1$RSG1$QSG1$Q1" : false,
"C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C49_SC_manage__staff$RG1$RSG1$QSG2$Q1" : [],
"C49_SC_manage__staff$RG1$RSG1$QSG2$Q2" : [],
"C49_SC_manage__staff$RG1$RSG1$QSG2$QSG1$Q1" : false,
"C49_SC_manage__staff$RG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C49" v-model="exp['cb_C49']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C49" value="OK" unchecked-value="KO">
                            <strong>Number of managerial staff</strong>
                            <p>The economic operator’s number of managerial staff for the last three years were as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C49'] ==='OK'">
                        <div><div v-html="html_C49_SC_manage__staff$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C49_SC_manage__staff$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C49_SC_manage__staff$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C49_SC_manage__staff$SBC1 = renderHTML('C49_SC_manage-staff/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C49_SC_manage__staff$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C49']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C49'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C49'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div>
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum number of years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Additional information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C49_SC_manage__staff$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C49_SC_manage__staff$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div v-html="html_C49_SC_manage__staff$RG1$RSG1$QSG2"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Year" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_YEAR" v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_INTEGER" v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C49_SC_manage__staff$RG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C49_SC_manage__staff$RG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C49_SC_manage__staff$RG1$RSG1$QSG2 = renderHTML('C49_SC_manage-staff/RG1/RSG1/QSG2', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C49_SC_manage__staff$RG1 = renderHTML('C49_SC_manage-staff/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C50 - SC - Average annual manpower
 */
Vue.component("v4.0.0-C50",
                        { 
                            data(){
                                return {
                                "html_C50_SC_year__manpower$SBC1": '', 
"html_C50_SC_year__manpower$RG1": '', 
"html_C50_SC_year__manpower$RG1$RSG1$QSG2": '', 

                                exp:{
                                "cb_C50": window.espd_model['C50'].selected, 
"C50_SC_year__manpower$SBC1$QG1$Q1" : false,
"C50_SC_year__manpower$RG1$RQ1$R1$R1" : '',
"lotid_C50" : window.espd_model['C50'].lots,
"C50_SC_year__manpower$RG1$RSG1$RQ1$R1$R1" : '',
"C50_SC_year__manpower$RG1$RSG1$RQ2$R1$R1" : '',
"C50_SC_year__manpower$RG1$RSG1$QSG1$Q1" : false,
"C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C50_SC_year__manpower$RG1$RSG1$QSG2$Q1" : [],
"C50_SC_year__manpower$RG1$RSG1$QSG2$Q2" : [],
"C50_SC_year__manpower$RG1$RSG1$QSG2$QSG1$Q1" : false,
"C50_SC_year__manpower$RG1$RSG1$QSG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C50" v-model="exp['cb_C50']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C50" value="OK" unchecked-value="KO">
                            <strong>Average annual manpower</strong>
                            <p>The economic operator’s average annual manpower for the last three years were as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C50'] ==='OK'">
                        <div><div v-html="html_C50_SC_year__manpower$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C50_SC_year__manpower$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C50_SC_year__manpower$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C50_SC_year__manpower$SBC1 = renderHTML('C50_SC_year-manpower/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C50_SC_year__manpower$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C50']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C50'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C50'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div>
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum number of years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Additional information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C50_SC_year__manpower$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C50_SC_year__manpower$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div v-html="html_C50_SC_year__manpower$RG1$RSG1$QSG2"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Year" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_YEAR" v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_INTEGER" v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C50_SC_year__manpower$RG1$RSG1$QSG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C50_SC_year__manpower$RG1$RSG1$QSG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="html_C50_SC_year__manpower$RG1$RSG1$QSG2 = renderHTML('C50_SC_year-manpower/RG1/RSG1/QSG2', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C50_SC_year__manpower$RG1 = renderHTML('C50_SC_year-manpower/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C51 - SC - Subcontracting proportion
 */
Vue.component("v4.0.0-C51",
                        { 
                            data(){
                                return {
                                "html_C51_SC_suncont__port$SBC1": '', 

                                exp:{
                                "cb_C51": window.espd_model['C51'].selected, 
"C51_SC_suncont__port$SBC1$QG1$Q1" : false,
"C51_SC_suncont__port$QG1$Q1" : false,
"C51_SC_suncont__port$QG1$QSG1$Q1" : false,
"C51_SC_suncont__port$QG1$QSG1$QSG1$Q1" : [],
"C51_SC_suncont__port$QG1$QSG1$QSG1$Q2" : [],
"C51_SC_suncont__port$QG2$Q1" : [],
"C51_SC_suncont__port$QG2$QSG1$Q1" : false,
"C51_SC_suncont__port$QG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C51" v-model="exp['cb_C51']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C51" value="OK" unchecked-value="KO">
                            <strong>Subcontracting proportion</strong>
                            <p>The economic operator intends possibly to subcontract the following proportion (i.e. percentage) of the contract. Please note that if the economic operator has decided to subcontract a part of the contract and relies on the subcontractor’s capacities to perform that part, then please fill in a separate ESPD for such subcontractors, see Part II, Section C above.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C51'] ==='OK'">
                        <div><div v-html="html_C51_SC_suncont__port$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C51_SC_suncont__port$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C51_SC_suncont__port$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C51_SC_suncont__port$SBC1 = renderHTML('C51_SC_suncont-port/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C51_SC_suncont__port$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C51_SC_suncont__port$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C51_SC_suncont__port$QG1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C51_SC_suncont__port$QG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C51_SC_suncont__port$QG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C51_SC_suncont__port$QG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C51_SC_suncont__port$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C51_SC_suncont__port$QG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                        </div>
                        <div>
                                <b-form-group label="[Q] Please specify" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C51_SC_suncont__port$QG2$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C51_SC_suncont__port$QG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C51_SC_suncont__port$QG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C51_SC_suncont__port$QG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C51_SC_suncont__port$QG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div></template>
                    </div>`
                        })

/**
 * Component - C52 - SC - For supply contracts: samples, descriptions or photographs without certification of authenticity
 */
Vue.component("v4.0.0-C52",
                        { 
                            data(){
                                return {
                                "html_C52_SC_wo__autent$SBC1": '', 

                                exp:{
                                "cb_C52": window.espd_model['C52'].selected, 
"C52_SC_wo__autent$SBC1$QG1$Q1" : false,
"C52_SC_wo__autent$QG1$Q1" : false,
"C52_SC_wo__autent$QG1$QSG1$Q1" : false,
"C52_SC_wo__autent$QG1$QSG1$QSG1$Q1" : [],
"C52_SC_wo__autent$QG1$QSG1$QSG1$Q2" : [],
"C52_SC_wo__autent$QG2$Q1" : false,
"C52_SC_wo__autent$QG2$QSG1$Q1" : false,
"C52_SC_wo__autent$QG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C52" v-model="exp['cb_C52']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C52" value="OK" unchecked-value="KO">
                            <strong>For supply contracts: samples, descriptions or photographs without certification of authenticity</strong>
                            <p>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied, which do not need to be accompanied by certifications of authenticity.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C52'] ==='OK'">
                        <div><div v-html="html_C52_SC_wo__autent$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C52_SC_wo__autent$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C52_SC_wo__autent$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C52_SC_wo__autent$SBC1 = renderHTML('C52_SC_wo-autent/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C52_SC_wo__autent$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C52_SC_wo__autent$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C52_SC_wo__autent$QG1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C52_SC_wo__autent$QG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C52_SC_wo__autent$QG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C52_SC_wo__autent$QG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C52_SC_wo__autent$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C52_SC_wo__autent$QG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                        </div>
                        <div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C52_SC_wo__autent$QG2']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C52_SC_wo__autent$QG2']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C52_SC_wo__autent$QG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C52_SC_wo__autent$QG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C52_SC_wo__autent$QG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C52_SC_wo__autent$QG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div></template>
                    </div>`
                        })

/**
 * Component - C53 - SC - For supply contracts: samples, descriptions or photographs with certification of authenticity
 */
Vue.component("v4.0.0-C53",
                        { 
                            data(){
                                return {
                                "html_C53_SC_w__autent$SBC1": '', 

                                exp:{
                                "cb_C53": window.espd_model['C53'].selected, 
"C53_SC_w__autent$SBC1$QG1$Q1" : false,
"C53_SC_w__autent$QG1$Q1" : false,
"C53_SC_w__autent$QG1$QSG1$Q1" : false,
"C53_SC_w__autent$QG1$QSG1$QSG1$Q1" : [],
"C53_SC_w__autent$QG1$QSG1$QSG1$Q2" : [],
"C53_SC_w__autent$QG2$Q1" : false,
"C53_SC_w__autent$QG2$QSG1$Q1" : false,
"C53_SC_w__autent$QG2$QSG1$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C53" v-model="exp['cb_C53']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C53" value="OK" unchecked-value="KO">
                            <strong>For supply contracts: samples, descriptions or photographs with certification of authenticity</strong>
                            <p>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied and will provide certifications of authenticity where applicable.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C53'] ==='OK'">
                        <div><div v-html="html_C53_SC_w__autent$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C53_SC_w__autent$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C53_SC_w__autent$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C53_SC_w__autent$SBC1 = renderHTML('C53_SC_w-autent/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div>
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C53_SC_w__autent$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C53_SC_w__autent$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C53_SC_w__autent$QG1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C53_SC_w__autent$QG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C53_SC_w__autent$QG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C53_SC_w__autent$QG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C53_SC_w__autent$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C53_SC_w__autent$QG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                        </div>
                        <div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C53_SC_w__autent$QG2']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C53_SC_w__autent$QG2']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C53_SC_w__autent$QG2$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C53_SC_w__autent$QG2$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C53_SC_w__autent$QG2$QSG1$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C53_SC_w__autent$QG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div></template>
                    </div>`
                        })

/**
 * Component - C54 - SC - For supply contracts: certificates by quality control institutes
 */
Vue.component("v4.0.0-C54",
                        { 
                            data(){
                                return {
                                "html_C54_SC_qa__certif__inst$SBC1": '', 
"html_C54_SC_qa__certif__inst$RG1": '', 
"html_C54_SC_qa__certif__inst$RG1$RSG1": '', 

                                exp:{
                                "cb_C54": window.espd_model['C54'].selected, 
"C54_SC_qa__certif__inst$SBC1$QG1$Q1" : false,
"C54_SC_qa__certif__inst$RG1$RQ1$R1$R1" : '',
"lotid_C54" : window.espd_model['C54'].lots,
"C54_SC_qa__certif__inst$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C54_SC_qa__certif__inst$RG1$RSG1$QSG1$Q1" : false,
"C54_SC_qa__certif__inst$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C54_SC_qa__certif__inst$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C54_SC_qa__certif__inst$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C54_SC_qa__certif__inst$RG1$RSG1$QSG2$Q1" : false,
"C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG1$Q1" : [],
"C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG2$Q1" : false,
"C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C54" v-model="exp['cb_C54']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C54" value="OK" unchecked-value="KO">
                            <strong>For supply contracts: certificates by quality control institutes</strong>
                            <p>Can the economic operator provide the required certificates drawn up by official quality control institutes or agencies of recognised competence attesting the conformity of products clearly identified by references to the technical specifications or standards, which are set out in the relevant notice or the in the ESPD, the relevant notice or ?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C54'] ==='OK'">
                        <div><div v-html="html_C54_SC_qa__certif__inst$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C54_SC_qa__certif__inst$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C54_SC_qa__certif__inst$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C54_SC_qa__certif__inst$SBC1 = renderHTML('C54_SC_qa-certif-inst/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C54_SC_qa__certif__inst$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C54']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C54'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C54'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C54_SC_qa__certif__inst$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] If not, please explain why and state which other means of proof can be provided:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C54_SC_qa__certif__inst$RG1$RSG1 = renderHTML('C54_SC_qa-certif-inst/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C54_SC_qa__certif__inst$RG1 = renderHTML('C54_SC_qa-certif-inst/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C55 - SC - Certificates by independent bodies about quality assurance standards
 */
Vue.component("v4.0.0-C55",
                        { 
                            data(){
                                return {
                                "html_C55_SC_qu__certif__indep$SBC1": '', 
"html_C55_SC_qu__certif__indep$RG1": '', 
"html_C55_SC_qu__certif__indep$RG1$RSG1": '', 

                                exp:{
                                "cb_C55": window.espd_model['C55'].selected, 
"C55_SC_qu__certif__indep$SBC1$QG1$Q1" : false,
"C55_SC_qu__certif__indep$RG1$RQ1$R1$R1" : '',
"lotid_C55" : window.espd_model['C55'].lots,
"C55_SC_qu__certif__indep$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C55_SC_qu__certif__indep$RG1$RSG1$QSG1$Q1" : false,
"C55_SC_qu__certif__indep$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C55_SC_qu__certif__indep$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C55_SC_qu__certif__indep$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C55_SC_qu__certif__indep$RG1$RSG1$QSG2$Q1" : false,
"C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG1$Q1" : [],
"C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG2$Q1" : false,
"C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C55" v-model="exp['cb_C55']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C55" value="OK" unchecked-value="KO">
                            <strong>Certificates by independent bodies about quality assurance standards</strong>
                            <p>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required quality assurance standards, including accessibility for disabled persons?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C55'] ==='OK'">
                        <div><div v-html="html_C55_SC_qu__certif__indep$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C55_SC_qu__certif__indep$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C55_SC_qu__certif__indep$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C55_SC_qu__certif__indep$SBC1 = renderHTML('C55_SC_qu-certif-indep/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C55_SC_qu__certif__indep$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C55']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C55'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C55'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C55_SC_qu__certif__indep$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] If not, please explain why and state which other means of proof can be provided:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C55_SC_qu__certif__indep$RG1$RSG1 = renderHTML('C55_SC_qu-certif-indep/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C55_SC_qu__certif__indep$RG1 = renderHTML('C55_SC_qu-certif-indep/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C56 - SC - Certificates by independent bodies about environmental management systems or standards
 */
Vue.component("v4.0.0-C56",
                        { 
                            data(){
                                return {
                                "html_C56_SC_envir__certif__indep$SBC1": '', 
"html_C56_SC_envir__certif__indep$RG1": '', 
"html_C56_SC_envir__certif__indep$RG1$RSG1": '', 

                                exp:{
                                "cb_C56": window.espd_model['C56'].selected, 
"C56_SC_envir__certif__indep$SBC1$QG1$Q1" : false,
"C56_SC_envir__certif__indep$RG1$RQ1$R1$R1" : '',
"lotid_C56" : window.espd_model['C56'].lots,
"C56_SC_envir__certif__indep$RG1$RSG1$RQ1$R1$R1$R1" : '',
"C56_SC_envir__certif__indep$RG1$RSG1$QSG1$Q1" : false,
"C56_SC_envir__certif__indep$RG1$RSG1$QSG1$QSG1$Q1" : false,
"C56_SC_envir__certif__indep$RG1$RSG1$QSG1$QSG1$QSG1$Q1" : [],
"C56_SC_envir__certif__indep$RG1$RSG1$QSG1$QSG1$QSG1$Q2" : [],
"C56_SC_envir__certif__indep$RG1$RSG1$QSG2$Q1" : false,
"C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG1$Q1" : [],
"C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG2$Q1" : false,
"C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                        <b-form-checkbox id="checkbox-C56" v-model="exp['cb_C56']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-C56" value="OK" unchecked-value="KO">
                            <strong>Certificates by independent bodies about environmental management systems or standards</strong>
                            <p>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required environmental management systems or standards?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_C56'] ==='OK'">
                        <div><div v-html="html_C56_SC_envir__certif__indep$SBC1"></div><b-card footer-tag="footer">
                        <div><div>[Additional information; e.g. no evidences online]</div>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="exp['C56_SC_envir__certif__indep$SBC1$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C56_SC_envir__certif__indep$SBC1$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="html_C56_SC_envir__certif__indep$SBC1 = renderHTML('C56_SC_envir-certif-indep/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><div v-html="html_C56_SC_envir__certif__indep$RG1"></div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="exp['lotid_C56']"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => exp['lotid_C56'].indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => exp['lotid_C56'].indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><div v-html="html_C56_SC_envir__certif__indep$RG1$RSG1"></div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG1$Q1']">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$Q1']">
                                        
                                <b-form-group label="[Q] If not, please explain why and state which other means of proof can be provided:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="html_C56_SC_envir__certif__indep$RG1$RSG1 = renderHTML('C56_SC_envir-certif-indep/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="html_C56_SC_envir__certif__indep$RG1 = renderHTML('C56_SC_envir-certif-indep/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - C57 - OT - Economic operator is a sheltered workshop
 */
Vue.component("v4.0.0-C57",
                        { 
                            data(){
                                return {
                                
                                exp:{
                                "C57_OT_shelt__worksh$QG1$Q1" : false,
"C57_OT_shelt__worksh$QG1$QSG1$Q1" : [],
"C57_OT_shelt__worksh$QG1$QSG1$Q2" : [],
"C57_OT_shelt__worksh$QG1$QSG2$Q1" : false,
"C57_OT_shelt__worksh$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Economic operator is a sheltered workshop</strong>
                            <p>Only in case the procurement is reserved: is the economic operator a sheltered workshop, a 'social business' or will it provide for the performance of the contract in the context of sheltered employment programmes?</p>
                            
                        <div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C57_OT_shelt__worksh$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C57_OT_shelt__worksh$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C57_OT_shelt__worksh$QG1']">
                                        
                                <b-form-group label="[Q] What is the corresponding percentage of disabled or disadvantaged workers?" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERCENTAGE" v-model="exp['C57_OT_shelt__worksh$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] If required, please provide details on whether the employees concerned belong to a specific category of disabled or disadvantaged workers?" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C57_OT_shelt__worksh$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C57_OT_shelt__worksh$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C57_OT_shelt__worksh$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C57_OT_shelt__worksh$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C57_OT_shelt__worksh$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C58 - OT - Economic operator registered in a pre qualification system
 */
Vue.component("v4.0.0-C58",
                        { 
                            data(){
                                return {
                                
                                exp:{
                                "C58_OT_registered$QG1$Q1" : false,
"C58_OT_registered$QG1$QSG1$Q1" : false,
"C58_OT_registered$QG1$QSG1$QSG1$Q1" : [],
"C58_OT_registered$QG1$QSG1$QSG1$Q2" : [],
"C58_OT_registered$QG1$QSG1$QSG1$Q3" : [],
"C58_OT_registered$QG1$QSG1$QSG1$QSG1$Q1" : false,
"C58_OT_registered$QG1$QSG1$QSG2$Q1" : false,
"C58_OT_registered$QG1$QSG1$QSG3$Q1" : false,
"C58_OT_registered$QG1$QSG1$QSG3$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Economic operator registered in a pre qualification system</strong>
                            <p>Does the country of the economic operator have an official list of approved economic operators or an equivalent certificate (e.g. under a national (pre)qualification system)?</p>
                            
                        <div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C58_OT_registered$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C58_OT_registered$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C58_OT_registered$QG1']">
                                        
                                            <br/>[Q] Is the economic operator registered on an official list of approved economic operators or does it have an equivalent certificate? <b-form-checkbox v-model="exp['C58_OT_registered$QG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C58_OT_registered$QG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C58_OT_registered$QG1$QSG1$Q1']">
                                        
                                <b-form-group label="[Q] Please provide the name of the list or certificate and the relevant registration or certification number, if applicable" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C58_OT_registered$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] If the certificate of registration or certification is available electronically, please state where" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="URL" v-model="exp['C58_OT_registered$QG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Please state the references on which the registration or certification is based, and, where applicable, the classification obtained in the official list" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C58_OT_registered$QG1$QSG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Does the registration or certification cover all of the required selection criteria? <b-form-checkbox v-model="exp['C58_OT_registered$QG1$QSG1$QSG1$QSG1$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C58_OT_registered$QG1$QSG1$QSG1$QSG1$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            </div>
                                        </div>
                                        <div v-if="!exp['C58_OT_registered$QG1$QSG1$Q1']">
                                        
                                            <br/>[Q] Will the economic operator be able to provide a certificate with regard to the payment of social security contributions and taxes or provide information enabling the contracting authority or contracting entity to obtaining it directly by accessing a national database in any Member State that is available free of charge? <b-form-checkbox v-model="exp['C58_OT_registered$QG1$QSG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C58_OT_registered$QG1$QSG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C58_OT_registered$QG1$QSG1$QSG3$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C58_OT_registered$QG1$QSG1$QSG3$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C58_OT_registered$QG1$QSG1$QSG3$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C58_OT_registered$QG1$QSG1$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                        </div>
                                        <div v-if="!exp['C58_OT_registered$QG1']">
                                        <div>The country of the economic operator does not have an official list of approved economic operators or an equivalent certificate (e.g. under a national (pre)qualification system).</div>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - C59 - OT - Economic Operator together with others
 */
Vue.component("v4.0.0-C59",
                        { 
                            data(){
                                return {
                                
                                exp:{
                                "C59_OT_eo__group$QG1$Q1" : false,
"C59_OT_eo__group$QG1$QSG1$Q1" : [],
"C59_OT_eo__group$QG1$QSG1$Q2" : [],
"C59_OT_eo__group$QG1$QSG1$Q3" : [],
"C59_OT_eo__group$QG1$QSG2$Q1" : false,
"C59_OT_eo__group$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Economic Operator together with others</strong>
                            <p>Is the economic operator participating in the procurement procedure together with others?</p>
                            
                        <div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C59_OT_eo__group$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C59_OT_eo__group$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C59_OT_eo__group$QG1']">
                                        
                                <b-form-group label="[Q] Please indicate the role of the economic operator in the group (leader, responsible for specific tasks...)" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="CODE" v-model="exp['C59_OT_eo__group$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Please identify the other economic operators participating in the procurement procedure together" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C59_OT_eo__group$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Where applicable, name of the participating group:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C59_OT_eo__group$QG1$QSG1$Q3'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C59_OT_eo__group$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C59_OT_eo__group$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C59_OT_eo__group$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C59_OT_eo__group$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C60 - OT - Relied on entities
 */
Vue.component("v4.0.0-C60",
                        { 
                            data(){
                                return {
                                "html_C60_OT_relied$QG1$QSG1": '', 

                                exp:{
                                "C60_OT_relied$QG1$Q1" : false,
"C60_OT_relied$QG1$QSG1$Q1" : [],
"C60_OT_relied$QG1$QSG1$Q2" : [],
"C60_OT_relied$QG1$QSG2$Q1" : false,
"C60_OT_relied$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Relied on entities</strong>
                            <p>Does the economic operator rely on the capacities of other entities in order to meet the selection criteria set out under Part IV and the criteria and rules (if any) set out under Part V below?</p>
                            
                        <div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C60_OT_relied$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C60_OT_relied$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C60_OT_relied$QG1']">
                                        <div v-html="html_C60_OT_relied$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C60_OT_relied$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C60_OT_relied$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group><template #footer>
                    <b-button variant="success" @click="html_C60_OT_relied$QG1$QSG1 = renderHTML('C60_OT_relied/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C60_OT_relied$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C60_OT_relied$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C60_OT_relied$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C60_OT_relied$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C61 - OT - Not relied on entities
 */
Vue.component("v4.0.0-C61",
                        { 
                            data(){
                                return {
                                "html_C61_OT_subco__ent$QG1$QSG1": '', 

                                exp:{
                                "C61_OT_subco__ent$QG1$Q1" : false,
"C61_OT_subco__ent$QG1$QSG1$Q1" : [],
"C61_OT_subco__ent$QG1$QSG1$Q2" : [],
"C61_OT_subco__ent$QG1$QSG2$Q1" : false,
"C61_OT_subco__ent$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Not relied on entities</strong>
                            <p>Does the economic operator intend to subcontract any share of the contract to third parties?</p>
                            
                        <div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C61_OT_subco__ent$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C61_OT_subco__ent$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C61_OT_subco__ent$QG1']">
                                        <div v-html="html_C61_OT_subco__ent$QG1$QSG1"></div><b-card footer-tag="footer">
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C61_OT_subco__ent$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the subcontractor" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C61_OT_subco__ent$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group><template #footer>
                    <b-button variant="success" @click="html_C61_OT_subco__ent$QG1$QSG1 = renderHTML('C61_OT_subco-ent/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C61_OT_subco__ent$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C61_OT_subco__ent$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C61_OT_subco__ent$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C61_OT_subco__ent$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C63 - OT - Reduction of the number of qualified candidates
 */
Vue.component("v4.0.0-C63",
                        { 
                            data(){
                                return {
                                
                                exp:{
                                "C63_OT_staff__red$QG1$Q1" : false,
"C63_OT_staff__red$QG1$QSG1$Q1" : [],
"C63_OT_staff__red$QG1$QSG2$Q1" : false,
"C63_OT_staff__red$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Reduction of the number of qualified candidates</strong>
                            <p>The economic operator declares that It meets the objective and non discriminatory criteria or rules to be applied in order to limit the number of candidates in the following way:</p>
                            <div>In case certain certificates or other forms of documentary evidence are required, please indicate for each whether the economic operator has the required documents</div>
                        <div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C63_OT_staff__red$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C63_OT_staff__red$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C63_OT_staff__red$QG1']">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C63_OT_staff__red$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C63_OT_staff__red$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C63_OT_staff__red$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C63_OT_staff__red$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C63_OT_staff__red$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - C65 - OT - Economic Operator Micro, Small or Medium-sized Enterprise
 */
Vue.component("v4.0.0-C65",
                        { 
                            data(){
                                return {
                                
                                exp:{
                                "C65_OT_sme$QG1$Q1" : false,
"C65_OT_sme$QG1$QSG1$Q1" : [],
"C65_OT_sme$QG1$QSG1$Q2" : [],
"C65_OT_sme$QG1$QSG2$Q1" : false,
"C65_OT_sme$QG1$QSG2$QSG1$Q1" : [],

                                }
                                }
                            },
                            template: `<div>
                            <strong>Economic Operator Micro, Small or Medium-sized Enterprise</strong>
                            <p>Is the economic operator a Micro, a Small or Medium-sized Enterprise?</p>
                            
                        <div>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="exp['C65_OT_sme$QG1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C65_OT_sme$QG1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C65_OT_sme$QG1']">
                                        
                                <b-form-group label="[Q] Number of employees" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_INTEGER" v-model="exp['C65_OT_sme$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Turnover" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C65_OT_sme$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="exp['C65_OT_sme$QG1$QSG2$Q1']" name="check-button" inline="true" switch>
                                                     <b>[{{ exp['C65_OT_sme$QG1$QSG2$Q1']?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="exp['C65_OT_sme$QG1$QSG2$Q1']">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C65_OT_sme$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })
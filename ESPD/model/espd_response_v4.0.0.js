

/**
 * Component - CC1 - EG - Participation in a criminal organisation
 */
Vue.component("v4.0.0-CC1",
                        { 
                            data(){
                                return {
                                "C1_EG_crime-org/SBC1/QG1" : [],
"selected01" : false,
"C1_EG_crime-org/QG1" : [],
"selected02" : false,
"C1_EG_crime-org/QG1/QSG1" : [],
"C1_EG_crime-org/QG1/QSG1/QSG1" : [],
"selected03" : false,
"C1_EG_crime-org/QG1/QSG1/QSG1/QSG1" : [],
"C1_EG_crime-org/QG1/QSG1/QSG2" : [],
"selected04" : false,
"C1_EG_crime-org/QG1/QSG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected01" name="check-button" inline="true" switch>
                                                     <b>[{{ selected01?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C1_EG_crime-org/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected02" name="check-button" inline="true" switch>
                                                     <b>[{{ selected02?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected02">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected03" name="check-button" inline="true" switch>
                                                     <b>[{{ selected03?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected03">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C1_EG_crime__org$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected04" name="check-button" inline="true" switch>
                                                     <b>[{{ selected04?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected04">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C1_EG_crime__org$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C1_EG_crime-org/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC2 - EG - Corruption
 */
Vue.component("v4.0.0-CC2",
                        { 
                            data(){
                                return {
                                "C2_EG_corruption/SBC1/QG1" : [],
"selected05" : false,
"C2_EG_corruption/QG1" : [],
"selected06" : false,
"C2_EG_corruption/QG1/QSG1" : [],
"C2_EG_corruption/QG1/QSG1/QSG1" : [],
"selected07" : false,
"C2_EG_corruption/QG1/QSG1/QSG1/QSG1" : [],
"C2_EG_corruption/QG1/QSG1/QSG2" : [],
"selected08" : false,
"C2_EG_corruption/QG1/QSG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected05" name="check-button" inline="true" switch>
                                                     <b>[{{ selected05?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C2_EG_corruption/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected06" name="check-button" inline="true" switch>
                                                     <b>[{{ selected06?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected06">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected07" name="check-button" inline="true" switch>
                                                     <b>[{{ selected07?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected07">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C2_EG_corruption$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected08" name="check-button" inline="true" switch>
                                                     <b>[{{ selected08?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected08">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C2_EG_corruption$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C2_EG_corruption/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC3 - EG - Fraud
 */
Vue.component("v4.0.0-CC3",
                        { 
                            data(){
                                return {
                                "C3_EG_fraud/SBC1/QG1" : [],
"selected09" : false,
"C3_EG_fraud/QG1" : [],
"selected10" : false,
"C3_EG_fraud/QG1/QSG1" : [],
"C3_EG_fraud/QG1/QSG1/QSG1" : [],
"selected11" : false,
"C3_EG_fraud/QG1/QSG1/QSG1/QSG1" : [],
"C3_EG_fraud/QG1/QSG1/QSG2" : [],
"selected12" : false,
"C3_EG_fraud/QG1/QSG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected09" name="check-button" inline="true" switch>
                                                     <b>[{{ selected09?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C3_EG_fraud/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected10" name="check-button" inline="true" switch>
                                                     <b>[{{ selected10?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected10">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected11" name="check-button" inline="true" switch>
                                                     <b>[{{ selected11?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected11">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C3_EG_fraud$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected12" name="check-button" inline="true" switch>
                                                     <b>[{{ selected12?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected12">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C3_EG_fraud$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C3_EG_fraud/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC4 - EG - Terrorist offences or offences linked to terrorist activities
 */
Vue.component("v4.0.0-CC4",
                        { 
                            data(){
                                return {
                                "C4_EG_terr-offence/SBC1/QG1" : [],
"selected13" : false,
"C4_EG_terr-offence/QG1" : [],
"selected14" : false,
"C4_EG_terr-offence/QG1/QSG1" : [],
"C4_EG_terr-offence/QG1/QSG1/QSG1" : [],
"selected15" : false,
"C4_EG_terr-offence/QG1/QSG1/QSG1/QSG1" : [],
"C4_EG_terr-offence/QG1/QSG1/QSG2" : [],
"selected16" : false,
"C4_EG_terr-offence/QG1/QSG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected13" name="check-button" inline="true" switch>
                                                     <b>[{{ selected13?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C4_EG_terr-offence/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected14" name="check-button" inline="true" switch>
                                                     <b>[{{ selected14?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected14">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected15" name="check-button" inline="true" switch>
                                                     <b>[{{ selected15?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected15">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C4_EG_terr__offence$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected16" name="check-button" inline="true" switch>
                                                     <b>[{{ selected16?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected16">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C4_EG_terr__offence$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C4_EG_terr-offence/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC5 - EG - Money laundering or terrorist financing
 */
Vue.component("v4.0.0-CC5",
                        { 
                            data(){
                                return {
                                "C5_EG_finan-laund/SBC1/QG1" : [],
"selected17" : false,
"C5_EG_finan-laund/QG1" : [],
"selected18" : false,
"C5_EG_finan-laund/QG1/QSG1" : [],
"C5_EG_finan-laund/QG1/QSG1/QSG1" : [],
"selected19" : false,
"C5_EG_finan-laund/QG1/QSG1/QSG1/QSG1" : [],
"C5_EG_finan-laund/QG1/QSG1/QSG2" : [],
"selected20" : false,
"C5_EG_finan-laund/QG1/QSG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected17" name="check-button" inline="true" switch>
                                                     <b>[{{ selected17?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C5_EG_finan-laund/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected18" name="check-button" inline="true" switch>
                                                     <b>[{{ selected18?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected18">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected19" name="check-button" inline="true" switch>
                                                     <b>[{{ selected19?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected19">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C5_EG_finan__laund$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected20" name="check-button" inline="true" switch>
                                                     <b>[{{ selected20?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected20">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C5_EG_finan__laund$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C5_EG_finan-laund/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC6 - EG - Child labour and other forms of trafficking in human beings
 */
Vue.component("v4.0.0-CC6",
                        { 
                            data(){
                                return {
                                "C6_EG_human-traffic/SBC1/QG1" : [],
"selected21" : false,
"C6_EG_human-traffic/QG1" : [],
"selected22" : false,
"C6_EG_human-traffic/QG1/QSG1" : [],
"C6_EG_human-traffic/QG1/QSG1/QSG1" : [],
"selected23" : false,
"C6_EG_human-traffic/QG1/QSG1/QSG1/QSG1" : [],
"C6_EG_human-traffic/QG1/QSG1/QSG2" : [],
"selected24" : false,
"C6_EG_human-traffic/QG1/QSG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected21" name="check-button" inline="true" switch>
                                                     <b>[{{ selected21?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C6_EG_human-traffic/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected22" name="check-button" inline="true" switch>
                                                     <b>[{{ selected22?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected22">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected23" name="check-button" inline="true" switch>
                                                     <b>[{{ selected23?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected23">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C6_EG_human__traffic$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected24" name="check-button" inline="true" switch>
                                                     <b>[{{ selected24?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected24">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C6_EG_human__traffic$QG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C6_EG_human-traffic/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC7 - EG - Payment of taxes
 */
Vue.component("v4.0.0-CC7",
                        { 
                            data(){
                                return {
                                "C7_EG_tax-pay/SBC1/QG1" : [],
"selected25" : false,
"C7_EG_tax-pay/RG1" : [],
"C7_EG_tax-pay/RG1/QSG1" : [],
"selected26" : false,
"C7_EG_tax-pay/RG1/QSG1/QSG1" : [],
"C7_EG_tax-pay/RG1/QSG1/QSG1/QSG1" : [],
"selected27" : false,
"C7_EG_tax-pay/RG1/QSG1/QSG1/QSG1/QSG1" : [],
"C7_EG_tax-pay/RG1/QSG1/QSG1/QSG1/QSG2" : [],
"selected28" : false,
"C7_EG_tax-pay/RG1/QSG1/QSG1/QSG1/QSG2/QSG1" : [],
"C7_EG_tax-pay/RG1/QSG1/QSG1/QSG1/QSG3" : [],
"selected29" : false,
"C7_EG_tax-pay/RG1/QSG1/QSG1/QSG1/QSG3/QSG1" : [],
"C7_EG_tax-pay/RG1/QSG1/QSG1/QSG2" : [],
"selected30" : false,
"C7_EG_tax-pay/RG1/QSG1/QSG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected25" name="check-button" inline="true" switch>
                                                     <b>[{{ selected25?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C7_EG_tax-pay/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
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
                    
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected26" name="check-button" inline="true" switch>
                                                     <b>[{{ selected26?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected26">
                                        
                                <b-form-group label="[Q] Country or member state concerned" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="CODE_COUNTRY" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Amount concerned" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Has this breach of obligations been established by means other than a judicial or administrative decision? <b-form-checkbox v-model="selected27" name="check-button" inline="true" switch>
                                                     <b>[{{ selected27?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected27">
                                        
                                <b-form-group label="[Q] Please describe which means were used" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!selected27">
                                        
                                            <br/>[Q] If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? <b-form-checkbox v-model="selected28" name="check-button" inline="true" switch>
                                                     <b>[{{ selected28?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected28">
                                        
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
                                            <br/>[Q] Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the taxes contributions due, including, where applicable, any interest accrued or fines? <b-form-checkbox v-model="selected29" name="check-button" inline="true" switch>
                                                     <b>[{{ selected29?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected29">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG1$QSG3$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected30" name="check-button" inline="true" switch>
                                                     <b>[{{ selected30?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected30">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C7_EG_tax__pay$RG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                        </div></div>
                    </div>`
                        })

/**
 * Component - CC8 - EG - Payment of social security contributions
 */
Vue.component("v4.0.0-CC8",
                        { 
                            data(){
                                return {
                                "C8_EG_socsec-pay/SBC1/QG1" : [],
"selected31" : false,
"C8_EG_socsec-pay/RG1" : [],
"C8_EG_socsec-pay/RG1/QSG1" : [],
"selected32" : false,
"C8_EG_socsec-pay/RG1/QSG1/QSG1" : [],
"C8_EG_socsec-pay/RG1/QSG1/QSG1/QSG1" : [],
"selected33" : false,
"C8_EG_socsec-pay/RG1/QSG1/QSG1/QSG1/QSG1" : [],
"C8_EG_socsec-pay/RG1/QSG1/QSG1/QSG1/QSG2" : [],
"selected34" : false,
"C8_EG_socsec-pay/RG1/QSG1/QSG1/QSG1/QSG2/QSG1" : [],
"C8_EG_socsec-pay/RG1/QSG1/QSG1/QSG1/QSG3" : [],
"selected35" : false,
"C8_EG_socsec-pay/RG1/QSG1/QSG1/QSG1/QSG3/QSG1" : [],
"C8_EG_socsec-pay/RG1/QSG1/QSG1/QSG2" : [],
"selected36" : false,
"C8_EG_socsec-pay/RG1/QSG1/QSG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected31" name="check-button" inline="true" switch>
                                                     <b>[{{ selected31?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C8_EG_socsec-pay/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
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
                    
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected32" name="check-button" inline="true" switch>
                                                     <b>[{{ selected32?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected32">
                                        
                                <b-form-group label="[Q] Country or member state concerned" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="CODE_COUNTRY" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Amount concerned" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Has this breach of obligations been established by means other than a judicial or administrative decision? <b-form-checkbox v-model="selected33" name="check-button" inline="true" switch>
                                                     <b>[{{ selected33?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected33">
                                        
                                <b-form-group label="[Q] Please describe which means were used" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!selected33">
                                        
                                            <br/>[Q] If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? <b-form-checkbox v-model="selected34" name="check-button" inline="true" switch>
                                                     <b>[{{ selected34?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected34">
                                        
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
                                            <br/>[Q] Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the social security contributions due, including, where applicable, any interest accrued or fines? <b-form-checkbox v-model="selected35" name="check-button" inline="true" switch>
                                                     <b>[{{ selected35?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected35">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG1$QSG3$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div></div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected36" name="check-button" inline="true" switch>
                                                     <b>[{{ selected36?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected36">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C8_EG_socsec__pay$RG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                        </div></div>
                    </div>`
                        })

/**
 * Component - CC9 - EG - Breaching of obligations in the fields of environmental law
 */
Vue.component("v4.0.0-CC9",
                        { 
                            data(){
                                return {
                                "C9_EG_envir-law/SBC1/QG1" : [],
"selected37" : false,
"C9_EG_envir-law/QG1" : [],
"selected38" : false,
"C9_EG_envir-law/QG1/QSG1" : [],
"selected39" : false,
"C9_EG_envir-law/QG1/QSG1/QSG1" : [],
"C9_EG_envir-law/QG1/QSG2" : [],
"selected40" : false,
"C9_EG_envir-law/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected37" name="check-button" inline="true" switch>
                                                     <b>[{{ selected37?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C9_EG_envir-law/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected38" name="check-button" inline="true" switch>
                                                     <b>[{{ selected38?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected38">
                                        
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected39" name="check-button" inline="true" switch>
                                                     <b>[{{ selected39?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected39">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C9_EG_envir__law$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected40" name="check-button" inline="true" switch>
                                                     <b>[{{ selected40?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected40">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C9_EG_envir__law$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC10 - EG - Breaching of obligations in the fields of social law
 */
Vue.component("v4.0.0-CC10",
                        { 
                            data(){
                                return {
                                "C10_EG_socsec-law/SBC1/QG1" : [],
"selected41" : false,
"C10_EG_socsec-law/QG1" : [],
"selected42" : false,
"C10_EG_socsec-law/QG1/QSG1" : [],
"selected43" : false,
"C10_EG_socsec-law/QG1/QSG1/QSG1" : [],
"C10_EG_socsec-law/QG1/QSG2" : [],
"selected44" : false,
"C10_EG_socsec-law/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected41" name="check-button" inline="true" switch>
                                                     <b>[{{ selected41?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C10_EG_socsec-law/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected42" name="check-button" inline="true" switch>
                                                     <b>[{{ selected42?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected42">
                                        
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected43" name="check-button" inline="true" switch>
                                                     <b>[{{ selected43?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected43">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C10_EG_socsec__law$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected44" name="check-button" inline="true" switch>
                                                     <b>[{{ selected44?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected44">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C10_EG_socsec__law$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC11 - EG - Breaching of obligations in the fields of labour law
 */
Vue.component("v4.0.0-CC11",
                        { 
                            data(){
                                return {
                                "C11_EG_labour-law/SBC1/QG1" : [],
"selected45" : false,
"C11_EG_labour-law/QG1" : [],
"selected46" : false,
"C11_EG_labour-law/QG1/QSG1" : [],
"selected47" : false,
"C11_EG_labour-law/QG1/QSG1/QSG1" : [],
"C11_EG_labour-law/QG1/QSG2" : [],
"selected48" : false,
"C11_EG_labour-law/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected45" name="check-button" inline="true" switch>
                                                     <b>[{{ selected45?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C11_EG_labour-law/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected46" name="check-button" inline="true" switch>
                                                     <b>[{{ selected46?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected46">
                                        
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected47" name="check-button" inline="true" switch>
                                                     <b>[{{ selected47?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected47">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C11_EG_labour__law$QG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected48" name="check-button" inline="true" switch>
                                                     <b>[{{ selected48?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected48">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C11_EG_labour__law$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC12 - EG - Bankruptcy
 */
Vue.component("v4.0.0-CC12",
                        { 
                            data(){
                                return {
                                "C12_EG_bankruptcy/SBC1/QG1" : [],
"selected49" : false,
"C12_EG_bankruptcy/QG1" : [],
"selected50" : false,
"C12_EG_bankruptcy/QG1/QSG1" : [],
"C12_EG_bankruptcy/QG1/QSG2" : [],
"selected51" : false,
"C12_EG_bankruptcy/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected49" name="check-button" inline="true" switch>
                                                     <b>[{{ selected49?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C12_EG_bankruptcy/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected50" name="check-button" inline="true" switch>
                                                     <b>[{{ selected50?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected50">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C12_EG_bankruptcy$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C12_EG_bankruptcy$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected51" name="check-button" inline="true" switch>
                                                     <b>[{{ selected51?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected51">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C12_EG_bankruptcy$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC13 - EG - Insolvency
 */
Vue.component("v4.0.0-CC13",
                        { 
                            data(){
                                return {
                                "C13_EG_insolvency/SBC1/QG1" : [],
"selected52" : false,
"C13_EG_insolvency/QG1" : [],
"selected53" : false,
"C13_EG_insolvency/QG1/QSG1" : [],
"C13_EG_insolvency/QG1/QSG2" : [],
"selected54" : false,
"C13_EG_insolvency/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected52" name="check-button" inline="true" switch>
                                                     <b>[{{ selected52?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C13_EG_insolvency/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected53" name="check-button" inline="true" switch>
                                                     <b>[{{ selected53?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected53">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C13_EG_insolvency$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C13_EG_insolvency$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected54" name="check-button" inline="true" switch>
                                                     <b>[{{ selected54?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected54">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C13_EG_insolvency$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC14 - EG - Arrangement with creditors
 */
Vue.component("v4.0.0-CC14",
                        { 
                            data(){
                                return {
                                "C14_EG_cred-arran/SBC1/QG1" : [],
"selected55" : false,
"C14_EG_cred-arran/QG1" : [],
"selected56" : false,
"C14_EG_cred-arran/QG1/QSG1" : [],
"C14_EG_cred-arran/QG1/QSG2" : [],
"selected57" : false,
"C14_EG_cred-arran/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected55" name="check-button" inline="true" switch>
                                                     <b>[{{ selected55?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C14_EG_cred-arran/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected56" name="check-button" inline="true" switch>
                                                     <b>[{{ selected56?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected56">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C14_EG_cred__arran$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C14_EG_cred__arran$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected57" name="check-button" inline="true" switch>
                                                     <b>[{{ selected57?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected57">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C14_EG_cred__arran$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC15 - EG - Analogous situation like bankruptcy under national law
 */
Vue.component("v4.0.0-CC15",
                        { 
                            data(){
                                return {
                                "C15_EG_bankr-nat/SBC1/QG1" : [],
"selected58" : false,
"C15_EG_bankr-nat/QG1" : [],
"selected59" : false,
"C15_EG_bankr-nat/QG1/QSG1" : [],
"C15_EG_bankr-nat/QG1/QSG2" : [],
"selected60" : false,
"C15_EG_bankr-nat/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected58" name="check-button" inline="true" switch>
                                                     <b>[{{ selected58?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C15_EG_bankr-nat/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected59" name="check-button" inline="true" switch>
                                                     <b>[{{ selected59?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected59">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C15_EG_bankr__nat$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C15_EG_bankr__nat$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected60" name="check-button" inline="true" switch>
                                                     <b>[{{ selected60?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected60">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C15_EG_bankr__nat$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC16 - EG - Assets being administered by liquidator
 */
Vue.component("v4.0.0-CC16",
                        { 
                            data(){
                                return {
                                "C16_EG_liq-admin/SBC1/QG1" : [],
"selected61" : false,
"C16_EG_liq-admin/QG1" : [],
"selected62" : false,
"C16_EG_liq-admin/QG1/QSG1" : [],
"C16_EG_liq-admin/QG1/QSG2" : [],
"selected63" : false,
"C16_EG_liq-admin/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected61" name="check-button" inline="true" switch>
                                                     <b>[{{ selected61?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C16_EG_liq-admin/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected62" name="check-button" inline="true" switch>
                                                     <b>[{{ selected62?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected62">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C16_EG_liq__admin$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C16_EG_liq__admin$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected63" name="check-button" inline="true" switch>
                                                     <b>[{{ selected63?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected63">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C16_EG_liq__admin$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC17 - EG - Business activities are suspended
 */
Vue.component("v4.0.0-CC17",
                        { 
                            data(){
                                return {
                                "C17_EG_susp-act/SBC1/QG1" : [],
"selected64" : false,
"C17_EG_susp-act/QG1" : [],
"selected65" : false,
"C17_EG_susp-act/QG1/QSG1" : [],
"C17_EG_susp-act/QG1/QSG2" : [],
"selected66" : false,
"C17_EG_susp-act/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected64" name="check-button" inline="true" switch>
                                                     <b>[{{ selected64?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C17_EG_susp-act/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected65" name="check-button" inline="true" switch>
                                                     <b>[{{ selected65?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected65">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C17_EG_susp__act$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Indicate reasons for being nevertheless to perform the contract" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C17_EG_susp__act$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected66" name="check-button" inline="true" switch>
                                                     <b>[{{ selected66?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected66">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C17_EG_susp__act$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC18 - EG - Guilty of grave professional misconduct
 */
Vue.component("v4.0.0-CC18",
                        { 
                            data(){
                                return {
                                "C18_EG_prof-misconduct/SBC1/QG1" : [],
"selected67" : false,
"C18_EG_prof-misconduct/QG1" : [],
"selected68" : false,
"C18_EG_prof-misconduct/QG1/QSG1" : [],
"C18_EG_prof-misconduct/QG1/QSG1/QSG1" : [],
"selected69" : false,
"C18_EG_prof-misconduct/QG1/QSG1/QSG1/QSG1" : [],
"C18_EG_prof-misconduct/QG1/QSG2" : [],
"selected70" : false,
"C18_EG_prof-misconduct/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected67" name="check-button" inline="true" switch>
                                                     <b>[{{ selected67?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C18_EG_prof-misconduct/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected68" name="check-button" inline="true" switch>
                                                     <b>[{{ selected68?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected68">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C18_EG_prof__misconduct$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability <b-form-checkbox v-model="selected69" name="check-button" inline="true" switch>
                                                     <b>[{{ selected69?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected69">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C18_EG_prof__misconduct$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected70" name="check-button" inline="true" switch>
                                                     <b>[{{ selected70?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected70">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C18_EG_prof__misconduct$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC19 - EG - Agreements with other economic operators aimed at distorting competition
 */
Vue.component("v4.0.0-CC19",
                        { 
                            data(){
                                return {
                                "C19_EG_distorsion/SBC1/QG1" : [],
"selected71" : false,
"C19_EG_distorsion/QG1" : [],
"selected72" : false,
"C19_EG_distorsion/QG1/QSG1" : [],
"C19_EG_distorsion/QG1/QSG1/QSG1" : [],
"selected73" : false,
"C19_EG_distorsion/QG1/QSG1/QSG1/QSG1" : [],
"C19_EG_distorsion/QG1/QSG2" : [],
"selected74" : false,
"C19_EG_distorsion/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected71" name="check-button" inline="true" switch>
                                                     <b>[{{ selected71?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C19_EG_distorsion/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected72" name="check-button" inline="true" switch>
                                                     <b>[{{ selected72?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected72">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C19_EG_distorsion$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability <b-form-checkbox v-model="selected73" name="check-button" inline="true" switch>
                                                     <b>[{{ selected73?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected73">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C19_EG_distorsion$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected74" name="check-button" inline="true" switch>
                                                     <b>[{{ selected74?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected74">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C19_EG_distorsion$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC20 - EG - Conflict of interest due to its participation in the procurement procedure
 */
Vue.component("v4.0.0-CC20",
                        { 
                            data(){
                                return {
                                "C20_EG_partic-confl/SBC1/QG1" : [],
"selected75" : false,
"C20_EG_partic-confl/QG1" : [],
"selected76" : false,
"C20_EG_partic-confl/QG1/QSG1" : [],
"C20_EG_partic-confl/QG1/QSG2" : [],
"selected77" : false,
"C20_EG_partic-confl/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected75" name="check-button" inline="true" switch>
                                                     <b>[{{ selected75?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C20_EG_partic-confl/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected76" name="check-button" inline="true" switch>
                                                     <b>[{{ selected76?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected76">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C20_EG_partic__confl$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected77" name="check-button" inline="true" switch>
                                                     <b>[{{ selected77?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected77">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C20_EG_partic__confl$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC21 - EG - Direct or indirect involvement in the preparation of this procurement procedure
 */
Vue.component("v4.0.0-CC21",
                        { 
                            data(){
                                return {
                                "C21_EG_prep-confl/SBC1/QG1" : [],
"selected78" : false,
"C21_EG_prep-confl/QG1" : [],
"selected79" : false,
"C21_EG_prep-confl/QG1/QSG1" : [],
"C21_EG_prep-confl/QG1/QSG2" : [],
"selected80" : false,
"C21_EG_prep-confl/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected78" name="check-button" inline="true" switch>
                                                     <b>[{{ selected78?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C21_EG_prep-confl/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected79" name="check-button" inline="true" switch>
                                                     <b>[{{ selected79?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected79">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C21_EG_prep__confl$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected80" name="check-button" inline="true" switch>
                                                     <b>[{{ selected80?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected80">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C21_EG_prep__confl$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC22 - EG - Early termination, damages or other comparable sanctions
 */
Vue.component("v4.0.0-CC22",
                        { 
                            data(){
                                return {
                                "C22_EG_sanction/SBC1/QG1" : [],
"selected81" : false,
"C22_EG_sanction/QG1" : [],
"selected82" : false,
"C22_EG_sanction/QG1/QSG1" : [],
"C22_EG_sanction/QG1/QSG1/QSG1" : [],
"selected83" : false,
"C22_EG_sanction/QG1/QSG1/QSG1/QSG1" : [],
"C22_EG_sanction/QG1/QSG2" : [],
"selected84" : false,
"C22_EG_sanction/QG1/QSG2/QSG1" : [],

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
                            <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected81" name="check-button" inline="true" switch>
                                                     <b>[{{ selected81?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C22_EG_sanction/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected82" name="check-button" inline="true" switch>
                                                     <b>[{{ selected82?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected82">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C22_EG_sanction$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected83" name="check-button" inline="true" switch>
                                                     <b>[{{ selected83?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected83">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C22_EG_sanction$QG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected84" name="check-button" inline="true" switch>
                                                     <b>[{{ selected84?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected84">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C22_EG_sanction$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC23 - EG - Guilty of misrepresentation, withheld information, unable to provide required documents and obtained confidential information of this procedure
 */
Vue.component("v4.0.0-CC23",
                        { 
                            data(){
                                return {
                                "C23_EG_misrepresent/SBC1/QG1" : [],
"selected85" : false,
"C23_EG_misrepresent/QG1" : [],
"selected86" : false,
"C23_EG_misrepresent/QG1/QSG1" : [],
"selected87" : false,
"C23_EG_misrepresent/QG1/QSG1/QSG1" : [],

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
                            <em>a) It has been guilty of serious misrepresentation in supplying the information required for the verification of the absence of grounds for exclusion or the fulfilment of the selection criteria,</em><em>b) It has withheld such information,</em><em>c) It has not been able, without delay, to submit the supporting documents required by a contracting authority or contracting entity, and</em><em>d) It has undertaken to unduly influence the decision making process of the contracting authority or contracting entity, to obtain confidential information that may confer upon it undue advantages in the procurement procedure or to negligently provide misleading information that may have a material influence on decisions concerning exclusion, selection or award?</em><div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected85" name="check-button" inline="true" switch>
                                                     <b>[{{ selected85?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C23_EG_misrepresent/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer <b-form-checkbox v-model="selected86" name="check-button" inline="true" switch>
                                                     <b>[{{ selected86?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected87" name="check-button" inline="true" switch>
                                                     <b>[{{ selected87?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected87">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C23_EG_misrepresent$QG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC24 - EG - Purely national exclusion grounds
 */
Vue.component("v4.0.0-CC24",
                        { 
                            data(){
                                return {
                                "C24_EG_nati-ground/QG1" : [],
"C24_EG_nati-ground/QG1/QSG1" : [],
"selected88" : false,
"C24_EG_nati-ground/QG1/QSG1/QSG1" : [],
"selected89" : false,
"C24_EG_nati-ground/QG1/QSG1/QSG1/QSG1" : [],

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
                        <div v-if="window.espd_doc.role==='eo'"><em>CAPTION</em><div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer"><em>[Text describing the national criterion]</em><em>[Type of evidence from e-Certis]</em>
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected88" name="check-button" inline="true" switch>
                                                     <b>[{{ selected88?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected89" name="check-button" inline="true" switch>
                                                     <b>[{{ selected89?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected89">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C24_EG_nati__ground$QG1$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C24_EG_nati-ground/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC25 - SC - Enrolment in a relevant professional register
 */
Vue.component("v4.0.0-CC25",
                        { 
                            data(){
                                return {
                                "C25_SC_prof-regist/SBC1/QG1" : [],
"selected90" : false,
"C25_SC_prof-regist/RG1" : [],
"lotid_C25" : window.espd_model['CC25'].lots,
"C25_SC_prof-regist/RG1/RSG1" : [],
"C25_SC_prof-regist/RG1/RSG1/QSG1" : [],
"selected91" : false,
"C25_SC_prof-regist/RG1/RSG1/QSG1/QSG1" : [],
"selected92" : false,
"C25_SC_prof-regist/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C25_SC_prof-regist/RG1/RSG1/QSG2" : [],
"selected93" : false,
"C25_SC_prof-regist/RG1/RSG1/QSG2/QSG1" : [],
"C25_SC_prof-regist/RG1/RSG1/QSG2/QSG2" : [],
"C25_SC_prof-regist/RG1/RSG1/QSG2/QSG3" : [],
"selected94" : false,
"C25_SC_prof-regist/RG1/RSG1/QSG2/QSG3/QSG1" : [],

                                exp:{
                                "cb_CC25": window.espd_model['CC25'].selected, 
"C25_SC_prof__regist$SBC1$QG1$Q1" : false,
"C25_SC_prof__regist$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC25" v-model="exp['cb_CC25']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC25" value="OK" unchecked-value="KO">
                            <strong>Enrolment in a relevant professional register</strong>
                            <p>It is enrolled in relevant professional registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC25'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected90" name="check-button" inline="true" switch>
                                                     <b>[{{ selected90?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C25_SC_prof-regist/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C25"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C25.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C25.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected91" name="check-button" inline="true" switch>
                                                     <b>[{{ selected91?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected91">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected92" name="check-button" inline="true" switch>
                                                     <b>[{{ selected92?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected92">
                                        
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
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected93" name="check-button" inline="true" switch>
                                                     <b>[{{ selected93?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected93">
                                        
                                <b-form-group label="[Q] Registration number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!selected93">
                                        
                                <b-form-group label="[Q] Reasons why your are not registered" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected94" name="check-button" inline="true" switch>
                                                     <b>[{{ selected94?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected94">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C25_SC_prof__regist$RG1$RSG1$QSG2$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C25_SC_prof-regist/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C25_SC_prof-regist/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC26 - SC - Enrolment in a trade register
 */
Vue.component("v4.0.0-CC26",
                        { 
                            data(){
                                return {
                                "C26_SC_trade-regist/SBC1/QG1" : [],
"selected95" : false,
"C26_SC_trade-regist/RG1" : [],
"lotid_C26" : window.espd_model['CC26'].lots,
"C26_SC_trade-regist/RG1/RSG1" : [],
"C26_SC_trade-regist/RG1/RSG1/QSG1" : [],
"selected96" : false,
"C26_SC_trade-regist/RG1/RSG1/QSG1/QSG1" : [],
"selected97" : false,
"C26_SC_trade-regist/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C26_SC_trade-regist/RG1/RSG1/QSG2" : [],
"selected98" : false,
"C26_SC_trade-regist/RG1/RSG1/QSG2/QSG1" : [],
"C26_SC_trade-regist/RG1/RSG1/QSG2/QSG2" : [],
"C26_SC_trade-regist/RG1/RSG1/QSG2/QSG3" : [],
"selected99" : false,
"C26_SC_trade-regist/RG1/RSG1/QSG2/QSG3/QSG1" : [],

                                exp:{
                                "cb_CC26": window.espd_model['CC26'].selected, 
"C26_SC_trade__regist$SBC1$QG1$Q1" : false,
"C26_SC_trade__regist$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC26" v-model="exp['cb_CC26']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC26" value="OK" unchecked-value="KO">
                            <strong>Enrolment in a trade register</strong>
                            <p>It is enrolled in trade registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC26'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected95" name="check-button" inline="true" switch>
                                                     <b>[{{ selected95?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C26_SC_trade-regist/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C26"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C26.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C26.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected96" name="check-button" inline="true" switch>
                                                     <b>[{{ selected96?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected96">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected97" name="check-button" inline="true" switch>
                                                     <b>[{{ selected97?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected97">
                                        
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
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected98" name="check-button" inline="true" switch>
                                                     <b>[{{ selected98?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected98">
                                        
                                <b-form-group label="[Q] Registration number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!selected98">
                                        
                                <b-form-group label="[Q] Reasons why your are not registered" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected99" name="check-button" inline="true" switch>
                                                     <b>[{{ selected99?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected99">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C26_SC_trade__regist$RG1$RSG1$QSG2$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C26_SC_trade-regist/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C26_SC_trade-regist/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC27 - SC - For service contracts: authorisation of particular organisation needed
 */
Vue.component("v4.0.0-CC27",
                        { 
                            data(){
                                return {
                                "C27_SC_authorisation/SBC1/QG1" : [],
"selected100" : false,
"C27_SC_authorisation/SBC1/QG1/QSG1" : [],
"selected101" : false,
"C27_SC_authorisation/RG1" : [],
"lotid_C27" : window.espd_model['CC27'].lots,
"C27_SC_authorisation/RG1/RSG1" : [],
"C27_SC_authorisation/RG1/RSG1/QSG1" : [],
"selected102" : false,
"C27_SC_authorisation/RG1/RSG1/QSG1/QSG1" : [],
"selected103" : false,
"C27_SC_authorisation/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C27_SC_authorisation/RG1/RSG1/QSG2" : [],
"selected104" : false,
"C27_SC_authorisation/RG1/RSG1/QSG2/QSG1" : [],
"C27_SC_authorisation/RG1/RSG1/QSG2/QSG2" : [],
"C27_SC_authorisation/RG1/RSG1/QSG2/QSG3" : [],
"selected105" : false,
"C27_SC_authorisation/RG1/RSG1/QSG2/QSG3/QSG1" : [],

                                exp:{
                                "cb_CC27": window.espd_model['CC27'].selected, 
"C27_SC_authorisation$SBC1$QG1$Q1" : false,
"C27_SC_authorisation$SBC1$QG1$QSG1$Q1" : [],
"C27_SC_authorisation$SBC1$QG1$QSG1$Q2" : false,
"C27_SC_authorisation$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC27" v-model="exp['cb_CC27']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC27" value="OK" unchecked-value="KO">
                            <strong>For service contracts: authorisation of particular organisation needed</strong>
                            <p>Is a particular authorisation of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC27'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected100" name="check-button" inline="true" switch>
                                                     <b>[{{ selected100?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected100">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
                                <b-form-group label="[Q] If yes, please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C27_SC_authorisation$SBC1$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                            <br/>[Q] Indicate whether the economic operator has it <b-form-checkbox v-model="selected101" name="check-button" inline="true" switch>
                                                     <b>[{{ selected101?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <template #footer>
                    <b-button variant="success" @click="renderHTML('C27_SC_authorisation/SBC1/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C27_SC_authorisation/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C27"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C27.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C27.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected102" name="check-button" inline="true" switch>
                                                     <b>[{{ selected102?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected102">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected103" name="check-button" inline="true" switch>
                                                     <b>[{{ selected103?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected103">
                                        
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
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected104" name="check-button" inline="true" switch>
                                                     <b>[{{ selected104?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected104">
                                        
                                <b-form-group label="[Q] Registration number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!selected104">
                                        
                                <b-form-group label="[Q] Reasons why your are not registered" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG2$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected105" name="check-button" inline="true" switch>
                                                     <b>[{{ selected105?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected105">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C27_SC_authorisation$RG1$RSG1$QSG2$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C27_SC_authorisation/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C27_SC_authorisation/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC28 - SC - For service contracts: membership of particular organisation needed
 */
Vue.component("v4.0.0-CC28",
                        { 
                            data(){
                                return {
                                "C28_SC_membership/SBC1/QG1" : [],
"selected106" : false,
"C28_SC_membership/SBC1/QG1/QSG1" : [],
"selected107" : false,
"C28_SC_membership/RG1" : [],
"lotid_C28" : window.espd_model['CC28'].lots,
"C28_SC_membership/RG1/RSG1" : [],
"C28_SC_membership/RG1/RSG1/QSG1" : [],
"selected108" : false,
"C28_SC_membership/RG1/RSG1/QSG1/QSG1" : [],
"selected109" : false,
"C28_SC_membership/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C28_SC_membership/RG1/RSG1/QSG2" : [],
"selected110" : false,
"C28_SC_membership/RG1/RSG1/QSG2/QSG1" : [],
"C28_SC_membership/RG1/RSG1/QSG2/QSG2" : [],
"C28_SC_membership/RG1/RSG1/QSG2/QSG3" : [],
"selected111" : false,
"C28_SC_membership/RG1/RSG1/QSG2/QSG3/QSG1" : [],

                                exp:{
                                "cb_CC28": window.espd_model['CC28'].selected, 
"C28_SC_membership$SBC1$QG1$Q1" : false,
"C28_SC_membership$SBC1$QG1$QSG1$Q1" : [],
"C28_SC_membership$SBC1$QG1$QSG1$Q2" : false,
"C28_SC_membership$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC28" v-model="exp['cb_CC28']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC28" value="OK" unchecked-value="KO">
                            <strong>For service contracts: membership of particular organisation needed</strong>
                            <p>Is a particular membership of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC28'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected106" name="check-button" inline="true" switch>
                                                     <b>[{{ selected106?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected106">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
                                <b-form-group label="[Q] If yes, please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C28_SC_membership$SBC1$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                            <br/>[Q] Indicate whether the economic operator has it <b-form-checkbox v-model="selected107" name="check-button" inline="true" switch>
                                                     <b>[{{ selected107?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <template #footer>
                    <b-button variant="success" @click="renderHTML('C28_SC_membership/SBC1/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div>
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C28_SC_membership/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C28"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C28.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C28.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected108" name="check-button" inline="true" switch>
                                                     <b>[{{ selected108?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected108">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected109" name="check-button" inline="true" switch>
                                                     <b>[{{ selected109?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected109">
                                        
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
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected110" name="check-button" inline="true" switch>
                                                     <b>[{{ selected110?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected110">
                                        
                                <b-form-group label="[Q] Registration number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C28_SC_membership$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        <div v-if="!selected110">
                                        
                                <b-form-group label="[Q] Reasons why your are not registered" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C28_SC_membership$RG1$RSG1$QSG2$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected111" name="check-button" inline="true" switch>
                                                     <b>[{{ selected111?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected111">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C28_SC_membership$RG1$RSG1$QSG2$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C28_SC_membership/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C28_SC_membership/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC29 - SC - General yearly turnover
 */
Vue.component("v4.0.0-CC29",
                        { 
                            data(){
                                return {
                                "C29_SC_gen-year-to/SBC1/QG1" : [],
"selected112" : false,
"C29_SC_gen-year-to/RG1" : [],
"lotid_C29" : window.espd_model['CC29'].lots,
"C29_SC_gen-year-to/RG1/RSG1" : [],
"C29_SC_gen-year-to/RG1/RSG1/QSG1" : [],
"selected113" : false,
"C29_SC_gen-year-to/RG1/RSG1/QSG1/QSG1" : [],
"selected114" : false,
"C29_SC_gen-year-to/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C29_SC_gen-year-to/RG1/RSG1/QSG2" : [],
"C29_SC_gen-year-to/RG1/RSG1/QSG2/QSG1" : [],
"selected115" : false,
"C29_SC_gen-year-to/RG1/RSG1/QSG2/QSG1/QSG1" : [],
"C29_SC_gen-year-to/RG1/RSG1/QSG3" : [],
"C29_SC_gen-year-to/RG1/RSG1/QSG3/QSG1" : [],
"selected116" : false,
"C29_SC_gen-year-to/RG1/RSG1/QSG3/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC29": window.espd_model['CC29'].selected, 
"C29_SC_gen__year__to$SBC1$QG1$Q1" : false,
"C29_SC_gen__year__to$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC29" v-model="exp['cb_CC29']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC29" value="OK" unchecked-value="KO">
                            <strong>General yearly turnover</strong>
                            <p>Its general yearly turnover for the number of financial years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC29'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected112" name="check-button" inline="true" switch>
                                                     <b>[{{ selected112?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C29_SC_gen-year-to/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C29"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C29.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C29.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
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
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected113" name="check-button" inline="true" switch>
                                                     <b>[{{ selected113?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected113">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected114" name="check-button" inline="true" switch>
                                                     <b>[{{ selected114?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected114">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
                                <b-form-group label="[Q] Start date; End date" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected115" name="check-button" inline="true" switch>
                                                     <b>[{{ selected115?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected115">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C29_SC_gen-year-to/RG1/RSG1/QSG2', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                <b-form-group label="[Q] In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG3$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected116" name="check-button" inline="true" switch>
                                                     <b>[{{ selected116?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected116">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C29_SC_gen__year__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C29_SC_gen-year-to/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C29_SC_gen-year-to/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC30 - SC - Average yearly turnover
 */
Vue.component("v4.0.0-CC30",
                        { 
                            data(){
                                return {
                                "C30_SC_aver-year-to/SBC1/QG1" : [],
"selected117" : false,
"C30_SC_aver-year-to/RG1" : [],
"lotid_C30" : window.espd_model['CC30'].lots,
"C30_SC_aver-year-to/RG1/RSG1" : [],
"C30_SC_aver-year-to/RG1/RSG1/QSG1" : [],
"selected118" : false,
"C30_SC_aver-year-to/RG1/RSG1/QSG1/QSG1" : [],
"selected119" : false,
"C30_SC_aver-year-to/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C30_SC_aver-year-to/RG1/RSG1/QSG2" : [],
"C30_SC_aver-year-to/RG1/RSG1/QSG2/QSG1" : [],
"selected120" : false,
"C30_SC_aver-year-to/RG1/RSG1/QSG2/QSG1/QSG1" : [],
"C30_SC_aver-year-to/RG1/RSG1/QSG3" : [],
"C30_SC_aver-year-to/RG1/RSG1/QSG3/QSG1" : [],
"selected121" : false,
"C30_SC_aver-year-to/RG1/RSG1/QSG3/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC30": window.espd_model['CC30'].selected, 
"C30_SC_aver__year__to$SBC1$QG1$Q1" : false,
"C30_SC_aver__year__to$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC30" v-model="exp['cb_CC30']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC30" value="OK" unchecked-value="KO">
                            <strong>Average yearly turnover</strong>
                            <p>Its average yearly turnover for the number of years required in the relevant notice, the procurement documents or the ESPD is as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC30'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected117" name="check-button" inline="true" switch>
                                                     <b>[{{ selected117?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C30_SC_aver-year-to/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C30"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C30.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C30.indexOf(opt) === -1)">
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
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected118" name="check-button" inline="true" switch>
                                                     <b>[{{ selected118?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected118">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected119" name="check-button" inline="true" switch>
                                                     <b>[{{ selected119?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected119">
                                        
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected120" name="check-button" inline="true" switch>
                                                     <b>[{{ selected120?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected120">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                <b-form-group label="[Q] In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG3$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected121" name="check-button" inline="true" switch>
                                                     <b>[{{ selected121?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected121">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C30_SC_aver__year__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C30_SC_aver-year-to/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC31 - SC - Specific average turnover
 */
Vue.component("v4.0.0-CC31",
                        { 
                            data(){
                                return {
                                "C31_SC_spec-aver-to/SBC1/QG1" : [],
"selected122" : false,
"C31_SC_spec-aver-to/RG1" : [],
"lotid_C31" : window.espd_model['CC31'].lots,
"C31_SC_spec-aver-to/RG1/RSG1" : [],
"C31_SC_spec-aver-to/RG1/RSG1/QSG1" : [],
"selected123" : false,
"C31_SC_spec-aver-to/RG1/RSG1/QSG1/QSG1" : [],
"selected124" : false,
"C31_SC_spec-aver-to/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C31_SC_spec-aver-to/RG1/RSG1/QSG2" : [],
"C31_SC_spec-aver-to/RG1/RSG1/QSG2/QSG1" : [],
"selected125" : false,
"C31_SC_spec-aver-to/RG1/RSG1/QSG2/QSG1/QSG1" : [],
"C31_SC_spec-aver-to/RG1/RSG1/QSG3" : [],
"C31_SC_spec-aver-to/RG1/RSG1/QSG3/QSG1" : [],
"selected126" : false,
"C31_SC_spec-aver-to/RG1/RSG1/QSG3/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC31": window.espd_model['CC31'].selected, 
"C31_SC_spec__aver__to$SBC1$QG1$Q1" : false,
"C31_SC_spec__aver__to$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC31" v-model="exp['cb_CC31']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC31" value="OK" unchecked-value="KO">
                            <strong>Specific average turnover</strong>
                            <p>Its specific average yearly turnover in the business area covered by the contract for the number of years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC31'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected122" name="check-button" inline="true" switch>
                                                     <b>[{{ selected122?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C31_SC_spec-aver-to/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C31"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C31.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C31.indexOf(opt) === -1)">
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
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected123" name="check-button" inline="true" switch>
                                                     <b>[{{ selected123?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected123">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected124" name="check-button" inline="true" switch>
                                                     <b>[{{ selected124?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected124">
                                        
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected125" name="check-button" inline="true" switch>
                                                     <b>[{{ selected125?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected125">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                <b-form-group label="[Q] In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG3$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected126" name="check-button" inline="true" switch>
                                                     <b>[{{ selected126?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected126">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C31_SC_spec__aver__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C31_SC_spec-aver-to/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC32 - SC - Specific yearly turnover
 */
Vue.component("v4.0.0-CC32",
                        { 
                            data(){
                                return {
                                "C32_SC_spec-year-to/SBC1/QG1" : [],
"selected127" : false,
"C32_SC_spec-year-to/RG1" : [],
"lotid_C32" : window.espd_model['CC32'].lots,
"C32_SC_spec-year-to/RG1/RSG1" : [],
"C32_SC_spec-year-to/RG1/RSG1/QSG1" : [],
"selected128" : false,
"C32_SC_spec-year-to/RG1/RSG1/QSG1/QSG1" : [],
"selected129" : false,
"C32_SC_spec-year-to/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C32_SC_spec-year-to/RG1/RSG1/QSG2" : [],
"C32_SC_spec-year-to/RG1/RSG1/QSG2/QSG1" : [],
"selected130" : false,
"C32_SC_spec-year-to/RG1/RSG1/QSG2/QSG1/QSG1" : [],
"C32_SC_spec-year-to/RG1/RSG1/QSG3" : [],
"C32_SC_spec-year-to/RG1/RSG1/QSG3/QSG1" : [],
"selected131" : false,
"C32_SC_spec-year-to/RG1/RSG1/QSG3/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC32": window.espd_model['CC32'].selected, 
"C32_SC_spec__year__to$SBC1$QG1$Q1" : false,
"C32_SC_spec__year__to$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC32" v-model="exp['cb_CC32']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC32" value="OK" unchecked-value="KO">
                            <strong>Specific yearly turnover</strong>
                            <p>Its specific yearly turnover in the business area covered by the contract for the number of financial years required in the relevant notice, in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC32'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected127" name="check-button" inline="true" switch>
                                                     <b>[{{ selected127?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C32_SC_spec-year-to/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C32"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C32.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C32.indexOf(opt) === -1)">
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
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected128" name="check-button" inline="true" switch>
                                                     <b>[{{ selected128?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected128">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected129" name="check-button" inline="true" switch>
                                                     <b>[{{ selected129?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected129">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
                                <b-form-group label="[Q] Start date; End date" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERIOD" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Amount" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected130" name="check-button" inline="true" switch>
                                                     <b>[{{ selected130?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected130">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C32_SC_spec-year-to/RG1/RSG1/QSG2', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                <b-form-group label="[Q] In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DATE" v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG3$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected131" name="check-button" inline="true" switch>
                                                     <b>[{{ selected131?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected131">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C32_SC_spec__year__to$RG1$RSG1$QSG3$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C32_SC_spec-year-to/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC34 - SC - Financial ratio
 */
Vue.component("v4.0.0-CC34",
                        { 
                            data(){
                                return {
                                "C34_SC_finan-rat/RG1" : [],
"lotid_C34" : window.espd_model['CC34'].lots,
"C34_SC_finan-rat/RG1/RSG1" : [],
"C34_SC_finan-rat/RG1/RSG1/RSG1" : [],
"C34_SC_finan-rat/RG1/RSG1/QSG1" : [],
"selected132" : false,
"C34_SC_finan-rat/RG1/RSG1/QSG1/QSG1" : [],
"selected133" : false,
"C34_SC_finan-rat/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C34_SC_finan-rat/RG1/RSG1/QSG2" : [],
"C34_SC_finan-rat/RG1/RSG1/QSG2/QSG1" : [],
"selected134" : false,
"C34_SC_finan-rat/RG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC34": window.espd_model['CC34'].selected, 
"C34_SC_finan__rat$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC34" v-model="exp['cb_CC34']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC34" value="OK" unchecked-value="KO">
                            <strong>Financial ratio</strong>
                            <p>Concerning the financial ratios specified in the relevant notice, the in the ESPD, the relevant notice or the ESPD, the economic operator declares that the actual values for the required ratios are as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC34'] ==='OK'">
                        <em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C34"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C34.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C34.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Select the periods applicable for all ratios"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="PERIOD"></b-form-input>
                    </b-form-group>
                    <div><b-card footer-tag="footer">
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
                        <b-button variant="success" @click="renderHTML('C34_SC_finan-rat/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div>
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected132" name="check-button" inline="true" switch>
                                                     <b>[{{ selected132?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected132">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected133" name="check-button" inline="true" switch>
                                                     <b>[{{ selected133?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected133">
                                        
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected134" name="check-button" inline="true" switch>
                                                     <b>[{{ selected134?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected134">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C34_SC_finan__rat$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C34_SC_finan-rat/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C34_SC_finan-rat/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC35 - SC - Professional risk indemnity insurance
 */
Vue.component("v4.0.0-CC35",
                        { 
                            data(){
                                return {
                                "C35_SC_indem-insu/SBC1/QG1" : [],
"selected135" : false,
"C35_SC_indem-insu/RG1" : [],
"lotid_C35" : window.espd_model['CC35'].lots,
"C35_SC_indem-insu/RG1/RSG1" : [],
"C35_SC_indem-insu/RG1/RSG1/QSG1" : [],
"selected136" : false,
"C35_SC_indem-insu/RG1/RSG1/QSG1/QSG1" : [],
"selected137" : false,
"C35_SC_indem-insu/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C35_SC_indem-insu/RG1/RSG1/QSG2" : [],
"selected138" : false,
"selected139" : false,
"C35_SC_indem-insu/RG1/RSG1/QSG2/QSG1" : [],
"selected140" : false,
"C35_SC_indem-insu/RG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC35": window.espd_model['CC35'].selected, 
"C35_SC_indem__insu$SBC1$QG1$Q1" : false,
"C35_SC_indem__insu$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC35" v-model="exp['cb_CC35']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC35" value="OK" unchecked-value="KO">
                            <strong>Professional risk indemnity insurance</strong>
                            <p>The insured amount in its professional risk indemnity insurance is the following:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC35'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected135" name="check-button" inline="true" switch>
                                                     <b>[{{ selected135?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C35_SC_indem-insu/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C35"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C35.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C35.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Type of insurance"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label-class="font-weight-bold" label="[R] Minimum amount"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected136" name="check-button" inline="true" switch>
                                                     <b>[{{ selected136?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected136">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected137" name="check-button" inline="true" switch>
                                                     <b>[{{ selected137?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected137">
                                        
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
                                            <br/>[Q] As an EO I will commit to obtain the minimum amount required <b-form-checkbox v-model="selected138" name="check-button" inline="true" switch>
                                                     <b>[{{ selected138?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                            <br/>[Q] I am exempt <b-form-checkbox v-model="selected139" name="check-button" inline="true" switch>
                                                     <b>[{{ selected139?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected140" name="check-button" inline="true" switch>
                                                     <b>[{{ selected140?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected140">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C35_SC_indem__insu$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C35_SC_indem-insu/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C35_SC_indem-insu/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC36 - SC - Other economic or financial requirements
 */
Vue.component("v4.0.0-CC36",
                        { 
                            data(){
                                return {
                                "C36_SC_finan-requ/SBC1/QG1" : [],
"selected141" : false,
"C36_SC_finan-requ/RG1" : [],
"lotid_C36" : window.espd_model['CC36'].lots,
"C36_SC_finan-requ/RG1/RSG1" : [],
"C36_SC_finan-requ/RG1/RSG1/RSG1" : [],
"opt_C36_SC_finan__req" : [{"text":"Economic or Financial","value":0},{"text":"Rating","value":1},{"text":"Descriptive","value":2}],
"val_C36_SC_finan__req" : 0,
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG1" : [],
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG1/QSG1" : [],
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG1/QSG1/QSG1" : [],
"selected143" : false,
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG1/QSG1/QSG1/QSG1" : [],
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG2" : [],
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG2/QSG1" : [],
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG2/QSG1/QSG1" : [],
"selected144" : false,
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG2/QSG1/QSG1/QSG1" : [],
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG3" : [],
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG3/QSG1" : [],
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG3/QSG1/QSG1" : [],
"selected145" : false,
"C36_SC_finan-requ/RG1/RSG1/RSG1/RSG3/QSG1/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC36": window.espd_model['CC36'].selected, 
"C36_SC_finan__requ$SBC1$QG1$Q1" : false,
"C36_SC_finan__requ$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC36" v-model="exp['cb_CC36']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC36" value="OK" unchecked-value="KO">
                            <strong>Other economic or financial requirements</strong>
                            <p>Concerning the other economic or financial requirements, if any, that may have been specified in the relevant notice or in the ESPD, the economic operator declares that:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC36'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected141" name="check-button" inline="true" switch>
                                                     <b>[{{ selected141?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C36_SC_finan-requ/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C36"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C36.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C36.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer"><em>undefined</em><div><b-form-group label-class="font-weight-bold"  label="[R] Select the type of requirement (Economic or Financial; Rating; Descriptive)" v-slot="{ ariaDescribedby }">
                                    <b-form-radio-group
                                        id="radio-group-142"
                                        v-model="val_C36_SC_finan__req"
                                        :options="opt_C36_SC_finan__req"
                                        :aria-describedby="ariaDescribedby"
                                        name="radio-options"
                                    ></b-form-radio-group>
                                    </b-form-group>
                                    <template v-if="val_C36_SC_finan__req===0"><div><b-card footer-tag="footer">
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected143" name="check-button" inline="true" switch>
                                                     <b>[{{ selected143?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected143">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C36_SC_finan-requ/RG1/RSG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></template><template v-if="val_C36_SC_finan__req===1"><div>
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected144" name="check-button" inline="true" switch>
                                                     <b>[{{ selected144?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected144">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG2$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div></template><template v-if="val_C36_SC_finan__req===2"><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Descriptive requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                <b-form-group label="[Q] [Description]" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected145" name="check-button" inline="true" switch>
                                                     <b>[{{ selected145?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected145">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C36_SC_finan__requ$RG1$RSG1$RSG1$RSG3$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div></div></template></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C36_SC_finan-requ/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C36_SC_finan-requ/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC37 - SC - For works contracts: performance of works of the specified type
 */
Vue.component("v4.0.0-CC37",
                        { 
                            data(){
                                return {
                                "C37_SC_work-perform/SBC1/QG1" : [],
"selected146" : false,
"C37_SC_work-perform/RG1" : [],
"lotid_C37" : window.espd_model['CC37'].lots,
"C37_SC_work-perform/RG1/RSG1" : [],
"C37_SC_work-perform/RG1/RSG1/RSG1" : [],
"C37_SC_work-perform/RG1/RSG1/RSG1/RSG1" : [],
"C37_SC_work-perform/RG1/RSG1/QSG1" : [],
"C37_SC_work-perform/RG1/RSG1/QSG1/QSG1" : [],
"selected147" : false,
"C37_SC_work-perform/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C37_SC_work-perform/RG1/RSG1/QSG1/QSG1/QSG2" : [],
"selected148" : false,
"C37_SC_work-perform/RG1/RSG1/QSG1/QSG1/QSG2/QSG1" : [],

                                exp:{
                                "cb_CC37": window.espd_model['CC37'].selected, 
"C37_SC_work__perform$SBC1$QG1$Q1" : false,
"C37_SC_work__perform$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC37" v-model="exp['cb_CC37']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC37" value="OK" unchecked-value="KO">
                            <strong>For works contracts: performance of works of the specified type</strong>
                            <p>For public works contracts only: During the reference period, the economic operator has performed the following works of the specified type. Contracting authorities may require up to five years and allow experience dating from more than five years.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC37'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected146" name="check-button" inline="true" switch>
                                                     <b>[{{ selected146?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C37_SC_work-perform/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C37"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C37.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C37.indexOf(opt) === -1)">
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
                    <div><em>undefined</em><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer"><em>CAPTION</em><div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Confidential <b-form-checkbox v-model="selected147" name="check-button" inline="true" switch>
                                                     <b>[{{ selected147?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                    <b-button variant="success" @click="renderHTML('C37_SC_work-perform/RG1/RSG1/QSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected148" name="check-button" inline="true" switch>
                                                     <b>[{{ selected148?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected148">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C37_SC_work__perform$RG1$RSG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C37_SC_work-perform/RG1/RSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C37_SC_work-perform/RG1/RSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C37_SC_work-perform/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC38 - SC - For supply contracts: performance of deliveries of the specified type
 */
Vue.component("v4.0.0-CC38",
                        { 
                            data(){
                                return {
                                "C38_SC_supply-perform/SBC1/QG1" : [],
"selected149" : false,
"C38_SC_supply-perform/RG1" : [],
"lotid_C38" : window.espd_model['CC38'].lots,
"C38_SC_supply-perform/RG1/RSG1" : [],
"C38_SC_supply-perform/RG1/RSG1/RSG1" : [],
"C38_SC_supply-perform/RG1/RSG1/RSG1/RSG1" : [],
"C38_SC_supply-perform/RG1/RSG1/QSG1" : [],
"C38_SC_supply-perform/RG1/RSG1/QSG1/QSG1" : [],
"selected150" : false,
"C38_SC_supply-perform/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C38_SC_supply-perform/RG1/RSG1/QSG1/QSG1/QSG2" : [],
"selected151" : false,
"C38_SC_supply-perform/RG1/RSG1/QSG1/QSG1/QSG2/QSG1" : [],

                                exp:{
                                "cb_CC38": window.espd_model['CC38'].selected, 
"C38_SC_supply__perform$SBC1$QG1$Q1" : false,
"C38_SC_supply__perform$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC38" v-model="exp['cb_CC38']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC38" value="OK" unchecked-value="KO">
                            <strong>For supply contracts: performance of deliveries of the specified type</strong>
                            <p>For public supply contracts only: During the reference period, the economic operator has delivered the following principal deliveries of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC38'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected149" name="check-button" inline="true" switch>
                                                     <b>[{{ selected149?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C38_SC_supply-perform/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C38"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C38.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C38.indexOf(opt) === -1)">
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
                    <div><em>undefined</em><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer"><em>CAPTION</em><div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Confidential <b-form-checkbox v-model="selected150" name="check-button" inline="true" switch>
                                                     <b>[{{ selected150?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                    <b-button variant="success" @click="renderHTML('C38_SC_supply-perform/RG1/RSG1/QSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected151" name="check-button" inline="true" switch>
                                                     <b>[{{ selected151?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected151">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C38_SC_supply__perform$RG1$RSG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C38_SC_supply-perform/RG1/RSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C38_SC_supply-perform/RG1/RSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C38_SC_supply-perform/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC39 - SC - For service contracts: performance of services of the specified type
 */
Vue.component("v4.0.0-CC39",
                        { 
                            data(){
                                return {
                                "C39_SC_service-perform/SBC1/QG1" : [],
"selected152" : false,
"C39_SC_service-perform/RG1" : [],
"lotid_C39" : window.espd_model['CC39'].lots,
"C39_SC_service-perform/RG1/RSG1" : [],
"C39_SC_service-perform/RG1/RSG1/RSG1" : [],
"C39_SC_service-perform/RG1/RSG1/RSG1/RSG1" : [],
"C39_SC_service-perform/RG1/RSG1/QSG1" : [],
"C39_SC_service-perform/RG1/RSG1/QSG1/QSG1" : [],
"selected153" : false,
"C39_SC_service-perform/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C39_SC_service-perform/RG1/RSG1/QSG1/QSG1/QSG2" : [],
"selected154" : false,
"C39_SC_service-perform/RG1/RSG1/QSG1/QSG1/QSG2/QSG1" : [],

                                exp:{
                                "cb_CC39": window.espd_model['CC39'].selected, 
"C39_SC_service__perform$SBC1$QG1$Q1" : false,
"C39_SC_service__perform$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC39" v-model="exp['cb_CC39']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC39" value="OK" unchecked-value="KO">
                            <strong>For service contracts: performance of services of the specified type</strong>
                            <p>For public service contracts only: During the reference period, the economic operator has provided the following main services of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC39'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected152" name="check-button" inline="true" switch>
                                                     <b>[{{ selected152?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C39_SC_service-perform/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C39"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C39.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C39.indexOf(opt) === -1)">
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
                    <div><em>undefined</em><div>
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer"><em>CAPTION</em><div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Confidential <b-form-checkbox v-model="selected153" name="check-button" inline="true" switch>
                                                     <b>[{{ selected153?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                    <b-button variant="success" @click="renderHTML('C39_SC_service-perform/RG1/RSG1/QSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected154" name="check-button" inline="true" switch>
                                                     <b>[{{ selected154?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected154">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C39_SC_service__perform$RG1$RSG1$QSG1$QSG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C39_SC_service-perform/RG1/RSG1/QSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C39_SC_service-perform/RG1/RSG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C39_SC_service-perform/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC40 - SC - Technicians or technical bodies for quality control
 */
Vue.component("v4.0.0-CC40",
                        { 
                            data(){
                                return {
                                "C40_SC_qual-cont-tech/SBC1/QG1" : [],
"selected155" : false,
"C40_SC_qual-cont-tech/RG1" : [],
"lotid_C40" : window.espd_model['CC40'].lots,
"C40_SC_qual-cont-tech/RG1/RSG1" : [],
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1" : [],
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG1" : [],
"selected156" : false,
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG1/QSG1" : [],
"selected157" : false,
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG1/QSG1/QSG1" : [],
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG2" : [],
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG2/QSG1" : [],
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG2/QSG1/QSG1" : [],
"selected158" : false,
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG2/QSG1/QSG1/QSG1" : [],
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG3" : [],
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG3/QSG1" : [],
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG3/QSG1/QSG1" : [],
"selected159" : false,
"C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG3/QSG1/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC40": window.espd_model['CC40'].selected, 
"C40_SC_qual__cont__tech$SBC1$QG1$Q1" : false,
"C40_SC_qual__cont__tech$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC40" v-model="exp['cb_CC40']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC40" value="OK" unchecked-value="KO">
                            <strong>Technicians or technical bodies for quality control</strong>
                            <p>It can call upon the following technicians or technical bodies, especially those responsible for quality control. For technicians or technical bodies not belonging directly to the economic operator's undertaking but on whose capacities the economic operator relies as set out under Part II, Section C, separate ESPD forms must be filled in.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC40'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected155" name="check-button" inline="true" switch>
                                                     <b>[{{ selected155?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C40_SC_qual-cont-tech/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C40"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C40.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C40.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><em>[Additional information; e.g. no evidences online]</em><div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected156" name="check-button" inline="true" switch>
                                                     <b>[{{ selected156?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected156">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected157" name="check-button" inline="true" switch>
                                                     <b>[{{ selected157?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected157">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><em>CAPTION</em><div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected158" name="check-button" inline="true" switch>
                                                     <b>[{{ selected158?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected158">
                                        <b-form-group label="[Q] Evidence supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG2/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><em>CAPTION</em><div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected159" name="check-button" inline="true" switch>
                                                     <b>[{{ selected159?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected159">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C40_SC_qual__cont__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C40_SC_qual-cont-tech/RG1/RSG1/RSG1/QSG3/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C40_SC_qual-cont-tech/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C40_SC_qual-cont-tech/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC41 - SC - In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:
 */
Vue.component("v4.0.0-CC41",
                        { 
                            data(){
                                return {
                                "C41_SC_work-tech/SBC1/QG1" : [],
"selected160" : false,
"C41_SC_work-tech/RG1" : [],
"lotid_C41" : window.espd_model['CC41'].lots,
"C41_SC_work-tech/RG1/RSG1" : [],
"C41_SC_work-tech/RG1/RSG1/RSG1" : [],
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG1" : [],
"selected161" : false,
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG1/QSG1" : [],
"selected162" : false,
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG1/QSG1/QSG1" : [],
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG2" : [],
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG2/QSG1" : [],
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG2/QSG1/QSG1" : [],
"selected163" : false,
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG2/QSG1/QSG1/QSG1" : [],
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG3" : [],
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG3/QSG1" : [],
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG3/QSG1/QSG1" : [],
"selected164" : false,
"C41_SC_work-tech/RG1/RSG1/RSG1/QSG3/QSG1/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC41": window.espd_model['CC41'].selected, 
"C41_SC_work__tech$SBC1$QG1$Q1" : false,
"C41_SC_work__tech$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC41" v-model="exp['cb_CC41']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC41" value="OK" unchecked-value="KO">
                            <strong>In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:</strong>
                            <p>In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC41'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected160" name="check-button" inline="true" switch>
                                                     <b>[{{ selected160?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C41_SC_work-tech/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C41"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C41.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C41.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><em>[Additional information; e.g. no evidences online]</em><div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected161" name="check-button" inline="true" switch>
                                                     <b>[{{ selected161?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected161">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected162" name="check-button" inline="true" switch>
                                                     <b>[{{ selected162?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected162">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><em>CAPTION</em><div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected163" name="check-button" inline="true" switch>
                                                     <b>[{{ selected163?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected163">
                                        <b-form-group label="[Q] Evidence supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C41_SC_work-tech/RG1/RSG1/RSG1/QSG2/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><em>CAPTION</em><div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected164" name="check-button" inline="true" switch>
                                                     <b>[{{ selected164?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected164">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C41_SC_work__tech$RG1$RSG1$RSG1$QSG3$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C41_SC_work-tech/RG1/RSG1/RSG1/QSG3/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C41_SC_work-tech/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C41_SC_work-tech/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC42 - SC - Technical facilities and measures for ensuring quality
 */
Vue.component("v4.0.0-CC42",
                        { 
                            data(){
                                return {
                                "C42_SC_qual-facil/SBC1/QG1" : [],
"selected165" : false,
"C42_SC_qual-facil/RG1" : [],
"lotid_C42" : window.espd_model['CC42'].lots,
"C42_SC_qual-facil/RG1/RSG1" : [],
"C42_SC_qual-facil/RG1/RSG1/RSG1" : [],
"C42_SC_qual-facil/RG1/RSG1/RSG1/QSG1" : [],
"selected166" : false,
"C42_SC_qual-facil/RG1/RSG1/RSG1/QSG1/QSG1" : [],
"selected167" : false,
"C42_SC_qual-facil/RG1/RSG1/RSG1/QSG1/QSG1/QSG1" : [],
"C42_SC_qual-facil/RG1/RSG1/RSG1/QSG2" : [],
"C42_SC_qual-facil/RG1/RSG1/RSG1/QSG2/QSG1" : [],
"selected168" : false,
"C42_SC_qual-facil/RG1/RSG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC42": window.espd_model['CC42'].selected, 
"C42_SC_qual__facil$SBC1$QG1$Q1" : false,
"C42_SC_qual__facil$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC42" v-model="exp['cb_CC42']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC42" value="OK" unchecked-value="KO">
                            <strong>Technical facilities and measures for ensuring quality</strong>
                            <p>It uses the following technical facilities and measures for ensuring quality and its study and research facilities are as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC42'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected165" name="check-button" inline="true" switch>
                                                     <b>[{{ selected165?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C42_SC_qual-facil/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C42"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C42.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C42.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><em>[Additional information; e.g. no evidences online]</em><div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected166" name="check-button" inline="true" switch>
                                                     <b>[{{ selected166?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected166">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected167" name="check-button" inline="true" switch>
                                                     <b>[{{ selected167?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected167">
                                        
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected168" name="check-button" inline="true" switch>
                                                     <b>[{{ selected168?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected168">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C42_SC_qual__facil$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C42_SC_qual-facil/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C42_SC_qual-facil/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC43 - SC - Study and research facilities
 */
Vue.component("v4.0.0-CC43",
                        { 
                            data(){
                                return {
                                "C43_SC_research-fac/SBC1/QG1" : [],
"selected169" : false,
"C43_SC_research-fac/RG1" : [],
"lotid_C43" : window.espd_model['CC43'].lots,
"C43_SC_research-fac/RG1/RSG1" : [],
"C43_SC_research-fac/RG1/RSG1/RSG1" : [],
"C43_SC_research-fac/RG1/RSG1/RSG1/QSG1" : [],
"selected170" : false,
"C43_SC_research-fac/RG1/RSG1/RSG1/QSG1/QSG1" : [],
"selected171" : false,
"C43_SC_research-fac/RG1/RSG1/RSG1/QSG1/QSG1/QSG1" : [],
"C43_SC_research-fac/RG1/RSG1/RSG1/QSG2" : [],
"C43_SC_research-fac/RG1/RSG1/RSG1/QSG2/QSG1" : [],
"selected172" : false,
"C43_SC_research-fac/RG1/RSG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC43": window.espd_model['CC43'].selected, 
"C43_SC_research__fac$SBC1$QG1$Q1" : false,
"C43_SC_research__fac$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC43" v-model="exp['cb_CC43']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC43" value="OK" unchecked-value="KO">
                            <strong>Study and research facilities</strong>
                            <p>It uses the following study and research facilities are as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC43'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected169" name="check-button" inline="true" switch>
                                                     <b>[{{ selected169?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C43_SC_research-fac/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C43"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C43.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C43.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><em>[Additional information; e.g. no evidences online]</em><div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected170" name="check-button" inline="true" switch>
                                                     <b>[{{ selected170?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected170">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected171" name="check-button" inline="true" switch>
                                                     <b>[{{ selected171?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected171">
                                        
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected172" name="check-button" inline="true" switch>
                                                     <b>[{{ selected172?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected172">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C43_SC_research__fac$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C43_SC_research-fac/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C43_SC_research-fac/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC44 - SC - Supply chain management
 */
Vue.component("v4.0.0-CC44",
                        { 
                            data(){
                                return {
                                "C44_SC_chain-manage/SBC1/QG1" : [],
"selected173" : false,
"C44_SC_chain-manage/RG1" : [],
"lotid_C44" : window.espd_model['CC44'].lots,
"C44_SC_chain-manage/RG1/RSG1" : [],
"C44_SC_chain-manage/RG1/RSG1/RSG1" : [],
"C44_SC_chain-manage/RG1/RSG1/RSG1/QSG1" : [],
"selected174" : false,
"C44_SC_chain-manage/RG1/RSG1/RSG1/QSG1/QSG1" : [],
"selected175" : false,
"C44_SC_chain-manage/RG1/RSG1/RSG1/QSG1/QSG1/QSG1" : [],
"C44_SC_chain-manage/RG1/RSG1/RSG1/QSG2" : [],
"C44_SC_chain-manage/RG1/RSG1/RSG1/QSG2/QSG1" : [],
"selected176" : false,
"C44_SC_chain-manage/RG1/RSG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC44": window.espd_model['CC44'].selected, 
"C44_SC_chain__manage$SBC1$QG1$Q1" : false,
"C44_SC_chain__manage$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC44" v-model="exp['cb_CC44']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC44" value="OK" unchecked-value="KO">
                            <strong>Supply chain management</strong>
                            <p>It will be able to apply the following supply chain management and tracking systems when performing the contract:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC44'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected173" name="check-button" inline="true" switch>
                                                     <b>[{{ selected173?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C44_SC_chain-manage/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C44"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C44.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C44.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><em>[Additional information; e.g. no evidences online]</em><div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected174" name="check-button" inline="true" switch>
                                                     <b>[{{ selected174?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected174">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected175" name="check-button" inline="true" switch>
                                                     <b>[{{ selected175?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected175">
                                        
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected176" name="check-button" inline="true" switch>
                                                     <b>[{{ selected176?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected176">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C44_SC_chain__manage$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C44_SC_chain-manage/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C44_SC_chain-manage/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC45 - SC - Environmental management measures
 */
Vue.component("v4.0.0-CC45",
                        { 
                            data(){
                                return {
                                "C45_SC_envir-measure/SBC1/QG1" : [],
"selected177" : false,
"C45_SC_envir-measure/RG1" : [],
"lotid_C45" : window.espd_model['CC45'].lots,
"C45_SC_envir-measure/RG1/RSG1" : [],
"C45_SC_envir-measure/RG1/RSG1/RSG1" : [],
"C45_SC_envir-measure/RG1/RSG1/RSG1/QSG1" : [],
"selected178" : false,
"C45_SC_envir-measure/RG1/RSG1/RSG1/QSG1/QSG1" : [],
"selected179" : false,
"C45_SC_envir-measure/RG1/RSG1/RSG1/QSG1/QSG1/QSG1" : [],
"C45_SC_envir-measure/RG1/RSG1/RSG1/QSG2" : [],
"C45_SC_envir-measure/RG1/RSG1/RSG1/QSG2/QSG1" : [],
"selected180" : false,
"C45_SC_envir-measure/RG1/RSG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC45": window.espd_model['CC45'].selected, 
"C45_SC_envir__measure$SBC1$QG1$Q1" : false,
"C45_SC_envir__measure$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC45" v-model="exp['cb_CC45']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC45" value="OK" unchecked-value="KO">
                            <strong>Environmental management measures</strong>
                            <p>The economic operator will be able to apply the following environmental management measures when performing the contract:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC45'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected177" name="check-button" inline="true" switch>
                                                     <b>[{{ selected177?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C45_SC_envir-measure/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C45"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C45.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C45.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><em>[Additional information; e.g. no evidences online]</em><div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected178" name="check-button" inline="true" switch>
                                                     <b>[{{ selected178?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected178">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected179" name="check-button" inline="true" switch>
                                                     <b>[{{ selected179?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected179">
                                        
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected180" name="check-button" inline="true" switch>
                                                     <b>[{{ selected180?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected180">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C45_SC_envir__measure$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C45_SC_envir-measure/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C45_SC_envir-measure/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC46 - SC - Tools, plant or technical equipment
 */
Vue.component("v4.0.0-CC46",
                        { 
                            data(){
                                return {
                                "C46_SC_tech-equip/SBC1/QG1" : [],
"selected181" : false,
"C46_SC_tech-equip/RG1" : [],
"lotid_C46" : window.espd_model['CC46'].lots,
"C46_SC_tech-equip/RG1/RSG1" : [],
"C46_SC_tech-equip/RG1/RSG1/RSG1" : [],
"C46_SC_tech-equip/RG1/RSG1/RSG1/QSG1" : [],
"selected182" : false,
"C46_SC_tech-equip/RG1/RSG1/RSG1/QSG1/QSG1" : [],
"selected183" : false,
"C46_SC_tech-equip/RG1/RSG1/RSG1/QSG1/QSG1/QSG1" : [],
"C46_SC_tech-equip/RG1/RSG1/RSG1/QSG2" : [],
"C46_SC_tech-equip/RG1/RSG1/RSG1/QSG2/QSG1" : [],
"selected184" : false,
"C46_SC_tech-equip/RG1/RSG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC46": window.espd_model['CC46'].selected, 
"C46_SC_tech__equip$SBC1$QG1$Q1" : false,
"C46_SC_tech__equip$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC46" v-model="exp['cb_CC46']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC46" value="OK" unchecked-value="KO">
                            <strong>Tools, plant or technical equipment</strong>
                            <p>The following tools, plant or technical equipment will be available to it for performing the contract:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC46'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected181" name="check-button" inline="true" switch>
                                                     <b>[{{ selected181?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C46_SC_tech-equip/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C46"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C46.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C46.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><em>[Additional information; e.g. no evidences online]</em><div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected182" name="check-button" inline="true" switch>
                                                     <b>[{{ selected182?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected182">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected183" name="check-button" inline="true" switch>
                                                     <b>[{{ selected183?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected183">
                                        
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected184" name="check-button" inline="true" switch>
                                                     <b>[{{ selected184?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected184">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C46_SC_tech__equip$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C46_SC_tech-equip/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C46_SC_tech-equip/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC47 - SC - Educational and professional qualifications
 */
Vue.component("v4.0.0-CC47",
                        { 
                            data(){
                                return {
                                "C47_SC_qualification/SBC1/QG1" : [],
"selected185" : false,
"C47_SC_qualification/RG1" : [],
"lotid_C47" : window.espd_model['CC47'].lots,
"C47_SC_qualification/RG1/RSG1" : [],
"C47_SC_qualification/RG1/RSG1/RSG1" : [],
"C47_SC_qualification/RG1/RSG1/RSG1/QSG1" : [],
"selected186" : false,
"C47_SC_qualification/RG1/RSG1/RSG1/QSG1/QSG1" : [],
"selected187" : false,
"C47_SC_qualification/RG1/RSG1/RSG1/QSG1/QSG1/QSG1" : [],
"C47_SC_qualification/RG1/RSG1/RSG1/QSG2" : [],
"C47_SC_qualification/RG1/RSG1/RSG1/QSG2/QSG1" : [],
"C47_SC_qualification/RG1/RSG1/RSG1/QSG2/QSG1/QSG1" : [],
"selected188" : false,
"C47_SC_qualification/RG1/RSG1/RSG1/QSG2/QSG1/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC47": window.espd_model['CC47'].selected, 
"C47_SC_qualification$SBC1$QG1$Q1" : false,
"C47_SC_qualification$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC47" v-model="exp['cb_CC47']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC47" value="OK" unchecked-value="KO">
                            <strong>Educational and professional qualifications</strong>
                            <p>The following educational and professional qualifications are held by the service provider or the contractor itself, and/or (depending on the requirements set out in the relevant notice or the in the ESPD, the relevant notice or by its managerial staff.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC47'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected185" name="check-button" inline="true" switch>
                                                     <b>[{{ selected185?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C47_SC_qualification/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C47"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C47.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C47.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><em>[Additional information; e.g. no evidences online]</em><div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected186" name="check-button" inline="true" switch>
                                                     <b>[{{ selected186?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected186">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected187" name="check-button" inline="true" switch>
                                                     <b>[{{ selected187?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected187">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><em>CAPTION</em><div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
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
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected188" name="check-button" inline="true" switch>
                                                     <b>[{{ selected188?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected188">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C47_SC_qualification$RG1$RSG1$RSG1$QSG2$QSG1$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C47_SC_qualification/RG1/RSG1/RSG1/QSG2/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C47_SC_qualification/RG1/RSG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C47_SC_qualification/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC48 - SC - Special requierements check
 */
Vue.component("v4.0.0-CC48",
                        { 
                            data(){
                                return {
                                "C48_SC_spec-req-check/SBC1/QG1" : [],
"selected189" : false,
"C48_SC_spec-req-check/RG1" : [],
"lotid_C48" : window.espd_model['CC48'].lots,
"C48_SC_spec-req-check/RG1/RSG1" : [],
"C48_SC_spec-req-check/RG1/RSG1/QSG1" : [],
"selected190" : false,
"C48_SC_spec-req-check/RG1/RSG1/QSG1/QSG1" : [],
"selected191" : false,
"C48_SC_spec-req-check/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C48_SC_spec-req-check/RG1/RSG1/QSG2" : [],
"selected192" : false,
"C48_SC_spec-req-check/RG1/RSG1/QSG2/QSG1" : [],
"selected193" : false,
"C48_SC_spec-req-check/RG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC48": window.espd_model['CC48'].selected, 
"C48_SC_spec__req__check$SBC1$QG1$Q1" : false,
"C48_SC_spec__req__check$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC48" v-model="exp['cb_CC48']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC48" value="OK" unchecked-value="KO">
                            <strong>Special requierements check</strong>
                            <p>For complex products or services to be supplied or, exceptionally, for products or services which are required for a special purpose: The economic operator will allow checks to be conducted on the production capacities or the technical capacity of the economic operator and, where necessary, on the means of study and research which are available to it and on the quality control measures? The check is to be performed by the contracting authority or, in case the latter consents to this, on its behalf by a competent official body of the country in which the supplier or service provider is established.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC48'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected189" name="check-button" inline="true" switch>
                                                     <b>[{{ selected189?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C48_SC_spec-req-check/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C48"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C48.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C48.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected190" name="check-button" inline="true" switch>
                                                     <b>[{{ selected190?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected190">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected191" name="check-button" inline="true" switch>
                                                     <b>[{{ selected191?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected191">
                                        
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
                                            <br/>[Q] Do you allow checks? <b-form-checkbox v-model="selected192" name="check-button" inline="true" switch>
                                                     <b>[{{ selected192?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected193" name="check-button" inline="true" switch>
                                                     <b>[{{ selected193?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected193">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C48_SC_spec__req__check$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C48_SC_spec-req-check/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C48_SC_spec-req-check/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC49 - SC - Number of managerial staff
 */
Vue.component("v4.0.0-CC49",
                        { 
                            data(){
                                return {
                                "C49_SC_manage-staff/SBC1/QG1" : [],
"selected194" : false,
"C49_SC_manage-staff/RG1" : [],
"lotid_C49" : window.espd_model['CC49'].lots,
"C49_SC_manage-staff/RG1/RSG1" : [],
"C49_SC_manage-staff/RG1/RSG1/QSG1" : [],
"selected195" : false,
"C49_SC_manage-staff/RG1/RSG1/QSG1/QSG1" : [],
"selected196" : false,
"C49_SC_manage-staff/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C49_SC_manage-staff/RG1/RSG1/QSG2" : [],
"C49_SC_manage-staff/RG1/RSG1/QSG2/QSG1" : [],
"selected197" : false,
"C49_SC_manage-staff/RG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC49": window.espd_model['CC49'].selected, 
"C49_SC_manage__staff$SBC1$QG1$Q1" : false,
"C49_SC_manage__staff$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC49" v-model="exp['cb_CC49']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC49" value="OK" unchecked-value="KO">
                            <strong>Number of managerial staff</strong>
                            <p>The economic operator’s number of managerial staff for the last three years were as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC49'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected194" name="check-button" inline="true" switch>
                                                     <b>[{{ selected194?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C49_SC_manage-staff/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C49"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C49.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C49.indexOf(opt) === -1)">
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
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected195" name="check-button" inline="true" switch>
                                                     <b>[{{ selected195?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected195">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected196" name="check-button" inline="true" switch>
                                                     <b>[{{ selected196?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected196">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
                                <b-form-group label="[Q] Year" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_YEAR" v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_INTEGER" v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected197" name="check-button" inline="true" switch>
                                                     <b>[{{ selected197?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected197">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C49_SC_manage__staff$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C49_SC_manage-staff/RG1/RSG1/QSG2', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C49_SC_manage-staff/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC50 - SC - Average annual manpower
 */
Vue.component("v4.0.0-CC50",
                        { 
                            data(){
                                return {
                                "C50_SC_year-manpower/SBC1/QG1" : [],
"selected198" : false,
"C50_SC_year-manpower/RG1" : [],
"lotid_C50" : window.espd_model['CC50'].lots,
"C50_SC_year-manpower/RG1/RSG1" : [],
"C50_SC_year-manpower/RG1/RSG1/QSG1" : [],
"selected199" : false,
"C50_SC_year-manpower/RG1/RSG1/QSG1/QSG1" : [],
"selected200" : false,
"C50_SC_year-manpower/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C50_SC_year-manpower/RG1/RSG1/QSG2" : [],
"C50_SC_year-manpower/RG1/RSG1/QSG2/QSG1" : [],
"selected201" : false,
"C50_SC_year-manpower/RG1/RSG1/QSG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC50": window.espd_model['CC50'].selected, 
"C50_SC_year__manpower$SBC1$QG1$Q1" : false,
"C50_SC_year__manpower$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC50" v-model="exp['cb_CC50']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC50" value="OK" unchecked-value="KO">
                            <strong>Average annual manpower</strong>
                            <p>The economic operator’s average annual manpower for the last three years were as follows:</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC50'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected198" name="check-button" inline="true" switch>
                                                     <b>[{{ selected198?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C50_SC_year-manpower/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C50"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C50.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C50.indexOf(opt) === -1)">
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
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected199" name="check-button" inline="true" switch>
                                                     <b>[{{ selected199?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected199">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected200" name="check-button" inline="true" switch>
                                                     <b>[{{ selected200?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected200">
                                        
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG1$QSG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div>
                                        </div><b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
                                <b-form-group label="[Q] Year" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_YEAR" v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG2$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Number" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_INTEGER" v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG2$Q2'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected201" name="check-button" inline="true" switch>
                                                     <b>[{{ selected201?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected201">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C50_SC_year__manpower$RG1$RSG1$QSG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C50_SC_year-manpower/RG1/RSG1/QSG2', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C50_SC_year-manpower/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC51 - SC - Subcontracting proportion
 */
Vue.component("v4.0.0-CC51",
                        { 
                            data(){
                                return {
                                "C51_SC_suncont-port/SBC1/QG1" : [],
"selected202" : false,
"C51_SC_suncont-port/QG1" : [],
"selected203" : false,
"C51_SC_suncont-port/QG1/QSG1" : [],
"selected204" : false,
"C51_SC_suncont-port/QG1/QSG1/QSG1" : [],
"C51_SC_suncont-port/QG2" : [],
"C51_SC_suncont-port/QG2/QSG1" : [],
"selected205" : false,
"C51_SC_suncont-port/QG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC51": window.espd_model['CC51'].selected, 
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
                        <b-form-checkbox id="checkbox-CC51" v-model="exp['cb_CC51']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC51" value="OK" unchecked-value="KO">
                            <strong>Subcontracting proportion</strong>
                            <p>The economic operator intends possibly to subcontract the following proportion (i.e. percentage) of the contract. Please note that if the economic operator has decided to subcontract a part of the contract and relies on the subcontractor’s capacities to perform that part, then please fill in a separate ESPD for such subcontractors, see Part II, Section C above.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC51'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected202" name="check-button" inline="true" switch>
                                                     <b>[{{ selected202?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C51_SC_suncont-port/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected203" name="check-button" inline="true" switch>
                                                     <b>[{{ selected203?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected203">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected204" name="check-button" inline="true" switch>
                                                     <b>[{{ selected204?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected204">
                                        
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
                        <div v-if="window.espd_doc.role==='eo'">
                                <b-form-group label="[Q] Please specify" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C51_SC_suncont__port$QG2$Q1'][0]"></b-form-input>
                                </b-form-group><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected205" name="check-button" inline="true" switch>
                                                     <b>[{{ selected205?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected205">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C51_SC_suncont__port$QG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div></template>
                    </div>`
                        })

/**
 * Component - CC52 - SC - For supply contracts: samples, descriptions or photographs without certification of authenticity
 */
Vue.component("v4.0.0-CC52",
                        { 
                            data(){
                                return {
                                "C52_SC_wo-autent/SBC1/QG1" : [],
"selected206" : false,
"C52_SC_wo-autent/QG1" : [],
"selected207" : false,
"C52_SC_wo-autent/QG1/QSG1" : [],
"selected208" : false,
"C52_SC_wo-autent/QG1/QSG1/QSG1" : [],
"C52_SC_wo-autent/QG2" : [],
"selected209" : false,
"C52_SC_wo-autent/QG2/QSG1" : [],
"selected210" : false,
"C52_SC_wo-autent/QG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC52": window.espd_model['CC52'].selected, 
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
                        <b-form-checkbox id="checkbox-CC52" v-model="exp['cb_CC52']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC52" value="OK" unchecked-value="KO">
                            <strong>For supply contracts: samples, descriptions or photographs without certification of authenticity</strong>
                            <p>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied, which do not need to be accompanied by certifications of authenticity.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC52'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected206" name="check-button" inline="true" switch>
                                                     <b>[{{ selected206?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C52_SC_wo-autent/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected207" name="check-button" inline="true" switch>
                                                     <b>[{{ selected207?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected207">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected208" name="check-button" inline="true" switch>
                                                     <b>[{{ selected208?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected208">
                                        
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
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected209" name="check-button" inline="true" switch>
                                                     <b>[{{ selected209?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected210" name="check-button" inline="true" switch>
                                                     <b>[{{ selected210?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected210">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C52_SC_wo__autent$QG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div></template>
                    </div>`
                        })

/**
 * Component - CC53 - SC - For supply contracts: samples, descriptions or photographs with certification of authenticity
 */
Vue.component("v4.0.0-CC53",
                        { 
                            data(){
                                return {
                                "C53_SC_w-autent/SBC1/QG1" : [],
"selected211" : false,
"C53_SC_w-autent/QG1" : [],
"selected212" : false,
"C53_SC_w-autent/QG1/QSG1" : [],
"selected213" : false,
"C53_SC_w-autent/QG1/QSG1/QSG1" : [],
"C53_SC_w-autent/QG2" : [],
"selected214" : false,
"C53_SC_w-autent/QG2/QSG1" : [],
"selected215" : false,
"C53_SC_w-autent/QG2/QSG1/QSG1" : [],

                                exp:{
                                "cb_CC53": window.espd_model['CC53'].selected, 
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
                        <b-form-checkbox id="checkbox-CC53" v-model="exp['cb_CC53']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC53" value="OK" unchecked-value="KO">
                            <strong>For supply contracts: samples, descriptions or photographs with certification of authenticity</strong>
                            <p>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied and will provide certifications of authenticity where applicable.</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC53'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected211" name="check-button" inline="true" switch>
                                                     <b>[{{ selected211?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C53_SC_w-autent/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected212" name="check-button" inline="true" switch>
                                                     <b>[{{ selected212?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected212">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected213" name="check-button" inline="true" switch>
                                                     <b>[{{ selected213?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected213">
                                        
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
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected214" name="check-button" inline="true" switch>
                                                     <b>[{{ selected214?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected215" name="check-button" inline="true" switch>
                                                     <b>[{{ selected215?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected215">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C53_SC_w__autent$QG2$QSG1$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div></template>
                    </div>`
                        })

/**
 * Component - CC54 - SC - For supply contracts: certificates by quality control institutes
 */
Vue.component("v4.0.0-CC54",
                        { 
                            data(){
                                return {
                                "C54_SC_qa-certif-inst/SBC1/QG1" : [],
"selected216" : false,
"C54_SC_qa-certif-inst/RG1" : [],
"lotid_C54" : window.espd_model['CC54'].lots,
"C54_SC_qa-certif-inst/RG1/RSG1" : [],
"C54_SC_qa-certif-inst/RG1/RSG1/QSG1" : [],
"selected217" : false,
"C54_SC_qa-certif-inst/RG1/RSG1/QSG1/QSG1" : [],
"selected218" : false,
"C54_SC_qa-certif-inst/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C54_SC_qa-certif-inst/RG1/RSG1/QSG2" : [],
"selected219" : false,
"C54_SC_qa-certif-inst/RG1/RSG1/QSG2/QSG1" : [],
"C54_SC_qa-certif-inst/RG1/RSG1/QSG2/QSG2" : [],
"selected220" : false,
"C54_SC_qa-certif-inst/RG1/RSG1/QSG2/QSG2/QSG1" : [],

                                exp:{
                                "cb_CC54": window.espd_model['CC54'].selected, 
"C54_SC_qa__certif__inst$SBC1$QG1$Q1" : false,
"C54_SC_qa__certif__inst$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC54" v-model="exp['cb_CC54']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC54" value="OK" unchecked-value="KO">
                            <strong>For supply contracts: certificates by quality control institutes</strong>
                            <p>Can the economic operator provide the required certificates drawn up by official quality control institutes or agencies of recognised competence attesting the conformity of products clearly identified by references to the technical specifications or standards, which are set out in the relevant notice or the in the ESPD, the relevant notice or ?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC54'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected216" name="check-button" inline="true" switch>
                                                     <b>[{{ selected216?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C54_SC_qa-certif-inst/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C54"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C54.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C54.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected217" name="check-button" inline="true" switch>
                                                     <b>[{{ selected217?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected217">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected218" name="check-button" inline="true" switch>
                                                     <b>[{{ selected218?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected218">
                                        
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
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected219" name="check-button" inline="true" switch>
                                                     <b>[{{ selected219?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected219">
                                        
                                <b-form-group label="[Q] If not, please explain why and state which other means of proof can be provided:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected220" name="check-button" inline="true" switch>
                                                     <b>[{{ selected220?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected220">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C54_SC_qa__certif__inst$RG1$RSG1$QSG2$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C54_SC_qa-certif-inst/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C54_SC_qa-certif-inst/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC55 - SC - Certificates by independent bodies about quality assurance standards
 */
Vue.component("v4.0.0-CC55",
                        { 
                            data(){
                                return {
                                "C55_SC_qu-certif-indep/SBC1/QG1" : [],
"selected221" : false,
"C55_SC_qu-certif-indep/RG1" : [],
"lotid_C55" : window.espd_model['CC55'].lots,
"C55_SC_qu-certif-indep/RG1/RSG1" : [],
"C55_SC_qu-certif-indep/RG1/RSG1/QSG1" : [],
"selected222" : false,
"C55_SC_qu-certif-indep/RG1/RSG1/QSG1/QSG1" : [],
"selected223" : false,
"C55_SC_qu-certif-indep/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C55_SC_qu-certif-indep/RG1/RSG1/QSG2" : [],
"selected224" : false,
"C55_SC_qu-certif-indep/RG1/RSG1/QSG2/QSG1" : [],
"C55_SC_qu-certif-indep/RG1/RSG1/QSG2/QSG2" : [],
"selected225" : false,
"C55_SC_qu-certif-indep/RG1/RSG1/QSG2/QSG2/QSG1" : [],

                                exp:{
                                "cb_CC55": window.espd_model['CC55'].selected, 
"C55_SC_qu__certif__indep$SBC1$QG1$Q1" : false,
"C55_SC_qu__certif__indep$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC55" v-model="exp['cb_CC55']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC55" value="OK" unchecked-value="KO">
                            <strong>Certificates by independent bodies about quality assurance standards</strong>
                            <p>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required quality assurance standards, including accessibility for disabled persons?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC55'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected221" name="check-button" inline="true" switch>
                                                     <b>[{{ selected221?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C55_SC_qu-certif-indep/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C55"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C55.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C55.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected222" name="check-button" inline="true" switch>
                                                     <b>[{{ selected222?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected222">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected223" name="check-button" inline="true" switch>
                                                     <b>[{{ selected223?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected223">
                                        
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
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected224" name="check-button" inline="true" switch>
                                                     <b>[{{ selected224?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected224">
                                        
                                <b-form-group label="[Q] If not, please explain why and state which other means of proof can be provided:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected225" name="check-button" inline="true" switch>
                                                     <b>[{{ selected225?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected225">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C55_SC_qu__certif__indep$RG1$RSG1$QSG2$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C55_SC_qu-certif-indep/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C55_SC_qu-certif-indep/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC56 - SC - Certificates by independent bodies about environmental management systems or standards
 */
Vue.component("v4.0.0-CC56",
                        { 
                            data(){
                                return {
                                "C56_SC_envir-certif-indep/SBC1/QG1" : [],
"selected226" : false,
"C56_SC_envir-certif-indep/RG1" : [],
"lotid_C56" : window.espd_model['CC56'].lots,
"C56_SC_envir-certif-indep/RG1/RSG1" : [],
"C56_SC_envir-certif-indep/RG1/RSG1/QSG1" : [],
"selected227" : false,
"C56_SC_envir-certif-indep/RG1/RSG1/QSG1/QSG1" : [],
"selected228" : false,
"C56_SC_envir-certif-indep/RG1/RSG1/QSG1/QSG1/QSG1" : [],
"C56_SC_envir-certif-indep/RG1/RSG1/QSG2" : [],
"selected229" : false,
"C56_SC_envir-certif-indep/RG1/RSG1/QSG2/QSG1" : [],
"C56_SC_envir-certif-indep/RG1/RSG1/QSG2/QSG2" : [],
"selected230" : false,
"C56_SC_envir-certif-indep/RG1/RSG1/QSG2/QSG2/QSG1" : [],

                                exp:{
                                "cb_CC56": window.espd_model['CC56'].selected, 
"C56_SC_envir__certif__indep$SBC1$QG1$Q1" : false,
"C56_SC_envir__certif__indep$RG1$RQ1$R1$R1" : '',
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
                        <b-form-checkbox id="checkbox-CC56" v-model="exp['cb_CC56']" :disabled="window.espd_doc.role === 'eo'" name="checkbox-CC56" value="OK" unchecked-value="KO">
                            <strong>Certificates by independent bodies about environmental management systems or standards</strong>
                            <p>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required environmental management systems or standards?</p>
                        </b-form-checkbox>
                        <template v-if="exp['cb_CC56'] ==='OK'">
                        <div><b-card footer-tag="footer">
                        <div v-if="window.espd_doc.role==='eo'"><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>[Q] Your Answer <b-form-checkbox v-model="selected226" name="check-button" inline="true" switch>
                                                     <b>[{{ selected226?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div><template #footer>
                        <b-button variant="success" @click="renderHTML('C56_SC_envir-certif-indep/SBC1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><em>LEGISLATION</em><div><b-card footer-tag="footer">
                        <b-form-group label-class="font-weight-bold" label="[R] LOT Identifier" label-for="tags-component-select_item">
                            <b-form-tags id="tags-component-select_item" v-model="lotid_C56"
                                size="lg" class="mb-2" add-on-change no-outer-focus>
                                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select v-bind="inputAttrs" v-on="inputHandlers"
                                :disabled="disabled || window.espd_doc.options.filter(opt => lotid_C56.indexOf(opt) === -1).length === 0" 
                                :options="window.espd_doc.options.filter(opt => lotid_C56.indexOf(opt) === -1)">
                                    <template #first>
                                    <!-- This is required to prevent bugs with Safari -->
                                    <option disabled value="">Choose a tag...</option>
                                </b-form-select>
                                </template>
                            </b-form-tags>
                            </b-form-group>
                        <div><b-card footer-tag="footer">
                    <b-form-group label-class="font-weight-bold" label="[R] Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>[Q] Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected227" name="check-button" inline="true" switch>
                                                     <b>[{{ selected227?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected227">
                                        
                                            <br/>[Q] In the case of no – Relied upon or not <b-form-checkbox v-model="selected228" name="check-button" inline="true" switch>
                                                     <b>[{{ selected228?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected228">
                                        
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
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected229" name="check-button" inline="true" switch>
                                                     <b>[{{ selected229?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected229">
                                        
                                <b-form-group label="[Q] If not, please explain why and state which other means of proof can be provided:" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available online? <b-form-checkbox v-model="selected230" name="check-button" inline="true" switch>
                                                     <b>[{{ selected230?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected230">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C56_SC_envir__certif__indep$RG1$RSG1$QSG2$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div><template #footer>
                        <b-button variant="success" @click="renderHTML('C56_SC_envir-certif-indep/RG1/RSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                        </template>
                        </b-card></div><template #footer>
                    <b-button variant="success" @click="renderHTML('C56_SC_envir-certif-indep/RG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card></div></template>
                    </div>`
                        })

/**
 * Component - CC57 - OT - Economic operator is a sheltered workshop
 */
Vue.component("v4.0.0-CC57",
                        { 
                            data(){
                                return {
                                "C57_OT_shelt-worksh/QG1" : [],
"selected231" : false,
"C57_OT_shelt-worksh/QG1/QSG1" : [],
"C57_OT_shelt-worksh/QG1/QSG2" : [],
"selected232" : false,
"C57_OT_shelt-worksh/QG1/QSG2/QSG1" : [],

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
                            
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected231" name="check-button" inline="true" switch>
                                                     <b>[{{ selected231?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected231">
                                        
                                <b-form-group label="[Q] What is the corresponding percentage of disabled or disadvantaged workers?" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="PERCENTAGE" v-model="exp['C57_OT_shelt__worksh$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] If required, please provide details on whether the employees concerned belong to a specific category of disabled or disadvantaged workers?" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C57_OT_shelt__worksh$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected232" name="check-button" inline="true" switch>
                                                     <b>[{{ selected232?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected232">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C57_OT_shelt__worksh$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC58 - OT - Economic operator registered in a pre qualification system
 */
Vue.component("v4.0.0-CC58",
                        { 
                            data(){
                                return {
                                "C58_OT_registered/QG1" : [],
"selected233" : false,
"C58_OT_registered/QG1/QSG1" : [],
"selected234" : false,
"C58_OT_registered/QG1/QSG1/QSG1" : [],
"C58_OT_registered/QG1/QSG1/QSG1/QSG1" : [],
"selected235" : false,
"C58_OT_registered/QG1/QSG1/QSG2" : [],
"selected236" : false,
"C58_OT_registered/QG1/QSG1/QSG3" : [],
"selected237" : false,
"C58_OT_registered/QG1/QSG1/QSG3/QSG1" : [],
"C58_OT_registered/QG1/QSG2" : [],

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
                            
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected233" name="check-button" inline="true" switch>
                                                     <b>[{{ selected233?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected233">
                                        
                                            <br/>[Q] Is the economic operator registered on an official list of approved economic operators or does it have an equivalent certificate? <b-form-checkbox v-model="selected234" name="check-button" inline="true" switch>
                                                     <b>[{{ selected234?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected234">
                                        
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
                                            <br/>[Q] Does the registration or certification cover all of the required selection criteria? <b-form-checkbox v-model="selected235" name="check-button" inline="true" switch>
                                                     <b>[{{ selected235?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            </div>
                                        </div>
                                        <div v-if="!selected234">
                                        
                                            <br/>[Q] Will the economic operator be able to provide a certificate with regard to the payment of social security contributions and taxes or provide information enabling the contracting authority or contracting entity to obtaining it directly by accessing a national database in any Member State that is available free of charge? <b-form-checkbox v-model="selected236" name="check-button" inline="true" switch>
                                                     <b>[{{ selected236?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected237" name="check-button" inline="true" switch>
                                                     <b>[{{ selected237?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected237">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C58_OT_registered$QG1$QSG1$QSG3$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                                        </div>
                                        <div v-if="!selected233">
                                        <em>The country of the economic operator does not have an official list of approved economic operators or an equivalent certificate (e.g. under a national (pre)qualification system).</em>
                                        </div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC59 - OT - Economic Operator together with others
 */
Vue.component("v4.0.0-CC59",
                        { 
                            data(){
                                return {
                                "C59_OT_eo-group/QG1" : [],
"selected238" : false,
"C59_OT_eo-group/QG1/QSG1" : [],
"C59_OT_eo-group/QG1/QSG2" : [],
"selected239" : false,
"C59_OT_eo-group/QG1/QSG2/QSG1" : [],

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
                            
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected238" name="check-button" inline="true" switch>
                                                     <b>[{{ selected238?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected238">
                                        
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
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected239" name="check-button" inline="true" switch>
                                                     <b>[{{ selected239?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected239">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C59_OT_eo__group$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC60 - OT - Relied on entities
 */
Vue.component("v4.0.0-CC60",
                        { 
                            data(){
                                return {
                                "C60_OT_relied/QG1" : [],
"selected240" : false,
"C60_OT_relied/QG1/QSG1" : [],
"C60_OT_relied/QG1/QSG2" : [],
"selected241" : false,
"C60_OT_relied/QG1/QSG2/QSG1" : [],

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
                            
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected240" name="check-button" inline="true" switch>
                                                     <b>[{{ selected240?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected240">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C60_OT_relied$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C60_OT_relied$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group><template #footer>
                    <b-button variant="success" @click="renderHTML('C60_OT_relied/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected241" name="check-button" inline="true" switch>
                                                     <b>[{{ selected241?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected241">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C60_OT_relied$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC61 - OT - Not relied on entities
 */
Vue.component("v4.0.0-CC61",
                        { 
                            data(){
                                return {
                                "C61_OT_subco-ent/QG1" : [],
"selected242" : false,
"C61_OT_subco-ent/QG1/QSG1" : [],
"C61_OT_subco-ent/QG1/QSG2" : [],
"selected243" : false,
"C61_OT_subco-ent/QG1/QSG2/QSG1" : [],

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
                            
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected242" name="check-button" inline="true" switch>
                                                     <b>[{{ selected242?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected242">
                                        <b-card v-if="window.espd_doc.role==='eo'"  footer-tag="footer">
                                <b-form-group label="[Q] Name of the entity" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C61_OT_subco__ent$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] ID of the subcontractor" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER" v-model="exp['C61_OT_subco__ent$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group><template #footer>
                    <b-button variant="success" @click="renderHTML('C61_OT_subco-ent/QG1/QSG1', exp)"><b-icon icon="plus-square-fill" aria-hidden="true"></b-icon></b-button>
                    </template>
                    </b-card>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected243" name="check-button" inline="true" switch>
                                                     <b>[{{ selected243?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected243">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C61_OT_subco__ent$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC63 - OT - Reduction of the number of qualified candidates
 */
Vue.component("v4.0.0-CC63",
                        { 
                            data(){
                                return {
                                "C63_OT_staff-red/QG1" : [],
"selected244" : false,
"C63_OT_staff-red/QG1/QSG1" : [],
"C63_OT_staff-red/QG1/QSG2" : [],
"selected245" : false,
"C63_OT_staff-red/QG1/QSG2/QSG1" : [],

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
                            <em>In case certain certificates or other forms of documentary evidence are required, please indicate for each whether the economic operator has the required documents</em>
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected244" name="check-button" inline="true" switch>
                                                     <b>[{{ selected244?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected244">
                                        
                                <b-form-group label="[Q] Please describe them" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="DESCRIPTION" v-model="exp['C63_OT_staff__red$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected245" name="check-button" inline="true" switch>
                                                     <b>[{{ selected245?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected245">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C63_OT_staff__red$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })

/**
 * Component - CC65 - OT - Economic Operator Micro, Small or Medium-sized Enterprise
 */
Vue.component("v4.0.0-CC65",
                        { 
                            data(){
                                return {
                                "C65_OT_sme/QG1" : [],
"selected246" : false,
"C65_OT_sme/QG1/QSG1" : [],
"C65_OT_sme/QG1/QSG2" : [],
"selected247" : false,
"C65_OT_sme/QG1/QSG2/QSG1" : [],

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
                            
                        <div v-if="window.espd_doc.role==='eo'">
                                            <br/>[Q] Your answer? <b-form-checkbox v-model="selected246" name="check-button" inline="true" switch>
                                                     <b>[{{ selected246?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected246">
                                        
                                <b-form-group label="[Q] Number of employees" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="QUANTITY_INTEGER" v-model="exp['C65_OT_sme$QG1$QSG1$Q1'][0]"></b-form-input>
                                </b-form-group>
                                <b-form-group label="[Q] Turnover" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                <b-form-input placeholder="AMOUNT" v-model="exp['C65_OT_sme$QG1$QSG1$Q2'][0]"></b-form-input>
                                </b-form-group>
                                        </div><div>
                                            <br/>[Q] Is this information available electronically? <b-form-checkbox v-model="selected247" name="check-button" inline="true" switch>
                                                     <b>[{{ selected247?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected247">
                                        <b-form-group label="[Q] Evidence Supplied" 
                                label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                            <b-form-tags v-model="exp['C65_OT_sme$QG1$QSG2$QSG1$Q1']" placeholder="Add value"></b-form-tags></b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                        })


/**
 * Component - CC1 - EG - Participation in a criminal organisation
 */
Vue.component("v4.0.0-CC1",
                    { 
                        data(){
                            return {
 "selected01": false,
 "selected02": false,
 "selected03": false,
 "selected04": false,
 "selected05": false,
 "selected06": false
}
                        },
                        template: `<div>
                        <strong>Participation in a criminal organisation</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for participation in a criminal organisation, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 2 of Council Framework Decision 2008/841/JHA of 24 October 2008 on the fight against organised crime (OJ L 300, 11.11.2008, p. 42).</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected01" name="check-button" inline="true" switch>
                                                     <b>[{{ selected01?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected02" name="check-button" inline="true" switch>
                                                     <b>[{{ selected02?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected02">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected03" name="check-button" inline="true" switch>
                                                     <b>[{{ selected03?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected03">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected04" name="check-button" inline="true" switch>
                                                     <b>[{{ selected04?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected04">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                        </div>
                                        <div v-if="selected02">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected05" name="check-button" inline="true" switch>
                                                     <b>[{{ selected05?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected05">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected06" name="check-button" inline="true" switch>
                                                     <b>[{{ selected06?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected06">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected07": false,
 "selected08": false,
 "selected09": false,
 "selected10": false
}
                        },
                        template: `<div>
                        <strong>Corruption</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for corruption, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 3 of the Convention on the fight against corruption involving officials of the European Communities or officials of Member States of the European Union, OJ C 195, 25.6.1997, p. 1, and in Article 2(1) of Council Framework Decision 2003/568/JHA of 22 July 2003 on combating corruption in the private sector (OJ L 192, 31.7.2003, p. 54). This exclusion ground also includes corruption as defined in the national law of the contracting authority (contracting entity) or the economic operator.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected07" name="check-button" inline="true" switch>
                                                     <b>[{{ selected07?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected08" name="check-button" inline="true" switch>
                                                     <b>[{{ selected08?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected08">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected09" name="check-button" inline="true" switch>
                                                     <b>[{{ selected09?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected09">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected10" name="check-button" inline="true" switch>
                                                     <b>[{{ selected10?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected10">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected11": false,
 "selected12": false,
 "selected13": false,
 "selected14": false
}
                        },
                        template: `<div>
                        <strong>Fraud</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for fraud, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? Within the meaning of Article 1 of the Convention on the protection of the European Communities' financial interests (OJ C 316, 27.11.1995, p. 48).</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected11" name="check-button" inline="true" switch>
                                                     <b>[{{ selected11?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected12" name="check-button" inline="true" switch>
                                                     <b>[{{ selected12?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected12">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected13" name="check-button" inline="true" switch>
                                                     <b>[{{ selected13?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected13">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected14" name="check-button" inline="true" switch>
                                                     <b>[{{ selected14?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected14">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected15": false,
 "selected16": false,
 "selected17": false,
 "selected18": false
}
                        },
                        template: `<div>
                        <strong>Terrorist offences or offences linked to terrorist activities</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for terrorist offences or offences linked to terrorist activities, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Articles 1 and 3 of Council Framework Decision of 13 June 2002 on combating terrorism (OJ L 164, 22.6.2002, p. 3). This exclusion ground also includes inciting or aiding or abetting or attempting to commit an offence, as referred to in Article 4 of that Framework Decision.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected15" name="check-button" inline="true" switch>
                                                     <b>[{{ selected15?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected16" name="check-button" inline="true" switch>
                                                     <b>[{{ selected16?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected16">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected17" name="check-button" inline="true" switch>
                                                     <b>[{{ selected17?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected17">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected18" name="check-button" inline="true" switch>
                                                     <b>[{{ selected18?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected18">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected19": false,
 "selected20": false,
 "selected21": false,
 "selected22": false
}
                        },
                        template: `<div>
                        <strong>Money laundering or terrorist financing</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for money laundering or terrorist financing, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 1 of Directive 2005/60/EC of the European Parliament and of the Council of 26 October 2005 on the prevention of the use of the financial system for the purpose of money laundering and terrorist financing (OJ L 309, 25.11.2005, p. 15).</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected19" name="check-button" inline="true" switch>
                                                     <b>[{{ selected19?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected20" name="check-button" inline="true" switch>
                                                     <b>[{{ selected20?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected20">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected21" name="check-button" inline="true" switch>
                                                     <b>[{{ selected21?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected21">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected22" name="check-button" inline="true" switch>
                                                     <b>[{{ selected22?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected22">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected23": false,
 "selected24": false,
 "selected25": false,
 "selected26": false
}
                        },
                        template: `<div>
                        <strong>Child labour and other forms of trafficking in human beings</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for child labour and other forms of trafficking in human beings, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 2 of Directive 2011/36/EU of the European Parliament and of the Council of 5 April 2011 on preventing and combating trafficking in human beings and protecting its victims, and replacing Council Framework Decision 2002/629/JHA (OJ L 101, 15.4.2011, p. 1).</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected23" name="check-button" inline="true" switch>
                                                     <b>[{{ selected23?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected24" name="check-button" inline="true" switch>
                                                     <b>[{{ selected24?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected24">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected25" name="check-button" inline="true" switch>
                                                     <b>[{{ selected25?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected25">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected26" name="check-button" inline="true" switch>
                                                     <b>[{{ selected26?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected26">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected27": false,
 "selected28": false,
 "selected29": false,
 "selected30": false,
 "selected31": false,
 "selected32": false
}
                        },
                        template: `<div>
                        <strong>Payment of taxes</strong>
                        <p>Has the economic operator breached its obligations relating to the payment of taxes, both in the country in which it is established and in Member State of the contracting authority or contracting entity if other than the country of establishment?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected27" name="check-button" inline="true" switch>
                                                     <b>[{{ selected27?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="Minimum Amount Threshold"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Additional Information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Your answer <b-form-checkbox v-model="selected28" name="check-button" inline="true" switch>
                                                     <b>[{{ selected28?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected28">
                                        
                                            <b-form-group label="Country or member state concerned" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="CODE_COUNTRY"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount concerned" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Has this breach of obligations been established by means other than a judicial or administrative decision? <b-form-checkbox v-model="selected29" name="check-button" inline="true" switch>
                                                     <b>[{{ selected29?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected29">
                                        
                                            <b-form-group label="Please describe which means were used" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected29">
                                        
                                            <br/>If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? <b-form-checkbox v-model="selected30" name="check-button" inline="true" switch>
                                                     <b>[{{ selected30?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected30">
                                        
                                            <b-form-group label="Please indicate the date of conviction or decision" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="In case of a conviction insofar as established directly therein, the length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the taxes contributions due, including, where applicable, any interest accrued or fines? <b-form-checkbox v-model="selected31" name="check-button" inline="true" switch>
                                                     <b>[{{ selected31?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected31">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected32" name="check-button" inline="true" switch>
                                                     <b>[{{ selected32?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected32">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected33": false,
 "selected34": false,
 "selected35": false,
 "selected36": false,
 "selected37": false,
 "selected38": false
}
                        },
                        template: `<div>
                        <strong>Payment of social security contributions</strong>
                        <p>Has the economic operator breached its obligations relating to the payment of social security contributions, both in the country in which it is established and in Member State of the contracting authority or contracting entity if other than the country of establishment?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected33" name="check-button" inline="true" switch>
                                                     <b>[{{ selected33?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="Minimum Amount Threshold"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Additional Information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Your answer <b-form-checkbox v-model="selected34" name="check-button" inline="true" switch>
                                                     <b>[{{ selected34?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected34">
                                        
                                            <b-form-group label="Country or member state concerned" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="CODE_COUNTRY"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount concerned" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Has this breach of obligations been established by means other than a judicial or administrative decision? <b-form-checkbox v-model="selected35" name="check-button" inline="true" switch>
                                                     <b>[{{ selected35?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected35">
                                        
                                            <b-form-group label="Please describe which means were used" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected35">
                                        
                                            <br/>If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? <b-form-checkbox v-model="selected36" name="check-button" inline="true" switch>
                                                     <b>[{{ selected36?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected36">
                                        
                                            <b-form-group label="Please indicate the date of conviction or decision" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="In case of a conviction insofar as established directly therein, the length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the social security contributions due, including, where applicable, any interest accrued or fines? <b-form-checkbox v-model="selected37" name="check-button" inline="true" switch>
                                                     <b>[{{ selected37?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected37">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected38" name="check-button" inline="true" switch>
                                                     <b>[{{ selected38?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected38">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected39": false,
 "selected40": false,
 "selected41": false,
 "selected42": false
}
                        },
                        template: `<div>
                        <strong>Breaching of obligations in the fields of environmental law</strong>
                        <p>Has the economic operator, to its knowledge, breached its obligations in the fields of environmental law? As referred to for the purposes of this procurement in national law, in the ESPD, the relevant notice or the in the ESPD, the relevant notice or , in Article 18(2) of Directive 2014/24/EU or in the ESPD.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected39" name="check-button" inline="true" switch>
                                                     <b>[{{ selected39?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected40" name="check-button" inline="true" switch>
                                                     <b>[{{ selected40?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected40">
                                        
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected41" name="check-button" inline="true" switch>
                                                     <b>[{{ selected41?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected41">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected42" name="check-button" inline="true" switch>
                                                     <b>[{{ selected42?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected42">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected43": false,
 "selected44": false,
 "selected45": false,
 "selected46": false
}
                        },
                        template: `<div>
                        <strong>Breaching of obligations in the fields of social law</strong>
                        <p>Has the economic operator, to its knowledge, breached its obligations in the fields of social law? As referred to for the purposes of this procurement in national law, in the ESPD, the relevant notice or the in the ESPD, the relevant notice or in Article 18(2) of Directive 2014/24/EU.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected43" name="check-button" inline="true" switch>
                                                     <b>[{{ selected43?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected44" name="check-button" inline="true" switch>
                                                     <b>[{{ selected44?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected44">
                                        
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected45" name="check-button" inline="true" switch>
                                                     <b>[{{ selected45?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected45">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected46" name="check-button" inline="true" switch>
                                                     <b>[{{ selected46?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected46">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected47": false,
 "selected48": false,
 "selected49": false,
 "selected50": false
}
                        },
                        template: `<div>
                        <strong>Breaching of obligations in the fields of labour law</strong>
                        <p>Has the economic operator, to its knowledge, breached its obligations in the fields of labour law? As referred to for the purposes of this procurement in national law, in the relevant notice or the in the ESPD, the relevant notice or in Article 18(2) of Directive 2014/24/EU.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected47" name="check-button" inline="true" switch>
                                                     <b>[{{ selected47?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected48" name="check-button" inline="true" switch>
                                                     <b>[{{ selected48?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected48">
                                        
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected49" name="check-button" inline="true" switch>
                                                     <b>[{{ selected49?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected49">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected50" name="check-button" inline="true" switch>
                                                     <b>[{{ selected50?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected50">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected51": false,
 "selected52": false,
 "selected53": false
}
                        },
                        template: `<div>
                        <strong>Bankruptcy</strong>
                        <p>Is the economic operator bankrupt? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected51" name="check-button" inline="true" switch>
                                                     <b>[{{ selected51?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected52" name="check-button" inline="true" switch>
                                                     <b>[{{ selected52?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected52">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected53" name="check-button" inline="true" switch>
                                                     <b>[{{ selected53?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected53">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected54": false,
 "selected55": false,
 "selected56": false
}
                        },
                        template: `<div>
                        <strong>Insolvency</strong>
                        <p>Is the economic operator the subject of insolvency or winding-up? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected54" name="check-button" inline="true" switch>
                                                     <b>[{{ selected54?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected55" name="check-button" inline="true" switch>
                                                     <b>[{{ selected55?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected55">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected56" name="check-button" inline="true" switch>
                                                     <b>[{{ selected56?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected56">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected57": false,
 "selected58": false,
 "selected59": false
}
                        },
                        template: `<div>
                        <strong>Arrangement with creditors</strong>
                        <p>Is the economic operator in arrangement with creditors? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected57" name="check-button" inline="true" switch>
                                                     <b>[{{ selected57?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected58" name="check-button" inline="true" switch>
                                                     <b>[{{ selected58?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected58">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected59" name="check-button" inline="true" switch>
                                                     <b>[{{ selected59?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected59">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected60": false,
 "selected61": false,
 "selected62": false
}
                        },
                        template: `<div>
                        <strong>Analogous situation like bankruptcy under national law</strong>
                        <p>Is the economic operator in any analogous situation like bankruptcy arising from a similar procedure under national laws and regulations? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected60" name="check-button" inline="true" switch>
                                                     <b>[{{ selected60?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected61" name="check-button" inline="true" switch>
                                                     <b>[{{ selected61?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected61">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected62" name="check-button" inline="true" switch>
                                                     <b>[{{ selected62?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected62">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected63": false,
 "selected64": false,
 "selected65": false
}
                        },
                        template: `<div>
                        <strong>Assets being administered by liquidator</strong>
                        <p>Are the assets of the economic operator being administered by a liquidator or by the court? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected63" name="check-button" inline="true" switch>
                                                     <b>[{{ selected63?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected64" name="check-button" inline="true" switch>
                                                     <b>[{{ selected64?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected64">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected65" name="check-button" inline="true" switch>
                                                     <b>[{{ selected65?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected65">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected66": false,
 "selected67": false,
 "selected68": false
}
                        },
                        template: `<div>
                        <strong>Business activities are suspended</strong>
                        <p>Are the business activities of the economic operator suspended? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected66" name="check-button" inline="true" switch>
                                                     <b>[{{ selected66?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected67" name="check-button" inline="true" switch>
                                                     <b>[{{ selected67?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected67">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected68" name="check-button" inline="true" switch>
                                                     <b>[{{ selected68?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected68">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected69": false,
 "selected70": false,
 "selected71": false,
 "selected72": false
}
                        },
                        template: `<div>
                        <strong>Guilty of grave professional misconduct</strong>
                        <p>Is the economic operator guilty of grave professional misconduct? Where applicable, see definitions in national law, the relevant notice or the procurement documents.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected69" name="check-button" inline="true" switch>
                                                     <b>[{{ selected69?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected70" name="check-button" inline="true" switch>
                                                     <b>[{{ selected70?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected70">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability <b-form-checkbox v-model="selected71" name="check-button" inline="true" switch>
                                                     <b>[{{ selected71?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected71">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected72" name="check-button" inline="true" switch>
                                                     <b>[{{ selected72?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected72">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected73": false,
 "selected74": false,
 "selected75": false,
 "selected76": false
}
                        },
                        template: `<div>
                        <strong>Agreements with other economic operators aimed at distorting competition</strong>
                        <p>Has the economic operator entered into agreements with other economic operators aimed at distorting competition?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected73" name="check-button" inline="true" switch>
                                                     <b>[{{ selected73?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected74" name="check-button" inline="true" switch>
                                                     <b>[{{ selected74?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected74">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability <b-form-checkbox v-model="selected75" name="check-button" inline="true" switch>
                                                     <b>[{{ selected75?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected75">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected76" name="check-button" inline="true" switch>
                                                     <b>[{{ selected76?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected76">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected77": false,
 "selected78": false,
 "selected79": false
}
                        },
                        template: `<div>
                        <strong>Conflict of interest due to its participation in the procurement procedure</strong>
                        <p>Is the economic operator aware of any conflict of interest, as indicated in national law, the relevant notice or in the ESPD, the relevant notice or due to its participation in the procurement procedure?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected77" name="check-button" inline="true" switch>
                                                     <b>[{{ selected77?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected78" name="check-button" inline="true" switch>
                                                     <b>[{{ selected78?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected78">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected79" name="check-button" inline="true" switch>
                                                     <b>[{{ selected79?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected79">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected80": false,
 "selected81": false,
 "selected82": false
}
                        },
                        template: `<div>
                        <strong>Direct or indirect involvement in the preparation of this procurement procedure</strong>
                        <p>Has the economic operator or an undertaking related to it advised the contracting authority or contracting entity or otherwise been involved in the preparation of the procurement procedure?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected80" name="check-button" inline="true" switch>
                                                     <b>[{{ selected80?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected81" name="check-button" inline="true" switch>
                                                     <b>[{{ selected81?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected81">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected82" name="check-button" inline="true" switch>
                                                     <b>[{{ selected82?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected82">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected83": false,
 "selected84": false,
 "selected85": false,
 "selected86": false
}
                        },
                        template: `<div>
                        <strong>Early termination, damages or other comparable sanctions</strong>
                        <p>Has the economic operator experienced that a prior public contract, a prior contract with a contracting entity or a prior concession contract was terminated early, or that damages or other comparable sanctions were imposed in connection with that prior contract?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected83" name="check-button" inline="true" switch>
                                                     <b>[{{ selected83?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected84" name="check-button" inline="true" switch>
                                                     <b>[{{ selected84?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected84">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected85" name="check-button" inline="true" switch>
                                                     <b>[{{ selected85?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected85">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected86" name="check-button" inline="true" switch>
                                                     <b>[{{ selected86?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected86">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected87": false,
 "selected88": false,
 "selected89": false
}
                        },
                        template: `<div>
                        <strong>Guilty of misrepresentation, withheld information, unable to provide required documents and obtained confidential information of this procedure</strong>
                        <p>Can the economic operator confirm that:</p>
                        <em>a) It has been guilty of serious misrepresentation in supplying the information required for the verification of the absence of grounds for exclusion or the fulfilment of the selection criteria,</em><em>b) It has withheld such information,</em><em>c) It has not been able, without delay, to submit the supporting documents required by a contracting authority or contracting entity, and</em><em>d) It has undertaken to unduly influence the decision making process of the contracting authority or contracting entity, to obtain confidential information that may confer upon it undue advantages in the procurement procedure or to negligently provide misleading information that may have a material influence on decisions concerning exclusion, selection or award?</em><div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected87" name="check-button" inline="true" switch>
                                                     <b>[{{ selected87?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected88" name="check-button" inline="true" switch>
                                                     <b>[{{ selected88?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected89" name="check-button" inline="true" switch>
                                                     <b>[{{ selected89?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected89">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected90": false,
 "selected91": false
}
                        },
                        template: `<div>
                        <strong>Purely national exclusion grounds</strong>
                        <p>Other exclusion grounds that may be foreseen in the national legislation of the contracting authority's or contracting entity's Member State. Has the economic operator breached its obligations relating to the purely national grounds of exclusion, which are specified in the relevant notice or in the procurement documents?</p>
                        <em>LEGISLATION</em>
                        <div><em>undefined</em><div><em>[Text describing the national criterion]</em><em>[Type of evidence from e-Certis]</em>
                                            <br/>Your answer? <b-form-checkbox v-model="selected90" name="check-button" inline="true" switch>
                                                     <b>[{{ selected90?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected91" name="check-button" inline="true" switch>
                                                     <b>[{{ selected91?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected91">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div>
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
 "selected92": false,
 "selected93": false,
 "selected94": false,
 "selected95": false,
 "selected96": false,
 "selected97": false,
 "selected98": false,
 "selected99": false,
 "selected100": false,
 "selected101": false,
 "selected102": false,
 "selected103": false,
 "selected104": false,
 "selected105": false,
 "selected106": false,
 "selected107": false,
 "selected108": false
}
                        },
                        template: `<div>
                        <strong>Enrolment in a relevant professional register</strong>
                        <p>It is enrolled in relevant professional registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected92" name="check-button" inline="true" switch>
                                                     <b>[{{ selected92?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected93" name="check-button" inline="true" switch>
                                                     <b>[{{ selected93?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected93">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected94" name="check-button" inline="true" switch>
                                                     <b>[{{ selected94?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected94">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected95" name="check-button" inline="true" switch>
                                                     <b>[{{ selected95?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected95">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected95">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected96" name="check-button" inline="true" switch>
                                                     <b>[{{ selected96?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected96">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                    <b-form-group label="occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected97" name="check-button" inline="true" switch>
                                                     <b>[{{ selected97?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected97">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected98" name="check-button" inline="true" switch>
                                                     <b>[{{ selected98?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected98">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected99" name="check-button" inline="true" switch>
                                                     <b>[{{ selected99?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected99">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected99">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected100" name="check-button" inline="true" switch>
                                                     <b>[{{ selected100?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected100">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected101" name="check-button" inline="true" switch>
                                                     <b>[{{ selected101?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected101">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected102" name="check-button" inline="true" switch>
                                                     <b>[{{ selected102?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected102">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected103" name="check-button" inline="true" switch>
                                                     <b>[{{ selected103?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected103">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected103">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected104" name="check-button" inline="true" switch>
                                                     <b>[{{ selected104?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected104">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                    <b-form-group label="occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected105" name="check-button" inline="true" switch>
                                                     <b>[{{ selected105?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected105">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected106" name="check-button" inline="true" switch>
                                                     <b>[{{ selected106?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected106">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected107" name="check-button" inline="true" switch>
                                                     <b>[{{ selected107?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected107">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected107">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected108" name="check-button" inline="true" switch>
                                                     <b>[{{ selected108?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected108">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC26 - SC - Enrolment in a trade register
 */
Vue.component("v4.0.0-CC26",
                    { 
                        data(){
                            return {
 "selected109": false,
 "selected110": false,
 "selected111": false,
 "selected112": false,
 "selected113": false
}
                        },
                        template: `<div>
                        <strong>Enrolment in a trade register</strong>
                        <p>It is enrolled in trade registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected109" name="check-button" inline="true" switch>
                                                     <b>[{{ selected109?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected110" name="check-button" inline="true" switch>
                                                     <b>[{{ selected110?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected110">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected111" name="check-button" inline="true" switch>
                                                     <b>[{{ selected111?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected111">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected112" name="check-button" inline="true" switch>
                                                     <b>[{{ selected112?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected112">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected112">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected113" name="check-button" inline="true" switch>
                                                     <b>[{{ selected113?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected113">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC27 - SC - For service contracts: authorisation of particular organisation needed
 */
Vue.component("v4.0.0-CC27",
                    { 
                        data(){
                            return {
 "selected114": false,
 "selected115": false,
 "selected116": false,
 "selected117": false,
 "selected118": false,
 "selected119": false
}
                        },
                        template: `<div>
                        <strong>For service contracts: authorisation of particular organisation needed</strong>
                        <p>Is a particular authorisation of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected114" name="check-button" inline="true" switch>
                                                     <b>[{{ selected114?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected114">
                                        
                                            <b-form-group label="If yes, please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <br/>Indicate whether the economic operator has it <b-form-checkbox v-model="selected115" name="check-button" inline="true" switch>
                                                     <b>[{{ selected115?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        </div>
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected116" name="check-button" inline="true" switch>
                                                     <b>[{{ selected116?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected116">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected117" name="check-button" inline="true" switch>
                                                     <b>[{{ selected117?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected117">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected118" name="check-button" inline="true" switch>
                                                     <b>[{{ selected118?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected118">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected118">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected119" name="check-button" inline="true" switch>
                                                     <b>[{{ selected119?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected119">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC28 - SC - For service contracts: membership of particular organisation needed
 */
Vue.component("v4.0.0-CC28",
                    { 
                        data(){
                            return {
 "selected120": false,
 "selected121": false,
 "selected122": false,
 "selected123": false,
 "selected124": false,
 "selected125": false
}
                        },
                        template: `<div>
                        <strong>For service contracts: membership of particular organisation needed</strong>
                        <p>Is a particular membership of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected120" name="check-button" inline="true" switch>
                                                     <b>[{{ selected120?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected120">
                                        
                                            <b-form-group label="If yes, please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <br/>Indicate whether the economic operator has it <b-form-checkbox v-model="selected121" name="check-button" inline="true" switch>
                                                     <b>[{{ selected121?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        </div>
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected122" name="check-button" inline="true" switch>
                                                     <b>[{{ selected122?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected122">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected123" name="check-button" inline="true" switch>
                                                     <b>[{{ selected123?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected123">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected124" name="check-button" inline="true" switch>
                                                     <b>[{{ selected124?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected124">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected124">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected125" name="check-button" inline="true" switch>
                                                     <b>[{{ selected125?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected125">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC29 - SC - General yearly turnover
 */
Vue.component("v4.0.0-CC29",
                    { 
                        data(){
                            return {
 "selected126": false,
 "selected127": false,
 "selected128": false,
 "selected129": false,
 "selected130": false
}
                        },
                        template: `<div>
                        <strong>General yearly turnover</strong>
                        <p>Its general yearly turnover for the number of financial years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected126" name="check-button" inline="true" switch>
                                                     <b>[{{ selected126?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Threshold per year"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE_BOOLEAN"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected127" name="check-button" inline="true" switch>
                                                     <b>[{{ selected127?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected127">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected128" name="check-button" inline="true" switch>
                                                     <b>[{{ selected128?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected128">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected129" name="check-button" inline="true" switch>
                                                     <b>[{{ selected129?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected129">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected130" name="check-button" inline="true" switch>
                                                     <b>[{{ selected130?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected130">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC30 - SC - Average yearly turnover
 */
Vue.component("v4.0.0-CC30",
                    { 
                        data(){
                            return {
 "selected131": false,
 "selected132": false,
 "selected133": false,
 "selected134": false,
 "selected135": false
}
                        },
                        template: `<div>
                        <strong>Average yearly turnover</strong>
                        <p>Its average yearly turnover for the number of years required in the relevant notice, the procurement documents or the ESPD is as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected131" name="check-button" inline="true" switch>
                                                     <b>[{{ selected131?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected132" name="check-button" inline="true" switch>
                                                     <b>[{{ selected132?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected132">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected133" name="check-button" inline="true" switch>
                                                     <b>[{{ selected133?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected133">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Average for the required period" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Additional information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected134" name="check-button" inline="true" switch>
                                                     <b>[{{ selected134?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected134">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected135" name="check-button" inline="true" switch>
                                                     <b>[{{ selected135?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected135">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC31 - SC - Specific average turnover
 */
Vue.component("v4.0.0-CC31",
                    { 
                        data(){
                            return {
 "selected136": false,
 "selected137": false,
 "selected138": false,
 "selected139": false,
 "selected140": false
}
                        },
                        template: `<div>
                        <strong>Specific average turnover</strong>
                        <p>Its specific average yearly turnover in the business area covered by the contract for the number of years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected136" name="check-button" inline="true" switch>
                                                     <b>[{{ selected136?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Business domain description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected137" name="check-button" inline="true" switch>
                                                     <b>[{{ selected137?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected137">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected138" name="check-button" inline="true" switch>
                                                     <b>[{{ selected138?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected138">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected139" name="check-button" inline="true" switch>
                                                     <b>[{{ selected139?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected139">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected140" name="check-button" inline="true" switch>
                                                     <b>[{{ selected140?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected140">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC32 - SC - Specific yearly turnover
 */
Vue.component("v4.0.0-CC32",
                    { 
                        data(){
                            return {
 "selected141": false,
 "selected142": false,
 "selected143": false,
 "selected144": false,
 "selected145": false,
 "selected146": false,
 "selected147": false,
 "selected148": false,
 "selected149": false,
 "selected150": false,
 "selected151": false,
 "selected152": false,
 "selected153": false,
 "selected154": false
}
                        },
                        template: `<div>
                        <strong>Specific yearly turnover</strong>
                        <p>Its specific yearly turnover in the business area covered by the contract for the number of financial years required in the relevant notice, in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected141" name="check-button" inline="true" switch>
                                                     <b>[{{ selected141?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Business domain description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected142" name="check-button" inline="true" switch>
                                                     <b>[{{ selected142?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected142">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected143" name="check-button" inline="true" switch>
                                                     <b>[{{ selected143?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected143">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected144" name="check-button" inline="true" switch>
                                                     <b>[{{ selected144?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected144">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected145" name="check-button" inline="true" switch>
                                                     <b>[{{ selected145?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected145">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected146" name="check-button" inline="true" switch>
                                                     <b>[{{ selected146?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected146">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected147" name="check-button" inline="true" switch>
                                                     <b>[{{ selected147?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected147">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Business domain description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected148" name="check-button" inline="true" switch>
                                                     <b>[{{ selected148?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected148">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected149" name="check-button" inline="true" switch>
                                                     <b>[{{ selected149?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected149">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected150" name="check-button" inline="true" switch>
                                                     <b>[{{ selected150?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected150">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected151" name="check-button" inline="true" switch>
                                                     <b>[{{ selected151?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected151">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected152" name="check-button" inline="true" switch>
                                                     <b>[{{ selected152?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected152">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected153" name="check-button" inline="true" switch>
                                                     <b>[{{ selected153?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected153">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected154" name="check-button" inline="true" switch>
                                                     <b>[{{ selected154?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected154">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC34 - SC - Financial ratio
 */
Vue.component("v4.0.0-CC34",
                    { 
                        data(){
                            return {
 "selected155": false,
 "selected156": false,
 "selected157": false
}
                        },
                        template: `<div>
                        <strong>Financial ratio</strong>
                        <p>Concerning the financial ratios specified in the relevant notice, the in the ESPD, the relevant notice or the ESPD, the economic operator declares that the actual values for the required ratios are as follows:</p>
                        <em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Select the periods applicable for all ratios"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="PERIOD"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Ratio Type"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Definition"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum ratio requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY"></b-form-input>
                    </b-form-group>
                    </div>
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected155" name="check-button" inline="true" switch>
                                                     <b>[{{ selected155?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected155">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected156" name="check-button" inline="true" switch>
                                                     <b>[{{ selected156?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected156">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please provide your ratio" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected157" name="check-button" inline="true" switch>
                                                     <b>[{{ selected157?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected157">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC35 - SC - Professional risk indemnity insurance
 */
Vue.component("v4.0.0-CC35",
                    { 
                        data(){
                            return {
 "selected158": false,
 "selected159": false,
 "selected160": false,
 "selected161": false,
 "selected162": false,
 "selected163": false
}
                        },
                        template: `<div>
                        <strong>Professional risk indemnity insurance</strong>
                        <p>The insured amount in its professional risk indemnity insurance is the following:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected158" name="check-button" inline="true" switch>
                                                     <b>[{{ selected158?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Type of insurance"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected159" name="check-button" inline="true" switch>
                                                     <b>[{{ selected159?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected159">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected160" name="check-button" inline="true" switch>
                                                     <b>[{{ selected160?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected160">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <br/>As an EO I will commit to obtain the minimum amount required <b-form-checkbox v-model="selected161" name="check-button" inline="true" switch>
                                                     <b>[{{ selected161?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                            <br/>I am exempt <b-form-checkbox v-model="selected162" name="check-button" inline="true" switch>
                                                     <b>[{{ selected162?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected163" name="check-button" inline="true" switch>
                                                     <b>[{{ selected163?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected163">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC36 - SC - Other economic or financial requirements
 */
Vue.component("v4.0.0-CC36",
                    { 
                        data(){
                            return {
 "selected164": false,
 "selected165": false,
 "selected166": false,
 "selected167": false
}
                        },
                        template: `<div>
                        <strong>Other economic or financial requirements</strong>
                        <p>Concerning the other economic or financial requirements, if any, that may have been specified in the relevant notice or in the ESPD, the economic operator declares that:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected164" name="check-button" inline="true" switch>
                                                     <b>[{{ selected164?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>undefined</em><div>
                    <b-form-group label="Select the type of requirement (Economic or Financial; Rating; Descriptive)"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE_BOOLEAN"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Description of the economic or financial requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Start date; End date"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="PERIOD"></b-form-input>
                    </b-form-group>
                    
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected165" name="check-button" inline="true" switch>
                                                     <b>[{{ selected165?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected165">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                    <b-form-group label="Rating scheme description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum rating"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY"></b-form-input>
                    </b-form-group>
                    
                                            <b-form-group label="Rating" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected166" name="check-button" inline="true" switch>
                                                     <b>[{{ selected166?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected166">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                    <b-form-group label="Descriptive requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <b-form-group label="[Description]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected167" name="check-button" inline="true" switch>
                                                     <b>[{{ selected167?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected167">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC37 - SC - For works contracts: performance of works of the specified type
 */
Vue.component("v4.0.0-CC37",
                    { 
                        data(){
                            return {
 "selected168": false,
 "selected169": false,
 "selected170": false
}
                        },
                        template: `<div>
                        <strong>For works contracts: performance of works of the specified type</strong>
                        <p>For public works contracts only: During the reference period, the economic operator has performed the following works of the specified type. Contracting authorities may require up to five years and allow experience dating from more than five years.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected168" name="check-button" inline="true" switch>
                                                     <b>[{{ selected168?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of references"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <div><em>undefined</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><em>undefined</em><div>
                                            <b-form-group label="Reference description" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Total amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Activity of the economic operator" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Specific amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Period (Start and End dates)" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <br/>Confidential <b-form-checkbox v-model="selected169" name="check-button" inline="true" switch>
                                                     <b>[{{ selected169?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <b-form-group label="Recipient name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact person name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact email" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact telephone" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group></div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected170" name="check-button" inline="true" switch>
                                                     <b>[{{ selected170?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected170">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC38 - SC - For supply contracts: performance of deliveries of the specified type
 */
Vue.component("v4.0.0-CC38",
                    { 
                        data(){
                            return {
 "selected171": false,
 "selected172": false,
 "selected173": false
}
                        },
                        template: `<div>
                        <strong>For supply contracts: performance of deliveries of the specified type</strong>
                        <p>For public supply contracts only: During the reference period, the economic operator has delivered the following principal deliveries of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected171" name="check-button" inline="true" switch>
                                                     <b>[{{ selected171?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of references"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <div><em>undefined</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><em>undefined</em><div>
                                            <b-form-group label="Reference description" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Total amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Activity of the economic operator" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Specific amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Period (Start and End dates)" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <br/>Confidential <b-form-checkbox v-model="selected172" name="check-button" inline="true" switch>
                                                     <b>[{{ selected172?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <b-form-group label="Recipient name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact person name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact email" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact telephone" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group></div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected173" name="check-button" inline="true" switch>
                                                     <b>[{{ selected173?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected173">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC39 - SC - For service contracts: performance of services of the specified type
 */
Vue.component("v4.0.0-CC39",
                    { 
                        data(){
                            return {
 "selected174": false,
 "selected175": false,
 "selected176": false
}
                        },
                        template: `<div>
                        <strong>For service contracts: performance of services of the specified type</strong>
                        <p>For public service contracts only: During the reference period, the economic operator has provided the following main services of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected174" name="check-button" inline="true" switch>
                                                     <b>[{{ selected174?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of references"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <div><em>undefined</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><em>undefined</em><div>
                                            <b-form-group label="Reference description" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Total amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Activity of the economic operator" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Specific amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Period (Start and End dates)" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <br/>Confidential <b-form-checkbox v-model="selected175" name="check-button" inline="true" switch>
                                                     <b>[{{ selected175?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <b-form-group label="Recipient name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact person name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact email" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact telephone" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group></div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected176" name="check-button" inline="true" switch>
                                                     <b>[{{ selected176?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected176">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC40 - SC - Technicians or technical bodies for quality control
 */
Vue.component("v4.0.0-CC40",
                    { 
                        data(){
                            return {
 "selected177": false,
 "selected178": false,
 "selected179": false,
 "selected180": false,
 "selected181": false
}
                        },
                        template: `<div>
                        <strong>Technicians or technical bodies for quality control</strong>
                        <p>It can call upon the following technicians or technical bodies, especially those responsible for quality control. For technicians or technical bodies not belonging directly to the economic operator's undertaking but on whose capacities the economic operator relies as set out under Part II, Section C, separate ESPD forms must be filled in.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected177" name="check-button" inline="true" switch>
                                                     <b>[{{ selected177?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected178" name="check-button" inline="true" switch>
                                                     <b>[{{ selected178?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected178">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected179" name="check-button" inline="true" switch>
                                                     <b>[{{ selected179?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected179">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><em>undefined</em><div>
                                            <b-form-group label="First name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Last name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Profession" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Experience" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Other information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="How long with EO" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected180" name="check-button" inline="true" switch>
                                                     <b>[{{ selected180?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected180">
                                        
                                            <b-form-group label="Evidence supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><em>undefined</em><div>
                                            <b-form-group label="Name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Experience area" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Other information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected181" name="check-button" inline="true" switch>
                                                     <b>[{{ selected181?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected181">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC41 - SC - In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:
 */
Vue.component("v4.0.0-CC41",
                    { 
                        data(){
                            return {
 "selected182": false,
 "selected183": false,
 "selected184": false,
 "selected185": false,
 "selected186": false
}
                        },
                        template: `<div>
                        <strong>In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:</strong>
                        <p>In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected182" name="check-button" inline="true" switch>
                                                     <b>[{{ selected182?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected183" name="check-button" inline="true" switch>
                                                     <b>[{{ selected183?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected183">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected184" name="check-button" inline="true" switch>
                                                     <b>[{{ selected184?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected184">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><em>undefined</em><div>
                                            <b-form-group label="First name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Last name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Profession" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Experience" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Other information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="How long with EO" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected185" name="check-button" inline="true" switch>
                                                     <b>[{{ selected185?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected185">
                                        
                                            <b-form-group label="Evidence supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><em>undefined</em><div>
                                            <b-form-group label="Name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Experience area" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Other information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected186" name="check-button" inline="true" switch>
                                                     <b>[{{ selected186?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected186">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC42 - SC - Technical facilities and measures for ensuring quality
 */
Vue.component("v4.0.0-CC42",
                    { 
                        data(){
                            return {
 "selected187": false,
 "selected188": false,
 "selected189": false,
 "selected190": false
}
                        },
                        template: `<div>
                        <strong>Technical facilities and measures for ensuring quality</strong>
                        <p>It uses the following technical facilities and measures for ensuring quality and its study and research facilities are as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected187" name="check-button" inline="true" switch>
                                                     <b>[{{ selected187?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected188" name="check-button" inline="true" switch>
                                                     <b>[{{ selected188?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected188">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected189" name="check-button" inline="true" switch>
                                                     <b>[{{ selected189?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected189">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected190" name="check-button" inline="true" switch>
                                                     <b>[{{ selected190?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected190">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC43 - SC - Study and research facilities
 */
Vue.component("v4.0.0-CC43",
                    { 
                        data(){
                            return {
 "selected191": false,
 "selected192": false,
 "selected193": false,
 "selected194": false
}
                        },
                        template: `<div>
                        <strong>Study and research facilities</strong>
                        <p>It uses the following study and research facilities are as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected191" name="check-button" inline="true" switch>
                                                     <b>[{{ selected191?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected192" name="check-button" inline="true" switch>
                                                     <b>[{{ selected192?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected192">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected193" name="check-button" inline="true" switch>
                                                     <b>[{{ selected193?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected193">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected194" name="check-button" inline="true" switch>
                                                     <b>[{{ selected194?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected194">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC44 - SC - Supply chain management
 */
Vue.component("v4.0.0-CC44",
                    { 
                        data(){
                            return {
 "selected195": false,
 "selected196": false,
 "selected197": false,
 "selected198": false
}
                        },
                        template: `<div>
                        <strong>Supply chain management</strong>
                        <p>It will be able to apply the following supply chain management and tracking systems when performing the contract:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected195" name="check-button" inline="true" switch>
                                                     <b>[{{ selected195?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected196" name="check-button" inline="true" switch>
                                                     <b>[{{ selected196?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected196">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected197" name="check-button" inline="true" switch>
                                                     <b>[{{ selected197?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected197">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected198" name="check-button" inline="true" switch>
                                                     <b>[{{ selected198?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected198">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC45 - SC - Environmental management measures
 */
Vue.component("v4.0.0-CC45",
                    { 
                        data(){
                            return {
 "selected199": false,
 "selected200": false,
 "selected201": false,
 "selected202": false
}
                        },
                        template: `<div>
                        <strong>Environmental management measures</strong>
                        <p>The economic operator will be able to apply the following environmental management measures when performing the contract:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected199" name="check-button" inline="true" switch>
                                                     <b>[{{ selected199?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected200" name="check-button" inline="true" switch>
                                                     <b>[{{ selected200?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected200">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected201" name="check-button" inline="true" switch>
                                                     <b>[{{ selected201?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected201">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected202" name="check-button" inline="true" switch>
                                                     <b>[{{ selected202?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected202">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC46 - SC - Tools, plant or technical equipment
 */
Vue.component("v4.0.0-CC46",
                    { 
                        data(){
                            return {
 "selected203": false,
 "selected204": false,
 "selected205": false,
 "selected206": false
}
                        },
                        template: `<div>
                        <strong>Tools, plant or technical equipment</strong>
                        <p>The following tools, plant or technical equipment will be available to it for performing the contract:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected203" name="check-button" inline="true" switch>
                                                     <b>[{{ selected203?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected204" name="check-button" inline="true" switch>
                                                     <b>[{{ selected204?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected204">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected205" name="check-button" inline="true" switch>
                                                     <b>[{{ selected205?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected205">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected206" name="check-button" inline="true" switch>
                                                     <b>[{{ selected206?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected206">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC47 - SC - Educational and professional qualifications
 */
Vue.component("v4.0.0-CC47",
                    { 
                        data(){
                            return {
 "selected207": false,
 "selected208": false,
 "selected209": false,
 "selected210": false
}
                        },
                        template: `<div>
                        <strong>Educational and professional qualifications</strong>
                        <p>The following educational and professional qualifications are held by the service provider or the contractor itself, and/or (depending on the requirements set out in the relevant notice or the in the ESPD, the relevant notice or by its managerial staff.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected207" name="check-button" inline="true" switch>
                                                     <b>[{{ selected207?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected208" name="check-button" inline="true" switch>
                                                     <b>[{{ selected208?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected208">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected209" name="check-button" inline="true" switch>
                                                     <b>[{{ selected209?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected209">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><em>undefined</em><div>
                                            <b-form-group label="First name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Last name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Please describe the educational or professional qualification" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="If possible please indicate the ESCO identifier for this qualification" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="URL"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="If possible please describe the ESCO qualification" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Qualification name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Qualification number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUAL_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Qualification issuing date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Qualification issuing body" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected210" name="check-button" inline="true" switch>
                                                     <b>[{{ selected210?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected210">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC48 - SC - Special requierements check
 */
Vue.component("v4.0.0-CC48",
                    { 
                        data(){
                            return {
 "selected211": false,
 "selected212": false,
 "selected213": false,
 "selected214": false,
 "selected215": false
}
                        },
                        template: `<div>
                        <strong>Special requierements check</strong>
                        <p>For complex products or services to be supplied or, exceptionally, for products or services which are required for a special purpose: The economic operator will allow checks to be conducted on the production capacities or the technical capacity of the economic operator and, where necessary, on the means of study and research which are available to it and on the quality control measures? The check is to be performed by the contracting authority or, in case the latter consents to this, on its behalf by a competent official body of the country in which the supplier or service provider is established.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected211" name="check-button" inline="true" switch>
                                                     <b>[{{ selected211?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected212" name="check-button" inline="true" switch>
                                                     <b>[{{ selected212?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected212">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected213" name="check-button" inline="true" switch>
                                                     <b>[{{ selected213?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected213">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Do you allow checks? <b-form-checkbox v-model="selected214" name="check-button" inline="true" switch>
                                                     <b>[{{ selected214?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected215" name="check-button" inline="true" switch>
                                                     <b>[{{ selected215?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected215">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC49 - SC - Number of managerial staff
 */
Vue.component("v4.0.0-CC49",
                    { 
                        data(){
                            return {
 "selected216": false,
 "selected217": false,
 "selected218": false,
 "selected219": false
}
                        },
                        template: `<div>
                        <strong>Number of managerial staff</strong>
                        <p>The economic operator’s number of managerial staff for the last three years were as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected216" name="check-button" inline="true" switch>
                                                     <b>[{{ selected216?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Additional information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected217" name="check-button" inline="true" switch>
                                                     <b>[{{ selected217?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected217">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected218" name="check-button" inline="true" switch>
                                                     <b>[{{ selected218?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected218">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Year" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_INTEGER"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected219" name="check-button" inline="true" switch>
                                                     <b>[{{ selected219?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected219">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC50 - SC - Average annual manpower
 */
Vue.component("v4.0.0-CC50",
                    { 
                        data(){
                            return {
 "selected220": false,
 "selected221": false,
 "selected222": false,
 "selected223": false
}
                        },
                        template: `<div>
                        <strong>Average annual manpower</strong>
                        <p>The economic operator’s average annual manpower for the last three years were as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected220" name="check-button" inline="true" switch>
                                                     <b>[{{ selected220?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Additional information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected221" name="check-button" inline="true" switch>
                                                     <b>[{{ selected221?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected221">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected222" name="check-button" inline="true" switch>
                                                     <b>[{{ selected222?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected222">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Year" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_INTEGER"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected223" name="check-button" inline="true" switch>
                                                     <b>[{{ selected223?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected223">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC51 - SC - Subcontracting proportion
 */
Vue.component("v4.0.0-CC51",
                    { 
                        data(){
                            return {
 "selected224": false,
 "selected225": false,
 "selected226": false,
 "selected227": false
}
                        },
                        template: `<div>
                        <strong>Subcontracting proportion</strong>
                        <p>The economic operator intends possibly to subcontract the following proportion (i.e. percentage) of the contract. Please note that if the economic operator has decided to subcontract a part of the contract and relies on the subcontractor’s capacities to perform that part, then please fill in a separate ESPD for such subcontractors, see Part II, Section C above.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected224" name="check-button" inline="true" switch>
                                                     <b>[{{ selected224?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected225" name="check-button" inline="true" switch>
                                                     <b>[{{ selected225?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected225">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected226" name="check-button" inline="true" switch>
                                                     <b>[{{ selected226?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected226">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                        </div>
                        <div>
                                            <b-form-group label="Please specify" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected227" name="check-button" inline="true" switch>
                                                     <b>[{{ selected227?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected227">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                    })

/**
 * Component - CC52 - SC - For supply contracts: samples, descriptions or photographs without certification of authenticity
 */
Vue.component("v4.0.0-CC52",
                    { 
                        data(){
                            return {
 "selected228": false,
 "selected229": false,
 "selected230": false,
 "selected231": false,
 "selected232": false
}
                        },
                        template: `<div>
                        <strong>For supply contracts: samples, descriptions or photographs without certification of authenticity</strong>
                        <p>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied, which do not need to be accompanied by certifications of authenticity.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected228" name="check-button" inline="true" switch>
                                                     <b>[{{ selected228?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected229" name="check-button" inline="true" switch>
                                                     <b>[{{ selected229?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected229">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected230" name="check-button" inline="true" switch>
                                                     <b>[{{ selected230?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected230">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                        </div>
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected231" name="check-button" inline="true" switch>
                                                     <b>[{{ selected231?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected232" name="check-button" inline="true" switch>
                                                     <b>[{{ selected232?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected232">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                    })

/**
 * Component - CC53 - SC - For supply contracts: samples, descriptions or photographs with certification of authenticity
 */
Vue.component("v4.0.0-CC53",
                    { 
                        data(){
                            return {
 "selected233": false,
 "selected234": false,
 "selected235": false,
 "selected236": false,
 "selected237": false
}
                        },
                        template: `<div>
                        <strong>For supply contracts: samples, descriptions or photographs with certification of authenticity</strong>
                        <p>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied and will provide certifications of authenticity where applicable.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected233" name="check-button" inline="true" switch>
                                                     <b>[{{ selected233?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected234" name="check-button" inline="true" switch>
                                                     <b>[{{ selected234?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected234">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected235" name="check-button" inline="true" switch>
                                                     <b>[{{ selected235?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected235">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                        </div>
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected236" name="check-button" inline="true" switch>
                                                     <b>[{{ selected236?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected237" name="check-button" inline="true" switch>
                                                     <b>[{{ selected237?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected237">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                    })

/**
 * Component - CC54 - SC - For supply contracts: certificates by quality control institutes
 */
Vue.component("v4.0.0-CC54",
                    { 
                        data(){
                            return {
 "selected238": false,
 "selected239": false,
 "selected240": false,
 "selected241": false,
 "selected242": false
}
                        },
                        template: `<div>
                        <strong>For supply contracts: certificates by quality control institutes</strong>
                        <p>Can the economic operator provide the required certificates drawn up by official quality control institutes or agencies of recognised competence attesting the conformity of products clearly identified by references to the technical specifications or standards, which are set out in the relevant notice or the in the ESPD, the relevant notice or ?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected238" name="check-button" inline="true" switch>
                                                     <b>[{{ selected238?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected239" name="check-button" inline="true" switch>
                                                     <b>[{{ selected239?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected239">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected240" name="check-button" inline="true" switch>
                                                     <b>[{{ selected240?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected240">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected241" name="check-button" inline="true" switch>
                                                     <b>[{{ selected241?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected241">
                                        
                                            <b-form-group label="If not, please explain why and state which other means of proof can be provided:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected242" name="check-button" inline="true" switch>
                                                     <b>[{{ selected242?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected242">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC55 - SC - Certificates by independent bodies about quality assurance standards
 */
Vue.component("v4.0.0-CC55",
                    { 
                        data(){
                            return {
 "selected243": false,
 "selected244": false,
 "selected245": false,
 "selected246": false,
 "selected247": false
}
                        },
                        template: `<div>
                        <strong>Certificates by independent bodies about quality assurance standards</strong>
                        <p>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required quality assurance standards, including accessibility for disabled persons?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected243" name="check-button" inline="true" switch>
                                                     <b>[{{ selected243?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected244" name="check-button" inline="true" switch>
                                                     <b>[{{ selected244?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected244">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected245" name="check-button" inline="true" switch>
                                                     <b>[{{ selected245?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected245">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected246" name="check-button" inline="true" switch>
                                                     <b>[{{ selected246?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected246">
                                        
                                            <b-form-group label="If not, please explain why and state which other means of proof can be provided:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected247" name="check-button" inline="true" switch>
                                                     <b>[{{ selected247?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected247">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC56 - SC - Certificates by independent bodies about environmental management systems or standards
 */
Vue.component("v4.0.0-CC56",
                    { 
                        data(){
                            return {
 "selected248": false,
 "selected249": false,
 "selected250": false,
 "selected251": false,
 "selected252": false
}
                        },
                        template: `<div>
                        <strong>Certificates by independent bodies about environmental management systems or standards</strong>
                        <p>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required environmental management systems or standards?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected248" name="check-button" inline="true" switch>
                                                     <b>[{{ selected248?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected249" name="check-button" inline="true" switch>
                                                     <b>[{{ selected249?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected249">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected250" name="check-button" inline="true" switch>
                                                     <b>[{{ selected250?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected250">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected251" name="check-button" inline="true" switch>
                                                     <b>[{{ selected251?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected251">
                                        
                                            <b-form-group label="If not, please explain why and state which other means of proof can be provided:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected252" name="check-button" inline="true" switch>
                                                     <b>[{{ selected252?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected252">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC57 - OT - Economic operator is a sheltered workshop
 */
Vue.component("v4.0.0-CC57",
                    { 
                        data(){
                            return {
 "selected253": false,
 "selected254": false
}
                        },
                        template: `<div>
                        <strong>Economic operator is a sheltered workshop</strong>
                        <p>Only in case the procurement is reserved: is the economic operator a sheltered workshop, a 'social business' or will it provide for the performance of the contract in the context of sheltered employment programmes?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected253" name="check-button" inline="true" switch>
                                                     <b>[{{ selected253?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected253">
                                        
                                            <b-form-group label="What is the corresponding percentage of disabled or disadvantaged workers?" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERCENTAGE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="If required, please provide details on whether the employees concerned belong to a specific category of disabled or disadvantaged workers?" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected254" name="check-button" inline="true" switch>
                                                     <b>[{{ selected254?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected254">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected255": false,
 "selected256": false,
 "selected257": false,
 "selected258": false,
 "selected259": false
}
                        },
                        template: `<div>
                        <strong>Economic operator registered in a pre qualification system</strong>
                        <p>Does the country of the economic operator have an official list of approved economic operators or an equivalent certificate (e.g. under a national (pre)qualification system)?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected255" name="check-button" inline="true" switch>
                                                     <b>[{{ selected255?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is the economic operator registered on an official list of approved economic operators or does it have an equivalent certificate? <b-form-checkbox v-model="selected256" name="check-button" inline="true" switch>
                                                     <b>[{{ selected256?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected256">
                                        
                                            <b-form-group label="Please provide the name of the list or certificate and the relevant registration or certification number, if applicable" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="If the certificate of registration or certification is available electronically, please state where" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="URL"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Please state the references on which the registration or certification is based, and, where applicable, the classification obtained in the official list" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Does the registration or certification cover all of the required selection criteria? <b-form-checkbox v-model="selected257" name="check-button" inline="true" switch>
                                                     <b>[{{ selected257?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            </div>
                                        </div>
                                        <div v-if="!selected256">
                                        
                                            <br/>Will the economic operator be able to provide a certificate with regard to the payment of social security contributions and taxes or provide information enabling the contracting authority or contracting entity to obtaining it directly by accessing a national database in any Member State that is available free of charge? <b-form-checkbox v-model="selected258" name="check-button" inline="true" switch>
                                                     <b>[{{ selected258?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected259" name="check-button" inline="true" switch>
                                                     <b>[{{ selected259?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected259">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div>
                                        <div v-if="!selected255">
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
 "selected260": false,
 "selected261": false
}
                        },
                        template: `<div>
                        <strong>Economic Operator together with others</strong>
                        <p>Is the economic operator participating in the procurement procedure together with others?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected260" name="check-button" inline="true" switch>
                                                     <b>[{{ selected260?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected260">
                                        
                                            <b-form-group label="Please indicate the role of the economic operator in the group (leader, responsible for specific tasks...)" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="CODE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Please identify the other economic operators participating in the procurement procedure together" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Where applicable, name of the participating group:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected261" name="check-button" inline="true" switch>
                                                     <b>[{{ selected261?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected261">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected262": false,
 "selected263": false
}
                        },
                        template: `<div>
                        <strong>Relied on entities</strong>
                        <p>Does the economic operator rely on the capacities of other entities in order to meet the selection criteria set out under Part IV and the criteria and rules (if any) set out under Part V below?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected262" name="check-button" inline="true" switch>
                                                     <b>[{{ selected262?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected262">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected263" name="check-button" inline="true" switch>
                                                     <b>[{{ selected263?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected263">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected264": false,
 "selected265": false
}
                        },
                        template: `<div>
                        <strong>Not relied on entities</strong>
                        <p>Does the economic operator intend to subcontract any share of the contract to third parties?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected264" name="check-button" inline="true" switch>
                                                     <b>[{{ selected264?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected264">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the subcontractor" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected265" name="check-button" inline="true" switch>
                                                     <b>[{{ selected265?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected265">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected266": false,
 "selected267": false
}
                        },
                        template: `<div>
                        <strong>Reduction of the number of qualified candidates</strong>
                        <p>The economic operator declares that It meets the objective and non discriminatory criteria or rules to be applied in order to limit the number of candidates in the following way:</p>
                        <em>In case certain certificates or other forms of documentary evidence are required, please indicate for each whether the economic operator has the required documents</em>
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected266" name="check-button" inline="true" switch>
                                                     <b>[{{ selected266?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected266">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected267" name="check-button" inline="true" switch>
                                                     <b>[{{ selected267?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected267">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected268": false,
 "selected269": false
}
                        },
                        template: `<div>
                        <strong>Economic Operator Micro, Small or Medium-sized Enterprise</strong>
                        <p>Is the economic operator a Micro, a Small or Medium-sized Enterprise?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected268" name="check-button" inline="true" switch>
                                                     <b>[{{ selected268?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected268">
                                        
                                            <b-form-group label="Number of employees" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_INTEGER"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Turnover" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected269" name="check-button" inline="true" switch>
                                                     <b>[{{ selected269?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected269">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                    })

/**
 * Component - CC1 - EG - Participation in a criminal organisation
 */
Vue.component("v4.0.0-CC1",
                    { 
                        data(){
                            return {
 "selected01": false,
 "selected02": false,
 "selected03": false,
 "selected04": false,
 "selected05": false,
 "selected06": false
}
                        },
                        template: `<div>
                        <strong>Participation in a criminal organisation</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for participation in a criminal organisation, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 2 of Council Framework Decision 2008/841/JHA of 24 October 2008 on the fight against organised crime (OJ L 300, 11.11.2008, p. 42).</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected01" name="check-button" inline="true" switch>
                                                     <b>[{{ selected01?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected02" name="check-button" inline="true" switch>
                                                     <b>[{{ selected02?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected02">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected03" name="check-button" inline="true" switch>
                                                     <b>[{{ selected03?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected03">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected04" name="check-button" inline="true" switch>
                                                     <b>[{{ selected04?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected04">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                        </div>
                                        <div v-if="selected02">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected05" name="check-button" inline="true" switch>
                                                     <b>[{{ selected05?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected05">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected06" name="check-button" inline="true" switch>
                                                     <b>[{{ selected06?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected06">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected07": false,
 "selected08": false,
 "selected09": false,
 "selected10": false
}
                        },
                        template: `<div>
                        <strong>Corruption</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for corruption, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 3 of the Convention on the fight against corruption involving officials of the European Communities or officials of Member States of the European Union, OJ C 195, 25.6.1997, p. 1, and in Article 2(1) of Council Framework Decision 2003/568/JHA of 22 July 2003 on combating corruption in the private sector (OJ L 192, 31.7.2003, p. 54). This exclusion ground also includes corruption as defined in the national law of the contracting authority (contracting entity) or the economic operator.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected07" name="check-button" inline="true" switch>
                                                     <b>[{{ selected07?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected08" name="check-button" inline="true" switch>
                                                     <b>[{{ selected08?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected08">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected09" name="check-button" inline="true" switch>
                                                     <b>[{{ selected09?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected09">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected10" name="check-button" inline="true" switch>
                                                     <b>[{{ selected10?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected10">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected11": false,
 "selected12": false,
 "selected13": false,
 "selected14": false
}
                        },
                        template: `<div>
                        <strong>Fraud</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for fraud, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? Within the meaning of Article 1 of the Convention on the protection of the European Communities' financial interests (OJ C 316, 27.11.1995, p. 48).</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected11" name="check-button" inline="true" switch>
                                                     <b>[{{ selected11?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected12" name="check-button" inline="true" switch>
                                                     <b>[{{ selected12?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected12">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected13" name="check-button" inline="true" switch>
                                                     <b>[{{ selected13?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected13">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected14" name="check-button" inline="true" switch>
                                                     <b>[{{ selected14?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected14">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected15": false,
 "selected16": false,
 "selected17": false,
 "selected18": false
}
                        },
                        template: `<div>
                        <strong>Terrorist offences or offences linked to terrorist activities</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for terrorist offences or offences linked to terrorist activities, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Articles 1 and 3 of Council Framework Decision of 13 June 2002 on combating terrorism (OJ L 164, 22.6.2002, p. 3). This exclusion ground also includes inciting or aiding or abetting or attempting to commit an offence, as referred to in Article 4 of that Framework Decision.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected15" name="check-button" inline="true" switch>
                                                     <b>[{{ selected15?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected16" name="check-button" inline="true" switch>
                                                     <b>[{{ selected16?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected16">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected17" name="check-button" inline="true" switch>
                                                     <b>[{{ selected17?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected17">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected18" name="check-button" inline="true" switch>
                                                     <b>[{{ selected18?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected18">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected19": false,
 "selected20": false,
 "selected21": false,
 "selected22": false
}
                        },
                        template: `<div>
                        <strong>Money laundering or terrorist financing</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for money laundering or terrorist financing, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 1 of Directive 2005/60/EC of the European Parliament and of the Council of 26 October 2005 on the prevention of the use of the financial system for the purpose of money laundering and terrorist financing (OJ L 309, 25.11.2005, p. 15).</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected19" name="check-button" inline="true" switch>
                                                     <b>[{{ selected19?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected20" name="check-button" inline="true" switch>
                                                     <b>[{{ selected20?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected20">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected21" name="check-button" inline="true" switch>
                                                     <b>[{{ selected21?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected21">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected22" name="check-button" inline="true" switch>
                                                     <b>[{{ selected22?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected22">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected23": false,
 "selected24": false,
 "selected25": false,
 "selected26": false
}
                        },
                        template: `<div>
                        <strong>Child labour and other forms of trafficking in human beings</strong>
                        <p>Has the economic operator itself or any person who is a member of its administrative, management or supervisory body or has powers of representation, decision or control therein been the subject of a conviction by final judgment for child labour and other forms of trafficking in human beings, by a conviction rendered at the most five years ago or in which an exclusion period set out directly in the conviction continues to be applicable? As defined in Article 2 of Directive 2011/36/EU of the European Parliament and of the Council of 5 April 2011 on preventing and combating trafficking in human beings and protecting its victims, and replacing Council Framework Decision 2002/629/JHA (OJ L 101, 15.4.2011, p. 1).</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected23" name="check-button" inline="true" switch>
                                                     <b>[{{ selected23?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected24" name="check-button" inline="true" switch>
                                                     <b>[{{ selected24?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected24">
                                        
                                            <b-form-group label="Date of conviction" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Reason" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Who has been convicted" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected25" name="check-button" inline="true" switch>
                                                     <b>[{{ selected25?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected25">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected26" name="check-button" inline="true" switch>
                                                     <b>[{{ selected26?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected26">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
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
 "selected27": false,
 "selected28": false,
 "selected29": false,
 "selected30": false,
 "selected31": false,
 "selected32": false
}
                        },
                        template: `<div>
                        <strong>Payment of taxes</strong>
                        <p>Has the economic operator breached its obligations relating to the payment of taxes, both in the country in which it is established and in Member State of the contracting authority or contracting entity if other than the country of establishment?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected27" name="check-button" inline="true" switch>
                                                     <b>[{{ selected27?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="Minimum Amount Threshold"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Additional Information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Your answer <b-form-checkbox v-model="selected28" name="check-button" inline="true" switch>
                                                     <b>[{{ selected28?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected28">
                                        
                                            <b-form-group label="Country or member state concerned" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="CODE_COUNTRY"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount concerned" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Has this breach of obligations been established by means other than a judicial or administrative decision? <b-form-checkbox v-model="selected29" name="check-button" inline="true" switch>
                                                     <b>[{{ selected29?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected29">
                                        
                                            <b-form-group label="Please describe which means were used" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected29">
                                        
                                            <br/>If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? <b-form-checkbox v-model="selected30" name="check-button" inline="true" switch>
                                                     <b>[{{ selected30?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected30">
                                        
                                            <b-form-group label="Please indicate the date of conviction or decision" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="In case of a conviction insofar as established directly therein, the length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the taxes contributions due, including, where applicable, any interest accrued or fines? <b-form-checkbox v-model="selected31" name="check-button" inline="true" switch>
                                                     <b>[{{ selected31?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected31">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected32" name="check-button" inline="true" switch>
                                                     <b>[{{ selected32?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected32">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected33": false,
 "selected34": false,
 "selected35": false,
 "selected36": false,
 "selected37": false,
 "selected38": false
}
                        },
                        template: `<div>
                        <strong>Payment of social security contributions</strong>
                        <p>Has the economic operator breached its obligations relating to the payment of social security contributions, both in the country in which it is established and in Member State of the contracting authority or contracting entity if other than the country of establishment?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected33" name="check-button" inline="true" switch>
                                                     <b>[{{ selected33?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="Minimum Amount Threshold"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Additional Information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Your answer <b-form-checkbox v-model="selected34" name="check-button" inline="true" switch>
                                                     <b>[{{ selected34?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected34">
                                        
                                            <b-form-group label="Country or member state concerned" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="CODE_COUNTRY"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount concerned" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Has this breach of obligations been established by means other than a judicial or administrative decision? <b-form-checkbox v-model="selected35" name="check-button" inline="true" switch>
                                                     <b>[{{ selected35?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected35">
                                        
                                            <b-form-group label="Please describe which means were used" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected35">
                                        
                                            <br/>If this breach of obligations was established through a judicial or administrative decision, was this decision final and binding? <b-form-checkbox v-model="selected36" name="check-button" inline="true" switch>
                                                     <b>[{{ selected36?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected36">
                                        
                                            <b-form-group label="Please indicate the date of conviction or decision" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="In case of a conviction insofar as established directly therein, the length of the period of exclusion" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Has the economic operator fulfilled its obligations by paying or entering into a binding arrangement with a view to paying the social security contributions due, including, where applicable, any interest accrued or fines? <b-form-checkbox v-model="selected37" name="check-button" inline="true" switch>
                                                     <b>[{{ selected37?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected37">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected38" name="check-button" inline="true" switch>
                                                     <b>[{{ selected38?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected38">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected39": false,
 "selected40": false,
 "selected41": false,
 "selected42": false
}
                        },
                        template: `<div>
                        <strong>Breaching of obligations in the fields of environmental law</strong>
                        <p>Has the economic operator, to its knowledge, breached its obligations in the fields of environmental law? As referred to for the purposes of this procurement in national law, in the ESPD, the relevant notice or the in the ESPD, the relevant notice or , in Article 18(2) of Directive 2014/24/EU or in the ESPD.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected39" name="check-button" inline="true" switch>
                                                     <b>[{{ selected39?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected40" name="check-button" inline="true" switch>
                                                     <b>[{{ selected40?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected40">
                                        
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected41" name="check-button" inline="true" switch>
                                                     <b>[{{ selected41?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected41">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected42" name="check-button" inline="true" switch>
                                                     <b>[{{ selected42?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected42">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected43": false,
 "selected44": false,
 "selected45": false,
 "selected46": false
}
                        },
                        template: `<div>
                        <strong>Breaching of obligations in the fields of social law</strong>
                        <p>Has the economic operator, to its knowledge, breached its obligations in the fields of social law? As referred to for the purposes of this procurement in national law, in the ESPD, the relevant notice or the in the ESPD, the relevant notice or in Article 18(2) of Directive 2014/24/EU.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected43" name="check-button" inline="true" switch>
                                                     <b>[{{ selected43?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected44" name="check-button" inline="true" switch>
                                                     <b>[{{ selected44?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected44">
                                        
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected45" name="check-button" inline="true" switch>
                                                     <b>[{{ selected45?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected45">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected46" name="check-button" inline="true" switch>
                                                     <b>[{{ selected46?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected46">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected47": false,
 "selected48": false,
 "selected49": false,
 "selected50": false
}
                        },
                        template: `<div>
                        <strong>Breaching of obligations in the fields of labour law</strong>
                        <p>Has the economic operator, to its knowledge, breached its obligations in the fields of labour law? As referred to for the purposes of this procurement in national law, in the relevant notice or the in the ESPD, the relevant notice or in Article 18(2) of Directive 2014/24/EU.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected47" name="check-button" inline="true" switch>
                                                     <b>[{{ selected47?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected48" name="check-button" inline="true" switch>
                                                     <b>[{{ selected48?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected48">
                                        
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected49" name="check-button" inline="true" switch>
                                                     <b>[{{ selected49?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected49">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected50" name="check-button" inline="true" switch>
                                                     <b>[{{ selected50?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected50">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected51": false,
 "selected52": false,
 "selected53": false
}
                        },
                        template: `<div>
                        <strong>Bankruptcy</strong>
                        <p>Is the economic operator bankrupt? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected51" name="check-button" inline="true" switch>
                                                     <b>[{{ selected51?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected52" name="check-button" inline="true" switch>
                                                     <b>[{{ selected52?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected52">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected53" name="check-button" inline="true" switch>
                                                     <b>[{{ selected53?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected53">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected54": false,
 "selected55": false,
 "selected56": false
}
                        },
                        template: `<div>
                        <strong>Insolvency</strong>
                        <p>Is the economic operator the subject of insolvency or winding-up? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected54" name="check-button" inline="true" switch>
                                                     <b>[{{ selected54?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected55" name="check-button" inline="true" switch>
                                                     <b>[{{ selected55?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected55">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected56" name="check-button" inline="true" switch>
                                                     <b>[{{ selected56?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected56">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected57": false,
 "selected58": false,
 "selected59": false
}
                        },
                        template: `<div>
                        <strong>Arrangement with creditors</strong>
                        <p>Is the economic operator in arrangement with creditors? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected57" name="check-button" inline="true" switch>
                                                     <b>[{{ selected57?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected58" name="check-button" inline="true" switch>
                                                     <b>[{{ selected58?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected58">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected59" name="check-button" inline="true" switch>
                                                     <b>[{{ selected59?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected59">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected60": false,
 "selected61": false,
 "selected62": false
}
                        },
                        template: `<div>
                        <strong>Analogous situation like bankruptcy under national law</strong>
                        <p>Is the economic operator in any analogous situation like bankruptcy arising from a similar procedure under national laws and regulations? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected60" name="check-button" inline="true" switch>
                                                     <b>[{{ selected60?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected61" name="check-button" inline="true" switch>
                                                     <b>[{{ selected61?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected61">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected62" name="check-button" inline="true" switch>
                                                     <b>[{{ selected62?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected62">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected63": false,
 "selected64": false,
 "selected65": false
}
                        },
                        template: `<div>
                        <strong>Assets being administered by liquidator</strong>
                        <p>Are the assets of the economic operator being administered by a liquidator or by the court? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected63" name="check-button" inline="true" switch>
                                                     <b>[{{ selected63?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected64" name="check-button" inline="true" switch>
                                                     <b>[{{ selected64?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected64">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected65" name="check-button" inline="true" switch>
                                                     <b>[{{ selected65?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected65">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected66": false,
 "selected67": false,
 "selected68": false
}
                        },
                        template: `<div>
                        <strong>Business activities are suspended</strong>
                        <p>Are the business activities of the economic operator suspended? This information needs not be given if exclusion of economic operators in this case has been made mandatory under the applicable national law without any possibility of derogation where the economic operator is nevertheless able to perform the contract.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected66" name="check-button" inline="true" switch>
                                                     <b>[{{ selected66?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected67" name="check-button" inline="true" switch>
                                                     <b>[{{ selected67?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected67">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Indicate reasons for being nevertheless to perform the contract" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected68" name="check-button" inline="true" switch>
                                                     <b>[{{ selected68?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected68">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected69": false,
 "selected70": false,
 "selected71": false,
 "selected72": false
}
                        },
                        template: `<div>
                        <strong>Guilty of grave professional misconduct</strong>
                        <p>Is the economic operator guilty of grave professional misconduct? Where applicable, see definitions in national law, the relevant notice or the procurement documents.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected69" name="check-button" inline="true" switch>
                                                     <b>[{{ selected69?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected70" name="check-button" inline="true" switch>
                                                     <b>[{{ selected70?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected70">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability <b-form-checkbox v-model="selected71" name="check-button" inline="true" switch>
                                                     <b>[{{ selected71?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected71">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected72" name="check-button" inline="true" switch>
                                                     <b>[{{ selected72?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected72">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected73": false,
 "selected74": false,
 "selected75": false,
 "selected76": false
}
                        },
                        template: `<div>
                        <strong>Agreements with other economic operators aimed at distorting competition</strong>
                        <p>Has the economic operator entered into agreements with other economic operators aimed at distorting competition?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected73" name="check-button" inline="true" switch>
                                                     <b>[{{ selected73?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected74" name="check-button" inline="true" switch>
                                                     <b>[{{ selected74?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected74">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability <b-form-checkbox v-model="selected75" name="check-button" inline="true" switch>
                                                     <b>[{{ selected75?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected75">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected76" name="check-button" inline="true" switch>
                                                     <b>[{{ selected76?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected76">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected77": false,
 "selected78": false,
 "selected79": false
}
                        },
                        template: `<div>
                        <strong>Conflict of interest due to its participation in the procurement procedure</strong>
                        <p>Is the economic operator aware of any conflict of interest, as indicated in national law, the relevant notice or in the ESPD, the relevant notice or due to its participation in the procurement procedure?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected77" name="check-button" inline="true" switch>
                                                     <b>[{{ selected77?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected78" name="check-button" inline="true" switch>
                                                     <b>[{{ selected78?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected78">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected79" name="check-button" inline="true" switch>
                                                     <b>[{{ selected79?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected79">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected80": false,
 "selected81": false,
 "selected82": false
}
                        },
                        template: `<div>
                        <strong>Direct or indirect involvement in the preparation of this procurement procedure</strong>
                        <p>Has the economic operator or an undertaking related to it advised the contracting authority or contracting entity or otherwise been involved in the preparation of the procurement procedure?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected80" name="check-button" inline="true" switch>
                                                     <b>[{{ selected80?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected81" name="check-button" inline="true" switch>
                                                     <b>[{{ selected81?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected81">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected82" name="check-button" inline="true" switch>
                                                     <b>[{{ selected82?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected82">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected83": false,
 "selected84": false,
 "selected85": false,
 "selected86": false
}
                        },
                        template: `<div>
                        <strong>Early termination, damages or other comparable sanctions</strong>
                        <p>Has the economic operator experienced that a prior public contract, a prior contract with a contracting entity or a prior concession contract was terminated early, or that damages or other comparable sanctions were imposed in connection with that prior contract?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected83" name="check-button" inline="true" switch>
                                                     <b>[{{ selected83?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected84" name="check-button" inline="true" switch>
                                                     <b>[{{ selected84?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected84">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Have you taken measures to demonstrate your reliability (Self-Cleaning)? <b-form-checkbox v-model="selected85" name="check-button" inline="true" switch>
                                                     <b>[{{ selected85?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected85">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected86" name="check-button" inline="true" switch>
                                                     <b>[{{ selected86?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected86">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected87": false,
 "selected88": false,
 "selected89": false
}
                        },
                        template: `<div>
                        <strong>Guilty of misrepresentation, withheld information, unable to provide required documents and obtained confidential information of this procedure</strong>
                        <p>Can the economic operator confirm that:</p>
                        <em>a) It has been guilty of serious misrepresentation in supplying the information required for the verification of the absence of grounds for exclusion or the fulfilment of the selection criteria,</em><em>b) It has withheld such information,</em><em>c) It has not been able, without delay, to submit the supporting documents required by a contracting authority or contracting entity, and</em><em>d) It has undertaken to unduly influence the decision making process of the contracting authority or contracting entity, to obtain confidential information that may confer upon it undue advantages in the procurement procedure or to negligently provide misleading information that may have a material influence on decisions concerning exclusion, selection or award?</em><div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected87" name="check-button" inline="true" switch>
                                                     <b>[{{ selected87?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Your answer <b-form-checkbox v-model="selected88" name="check-button" inline="true" switch>
                                                     <b>[{{ selected88?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected89" name="check-button" inline="true" switch>
                                                     <b>[{{ selected89?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected89">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected90": false,
 "selected91": false
}
                        },
                        template: `<div>
                        <strong>Purely national exclusion grounds</strong>
                        <p>Other exclusion grounds that may be foreseen in the national legislation of the contracting authority's or contracting entity's Member State. Has the economic operator breached its obligations relating to the purely national grounds of exclusion, which are specified in the relevant notice or in the procurement documents?</p>
                        <em>LEGISLATION</em>
                        <div><em>undefined</em><div><em>[Text describing the national criterion]</em><em>[Type of evidence from e-Certis]</em>
                                            <br/>Your answer? <b-form-checkbox v-model="selected90" name="check-button" inline="true" switch>
                                                     <b>[{{ selected90?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected91" name="check-button" inline="true" switch>
                                                     <b>[{{ selected91?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected91">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div>
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
 "selected92": false,
 "selected93": false,
 "selected94": false,
 "selected95": false,
 "selected96": false,
 "selected97": false,
 "selected98": false,
 "selected99": false,
 "selected100": false,
 "selected101": false,
 "selected102": false,
 "selected103": false,
 "selected104": false,
 "selected105": false,
 "selected106": false,
 "selected107": false,
 "selected108": false
}
                        },
                        template: `<div>
                        <strong>Enrolment in a relevant professional register</strong>
                        <p>It is enrolled in relevant professional registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected92" name="check-button" inline="true" switch>
                                                     <b>[{{ selected92?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected93" name="check-button" inline="true" switch>
                                                     <b>[{{ selected93?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected93">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected94" name="check-button" inline="true" switch>
                                                     <b>[{{ selected94?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected94">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected95" name="check-button" inline="true" switch>
                                                     <b>[{{ selected95?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected95">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected95">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected96" name="check-button" inline="true" switch>
                                                     <b>[{{ selected96?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected96">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                    <b-form-group label="occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected97" name="check-button" inline="true" switch>
                                                     <b>[{{ selected97?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected97">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected98" name="check-button" inline="true" switch>
                                                     <b>[{{ selected98?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected98">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected99" name="check-button" inline="true" switch>
                                                     <b>[{{ selected99?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected99">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected99">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected100" name="check-button" inline="true" switch>
                                                     <b>[{{ selected100?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected100">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected101" name="check-button" inline="true" switch>
                                                     <b>[{{ selected101?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected101">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected102" name="check-button" inline="true" switch>
                                                     <b>[{{ selected102?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected102">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected103" name="check-button" inline="true" switch>
                                                     <b>[{{ selected103?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected103">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected103">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected104" name="check-button" inline="true" switch>
                                                     <b>[{{ selected104?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected104">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                    <b-form-group label="occupation"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected105" name="check-button" inline="true" switch>
                                                     <b>[{{ selected105?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected105">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected106" name="check-button" inline="true" switch>
                                                     <b>[{{ selected106?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected106">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected107" name="check-button" inline="true" switch>
                                                     <b>[{{ selected107?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected107">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected107">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected108" name="check-button" inline="true" switch>
                                                     <b>[{{ selected108?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected108">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC26 - SC - Enrolment in a trade register
 */
Vue.component("v4.0.0-CC26",
                    { 
                        data(){
                            return {
 "selected109": false,
 "selected110": false,
 "selected111": false,
 "selected112": false,
 "selected113": false
}
                        },
                        template: `<div>
                        <strong>Enrolment in a trade register</strong>
                        <p>It is enrolled in trade registers kept in the Member State of its establishment as described in Annex XI of Directive 2014/24/EU; economic operators from certain Member States may have to comply with other requirements set out in that Annex.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected109" name="check-button" inline="true" switch>
                                                     <b>[{{ selected109?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected110" name="check-button" inline="true" switch>
                                                     <b>[{{ selected110?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected110">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected111" name="check-button" inline="true" switch>
                                                     <b>[{{ selected111?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected111">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected112" name="check-button" inline="true" switch>
                                                     <b>[{{ selected112?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected112">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected112">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected113" name="check-button" inline="true" switch>
                                                     <b>[{{ selected113?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected113">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC27 - SC - For service contracts: authorisation of particular organisation needed
 */
Vue.component("v4.0.0-CC27",
                    { 
                        data(){
                            return {
 "selected114": false,
 "selected115": false,
 "selected116": false,
 "selected117": false,
 "selected118": false,
 "selected119": false
}
                        },
                        template: `<div>
                        <strong>For service contracts: authorisation of particular organisation needed</strong>
                        <p>Is a particular authorisation of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected114" name="check-button" inline="true" switch>
                                                     <b>[{{ selected114?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected114">
                                        
                                            <b-form-group label="If yes, please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <br/>Indicate whether the economic operator has it <b-form-checkbox v-model="selected115" name="check-button" inline="true" switch>
                                                     <b>[{{ selected115?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        </div>
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected116" name="check-button" inline="true" switch>
                                                     <b>[{{ selected116?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected116">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected117" name="check-button" inline="true" switch>
                                                     <b>[{{ selected117?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected117">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected118" name="check-button" inline="true" switch>
                                                     <b>[{{ selected118?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected118">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected118">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected119" name="check-button" inline="true" switch>
                                                     <b>[{{ selected119?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected119">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC28 - SC - For service contracts: membership of particular organisation needed
 */
Vue.component("v4.0.0-CC28",
                    { 
                        data(){
                            return {
 "selected120": false,
 "selected121": false,
 "selected122": false,
 "selected123": false,
 "selected124": false,
 "selected125": false
}
                        },
                        template: `<div>
                        <strong>For service contracts: membership of particular organisation needed</strong>
                        <p>Is a particular membership of a particular organisation needed in order to be able to perform the service in question in the country of establishment of the economic operator?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected120" name="check-button" inline="true" switch>
                                                     <b>[{{ selected120?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected120">
                                        
                                            <b-form-group label="If yes, please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <br/>Indicate whether the economic operator has it <b-form-checkbox v-model="selected121" name="check-button" inline="true" switch>
                                                     <b>[{{ selected121?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        </div>
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Register name"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="URL"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="URL"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected122" name="check-button" inline="true" switch>
                                                     <b>[{{ selected122?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected122">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected123" name="check-button" inline="true" switch>
                                                     <b>[{{ selected123?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected123">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your Answer <b-form-checkbox v-model="selected124" name="check-button" inline="true" switch>
                                                     <b>[{{ selected124?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected124">
                                        
                                            <b-form-group label="Registration number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div v-if="!selected124">
                                        
                                            <b-form-group label="Reasons why your are not registered" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected125" name="check-button" inline="true" switch>
                                                     <b>[{{ selected125?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected125">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC29 - SC - General yearly turnover
 */
Vue.component("v4.0.0-CC29",
                    { 
                        data(){
                            return {
 "selected126": false,
 "selected127": false,
 "selected128": false,
 "selected129": false,
 "selected130": false
}
                        },
                        template: `<div>
                        <strong>General yearly turnover</strong>
                        <p>Its general yearly turnover for the number of financial years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected126" name="check-button" inline="true" switch>
                                                     <b>[{{ selected126?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Threshold per year"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE_BOOLEAN"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected127" name="check-button" inline="true" switch>
                                                     <b>[{{ selected127?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected127">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected128" name="check-button" inline="true" switch>
                                                     <b>[{{ selected128?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected128">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected129" name="check-button" inline="true" switch>
                                                     <b>[{{ selected129?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected129">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected130" name="check-button" inline="true" switch>
                                                     <b>[{{ selected130?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected130">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC30 - SC - Average yearly turnover
 */
Vue.component("v4.0.0-CC30",
                    { 
                        data(){
                            return {
 "selected131": false,
 "selected132": false,
 "selected133": false,
 "selected134": false,
 "selected135": false
}
                        },
                        template: `<div>
                        <strong>Average yearly turnover</strong>
                        <p>Its average yearly turnover for the number of years required in the relevant notice, the procurement documents or the ESPD is as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected131" name="check-button" inline="true" switch>
                                                     <b>[{{ selected131?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected132" name="check-button" inline="true" switch>
                                                     <b>[{{ selected132?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected132">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected133" name="check-button" inline="true" switch>
                                                     <b>[{{ selected133?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected133">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Average for the required period" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Additional information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected134" name="check-button" inline="true" switch>
                                                     <b>[{{ selected134?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected134">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected135" name="check-button" inline="true" switch>
                                                     <b>[{{ selected135?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected135">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC31 - SC - Specific average turnover
 */
Vue.component("v4.0.0-CC31",
                    { 
                        data(){
                            return {
 "selected136": false,
 "selected137": false,
 "selected138": false,
 "selected139": false,
 "selected140": false
}
                        },
                        template: `<div>
                        <strong>Specific average turnover</strong>
                        <p>Its specific average yearly turnover in the business area covered by the contract for the number of years required in the relevant notice, the in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected136" name="check-button" inline="true" switch>
                                                     <b>[{{ selected136?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Business domain description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected137" name="check-button" inline="true" switch>
                                                     <b>[{{ selected137?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected137">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected138" name="check-button" inline="true" switch>
                                                     <b>[{{ selected138?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected138">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected139" name="check-button" inline="true" switch>
                                                     <b>[{{ selected139?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected139">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected140" name="check-button" inline="true" switch>
                                                     <b>[{{ selected140?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected140">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC32 - SC - Specific yearly turnover
 */
Vue.component("v4.0.0-CC32",
                    { 
                        data(){
                            return {
 "selected141": false,
 "selected142": false,
 "selected143": false,
 "selected144": false,
 "selected145": false,
 "selected146": false,
 "selected147": false,
 "selected148": false,
 "selected149": false,
 "selected150": false,
 "selected151": false,
 "selected152": false,
 "selected153": false,
 "selected154": false
}
                        },
                        template: `<div>
                        <strong>Specific yearly turnover</strong>
                        <p>Its specific yearly turnover in the business area covered by the contract for the number of financial years required in the relevant notice, in the ESPD, the relevant notice or the ESPD is as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected141" name="check-button" inline="true" switch>
                                                     <b>[{{ selected141?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Business domain description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected142" name="check-button" inline="true" switch>
                                                     <b>[{{ selected142?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected142">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected143" name="check-button" inline="true" switch>
                                                     <b>[{{ selected143?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected143">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected144" name="check-button" inline="true" switch>
                                                     <b>[{{ selected144?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected144">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected145" name="check-button" inline="true" switch>
                                                     <b>[{{ selected145?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected145">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected146" name="check-button" inline="true" switch>
                                                     <b>[{{ selected146?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected146">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected147" name="check-button" inline="true" switch>
                                                     <b>[{{ selected147?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected147">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Number of fiscal years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Business domain description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected148" name="check-button" inline="true" switch>
                                                     <b>[{{ selected148?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected148">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected149" name="check-button" inline="true" switch>
                                                     <b>[{{ selected149?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected149">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected150" name="check-button" inline="true" switch>
                                                     <b>[{{ selected150?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected150">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected151" name="check-button" inline="true" switch>
                                                     <b>[{{ selected151?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected151">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected152" name="check-button" inline="true" switch>
                                                     <b>[{{ selected152?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected152">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="Start date; End date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected153" name="check-button" inline="true" switch>
                                                     <b>[{{ selected153?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected153">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                                            <b-form-group label="In case the information concerning turnover (general or specific) is not available for the entire period required, please state the date on which the economic operator was set up or started trading:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected154" name="check-button" inline="true" switch>
                                                     <b>[{{ selected154?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected154">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC34 - SC - Financial ratio
 */
Vue.component("v4.0.0-CC34",
                    { 
                        data(){
                            return {
 "selected155": false,
 "selected156": false,
 "selected157": false
}
                        },
                        template: `<div>
                        <strong>Financial ratio</strong>
                        <p>Concerning the financial ratios specified in the relevant notice, the in the ESPD, the relevant notice or the ESPD, the economic operator declares that the actual values for the required ratios are as follows:</p>
                        <em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Select the periods applicable for all ratios"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="PERIOD"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Ratio Type"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Definition"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum ratio requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY"></b-form-input>
                    </b-form-group>
                    </div>
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected155" name="check-button" inline="true" switch>
                                                     <b>[{{ selected155?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected155">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected156" name="check-button" inline="true" switch>
                                                     <b>[{{ selected156?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected156">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please provide your ratio" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected157" name="check-button" inline="true" switch>
                                                     <b>[{{ selected157?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected157">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC35 - SC - Professional risk indemnity insurance
 */
Vue.component("v4.0.0-CC35",
                    { 
                        data(){
                            return {
 "selected158": false,
 "selected159": false,
 "selected160": false,
 "selected161": false,
 "selected162": false,
 "selected163": false
}
                        },
                        template: `<div>
                        <strong>Professional risk indemnity insurance</strong>
                        <p>The insured amount in its professional risk indemnity insurance is the following:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected158" name="check-button" inline="true" switch>
                                                     <b>[{{ selected158?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Type of insurance"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected159" name="check-button" inline="true" switch>
                                                     <b>[{{ selected159?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected159">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected160" name="check-button" inline="true" switch>
                                                     <b>[{{ selected160?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected160">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <br/>As an EO I will commit to obtain the minimum amount required <b-form-checkbox v-model="selected161" name="check-button" inline="true" switch>
                                                     <b>[{{ selected161?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                            <br/>I am exempt <b-form-checkbox v-model="selected162" name="check-button" inline="true" switch>
                                                     <b>[{{ selected162?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected163" name="check-button" inline="true" switch>
                                                     <b>[{{ selected163?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected163">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC36 - SC - Other economic or financial requirements
 */
Vue.component("v4.0.0-CC36",
                    { 
                        data(){
                            return {
 "selected164": false,
 "selected165": false,
 "selected166": false,
 "selected167": false
}
                        },
                        template: `<div>
                        <strong>Other economic or financial requirements</strong>
                        <p>Concerning the other economic or financial requirements, if any, that may have been specified in the relevant notice or in the ESPD, the economic operator declares that:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected164" name="check-button" inline="true" switch>
                                                     <b>[{{ selected164?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>undefined</em><div>
                    <b-form-group label="Select the type of requirement (Economic or Financial; Rating; Descriptive)"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="CODE_BOOLEAN"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Description of the economic or financial requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum amount"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_AMOUNT"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Start date; End date"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="PERIOD"></b-form-input>
                    </b-form-group>
                    
                                            <b-form-group label="Amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected165" name="check-button" inline="true" switch>
                                                     <b>[{{ selected165?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected165">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                    <b-form-group label="Rating scheme description"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Minimum rating"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY"></b-form-input>
                    </b-form-group>
                    
                                            <b-form-group label="Rating" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected166" name="check-button" inline="true" switch>
                                                     <b>[{{ selected166?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected166">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><div>
                    <b-form-group label="Descriptive requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <b-form-group label="[Description]" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected167" name="check-button" inline="true" switch>
                                                     <b>[{{ selected167?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected167">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC37 - SC - For works contracts: performance of works of the specified type
 */
Vue.component("v4.0.0-CC37",
                    { 
                        data(){
                            return {
 "selected168": false,
 "selected169": false,
 "selected170": false
}
                        },
                        template: `<div>
                        <strong>For works contracts: performance of works of the specified type</strong>
                        <p>For public works contracts only: During the reference period, the economic operator has performed the following works of the specified type. Contracting authorities may require up to five years and allow experience dating from more than five years.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected168" name="check-button" inline="true" switch>
                                                     <b>[{{ selected168?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of references"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <div><em>undefined</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><em>undefined</em><div>
                                            <b-form-group label="Reference description" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Total amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Activity of the economic operator" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Specific amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Period (Start and End dates)" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <br/>Confidential <b-form-checkbox v-model="selected169" name="check-button" inline="true" switch>
                                                     <b>[{{ selected169?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <b-form-group label="Recipient name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact person name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact email" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact telephone" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group></div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected170" name="check-button" inline="true" switch>
                                                     <b>[{{ selected170?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected170">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC38 - SC - For supply contracts: performance of deliveries of the specified type
 */
Vue.component("v4.0.0-CC38",
                    { 
                        data(){
                            return {
 "selected171": false,
 "selected172": false,
 "selected173": false
}
                        },
                        template: `<div>
                        <strong>For supply contracts: performance of deliveries of the specified type</strong>
                        <p>For public supply contracts only: During the reference period, the economic operator has delivered the following principal deliveries of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected171" name="check-button" inline="true" switch>
                                                     <b>[{{ selected171?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of references"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <div><em>undefined</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><em>undefined</em><div>
                                            <b-form-group label="Reference description" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Total amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Activity of the economic operator" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Specific amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Period (Start and End dates)" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <br/>Confidential <b-form-checkbox v-model="selected172" name="check-button" inline="true" switch>
                                                     <b>[{{ selected172?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <b-form-group label="Recipient name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact person name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact email" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact telephone" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group></div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected173" name="check-button" inline="true" switch>
                                                     <b>[{{ selected173?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected173">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC39 - SC - For service contracts: performance of services of the specified type
 */
Vue.component("v4.0.0-CC39",
                    { 
                        data(){
                            return {
 "selected174": false,
 "selected175": false,
 "selected176": false
}
                        },
                        template: `<div>
                        <strong>For service contracts: performance of services of the specified type</strong>
                        <p>For public service contracts only: During the reference period, the economic operator has provided the following main services of the type specified. Contracting authorities may require up to three years and allow experience dating from more than three years.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected174" name="check-button" inline="true" switch>
                                                     <b>[{{ selected174?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of references"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_INTEGER"></b-form-input>
                    </b-form-group>
                    <div><em>undefined</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    </div></div><em>undefined</em><div>
                                            <b-form-group label="Reference description" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Total amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Activity of the economic operator" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Specific amount" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Period (Start and End dates)" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERIOD"></b-form-input>
                                            </b-form-group>
                                            <br/>Confidential <b-form-checkbox v-model="selected175" name="check-button" inline="true" switch>
                                                     <b>[{{ selected175?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <b-form-group label="Recipient name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact person name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact email" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Contact telephone" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group></div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected176" name="check-button" inline="true" switch>
                                                     <b>[{{ selected176?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected176">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC40 - SC - Technicians or technical bodies for quality control
 */
Vue.component("v4.0.0-CC40",
                    { 
                        data(){
                            return {
 "selected177": false,
 "selected178": false,
 "selected179": false,
 "selected180": false,
 "selected181": false
}
                        },
                        template: `<div>
                        <strong>Technicians or technical bodies for quality control</strong>
                        <p>It can call upon the following technicians or technical bodies, especially those responsible for quality control. For technicians or technical bodies not belonging directly to the economic operator's undertaking but on whose capacities the economic operator relies as set out under Part II, Section C, separate ESPD forms must be filled in.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected177" name="check-button" inline="true" switch>
                                                     <b>[{{ selected177?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected178" name="check-button" inline="true" switch>
                                                     <b>[{{ selected178?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected178">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected179" name="check-button" inline="true" switch>
                                                     <b>[{{ selected179?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected179">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><em>undefined</em><div>
                                            <b-form-group label="First name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Last name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Profession" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Experience" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Other information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="How long with EO" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected180" name="check-button" inline="true" switch>
                                                     <b>[{{ selected180?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected180">
                                        
                                            <b-form-group label="Evidence supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><em>undefined</em><div>
                                            <b-form-group label="Name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Experience area" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Other information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected181" name="check-button" inline="true" switch>
                                                     <b>[{{ selected181?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected181">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC41 - SC - In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:
 */
Vue.component("v4.0.0-CC41",
                    { 
                        data(){
                            return {
 "selected182": false,
 "selected183": false,
 "selected184": false,
 "selected185": false,
 "selected186": false
}
                        },
                        template: `<div>
                        <strong>In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:</strong>
                        <p>In the case of public works contracts, the economic operator will be able to call on the following technicians or technical bodies to carry out the work:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected182" name="check-button" inline="true" switch>
                                                     <b>[{{ selected182?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected183" name="check-button" inline="true" switch>
                                                     <b>[{{ selected183?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected183">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected184" name="check-button" inline="true" switch>
                                                     <b>[{{ selected184?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected184">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><em>undefined</em><div>
                                            <b-form-group label="First name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Last name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Profession" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Experience" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Other information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="How long with EO" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected185" name="check-button" inline="true" switch>
                                                     <b>[{{ selected185?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected185">
                                        
                                            <b-form-group label="Evidence supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div><em>undefined</em><div>
                                            <b-form-group label="Name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Experience area" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Other information" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected186" name="check-button" inline="true" switch>
                                                     <b>[{{ selected186?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected186">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC42 - SC - Technical facilities and measures for ensuring quality
 */
Vue.component("v4.0.0-CC42",
                    { 
                        data(){
                            return {
 "selected187": false,
 "selected188": false,
 "selected189": false,
 "selected190": false
}
                        },
                        template: `<div>
                        <strong>Technical facilities and measures for ensuring quality</strong>
                        <p>It uses the following technical facilities and measures for ensuring quality and its study and research facilities are as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected187" name="check-button" inline="true" switch>
                                                     <b>[{{ selected187?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected188" name="check-button" inline="true" switch>
                                                     <b>[{{ selected188?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected188">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected189" name="check-button" inline="true" switch>
                                                     <b>[{{ selected189?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected189">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected190" name="check-button" inline="true" switch>
                                                     <b>[{{ selected190?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected190">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC43 - SC - Study and research facilities
 */
Vue.component("v4.0.0-CC43",
                    { 
                        data(){
                            return {
 "selected191": false,
 "selected192": false,
 "selected193": false,
 "selected194": false
}
                        },
                        template: `<div>
                        <strong>Study and research facilities</strong>
                        <p>It uses the following study and research facilities are as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected191" name="check-button" inline="true" switch>
                                                     <b>[{{ selected191?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected192" name="check-button" inline="true" switch>
                                                     <b>[{{ selected192?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected192">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected193" name="check-button" inline="true" switch>
                                                     <b>[{{ selected193?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected193">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected194" name="check-button" inline="true" switch>
                                                     <b>[{{ selected194?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected194">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC44 - SC - Supply chain management
 */
Vue.component("v4.0.0-CC44",
                    { 
                        data(){
                            return {
 "selected195": false,
 "selected196": false,
 "selected197": false,
 "selected198": false
}
                        },
                        template: `<div>
                        <strong>Supply chain management</strong>
                        <p>It will be able to apply the following supply chain management and tracking systems when performing the contract:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected195" name="check-button" inline="true" switch>
                                                     <b>[{{ selected195?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected196" name="check-button" inline="true" switch>
                                                     <b>[{{ selected196?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected196">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected197" name="check-button" inline="true" switch>
                                                     <b>[{{ selected197?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected197">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected198" name="check-button" inline="true" switch>
                                                     <b>[{{ selected198?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected198">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC45 - SC - Environmental management measures
 */
Vue.component("v4.0.0-CC45",
                    { 
                        data(){
                            return {
 "selected199": false,
 "selected200": false,
 "selected201": false,
 "selected202": false
}
                        },
                        template: `<div>
                        <strong>Environmental management measures</strong>
                        <p>The economic operator will be able to apply the following environmental management measures when performing the contract:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected199" name="check-button" inline="true" switch>
                                                     <b>[{{ selected199?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected200" name="check-button" inline="true" switch>
                                                     <b>[{{ selected200?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected200">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected201" name="check-button" inline="true" switch>
                                                     <b>[{{ selected201?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected201">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected202" name="check-button" inline="true" switch>
                                                     <b>[{{ selected202?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected202">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC46 - SC - Tools, plant or technical equipment
 */
Vue.component("v4.0.0-CC46",
                    { 
                        data(){
                            return {
 "selected203": false,
 "selected204": false,
 "selected205": false,
 "selected206": false
}
                        },
                        template: `<div>
                        <strong>Tools, plant or technical equipment</strong>
                        <p>The following tools, plant or technical equipment will be available to it for performing the contract:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected203" name="check-button" inline="true" switch>
                                                     <b>[{{ selected203?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected204" name="check-button" inline="true" switch>
                                                     <b>[{{ selected204?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected204">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected205" name="check-button" inline="true" switch>
                                                     <b>[{{ selected205?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected205">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected206" name="check-button" inline="true" switch>
                                                     <b>[{{ selected206?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected206">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC47 - SC - Educational and professional qualifications
 */
Vue.component("v4.0.0-CC47",
                    { 
                        data(){
                            return {
 "selected207": false,
 "selected208": false,
 "selected209": false,
 "selected210": false
}
                        },
                        template: `<div>
                        <strong>Educational and professional qualifications</strong>
                        <p>The following educational and professional qualifications are held by the service provider or the contractor itself, and/or (depending on the requirements set out in the relevant notice or the in the ESPD, the relevant notice or by its managerial staff.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected207" name="check-button" inline="true" switch>
                                                     <b>[{{ selected207?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div><em>[Additional information; e.g. no evidences online]</em><div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected208" name="check-button" inline="true" switch>
                                                     <b>[{{ selected208?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected208">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected209" name="check-button" inline="true" switch>
                                                     <b>[{{ selected209?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected209">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div><em>undefined</em><div>
                                            <b-form-group label="First name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Last name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Please describe the educational or professional qualification" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="If possible please indicate the ESCO identifier for this qualification" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="URL"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="If possible please describe the ESCO qualification" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Qualification name" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Qualification number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUAL_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Qualification issuing date" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DATE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Qualification issuing body" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected210" name="check-button" inline="true" switch>
                                                     <b>[{{ selected210?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected210">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC48 - SC - Special requierements check
 */
Vue.component("v4.0.0-CC48",
                    { 
                        data(){
                            return {
 "selected211": false,
 "selected212": false,
 "selected213": false,
 "selected214": false,
 "selected215": false
}
                        },
                        template: `<div>
                        <strong>Special requierements check</strong>
                        <p>For complex products or services to be supplied or, exceptionally, for products or services which are required for a special purpose: The economic operator will allow checks to be conducted on the production capacities or the technical capacity of the economic operator and, where necessary, on the means of study and research which are available to it and on the quality control measures? The check is to be performed by the contracting authority or, in case the latter consents to this, on its behalf by a competent official body of the country in which the supplier or service provider is established.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected211" name="check-button" inline="true" switch>
                                                     <b>[{{ selected211?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected212" name="check-button" inline="true" switch>
                                                     <b>[{{ selected212?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected212">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected213" name="check-button" inline="true" switch>
                                                     <b>[{{ selected213?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected213">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Do you allow checks? <b-form-checkbox v-model="selected214" name="check-button" inline="true" switch>
                                                     <b>[{{ selected214?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected215" name="check-button" inline="true" switch>
                                                     <b>[{{ selected215?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected215">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC49 - SC - Number of managerial staff
 */
Vue.component("v4.0.0-CC49",
                    { 
                        data(){
                            return {
 "selected216": false,
 "selected217": false,
 "selected218": false,
 "selected219": false
}
                        },
                        template: `<div>
                        <strong>Number of managerial staff</strong>
                        <p>The economic operator’s number of managerial staff for the last three years were as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected216" name="check-button" inline="true" switch>
                                                     <b>[{{ selected216?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Additional information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected217" name="check-button" inline="true" switch>
                                                     <b>[{{ selected217?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected217">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected218" name="check-button" inline="true" switch>
                                                     <b>[{{ selected218?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected218">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Year" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_INTEGER"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected219" name="check-button" inline="true" switch>
                                                     <b>[{{ selected219?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected219">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC50 - SC - Average annual manpower
 */
Vue.component("v4.0.0-CC50",
                    { 
                        data(){
                            return {
 "selected220": false,
 "selected221": false,
 "selected222": false,
 "selected223": false
}
                        },
                        template: `<div>
                        <strong>Average annual manpower</strong>
                        <p>The economic operator’s average annual manpower for the last three years were as follows:</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected220" name="check-button" inline="true" switch>
                                                     <b>[{{ selected220?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Minimum number of years"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="MINIMUM_QUANTITY_YEAR"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Additional information"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected221" name="check-button" inline="true" switch>
                                                     <b>[{{ selected221?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected221">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected222" name="check-button" inline="true" switch>
                                                     <b>[{{ selected222?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected222">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <b-form-group label="Year" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_YEAR"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Number" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_INTEGER"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected223" name="check-button" inline="true" switch>
                                                     <b>[{{ selected223?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected223">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC51 - SC - Subcontracting proportion
 */
Vue.component("v4.0.0-CC51",
                    { 
                        data(){
                            return {
 "selected224": false,
 "selected225": false,
 "selected226": false,
 "selected227": false
}
                        },
                        template: `<div>
                        <strong>Subcontracting proportion</strong>
                        <p>The economic operator intends possibly to subcontract the following proportion (i.e. percentage) of the contract. Please note that if the economic operator has decided to subcontract a part of the contract and relies on the subcontractor’s capacities to perform that part, then please fill in a separate ESPD for such subcontractors, see Part II, Section C above.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected224" name="check-button" inline="true" switch>
                                                     <b>[{{ selected224?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected225" name="check-button" inline="true" switch>
                                                     <b>[{{ selected225?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected225">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected226" name="check-button" inline="true" switch>
                                                     <b>[{{ selected226?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected226">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                        </div>
                        <div>
                                            <b-form-group label="Please specify" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected227" name="check-button" inline="true" switch>
                                                     <b>[{{ selected227?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected227">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                    })

/**
 * Component - CC52 - SC - For supply contracts: samples, descriptions or photographs without certification of authenticity
 */
Vue.component("v4.0.0-CC52",
                    { 
                        data(){
                            return {
 "selected228": false,
 "selected229": false,
 "selected230": false,
 "selected231": false,
 "selected232": false
}
                        },
                        template: `<div>
                        <strong>For supply contracts: samples, descriptions or photographs without certification of authenticity</strong>
                        <p>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied, which do not need to be accompanied by certifications of authenticity.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected228" name="check-button" inline="true" switch>
                                                     <b>[{{ selected228?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected229" name="check-button" inline="true" switch>
                                                     <b>[{{ selected229?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected229">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected230" name="check-button" inline="true" switch>
                                                     <b>[{{ selected230?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected230">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                        </div>
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected231" name="check-button" inline="true" switch>
                                                     <b>[{{ selected231?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected232" name="check-button" inline="true" switch>
                                                     <b>[{{ selected232?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected232">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                    })

/**
 * Component - CC53 - SC - For supply contracts: samples, descriptions or photographs with certification of authenticity
 */
Vue.component("v4.0.0-CC53",
                    { 
                        data(){
                            return {
 "selected233": false,
 "selected234": false,
 "selected235": false,
 "selected236": false,
 "selected237": false
}
                        },
                        template: `<div>
                        <strong>For supply contracts: samples, descriptions or photographs with certification of authenticity</strong>
                        <p>For public supply contracts: The economic operator will supply the required samples, descriptions or photographs of the products to be supplied and will provide certifications of authenticity where applicable.</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected233" name="check-button" inline="true" switch>
                                                     <b>[{{ selected233?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em>
                        <div>
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected234" name="check-button" inline="true" switch>
                                                     <b>[{{ selected234?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected234">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected235" name="check-button" inline="true" switch>
                                                     <b>[{{ selected235?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected235">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                        </div>
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected236" name="check-button" inline="true" switch>
                                                     <b>[{{ selected236?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected237" name="check-button" inline="true" switch>
                                                     <b>[{{ selected237?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected237">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                    })

/**
 * Component - CC54 - SC - For supply contracts: certificates by quality control institutes
 */
Vue.component("v4.0.0-CC54",
                    { 
                        data(){
                            return {
 "selected238": false,
 "selected239": false,
 "selected240": false,
 "selected241": false,
 "selected242": false
}
                        },
                        template: `<div>
                        <strong>For supply contracts: certificates by quality control institutes</strong>
                        <p>Can the economic operator provide the required certificates drawn up by official quality control institutes or agencies of recognised competence attesting the conformity of products clearly identified by references to the technical specifications or standards, which are set out in the relevant notice or the in the ESPD, the relevant notice or ?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected238" name="check-button" inline="true" switch>
                                                     <b>[{{ selected238?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected239" name="check-button" inline="true" switch>
                                                     <b>[{{ selected239?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected239">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected240" name="check-button" inline="true" switch>
                                                     <b>[{{ selected240?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected240">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected241" name="check-button" inline="true" switch>
                                                     <b>[{{ selected241?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected241">
                                        
                                            <b-form-group label="If not, please explain why and state which other means of proof can be provided:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected242" name="check-button" inline="true" switch>
                                                     <b>[{{ selected242?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected242">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC55 - SC - Certificates by independent bodies about quality assurance standards
 */
Vue.component("v4.0.0-CC55",
                    { 
                        data(){
                            return {
 "selected243": false,
 "selected244": false,
 "selected245": false,
 "selected246": false,
 "selected247": false
}
                        },
                        template: `<div>
                        <strong>Certificates by independent bodies about quality assurance standards</strong>
                        <p>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required quality assurance standards, including accessibility for disabled persons?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected243" name="check-button" inline="true" switch>
                                                     <b>[{{ selected243?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected244" name="check-button" inline="true" switch>
                                                     <b>[{{ selected244?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected244">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected245" name="check-button" inline="true" switch>
                                                     <b>[{{ selected245?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected245">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected246" name="check-button" inline="true" switch>
                                                     <b>[{{ selected246?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected246">
                                        
                                            <b-form-group label="If not, please explain why and state which other means of proof can be provided:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected247" name="check-button" inline="true" switch>
                                                     <b>[{{ selected247?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected247">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC56 - SC - Certificates by independent bodies about environmental management systems or standards
 */
Vue.component("v4.0.0-CC56",
                    { 
                        data(){
                            return {
 "selected248": false,
 "selected249": false,
 "selected250": false,
 "selected251": false,
 "selected252": false
}
                        },
                        template: `<div>
                        <strong>Certificates by independent bodies about environmental management systems or standards</strong>
                        <p>Will the economic operator be able to produce certificates drawn up by independent bodies attesting that the economic operator complies with the required environmental management systems or standards?</p>
                        <div>
                        <div><em>[Additional information; e.g. no evidences online]</em>
                                            <br/>Your Answer <b-form-checkbox v-model="selected248" name="check-button" inline="true" switch>
                                                     <b>[{{ selected248?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                        </div></div><em>LEGISLATION</em><div>
                    <b-form-group label="LOT Identifier"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="LOT_IDENTIFIER"></b-form-input>
                    </b-form-group>
                    <div>
                    <b-form-group label="Requirement"
                    label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                    <b-form-input placeholder="DESCRIPTION"></b-form-input>
                    </b-form-group>
                    
                                            <br/>Does the EO fulfil the criteria by itself? <b-form-checkbox v-model="selected249" name="check-button" inline="true" switch>
                                                     <b>[{{ selected249?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected249">
                                        
                                            <br/>In the case of no – Relied upon or not <b-form-checkbox v-model="selected250" name="check-button" inline="true" switch>
                                                     <b>[{{ selected250?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected250">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        </div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected251" name="check-button" inline="true" switch>
                                                     <b>[{{ selected251?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="!selected251">
                                        
                                            <b-form-group label="If not, please explain why and state which other means of proof can be provided:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available online? <b-form-checkbox v-model="selected252" name="check-button" inline="true" switch>
                                                     <b>[{{ selected252?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected252">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div></div>
                    </div>`
                    })

/**
 * Component - CC57 - OT - Economic operator is a sheltered workshop
 */
Vue.component("v4.0.0-CC57",
                    { 
                        data(){
                            return {
 "selected253": false,
 "selected254": false
}
                        },
                        template: `<div>
                        <strong>Economic operator is a sheltered workshop</strong>
                        <p>Only in case the procurement is reserved: is the economic operator a sheltered workshop, a 'social business' or will it provide for the performance of the contract in the context of sheltered employment programmes?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected253" name="check-button" inline="true" switch>
                                                     <b>[{{ selected253?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected253">
                                        
                                            <b-form-group label="What is the corresponding percentage of disabled or disadvantaged workers?" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="PERCENTAGE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="If required, please provide details on whether the employees concerned belong to a specific category of disabled or disadvantaged workers?" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected254" name="check-button" inline="true" switch>
                                                     <b>[{{ selected254?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected254">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected255": false,
 "selected256": false,
 "selected257": false,
 "selected258": false,
 "selected259": false
}
                        },
                        template: `<div>
                        <strong>Economic operator registered in a pre qualification system</strong>
                        <p>Does the country of the economic operator have an official list of approved economic operators or an equivalent certificate (e.g. under a national (pre)qualification system)?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected255" name="check-button" inline="true" switch>
                                                     <b>[{{ selected255?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            <div>
                                            <br/>Is the economic operator registered on an official list of approved economic operators or does it have an equivalent certificate? <b-form-checkbox v-model="selected256" name="check-button" inline="true" switch>
                                                     <b>[{{ selected256?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected256">
                                        
                                            <b-form-group label="Please provide the name of the list or certificate and the relevant registration or certification number, if applicable" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="If the certificate of registration or certification is available electronically, please state where" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="URL"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Please state the references on which the registration or certification is based, and, where applicable, the classification obtained in the official list" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group><div>
                                            <br/>Does the registration or certification cover all of the required selection criteria? <b-form-checkbox v-model="selected257" name="check-button" inline="true" switch>
                                                     <b>[{{ selected257?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            </div>
                                        </div>
                                        <div v-if="!selected256">
                                        
                                            <br/>Will the economic operator be able to provide a certificate with regard to the payment of social security contributions and taxes or provide information enabling the contracting authority or contracting entity to obtaining it directly by accessing a national database in any Member State that is available free of charge? <b-form-checkbox v-model="selected258" name="check-button" inline="true" switch>
                                                     <b>[{{ selected258?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected259" name="check-button" inline="true" switch>
                                                     <b>[{{ selected259?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected259">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div></div>
                                        <div v-if="!selected255">
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
 "selected260": false,
 "selected261": false
}
                        },
                        template: `<div>
                        <strong>Economic Operator together with others</strong>
                        <p>Is the economic operator participating in the procurement procedure together with others?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected260" name="check-button" inline="true" switch>
                                                     <b>[{{ selected260?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected260">
                                        
                                            <b-form-group label="Please indicate the role of the economic operator in the group (leader, responsible for specific tasks...)" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="CODE"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Please identify the other economic operators participating in the procurement procedure together" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Where applicable, name of the participating group:" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected261" name="check-button" inline="true" switch>
                                                     <b>[{{ selected261?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected261">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected262": false,
 "selected263": false
}
                        },
                        template: `<div>
                        <strong>Relied on entities</strong>
                        <p>Does the economic operator rely on the capacities of other entities in order to meet the selection criteria set out under Part IV and the criteria and rules (if any) set out under Part V below?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected262" name="check-button" inline="true" switch>
                                                     <b>[{{ selected262?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected262">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected263" name="check-button" inline="true" switch>
                                                     <b>[{{ selected263?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected263">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected264": false,
 "selected265": false
}
                        },
                        template: `<div>
                        <strong>Not relied on entities</strong>
                        <p>Does the economic operator intend to subcontract any share of the contract to third parties?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected264" name="check-button" inline="true" switch>
                                                     <b>[{{ selected264?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected264">
                                        
                                            <b-form-group label="Name of the entity" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="ID of the subcontractor" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="ECONOMIC_OPERATOR_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected265" name="check-button" inline="true" switch>
                                                     <b>[{{ selected265?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected265">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected266": false,
 "selected267": false
}
                        },
                        template: `<div>
                        <strong>Reduction of the number of qualified candidates</strong>
                        <p>The economic operator declares that It meets the objective and non discriminatory criteria or rules to be applied in order to limit the number of candidates in the following way:</p>
                        <em>In case certain certificates or other forms of documentary evidence are required, please indicate for each whether the economic operator has the required documents</em>
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected266" name="check-button" inline="true" switch>
                                                     <b>[{{ selected266?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected266">
                                        
                                            <b-form-group label="Please describe them" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="DESCRIPTION"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected267" name="check-button" inline="true" switch>
                                                     <b>[{{ selected267?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected267">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
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
 "selected268": false,
 "selected269": false
}
                        },
                        template: `<div>
                        <strong>Economic Operator Micro, Small or Medium-sized Enterprise</strong>
                        <p>Is the economic operator a Micro, a Small or Medium-sized Enterprise?</p>
                        
                        <div>
                                            <br/>Your answer? <b-form-checkbox v-model="selected268" name="check-button" inline="true" switch>
                                                     <b>[{{ selected268?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected268">
                                        
                                            <b-form-group label="Number of employees" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="QUANTITY_INTEGER"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Turnover" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="AMOUNT"></b-form-input>
                                            </b-form-group>
                                        </div><div>
                                            <br/>Is this information available electronically? <b-form-checkbox v-model="selected269" name="check-button" inline="true" switch>
                                                     <b>[{{ selected269?'Yes':'No' }}]</b>
                                            </b-form-checkbox>
                                            
                                        <div v-if="selected269">
                                        
                                            <b-form-group label="Evidence Supplied" 
                                            label-cols-sm="6" label-cols-lg="8" content-cols-sm content-cols-lg="4">
                                            <b-form-input placeholder="EVIDENCE_IDENTIFIER"></b-form-input>
                                            </b-form-group>
                                        </div></div>
                        </div>
                    </div>`
                    })
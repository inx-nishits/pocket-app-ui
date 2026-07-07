/**
 * quiz.js - High Fidelity Quiz Module Interaction Engine
 */

const QuizEngine = {
    history: ['view-hub'],
    currentFlow: null,
    selectedCategory: null,
    selectedFormat: null,
    selectedMixedTopics: [],

    // Practice Aids Wizard State
    practiceAidsStep: 1,
    practiceSelectedMains: [],
    practiceSelectedSubs: [],
    practiceSelectedSubSubs: [],
    practiceAidsData: {
        "Crime": {
            icon: "1f6a8.png",
            subTopics: {
                "Mens Rea (State of Mind)": { badge: "Gold", subSubs: { "Intent": 8, "Recklessness": 3, "Negligence": 1, "Strict Liability": 3, "Transferred Mens Rea": 4 } },
                "Actus Reus (Criminal Conduct)": { badge: "Gold", subSubs: { "Automatism": 2, "Coincidence with Mens Rea": 5, "Omissions": 3, "Causal Link or Chain of Causation": 5, "Intervening Act": 5, "Principals and Accessories": 18, "Joint Enterprise": 3, "Corporate Liability": 2 } },
                "Incomplete Offences": { badge: "Rare", subSubs: { "Encouraging or Assisting Crime": 12, "Conspiracy": 15, "Attempts": 12, "Impossibility": 3 } },
                "General Defences": { badge: "Gold", subSubs: { "Inadvertence and Mistake": 2, "Duress": 11, "Duress of Circumstances": 4, "Use of Lethal Force and Human Rights": 3, "Use of Force to Defend, Prevent Crime and to Arrest": 3, "Police Officers": 1, "Infancy": 2 } },
                "Homicide": { badge: "Bronze", subSubs: { "Murder": 10, "Voluntary Manslaughter and 'Special Defences'": 12, "Involuntary Manslaughter": 9, "Causing or Allowing a Child or Vulnerable Adult to Die or Suffer Serious Physical Harm": 3, "Encouraging or Assisting Suicide": 4, "Solicitation of Murder": 2 } },
                "Misuse of Drugs": { badge: "", subSubs: { "Classification": 8, "Possession": 10, "Supplying": 10, "Possession with Intent to Supply": 4, "Supply of Articles": 3, "Production of a Controlled Drug": 3, "Cultivation of Cannabis": 3, "General Defence under Section 28": 9, "Occupiers etc": 2, "Assisting or Inducing Offence Outside United Kingdom": 1, "Incitement": 1, "Travel Restriction Orders": 4, "Police Powers": 7, "Psychoactive and Intoxicating Substances": 5 } },
                "Firearms and Gun Crime": { badge: "Bronze", subSubs: { "Definitions - Firearm, Ammunition and Imitation Firearm": 8, "Section 1 Firearm": 5, "Restrictions on Transfer of Firearms": 1, "Imitation Firearm Offences": 2, "Prohibited Weapon": 14, "General Exemptions": 6, "Criminal Use of Firearms": 21, "Further Firearms Offences": 8, "Police Powers": 8, "Possession or Acquisition of Firearms by Convicted Persons": 6 } },
                "Weapons": { badge: "Silver", subSubs: { "Having Offensive Weapon in Public Place": 15, "Threatening with Offensive Weapon in Public": 2, "Having Bladed or Pointed Article in Public Place": 6, "Offences and Powers Relating to School Premises": 9, "Trespassing With Weapon of Offence": 4, "Manufacture and Sale of Weapons": 7, "Knives": 6 } },
                "Racially and Religiously Aggravated Offences": { badge: "Rare", subSubs: { "Racially or Religiously Aggravated": 21 } },
                "Non-Fatal Offences Against the Person": { badge: "Silver", subSubs: { "Assault": 8, "Battery": 1, "Consent": 7, "Assault Offences": 19, "Other Assault Offences": 12, "Threats to Kill": 3 } },
                "Offences Involving the Deprivation of Liberty": { badge: "Rare", subSubs: { "False Imprisonment": 6, "Kidnapping": 3, "Slavery, Servitude and Forced or Compulsory Labour": 7 } },
                "Sexual Offences": { badge: "", subSubs: { "Anonymity": 1, "Rape": 17, "Assault": 16, "Causing Sexual Activity without Consent": 2, "Rape and Other Offences Against Children Under 13": 2, "Child Sex Offences": 23, "Abuse of Position of Trust": 11, "Familial Child Sex Offences": 2, "Offences Involving Photographs and Images of Children": 20, "Sexual Exploitation of Children": 13, "Possession of a Paedophile Manual": 4, "Offences Outside the United Kingdom": 9, "Sexual Offences Against People with a Mental Disorder Impeding Choice": 1, "Offences Relating to Prostitution": 17, "Preparatory Offences": 5, "Sex with an Adult Relative": 3, "Other Sexual Offences": 18, "Possession of Extreme Pornographic Images": 1 } },
                "Child Protection": { badge: "Gold", subSubs: { "Child Abduction": 11, "Child Cruelty": 7, "Police Powers under the Children Act 1989": 19 } },
                "Theft and Related Offences": { badge: "", subSubs: { "Theft": 42, "Robbery": 11, "Blackmail": 9, "Burglary": 15, "Aggravated Burglary": 13, "Taking a Conveyance Without Consent": 9, "Aggravated Vehicle-Taking": 6, "Interfering with Vehicles": 7, "Going Equipped": 3, "Handling Stolen Goods": 22, "Making Off Without Payment": 2, "Proceeds of Crime": 7 } },
                "Fraud": { badge: "Gold", subSubs: { "Gain and Loss": 1, "Fraud by False Representation": 22, "Fraud by Failing to Disclose": 2, "Fraud by Abuse of Position": 4, "Possession or Control of Articles for Use in Frauds": 7, "Making or Supplying of Articles for Use in Frauds": 3, "Obtaining Services Dishonestly": 5, "False Accounting": 4 } },
                "Criminal Damage": { badge: "Gold", subSubs: { "Simple Damage": 25, "Aggravated Damage": 4, "Arson": 5, "Threats to Destroy or Damage Property": 5, "Having Articles With Intent to Destroy or Damage Property": 7, "Contamination or Interference With Goods": 7 } }
            }
        },
        "Evidence & Procedure": {
            icon: "../images/nie-magnifier.svg",
            subTopics: {
                "Instituting Criminal Proceedings": { badge: "Silver", subSubs: { "Written Charge and Requisition": 2, "Service of Summons, Written Charge and Requisition": 3, "Service Outside England and Wales": 1, "Execution of Warrants": 6 } },
                "Release of Person Arrested": { badge: "Bronze", subSubs: { "Person Arrested Elsewhere than at a Police Station": 18, "Pre-Charge Release of Person Arrested and Bail": 12, "Police Bail After Charge": 2, "Police Bail Restrictions": 6, "Grounds for Refusing Police Bail": 12, "Custody Officer - Granting Bail": 9, "Police Bail - Surety": 8, "Security": 2, "Liability to Arrest for Absconding or Breaking Bail Conditions": 4, "Offence of Absconding by Person Released on Bail": 2, "Remands in Police Custody": 1 } },
                "Court Procedure and Witnesses": { badge: "Bronze", subSubs: { "Plea of Guilty by Post": 2, "Mode of Trial": 4, "Witnesses": 19, "Special Measures": 5, "Refreshing Memory": 6, "Oaths and Affirmations": 1, "Cross-Examination": 2 } },
                "Exclusion of Admissible Evidence": { badge: "Bronze", subSubs: { "Confessions": 15, "Exclusion of Evidence Generally": 10, "Entrapment": 5 } },
                "Disclosure of Evidence": { badge: "", subSubs: { "Failure to Comply": 5, "Disclosure Code of Practice - 2 Definitions": 3, "Disclosure Code of Practice - 3 General Responsibilities": 5, "Disclosure Code of Practice - 5 Retention of Material": 7, "Disclosure Code of Practice - 6 Preparation of Material for Prosecutor": 11, "Disclosure Code of Practice - 7 Revelation of Material to Prosecutor": 3, "Disclosure Code of Practice - 8 Subsequent Action by Disclosure Officer": 12, "Disclosure Code of Practice - 10 Disclosure of Material to Accused": 6 } },
                "Detention and Treatment of Persons by Police Officers: PACE Code C": { badge: "", subSubs: { "Custody Officer": 5, "Designated Person": 2, "Designated Police Station": 1, "Police Detention": 3, "Code C - 1 General": 6, "Code C - 2 Custody Records": 7, "Code C - 3 Initial Action": 21, "Code C - 4 Detainee's Property": 10, "Code C - 5 Right not to be Held Incommunicado": 10, "Code C - 6 Right to Legal Advice": 15, "Code C - 7 Citizens of Independent Commonwealth Countries or Foreign Nationals": 1, "Code C - 8 Conditions of Detention": 6, "Code C - 9 Care and Treatment of Detained Persons": 9, "Code C - 13 Interpreters": 10, "Code C - 14 Questioning - Special Restrictions": 1, "Limits on Period of Detention without Charge": 11, "Code C - 15 Reviews and Extensions of Detention": 38, "Code C - 16 Charging Detained Persons": 13, "Cautions as a Means of Disposal": 3, "Code C - 17 Testing Persons for Presence of Specified Class A Drugs": 7, "Code C - Annex A - Intimate and Strip Searches": 10, "Code C - Annex E: Summary of Provisions Relating to Vulnerable Persons": 2, "Code C - Annex K - X-Rays and Ultrasound Scans": 2, "Code C - Annex L - Establishing Gender of Persons for the Purpose of Searching and Certain other Procedures": 2 } },
                "Identification: PACE Code D": { badge: "", subSubs: { "Introduction": 1, "Code D - 2 General": 1, "Code D - 3 Identification by Witnesses": 38, "Code D - 4 Identification by Fingerprints and Footwear Impressions": 21, "Code D - 5 Examinations to Establish Identity and the Taking of Photographs": 10, "Code D - 6 Identification by Body Samples and Impressions": 23, "Code D - Annex A: Video Identification": 4, "Code D - Annex B: Identification Parades": 4, "Code D - Annex C: Group Identification": 2, "Code D - Annex D: Confrontation by an Eye-witness": 1, "Code D - Annex E: Showing Photographs to Eye Witnesses": 3, "Code D - Annex F: Fingerprints, Samples and Footwear Impressions - Destruction and Speculative Searches": 3, "Code D - Annex G: Requirement for a Person to Attend a Police Station for Fingerprints and Samples": 1 } },
                "Interviews: PACE Codes C, E and F": { badge: "", subSubs: { "Code C - 10 Cautions": 11, "Code C - 11 Interviews - General": 17, "Code C - 12 Interviews in Police Stations": 11, "Code C - Annex C: Restriction on Drawing Adverse Inferences from Silence and Terms of the Caution when the Restriction Applies": 2, "Code C - Annex D: Written Statements under Caution": 1, "Code E - 1 General": 1, "Code E - 2 Interviews and other matters to be audio recorded under this Code": 2, "Code E - 3 Interview recording using removable recording media device": 11, "Code F - 1 General": 1, "Code F - 2 When interviews and matters to which Code F applies may be visually recorded with sound and provisions for their conduct and recording": 2, "Interviews on Behalf of Scottish Forces and Vice Versa": 2 } }
            }
        },
        "General Police Duties": {
            icon: "1f46e.png",
            subTopics: {
                "Stop and Search": { badge: "", subSubs: { "Code A - 1 Principles Governing Stop and Search": 4, "Code A - 2 Types of Stop and Search Powers": 29, "Code A - 3 Conduct of Searches": 7, "Code A - 4 Recording Requirements": 9 } },
                "Entry, Search and Seizure": { badge: "", subSubs: { "Code B - 2 General": 4, "Code B - 3 Search Warrants and Production Orders": 5, "Search Warrants for Indictable Offences": 3, "Execution of a Warrant": 1, "Code B - 4 Entry without Warrant - Particular Powers": 20, "Code B - 5 Search with Consent": 2, "Code B - 6 Searching Premises - General Considerations": 6, "Code B - 7 Seizure and Retention of Property": 13, "Code B - 8 Action After Searches": 2 } },
                "Powers of Arrest": { badge: "Bronze", subSubs: { "Code G - 1 Introduction": 4, "Code G - 2 Elements of Arrest under Section 24 PACE": 11, "Code G - 3 Information to be Given on Arrest": 4, "Code G - 4 Records of Arrest": 1, "Arrest Without Warrant - \"Citizen's Arrest\"": 3, "Voluntary Attendance at a Police Station": 2, "After Arrest": 3 } },
                "Protection of People Suffering from Mental Disorders": { badge: "Gold", subSubs: { "Removal etc of Mentally Disordered Persons Without a Warrant": 5, "Retaking of Patients Escaping from Custody": 2 } },
                "Offences Relating to Land and Premises": { badge: "", subSubs: { "Aggravated Trespass": 2, "Failure to Leave Land or Re-entry to Land when Directed to Leave": 1, "Power to Remove Trespassers on Land": 10, "Power to Remove Trespassers: Alternative Site Available": 6, "Squatting in a Residential Building": 1, "Nuisance on Educational Premises": 6, "Causing Nuisance or Disturbance on NHS Premises": 2 } },
                "Licensing and Offences Relating to Alcohol": { badge: "", subSubs: { "Power of Entry to Investigate Licensable Activities or Offences": 3, "Drunk and Disorderly": 3, "Found Drunk": 1, "Children - Offences under the Licensing Act 2003": 15, "Children - Other Offences": 9, "Licensed Premises: Exclusion Orders": 1, "Orders to Close Premises in Area Experiencing Disorder": 2, "Closure Notices and Orders for Unlicensed Premises": 2 } },
                "Protecting Citizens and the Community: Injunctions, Orders and Police Powers": { badge: "Bronze", subSubs: { "Injunctions to Prevent Gang-related Violence and Drug Dealing Activity": 2, "Injunctions under the Anti-social Behaviour, Crime and Policing Act 2014": 3, "Criminal Behaviour Orders": 4, "Dispersal Powers": 4, "Community Protection Notices": 1, "Public Spaces Protection Orders": 2, "Closure of Premises Associated with Nuisance and Disorder": 2, "Orders Against Parents": 12, "Removal of Truants and Excluded Pupils to Designated Premises, etc.": 9 } },
                "Processions and Assemblies": { badge: "", subSubs: { "Public Processions and Assemblies": 10 } },
                "Public Order Offences": { badge: "Silver", subSubs: { "Breach of the Peace": 12, "Riot": 8, "Violent Disorder": 6, "Affray": 7, "Fear or Provocation of Violence": 4, "Intentional Harassment Alarm or Distress": 7, "Harassment Alarm or Distress": 8 } },
                "Sporting Events": { badge: "", subSubs: { "Designated and Regulated Football Matches": 2, "The Football (Offences) Act 1991": 7, "Banning Orders and Detention": 4, "The Sporting Events (Control of Alcohol etc) Act 1985": 13, "Ticket Touts": 3 } },
                "Domestic Violence and Abuse": { badge: "Silver", subSubs: { "Domestic Violence Protection Notices and Orders": 3 } },
                "Hatred and Harassment Offences": { badge: "Silver", subSubs: { "Offences Involving Racial, Religious or Sexual Orientation Hatred": 7, "The Harassment Offences": 13, "Putting People in Fear of Violence": 6, "The Stalking Offences": 2, "Police Direction to Prevent Intimidation or Harassment": 2 } },
                "Offences and Powers Relating to Information and Communications": { badge: "", subSubs: { "Offences Under the Computer Misuse Act 1990": 13, "The Data Protection Act 2018": 5, "The Regulation of Investigatory Powers Act 2000": 20, "Offence of Sending Letters etc. with Intent to Cause Distress or Anxiety": 3, "False Communications Offence": 1, "Improper Use of Public Electronic Communications Network": 5 } },
                "Offences Against the Administration of Justice & Public Interest": { badge: "", subSubs: { "Perjury": 5, "Offences Similar to Perjury": 2, "Perverting the Course of Justice": 4, "Considerations Affecting Witnesses, Jurors and Others": 6, "Assisting Offenders": 8, "Concealing Relevant Offences": 3, "Miscellaneous Offences Relating to Offenders": 5, "Wasting Police Time": 6 } },
                "Terrorism and Associated Offences": { badge: "", subSubs: { "Terrorism Defined": 4, "Terrorism Act 2000: Financial Measures": 2, "Terrorism Act 2000: Duty of Disclosure and Tipping Off": 2, "Terrorism Act 2006: Offences": 3, "Terrorism Act 2000: Police Powers": 3, "Cordons": 6, "Offences Involving Explosive Substance": 5 } },
                "Diversity, Equality and Inclusion": { badge: "", subSubs: { "Article 14 - Prohibition of Discrimination": 1, "Protected Characteristics": 12, "Discrimination": 6, "Police Officers": 1, "Employees and Applicants": 5, "Liability for Discrimination in Employment": 2 } },
                "Complaints and Misconduct": { badge: "", subSubs: { "The Standards of Professional Behaviour": 5, "The Role of the Police Friend": 5, "Misconduct Procedures": 6, "Misconduct Proceedings": 8, "Accelerated Misconduct Cases": 1, "Appeals to the Police Appeals Tribunal": 3 } },
                "Unsatisfactory Performance and Attendance": { badge: "", subSubs: { "Applicability": 3, "The First Stage": 6, "The Second Stage": 3, "The Third Stage": 7, "Attendance at Each Stage of the Procedures and Ill Health": 1, "Other Regulations": 6, "Offences": 13, "Health and Safety": 1 } },
                "Road Policing Definitions and Principles": { badge: "", subSubs: { "Mechanically Propelled Vehicle": 3, "Motor Vehicle": 7, "Driver": 1, "Drive and Driving": 7, "Attempting to Drive": 1, "In Charge": 3, "Road": 10, "Public Place": 4, "Use, Cause or Permit": 9, "Defences in Relation to Road Policing Offences": 16 } },
                "Key Police Powers Relating to Road Policing": { badge: "Bronze", subSubs: { "Power to Stop a Vehicle": 7, "Road Checks": 13, "Power to Require Production of a Driving Licence": 7, "Power to Require Name and Address/Insurance/Test Certificate": 5, "Power to Seize Vehicles Driven without Licence or Insurance": 10, "Duty to Give Information as to Identity to Driver": 13 } },
                "Offences Involving Standards of Driving": { badge: "", subSubs: { "Causing Death by Dangerous Driving": 17, "Causing Serious Injury by Dangerous Driving": 2, "Dangerous Driving": 13, "Causing Death by Careless Driving When Under the Influence of Drink or Drugs": 6, "Causing Death by Careless or Inconsiderate Driving": 6, "Causing Death by Driving: Unlicensed, Disqualified or Uninsured Drivers": 7, "Careless and Inconsiderate Driving": 16, "The Highway Code": 6 } },
                "Drink, Drugs and Driving": { badge: "", subSubs: { "Introduction": 2, "Unfit Through Drink or Drugs": 16, "Over Prescribed Limit": 13, "Preliminary Tests": 46, "Evidential Specimens": 50, "Hospital Procedure": 3, "Detention of Persons Affected": 6 } }
            }
        }
    },


    startMockExam: function (examName) {
        // Always start a fresh mock exam by clearing any saved progress
        localStorage.removeItem('saved_exam_progress');
        // Continue with setting up the exam


        this.selectedCategory = examName;
        this.currentFormat = 'Mock Exam';
        this.currentMode = 'Mock Exam';
        this.selectedFormat = 'Mock Exam';

        const examsData = {
            'Sergeant Exam': {
                iconBg: '#bfdbfe', iconSrc: '../images/sergeant-chevron.svg',
                desc: 'Comprehensive mock exam covering all sergeant level responsibilities.',
                q: 150, d: '3h 15m', pass: '55%'
            },
            'Inspector Exam': {
                iconBg: '#bfdbfe', iconSrc: '../images/inspector-pip.svg',
                desc: 'Comprehensive mock exam covering all inspector level responsibilities.',
                q: 150, d: '3h 15m', pass: '55%'
            },
            'National Investigators Exam': {
                iconBg: '#bfdbfe', iconSrc: '../images/nie-magnifier.svg',
                desc: 'Assess your investigative skills and knowledge.',
                q: 80, d: '2h', pass: '55%'
            }
        };
        const data = examsData[examName] || examsData['Sergeant Exam'];

        const nppfTag = examName.includes('Sergeant') || examName.includes('Inspector')
            ? `<div style="display: inline-block; background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 600; padding: 2px 8px; border-radius: 8px; margin: 6px 0;">NPPF Step 2</div>`
            : '';

        const cardHtml = `
            <div class="format-card" style="flex-direction: column; align-items: stretch; padding: 20px; border: none; margin-bottom: 16px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                    <div style="display: flex; align-items: flex-start; width: 100%;">
                        <div style="background: ${data.iconBg}; width: 64px; height: 64px; margin-right: 16px; border-radius: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                            <img src="${data.iconSrc}" style="width: 52px; height: 52px; object-fit: contain;" alt="${examName}">
                        </div>
                        <div style="flex: 1;">
                            <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0; line-height: 1.3;">${examName}</h3>
                            ${nppfTag}
                            <p style="font-size: 13px; color: #64748b; margin: 2px 0 0 0; line-height: 1.4;">${data.desc}</p>
                        </div>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; width: 100%; text-align: left; padding-top: 16px; border-top: 1.5px solid rgba(15, 23, 42, 0.04);">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 34px; height: 34px; border-radius: 9px; background: #eff6ff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #466ba9;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        </div>
                        <div>
                            <div style="font-size: 11px; color: #64748b; margin-bottom: 2px;">Questions</div>
                            <div style="font-size: 14px; font-weight: 700; color: #0f172a;">${data.q}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 34px; height: 34px; border-radius: 9px; background: #f0f9ff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #0284c7;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        </div>
                        <div>
                            <div style="font-size: 11px; color: #64748b; margin-bottom: 2px;">Duration</div>
                            <div style="font-size: 14px; font-weight: 700; color: #0f172a;">${data.d}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 34px; height: 34px; border-radius: 9px; background: #ecfdf5; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #10b981;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                        </div>
                        <div>
                            <div style="font-size: 11px; color: #64748b; margin-bottom: 2px;">Pass Mark</div>
                            <div style="font-size: 14px; font-weight: 700; color: #0f172a;">${data.pass}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('exam-details-card-container');
        if (container) container.innerHTML = cardHtml;

        this.navigate('view-exam-details');
    },

    beginMockSimulation: function () {
        if (this.selectedCategory === 'National Investigators Exam') {
            this.totalQuestions = 30; // Temporarily set to 30 for testing
        } else {
            this.totalQuestions = 30; // Temporarily set to 30 for testing
        }
        this.mockAnswers = new Array(this.totalQuestions).fill(null);
        this.navigate('view-active');
    },

    resumeMockQuiz: function () {
        const saved = localStorage.getItem('saved_exam_progress');
        let data = null;
        let isMock = false;
        if (saved) {
            data = JSON.parse(saved);
            if (data.currentFlow === 'mock' || data.selectedCategory === 'Mock Exam' || data.selectedCategory === 'Promotion Exam') {
                isMock = true;
            }
        }

        if (isMock) {
            this.currentFlow = data.currentFlow || 'mock';
            this.selectedCategory = data.selectedCategory || 'Mock Exam';
            this.selectedFormat = data.selectedFormat || 'Standard Quiz';
            this.currentMode = data.currentMode || 'Mock Exam';
            this.currentDifficulty = data.currentDifficulty || 'Intermediate';
            this.selectedExam = data.selectedExam || 'NPPF Step 2 Mock Exam';

            this.isResuming = true;
            this.resumedData = data;

            this.navigate('view-active');
        } else {
            this.currentFlow = 'mock';
            this.selectedCategory = 'Mock Exam';
            this.selectedFormat = 'Standard Quiz';
            this.currentMode = 'Mock Exam';
            this.currentDifficulty = 'Intermediate';
            this.selectedExam = 'NPPF Step 2 Mock Exam';
            this.navigate('view-active');
        }
    },

    startFlow: function (flowName) {
        this.currentFlow = flowName;
        this.launchedFromProgress = false;
        if (flowName === 'live') {
            this.navigate('view-live-list');
        } else if (flowName === 'mock') {
            this.navigate('view-mock-exams');
        } else if (flowName === 'mixed') {
            this.selectedMixedTopics = [];
            this.updateMixedTopicUI();
            this.navigate('view-mixed-topic-selection');
        } else if (flowName === 'topic') {
            this.selectedExam = 'General';
            this.initPracticeAids();
        } else {
            const headerTitle = document.querySelector('#view-category .header-title');
            const categoryList = document.getElementById('view-category-list');
            const categoryGrid = document.getElementById('view-category-grid');

            if (flowName === 'quick' || flowName === 'colleague') {
                if (headerTitle) headerTitle.innerText = 'Quiz Category';
                if (categoryList) categoryList.style.display = 'none';
                if (categoryGrid) categoryGrid.style.display = 'grid';
            } else {
                if (headerTitle) headerTitle.innerText = 'Choose Exam';
                if (categoryList) categoryList.style.display = 'flex';
                if (categoryGrid) categoryGrid.style.display = 'none';
            }
            this.navigate('view-category');
        }
    },

    handleCategorySelection: function (category) {
        if (this.currentFlow === 'quick') {
            // Quick play goes directly to active quiz...
            this.navigate('view-active', { category: category, mode: 'Quick Play', count: 5 });
        } else {
            // Colleague flow goes to Format selection
            this.navigate('view-format', { category: category });
        }
    },

    handleDifficultySelection: function (difficulty) {
        if (this.currentFlow === 'colleague') {
            this.navigate('view-participants', { difficulty: difficulty });
        } else {
            this.currentDifficulty = difficulty;
            this.startCountdown();
        }
    },


    toggleMixedTopic: function (topic) {
        const index = this.selectedMixedTopics.indexOf(topic);
        if (index > -1) {
            this.selectedMixedTopics.splice(index, 1);
        } else {
            this.selectedMixedTopics.push(topic);
        }
        this.updateMixedTopicUI();
    },

    updateMixedTopicUI: function () {
        const topics = ['Criminal Law', 'Traffic', 'Custody', 'Evidence', 'Domestic Abuse', 'Detectives', 'PACE'];
        topics.forEach(t => {
            const id = t.replace(' ', '-');
            const el = document.getElementById('mixed-topic-' + id);
            const cb = document.getElementById('mixed-checkbox-' + id);
            if (el && cb) {
                if (this.selectedMixedTopics.includes(t)) {
                    el.style.borderColor = '#466ba9';
                    el.style.background = '#eff6ff';
                    cb.style.background = '#466ba9';
                    cb.style.borderColor = '#466ba9';
                    cb.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                } else {
                    el.style.borderColor = 'rgba(15, 23, 42, 0.04)';
                    el.style.background = 'white';
                    cb.style.background = 'transparent';
                    cb.style.borderColor = '#cbd5e1';
                    cb.innerHTML = '';
                }
            }
        });

        const btn = document.getElementById('mixed-continue-btn');
        if (btn) {
            if (this.selectedMixedTopics.length >= 2) {
                btn.disabled = false;
                btn.style.background = 'linear-gradient(to bottom, rgb(134, 174, 244), #4b73b7, #345da5)';
                btn.style.color = 'white';
                btn.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.25)';
            } else {
                btn.disabled = true;
                btn.style.background = '#e2e8f0';
                btn.style.color = '#94a3b8';
                btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            }
        }
    },

    submitMixedTopics: function () {
        if (this.selectedMixedTopics.length >= 2) {
            // They chose the topics, now proceed as Practice By Topic mode but for Mixed
            this.selectedCategory = 'Mixed Practice';
            this.currentFormat = 'Standard Quiz';
            this.currentMode = 'Mixed Practice';
            this.navigate('view-practice-difficulty');
        }
    },

    handleExamSelection: function (examName) {
        this.selectedExam = examName;

        const subtitle = document.getElementById('practice-topic-subtitle');
        if (subtitle) {
            subtitle.innerHTML = examName + ' Exam &middot; Tap a topic to continue.';
        }

        if (this.currentFlow === 'topic' || this.currentFlow === 'mixed') {
            this.navigate('view-practice-topic');
        } else {
            this.navigate('view-topics');
        }
    },

    startPracticeQuiz: function (category) {
        this.selectedCategory = category;
        this.currentFormat = 'Standard Quiz';
        this.currentMode = this.currentFlow === 'mixed' ? 'Mixed Practice' : 'Practice By Topic';

        if (this.currentFlow === 'topic') {
            this.currentDifficulty = 'Intermediate';
            this.navigate('view-practice-questions');
        } else {
            this.navigate('view-practice-difficulty');
        }
    },

    toggleTopicOptions: function (element, category) {
        const optionsDiv = element.querySelector('.topic-options');
        if (optionsDiv) {
            const isHidden = optionsDiv.style.display === 'none';
            document.querySelectorAll('.topic-options').forEach(el => el.style.display = 'none');
            optionsDiv.style.display = isHidden ? 'grid' : 'none';
        }
    },

    startPracticeQuizWithCount: function (event, category, count) {
        if (event) event.stopPropagation();
        this.selectedCategory = category;
        this.currentFormat = 'Standard Quiz';
        this.currentMode = this.currentFlow === 'mixed' ? 'Mixed Practice' : 'Practice By Topic';
        this.currentDifficulty = 'Intermediate';
        this.startCountdownWithCount(count);
    },

    handlePracticeDifficultySelection: function (difficulty) {
        this.currentDifficulty = difficulty;
        this.navigate('view-practice-questions');
    },

    startCountdownWithCount: function (count) {
        this.currentCount = count;

        if (document.getElementById('difficulty-category-title')) {
            document.getElementById('difficulty-category-title').innerText = this.selectedCategory;
        }
        if (document.getElementById('preview-title')) {
            document.getElementById('preview-title').innerText = this.selectedCategory;
        }
        if (document.getElementById('preview-mode')) {
            document.getElementById('preview-mode').innerText = this.currentMode;
        }
        if (document.getElementById('preview-count')) {
            document.getElementById('preview-count').innerText = count;
        }
        if (document.getElementById('preview-difficulty')) {
            document.getElementById('preview-difficulty').innerText = this.currentDifficulty;
        }

        this.navigate('view-active');
    },



    handleRating: function (btn, type) {
        const container = btn.closest('.question-rating');
        if (container) {
            container.querySelectorAll('.rating-btn').forEach(b => {
                b.classList.remove('selected-helpful', 'selected-poor', 'selected-report');
            });
        }

        btn.classList.add('selected-' + type);

        if (type === 'report') {
            this.openReportSheet();
        } else {
            this.showToast('✅ Thank You<br>Your feedback helps improve future questions. 🙏');
        }
    },

    openReportSheet: function () {
        const overlay = document.getElementById('report-sheet-overlay');
        const sheet = document.getElementById('report-sheet');
        if (overlay && sheet) {
            overlay.classList.remove('hidden');
            sheet.classList.remove('hidden');

            // reset form
            document.querySelectorAll('input[name="report_reason"]').forEach(r => r.checked = false);
            document.getElementById('report-other-container').style.display = 'none';
            document.getElementById('report-other-text').value = '';
        }
    },

    closeReportSheet: function () {
        const overlay = document.getElementById('report-sheet-overlay');
        const sheet = document.getElementById('report-sheet');
        if (overlay && sheet) {
            overlay.classList.add('hidden');
            sheet.classList.add('hidden');
        }
    },

    toggleReportOther: function (show) {
        const container = document.getElementById('report-other-container');
        if (container) {
            container.style.display = show ? 'block' : 'none';
            if (show) {
                const ta = document.getElementById('report-other-text');
                if (ta) ta.focus();
            }
        }
    },

    submitReport: function () {
        const selected = document.querySelector('input[name="report_reason"]:checked');
        if (!selected) {
            this.showToast('Please select a reason for reporting.');
            return;
        }

        const reason = selected.value;
        if (reason === 'Other') {
            const text = document.getElementById('report-other-text').value.trim();
            if (!text) {
                this.showToast('Please describe the issue.');
                return;
            }
        }

        this.closeReportSheet();
        this.showToast('✅ Thank You<br>Your feedback helps improve future questions. 🙏');
    },

    showToast: function (message) {
        const existingToast = document.getElementById('quiz-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.id = 'quiz-toast';
        toast.className = 'quiz-toast';
        toast.innerHTML = message;
        document.querySelector('.app-container').appendChild(toast);

        // Trigger reflow and show
        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    },

    // --- Routing & Navigation ---
    stopConfetti: function () {
        QuizEngine.isConfettiActive = false;
        if (typeof confetti === 'function' && QuizEngine.myConfetti) {
            QuizEngine.myConfetti.reset();
        }
    },
    navigate: function (viewId, params = {}, fromPopState = false) {
        this.stopConfetti();
        const currentView = document.querySelector('.quiz-view.active');
        const nextView = document.getElementById(viewId);

        if (!nextView) return;

        if (viewId !== 'view-active' && viewId !== 'view-skipped-questions') {
            if (this.timerInterval) clearInterval(this.timerInterval);
        }

        // Push to history
        if (!fromPopState) {
            this.history.push(viewId);
            window.history.pushState({ viewId: viewId, index: this.history.length - 1 }, "", `#${viewId}`);
        }

        // Handle params mapping
        if (params.category) {
            document.getElementById('difficulty-category-title').innerText = params.category;
            this.selectedCategory = params.category;
        }
        if (params.format) {
            this.selectedFormat = params.format;
        }

        if (params.mode) {
            this.currentMode = params.mode;
            if (document.getElementById('preview-title')) document.getElementById('preview-title').innerText = document.getElementById('difficulty-category-title').innerText;
            if (document.getElementById('preview-mode')) document.getElementById('preview-mode').innerText = params.mode;
            if (document.getElementById('preview-count')) document.getElementById('preview-count').innerText = params.count;
            if (document.getElementById('preview-xp')) document.getElementById('preview-xp').innerText = params.count * 25;
        }

        if (params.difficulty) {
            this.currentDifficulty = params.difficulty;
        }
        if (viewId === 'view-challenge-confirm') {
            document.getElementById('confirm-level').innerText = params.difficulty || 'Intermediate';
            document.getElementById('confirm-category').innerText = this.selectedCategory || 'Criminal Law';
            document.getElementById('confirm-format').innerText = this.selectedFormat || 'Standard Quiz';
            const selectedOpponent = document.querySelector('.colleague-row-card.selected h3');
            if (selectedOpponent) document.getElementById('confirm-opponent').innerText = selectedOpponent.innerText;

            const selectedOpponentImg = document.querySelector('.colleague-row-card.selected img');
            if (selectedOpponentImg && document.getElementById('waiting-opponent-img')) {
                document.getElementById('waiting-opponent-img').src = selectedOpponentImg.src;
            }

            // Simulate opponent accepting after 3.5 seconds
            setTimeout(() => {
                if (document.getElementById('view-challenge-confirm').classList.contains('active')) {
                    const title = document.getElementById('waiting-title');
                    if (title) {
                        title.innerText = "Match Found!";
                        title.style.color = "#22c55e"; // Proper green text
                        title.style.animation = "popIn 0.5s ease-out";
                    }
                    const subtitle = document.getElementById('waiting-subtitle');
                    if (subtitle) subtitle.innerText = "Starting challenge...";

                    const spinner = document.getElementById('waiting-spinner');
                    if (spinner) {
                        spinner.style.animation = "none";
                        spinner.innerHTML = '<polyline points="20 6 9 17 4 12" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>';
                        spinner.parentElement.style.animation = "success-pulse 0.6s ease-out";
                    }

                    document.getElementById('confirm-opponent').style.color = "#1e293b";

                    const oppImg = document.getElementById('waiting-opponent-img');
                    if (oppImg) {
                        oppImg.style.opacity = "1";
                        oppImg.style.filter = "grayscale(0%)";
                    }
                    const oppBorder = document.getElementById('waiting-opponent-border');
                    if (oppBorder) {
                        oppBorder.style.borderColor = "#10b981";
                        oppBorder.style.animation = "success-pulse 0.6s ease-out";
                    }

                    const userAvatar = document.getElementById('current-user-avatar');
                    if (userAvatar) {
                        userAvatar.style.borderColor = "#10b981";
                        userAvatar.style.animation = "success-pulse 0.6s ease-out";
                    }

                    const ring = document.getElementById('waiting-opponent-ring');
                    if (ring) {
                        ring.style.display = "none";
                    }

                    const vsBadge = document.getElementById('vs-badge');
                    if (vsBadge) {
                        vsBadge.style.animation = "bounceIn 0.6s ease-out";
                        vsBadge.style.background = "linear-gradient(135deg, #10b981, #34d399)";
                        vsBadge.style.transform = "scale(1.15)";
                        vsBadge.style.boxShadow = "0 8px 20px rgba(16,185,129,0.4)";
                    }
                    const vsText = document.getElementById('vs-badge-text');
                    if (vsText) {
                        vsText.style.color = "white";
                    }

                    setTimeout(() => {
                        QuizEngine.startCountdown();
                    }, 3000);
                }
            }, 3500);
        }

        // Switch views instantly (without buggy fade class)
        if (currentView) {
            currentView.classList.remove('active');
        }
        nextView.classList.add('active');

        // Reset scroll position to top for the newly active view
        setTimeout(() => {
            const scrollable = nextView.querySelector('.view-content, .content-area');
            if (scrollable) {
                scrollable.scrollTop = 0;
            }
            nextView.scrollTop = 0;
            window.scrollTo(0, 0);
        }, 10);

        // Special initializers
        if (viewId === 'view-active') {
            if (!this.isReviewingSkipped) {
                this.initActiveQuiz();
            }
        } else {
            this.updateSkippedNavigatorBar();
        }
        if (viewId === 'view-leaderboard') this.initLeaderboard();
        if (viewId === 'view-analytics') this.initAnalytics();
        if (viewId === 'view-achievements') this.initAchievements();
        if (viewId === 'view-progress') this.initProgress();
    },

    navigateBack: function () {
        if (this.history.length <= 1) {
            window.location.href = 'menu.html';
            return;
        }
        // Native back triggers the popstate listener
        window.history.back();
    },

    confirmExit: function () {
        const overlay = document.getElementById('exit-confirm-overlay');
        if (overlay) {
            const titleEl = overlay.querySelector('h3');
            const descEl = overlay.querySelector('p');

            // Check if current flow is an exam/practice flow
            const isExamFlow = (this.currentFlow === 'mock');
            const isPracticeFlow = (this.currentFlow === 'topic' || this.currentFlow === 'mixed');

            if (isExamFlow) {
                if (titleEl) titleEl.innerText = 'Exit Exam?';
                if (descEl) descEl.innerText = 'What would you like to do with your current progress?';

                // Show vertical three-button stack and hide horizontal two buttons
                const twoButtons = document.getElementById('exit-two-buttons');
                const threeButtons = document.getElementById('exit-three-buttons');
                if (twoButtons) twoButtons.style.display = 'none';
                if (threeButtons) threeButtons.style.display = 'flex';
            } else if (isPracticeFlow) {
                if (titleEl) titleEl.innerText = 'Exit Practice?';
                if (descEl) descEl.innerText = 'Are you sure you want to exit? Your practice progress will be lost.';

                // Show horizontal two buttons and hide vertical three-button stack
                const twoButtons = document.getElementById('exit-two-buttons');
                const threeButtons = document.getElementById('exit-three-buttons');
                if (twoButtons) twoButtons.style.display = 'flex';
                if (threeButtons) threeButtons.style.display = 'none';
            } else {
                if (titleEl) titleEl.innerText = 'Exit Quiz?';
                if (descEl) descEl.innerText = 'Are you sure you want to exit? Your quiz progress will be lost.';

                // Show horizontal two buttons and hide vertical three-button stack
                const twoButtons = document.getElementById('exit-two-buttons');
                const threeButtons = document.getElementById('exit-three-buttons');
                if (twoButtons) twoButtons.style.display = 'flex';
                if (threeButtons) threeButtons.style.display = 'none';
            }

            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            overlay.querySelector('.exit-confirm-modal').style.transform = 'scale(1)';
        } else {
            // fallback
            if (confirm("Are you sure you want to exit? Your progress will be lost.")) {
                this.navigateBack();
            }
        }
    },

    cancelExit: function () {
        const overlay = document.getElementById('exit-confirm-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.querySelector('.exit-confirm-modal').style.transform = 'scale(1.1)';
        }
    },

    proceedExit: function () {
        this.cancelExit();
        this.navigateBack();

        if (this.currentMode === 'Practice By Topic' || this.currentMode === 'Mixed Practice' || this.currentFlow === 'topic' || this.currentFlow === 'mixed') {
            const returnView = this.history.length >= 2 ? this.history[this.history.length - 2] : null;
            if (returnView === 'view-practice-topic') {
                this.practiceAidsStep = 1;
                this.practiceSelectedMains = [];
                this.practiceExpandedMains = [];
                this.practiceSelectedSubs = [];
                this.practiceSelectedSubSubs = [];
                this.practiceCollapsedSubs = [];
                this.practiceSelectedCount = null;

                document.querySelectorAll('#practice-count-selector .count-btn').forEach(btn => {
                    btn.style.background = '#ffffff';
                    btn.style.color = '#64748b';
                    btn.style.borderColor = '#cbd5e1';
                    btn.style.boxShadow = 'none';
                });

                const step3 = document.getElementById('practice-step-3');
                const step2 = document.getElementById('practice-step-2');
                const step1 = document.getElementById('practice-step-1');
                if (step3) step3.style.display = 'none';
                if (step2) step2.style.display = 'none';
                if (step1) step1.style.display = 'block';
                const title = document.getElementById('practice-aids-title');
                if (title) title.innerText = 'Select Main Topics';
                const footer = document.getElementById('practice-aids-footer');
                if (footer) footer.style.transform = 'translateY(100%)';

                this.renderPracticeStep1();
            }
        }
    },

    exitAndSaveProgress: function () {
        const progressData = {
            currentFlow: this.currentFlow,
            selectedCategory: this.selectedCategory,
            selectedFormat: this.selectedFormat,
            currentMode: this.currentMode,
            currentDifficulty: this.currentDifficulty,
            selectedExam: this.selectedExam || 'Mock Exam',
            totalQuestions: this.totalQuestions,
            currentQuestion: this.currentQuestion,
            score: this.score,
            streak: this.streak,
            bestStreak: this.bestStreak,
            totalXp: this.totalXp,
            timeLeft: this.timeLeft,
            mockAnswers: this.mockAnswers
        };
        localStorage.setItem('saved_exam_progress', JSON.stringify(progressData));
        this.cancelExit();
        this.updateResumeWidget();
        this.returnHome();
    },

    confirmExitAndDiscard: function () {
        this.cancelExit();
        const overlay = document.getElementById('discard-confirm-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            overlay.querySelector('.exit-confirm-modal').style.transform = 'scale(1)';
        }
    },

    cancelDiscardConfirm: function () {
        const overlay = document.getElementById('discard-confirm-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.querySelector('.exit-confirm-modal').style.transform = 'scale(1.1)';
        }
        // Go back to exit main dialog
        this.confirmExit();
    },

    proceedDiscardExit: function () {
        const overlay = document.getElementById('discard-confirm-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.querySelector('.exit-confirm-modal').style.transform = 'scale(1.1)';
        }
        // Permanently delete current progress
        localStorage.removeItem('saved_exam_progress');
        this.updateResumeWidget();

        this.navigateBack();
        if (this.currentMode === 'Practice By Topic' || this.currentMode === 'Mixed Practice' || this.currentFlow === 'topic' || this.currentFlow === 'mixed') {
            const returnView = this.history.length >= 2 ? this.history[this.history.length - 2] : null;
            if (returnView === 'view-practice-topic') {
                this.practiceAidsStep = 1;
                this.practiceSelectedMains = [];
                this.practiceExpandedMains = [];
                this.practiceSelectedSubs = [];
                this.practiceSelectedSubSubs = [];
                this.practiceCollapsedSubs = [];
                this.practiceSelectedCount = null;

                document.querySelectorAll('#practice-count-selector .count-btn').forEach(btn => {
                    btn.style.background = '#ffffff';
                    btn.style.color = '#64748b';
                    btn.style.borderColor = '#cbd5e1';
                    btn.style.boxShadow = 'none';
                });

                const step3 = document.getElementById('practice-step-3');
                const step2 = document.getElementById('practice-step-2');
                const step1 = document.getElementById('practice-step-1');
                if (step3) step3.style.display = 'none';
                if (step2) step2.style.display = 'none';
                if (step1) step1.style.display = 'block';
                const title = document.getElementById('practice-aids-title');
                if (title) title.innerText = 'Select Main Topics';
                const footer = document.getElementById('practice-aids-footer');
                if (footer) footer.style.transform = 'translateY(100%)';

                this.renderPracticeStep1();
            }
        }
    },

    cancelResumeExam: function () {
        const overlay = document.getElementById('resume-exam-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.querySelector('.exit-confirm-modal').style.transform = 'scale(1.1)';
        }
    },

    proceedResumeExam: function () {
        this.cancelResumeExam();
        this.resumeMockQuiz();
    },

    resultCtaIcons: {
        review: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14h6"/><path d="M9 18h6"/><path d="M9 10h6"/>',
        'practice-weak': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
        back: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
        'mock-exam': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>',
        'practice-topic': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
        'play-again': '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
        challenge: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="m16 16 4 4"/><path d="m19 21 2-2"/>',
        leaderboard: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
        rematch: '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',
        'match-details': '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
    },

    updateNextQuestionBtn: function () {
        const btn = document.getElementById('inline-next-btn');
        if (!btn) return;
        const isLast = this.currentQuestion >= this.totalQuestions;
        const arrowSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
        btn.innerHTML = isLast ? `View Result ${arrowSvg}` : `Next Question ${arrowSvg}`;
    },

    buildResultCta: function (label, iconKey, onclick, variant = 'primary', width = '') {
        const paths = this.resultCtaIcons[iconKey] || '';
        const widthClass = width ? ` result-cta-btn--${width}` : '';
        return `<button class="result-cta-btn result-cta-btn--${variant}${widthClass}" onclick="${onclick}">
            <svg class="result-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>
            <span class="result-cta-label">${label}</span>
        </button>`;
    },

    setResultBackLink: function (label, onclick) {
        const backEl = document.getElementById('solo-completion-back');
        if (!backEl) return;
        if (!label) {
            backEl.style.display = 'none';
            return;
        }
        const btn = backEl.querySelector('button');
        if (btn) {
            btn.setAttribute('onclick', onclick);
            const labelEl = btn.querySelector('span');
            if (labelEl) labelEl.textContent = label;
        }
        backEl.style.display = 'flex';
    },

    renderResultActions: function (container, buttons) {
        if (!container) return;
        let countClass = '';
        if (buttons.length === 1) {
            countClass = 'result-sticky-actions--single';
        } else if (buttons.length >= 3) {
            countClass = 'result-sticky-actions--stacked';
        } else if (buttons.length === 2) {
            const hasSplitLayout = buttons.some(b => b.includes('result-cta-btn--compact'))
                && buttons.some(b => b.includes('result-cta-btn--grow'));
            countClass = hasSplitLayout ? 'result-sticky-actions--duo' : '';
        }
        container.className = `result-sticky-actions ${countClass}`.trim();
        container.innerHTML = buttons.join('');
    },

    returnHome: function () {
        this.stopConfetti();
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.history = ['view-hub'];
        window.history.pushState({ viewId: 'view-hub', index: 0 }, "", `#view-hub`);
        document.querySelectorAll('.quiz-view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-hub').classList.add('active');
    },

    restartFlow: function (flowName) {
        this.stopConfetti();
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.history = ['view-hub'];
        window.history.pushState({ viewId: 'view-hub', index: 0 }, "", `#view-hub`);
        document.querySelectorAll('.quiz-view').forEach(v => v.classList.remove('active'));
        this.startFlow(flowName);
    },

    returnToProgress: function () {
        this.stopConfetti();
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.history = ['view-hub'];
        window.history.pushState({ viewId: 'view-hub', index: 0 }, "", `#view-hub`);
        document.querySelectorAll('.quiz-view').forEach(v => v.classList.remove('active'));
        this.navigate('view-progress');
    },

    wrongQuestionsMockData: {
        'Homicide': [
            {
                q: "In the law of murder, what does the term 'malice aforethought' encompass?",
                opts: ["Only an express intent to kill", "An intent to kill or an intent to cause grievous bodily harm (GBH)", "Recklessness as to whether death or GBH is caused", "Negligence resulting in death"],
                correct: 1,
                selected: 2,
                expWrong: "Under English law, the mens rea for murder is 'malice aforethought', which has been judicially defined to include either an intent to kill (express malice) or an intent to cause grievous bodily harm (implied malice). Recklessness is not sufficient for murder (though it may suffice for manslaughter)."
            },
            {
                q: "A defendant strikes a victim with a heavy iron bar, intending only to break their arm, but the victim dies. Is the defendant liable for murder?",
                opts: ["No, because there was no intent to kill", "Yes, because the defendant intended to cause grievous bodily harm (GBH)", "No, because it is manslaughter under the constructive trust rule", "Yes, because any assault leading to death is automatically murder"],
                correct: 1,
                selected: 0,
                expWrong: "Under the doctrine of implied malice, an intent to cause grievous bodily harm (GBH) is sufficient mens rea for murder. Since striking someone with a heavy iron bar to break their arm constitutes an intent to cause GBH, the defendant is liable for murder despite not intending to kill."
            }
        ],
        'Disclosure': [
            {
                q: "Under the Criminal Procedure and Investigations Act (CPIA) 1996, what is the purpose of the MG6C schedule?",
                opts: ["To list sensitive material", "To list non-sensitive material", "To list witness statements", "To outline the prosecution case"],
                correct: 1,
                selected: 0,
                expWrong: "The MG6C form is used to schedule non-sensitive unused material. Sensitive material is scheduled on the MG6D form."
            },
            {
                q: "When must the prosecution disclose unused material to the defense under the CPIA 1996?",
                opts: ["Only if it might reasonably be considered capable of undermining the prosecution case or assisting the defense case", "Any material that the police have collected during the investigation, regardless of relevance", "Only material that the prosecution intends to rely on at trial", "Only if requested by the defense solicitor"],
                correct: 0,
                selected: 1,
                expWrong: "The statutory test for prosecution disclosure under Section 3 of the CPIA 1996 requires the disclosure of unused material only if it meets the 'disclosure test'—meaning it might reasonably be considered capable of undermining the prosecution case or assisting the defense case."
            }
        ]
    },

    showWrongQuestions: function (topic) {
        const titleEl = document.getElementById('wrong-questions-title');
        const contentEl = document.getElementById('wrong-questions-content');

        let questions = this.wrongQuestionsMockData[topic] || [];

        titleEl.innerText = topic === 'Homicide' ? 'Homicide — Intent' : 'Disclosure — CPIA Schedules';

        contentEl.innerHTML = '';

        if (questions.length === 0) {
            contentEl.innerHTML = '<div style="text-align: center; color: #64748b; padding: 20px;">No wrong questions found for this section.</div>';
        } else {
            questions.forEach((qData, qIndex) => {
                let optionsHTML = qData.opts.map((opt, oIndex) => {
                    let style = "padding: 12px 14px; border-radius: 10px; font-size: 14px; font-weight: 500; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; border: 1.5px solid #e2e8f0; background: #ffffff; color: #334155;";
                    let icon = '';

                    if (oIndex === qData.correct) {
                        style = "padding: 12px 14px; border-radius: 10px; font-size: 14px; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; border: 1.5px solid #10b981; background: #ecfdf5; color: #065f46;";
                        icon = '<span style="font-size: 16px; font-weight: 700; color: #10b981;">✅</span>';
                    } else if (oIndex === qData.selected) {
                        style = "padding: 12px 14px; border-radius: 10px; font-size: 14px; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; border: 1.5px solid #ef4444; background: #fef2f2; color: #991b1b;";
                        icon = '<span style="font-size: 16px; font-weight: 700; color: #ef4444;">❌</span>';
                    }

                    return `<div style="${style}">${opt} ${icon}</div>`;
                }).join('');

                contentEl.innerHTML += `
                    <div style="background: white; border-radius: 16px; padding: 18px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03); border: 1px solid rgba(15, 23, 42, 0.04); text-align: left;">
                        <div style="font-size: 12px; font-weight: 700; color: #ef4444; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Question ${qIndex + 1}</div>
                        <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 14px 0; line-height: 1.4;">${qData.q}</h4>
                        <div style="margin-bottom: 16px;">${optionsHTML}</div>
                        <div style="background: #f3e8ff; border-radius: 12px; padding: 12px; border: 1px solid rgba(139, 92, 246, 0.08);">
                            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; font-size: 11px; font-weight: 800; color: #8b5cf6; text-transform: uppercase; letter-spacing: 0.5px;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"></path>
                                </svg>
                                AI Explanation
                            </div>
                            <p style="margin: 0; font-size: 13px; line-height: 1.45; color: #5b21b6;">${qData.expWrong}</p>
                        </div>
                    </div>
                `;
            });
        }

        const sheet = document.getElementById('wrong-questions-sheet');
        const backdrop = document.getElementById('wrong-questions-sheet-backdrop');

        backdrop.style.opacity = '1';
        backdrop.style.pointerEvents = 'auto';
        sheet.style.transform = 'translateY(0)';
    },

    closeWrongQuestions: function () {
        const sheet = document.getElementById('wrong-questions-sheet');
        const backdrop = document.getElementById('wrong-questions-sheet-backdrop');

        backdrop.style.opacity = '0';
        backdrop.style.pointerEvents = 'none';
        sheet.style.transform = 'translateY(100%)';
    },



    // --- Countdown & Quiz Start ---
    startCountdown: function () {
        const overlay = document.getElementById('countdown-overlay');
        const numberEl = document.getElementById('countdown-number');
        overlay.classList.remove('hidden');

        let count = 3;
        numberEl.innerText = count;

        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                numberEl.innerText = count;
                // Force reflow for animation restart
                numberEl.style.animation = 'none';
                numberEl.offsetHeight;
                numberEl.style.animation = null;
            } else {
                clearInterval(interval);
                overlay.classList.add('hidden');
                this.navigate('view-active');
            }
        }, 1000);
    },


    // --- Active Quiz State ---
    currentQuestion: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalQuestions: 5,

    questionsData: [
        {
            q: "Sandford CID is conducting two investigations. In the first case, CARTER, following an all-day drinking session, goes home and assaults his girlfriend, breaking her arm. In the second, QUENTIN decides to exact revenge with a baseball bat on STEVENS for assaulting QUENTIN's brother, and prior to going round to STEVENS' house, he drinks a bottle of whisky to build up his courage. The injuries to CARTER's girlfriend and STEVENS are considered to amount to grievous bodily harm.\n\nWho, if either, may have a defence of intoxication against a charge of wounding with intent contrary to s. 18 of the Offences Against the Person Act 1861?",
            opts: ["CARTER's voluntary intoxication can be raised as a defence to GBH with intent, but QUENTIN's cannot as he consumed alcohol to build up the courage to commit the offence for which he formed the mens rea whilst sober.", "CARTER cannot be excused due to his voluntary intoxication, whereas QUENTIN can raise the defence if he can show his actions went beyond that originally intended.", "Neither CARTER nor QUENTIN can raise the defence, as both of them made a conscious decision to become intoxicated and hence they could have foreseen such matters arising.", "Both CARTER and QUENTIN can raise the defence, as GBH with intent is an offence of specific intent, and hence they cannot form the mens rea when voluntarily intoxicated."],
            correct: 0,
            expCorrect: "This question requires you to consider voluntary intoxication in the context of specific and basic intent offences.\n\nGenerally speaking, specific intent offences are those where the mens rea may only be formed by the defendant having the intent. Basic intent offences are those where the mens rea can be formed by intent or recklessness.\n\nVoluntary intoxication cannot be used as a defence to basic intent offences, such as criminal damage, however, it can be used for specific intent offences.\n\ns. 18 of the Offences Against the Person Act is a specific intent offence, and as such voluntary intoxication can be used as a defence. CARTER therefore has a defence to a s. 18 GBH with intent, but he may be charged with s. 20 GBH as that does not require specific intent.\n\nHowever the defence is not available if the intent (mens rea) was formed while the defendant was sober and he became intoxicated in order to build up courage to commit the crime. This is known as the “Dutch courage rule” (AG for Northern Ireland v Gallagher [1963] AC 349). QUENTIN cannot therefore rely on this defence.",
            expWrong: "This question requires you to consider voluntary intoxication in the context of specific and basic intent offences.\n\nGenerally speaking, specific intent offences are those where the mens rea may only be formed by the defendant having the intent. Basic intent offences are those where the mens rea can be formed by intent or recklessness.\n\nVoluntary intoxication cannot be used as a defence to basic intent offences, such as criminal damage, however, it can be used for specific intent offences.\n\ns. 18 of the Offences Against the Person Act is a specific intent offence, and as such voluntary intoxication can be used as a defence. CARTER therefore has a defence to a s. 18 GBH with intent, but he may be charged with s. 20 GBH as that does not require specific intent.\n\nHowever the defence is not available if the intent (mens rea) was formed while the defendant was sober and he became intoxicated in order to build up courage to commit the crime. This is known as the “Dutch courage rule” (AG for Northern Ireland v Gallagher [1963] AC 349). QUENTIN cannot therefore rely on this defence."
        },
        {
            q: "Which one of the following offences is not an offence of specific intent?",
            opts: ["Blackmail, contrary to s21 of the Theft Act 1968.", "Burglary, contrary to s9(1)(b) of the Theft Act 1968.", "Contamination of goods, contrary to s38(1) of the Public Order Act 1986.", "Inflicting grievous bodily harm with intent, contrary to s18 of the Offences Against the Person Act 1861."],
            correct: 1,
            expCorrect: "Blackmail, contamination of goods and inflicting grievous bodily harm are all offences of specific intent as an intention to bring about a specific consequence.\n\nBurglary, contrary to s. 9(1)(a) of the Theft Act 1968, is an offence of specific intent as there is an intent to commit more than just the core act (entering a building) in this case there must be a further intent (inflict grievous bodily harm, cause damage or steal) but burglary contrary to s. 9(1)(b) is an offence of basic intent as the person has already entered the building and is carrying out, or attempting to carry out theft or GBH.",
            expWrong: "Blackmail, contamination of goods and inflicting grievous bodily harm are all offences of specific intent as an intention to bring about a specific consequence.\n\nBurglary, contrary to s. 9(1)(a) of the Theft Act 1968, is an offence of specific intent as there is an intent to commit more than just the core act (entering a building) in this case there must be a further intent (inflict grievous bodily harm, cause damage or steal) but burglary contrary to s. 9(1)(b) is an offence of basic intent as the person has already entered the building and is carrying out, or attempting to carry out theft or GBH."
        },
        {
            q: "ARCHER stands outside a house keeping watch while GRANT burgles the premises. BOWEN encourages his 9-year-old son to pick purses out of shoppers' bags at Sandford Town Centre. CARRINGTON, having planned with PEARSON for PEARSON to commit a robbery, helps PEARSON dispose of the clothing he wore during the offence just two minutes after it took place. CARRINGTON was not present at the robbery itself.\n\nIn which of the circumstances is a person aiding, abetting, counselling or procuring a crime?",
            opts: ["ARCHER and BOWEN only.", "All three.", "BOWEN and CARRINGTON only.", "ARCHER and CARRINGTON only."],
            correct: 3,
            expCorrect: "Secondary liability under s. 8 of the Accessories and Abettors Act 1861 applies to those who aid, abet, counsel or procure the commission of an offence by a principal. The critical point here is that this form of liability depends on the existence of a principal offender whose crime the secondary party assisted or encouraged.\n\nARCHER is clearly a secondary party. Keeping watch outside the premises during the burglary provides practical assistance to GRANT, the principal, at the time the offence is being committed. This is a straightforward case of aiding and abetting.\n\nCARRINGTON is also liable as a secondary party. Although absent from the robbery itself, he was involved in the planning beforehand. Encouraging or advising the commission of an offence prior to it taking place amounts to counselling, and prior planning with knowledge of the intended offence satisfies this. The additional act of helping dispose of clothing just two minutes after the robbery provides further support, with an argument that the offence was still in its final stages. Either way, his prior involvement is sufficient to establish counselling or procuring liability.\n\nBOWEN, however, presents a fundamentally different situation. His son is 9 years old, and under s. 50 of the Children and Young Persons Act 1933, a child below the age of 10 cannot be guilty of any criminal offence. The son, therefore, cannot be a principal to theft. Where a person uses someone who is incapable of criminal responsibility as their instrument to commit an offence, the person directing the incapable agent steps into the role of principal offender and is guilty of the offence as if they had committed it themselves. BOWEN is therefore not aiding, abetting, counselling or procuring theft; he is committing it. He falls outside the scope of secondary liability entirely because there is no separate principal whose crime he is assisting.\n\nThis means only ARCHER and CARRINGTON are secondary parties in the sense the question requires, making option (d) correct.\n\nOption (a) is incorrect because BOWEN is not a secondary party, as he is the principal offender.\n\nOption (b) is incorrect as including BOWEN as an aider/abettor incorrectly classifies his legal position.\n\nOption (c) is incorrect as it excludes ARCHER, whose liability as an aider/abettor is the clearest of the three scenarios.",
            expWrong: "Secondary liability under s. 8 of the Accessories and Abettors Act 1861 applies to those who aid, abet, counsel or procure the commission of an offence by a principal. The critical point here is that this form of liability depends on the existence of a principal offender whose crime the secondary party assisted or encouraged.\n\nARCHER is clearly a secondary party. Keeping watch outside the premises during the burglary provides practical assistance to GRANT, the principal, at the time the offence is being committed. This is a straightforward case of aiding and abetting.\n\nCARRINGTON is also liable as a secondary party. Although absent from the robbery itself, he was involved in the planning beforehand. Encouraging or advising the commission of an offence prior to it taking place amounts to counselling, and prior planning with knowledge of the intended offence satisfies this. The additional act of helping dispose of clothing just two minutes after the robbery provides further support, with an argument that the offence was still in its final stages. Either way, his prior involvement is sufficient to establish counselling or procuring liability.\n\nBOWEN, however, presents a fundamentally different situation. His son is 9 years old, and under s. 50 of the Children and Young Persons Act 1933, a child below the age of 10 cannot be guilty of any criminal offence. The son, therefore, cannot be a principal to theft. Where a person uses someone who is incapable of criminal responsibility as their instrument to commit an offence, the person directing the incapable agent steps into the role of principal offender and is guilty of the offence as if they had committed it themselves. BOWEN is therefore not aiding, abetting, counselling or procuring theft; he is committing it. He falls outside the scope of secondary liability entirely because there is no separate principal whose crime he is assisting.\n\nThis means only ARCHER and CARRINGTON are secondary parties in the sense the question requires, making option (d) correct.\n\nOption (a) is incorrect because BOWEN is not a secondary party, as he is the principal offender.\n\nOption (b) is incorrect as including BOWEN as an aider/abettor incorrectly classifies his legal position.\n\nOption (c) is incorrect as it excludes ARCHER, whose liability as an aider/abettor is the clearest of the three scenarios."
        },
        {
            q: "MANN and his partner GREGORY are having a heated argument whilst GREGORY is having a bath. MANN takes hold of GREGORY and holds her head under the water. GREGORY struggles but then appears to lose consciousness and stop breathing. MANN runs from the house and is later arrested and charged with murder. At Westshire Crown Court MANN states that he knew his actions were virtually certain to kill GREGORY but that he did not have a clear intention to kill her while he was holding her under the water. In such circumstance which one of the following statements is correct?",
            opts: ["The jury must infer that MANN intended to bring about death or serious bodily harm.", "The jury can not infer that MANN intended to bring about death or serious bodily harm.", "The jury may infer that MANN intended to bring about death or serious bodily harm.", "The jury should infer that MANN intended to bring about death or serious bodily harm."],
            correct: 2,
            expCorrect: "The case of R v Nedrick (1986), held that where the defendant was charged with murder and death or serious harm was a virtual certainty from the defendant’s actions and he/she had appreciated that to be the case, the jury may infer that the defendant intended to bring about such consequences.",
            expWrong: "The case of R v Nedrick (1986), held that where the defendant was charged with murder and death or serious harm was a virtual certainty from the defendant’s actions and he/she had appreciated that to be the case, the jury may infer that the defendant intended to bring about such consequences."
        },
        {
            q: "PC BROWN is called to the scene of a fight outside the Three Ferrets Public House in Sandford, where a window has been broken by a brick. The landlord points out ROBINSON as the person responsible. PC BROWN approaches ROBINSON and cautions him, whereupon ROBINSON states that he threw the brick that broke the window, but that he had not intended to cause any damage; he had been aiming at another person outside the pub. ROBINSON accepts that throwing the brick accidentally risked breaking the window.\n\nWhich of the following statements is true regarding any criminal charges that may be brought against ROBINSON?",
            opts: ["ROBINSON could be charged with intentional criminal damage to the window because the malice he had when throwing the brick can be transferred to the damage he caused to the window.", "ROBINSON could be charged with both reckless criminal damage to the window and an offence relating to assault or public order arising from the same act, as these are separate offences with separate elements.", "ROBINSON could be charged with offences relating to assault or public order only, as the malice he had when throwing the brick could not be transferred to the window and so there was no mens rea for criminal damage.", "ROBINSON could be charged with criminal damage as he had the intention of committing a crime at the time he threw the brick, making it irrelevant what crime he was intending to commit."],
            correct: 1,
            expCorrect: "The starting point is s. 1(1) of the Criminal Damage Act 1971, which states that –\n\n(1) A person who without lawful excuse destroys or damages any property belonging to another intending to destroy or damage any such property or being reckless as to whether such property would be destroyed or damaged is guilty of an offence.\n\nROBINSON has admitted throwing the brick. He says he did not intend to break the window but was aiming at another person. This means he did not intend to damage the window. However, intention is not the only route to liability, as recklessness also suffices. A person who throws a brick in the direction of a group of people near a window, regardless of what they were aiming at, is clearly taking an obvious risk that property would be damaged. Under s. 8 of the Criminal Justice Act 1967, a jury will assess whether ROBINSON foresaw that risk and took it anyway. On these facts, a charge of reckless criminal damage is well-founded.\n\nThe concept of transferred malice, sometimes called transferred intent, allows a person’s mens rea towards one victim to be transferred to a different victim of the same type of offence. If ROBINSON had aimed to break one window and broken a different one, that intent could transfer. However, transferred malice does not operate across offences of a fundamentally different nature. An intent to strike a person cannot be transferred to criminal damage, because those are distinct offences protecting distinct interests. Transferring the intent in this way would, in effect, convert an assault into a property offence, which the law does not permit.\n\nCrucially, there is nothing that prevents ROBINSON from being charged with both reckless criminal damage and an assault or public order offence arising from the same throw. Those are separate offences with separate elements, and they affect different victims: the landlord’s property on one hand, and the person ROBINSON was aiming at on the other.\n\nOption (a) is incorrect as the intent to strike a person cannot be transferred to criminal damage, because the two offences are different in nature and protect different interests.\n\nOption (c) is incorrect because criminal damage can be committed recklessly; ROBINSON’s lack of intent to break the window does not mean there was no mens rea.\n\nOption (d) is incorrect as the law does not allow a general criminal intent to substitute for the specific mens rea required for a particular offence.",
            expWrong: "The starting point is s. 1(1) of the Criminal Damage Act 1971, which states that –\n\n(1) A person who without lawful excuse destroys or damages any property belonging to another intending to destroy or damage any such property or being reckless as to whether such property would be destroyed or damaged is guilty of an offence.\n\nROBINSON has admitted throwing the brick. He says he did not intend to break the window but was aiming at another person. This means he did not intend to damage the window. However, intention is not the only route to liability, as recklessness also suffices. A person who throws a brick in the direction of a group of people near a window, regardless of what they were aiming at, is clearly taking an obvious risk that property would be damaged. Under s. 8 of the Criminal Justice Act 1967, a jury will assess whether ROBINSON foresaw that risk and took it anyway. On these facts, a charge of reckless criminal damage is well-founded.\n\nThe concept of transferred malice, sometimes called transferred intent, allows a person’s mens rea towards one victim to be transferred to a different victim of the same type of offence. If ROBINSON had aimed to break one window and broken a different one, that intent could transfer. However, transferred malice does not operate across offences of a fundamentally different nature. An intent to strike a person cannot be transferred to criminal damage, because those are distinct offences protecting distinct interests. Transferring the intent in this way would, in effect, convert an assault into a property offence, which the law does not permit.\n\nCrucially, there is nothing that prevents ROBINSON from being charged with both reckless criminal damage and an assault or public order offence arising from the same throw. Those are separate offences with separate elements, and they affect different victims: the landlord’s property on one hand, and the person ROBINSON was aiming at on the other.\n\nOption (a) is incorrect as the intent to strike a person cannot be transferred to criminal damage, because the two offences are different in nature and protect different interests.\n\nOption (c) is incorrect because criminal damage can be committed recklessly; ROBINSON’s lack of intent to break the window does not mean there was no mens rea.\n\nOption (d) is incorrect as the law does not allow a general criminal intent to substitute for the specific mens rea required for a particular offence."
        },
        {
            q: "There is a general principle that crime requires a guilty state of mind on the part of the accused, referred to by the Latin 'mens rea' as well as an action, 'actus reus'. Consider the following situations:\n\n(i) Peter and Paul are out one night when both want to break a window at the swimming baths. They each pick up a brick and run towards the window but Paul is a better runner, gets to the window first and breaks it with the brick, Peter then drops his brick.\n(ii) Michael does not like Nigel. He goes round to Nigel's house and stands in the street making threats that he is going to break one of his windows. He picks up a stone to throw it just as Nigel comes running out, Michael tells him to stand back but he stands between Michael and the window and is hit by the stone. Michael is glad this has happened as it was better than he originally intended.\n\nWhich of the following statements is true regarding the committing of full offences of criminal damage and assault (ie no account should be taken of possible attempt criminal offences)?",
            opts: ["Peter commits criminal damage, Michael does not commit any offences", "Peter does not commit criminal damage, Michael commits assault if it can be proven that he acted recklessly", "Peter commits criminal damage and Michael commits assault if it can be proven that he acted recklessly", "Neither of Peter or Michael commits criminal offences even if it can be proven that Michael was reckless"],
            correct: 1,
            expCorrect: "While Peter had the ‘mens rea’ it was not he who actually threw the brick so he cannot have committed the act of criminal damage – Paul of course does commit criminal damage. However note that Peter will commit the offence of possession of an article with the intent to commit criminal damage and could also be guilty of conspiracy to commit criminal damage.\n\nThe concept of transferred mens rea does not apply with Michael as he intended to break the window but actually hit a person. However if his actions could be proven as reckless then he would commit the assault as the common law definition of assault is ‘any act which intentionally or recklessly causes another person to apprehend immediate and unlawful personal violence’ Even if there is insufficient evidence for the assault, Michael does commit the offence of attempt criminal damage.\n\nAlso, don’t forget that ‘actus reus’ can be an omission as well as an act.",
            expWrong: "While Peter had the ‘mens rea’ it was not he who actually threw the brick so he cannot have committed the act of criminal damage – Paul of course does commit criminal damage. However note that Peter will commit the offence of possession of an article with the intent to commit criminal damage and could also be guilty of conspiracy to commit criminal damage.\n\nThe concept of transferred mens rea does not apply with Michael as he intended to break the window but actually hit a person. However if his actions could be proven as reckless then he would commit the assault as the common law definition of assault is ‘any act which intentionally or recklessly causes another person to apprehend immediate and unlawful personal violence’ Even if there is insufficient evidence for the assault, Michael does commit the offence of attempt criminal damage.\n\nAlso, don’t forget that ‘actus reus’ can be an omission as well as an act."
        },
        {
            q: "DARRYL is 26 years of age and meets RANDALL, who is 15 years of age in a night club. DARRYL takes RANDALL to his home where he asks her how old she is. Knowing that RANDALL is 15 years of age DARRYL then has sexual intercourse with her. RANDALL fully consents but later tells her mother who reports the matter to the Police. DARRYL is later charged with the offence of sexual activity with a child. Which one of the following statements is correct with regards to offences that RANDALL may have committed in these circumstances?",
            opts: ["RANDALL is an accessory to the full offence but it is unlikely that she will be charged in the circumstances.", "RANDALL is a principal offender but it is unlikely that she will be charged in the circumstances.\nRANDALL is a principal offender but it is unlikely that she will be charged in the circumstances.", "RANDALL is an accessory to the full offence and it is advised that she is charged provided she offered true consent.", "RANDALL commits no offence in the circumstances."],
            correct: 3,
            expCorrect: "The case of R v Tyrrell (1894) held that where a child allowed an adult to have sex with them and the adult was subsequently charged with the offence the child can not be charged as a principal or accessory.",
            expWrong: "The case of R v Tyrrell (1894) held that where a child allowed an adult to have sex with them and the adult was subsequently charged with the offence the child can not be charged as a principal or accessory."
        },
        {
            q: "MELLOR is a 14-year-old girl who invites DAVIES to have sexual intercourse with her, with DAVIES knowing she is under the age of 16. DAVIES is 30 years old. The matter is reported by MELLOR's mother when she finds out that MELLOR invited DAVIES to have sex with her. Subsequently, DAVIES is arrested for having unlawful sexual intercourse with MELLOR.\n\nHas MELLOR incited DAVIES to commit an offence contrary to the Sexual Offences Act?",
            opts: ["MELLOR does not incite an offence as she is the victim of the sexual offence.", "MELLOR does not incite an offence only due to her age.", "MELLOR incites the offence as she encouraged DAVIES and gave him consent.", "MELLOR may incite the offence if she knew DAVIES was aware of her age."],
            correct: 0,
            expCorrect: "The case of R v Tyrrell (1894) 1 QB 710 held that the victim cannot incite another to commit an offence which exists for the protection of the victim. Option (a) is correct.\n\nOption (b) is incorrect as MELLOR can incite offences more widely, just not in these circumstances.\n\nOption (c) is incorrect as MELLOR cannot incite an offence for which the purpose is to protect her as a victim.\n\nOption (d) is incorrect as it does not matter whether MELLOR was aware or not that DAVIES had all the facts regarding her age; she cannot incite the offence due to the ruling in R v Tyrrell.",
            expWrong: "The case of R v Tyrrell (1894) 1 QB 710 held that the victim cannot incite another to commit an offence which exists for the protection of the victim. Option (a) is correct.\n\nOption (b) is incorrect as MELLOR can incite offences more widely, just not in these circumstances.\n\nOption (c) is incorrect as MELLOR cannot incite an offence for which the purpose is to protect her as a victim.\n\nOption (d) is incorrect as it does not matter whether MELLOR was aware or not that DAVIES had all the facts regarding her age; she cannot incite the offence due to the ruling in R v Tyrrell."
        },
        {
            q: "During a training session on road traffic law, Sergeant OKAFOR asks her team of officers about the defence of automatism. She explains that it is particularly relevant to driving offences and asks her officers to identify the correct legal definition. PC DAVIES responds by stating that automatism is defined as a total loss of voluntary control over one's actions, and that impaired or reduced control would not suffice.\n\nIs PC DAVIES correct about the legal definition of automatism?",
            opts: ["No, because automatism applies whenever a defendant's control is impaired to any significant degree, not just when control is totally lost.", "Yes, because the defence of automatism requires that the defendant suffered a total loss of voluntary control over their actions.", "No, because the defence only applies where the defendant was unconscious at the time, and loss of control alone is not sufficient.", "Yes, because automatism applies whenever the defendant can show they did not intend to commit the act, even if they retained some control."],
            correct: 1,
            expCorrect: "PC DAVIES is correct. Automatism is a common law defence that requires a total loss of voluntary control. This was confirmed by the Court of Appeal in Attorney-General’s Reference (No. 2 of 1992) [1994] QB 91, where Lord Taylor CJ made clear that the defence requires a total destruction of voluntary control on the defendant’s part, and that impaired, reduced, or partial control is not enough.\n\nThe CPS prosecution guidance on mental health confirms that automatism involves a total loss of control such that a suspect acts wholly involuntarily. The defence applies where a person’s consciousness was so impaired that they were acting in a state of physical involuntariness and had lost the ability to consciously control their actions. This is a high threshold, and the completeness of the loss of control is the defining requirement.\n\nAutomatism can arise in many ways. It may result from a reflex action such as a spasm or convulsion, a sudden medical episode, or any other cause that produces a total loss of voluntary control. In Hill v Baxter [1958] 1 QB 277, a driver who was attacked by a swarm of bees was considered to be a valid case for the defence to apply. What unites such situations is not the specific cause, but the fact that the defendant had completely lost the ability to control their actions.\n\nThis strict threshold was applied in Broome v Perkins [1987] Crim LR 271, where a diabetic driver who had driven erratically for several miles was found to have retained enough control to steer and avoid obstacles, so the defence was not available. Similarly, in Attorney-General’s Reference (No. 2 of 1992), a lorry driver in a state described as “driving without awareness” still retained some ability to steer and react to stimuli, which fell short of the total loss of control required. Option (b) is correct.\n\nOption (a) is incorrect because significant impairment is not sufficient; the law requires a total loss of voluntary control.\n\nOption (c) is incorrect because unconsciousness is not a separate requirement; the test is whether there was a total loss of voluntary control, which may or may not involve unconsciousness.\n\nOption (d) is incorrect because a lack of intention is not the same as automatism; the defendant must have totally lost voluntary control, not merely acted without intending the consequences.",
            expWrong: "PC DAVIES is correct. Automatism is a common law defence that requires a total loss of voluntary control. This was confirmed by the Court of Appeal in Attorney-General’s Reference (No. 2 of 1992) [1994] QB 91, where Lord Taylor CJ made clear that the defence requires a total destruction of voluntary control on the defendant’s part, and that impaired, reduced, or partial control is not enough.\n\nThe CPS prosecution guidance on mental health confirms that automatism involves a total loss of control such that a suspect acts wholly involuntarily. The defence applies where a person’s consciousness was so impaired that they were acting in a state of physical involuntariness and had lost the ability to consciously control their actions. This is a high threshold, and the completeness of the loss of control is the defining requirement.\n\nAutomatism can arise in many ways. It may result from a reflex action such as a spasm or convulsion, a sudden medical episode, or any other cause that produces a total loss of voluntary control. In Hill v Baxter [1958] 1 QB 277, a driver who was attacked by a swarm of bees was considered to be a valid case for the defence to apply. What unites such situations is not the specific cause, but the fact that the defendant had completely lost the ability to control their actions.\n\nThis strict threshold was applied in Broome v Perkins [1987] Crim LR 271, where a diabetic driver who had driven erratically for several miles was found to have retained enough control to steer and avoid obstacles, so the defence was not available. Similarly, in Attorney-General’s Reference (No. 2 of 1992), a lorry driver in a state described as “driving without awareness” still retained some ability to steer and react to stimuli, which fell short of the total loss of control required. Option (b) is correct.\n\nOption (a) is incorrect because significant impairment is not sufficient; the law requires a total loss of voluntary control.\n\nOption (c) is incorrect because unconsciousness is not a separate requirement; the test is whether there was a total loss of voluntary control, which may or may not involve unconsciousness.\n\nOption (d) is incorrect because a lack of intention is not the same as automatism; the defendant must have totally lost voluntary control, not merely acted without intending the consequences."
        },
        {
            q: "Companies House is the place where legally incorporated companies are registered and in the eyes of the law have a legal personality. Which of the following statements is true regarding a legally incorporated company's liability for an offence?",
            opts: ["A company can be prosecuted for an offence which involves strict liability, or where an offence requires mens rea.", "A company could be held liable for an offence, but only if the offence is triable summarily.", "A company cannot be prosecuted where an offence requires mens rea.", "A company cannot be prosecuted for offences committed by an employee, as offences are restricted to personal liability"],
            correct: 0,
            expCorrect: "Alphacell Ltd v Woodward (1972) decided that companies could be prosecuted for offences involving strict liability and Tesco Supermarkets Ltd v Nattrass (1972) showed that they could commit offences which required mens rea. Corporate liability is not limited to summary offences and companies can be held liable for actions of their employees in certain cases (e.g. road traffic offences which involve use, cause or permit).",
            expWrong: "Alphacell Ltd v Woodward (1972) decided that companies could be prosecuted for offences involving strict liability and Tesco Supermarkets Ltd v Nattrass (1972) showed that they could commit offences which required mens rea. Corporate liability is not limited to summary offences and companies can be held liable for actions of their employees in certain cases (e.g. road traffic offences which involve use, cause or permit)."
        },
        {
            q: "You are required to attend Kingsway West, where one of your officers has been involved in an incident. He asked the driver of a car, HABGOOD, to pull over and stop by the curb. The driver stopped his car with one wheel on the officer's foot, but not deliberately. He was asked to remove it. He had then declined to remove it for a period of time, saying, \"Fuck you, you can wait\". The officer considers he has been assaulted, but is in some doubt and seeks your advice.\n\nWhich of the following statements is correct?",
            opts: ["This is not an assault as he didn't do it deliberately.", "This is not an assault but a mere omission to act and remove the car from resting on the officer's foot. This will not be sufficient for an assault.", "This is an assault; his subsequent refusal to drive off the foot, having been asked to do so, amounted to the necessary mens rea. Mens rea and actus reus coincide.", "This is not an assault, only the actus reus is present when the officer's foot is run over."],
            correct: 2,
            expCorrect: "There is a general principle that crime, whether contrary to common law or statute requires a guilty mind (mens rea) and the actual act (actus reus). The Common Law definition of assault is ‘any act which intentionally or recklessly causes another person to apprehend immediate and unlawful personal violence’\n\nAssault offences generally require an act, with an omission struggling to satisfy the points to prove. However, the case of the DPP v Santana-Bermudez [2003] EWHC 2908 (Admin) saw the defendant falsely assure a police officer that they had no sharps on them, with the police officer subsequently receiving a hypodermic needle injury; they were found guilty of a battery.\n\nOption (a) is incorrect, it is an assault. Option (b) is incorrect since the circumstances can be sufficient, as seen in the case of the DPP v Santana-Bermudez and when considering the actus reus is on-going throughout the incident. Option (c) is correct as this was a continuing act, HABGOOD’s subsequent refusal to move off the foot amounted to the necessary mens rea which overlapped and provided the mental element of the offence, similar to Fagan v Metropolitan Police Commissioner [1969] 1 QB 439.\n\nThe victim must believe the person is capable of doing what is threatened and taken steps to do the act. The threatened action also being imminent.",
            expWrong: "There is a general principle that crime, whether contrary to common law or statute requires a guilty mind (mens rea) and the actual act (actus reus). The Common Law definition of assault is ‘any act which intentionally or recklessly causes another person to apprehend immediate and unlawful personal violence’\n\nAssault offences generally require an act, with an omission struggling to satisfy the points to prove. However, the case of the DPP v Santana-Bermudez [2003] EWHC 2908 (Admin) saw the defendant falsely assure a police officer that they had no sharps on them, with the police officer subsequently receiving a hypodermic needle injury; they were found guilty of a battery.\n\nOption (a) is incorrect, it is an assault. Option (b) is incorrect since the circumstances can be sufficient, as seen in the case of the DPP v Santana-Bermudez and when considering the actus reus is on-going throughout the incident. Option (c) is correct as this was a continuing act, HABGOOD’s subsequent refusal to move off the foot amounted to the necessary mens rea which overlapped and provided the mental element of the offence, similar to Fagan v Metropolitan Police Commissioner [1969] 1 QB 439.\n\nThe victim must believe the person is capable of doing what is threatened and taken steps to do the act. The threatened action also being imminent."
        },
        {
            q: "PARKER is a bit of a risk taker. He has 100 chocolates, one of which contains sufficient arsenic to kill someone should they eat it. This is known to PARKER, but he still knowingly offers a bag with 25 of the chocolates to friends, he also eats some himself. PARKER does not foresee a real risk in what he does as he has no way of knowing whether the chocolates in the bag contain the poisoned one or not. Which of the following statements properly describes whether PARKER is judged to have the required mens rea to commit the offence of poisoning by being reckless?",
            opts: ["It is obvious to anyone that there was a risk, no matter how small and PARKER took it.", "Even though PARKER did not believe there to be a real risk, it is obvious there is a risk and PARKER took it.", "PARKER believes the risk to be reasonable, and as he has taken the risk himself he cannot be reckless.", "PARKER is aware that a poisoned chocolate may be in the bag, and yet chose to take the risk."],
            correct: 3,
            expCorrect: "This scenario relates to subjective recklessness which is the conscious taking of an unjustified risk. Option (a) describes objective recklessness which is where the risk would be obvious to an ordinary person and so is incorrect and option (b) is a variant on this. Option (c) is incorrect because he actually believes there to be a risk and so the fact he has not been affected by the risk does not remove his recklessness.",
            expWrong: "This scenario relates to subjective recklessness which is the conscious taking of an unjustified risk. Option (a) describes objective recklessness which is where the risk would be obvious to an ordinary person and so is incorrect and option (b) is a variant on this. Option (c) is incorrect because he actually believes there to be a risk and so the fact he has not been affected by the risk does not remove his recklessness."
        },
        {
            q: "FRANCIS and WRIGHT plan to burgle the home of a wealthy businessman. The two agree that FRANCIS will actually break in to the house while WRIGHT keeps watch for any witnesses or the Police at the end of the driveway to the house. FRANCIS breaks in but WRIGHT does not do a very good job and is arrested along with FRANCIS. Considering the law in relation to principles and accessories, which of the below statements is correct?",
            opts: ["The state of mind needed to convict WRIGHT as an accessory is 'knowledge of the circumstances' alone.", "In these circumstances, WRIGHT has procured an offence of burglary.", "If WRIGHT is charged with an offence, it must be made clear what role he played on the charge, i.e. did he aid, abet, counsel or procure the offence?", "WRIGHT is an accessory and the court will treat him in the same way as the principle offender (FRANCIS)."],
            correct: 3,
            expCorrect: "The expression ‘aid, abet, counsel or procure’ is generally used in its entirety when charging a defendant, without separating out the particular element that applies, making C incorrect.\n\n‘Procuring’ an offence takes place before the commission of the offence, making answer B incorrect.\n\nAnswer A is incorrect as the state of mind required to convict an accessory is ‘proof of intention to aid as well as knowledge of the circumstances’ (National Coal Board v Gamble (1959)).",
            expWrong: "The expression ‘aid, abet, counsel or procure’ is generally used in its entirety when charging a defendant, without separating out the particular element that applies, making C incorrect.\n\n‘Procuring’ an offence takes place before the commission of the offence, making answer B incorrect.\n\nAnswer A is incorrect as the state of mind required to convict an accessory is ‘proof of intention to aid as well as knowledge of the circumstances’ (National Coal Board v Gamble (1959))."
        },
        {
            q: "ARNOTT owns 'Mistys NITE Spot', a nightclub in the town centre. One night, door staff from a rival nightclub drove past Mistys and threw snooker balls at the premises, breaking a number of windows. ARNOTT decides that, as two of his door staff are known to be violent individuals, he will send them to the rival club and threaten the offending door staff. From previous experience, ARNOTT knows that if he tells BOYCE and KNOWLES to threaten the offending door staff, they will actually go further and assault them. ARNOTT tells BOYCE and KNOWLES to 'scare those bastards a bit'. BOYCE and KNOWLES then visit the rival nightclub, find the offending door staff and attack them, causing one a broken jaw and another a compression injury to the skull.\n\nHas ARNOTT been an accessory to the assaults due to his joint enterprise?",
            opts: ["Yes, as he stood to gain from the assaults being committed.", "Yes, as he had foreseen the possibility of the assaults occurring.", "Yes, as he was aware that BOYCE and KNOWLES would visit the nightclub.", "No, ARNOTT is not an accessory in these circumstances."],
            correct: 3,
            expCorrect: "This is an example of parasitic accessory liability – where one party goes beyond that which was agreed or contemplated by the other. The rulings in R v Jogee (2016) and Ruddock v The Queen (2016) decided that in such situations the jury must assess every case for whether the intention to assist or encourage is shown – a defendant is not taken to have had such an intention merely because the consequences were foreseeable. In both Jogee and Ruddock the court made it clear that the ruling:\n\n– does not affect the law that a person who joins in a crime which any reasonable person would realise involves a risk of harm, and death results, is at least guilty of manslaughter\n\n– does not affect the rule that a person intentionally encourages or assists in the commission of a crime is as guilty as the person who physically commits it\n\n– does not alter the fact that it is open to a jury to infer intentional encouragement or assistance, for example from weight of numbers in a combined attack, whether more or less spontaneous or planned, or from knowledge that weapons are being carried. It is commonplace for juries to have to decide what inferences they can properly draw about intention from an accused person’s behaviour and what he/she knew.\n\nSo even though ARNOTT foresaw that BOYCE and KNOWLES would overstep the mark because they had done so on previous occasions, ARNOTT had not specifically directed them to do so and therefore ARNOTT was not an accessory.",
            expWrong: "This is an example of parasitic accessory liability – where one party goes beyond that which was agreed or contemplated by the other. The rulings in R v Jogee (2016) and Ruddock v The Queen (2016) decided that in such situations the jury must assess every case for whether the intention to assist or encourage is shown – a defendant is not taken to have had such an intention merely because the consequences were foreseeable. In both Jogee and Ruddock the court made it clear that the ruling:\n\n– does not affect the law that a person who joins in a crime which any reasonable person would realise involves a risk of harm, and death results, is at least guilty of manslaughter\n\n– does not affect the rule that a person intentionally encourages or assists in the commission of a crime is as guilty as the person who physically commits it\n\n– does not alter the fact that it is open to a jury to infer intentional encouragement or assistance, for example from weight of numbers in a combined attack, whether more or less spontaneous or planned, or from knowledge that weapons are being carried. It is commonplace for juries to have to decide what inferences they can properly draw about intention from an accused person’s behaviour and what he/she knew.\n\nSo even though ARNOTT foresaw that BOYCE and KNOWLES would overstep the mark because they had done so on previous occasions, ARNOTT had not specifically directed them to do so and therefore ARNOTT was not an accessory."
        },
        {
            q: "FOSTER is a member of a gang that robs people in their own homes at knifepoint. Although he never carries a knife himself, he is aware that the other members of the gang carry knives that may be used for violence, and that some of the gang are prone to use violence. On one such robbery, NORTON is stabbed by one of the gang when he tries to fight back and dies as a result of his injuries.\n\nWhat would have to be proved in order to show that FOSTER may be guilty of murder through joint enterprise?",
            opts: ["FOSTER agreed to use knives for any purpose.", "FOSTER realised that a knife could be used to cause harm.", "FOSTER agreed to kill, using the knife.", "FOSTER agreed to cause really serious injury using a knife."],
            correct: 1,
            expCorrect: "This is an example of parasitic accessory liability – where one party goes beyond that which was agreed or contemplated by the other. The rulings in R v Jogee (2016) and Ruddock v The Queen (2016) decided that in such situations the jury must assess every case for whether the intention to assist or encourage is shown – a defendant is not taken to have had such an intention merely because the consequences were foreseeable. In both Jogee and Ruddock the court made it clear that the ruling:\n\n– does not affect the law that a person who joins in a crime which any reasonable person would realise involves a risk of harm, and death results, is at least guilty of manslaughter\n\n– does not affect the rule that a person intentionally encourages or assists in the commission of a crime is as guilty as the person who physically commits it\n\n– does not alter the fact that it is open to a jury to infer intentional encouragement or assistance, for example from weight of numbers in a combined attack, whether more or less spontaneous or planned, or from knowledge that weapons are being carried. It is commonplace for juries to have to decide what inferences they can properly draw about intention from an accused person’s behaviour and what he/she knew.",
            expWrong: "This is an example of parasitic accessory liability – where one party goes beyond that which was agreed or contemplated by the other. The rulings in R v Jogee (2016) and Ruddock v The Queen (2016) decided that in such situations the jury must assess every case for whether the intention to assist or encourage is shown – a defendant is not taken to have had such an intention merely because the consequences were foreseeable. In both Jogee and Ruddock the court made it clear that the ruling:\n\n– does not affect the law that a person who joins in a crime which any reasonable person would realise involves a risk of harm, and death results, is at least guilty of manslaughter\n\n– does not affect the rule that a person intentionally encourages or assists in the commission of a crime is as guilty as the person who physically commits it\n\n– does not alter the fact that it is open to a jury to infer intentional encouragement or assistance, for example from weight of numbers in a combined attack, whether more or less spontaneous or planned, or from knowledge that weapons are being carried. It is commonplace for juries to have to decide what inferences they can properly draw about intention from an accused person’s behaviour and what he/she knew."
        },
        {
            q: "John VINCENT has been disqualified from driving for 18 months following a conviction for driving whilst unfit through drink. He is passenger in a car being driven by his brother David when they drive onto a quiet industrial estate on the outskirts of Sandford. John persuades David to let him to have a quick drive round the industrial estate as neither of them believe - incorrectly in this case - that it is classified as a 'road' under the Road Traffic Act 1988. Does John commit the offence of driving on a road while disqualified?",
            opts: ["No, as John had an honestly held belief that he was not driving on a road then there can be no 'mens rea' and therefore no offence.", "Yes, John has 'mens rea' due to his reckless nature.", "No, the full offence cannot be committed as there is no mens rea but John could be convicted of an attempt even though the offence is impossible to commit.", "Yes, as any road in the industrial estate falls within the meaning of the Road Traffic Act then the offence is committed"],
            correct: 3,
            expCorrect: "Driving while disqualified on a road is an offence of strict liability and as such only the actus reus is required. Provided that the roads in the industrial estate are ‘roads’ within the definition of the Road Traffic Act 1988 then the offence has been committed irrespective of John’s belief.",
            expWrong: "Driving while disqualified on a road is an offence of strict liability and as such only the actus reus is required. Provided that the roads in the industrial estate are ‘roads’ within the definition of the Road Traffic Act 1988 then the offence has been committed irrespective of John’s belief."
        },
        {
            q: "\"Throughout the web of English Criminal Law one golden thread is always to be seen, that it is the duty of the prosecution to prove the prisoner's guilt.\" Woolmington v DPP [1935] AC 462. Bearing this in mind, along with any exceptions, which of the following are correct?",
            opts: ["Once the prosecution have proved that the defendant was carrying an offensive weapon the burden shifts and the defendant must prove beyond a reasonable doubt that he had lawful authority or reasonable excuse.", "The civil standard of proof is beyond all reasonable doubt.", "The duty to prove guilt is always on the prosecution.", "The defence will succeed if they prove the facts they claim beyond all reasonable doubt."],
            correct: 2,
            expCorrect: "As a general rule, the prosecution bear the evidential burden but when the fact at issue is only known to the defendant the prosecution can aver the offence and pass the burden onto the defendant to prove this was not the case. Such matters occur in the regular ‘no insurance’ cases – the prosecution cannot find out from all the insurance companies in England and Wales whether the person was insured, it is for him to prove that he was covered by a policy of insurance.\n\nThe duty to prove guilt is always on the prosecution and it must be proven ‘beyond all reasonable doubt’. Once the prosecution has ‘established certain facts’ to prove the defendant’s guilt ‘beyond all reasonable doubt’ then the defence has to ‘established certain facts’ to rebut the prosecution evidence such that doubt is placed on the prosecution case. The defendant does not have to prove his innocence ‘beyond all reasonable doubt’ but merely sufficient to cast doubt on the prosecution case.\n\nCivil standard is on the balance of probabilities.\n\ns. 1 of the Prevention of Crime Act 1953 states that any person who without lawful authority or reasonable excuse the proof whereof shall lie on him has with him in any public place any offensive weapon shall be guilty of an offence. That proof would need to be proved only on the balance of probabilities and not, as stated in option (a), beyond reasonable doubt.",
            expWrong: "As a general rule, the prosecution bear the evidential burden but when the fact at issue is only known to the defendant the prosecution can aver the offence and pass the burden onto the defendant to prove this was not the case. Such matters occur in the regular ‘no insurance’ cases – the prosecution cannot find out from all the insurance companies in England and Wales whether the person was insured, it is for him to prove that he was covered by a policy of insurance.\n\nThe duty to prove guilt is always on the prosecution and it must be proven ‘beyond all reasonable doubt’. Once the prosecution has ‘established certain facts’ to prove the defendant’s guilt ‘beyond all reasonable doubt’ then the defence has to ‘established certain facts’ to rebut the prosecution evidence such that doubt is placed on the prosecution case. The defendant does not have to prove his innocence ‘beyond all reasonable doubt’ but merely sufficient to cast doubt on the prosecution case.\n\nCivil standard is on the balance of probabilities.\n\ns. 1 of the Prevention of Crime Act 1953 states that any person who without lawful authority or reasonable excuse the proof whereof shall lie on him has with him in any public place any offensive weapon shall be guilty of an offence. That proof would need to be proved only on the balance of probabilities and not, as stated in option (a), beyond reasonable doubt."
        },
        {
            q: "LIEBER is riding his bicycle home from the pub and is singing at the top of his voice. Someone shouts, 'Shut up, we are trying to sleep' from the window of a house he is passing. LIEBER stops his bicycle, climbs off, and then swings his foot at the house's fence, intending to kick a hole in it. However, he is so drunk he misses and falls over. LIEBER then decides to go home and climbs onto his bicycle but loses his balance and falls through the fence, causing it to break.\n\nDo the required 'mens rea' and 'actus reus' co-exist such that the offence of criminal damage is complete in these circumstances?",
            opts: ["The required 'mens rea' exists for both situations, but no 'actus reus'.", "The required 'mens rea' exists when LIEBER swings his foot. The 'actus reus' does not exist in either situation.", "The 'actus reus' exists when LIEBER falls and damages the fence, but not the 'mens rea'.", "Neither the required 'actus reus' nor the required 'mens rea' exist for either situation."],
            correct: 1,
            expCorrect: "Criminal offences can only be committed when the ‘actus reus’ and ‘mens rea’ coincide, that is, they are present together. The ‘actus reus’ is the actual act or behaviour, and it must be voluntary. The ‘mens rea’ is the mental element, such as intent or willfulness.\n\nTo answer this question, we must therefore consider when the two coincide.\n\nLIEBER hasn’t completed the necessary ‘actus reus’ in either situation. When he swings his foot, he is in voluntary control of his behaviour, but nothing actually happens. When he damages the fence, he was not in voluntary control due to losing his balance, and as such does not complete the ‘actus reus’.\n\nIn relation to ‘mens rea’, when LIEBER swings his foot, he intends to damage the fence and therefore ‘mens rea’ exists. When he falls from his bike, he no longer has such an intent as we are told he intends to go home.\n\nTherefore, in neither of the two incidents do we see a coincidence of ‘mens rea’ and ‘actus reus’.",
            expWrong: "Criminal offences can only be committed when the ‘actus reus’ and ‘mens rea’ coincide, that is, they are present together. The ‘actus reus’ is the actual act or behaviour, and it must be voluntary. The ‘mens rea’ is the mental element, such as intent or willfulness.\n\nTo answer this question, we must therefore consider when the two coincide.\n\nLIEBER hasn’t completed the necessary ‘actus reus’ in either situation. When he swings his foot, he is in voluntary control of his behaviour, but nothing actually happens. When he damages the fence, he was not in voluntary control due to losing his balance, and as such does not complete the ‘actus reus’.\n\nIn relation to ‘mens rea’, when LIEBER swings his foot, he intends to damage the fence and therefore ‘mens rea’ exists. When he falls from his bike, he no longer has such an intent as we are told he intends to go home.\n\nTherefore, in neither of the two incidents do we see a coincidence of ‘mens rea’ and ‘actus reus’."
        },
        {
            q: "For most offences, a person must have both the requisite 'Mens Rea' and 'Actus Reus' to be found guilty.\n\nWhen considering the Actus Reus of the offence, which one of the following statements is not correct?",
            opts: ["To form part of the Actus Reus the defendant's actions must be voluntary.", "An omission by the defendant to act in certain circumstances could be classed as the Actus Reus of the offence.", "A reflex action by the defendant would usually be classed as the Actus Reus of the offence.", "For the offence to be complete the Actus Reus must occur whilst the defendant still has the required Mens Rea, unless the offence is one of strict liability."],
            correct: 2,
            expCorrect: "It’s important to fully read the question. In this case, you are asked which statement is not correct.\n\nA reflex action will not normally be classed as Actus Reus, which means option (c) is an incorrect statement and, therefore, the correct answer.\n\nOptions (a) and (b) are incorrect, as the statements themselves are correct. The Actus Reus of an offence is normally the defendant’s voluntary actions, which can include omissions.\n\nOption (d) is incorrect as the statement is correct. For an offence to be complete, the Actus Reus must occur whilst the defendant still has the required Mens Rea, unless the offence is one of strict liability (where the mens rea need not be proven).",
            expWrong: "It’s important to fully read the question. In this case, you are asked which statement is not correct.\n\nA reflex action will not normally be classed as Actus Reus, which means option (c) is an incorrect statement and, therefore, the correct answer.\n\nOptions (a) and (b) are incorrect, as the statements themselves are correct. The Actus Reus of an offence is normally the defendant’s voluntary actions, which can include omissions.\n\nOption (d) is incorrect as the statement is correct. For an offence to be complete, the Actus Reus must occur whilst the defendant still has the required Mens Rea, unless the offence is one of strict liability (where the mens rea need not be proven)."
        },
        {
            q: "YALLOP is walking in the street when he is approached by IMPEY. IMPEY stabs YALLOP several times in the chest and runs off. YALLOP is taken to hospital with serious injuries and will require a blood transfusion due to the loss of blood. YALLOP refuses to have a blood transfusion as he is a Jehovah's Witness. IMPEY is charged with murder and pleads not guilty. At court Doctor MEDLOW states that he was on duty in the accident and emergency department on the night of the assault and it is his opinion that if YALLOP had received a blood transfusion he would have survived his injuries. What does the case of R v Blaue (1975) state regarding such circumstances?",
            opts: ["That IMPEY cannot be found guilty of murder as YALLOP chose to decline a blood transfusion.", "That IMPEY can be found guilty of murder despite the fact that YALLOP declined a blood transfusion.", "That IMPEY cannot be found guilty of murder as YALLOP may have survived the attack if treated.", "That IMPEY can be found guilty of murder as the severity of the attack would have been likely to have killed a normal person."],
            correct: 1,
            expCorrect: "The case of R v Blaue (1975) held that where a person declined medical treatment on religious grounds this did not break the causal link between the act and the death or injury. The defendant was therefore guilty of the causing the resulting death.",
            expWrong: "The case of R v Blaue (1975) held that where a person declined medical treatment on religious grounds this did not break the causal link between the act and the death or injury. The defendant was therefore guilty of the causing the resulting death."
        },
        {
            q: "Once the actus reus of an offence has been proved, a causal link must be shown between it and the relevant consequences. The causal link can be broken by a new and intervening act.\n\nWhich of the following comments is true with regard to intervening acts and the chain of causation?",
            opts: ["A drug dealer who supplies drugs to another person who then kills himself by overdose will be said to have caused the death of the individual.", "If the victim of a serious sexual assault was injured when jumping from her assailant's car in order to escape then the assailant would not normally be responsible for the victims injuries.", "Defendants must 'take their victims as they find them'. This means that if a victim has a particular characteristic, such as a very thin skull, which makes the consequences of an act against them much more acute, that is the defendant's bad luck and it will not break the chain of causation.", "If the medical treatment which a victim is given results in their untimely death, the treatment itself will normally be regarded as a 'new' intervening act."],
            correct: 2,
            expCorrect: "A new intervening act can break the causal link between an act and the outcome, so long as that act is ‘free, deliberate and informed’ (R v Latif [1996] 1 WLR 104).\n\nOption (a) is incorrect as drug dealers are not generally liable for the deaths of their victims, as death is brought about by the deliberate exercise of free will by the drug user. However, where the supplier assisted with injecting the deceased, it can be said that they are playing a more active role in the administering of the drug and hence may be found liable (R v Dias [2001] EWCA Crim 2986).\n\nThe actions of a victim attempting to escape a serious sexual assault by jumping from a car would not break the chain of causation unless they were done entirely by the victim’s own volition or where they are ‘daft’, making option (b) incorrect.\n\nIf medical treatment leads to a victim’s death, that will hardly ever be regarded as a ‘new’ act (R v Smith [1959] 2 QB 35), making option (d) incorrect. There has been an exception to this, as seen in R v Jordan (1956) 40 Cr App R 152, where the victim of a stabbing had almost totally recovered but was then administered the wrong drug (that the victim was intolerant to) during his final stages of recovery led, which led to his death.\n\nThe presence of unusual characteristics or the victim’s circumstances will not break the causal link. For example, if the victim has an underlying medical issue that means they suffer more than anticipated (R v Harvey [2010] EWCA Crim 1317), or the victim declines a blood transfusion on religious grounds following an assault and dies (R v Blaue [1975] 1 WLR 1411), the chain of causation will not be broken. This is most often described as offenders must ‘take their victims as they find them’. Option (c) is correct.",
            expWrong: "A new intervening act can break the causal link between an act and the outcome, so long as that act is ‘free, deliberate and informed’ (R v Latif [1996] 1 WLR 104).\n\nOption (a) is incorrect as drug dealers are not generally liable for the deaths of their victims, as death is brought about by the deliberate exercise of free will by the drug user. However, where the supplier assisted with injecting the deceased, it can be said that they are playing a more active role in the administering of the drug and hence may be found liable (R v Dias [2001] EWCA Crim 2986).\n\nThe actions of a victim attempting to escape a serious sexual assault by jumping from a car would not break the chain of causation unless they were done entirely by the victim’s own volition or where they are ‘daft’, making option (b) incorrect.\n\nIf medical treatment leads to a victim’s death, that will hardly ever be regarded as a ‘new’ act (R v Smith [1959] 2 QB 35), making option (d) incorrect. There has been an exception to this, as seen in R v Jordan (1956) 40 Cr App R 152, where the victim of a stabbing had almost totally recovered but was then administered the wrong drug (that the victim was intolerant to) during his final stages of recovery led, which led to his death.\n\nThe presence of unusual characteristics or the victim’s circumstances will not break the causal link. For example, if the victim has an underlying medical issue that means they suffer more than anticipated (R v Harvey [2010] EWCA Crim 1317), or the victim declines a blood transfusion on religious grounds following an assault and dies (R v Blaue [1975] 1 WLR 1411), the chain of causation will not be broken. This is most often described as offenders must ‘take their victims as they find them’. Option (c) is correct."
        },
        {
            q: "WELBURN and HARRIS are business rivals and are engaged in a bitter race to launch a new product to market first. WELBURN is concerned that his business is lagging behind that of HARRIS, and so recruits SHAH to scare HARRIS by threatening him with a loaded firearm. SHAH agrees to undertake the act; however, when making the threats, SHAH lost his nerve and shot HARRIS, who subsequently died of his injuries.\n\nAs the secondary party to the killing, what would need to be shown for WELBURN to be liable for manslaughter as a 'joint enterprise'?",
            opts: ["That WELBURN had foreseen the possibility that the primary party would do what he had done.", "That WELBURN could have reasonably foreseen the possibility that the primary party would do what he had done.", "That any reasonable person would realise the crime involves a risk of harm and death results.", "That any reasonable person would believe the crime involves a risk of harm, and death results."],
            correct: 2,
            expCorrect: "This is an example of parasitic accessory liability – where one party goes beyond that which was agreed or contemplated by the other. The rulings in R v Jogee [2016] UKSC 8 and Ruddock v The Queen [2016] UKPC 7 decided that in such situations the jury must assess every case for whether the intention to assist or encourage is shown – a defendant is not taken to have had such an intention merely because the consequences were foreseeable. In both Jogee and Ruddock the court made it clear that the ruling:\n\ndoes not affect the law that a person who joins in a crime which any reasonable person would realise involves a risk of harm, and death results, is at least guilty of manslaughter\ndoes not affect the rule that a person intentionally encourages or assists in the commission of a crime is as guilty as the person who physically commits it\ndoes not alter the fact that it is open to a jury to infer intentional encouragement or assistance, for example from weight of numbers in a combined attack, whether more or less spontaneous or planned, or from knowledge that weapons are being carried. It is commonplace for juries to have to decide what inferences they can properly draw about intention from an accused person’s behaviour and what he/she knew.",
            expWrong: "This is an example of parasitic accessory liability – where one party goes beyond that which was agreed or contemplated by the other. The rulings in R v Jogee [2016] UKSC 8 and Ruddock v The Queen [2016] UKPC 7 decided that in such situations the jury must assess every case for whether the intention to assist or encourage is shown – a defendant is not taken to have had such an intention merely because the consequences were foreseeable. In both Jogee and Ruddock the court made it clear that the ruling:\n\ndoes not affect the law that a person who joins in a crime which any reasonable person would realise involves a risk of harm, and death results, is at least guilty of manslaughter\ndoes not affect the rule that a person intentionally encourages or assists in the commission of a crime is as guilty as the person who physically commits it\ndoes not alter the fact that it is open to a jury to infer intentional encouragement or assistance, for example from weight of numbers in a combined attack, whether more or less spontaneous or planned, or from knowledge that weapons are being carried. It is commonplace for juries to have to decide what inferences they can properly draw about intention from an accused person’s behaviour and what he/she knew."
        },
        {
            q: "PLETH stabs GILL in the leg during an altercation on Sandford High Street, almost severing the femoral artery. GILL is rushed to the hospital, where he requires a blood transfusion to save his life. GILL refuses the transfusion because it conflicts with his religious beliefs as a Jehovah's Witness. Despite this, the surgical team managed to save his life through alternative means. Three days later, while still recovering on the ward, GILL contracts MRSA during an outbreak at the hospital and dies from the infection.\n\nIs PLETH responsible for GILL's death?",
            opts: ["No, because the chain of causation was broken by GILL's refusal of the blood transfusion, which was a free, deliberate and informed decision.", "Yes, because the stab wound remained an operating and substantial cause of death, as it necessitated the hospitalisation during which GILL contracted MRSA.", "No, because the MRSA infection was an unforeseeable event independent of the original wound, making it a novus actus interveniens.", "Yes, because a defendant must take their victim as they find them, including religious beliefs that affect their medical treatment."],
            correct: 1,
            expCorrect: "This scenario involves two potential challenges to the chain of causation: GILL’s refusal of a blood transfusion on religious grounds and the subsequent MRSA infection. Each must be analysed separately to determine whether PLETH remains responsible for GILL’s death.\n\nBeginning with the MRSA infection, which was the actual cause of death, the question is whether this broke the chain of causation. To establish causation for homicide, the prosecution must prove both factual and legal causation. Factual causation is established through the “but for” test. But for PLETH stabbing GILL, GILL would not have been hospitalised and would not have been exposed to the MRSA outbreak. This requirement is clearly satisfied.\n\nLegal causation requires the wound to be an “operating and substantial cause” of death. In R v Smith [1959] 2 QB 35, Lord Parker CJ held that –\n\n“If at the time of death the original wound is still an operating cause and a substantial cause, then the death can properly be said to be the result of the wound, albeit that some other cause of death is also operating.”\n\nThe Court of Appeal in R v Cheshire [1991] 1 WLR 844 confirmed that medical complications rarely break the chain of causation. Beldam LJ stated that the jury should not exclude the defendant’s responsibility –\n\n“…unless the negligent treatment was so independent of his acts, and in itself so potent in causing death, that they regard the contribution made by his acts as insignificant.”\n\nHospital-acquired infections are well-documented and foreseeable risks of hospitalisation. The NHS actively screens patients for MRSA because it is a known hazard. GILL was hospitalised as a direct consequence of PLETH’s stabbing; his presence in that environment, where he contracted the infection, flowed directly from the wound. The MRSA infection does not break the chain because it arose from the very hospitalisation the wound necessitated. This is materially different from R v Jordan (1956) 40 Cr App R 152, where the wound had almost fully healed before unrelated “palpably wrong” treatment caused death. Here, GILL remained in the hospital recovering from the wound.\n\nTurning to the blood transfusion refusal, while this engages principles from R v Blaue [1975] 1 WLR 1411, it is not causally relevant to GILL’s death. In Blaue, the Court of Appeal held that a defendant must take their victim as they find them, including religious beliefs that lead to the refusal of treatment. Lawton LJ stated that those who use violence must accept the whole person, not just their physical condition. However, Blaue applies where the victim’s refusal of treatment contributes to their death. Here, the surgical team successfully saved GILL’s life despite the refusal; the transfusion refusal played no part in his eventual death from MRSA. The thin skull rule, while an important principle, is simply not engaged on these facts because the characteristic in question did not contribute to the fatal outcome.\n\nOption (a) is incorrect because, although GILL’s refusal was indeed free, deliberate and informed, it did not cause his death. An act can only break the chain of causation if it actually contributes to the death in question. Since GILL died from MRSA, not from the consequences of refusing the transfusion, this refusal is causally irrelevant. Even if it had caused death, R v Blaue states that defendants take their victims as found.\n\nOption (c) is incorrect because hospital-acquired infections are not unforeseeable. MRSA outbreaks are a well-known risk of hospitalisation, which is why hospitals implement screening and infection control measures. Since the infection arose from hospitalisation necessitated by the wound, it cannot be characterised as independent of PLETH’s act.\n\nOption (d) is incorrect because it applies the correct legal principle to the wrong facts. While R v Blaue establishes that defendants must take victims as they find them, including their religious beliefs, this principle only assists the prosecution where the victim’s characteristic actually contributes to death. Here, GILL’s religious beliefs did not cause his death; the MRSA infection did. The correct basis for PLETH’s liability is that the wound remained an operating and substantial cause, not the thin skull rule.",
            expWrong: "This scenario involves two potential challenges to the chain of causation: GILL’s refusal of a blood transfusion on religious grounds and the subsequent MRSA infection. Each must be analysed separately to determine whether PLETH remains responsible for GILL’s death.\n\nBeginning with the MRSA infection, which was the actual cause of death, the question is whether this broke the chain of causation. To establish causation for homicide, the prosecution must prove both factual and legal causation. Factual causation is established through the “but for” test. But for PLETH stabbing GILL, GILL would not have been hospitalised and would not have been exposed to the MRSA outbreak. This requirement is clearly satisfied.\n\nLegal causation requires the wound to be an “operating and substantial cause” of death. In R v Smith [1959] 2 QB 35, Lord Parker CJ held that –\n\n“If at the time of death the original wound is still an operating cause and a substantial cause, then the death can properly be said to be the result of the wound, albeit that some other cause of death is also operating.”\n\nThe Court of Appeal in R v Cheshire [1991] 1 WLR 844 confirmed that medical complications rarely break the chain of causation. Beldam LJ stated that the jury should not exclude the defendant’s responsibility –\n\n“…unless the negligent treatment was so independent of his acts, and in itself so potent in causing death, that they regard the contribution made by his acts as insignificant.”\n\nHospital-acquired infections are well-documented and foreseeable risks of hospitalisation. The NHS actively screens patients for MRSA because it is a known hazard. GILL was hospitalised as a direct consequence of PLETH’s stabbing; his presence in that environment, where he contracted the infection, flowed directly from the wound. The MRSA infection does not break the chain because it arose from the very hospitalisation the wound necessitated. This is materially different from R v Jordan (1956) 40 Cr App R 152, where the wound had almost fully healed before unrelated “palpably wrong” treatment caused death. Here, GILL remained in the hospital recovering from the wound.\n\nTurning to the blood transfusion refusal, while this engages principles from R v Blaue [1975] 1 WLR 1411, it is not causally relevant to GILL’s death. In Blaue, the Court of Appeal held that a defendant must take their victim as they find them, including religious beliefs that lead to the refusal of treatment. Lawton LJ stated that those who use violence must accept the whole person, not just their physical condition. However, Blaue applies where the victim’s refusal of treatment contributes to their death. Here, the surgical team successfully saved GILL’s life despite the refusal; the transfusion refusal played no part in his eventual death from MRSA. The thin skull rule, while an important principle, is simply not engaged on these facts because the characteristic in question did not contribute to the fatal outcome.\n\nOption (a) is incorrect because, although GILL’s refusal was indeed free, deliberate and informed, it did not cause his death. An act can only break the chain of causation if it actually contributes to the death in question. Since GILL died from MRSA, not from the consequences of refusing the transfusion, this refusal is causally irrelevant. Even if it had caused death, R v Blaue states that defendants take their victims as found.\n\nOption (c) is incorrect because hospital-acquired infections are not unforeseeable. MRSA outbreaks are a well-known risk of hospitalisation, which is why hospitals implement screening and infection control measures. Since the infection arose from hospitalisation necessitated by the wound, it cannot be characterised as independent of PLETH’s act.\n\nOption (d) is incorrect because it applies the correct legal principle to the wrong facts. While R v Blaue establishes that defendants must take victims as they find them, including their religious beliefs, this principle only assists the prosecution where the victim’s characteristic actually contributes to death. Here, GILL’s religious beliefs did not cause his death; the MRSA infection did. The correct basis for PLETH’s liability is that the wound remained an operating and substantial cause, not the thin skull rule."
        },
        {
            q: "PETERS is employed by Network Rail to operate a manual railway crossing in Sandford. One day, he turns up for his 12-hour night shift and discovers he has forgotten to bring his sandwiches. At 3am, when all appears to be quiet, he leaves his post for 10 minutes and walks to the 24-hour store to get something to eat. At this time, Martin and Diane are both walking back from the 24-hour store towards the crossing, having just had a blazing row over the flavour of crisps they wanted to buy. Martin is married to Diane. As Diane starts to walk across the railway crossing, Martin sees an approaching freight train. Rather than warn Diane about the train, he thinks it will give her a good fright. Halfway across the railway line, Diane hears the oncoming train, stumbles in her rush to get out of the way and is subsequently killed.\n\nWho, if either, has a criminal liability because of their failure to act?",
            opts: ["PETERS only, as he created the dangerous situation and was under contract to look after the crossing.", "Martin only, as PETERS wasn't present when the accident occurred.", "PETERS and Martin, as they both had duties of care towards others.", "Neither. PETERS wasn't present and Martin doesn't have such a duty towards his wife."],
            correct: 0,
            expCorrect: "There are two stages to proving that an omission to act proves criminal conduct. Firstly it must be proven that the defendant had a duty to act. Duty can arise from a number of circumstances:\n\nD – Dangerous situation created by the defendant.\nU – Under statute, contract or a person’s public office.\nT – Taken it upon themselves to carry out a duty of care to someone unable to care for themselves due to age, illness or infirmity.\nY – Young person. When a person is in a parental relationship with a young person.\n\nOnce the duty to act has been proven, it must be shown that the defendant voluntarily omitted to act as required or that he/she has not done enough to discharge that duty. Note that it must be a voluntary action and that if the defendant is prevented from acting or is incapable of acting due to personal limitations then the actus reus will not have taken place.\n\nThese requirements only fit the situation regarding PETERS, as Martin does not have such a duty towards his wife as he was not responsible for creating the dangerous situation. Had Diane been Martin’s 6 year-old daughter, the situation would have been different as Martin would have had a parental responsibility over her. At what age the parental responsibility ends would be a question of law for the court to decide, but would no doubt consider statutes such as the Children’s Act (under 18).",
            expWrong: "There are two stages to proving that an omission to act proves criminal conduct. Firstly it must be proven that the defendant had a duty to act. Duty can arise from a number of circumstances:\n\nD – Dangerous situation created by the defendant.\nU – Under statute, contract or a person’s public office.\nT – Taken it upon themselves to carry out a duty of care to someone unable to care for themselves due to age, illness or infirmity.\nY – Young person. When a person is in a parental relationship with a young person.\n\nOnce the duty to act has been proven, it must be shown that the defendant voluntarily omitted to act as required or that he/she has not done enough to discharge that duty. Note that it must be a voluntary action and that if the defendant is prevented from acting or is incapable of acting due to personal limitations then the actus reus will not have taken place.\n\nThese requirements only fit the situation regarding PETERS, as Martin does not have such a duty towards his wife as he was not responsible for creating the dangerous situation. Had Diane been Martin’s 6 year-old daughter, the situation would have been different as Martin would have had a parental responsibility over her. At what age the parental responsibility ends would be a question of law for the court to decide, but would no doubt consider statutes such as the Children’s Act (under 18)."
        },
        {
            q: "You are called to a public house because the following incident has occurred in the rear gardens. SAMUEL, intending to seriously wound ROBERT, throws a bottle at him. The bottle misses ROBERT as he sees it coming and ducks. The bottle then bounces off a table and hits ROSEMARY on the head, causing a severe cut. SAMUEL was unaware that ROSEMARY was in the vicinity and did not intend to injure her.\n\nWhich, if either, of the following offences, has Samuel committed?",
            opts: ["Wounding ROSEMARY only.", "Assaulting ROBERT only.", "Both offences.", "Neither offence."],
            correct: 2,
            expCorrect: "The doctrine of transferred mens rea or intention refers to instances where, for example, a man strikes a person intending to wound him and accidentally wounds another. The intent accompanying this action is transferred and would be held to be present in the case of the wounding of the innocent party.\n\nConcerning the wounding of ROSEMARY, SAMUEL intended to wound ROBERT but unfortunately managed to injure ROSEMARY instead. The mens rea is transferred because of the intent. It can be proved that the defendant had the required mens rea; this same mens rea can support a charge against the other victim. SAMUEL has committed a wounding concerning ROSEMARY.\n\nRegarding a common assault on ROBERT, remember that a common assault includes not only a battery, where contact is actually made, but also ‘any act which intentionally or recklessly causes another person to apprehend immediate and unlawful personal violence’. In this scenario, ROBERT apprehends immediate and unlawful personal violence as he narrowly avoids the bottle by ducking. SAMUEL has committed a common assault concerning ROBERT.",
            expWrong: "The doctrine of transferred mens rea or intention refers to instances where, for example, a man strikes a person intending to wound him and accidentally wounds another. The intent accompanying this action is transferred and would be held to be present in the case of the wounding of the innocent party.\n\nConcerning the wounding of ROSEMARY, SAMUEL intended to wound ROBERT but unfortunately managed to injure ROSEMARY instead. The mens rea is transferred because of the intent. It can be proved that the defendant had the required mens rea; this same mens rea can support a charge against the other victim. SAMUEL has committed a wounding concerning ROSEMARY.\n\nRegarding a common assault on ROBERT, remember that a common assault includes not only a battery, where contact is actually made, but also ‘any act which intentionally or recklessly causes another person to apprehend immediate and unlawful personal violence’. In this scenario, ROBERT apprehends immediate and unlawful personal violence as he narrowly avoids the bottle by ducking. SAMUEL has committed a common assault concerning ROBERT."
        },
        {
            q: "NIALL has raped UNWIN. UNWIN decides not to contact the Police but tells her older brother, MATTHEW. MATTHEW tells a number of his friends when he visits the pub later that evening, and they decide to find NIALL and attack him. MATTHEW and his five friends collect various weapons from their cars. Two men carry knives, one holds a baseball bat, and two have hammers. MATTHEW is not carrying a weapon himself but knows the others are. They agree they will visit NIALL at his house and 'smash him to bits'. NIALL is at home, and when he answers his front door to the group, they drag him into the garden and beat and kick him. He is also struck several times with the bat and hammers. One of the group then takes out a knife and stabs NIALL in the stomach. NIALL dies as a result of the attack, with the fatal injury being caused by the stab wound. MATTHEW is charged with murder, but none of the other offenders are identified. At court, MATTHEW denies the offence of murder as, though he admits he was present, he states that he only punched and kicked NIALL.\n\nIf the court believes the account of MATTHEW, what action should the court take in these circumstances?",
            opts: ["Find MATTHEW guilty of the offence as it was his idea and he gathered the group together.", "Find MATTHEW guilty as he was part of the attack, knew it would cause serious injury and that a member of the group was carrying a knife.", "Find MATTHEW not guilty of murder as he did not cause the fatal injury himself.", "Find MATTHEW not guilty, as he did not directly instruct his friend to use the knife."],
            correct: 1,
            expCorrect: "The key principle here concerns the mens rea for murder and accessory liability following R v Jogee [2016] UKSC 8.\n\nA common misconception is that murder requires an intention to kill. This is incorrect. As confirmed in R v Cunningham [1982] AC 566, the mens rea for murder is satisfied by either an intention to kill or an intention to cause grievous bodily harm. A defendant who intends only to cause really serious injury, with no intention to kill, will be guilty of murder if death results.\nMATTHEW’s intent to cause GBH is clear from the evidence. He was present when weapons were collected, knew group members were carrying knives, hammers, and a baseball bat, and participated in an agreement to “smash him to bits.” This language unambiguously demonstrates an intention to cause really serious harm. The fact that MATTHEW did not personally intend to kill is irrelevant.\n\nRegarding accessory liability, Jogee clarified that the prosecution must prove the secondary party intended to assist or encourage the principal to commit the offence with the relevant mens rea. Mere foresight is no longer sufficient, but foresight remains evidence from which intent can be inferred. Crucially, the court stated that a jury may infer intentional encouragement from the weight of numbers in a combined attack, whether spontaneous or planned, and from knowledge that weapons are being carried. A defendant’s knowledge that weapons are present may be “irresistible evidence” of intent.\n\nHere, MATTHEW knew lethal weapons were present, agreed to cause serious violence, and actively participated by punching and kicking. The jury may properly infer that he intended to encourage the deliberate infliction of GBH. Since intent to cause GBH suffices for murder, MATTHEW is guilty.\n\nOption (a) is incorrect because merely organising the group does not establish the mens rea for murder without proof that MATTHEW intended to assist or encourage the causing of GBH.\n\nOption (c) is incorrect because a secondary party who intentionally encourages or assists a crime is as guilty as the person who physically commits it. MATTHEW does not escape liability simply because another inflicted the fatal wound.\n\nOption (d) is incorrect because accessory liability does not require a direct instruction to use a specific weapon. MATTHEW’s liability arises from his intentional participation in an enterprise where he knew weapons were present and the common purpose was to cause serious harm.",
            expWrong: "The key principle here concerns the mens rea for murder and accessory liability following R v Jogee [2016] UKSC 8.\n\nA common misconception is that murder requires an intention to kill. This is incorrect. As confirmed in R v Cunningham [1982] AC 566, the mens rea for murder is satisfied by either an intention to kill or an intention to cause grievous bodily harm. A defendant who intends only to cause really serious injury, with no intention to kill, will be guilty of murder if death results.\nMATTHEW’s intent to cause GBH is clear from the evidence. He was present when weapons were collected, knew group members were carrying knives, hammers, and a baseball bat, and participated in an agreement to “smash him to bits.” This language unambiguously demonstrates an intention to cause really serious harm. The fact that MATTHEW did not personally intend to kill is irrelevant.\n\nRegarding accessory liability, Jogee clarified that the prosecution must prove the secondary party intended to assist or encourage the principal to commit the offence with the relevant mens rea. Mere foresight is no longer sufficient, but foresight remains evidence from which intent can be inferred. Crucially, the court stated that a jury may infer intentional encouragement from the weight of numbers in a combined attack, whether spontaneous or planned, and from knowledge that weapons are being carried. A defendant’s knowledge that weapons are present may be “irresistible evidence” of intent.\n\nHere, MATTHEW knew lethal weapons were present, agreed to cause serious violence, and actively participated by punching and kicking. The jury may properly infer that he intended to encourage the deliberate infliction of GBH. Since intent to cause GBH suffices for murder, MATTHEW is guilty.\n\nOption (a) is incorrect because merely organising the group does not establish the mens rea for murder without proof that MATTHEW intended to assist or encourage the causing of GBH.\n\nOption (c) is incorrect because a secondary party who intentionally encourages or assists a crime is as guilty as the person who physically commits it. MATTHEW does not escape liability simply because another inflicted the fatal wound.\n\nOption (d) is incorrect because accessory liability does not require a direct instruction to use a specific weapon. MATTHEW’s liability arises from his intentional participation in an enterprise where he knew weapons were present and the common purpose was to cause serious harm."
        },
        {
            q: "CROOK asks MAY to drive him round to BELL's house. As they get in the car, MAY sees that CROOK has brought a baseball bat with him and asks what it is for to which CROOK replies \"I am going to give BELL a good hiding\". MAY doesn't really like BELL either and so drives CROOK to BELL's house, drops him off and drives away without knowing to what extent CROOK is intending to harm BELL. CROOK lies in wait for BELL by concealing himself in some bushes nearby and has to wait 12 hours before BELL finally returns home at which point CROOK hits BELL several times over the head with the baseball bat, killing BELL. Can MAY be charged as an accomplice in these circumstances?",
            opts: ["No, due to the time delay after dropping CROOK off.", "No, due to the fact that he did not know that CROOK would kill BELL.", "No, as there was not a causal link between the driving and the murder.", "Yes, he could be charged as an accomplice in these circumstances."],
            correct: 3,
            expCorrect: "The case of R v Bryce held that, in similar circumstances, the defendant could be charged as an accomplice despite the time delay between the driving and the attack. It would also not be necessary for the accomplice to know the extent of the intended assault.",
            expWrong: "The case of R v Bryce held that, in similar circumstances, the defendant could be charged as an accomplice despite the time delay between the driving and the attack. It would also not be necessary for the accomplice to know the extent of the intended assault."
        },
        {
            q: "MELLOWS used to work for Asda and has been made redundant. He decides to try and blackmail Asda by placing some glass in jars of baby food. Unfortunately he is not sure how to go about this and goes to MASTERMAN to tell him what he is going to do and asks for some advice. MASTERMAN gives MELLOWS advice on how to go about carrying out the blackmail but does not do any acts which would lead to the commission of the offence. Which of the following statements is true in relation to MASTERMAN's involvement?",
            opts: ["He commits no offence as he only failed to stop a crime.", "He commits the offence of aiding and abetting blackmail.", "He commits the offence of counselling blackmail.", "He commits the full offence of blackmail."],
            correct: 2,
            expCorrect: "The phrase ‘aid, abet, counsel or procure’ is normally used in its entirety when charging an offender. While the precise definition of each word has not been defined by statute, the phrase ‘aid’ generally means ‘assistance given at the time of the offence’ and ‘abet’ means ‘encouragement given at the time of the offence’. The phrases ‘counsel’ and ‘procure’ tend to refer to events before the commission of the offence with ‘counsel’ meaning ‘advice before the commission of the offence’ and ‘procure’ meaning ‘assistance before the commission of the offence’\n\nAs MASTERMAN has given advice to MELLOWS before the commission of the offence then he commits the offence of counselling blackmail.",
            expWrong: "The phrase ‘aid, abet, counsel or procure’ is normally used in its entirety when charging an offender. While the precise definition of each word has not been defined by statute, the phrase ‘aid’ generally means ‘assistance given at the time of the offence’ and ‘abet’ means ‘encouragement given at the time of the offence’. The phrases ‘counsel’ and ‘procure’ tend to refer to events before the commission of the offence with ‘counsel’ meaning ‘advice before the commission of the offence’ and ‘procure’ meaning ‘assistance before the commission of the offence’\n\nAs MASTERMAN has given advice to MELLOWS before the commission of the offence then he commits the offence of counselling blackmail."
        },
        {
            q: "Fred and Wilma are out walking one night. Fred is short of cash, enters a factory compound and Wilma follows him but is not aware of Fred's intentions. Fred smashes a window and climbs through. Wilma now understands why they have entered the yard so she keeps lookout and shortly afterwards alerts Fred to the presence of a passing police vehicle. Fred unfortunately is caught but Wilma runs off. Which of the following is true in relation to Wilma committing the offence of aid and abetting burglary ?",
            opts: ["She is not guilty of the offence", "She commits the offence when she follows Fred into the compound.", "She commits the offence when she decides to keep lookout.", "She commits the offence when she alerts Fred about the police"],
            correct: 2,
            expCorrect: "Aiders and abettors are those who assist or encourage a principal at the time of the offence. It tends to require a positive act. Merely because Wilma failed to stop the offence, it does not follow that she had some participation – she has to be actively involved. The decision to act as lookout would be the point at which the offence of aiding and abetting the burglary is complete.",
            expWrong: "Aiders and abettors are those who assist or encourage a principal at the time of the offence. It tends to require a positive act. Merely because Wilma failed to stop the offence, it does not follow that she had some participation – she has to be actively involved. The decision to act as lookout would be the point at which the offence of aiding and abetting the burglary is complete."
        },
        {
            q: "A few offences can be committed by 'negligence'. Which of the following statements is correct when considering the term 'negligence'?",
            opts: ["Negligence' relates to the defendant's state of mind.", "'Negligence' relates to the defendant's standards.", "'Negligence' relates to the standards of reasonableness of an ordinary person.", "'Negligence' relates to the standards of the law as laid down in statute"],
            correct: 2,
            expCorrect: "The concept of negligence relates to the standards of reasonableness of an ordinary person.",
            expWrong: "The concept of negligence relates to the standards of reasonableness of an ordinary person."
        },
        {
            q: "A criminal attempt, as defined in s. 1(1) of the Criminal Attempts Act 1981, can only be committed in relation to specific types of offences. Consequently, there are certain types of offences which are not capable of being 'attempted' contrary to the Act.\n\nWhat are the type of offences that cannot be 'attempted'?",
            opts: ["Recordable offences.", "Summary offences, unless an exception applies.", "Either way offences.", "Indictable offences."],
            correct: 1,
            expCorrect: "Criminal attempts legislation applies to the majority of offences, with the biggest exception being summary offences.\n\nThe question asks which types of offences cannot be attempted. Option (a) is incorrect as lots of recordable offences are indictable, option (c) is incorrect as either way offences can, in the main, be attempted and option (d) is incorrect as indictable offences, in the main, can be attempted.\n\nOffences, other than summary only, that also cannot be attempted are:\n\nConspiracy\nAiding, abetting, counselling, procuring or suborning the commission of an offence\nEncouraging or assisting suicide\nAssisting offenders\nInterestingly, there is an exception to the rule that ‘summary’ offences cannot be attempted. Low-value shoplifting is tried summarily only, by virtue of s. 22A of the Magistrates’ Courts Act 1980. It may seem that the offence cannot be attempted, however, s. 1(5) of the Criminal Attempts Act states that –\n\n(5) This section also applies to low-value shoplifting (which is defined in, and is triable only summarily by virtue of, section 22A of the Magistrates’ Courts Act 1980).\n\nOption (b) is therefore correct, as the vast majority of summary offences cannot be attempted.",
            expWrong: "Criminal attempts legislation applies to the majority of offences, with the biggest exception being summary offences.\n\nThe question asks which types of offences cannot be attempted. Option (a) is incorrect as lots of recordable offences are indictable, option (c) is incorrect as either way offences can, in the main, be attempted and option (d) is incorrect as indictable offences, in the main, can be attempted.\n\nOffences, other than summary only, that also cannot be attempted are:\n\nConspiracy\nAiding, abetting, counselling, procuring or suborning the commission of an offence\nEncouraging or assisting suicide\nAssisting offenders\nInterestingly, there is an exception to the rule that ‘summary’ offences cannot be attempted. Low-value shoplifting is tried summarily only, by virtue of s. 22A of the Magistrates’ Courts Act 1980. It may seem that the offence cannot be attempted, however, s. 1(5) of the Criminal Attempts Act states that –\n\n(5) This section also applies to low-value shoplifting (which is defined in, and is triable only summarily by virtue of, section 22A of the Magistrates’ Courts Act 1980).\n\nOption (b) is therefore correct, as the vast majority of summary offences cannot be attempted."
        },
        {
            q: "DEWEY and WONG work at the Sandford Odeon Cinema. They work together using their positions of employment to obtain theatre quality digital copies of major film releases and pass them on to a mutual friend to distribute using a peer to peer network, where the films are encrypted and require a decryption code to watch. They then sell decryption codes in local pubs and online, making a significant amount of money and undercutting streaming services and the cinema. However it does not appear that the Odeon or streaming services have lost any custom as film attendances are actually higher than expected - especially for the films which were pirated.\n\nWould DEWEY and WONG commit an offence of conspiracy to defraud contrary to common law?",
            opts: ["No, there is no reduction in attendance at the cinema or loss of streaming customers.", "No, there is no economic loss to the cinema or streaming services.", "Yes, provided the criminal (not civil) standard of dishonesty is proven in the defendants.", "Yes, if the civil standard of dishonesty is proven in the defendants."],
            correct: 2,
            expCorrect: "Common law conspiracy involves an agreement by two or more persons by dishonesty to deprive a person of something which is his or to which he is or would or might be entitled or an agreement by two or more by dishonesty to injure some proprietary right of the victim.\n\nFor the offence to be complete it does not matter whether the intended victim actually suffered any loss but it must be shown that a defendant was dishonest as set out in in the cases of Barlow Clowes v Eurotrust Ltd (2006) and Royal Brunei Airlines v Tan (1995) – given the facts, would ordinary decent people regard the action as dishonest?\n\nThe ruling in R v Ghosh (1982) has now been superseded by Ivey v Genting Casinos (2017) and Ghosh no longer applies. The 2017 case decided that the test for dishonesty in criminal cases is to be the same as for civil cases with the civil test being stated in Barlow Clowes (2006) and Royal Brunei Airlines (1995)",
            expWrong: "Common law conspiracy involves an agreement by two or more persons by dishonesty to deprive a person of something which is his or to which he is or would or might be entitled or an agreement by two or more by dishonesty to injure some proprietary right of the victim.\n\nFor the offence to be complete it does not matter whether the intended victim actually suffered any loss but it must be shown that a defendant was dishonest as set out in in the cases of Barlow Clowes v Eurotrust Ltd (2006) and Royal Brunei Airlines v Tan (1995) – given the facts, would ordinary decent people regard the action as dishonest?\n\nThe ruling in R v Ghosh (1982) has now been superseded by Ivey v Genting Casinos (2017) and Ghosh no longer applies. The 2017 case decided that the test for dishonesty in criminal cases is to be the same as for civil cases with the civil test being stated in Barlow Clowes (2006) and Royal Brunei Airlines (1995)"
        },
        {
            q: "Information was received that WISE was going to carry out a robbery on a Securicor van during the collection of cash from Asda the previous Friday or Saturday. On the Friday, officers kept watch and saw WISE in his car watching the movement of the Securicor van but taking no other action. As there is concern for the safety of the Securicor guards, two officers are swapped with the guards on the Saturday. On the Saturday, as the officer is walking from Asda to the Securicor van, WISE forces the officer at gunpoint to hand over the container but the officer opens up the container and shows WISE that it is empty whereupon WISE runs off. WISE is later arrested and interviewed but refuses to make any comment. Which of the following statements is true in relation to the offence(s) with which WISE can be charged?",
            opts: ["no offence because no robbery occurred", "attempt robbery on Friday, robbery on Saturday", "no offence on Friday, attempt robbery on Saturday", "robbery on both days"],
            correct: 2,
            expCorrect: "s. 8(1) of the Theft Act 1968 states that a person is guilty of robbery if he steals and immediately before doing so or at the time of doing so, and in order to do so, he uses force on any person or puts or seeks to put any person in fear of being then and there subjected to force.\n\ns. 1(1) of the Criminal Attempts Act 1981 says that a person is guilty of attempt if with the intention to commit an offence to which the section applies he does an act which is more than merely preparatory.\n\nWISE’s actions on Friday are merely preparatory and so there is no offence. On Saturday an attempt robbery has occurred. Force was used but it was then found that the container was empty. Even though it was impossible to commit the full offence as there was no money in the cash box, an attempt to commit the impossible does not prevent the attempt occurring.",
            expWrong: "s. 8(1) of the Theft Act 1968 states that a person is guilty of robbery if he steals and immediately before doing so or at the time of doing so, and in order to do so, he uses force on any person or puts or seeks to put any person in fear of being then and there subjected to force.\n\ns. 1(1) of the Criminal Attempts Act 1981 says that a person is guilty of attempt if with the intention to commit an offence to which the section applies he does an act which is more than merely preparatory.\n\nWISE’s actions on Friday are merely preparatory and so there is no offence. On Saturday an attempt robbery has occurred. Force was used but it was then found that the container was empty. Even though it was impossible to commit the full offence as there was no money in the cash box, an attempt to commit the impossible does not prevent the attempt occurring."
        },
        {
            q: "STONE is currently trying to open a safe, intending to steal cash he believes to be inside. Unknown to him, however, the safe is empty.\n\nWhich of the following statements is true?",
            opts: ["He's guilty of attempt theft; it doesn't matter that there was nothing there for him to steal.", "He's not guilty of an offence because he couldn't have stolen anything anyway.", "He's guilty of attempt theft only if he got the safe open, otherwise his actions are preparatory.", "He's guilty of theft it doesn't matter that there was none to steal."],
            correct: 0,
            expCorrect: "s. 1(1) of the Criminal Attempts Act 1981 says that a person is guilty of attempt if with the intention to commit an offence to which the section applies he does an act which is more than merely preparatory.\n\nThe fact that the commission of the full offence is impossible does not negate the attempt so STONE commits attempt theft.\n\nIn terms of being ‘more than merely preparatory’, STONE is actually in the process of opening the safe, and as such he satisfies this requirement.",
            expWrong: "s. 1(1) of the Criminal Attempts Act 1981 says that a person is guilty of attempt if with the intention to commit an offence to which the section applies he does an act which is more than merely preparatory.\n\nThe fact that the commission of the full offence is impossible does not negate the attempt so STONE commits attempt theft.\n\nIn terms of being ‘more than merely preparatory’, STONE is actually in the process of opening the safe, and as such he satisfies this requirement."
        },
        {
            q: "WALTON, SCARR and KERRY are to start dealing drugs in Sandford. They have all separately approached SMITHY to supply the drugs, but he isn't aware of their wider plans. So they don't tread on each other's toes, WALTON, SCARR, and KERRY decide to split the town between themselves and deal only in their allotted areas. They agree that any drugs supplied to them are then further supplied to drug users.\n\nDo the prospective dealers collectively commit an offence of statutory conspiracy to supply controlled drugs contrary to s. 1 of the Criminal Law Act 1977?",
            opts: ["No, none of them are guilty, as the intended recipient of the drugs to be supplied was the conspirators themselves.", "Yes, but only SMITHY is guilty, as although there is a joint agreement, only he will actually supply the drugs that are subject to the agreement.", "Yes, WALTON, SCARR and KERRY are guilty as they are the ones with the joint agreement. SMITHY is only guilty if he has entered into an agreement with the others.", "Yes, all four are guilty, as each of them is aware of the overall common purpose to which they all attach themselves."],
            correct: 2,
            expCorrect: "s. 1(1) of the Criminal Law Act 1977 states that subject to the following provisions of this Part of this Act, if a person agrees with any other person or persons that a course of conduct will be pursued which, if the agreement is carried out in accordance with their intention, either –\n\n(a) will necessarily amount to or involve the commission of any offence or offences by one or more of the parties to the agreement; or\n(b) would do so but for the existence of facts which render the commission of the offence or any of the offences impossible\n\nhe is guilty of conspiracy to commit the offence or offences in question.\n\ns. 2(2) of the Act states that a defendant cannot be convicted of statutory conspiracy if the only other party to the agreement is his/her spouse, a child or children under 10 years old or the intended victim.\n\nConspiracy is complete upon agreement; it doesn’t require any physical supply to have occurred yet.\n\nThere is only one conspiracy here, that of the three dealers. The wording states that they all approach SMITHY separately, and he is unaware of their wider plans. Hence, he is not party to their conspiracy. You might ask whether SMITHY is part of three separate conspiracies, between him and each of WALTON, SCARR and KERRY. However, the question wording also states that they have approached him, and not that he has agreed to supply them drugs – so he is not party to either a conspiracy between them all as a collective, nor a conspiracy between him and each one of them as individuals. Option (c) is correct.\n\nOption (a) is incorrect as it matters not that the conspirators would be the recipients; they are still pursuing a course of conduct that will amount to the commission of an offence. Of course, there are also the drug users they will be supplying to as well. The only exemption to this is a conspirator who is a child under 10, a spouse or an intended victim.\n\nOption (b) is incorrect as WALTON, SCARR and KERRY have all entered into an eligible agreement. SMITHY is only guilty if he also makes an agreement.\n\nOption (d) is incorrect as SMITHY hasn’t yet entered into the agreement, but only made an offer.",
            expWrong: "s. 1(1) of the Criminal Law Act 1977 states that subject to the following provisions of this Part of this Act, if a person agrees with any other person or persons that a course of conduct will be pursued which, if the agreement is carried out in accordance with their intention, either –\n\n(a) will necessarily amount to or involve the commission of any offence or offences by one or more of the parties to the agreement; or\n(b) would do so but for the existence of facts which render the commission of the offence or any of the offences impossible\n\nhe is guilty of conspiracy to commit the offence or offences in question.\n\ns. 2(2) of the Act states that a defendant cannot be convicted of statutory conspiracy if the only other party to the agreement is his/her spouse, a child or children under 10 years old or the intended victim.\n\nConspiracy is complete upon agreement; it doesn’t require any physical supply to have occurred yet.\n\nThere is only one conspiracy here, that of the three dealers. The wording states that they all approach SMITHY separately, and he is unaware of their wider plans. Hence, he is not party to their conspiracy. You might ask whether SMITHY is part of three separate conspiracies, between him and each of WALTON, SCARR and KERRY. However, the question wording also states that they have approached him, and not that he has agreed to supply them drugs – so he is not party to either a conspiracy between them all as a collective, nor a conspiracy between him and each one of them as individuals. Option (c) is correct.\n\nOption (a) is incorrect as it matters not that the conspirators would be the recipients; they are still pursuing a course of conduct that will amount to the commission of an offence. Of course, there are also the drug users they will be supplying to as well. The only exemption to this is a conspirator who is a child under 10, a spouse or an intended victim.\n\nOption (b) is incorrect as WALTON, SCARR and KERRY have all entered into an eligible agreement. SMITHY is only guilty if he also makes an agreement.\n\nOption (d) is incorrect as SMITHY hasn’t yet entered into the agreement, but only made an offer."
        },
        {
            q: "In which, if any of the following situations would an attempt be committed?\n\n(i) During an attempted rape the attacker's penis was flaccid and he had not penetrated the woman's vagina, albeit there was additional evidence that he intended to have sexual intercourse.\n(ii) CARTER has acquired some white powder which he believes to be cocaine cut with caster sugar and so sets about performing a chemical process to extract the cocaine. However the white powder is in fact pure talcum powder.",
            opts: ["(i) only.", "(ii) only", "Both", "Neither"],
            correct: 2,
            expCorrect: "s. 1(2) of the Criminal Attempts Act 1981 states that a person may be guilty of an attempt to commit an indictable offence even though the facts are such that the commission of the relevant full offence is impossible.\n\nIn Attorney General’s Reference No 1 of (1992) [1993] 1 WLR 274 it was held that it was sufficient for attempted rape if there was evidence from which the intent could be inferred and there were proved acts which a jury could properly infer were more than merely preparatory to the commission of the offence. The accused does not have to actually penetrate the victim. An attempt to have intercourse is sufficient R v Khan (1990) The Times, 3 February.\n\n(ii) This is the impossibility rule. R v Shivpuri (1986) The Times, May 16 House of Lords. In that case the defendant thought he was bringing in drugs to the UK, in fact the substance was vegetable matter.",
            expWrong: "s. 1(2) of the Criminal Attempts Act 1981 states that a person may be guilty of an attempt to commit an indictable offence even though the facts are such that the commission of the relevant full offence is impossible.\n\nIn Attorney General’s Reference No 1 of (1992) [1993] 1 WLR 274 it was held that it was sufficient for attempted rape if there was evidence from which the intent could be inferred and there were proved acts which a jury could properly infer were more than merely preparatory to the commission of the offence. The accused does not have to actually penetrate the victim. An attempt to have intercourse is sufficient R v Khan (1990) The Times, 3 February.\n\n(ii) This is the impossibility rule. R v Shivpuri (1986) The Times, May 16 House of Lords. In that case the defendant thought he was bringing in drugs to the UK, in fact the substance was vegetable matter."
        },
        {
            q: "LARKIN is standing as a councillor in the local authority elections. He has realised that it is unlikely that he will win the seat, so visits local households and collects uncompleted postal ballot papers, telling voters that they will be destroyed. LARKIN then takes the papers to his home, where his girlfriend completes the papers, voting for LARKIN, and posts them.\n\nWhat offence has LARKIN committed?",
            opts: ["No offence is committed as LARKIN cannot commit a conspiracy with his girlfriend.", "At the point of posting, this would only amount to an attempt to commit Statutory Conspiracy.", "Conspiracy to defraud contrary to Common Law or a Statutory Conspiracy, contrary to s. 1 of the Criminal Law Act 1977. The prosecution may choose the most appropriate charge.", "At the point of posting, this would only amount to an attempt to commit Conspiracy to Defraud."],
            correct: 2,
            expCorrect: "Common law conspiracy to defraud was defined in the stated case of Scott v Metropolitan Police Commissioner [1975] AC 819, and involves –\n\nAn agreement by two or more persons by dishonesty to deprive a person of something which is his or to which he is or would or might be entitled or an agreement by two or more by dishonesty to injure some proprietary right of the victim.\n\nStatutory conspiracy is defined in the Criminal Law Act of 1977, s. 1, which states –\n\n(1) Subject to the following provisions of this Part of this Act, if a person agrees with any other person or persons that a course of conduct shall be pursued which, if the agreement is carried out in accordance with their intentions, either –\n\n(a) will necessarily amount to or involve the commission of any offence or offences by one or more of the parties to the agreement, or\n(b) would do so but for the existence of facts which render the commission of the offence or any of the offences impossible,\n\nhe is guilty of conspiracy to commit the offence or offences in question.\n\nAs LARKIN is not married or in a civil partnership with his partner, they can commit a conspiracy together. There is also no requirement that the activity was successful, or even possible, it is more about the ‘meeting of minds’ and the agreement being made to conduct the relevant act.\n\nThe circumstances here would seemingly satisfy both definitions, as the end result of the conspiracy is to commit postal voting fraud. The stated case of R v Hussain [2005] EWCA Crim 1866 mirrored these exact circumstances, and the defendant was convicted of conspiracy to defraud. However, s. 12 of the Criminal Justice Act 1987 allows the prosecution to pick the most appropriate offence in such circumstances.\n\nThe main difference between a statutory conspiracy and a conspiracy to defraud is the scope of the offence. Statutory conspiracy will only apply where the end result would be the commission of an offence, such as voter fraud in this case. In contrast, conspiracy to defraud is much wider in scope and can include end results that are not themselves criminal offences, but rather of merely depriving someone of something, or injuring his or her proprietary right; such an example being buffet car staff selling their own homemade sandwiches on a railway refreshment trolley, thereby depriving the rail operator of the opportunity to make money (R v Cooke [1986] AC 909). Option (c) is correct.",
            expWrong: "Common law conspiracy to defraud was defined in the stated case of Scott v Metropolitan Police Commissioner [1975] AC 819, and involves –\n\nAn agreement by two or more persons by dishonesty to deprive a person of something which is his or to which he is or would or might be entitled or an agreement by two or more by dishonesty to injure some proprietary right of the victim.\n\nStatutory conspiracy is defined in the Criminal Law Act of 1977, s. 1, which states –\n\n(1) Subject to the following provisions of this Part of this Act, if a person agrees with any other person or persons that a course of conduct shall be pursued which, if the agreement is carried out in accordance with their intentions, either –\n\n(a) will necessarily amount to or involve the commission of any offence or offences by one or more of the parties to the agreement, or\n(b) would do so but for the existence of facts which render the commission of the offence or any of the offences impossible,\n\nhe is guilty of conspiracy to commit the offence or offences in question.\n\nAs LARKIN is not married or in a civil partnership with his partner, they can commit a conspiracy together. There is also no requirement that the activity was successful, or even possible, it is more about the ‘meeting of minds’ and the agreement being made to conduct the relevant act.\n\nThe circumstances here would seemingly satisfy both definitions, as the end result of the conspiracy is to commit postal voting fraud. The stated case of R v Hussain [2005] EWCA Crim 1866 mirrored these exact circumstances, and the defendant was convicted of conspiracy to defraud. However, s. 12 of the Criminal Justice Act 1987 allows the prosecution to pick the most appropriate offence in such circumstances.\n\nThe main difference between a statutory conspiracy and a conspiracy to defraud is the scope of the offence. Statutory conspiracy will only apply where the end result would be the commission of an offence, such as voter fraud in this case. In contrast, conspiracy to defraud is much wider in scope and can include end results that are not themselves criminal offences, but rather of merely depriving someone of something, or injuring his or her proprietary right; such an example being buffet car staff selling their own homemade sandwiches on a railway refreshment trolley, thereby depriving the rail operator of the opportunity to make money (R v Cooke [1986] AC 909). Option (c) is correct."
        },
        {
            q: "COLES owes a large sum of money to a money-lender who has threatened COLES, his girlfriend and their child with physical violence if he does not repay the money owed. To get the cash, COLES carries out a number of robberies of building societies and is caught by the police; he claims he was acting under duress because of the threats made by the money-lender.\n\nIs this defence likely to succeed?",
            opts: ["Yes, provided the threat drove COLES to commit the offences.", "Yes, provided the threat drove COLES to commit the offences and a sober and reasonable person sharing the characteristics of COLES would have acted the same.", "No, as the threat of violence has nothing to do with the crimes COLES committed.", "No, he had an opportunity to negate the threat by paying the money owed."],
            correct: 2,
            expCorrect: "Where a person is threatened with death or serious physical injury unless he/she carries out a criminal act, he/she may have a defence of duress ( R v Graham [1982] 1 WLR 294). The threat to COLES is ‘repay the money or else’ not ‘commit this crime or else’. COLES chose to commit robbery offences to repay the debt: there was no threat against him if he did not carry out an offence; answers A and B are therefore incorrect as they relate to the defence of duress, which doesn’t apply. Duress is not available as a defence if it is proved that the defendant failed to take advantage of an opportunity to neutralise the effects of the threat (perhaps by escaping from it or reporting the matter to the authorities) which a reasonable person of a similar sort to the defendant would have taken in his position. However, as duress does not apply to this set of circumstances this is irrelevant; answer D is therefore incorrect.",
            expWrong: "Where a person is threatened with death or serious physical injury unless he/she carries out a criminal act, he/she may have a defence of duress ( R v Graham [1982] 1 WLR 294). The threat to COLES is ‘repay the money or else’ not ‘commit this crime or else’. COLES chose to commit robbery offences to repay the debt: there was no threat against him if he did not carry out an offence; answers A and B are therefore incorrect as they relate to the defence of duress, which doesn’t apply. Duress is not available as a defence if it is proved that the defendant failed to take advantage of an opportunity to neutralise the effects of the threat (perhaps by escaping from it or reporting the matter to the authorities) which a reasonable person of a similar sort to the defendant would have taken in his position. However, as duress does not apply to this set of circumstances this is irrelevant; answer D is therefore incorrect."
        },
        {
            q: "BREWSTER is a member of a violent gang who, to his knowledge, use loaded firearms to carry out robberies on post offices. The other gang members discuss a forthcoming robbery and BREWSTER is aware of the plan. During the commission of the robbery another member of the gang shoots and kills a member of staff at the post office after which the gang all make good their escape. BREWSTER is later caught and charged with robbery and murder. BREWSTER wishes to use the defence of duress. He claims his wife was threatened at gunpoint after he tried to pull out of the robbery, and he took part only because he feared for his wife’s life (this is true).\n\nWill BREWSTER be allowed to use duress as a defence to a charge relating to the murder of the member of staff at the post office?",
            opts: ["Yes, as his wife’s life was threatened.", "No, the defence will not be available in these circumstances.", "No, the threat must have been against BREWSTER’s life.", "Yes, provided the person who issued the threat was the one who shot the sub-post master."],
            correct: 1,
            expCorrect: "The defence of duress is not available to a person who joins a violent gang, knowing that they might put pressure on him to commit an offence ( R v Sharp [1987] QB 853). The question follows the broad outline of Sharp . A threat of death or serious harm to a partner may allow the defence of duress (as in R v Ortiz (1986) 83 Cr App R 173 where threats to the accused’s wife or family were considered to be sufficient). It should also be noted that duress cannot be used in answer to a charge of murder. Answers A, C and D all refer to some sort of threat or other, and are made incorrect by the fact that BREWSTER knew that pressure may be applied to him allied to the fact that a person has been murdered.",
            expWrong: "The defence of duress is not available to a person who joins a violent gang, knowing that they might put pressure on him to commit an offence ( R v Sharp [1987] QB 853). The question follows the broad outline of Sharp . A threat of death or serious harm to a partner may allow the defence of duress (as in R v Ortiz (1986) 83 Cr App R 173 where threats to the accused’s wife or family were considered to be sufficient). It should also be noted that duress cannot be used in answer to a charge of murder. Answers A, C and D all refer to some sort of threat or other, and are made incorrect by the fact that BREWSTER knew that pressure may be applied to him allied to the fact that a person has been murdered."
        },
        {
            q: "MARONEY was arrested and has been charged with an offence of assaulting a police officer who arrested her. The officer was in plain clothes at the time of the incident. MARONEY wishes to contest the matter stating that she did not know he was a police officer and had made a genuine mistake.\n\nIn relation to the defence of mistake, which of the following is correct?",
            opts: ["The defence applies where there was a genuine and honest belief that was reasonably held.", "The defence applies where there was a reasonable and honest belief.", "The defence applies where there was a genuine and reasonable belief that was honestly held.", "The defence applies where there was a genuine and honest belief."],
            correct: 3,
            expCorrect: "There are occasions where a defendant makes a mistake about some circumstance or consequence, but claims that a defendant ‘made a mistake’ or did something ‘inadvertently’ will only be an effective defence if they negate the mens rea for that offence. Therefore, if someone picks up another person’s shopping at a supermarket till or wanders out of a shop with something they have yet to pay for, their mistake or inadvertence, in each case, might negative any mens rea of ‘dishonesty’. As the requirement for the mens rea in such a case is subjective, then the defendant’s mistake or inadvertence will be judged subjectively. The same will generally be true for offences requiring subjective recklessness. It does not matter whether the mistake was ‘reasonable’ ( DPP v Morgan [1976] AC 182); answers A, B and C are therefore incorrect. The appropriate test is whether the defendant’s mistaken belief was an honest and genuine one. There are occasions where a genuine mistake on the part of the defendant may amount to a defence. In R v Lee [2000] Crim LR 991, a case arising from an assault on two arresting police officers, the Court of Appeal reviewed the law in this area, reaffirming the following points:\n\n• A genuine or honest mistake could provide a defence to many criminal offences requiring a particular state of mind, including assault with intent to resist arrest ( R v Brightling [1991] Crim LR 364).\n• A defence of mistake had to involve a mistake of fact, not a mistake of law (see later).\n• People under arrest are not entitled to form their own view as to the lawfulness of that arrest. They have a duty to comply with the police and hear the details of the charge against them ( R v Bentley (1850) 4 Cox CC 406).\n• Belief in one’s own innocence, however genuine or honestly held, cannot afford a defence to a charge of assault with intent to resist arrest under s. 38 of the Offences Against the Person Act 1861.\nA defendant attempted to argue that his honest and reasonable mistake as to the facts of his arrest (as opposed to the law) after he was lawfully arrested for a public order offence was different from the decision in Lee . The Divisional Court did not agree with him (see Hewitt v DPP [2002] EWHC 2801 (Admin)).",
            expWrong: "There are occasions where a defendant makes a mistake about some circumstance or consequence, but claims that a defendant ‘made a mistake’ or did something ‘inadvertently’ will only be an effective defence if they negate the mens rea for that offence. Therefore, if someone picks up another person’s shopping at a supermarket till or wanders out of a shop with something they have yet to pay for, their mistake or inadvertence, in each case, might negative any mens rea of ‘dishonesty’. As the requirement for the mens rea in such a case is subjective, then the defendant’s mistake or inadvertence will be judged subjectively. The same will generally be true for offences requiring subjective recklessness. It does not matter whether the mistake was ‘reasonable’ ( DPP v Morgan [1976] AC 182); answers A, B and C are therefore incorrect. The appropriate test is whether the defendant’s mistaken belief was an honest and genuine one. There are occasions where a genuine mistake on the part of the defendant may amount to a defence. In R v Lee [2000] Crim LR 991, a case arising from an assault on two arresting police officers, the Court of Appeal reviewed the law in this area, reaffirming the following points:\n\n• A genuine or honest mistake could provide a defence to many criminal offences requiring a particular state of mind, including assault with intent to resist arrest ( R v Brightling [1991] Crim LR 364).\n• A defence of mistake had to involve a mistake of fact, not a mistake of law (see later).\n• People under arrest are not entitled to form their own view as to the lawfulness of that arrest. They have a duty to comply with the police and hear the details of the charge against them ( R v Bentley (1850) 4 Cox CC 406).\n• Belief in one’s own innocence, however genuine or honestly held, cannot afford a defence to a charge of assault with intent to resist arrest under s. 38 of the Offences Against the Person Act 1861.\nA defendant attempted to argue that his honest and reasonable mistake as to the facts of his arrest (as opposed to the law) after he was lawfully arrested for a public order offence was different from the decision in Lee . The Divisional Court did not agree with him (see Hewitt v DPP [2002] EWHC 2801 (Admin))."
        },
        {
            q: "PHILLIPS hits WILCE over the head with a baseball bat causing serious injuries to WILCE. WILCE is taken to hospital and remains in a coma for three years and two weeks and then dies as a direct consequence of the injuries caused to him by PHILLIPS during the attack with the baseball bat. In the meantime PHILLIPS is serving a 4 year prison sentence imposed following a conviction for a s.20 grievous bodily harm offence as a result of the attack on WILCE.\n\nWhich of the following is correct in relation to charging PHILLIPS with murder?",
            opts: ["PHILLIPS can be charged with murder as WILCE died within five years of receiving the injuries that caused his death.", "PHILLIPS can be charged with murder provided the consent of the Attorney-General is given.", "PHILLIPS cannot be charged with murder as he was previously charged with another offence in relation to the same incident.", "PHILLIPS cannot be charged with murder as he was previously convicted of another offence in relation to the same incident."],
            correct: 1,
            expCorrect: "Under s. 2(2) of the Law Reform (Year and a Day Rule)1996 Act, with the Attorney-General’s consent, proceedings can be instituted for a ‘fatal offence’ where either:\n\n• the injury alleged to have caused the death was sustained more than three years before the death occurred, or\n• the person has previously been convicted of an offence committed in circumstances alleged to be connected with the death.\nThe circumstances of this offence mirror s. 2(2)(b) and there can be a charge of murder; answers A, C and D are therefore incorrect.",
            expWrong: "Under s. 2(2) of the Law Reform (Year and a Day Rule)1996 Act, with the Attorney-General’s consent, proceedings can be instituted for a ‘fatal offence’ where either:\n\n• the injury alleged to have caused the death was sustained more than three years before the death occurred, or\n• the person has previously been convicted of an offence committed in circumstances alleged to be connected with the death.\nThe circumstances of this offence mirror s. 2(2)(b) and there can be a charge of murder; answers A, C and D are therefore incorrect."
        },
        {
            q: "McINLEY is appearing in Crown Court having been charged with an offence under s. 5 of the Domestic Violence, Crime and Victims Act 2004 (causing or allowing a child or vulnerable adult to die or suffer serious injury). The circumstances were that McINLEY’s long-time partner, NORTON, was involved in serious sexual abuse towards her 7-year-old daughter and has been convicted of her murder. McINLEY and NORTON lived in the same house with the 7-year-old daughter for a number of years and had frequent contact with each other. McINLEY’s barrister has submitted that the defendant was not involved in either the abuse of her child or her subsequent death.\n\nWhich of the following statements is correct, which could assist McINLEY prove she did not commit the offence under s. 5 of this Act?",
            opts: ["That McINLEY was not involved in the abuse that preceded her child’s death.", "That McINLEY was not actively involved in the death of her child.", "That McINLEY was not aware of the risk of abuse to her child by NORTON.", "That McINLEY was not aware of the risk of abuse to her child by NORTON, and could not have foreseen the risk."],
            correct: 3,
            expCorrect: "Under s. 5(1) of the Domestic Violence, Crime and Victims Act 2004, a person (‘D’) is guilty of an offence if—\n\n• a child or vulnerable adult (‘V’) dies or suffers serious physical harm as a result of the unlawful act of a person who—\n• was a member of the same household as V, and\n• had frequent contact with him,\n• D was such a person at the time of that act,\n• at that time there was a significant risk of serious physical harm being caused to V by the unlawful act of such a person, and\n• either D was the person whose act caused the V’s death or serious physical harm\n• D was, or ought to have been, aware of the risk mentioned in paragraph (c),\n• D failed to take such steps as he could reasonably have been expected to take to protect V from the risk, and\n• the act occurred in circumstances of the kind that D foresaw or ought to have foreseen.\nThe purpose of this Act and section is to plug a legislative gap which might otherwise allow a person living in the same household as a child or vulnerable adult who was suffering abuse, to walk away from a prosecution simply because it could not be proved that they were actively involved in the abuse or death. Section 5(d)(ii) effectively requires the person to intervene by taking ‘such steps as he could reasonably have been expected to take to protect the child/vulnerable adult from the risk’. As McINLEY was a member of the same household as her daughter and had frequent contact with her, the only possible element of the offence that might be missing is that she was not aware of the risk of abuse to her child by NORTON, and could not have foreseen the risk. It is irrelevant that she was not involved in the abuse that preceded her child’s death or that she was not actively involved in the death itself. Answers A and B are incorrect. Simply being unaware of the risk of abuse to her child by NORTON would not in itself provide this defence to McINLEY—she would have to show that she could not have foreseen the risk (i.e. the abuse was so well hidden that she could not possibly have known that it was happening). Answer C is therefore incorrect.",
            expWrong: "Under s. 5(1) of the Domestic Violence, Crime and Victims Act 2004, a person (‘D’) is guilty of an offence if—\n\n• a child or vulnerable adult (‘V’) dies or suffers serious physical harm as a result of the unlawful act of a person who—\n• was a member of the same household as V, and\n• had frequent contact with him,\n• D was such a person at the time of that act,\n• at that time there was a significant risk of serious physical harm being caused to V by the unlawful act of such a person, and\n• either D was the person whose act caused the V’s death or serious physical harm\n• D was, or ought to have been, aware of the risk mentioned in paragraph (c),\n• D failed to take such steps as he could reasonably have been expected to take to protect V from the risk, and\n• the act occurred in circumstances of the kind that D foresaw or ought to have foreseen.\nThe purpose of this Act and section is to plug a legislative gap which might otherwise allow a person living in the same household as a child or vulnerable adult who was suffering abuse, to walk away from a prosecution simply because it could not be proved that they were actively involved in the abuse or death. Section 5(d)(ii) effectively requires the person to intervene by taking ‘such steps as he could reasonably have been expected to take to protect the child/vulnerable adult from the risk’. As McINLEY was a member of the same household as her daughter and had frequent contact with her, the only possible element of the offence that might be missing is that she was not aware of the risk of abuse to her child by NORTON, and could not have foreseen the risk. It is irrelevant that she was not involved in the abuse that preceded her child’s death or that she was not actively involved in the death itself. Answers A and B are incorrect. Simply being unaware of the risk of abuse to her child by NORTON would not in itself provide this defence to McINLEY—she would have to show that she could not have foreseen the risk (i.e. the abuse was so well hidden that she could not possibly have known that it was happening). Answer C is therefore incorrect."
        },
        {
            q: "HANCOCK is wanted for an armed robbery where he used a revolver to threaten staff. He resides in a small block of flats and a team of armed officers go to his flat in the early hours of the morning to arrest him. The officers surround the premises but, before they go up the stairs to his flat, HANCOCK appears at the top landing and fires two shots at PC FLINT, one of the armed officers. FLINT returns fire but, a split second before he does so, HANCOCK reaches out to his girlfriend (SIMPSON) who is standing near him. He punches her in the face and pulls her in front of him to use as a shield. The officers return fire and kill SIMPSON as a result. HANCOCK then places his hands in the air in surrender and is formally arrested— he did not intend to kill or seriously injure SIMPSON as a consequence of his actions although he did intentionally injure her when he punched her in the face.\n\nWhich of the following statements is correct with regards to the criminal liability of HANCOCK?",
            opts: ["HANCOCK is guilty of the murder of SIMPSON.", "HANCOCK is guilty of the voluntary manslaughter of SIMPSON.", "HANCOCK is guilty of involuntary manslaughter (manslaughter by unlawful act).", "HANCOCK is not liable in these circumstances for the death of SIMPSON."],
            correct: 2,
            expCorrect: "This question links to the text of the Manual in relation to manslaughter by unlawful act and the case law of R v Pagett (1983) 76 Cr App R 279 (firing a gun at police officers then holding someone else in front of you when officers return fire). Answer A is incorrect as there is no intention to kill or cause GBH (no mens rea for murder). Answer B is incorrect as voluntary manslaughter is a finding by a court when one of the three ‘special defences’ to murder is successfully utilised and that is not the case here. All three elements required for an offence of manslaughter by unlawful act are present:\n\n• an unlawful act;\n• the unlawful act is likely to cause bodily harm (firing a gun at police officers and holding someone else in front of you when the officers return fire ( R v Pagett )); and\n• the defendant had the mens rea for the unlawful act.\nThis means that answer D is incorrect.",
            expWrong: "This question links to the text of the Manual in relation to manslaughter by unlawful act and the case law of R v Pagett (1983) 76 Cr App R 279 (firing a gun at police officers then holding someone else in front of you when officers return fire). Answer A is incorrect as there is no intention to kill or cause GBH (no mens rea for murder). Answer B is incorrect as voluntary manslaughter is a finding by a court when one of the three ‘special defences’ to murder is successfully utilised and that is not the case here. All three elements required for an offence of manslaughter by unlawful act are present:\n\n• an unlawful act;\n• the unlawful act is likely to cause bodily harm (firing a gun at police officers and holding someone else in front of you when the officers return fire ( R v Pagett )); and\n• the defendant had the mens rea for the unlawful act.\nThis means that answer D is incorrect."
        },
        {
            q: "PORTER is a well-known drugs dealer. He supplies BROWN with a wrap of heroin which BROWN injects into his vein a few hours after purchasing the drug from PORTER. The heroin kills BROWN.\n\nIn relation to PORTER’s conduct and potential liability in relation to the death of BROWN, which of the following statements is true?",
            opts: ["It amounts to manslaughter by unlawful act.", "It amounts to manslaughter by gross negligence.", "PORTER would not be liable for BROWN's death.", "It amounts to murder."],
            correct: 2,
            expCorrect: "The offence of murder will not be made out without the presence of the mens rea i.e. the intention to kill or cause grievous bodily harm - this is not present and therefore answer D is incorrect. Manslaughter by gross negligence requires a degree of negligence by the accused. Here ARMSTRONG was not negligent in supplying the drugs, nor when BROWN injected himself (therefore answer B is incorrect). The actions of the user (the self-injection) breaks the chain of causation between the unlawful supply and the cause of the death, and therefore the dealer is not responsible for the death of the user ( R v Dalby [1982] 1 WLR 62 and R v Armstrong [1989] Crim LR 149)—answer A is incorrect.",
            expWrong: "The offence of murder will not be made out without the presence of the mens rea i.e. the intention to kill or cause grievous bodily harm - this is not present and therefore answer D is incorrect. Manslaughter by gross negligence requires a degree of negligence by the accused. Here ARMSTRONG was not negligent in supplying the drugs, nor when BROWN injected himself (therefore answer B is incorrect). The actions of the user (the self-injection) breaks the chain of causation between the unlawful supply and the cause of the death, and therefore the dealer is not responsible for the death of the user ( R v Dalby [1982] 1 WLR 62 and R v Armstrong [1989] Crim LR 149)—answer A is incorrect."
        },
        {
            q: "FOZIA despises her husband, ALI. For years, ALI has subjected FOZIA to repeated physical and verbal abuse, making her life a misery. One night FOZIA is severely beaten by ALI. The attack proves to be ‘the last straw’ for FOZIA. After the attack FOZIA decides that enough is enough and plans to kill ALI. She waits for him to fall asleep and attacks him with a claw hammer. She strikes ALI five times about the head, causing serious injuries but not, as she intended, ALI’s death.\n\nWhich of the following statements is correct?",
            opts: ["FOZIA has committed an attempted murder but because she suffered abuse over a prolonged period, she may raise the ‘special defence’ of loss of control.", "FOZIA has committed an attempted murder and would be able to use any of the ‘special defences’ provided by the Homicide Act 1957 or by the Coroners and Justice Act 2009.", "FOZIA’s intention to kill ALI provides the mens rea needed to support a charge of attempted murder but she would not be able to use any ‘special defences’.", "FOZIA has committed an attempted murder but could raise diminished responsibility as a defence if she can prove she was suffering from ‘battered wives’ syndrome’."],
            correct: 2,
            expCorrect: "FOZIA’s mens rea to kill ALI is the only state of mind that would support a charge of attempted murder. Regardless of the motives FOZIA has to commit the offence, she does not kill ALI and would, therefore, only be liable for that offence. The ‘special defences’ of diminished responsibility, loss of control and suicide pact are only available to a defendant who is responsible for murder, making answers A, B and D incorrect.",
            expWrong: "FOZIA’s mens rea to kill ALI is the only state of mind that would support a charge of attempted murder. Regardless of the motives FOZIA has to commit the offence, she does not kill ALI and would, therefore, only be liable for that offence. The ‘special defences’ of diminished responsibility, loss of control and suicide pact are only available to a defendant who is responsible for murder, making answers A, B and D incorrect."
        },
        {
            q: "IVY and his wife had been to the local pub where they had been drinking heavily and arguing. IVY returned to their house where he chopped wood with an axe and drank more lager. His wife was still in the public house drinking. When she returned to the house, she picked up the axe and said she was going to put it in his head. In fear that this would happen, he took the axe from her and struck her with the axe, killing her, and is charged with murder. IVY wishes to use ‘loss of control’ as a defence to the charge of murder.\n\nFor the purposes of this defence (loss of control), which of the following is correct in relation to what the defence would be based on?",
            opts: ["That a reasonable person with a normal degree of tolerance and self-restraint, and in the same circumstances, might have reacted in the same way as IVY.", "That a reasonable person with a normal degree of tolerance and self-restraint, and in the same circumstances, might have reacted in the same or in a similar way to IVY.", "That a person of IVY’s sex and age with a normal degree of tolerance and self-restraint, and in the circumstances, might have reacted in the same way as IVY.", "That a person of IVY’s sex and age with a normal degree of tolerance and self-restraint, and in the same circumstances, might have reacted in the same or in a similar way to IVY."],
            correct: 3,
            expCorrect: "Section 54 of the Coroners and Justice Act 2009 states:\n\n(1) Where a person (‘D’) kills or is a party to the killing of another (‘V’), D is not to be convicted of murder if—\n(a) D’s acts and omissions in doing or being a party to the killing resulted from D’s loss of self-control,\n(b) the loss of self-control had a qualifying trigger, and\n(c) a person of D’s sex and age, with a normal degree of tolerance and self- restraint and in the circumstances of D, might have reacted in the same or in a similar way to D ...\nSection 54 sets out the criteria which need to be met in order for the partial defence of loss of self-control to be successful, those being:\n\n• the defendant’s conduct resulted from a loss of self-control;\n• the loss of self-control had a qualifying trigger; and\n• a person of the defendant’s sex and age with an ordinary level of tolerance and self-restraint and in the circumstances of the defendant might have acted in the same or similar way to the defendant.\nThere is no ‘reasonable person’ element so answers A and B are therefore incorrect. The similar person also acted in the same or similar way, not just the same; answer C is therefore incorrect.",
            expWrong: "Section 54 of the Coroners and Justice Act 2009 states:\n\n(1) Where a person (‘D’) kills or is a party to the killing of another (‘V’), D is not to be convicted of murder if—\n(a) D’s acts and omissions in doing or being a party to the killing resulted from D’s loss of self-control,\n(b) the loss of self-control had a qualifying trigger, and\n(c) a person of D’s sex and age, with a normal degree of tolerance and self- restraint and in the circumstances of D, might have reacted in the same or in a similar way to D ...\nSection 54 sets out the criteria which need to be met in order for the partial defence of loss of self-control to be successful, those being:\n\n• the defendant’s conduct resulted from a loss of self-control;\n• the loss of self-control had a qualifying trigger; and\n• a person of the defendant’s sex and age with an ordinary level of tolerance and self-restraint and in the circumstances of the defendant might have acted in the same or similar way to the defendant.\nThere is no ‘reasonable person’ element so answers A and B are therefore incorrect. The similar person also acted in the same or similar way, not just the same; answer C is therefore incorrect."
        },
        {
            q: "BROTHERTON and his cousin hold extreme political views and are concerned about the influence that Europe is having on UK policy. BROTHERTON decides to telephone his cousin and propose that his cousin goes to France to murder the president of France. He telephones his cousin but there is no reply to the call. BROTHERTON waits for 30 minutes and then calls his cousin again; this time his cousin answers and BROTHERTON makes his proposal. BROTHERTON is serious about his proposal but his cousin thinks it is a joke.\n\nWould BROTHERTON commit an offence of solicitation to murder (contrary to s. 4 of the Offences Against the Person Act 1861) in these circumstances?",
            opts: ["Yes, but only when BROTHERTON’s cousin answers the telephone and hears what BROTHERTON has to say.", "Yes, the offence is committed when BROTHERTON makes the initial but unanswered call to his cousin.", "No, as the cousin was not in any way encouraged to commit murder.", "No, as the intended victim was not a British subject and in fact is outside the UK."],
            correct: 0,
            expCorrect: "Section 4 of the Offences Against the Person Act 1861 states:\n\nWhosoever shall solicit, encourage, persuade or endeavour to persuade, or shall propose to any person, to murder any other person, whether he be a subject of His Majesty or not, and whether he be within the King’s dominions or not, shall be guilty of [an offence].\nThe proposed victim may be outside the UK and it does not matter whether or not the person is in fact encouraged to commit murder; answers C and D are therefore incorrect. Answer B is incorrect as the offence is not complete until someone is in receipt of the solicitation.",
            expWrong: "Section 4 of the Offences Against the Person Act 1861 states:\n\nWhosoever shall solicit, encourage, persuade or endeavour to persuade, or shall propose to any person, to murder any other person, whether he be a subject of His Majesty or not, and whether he be within the King’s dominions or not, shall be guilty of [an offence].\nThe proposed victim may be outside the UK and it does not matter whether or not the person is in fact encouraged to commit murder; answers C and D are therefore incorrect. Answer B is incorrect as the offence is not complete until someone is in receipt of the solicitation."
        },
        {
            q: "CHALLINOR and BARNSLEY, both British citizens, are on holiday in Cuba (a country not forming part of the Commonwealth). The two men are having dinner when an argument takes place over who will pay for the meal. CHALLINOR loses his temper, picks up a steak knife from the table and stabs BARNSLEY in the chest. BARNSLEY immediately dies from his injuries.\n\nCould CHALLINOR be tried in this country for the offence of murder?",
            opts: ["No, as the offence was committed outside the jurisdiction of the English courts CHALLINOR would have to be tried in Cuba under Cuban law.", "Yes, any British citizen who commits a murder anywhere in the world may be tried in England and Wales.", "No, the Offences Against the Person Act 1861 makes it clear that such offences may only be tried in this country if the act is committed in a country belonging to the Commonwealth.", "Yes, but this is only because both CHALLINOR and BARNSLEY are British citizens."],
            correct: 1,
            expCorrect: "Under the provisions of s. 9 of the Offences Against the Person Act 1861, any British citizen who commits a murder anywhere in the world may be tried in England or Wales. Jurisdiction is not an issue, making answer A incorrect. Whether the country where the offence took place is a part of the Commonwealth or not makes no difference, so answer C is incorrect. The only issue relating to country of origin is if the defendant, not the victim, is a British citizen, making answer D incorrect.",
            expWrong: "Under the provisions of s. 9 of the Offences Against the Person Act 1861, any British citizen who commits a murder anywhere in the world may be tried in England or Wales. Jurisdiction is not an issue, making answer A incorrect. Whether the country where the offence took place is a part of the Commonwealth or not makes no difference, so answer C is incorrect. The only issue relating to country of origin is if the defendant, not the victim, is a British citizen, making answer D incorrect."
        },
        {
            q: "BRENNAN is appearing in Crown Court for murder and has accepted the facts of the case, that she unlawfully killed her husband by stabbing him. However, the defence barrister has suggested that leading up to the offence, BRENNAN was the victim of severe domestic abuse. It has been claimed that she should not be convicted of murder as she had suffered an ‘abnormality of mind’, which caused her to kill the victim.\n\nWhat must the court accept, if this defence is to be successful?",
            opts: ["That ‘abnormality of mind’ was the sole cause of BRENNAN’s actions; the prosecution bears the burden of disproving this defence.", "That ‘abnormality of mind’ was a cause of BRENNAN’s actions; the burden of proof lies with the defence.", "That ‘abnormality of mind’ was a cause of BRENNAN’s actions; the prosecution bears the burden of disproving this defence.", "That ‘abnormality of mind’ was the sole cause of BRENNAN’s actions; the burden of proof lies with the defence."],
            correct: 1,
            expCorrect: "The ‘special defence’ of diminished responsibility requires ‘an abnormality of mental functioning’ arising from a ‘recognised medical condition’. This impairment must be ‘substantial’ and minor lapses of lucidity will not be enough. There may be any number of causes of the ‘abnormality’ of the mind. Examples accepted by the courts include post-natal depression and pre-menstrual symptoms ( R v Reynolds [1988] Crim LR 679) and ‘battered wives’ syndrome’ ( R v Hobson [1998] 1 Cr App R 31). A further example arose in the case of R v Dietschmann [2003] UKHL 10 where the House of Lords accepted that a mental abnormality caused by a grief reaction to the recent death of an aunt, with whom the defendant had had a physical relationship, could suffice. In that case, their lordships went on to hold that there is no requirement to show that the ‘abnormality of mind’ was the sole cause of the defendant’s acts in committing the killing. Answers A and D are incorrect. The burden of proving these features lies with the defence and the standard required is one of a balance of probabilities. Answers A and C are incorrect for this reason also.",
            expWrong: "The ‘special defence’ of diminished responsibility requires ‘an abnormality of mental functioning’ arising from a ‘recognised medical condition’. This impairment must be ‘substantial’ and minor lapses of lucidity will not be enough. There may be any number of causes of the ‘abnormality’ of the mind. Examples accepted by the courts include post-natal depression and pre-menstrual symptoms ( R v Reynolds [1988] Crim LR 679) and ‘battered wives’ syndrome’ ( R v Hobson [1998] 1 Cr App R 31). A further example arose in the case of R v Dietschmann [2003] UKHL 10 where the House of Lords accepted that a mental abnormality caused by a grief reaction to the recent death of an aunt, with whom the defendant had had a physical relationship, could suffice. In that case, their lordships went on to hold that there is no requirement to show that the ‘abnormality of mind’ was the sole cause of the defendant’s acts in committing the killing. Answers A and D are incorrect. The burden of proving these features lies with the defence and the standard required is one of a balance of probabilities. Answers A and C are incorrect for this reason also."
        },
        {
            q: "CUTLER and HAVELIN are both drug addicts who use heroin on a regular basis. They obtain some heroin and HAVELIN obtains two items, a tourniquet and a hypodermic syringe, to assist in the administration of the drug. HAVELIN offers to supply both articles to CUTLER so that he can administer the drug to himself.\n\nWith which, if any, of the two items would HAVELIN commit the offence of supplying articles for administering or preparing controlled drugs (contrary to s. 9A of the Misuse of Drugs Act 1971)?",
            opts: ["The tourniquet only.", "The hypodermic syringe only.", "The tourniquet and the hypodermic syringe.", "Neither of the two items."],
            correct: 0,
            expCorrect: "Hypodermic syringes, or parts of them, are not covered by this offence (s. 9A(2)), making answers B and C incorrect. The tourniquet would be covered as this offence deals with ‘articles’ used in the administration or preparation of drugs to ‘himself or another’, making answer D incorrect.",
            expWrong: "Hypodermic syringes, or parts of them, are not covered by this offence (s. 9A(2)), making answers B and C incorrect. The tourniquet would be covered as this offence deals with ‘articles’ used in the administration or preparation of drugs to ‘himself or another’, making answer D incorrect."
        },
        {
            q: "MEADEN has been arrested and charged with an offence of supplying a controlled drug (in MEADEN’s case this was a significant quantity of cannabis resin). MEADEN appears at court and after pleading ‘guilty’ to the offence, she is sentenced to a period of imprisonment of four years.\n\nThinking about the law in relation to travel restriction orders (under the Criminal Justice and Police Act 2001), which of the comments below is correct?",
            opts: ["A travel restriction order cannot be made in these circumstances as cannabis resin is a Class B drug, not a Class A drug.", "A travel restriction order can be made in these circumstances; the minimum period it will run for will be two years from the date of MEADEN’s release from custody (other than on bail or temporary release for a fixed period).", "A travel restriction order cannot be made in these circumstances as MEADEN was sentenced to a period of imprisonment of less than five years.", "A travel restriction order can be made in these circumstances; it will prohibit MEADEN from leaving Great Britain for the duration of the order."],
            correct: 1,
            expCorrect: "A travel restriction order can be made by a court where they have convicted a person of a drug trafficking offence and the court has determined that a sentence of four years or more is appropriate. Drug trafficking includes supplying drugs—it does not matter what class the drugs are so answer A is incorrect. As MEADEN was sentenced to four years’ imprisonment the order can be made, making answer C incorrect. The order will restrict the movement of the individual so that for the duration of the order (minimum two years) they cannot leave the United Kingdom, making answer D incorrect.",
            expWrong: "A travel restriction order can be made by a court where they have convicted a person of a drug trafficking offence and the court has determined that a sentence of four years or more is appropriate. Drug trafficking includes supplying drugs—it does not matter what class the drugs are so answer A is incorrect. As MEADEN was sentenced to four years’ imprisonment the order can be made, making answer C incorrect. The order will restrict the movement of the individual so that for the duration of the order (minimum two years) they cannot leave the United Kingdom, making answer D incorrect."
        },
        {
            q: "DC LONGWELL receives information about a house owned by MALLORY being used to manufacture a variety of drugs. The officer applies for a warrant to search the premises under s. 23 of the Misuse of Drugs Act 1971 and the application is granted.\n\nHow long will such a warrant last?",
            opts: ["It lasts for a period of one month from the date of issue.", "It lasts for a period of two months from the date of issue.", "It lasts for a period of three months from the date of issue.", "It lasts for a period of four months from the date of issue."],
            correct: 0,
            expCorrect: "A warrant issued under s. 23 of the Act lasts for a period of one month from the date of issue.",
            expWrong: "A warrant issued under s. 23 of the Act lasts for a period of one month from the date of issue."
        },
        {
            q: "HURLEY is approached by BROOK who asks HURLEY to deliver a sports bag to WATSON. BROOK tells HURLEY that the sports bag contains football equipment that WATSON needs for an upcoming local Sunday league football game and that he cannot deliver it as he needs to visit a sick relative. BROOK tells HURLEY that he will give him £10.00 to deliver the sports bag to WATSON. HURLEY agrees and takes the bag from BROOK. HURLEY takes a quick look inside the bag and sees several items of football equipment and a plastic box which has something wrapped up inside it—HURLEY presumes this is something to do with the football equipment. On his way to BROOK’s house, HURLEY is stopped by a police officer and searched. When the bag is opened it is found to contain sporting equipment but also contains the plastic box which, when opened, is found to contain £500.00 worth of cannabis resin. HURLEY had no idea that there were any drugs in the sports bag.\n\nConsidering the concept of ‘possession’ in relation to the Misuse of Drugs Act 1971, which of the following comments is correct?",
            opts: ["HURLEY is in possession of the drugs; it does not matter that he did not know that they were in the sports bag.", "HURLEY is not in possession of the drugs as although he knew he had possession of the sports bag, he did not know that it contained cannabis resin.", "As HURLEY was paid to deliver the sports bag he will be in possession of the drugs; had he not been paid he would not be in possession of the drugs.", "HURLEY is not in possession of the drugs as they were contained inside a plastic box which was contained inside the sports bag."],
            correct: 0,
            expCorrect: "The fact that HURLEY did not know the drugs were in the sports bag is irrelevant (making answer B incorrect). Possession is a neutral concept, not implying any blame or fault. In order to be in possession of anything, the common law requires physical control of the object plus knowledge of its presence. HURLEY has physical control of the sports bag and knows of its presence; therefore, he is in possession of the drugs (answer A). This requirement can be problematic where containers of some sort (e.g. the sports bag) are involved. In such cases the common law makes the same requirements; you need to show that the person has physical control of the container together with knowledge that it contained something . HURLEY knows he has possession of the sports bag and he knows that it contains a plastic box. In R v Forsythe [2001] EWCA Crim 2926, the defendant argued that there was a distinction between a person carrying something in a container and a person carrying something inside something else in a container. In this case the defendant was found in possession of a box which contained a safe; inside the safe was a significant quantity of a controlled drug. The defendant argued that this type of possession should be differentiated from the situation where someone had possession of a box with drugs in it. The Court of Appeal ruled that there was no difference and the issues of proof were the same (making answer D incorrect). The fact that HURLEY was paid will not alter whether he is in possession of the drugs or not (answer C).",
            expWrong: "The fact that HURLEY did not know the drugs were in the sports bag is irrelevant (making answer B incorrect). Possession is a neutral concept, not implying any blame or fault. In order to be in possession of anything, the common law requires physical control of the object plus knowledge of its presence. HURLEY has physical control of the sports bag and knows of its presence; therefore, he is in possession of the drugs (answer A). This requirement can be problematic where containers of some sort (e.g. the sports bag) are involved. In such cases the common law makes the same requirements; you need to show that the person has physical control of the container together with knowledge that it contained something . HURLEY knows he has possession of the sports bag and he knows that it contains a plastic box. In R v Forsythe [2001] EWCA Crim 2926, the defendant argued that there was a distinction between a person carrying something in a container and a person carrying something inside something else in a container. In this case the defendant was found in possession of a box which contained a safe; inside the safe was a significant quantity of a controlled drug. The defendant argued that this type of possession should be differentiated from the situation where someone had possession of a box with drugs in it. The Court of Appeal ruled that there was no difference and the issues of proof were the same (making answer D incorrect). The fact that HURLEY was paid will not alter whether he is in possession of the drugs or not (answer C)."
        },
        {
            q: "EWINGS is a drug dealer who supplies drugs from his girlfriend’s flat. Police have been watching the premises and when his girlfriend arrives in a car, the police strike. In the car there is a large quantity of heroin. The car belongs to EWINGS and the girlfriend states that she was just delivering the drugs to EWINGS who sells the drugs for profit—she states that she is not involved in, and does not gain any benefit from, the supplying that EWINGS commits.\n\nFor what offence(s) under the Misuse of Drugs Act 1971 will the girlfriend be liable?",
            opts: ["Possession of a controlled drug only.", "Possession of a controlled drug and possession with intent to supply.", "Possession of a controlled drug and being concerned in the supply of a controlled drug.", "Possession of a controlled drug and being concerned in the supply of a controlled drug and possession with intent to supply."],
            correct: 1,
            expCorrect: "The offence of possession of a controlled drug is clear. In R v Maginnis [1987] AC 303, the House of Lords held that ‘supply’ involves more than a mere transfer of physical control of the item from one person to another and includes a further concept, namely that of ‘enabling the recipient to apply the thing handed over to purposes for which he desires or has a duty to apply it’—in other words, the person to whom the drug is given must derive some benefit from it. By supplying the drugs, EWINGS receives a benefit so therefore, although the girlfriend does not benefit, the person she supplies to does benefit and consequently it fits the offence. There is no actual ‘supplying’ or being concerned in the supplying as the drugs were intercepted prior to supply; answers C and D are therefore incorrect. But there is possession with intent to supply; answer A is therefore incorrect.",
            expWrong: "The offence of possession of a controlled drug is clear. In R v Maginnis [1987] AC 303, the House of Lords held that ‘supply’ involves more than a mere transfer of physical control of the item from one person to another and includes a further concept, namely that of ‘enabling the recipient to apply the thing handed over to purposes for which he desires or has a duty to apply it’—in other words, the person to whom the drug is given must derive some benefit from it. By supplying the drugs, EWINGS receives a benefit so therefore, although the girlfriend does not benefit, the person she supplies to does benefit and consequently it fits the offence. There is no actual ‘supplying’ or being concerned in the supplying as the drugs were intercepted prior to supply; answers C and D are therefore incorrect. But there is possession with intent to supply; answer A is therefore incorrect."
        },
        {
            q: "ARCHER is short of money and is approached by ZIEGLER who offers ARCHER £300 per week if ARCHER will permit ZIEGLER to use ARCHER’s house as a base to produce cannabis; ARCHER agrees. ZIEGLER sets up a hydroponic growing system to aid the cultivation of the cannabis plants in ARCHER’s house and four months later the plants have fully grown. ZIEGLER harvests the plants and, in order to maximise his profits, he adds a variety of bulking agents (such as lead and ketamine) to his cannabis product. At no time does ARCHER have anything to do with the cultivation or preparation of the cannabis. The police raid the house and both men are arrested.\n\nIn relation to the offence of production of a controlled drug (contrary to s. 4(2) of the Misuse of Drugs Act 1971), which of the following statements is correct?",
            opts: ["ARCHER and ZIEGLER have committed the offence in these circumstances.", "ARCHER has not committed the offence. ZIEGLER has committed the offence but only when he cultivates the cannabis plants.", "ARCHER has not committed the offence. ZIEGLER has committed the offence when he cultivates and harvests the cannabis plants and also when he adds the bulking agents to his product.", "The offence under s. 4(2) has not been committed as all of the controlled drugs in question (cannabis and ketamine particularly) are Class B drugs—this offence is only committed in relation to the production of Class A drugs."],
            correct: 2,
            expCorrect: "Section 4 of the Misuse of Drugs Act 1971 states that it is an offence to produce a controlled drug. The offence is relevant to all classes of drug (not just Class A), making answer D incorrect. ‘Produce’ means producing by manufacture, cultivation or any other method, and ‘production’ has a corresponding meaning (s. 37 of the Misuse of Drugs Act 1971). So ZIEGLER commits the offence when he cultivates the cannabis plants. Harvesting, cutting and stripping a cannabis plant is ‘producing’ ( R v Harris [1996] 1 Cr App R 369), so ZIEGLER once again ‘produces’ when he harvests the cannabis plants. The addition of adulterants or bulking agents can amount to the production of a controlled drug ( R v Williams [2011] EWCA Crim 232), so ZIEGLER commits the offence at this point as well. All of this means that answer B is incorrect. Being ‘concerned in the production’ requires evidence that the accused played an identifiable role in the production of the drug in question. This was not satisfied where the accused simply permitted two others who were producing drugs to use his kitchen ( R v Farr [1982] Crim LR 745), which means ARCHER does not commit the offence (answer A is incorrect).",
            expWrong: "Section 4 of the Misuse of Drugs Act 1971 states that it is an offence to produce a controlled drug. The offence is relevant to all classes of drug (not just Class A), making answer D incorrect. ‘Produce’ means producing by manufacture, cultivation or any other method, and ‘production’ has a corresponding meaning (s. 37 of the Misuse of Drugs Act 1971). So ZIEGLER commits the offence when he cultivates the cannabis plants. Harvesting, cutting and stripping a cannabis plant is ‘producing’ ( R v Harris [1996] 1 Cr App R 369), so ZIEGLER once again ‘produces’ when he harvests the cannabis plants. The addition of adulterants or bulking agents can amount to the production of a controlled drug ( R v Williams [2011] EWCA Crim 232), so ZIEGLER commits the offence at this point as well. All of this means that answer B is incorrect. Being ‘concerned in the production’ requires evidence that the accused played an identifiable role in the production of the drug in question. This was not satisfied where the accused simply permitted two others who were producing drugs to use his kitchen ( R v Farr [1982] Crim LR 745), which means ARCHER does not commit the offence (answer A is incorrect)."
        },
        {
            q: "Constable JEROME was on plain clothes duty in a music festival and became suspicious of DEVON. Constable JEROME began observing DEVON, who was talking to a group of young people. Constable JEROME moved closer to the group and overheard DEVON saying, ‘I can get you some speed—meet me here in half an hour.’ The officer arrested DEVON and searched her but did not find any drugs. When interviewed, DEVON said that she did not have access to the drugs, and was acting as an intermediary for someone else.\n\nCould DEVON be guilty of an offence under s. 4 of the Misuse of Drugs Act 1971 (supplying controlled drugs), in these circumstances?",
            opts: ["Yes, the offer is enough; it does not matter that DEVON did not have controlled drugs in her possession or that she did not have access to controlled drugs.", "Yes, but DEVON must either be in possession of controlled drugs or have access to them; she need not necessarily have drugs with her.", "Yes, the offer is enough; provided DEVON was in a position to supply the drugs at some point.", "No, DEVON must either have controlled drugs with her, or have immediate access to them."],
            correct: 0,
            expCorrect: "Under s. 4(3) of the Misuse of Drugs Act 1971, a person commits an offence if he/she supplies of offers to supply a controlled drug to another. Whether the accused had a controlled drug in his/her possession or had access to controlled drugs or whether the substance in his/her possession was a controlled drug at all is immaterial. Whether the accused intends to carry the offer into effect is also irrelevant; the offence is complete upon the making of an offer to supply. The offence is committed whether or not the offer is genuine and once an offer is made it cannot be withdrawn. Answers B, C and D are therefore incorrect.",
            expWrong: "Under s. 4(3) of the Misuse of Drugs Act 1971, a person commits an offence if he/she supplies of offers to supply a controlled drug to another. Whether the accused had a controlled drug in his/her possession or had access to controlled drugs or whether the substance in his/her possession was a controlled drug at all is immaterial. Whether the accused intends to carry the offer into effect is also irrelevant; the offence is complete upon the making of an offer to supply. The offence is committed whether or not the offer is genuine and once an offer is made it cannot be withdrawn. Answers B, C and D are therefore incorrect."
        },
        {
            q: "HILL is a police officer working undercover. She is part of an on-going operation regarding drug supply at the ‘Green Man’ public house. The officer goes to the pub to make a test purchase, and is shown several wraps containing white powder by MOYLES, a suspected drug dealer. MOYLES states that the wraps contain speed (an illegal amphetamine) and will cost £30 per wrap. In fact the wraps contain baking powder, a fact of which MOYLES is unaware. The transaction takes place.\n\nWhich of the following offences, if any, does MOYLES commit?",
            opts: ["Possession of a controlled drug.", "Possession with intent to supply a controlled drug.", "Offering to supply a controlled drug.", "Supplying a controlled drug."],
            correct: 2,
            expCorrect: "For the offences of possession, possession with intent to supply and supply, the prosecution would need to prove that the substance in question is in fact a controlled drug. Answers A, B and D are therefore incorrect. For the offence of offering to supply under s. 4(3)(c) of the 1971 Act, it does not matter whether the accused had a controlled drug in his or her possession or had easy access to a controlled drug.",
            expWrong: "For the offences of possession, possession with intent to supply and supply, the prosecution would need to prove that the substance in question is in fact a controlled drug. Answers A, B and D are therefore incorrect. For the offence of offering to supply under s. 4(3)(c) of the 1971 Act, it does not matter whether the accused had a controlled drug in his or her possession or had easy access to a controlled drug."
        },
        {
            q: "LIZEN is a heroin addict and takes the drug by injecting it into his body. He lives with his girlfriend, CODY, who is aware of LIZEN’s heroin addiction. LIZEN is feeling poorly but needing his heroin ‘fix’, he persuades CODY to go out and purchase a small amount of heroin from EDDING who is LIZEN’s usual supplier. CODY takes some cash and finds EDDING and purchases a small amount of heroin from him. She returns to LIZEN and hands the heroin over to him. LIZEN prepares the drug for injection but after injecting a small amount feels even worse and asks CODY to push down on the plunger of the syringe and help him inject the rest of the heroin. CODY does as he asks.\n\nThinking about offences under the Misuse of Drugs Act 1971, which of the comments below best sums up CODY’s liability?",
            opts: ["CODY is guilty of possession of a controlled drug, possession with intent to supply a controlled drug and supplying a controlled drug (but only when she hands the heroin over to LIZEN).", "CODY is guilty of possession of a controlled drug and supplying a controlled drug (but only when she hands the heroin over to LIZEN).", "CODY is guilty of possession of a controlled drug, possession with intent to supply a controlled drug and supplying a controlled drug (when she hands the heroin over to LIZEN and also when she pushes down on the plunger of the syringe).", "CODY is guilty of possession of a controlled drug and supplying a controlled drug (but only when she pushes down the plunger on the syringe)."],
            correct: 0,
            expCorrect: "When CODY purchases the heroin she is in possession of a controlled drug. She has that drug with the intention of giving it to LIZEN so that he can apply it to his own purposes which means she is also guilty of possession with intent to supply a controlled drug (ruling answers B and D out). When she hands the heroin to LIZEN she supplies him with a controlled drug but she does not supply him with the controlled drug when she pushes down on the plunger of the syringe containing heroin (ruling answer option C out and also making D further incorrect). Injecting another with a controlled drug has been held not to amount to ‘supplying’ in a case where a defendant assisted in pushing down a plunger of a syringe that the other person was already using ( R v Harris [1968] 1 WLR 769).",
            expWrong: "When CODY purchases the heroin she is in possession of a controlled drug. She has that drug with the intention of giving it to LIZEN so that he can apply it to his own purposes which means she is also guilty of possession with intent to supply a controlled drug (ruling answers B and D out). When she hands the heroin to LIZEN she supplies him with a controlled drug but she does not supply him with the controlled drug when she pushes down on the plunger of the syringe containing heroin (ruling answer option C out and also making D further incorrect). Injecting another with a controlled drug has been held not to amount to ‘supplying’ in a case where a defendant assisted in pushing down a plunger of a syringe that the other person was already using ( R v Harris [1968] 1 WLR 769)."
        },
        {
            q: "Police officers have obtained a warrant to search a premises under s. 23 of the Misuse of Drugs Act 1971. When they enter the premises, there are a number of persons present, including one who is clearly repairing the washing machine.\n\nWhich of the following is true in relation to searching individuals on the premises?",
            opts: ["They can search all individuals in the premises under authority of the warrant.", "They can search all individuals in the premises under authority of the warrant, but only if it states individuals may be searched.", "They can search only individuals named on the warrant when using that warrant as authority to search.", "They could search everyone except those who are there for an ancillary purpose."],
            correct: 1,
            expCorrect: "Section 23 of the Misuse of Drugs Act 1971 is a very wide statutory provision granting authority for a broad range of enforcement measures in connection with controlled drugs. Particular care will need to be taken when drafting the application for a warrant under s. 23. Where police officers are on premises under the authority of such a warrant it will be important to have established the precise extent of the warrant. If such a warrant authorises the search of premises only, that in itself will not give the officers authority to search people found on those premises unless the officer can point to some other power authorising the search ( Hepburn v Chief Constable of Thames Valley Police [2002] EWCA Civ 1841); answers A and C are therefore incorrect. However, where the warrant authorises the search of premises and people, the Divisional Court has held that it is reasonable to restrict the movement of people within the premises to allow the search to be conducted properly ( DPP v Meaden [2003] EWHC 3005 (Admin)); answer D is therefore incorrect.",
            expWrong: "Section 23 of the Misuse of Drugs Act 1971 is a very wide statutory provision granting authority for a broad range of enforcement measures in connection with controlled drugs. Particular care will need to be taken when drafting the application for a warrant under s. 23. Where police officers are on premises under the authority of such a warrant it will be important to have established the precise extent of the warrant. If such a warrant authorises the search of premises only, that in itself will not give the officers authority to search people found on those premises unless the officer can point to some other power authorising the search ( Hepburn v Chief Constable of Thames Valley Police [2002] EWCA Civ 1841); answers A and C are therefore incorrect. However, where the warrant authorises the search of premises and people, the Divisional Court has held that it is reasonable to restrict the movement of people within the premises to allow the search to be conducted properly ( DPP v Meaden [2003] EWHC 3005 (Admin)); answer D is therefore incorrect."
        },
        {
            q: "GANT buys and sells firearms from and to members of the criminal fraternity. He has recently purchased some items from a contact of his and is driving his vehicle along a road back to his workshop when he is involved in an accident and knocked unconscious. When he wakes up 30 minutes later he is greeted by PC WILLIAMSON who wants to ask GANT about several items the officer found in GANT’s car when he attended the scene of the accident. On the rear seat of GANT’s vehicle is a bag containing all the parts of an Uzi automatic weapon, a machine gun with the trigger missing from it and a broken electric ‘stun gun’.\n\nThinking about the offence of possessing or distributing prohibited weapons or ammunition (under s. 5 of the Firearms Act 1968), which of the following comments is correct?",
            opts: ["The offence is committed in relation to the Uzi automatic weapon and the machine gun without the trigger but not in relation to the electric ‘stun gun’ as it is broken.", "This is an offence of strict liability and GANT has committed offences in relation to all of the items in his car.", "The offence is committed in relation to the Uzi automatic weapon and the broken electric ‘stun gun’ but not to the machine gun without the trigger as it is incapable of being fired.", "The offence has not been committed as the Uzi automatic weapon is in pieces, the machine gun cannot be fired without the trigger and the electric ‘stun gun’ is broken."],
            correct: 1,
            expCorrect: "The offence under s. 5 of the Firearms Act 1968 is one of strict liability and automatic weapons, machine guns and electric ‘stun guns’ are all prohibited weapons. A person may still be in possession of a prohibited weapon even when it is in parts and the accused is in possession of those parts ( R v Pannell (1982) 76 Cr App R 53) or where the weapon is missing an essential part such as the trigger ( R v Clarke [1986] 1 WLR 209) which means answers C and D are incorrect. A broken electric ‘stun gun’ is a prohibited weapon even though it is broken (Brown v DPP (1992) The Times, 27 March), meaning answer A is also incorrect—all the items would constitute prohibited weapons in this question.",
            expWrong: "The offence under s. 5 of the Firearms Act 1968 is one of strict liability and automatic weapons, machine guns and electric ‘stun guns’ are all prohibited weapons. A person may still be in possession of a prohibited weapon even when it is in parts and the accused is in possession of those parts ( R v Pannell (1982) 76 Cr App R 53) or where the weapon is missing an essential part such as the trigger ( R v Clarke [1986] 1 WLR 209) which means answers C and D are incorrect. A broken electric ‘stun gun’ is a prohibited weapon even though it is broken (Brown v DPP (1992) The Times, 27 March), meaning answer A is also incorrect—all the items would constitute prohibited weapons in this question."
        },
        {
            q: "WATKINS is a drug dealer and is seeking to take over the drugs market in a large town. He has acquired a Samurai sword and intends using it to threaten other dealers. WATKINS has been tipped off that the police are about to execute a warrant at his home in the next few days. WATKINS has persuaded his friend MAYO, who is aged 18, to hide the sword in his house until the police lose interest in him.\n\nCould WATKINS be guilty of an offence under s. 28(1) of the Violent Crime Reduction Act 2006 (using another to look after etc. a dangerous weapon)?",
            opts: ["No, this offence can only be committed in relation to a firearm.", "Yes, this offence can be committed in relation to a firearm or an offensive weapon.", "No, this offence can only be committed when the person looking after the weapon is under 18.", "Yes, this offence can be committed in relation to a firearm, including an air weapon, or an offensive weapon."],
            correct: 1,
            expCorrect: "Under s. 28(1) of the Violent Crime Reduction Act 2006, a person is guilty of an offence if he/she uses another to look after, hide or transport a dangerous weapon for him/her, and he/she does so under arrangements or in circumstances that facilitate, or are intended to facilitate, the weapon being available to him/her for an unlawful purpose. A ‘dangerous weapon’ includes a firearm other than an air weapon or a component part of, or accessory to, an air weapon. Answer D is therefore incorrect. Also included are weapons to which ss. 141 and 141A of the Criminal Justice Act 1988 apply. These include specified offensive weapons, such as knuckledusters, stealth knives and a host of other weapons (s. 141). Answer A is therefore incorrect. One of the reasons this offence was introduced was to prevent adults from using children to hide weapons. Using a minor to mind a dangerous weapon is an aggravating factor, attracting a harsher sentence. However, this does not mean that the offence is incomplete when the weapon is being looked after by another adult and the offence is complete in these circumstances alone. Answer C is therefore incorrect.",
            expWrong: "Under s. 28(1) of the Violent Crime Reduction Act 2006, a person is guilty of an offence if he/she uses another to look after, hide or transport a dangerous weapon for him/her, and he/she does so under arrangements or in circumstances that facilitate, or are intended to facilitate, the weapon being available to him/her for an unlawful purpose. A ‘dangerous weapon’ includes a firearm other than an air weapon or a component part of, or accessory to, an air weapon. Answer D is therefore incorrect. Also included are weapons to which ss. 141 and 141A of the Criminal Justice Act 1988 apply. These include specified offensive weapons, such as knuckledusters, stealth knives and a host of other weapons (s. 141). Answer A is therefore incorrect. One of the reasons this offence was introduced was to prevent adults from using children to hide weapons. Using a minor to mind a dangerous weapon is an aggravating factor, attracting a harsher sentence. However, this does not mean that the offence is incomplete when the weapon is being looked after by another adult and the offence is complete in these circumstances alone. Answer C is therefore incorrect."
        },
        {
            q: "UNWIN and GAYNOR are at UNWIN’s house watching a film. From the conversation between the two, GAYNOR realises that UNWIN has been having sex with her boyfriend and confronts her. UNWIN admits that they are having sex. Enraged, GAYNOR picks up a pair of scissors on the coffee table and stabs UNWIN in the arm (a s. 18 wounding, contrary to the Offences Against the Person Act 1861) and GAYNOR leaves the house. GAYNOR’s description is circulated and a passing patrol sees her on the street and arrests her for the s. 18 wounding. In GAYNOR’s pocket they find an imitation firearm (a small pistol). The arresting officer, PC DENTON, comes to the CID office and asks if GAYNOR has committed any firearm offences.\n\nConsidering s. 17(2) of the Firearms Act 1968 (possessing a firearm while committing a sch. 1 offence), which of the following is correct with regard to the liability of GAYNOR?",
            opts: ["For the offence to be committed it must be a real firearm.", "Mere possession at the time of arrest for a sch. 1 offence is sufficient.", "Section 18 wounding is not included in sch. 1.", "You would need to prove that she also had the firearm with her at the time of the s. 18 wounding even though it was not used."],
            correct: 2,
            expCorrect: "Section 17(2) of the Firearms Act 1968 states:\n\nIf a person, at the time of his committing or being arrested for an offence specified in schedule 1 to this Act, has in his possession a firearm or imitation firearm, he shall be guilty of an offence under this subsection unless he shows that he had it in his possession for a lawful object.\nSchedule 1 lists many offences but does not include specifically s. 18 wounding, making C the correct answer.",
            expWrong: "Section 17(2) of the Firearms Act 1968 states:\n\nIf a person, at the time of his committing or being arrested for an offence specified in schedule 1 to this Act, has in his possession a firearm or imitation firearm, he shall be guilty of an offence under this subsection unless he shows that he had it in his possession for a lawful object.\nSchedule 1 lists many offences but does not include specifically s. 18 wounding, making C the correct answer."
        },
        {
            q: "PCs FRODEN and GRAY are on uniform mobile patrol as armed response officers. They receive information from a concerned member of banking staff that he has seen three men with guns near to the bank he works in. The three men are all reported to be sitting in a Nissan Qashqai registration number MV21 OHG, parked in a public street near the bank. The officers drive to the scene and as they arrive they see HUGHES and LOPEZ standing next to the open driver’s door of that particular car. In the driving seat of the car is DRAY. As the officers get closer to the men, there is no sign of any firearms. However, the fact that all three men are either in or near the car causes the officers to reasonably suspect they are the persons referred to by the member of bank staff.\n\nCould the officers search the vehicle and/or persons under the powers given by s. 47 of the Firearms Act 1968?",
            opts: ["Yes, but only DRAY and the Qashqai could be searched.", "No, not unless the officers suspect that the men are committing or about to commit an offence.", "Yes, all three men and the Qashqai could be searched.", "No, as s. 47 of the Firearms Act 1968 relates to searches carried out on private land and not in a public place."],
            correct: 2,
            expCorrect: "Section 47 of the Firearms Act 1968 states:\n\nA constable may require any person whom he has reasonable cause to suspect—\n(a) of having a firearm, with or without ammunition, with him in a public place; or\n(b) to be committing or about to commit, elsewhere than a public place, an offence relevant for the purposes of this section, to hand over the firearm or any ammunition for examination by the constable.\nIn order to exercise the power, a police officer may search the person concerned. Further, if the officer has reasonable cause to suspect that there is a firearm in a vehicle in a public place, he/she may search the vehicle. Therefore, all three men and the vehicle can be searched (answer C).",
            expWrong: "Section 47 of the Firearms Act 1968 states:\n\nA constable may require any person whom he has reasonable cause to suspect—\n(a) of having a firearm, with or without ammunition, with him in a public place; or\n(b) to be committing or about to commit, elsewhere than a public place, an offence relevant for the purposes of this section, to hand over the firearm or any ammunition for examination by the constable.\nIn order to exercise the power, a police officer may search the person concerned. Further, if the officer has reasonable cause to suspect that there is a firearm in a vehicle in a public place, he/she may search the vehicle. Therefore, all three men and the vehicle can be searched (answer C)."
        },
        {
            q: "DOWNEY is a fanatical ‘airsoft’ enthusiast (‘airsoft’ is a military simulation sport where players participate in mock combat with authentic military-style weapons and tactics). DOWNEY has a large arsenal of weapons to enable him to enjoy his hobby. By trade DOWNEY is an engineer and in order to obtain a tactical advantage when engaging in airsoft activities he modifies two guns. He modifies an airsoft sniper rifle (which discharges 1 shot at a time) so that the kinetic energy at the muzzle measures 3 joules; he modifies an airsoft machine gun (which discharges two and more missiles without repeated pressure on the trigger) so that the kinetic energy at the muzzle measures 1.2 joules.\n\nWould these technical modifications mean that either airsoft gun would be classed as a ‘firearm’ under s. 57A(2) of the Firearms Act 1968?",
            opts: ["Both modifications would mean that the permitted energy at the muzzle of each weapon exceeds the permitted kinetic energy level for an airsoft weapon, consequently both airsoft guns would now be classed as firearms.", "The airsoft sniper rifle would be classed as a firearm; the airsoft machine gun would not.", "These modifications do not exceed the permitted kinetic energy level for either type of weapon— they would both continue to be classed as airsoft guns.", "The airsoft machine gun exceeds permitted energy levels and would be classed as a firearm; the sniper rifle weapon does not exceed the permitted levels and is still an airsoft weapon."],
            correct: 1,
            expCorrect: "An airsoft gun is not regarded as a firearm for the purposes of this Act (s. 57A). Section 57A(2) states that an airsoft gun is a barrelled weapon of any description which:\n\n• is designed to discharge only a small plastic missile (whether or not it is also capable of discharging any other kind of missile), and\n• is not capable of discharging a missile (of any kind) with kinetic energy at the muzzle of the weapon that exceeds the permitted level.\nThe ‘small plastic missile’ is a missile made wholly or partly from plastics, is spherical and does not exceed 8 millimetres in diameter (s. 57A(3)). However, the exemption is not absolute— if the kinetic energy at the muzzle exceeds the permitted level then it will be a firearm. The permitted kinetic energy level is:\n• in the case of a weapon which is capable of discharging two or more missiles successively without repeated pressure on the trigger (an automatic weapon), 1.3 joules;\n• in any other case (a single shot variant), 2.5 joules.\nSo the machine gun would not be a firearm, making answers A and D incorrect. The sniper rifle would be a firearm, making answer C incorrect.",
            expWrong: "An airsoft gun is not regarded as a firearm for the purposes of this Act (s. 57A). Section 57A(2) states that an airsoft gun is a barrelled weapon of any description which:\n\n• is designed to discharge only a small plastic missile (whether or not it is also capable of discharging any other kind of missile), and\n• is not capable of discharging a missile (of any kind) with kinetic energy at the muzzle of the weapon that exceeds the permitted level.\nThe ‘small plastic missile’ is a missile made wholly or partly from plastics, is spherical and does not exceed 8 millimetres in diameter (s. 57A(3)). However, the exemption is not absolute— if the kinetic energy at the muzzle exceeds the permitted level then it will be a firearm. The permitted kinetic energy level is:\n• in the case of a weapon which is capable of discharging two or more missiles successively without repeated pressure on the trigger (an automatic weapon), 1.3 joules;\n• in any other case (a single shot variant), 2.5 joules.\nSo the machine gun would not be a firearm, making answers A and D incorrect. The sniper rifle would be a firearm, making answer C incorrect."
        },
        {
            q: "FOULGER is planning to burgle an office on an industrial estate and as part of his plan he drives to the road where the office is situated, parks his car and walks toward the office to make a note of the security arrangements that are in place. FOULGER always carries a Magnum 44 firearm when he is out of his house and this occasion is no exception. The gun is tucked into his trousers with FOULGER’s T-shirt pulled over the top of the firearm. The gun is not loaded. FOULGER walks around the office on the pavement making notes as he does so, but a member of staff at the office becomes suspicious of FOULGER’s behaviour and calls the police. PC NASH attends the scene and stops FOULGER in the street. The officer notices the shape of the firearm underneath FOULGER’s clothing.\n\nConsidering PC NASH’s powers under s. 47 of the Firearms Act 1968, which of the following comments is correct?",
            opts: ["If PC NASH has reasonable cause to suspect that FOULGER has a firearm with him in a public place, he may require him to hand over the firearm.", "PC NASH can only use his powers under s. 47 of the Act if he reasonably believes that FOULGER has a firearm in a public place.", "PC NASH can only require the firearm to be handed over if he reasonably suspects it is loaded or reasonably suspects FOULGER has ammunition for the firearm in his possession.", "PC NASH cannot request that the firearm be handed over unless he reasonably suspects that FOULGER is committing or about to commit a relevant offence for the purposes of this section."],
            correct: 0,
            expCorrect: "Section 47 of the 1968 Firearms Act allows a constable who has reasonable cause to suspect a person has a firearm with him in a public place to require him/her to hand over the firearm for examination by the officer, making answers B and D incorrect. It does not matter whether the firearm is loaded or if the person who is requested to hand over the firearm has ammunition in his/her possession, making answer C incorrect.",
            expWrong: "Section 47 of the 1968 Firearms Act allows a constable who has reasonable cause to suspect a person has a firearm with him in a public place to require him/her to hand over the firearm for examination by the officer, making answers B and D incorrect. It does not matter whether the firearm is loaded or if the person who is requested to hand over the firearm has ammunition in his/her possession, making answer C incorrect."
        },
        {
            q: "MOSELEY is visiting his friend CHAMBERS. CHAMBERS asks MOSELEY if, on his way home, he will be passing ‘The Swan’ pub. When MOSELEY states that he will be, CHAMBERS asks MOSELEY to drop a package containing several fishing rods off to the licensee of ‘The Swan’, KILBURN. MOSELEY agrees and takes the package, which actually contains an unloaded shotgun. On his way to the pub, MOSELEY is stopped by PC FRENCH and the contents of the package are discovered.\n\nConsidering the offence under s. 19 of the Firearms Act only (having a firearm/imitation firearm in a public place), which of the following comments is correct?",
            opts: ["This offence is ‘absolute’ and MOSELEY’s possession of the unloaded shotgun is all that is required.", "MOSELEY would not commit the offence because the shotgun is unloaded.", "An offence under s. 19 cannot be committed by being in possession of a shotgun, loaded or unloaded.", "The offence is not committed because MOSELEY had no knowledge that the package actually contained a firearm."],
            correct: 1,
            expCorrect: "This offence is ‘absolute’ but can only be committed if the defendant has with them a loaded shotgun, making answer A incorrect. This fact makes answer C incorrect as well. Answer D is incorrect because the offence is ‘absolute’ and knowledge is not required.",
            expWrong: "This offence is ‘absolute’ but can only be committed if the defendant has with them a loaded shotgun, making answer A incorrect. This fact makes answer C incorrect as well. Answer D is incorrect because the offence is ‘absolute’ and knowledge is not required."
        },
        {
            q: "SWEENEY was stopped by Constable RUBY while driving a motor vehicle on a road. Constable RUBY stood outside the vehicle and conducted a check which revealed that the vehicle had just been circulated for its involvement in an armed robbery at a petrol station less than an hour previously. SWEENEY overheard Constable RUBY calling for assistance and got out of the car. SWEENEY placed his hand in his pocket and, with his fingers extended, pretended that he had a pistol in his pocket and told the officer to back away. Constable RUBY was not fooled by SWEENEY’s attempt and told him so. SWEENEY then gave up without resisting the officer.\n\nWould SWEENEY be guilty of an offence under s. 17(1) of the Firearms Act 1968 (using a firearm/imitation firearm to resist arrest) in these circumstances?",
            opts: ["No, holding his fingers like this will not amount to an imitation firearm.", "No, because he did not have with him something which had been adapted or altered so as to resemble a firearm.", "No, because the officer was not fooled by his attempt.", "Yes, because his fingers had the appearance of a firearm."],
            correct: 0,
            expCorrect: "Section 17(1) of the Firearms Act 1968 states:\n\nIt is an offence for a person to make or attempt to make any use whatsoever of a firearm or imitation firearm with intent to resist or prevent the lawful arrest or detention of himself or another person.\nThe issue of whether a person’s fingers could be an imitation firearm was examined in the case of R v Bentham [2005] 1 WLR 1057. The Court of Appeal held that holding your fingers inside a jacket and threatening to shoot someone could amount to an offence involving an imitation firearm. However, the House of Lords overturned this decision, finding that the definition of an imitation firearm under s. 57 of the Firearms Act 1968 requires the defendant to carry a ‘thing’ which is separate and distinct from him/herself and therefore being capable of being possessed. Holding your fingers under your coat will not amount to an imitation firearm for the relevant offences, because an unsevered hand or finger is part of oneself and therefore could not be ‘possessed’. Answer D is therefore incorrect. The ‘imitation’ must have the appearance of a firearm but it is not necessary for any object to have been constructed, adapted or altered so as to resemble a firearm ( R v Williams [2006] EWCA Crim 1650). Answer B is therefore incorrect. (Further, in K v DPP [2006] EWHC 2183 (Admin) it was held that in some circumstances a realistic toy gun, in this case a plastic ball-bearing gun, could become an imitation firearm.) The offence allows for a person to make or attempt to make use of a firearm or imitation firearm; therefore answer C is incorrect.",
            expWrong: "Section 17(1) of the Firearms Act 1968 states:\n\nIt is an offence for a person to make or attempt to make any use whatsoever of a firearm or imitation firearm with intent to resist or prevent the lawful arrest or detention of himself or another person.\nThe issue of whether a person’s fingers could be an imitation firearm was examined in the case of R v Bentham [2005] 1 WLR 1057. The Court of Appeal held that holding your fingers inside a jacket and threatening to shoot someone could amount to an offence involving an imitation firearm. However, the House of Lords overturned this decision, finding that the definition of an imitation firearm under s. 57 of the Firearms Act 1968 requires the defendant to carry a ‘thing’ which is separate and distinct from him/herself and therefore being capable of being possessed. Holding your fingers under your coat will not amount to an imitation firearm for the relevant offences, because an unsevered hand or finger is part of oneself and therefore could not be ‘possessed’. Answer D is therefore incorrect. The ‘imitation’ must have the appearance of a firearm but it is not necessary for any object to have been constructed, adapted or altered so as to resemble a firearm ( R v Williams [2006] EWCA Crim 1650). Answer B is therefore incorrect. (Further, in K v DPP [2006] EWHC 2183 (Admin) it was held that in some circumstances a realistic toy gun, in this case a plastic ball-bearing gun, could become an imitation firearm.) The offence allows for a person to make or attempt to make use of a firearm or imitation firearm; therefore answer C is incorrect."
        },
        {
            q: "CRAMPTON is waiting to be served at a fish and chip shop owned by PAPACOSTAS (a Cypriot national). The pair chat and during their conversation PAPACOSTAS tells CRAMPTON that he is Cypriot. CRAMPTON leaves the shop with his food and walks home. When he gets home, he finds out that he has been given the wrong order and rather than cod and chips he has been given two small fishcakes. CRAMPTON is livid and goes back to the fish and chip shop which is now closed. In a fit of temper because he has been given the wrong food, CRAMPTON smashes the front window of the fish and chip shop. He leaves the scene and walks back to his home but is stopped by the police 20 minutes later and is arrested on suspicion of committing criminal damage. On arrest he says, ‘Those Cypriot bastards are always stealing our money. I can say what I like about them—it’s a free country.’\n\nConsidering the law relating to s. 28 of the Crime and Disorder Act 1998 (racially or religiously aggravated offences) and in particular a ‘demonstration’ of hostility, which of the following comments is correct?",
            opts: ["Demonstrating racial hostility 20 minutes after the criminal damage would not amount to an aggravated offence (it is not ‘immediately after’ a trigger offence).", "A demonstration of hostility must be immediately before or at the time of committing a trigger offence—a demonstration of hostility after the commission of a trigger offence would not be covered by the legislation.", "A demonstration of hostility must take place in the presence of the victim to be racially and/or religiously aggravated.", "A demonstration of hostility associated with an offence of criminal damage must take place at the time of the criminal damage."],
            correct: 0,
            expCorrect: "Section 28(1)(a) of the Crime and Disorder Act 1998 states that an offence is racially or religiously aggravated for the purposes of ss. 29 to 32 if at the time of committing the offence, or immediately before or after doing so , the offender demonstrates towards the victim of the offence hostility based on the victim’s membership (or presumed membership) of a racial or religious group (this makes answer B incorrect). ‘Simple’ criminal damage is an offence that can be racially or religiously aggravated and there is no difference in relation to the time frames associated with a demonstration of hostility just because the offence is one of ‘simple’ criminal damage (making answer D incorrect). Answer C is incorrect as, in the context of criminal damage, the Divisional Court has confirmed that the relevant hostility can be demonstrated even if the victim is no longer present or is not present ( Parry v DPP [2004] EWHC 3112 (Admin)). However, the need for any such hostility to be demonstrated immediately means that it must be shown to have taken place in the immediate context of the offence. The need for any such hostility to be demonstrated immediately means that it must be shown to have taken place in the immediate context of the basic offence. In Parry , the defendant had caused damage to a neighbour’s door by throwing nail polish over it. The police attended 20 minutes after the damage had occurred and spoke to the defendant who was, by that time, sitting in his own house. The defendant made comments demonstrating hostility based on the victim’s membership of a racial group. The defendant was convicted of racially aggravated criminal damage but appealed and the conviction was quashed. The court held that the wording of the statute meant that any hostility had to be demonstrated immediately before or immediately after the substantive offence and that the court below (magistrates’) had not been entitled to consider the retrospective effect of the comments made later by the defendant (correct answer is A).",
            expWrong: "Section 28(1)(a) of the Crime and Disorder Act 1998 states that an offence is racially or religiously aggravated for the purposes of ss. 29 to 32 if at the time of committing the offence, or immediately before or after doing so , the offender demonstrates towards the victim of the offence hostility based on the victim’s membership (or presumed membership) of a racial or religious group (this makes answer B incorrect). ‘Simple’ criminal damage is an offence that can be racially or religiously aggravated and there is no difference in relation to the time frames associated with a demonstration of hostility just because the offence is one of ‘simple’ criminal damage (making answer D incorrect). Answer C is incorrect as, in the context of criminal damage, the Divisional Court has confirmed that the relevant hostility can be demonstrated even if the victim is no longer present or is not present ( Parry v DPP [2004] EWHC 3112 (Admin)). However, the need for any such hostility to be demonstrated immediately means that it must be shown to have taken place in the immediate context of the offence. The need for any such hostility to be demonstrated immediately means that it must be shown to have taken place in the immediate context of the basic offence. In Parry , the defendant had caused damage to a neighbour’s door by throwing nail polish over it. The police attended 20 minutes after the damage had occurred and spoke to the defendant who was, by that time, sitting in his own house. The defendant made comments demonstrating hostility based on the victim’s membership of a racial group. The defendant was convicted of racially aggravated criminal damage but appealed and the conviction was quashed. The court held that the wording of the statute meant that any hostility had to be demonstrated immediately before or immediately after the substantive offence and that the court below (magistrates’) had not been entitled to consider the retrospective effect of the comments made later by the defendant (correct answer is A)."
        },
        {
            q: "SPEIGHT has a hatred of Muslims. He sees PATHAN in the street one day and assaults him occasioning actual bodily harm. When questioned, he states that he assaulted him because he thought he was a Muslim based on the colour of his skin. In fact, PATHAN is an agnostic of Indian origin.\n\nWould this be a religiously aggravated assault?",
            opts: ["Yes, as the hostility was based on the victim’s presumed membership of a religious group.Yes, as the hostility was based on the victim’s presumed membership of a religious group.", "Yes, as the hostility was based on the colour of the victim’s skin.", "No, as PATHAN is not a member of the religious group against whom the hostility was meant.", "No, as PATHAN is not a member of any religious group."],
            correct: 0,
            expCorrect: "The test for racial or religious aggravation is set out at s. 28 of the Crime and Disorder Act 1998:\n\n(1) An offence is racially or religiously aggravated for the purposes of sections 29 to 32 ... if—\n(a) at the time of committing the offence, or immediately before or after doing so, the offender demonstrates towards the victim of the offence hostility based on the victim’s membership (or presumed membership) of a racial or religious group ...\n‘Presumed’ means presumed by the offender and as that is what the offender presumes here the offence is complete. Answer B would be correct if the offence was racially motivated but you were asked about religious motivation which makes that answer incorrect. Irrespective of actual membership of a group, the offence is complete where the accused presumes that membership; answers C and D are therefore incorrect.",
            expWrong: "The test for racial or religious aggravation is set out at s. 28 of the Crime and Disorder Act 1998:\n\n(1) An offence is racially or religiously aggravated for the purposes of sections 29 to 32 ... if—\n(a) at the time of committing the offence, or immediately before or after doing so, the offender demonstrates towards the victim of the offence hostility based on the victim’s membership (or presumed membership) of a racial or religious group ...\n‘Presumed’ means presumed by the offender and as that is what the offender presumes here the offence is complete. Answer B would be correct if the offence was racially motivated but you were asked about religious motivation which makes that answer incorrect. Irrespective of actual membership of a group, the offence is complete where the accused presumes that membership; answers C and D are therefore incorrect."
        },
        {
            q: "PC BRAHM is on uniform patrol when he is sent to a report of two men arguing outside a pub. PC BRAHM attends the scene and sees O’GRADY and ARCHER arguing in the pub car park. PC BRAHM approaches the pair and asks what is happening. Without warning, O’GRADY punches PC BRAHM in the face causing slight injury to the officer (amounting to a s. 39 battery contrary to the Criminal Justice Act 1988). As he struck the blow, O’GRADY said ‘Nothing to do with a black copper!’ (PC BRAHM is black). PC BRAHM falls to the floor and, as he does so, ARCHER kicks PC BRAHM’s back causing significant bruising (amounting to a s. 47 assault contrary to the Offences Against the Person Act 1861) saying, ‘There is absolutely nothing worse than a black copper!’\n\nWould these activities amount to racially aggravated assaults against PC BRAHM?",
            opts: ["No, as police officers are not protected by racially/religiously aggravated offences under the Crime and Disorder Act 1998.", "Yes, by O’GRADY and ARCHER.", "No, as only a s. 20 GBH/wounding offence (contrary to the Offences Against the Person Act 1861) can be racially or religiously aggravated.", "Yes, but only by O’GRADY."],
            correct: 1,
            expCorrect: "Police officers can be victims of these offences and are entitled to the same protection as anyone else ( R v Jacobs [2001] 2 Cr App R (S) 38) so answer A is incorrect). The offences that can become racially or religiously aggravated can be grouped in four categories—one of those is assaults. The assault offences that can be racially or religiously aggravated are:\n\n• common assault—Criminal Justice Act 1988, s. 39;\n• causing actual bodily harm—Offences Against the Person Act 1861, s. 47;\n• wounding or grievous bodily harm—Offences Against the Person Act 1861, s. 20.\nThis makes answer C incorrect. As both assaults by O’GRADY and ARCHER are covered, answer D is incorrect.",
            expWrong: "Police officers can be victims of these offences and are entitled to the same protection as anyone else ( R v Jacobs [2001] 2 Cr App R (S) 38) so answer A is incorrect). The offences that can become racially or religiously aggravated can be grouped in four categories—one of those is assaults. The assault offences that can be racially or religiously aggravated are:\n\n• common assault—Criminal Justice Act 1988, s. 39;\n• causing actual bodily harm—Offences Against the Person Act 1861, s. 47;\n• wounding or grievous bodily harm—Offences Against the Person Act 1861, s. 20.\nThis makes answer C incorrect. As both assaults by O’GRADY and ARCHER are covered, answer D is incorrect."
        },
        {
            q: "TI MADGE is investigating a number of incidents and is unsure as to whether they are racially aggravated (under s. 28 of the Crime and Disorder Act 1998).\n\nWhich one of the incidents the officer is investigating could be racially aggravated?",
            opts: ["A s. 20 wounding/grievous bodily harm (contrary to the, Offences Against the Person Act 1861).", "An affray (contrary to s. 3 of the Public Order Act 1986).", "An aggravated criminal damage (contrary to s. 1(2) of the Criminal Damage Act 1971).", "A robbery (contrary to s. 8 of the Theft Act 1968)."],
            correct: 0,
            expCorrect: "The offence of s. 20 (grievous bodily harm, Offences Against the Person Act 1861) is the only offence that could be racially or religiously aggravated.",
            expWrong: "The offence of s. 20 (grievous bodily harm, Offences Against the Person Act 1861) is the only offence that could be racially or religiously aggravated."
        },
        {
            q: "WOODS appeared in court charged with a racially aggravated assault (a s. 47 assault contrary to the Offences Against the Person Act 1861) against ADAMS, a door supervisor, who had refused him entry into a nightclub. It is alleged that at the time of assaulting ADAMS, WOODS shouted, ‘Let me in, you black bastard’. WOODS did not deny assaulting ADAMS, or uttering the words, but contested the racially aggravated element of the offence, stating that he was motivated by frustration rather than racism when he uttered the words. When giving evidence in court, ADAMS said that he was not personally upset by what WOODS had said, stating that he suffered such abuse frequently in his job.\n\nWhat facts should the court take account of when considering the racially aggravated element of the offence, as set out in s. 28(1)(a) of the Crime and Disorder Act 1998?",
            opts: ["WOODS’s motivation when he uttered the words.", "ADAMS’s own perception of the words and whether he was personally upset by the situation.", "Neither WOODS’s motivation nor ADAMS’s own perception of the words.", "Whether ADAMS or an innocent bystander would have been personally upset by the words."],
            correct: 2,
            expCorrect: "The test for racial or religious aggravation is set out at s. 28(1) of the Crime and Disorder Act 1998, which states that an offence is racially or religiously aggravated for the purposes of ss. 29 to 32 if—\n\n(a) at the time of committing the offence, or immediately before or after doing so, the offender demonstrates towards the victim of the offence hostility based on the victim’s membership (or presumed membership) of a racial or religious group; or\n(b) the offence is motivated (wholly or partly) by hostility towards members of a racial or religious group based on their membership of that group.\nIn a case involving the abuse and assault of a doorman, the Administrative Court held that a racial insult uttered a few moments before an assault was enough to make the offence racially aggravated for the purposes of the Crime and Disorder Act 1998. The court also held that the victim’s own perception of the words used was irrelevant, as was the fact that he was not personally upset by the situation. Similarly, the fact that the defendant might have been motivated to utter the words merely by frustration rather than racism was also irrelevant ( DPP v Woods [2002] EWHC Admin 85). Simply, under s. 28(1)(a), when the person has demonstrated hostility based on the victim’s membership (or presumed membership) of a racial or religious group at the time of committing the offence, or immediately before or after doing so, the offence is complete regardless of his/her motivation or the perception of the victim (or some other bystander). Answers A, B and D are therefore incorrect.",
            expWrong: "The test for racial or religious aggravation is set out at s. 28(1) of the Crime and Disorder Act 1998, which states that an offence is racially or religiously aggravated for the purposes of ss. 29 to 32 if—\n\n(a) at the time of committing the offence, or immediately before or after doing so, the offender demonstrates towards the victim of the offence hostility based on the victim’s membership (or presumed membership) of a racial or religious group; or\n(b) the offence is motivated (wholly or partly) by hostility towards members of a racial or religious group based on their membership of that group.\nIn a case involving the abuse and assault of a doorman, the Administrative Court held that a racial insult uttered a few moments before an assault was enough to make the offence racially aggravated for the purposes of the Crime and Disorder Act 1998. The court also held that the victim’s own perception of the words used was irrelevant, as was the fact that he was not personally upset by the situation. Similarly, the fact that the defendant might have been motivated to utter the words merely by frustration rather than racism was also irrelevant ( DPP v Woods [2002] EWHC Admin 85). Simply, under s. 28(1)(a), when the person has demonstrated hostility based on the victim’s membership (or presumed membership) of a racial or religious group at the time of committing the offence, or immediately before or after doing so, the offence is complete regardless of his/her motivation or the perception of the victim (or some other bystander). Answers A, B and D are therefore incorrect."
        },
        {
            q: "DEAKIN parks her car in a busy supermarket car park. As she gets out of the car she is approached by HUGHES, a Rastafarian, who says, ‘You ignorant bitch, you’ve just took my car space!’ DEAKIN reacts to this comment by going over to HUGHES’ car and scratching the paintwork with her ignition key. As she does so she says, ‘Have this you Rasta shit!’ This is primarily because she is offended by what HUGHES has said, but also because she does not like the Rastafarian religion.\n\nWith regard to racially and religiously aggravated offences under the Crime and Disorder Act 1998, which of the below comments is correct?",
            opts: ["The offence is not religiously aggravated because Rastafarians are not covered by the legislation.", "The offence of criminal damage cannot be religiously aggravated.", "This is not a religiously aggravated offence because DEAKIN’s primary motivation for committing the offence was the comments made to her by HUGHES.", "In these circumstances the offence of criminal damage would be classed as religiously aggravated."],
            correct: 3,
            expCorrect: "Rastafarians are covered by the legislation (as a religious group), making answer A incorrect. ‘Simple’ criminal damage (as opposed to aggravated damage) is covered by the Crime and Disorder Act 1998, making answer B incorrect. Section 28(3) states that it is immaterial whether or not the offender’s hostility is based, to any extent, on any other factor. So the fact that the damage and comments made were directed at HUGHES because of an argument over a parking space at a supermarket does not alter the fact that the aggravated offence has been committed, making answer C incorrect.",
            expWrong: "Rastafarians are covered by the legislation (as a religious group), making answer A incorrect. ‘Simple’ criminal damage (as opposed to aggravated damage) is covered by the Crime and Disorder Act 1998, making answer B incorrect. Section 28(3) states that it is immaterial whether or not the offender’s hostility is based, to any extent, on any other factor. So the fact that the damage and comments made were directed at HUGHES because of an argument over a parking space at a supermarket does not alter the fact that the aggravated offence has been committed, making answer C incorrect."
        },
        {
            q: "GUNNING is walking his dog in a park. Although he knows his dog is bad-tempered, there is nobody else in the park and so he lets his dog off its lead and allows it to run free. Just after GUNNING lets his dog free, O’HARE walks into the park. Because GUNNING has omitted to keep his dog on the lead, the dog runs towards O’HARE. O’HARE is frightened of the dog and believes it will bite him. GUNNING runs up to his dog and puts it back on the lead. O’HARE says, ‘You bloody idiot, if your dog wasn’t with you I’d kick your head in!’ GUNNING is annoyed by the comment and lets his dog off the lead again saying, ‘Bite him boy!’ The dog bites O’HARE.\n\nAt what point, if at all, is an assault committed?",
            opts: ["When, because of GUNNING’s omission, his dog causes O’HARE to believe he will be bitten.", "When O’HARE threatens GUNNING.", "When GUNNING sets his dog on O’HARE.", "An assault has not taken place in these circumstances."],
            correct: 2,
            expCorrect: "Answer A is incorrect as an assault cannot be committed by an omission. When O’HARE threatens to assault GUNNING it is a conditional threat; the assault will not be committed because of the presence of the dog and, therefore, GUNNING cannot fear immediate application of force (therefore answer B is incorrect). An assault is committed at point C because the ‘indirect’ application of force (via the dog) qualifies as an assault.",
            expWrong: "Answer A is incorrect as an assault cannot be committed by an omission. When O’HARE threatens to assault GUNNING it is a conditional threat; the assault will not be committed because of the presence of the dog and, therefore, GUNNING cannot fear immediate application of force (therefore answer B is incorrect). An assault is committed at point C because the ‘indirect’ application of force (via the dog) qualifies as an assault."
        },
        {
            q: "LAKER is a prostitute. She is contacted by SAINSBURY, who tells LAKER that he wishes to beat her for his sexual gratification. LAKER agrees to SAINSBURY’s offer and meets him in a hotel room where, during sexual intercourse, SAINSBURY punches LAKER in the face causing her to lose consciousness for a short time. A member of staff at the hotel hears LAKER crying out in pain (prior to her loss of consciousness) and calls the police, who arrive just as SAINSBURY is paying LAKER, who has regained consciousness, for her services.\n\nConsidering the law under s. 71(2) of the Domestic Abuse Act 2021 and issues in relation to ‘consent’, which of the following statements is correct?",
            opts: ["LAKER has consented to the use of force so any assault committed on her person is lawful and as a consequence no offence is committed.", "The injury received by LAKER amounts to a s. 47 assault and the Domestic Abuse Act 2021 states that consent to such injury cannot amount to a defence.", "Consensual activity between LAKER and SAINSBURY would not be classed as a matter for criminal investigation.", "The courts have held that consensual sadomasochistic injuries may not justifiably be made the subject of criminal law."],
            correct: 1,
            expCorrect: "Answers A, C and D are incorrect as s. 71(2) of the Domestic Abuse Act 2021 states that it is not a defence that the victim of a ‘relevant offence’ consented to the infliction of the serious harm for the purposes of obtaining sexual gratification. A ‘relevant offence’ means an offence under s. 18, 20 or 47 of the Offences Against the Person Act 1861. ‘Serious harm’ means:\n\n• grievous bodily harm, within the meaning of s. 18 of the 1861 Act;\n• wounding, within the meaning of that section; or\n• actual bodily harm, within the meaning of s. 47 of the 1861 Act.",
            expWrong: "Answers A, C and D are incorrect as s. 71(2) of the Domestic Abuse Act 2021 states that it is not a defence that the victim of a ‘relevant offence’ consented to the infliction of the serious harm for the purposes of obtaining sexual gratification. A ‘relevant offence’ means an offence under s. 18, 20 or 47 of the Offences Against the Person Act 1861. ‘Serious harm’ means:\n\n• grievous bodily harm, within the meaning of s. 18 of the 1861 Act;\n• wounding, within the meaning of that section; or\n• actual bodily harm, within the meaning of s. 47 of the 1861 Act."
        },
        {
            q: "CATON steals a car and is pursued by PC STONE, who is driving a police livery vehicle. CATON drives into a cul-de-sac and is followed by the officer. CATON realises that there is no way out of the cul-de-sac and that he will be arrested if he does not ram PC STONE’s vehicle. Intending to escape and avoid arrest, CATON drives into the officer’s car. CATON realises that this may cause some harm to PC STONE. The resulting crash causes multiple cuts to PC STONE’s face, requiring 200 stitches and causing really serious harm to the officer. CATON is caught several minutes later.\n\nWith regard to assaults under the Offences Against the Person Act 1861, which of the following statements is correct?",
            opts: ["In these circumstances, CATON has ‘inflicted’ the injury and so the appropriate offence would be one of a s. 20 wounding.", "CATON commits s. 20 wounding as there was no intent to wound the officer.", "CATON’s actions were malicious and carried out in order to resist arrest. This means that he commits s. 18 wounding.", "CATON’s actions would not provide the evidence required for a successful prosecution under s. 18 or 20 of the Offences Against the Person Act."],
            correct: 2,
            expCorrect: "Whilst there is no intention to wound, CATON’s actions are ‘malicious’. Maliciousness means that the defendant must realise that there is a risk of some harm being caused to the victim. The defendant does not need to foresee the degree of harm that is eventually caused, only that his/her behaviour may bring about some harm to the victim. When the harm is caused with intent to resist or prevent lawful apprehension (arrest), the s. 18 grievous bodily harm/wounding offence is made out. This makes answers A, B and D incorrect.",
            expWrong: "Whilst there is no intention to wound, CATON’s actions are ‘malicious’. Maliciousness means that the defendant must realise that there is a risk of some harm being caused to the victim. The defendant does not need to foresee the degree of harm that is eventually caused, only that his/her behaviour may bring about some harm to the victim. When the harm is caused with intent to resist or prevent lawful apprehension (arrest), the s. 18 grievous bodily harm/wounding offence is made out. This makes answers A, B and D incorrect."
        },
        {
            q: "PC VERRIN arrests WATERFIELD for failing to take part in a preliminary screening test (for the purposes of drink/drive offences under the Road Traffic Act 1988). Unfortunately, the arrest was unlawful as PC VERRIN was a trespasser on land owned by WATERFIELD when the arrest was made. After the arrest, PC VERRIN takes hold of WATERFIELD and a struggle ensues, during which PC VERRIN is assaulted by WATERFIELD resulting in PC VERRIN sustaining several small cuts and bruises to his left arm. Other officers arrive at the scene and WATERFIELD is escorted to a designated police station where he is brought in to the custody block and placed in front of the custody officer, PS BLACKBURN. When PS BLACKBURN asks WATERFIELD for his name, WATERFIELD responds by telling the officer to ‘Fuck off’ and punching PS BLACKBURN in the face, causing minor bruising to PS BLACKBURN’s face.\n\nHas an offence of assault police (contrary to s. 89(1) of the Police Act 1996) been committed?",
            opts: ["No, the arrest made by PC VERRIN was unlawful. This means that any action by the police following an unlawful arrest (including that of the custody officer) cannot be regarded as that of an officer carrying out the lawful execution of his/her duty.", "Yes, the offence has been committed upon PC VERRIN and PS BLACKBURN.", "No, as the injuries received by both officers are minor.", "Yes, but only upon PS BLACKBURN."],
            correct: 3,
            expCorrect: "Section 89(1) of the Police Act 1996 states:\n\n(1) Any person who assaults a constable in the execution of his duty, or a person assisting a constable in the execution of his duty, shall be guilty of an offence.\nThis offence requires that the officer was acting in the execution of his/her duty when assaulted. If this is not proved, then part of the actus reus will be missing. Even a minor, technical and inadvertent act of unlawfulness on the part of the officer will mean that he/she cannot have been acting in the lawful execution of his/her duty. Any action amounting to assault, battery, unlawful arrest or trespass to property takes the officer outside the course of his/her duty ( Davis v Lisle [1936] 2 KB 434). So PC VERRIN would not be acting in the execution of his duty and would not be protected by the law, making answer B incorrect. However, if a person is arrested and brought before a custody officer, that officer is entitled to assume that the arrest was lawful. Therefore, if the prisoner goes on to assault the custody officer, that assault will be an offence under s. 89(1) even if the original arrest turns out to have been unlawful ( DPP v L [1999] Crim LR 752). This means that answer A is incorrect. The fact that the injuries received by PS BLACKBURN are of a minor nature does not have any bearing on the matter, making answer C incorrect. So the offence has been committed, but only against PS BLACKBURN (correct answer D).",
            expWrong: "Section 89(1) of the Police Act 1996 states:\n\n(1) Any person who assaults a constable in the execution of his duty, or a person assisting a constable in the execution of his duty, shall be guilty of an offence.\nThis offence requires that the officer was acting in the execution of his/her duty when assaulted. If this is not proved, then part of the actus reus will be missing. Even a minor, technical and inadvertent act of unlawfulness on the part of the officer will mean that he/she cannot have been acting in the lawful execution of his/her duty. Any action amounting to assault, battery, unlawful arrest or trespass to property takes the officer outside the course of his/her duty ( Davis v Lisle [1936] 2 KB 434). So PC VERRIN would not be acting in the execution of his duty and would not be protected by the law, making answer B incorrect. However, if a person is arrested and brought before a custody officer, that officer is entitled to assume that the arrest was lawful. Therefore, if the prisoner goes on to assault the custody officer, that assault will be an offence under s. 89(1) even if the original arrest turns out to have been unlawful ( DPP v L [1999] Crim LR 752). This means that answer A is incorrect. The fact that the injuries received by PS BLACKBURN are of a minor nature does not have any bearing on the matter, making answer C incorrect. So the offence has been committed, but only against PS BLACKBURN (correct answer D)."
        },
        {
            q: "GRANT and MUSTOW have been living together for 12 months and MUSTOW is four months pregnant. One evening, they start a row and GRANT realises from what MUSTOW says that the unborn child is not his and that MUSTOW’s employer, HUDSON, is actually the father of the unborn child. Enraged by this, GRANT says ‘I will kill that little bastard before it is born’, intending that the threat will cause MUSTOW to fear he will kill the unborn child. MUSTOW, however, is not frightened by this as she believes that GRANT would never carry out the threat.\n\nConsidering the offence of making a threat to kill (contrary to s. 16 of the Offences Against the Person Act 1861), which of the following statements is correct?",
            opts: ["GRANT commits the offence as he had the intention that the threat to kill would be feared by MUSTOW.", "GRANT does not commit the offence as the threat was made to a pregnant woman’s unborn child before its birth.", "GRANT does not commit the offence as the threat to kill was to kill in the future.", "GRANT does not commit the offence as although he intended the threat to be believed, the threat was not actually believed by MUSTOW."],
            correct: 1,
            expCorrect: "Section 16 of the Offences Against the Person Act 1861 states:\n\nA person who without lawful excuse makes to another a threat, intending that the other would fear it would be carried out, to kill another or a third person shall be guilty of an offence.\nA threat to a pregnant woman in respect of her unborn child is not sufficient if the threat is to kill it before its birth (the unborn child is not a person), making B the correct answer. This makes answer A incorrect; answer C is incorrect as the threat can be to kill in the future and answer D is incorrect as the fear of the victim or third party is irrelevant to the offence— it is the intention of the person making the threat to kill that is the necessary point to prove.",
            expWrong: "Section 16 of the Offences Against the Person Act 1861 states:\n\nA person who without lawful excuse makes to another a threat, intending that the other would fear it would be carried out, to kill another or a third person shall be guilty of an offence.\nA threat to a pregnant woman in respect of her unborn child is not sufficient if the threat is to kill it before its birth (the unborn child is not a person), making B the correct answer. This makes answer A incorrect; answer C is incorrect as the threat can be to kill in the future and answer D is incorrect as the fear of the victim or third party is irrelevant to the offence— it is the intention of the person making the threat to kill that is the necessary point to prove."
        },
        {
            q: "PC COPPLE is dealing with an incident where several assaults and public order offences were committed. The officer is considering the possibility of charging several of the participants in the disorder with the offence of obstruct police (contrary to s. 89 of the Police Act 1996) and approaches you for some advice on the matter. The officer tells you that during the incident HARTELL was spoken to by the police but refused to answer any questions, NORRIS stood in the doorway of a house and blocked police access to the premises for several minutes, STANSFIELD made a telephone call on his mobile phone providing a false location of the disorder to the police resulting in other officers attending the incorrect address several streets away from the incident and CARTER stood in his doorway several feet from the incident and did nothing to assist the police when the disorder began. All four were later arrested for assaults.\n\nWhich of the following comments is correct in relation to the offence of ‘obstruct police’ (under s. 89(2) of the Police Act 1996)?",
            opts: ["Obstruct police requires some sort of physical opposition so the only person who commits the offence is NORRIS.", "NORRIS and STANSFIELD commit the offence, HARTELL does not. CARTER would only commit the offence if he were under some duty towards the police to assist them.", "All four commit the offence of obstruct police in these circumstances.", "HARTELL, NORRIS and STANSFIELD commit the offence."],
            correct: 1,
            expCorrect: "HARTELL’s refusal to answer police questions is not obstruction, making answers C and D incorrect. Although obstruct police may involve some sort of physical opposition (NORRIS), it can also be committed by making it more difficult for a constable to carry out his/her duty (STANSFIELD), making answer A incorrect. Obstruction can be caused by omission (CARTER) but only where the defendant was already under some duty towards the police or the officer.",
            expWrong: "HARTELL’s refusal to answer police questions is not obstruction, making answers C and D incorrect. Although obstruct police may involve some sort of physical opposition (NORRIS), it can also be committed by making it more difficult for a constable to carry out his/her duty (STANSFIELD), making answer A incorrect. Obstruction can be caused by omission (CARTER) but only where the defendant was already under some duty towards the police or the officer."
        },
        {
            q: "MARSTON is part of a religious commune. UNWIN believes that MARSTON is in danger as the commune will ask MARSTON to turn all her property over to them. UNWIN decides that she will return MARSTON to her parents’ home by whatever means are necessary. UNWIN visits the commune and finds MARSTON. She asks MARSTON to walk with her while they discuss her situation and MARSTON agrees. MARSTON refuses to return with UNWIN, who then lies to MARSTON stating that MARSTON’s mother is seriously ill and that she must come with her. MARSTON agrees and begins walking with UNWIN. Several minutes later, MARSTON asks for proof of her mother’s illness from UNWIN who, at this point, physically drags MARSTON along for several metres before she lets her go.\n\nAt what point, if at all, does UNWIN first commit the offence of kidnap?",
            opts: ["When UNWIN initially begins walking with MARSTON intending to return her by whatever means necessary.", "When she lies to MARSTON about her mother and MARSTON walks with her for several minutes.", "When UNWIN uses physical force to drag MARSTON for several metres.", "UNWIN does not commit the offence because she has a lawful excuse to carry away MARSTON."],
            correct: 1,
            expCorrect: "The offence of kidnap is the unlawful taking or carrying away of one person by another by force or fraud ( R v D [1984] AC 778). At point A UNWIN’s intentions are to remove MARSTON by any means; however, MARSTON has voluntarily consented to walk with UNWIN and no fraud or force is used. At point B the offence is committed as UNWIN has used a fraud to move MARSTON from one point to another; distance is no object. Although a ‘lawful excuse’ would provide UNWIN with a defence to the charge, a concern for finances or a moral or spiritual concern would not suffice; there must be a necessity recognised as law ( R v Henman [1987] Crim LR 333, CA), making answer D incorrect.",
            expWrong: "The offence of kidnap is the unlawful taking or carrying away of one person by another by force or fraud ( R v D [1984] AC 778). At point A UNWIN’s intentions are to remove MARSTON by any means; however, MARSTON has voluntarily consented to walk with UNWIN and no fraud or force is used. At point B the offence is committed as UNWIN has used a fraud to move MARSTON from one point to another; distance is no object. Although a ‘lawful excuse’ would provide UNWIN with a defence to the charge, a concern for finances or a moral or spiritual concern would not suffice; there must be a necessity recognised as law ( R v Henman [1987] Crim LR 333, CA), making answer D incorrect."
        },
        {
            q: "DOYLE answered his door to a cold-caller and invited him in to discuss life insurance. As the conversation continued, DOYLE began to suspect that the salesperson was in fact trying to obtain money by fraud and, as the conversation between the two continues, that suspicion becomes a genuine belief. DOYLE decides to call the police and leaves the room with the salesperson still in there and locks the door to prevent him from escaping until the police arrive.\n\nHas DOYLE committed an offence of false imprisonment contrary to common law?",
            opts: ["Yes, as he has falsely imprisoned another person as he restrained the person’s freedom of movement.", "Yes, as he has falsely imprisoned another person and had no evidence that person was trying to commit a fraud offence.", "No, as the salesperson voluntarily entered the house.", "No, provided he genuinely believed he was acting in defence of his property."],
            correct: 3,
            expCorrect: "It is an offence at common law falsely to imprison another person. The elements required for this offence are the unlawful and intentional/reckless restraint of a person’s freedom of movement ( R v Rahman (1985) 81 Cr App R 349); this is the case whether or not the person voluntarily entered the place they were being held; answer C is therefore incorrect. In R v Shwan Faraj [2007] EWCA Crim 1033, the court stated that there was no reason why a householder should not be entitled to detain someone in his house whom he genuinely believed to be a burglar; he would be acting in defence of his property in doing so (a lawful detention of the person). This action would be correct for other offences and not restricted only to burglary; answers A and B are therefore incorrect.",
            expWrong: "It is an offence at common law falsely to imprison another person. The elements required for this offence are the unlawful and intentional/reckless restraint of a person’s freedom of movement ( R v Rahman (1985) 81 Cr App R 349); this is the case whether or not the person voluntarily entered the place they were being held; answer C is therefore incorrect. In R v Shwan Faraj [2007] EWCA Crim 1033, the court stated that there was no reason why a householder should not be entitled to detain someone in his house whom he genuinely believed to be a burglar; he would be acting in defence of his property in doing so (a lawful detention of the person). This action would be correct for other offences and not restricted only to burglary; answers A and B are therefore incorrect."
        },
        {
            q: "SMITH is selling her house to GLYNN and the two have verbally agreed a price. Before any contracts are signed, SMITH has her house revalued and discovers that she can obtain another £20,000 should she put it back up for sale. In view of this, SMITH contacts GLYNN to ask for more money. GLYNN is outraged and goes to SMITH’s house. SMITH lets GLYNN into her house but when he becomes abusive she demands he leave; he refuses. SMITH then tries to leave the house but GLYNN stops her by telling her that she is not leaving until she signs a contract agreeing to sell at the lower price. SMITH begins to cry and several minutes later GLYNN decides to leave.\n\nConsidering the offence of false imprisonment only, which of the following statements is correct?",
            opts: ["The offence is not committed because SMITH has not been physically detained.", "The offence will only be committed if GLYNN intends to restrain SMITH’s movements.", "Keeping SMITH in her home for however short a time may amount to false imprisonment.", "Common law states that false imprisonment cannot be committed in the home of the complainant."],
            correct: 2,
            expCorrect: "There is no requirement for the detaining of a person to be carried out by a physical action, just that their movement be restrained; this may be achieved by words alone, making answer A incorrect. The mental element required to commit this offence was stated in R v Rahman (1985) 81 Cr App R 349 as being ‘the unlawful and intentional or reckless restraint of a victim’s movement from a particular place’ so the offence can be committed recklessly, making answer B incorrect. The ‘particular place’ can be absolutely anywhere and this includes a victim’s own house, making answer D incorrect.",
            expWrong: "There is no requirement for the detaining of a person to be carried out by a physical action, just that their movement be restrained; this may be achieved by words alone, making answer A incorrect. The mental element required to commit this offence was stated in R v Rahman (1985) 81 Cr App R 349 as being ‘the unlawful and intentional or reckless restraint of a victim’s movement from a particular place’ so the offence can be committed recklessly, making answer B incorrect. The ‘particular place’ can be absolutely anywhere and this includes a victim’s own house, making answer D incorrect."
        },
        {
            q: "COLE and KING have recently separated. KING is upset and cannot come to terms with the fact that the relationship has ended. Knowing that COLE likes the band ‘New Vibe’ he tells her that he has already bought tickets for their upcoming concert, and asks if they could attend together as friends. He does not have tickets, but wants to see her and try and convince her to take him back. They meet (COLE thinking she is travelling to a concert) and she gets into his car but when they start to drive in the wrong direction, she questions him and he admits that he is not taking her to the concert. COLE immediately asks KING to stop so she can get out of the car. KING refuses and travels around 100 yards before stopping and letting her out.\n\nWhich of the following statements is correct in relation to an offence of kidnapping?",
            opts: ["KING commits an offence when he makes the plan.", "KING commits an offence the moment that COLE gets into the car and he drives off.", "KING does not commit an offence as COLE consents to getting in the car.", "KING does not commit as 100 yards is not far enough to be carried."],
            correct: 1,
            expCorrect: "It is an offence at common law to take or carry away another person without the consent of that person and without lawful excuse. The taking or carrying away of the victim must be without the consent of the victim. If the victim consents to an initial taking but later withdraws that consent, the offence would be complete. If the consent is obtained by fraud, the defendant cannot rely on that consent and the offence will be made out ( R v Cort [2003] EWCA Crim 2149). This offence has been committed by fraud and therefore the correct answer is B, and C incorrect. Answer A is not correct as this is an offence of action, and whilst it can be planned it is carried out by the action of taking or carrying a person away. Answer D is incorrect as the ‘taking or carrying away’ need not involve great distances as a short distance (just a few yards/ metres) will suffice ( R v Wellard [1978] 1 WLR 921).",
            expWrong: "It is an offence at common law to take or carry away another person without the consent of that person and without lawful excuse. The taking or carrying away of the victim must be without the consent of the victim. If the victim consents to an initial taking but later withdraws that consent, the offence would be complete. If the consent is obtained by fraud, the defendant cannot rely on that consent and the offence will be made out ( R v Cort [2003] EWCA Crim 2149). This offence has been committed by fraud and therefore the correct answer is B, and C incorrect. Answer A is not correct as this is an offence of action, and whilst it can be planned it is carried out by the action of taking or carrying a person away. Answer D is incorrect as the ‘taking or carrying away’ need not involve great distances as a short distance (just a few yards/ metres) will suffice ( R v Wellard [1978] 1 WLR 921)."
        },
        {
            q: "TURNER comes home to her 10th floor flat and sees that the front door to the flat is slightly open. There have been a spate of burglaries in the block of flats and as TURNER looks through her front door she can see FELLOWES in her lounge dismantling her hi-fisystem and placing it into a bag. TURNER genuinely believes that FELLOWES is a burglar and locks her front door to prevent FELLOWES from escaping. There is no other route out of the flat as it is on the 10th floor. TURNER calls the police but when they arrive five minutes later it transpires that TURNER’s partner had let FELLOWES in to install a new hi-fisystem as a surprise for TURNER.\n\nWhich of the following comments is correct in respect of TURNER?",
            opts: ["TURNER has committed the offence of false imprisonment in these circumstances and has no defence to the charge.", "TURNER has not committed the offence as the period of imprisonment was too short.", "TURNER has committed the offence of false imprisonment but would have a defence in that she genuinely believed FELLOWES to be a burglar.", "TURNER has not committed the offence as she has not used any form of physical force against FELLOWES in order to imprison him."],
            correct: 2,
            expCorrect: "The offence of false imprisonment is committed when a person falsely imprisons another. The state of mind required to commit the offence is the unlawful and intentional/reckless restraint of a person’s freedom. There is no need for force to be used on the person to commit the offence, meaning answer D is incorrect. There is no time limitation on how long a person should be detained in order for the offence to be committed, meaning answer B is incorrect. In R v Shwan [2007] EWCA Crim 1033, the court stated there was no reason why a householder should not be entitled to detain someone in their house whom they genuinely believed to be a burglar, providing a defence to the offence and making answer A incorrect.",
            expWrong: "The offence of false imprisonment is committed when a person falsely imprisons another. The state of mind required to commit the offence is the unlawful and intentional/reckless restraint of a person’s freedom. There is no need for force to be used on the person to commit the offence, meaning answer D is incorrect. There is no time limitation on how long a person should be detained in order for the offence to be committed, meaning answer B is incorrect. In R v Shwan [2007] EWCA Crim 1033, the court stated there was no reason why a householder should not be entitled to detain someone in their house whom they genuinely believed to be a burglar, providing a defence to the offence and making answer A incorrect."
        },
        {
            q: "WILSON sees a young couple out walking on the common. He approaches the girl and tells her that he is a police officer and is taking her to be searched for drugs. He tells the boyfriend to go home. He then walks her to his car about 25 metres away. Her boyfriend, suspecting something is not right, returns with two other friends and rescues the girl prior to WILSON putting her in his car. WILSON is not a police officer and had an unlawful purpose in mind.\n\nHas WILSON committed the offence of kidnapping?",
            opts: ["Yes, as he has taken the girl away without her consent.", "Yes, as he has taken the girl away without her consent and had an unlawful purpose.", "No, as the girl went willingly with him.", "No, as he never really took her anywhere as they were still on the common."],
            correct: 0,
            expCorrect: "Kidnapping is defined at common law as follows:\n\nIt is an offence at common law to take or carry away another person without the consent of that person and without lawful excuse.\nThe required elements of this offence are the unlawful taking or carrying away of one person by another by force or fraud ( R v D [1984] AC 778). These requirements go beyond those of mere restraint needed for false imprisonment. Parents may be acting without lawful excuse, for instance if they are acting in breach of a court order in respect of their children. The taking or carrying away of the victim must be without the consent of the victim. If the victim consents to an initial taking but later withdraws that consent, the offence would be complete. If the consent is obtained by fraud, the defendant cannot rely on that consent and the offence—or attempted offence—will be made out (see R v Cort [2003] 3 WLR 1300); answer C is therefore incorrect. There is no limit as to how far the taking should be; answer D is therefore incorrect. There need only be a ‘taking’; the purpose is irrelevant which makes answer B incorrect.",
            expWrong: "Kidnapping is defined at common law as follows:\n\nIt is an offence at common law to take or carry away another person without the consent of that person and without lawful excuse.\nThe required elements of this offence are the unlawful taking or carrying away of one person by another by force or fraud ( R v D [1984] AC 778). These requirements go beyond those of mere restraint needed for false imprisonment. Parents may be acting without lawful excuse, for instance if they are acting in breach of a court order in respect of their children. The taking or carrying away of the victim must be without the consent of the victim. If the victim consents to an initial taking but later withdraws that consent, the offence would be complete. If the consent is obtained by fraud, the defendant cannot rely on that consent and the offence—or attempted offence—will be made out (see R v Cort [2003] 3 WLR 1300); answer C is therefore incorrect. There is no limit as to how far the taking should be; answer D is therefore incorrect. There need only be a ‘taking’; the purpose is irrelevant which makes answer B incorrect."
        },
        {
            q: "TRAVIS has been arrested for an offence of human trafficking contrary to s. 2 of the Modern Slavery Act 2015 and the officer in the case, PC BAPTISTA, is preparing to interview TRAVIS and in doing so is considering the meaning of the term ‘exploitation’ which is a key part of this offence.\n\nWhich of the following best describes ‘exploitation’ within the meaning given by the 2015 Act?",
            opts: ["Exploitation includes slavery, servitude and forced or compulsory labour.", "Exploitation includes slavery, servitude, forced or compulsory labour and sexual exploitation.", "Exploitation includes slavery, servitude, forced or compulsory labour, sexual exploitation and organ removal.", "Exploitation includes slavery, servitude, forced or compulsory labour, sexual exploitation, organ removal and prostitution."],
            correct: 2,
            expCorrect: "Exploitation is defined in s. 3 of the Modern Slavery Act 2015 and includes slavery, servitude and forced or compulsory labour, sexual exploitation and removal of organs, etc. but not specifically prostitution; answers A, B and D are therefore incorrect.",
            expWrong: "Exploitation is defined in s. 3 of the Modern Slavery Act 2015 and includes slavery, servitude and forced or compulsory labour, sexual exploitation and removal of organs, etc. but not specifically prostitution; answers A, B and D are therefore incorrect."
        },
        {
            q: "PC CURRAM (who is on uniform mobile patrol) has arrested MOFFAT in connection with an offence of human trafficking (under s. 2 of the Modern Slavery Act 2015). The circumstances are that MOFFAT was driving a Ford Transit van and was subject to a routine stop by the officer. Due to MOFFAT’s suspicious behaviour, PC CURRAM lawfully searched the vehicle and discovered a number of Libyan nationals in the rear of the vehicle. MOFFAT immediately confessed that the Libyan nationals were being transported by him with a view to them being exploited by NICHOLAS (MOFFAT’s employer and the owner of the Transit van).\n\nCould PC CURRAM seize the Transit van using the powers under s. 12 of the Modern Slavery Act 2015?",
            opts: ["No, as the power to seize a land vehicle, ship or aircraft under s. 12 is only available to a senior immigration officer.", "Yes, but only because the officer is in uniform.", "No, because MOFFAT does not own the vehicle.", "Yes, if PC CURRAM has reasonable grounds to believe an order for its forfeiture could be made if MOFFAT were convicted of the offence."],
            correct: 3,
            expCorrect: "The Modern Slavery Act 2015, s. 12 states that if a person (‘P’) has been arrested for an offence under s. 2 (i.e. the offence of human trafficking), then a constable or senior immigration officer may detain a relevant land vehicle, ship or aircraft . A land vehicle, ship or aircraft is relevant if the constable or officer has reasonable grounds to believe that an order for its forfeiture could be made under s. 11 if P were convicted of the offence (correct answer D). The Modern Slavery Act 2015, s. 11 states that if a person is convicted on indictment of an offence under s. 2 then the court may order the forfeiture of a land vehicle used or intended to be used in connection with the offence if the convicted person (MOFFAT) was driving the vehicle in the course of the commission of the offence (s. 11(2)(e)), meaning answer C is incorrect. The power is available to a constable (no requirement for uniform) or a senior immigration officer (meaning that answers A and B are incorrect).",
            expWrong: "The Modern Slavery Act 2015, s. 12 states that if a person (‘P’) has been arrested for an offence under s. 2 (i.e. the offence of human trafficking), then a constable or senior immigration officer may detain a relevant land vehicle, ship or aircraft . A land vehicle, ship or aircraft is relevant if the constable or officer has reasonable grounds to believe that an order for its forfeiture could be made under s. 11 if P were convicted of the offence (correct answer D). The Modern Slavery Act 2015, s. 11 states that if a person is convicted on indictment of an offence under s. 2 then the court may order the forfeiture of a land vehicle used or intended to be used in connection with the offence if the convicted person (MOFFAT) was driving the vehicle in the course of the commission of the offence (s. 11(2)(e)), meaning answer C is incorrect. The power is available to a constable (no requirement for uniform) or a senior immigration officer (meaning that answers A and B are incorrect)."
        },
        {
            q: "PC GOLD (a probationary officer) is the first officer at the scene of a kidnapping offence. Several of his more senior (in terms of experience) colleagues also attend the incident and there is a discussion in relation to the circumstances of the offence. PC GOLD is confused by what his colleagues have said and is unsure of the law relating to the offence of kidnap so he approaches his supervisor for some advice regarding the offence.\n\nIn relation to the offence of kidnap (under common law), which of the comments by officers at the scene of the offence shows a correct understanding of the law?",
            opts: ["PC JOHNSON stated that causing a person to move from place to place when unaccompanied by the defendant would not constitute an offence of kidnap.", "PC ANWAR stated that a person must be taken or carried away by force if the offence is to be committed.", "PC YOUNG stated that if a person is moved only a short distance, the offence will not be made out.", "PC SMETHEM stated that the offence of kidnap cannot be ‘attempted’."],
            correct: 0,
            expCorrect: "There is nothing preventing a charge of ‘attempted kidnap’, meaning that answer D is incorrect. The ‘taking or carrying away’ need not involve a great distance, meaning answer C is incorrect. Answer B is incorrect as the taking or carrying away can be accomplished by force or by fraud. In R v Hendy-Freegard [2007] EWCA Crim 1236, the defendant was a confidence trickster who pretended to be an undercover agent working for MI5 or Scotland Yard. He would tell his victims that he was investigating the activities of the IRA and that his investigations had revealed that they were in danger. This allowed him to take control of their lives for a number of years and in doing so to direct them to move about the country from location to location. The defendant was eventually arrested and convicted of kidnapping on the basis of the Crown’s case that the offence of kidnapping had occurred, as his victims had made journeys around the country which they had been induced to make as a result of the defendant’s false story. The defendant successfully appealed against the kidnapping conviction, with the court stating that causing a person to move from place to place when unaccompanied by the defendant could not itself constitute either taking or carrying away or deprivation of liberty, which were necessary elements of the offence.",
            expWrong: "There is nothing preventing a charge of ‘attempted kidnap’, meaning that answer D is incorrect. The ‘taking or carrying away’ need not involve a great distance, meaning answer C is incorrect. Answer B is incorrect as the taking or carrying away can be accomplished by force or by fraud. In R v Hendy-Freegard [2007] EWCA Crim 1236, the defendant was a confidence trickster who pretended to be an undercover agent working for MI5 or Scotland Yard. He would tell his victims that he was investigating the activities of the IRA and that his investigations had revealed that they were in danger. This allowed him to take control of their lives for a number of years and in doing so to direct them to move about the country from location to location. The defendant was eventually arrested and convicted of kidnapping on the basis of the Crown’s case that the offence of kidnapping had occurred, as his victims had made journeys around the country which they had been induced to make as a result of the defendant’s false story. The defendant successfully appealed against the kidnapping conviction, with the court stating that causing a person to move from place to place when unaccompanied by the defendant could not itself constitute either taking or carrying away or deprivation of liberty, which were necessary elements of the offence."
        },
        {
            q: "FEARING applies for a job as a lifeguard at his local swimming pool. Part of his prospective duties will include giving swimming lessons to children between the ages of 5 and 12 years old. FEARING’s ulterior motive is to gain employment at the swimming pool and then take indecent photographs of the children (contrary to s. 1 of the Protection of Children Act 1978). To help him get the job, he forges several certificates that state he has passed examinations as a lifeguard. As a result, FEARING is given the job as a lifeguard.\n\nConsidering the offence of committing a criminal offence with intent to commit a sexual offence (s. 62 of the Sexual Offences Act 2003), which of the following statements is right?",
            opts: ["FEARING does not commit the offence as taking indecent photographs of children under s. 1 of the Protection of Children Act 1978 is not a ‘relevant sexual offence’.", "This offence can only be committed if the criminal offence is one of kidnapping or false imprisonment, therefore FEARING has not committed the offence.", "Until FEARING commits a sexual assault on one of the children, he cannot be arrested for committing this offence.", "FEARING has initially committed an offence of obtaining a pecuniary advantage by deception (s. 16 of the Theft Act 1968) and therefore commits this offence."],
            correct: 0,
            expCorrect: "Section 62 of the Sexual Offences Act 2003 states that a person commits an offence under this section if he commits any offence with the intention of committing a relevant sexual offence. There are no restrictions on the nature or type of offence committed as long as it can be shown that there was an intention, when committing the original offence, to commit a relevant sexual offence. This makes answer B incorrect. Answer C is incorrect as the offence under s. 62 is committed when the first offence is committed with the required intention. Answer D is incorrect as although FEARING has committed an offence, taking photographs of children (contrary to s. 1 of the Protection of Children Act 1978) is not a ‘relevant offence’ for the purposes of s. 62. A ‘relevant offence’ means a sexual offence under Pt 1 of the Sexual Offences Act 2003.",
            expWrong: "Section 62 of the Sexual Offences Act 2003 states that a person commits an offence under this section if he commits any offence with the intention of committing a relevant sexual offence. There are no restrictions on the nature or type of offence committed as long as it can be shown that there was an intention, when committing the original offence, to commit a relevant sexual offence. This makes answer B incorrect. Answer C is incorrect as the offence under s. 62 is committed when the first offence is committed with the required intention. Answer D is incorrect as although FEARING has committed an offence, taking photographs of children (contrary to s. 1 of the Protection of Children Act 1978) is not a ‘relevant offence’ for the purposes of s. 62. A ‘relevant offence’ means a sexual offence under Pt 1 of the Sexual Offences Act 2003."
        },
        {
            q: "HAYE owns and runs a massage parlour where ILLTEN and STONELEIGH (both female) provide massage for customers. HAYE knows that ILLTEN and STONELEIGH regularly provide ‘extras’ for their male customers; this takes the form of oral sex with the customers. ILLTEN and STONELEIGH charge £50 for the ‘extra’ service but HAYE does not take a cut of the money as he is just happy that people are using the massage parlour.\n\nConsidering the offence of keeping a brothel used for prostitution (contrary to s. 33A of the Sexual Offences Act 1956) only, which of the following comments is true?",
            opts: ["No offence has been committed by HAYE as he does not take any payment for the sexual services offered by ILLTEN and STONELEIGH.", "For HAYE to be convicted of the offence, the prosecution would need to prove that persons resorted to the ‘brothel’ on more than one occasion.", "No offence has been committed as a ‘brothel’ is a place to which people resort for the purposes of unlawful sexual intercourse and in this situation full sexual intercourse does not take place.", "HAYE has committed the offence in this situation."],
            correct: 3,
            expCorrect: "A brothel is a place to which people resort for the purposes of unlawful sexual intercourse with more than one prostitute. However, it is not necessary that full sexual intercourse takes place or is even offered—a massage parlour where other acts of lewdness or indecency for sexual gratification are offered may be a brothel, making answer C incorrect. Section 33A(1) states that it is an offence for a person to keep, or to manage, or act or assist in the management of, a brothel to which people resort for practices involving prostitution (whether or not also for other practices). Prostitution means offering or providing sexual services, whether under compulsion or not, to another in return for payment or a promise of payment to the prostitute or a third person, so it does not matter that HAYE does not receive a ‘cut’ of the money ILLTEN and STONELEIGH make, making answer A incorrect. There is no requirement for the prosecution to prove that the premises were resorted to on more than one occasion, making answer B incorrect.",
            expWrong: "A brothel is a place to which people resort for the purposes of unlawful sexual intercourse with more than one prostitute. However, it is not necessary that full sexual intercourse takes place or is even offered—a massage parlour where other acts of lewdness or indecency for sexual gratification are offered may be a brothel, making answer C incorrect. Section 33A(1) states that it is an offence for a person to keep, or to manage, or act or assist in the management of, a brothel to which people resort for practices involving prostitution (whether or not also for other practices). Prostitution means offering or providing sexual services, whether under compulsion or not, to another in return for payment or a promise of payment to the prostitute or a third person, so it does not matter that HAYE does not receive a ‘cut’ of the money ILLTEN and STONELEIGH make, making answer A incorrect. There is no requirement for the prosecution to prove that the premises were resorted to on more than one occasion, making answer B incorrect."
        },
        {
            q: "POWELL (aged 26 years) drives to a family wedding reception where he speaks to his first cousin, IMBER (aged 17 years). IMBER has lived in Australia all her life and this is the first time the two have ever met so they are totally unaware that they are cousins. The two talk to each other all night and as the evening draws to a close, IMBER tells POWELL that she wants to have sexual intercourse with him. They go outside the wedding venue, get into POWELL’s car and have sexual intercourse (penis to vagina).\n\nConsidering the offence under s. 25 of the Sexual Offences Act 2003 (sexual activity with a child family member) and the definition of a family relationship (under s. 27 of the Act), has POWELL committed an offence?",
            opts: ["No, he has never lived in the same household as IMBER or been regularly involved in caring for, training or supervising or been in sole charge of IMBER.", "Yes, because IMBER is under 18 years of age.", "No, because IMBER is over 16 years of age.", "Yes, sexual intercourse with a first cousin would constitute an offence in these circumstances."],
            correct: 0,
            expCorrect: "The offence can be committed between cousins where the defendant and the victim live or have lived in the same household, or the defendant is or has been regularly involved in caring for, training, supervising or been in sole charge of the victim but that is clearly not the case in this question. If these circumstances existed, the fact that IMBER was over 16 years of age would be immaterial and the offence would be committed, making answer C incorrect. As POWELL and IMBER have never met each other this activity would not amount to an offence under s. 25, making answers B and D incorrect.",
            expWrong: "The offence can be committed between cousins where the defendant and the victim live or have lived in the same household, or the defendant is or has been regularly involved in caring for, training, supervising or been in sole charge of the victim but that is clearly not the case in this question. If these circumstances existed, the fact that IMBER was over 16 years of age would be immaterial and the offence would be committed, making answer C incorrect. As POWELL and IMBER have never met each other this activity would not amount to an offence under s. 25, making answers B and D incorrect."
        },
        {
            q: "ROLFE is a local councillor who is running an anti-child pornography campaign. Because of ROLFE’s campaign, PARNELL (a paedophile) decides to send ROLFE a large number of indecent photographs of children in order to offend him. PARNELL contacts OXLEY, a delivery van driver, to deliver a parcel containing hundreds of indecent photographs of children under the age of ten to ROLFE’s home address. OXLEY (unaware of the contents) collects the parcel from PARNELL and places it on the front seat of his van and sets off. Several miles later, OXLEY has to brake sharply to avoid an accident and the parcel slips off the front seat and hits the dashboard of his van. In the process, the packaging is damaged and OXLEY sees the contents. OXLEY needs the money for delivering the parcel and so continues to his destination, where he delivers the parcel to ROLFE. The photographs outrage ROLFE and, believing he has a legitimate reason to show the photographs, he shows them to a local newspaper editor as evidence to highlight his anti-child pornography campaign.\n\nWho has committed an offence contrary to s. 1 of the Protection of Children Act 1978 (relating to indecent photographs)?",
            opts: ["PARNELL only.", "PARNELL and OXLEY.", "PARNELL and ROLFE.", "PARNELL, OXLEY and ROLFE (although ROLFE would have a defence if charged with the offence)."],
            correct: 3,
            expCorrect: "Under s. 1(1)(b) of the Act it is an offence to distribute or show indecent photographs or pseudo-photographs. PARNELL is guilty of this offence by sending the package containing the indecent photographs, via OXLEY, to ROLFE. OXLEY is also guilty of this offence. It would be a defence for a person charged with such an offence under s. 1(4)(b) of the Act to prove that he had not himself seen the photographs or pseudo-photographs and did not know, nor had any cause to suspect, them to be indecent. OXLEY would have been able to avail himself of this defence up until the point when he realised what the contents of the package were, meaning that answers A and C are incorrect. Answer B is incorrect as ROLFE has committed the offence. He does have a defence in this situation under s. 1(4)(b) of the Act, which states that he will have a defence if he had a legitimate reason for distributing or showing the photographs or pseudo-photographs.",
            expWrong: "Under s. 1(1)(b) of the Act it is an offence to distribute or show indecent photographs or pseudo-photographs. PARNELL is guilty of this offence by sending the package containing the indecent photographs, via OXLEY, to ROLFE. OXLEY is also guilty of this offence. It would be a defence for a person charged with such an offence under s. 1(4)(b) of the Act to prove that he had not himself seen the photographs or pseudo-photographs and did not know, nor had any cause to suspect, them to be indecent. OXLEY would have been able to avail himself of this defence up until the point when he realised what the contents of the package were, meaning that answers A and C are incorrect. Answer B is incorrect as ROLFE has committed the offence. He does have a defence in this situation under s. 1(4)(b) of the Act, which states that he will have a defence if he had a legitimate reason for distributing or showing the photographs or pseudo-photographs."
        },
        {
            q: "DEACON was the manager of a local rugby club, which was renowned for stag and hen parties. DEACON decided to employ a stripper and on the first night, guests were charged a £5 entry fee to cover the cost of the extra entertainment. DEACON approached HORMAN, whose party it was, and offered the opportunity of sexual services with the stripper in private, for extra payment. However, DEACON made it clear that this would not involve full sexual intercourse. HORMAN agreed and paid DEACON for sexual services that did not involve full sexual intercourse.\n\nCould DEACON be found guilty of managing a brothel, under s. 33A(1) of the Sexual Offences Act 1956, in these circumstances?",
            opts: ["No, because full sexual intercourse was not offered and did not take place.", "Yes, sexual services were offered; it is not relevant that full sexual intercourse did not take place.", "No, because only one person was offering sexual services for payment.", "Yes, as people were made to pay to enter the premises."],
            correct: 2,
            expCorrect: "Under s. 33A(1) of the Sexual Offences Act 1956, it is an offence for a person to keep, or to manage, or act or assist in the management of, a brothel to which people resort for practices involving prostitution (whether or not also for other practices). A brothel is a place to which people resort for the purposes of unlawful sexual intercourse with more than one prostitute. However, it is not necessary that full sexual intercourse takes place or is even offered. Prostitution means offering or providing sexual services, whether under compulsion or not, to another in return for payment or a promise of payment to the prostitute or a third person (see s. 51(2)). Therefore, although full sexual services were not offered, the stripper could have been acting as a prostitute as sexual services were offered for payment. Answer A is therefore incorrect. However, for it to be a brothel, there must be more than one prostitute offering sexual services; therefore, answer B is incorrect. It is irrelevant whether people have to pay to get into the premises (answer D is incorrect). It is possible that DEACON could be found guilty of keeping a disorderly house under common law. To prove this offence you must show that the house is ‘open’ (i.e. to customers); that it is unregulated by the restraints of morality; and that it is run in a way that violates law and good order ( R v Tan [1983] QB 1053). The offence also requires some persistence and will not cover a single instance, e.g. of an indecent performance.",
            expWrong: "Under s. 33A(1) of the Sexual Offences Act 1956, it is an offence for a person to keep, or to manage, or act or assist in the management of, a brothel to which people resort for practices involving prostitution (whether or not also for other practices). A brothel is a place to which people resort for the purposes of unlawful sexual intercourse with more than one prostitute. However, it is not necessary that full sexual intercourse takes place or is even offered. Prostitution means offering or providing sexual services, whether under compulsion or not, to another in return for payment or a promise of payment to the prostitute or a third person (see s. 51(2)). Therefore, although full sexual services were not offered, the stripper could have been acting as a prostitute as sexual services were offered for payment. Answer A is therefore incorrect. However, for it to be a brothel, there must be more than one prostitute offering sexual services; therefore, answer B is incorrect. It is irrelevant whether people have to pay to get into the premises (answer D is incorrect). It is possible that DEACON could be found guilty of keeping a disorderly house under common law. To prove this offence you must show that the house is ‘open’ (i.e. to customers); that it is unregulated by the restraints of morality; and that it is run in a way that violates law and good order ( R v Tan [1983] QB 1053). The offence also requires some persistence and will not cover a single instance, e.g. of an indecent performance."
        },
        {
            q: "MARKU is involved in exploiting girls for prostitution. He accepts payment from CROSS for the services of a prostitute. MARKU then persuades a young illegal immigrant to have sex with CROSS and tells her that if she does he will ensure that she will get political asylum in the UK. MARKU has absolutely no way of being able to influence the immigration status of the girl; however, he intends giving the girl half of the money paid by CROSS. CROSS has no idea that MARKU has used a deception on the girl.\n\nConsidering the offence of paying for sexual services of a prostitute subjected to force (contrary to s. 53A of the Sexual Offences Act 2003), which of the following is correct?",
            opts: ["Both MARKU and CROSS have committed this offence as CROSS has made payment and MARKU has benefited.", "Only CROSS has committed this offence as he has made payment; MARKU has not committed this offence at all.", "Only CROSS has committed this offence as he has made payment; MARKU has not committed this offence as he has offered to share the benefits with the prostitute.", "Only MARKU commits this offence as CROSS knows nothing about the exploitative conduct committed by MARKU."],
            correct: 1,
            expCorrect: "Section 53A of the Sexual Offences Act 2003 states:\n\n(1) A person (A) commits an offence if—\n(a) A makes or promises payment for the sexual services of a prostitute (B),\n(b) a third person (C) has engaged in exploitative conduct of a kind likely to induce or encourage B to provide the sexual services for which A has made or promised payment, and\n(c) C engaged in that conduct for or in the expectation of gain for C or another person (apart from A or B).\n(2) The following are irrelevant—\n(a) where in the world the sexual services are to be provided and whether those services are provided,\n(b) whether A is, or ought to be, aware that C has engaged in exploitative conduct.\n(3) C engages in exploitative conduct if—\n(a) C uses force, threats (whether or not relating to violence) or any other form of coercion, or\n(b) C practises any form of deception.\nThis section creates an offence which is committed if someone pays or promises payment for the sexual services of a prostitute who has been subject to exploitative conduct of a kind likely to induce or encourage the provision of sexual services for which the payer has made or promised payment. The person responsible for the exploitative conduct must have been acting for or in the expectation of gain for him/herself or another person, other than the payer or the prostitute. So only CROSS can commit this offence; answers A, C and D are therefore incorrect. It does not matter where in the world the sexual services are to be provided. An offence is committed regardless of whether the person paying or promising payment for sexual services knows or ought to know or be aware that the prostitute has been subject to exploitative conduct. In other words, the offence is one of strict liability and no mental element is required in respect of the offender’s knowledge that the prostitute was forced, threatened, coerced or deceived.",
            expWrong: "Section 53A of the Sexual Offences Act 2003 states:\n\n(1) A person (A) commits an offence if—\n(a) A makes or promises payment for the sexual services of a prostitute (B),\n(b) a third person (C) has engaged in exploitative conduct of a kind likely to induce or encourage B to provide the sexual services for which A has made or promised payment, and\n(c) C engaged in that conduct for or in the expectation of gain for C or another person (apart from A or B).\n(2) The following are irrelevant—\n(a) where in the world the sexual services are to be provided and whether those services are provided,\n(b) whether A is, or ought to be, aware that C has engaged in exploitative conduct.\n(3) C engages in exploitative conduct if—\n(a) C uses force, threats (whether or not relating to violence) or any other form of coercion, or\n(b) C practises any form of deception.\nThis section creates an offence which is committed if someone pays or promises payment for the sexual services of a prostitute who has been subject to exploitative conduct of a kind likely to induce or encourage the provision of sexual services for which the payer has made or promised payment. The person responsible for the exploitative conduct must have been acting for or in the expectation of gain for him/herself or another person, other than the payer or the prostitute. So only CROSS can commit this offence; answers A, C and D are therefore incorrect. It does not matter where in the world the sexual services are to be provided. An offence is committed regardless of whether the person paying or promising payment for sexual services knows or ought to know or be aware that the prostitute has been subject to exploitative conduct. In other words, the offence is one of strict liability and no mental element is required in respect of the offender’s knowledge that the prostitute was forced, threatened, coerced or deceived."
        },
        {
            q: "LLOYD is a GP in a health clinic and has been arrested and charged with several offences of sexual touching, contrary to s. 3 of the Sexual Offences Act 2003. Complaints have been made by several women that during examinations LLOYD inserted a finger into their vaginas unnecessarily and that this was done to obtain sexual gratification. In interview, LLOYD claimed that the touching was not at all sexual, and that it formed part of the examinations.\n\nWhat would need to be shown by the prosecution, for LLOYD’s actions to fall within the definition of ‘sexual’, under s. 78 of the Sexual Offences Act 2003?",
            opts: ["That whatever LLOYD’s purpose, the actions were sexual, by their very nature.", "That LLOYD received sexual gratification from the touching.", "That because of their nature the actions may be sexual and because of the circumstances or the purpose of any person in relation to them, they are sexual.", "That LLOYD received sexual gratification from the touching and a reasonable person would consider the actions to be sexual."],
            correct: 2,
            expCorrect: "Section 78 of the Sexual Offences Act 2003 provides that penetration, touching or any other activity will be sexual if a reasonable person would consider that:\n\n(a) whatever its circumstances or any person’s purpose in relation to it, it is sexual by its very nature; or\n(b) because of its nature it may be sexual and because of its circumstances or the purpose of any person in relation to it, it is sexual.\nTherefore, activity under (a) covers things that a reasonable person would always consider to be sexual (e.g. masturbation). The activity under (b) above covers things that may or may not be considered sexual by a reasonable person depending on the circumstances or the intentions of the person carrying it out (or both). The example of a doctor inserting a finger into a vagina might be sexual under certain circumstances, but if done for a purely medical purpose in a hospital, it would not be. Since LLOYD’s actions would not always be considered sexual by their nature, answer A is incorrect. If the activity would not appear to a reasonable person to be sexual, then it will not meet either criteria and, irrespective of any sexual gratification the person might derive from it, the activity will not be ‘sexual’. Answers B and D are therefore incorrect.",
            expWrong: "Section 78 of the Sexual Offences Act 2003 provides that penetration, touching or any other activity will be sexual if a reasonable person would consider that:\n\n(a) whatever its circumstances or any person’s purpose in relation to it, it is sexual by its very nature; or\n(b) because of its nature it may be sexual and because of its circumstances or the purpose of any person in relation to it, it is sexual.\nTherefore, activity under (a) covers things that a reasonable person would always consider to be sexual (e.g. masturbation). The activity under (b) above covers things that may or may not be considered sexual by a reasonable person depending on the circumstances or the intentions of the person carrying it out (or both). The example of a doctor inserting a finger into a vagina might be sexual under certain circumstances, but if done for a purely medical purpose in a hospital, it would not be. Since LLOYD’s actions would not always be considered sexual by their nature, answer A is incorrect. If the activity would not appear to a reasonable person to be sexual, then it will not meet either criteria and, irrespective of any sexual gratification the person might derive from it, the activity will not be ‘sexual’. Answers B and D are therefore incorrect."
        },
        {
            q: "The police were investigating a series of rapes on a several large campsites. The police were conducting observations at one particular campsite when they saw BERBA acting suspiciously. They observed him cutting a hole in the rear of a tent and enter it. BERBA was arrested inside the tent and the person inside confirmed he was not entitled to be there. BERBA matched the description of the suspect.\n\nWhich of the following statements is correct, in respect of BERBA’s liability for an offence under s. 63(1) of the Sexual Offences Act 2003, (trespass with intent to commit a sexual offence)?",
            opts: ["An offence will only be committed if it can be shown that BERBA intended committing a relevant sexual offence in the tent.", "The tent is not a premises, therefore no offence is committed.", "The tent is a premises, therefore an offence is committed regardless of whether BERBA intended committing a relevant sexual offence in the tent.", "The tent is not a building, therefore the offence is not committed."],
            correct: 0,
            expCorrect: "The Sexual Offences Act 2003, s. 63 states:\n\n1) A person commits an offence if—\n(a) he is a trespasser on any premises,\n(b) he intends to commit a relevant sexual offence on the premises, and\n(c) he knows that, or is reckless as to whether, he is a trespasser.\nPremises will include a structure or part of a structure (including a tent, vehicle or vessel or other temporary or movable structure)—s. 63(2)—which is wider than the term ‘building’ used in the Theft Act offence of burglary. Answers B and D are incorrect. The defendant must intend to commit the relevant offence on the premises . Answer C is therefore incorrect.",
            expWrong: "The Sexual Offences Act 2003, s. 63 states:\n\n1) A person commits an offence if—\n(a) he is a trespasser on any premises,\n(b) he intends to commit a relevant sexual offence on the premises, and\n(c) he knows that, or is reckless as to whether, he is a trespasser.\nPremises will include a structure or part of a structure (including a tent, vehicle or vessel or other temporary or movable structure)—s. 63(2)—which is wider than the term ‘building’ used in the Theft Act offence of burglary. Answers B and D are incorrect. The defendant must intend to commit the relevant offence on the premises . Answer C is therefore incorrect."
        },
        {
            q: "HARRISON has recently had gender reassignment surgery where the penis was removed and replaced with a surgically constructed vagina. HARRISON attends a party and flirts with DARVEL, suggesting that the two of them should have sexual intercourse, to which DARVEL agrees. The two go to a bedroom and begin to have sexual intercourse (penis to surgically constructed vagina). Several minutes into the act, HARRISON feels sick and asks DARVEL to stop. DARVEL takes no notice of HARRISON and continues to have sexual intercourse with HARRISON for several minutes despite HARRISON’s protests. DARVEL then penetrates HARRISON’s anus with his penis against HARRISON’s wishes.\n\nWhich of the following statements is correct?",
            opts: ["A surgically constructed vagina would not be classed as part of the body for the purposes of rape.", "DARVEL commits rape when, after HARRISON asks him to stop, he continues to penetrate HARRISON’s surgically constructed vagina.", "No offence of rape is committed because HARRISON initially consented to sexual intercourse with DARVEL.", "DARVEL only commits rape when he penetrates HARRISON’s anus."],
            correct: 1,
            expCorrect: "Answer A is incorrect as s. 79(3) of the Act states that references to the body include references to a part surgically constructed (in particular, through gender reassignment surgery). Answer C is incorrect because although HARRISON initially agreed to sexual intercourse with DARVEL, s. 79(2) of the Act states that penetration is a continuing act from entry to withdrawal so that where a person consents at the time of entry to penetration, but then withdraws consent and the penetration continues, the person penetrating is guilty of rape. This section makes answer D incorrect, as the offence of rape is complete when HARRISON continues penetration of DARVEL’s vagina.",
            expWrong: "Answer A is incorrect as s. 79(3) of the Act states that references to the body include references to a part surgically constructed (in particular, through gender reassignment surgery). Answer C is incorrect because although HARRISON initially agreed to sexual intercourse with DARVEL, s. 79(2) of the Act states that penetration is a continuing act from entry to withdrawal so that where a person consents at the time of entry to penetration, but then withdraws consent and the penetration continues, the person penetrating is guilty of rape. This section makes answer D incorrect, as the offence of rape is complete when HARRISON continues penetration of DARVEL’s vagina."
        },
        {
            q: "CLEMENT (aged 17 years) is accompanying his parents on a visit to see his grandmother who is 72 years old and suffering from advanced senile dementia, leaving her bedridden as a resident in a mental care home. CLEMENT’s parents leave the room his grandmother is in leaving CLEMENT and his grandmother alone. CLEMENT deeply resents spending time visiting his grandmother and out of spite and maliciousness he takes out his penis and waves it in front of his grandmother’s face and then begins to masturbate in front of her saying, ‘You can’t do anything like this anymore, can you old bag!’ CLEMENT is fully aware of his grandmother’s condition and of the fact that she can do nothing about his behaviour.\n\nCLEMENT has not committed the offence under s. 32 of the Sexual Offences Act 2003 (sexual activity in the presence of a mentally disordered person) but why not?",
            opts: ["CLEMENT has not committed this offence as he did not engage in sexual activity with another person in the presence of his grandmother.", "CLEMENT has not committed the offence because he is under 18 years of age.", "CLEMENT has not committed the offence because no inducement was offered to his grandmother to watch the sexual act.", "CLEMENT has not committed the offence because he did not act for the purpose of obtaining sexual gratification."],
            correct: 3,
            expCorrect: "The sexual activity carried out must be for the purpose of obtaining sexual gratification—if it is for any other reason no offence under s. 32 is committed.",
            expWrong: "The sexual activity carried out must be for the purpose of obtaining sexual gratification—if it is for any other reason no offence under s. 32 is committed."
        },
        {
            q: "DUPONT approaches THOMPSON in the street. He shows her a photograph of her 3-year-old son and says, ‘Me and my mate have been watching you and your boy, my mate’s watching him now. Unless you do as I say, my mate will hurt your kid.’ THOMPSON believes that her son is in immediate danger and that DUPONT’s associate will harm him. DUPONT demands that THOMPSON follow him into a nearby alleyway where he puts his fingers into DUPONT’s vagina. DUPONT does not have a friend watching THOMPSON’s child, who is in no actual danger at the time of the act.\n\nHas DUPONT committed an offence of rape (contrary to s. 1 of the Sexual Offences Act 2003)?",
            opts: ["Yes, because at the time of the relevant act he has caused THOMPSON to believe that immediate violence will be used against another person.", "No, because he did not use violence against THOMPSON or cause her to believe that immediate violence would be used against her.", "Yes, because he has intentionally deceived THOMPSON into taking part in the relevant act.", "No, because intentionally penetrating THOMPSON’s vagina with his fingers is not the actus reus of rape."],
            correct: 3,
            expCorrect: "Although answer A is correct insofar as the consent obtained from THOMPSON is not true consent as it is obtained by threatening immediate violence against another person, the actus reus of rape is the penetration of the vagina, anus or mouth of another person with the penis, making this answer incorrect. Answer B is incorrect as had DUPONT used violence, this would still not be rape. The deception in rape must be as to the nature or purpose of the relevant act not the circumstances leading up to the act, making answer C incorrect.",
            expWrong: "Although answer A is correct insofar as the consent obtained from THOMPSON is not true consent as it is obtained by threatening immediate violence against another person, the actus reus of rape is the penetration of the vagina, anus or mouth of another person with the penis, making this answer incorrect. Answer B is incorrect as had DUPONT used violence, this would still not be rape. The deception in rape must be as to the nature or purpose of the relevant act not the circumstances leading up to the act, making answer C incorrect."
        },
        {
            q: "The Sexual Offences (Amendment) Act 1992 allows the victim anonymity in sexual offence cases.\n\nIn relation to this legislation, which of the following statements is correct regarding offences of sexual assault by touching?",
            opts: ["The victim is entitled to anonymity until the end of the trial or any appeal.", "The victim is entitled to anonymity indefinitely.", "The victim is entitled to anonymity throughout their lifetime.", "Anonymity does not apply to the offence of sexual assault by touching."],
            correct: 2,
            expCorrect: "Under the Sexual Offences (Amendment) Act 1992, victims of most sexual offences (including rape, assault by penetration and sexual assault by touching) are entitled to anonymity throughout their lifetime.",
            expWrong: "Under the Sexual Offences (Amendment) Act 1992, victims of most sexual offences (including rape, assault by penetration and sexual assault by touching) are entitled to anonymity throughout their lifetime."
        },
        {
            q: "WILDING (an adult female) is at a nightclub. BOLT (another adult female) is also in the nightclub and WILDING approaches her and speaks to her. BOLT is drinking soft drinks. WILDING intends to sexually assault BOLT (via penetration of her vagina) and over the course of a few drinks she orders several vodka drinks and puts them in BOLT’s soft drinks (without BOLT’s knowledge) to make her more receptive to her advances. However, BOLT has no reaction to the drink and leaves the nightclub two hours later.\n\nHas WILDING committed an offence under s. 61 of the Sexual Offences Act 2003 (administering a substance with intent)?",
            opts: ["Yes, the offence would be committed in these circumstances.", "No, as although she had the mens rea for the offence, the victim has to be stupefied for the offence to be complete.", "Yes, but only if she actually managed to carry out her intentions.", "No, even though the drink was tampered with without BOLT’s knowledge, alcohol is not classed as a substance."],
            correct: 0,
            expCorrect: "This offence does not require a result, making answer B incorrect (there is no need for the victim to be stupefied) and answer C incorrect (there is no need for a sexual act to actually be carried out against the victim). A ‘substance’ can be anything at all, including alcohol, making answer D incorrect.",
            expWrong: "This offence does not require a result, making answer B incorrect (there is no need for the victim to be stupefied) and answer C incorrect (there is no need for a sexual act to actually be carried out against the victim). A ‘substance’ can be anything at all, including alcohol, making answer D incorrect."
        },
        {
            q: "WRIGHT works with LAKER and during an office party he suggests to LAKER that they have sex together; LAKER refuses. This annoys WRIGHT and later on he follows LAKER into the female toilets. WRIGHT demands that LAKER talk with him in one of the toilet cubicles and, once inside, WRIGHT locks the door. WRIGHT demands to know why LAKER refused to have sex with him and when LAKER begins to cry, WRIGHT tells her he would be happy if she took part in oral sex with him. LAKER asks to be let out of the cubicle but WRIGHT refuses. LAKER realises that WRIGHT will not let her out, so agrees to have oral sex with him and allows WRIGHT to put his penis in her mouth.\n\nConsidering the offence of rape only (contrary to s. 1 of the Sexual Offences Act 2003), which of the following statements is correct?",
            opts: ["No offence of rape has been committed because LAKER consented to the act of oral sex.No offence of rape has been committed because LAKER consented to the act of oral sex.", "Rape can only be committed if WRIGHT penetrates the vagina or anus of LAKER.", "WRIGHT commits rape (the presumptions under s. 75 of the Sexual Offences Act 2003 would be relevant here as LAKER was unlawfully detained at the time of the relevant act).", "WRIGHT has not committed rape because he has not used violence or caused LAKER to believe immediate violence will be used against her."],
            correct: 2,
            expCorrect: "Rape can be committed if a male penetrates the vagina, anus or mouth of his victim, making answer B incorrect. Although the use of or threat to use violence would negate consent (s. 72(2)(a) and (b)), this is not the only way that a complainant can be deemed to have refused consent to the relevant act, making answer D incorrect. Consent will only be true consent if the person agrees by choice and has the freedom and capacity to make that choice. Under s. 75(2)(c) of the Act, the complainant is taken not to have consented to the relevant act if the complainant was, and the defendant was not, unlawfully detained at the time of the relevant act, making answer A incorrect.",
            expWrong: "Rape can be committed if a male penetrates the vagina, anus or mouth of his victim, making answer B incorrect. Although the use of or threat to use violence would negate consent (s. 72(2)(a) and (b)), this is not the only way that a complainant can be deemed to have refused consent to the relevant act, making answer D incorrect. Consent will only be true consent if the person agrees by choice and has the freedom and capacity to make that choice. Under s. 75(2)(c) of the Act, the complainant is taken not to have consented to the relevant act if the complainant was, and the defendant was not, unlawfully detained at the time of the relevant act, making answer A incorrect."
        },
        {
            q: "BANKS is an adult male and he falsely imprisons both WEST, an adult male, and CARTER, an adult female. BANKS has lured them to his house on the pretext that he is thinking of selling the property knowing that they are both interested in buying his house with their respective partners. BANKS locks all the doors to the property and produces a large sword. Both WEST and CARTER are very scared and, when he demands that they both remove their clothes, they do so. BANKS then tells WEST to put his penis into CARTER’s mouth and insert his fingers in her vagina. Initially, WEST refuses but after threats with the sword both WEST and CARTER submit to BANKS’s requests.\n\nConsidering only offences contrary to the Sexual Offences Act 2003, which of the statements below is correct with regards to the criminal responsibility of BANKS and WEST?",
            opts: ["BANKS commits an offence of causing sexual activity without consent and WEST commits two offences of rape.", "BANKS would be guilty of causing sexual activity without consent if it could be shown that it was for sexual gratification.", "BANKS commits the offence of causing sexual activity without consent.", "BANKS commits causing sexual activity without consent and WEST commits rape and assault by penetration."],
            correct: 2,
            expCorrect: "Section 4 of the Sexual Offences Act 2003 (causing sexual activity without consent) states:\n\n(1) A person (A) commits an offence if—\n(a) he intentionally causes another (B) to engage in an activity,\n(b) the activity is sexual,\n(c) B does not consent to engaging in the activity, and\n(d) A does not reasonably believe that B consents.\nThere is no need to prove sexual gratification so answer B is incorrect. Answers A and D are incorrect because WEST did not carry out the activities voluntarily (an essential element of attributing responsibility for criminal activity is that the actus reus of an offence was carried out voluntarily— it was not in these circumstances). Therefore C is the correct answer.",
            expWrong: "Section 4 of the Sexual Offences Act 2003 (causing sexual activity without consent) states:\n\n(1) A person (A) commits an offence if—\n(a) he intentionally causes another (B) to engage in an activity,\n(b) the activity is sexual,\n(c) B does not consent to engaging in the activity, and\n(d) A does not reasonably believe that B consents.\nThere is no need to prove sexual gratification so answer B is incorrect. Answers A and D are incorrect because WEST did not carry out the activities voluntarily (an essential element of attributing responsibility for criminal activity is that the actus reus of an offence was carried out voluntarily— it was not in these circumstances). Therefore C is the correct answer."
        },
        {
            q: "PARSON (aged 19 years) shares a two-bedroom flat with CLARK (aged 17 years). PARSON pays 70 per cent of the rent and other expenses because he earns more than CLARK (they are just flatmates). PARSON, however, believes this to be unjust and persuades CLARK that he needs some form of reward for paying the majority of the bills. PARSON persuades CLARK to masturbate him once a week as compensation; CLARK does not want to do this but complies. The owner of the flat puts up the rent and PARSON now decides that CLARK need not masturbate him anymore but will have to prostitute herself as she cannot pay any more towards the bills; she has no option but to agree to PARSON’s requests. A couple of times a week, CLARK performs sexual acts with other men for money.\n\nConsidering s. 4 of the Sexual Offences Act 2003 (causing a person to engage in sexual activity without consent), which of the statements below is correct?",
            opts: ["PARSON only commits this offence when he forces CLARK to masturbate him.", "PARSON does not commit any offences under s. 4 because CLARK is over the age of 16.", "PARSON commits this offence when he forces her to masturbate him and when he forces her to prostitute herself.", "PARSON only commits this offence when he forces her to prostitute herself."],
            correct: 2,
            expCorrect: "The Sexual Offences Act 2003, s. 4 states:\n\n(1) A person (A) commits an offence if—\n(a) he intentionally causes another person (B) to engage in an activity;\n(b) the activity is sexual;\n(c) B does not consent to the activity; and\n(d) A does not reasonably believe B consents.\nA s. 4 offence is committed when PARSON forces CLARK to masturbate him and forces her to prostitute herself. These are examples from the Keynote area of the Manual and show how important it is to familiarise yourself with the Keynote areas in your preparation for the exam.",
            expWrong: "The Sexual Offences Act 2003, s. 4 states:\n\n(1) A person (A) commits an offence if—\n(a) he intentionally causes another person (B) to engage in an activity;\n(b) the activity is sexual;\n(c) B does not consent to the activity; and\n(d) A does not reasonably believe B consents.\nA s. 4 offence is committed when PARSON forces CLARK to masturbate him and forces her to prostitute herself. These are examples from the Keynote area of the Manual and show how important it is to familiarise yourself with the Keynote areas in your preparation for the exam."
        },
        {
            q: "MATELIN was born a male but has had hormone treatment to create breasts and has had gender reassignment surgery to replace the penis with a surgically constructed vagina. While walking along a street, MATELIN is approached from behind by SUTTON who pushes MATELIN into a nearby alleyway. SUTTON digitally penetrates MATELIN’s surgically constructed vagina and then digitally penetrates MATELIN’s anus.\n\nDoes SUTTON commit an offence of assault by penetration (contrary to s. 2 of the Sexual Offences Act 2003)?",
            opts: ["Yes, but only when he digitally penetrates MATELIN’s anus.", "No, although the offence can be committed by either sex, the victim must be female.", "Yes, when he penetrates MATELIN’s surgically constructed vagina.", "No, this offence can only be committed when penetration is carried out with something other than a part of the body."],
            correct: 2,
            expCorrect: "The sex of the victim is immaterial, making answer B incorrect. Penetration can be committed with a part of the body or anything else, making answer D incorrect. Section 79(3) of the Act covers the fact that references to a part of the body (e.g. penis, vagina) will include references to a body part that has been surgically constructed, particularly if it is through gender reassignment. Therefore, the offence is committed when the surgically constructed vagina is penetrated by SUTTON.",
            expWrong: "The sex of the victim is immaterial, making answer B incorrect. Penetration can be committed with a part of the body or anything else, making answer D incorrect. Section 79(3) of the Act covers the fact that references to a part of the body (e.g. penis, vagina) will include references to a body part that has been surgically constructed, particularly if it is through gender reassignment. Therefore, the offence is committed when the surgically constructed vagina is penetrated by SUTTON."
        },
        {
            q: "Under s. 25 of the Sexual Offences Act 2003 (sexual activity with a child family member), the prosecution will have to prove that the defendant ‘touched’ the victim and that the touching was ‘sexual’. However, other evidence must be proved in order for a defendant to be found guilty of such an offence.\n\nWhich of the following is correct with regard to the other evidence?",
            opts: ["The age of the victim must be proved and the defendant will have an evidential burden to discharge in that regard.", "The existence of the relevant family relationship between the defendant and the victim and the age of the victim must be proved and the defendant will have an evidential burden to discharge in that regard.", "The existence of the relevant family relationship between the defendant and the victim must be proved and the prosecution will have an evidential burden to discharge in that regard.", "The age of the victim must be proved and the prosecution will have an evidential burden to discharge in that regard."],
            correct: 1,
            expCorrect: "Apart from ‘touching’ and ‘sexual’, there are two further elements that must be proved in relation to s. 25 of the Act. The first is the existence of the relevant family relationship and the second is the age of the victim (making answers A, C and D incorrect). In addition, answers C and D are incorrect in respect of both the relationship and the age of the victim; the defendant will have an evidential burden to discharge in that regard (s. 25(2) and (3)).",
            expWrong: "Apart from ‘touching’ and ‘sexual’, there are two further elements that must be proved in relation to s. 25 of the Act. The first is the existence of the relevant family relationship and the second is the age of the victim (making answers A, C and D incorrect). In addition, answers C and D are incorrect in respect of both the relationship and the age of the victim; the defendant will have an evidential burden to discharge in that regard (s. 25(2) and (3))."
        },
        {
            q: "LANDEN (aged 20 years) approaches EIFION (aged 12 years) in a park. LANDEN persuades EIFION to accompany him back to his house, where LANDEN plays a DVD to EIFION that contains animated cartoon images of sexual activity. LANDEN obtains sexual gratification from this activity.\n\nHas LANDEN committed an offence under s. 12 of the Sexual Offences Act 2003 (causing a child to watch a sexual act)?",
            opts: ["Yes, the images that EIFION sees can be images of imaginary persons so an animated cartoon image would be covered by the offence.", "No, the sexual act must be performed by LANDEN.", "Yes, but only because EIFION is under 13 years of age; if he were over 13, then the offence would not be committed.", "No, the image must be that of a ‘person’ engaged in sexual activity and not of a cartoon."],
            correct: 0,
            expCorrect: "This offence relates to causing a child to watch a third person engage in sexual activity or to look at an image of any person engaging in an activity. Answer B is incorrect on that basis. Answer C is incorrect because the offence can be committed against a child aged under 16 years of age. Answer D is incorrect as s. 79(5) of the Act states that an ‘image’ includes images of an imaginary person and, as such, animated cartoon images would be covered by the legislation.",
            expWrong: "This offence relates to causing a child to watch a third person engage in sexual activity or to look at an image of any person engaging in an activity. Answer B is incorrect on that basis. Answer C is incorrect because the offence can be committed against a child aged under 16 years of age. Answer D is incorrect as s. 79(5) of the Act states that an ‘image’ includes images of an imaginary person and, as such, animated cartoon images would be covered by the legislation."
        },
        {
            q: "BURRELL was found with an image on his computer of a woman and a dead horse. The woman had the horse’s penis in her mouth.\n\nConsidering s. 63 of the Criminal Justice and Immigration Act (possession of extreme pornographic images), which of the following is correct?",
            opts: ["This would be an offence if the ‘reasonable person’ looking at the image would think it was grossly offensive.", "This would be an offence provided it was produced solely or principally for the purpose of sexual arousal.", "This would not be an offence as the animal was dead at the time the photograph was taken.", "This would not be an offence as the animal was dead at the time the photograph was taken, and the ‘reasonable person’ looking at the image would think that the animal was dead."],
            correct: 1,
            expCorrect: "Section 63 of the Criminal Justice and Immigration Act 2008 states:\n\n(1) It is an offence for a person to be in possession of an extreme pornographic image.\nThere are three elements to the offence. An image must come within the terms of all three elements before it will fall foul of the offence. Those elements are:\n\n• that the image is pornographic;\n• that the image is grossly offensive, disgusting or otherwise of an obscene character; and\n• that the image portrays in an explicit and realistic way, one of the following extreme acts:\n– an act which threatens a person’s life (this could include depictions of hanging, suffocation or sexual assault involving a threat with a weapon);\n– an act which results in or is likely to result in serious injury to a person’s anus, breasts or genitals (this could include the insertion of sharp objects or the mutilation of the breasts or genitals);\n– an act involving sexual interference with a human corpse (necrophilia);\n– a person performing an act of intercourse or oral sex with an animal (whether dead or alive) (bestiality);\n– an act which involves the non-consensual penetration of a person’s vagina, anus or mouth by another with the other person’s penis;\n– an act which involves the non-consensual sexual penetration of a person’s vagina or anus by another with a part of the other person’s body or anything else;\n• and a reasonable person looking at the image would think that the people and animals portrayed were real.\nAll three elements must be covered. It makes no difference whether the animal is alive or dead; answers C and D are therefore incorrect. The ‘reasonable person’ test does not apply to the image, it will be grossly offensive by design; answer A is therefore incorrect. An ‘extreme pornographic image’ is an image which is both pornographic and an extreme image. An image is ‘pornographic’ if it is of such a nature that it must reasonably be assumed to have been produced solely or principally for the purpose of sexual arousal.",
            expWrong: "Section 63 of the Criminal Justice and Immigration Act 2008 states:\n\n(1) It is an offence for a person to be in possession of an extreme pornographic image.\nThere are three elements to the offence. An image must come within the terms of all three elements before it will fall foul of the offence. Those elements are:\n\n• that the image is pornographic;\n• that the image is grossly offensive, disgusting or otherwise of an obscene character; and\n• that the image portrays in an explicit and realistic way, one of the following extreme acts:\n– an act which threatens a person’s life (this could include depictions of hanging, suffocation or sexual assault involving a threat with a weapon);\n– an act which results in or is likely to result in serious injury to a person’s anus, breasts or genitals (this could include the insertion of sharp objects or the mutilation of the breasts or genitals);\n– an act involving sexual interference with a human corpse (necrophilia);\n– a person performing an act of intercourse or oral sex with an animal (whether dead or alive) (bestiality);\n– an act which involves the non-consensual penetration of a person’s vagina, anus or mouth by another with the other person’s penis;\n– an act which involves the non-consensual sexual penetration of a person’s vagina or anus by another with a part of the other person’s body or anything else;\n• and a reasonable person looking at the image would think that the people and animals portrayed were real.\nAll three elements must be covered. It makes no difference whether the animal is alive or dead; answers C and D are therefore incorrect. The ‘reasonable person’ test does not apply to the image, it will be grossly offensive by design; answer A is therefore incorrect. An ‘extreme pornographic image’ is an image which is both pornographic and an extreme image. An image is ‘pornographic’ if it is of such a nature that it must reasonably be assumed to have been produced solely or principally for the purpose of sexual arousal."
        },
        {
            q: "HARRIS and MAY met on an online chat room on a game that they both play. They chatted for a few months before MAY suggested that they exchange phone numbers and talk properly. HARRIS agreed. They spoke to each other and started to build a friendship which turned into a long-distance relationship. This continued for two years until they agreed to meet – throughout the online relationship, MAY (a female) represented to HARRIS that she is male, heterosexual and attracted to men. When MAY meets HARRIS she hides her gender. She wears a self-made device which she has fashioned from a dildo, to give the appearance of being male should HARRIS attempt to intimately touch her. They become sexually active and MAY penetrates HARRIS’s vagina with her fingers. Subsequently HARRIS discovers that MAY is in fact female.\n\nWhich of the following statements is correct in relation to this incident and the law regarding consenting to sexual activity?",
            opts: ["HARRIS has not been deceived in relation to the act and therefore consent is true consent.HARRIS has not been deceived in relation to the act and therefore consent is true consent.", "HARRIS has consented to sexual activity (a person cannot be deceived as to gender).", "HARRIS has been deceived and therefore the consent is negated.", "MAY has not commit any offence in relation to the penetration with her fingers, but would have should she penetrated HARRIS with the dildo."],
            correct: 2,
            expCorrect: "This scenario is similar to the facts in the case of McNally v R [2013] EWCA Crim 1051 McNally was concerned with the material deception of B by A. The unusual facts considered by the court involved the relationship between two girls which, over three years, developed from an internet relationship to an ‘exclusive romantic relationship’ that involved their meeting and engaging in sexual activity. From the start, A presented herself to B as a boy, a deception she maintained throughout their relationship. Examining the nature of ‘choice’ and ‘freedom’, the court determined that ‘deception as to gender can vitiate consent’. The court’s reasoning is that while, in a physical sense, the acts of assault by penetration of the vagina are the same whether perpetrated by a male or a female, the sexual nature of the acts is, on any common-sense view, different where the complainant is deliberately deceived by a defendant into believing the latter is male. Assuming the facts to be proved as alleged, B chose to have sexual encounters with a boy and her preference (her freedom to choose whether or not to have a sexual encounter with a girl) was removed by A’s deception. This means that the correct answer is C. It is irrelevant what the victim was penetrated with, her consent is still not valid (making D incorrect) She was not deceived as to the act, but this still negated her consent, and shows that a person can be deceived by gender making both A and B incorrect.",
            expWrong: "This scenario is similar to the facts in the case of McNally v R [2013] EWCA Crim 1051 McNally was concerned with the material deception of B by A. The unusual facts considered by the court involved the relationship between two girls which, over three years, developed from an internet relationship to an ‘exclusive romantic relationship’ that involved their meeting and engaging in sexual activity. From the start, A presented herself to B as a boy, a deception she maintained throughout their relationship. Examining the nature of ‘choice’ and ‘freedom’, the court determined that ‘deception as to gender can vitiate consent’. The court’s reasoning is that while, in a physical sense, the acts of assault by penetration of the vagina are the same whether perpetrated by a male or a female, the sexual nature of the acts is, on any common-sense view, different where the complainant is deliberately deceived by a defendant into believing the latter is male. Assuming the facts to be proved as alleged, B chose to have sexual encounters with a boy and her preference (her freedom to choose whether or not to have a sexual encounter with a girl) was removed by A’s deception. This means that the correct answer is C. It is irrelevant what the victim was penetrated with, her consent is still not valid (making D incorrect) She was not deceived as to the act, but this still negated her consent, and shows that a person can be deceived by gender making both A and B incorrect."
        },
        {
            q: "HAYMAN (aged 16 years) and NICHOLL (aged 13 years) are in a park when they are approached by EAMES (aged 30 years). EAMES tells them that he has just had his bike stolen and asks them if they will help him to look for it. This is not true as EAMES’s real motive is to attack the boys and sexually assault them at the first opportunity. Both boys willingly agree to EAMES’s request and walk towards some nearby bushes where EAMES claims that he left the bike. After walking some 30 metres with EAMES, the boys have second thoughts and run off.\n\nHas EAMES committed an offence of child abduction (contrary to s. 2 of the Child Abduction Act 1984)?",
            opts: ["Yes, but only in relation to NICHOLL.", "No, because both HAYMAN and NICHOLL consented to go with EAMES.", "Yes, both HAYMAN and NICHOLL are covered by the legislation.", "No, neither of the boys has been removed from the lawful control of any person."],
            correct: 0,
            expCorrect: "The legislation covers children under the age of 16 years, making answer C incorrect. The fact that the boys consented to go with EAMES is irrelevant, making answer B incorrect. The Act talks about the taking or detaining of a child and this includes keeping a child where they are found or inducing the child to remain with the defendant or another person. Effectively, this taking or keeping is complete when the defendant substitutes his/her authority or will for that of the person in lawful control of the child and in this example the substitution takes place when EAMES walks with the boys towards the bushes ( R v Leather (1993) 98 Cr App R 179). Therefore, answer D is incorrect.",
            expWrong: "The legislation covers children under the age of 16 years, making answer C incorrect. The fact that the boys consented to go with EAMES is irrelevant, making answer B incorrect. The Act talks about the taking or detaining of a child and this includes keeping a child where they are found or inducing the child to remain with the defendant or another person. Effectively, this taking or keeping is complete when the defendant substitutes his/her authority or will for that of the person in lawful control of the child and in this example the substitution takes place when EAMES walks with the boys towards the bushes ( R v Leather (1993) 98 Cr App R 179). Therefore, answer D is incorrect."
        },
        {
            q: "DC HAMBLING has taken JEPHCOTT into ‘Police Protection’ (under s. 46 of the Children Act 1989).\n\nWhat is the maximum period that JEPHCOTT can spend in ‘Police Protection’?",
            opts: ["24 hours", "48 hours", "72 hours", "96 hours"],
            correct: 2,
            expCorrect: "The longest period that a child can spend in ‘Police Protection’ is 72 hours (s. 46(6)).",
            expWrong: "The longest period that a child can spend in ‘Police Protection’ is 72 hours (s. 46(6))."
        },
        {
            q: "MILBURN (aged 13 years) is subject to an emergency protection order and is in the care of his social worker, PRINCE. MILBURN’s stepfather, HOLT, rings MILBURN on his mobile phone and tells him that life would be far better for him if he ran away from PRINCE’s care and came back to his family. HOLT tells MILBURN that if he does run away from PRINCE he will take him to Disneyland in Florida.\n\nHas HOLT committed an offence of acting in contravention of a protection order (contrary to s. 49 of the Children Act 1989)?",
            opts: ["Yes, he has induced and incited MILBURN to run away from a responsible person.", "No, this offence can only be committed by taking MILBURN away from the responsible person.", "Yes, but only if MILBURN actually runs away from the responsible person.", "No, this offence relates to children who are in care or in police protection and not to those subject to an emergency protection order."],
            correct: 0,
            expCorrect: "Answer D is incorrect as s. 49(2) states that this offence applies to a child who is in care, subject of an emergency protection order or in police protection (s. 46). A ‘responsible person’ is any person who at the time has care of the child by virtue of a care order, an emergency protection order or by s. 46 of the Act, i.e. PRINCE. The offence can be committed by (a) taking a child to whom this section applies away from a responsible person, or (b) keeping such a child away from a responsible person or (c) inducing, assisting or inciting such a child to run away from or stay away from the responsible person. Therefore, answers B and C are incorrect.",
            expWrong: "Answer D is incorrect as s. 49(2) states that this offence applies to a child who is in care, subject of an emergency protection order or in police protection (s. 46). A ‘responsible person’ is any person who at the time has care of the child by virtue of a care order, an emergency protection order or by s. 46 of the Act, i.e. PRINCE. The offence can be committed by (a) taking a child to whom this section applies away from a responsible person, or (b) keeping such a child away from a responsible person or (c) inducing, assisting or inciting such a child to run away from or stay away from the responsible person. Therefore, answers B and C are incorrect."
        },
        {
            q: "JUDSON leaves FOXLEY, her common law husband, after their relationship breaks down and takes their 3-year-old child with her. FOXLEY contacts DC BANHAM and reports the child’s absence. DC BANHAM later locates JUDSON, who is staying in a women’s refuge with her 3-year-old child. At the request of JUDSON, DC BANHAM tells FOXLEY that the child is safe but refuses to tell him where the child is. FOXLEY hires a solicitor and ex parte (i.e. without telling the police) applies for an order from the County Court under s. 33 of the Family Law Act 1986, requiring the police to disclose the information.\n\nConsidering the law with regard to the disclosure of a child’s whereabouts, which of the following statements is correct?",
            opts: ["If FOXLEY obtains such an order then DC BANHAM will have to provide him with details of the child’s whereabouts.", "An order under s. 33 in respect of the police will be made without their presence ( ex parte ) in all cases.", "If FOXLEY’s application is successful then DC BANHAM will have to tell FOXLEY’s solicitor of the child’s whereabouts.", "It has been held that only in exceptional circumstances will the police be asked to divulge the whereabouts of a child under a s. 33 order."],
            correct: 3,
            expCorrect: "This question relates to the circumstances in S v S (Chief Constable of West Yorkshire Intervening) [1998] 1 WLR 1716. In this case, Butler-Sloss LJ stated that an order under s. 33 provides for the information to be disclosed to the court and not to any other party or his/her solicitor, making answers A and C incorrect. She also stated that an order made under s. 33 should not normally be made in respect of the police without their being present, making answer B incorrect.",
            expWrong: "This question relates to the circumstances in S v S (Chief Constable of West Yorkshire Intervening) [1998] 1 WLR 1716. In this case, Butler-Sloss LJ stated that an order under s. 33 provides for the information to be disclosed to the court and not to any other party or his/her solicitor, making answers A and C incorrect. She also stated that an order made under s. 33 should not normally be made in respect of the police without their being present, making answer B incorrect."
        },
        {
            q: "DC WELL receives information that PORT has physically abused her children and visits PORT, who lets the officer into her house. DC WELL speaks to JANE PORT (aged 16 years) and ALEX PORT (aged 12 years). JANE PORT has several cuts and bruises to her face; ALEX PORT shows no signs of being physically abused. JANE PORT tells the officer that her mother is responsible for her injuries and that this is not the first time she has been assaulted by her. ALEX PORT tells the officer that he has heard his mother beating his sister and it frightens him and he cannot eat as a result. Because of what he has seen and heard, DC WELL is considering taking both children into ‘Police Protection’ (under s. 46 of the Children Act 1989).\n\nWhich of the following statements is correct?",
            opts: ["DC WELL can take ALEX PORT into ‘Police Protection’ but cannot take JANE PORT into ‘Police Protection’ because she is not a ‘child’ for the purposes of the Act.", "DC WELL can take JANE PORT into ‘Police Protection’ if he has reasonable cause to believe that she will suffer significant harm and ALEX PORT because of any impairment he may suffer from hearing his sister being ill-treated.", "DC WELL can take JANE PORT into ‘Police Protection’ but cannot take ALEX PORT into ‘Police Protection’ because he has not suffered any physical abuse.", "DC WELL cannot take either of the children into police protection in these circumstances."],
            correct: 1,
            expCorrect: "Section 46 of the Act states that where a constable has reasonable cause to believe that a child would otherwise be likely to suffer significant harm, he may remove the child to suitable accommodation. Answer A is incorrect as a ‘child’ is someone who is under 18 years old (s. 105). Answer C is incorrect as the definition of ‘harm’ is very broad and includes forms of ill-treatment that are not ‘physical’. It also covers the impairment of health (physical or mental) and also physical, intellectual, emotional, social or behavioural development. The definition also extends to impairment suffered from seeing or hearing the ill-treatment of any other person . Answer D is incorrect for these reasons.",
            expWrong: "Section 46 of the Act states that where a constable has reasonable cause to believe that a child would otherwise be likely to suffer significant harm, he may remove the child to suitable accommodation. Answer A is incorrect as a ‘child’ is someone who is under 18 years old (s. 105). Answer C is incorrect as the definition of ‘harm’ is very broad and includes forms of ill-treatment that are not ‘physical’. It also covers the impairment of health (physical or mental) and also physical, intellectual, emotional, social or behavioural development. The definition also extends to impairment suffered from seeing or hearing the ill-treatment of any other person . Answer D is incorrect for these reasons."
        },
        {
            q: "HILL has separated from his common-law wife, YEO. There is a 15-year-old child by this relationship and the two have an informal understanding that HILL will have the child at weekends and YEO will have the child during the week. On Tuesday afternoon, YEO comes to your police station to report an offence of child abduction. She tells you that she has received a telephone call from HILL telling her that he has taken the child to Germany and will not be back for two more weeks. HILL stated that he had attempted to contact YEO but had been unable to communicate with her. YEO wants HILL arrested and charged with the offence of child abduction (contrary to s. 1 of the Child Abduction Act 1984).\n\nWhat will you tell her?",
            opts: ["HILL has not committed an offence under this legislation as it only applies to a child under the age of 14.", "HILL has committed the offence but he may be able to avail himself of a defence to the charge in these circumstances.", "HILL has not committed the offence as the child has been taken out of the United Kingdom for less than one month.", "HILL has committed the offence but the consent of the Attorney General is required before a charge of child abduction is brought."],
            correct: 1,
            expCorrect: "This legislation applies to children under the age of 16, making answer A incorrect. A person would not commit an offence if they took a child out of the United Kingdom for less than a month and they are a person in whose favour there is a residence order in force with respect to the child. In this case there is an informal arrangement, making answer C incorrect. Although HILL commits the offence, it is the consent of the Director of Public Prosecutions that is required before bringing a charge under this legislation. HILL may be able to avail himself of the defence under s. 1(5)(b) of the Act, i.e. that he has taken all reasonable steps to communicate with YEO but has been unable to communicate with her.",
            expWrong: "This legislation applies to children under the age of 16, making answer A incorrect. A person would not commit an offence if they took a child out of the United Kingdom for less than a month and they are a person in whose favour there is a residence order in force with respect to the child. In this case there is an informal arrangement, making answer C incorrect. Although HILL commits the offence, it is the consent of the Director of Public Prosecutions that is required before bringing a charge under this legislation. HILL may be able to avail himself of the defence under s. 1(5)(b) of the Act, i.e. that he has taken all reasonable steps to communicate with YEO but has been unable to communicate with her."
        },
        {
            q: "POTTS and OLDFIELD lived together as common-law husband and wife but the relationship has ended. There were two children by this relationship, ANN (aged 12 years) and MARTIN (aged 16 years). Both children now live with their mother (OLDFIELD), who has lawful custody of the children. One evening, POTTS visits his children. While OLDFIELD goes out shopping, POTTS persuades the two children to go on holiday with him to Spain for two weeks. The children agree and all three leave for Spain without the consent of OLDFIELD.\n\nWould this constitute an offence of child abduction (contrary to s. 1 of the Child Abduction Act 1984)?",
            opts: ["No, as POTTS has taken the children outside the United Kingdom for less than one month.", "Yes, but only in relation to ANN.", "No, because POTTS is the father of both children.", "Yes, in relation to ANN and MARTIN."],
            correct: 1,
            expCorrect: "This offence can be committed by any person listed under s. 1(2) of the Act who is connected to the child/children. The Act states that a person is connected with a child (at s. 1(2)(b)) in the case of a child whose parents were not married to each other at the time of his/her birth, if there are reasonable grounds for believing that he is the father of the child, i.e. POTTS. However, just because POTTS is the father of the children does not afford him immunity from this offence, making answer C incorrect. The offence can only be committed in relation to a child under the age of 16 so it cannot be committed in relation to MARTIN, making answer D incorrect. The fact that POTTS has taken the children outside the United Kingdom for less than one month is immaterial. The time factor is only relevant if there is a residence order in existence in favour of POTTS (and there is not); what is relevant is that POTTS has taken ANN outside the United Kingdom without the consent of OLDFIELD, making answer A incorrect.",
            expWrong: "This offence can be committed by any person listed under s. 1(2) of the Act who is connected to the child/children. The Act states that a person is connected with a child (at s. 1(2)(b)) in the case of a child whose parents were not married to each other at the time of his/her birth, if there are reasonable grounds for believing that he is the father of the child, i.e. POTTS. However, just because POTTS is the father of the children does not afford him immunity from this offence, making answer C incorrect. The offence can only be committed in relation to a child under the age of 16 so it cannot be committed in relation to MARTIN, making answer D incorrect. The fact that POTTS has taken the children outside the United Kingdom for less than one month is immaterial. The time factor is only relevant if there is a residence order in existence in favour of POTTS (and there is not); what is relevant is that POTTS has taken ANN outside the United Kingdom without the consent of OLDFIELD, making answer A incorrect."
        },
        {
            q: "LATIMER has been in an abusive relationship and has left home taking her child with her and has gone into a refuge. Her partner has reported the child missing and the police have traced LATIMER to the refuge. She states that for fear of her safety she does not want to tell her partner where she and the child are.\n\nWhat should the police tell her?",
            opts: ["That due to concerns about her safety it is unlikely they would have to divulge her location.", "That due to concerns about her safety they guarantee they would not have to divulge her location.", "Even with concerns as to her safety, her partner could apply for a court order that would mean they would have to divulge her location to him.", "Even with concerns as to her safety, her partner could apply for a court order that would mean they would have to divulge her location to him or his solicitor."],
            correct: 0,
            expCorrect: "Where a child is reported missing, problems can arise once the child is discovered to be safe and well but one of the parents wants the police to disclose the whereabouts of the child. This situation arose in S v S (Chief Constable of West Yorkshire Police Intervening) [1998] 1 WLR 1716 and the Court of Appeal provided some clarification of the issues. The court stated that the police are not in a position to give ‘categoric assurances’ of confidentiality to those who provide information as to the whereabouts of a child. The most they could say is that, other than by removing the child, it would be most unlikely that they would have to disclose the information concerning the child’s whereabouts; answer B is therefore incorrect. Any court order provides for the information to be disclosed to the court not to the other party or his/her solicitor; answers C and D are therefore incorrect.",
            expWrong: "Where a child is reported missing, problems can arise once the child is discovered to be safe and well but one of the parents wants the police to disclose the whereabouts of the child. This situation arose in S v S (Chief Constable of West Yorkshire Police Intervening) [1998] 1 WLR 1716 and the Court of Appeal provided some clarification of the issues. The court stated that the police are not in a position to give ‘categoric assurances’ of confidentiality to those who provide information as to the whereabouts of a child. The most they could say is that, other than by removing the child, it would be most unlikely that they would have to disclose the information concerning the child’s whereabouts; answer B is therefore incorrect. Any court order provides for the information to be disclosed to the court not to the other party or his/her solicitor; answers C and D are therefore incorrect."
        },
        {
            q: "PRINCE is the divorced father of three children aged 16, 14 and 12. He takes them on a skiing holiday to France for a week with the consent of his wife, and at the end of that time he calls her to say he will not be returning the children to her as he is going to settle in France with them.\n\nConsidering the offence under s. 1 of the Child Abduction Act 1984 (abduction by person connected with a child) only, which of the following statements is correct?",
            opts: ["PRINCE commits the offence in relation to all three children and has no defence.", "PRINCE commits the offence in relation to the two younger children and has no defence.", "PRINCE commits the offence but would have a defence as he is out of the UK for a period of less than one month.", "PRINCE does not commit this offence at all in these circumstances."],
            correct: 3,
            expCorrect: "Section 1 of the Child Abduction Act 1984 states:\n\n(1) Subject to subsections (5) and (8) below, a person connected with a child under the age of 16 commits an offence if he takes or sends the child out of the United Kingdom without the appropriate consent.\nSo the offence itself only relates to children under 16; for that reason alone answer A is incorrect. The offence can only be committed by a person ‘connected with’ the child and this is defined in s. 1(2) of the Child Abduction Act 1984, which would include the children’s father. Such a person must either take, or be responsible for sending, the child out of the UK him/herself. This offence is not committed by holding the child within the jurisdiction or where the child is lawfully taken out the country and return is then refused; answers A, B and C are therefore incorrect. Had the father taken the children to France without the consent of the mother, then the offence may have been committed. This would have led to the various defences kicking in, one of which is that the child is out of the UK for a period of less than one month. However, as the offence was not committed, no defence is necessary.",
            expWrong: "Section 1 of the Child Abduction Act 1984 states:\n\n(1) Subject to subsections (5) and (8) below, a person connected with a child under the age of 16 commits an offence if he takes or sends the child out of the United Kingdom without the appropriate consent.\nSo the offence itself only relates to children under 16; for that reason alone answer A is incorrect. The offence can only be committed by a person ‘connected with’ the child and this is defined in s. 1(2) of the Child Abduction Act 1984, which would include the children’s father. Such a person must either take, or be responsible for sending, the child out of the UK him/herself. This offence is not committed by holding the child within the jurisdiction or where the child is lawfully taken out the country and return is then refused; answers A, B and C are therefore incorrect. Had the father taken the children to France without the consent of the mother, then the offence may have been committed. This would have led to the various defences kicking in, one of which is that the child is out of the UK for a period of less than one month. However, as the offence was not committed, no defence is necessary."
        },
        {
            q: "MURTY, aged 16, was a single parent, her baby was 18 months old. One winter, the baby developed a severe case of influenza, which resulted in hypothermia. Eventually the baby died. The baby had been ill for some time, and MURTY had not taken her to the doctor. MURTY was arrested for the offence of child cruelty (contrary to s. 1 of the Children and Young Persons Act 1933) when she reported the death to the police.\n\nWhat, if anything, would the prosecution have to prove in order to convict MURTY of this offence?",
            opts: ["That her actions in denying medical care were wilful.", "That she was reckless in denying medical care to the child.", "That she intended to deny medical care to the child.", "Nothing, MURTY is 16 years old and therefore below the age of those to which this offence applies, i.e. over 16 years of age."],
            correct: 0,
            expCorrect: "Section 1 of the Children and Young Persons Act 1933 states:\n\n(1) If any person who has attained the age of 16 years and has responsibility for any child or young person under that age, wilfully assaults, ill-treats (whether physically or otherwise), neglects, abandons, or exposes him, or causes or procures him to be assaulted, ill-treated (whether physically or otherwise), neglected, abandoned, or exposed, in a manner likely to cause him unnecessary suffering or injury to health (whether the suffering or injury is of a physical or a psychological nature), that person shall be guilty of a misdemeanour.\nIf a parent or other person legally liable to maintain the child or young person, or a guardian, has failed to provide adequate food, clothing, medical aid or lodging for the child or young person, they will be deemed to have neglected the child or young person for these purposes (see s. 1(2)). As MURTY has reached the age of 16 she can commit this offence; answer D is therefore incorrect. The prosecution must prove that this was wilful (not reckless or intentional, which is why answers B and C are incorrect).",
            expWrong: "Section 1 of the Children and Young Persons Act 1933 states:\n\n(1) If any person who has attained the age of 16 years and has responsibility for any child or young person under that age, wilfully assaults, ill-treats (whether physically or otherwise), neglects, abandons, or exposes him, or causes or procures him to be assaulted, ill-treated (whether physically or otherwise), neglected, abandoned, or exposed, in a manner likely to cause him unnecessary suffering or injury to health (whether the suffering or injury is of a physical or a psychological nature), that person shall be guilty of a misdemeanour.\nIf a parent or other person legally liable to maintain the child or young person, or a guardian, has failed to provide adequate food, clothing, medical aid or lodging for the child or young person, they will be deemed to have neglected the child or young person for these purposes (see s. 1(2)). As MURTY has reached the age of 16 she can commit this offence; answer D is therefore incorrect. The prosecution must prove that this was wilful (not reckless or intentional, which is why answers B and C are incorrect)."
        },
        {
            q: "CARMEN approaches GREEN who is sitting in the cab of his HGV. The HGV load is several hundred thousand pounds of cigarettes. CARMEN opens the passenger door and gets into the vehicle. He tells GREEN to hand over the keys to the vehicle or ‘the next time I see you I will shoot you’. GREEN refuses to do so. CARMEN then produces a photograph of GREEN’s wife and tells GREEN that unless he hands the keys to the HGV over to him, GREEN’s wife will be beaten up. GREEN does not believe CARMEN and refuses. CARMEN produces a mobile phone which shows live pictures of GREEN’s living room (a hundred miles away from GREEN’s present location). GREEN can see that his wife is in the process of being assaulted by CARMEN’s associate. CARMEN once again demands the keys and tells GREEN the assault will continue if he does not give in. At this point GREEN hands over the keys and gets out of the cab of the HGV. CARMEN drives off with the load of cigarettes.\n\nAt what point, if at all, is an offence in respect of robbery (contrary to s. 8 of the Theft Act 1968) actually committed?",
            opts: ["When CARMEN threatens to shoot GREEN the next time he sees him.", "When CARMEN threatens GREEN’s wife.", "When CARMEN shows GREEN pictures of his wife being assaulted.", "When CARMEN drives off with the load of cigarettes."],
            correct: 3,
            expCorrect: "A robbery is committed when a person steals and immediately before or at the time of doing so, and in order to do so, uses force on any person or puts or seeks to put any person in fear of being then and there subjected to force. For the full offence to be committed there must be a theft and until that takes place there is no robbery.",
            expWrong: "A robbery is committed when a person steals and immediately before or at the time of doing so, and in order to do so, uses force on any person or puts or seeks to put any person in fear of being then and there subjected to force. For the full offence to be committed there must be a theft and until that takes place there is no robbery."
        },
        {
            q: "RULE and HOQUE intend to steal from O’HALLORAN’s house. The two men go to the back garden of the house where RULE smashes a window to the kitchen. He makes so much noise that O’HALLORAN comes outside and challenges the two men. HOQUE instantly picks up a piece of wood from the back garden and starts to hit O’HALLORAN on the head with it, intending to cause grievous bodily harm to him. O’HALLORAN runs away from the house, followed by HOQUE who is still hitting him with the piece of wood. RULE climbs into the kitchen and steals cash from the house.\n\nHave RULE and HOQUE committed an offence of aggravated burglary?",
            opts: ["Yes, both men commit the offence as a piece of wood can be a weapon of offence and its use in these circumstances has enabled entry to the premises.", "No, the piece of wood can never be an offensive weapon for the purposes of aggravated burglary.", "Yes, but only HOQUE commits the offence as he intends to cause O’HALLORAN grievous bodily harm.", "No, when the burglary is committed nobody actually enters the premises with a weapon of offence."],
            correct: 3,
            expCorrect: "The inclusion of an article intended by a person to cause injury or incapacitate within the definition of a weapon of offence means that absolutely anything can instantaneously become a weapon of offence in the hands of the burglar, making answer B incorrect. This is a burglary under s. 9(1)(a) of the Theft Act 1968 and so to become an aggravated burglary the weapon of offence must be with the offender at the time of entry. This is not the case. The fact that entry has been gained because of the use of the piece of wood against O’HALLORAN is irrelevant; RULE is the only person entering the premises and he does not have any weapon at the time of entry, making answer A incorrect. HOQUE does not commit the offence as he never enters the premises, therefore answer C is incorrect.",
            expWrong: "The inclusion of an article intended by a person to cause injury or incapacitate within the definition of a weapon of offence means that absolutely anything can instantaneously become a weapon of offence in the hands of the burglar, making answer B incorrect. This is a burglary under s. 9(1)(a) of the Theft Act 1968 and so to become an aggravated burglary the weapon of offence must be with the offender at the time of entry. This is not the case. The fact that entry has been gained because of the use of the piece of wood against O’HALLORAN is irrelevant; RULE is the only person entering the premises and he does not have any weapon at the time of entry, making answer A incorrect. HOQUE does not commit the offence as he never enters the premises, therefore answer C is incorrect."
        },
        {
            q: "McDOUGAL was walking past a post office, when he saw an elderly woman coming out. McDOUGAL deliberately bumped into the lady using enough force to knock her off-balance and stole her purse. Realising what had happened the woman shouted ‘help’. McDOUGAL turned round and punched her in the face knocking her to the ground. He dropped the purse and ran off.\n\nWhen, if at all, does McDOUGAL first commit the offence of robbery?",
            opts: ["When he bumps into her and steals the purse.", "When he uses force by punching her to the face.", "He does not commit robbery as he dropped the purse; no theft has been committed.", "He does not commit robbery as at the time of the theft no actual violence was used, only a ‘bump’ to knock her off-balance."],
            correct: 0,
            expCorrect: "To commit robbery, a person must steal and, immediately before or at the time of doing so and in order to do so, use force on any person, or put or seek to put a person in fear of being subjected to force then and there. The slightest use of force to accomplish a theft changes that theft into a robbery. An illustration can be found in the case of R v Dawson (1976) 64 Cr App R 170, where the defendant and two others surrounded their victim. One of the attackers ‘nudged’ the victim and while he was unbalanced another stole his wallet. In \"Dawson\", the court declined to define ‘force’ any further than to say that juries would understand it readily enough.",
            expWrong: "To commit robbery, a person must steal and, immediately before or at the time of doing so and in order to do so, use force on any person, or put or seek to put a person in fear of being subjected to force then and there. The slightest use of force to accomplish a theft changes that theft into a robbery. An illustration can be found in the case of R v Dawson (1976) 64 Cr App R 170, where the defendant and two others surrounded their victim. One of the attackers ‘nudged’ the victim and while he was unbalanced another stole his wallet. In \"Dawson\", the court declined to define ‘force’ any further than to say that juries would understand it readily enough."
        },
        {
            q: "ELLIS and McWHIRTER were in a supermarket car park when they saw a car with the keys in the ignition. They decided to take the vehicle and ELLIS got in the driver’s seat; McWHIRTER sat in the front passenger seat. While he was reversing out of the parking place, ELLIS struck KANG, a shopper who was walking past. Both ELLIS and McWHIRTER got out of the car and ran off, leaving KANG behind with a bruised hip.\n\nHas an offence been committed (under s. 12A of the Theft Act 1968) of aggravated vehicle-taking?",
            opts: ["No, the vehicle was not driven on a road.", "Yes, but only by ELLIS, the driver.", "Only if it can be shown that the vehicle was driven dangerously.", "Yes, by both ELLIS and McWHIRTER."],
            correct: 3,
            expCorrect: "First, a person must commit an offence under s. 12(1) of the Theft Act 1968 either by taking the vehicle or by being carried in it. Then, under s. 12A, it must be proved that at any time after the vehicle was taken (whether by him or another) and before it was recovered:\n\n• it was driven dangerously on a road or public place; or\n• owing to the driving of the vehicle, an accident occurred whereby injury was caused to any person; or\n• owing to the driving of the vehicle, an accident occurred whereby damage was caused to any property other than the vehicle; or\n• damage was caused to the vehicle.\nThe Act does not specify that the accident involving an injury to a person should occur on a road (making answer A incorrect). All that the prosecution has to prove is that one of these circumstances occurred before the car was recovered ( Dawes v DPP (1995) 1 Cr App R 65) (answer C is incorrect for this reason). Answer B is incorrect because the offence may be committed by either the driver or the passenger, provided one of the circumstances applies.",
            expWrong: "First, a person must commit an offence under s. 12(1) of the Theft Act 1968 either by taking the vehicle or by being carried in it. Then, under s. 12A, it must be proved that at any time after the vehicle was taken (whether by him or another) and before it was recovered:\n\n• it was driven dangerously on a road or public place; or\n• owing to the driving of the vehicle, an accident occurred whereby injury was caused to any person; or\n• owing to the driving of the vehicle, an accident occurred whereby damage was caused to any property other than the vehicle; or\n• damage was caused to the vehicle.\nThe Act does not specify that the accident involving an injury to a person should occur on a road (making answer A incorrect). All that the prosecution has to prove is that one of these circumstances occurred before the car was recovered ( Dawes v DPP (1995) 1 Cr App R 65) (answer C is incorrect for this reason). Answer B is incorrect because the offence may be committed by either the driver or the passenger, provided one of the circumstances applies."
        },
        {
            q: "ASTON is a career criminal involved in serious and high-value robbery offences. He carries out a robbery on a van carrying gold bullion and manages to get away with the contents of the van. To ship the gold abroad, he takes the gold to PULCHER and instructs PULCHER to melt the gold, turn it into Eiffel Tower-shaped paperweights and ship it abroad to France—PULCHER is well aware of where the gold has come from. ASTON promises to pay PULCHER a hefty fee from the sale of the gold as and when he finally disposes of it abroad. PULCHER does as ASTON asks and six months later he receives a bank transfer from ASTON for £50,000.\n\nConsidering only the offence of acquisition, use and possession of criminal property (contrary to s. 329 of the Proceeds of Crime Act 2002), when does PULCHER first commit the offence?",
            opts: ["When he takes possession of the gold bullion from ASTON.", "When he melts the gold bullion down.", "When he ships the gold abroad.", "When he receives the £50,000 from ASTON."],
            correct: 0,
            expCorrect: "The offence under s. 329 is committed when a person acquires, uses or has possession of ‘criminal property’. The gold bullion is most certainly criminal property so as soon as PULCHER takes possession of the gold bullion the offence is committed.",
            expWrong: "The offence under s. 329 is committed when a person acquires, uses or has possession of ‘criminal property’. The gold bullion is most certainly criminal property so as soon as PULCHER takes possession of the gold bullion the offence is committed."
        },
        {
            q: "MALIN is interested in buying TBT Ltd (a company producing and distributing soft furnishings around the United Kingdom). He makes his interest known to FLYNN who is the owner of the company. The company is not performing too well at the moment and has just made a loss because a major customer owing thousands of pounds to TBT Ltd went bust. FLYNN decides that he will not enter this loss in the company account books to make TBT Ltd a more attractive proposition to purchase. He also rips out several pages from the account books and destroys them with the idea of, once again, making the company look financially sound. MALIN examines the company accounts but decides not to buy TBT Ltd after all (the company accounts have no bearing on this decision).\n\nConsidering the offence of false accounting only (contrary to s. 17 of the Theft Act 1968), which of the following comments is correct?",
            opts: ["The offence is first committed when FLYNN omits to include details in the accounts about his loss.", "The offence is first committed when FLYNN rips out and destroys several pages from the account books.", "The offence is first committed when MALIN examines the accounts.", "The offence has not been committed in these circumstances."],
            correct: 0,
            expCorrect: "The offence can be committed in a variety of ways such as destroying, defacing, concealing or falsifying records or documents required for an accounting purpose. It can be committed by omission so in failing to enter the loss the actus reus of the offence is complete. The mental element includes ‘with a view to gain for himself or another’ and will not require the gain to be made, just that the person does something with that possibility in their mind. When FLYNN omits to put that loss in the account book, this state of mind exists and he commits the offence at point A.",
            expWrong: "The offence can be committed in a variety of ways such as destroying, defacing, concealing or falsifying records or documents required for an accounting purpose. It can be committed by omission so in failing to enter the loss the actus reus of the offence is complete. The mental element includes ‘with a view to gain for himself or another’ and will not require the gain to be made, just that the person does something with that possibility in their mind. When FLYNN omits to put that loss in the account book, this state of mind exists and he commits the offence at point A."
        },
        {
            q: "KNOWLE and COLLIER are drinking in a pub and discussing their sex lives. KNOWLE tells COLLIER he has not had sex for six months. COLLIER feels sorry for KNOWLE and tells him that he knows a prostitute (ORCHARD) who will have sex with KNOWLE for £100. KNOWLE tells COLLIER he does not have the money so COLLIER tells KNOWLE he will ‘treat him’. They visit ORCHARD’s home address and on arrival COLLIER asks to speak to ORCHARD in private. COLLIER lies to ORCHARD telling her that he has paid her ‘pimp’ the £100 for her to have sex with KNOWLE so there will be no need for cash to be exchanged. ORCHARD believes COLLIER and, on the basis that the sex has been paid for, she has sexual intercourse with KNOWLE. KNOWLE has no idea about what COLLIER has done.\n\nHas an offence of obtaining services dishonestly (contrary to s. 11 of the Fraud Act 2006) been committed by COLLIER in these circumstances?",
            opts: ["No, as the ‘service’ that has been obtained related to prostitution and prostitution is contrary to law, therefore the offence has not been committed.", "Yes, the offence is committed at the point when COLLIER lies to ORCHARD about the money being paid to her ‘pimp’.", "No, the offence has not been committed by COLLIER as the service he obtained was not for himself.", "Yes, the offence is committed when ORCHARD has sexual intercourse with KNOWLE."],
            correct: 3,
            expCorrect: "Section 11 of the Fraud Act 2006 states:\n\n(1) A person is guilty of an offence under this section if he obtains services for himself or another—\n(a) by a dishonest act, and\n(b) in breach of subsection (2).\n(2) A person obtains services in breach of this subsection if—\n(a) they are made available on the basis that payment has been, is being or will be made for or in respect of them,\n(b) he obtains them without any payment having been made for or in respect of them or without payment having been made in full, and\n(c) when he obtains them, he knows—\n(i) that they are being made available on the basis described in paragraph (a), or\n(ii) that they might be, but intends that payment will not be made, or will not be made in full.\nThe offence is committed if a person dishonestly obtains a service for another (in this case COLLIER obtains the ‘service’ for KNOWLE), making answer C incorrect. The term ‘service’ is not defined by the Act. The fact that ‘service’ is not defined means that in the situation where a person obtains the ‘services’ of a prostitute without intending to pay him/her, that person can commit an offence under s. 11 of the Fraud Act 2006, making answer A incorrect. Unlike the other Fraud Act 2006 offences, the offence under s. 11 is not a conduct crime; it is a result crime and requires the actual obtaining of the service to be complete. The offence would not be complete at point B when COLLIER lies to ORCHARD about the payment having been made—no service had been provided at that stage.",
            expWrong: "Section 11 of the Fraud Act 2006 states:\n\n(1) A person is guilty of an offence under this section if he obtains services for himself or another—\n(a) by a dishonest act, and\n(b) in breach of subsection (2).\n(2) A person obtains services in breach of this subsection if—\n(a) they are made available on the basis that payment has been, is being or will be made for or in respect of them,\n(b) he obtains them without any payment having been made for or in respect of them or without payment having been made in full, and\n(c) when he obtains them, he knows—\n(i) that they are being made available on the basis described in paragraph (a), or\n(ii) that they might be, but intends that payment will not be made, or will not be made in full.\nThe offence is committed if a person dishonestly obtains a service for another (in this case COLLIER obtains the ‘service’ for KNOWLE), making answer C incorrect. The term ‘service’ is not defined by the Act. The fact that ‘service’ is not defined means that in the situation where a person obtains the ‘services’ of a prostitute without intending to pay him/her, that person can commit an offence under s. 11 of the Fraud Act 2006, making answer A incorrect. Unlike the other Fraud Act 2006 offences, the offence under s. 11 is not a conduct crime; it is a result crime and requires the actual obtaining of the service to be complete. The offence would not be complete at point B when COLLIER lies to ORCHARD about the payment having been made—no service had been provided at that stage."
        },
        {
            q: "RAMAGE is a member of a gym to which she took PASSARO. At the gym there was a new person working in reception. RAMAGE showed her membership card to the receptionist, saying, ‘She’s a member, too, but she forgot her card’. PASSARO was not a member but said nothing and was allowed entry, without paying the usual fee for guests. Both RAMAGE and PASSARO had agreed to do this before attending at the gym in order to secure free entry for PASSARO.\n\nWho, if anyone, has committed an offence (under s. 2 of the Fraud Act 2006) of fraud by misrepresentation?",
            opts: ["Both have committed the offence in these circumstances.", "RAMAGE only as PASSARO made no representation that she was a member.", "PASSARO only as RAMAGE herself made no ‘gain’, whereas PASSARO gained entry to the gym for free.", "Neither, as no actual ‘gain’ was made by either of them as they received no money or property."],
            correct: 0,
            expCorrect: "The elements of the offence under s. 2 of the Fraud Act 2006 are that the defendant made:\n\n• a false representation\n• dishonestly\n• knowing that the representation was or might be untrue or misleading\n• with intent to make a gain for himself or another, to cause loss to another or to expose another to risk of loss.\nIn the scenario, RAMAGE makes a false statement about her friend’s membership status, with the intention to deceive, knowing the statement to be untrue. PASSARO said nothing. However, a representation may also be implied by conduct, or can be by omission. PASSARO failed to mention the fact that she was not a member and her actions in walking past the receptionist as if she were a member (albeit on her friend’s word) would be a false representation; answer B is therefore incorrect. The dishonesty would stem from the agreement PASSARO had with RAMAGE to dupe the gym. It’s not just a gain that makes this offence out, it also includes ‘loss’; that is, losing something that one might ordinarily have obtained, in this case the entry fee—answer D is therefore incorrect. So although RAMAGE made no gain, as she would have had free entry in any case, she is compliant in an act that causes a loss to the gym; answer C is therefore incorrect.",
            expWrong: "The elements of the offence under s. 2 of the Fraud Act 2006 are that the defendant made:\n\n• a false representation\n• dishonestly\n• knowing that the representation was or might be untrue or misleading\n• with intent to make a gain for himself or another, to cause loss to another or to expose another to risk of loss.\nIn the scenario, RAMAGE makes a false statement about her friend’s membership status, with the intention to deceive, knowing the statement to be untrue. PASSARO said nothing. However, a representation may also be implied by conduct, or can be by omission. PASSARO failed to mention the fact that she was not a member and her actions in walking past the receptionist as if she were a member (albeit on her friend’s word) would be a false representation; answer B is therefore incorrect. The dishonesty would stem from the agreement PASSARO had with RAMAGE to dupe the gym. It’s not just a gain that makes this offence out, it also includes ‘loss’; that is, losing something that one might ordinarily have obtained, in this case the entry fee—answer D is therefore incorrect. So although RAMAGE made no gain, as she would have had free entry in any case, she is compliant in an act that causes a loss to the gym; answer C is therefore incorrect."
        },
        {
            q: "Section 1 of the Fraud Act 2006 creates three different ways in which an offence of fraud can be committed.\n\nWhich of the following conditions is one of those fraud offences?",
            opts: ["Fraud by impersonation of an individual.", "Fraud by failing to disclose information.", "Fraud by data theft.", "Fraud by communication deception."],
            correct: 1,
            expCorrect: "Fraud by failing to disclose information is an offence created by virtue of s. 1(2)(b) of the Fraud Act 2006. Answers A, C and D are all fabricated.",
            expWrong: "Fraud by failing to disclose information is an offence created by virtue of s. 1(2)(b) of the Fraud Act 2006. Answers A, C and D are all fabricated."
        },
        {
            q: "BRADNICK is struggling to pay her mortgage and she is cutting corners in every aspect of her life to save money. BRADNICK has parked her car in a pay-and-display multi-storey car park and, on leaving the car park, hands over her parking ticket to RICE who is working in the pay booth at the car park exit. RICE tells BRADNICK her parking costs £20. Attempting to get a reduction on the price of the car parking, BRADNICK says, ‘I thought nurses like me only had to pay £5’ (BRADNICK is not a nurse). RICE is not fooled by BRADNICK and realises that she is trying to ‘con’ him. He tells BRADNICK that there is no such discount and the full fee needs to be paid. BRADNICK reluctantly pays the fee and drives off.\n\nConsidering the offence of fraud by false representation (contrary to s. 1(2) of the Fraud Act 2006), which of the following comments is correct?",
            opts: ["BRADNICK does not commit the offence because RICE was not fooled into thinking she was a nurse.", "BRADNICK has committed the offence.", "BRADNICK does not commit the offence because she did not obtain any financial gain from her activities.", "BRADNICK has not committed the full offence although this is an attempted fraud in the circumstances."],
            correct: 1,
            expCorrect: "The offence of fraud is all about the conduct and intent of the offender. BRADNICK tried to fool RICE and, although her trick was unsuccessful, it does not alter her liability—the offence is committed when she makes the representation (that she is a nurse) in an effort to gain a financial advantage. Whether it works or not is immaterial as the offence is complete when the representation is made, making answer A incorrect. The fact that BRADNICK did not obtain any financial gain from her efforts makes no difference as she intended to—intention alone does not require a result so answer C is incorrect. Answer D is incorrect as although an attempt fraud is possible, it will be rare and, as already stated, the offence is complete when the representation is made.",
            expWrong: "The offence of fraud is all about the conduct and intent of the offender. BRADNICK tried to fool RICE and, although her trick was unsuccessful, it does not alter her liability—the offence is committed when she makes the representation (that she is a nurse) in an effort to gain a financial advantage. Whether it works or not is immaterial as the offence is complete when the representation is made, making answer A incorrect. The fact that BRADNICK did not obtain any financial gain from her efforts makes no difference as she intended to—intention alone does not require a result so answer C is incorrect. Answer D is incorrect as although an attempt fraud is possible, it will be rare and, as already stated, the offence is complete when the representation is made."
        },
        {
            q: "EVE works for a company as a financial advisor. EVE has been passed over several times for promotion and is annoyed with the company. EVE set out to cause problems for the company by deliberately omitting to advise clients of the best deals and cause the company to lose money as a result. This caused several clients to take their business to other companies. EVE has not gained financially from these actions.\n\nHas EVE committed an offence under s. 4 of the Fraud Act 2006 (fraud by abuse of position), in these circumstances?",
            opts: ["No, EVE has not actually made a financial gain.", "Yes, provided the company makes a loss as a result of EVE’s actions.", "No, EVE has not committed a positive act.", "Yes, EVE has committed an offence in these circumstances alone."],
            correct: 3,
            expCorrect: "The Fraud Act 2006, s. 4 states:\n\nA person is in breach of this section if he—\n(a) occupies a position in which he is expected to safeguard, or not to act against, the financial interests of another person,\n(b) dishonestly abuses that position, and\n(c) intends, by means of the abuse of that position—\n(d) to make a gain for himself or another, or\n(e) to cause loss to another or to expose another to a risk of loss.\nThis offence may be committed either if the defendant intends making a gain for himself/herself, or if he/she intends that another suffers a loss. Therefore, even if EVE does not gain from the actions, the offence may still be committed. Answer A is incorrect. Under s. 4(1)(c)(ii) above, it will be sufficient that the defendant must either cause loss to another or to expose another to a risk of loss . Therefore, whether the company actually makes a loss is irrelevant (and answer B is incorrect). A person may be regarded as having abused his position even though his conduct consisted of an omission rather than an act (s. 4(2)). Answer C is incorrect.",
            expWrong: "The Fraud Act 2006, s. 4 states:\n\nA person is in breach of this section if he—\n(a) occupies a position in which he is expected to safeguard, or not to act against, the financial interests of another person,\n(b) dishonestly abuses that position, and\n(c) intends, by means of the abuse of that position—\n(d) to make a gain for himself or another, or\n(e) to cause loss to another or to expose another to a risk of loss.\nThis offence may be committed either if the defendant intends making a gain for himself/herself, or if he/she intends that another suffers a loss. Therefore, even if EVE does not gain from the actions, the offence may still be committed. Answer A is incorrect. Under s. 4(1)(c)(ii) above, it will be sufficient that the defendant must either cause loss to another or to expose another to a risk of loss . Therefore, whether the company actually makes a loss is irrelevant (and answer B is incorrect). A person may be regarded as having abused his position even though his conduct consisted of an omission rather than an act (s. 4(2)). Answer C is incorrect."
        },
        {
            q: "GREELEY is a keen fan of a pop group and learns that the pop group are to perform a special charity concert in support of a charity. Entry to the concert is free of charge but by personal invitation only and GREELEY does not have an invitation. Undeterred, GREELEY goes to the concert venue and, managing to avoid the security staff, he sneaks into the concert arena. The concert begins and GREELEY is able to watch the group perform for an hour before being discovered and ejected from the venue.\n\nWhich of the statements below is correct with regard to GREELEY’s liability for an offence of obtaining a service dishonestly (contrary to s. 11 of the Fraud Act 2006)?",
            opts: ["The fact that the concert has been put on for free makes no difference, GREELEY has obtained a ‘service’ and has committed the offence.", "GREELEY has not committed the offence because he did not use a fraudulent representation or deception to get into the concert arena.", "GREELEY commits the offence in these circumstances as he did not ‘gain’ financially from his activities.", "GREELEY has not committed the offence in these circumstances as the ‘services’ of the concert are provided for free."],
            correct: 3,
            expCorrect: "Answers A and C are incorrect as the offence of obtaining services dishonestly can only be committed if the service provided was made available on the basis that payment has been, or will be made for or in respect of them (s. 11(2)(a) of the Fraud Act 2006). In other words, services provided for free are not covered by the offence (answer D). Answer B is incorrect as this offence is a result crime and not a conduct crime — the offence does not require the defendant to practise a fraud or deception in order to obtain the service.",
            expWrong: "Answers A and C are incorrect as the offence of obtaining services dishonestly can only be committed if the service provided was made available on the basis that payment has been, or will be made for or in respect of them (s. 11(2)(a) of the Fraud Act 2006). In other words, services provided for free are not covered by the offence (answer D). Answer B is incorrect as this offence is a result crime and not a conduct crime — the offence does not require the defendant to practise a fraud or deception in order to obtain the service."
        },
        {
            q: "PURDY is a solicitor who has a written contract with SORRELL to look after her property portfolio and the money that is earned from it, as SORRELL owns 30 houses and does not have the time to administer them herself. PURDY and SORRELL have an argument during which SORRELL insults PURDY. PURDY is extremely offended by SORRELL and to get revenge he does not tell SORRELL when several of her tenants fail to pay their rent. As a consequence of PURDY’s inaction, SORRELL loses several thousand pounds in rent.\n\nWould this constitute an offence under s. 3 of the Fraud Act 2006?",
            opts: ["Yes, as PURDY would be under a legal duty to disclose the information to SORRELL.", "No, because the relationship between PURDY and SORRELL is not a fiduciary one.", "Yes, but only because the contract between PURDY and SORRELL was written.", "No, because PURDY acted in order to cause a loss to SORRELL rather than make a gain for himself."],
            correct: 0,
            expCorrect: "A fiduciary relationship is one relating to the responsibility of looking after someone else’s money in a correct way. Looking after SORRELL’s property portfolio would be such a relationship, making answer B incorrect. The offence under s. 3 (fraud by failing to disclose information) is committed when a person has a legal duty to disclose information. Such a duty can arise from oral or written contracts, making answer C incorrect. Answer D is incorrect as the harm caused by failing to disclose such information is either to make a gain or cause a loss to another (see s. 3(b) of the Act).",
            expWrong: "A fiduciary relationship is one relating to the responsibility of looking after someone else’s money in a correct way. Looking after SORRELL’s property portfolio would be such a relationship, making answer B incorrect. The offence under s. 3 (fraud by failing to disclose information) is committed when a person has a legal duty to disclose information. Such a duty can arise from oral or written contracts, making answer C incorrect. Answer D is incorrect as the harm caused by failing to disclose such information is either to make a gain or cause a loss to another (see s. 3(b) of the Act)."
        },
        {
            q: "PENFOLD was stopped and searched on his way to a football match while he was walking in High Street. The searching officer, Constable MARRIOTT, discovered in PENFOLD’s pocket a number of 50 pence pieces that had been sharpened around the edges. Believing that they were offensive weapons, the officer arrested PENFOLD.\n\nIn order to prove that PENFOLD was guilty of possessing an offensive weapon, would Constable MARRIOTT need to prove intent by PENFOLD to use the coins to cause injury?",
            opts: ["No, provided it can be shown that the coins have been made to cause injury.", "Yes, because there is no apparent victim in these circumstances.", "Yes, because the coins are not offensive weapons per se .", "No, provided it can be shown the coins have been adapted to cause injury."],
            correct: 3,
            expCorrect: "The prosecution would have to show that the coins have been adapted to cause injury in order to show that they are offensive weapons. However, once the prosecution has proved this, there is no need to show an intention to use them to cause injury ( Davis v Alexander (1970) 54 Cr App R 398). Answer A is incorrect because the coins have not been ‘made’ to cause injury; they are not offensive weapons per se . However, the fact that they are not offensive weapons per se still does not place a burden upon the prosecution to prove intent to use them ( Davis v Alexander ), which is why answer C is incorrect. Answer B is incorrect because it is the adaptation of the article that is relevant, not the intention of the person carrying it ( Bryan v Mott (1976) 62 Cr App R 71). If PENFOLD were charged in relation to the third element of the definition, where the weapon is intended to cause injury, the prosecution would have to prove an intention to cause injury by PENFOLD. This would obviously be a harder case to prove than adaptation in these circumstances.",
            expWrong: "The prosecution would have to show that the coins have been adapted to cause injury in order to show that they are offensive weapons. However, once the prosecution has proved this, there is no need to show an intention to use them to cause injury ( Davis v Alexander (1970) 54 Cr App R 398). Answer A is incorrect because the coins have not been ‘made’ to cause injury; they are not offensive weapons per se . However, the fact that they are not offensive weapons per se still does not place a burden upon the prosecution to prove intent to use them ( Davis v Alexander ), which is why answer C is incorrect. Answer B is incorrect because it is the adaptation of the article that is relevant, not the intention of the person carrying it ( Bryan v Mott (1976) 62 Cr App R 71). If PENFOLD were charged in relation to the third element of the definition, where the weapon is intended to cause injury, the prosecution would have to prove an intention to cause injury by PENFOLD. This would obviously be a harder case to prove than adaptation in these circumstances."
        },
        {
            q: "VAUGHAN owns a butterfly knife and a swordstick which he keeps in his house and never takes outside into a public place. He keeps them in a locked and secure drawer and only keeps them out of pure curiosity. From time to time, when friends visit him, he takes the items out of the drawer and shows them to his friends.\n\nDoes VAUGHAN commit the offence under s. 141(1A) of the Criminal Justice Act 1988 (possession of offensive weapons in private)?",
            opts: ["Yes, the offence is committed in relation to both items and the fact that they are kept in a locked and secure drawer does not change that.", "Yes, the offence is committed but only when VAUGHAN removes the items from the locked and secure drawer.", "Yes, the offence is committed by possessing the butterfly knife in private (it does not apply to the swordstick).", "Yes, the offence is committed by possessing the swordstick in private (it does not apply to the butterfly knife)."],
            correct: 0,
            expCorrect: "Section 141 of the Criminal Justice Act 1988 was amended by the Offensive Weapons Act 2019 to create an offence of possession of an offensive weapon in private. Under s. 141(1A), any person who possesses a weapon in private to which this section applies is guilty of an offence. The weapons to which the 1988 Act applies are set out in the schedule to the Criminal Justice Act 1988 (Offensive Weapons) Order 1988 (SI 1988/2019). The weapons listed include swordsticks and butterfly knives (making answers C and D incorrect). The fact that these items are, from time to time, kept in a locked and secure drawer has no bearing on the matter (answer B is incorrect).",
            expWrong: "Section 141 of the Criminal Justice Act 1988 was amended by the Offensive Weapons Act 2019 to create an offence of possession of an offensive weapon in private. Under s. 141(1A), any person who possesses a weapon in private to which this section applies is guilty of an offence. The weapons to which the 1988 Act applies are set out in the schedule to the Criminal Justice Act 1988 (Offensive Weapons) Order 1988 (SI 1988/2019). The weapons listed include swordsticks and butterfly knives (making answers C and D incorrect). The fact that these items are, from time to time, kept in a locked and secure drawer has no bearing on the matter (answer B is incorrect)."
        },
        {
            q: "A report was received by the police of a disturbance in a high school. The first person to arrive was Constable SANCHEZ, who was in plain clothes. He was told that two pupils had threatened a teacher and that one of them had a knife. After a search, Constable SANCHEZ found the two youths in the street outside the school.\n\nWhat powers of search would Constable SANCHEZ have under s.139 of the Criminal Justice Act 1988 in these circumstances?",
            opts: ["He has no powers under the 1988 Act and must use his powers under the Police and Criminal Evidence Act 1984.", "He has a power under the 1988 Act to search the youths for an offensive weapon.", "He has no powers under the 1988 Act as the pupils were not trespassing.", "He has no powers under the 1988 Act as he is not in uniform."],
            correct: 0,
            expCorrect: "Under the Criminal Justice Act 1988, an offence is committed when a person has an offensive weapon with him/her on school premises. Under the Act, a constable may enter school premises and search those premises and any person for an offensive weapon. Note that the power under the Act only enables a constable to enter and search premises and search people on the premises. The power is not extended to searching people off school premises. The officer may, of course, use his power under s. 1 of the Police and Criminal Evidence Act 1984 to search the youths. This is why answer A is correct and answer B is incorrect. There is no requirement for the constable to be in uniform, and therefore answer D is incorrect. A person may commit an offence under this Act whether he/she is on the premises lawfully or not, and therefore answer C is incorrect.",
            expWrong: "Under the Criminal Justice Act 1988, an offence is committed when a person has an offensive weapon with him/her on school premises. Under the Act, a constable may enter school premises and search those premises and any person for an offensive weapon. Note that the power under the Act only enables a constable to enter and search premises and search people on the premises. The power is not extended to searching people off school premises. The officer may, of course, use his power under s. 1 of the Police and Criminal Evidence Act 1984 to search the youths. This is why answer A is correct and answer B is incorrect. There is no requirement for the constable to be in uniform, and therefore answer D is incorrect. A person may commit an offence under this Act whether he/she is on the premises lawfully or not, and therefore answer C is incorrect."
        },
        {
            q: "ANDREWS owned a house which was being renovated. One day he visited it and found HARVEY squatting inside. ANDREWS asked HARVEY to leave. However, HARVEY was carrying a knife and threatened ANDREWS with it. The police were called and Constable RAMAN arrived, and was considering how to deal with HARVEY and the possibility of HARVEY committing an offence under s. 8 of the Criminal Law Act 1977 (trespassing with a weapon of offence).\n\nConsidering the definition of a weapon of offence under s. 8 of the Criminal Law Act 1977, would HARVEY commit an offence in these circumstances?",
            opts: ["Yes, as a weapon of offence is any article made or adapted for use for causing injury to or incapacitating a person, or intended by the person having it with him or her for that use.", "Yes, as a weapon of offence is any article made or adapted for use for causing injury to or intended by the person having it with him or her for that use.", "Yes, as a weapon of offence is any article intended by the person having it with him or her for the purpose of causing injury.", "Yes, as a weapon of offence is any article made or adapted for use for causing injury to or incapacitating a person."],
            correct: 0,
            expCorrect: "For an offence contrary to s. 8 of the Criminal Law Act 1977 the definition of ‘weapon of offence’ is the same as that for aggravated burglary, namely any article made or adapted for use for causing injury to or incapacitating a person, or intended by the person having it with him or her for that use (s. 8(2)). This is answer A; therefore, answers B, C and D are incorrect.",
            expWrong: "For an offence contrary to s. 8 of the Criminal Law Act 1977 the definition of ‘weapon of offence’ is the same as that for aggravated burglary, namely any article made or adapted for use for causing injury to or incapacitating a person, or intended by the person having it with him or her for that use (s. 8(2)). This is answer A; therefore, answers B, C and D are incorrect."
        },
        {
            q: "Constable BRADY stopped and searched CLOUGH in a park one evening, after receiving information that he was carrying a knife. Constable BRADY found a folding knife with a blade of approximately 3.5 inches in length in CLOUGH’s pocket. CLOUGH claimed that he was a scout and bought the knife from a camping shop and it was intended for cutting string.\n\nWhich of the following statements is correct in relation to the knife that Constable BRADY found?",
            opts: ["The knife could be an offensive weapon or a bladed article depending on CLOUGH’s intention.", "The knife could be an offensive weapon depending on CLOUGH’s intentions, or a bladed article regardless of his intention.", "The knife would be an offensive weapon or a bladed article regardless of CLOUGH’s intention.", "The knife could be an offensive weapon depending on CLOUGH’s intention but it may not be a bladed article if the length of the blade is under 3.5 inches."],
            correct: 1,
            expCorrect: "Under s. 1(1) of the Prevention of Crime Act 1953, any person who without lawful authority or reasonable excuse, the proof whereof shall lie on him, has with him in any public place any offensive weapon shall be guilty of an offence. Under s. 139 of the Criminal Justice Act 1988, a person commits an offence if he/she has a bladed or sharply pointed article in a public place. Offensive weapons (under s. 1(1)) fall into three categories for the purposes of this offence; namely, articles:\n\n• made for causing injury (offensive weapons per se );\n• adapted for causing injury; and\n• intended by the person who has them for causing injury.\nThe knife carried in this scenario would not count as an offensive weapon per se (such as a flick knife or gravity knife) as it was not made for causing injury. Neither has it been adapted for causing injury. It is simply a knife that may be used as a tool; therefore, to prosecute the person under this section, you would have to prove that the person who had the knife intended using it for causing injury. Answer C is incorrect because the person’s intention is relevant. Turning to offences under the Criminal Justice Act 1988, a person commits the offence either by carrying a sharply pointed instrument or a bladed instrument. There is no mention of the intent to use the article for any purpose—having it with you is enough. Answer A is therefore incorrect. There are defences of lawful authority and reasonable excuse (or good reason) for both offences, and folding pocket-knives are excluded unless the cutting edge of the blade exceeds 3 inches (7.62 cm) and not 3.5. Answer D is therefore incorrect.",
            expWrong: "Under s. 1(1) of the Prevention of Crime Act 1953, any person who without lawful authority or reasonable excuse, the proof whereof shall lie on him, has with him in any public place any offensive weapon shall be guilty of an offence. Under s. 139 of the Criminal Justice Act 1988, a person commits an offence if he/she has a bladed or sharply pointed article in a public place. Offensive weapons (under s. 1(1)) fall into three categories for the purposes of this offence; namely, articles:\n\n• made for causing injury (offensive weapons per se );\n• adapted for causing injury; and\n• intended by the person who has them for causing injury.\nThe knife carried in this scenario would not count as an offensive weapon per se (such as a flick knife or gravity knife) as it was not made for causing injury. Neither has it been adapted for causing injury. It is simply a knife that may be used as a tool; therefore, to prosecute the person under this section, you would have to prove that the person who had the knife intended using it for causing injury. Answer C is incorrect because the person’s intention is relevant. Turning to offences under the Criminal Justice Act 1988, a person commits the offence either by carrying a sharply pointed instrument or a bladed instrument. There is no mention of the intent to use the article for any purpose—having it with you is enough. Answer A is therefore incorrect. There are defences of lawful authority and reasonable excuse (or good reason) for both offences, and folding pocket-knives are excluded unless the cutting edge of the blade exceeds 3 inches (7.62 cm) and not 3.5. Answer D is therefore incorrect."
        },
        {
            q: "FAHEY is aged 19 and works in a hardware shop. McKAY, aged 17, came into the shop one day and selected a pocket-knife from the display, intending to buy it. The pocket-knife had a blade with a cutting edge of 3.5 inches.\n\nConsidering offences under s. 141A of the Criminal Justice Act 1988 (selling knives to minors), could FAHEY lawfully sell this pocket-knife to McKAY?",
            opts: ["Yes, because FAHEY is over 18.", "Yes, because McKAY is over 16.", "No, because McKAY is under 18.", "Yes, this offence does not apply to folding pocket-knives with a cutting edge not exceeding 3.5 inches."],
            correct: 2,
            expCorrect: "Under s. 141A of the Criminal Justice Act 1988, it is an offence for any person to sell to a person under 18 a knife, blade, razor blade, axe or any article which has a blade or sharp point and is made or adapted for causing injury, therefore answer B is incorrect. The offence does not apply to razor blades permanently enclosed in a cartridge or housing where less than 2 millimetres of any blade is exposed or to a folding pocket-knife with a blade of less than 3 inches. Since the blade in this question was 3.5 inches, it is covered by s. 141A and therefore answer D is incorrect. The age of the person making the sale is not relevant (which is why answer A is incorrect).",
            expWrong: "Under s. 141A of the Criminal Justice Act 1988, it is an offence for any person to sell to a person under 18 a knife, blade, razor blade, axe or any article which has a blade or sharp point and is made or adapted for causing injury, therefore answer B is incorrect. The offence does not apply to razor blades permanently enclosed in a cartridge or housing where less than 2 millimetres of any blade is exposed or to a folding pocket-knife with a blade of less than 3 inches. Since the blade in this question was 3.5 inches, it is covered by s. 141A and therefore answer D is incorrect. The age of the person making the sale is not relevant (which is why answer A is incorrect)."
        },
        {
            q: "MAYHEW breaks off his engagement to CUTHBERT, who takes the news badly. CUTHBERT is desperate to rekindle the relationship and phones MAYHEW telling him that unless the two of them get back together, she will steal his car, set it alight and burn herself alive in it. CUTHBERT does not intend to carry out her threat but does intend for MAYHEW to believe her. Unknown to CUTHBERT, MAYHEW has sold his car and so does not actually fear that the threat will be carried out.\n\nWhich of the following statements is correct with regard to a threat to destroy or damage property under s. 2 of the Criminal Damage Act 1971?",
            opts: ["CUTHBERT is not guilty of the offence because MAYHEW has sold his car and therefore knows that the threat is incapable of being carried out.", "The offence is not committed because CUTHBERT has not threatened to destroy or damage her own property.", "The offence is not committed because CUTHBERT never intended to carry out her threat.", "CUTHBERT has committed the offence because her intention was to make MAYHEW fear that the threat would be carried out."],
            correct: 3,
            expCorrect: "The central element for the commission of this offence is that the defendant intended the complainant to fear that the threat would be carried out. That threat can be to destroy or damage property belonging to that or another person or to destroy or damage his/her own property in a way that will endanger the life of that other or a third person, making answer B incorrect. The fact that CUTHBERT never intended to carry out her threat or that the threat is incapable of being carried out makes no difference, making answers A and C incorrect.",
            expWrong: "The central element for the commission of this offence is that the defendant intended the complainant to fear that the threat would be carried out. That threat can be to destroy or damage property belonging to that or another person or to destroy or damage his/her own property in a way that will endanger the life of that other or a third person, making answer B incorrect. The fact that CUTHBERT never intended to carry out her threat or that the threat is incapable of being carried out makes no difference, making answers A and C incorrect."
        },
        {
            q: "DENNIS works in a butcher’s shop. As a joke, on 1 April he came in early and sprinkled icing sugar on some meat on display. He then left a note for his boss, claiming to be from an animal rights group, saying they had sprinkled rat poison on the food. Unfortunately, before he was able to stop him, his boss threw the meat away.\n\nHas DENNIS committed an offence under s. 38 of the Public Order Act 1986 (contamination of goods)?",
            opts: ["Yes, because he has caused economic loss to his employer.", "No, because he has not caused public alarm or anxiety.", "No, because he has not actually contaminated any goods.", "No, because he only intended his employer to treat it as a joke."],
            correct: 3,
            expCorrect: "Under s. 38 of the Public Order Act 1986, it is necessary to prove that a person contaminated or interfered with goods, or made it appear that goods had been contaminated or interfered with, or threatened or claimed to have done so. However, the person must have done so with the intention of causing public alarm or anxiety, or of causing injury to members of the public consuming or using the goods, or of causing economic loss to any person by reason of the goods being shunned by members of the public, or of causing economic loss to any person by reason of steps taken to avoid such alarm or anxiety, injury or loss. Therefore, even though DENNIS in the circumstances may have contaminated goods, and even caused economic loss, he did not do so with the required intention and cannot be guilty of this offence. Answer A is therefore incorrect. Had DENNIS been proved to have had the required intent, answers B and C would still be incorrect because there is no need to prove that a person actually caused public alarm/anxiety, and the offence may be committed without actually contaminating goods.",
            expWrong: "Under s. 38 of the Public Order Act 1986, it is necessary to prove that a person contaminated or interfered with goods, or made it appear that goods had been contaminated or interfered with, or threatened or claimed to have done so. However, the person must have done so with the intention of causing public alarm or anxiety, or of causing injury to members of the public consuming or using the goods, or of causing economic loss to any person by reason of the goods being shunned by members of the public, or of causing economic loss to any person by reason of steps taken to avoid such alarm or anxiety, injury or loss. Therefore, even though DENNIS in the circumstances may have contaminated goods, and even caused economic loss, he did not do so with the required intention and cannot be guilty of this offence. Answer A is therefore incorrect. Had DENNIS been proved to have had the required intent, answers B and C would still be incorrect because there is no need to prove that a person actually caused public alarm/anxiety, and the offence may be committed without actually contaminating goods."
        },
        {
            q: "BAYODE’s wife has been having an affair with O’LEARY—BAYODE has found out and is fuming and wants to get revenge on O’LEARY. BAYODE owns a garage that has a large stock of car accessories including brake fluid which BAYODE knows will destroy the paint on O’LEARY’s car and he intends to use the brake fluid to do so—he plans to do this early tomorrow morning. BAYODE is at his house on his mobile phone boasting to a friend about what he intends to do when his wife overhears the conversation and informs the police of BAYODE’s intention.\n\nIn relation to the offence under s. 3 of the Criminal Damage Act 1971 (having articles with intent to destroy or damage property) and the power under s. 6 of the Act in relation to warrants to search for such items, which of the following comments is correct?",
            opts: ["The offence is committed and the police can apply for a warrant to search BAYODE’s garage for the brake fluid he intends to use to cause criminal damage.", "The offence is not committed as BAYODE does not have the brake fluid ‘with him’.", "The offence is not committed because BAYODE does not possess the thing with the intention of endangering the life of another.", "The offence is committed although a warrant could not be obtained to search for the brake fluid unless it had actually been used to cause criminal damage."],
            correct: 0,
            expCorrect: "Section 3 of the Criminal Damage Act 1971 states that a person who has anything in his custody or under his control intending without lawful excuse to use it or cause or permit another to use it (a) to destroy or damage any property belonging to some other person; or (b) to destroy or damage his own or the user’s property in a way which he knows is likely to endanger the life of some other person shall be guilty of an offence. This offence covers anything which a defendant has ‘in his custody or under his control’, a broader term than ‘possession’, making answer B incorrect. Answer C is incorrect as the offence does not require the intention to endanger a person’s life (although it can be committed in that way). There is a statutory power to apply to a magistrate for a search warrant under s. 6 of the Criminal Damage Act 1971 for anything that could be used or is intended to be used to destroy or damage property. The Criminal Damage Act 1971, s. 6 states:\n\n(1) If it is made to appear by information on oath before a justice of the peace that there is reasonable cause to believe that any person has in his custody or under his control or on his premises anything which there is reasonable cause to believe has been used or is intended for use without lawful excuse—\n(a) to destroy or damage property belonging to another; or\n(b) to destroy or damage any property in a way likely to endanger the life of another,\nthe justice may grant a warrant authorising any constable to search for and seize that thing.\nSo a warrant could be obtained to search for the brake fluid making answer A correct and answer D incorrect.",
            expWrong: "Section 3 of the Criminal Damage Act 1971 states that a person who has anything in his custody or under his control intending without lawful excuse to use it or cause or permit another to use it (a) to destroy or damage any property belonging to some other person; or (b) to destroy or damage his own or the user’s property in a way which he knows is likely to endanger the life of some other person shall be guilty of an offence. This offence covers anything which a defendant has ‘in his custody or under his control’, a broader term than ‘possession’, making answer B incorrect. Answer C is incorrect as the offence does not require the intention to endanger a person’s life (although it can be committed in that way). There is a statutory power to apply to a magistrate for a search warrant under s. 6 of the Criminal Damage Act 1971 for anything that could be used or is intended to be used to destroy or damage property. The Criminal Damage Act 1971, s. 6 states:\n\n(1) If it is made to appear by information on oath before a justice of the peace that there is reasonable cause to believe that any person has in his custody or under his control or on his premises anything which there is reasonable cause to believe has been used or is intended for use without lawful excuse—\n(a) to destroy or damage property belonging to another; or\n(b) to destroy or damage any property in a way likely to endanger the life of another,\nthe justice may grant a warrant authorising any constable to search for and seize that thing.\nSo a warrant could be obtained to search for the brake fluid making answer A correct and answer D incorrect."
        },
        {
            q: "DYKE has a long-standing disagreement with MONK over who owns a section of land that lies between their respective houses. One evening after DYKE has been drinking at his local pub, he decides to get revenge on MONK and walks up the drive of MONK’s house intent on damaging MONK’s property.\n\nAt what point does DYKE first commit an offence of criminal damage (contrary to s. 1(1) of the Criminal Damage Act 1971)?",
            opts: ["As DYKE enters the driveway he stamps on and destroys some flowers that are growing wild at the entrance to the drive.", "DYKE passes a garden shed owned by MONK and, although he knows it will easily be washed off, he smears the word ‘Wanker’ in mud across the shed.", "DYKE then picks up a large container of black paint and pours this over MONK’s front lawn.DYKE then picks up a large container of black paint and pours this over MONK’s front lawn.", "DYKE then approaches a chicken coop and reaches inside. He picks up a chicken and breaks its legs."],
            correct: 1,
            expCorrect: "Under s. 10 of the Criminal Damage Act 1971, flowers growing wild on any land would not be classed as property, making answer A incorrect. The items referred to in options B, C and D would all be classed as property; land can be subject to criminal damage along with wild creatures that are ordinarily kept in captivity or have been reduced into possession (the chickens). There is no requirement that criminal damage be associated with an economic loss. It has been held by the Divisional Court that graffiti smeared in mud, even though it is easily washed off, can amount to criminal damage ( Roe v Kingerlee [1986] Crim LR 735). Therefore, the offence is first committed at point B.",
            expWrong: "Under s. 10 of the Criminal Damage Act 1971, flowers growing wild on any land would not be classed as property, making answer A incorrect. The items referred to in options B, C and D would all be classed as property; land can be subject to criminal damage along with wild creatures that are ordinarily kept in captivity or have been reduced into possession (the chickens). There is no requirement that criminal damage be associated with an economic loss. It has been held by the Divisional Court that graffiti smeared in mud, even though it is easily washed off, can amount to criminal damage ( Roe v Kingerlee [1986] Crim LR 735). Therefore, the offence is first committed at point B."
        },
        {
            q: "HARRISON is dismissed from his job as a tool setter owing to an allegation of his being responsible for bullying his colleagues. He is so angry about his dismissal that he writes a letter to LINTON, the manager of the company, threatening to set fire to the factory some time in the following week. HARRISON intends that LINTON will believe the threat and worry about it, even though he has no intention of carrying out the threat. LINTON reads the letter and believes the threat.\n\nHas HARRISON committed an offence under s. 2 of the Criminal Damage Act 1971 (threatening to destroy or damage property)?",
            opts: ["Yes, because he intended LINTON to believe that the threat would be carried out.", "No, as the threat was to set fire to the factory in the future.", "Yes, but only because LINTON believed the threat.", "No, as he had no intention of carrying out the threat."],
            correct: 0,
            expCorrect: "Section 2 of the Act (threats to destroy or damage property) refers to the offence as one of intention . The key element is the defendant’s intention that the person receiving the threat fears it would be carried out. It is immaterial whether the threat is believed (answer C), whether the threat was to commit damage in the future (answer B) or whether the defendant actually intended to carry out the threat (answer D).",
            expWrong: "Section 2 of the Act (threats to destroy or damage property) refers to the offence as one of intention . The key element is the defendant’s intention that the person receiving the threat fears it would be carried out. It is immaterial whether the threat is believed (answer C), whether the threat was to commit damage in the future (answer B) or whether the defendant actually intended to carry out the threat (answer D)."
        },
        {
            q: "The employees of the company Jukes & Sons are on strike, but RATTLE (an employee of the company) has decided to keep working. TAYLOR (one of the strikers) is outraged by RATTLE’s behaviour and visits RATTLE’s house intending to intimidate him into joining the strike. TAYLOR has a revolver in his possession to accomplish this. TAYLOR speaks to RATTLE at his door but RATTLE ignores TAYLOR’s threats, even when the revolver is produced, and he slams the door in TAYLOR’s face. As TAYLOR walks away, he sees RATTLE standing behind a window in his lounge. TAYLOR shoots at RATTLE intending to scare him with a bullet shot from the revolver. The bullet shatters the window but misses RATTLE, who remains unharmed.\n\nHas TAYLOR committed an offence under s. 1(2) of the Criminal Damage Act 1971 (aggravated criminal damage)?",
            opts: ["Yes, because had a reasonable bystander been present, they would have seen the possible risk to life.", "No, as RATTLE was unharmed by the attack.", "Yes, as TAYLOR intended to injure RATTLE and damage was caused as a consequence of his actions.", "No, it was the bullet and not the damage to the window that endangered RATTLE’s life.No, it was the bullet and not the damage to the window that endangered RATTLE’s life."],
            correct: 3,
            expCorrect: "When a defendant is charged with this offence, it must be shown that it was the damage that caused the danger to life. In R v Steer [1988] AC 111, a defendant fired a gun through a window pane. The court felt that, although the defendant was clearly reckless as to the damage his actions would cause, the two people standing behind the window pane were not put in danger by the damage but by the missile. Therefore, the court held that the defendant was not guilty of this offence.",
            expWrong: "When a defendant is charged with this offence, it must be shown that it was the damage that caused the danger to life. In R v Steer [1988] AC 111, a defendant fired a gun through a window pane. The court felt that, although the defendant was clearly reckless as to the damage his actions would cause, the two people standing behind the window pane were not put in danger by the damage but by the missile. Therefore, the court held that the defendant was not guilty of this offence."
        },
        {
            q: "HARDCASTLE assists his wife in her job as a warden of a block of flats for pensioners. HARDCASTLE’s wife constantly complains about the poor condition of the fire alarm and worries that if it is not changed the pensioners’ lives will be in danger and there might be a large amount of damage caused to the flats if there is a fire. To demonstrate to the owner of the flats that the fire alarm is defective and needs changing, HARDCASTLE sets fire to some bedding in one of the flats. Eventually, the fire alarm activates and the fire is put out. HARDCASTLE is arrested for arson.\n\nWould HARDCASTLE be able to claim that he had a lawful excuse to commit criminal damage?\n\nResponses",
            opts: ["Yes, because the damage was caused in order to protect the property.", "No, because what has been done by HARDCASTLE is not done in order to protect property.No, because what has been done by HARDCASTLE is not done in order to protect property.", "Yes, because the damage was caused in order to protect the lives of the pensioners.", "No, because the element of ‘lawful excuse’ does not apply to offences of arson."],
            correct: 1,
            expCorrect: "Answer D is incorrect as the element of lawful excuse is contained within the s. 1(2) offence. Section 5(2) of the Criminal Damage Act 1971 gives the circumstances when a person may have a lawful excuse to damage or destroy property. This must involve an immediate need for the action taken in order to protect the property and also that the means adopted were reasonable having regard to the circumstances. In this question, HARDCASTLE’s activities would not fall into either of the last two categories and the element of ‘lawful excuse’ would not be satisfied, making answers A and C incorrect (action taken in order to draw attention to a defective fire alarm and not done in order to protect property would not be a ‘lawful excuse’).",
            expWrong: "Answer D is incorrect as the element of lawful excuse is contained within the s. 1(2) offence. Section 5(2) of the Criminal Damage Act 1971 gives the circumstances when a person may have a lawful excuse to damage or destroy property. This must involve an immediate need for the action taken in order to protect the property and also that the means adopted were reasonable having regard to the circumstances. In this question, HARDCASTLE’s activities would not fall into either of the last two categories and the element of ‘lawful excuse’ would not be satisfied, making answers A and C incorrect (action taken in order to draw attention to a defective fire alarm and not done in order to protect property would not be a ‘lawful excuse’)."
        },
        {
            q: "SEARLE has a lighter in his pocket and is in his own back garden. He has been having an argument with his neighbour about a shed his neighbour has recently built. SEARLE has the lighter in case his neighbour continues to argue with him about the shed. His intention is that if there is another argument he will burn the shed down.\n\nHas SEARLE committed the offence of having articles with intent to destroy or damage property (contrary to s. 3 of the Criminal Damage Act 1971)?",
            opts: ["Yes, as he has an article with intent to damage or destroy the shed and is in a position to do it.", "Yes, as he has an article for use and has a conditional intention to use it.", "No, he only has conditional intent to damage or destroy the shed.", "No, as this offence is only committed in public places."],
            correct: 1,
            expCorrect: "The Criminal Damage Act 1971, s. 3 states:\n\nA person who has anything in his custody or under his control intending without lawful excuse to use it or cause or permit another to use it—\n(a) to destroy or damage any property belonging to some other person; or\n(b) to destroy or damage his own or the user’s property in a way which he knows is likely to endanger the life of some other person;\nshall be guilty of an offence.\nThe key element is intention. This time the required intention is that the ‘thing’ is used to cause criminal damage to another’s property or to the defendant’s own property in a way which the defendant knows is likely to endanger the life of another. Proximity to the target is irrelevant, however; answer A is therefore incorrect. A conditional intent (an intent to use something to cause criminal damage if the need arises) will be enough ( R v Buckingham (1976) 63 Cr App R 159); answer C is therefore incorrect. It is not restricted to public places and answer D is therefore incorrect.",
            expWrong: "The Criminal Damage Act 1971, s. 3 states:\n\nA person who has anything in his custody or under his control intending without lawful excuse to use it or cause or permit another to use it—\n(a) to destroy or damage any property belonging to some other person; or\n(b) to destroy or damage his own or the user’s property in a way which he knows is likely to endanger the life of some other person;\nshall be guilty of an offence.\nThe key element is intention. This time the required intention is that the ‘thing’ is used to cause criminal damage to another’s property or to the defendant’s own property in a way which the defendant knows is likely to endanger the life of another. Proximity to the target is irrelevant, however; answer A is therefore incorrect. A conditional intent (an intent to use something to cause criminal damage if the need arises) will be enough ( R v Buckingham (1976) 63 Cr App R 159); answer C is therefore incorrect. It is not restricted to public places and answer D is therefore incorrect."
        },
        {
            q: "FALLON is homeless and searching for somewhere to sleep for the night. He breaks into an abandoned detached house and, using some old furniture for fuel, sets a fire that quickly burns out of control, destroying part of the house. FALLON only escapes with his life because of the rapid attendance of the fire brigade. Because of the gap between the neighbouring houses there is no likelihood that the fire will spread to any other buildings.\n\nWould FALLON be liable for an offence under s. 1(2) of the Criminal Damage Act 1971 (aggravated criminal damage)?",
            opts: ["Yes, because of FALLON’s actions he recklessly endangered his own life.", "No, because FALLON did not intend to endanger his own or any other person’s life.", "Yes, what matters is the potential for damage and danger created by FALLON’s conduct.", "No, because the fire brigade attended and because of the gap between the houses, there was no actual danger to life."],
            correct: 2,
            expCorrect: "The aggravated form of criminal damage can only be committed if the life endangered is someone else’s other than the defendant’s, making answers A and B incorrect. Answer B is further incorrect as the offence can be committed recklessly. Answer D is incorrect, as it does not matter that there was no actual danger to life. What is relevant is the potential danger to life.",
            expWrong: "The aggravated form of criminal damage can only be committed if the life endangered is someone else’s other than the defendant’s, making answers A and B incorrect. Answer B is further incorrect as the offence can be committed recklessly. Answer D is incorrect, as it does not matter that there was no actual danger to life. What is relevant is the potential danger to life."
        },
        {
            q: "HATTON has been arrested for a motoring offence; his detention has been authorised and he has been placed in a cell while the officers make further enquiries. HATTON is disgusted by his arrest and therefore to cause trouble and reckless as to the consequences, he places the blanket provided in his cell down the toilet in the cell. HATTON then continually flushes the toilet. When the custody sergeant makes his first check on HATTON, the concrete floor of the cell is flooded and the blanket is soaking wet.\n\nConsidering the offence of criminal damage (contrary to s. 1(1) of the Criminal Damage Act 1971), does HATTON commit the offence?",
            opts: ["No, HATTON would not commit criminal damage in these circumstances as both the floor and the blanket could be dried out without any resulting damage to either.", "Yes, HATTON would commit criminal damage to the blanket, but not the floor as it could be dried out undamaged.", "No, HATTON would not commit criminal damage in these circumstances as there was no intention to damage property; it was just frustration at his circumstances.", "Yes, HATTON would be guilty of criminal damage to both the blanket and the floor."],
            correct: 3,
            expCorrect: "A person commits an offence if they, without lawful excuse, destroy or damage any property belonging to another intending to destroy or damage any such property or being reckless as to whether any such property will be destroyed or damaged. The case of R v Fiak [2005] EWCA Crim 2381 has the same circumstances as this question. The reality was that the blanket could not be used until it had been dried and the flooded cell was out of action until the water had been cleared. Therefore, both had sustained damage for the purposes of the Act. Making D the correct answer.",
            expWrong: "A person commits an offence if they, without lawful excuse, destroy or damage any property belonging to another intending to destroy or damage any such property or being reckless as to whether any such property will be destroyed or damaged. The case of R v Fiak [2005] EWCA Crim 2381 has the same circumstances as this question. The reality was that the blanket could not be used until it had been dried and the flooded cell was out of action until the water had been cleared. Therefore, both had sustained damage for the purposes of the Act. Making D the correct answer."
        },
        {
            q: "Kelly SAMUELSON and Amy SAMUELSON are civil partners but have argued and decided to split up. The pair have since argued about who owns what in the house they shared before Kelly moved out three weeks ago. Kelly returns to the house with ORTEGA (her friend) while Amy is at work, with the idea of removing several items of property that Kelly says belong to her. Once inside the house, Kelly becomes upset and says to ORTEGA, ‘I don’t care about taking my things—smash them instead!’ Kelly and ORTEGA cause damage to a TV in the living room of the house. The TV belongs to Kelly and also belongs to Amy as they purchased it jointly (a fact that Kelly is aware of). ORTEGA is unaware of this and believes the TV belongs solely to Kelly and that she wants the TV damaged.\n\nConsidering the offence of criminal damage (under s. 1(1) of the Criminal Damage Act 1971), which of the following comments is correct?",
            opts: ["ORTEGA would be able to state that she had a ‘lawful excuse’ to damage the TV if she were charged with criminal damage; Kelly SAMUELSON could be charged with an offence of criminal damage but such a prosecution could only be instituted with the consent of the DPP.", "ORTEGA has committed criminal damage and has no defence; Kelly SAMUELSON could not be charged with criminal damage as the property belongs to her.", "As the property belongs to Kelly SAMUELSON, no offence of criminal damage has taken place in these circumstances.", "Kelly SAMUELSON and ORTEGA could both be charged with criminal damage; the consent of the DPP is not required as the property damaged also belonged to Amy SAMUELSON."],
            correct: 0,
            expCorrect: "The Criminal Damage Act 1971, s. 1 states:\n\n(1) A person who without lawful excuse destroys or damages any property belonging to another intending to destroy or damage any such property or being reckless as to whether any such property would be destroyed or damaged shall be guilty of an offence.\nA person shall be treated as having lawful excuse under s. 5(2):\n\n(a) if at the time of the act or acts alleged to constitute the offence he believed that the person or persons whom he believed to be entitled to consent to the destruction of or damage to the property in question had so consented, or would have so consented to it if he or they had known of the destruction or damage and its circumstances ...\nThat would be the case in respect of ORTEGA as s. 5(2)(a) would provide a statutory defence to any later charge of criminal damage by Amy SAMUELSON. The key element here would be that ORTEGA believed she had the consent of the owner of the TV (Kelly SAMUELSON and someone ORTEGA believes to be entitled to consent to that damage) to damage the TV in these circumstances. This makes answers B and C incorrect. Section 10 of the Act deals with the ‘belonging to another’ phrase and states:\n\n(2) Property shall be treated for the purposes of this Act as belonging to any person—\n(a) having the custody or control of it;\n(b) having in it any proprietary right or interest (not being an equitable interest arising only from an agreement to transfer or grant an interest); or\n(c) having a charge on it.\nThis extended meaning of ‘belonging to another’ is similar to that used in the Theft Act 1968. One result is that if a person damages their own property, they may still commit the offence of simple criminal damage if that property also ‘belongs to’ someone else. As Kelly knows this is the case, she could be charged with criminal damage (making answer C further incorrect). Answer D is incorrect as the Theft Act 1968 states that where the property in question belongs to D’s spouse or civil partner, a prosecution for unlawful damage may only be instituted against D by or with the consent of the DPP (s. 30(4)). This restriction does not apply to other persons charged with committing the offence jointly with D; nor does it apply when the parties are separated by judicial decree or order or under no obligation to cohabit (s. 30(4)(a)).",
            expWrong: "The Criminal Damage Act 1971, s. 1 states:\n\n(1) A person who without lawful excuse destroys or damages any property belonging to another intending to destroy or damage any such property or being reckless as to whether any such property would be destroyed or damaged shall be guilty of an offence.\nA person shall be treated as having lawful excuse under s. 5(2):\n\n(a) if at the time of the act or acts alleged to constitute the offence he believed that the person or persons whom he believed to be entitled to consent to the destruction of or damage to the property in question had so consented, or would have so consented to it if he or they had known of the destruction or damage and its circumstances ...\nThat would be the case in respect of ORTEGA as s. 5(2)(a) would provide a statutory defence to any later charge of criminal damage by Amy SAMUELSON. The key element here would be that ORTEGA believed she had the consent of the owner of the TV (Kelly SAMUELSON and someone ORTEGA believes to be entitled to consent to that damage) to damage the TV in these circumstances. This makes answers B and C incorrect. Section 10 of the Act deals with the ‘belonging to another’ phrase and states:\n\n(2) Property shall be treated for the purposes of this Act as belonging to any person—\n(a) having the custody or control of it;\n(b) having in it any proprietary right or interest (not being an equitable interest arising only from an agreement to transfer or grant an interest); or\n(c) having a charge on it.\nThis extended meaning of ‘belonging to another’ is similar to that used in the Theft Act 1968. One result is that if a person damages their own property, they may still commit the offence of simple criminal damage if that property also ‘belongs to’ someone else. As Kelly knows this is the case, she could be charged with criminal damage (making answer C further incorrect). Answer D is incorrect as the Theft Act 1968 states that where the property in question belongs to D’s spouse or civil partner, a prosecution for unlawful damage may only be instituted against D by or with the consent of the DPP (s. 30(4)). This restriction does not apply to other persons charged with committing the offence jointly with D; nor does it apply when the parties are separated by judicial decree or order or under no obligation to cohabit (s. 30(4)(a))."
        }
    ],


    openQuestionNavigator: function () {
        this.navigatorItemsPerPage = 18;
        this.navigatorCurrentPage = Math.floor((this.currentQuestion - 1) / this.navigatorItemsPerPage);
        const sheet = document.getElementById('navigator-sheet');
        const overlay = document.getElementById('navigator-overlay');
        if (sheet && overlay) {
            this.renderNavigatorGrid();
            sheet.classList.remove('hidden');
            overlay.classList.remove('hidden');
            if (!history.state || !history.state.isNavigatorOpen) {
                const currentViewId = history.state ? history.state.viewId : 'view-active';
                history.pushState({ isNavigatorOpen: true, viewId: currentViewId }, '');
            }
        }
    },

    closeQuestionNavigator: function (fromPopState = false) {
        const sheet = document.getElementById('navigator-sheet');
        const overlay = document.getElementById('navigator-overlay');
        if (sheet && overlay) {
            sheet.classList.add('hidden');
            overlay.classList.add('hidden');
            if (!fromPopState && history.state && history.state.isNavigatorOpen) {
                history.back();
            }
        }
    },

    nextNavigatorPage: function () {
        if ((this.navigatorCurrentPage + 1) * this.navigatorItemsPerPage < this.totalQuestions) {
            this.navigatorCurrentPage++;
            this.renderNavigatorGrid();
        }
    },

    prevNavigatorPage: function () {
        if (this.navigatorCurrentPage > 0) {
            this.navigatorCurrentPage--;
            this.renderNavigatorGrid();
        }
    },

    renderNavigatorGrid: function () {
        const grid = document.getElementById('navigator-grid');
        if (!grid) return;

        let skippedCount = 0;
        let html = '';

        for (let i = 0; i < this.totalQuestions; i++) {
            const isAnswered = this.mockAnswers && this.mockAnswers[i] && this.mockAnswers[i].status === 'answered';
            const isPending = !isAnswered;
            if (isPending) {
                skippedCount++;
            }
        }

        this.navigatorItemsPerPage = 18;
        const startIndex = this.navigatorCurrentPage * this.navigatorItemsPerPage;
        const endIndex = Math.min(startIndex + this.navigatorItemsPerPage, this.totalQuestions);

        for (let i = startIndex; i < endIndex; i++) {
            let isCurrent = (i === this.currentQuestion - 1);
            let stateClass = 'border-color: #9ca3af; color: #9ca3af;';
            let iconHtml = '';

            const isAnswered = this.mockAnswers && this.mockAnswers[i] && this.mockAnswers[i].status === 'answered';
            const isExplicitlySkipped = this.mockAnswers && this.mockAnswers[i] && this.mockAnswers[i].status === 'skipped';
            const isPending = !isAnswered;

            if (isAnswered) {
                stateClass = 'border-color: #22c55e; color: #22c55e;';
                iconHtml = `<div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; border-radius: 50%; background: #22c55e; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 2px white;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>`;
            } else if (isExplicitlySkipped || isPending) {
                stateClass = 'border-color: #9ca3af; color: #9ca3af;';
                iconHtml = `<div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; border-radius: 50%; background: white; border: 2px solid #9ca3af; box-sizing: border-box; box-shadow: 0 0 0 2px white;"></div>`;
            }

            if (isCurrent) {
                stateClass = 'border-color: #466ba9; color: #466ba9;';
                iconHtml = `<div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; border-radius: 50%; background: #466ba9; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 2px white;"><div style="width: 6px; height: 6px; border-radius: 50%; background: white;"></div></div>`;
            }

            html += `<button onclick="QuizEngine.jumpToQuestion(` + i + `)" style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 50px; border-radius: 12px; border: 1.5px solid currentColor; ` + stateClass + ` background: #ffffff; font-weight: 700; font-size: 16px; cursor: pointer;">` + (i + 1) + iconHtml + `</button>`;
        }

        grid.innerHTML = html;

        const paginator = document.getElementById('navigator-paginator');
        if (paginator) {
            if (this.totalQuestions > this.navigatorItemsPerPage) {
                paginator.style.display = 'flex';

                const prevBtn = document.getElementById('navigator-prev-btn');
                const nextBtn = document.getElementById('navigator-next-btn');

                if (prevBtn) {
                    if (this.navigatorCurrentPage === 0) {
                        prevBtn.classList.add('is-disabled');
                    } else {
                        prevBtn.classList.remove('is-disabled');
                    }
                }

                if (nextBtn) {
                    if (endIndex >= this.totalQuestions) {
                        nextBtn.classList.add('is-disabled');
                    } else {
                        nextBtn.classList.remove('is-disabled');
                    }
                }
            } else {
                paginator.style.display = 'none';
            }
        }

        const countSpan = document.getElementById('navigator-skipped-count');
        if (countSpan) {
            countSpan.innerText = skippedCount;
        }
        const reviewBtn = document.getElementById('navigator-review-skipped-btn');
        if (reviewBtn) {
            if (skippedCount > 0) {
                reviewBtn.disabled = false;
                reviewBtn.style.opacity = '1';
                reviewBtn.style.pointerEvents = 'auto';
            } else {
                reviewBtn.disabled = true;
                reviewBtn.style.opacity = '0.5';
                reviewBtn.style.pointerEvents = 'none';
            }
        }
    },

    jumpToQuestion: function (index) {
        if (index >= 0 && index < this.totalQuestions) {
            if (this.mockAnswers && (!this.mockAnswers[index] || this.mockAnswers[index].status !== 'answered')) {
                const searchLimit = this.examFullyTraversed ? this.totalQuestions : (this.maxQuestionReached - 1);
                if (index < searchLimit) {
                    if (!this.isReviewingSkipped) {
                        this.originalCurrentQuestion = this.currentQuestion;
                        this.isReviewingSkipped = true;
                    }
                } else {
                    this.isReviewingSkipped = false;
                }
            } else {
                this.isReviewingSkipped = false;
            }
            this.currentQuestion = index;
            this.loadQuestion();
            this.closeQuestionNavigator();
        }
    },

    startReviewSkipped: function () {
        if (!this.mockAnswers) return;
        let firstSkipped = -1;
        for (let i = 0; i < this.totalQuestions; i++) {
            if ((!this.mockAnswers[i] || this.mockAnswers[i].status !== 'answered')) {
                firstSkipped = i;
                break;
            }
        }
        if (firstSkipped !== -1) {
            this.isReviewingSkipped = true;
            this.currentQuestion = firstSkipped;
            this.loadQuestion();
            this.closeQuestionNavigator();
            this.showToast('Opening Question Navigator');
        }
    },

    initActiveQuiz: function () {
        this.mockAnswers = [];
        this.isTimeUp = false;
        this.isReviewingSkipped = false;
        this.examFullyTraversed = false;
        this.maxQuestionReached = 0;
        if (this.isResuming) {
            this.isResuming = false;
            // First, try to restore from resumedData
            const resumedCurrent = this.resumedData?.currentQuestion || 67;
            this.maxQuestionReached = this.resumedData?.maxQuestionReached || resumedCurrent;
            this.currentQuestion = resumedCurrent;
            this.score = this.resumedData?.score || 30;
            this.streak = this.resumedData?.streak || 5;
            this.bestStreak = this.resumedData?.bestStreak || 5;
            this.totalXp = this.resumedData?.totalXp || (resumedCurrent * 25);
            this.totalQuestions = this.resumedData?.totalQuestions || 150;

            // Restore mockAnswers
            this.mockAnswers = this.resumedData?.mockAnswers || [];

            // Fallback: If mockAnswers is empty but we resumed at Q > 0, fill with dummy answered data
            // This prevents previously completed questions from showing up as skipped
            if (this.mockAnswers.length === 0 && resumedCurrent > 0) {
                for (let i = 0; i < resumedCurrent; i++) {
                    this.mockAnswers[i] = { answered: true, isCorrect: true, selectedIndex: 0 };
                }
            }
        } else {
            this.currentQuestion = 0;
            this.score = 0;
            this.streak = 0;
            this.bestStreak = 0;
            this.totalXp = 0;

            const quickModes = ['Quick Play', 'Quick Quiz', '1v1 Challenge', 'Live Challenge', 'Classic Quiz'];
            if (quickModes.includes(this.currentMode)) {
                this.totalQuestions = parseInt(document.getElementById('preview-count').innerText) || 5;
            }
        }

        const streakEl = document.getElementById('active-streak');
        if (streakEl) streakEl.innerText = `🔥 ${this.streak} Streak`;
        const xpEl = document.getElementById('active-xp');
        if (xpEl) xpEl.innerText = `${this.totalXp} XP`;

        // Update Difficulty Badge dynamically
        const difficultyBadge = document.getElementById('active-difficulty');
        if (difficultyBadge) {
            const diffText = this.currentDifficulty || 'Intermediate';
            let diffIcon = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4da.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;">';
            if (diffText.toLowerCase() === 'beginner') diffIcon = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f331.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;">';
            if (diffText.toLowerCase() === 'advanced') diffIcon = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;">';
            difficultyBadge.innerHTML = `${diffIcon} ${diffText}`;
        }

        // Start timer
        this.timeElapsed = 0;
        const timerText = document.getElementById('active-timer-text');
        const timerContainer = document.getElementById('active-timer');
        timerContainer.classList.remove('timer-urgent');

        if (this.timerInterval) clearInterval(this.timerInterval);

        if (this.currentMode === 'Practice By Topic' || this.selectedFormat === 'Practice By Topic' || this.selectedFormat === 'Mixed Practice' || this.currentMode === 'Practice Weak Areas') {
            timerContainer.style.display = 'none'; // Hide timer for practice modes
            this.timerInterval = setInterval(() => {
                this.timeElapsed++;
            }, 1000);
        } else {
            timerContainer.style.display = 'flex'; // Show timer for other flows
            this.timeLeft = 120; // 2 minutes countdown

            this.timerInterval = setInterval(() => {
                this.timeElapsed++;
                this.timeLeft--;
                if (this.timeLeft <= 0) {
                    clearInterval(this.timerInterval);
                    this.timeLeft = 0;
                    this.isTimeUp = true;
                    this.finishQuiz();
                    return;
                }

                const m = Math.floor(this.timeLeft / 60);
                const s = this.timeLeft % 60;
                timerText.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

                if (this.timeLeft <= 10 && this.timeLeft > 0) {
                    timerContainer.classList.add('timer-urgent');
                } else {
                    timerContainer.classList.remove('timer-urgent');
                }
            }, 1000);
        }

        this.loadQuestion();
    },

    loadQuestion: function (targetQuestion = null) {
        if (targetQuestion !== null) {
            this.currentQuestion = targetQuestion;
        } else {
            this.currentQuestion++;
        }
        if (this.currentQuestion > this.maxQuestionReached) {
            this.maxQuestionReached = this.currentQuestion;
        }
        this.questionStartTime = Date.now();
        if (this.currentQuestion === 1) {
            this.quizStartTime = Date.now();
        }

        // Update Progress Bar & Counters
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        document.getElementById('active-progress-fill').style.width = `${progress}%`;
        document.getElementById('active-progress-text').innerText = `${Math.round(progress)}% Complete`;
        document.getElementById('active-question-counter').innerText = `Question ${this.currentQuestion} of ${this.totalQuestions}`;

        // Hide Feedback
        document.getElementById('feedback-sheet').classList.add('hidden');
        document.getElementById('feedback-overlay').classList.add('hidden');
        document.getElementById('feedback-sheet').classList.remove('correct', 'wrong');

        const inlineContainer = document.getElementById('inline-feedback-container');
        if (inlineContainer) {
            inlineContainer.style.display = 'none';
        }

        const mockActions = document.getElementById('mock-exam-actions');
        const isMockExam = (this.currentFlow === 'mock' || this.selectedCategory === 'Mock Exam' || this.selectedCategory === 'Promotion Exam');

        const mockStatsContainer = document.getElementById('mock-stats-container');
        if (mockActions) {
            if (isMockExam) {
                mockActions.style.display = 'flex';
                if (mockStatsContainer) mockStatsContainer.style.display = 'flex';
                this.updateMockStats();

                const mockSkipBtn = document.getElementById('mock-skip-btn');
                if (mockSkipBtn) mockSkipBtn.style.display = 'inline-flex';
            } else {
                mockActions.style.display = 'none';
                if (mockStatsContainer) mockStatsContainer.style.display = 'none';
            }
        }

        this.updateSkippedNavigatorBar();

        // Layout is now uniform: timer is always in the top bar and XP/Level/Streak are removed.

        // Mock Question Data
        const qData = this.questionsData[(this.currentQuestion - 1) % this.questionsData.length];
        document.getElementById('question-text').innerText = qData.q;

        const answersGrid = document.getElementById('answers-grid');
        answersGrid.innerHTML = qData.opts.map((opt, index) => {
            const isCorrect = (index === qData.correct);
            const letter = String.fromCharCode(65 + index);
            return `<button class="answer-btn" onclick="QuizEngine.selectAnswer(this, ${isCorrect}, ${index})" style="transition: transform 0.1s ease, box-shadow 0.1s ease; display: flex; gap: 12px; align-items: flex-start; text-align: left;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 9px; background: rgba(15, 23, 42, 0.05); font-weight: 700; color: #475569; flex-shrink: 0; font-size: 14px;">${letter}</span>
                        <span style="display: flex; align-items: center; min-height: 28px; flex: 1; min-width: 0; line-height: 1.45;">${opt}</span>
                    </button>`;
        }).join('');
    },

    selectAnswer: function (btnElement, isCorrect, selectedIndex = -1) {
        // Disable all buttons
        const buttons = document.getElementById('answers-grid').querySelectorAll('button');
        buttons.forEach(btn => btn.disabled = true);

        // Add micro-interaction: slight scale down
        btnElement.style.transform = 'scale(0.95)';
        setTimeout(() => { btnElement.style.transform = 'scale(1)'; }, 150);

        const isMockExam = (this.currentFlow === 'mock' || this.selectedCategory === 'Mock Exam' || this.selectedCategory === 'Promotion Exam');
        if (isMockExam) {
            btnElement.classList.add('mock-selected');
            if (!this.mockAnswers) this.mockAnswers = new Array(this.totalQuestions).fill(null);
            this.mockAnswers[this.currentQuestion - 1] = { status: 'answered', isCorrect: isCorrect, selectedIndex: selectedIndex };
            if (isCorrect) this.score++;
            const mockSkipBtn = document.getElementById('mock-skip-btn');
            if (mockSkipBtn) mockSkipBtn.style.display = 'none';

            this.updateMockStats();

            setTimeout(() => {
                this.nextQuestion();
            }, 1000);
            return;
        }

        const sheet = document.getElementById('feedback-sheet');
        const overlay = document.getElementById('feedback-overlay');
        const icon = document.getElementById('feedback-icon');
        const title = document.getElementById('feedback-title');
        const xp = document.getElementById('feedback-xp');
        const streakMsg = document.getElementById('feedback-streak-msg');

        sheet.classList.remove('correct', 'wrong');

        const qData = this.questionsData[(this.currentQuestion - 1) % this.questionsData.length];
        const timeTaken = (Date.now() - this.questionStartTime) / 1000;
        const isPracticeAidsFlow = (this.currentFlow === 'topic' || this.currentFlow === 'mixed' || this.currentMode === 'Practice By Topic' || this.currentMode === 'Mixed Practice' || this.currentMode === 'Practice Weak Areas' || this.selectedFormat === 'Practice By Topic' || this.selectedFormat === 'Mixed Practice');

        if (isCorrect) {
            btnElement.classList.add('correct');

            this.score++;
            this.streak++;
            if (this.streak > this.bestStreak) this.bestStreak = this.streak;

            let xpEarned = 25; // Base 25 XP
            if (timeTaken < 3.0) {
                xpEarned += 15; // Speed bonus +15 XP

                const isPracticeMode = (this.currentMode === 'Practice By Topic' || this.selectedFormat === 'Practice By Topic' || this.selectedFormat === 'Mixed Practice' || this.currentMode === 'Practice Weak Areas');

                if (!isPracticeMode) {
                    this.showToast('⚡ Quick Thinker +15 Bonus XP');
                }
            }
            this.totalXp += xpEarned;

            // Floating XP Gamification
            const floatXP = document.createElement('div');
            floatXP.className = 'floating-xp';
            floatXP.innerHTML = `✅ Correct<br>+${xpEarned} XP`;
            // btnElement.appendChild(floatXP);
            setTimeout(() => floatXP.remove(), 1200);

            // Update Streak Indicator in top bar
            const streakContainer = document.getElementById('streak-container');
            const streakEl = document.getElementById('active-streak');

            if (streakEl) streakEl.innerText = `🔥 ${this.streak} Streak`;

            if (streakContainer) {
                streakContainer.classList.remove('streak-pulse');
                void streakContainer.offsetWidth; // trigger reflow
                streakContainer.classList.add('streak-pulse');
            }

            const xpEl2 = document.getElementById('active-xp');
            if (xpEl2) xpEl2.innerText = `${this.totalXp} XP`;

            sheet.classList.add('correct');

            if (this.currentMode === 'Practice By Topic' || this.selectedFormat === 'Practice By Topic' || this.selectedFormat === 'Mixed Practice' || this.currentMode === 'Practice Weak Areas') {
                document.getElementById('feedback-details').style.display = 'none';
            } else {
                document.getElementById('feedback-details').style.display = 'flex';
            }

            if (isPracticeAidsFlow) {
                icon.style.display = 'none';
                if (icon.parentElement) icon.parentElement.style.alignItems = 'flex-start';
                title.innerText = 'Correct!';
                const fbSub = document.getElementById('feedback-subtitle');
                if (fbSub) {
                    fbSub.style.display = 'block';
                    fbSub.innerText = "You've selected the right option";
                }
            } else {
                icon.style.display = 'flex';
                icon.style.alignSelf = '';
                icon.style.flexShrink = '';
                if (icon.parentElement) icon.parentElement.style.alignItems = 'center';
                icon.innerHTML = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f973.png" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle;">';
                title.innerText = 'Excellent!';
                const fbSub = document.getElementById('feedback-subtitle');
                if (fbSub) {
                    fbSub.style.display = 'none';
                    fbSub.innerText = "";
                }
            }

            streakMsg.innerHTML = `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Streak: ${this.streak}`;
            streakMsg.style.display = 'none';

            document.getElementById('feedback-explanation').innerHTML = qData.expCorrect;


        } else {
            btnElement.classList.add('wrong');

            buttons.forEach(btn => {
                if (btn.getAttribute('onclick').includes('true')) {
                    btn.classList.add('correct', 'correct-revealed');
                } else if (btn !== btnElement) {
                    btn.style.opacity = '0.4';
                }
            });

            this.streak = 0;
            this.streak = 0;
            const streakElReset = document.getElementById('active-streak');
            if (streakElReset) streakElReset.innerText = '🔥 0 Streak';

            sheet.classList.add('wrong');
            if (isPracticeAidsFlow) {
                icon.style.display = 'none';
                if (icon.parentElement) icon.parentElement.style.alignItems = 'flex-start';
                title.innerText = 'Incorrect';
                const fbSub = document.getElementById('feedback-subtitle');
                if (fbSub) {
                    fbSub.style.display = 'block';
                    fbSub.innerText = "You've selected the wrong option";
                }
            } else {
                icon.style.display = 'flex';
                icon.style.alignSelf = '';
                icon.style.flexShrink = '';
                if (icon.parentElement) icon.parentElement.style.alignItems = 'center';
                icon.innerHTML = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/274c.png" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle;">';
                title.innerText = 'Incorrect';
                const fbSub = document.getElementById('feedback-subtitle');
                if (fbSub) {
                    fbSub.style.display = 'none';
                    fbSub.innerText = "";
                }
            }
            document.getElementById('feedback-details').style.display = 'none';

            document.getElementById('feedback-explanation').innerHTML = qData.expWrong;
        }

        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(isCorrect ? [50] : [50, 100, 50]);
        }

        const aiBox = document.getElementById('ai-explanation-box');
        const aiBadge = document.getElementById('ai-explanation-badge');

        if (this.currentMode === 'Practice By Topic' || this.currentMode === 'Mixed Practice' || this.currentMode === 'Mock Exam' || this.currentMode === 'Practice Weak Areas' || this.currentFlow === 'topic' || this.currentFlow === 'mixed' || this.currentFlow === 'mock') {
            aiBadge.style.display = 'flex';
        } else {
            aiBadge.style.display = 'none';
        }

        setTimeout(() => {
            // Populate inline feedback
            const inlineContainer = document.getElementById('inline-feedback-container');
            const inlineIcon = document.getElementById('inline-feedback-icon');
            const inlineTitle = document.getElementById('inline-feedback-title');
            const inlineXp = document.getElementById('inline-feedback-xp');
            const inlineStreakMsg = document.getElementById('inline-feedback-streak-msg');
            const inlineAccuracy = document.getElementById('inline-feedback-accuracy');

            if (inlineContainer) {
                inlineContainer.style.display = 'flex';
                // Auto-scroll to ensure Next Question button is visible
                setTimeout(() => {
                    inlineContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
                const currentAccuracy = Math.round((this.score / this.currentQuestion) * 100);
                inlineAccuracy.innerText = `🎯 Accuracy: ${currentAccuracy}%`;

                const inlineSub = document.getElementById('inline-feedback-subtitle');

                if (isCorrect) {
                    inlineIcon.style.background = 'transparent';
                    if (isPracticeAidsFlow) {
                        inlineIcon.style.display = 'none';
                        if (inlineIcon.parentElement) inlineIcon.parentElement.style.alignItems = 'flex-start';

                        if (inlineSub) {
                            inlineSub.style.display = 'block';
                            inlineSub.innerText = "You've selected the right option";
                        }
                    } else {
                        inlineIcon.style.display = 'flex';
                        inlineIcon.style.alignSelf = '';
                        inlineIcon.style.flexShrink = '';
                        if (inlineIcon.parentElement) inlineIcon.parentElement.style.alignItems = 'center';
                        inlineIcon.innerHTML = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f973.png" style="width: 32px; height: 32px; object-fit: contain; display: block; margin: 0; padding: 0; border: none;">';
                        // inlineIcon.style.fontSize = '24px';
                        if (inlineSub) {
                            inlineSub.style.display = 'none';
                            inlineSub.innerText = '';
                        }
                    }
                    inlineTitle.innerText = 'Correct!';
                    inlineTitle.style.color = '#ffffff';

                    let xpEarned = (timeTaken < 3.0) ? 40 : 25;
                    inlineXp.style.color = '#ffffff';
                    inlineXp.innerText = `+${xpEarned} XP Earned`;
                    inlineStreakMsg.innerText = ``;
                } else {
                    inlineIcon.style.background = 'transparent';
                    if (isPracticeAidsFlow) {
                        inlineIcon.style.display = 'none';
                        if (inlineIcon.parentElement) inlineIcon.parentElement.style.alignItems = 'flex-start';
                        if (inlineSub) {
                            inlineSub.style.display = 'block';
                            inlineSub.innerText = "You've selected the wrong option";
                        }
                    } else {
                        inlineIcon.style.display = 'flex';
                        inlineIcon.style.alignSelf = '';
                        inlineIcon.style.flexShrink = '';
                        if (inlineIcon.parentElement) inlineIcon.parentElement.style.alignItems = 'center';
                        inlineIcon.innerHTML = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/274c.png" style="width: 32px; height: 32px; object-fit: contain; display: block; margin: 0; padding: 0; border: none;">';
                        inlineIcon.style.fontSize = '24px';
                        if (inlineSub) {
                            inlineSub.style.display = 'none';
                            inlineSub.innerText = '';
                        }
                    }
                    inlineTitle.innerText = 'Incorrect';
                    inlineTitle.style.color = '#ffffff';

                    inlineXp.style.color = '#ffffff';
                    inlineXp.innerText = '+0 XP Earned';
                    inlineStreakMsg.innerText = ``;
                }

                // Hide XP and Accuracy for Practice Aids and AI Tutor
                const inlineDetails = document.getElementById('inline-feedback-details');
                if (this.currentMode === 'Practice By Topic' || this.selectedFormat === 'Practice By Topic' || this.selectedFormat === 'Mixed Practice' || this.currentMode === 'Practice Weak Areas') {
                    inlineXp.style.display = 'none';
                    inlineAccuracy.style.display = 'none';
                    if (inlineStreakMsg) inlineStreakMsg.style.display = 'none';
                    if (inlineDetails) inlineDetails.style.display = 'none';
                } else {
                    inlineXp.style.display = 'block';
                    inlineAccuracy.style.display = 'block';
                    if (inlineStreakMsg) inlineStreakMsg.style.display = '';
                    if (inlineDetails) inlineDetails.style.display = 'flex';
                }

                this.updateNextQuestionBtn();
            }

            // Only update bottom sheet XP animation in case it gets opened
            if (isCorrect) {
                let xpEarned = (timeTaken < 3.0) ? 40 : 25;
                xp.innerText = '+0 XP Earned';
                let currentDisplayXp = 0;
                const xpInterval = setInterval(() => {
                    currentDisplayXp += Math.ceil(xpEarned / 10);
                    if (currentDisplayXp >= xpEarned) {
                        currentDisplayXp = xpEarned;
                        clearInterval(xpInterval);
                    }
                    xp.innerText = `+${currentDisplayXp} XP Earned`;
                }, 30);
            }
        }, 600);
    },

    openFeedbackSheet: function () {
        const sheet = document.getElementById('feedback-sheet');
        const overlay = document.getElementById('feedback-overlay');
        if (sheet && overlay) {
            sheet.classList.remove('correct', 'wrong');
            sheet.classList.remove('hidden');
            overlay.classList.remove('hidden');
        }
    },

    closeFeedbackSheet: function () {
        const sheet = document.getElementById('feedback-sheet');
        const overlay = document.getElementById('feedback-overlay');
        if (sheet && overlay) {
            sheet.classList.add('hidden');
            overlay.classList.add('hidden');
        }
    },

    previousSkippedQuestion: function () {
        if (!this.isReviewingSkipped) return;
        let prevSkipped = -1;
        // Search backward
        for (let i = this.currentQuestion - 2; i >= 0; i--) {
            if ((!this.mockAnswers[i] || this.mockAnswers[i].status !== 'answered')) {
                prevSkipped = i;
                break;
            }
        }
        // Wrap around to end
        if (prevSkipped === -1) {
            for (let i = this.totalQuestions - 1; i >= this.currentQuestion; i--) {
                if ((!this.mockAnswers[i] || this.mockAnswers[i].status !== 'answered')) {
                    prevSkipped = i;
                    break;
                }
            }
        }

        if (prevSkipped !== -1 && prevSkipped !== this.currentQuestion - 1) {
            this.currentQuestion = prevSkipped;
            this.loadQuestion();
        }
    },

    nextSkippedQuestion: function () {
        this.nextQuestion();
    },

    nextQuestion: function () {
        this.stopConfetti();
        const sheet = document.getElementById('feedback-sheet');
        const overlay = document.getElementById('feedback-overlay');
        if (sheet) sheet.classList.add('hidden');
        if (overlay) overlay.classList.add('hidden');

        if (this.isReviewingSkipped) {
            let nextSkipped = -1;
            const searchLimit = this.examFullyTraversed ? this.totalQuestions : (this.maxQuestionReached - 1);
            // Search forward
            for (let i = this.currentQuestion; i < searchLimit; i++) {
                if ((!this.mockAnswers[i] || this.mockAnswers[i].status !== 'answered')) {
                    nextSkipped = i;
                    break;
                }
            }
            // Search backward if not found forward (wrap around)
            if (nextSkipped === -1) {
                for (let i = 0; i < this.currentQuestion - 1; i++) {
                    if ((!this.mockAnswers[i] || this.mockAnswers[i].status !== 'answered')) {
                        nextSkipped = i;
                        break;
                    }
                }
            }

            if (nextSkipped !== -1 && nextSkipped !== this.currentQuestion - 1) {
                this.currentQuestion = nextSkipped;
                this.loadQuestion();
            } else {
                this.isReviewingSkipped = false;
                this.showToast('All Skipped Answered');
                // Return to original current question or first unanswered
                if (this.originalCurrentQuestion !== undefined && this.originalCurrentQuestion !== null) {
                    this.currentQuestion = this.originalCurrentQuestion;
                    this.originalCurrentQuestion = null;
                    this.loadQuestion(this.currentQuestion);
                } else {
                    let firstUnanswered = -1;
                    for (let i = 0; i < this.totalQuestions; i++) {
                        if ((!this.mockAnswers[i] || this.mockAnswers[i].status !== 'answered')) {
                            firstUnanswered = i; break;
                        }
                    }
                    if (firstUnanswered !== -1) {
                        this.currentQuestion = firstUnanswered;
                        this.loadQuestion();
                    } else {
                        this.showToast('🎉 Challenge Complete');
                        setTimeout(() => {
                            this.finishQuiz();
                        }, 1000);
                    }
                }
            }
            return;
        }

        if (this.currentQuestion >= this.totalQuestions) {
            this.examFullyTraversed = true;
            const isMockExam = (this.currentFlow === 'mock' || this.selectedCategory === 'Mock Exam' || this.selectedCategory === 'Promotion Exam');
            let hasSkipped = false;
            if (isMockExam) {
                for (let i = 0; i < this.totalQuestions; i++) {
                    if ((!this.mockAnswers[i] || this.mockAnswers[i].status !== 'answered')) {
                        hasSkipped = true;
                        break;
                    }
                }
            }

            if (hasSkipped && !this.isTimeUp) {
                const modal = document.getElementById('incomplete-modal');
                if (modal) {
                    modal.style.display = 'flex';
                }
            } else {
                this.showToast('🎉 Challenge Complete');
                setTimeout(() => {
                    this.finishQuiz();
                }, 1000);
            }
            return;
        }

        this.currentQuestion++;

        const isPracticeMode = (this.currentMode === 'Practice By Topic' || this.selectedFormat === 'Practice By Topic' || this.selectedFormat === 'Mixed Practice' || this.currentMode === 'Practice Weak Areas');

        if (!isPracticeMode) {
            if (this.currentQuestion === Math.floor(this.totalQuestions / 2)) {
                this.showToast('🚀 Halfway There');
            } else if (this.currentQuestion === this.totalQuestions - 1) {
                this.showToast('🏁 Final Question');
            }
        }

        this.loadQuestion(this.currentQuestion);
    },

    showSkippedQuestionsView: function () {
        this.navigate('view-skipped-questions', 'view-active');
        const grid = document.getElementById('skipped-questions-grid');
        if (grid) {
            grid.innerHTML = '';
            let hasSkipped = false;

            for (let i = 0; i < this.totalQuestions; i++) {
                const answerData = this.mockAnswers[i];
                if (!answerData || answerData.status !== 'answered') {
                    hasSkipped = true;
                    const btn = document.createElement('button');
                    btn.className = '';
                    btn.style.fontFamily = 'inherit';
                    btn.style.padding = '16px 12px';
                    btn.style.fontSize = '16px';
                    btn.style.fontWeight = '700';
                    btn.style.borderRadius = '16px';
                    btn.style.border = '2px solid rgba(70, 107, 169, 0.1)';
                    btn.style.background = '#ffffff';
                    btn.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)';
                    btn.style.color = '#466ba9';
                    btn.style.display = 'flex';
                    btn.style.alignItems = 'center';
                    btn.style.justifyContent = 'center';
                    btn.style.cursor = 'pointer';
                    btn.style.transition = 'transform 0.1s ease, box-shadow 0.2s ease, border-color 0.2s ease';
                    btn.onmousedown = () => btn.style.transform = 'scale(0.95)';
                    btn.onmouseup = () => btn.style.transform = 'scale(1)';
                    btn.onmouseleave = () => btn.style.transform = 'scale(1)';
                    btn.innerText = `Q${i + 1}`;
                    btn.onclick = () => this.reviewSkippedQuestion(i);
                    grid.appendChild(btn);
                }
            }

            if (!hasSkipped) {
                this.finishQuiz();
            }
        }
    },

    reviewSkippedQuestion: function (index) {
        if (!this.isReviewingSkipped) {
            this.originalCurrentQuestion = this.currentQuestion; // Store 1-based index
            this.isReviewingSkipped = true;
        }
        this.navigate('view-active', 'view-skipped-questions');
        this.loadQuestion(index + 1);
    },

    finishQuiz: function () {
        // Clear any saved progress since the exam is now finished
        localStorage.removeItem('saved_exam_progress');
        this.updateResumeWidget();

        // Reset state flags so future quizzes start fresh
        this.isReviewingSkipped = false;
        this.isResuming = false;

        const accuracy = Math.round((this.score / this.totalQuestions) * 100);

        // Capture total elapsed time instantly to prevent UI drift between summary and analytics
        if (this.quizStartTime) {
            this.finalTotalTimeSeconds = Math.max(1, Math.floor((Date.now() - this.quizStartTime) / 1000));
        } else {
            this.finalTotalTimeSeconds = this.timeElapsed || 0;
        }

        // Update progress data dynamically based on exam result
        this.recentProgressData.push(accuracy);
        if (this.recentProgressData.length > 5) this.recentProgressData.shift();
        this.allProgressData.push(accuracy);

        if (this.selectedCategory) {
            let topicName = this.selectedCategory;
            if (topicName === 'AI Focus Tutor' && this.weakestSubjectsList && this.weakestSubjectsList.length > 0) {
                topicName = this.weakestSubjectsList[0];
            }
            let topicObj = this.topicsPerformance.find(t => t.name === topicName);
            if (!topicObj && this.topicsPerformance.length > 0) {
                topicObj = this.topicsPerformance[Math.floor(Math.random() * this.topicsPerformance.length)];
            }
            if (topicObj) {
                topicObj.prevScore = topicObj.score;
                topicObj.score = Math.round(topicObj.score * 0.7 + accuracy * 0.3);
            }
        }

        // Mock opponent score for the battle view
        const opponentScore = Math.max(0, this.score - 1 + Math.floor(Math.random() * 3));
        const opponentAccuracy = Math.round((opponentScore / this.totalQuestions) * 100);
        const didWin = this.score >= opponentScore;
        const isTie = this.score === opponentScore;

        document.getElementById('completion-title').innerText = didWin ? (isTie ? 'It\'s a Tie!' : 'You Won!') : 'So Close!';
        document.getElementById('completion-subtitle').innerText = 'Challenge Complete';

        let emojiUrl = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png'; // win
        let bgColor = '#466ba9'; // primary blue
        let accentColor = '#466ba9'; // primary blue for text

        if (isTie) {
            emojiUrl = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f91d.png'; // tie
            bgColor = '#466ba9';
            accentColor = '#466ba9';
        } else if (!didWin) {
            emojiUrl = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f61e.png'; // lose
            bgColor = '#466ba9';
            accentColor = '#466ba9';
        }

        // Apply thematic styling
        const viewCompletion = document.getElementById('view-completion');
        if (viewCompletion) {
            viewCompletion.style.background = bgColor;
            viewCompletion.style.setProperty('--result-accent', accentColor);
        }

        document.getElementById('completion-emoji').innerHTML = `<img src="../images/exam_image-badge.png" class="result-badge-img" alt="">`;

        // Multiplier for score to make it look like a real game score
        const scoreMultiplier = 25;
        document.getElementById('my-score-val').innerText = `${this.score * scoreMultiplier}`;
        document.getElementById('opp-score-val').innerText = `${opponentScore * scoreMultiplier}`;

        // Correct answers
        document.getElementById('my-correct-val').innerText = `${this.score}`;
        document.getElementById('opp-correct-val').innerText = `${opponentScore}`;

        document.getElementById('my-acc-val').innerText = `${accuracy}%`;
        document.getElementById('opp-acc-val').innerText = `${opponentAccuracy}%`;

        // Mock stats for streaks and time
        const myStreak = this.bestStreak || Math.max(1, Math.floor(this.score / 2));
        const oppStreak = Math.max(1, myStreak - 1 + Math.floor(Math.random() * 3));
        document.getElementById('my-streak-val').innerText = `${myStreak}`;
        document.getElementById('opp-streak-val').innerText = `${oppStreak}`;

        // Mock fastest time
        const myFastest = (1.0 + Math.random()).toFixed(1);
        const oppFastest = (1.0 + Math.random() + (didWin ? 0.5 : -0.2)).toFixed(1);
        document.getElementById('my-fastest-val').innerText = `${myFastest}s`;
        document.getElementById('opp-fastest-val').innerText = `${Math.max(0.8, oppFastest)}s`;

        const myAvg = (2.0 + Math.random()).toFixed(1);
        const oppAvg = (2.0 + Math.random() + (didWin ? 0.5 : -0.2)).toFixed(1);
        document.getElementById('my-time-val').innerText = `${myAvg}s`;
        document.getElementById('opp-time-val').innerText = `${Math.max(1.2, oppAvg)}s`;

        // Insight logic
        let insight = '';
        if (didWin && !isTie) {
            if (myFastest < oppFastest && myAvg < oppAvg) {
                insight = `You answered faster on average, securing the victory!`;
            } else if (accuracy > opponentAccuracy) {
                insight = `Your accuracy improved by ${accuracy - opponentAccuracy}%, leading you to victory!`;
            } else {
                insight = `Your best streak of ${myStreak} correct answers made the difference!`;
            }
        } else if (isTie) {
            insight = `A perfectly matched game! Your performance was remarkably similar to your opponent.`;
        } else {
            if (oppStreak > myStreak) {
                insight = `Your opponent answered more consistently with a streak of ${oppStreak}.`;
            } else {
                insight = `So close! Your opponent had a slight edge this time.`;
            }
        }
        document.getElementById('match-insight-text').innerText = insight;

        // Update Rewards
        if (didWin) {
            document.getElementById('result-xp-reward').innerHTML = `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2b50.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +${this.totalXp} XP Earned`;
            document.getElementById('result-rank-reward').innerHTML = `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4c8.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Rank Increased +2`;
            document.getElementById('result-badge-reward').innerHTML = `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f947.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> New Badge Unlocked`;
            document.querySelector('.rewards-card').style.display = 'block';
        } else {
            document.querySelector('.rewards-card').style.display = 'none';
        }

        const isCompetitive = this.currentFlow === 'colleague' || this.currentFlow === 'live' || this.currentMode === '1v1 Challenge' || this.currentMode === 'Live Challenge';
        const isSolo = !isCompetitive && (this.currentFlow === 'quick' || this.currentFlow === 'mixed' || this.currentFlow === 'topic' || this.currentFlow === 'mock' || this.currentMode === 'Practice By Topic' || this.currentMode === 'Quick Quiz' || this.currentMode === 'Quick Play' || this.currentMode === 'Mixed Practice' || this.currentMode === 'Mock Exam' || this.currentMode === 'Practice Weak Areas' || this.selectedFormat === 'Quick Quiz' || this.selectedFormat === 'Quick Play' || this.selectedFormat === 'Practice By Topic' || this.selectedFormat === 'Mixed Practice');
        if (isSolo) {
            const myStreak = this.bestStreak || Math.max(1, Math.floor(this.score / 2));
            let avgTime = 3.4; // Default mock
            if (this.finalTotalTimeSeconds > 0) {
                avgTime = Math.max(0.1, this.finalTotalTimeSeconds / this.totalQuestions).toFixed(1);
            }

            let actualCorrect = 0;
            let actualIncorrect = 0;
            let actualSkipped = 0;

            if (this.mockAnswers && this.mockAnswers.length > 0) {
                for (let i = 0; i < this.totalQuestions; i++) {
                    if (this.mockAnswers[i] && this.mockAnswers[i].status === 'answered') {
                        if (this.mockAnswers[i].isCorrect) {
                            actualCorrect++;
                        } else {
                            actualIncorrect++;
                        }
                    } else {
                        actualSkipped++;
                    }
                }
            } else {
                actualCorrect = this.score;
                actualIncorrect = this.totalQuestions - this.score;
            }

            // Sync this.score just in case
            this.score = actualCorrect;

            document.getElementById('solo-score-val').innerText = `${this.score}/${this.totalQuestions}`;
            document.getElementById('solo-accuracy-val').innerText = `${accuracy}%`;

            const accuracyRing = document.getElementById('solo-accuracy-ring');
            if (accuracyRing) {
                accuracyRing.setAttribute('stroke-dasharray', `${accuracy}, 100`);
                accuracyRing.classList.remove('result-score-ring__progress--excellent', 'result-score-ring__progress--good', 'result-score-ring__progress--fair', 'result-score-ring__progress--low');
                if (accuracy >= 80) accuracyRing.classList.add('result-score-ring__progress--excellent');
                else if (accuracy >= 60) accuracyRing.classList.add('result-score-ring__progress--good');
                else if (accuracy >= 40) accuracyRing.classList.add('result-score-ring__progress--fair');
                else accuracyRing.classList.add('result-score-ring__progress--low');
            }

            document.getElementById('solo-correct-val').innerText = `${this.score}`;
            document.getElementById('solo-incorrect-val').innerText = `${actualIncorrect}`;

            const skippedContainer = document.getElementById('solo-skipped-container');
            const skippedVal = document.getElementById('solo-skipped-val');
            if (skippedContainer && skippedVal) {
                if (actualSkipped > 0) {
                    skippedContainer.style.display = 'flex';
                    skippedVal.innerText = `${actualSkipped}`;
                } else {
                    skippedContainer.style.display = 'none';
                }
            }

            document.getElementById('solo-time-val').innerText = `${avgTime}s`;

            // Show total time for the second occurrence
            const totalMin2 = Math.floor(this.finalTotalTimeSeconds / 60);
            const totalSec2 = this.finalTotalTimeSeconds % 60;
            const totalTimeStr2 = totalMin2 > 0 ? `${totalMin2}m ${totalSec2}s` : `${totalSec2}s`;
            const totalTimeEl2 = document.getElementById('solo-total-time-val');
            if (totalTimeEl2) totalTimeEl2.innerText = totalTimeStr2;


            const bestTopicContainer = document.getElementById('solo-best-topic-container');
            if (this.currentMode === 'Practice Weak Areas') {
                if (bestTopicContainer) bestTopicContainer.style.display = 'none';
            } else {
                if (bestTopicContainer) bestTopicContainer.style.display = 'flex';
                document.getElementById('solo-best-topic-val').innerText = this.selectedCategory || 'General Law';
            }

            const weakestTopicContainer = document.getElementById('solo-weakest-topic-container');
            if (actualIncorrect === 0 && this.currentMode !== 'Practice Weak Areas') {
                if (weakestTopicContainer) weakestTopicContainer.style.display = 'none';
            } else {
                if (weakestTopicContainer) weakestTopicContainer.style.display = 'flex';
                document.getElementById('solo-weakest-topic-val').innerText = 'Tort Law'; // Mock weakest topic
            }

            document.getElementById('solo-insight-text').innerHTML = `You scored better than your last attempt.<br><strong>+${Math.floor(Math.random() * 10) + 5}% Improvement</strong>`;

            let quizType = 'quick';
            if (this.currentFlow === 'mock' || this.currentMode === 'Mock Exam' || this.selectedFormat === 'Mock Exam') {
                quizType = 'mock';
            } else if (this.currentFlow === 'topic' || this.currentFlow === 'mixed' || this.currentMode === 'Practice By Topic' || this.currentMode === 'Mixed Practice' || this.selectedFormat === 'Practice By Topic' || this.selectedFormat === 'Mixed Practice') {
                quizType = 'practice';
            } else if (this.currentMode === 'Practice Weak Areas') {
                quizType = 'ai-tutor';
            }

            const actionsContainer = document.getElementById('solo-completion-actions');
            if (actionsContainer) {
                if (quizType === 'mock') {
                    this.setResultBackLink('Return to Hub', 'QuizEngine.returnHome()');
                    const buttons = [
                        this.buildResultCta('Review Answers', 'review', "QuizEngine.navigate('view-analytics')", 'primary')
                    ];
                    if (this.score < this.totalQuestions) {
                        buttons.push(this.buildResultCta('Practice Weak Area', 'practice-weak', "QuizEngine.startFlow('topic')", 'secondary'));
                    }
                    this.renderResultActions(actionsContainer, buttons);
                } else if (quizType === 'practice') {
                    this.setResultBackLink(null);
                    const defaultPracticeBack = this.currentFlow === 'mixed' ? "QuizEngine.restartFlow('mixed')" : "QuizEngine.restartFlow('topic')";
                    const backAction = this.launchedFromProgress ? "QuizEngine.returnToProgress()" : defaultPracticeBack;

                    if (this.launchedFromProgress) {
                        if (actualIncorrect > 0) {
                            this.renderResultActions(actionsContainer, [
                                this.buildResultCta('Back', 'back', backAction, 'primary', 'compact'),
                                this.buildResultCta('Practice Topic', 'practice-topic', "QuizEngine.startFlow('topic')", 'secondary', 'grow')
                            ]);
                        } else {
                            this.renderResultActions(actionsContainer, [
                                this.buildResultCta('Back', 'back', backAction, 'primary')
                            ]);
                        }
                    } else {
                        this.renderResultActions(actionsContainer, [
                            this.buildResultCta('Back', 'back', backAction, 'primary', 'compact'),
                            this.buildResultCta('Start Mock Exam', 'mock-exam', "QuizEngine.startFlow('mock')", 'secondary', 'grow')
                        ]);
                    }
                } else if (quizType === 'ai-tutor') {
                    this.setResultBackLink(null);
                    const backAction = this.launchedFromProgress ? "QuizEngine.returnToProgress()" : "QuizEngine.returnHome()";
                    if (actualIncorrect > 0) {
                        this.renderResultActions(actionsContainer, [
                            this.buildResultCta('Back', 'back', backAction, 'primary', 'compact'),
                            this.buildResultCta('Practice Topic', 'practice-topic', "QuizEngine.startFlow('topic')", 'secondary', 'grow')
                        ]);
                    } else {
                        this.renderResultActions(actionsContainer, [
                            this.buildResultCta('Back', 'back', backAction, 'primary')
                        ]);
                    }
                } else {
                    this.setResultBackLink(null);
                    this.renderResultActions(actionsContainer, [
                        this.buildResultCta('Play Again', 'play-again', "QuizEngine.startFlow('quick')", 'primary'),
                        this.buildResultCta('Leaderboard', 'leaderboard', "QuizEngine.navigate('view-leaderboard')", 'secondary')
                    ]);
                }
            }

            const emojiEl = document.getElementById('solo-completion-emoji');
            if (emojiEl) {
                emojiEl.innerHTML = `<img src="../images/exam_image-badge.png" class="result-badge-img" alt="">`;
            }

            const statusEl = document.getElementById('solo-completion-status');
            if (statusEl) {
                if (quizType === 'mock') {
                    statusEl.innerText = 'Assessment Complete';
                } else if (quizType === 'ai-tutor' || quizType === 'practice') {
                    statusEl.innerText = 'Practice Completed';
                } else {
                    statusEl.innerText = 'Quiz Complete';
                }
            }

            const soloView = document.getElementById('view-solo-completion');
            if (soloView) {
                if (quizType === 'mock' || quizType === 'practice' || quizType === 'ai-tutor') {
                    soloView.style.background = 'linear-gradient(to bottom, rgb(134, 174, 244), #4b73b7, #345da5)';
                } else {
                    soloView.style.background = '#466ba9';
                }
            }

            this.navigate('view-solo-completion');
        } else {
            this.navigate('view-completion');
        }


        if (typeof confetti === 'function') {
            if (!QuizEngine.myConfetti) {
                const canvas = document.createElement('canvas');
                canvas.style.position = 'absolute';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.pointerEvents = 'none';
                canvas.style.zIndex = '2000';
                document.querySelector('.app-container').appendChild(canvas);
                QuizEngine.myConfetti = confetti.create(canvas, { resize: true });
            }

            let shouldCelebrate = false;
            let isTieState = false;
            let isLossState = false;

            if (isSolo) {
                shouldCelebrate = accuracy >= 60;
            } else {
                shouldCelebrate = didWin;
                isTieState = isTie;
                isLossState = !didWin && !isTie;
            }

            if (shouldCelebrate) {
                // Fire multiple bursts for a winning celebration
                const duration = 2000;
                const end = Date.now() + duration;
                QuizEngine.isConfettiActive = true;
                (function frame() {
                    if (!QuizEngine.isConfettiActive) return;
                    QuizEngine.myConfetti({
                        particleCount: 5,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        zIndex: 2000
                    });
                    QuizEngine.myConfetti({
                        particleCount: 5,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        zIndex: 2000
                    });
                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    } else {
                        QuizEngine.isConfettiActive = false;
                    }
                }());
            } else if (isTieState) {
                // Single nice burst for a tie
                QuizEngine.myConfetti({
                    particleCount: 100,
                    spread: 100,
                    origin: { y: 0.5 },
                    zIndex: 2000
                });
            } else if (isLossState) {
                // Subtle gray/blue rain effect for a loss
                QuizEngine.myConfetti({
                    particleCount: 60,
                    angle: 270, // Straight down
                    spread: 120,
                    origin: { y: -0.1, x: 0.5 },
                    colors: ['#94a3b8', '#64748b', '#475569', '#cbd5e1'],
                    zIndex: 2000,
                    gravity: 0.8,
                    scalar: 0.8
                });
            }
        }
    },


    // --- Progress ---

    // --- Progress Data ---
    progressChartInstance: null,
    allProgressData: [45, 50, 48, 55, 52, 60, 58, 62, 65, 61, 68, 70, 72, 71, 75, 78, 80, 82, 85, 88],
    recentProgressData: [78, 80, 82, 85, 88],
    topicsPerformance: [
        { id: 'fraud', name: 'Fraud', score: 92, prevScore: 90 },
        { id: 'criminal_law', name: 'Criminal Law', score: 85, prevScore: 80 },
        { id: 'evidence', name: 'Evidence', score: 76, prevScore: 79 },
        { id: 'pace', name: 'PACE', score: 65, prevScore: 64 },
        { id: 'disclosure', name: 'Disclosure', score: 58, prevScore: 62 },
        { id: 'sexual_offences', name: 'Sexual Offences', score: 45, prevScore: 47 }
    ],
    selectedAiQuestionCount: 10,
    weakestSubjectsList: [],

    initProgress: function () {
        this.renderTopicPerformance();
        this.renderFocusAreas();
        this.renderAiFocusSection();
        this.renderReadiness();
    },

    openProgressPopup: function (type) {
        const overlay = document.getElementById(`progress-popup-${type}`);
        const sheet = document.getElementById(`progress-popup-${type}-sheet`);
        if (overlay && sheet) {
            overlay.classList.add('active');
            sheet.classList.add('active');
            if (type === 'trend') {
                setTimeout(() => {
                    this.initProgressChart('recent');
                }, 350);
            }
        }
    },

    closeProgressPopup: function (type) {
        const overlay = document.getElementById(`progress-popup-${type}`);
        const sheet = document.getElementById(`progress-popup-${type}-sheet`);
        if (overlay && sheet) {
            overlay.classList.remove('active');
            sheet.classList.remove('active');

            // Reset Journey state on close
            if (type === 'journey') {
                setTimeout(() => {
                    const viewBtn = document.getElementById('view-previous-exams-btn');
                    const olderContainer = document.getElementById('older-exams-container');
                    if (viewBtn) viewBtn.style.display = 'flex';
                    if (olderContainer) olderContainer.style.display = 'none';
                }, 300); // Wait for transition to finish
            }
        }
    },

    renderReadiness: function () {
        if (this.recentProgressData.length === 0) return;
        const avg = Math.round(this.recentProgressData.reduce((a, b) => a + b, 0) / this.recentProgressData.length);
        const scoreEl = document.getElementById('readiness-score');
        const gaugeEl = document.getElementById('readiness-gauge');
        const statusEl = document.getElementById('readiness-status');
        const gapEl = document.getElementById('readiness-gap');

        if (scoreEl) scoreEl.innerText = `${avg}%`;
        if (gaugeEl) gaugeEl.setAttribute('stroke-dasharray', `${avg}, 100`);

        if (statusEl) {
            if (avg >= 75) {
                statusEl.innerText = 'Ready';
                statusEl.style.color = '#10b981';
                statusEl.style.background = '#ecfdf5';
            } else if (avg >= 60) {
                statusEl.innerText = 'Developing';
                statusEl.style.color = '#f59e0b';
                statusEl.style.background = '#fef3c7';
            } else {
                statusEl.innerText = 'Needs Work';
                statusEl.style.color = '#ef4444';
                statusEl.style.background = '#fee2e2';
            }
        }

        if (gapEl) {
            const gap = avg - 75;
            if (gap >= 0) {
                gapEl.innerText = `+${gap}%`;
                gapEl.style.color = '#10b981';
            } else {
                gapEl.innerText = `${gap}%`;
                gapEl.style.color = '#ef4444';
            }
        }
    },

    initProgressChart: function (mode) {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;

        if (this.progressChartInstance) {
            this.progressChartInstance.destroy();
        }

        const isRecent = mode === 'recent';
        const data = isRecent ? this.recentProgressData : this.allProgressData;
        const labels = data.map((_, i) => isRecent ? `Mock ${i + 1}` : `M${i + 1}`);

        const btnRecent = document.getElementById('chart-btn-recent');
        const btnAll = document.getElementById('chart-btn-all');
        if (btnRecent && btnAll) {
            if (isRecent) {
                btnRecent.style.background = 'white';
                btnRecent.style.color = '#0f172a';
                btnRecent.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

                btnAll.style.background = 'transparent';
                btnAll.style.color = '#64748b';
                btnAll.style.boxShadow = 'none';
            } else {
                btnAll.style.background = 'white';
                btnAll.style.color = '#0f172a';
                btnAll.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

                btnRecent.style.background = 'transparent';
                btnRecent.style.color = '#64748b';
                btnRecent.style.boxShadow = 'none';
            }
        }

        const chartConfig = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Score %',
                    data: data,
                    borderColor: '#466ba9',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: isRecent ? '#10b981' : 'transparent',
                    pointBorderColor: isRecent ? '#ffffff' : 'transparent',
                    pointBorderWidth: isRecent ? 2 : 0,
                    pointRadius: isRecent ? 6 : 0,
                    pointHoverRadius: 8,
                    clip: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: { top: 12, right: 16, bottom: 4, left: 12 }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) { return context.parsed.y + '%'; }
                        }
                    },
                    zoom: isRecent ? false : {
                        pan: { enabled: true, mode: 'x' },
                        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: '#f1f5f9' },
                        ticks: { color: '#94a3b8', stepSize: 25, callback: function (value) { return value + '%'; } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8', maxTicksLimit: isRecent ? 5 : 10 }
                    }
                }
            }
        };

        if (window.Chart) {
            this.progressChartInstance = new Chart(ctx, chartConfig);
        } else {
            console.warn('Chart.js not loaded yet.');
            setTimeout(() => this.initProgressChart(mode), 500);
        }
    },

    toggleChartMode: function (mode) {
        this.initProgressChart(mode);
    },

    renderTopicPerformance: function () {
        const container = document.getElementById('topic-performance-list');
        if (!container) return;

        let html = '';
        this.topicsPerformance.forEach(topic => {
            let color, bgColor, icon, title;
            if (topic.score >= 90) {
                color = '#16a34a'; bgColor = '#ecfdf5'; icon = '🥇'; title = 'Mastered';
            } else if (topic.score >= 80) {
                color = '#10b981'; bgColor = '#d1fae5'; icon = '💪'; title = 'Strong';
            } else if (topic.score >= 65) {
                color = '#f59e0b'; bgColor = '#fef3c7'; icon = '🌱'; title = 'Developing';
            } else {
                color = '#ef4444'; bgColor = '#fee2e2'; icon = '🚨'; title = 'Weak';
            }

            const diff = topic.score - topic.prevScore;
            let trendHtml = '';
            if (diff > 0) {
                trendHtml = `<span style="font-size: 11px; font-weight: 700; color: #16a34a; margin-left: 6px;">📈 +${diff}%</span>`;
            } else if (diff < 0) {
                trendHtml = `<span style="font-size: 11px; font-weight: 700; color: #ef4444; margin-left: 6px;">📉 ${diff}%</span>`;
            } else {
                trendHtml = `<span style="font-size: 11px; font-weight: 700; color: #94a3b8; margin-left: 6px;">- 0%</span>`;
            }

            html += `
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 14px; font-weight: 700; color: #1e293b;">${topic.name}</span>
                            <span style="font-size: 10px; font-weight: 700; color: ${color}; background: ${bgColor}; padding: 2px 6px; border-radius: 6px; display: flex; align-items: center; gap: 4px;">${icon} ${title}</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <span style="font-size: 15px; font-weight: 800; color: ${color};">${topic.score}%</span>
                            ${trendHtml}
                        </div>
                    </div>
                    <div style="height: 6px; background: #f1f5f9; border-radius: 3px; width: 100%; overflow: hidden;">
                        <div style="height: 100%; background: ${color}; width: ${topic.score}%; border-radius: 3px;"></div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    },

    renderFocusAreas: function () {
        const container = document.getElementById('focus-areas-list');
        if (!container) return;

        const weakTopics = this.topicsPerformance.filter(t => t.score < 65).sort((a, b) => a.score - b.score);
        let html = '';
        weakTopics.forEach(topic => {
            const pooIcon = topic.score < 50 ? '💩 ' : '';
            html += `
                <div onclick="QuizEngine.startTopicRevision('${topic.name}')" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #fff7ed; padding: 14px 16px; border-radius: 12px; border: 1px solid #ffedd5; transition: transform 0.1s ease, box-shadow 0.2s; box-shadow: 0 1px 2px rgba(234, 88, 12, 0.05);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(234, 88, 12, 0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px rgba(234, 88, 12, 0.05)';">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 15px; font-weight: 800; color: #c2410c;">${pooIcon}${topic.name}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 12px; font-weight: 700; color: #ea580c; background: rgba(234, 88, 12, 0.1); padding: 4px 8px; border-radius: 6px;">${topic.score}% Accuracy</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" style="width: 16px; height: 16px;"><path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    },

    renderAiFocusSection: function () {
        const container = document.getElementById('ai-weak-subjects-container');
        if (!container) return;

        this.weakestSubjectsList = this.topicsPerformance.filter(t => t.score < 65).sort((a, b) => a.score - b.score).slice(0, 3).map(t => t.name);

        if (this.weakestSubjectsList.length === 0) {
            this.weakestSubjectsList = this.topicsPerformance.sort((a, b) => a.score - b.score).slice(0, 2).map(t => t.name);
        }

        let html = '';
        this.weakestSubjectsList.forEach(name => {
            html += `<span style="font-size: 12px; font-weight: 700; color: #1e3a8a; background: #bfdbfe; padding: 4px 10px; border-radius: 20px;">${name}</span>`;
        });
        container.innerHTML = html;
    },

    setAiCount: function (count) {
        this.selectedAiQuestionCount = count;
        document.querySelectorAll('.ai-count-btn').forEach(btn => {
            if (parseInt(btn.dataset.count) === count) {
                btn.classList.add('selected');
                btn.style.background = 'rgba(70, 107, 169, 0.1)';
                btn.style.border = '2px solid #466ba9';
                btn.style.color = '#466ba9';
            } else {
                btn.classList.remove('selected');
                btn.style.background = 'white';
                btn.style.border = '2px solid #e2e8f0';
                btn.style.color = '#64748b';
            }
        });
    },

    startAiPractice: function () {
        this.selectedMixedTopics = this.weakestSubjectsList;
        this.selectedCategory = 'AI Focus Tutor';
        this.currentFormat = 'Standard Quiz';
        this.currentMode = 'Practice Weak Areas';
        this.launchedFromProgress = true;

        // Setup state for new quiz
        this.totalQuestions = this.selectedAiQuestionCount;
        this.currentQuestion = 0;
        this.score = 0;
        this.streak = 0;
        this.totalXp = 0;
        this.timeLeft = 600; // arbitrary 10 min for AI tutor
        this.isTimeUp = false;

        this.navigate('view-active', 'view-progress');
        this.startQuiz();
    },

    startTopicRevision: function (topicName) {
        this.currentFlow = 'topic';
        this.currentMode = 'Practice By Topic';
        this.selectedFormat = 'Practice By Topic';
        this.selectedCategory = topicName;
        this.launchedFromProgress = true;

        this.practiceSelectedMains = [topicName];
        this.practiceSelectedSubs = [];
        this.practiceSelectedSubSubs = [];
        this.practiceSelectedCount = 10;

        this.totalQuestions = 10;
        this.currentDifficulty = 'Medium';

        this.navigate('view-active');
    },



    // --- Analytics ---
    initAnalytics: function () {
        const total = this.totalQuestions || 10;
        const score = typeof this.score !== 'undefined' ? this.score : 8;
        const accuracy = Math.round((score / total) * 100);

        // Update Circular Chart
        const circle = document.getElementById('analytics-circle');
        const percentageText = document.getElementById('analytics-percentage');
        if (circle) circle.setAttribute('stroke-dasharray', `${accuracy}, 100`);
        if (percentageText) percentageText.textContent = `${accuracy}%`;

        // Update Text
        const titleEl = document.getElementById('analytics-title');
        const subtitleEl = document.getElementById('analytics-subtitle');
        if (titleEl) {
            if (accuracy >= 80) titleEl.innerText = 'Excellent Accuracy!';
            else if (accuracy >= 60) titleEl.innerText = 'Good Job!';
            else titleEl.innerText = 'Needs Improvement';
        }
        if (subtitleEl) {
            subtitleEl.innerText = `You answered ${score} out of ${total} questions correctly.`;
        }

        const list = document.getElementById('analytics-question-list');
        if (!list) return;
        list.innerHTML = '';

        const avgTimeEl = document.getElementById('analytics-avg-time');
        const fastestTimeEl = document.getElementById('analytics-fastest-time');
        const totalTimeEl = document.getElementById('analytics-total-time');
        const timeCard = document.getElementById('time-breakdown-card');

        let totalTimeSeconds = this.finalTotalTimeSeconds || 124;
        let avgTimeSeconds = Math.max(0.1, totalTimeSeconds / this.totalQuestions).toFixed(1);
        let fastestTimeSeconds = (1.0 + Math.random()).toFixed(1);

        if (avgTimeEl) avgTimeEl.innerText = `${avgTimeSeconds}s`;
        if (fastestTimeEl) fastestTimeEl.innerText = `${fastestTimeSeconds}s`;
        if (totalTimeEl) {
            const mins = Math.floor(totalTimeSeconds / 60);
            const secs = totalTimeSeconds % 60;
            totalTimeEl.innerText = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
        }

        let skippedCount = 0;

        for (let i = 0; i < this.totalQuestions; i++) {
            const qData = this.questionsData[i % this.questionsData.length];
            const answerData = this.mockAnswers ? this.mockAnswers[i] : null;
            if (!answerData || answerData.status !== 'answered') {
                skippedCount++;
            }

            const isAnswered = answerData && answerData.status === 'answered';
            const isCorrect = isAnswered && answerData.isCorrect;
            const isSkipped = !isAnswered;

            let statusClass = isSkipped ? 'skipped' : (isCorrect ? 'correct' : 'wrong');

            let iconSvg = '';
            if (isCorrect) {
                iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            } else if (isSkipped) {
                iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
            } else {
                iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            }

            const chosenText = isSkipped ? 'Skipped' : (answerData.selectedIndex >= 0 ? qData.opts[answerData.selectedIndex] : 'Unknown');
            const correctText = qData.opts[qData.correct];
            const explanation = isCorrect ? (qData.expCorrect || '') : (qData.expWrong || qData.expCorrect || '');

            list.innerHTML += `
                <div class="breakdown-item ${statusClass}" style="flex-direction: column; align-items: flex-start; padding: 16px; cursor: pointer;" onclick="const details = this.querySelector('.breakdown-details'); const icon = this.querySelector('.toggle-icon'); const wasClosed = details.style.display === 'none'; this.parentElement.querySelectorAll('.breakdown-details').forEach(el => el.style.display = 'none'); this.parentElement.querySelectorAll('.toggle-icon').forEach(el => el.style.transform = 'rotate(0deg)'); if(wasClosed) { details.style.display = 'block'; icon.style.transform = 'rotate(180deg)'; }">
                    <div style="display: flex; gap: 12px; width: 100%; align-items: center;">
                        <div class="breakdown-icon" style="flex-shrink: 0;">
                            ${iconSvg}
                        </div>
                        <div class="breakdown-text" style="flex-grow: 1; margin: 0;"><strong>Q${i + 1}:</strong> ${qData.q}</div>
                        <div class="toggle-icon" style="flex-shrink: 0; transition: transform 0.3s ease; display: flex; align-items: center; justify-content: center; align-self: flex-start; margin-top: 2px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    
                    <div class="breakdown-details" style="display: none; width: 100%; margin-top: 12px;">
                        <div style="font-size: 14px; width: 100%; background: rgba(0,0,0,0.03); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                            <div style="margin-bottom: 8px;"><strong>Your Answer:</strong> <span style="color: ${isCorrect ? '#10b981' : (isSkipped ? '#64748b' : '#ef4444')}">${chosenText}</span></div>
                            ${!isCorrect ? `<div style=\"margin-bottom:8px\"><strong>✅ Correct Answer:</strong> <span style=\"color: #10b981\">${correctText}</span></div>` : ''}
                        </div>
                        
                        ${explanation ? `
                        <div style="font-size: 13px; color: #475569; width: 100%; padding-top: 8px; border-top: 1px solid rgba(0,0,0,0.05);">
                            <strong>AI Explanation:</strong>
                            <div style="margin-top: 4px;">${explanation}</div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        if (timeCard) {
            let existingRow = document.getElementById('analytics-skipped-row');
            if (skippedCount > 0) {
                if (!existingRow) {
                    existingRow = document.createElement('div');
                    existingRow.className = 'time-stat-row';
                    existingRow.id = 'analytics-skipped-row';
                    timeCard.appendChild(existingRow);
                }
                existingRow.innerHTML = `<span>Skipped questions left</span><strong>${skippedCount}</strong>`;
            } else if (existingRow) {
                existingRow.remove();
            }
        }
    },


    // --- Leaderboard ---

    achievementsData: [
        { id: 1, title: 'First Win', desc: 'Win your first challenge', iconUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png', state: 'unlocked', req: '1 Win', bg: 'linear-gradient(135deg, #FFE082 0%, #FFECB3 100%)', currentProgress: 1, targetProgress: 1, progressUnit: 'Win', rewardXp: 50, rarityLevel: 'Common', earnedDate: 'Oct 12, 2023' },
        { id: 2, title: '5 Wins', desc: 'Win 5 challenges', iconUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f31f.png', state: 'unlocked', req: '5 Wins', bg: 'linear-gradient(135deg, #93C5FD 0%, #BFDBFE 100%)', currentProgress: 5, targetProgress: 5, progressUnit: 'Wins', rewardXp: 150, rarityLevel: 'Uncommon', earnedDate: 'Nov 04, 2023' },
        { id: 3, title: 'Streak 5', desc: 'Achieve a streak of 5', iconUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png', state: 'unlocked', req: 'Streak of 5', bg: 'linear-gradient(135deg, #FCA5A5 0%, #FECACA 100%)', currentProgress: 5, targetProgress: 5, progressUnit: 'Streak', rewardXp: 200, rarityLevel: 'Rare', earnedDate: 'Dec 18, 2023' },
        { id: 4, title: 'Category Master', desc: 'Score 100% in a category', iconUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f9e0.png', state: 'locked', req: '100% Score', bg: 'linear-gradient(135deg, #C4B5FD 0%, #DDD6FE 100%)', currentProgress: 80, targetProgress: 100, progressUnit: '%', rewardXp: 300, rarityLevel: 'Epic' },
        { id: 5, title: 'Speed Champion', desc: 'Answer fast 10 times', iconUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/26a1.png', state: 'locked', req: '< 2.0s Avg', bg: 'linear-gradient(135deg, #FCD34D 0%, #FDE68A 100%)', currentProgress: 6, targetProgress: 10, progressUnit: 'Fast Answers', rewardXp: 250, rarityLevel: 'Rare' },
        { id: 6, title: 'Perfect Score', desc: 'Get all answers correct 10 times', iconUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3af.png', state: 'locked', req: '100% Accuracy', bg: 'linear-gradient(135deg, #6EE7B7 0%, #A7F3D0 100%)', currentProgress: 4, targetProgress: 10, progressUnit: 'Perfect Quizzes', rewardXp: 500, rarityLevel: 'Legendary' },
        { id: 7, title: 'Early Bird', desc: 'Complete 5 quizzes before 8 AM', iconUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f305.png', state: 'locked', req: 'Quiz at 6-8 AM', bg: 'linear-gradient(135deg, #F9A8D4 0%, #FBCFE8 100%)', currentProgress: 2, targetProgress: 5, progressUnit: 'Quizzes', rewardXp: 150, rarityLevel: 'Uncommon' },
        { id: 8, title: 'Night Owl', desc: 'Complete 5 quizzes after 10 PM', iconUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f989.png', state: 'locked', req: 'Quiz after 10 PM', bg: 'linear-gradient(135deg, #94A3B8 0%, #CBD5E1 100%)', currentProgress: 1, targetProgress: 5, progressUnit: 'Quizzes', rewardXp: 150, rarityLevel: 'Uncommon' }
    ],

    initAchievements: function () {
        this.filterBadgesMagic('all', document.querySelector('.badge-tab'));
    },

    filterBadgesMagic: function (filter, btnElement) {
        if (btnElement) {
            document.querySelectorAll('.badge-tab').forEach(b => {
                b.classList.remove('m-tab-active');
            });
            btnElement.classList.add('m-tab-active');

            // Move indicator dynamically
            const indicator = document.getElementById('badgeTabIndicator');
            if (indicator) {
                indicator.style.width = `${btnElement.offsetWidth}px`;
                indicator.style.transform = `translateX(${btnElement.offsetLeft}px)`;
            }
        }

        const grid = document.getElementById('ios-badges-grid');
        grid.innerHTML = '';

        const filtered = filter === 'all' ? this.achievementsData : this.achievementsData.filter(a => a.state === filter);

        let previousState = null;

        filtered.forEach((badge, index) => {
            const isUnlocked = badge.state === 'unlocked';

            // Insert headings and full-width spacers when transitioning from unlocked to locked
            if (filter === 'all') {
                if (index === 0) {
                    const title = isUnlocked ? 'Unlocked' : 'Locked';
                    grid.innerHTML += `<div style="grid-column: 1 / -1; font-size: 18px; font-weight: 700; color: var(--text-primary, #1e293b); font-family: 'Poppins', sans-serif; margin-bottom: 0px;">${title}</div>`;
                } else if (previousState === 'unlocked' && !isUnlocked) {
                    grid.innerHTML += `
                        <div style="grid-column: 1 / -1; font-size: 18px; font-weight: 700; color: var(--text-primary, #1e293b); font-family: 'Poppins', sans-serif; margin-top: 8px; margin-bottom: 0px;">Locked</div>
                    `;
                }
            }
            previousState = badge.state;

            // Visual styles based on state
            const showFullColor = isUnlocked || filter === 'locked';

            const cardBg = showFullColor ? badge.bg : '#e2e8f0';
            const cardOpacity = showFullColor ? '1' : '0.7';
            const iconFilter = showFullColor ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' : 'grayscale(100%) opacity(50%)';
            const titleColor = showFullColor ? '#000000' : '#8e8e93';
            const descColor = showFullColor ? '#4b5563' : '#8e8e93';

            const lockIndicator = isUnlocked ? '' : `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f512.png" style="position: absolute; top: 12px; right: 12px; width: 22px; height: 22px; z-index: 2; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15)); opacity: 0.9;">`;
            const checkIndicator = isUnlocked ? `<div style="position: absolute; top: 12px; right: 12px; font-size: 13.33px; z-index: 2; line-height: 1; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">✅</div>` : '';

            const iconBg = '#ffffff';

            let boxEffect = '';
            let progressSection = '';

            if (!isUnlocked) {
                const percent = Math.round((badge.currentProgress / badge.targetProgress) * 100);
                const remaining = badge.targetProgress - badge.currentProgress;
                progressSection = `
                    <div style="margin-top: 16px; text-align: left;">
                        <div style="height: 6px; background: rgba(0,0,0,0.12); border-radius: 3px; overflow: hidden; margin-bottom: 8px;">
                            <div style="height: 100%; width: ${percent}%; background: rgba(0,0,0,0.3); border-radius: 3px;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <span style="font-size: 11px; font-weight: 700; color: #4b5563;">${badge.currentProgress} / ${badge.targetProgress} ${badge.progressUnit}</span>
                        </div>
                        <div style="font-size: 10px; color: #8e8e93; font-weight: 500;">
                            ${badge.progressUnit === '%' ? `Complete ${remaining} more points to unlock` : `${remaining} More Required`}
                        </div>
                    </div>
                `;
            } else {
                const glowColor = badge.bg.match(/#[0-9a-fA-F]{6}/) ? badge.bg.match(/#[0-9a-fA-F]{6}/)[0] : '#34c759';
                boxEffect = `box-shadow: 0 8px 24px ${glowColor}40; border: 1px solid ${glowColor}60;`;
                progressSection = `
                    <div style="margin-top: 16px; font-size: 12px; color: rgba(0,0,0,0.7); font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px;">
                        Earned ${badge.earnedDate}
                    </div>
                `;
            }

            const clickHandler = filter !== 'all' ? `onclick="QuizEngine.openIosBadgeDetails(${badge.id})"` : '';
            const cursorStyle = filter !== 'all' ? 'cursor: pointer;' : 'cursor: default;';
            grid.innerHTML += `
                <div ${clickHandler} style="background: ${cardBg}; border-radius: 20px; padding: 20px 16px; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); position: relative; opacity: ${cardOpacity}; ${cursorStyle} transition: transform 0.2s; overflow: hidden; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; box-sizing: border-box; ${boxEffect}">
                    ${lockIndicator}
                    ${checkIndicator}
                    <div style="position: relative; z-index: 1; width: 100%;">
                        <div style="margin-bottom: 12px; display: flex; justify-content: center;">
                            <div style="width: 72px; height: 72px; border-radius: 36px; background: ${iconBg}; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 -4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05);">
                                <img src="${badge.iconUrl}" style="width: 40px; height: 40px; object-fit: contain; filter: ${iconFilter};">
                            </div>
                        </div>
                        <div style="font-size: 14px; font-weight: 700; color: ${titleColor}; margin-bottom: 4px; font-family: 'Poppins', sans-serif; letter-spacing: -0.3px;">${badge.title}</div>
                        ${progressSection}
                    </div>
                </div>
            `;
        });
    },

    openIosBadgeDetails: function (id) {
        const badge = this.achievementsData.find(b => b.id === id);
        if (!badge) return;

        const sheet = document.getElementById('ios-badge-sheet');
        const backdrop = document.getElementById('ios-badge-sheet-backdrop');
        const content = document.getElementById('ios-badge-sheet-content');

        const isUnlocked = badge.state === 'unlocked';
        const statusBadge = isUnlocked
            ? `<div style="display: inline-block; background: rgba(70,107,169,0.1); color: #466ba9; padding: 6px 12px; border-radius: 14px; font-size: 13px; font-weight: 600; margin-bottom: 24px; font-family: 'Inter', sans-serif;">✅ Unlocked</div>`
            : `<div style="display: inline-block; background: #f1f5f9; color: var(--text-secondary, #64748b); padding: 6px 12px; border-radius: 14px; font-size: 13px; font-weight: 600; margin-bottom: 24px; font-family: 'Inter', sans-serif;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f512.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Locked</div>`;

        const iconFilter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))';
        const iconBg = '#ffffff';

        let progressDetails = '';
        if (!isUnlocked) {
            const percent = Math.round((badge.currentProgress / badge.targetProgress) * 100);
            progressDetails = `
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Current Progress</span>
                        <span style="font-size: 13px; color: var(--text-primary, #1e293b); font-weight: 700;">${percent}%</span>
                    </div>
                    <div style="height: 8px; background: rgba(0,0,0,0.06); border-radius: 4px; overflow: hidden;">
                        <div style="height: 100%; width: ${percent}%; background: ${badge.bg}; border-radius: 4px;"></div>
                    </div>
                    <div style="text-align: right; margin-top: 4px; font-size: 11px; color: var(--text-secondary, #64748b);">
                        ${badge.currentProgress} / ${badge.targetProgress} ${badge.progressUnit}
                    </div>
                </div>
                <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
            `;
        } else {
            progressDetails = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Earned</span>
                    <span style="font-size: 13px; color: #10b981; font-weight: 600;">${badge.earnedDate}</span>
                </div>
                <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
            `;
        }

        content.innerHTML = `
            <div style="font-family: 'Inter', sans-serif;">
                <div style="margin-bottom: 24px; animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; justify-content: center;">
                    <div style="width: 140px; height: 140px; border-radius: 70px; background: ${iconBg}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <img src="${badge.iconUrl}" style="width: 80px; height: 80px; object-fit: contain; filter: ${iconFilter};">
                    </div>
                </div>
                <h2 style="font-size: 24px; font-weight: 700; color: var(--text-primary, #1e293b); letter-spacing: -0.5px; margin-bottom: 12px; font-family: 'Poppins', sans-serif;">${badge.title}</h2>
                ${statusBadge}
                
                <div style="background: #ffffff; border: 1px solid rgba(15,23,42,0.05); border-radius: 16px; padding: 20px; text-align: left; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                    <div style="font-size: 15px; color: var(--text-primary, #1e293b); font-weight: 500; margin-bottom: 16px; line-height: 1.4;">${badge.desc}</div>
                    <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
                    
                    ${progressDetails}

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Reward XP</span>
                        <span style="font-size: 14px; color: #b45309; font-weight: 700;">⭐ +${badge.rewardXp} XP</span>
                    </div>
                    <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Rarity Level</span>
                        <span style="font-size: 13px; color: #466ba9; font-weight: 700; background: rgba(70,107,169,0.1); padding: 4px 8px; border-radius: 8px;">${badge.rarityLevel}</span>
                    </div>
                    <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Unlock Requirement</span>
                        <span style="font-size: 13px; color: var(--text-primary, #1e293b); font-weight: 600;">${badge.req}</span>
                    </div>
                </div>

                <button onclick="QuizEngine.closeIosBadgeDetails()" style="width: 100%; padding: 16px; background: linear-gradient(to bottom, rgb(134, 174, 244), #4b73b7, #345da5); color: #ffffff; border-radius: 14px; border: none; font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; font-family: 'Poppins', sans-serif; box-shadow: 0 8px 16px rgba(70,107,169,0.25);">
                    Close
                </button>
            </div>
        `;

        backdrop.style.opacity = '1';
        backdrop.style.pointerEvents = 'auto';
        sheet.style.transform = 'translateY(0)';
    },

    closeIosBadgeDetails: function () {
        const sheet = document.getElementById('ios-badge-sheet');
        const backdrop = document.getElementById('ios-badge-sheet-backdrop');

        backdrop.style.opacity = '0';
        backdrop.style.pointerEvents = 'none';
        sheet.style.transform = 'translateY(100%)';
    },

    previewOutcome: function (outcome) {
        let title, subtitle, emojiUrl;
        let myScore, oppScore, myAcc, oppAcc, myStreak, oppStreak, myTime, oppTime, insight;

        if (outcome === 'win') {
            title = 'You Won!';
            subtitle = 'Challenge Complete';
            emojiUrl = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png';
            myScore = 320; oppScore = 210;
            myAcc = 85; oppAcc = 60;
            myStreak = 7; oppStreak = 3;
            myTime = '2.1s'; oppTime = '3.4s';
            insight = `You answered faster and had 25% better accuracy, securing the victory!`;
        } else if (outcome === 'lose') {
            title = 'So Close!';
            subtitle = 'Challenge Complete';
            emojiUrl = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f61e.png';
            myScore = 180; oppScore = 290;
            myAcc = 45; oppAcc = 75;
            myStreak = 2; oppStreak = 6;
            myTime = '3.8s'; oppTime = '2.2s';
            insight = `You performed better than 68% of participants overall. Keep it up!`;
        } else {
            title = 'It\'s a Tie!';
            subtitle = 'Challenge Complete';
            emojiUrl = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f91d.png';
            myScore = 250; oppScore = 250;
            myAcc = 65; oppAcc = 65;
            myStreak = 4; oppStreak = 4;
            myTime = '2.8s'; oppTime = '2.8s';
            insight = `A perfectly matched game! Your performance was identical to your opponent.`;
        }

        document.getElementById('completion-title').innerText = title;
        document.getElementById('completion-subtitle').innerText = subtitle;
        document.getElementById('completion-emoji').innerHTML = `<img src="../images/exam_image-badge.png" class="result-badge-img" alt="">`;

        document.getElementById('my-score-val').innerText = myScore;
        document.getElementById('opp-score-val').innerText = oppScore;
        document.getElementById('my-acc-val').innerText = `${myAcc}%`;
        document.getElementById('opp-acc-val').innerText = `${oppAcc}%`;
        document.getElementById('my-streak-val').innerText = myStreak;
        document.getElementById('opp-streak-val').innerText = oppStreak;
        document.getElementById('my-time-val').innerText = myTime;
        document.getElementById('opp-time-val').innerText = oppTime;
        document.getElementById('match-insight-text').innerText = insight;
    },

    initLeaderboard: function () {
        // Find the friends tab button to pass as the active element
        const friendsBtn = document.querySelector('.tabs-container .tab-btn') || null;
        this.switchLeaderboardTab(friendsBtn, 'friends');
    },

    switchLeaderboardTab: function (btnElement, tabName) {
        // Handle Active states
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        if (btnElement) btnElement.classList.add('active');

        const podiumContainer = document.getElementById('leaderboard-podium');
        const listContainer = document.getElementById('leaderboard-list');
        const userCardContainer = document.getElementById('lb-sticky-user-card');
        const achievementBanner = document.getElementById('lb-achievement-banner');
        const weeklyMvpContainer = document.getElementById('lb-weekly-mvp-container');
        const weeklyAchieveContainer = document.getElementById('lb-weekly-achievements-container');

        podiumContainer.innerHTML = '';
        listContainer.innerHTML = '';
        userCardContainer.innerHTML = '';
        weeklyMvpContainer.innerHTML = '';
        weeklyAchieveContainer.innerHTML = '';

        // Expanded Premium Mock Data with requested metrics
        const mockData = {
            'friends': [
                { rank: 1, name: 'Sgt. Davies', score: '12,450', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', team: 'Alpha Squad', trend: 'up', trendVal: 2, badges: ['<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Highest Streak'], extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +15%' },
                { rank: 2, name: 'Emma Davis', score: '11,800', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', team: 'Bravo Squad', trend: 'down', trendVal: 1, badges: ['<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Top Performer'], extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 12 Wins' },
                { rank: 3, name: 'Insp. Jones', score: '9,800', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', team: 'Alpha Squad', trend: 'up', trendVal: 4, badges: ['<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3af.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Accurate'], extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2b50.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Most Active' },
                { rank: 4, name: 'Mike Ross', score: '8,200', avatar: 'https://randomuser.me/api/portraits/men/46.jpg', team: 'Delta Force', trend: 'same', trendVal: 0, badges: [] },
                { rank: 5, name: 'Officer Smith', score: '7,900', avatar: 'https://randomuser.me/api/portraits/men/50.jpg', team: 'Charlie Team', trend: 'up', trendVal: 5, badges: ['<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Most Active'], isUser: true },
                { rank: 6, name: 'Sarah Connor', score: '7,100', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', team: 'Bravo Squad', trend: 'down', trendVal: 2, badges: [] },
            ],
            'team': [
                { rank: 1, name: 'Alpha Squad', score: '45,000', avatar: 'https://randomuser.me/api/portraits/men/62.jpg', team: 'London', trend: 'up', trendVal: 1, activeMembers: 42, performanceMetric: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +15% This Week', extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +15%' },
                { rank: 2, name: 'Bravo Squad', score: '41,200', avatar: 'https://randomuser.me/api/portraits/men/63.jpg', team: 'Manchester', trend: 'same', trendVal: 0, activeMembers: 38, performanceMetric: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 12 Team Wins', extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 12 Wins' },
                { rank: 3, name: 'Charlie Team', score: '38,900', avatar: 'https://randomuser.me/api/portraits/men/64.jpg', team: 'Birmingham', trend: 'up', trendVal: 3, activeMembers: 35, performanceMetric: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Most Active Team', extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Most Active', isUser: true },
            ],
            'national': [
                { rank: 1, name: 'Met Police', score: '99,999', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', team: 'London', trend: 'same', trendVal: 0, activeMembers: '1,250', challengesCompleted: '4,500', isNationalLeader: true, extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2b50.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Leader' },
                { rank: 2, name: 'GMP', score: '88,500', avatar: 'https://randomuser.me/api/portraits/men/66.jpg', team: 'Manchester', trend: 'up', trendVal: 2, activeMembers: '950', challengesCompleted: '3,800', extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +10%' },
                { rank: 3, name: 'WMP', score: '82,100', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', team: 'Birmingham', trend: 'down', trendVal: 1, activeMembers: '820', challengesCompleted: '3,100', extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 520 Wins' },
                { rank: 12, name: 'Officer Smith', score: '11,200', avatar: 'https://randomuser.me/api/portraits/men/50.jpg', team: 'Charlie Team', trend: 'up', trendVal: 12, activeMembers: '1', challengesCompleted: '45', extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Active', isUser: true },
            ],
            'weekly': [
                { rank: 1, name: 'Officer Smith', xpThisWeek: '+520', score: '520', avatar: 'https://randomuser.me/api/portraits/men/50.jpg', team: '', trend: 'new', trendVal: 0, badges: [], extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Weekly MVP', isUser: true },
                { rank: 2, name: 'Sgt. Davies', xpThisWeek: '+430', score: '430', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', team: '', trend: 'down', trendVal: 1, badges: [], extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Fast' },
                { rank: 3, name: 'Emma Davis', xpThisWeek: '+350', score: '350', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', team: '', trend: 'up', trendVal: 5, badges: [], extraStat: '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Active' },
                { rank: 4, name: 'Mike Ross', xpThisWeek: '+280', score: '280', avatar: 'https://randomuser.me/api/portraits/men/46.jpg', team: '', trend: 'up', trendVal: 12, badges: [] }
            ]
        };

        const data = mockData[tabName] || mockData['friends'];
        let userItem = null;
        let rankAboveUser = null;

        // Separate Top 3 from the rest
        const top3 = data.slice(0, 3);
        const rest = data.slice(3);

        // Helper to render trend badge
        const getTrendHTML = (trend, val) => {
            if (trend === 'up') return `<span class="lb-trend up">↑ ${val}</span>`;
            if (trend === 'down') return `<span class="lb-trend down">↓ ${val}</span>`;
            if (trend === 'new') return `<span class="lb-trend new">NEW</span>`;
            return '';
        };

        // Render Podium (Order: 2, 1, 3 for visual stage)
        const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
        podiumOrder.forEach(item => {
            if (item.isUser) userItem = item;
            const rankClass = `lb-podium-rank-${item.rank}`;
            const extraStatHTML = item.extraStat ? `<div class="lb-podium-extra-stat" style="font-size:10px; font-weight:700; color:var(--text-dim); margin-top:4px;">${item.extraStat}</div>` : '';

            // Celebration support for rank 1
            const confettiClass = (item.isUser && item.rank === 1) ? 'celebration-confetti' : '';

            podiumContainer.innerHTML += `
                <div class="lb-podium-item ${rankClass} ${item.isUser ? 'current-user' : ''} ${confettiClass}">
                    <div class="lb-podium-avatar-wrapper">
                        ${item.rank === 1 ? '<div class="lb-crown"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f451.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></div>' : ''}
                        <div class="lb-podium-avatar"><img src="${item.avatar}" alt="${item.name}"></div>
                    </div>
                    <div class="lb-podium-rank-badge">${item.rank}</div>
                    <div class="lb-podium-name">${item.name}</div>
                    <div class="lb-podium-score">${tabName === 'weekly' ? item.xpThisWeek : item.score} ${tabName === 'weekly' ? '' : 'XP'}</div>
                    ${extraStatHTML}
                </div>
            `;
        });

        // Dynamic Banner Logic
        if (tabName === 'weekly') {
            achievementBanner.innerHTML = `
                <div class="lb-banner-icon"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></div>
                <div class="lb-banner-text">
                    <strong>Weekly Challenge Race</strong>
                    <p>Competition Ends In: 3 Days 14 Hours</p>
                </div>
            `;

            // Weekly MVP Card
            weeklyMvpContainer.innerHTML = `
                <div class="lb-weekly-mvp-card" style="background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 16px; padding: 16px; margin: 0 0 24px; border: 1px solid #fcd34d; display: flex; align-items: center; gap: 16px;">
                    <div style="font-size: 32px;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></div>
                    <div style="flex: 1;">
                        <div style="font-size: 12px; font-weight: 800; color: #b45309; text-transform: uppercase;">Weekly MVP</div>
                        <div style="font-size: 16px; font-weight: 800; color: #92400e; margin-bottom: 4px;">Officer Smith</div>
                        <div style="font-size: 12px; color: #b45309; font-weight: 600;">+520 XP This Week • 12 Challenges</div>
                    </div>
                </div>
            `;

            // Weekly Achievements Section
            weeklyAchieveContainer.innerHTML = `
                <div class="lb-weekly-achievements" style="margin: 0 0 24px; background: white; border-radius: 16px; padding: 20px; border: 1px solid rgba(15,23,42,0.05);">
                    <h3 style="font-size: 15px; font-weight: 800; margin-bottom: 16px; color: var(--text-primary);">Weekly Achievements</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 14px 16px; border-radius: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></span> <span style="font-size: 14px; font-weight: 700; color: var(--text-secondary);">Fastest Climber</span></div>
                            <div style="text-align: right;"><div style="font-size: 14px; font-weight: 700; margin-bottom: 6px;">Officer Smith</div><div style="font-size: 12px; font-weight: 600; color: #166534;">↑ 12 Positions</div></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 14px 16px; border-radius: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></span> <span style="font-size: 14px; font-weight: 700; color: var(--text-secondary);">Most Completed</span></div>
                            <div style="text-align: right;"><div style="font-size: 14px; font-weight: 700; margin-bottom: 6px;">Emma Davis</div><div style="font-size: 12px; font-weight: 600; color: var(--accent-blue);">24 Challenges</div></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 14px 16px; border-radius: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></span> <span style="font-size: 14px; font-weight: 700; color: var(--text-secondary);">Longest Streak</span></div>
                            <div style="text-align: right;"><div style="font-size: 14px; font-weight: 700; margin-bottom: 6px;">Sarah Connor</div><div style="font-size: 12px; font-weight: 600; color: #f59e0b;">11 Days</div></div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Dynamic Motivation Banner
            let motivateText = "You've climbed 5 positions! Keep it up!";
            if (userItem) {
                if (userItem.rank === 1) motivateText = "You are the Top Performer! Defend your title!";
                else if (userItem.rank <= 10) motivateText = `You are in the Top 10 at Rank #${userItem.rank}!`;
                else motivateText = "Complete 1 more challenge to enter Top 10!";
            }
            achievementBanner.innerHTML = `
                <div class="lb-banner-icon"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></div>
                <div class="lb-banner-text">
                    <strong>Weekly Progress</strong>
                    <p>${motivateText}</p>
                </div>
            `;
        }

        // Render List
        rest.forEach((item, index) => {
            if (item.isUser) {
                userItem = item;
                rankAboveUser = rest[index - 1] || top3[2]; // Get the person right above them
            }

            const badgesHTML = (item.badges || []).map(b => `<span class="lb-tiny-badge" style="background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 600; color: var(--text-secondary);">${b}</span>`).join('');

            // Build Contextual Details
            let contextDetails = '';
            if (tabName === 'team') {
                contextDetails = `<div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Active Members: ${item.activeMembers}</div>`;
            } else if (tabName === 'national') {
                contextDetails = `
                    <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; line-height: 1.4;">
                        <span style="display: inline-flex; align-items: center; gap: 4px;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f465.png" style="width: 1.2em; height: 1.2em;"> ${item.activeMembers} Members</span>
                        <span style="display: inline-flex; align-items: center; gap: 4px;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em;"> ${item.challengesCompleted} Challenges</span>
                    </div>
                `;
            } else {
                contextDetails = `<div class="lb-list-team">${item.team}</div>`;
            }

            let extraTeamStat = '';
            if (tabName === 'team' && item.performanceMetric) {
                extraTeamStat = `<div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-top: 4px;">${item.performanceMetric}</div>`;
            }

            const nationalBadgeHTML = (tabName === 'national' && item.isNationalLeader) ? `<span style="background: #fef3c7; color: #b45309; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700; border: 1px solid #fde68a;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2b50.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> National Leader</span>` : '';

            // User Inline Progress (Friends tab)
            let inlineProgressHTML = '';
            if (tabName === 'friends' && item.isUser && rankAboveUser) {
                const myScore = parseInt(item.score.replace(/,/g, ''));
                const aboveScore = parseInt(rankAboveUser.score.replace(/,/g, ''));
                const diff = aboveScore - myScore + 50;
                const percent = Math.min(100, Math.max(10, (myScore / aboveScore) * 100));

                inlineProgressHTML = `
                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05); width: 100%;">
                        <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">
                            <span>Progress to Rank #${item.rank - 1}</span>
                            <span style="color: var(--accent-blue);">${diff} XP away</span>
                        </div>
                        <div style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; width: ${percent}%; background: var(--accent-blue); border-radius: 3px;"></div>
                        </div>
                    </div>
                `;
            }

            // Celebration support for Top 10
            const glowClass = (item.isUser && item.rank <= 10) ? 'celebration-glow' : '';

            listContainer.innerHTML += `
                <div class="lb-list-item ${item.isUser ? 'current-user' : ''} ${glowClass}" style="flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; width: 100%; gap: 12px;">
                        <div class="lb-list-rank">${item.rank}</div>
                        <div class="lb-list-avatar"><img src="${item.avatar}" alt="${item.name}"></div>
                        <div class="lb-list-info">
                            <div class="lb-list-name-row">
                                <span class="lb-list-name">${item.name}</span>
                                ${nationalBadgeHTML}
                            </div>
                            <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; margin-bottom: 4px;">${badgesHTML}</div>
                            ${contextDetails}
                        </div>
                        <div class="lb-list-stats">
                            <div class="lb-list-score">${tabName === 'weekly' ? item.xpThisWeek : item.score} ${tabName === 'weekly' ? 'XP This Week' : 'XP'}</div>
                            ${getTrendHTML(item.trend, item.trendVal)}
                            ${extraTeamStat}
                        </div>
                    </div>
                    ${inlineProgressHTML}
                </div>
            `;
        });

        // Add Full Leaderboard CTA only on friends tab
        if (tabName === 'friends') {
            listContainer.innerHTML += `
                <button class="btn-primary w-100 mt-4 lb-full-cta" style="border-radius: 16px; padding: 16px; font-weight: 700;" onclick="QuizEngine.switchLeaderboardTab(document.querySelectorAll('.tab-btn')[2], 'national')">View Full Global Rankings</button>
            `;
        }

        // Render Sticky User Card
        if (userItem) {
            let progressHTML = '';
            let targetPoints = 500; // Mock target

            if (userItem.rank > 1 && rankAboveUser) {
                const myScore = parseInt(userItem.score.replace(/,/g, ''));
                const aboveScore = parseInt(rankAboveUser.score.replace(/,/g, ''));
                const diff = aboveScore - myScore + 50; // Add 50 to pass them
                const percent = Math.min(100, Math.max(10, (myScore / aboveScore) * 100));

                progressHTML = `
                    <div class="lb-sticky-progress-wrap">
                        <div class="lb-sticky-progress-text">
                            <span>Progress to Rank #${userItem.rank - 1}</span>
                            <span style="color: #fbbf24; font-weight: 800; letter-spacing: 0.2px;">Only ${diff} XP away!</span>
                        </div>
                        <div class="lb-sticky-progress-bar">
                            <div class="lb-sticky-progress-fill" style="width: ${percent}%;"></div>
                        </div>
                    </div>
                `;
            } else if (userItem.rank === 1) {
                progressHTML = `
                    <div class="lb-sticky-progress-wrap">
                        <div class="lb-sticky-progress-text" style="justify-content: center; color: #f59e0b; font-weight: 700;">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> You are the Top Performer! Keep defending your title!
                        </div>
                    </div>
                `;
            }

            userCardContainer.innerHTML = `
                <div class="lb-sticky-inner">
                    <div class="lb-sticky-top">
                        <div class="lb-sticky-rank">#${userItem.rank}</div>
                        <div class="lb-sticky-info">
                            <div class="lb-sticky-name">Your Ranking</div>
                            <div class="lb-sticky-stats">
                                <span class="lb-sticky-score">${userItem.score} XP</span>
                                <span class="lb-sticky-trend"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 12 Day Streak</span>
                            </div>
                        </div>
                    </div>
                    ${progressHTML}
                </div>
            `;
            userCardContainer.classList.remove('hidden');
        } else {
            userCardContainer.classList.add('hidden');
        }
    },

    // --- Participant Selection Logic ---
    selectParticipantMode: function (mode, el) {
        // Clear all selected states
        document.querySelectorAll('#view-participants .participant-option-card').forEach(card => card.classList.remove('active'));
        // Set new active
        el.classList.add('active');

        // Hide dynamic areas
        document.getElementById('colleague-selection-area').classList.add('hidden');
        document.getElementById('random-match-area').classList.add('hidden');

        const continueBtn = document.getElementById('participant-continue-btn');
        continueBtn.disabled = true;
        continueBtn.classList.add('disabled');

        if (mode === 'solo' || mode === 'team') {
            // Instantly enable
            continueBtn.disabled = false;
            continueBtn.classList.remove('disabled');
        } else if (mode === 'colleague') {
            document.getElementById('colleague-selection-area').classList.remove('hidden');
            // Reset colleague selections
            document.querySelectorAll('.colleague-card').forEach(c => c.classList.remove('active'));
        } else if (mode === 'random') {
            document.getElementById('random-match-area').classList.remove('hidden');
            // Simulate finding an opponent
            document.querySelector('#random-match-area .matchmaking-text h4').innerText = "Finding opponent...";
            document.querySelector('#random-match-area .matchmaking-text p').innerText = "Estimated wait: 0:12";
            document.querySelector('.radar-spinner').style.display = 'block';

            setTimeout(() => {
                document.querySelector('#random-match-area .matchmaking-text h4').innerText = "Opponent found!";
                document.querySelector('#random-match-area .matchmaking-text p').innerText = "Player: Alex_99";
                document.querySelector('.radar-spinner').style.display = 'none';
                continueBtn.disabled = false;
                continueBtn.classList.remove('disabled');
            }, 2000);
        }
    },

    selectColleague: function (el) {
        const isSelected = el.classList.contains('selected');
        document.querySelectorAll('.colleague-row-card').forEach(c => c.classList.remove('selected'));

        const container = document.getElementById('send-challenge-container');

        if (!isSelected) {
            el.classList.add('selected');
            if (container) container.style.display = 'block';
        } else {
            if (container) container.style.display = 'none';
        }
    },

    updateResumeWidget: function () {
        const saved = localStorage.getItem('saved_exam_progress');
        const card = document.querySelector('.resume-exam-card');
        if (!card) return;

        let data = null;
        let isMock = false;
        if (saved) {
            data = JSON.parse(saved);
            if (data.currentFlow === 'mock' || data.selectedCategory === 'Mock Exam' || data.selectedCategory === 'Promotion Exam') {
                isMock = true;
            }
        }

        const filledState = document.getElementById('resume-exam-filled');
        const emptyState = document.getElementById('resume-exam-empty');

        if (isMock) {
            if (filledState) filledState.style.display = 'flex';
            if (emptyState) emptyState.style.display = 'none';

            const progress = Math.round((data.currentQuestion / data.totalQuestions) * 100);

            const ring = card.querySelector('.resume-progress-ring');
            if (ring) {
                ring.style.background = `conic-gradient(#fbbf24 0% ${progress}%, rgba(255, 255, 255, 0.12) ${progress}% 100%)`;
            }
            const ringText = card.querySelector('.ring-text');
            if (ringText) ringText.innerText = `${progress}%`;

            const title = card.querySelector('.resume-title');
            if (title) title.innerText = data.selectedExam || data.selectedCategory || 'Mock Exam';

            const detailCompleted = card.querySelector('.resume-details span:first-child');
            if (detailCompleted) {
                detailCompleted.innerHTML = `
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    ${data.currentQuestion} / ${data.totalQuestions} Questions Completed
                `;
            }

            const detailTime = card.querySelector('.resume-details span:last-child');
            if (detailTime) {
                const totalSecs = data.totalQuestions * 30;
                const secsSpent = Math.max(0, totalSecs - data.timeLeft);
                const m = Math.floor(secsSpent / 60);
                const s = secsSpent % 60;
                detailTime.innerHTML = `
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Time Spent: ${m}m ${s}s
                `;
            }

            const status = card.querySelector('.resume-status');
            if (status) status.innerText = 'Continue Exam';

            const btn = card.querySelector('.resume-btn');
            if (btn) btn.innerHTML = `Resume Exam <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

        } else {
            if (filledState) filledState.style.display = 'none';
            if (emptyState) emptyState.style.display = 'flex';
        }
    },

    // --- Practice Aids Wizard Logic ---
    initPracticeAids: function () {
        this.practiceAidsStep = 1;
        this.practiceSelectedMains = [];
        this.practiceExpandedMains = [];
        this.practiceSelectedSubs = [];
        this.practiceSelectedSubSubs = [];
        this.practiceCollapsedSubs = []; // Tracks collapsed sub-topic headers in step 3
        this.practiceSelectedCount = null;

        // Reset the count selector UI
        document.querySelectorAll('#practice-count-selector .count-btn').forEach(btn => {
            btn.style.background = '#ffffff';
            btn.style.color = '#64748b';
            btn.style.borderColor = 'rgba(15, 23, 42, 0.08)';
            btn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.01)';
            btn.style.transform = 'translateY(0) scale(1)';
        });
        this.currentFlow = 'topic'; // Sets flow context
        this.currentMode = 'Practice By Topic';

        document.getElementById('practice-aids-title').innerText = 'Select Main Topics';
        document.getElementById('practice-step-1').style.display = 'block';
        document.getElementById('practice-step-2').style.display = 'none';
        document.getElementById('practice-step-3').style.display = 'none';
        document.getElementById('practice-aids-footer').style.transform = 'translateY(100%)';

        this.renderPracticeStep1();
        this.navigate('view-practice-topic');
    },

    renderPracticeStep1: function () {
        const container = document.getElementById('practice-main-topics-list');
        if (!container) return;

        let html = '';
        const isDisabled = this.practiceSelectedCount === null;
        Object.keys(this.practiceAidsData).forEach(mainTopic => {
            const isSelected = this.practiceSelectedMains.includes(mainTopic);
            const isExpanded = this.practiceExpandedMains.includes(mainTopic);
            const cardOpacity = isDisabled ? '0.5' : '1';
            const cardPointerEvents = isDisabled ? 'none' : 'auto';

            const subTopics = this.practiceAidsData[mainTopic].subTopics;
            const subTopicsCount = Object.keys(subTopics).length;

            let totalQuestionsCount = 0;
            Object.keys(subTopics).forEach(subTopic => {
                const subSubs = subTopics[subTopic].subSubs;
                if (subSubs) {
                    Object.values(subSubs).forEach(count => {
                        totalQuestionsCount += count;
                    });
                }
            });

            const mainIconSrc = this.practiceAidsData[mainTopic].icon.includes('/')
                ? this.practiceAidsData[mainTopic].icon
                : `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${this.practiceAidsData[mainTopic].icon}`;

            html += `
                <div style="margin-bottom: ${isExpanded ? '0' : '16px'}; opacity: ${cardOpacity}; pointer-events: ${cardPointerEvents}; transition: all 0.3s ease;">
                    <div class="practice-card ${isSelected ? 'selected' : ''}" 
                         onclick="QuizEngine.togglePracticeMainExpand('${mainTopic}')"
                         style="display: flex; align-items: flex-start; gap: 16px; padding: 20px; border: ${isSelected ? '1.5px solid #466ba9' : 'none'}; background: #ffffff; border-radius: ${isExpanded ? '20px 20px 0 0' : '20px'}; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; position: relative; z-index: 2; box-shadow: ${isSelected ? '0 10px 25px -5px rgba(70, 107, 169, 0.15)' : '0 4px 20px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02)'};">
                        
                        <!-- Icon -->
                        <div style="width: 64px; height: 64px; background: #bfdbfe; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), 0 4px 8px rgba(15, 23, 42, 0.05); border: 1px solid #c7dbff;">
                            <img src="${mainIconSrc}" style="width: 52px; height: 52px; object-fit: contain; background: #0f2347; border-radius: 10px; padding: 4px; box-sizing: border-box;">
                        </div>
                        
                        <!-- Content -->
                        <div style="flex: 1; display: flex; flex-direction: column;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
                                <h3 style="font-size: 16px; font-weight: 800; color: ${isSelected ? '#1e3a8a' : '#0f172a'}; margin: 0; line-height: 1.3;">${mainTopic}</h3>
                                
                                <!-- Right Toggles -->
                                <div style="display: flex; align-items: center; gap: 12px;" onclick="event.stopPropagation();">
                                    <div class="mixed-checkbox" onclick="event.stopPropagation(); QuizEngine.togglePracticeMain('${mainTopic}')" style="width: 24px; height: 24px; border-radius: 8px; border: 2px solid ${isSelected ? '#466ba9' : '#cbd5e1'}; background: ${isSelected ? '#466ba9' : 'transparent'}; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; flex-shrink: 0; cursor: pointer; box-shadow: ${isSelected ? '0 4px 10px rgba(70, 107, 169, 0.2)' : 'none'};">
                                        ${isSelected ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
                                    </div>
                                    <div onclick="event.stopPropagation(); QuizEngine.togglePracticeMainExpand('${mainTopic}')" style="cursor: pointer; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; transition: transform 0.3s ease; transform: ${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Badges -->
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                <span style="font-size: 11px; font-weight: 600; color: #466ba9; background: #eff6ff; padding: 4px 12px; border-radius: 12px;">${subTopicsCount} Topics</span>
                                <span style="font-size: 11px; font-weight: 600; color: #466ba9; background: #eff6ff; padding: 4px 12px; border-radius: 12px;">${totalQuestionsCount} Qs</span>
                            </div>
                        </div>
                    </div>
            `;

            // Render subtopics if this main topic is expanded
            if (isExpanded) {
                const subTopics = this.practiceAidsData[mainTopic].subTopics;
                html += `<div class="practice-card-body ${isSelected ? 'selected' : ''}" style="border: ${isSelected ? '1.5px solid #466ba9' : 'none'}; ${isSelected ? 'border-top: none;' : ''} border-radius: 0 0 20px 20px; background: #ffffff; padding: 12px 18px 18px; margin-bottom: 16px; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);">`;

                Object.keys(subTopics).forEach((subTopic) => {
                    const isSubSelected = this.practiceSelectedSubs.includes(subTopic);
                    const badge = subTopics[subTopic].badge;
                    let badgeHtml = '';
                    if (badge) {
                        let badgeColor = '';
                        let badgeText = '';
                        if (badge === 'Gold') { badgeColor = 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)'; badgeText = '#854d0e'; }
                        else if (badge === 'Silver') { badgeColor = 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)'; badgeText = '#334155'; }
                        else if (badge === 'Bronze') { badgeColor = 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)'; badgeText = '#9a3412'; }
                        else if (badge === 'Rare') { badgeColor = 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)'; badgeText = '#7e22ce'; }
                        badgeHtml = `<div style="background: ${badgeColor}; color: ${badgeText}; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 8px; margin-left: 12px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">${badge}</div>`;
                    }

                    html += `
                        <div class="practice-sub-card ${isSubSelected ? 'selected' : ''}" onclick="event.stopPropagation(); QuizEngine.togglePracticeSub('${subTopic}')" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; margin-bottom: 8px; cursor: pointer; border-radius: 12px; background: ${isSubSelected ? '#eff6ff' : 'rgba(15, 23, 42, 0.01)'}; border: ${isSubSelected ? '1.5px solid rgba(37, 99, 235, 0.2)' : 'none'}; box-shadow: ${isSubSelected ? '0 4px 10px rgba(37, 99, 235, 0.05)' : 'none'}; transition: all 0.2s ease;">
                            
                            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                                <!-- Checkbox -->
                                <div class="mixed-checkbox" style="width: 20px; height: 20px; border-radius: 6px; border: 2px solid ${isSubSelected ? '#466ba9' : '#cbd5e1'}; background: ${isSubSelected ? '#466ba9' : 'transparent'}; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; flex-shrink: 0;">
                                    ${isSubSelected ? '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
                                </div>
                                
                                <!-- Title -->
                                <div style="font-size: 14px; font-weight: 600; color: ${isSubSelected ? '#1e3a8a' : '#475569'}; line-height: 1.4;">
                                    ${subTopic}
                                </div>
                            </div>
                            
                            ${badgeHtml}
                        </div>
                    `;
                });

                html += `</div>`;
            }

            html += `</div>`;
        });
        container.innerHTML = html;
        this.updatePracticeFooter();
    },

    togglePracticeMainExpand: function (topic) {
        if (this.practiceExpandedMains.includes(topic)) {
            this.practiceExpandedMains = this.practiceExpandedMains.filter(t => t !== topic);
        } else {
            this.practiceExpandedMains.push(topic);
        }

        // Save current scroll position
        const container = document.querySelector('#view-practice-topic .view-content');
        const scrollPos = container ? container.scrollTop : 0;

        this.renderPracticeStep1();

        // Restore scroll position after render frame to prevent flickering
        if (container) {
            requestAnimationFrame(() => {
                container.scrollTop = scrollPos;
            });
        }
    },

    togglePracticeMain: function (topic) {
        if (this.practiceSelectedMains.includes(topic)) {
            // Deselect main topic
            this.practiceSelectedMains = this.practiceSelectedMains.filter(t => t !== topic);
            // Remove all subtopics of this main topic
            const subTopics = Object.keys(this.practiceAidsData[topic].subTopics);
            this.practiceSelectedSubs = this.practiceSelectedSubs.filter(sub => !subTopics.includes(sub));
        } else {
            // Select main topic
            this.practiceSelectedMains.push(topic);
            // Automatically select all subtopics of this main topic
            const subTopics = Object.keys(this.practiceAidsData[topic].subTopics);
            subTopics.forEach(sub => {
                if (!this.practiceSelectedSubs.includes(sub)) {
                    this.practiceSelectedSubs.push(sub);
                }
            });
        }

        // Save current scroll position
        const container = document.querySelector('#view-practice-topic .view-content');
        const scrollPos = container ? container.scrollTop : 0;

        this.renderPracticeStep1();

        // Restore scroll position after render frame to prevent flickering
        if (container) {
            requestAnimationFrame(() => {
                container.scrollTop = scrollPos;
            });
        }
    },

    selectPracticeCount: function (count) {
        this.practiceSelectedCount = count;
        // update UI for count buttons
        document.querySelectorAll('#practice-count-selector .count-btn').forEach(btn => {
            if (parseInt(btn.dataset.count) === count) {
                btn.style.background = '#466ba9';
                btn.style.color = '#ffffff';
                btn.style.borderColor = '#466ba9';
                btn.style.boxShadow = '0 4px 10px rgba(70, 107, 169, 0.3)';
                btn.style.transform = 'translateY(-1px) scale(1.02)';
            } else {
                btn.style.background = '#ffffff';
                btn.style.color = '#64748b';
                btn.style.borderColor = 'rgba(15, 23, 42, 0.08)';
                btn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.01)';
                btn.style.transform = 'translateY(0) scale(1)';
            }
        });
        // re-render the list to enable topics
        this.renderPracticeStep1();
    },

    renderPracticeStep2: function () {
        const container = document.getElementById('practice-sub-topics-list');
        if (!container) return;

        let html = '';
        this.practiceSelectedMains.forEach(mainTopic => {
            html += `<h4 style="font-size: 14px; font-weight: 700; color: #64748b; margin: 24px 0 12px 4px; text-transform: uppercase; letter-spacing: 0.5px;">${mainTopic}</h4>`;

            const subTopics = this.practiceAidsData[mainTopic].subTopics;
            Object.keys(subTopics).forEach(subTopic => {
                const isSelected = this.practiceSelectedSubs.includes(subTopic);
                const badge = subTopics[subTopic].badge;
                let badgeColor = '';
                let badgeText = '';

                if (badge === 'Gold') { badgeColor = '#fef08a'; badgeText = '#854d0e'; }
                else if (badge === 'Silver') { badgeColor = '#e2e8f0'; badgeText = '#334155'; }
                else if (badge === 'Bronze') { badgeColor = '#ffedd5'; badgeText = '#9a3412'; }
                else if (badge === 'Rare') { badgeColor = '#f3e8ff'; badgeText = '#7e22ce'; }

                html += `
                    <div class="practice-card ${isSelected ? 'selected' : ''}" onclick="QuizEngine.togglePracticeSub('${subTopic}')" style="align-items: center; padding: 16px 20px; cursor: pointer; border: ${isSelected ? '1.5px solid rgba(70, 107, 169, 0.3)' : 'none'}; background: ${isSelected ? '#eff6ff' : '#ffffff'}; margin-bottom: 12px; border-radius: 16px; transition: all 0.2s ease; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);">
                        <div style="flex: 1; font-size: 16px; font-weight: 700; color: ${isSelected ? '#1e3a8a' : '#0f172a'};">${subTopic}</div>
                        <div class="mixed-checkbox" style="width: 24px; height: 24px; border-radius: 6px; border: 2px solid ${isSelected ? '#466ba9' : '#cbd5e1'}; background: ${isSelected ? '#466ba9' : 'transparent'}; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; margin-right: ${badge ? '30px' : '0'};">
                            ${isSelected ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
                        </div>
                    </div>
                `;
            });
        });
        container.innerHTML = html;
        this.updatePracticeFooter();
    },

    togglePracticeSub: function (topic) {
        let parentMain = null;
        Object.keys(this.practiceAidsData).forEach(main => {
            if (this.practiceAidsData[main].subTopics && this.practiceAidsData[main].subTopics[topic]) {
                parentMain = main;
            }
        });

        if (this.practiceSelectedSubs.includes(topic)) {
            this.practiceSelectedSubs = this.practiceSelectedSubs.filter(t => t !== topic);

            if (parentMain) {
                const allSubTopics = Object.keys(this.practiceAidsData[parentMain].subTopics);
                const hasAnySelected = allSubTopics.some(sub => this.practiceSelectedSubs.includes(sub));

                if (!hasAnySelected && this.practiceSelectedMains.includes(parentMain)) {
                    this.practiceSelectedMains = this.practiceSelectedMains.filter(m => m !== parentMain);
                }
            }
        } else {
            this.practiceSelectedSubs.push(topic);

            // Also tick the main topic if it's not already ticked
            if (parentMain && !this.practiceSelectedMains.includes(parentMain)) {
                this.practiceSelectedMains.push(parentMain);
            }
        }

        // Save current scroll position
        const container = document.querySelector('#view-practice-topic .view-content');
        const scrollPos = container ? container.scrollTop : 0;

        this.renderPracticeStep1();

        // Restore scroll position
        if (container) {
            requestAnimationFrame(() => {
                container.scrollTop = scrollPos;
            });
        }
    },

    renderPracticeStep3: function () {
        const container = document.getElementById('practice-subsub-topics-list');
        if (!container) return;

        let html = '';
        this.practiceSelectedMains.forEach(mainTopic => {
            const subTopics = this.practiceAidsData[mainTopic].subTopics;
            Object.keys(subTopics).forEach(subTopic => {
                if (this.practiceSelectedSubs.includes(subTopic)) {
                    const isCollapsed = this.practiceCollapsedSubs.includes(subTopic);
                    html += `
                        <div class="practice-card" style="background: #ffffff; border-radius: 16px; margin-bottom: 16px; border: none; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);">
                            <div onclick="QuizEngine.togglePracticeSubCollapse('${subTopic}')" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #f8fafc; border-bottom: ${isCollapsed ? 'none' : '1.5px solid rgba(15, 23, 42, 0.08)'}; cursor: pointer;">
                                <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0; text-transform: capitalize;">${subTopic}</h4>
                                <svg style="transform: rotate(${isCollapsed ? '-90deg' : '0deg'}); transition: transform 0.2s ease; color: #64748b;" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                            <div style="display: ${isCollapsed ? 'none' : 'block'};">
                    `;
                    const subSubs = subTopics[subTopic].subSubs;
                    const subSubKeys = Object.keys(subSubs);

                    subSubKeys.forEach((subSub, idx) => {
                        const count = subSubs[subSub];
                        const isSelected = this.practiceSelectedSubSubs.includes(subSub);
                        const isLast = idx === subSubKeys.length - 1;
                        const safeSubSub = subSub.replace(/'/g, "\\'");
                        html += `
                            <div class="practice-sub-row" onclick="QuizEngine.togglePracticeSubSub('${safeSubSub}')" style="display: flex; align-items: center; padding: 16px 20px; cursor: pointer; border-bottom: ${isLast ? 'none' : '1.5px solid rgba(15, 23, 42, 0.04)'}; background: transparent; transition: background 0.2s ease;">
                                <div style="flex: 1; font-size: 15px; font-weight: ${isSelected ? '700' : '500'}; color: ${isSelected ? '#1e3a8a' : '#334155'};">${subSub} <span style="color: #64748b; font-weight: 400; font-size: 14px;">(${count})</span></div>
                                <div class="mixed-checkbox" style="width: 24px; height: 24px; border-radius: 6px; border: 2px solid ${isSelected ? '#466ba9' : '#cbd5e1'}; background: ${isSelected ? '#466ba9' : 'transparent'}; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;">
                                    ${isSelected ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
                                </div>
                            </div>
                        `;
                    });
                    html += `</div></div>`;
                }
            });
        });
        container.innerHTML = html;
        this.updatePracticeFooter();
    },

    togglePracticeSubSub: function (topic) {
        if (this.practiceSelectedSubSubs.includes(topic)) {
            this.practiceSelectedSubSubs = this.practiceSelectedSubSubs.filter(t => t !== topic);
        } else {
            this.practiceSelectedSubSubs.push(topic);
        }
        this.renderPracticeStep3();
    },

    togglePracticeSubCollapse: function (subTopic) {
        if (this.practiceCollapsedSubs.includes(subTopic)) {
            this.practiceCollapsedSubs = this.practiceCollapsedSubs.filter(t => t !== subTopic);
        } else {
            this.practiceCollapsedSubs.push(subTopic);
        }
        this.renderPracticeStep3();
    },

    updatePracticeFooter: function () {
        const footer = document.getElementById('practice-aids-footer');
        const btn = document.getElementById('practice-aids-action-btn');
        if (!footer || !btn) return;

        if (this.practiceAidsStep === 1) {
            // Require at least one subtopic to be selected to proceed
            if (this.practiceSelectedSubs.length > 0) {
                footer.style.transform = 'translateY(0)';
                btn.innerText = 'Next';
            } else {
                footer.style.transform = 'translateY(100%)';
            }
        } else if (this.practiceAidsStep === 2) {
            if (this.practiceSelectedSubs.length > 0) {
                footer.style.transform = 'translateY(0)';
                btn.innerText = 'Next';
            } else {
                footer.style.transform = 'translateY(100%)';
            }
        } else if (this.practiceAidsStep === 3) {
            if (this.practiceSelectedSubSubs.length > 0) {
                let totalQs = 0;
                // Calculate total selected questions
                this.practiceSelectedMains.forEach(mainTopic => {
                    const subTopics = this.practiceAidsData[mainTopic].subTopics;
                    Object.keys(subTopics).forEach(subTopic => {
                        if (this.practiceSelectedSubs.includes(subTopic)) {
                            const subSubs = subTopics[subTopic].subSubs;
                            Object.keys(subSubs).forEach(subSub => {
                                if (this.practiceSelectedSubSubs.includes(subSub)) {
                                    totalQs += subSubs[subSub];
                                }
                            });
                        }
                    });
                });
                footer.style.transform = 'translateY(0)';
                let finalQCount = totalQs;
                if (this.practiceSelectedCount && totalQs > this.practiceSelectedCount) {
                    finalQCount = this.practiceSelectedCount;
                }
                if (finalQCount === 0) {
                    finalQCount = this.practiceSelectedCount || 10;
                }
                btn.innerText = `Start Practice (${finalQCount})`;
            } else {
                footer.style.transform = 'translateY(100%)';
            }
        }
    },

    practiceAidsNext: function () {
        if (this.practiceAidsStep === 1) {
            this.practiceAidsStep = 3;
            document.getElementById('practice-step-1').style.display = 'none';
            document.getElementById('practice-step-3').style.display = 'block';
            document.getElementById('practice-aids-title').innerText = 'Select Specifics';

            // Clean up subs that are no longer valid just in case
            let validSubs = [];
            this.practiceSelectedMains.forEach(m => validSubs.push(...Object.keys(this.practiceAidsData[m].subTopics)));
            this.practiceSelectedSubs = this.practiceSelectedSubs.filter(s => validSubs.includes(s));

            // Clean up sub-subs that are no longer valid
            let validSubSubs = [];
            this.practiceSelectedMains.forEach(m => {
                Object.keys(this.practiceAidsData[m].subTopics).forEach(s => {
                    if (this.practiceSelectedSubs.includes(s)) {
                        validSubSubs.push(...Object.keys(this.practiceAidsData[m].subTopics[s].subSubs));
                    }
                });
            });
            this.practiceSelectedSubSubs = this.practiceSelectedSubSubs.filter(ss => validSubSubs.includes(ss));

            this.renderPracticeStep3();
        } else if (this.practiceAidsStep === 3) {
            // Start the practice
            this.selectedFormat = 'Practice By Topic';

            // Count total selected
            let totalQs = 0;
            this.practiceSelectedMains.forEach(mainTopic => {
                const subTopics = this.practiceAidsData[mainTopic].subTopics;
                Object.keys(subTopics).forEach(subTopic => {
                    if (this.practiceSelectedSubs.includes(subTopic)) {
                        const subSubs = subTopics[subTopic].subSubs;
                        Object.keys(subSubs).forEach(subSub => {
                            if (this.practiceSelectedSubSubs.includes(subSub)) {
                                totalQs += subSubs[subSub];
                            }
                        });
                    }
                });
            });

            this.totalQuestions = this.practiceSelectedCount || (totalQs > 0 ? totalQs : 10);
            this.currentMode = 'Practice By Topic';
            this.currentDifficulty = 'Medium';

            this.navigate('view-active');
        }
    },

    practiceAidsGoBack: function () {
        if (this.practiceAidsStep === 3) {
            this.practiceAidsStep = 1;
            this.practiceExpandedMains = [];
            this.practiceCollapsedSubs = [];
            document.getElementById('practice-step-3').style.display = 'none';
            document.getElementById('practice-step-1').style.display = 'block';
            document.getElementById('practice-aids-title').innerText = 'Select Main Topics';
            this.updatePracticeFooter();
            this.renderPracticeStep1();
        } else {
            // go back to hub
            this.navigateBack();
        }
    },

    updateMockStats: function () {
        if (!this.mockAnswers) return;

        let answered = 0;
        let skipped = 0;
        for (let i = 0; i < this.totalQuestions; i++) {
            if (this.mockAnswers[i] && this.mockAnswers[i].status === 'answered') answered++;
            if (this.mockAnswers[i] && this.mockAnswers[i].status === 'skipped') skipped++;
        }

        const statAnswered = document.getElementById('stat-answered');
        const statSkipped = document.getElementById('stat-skipped');
        if (statAnswered) statAnswered.innerText = answered;
        if (statSkipped) statSkipped.innerText = skipped;

        this.updateSkippedNavigatorBar();
    },

    updateSkippedNavigatorBar: function () {
        const bar = document.getElementById('open-navigator-bar');
        const badge = document.getElementById('skipped-count-badge');
        const viewActive = document.getElementById('view-active');
        if (!bar) return;

        const isMockExam = (this.currentFlow === 'mock' || this.selectedCategory === 'Mock Exam' || this.selectedCategory === 'Promotion Exam');
        const isActiveView = viewActive && viewActive.classList.contains('active');
        const shouldShow = isMockExam && isActiveView;

        if (shouldShow) {
            bar.classList.add('visible');
            bar.setAttribute('aria-hidden', 'false');
            if (viewActive) viewActive.classList.add('has-skipped-nav-bar');

            let skipped = 0;
            if (this.mockAnswers) {
                for (let i = 0; i < this.totalQuestions; i++) {
                    if (this.mockAnswers[i] && this.mockAnswers[i].status === 'skipped') skipped++;
                }
            }
            if (badge) {
                badge.innerText = skipped;
                badge.style.display = skipped > 0 ? '' : 'none';
            }
        } else {
            bar.classList.remove('visible');
            bar.setAttribute('aria-hidden', 'true');
            if (viewActive) viewActive.classList.remove('has-skipped-nav-bar');
        }
    },

    skipCurrentQuestion: function () {
        if (!this.mockAnswers) this.mockAnswers = new Array(this.totalQuestions).fill(null);

        if (!this.mockAnswers[this.currentQuestion - 1] || this.mockAnswers[this.currentQuestion - 1].status !== 'answered') {
            this.mockAnswers[this.currentQuestion - 1] = { status: 'skipped' };
        }
        this.updateMockStats();
        this.nextQuestion();
    },

    prevQuestion: function () {
        if (this.currentQuestion > 1) {
            this.loadQuestion(this.currentQuestion - 1);
        }
    }
};

// Handle Native Browser Back Button
window.addEventListener('popstate', function (event) {
    QuizEngine.stopConfetti();
    const sheet = document.getElementById('navigator-sheet');
    if (sheet && !sheet.classList.contains('hidden')) {
        QuizEngine.closeQuestionNavigator(true);
        return;
    }
    if (event.state && event.state.viewId) {
        const index = QuizEngine.history.indexOf(event.state.viewId);
        if (index !== -1) {
            if (event.state.viewId !== 'view-active' && event.state.viewId !== 'view-skipped-questions') {
                if (QuizEngine.timerInterval) clearInterval(QuizEngine.timerInterval);
            }
            // Revert history array to this point
            const currentViewId = QuizEngine.history[QuizEngine.history.length - 1];
            QuizEngine.history = QuizEngine.history.slice(0, index + 1);

            const currentView = document.getElementById(currentViewId);
            const prevView = document.getElementById(event.state.viewId);

            if (currentView) currentView.classList.remove('active');
            if (prevView) prevView.classList.add('active');
        }
    } else {
        // If no state, try to go home
        QuizEngine.returnHome();
    }
});

// Initialize first history state
window.history.replaceState({ viewId: 'view-hub', index: 0 }, "", "#view-hub");
QuizEngine.updateResumeWidget();

// Stop confetti when switching to a different tab/screen
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        QuizEngine.stopConfetti();
    }
});



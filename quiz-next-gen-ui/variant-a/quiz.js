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
            icon: "1f4dd.png",
            subTopics: {
                "Mens Rea (State of Mind)": { badge: "Gold", subSubs: { "Intent": 8, "Recklessness": 3, "Negligence": 1, "Strict Liability": 3, "Transferred Mens Rea": 4 } },
                "Actus Reus (Criminal Conduct)": { badge: "Gold", subSubs: { "Automatism": 2, "Coincidence with Mens Rea": 5, "Omissions": 3, "Causal Link or Chain of Causation": 5, "Intervening Act": 5, "Principals and Accessories": 18, "Joint Enterprise": 3, "Corporate Liability": 2 } },
                "Incomplete Offences": { badge: "Rare", subSubs: { "Encouraging or Assisting Crime": 12, "Conspiracy": 15, "Attempts": 12, "Impossibility": 3 } },
                "General Defences": { badge: "Gold", subSubs: { "Inadvertence and Mistake": 2, "Duress": 11, "Duress of Circumstances": 4, "Use of Lethal Force and Human Rights": 3, "Use of Force to Defend, Prevent Crime and to Arrest": 3, "Police Officers": 1, "Infancy": 2 } },
                "Homicide": { badge: "Bronze", subSubs: { "Murder": 10, "Voluntary Manslaughter and 'Special Defences'": 12, "Involuntary Manslaughter": 9, "Causing or Allowing a Child or Vulnerable Adult to Die or Suffer Serious Physical Harm": 3, "Encouraging or Assisting Suicide": 4, "Solicitation of Murder": 2 } },
                "Misuse of Drugs": { badge: "", subSubs: { "Classification": 8, "Possession": 10, "Supplying": 10, "Possession with Intent to Supply": 4, "Supply of Articles": 3, "Production of a Controlled Drug": 3, "Cultivation of Cannabis": 3, "General Defence under Section 28": 9, "Occupiers etc": 2, "Assisting or Inducing Offence Outside United Kingdom": 1, "Incitement": 1, "Travel Restriction Orders": 4, "Police Powers": 7, "Psychoactive and Intoxicating Substances": 5 } },
                "Firearms and Gun Crime": { badge: "Bronze", subSubs: { "Definitions – Firearm, Ammunition and Imitation Firearm": 8, "Section 1 Firearm": 5, "Restrictions on Transfer of Firearms": 1, "Imitation Firearm Offences": 2, "Prohibited Weapon": 14, "General Exemptions": 6, "Criminal Use of Firearms": 21, "Further Firearms Offences": 8, "Police Powers": 8, "Possession or Acquisition of Firearms by Convicted Persons": 6 } },
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
            icon: "1f4c4.png",
            subTopics: {
                "Instituting Criminal Proceedings": { badge: "Silver", subSubs: { "Written Charge and Requisition": 2, "Service of Summons, Written Charge and Requisition": 3, "Service Outside England and Wales": 1, "Execution of Warrants": 6 } },
                "Release of Person Arrested": { badge: "Bronze", subSubs: { "Person Arrested Elsewhere than at a Police Station": 18, "Pre-Charge Release of Person Arrested and Bail": 12, "Police Bail After Charge": 2, "Police Bail Restrictions": 6, "Grounds for Refusing Police Bail": 12, "Custody Officer – Granting Bail": 9, "Police Bail – Surety": 8, "Security": 2, "Liability to Arrest for Absconding or Breaking Bail Conditions": 4, "Offence of Absconding by Person Released on Bail": 2, "Remands in Police Custody": 1 } },
                "Court Procedure and Witnesses": { badge: "Bronze", subSubs: { "Plea of Guilty by Post": 2, "Mode of Trial": 4, "Witnesses": 19, "Special Measures": 5, "Refreshing Memory": 6, "Oaths and Affirmations": 1, "Cross-Examination": 2 } },
                "Exclusion of Admissible Evidence": { badge: "Bronze", subSubs: { "Confessions": 15, "Exclusion of Evidence Generally": 10, "Entrapment": 5 } },
                "Disclosure of Evidence": { badge: "", subSubs: { "Failure to Comply": 5, "Disclosure Code of Practice – 2 Definitions": 3, "Disclosure Code of Practice – 3 General Responsibilities": 5, "Disclosure Code of Practice – 5 Retention of Material": 7, "Disclosure Code of Practice – 6 Preparation of Material for Prosecutor": 11, "Disclosure Code of Practice – 7 Revelation of Material to Prosecutor": 3, "Disclosure Code of Practice – 8 Subsequent Action by Disclosure Officer": 12, "Disclosure Code of Practice – 10 Disclosure of Material to Accused": 6 } },
                "Detention and Treatment of Persons by Police Officers: PACE Code C": { badge: "", subSubs: { "Custody Officer": 5, "Designated Person": 2, "Designated Police Station": 1, "Police Detention": 3, "Code C – 1 General": 6, "Code C – 2 Custody Records": 7, "Code C – 3 Initial Action": 21, "Code C – 4 Detainee's Property": 10, "Code C – 5 Right not to be Held Incommunicado": 10, "Code C – 6 Right to Legal Advice": 15, "Code C – 7 Citizens of Independent Commonwealth Countries or Foreign Nationals": 1, "Code C – 8 Conditions of Detention": 6, "Code C – 9 Care and Treatment of Detained Persons": 9, "Code C – 13 Interpreters": 10, "Code C – 14 Questioning – Special Restrictions": 1, "Limits on Period of Detention without Charge": 11, "Code C – 15 Reviews and Extensions of Detention": 38, "Code C – 16 Charging Detained Persons": 13, "Cautions as a Means of Disposal": 3, "Code C – 17 Testing Persons for Presence of Specified Class A Drugs": 7, "Code C – Annex A – Intimate and Strip Searches": 10, "Code C – Annex E: Summary of Provisions Relating to Vulnerable Persons": 2, "Code C – Annex K – X-Rays and Ultrasound Scans": 2, "Code C – Annex L – Establishing Gender of Persons for the Purpose of Searching and Certain other Procedures": 2 } },
                "Identification: PACE Code D": { badge: "", subSubs: { "Introduction": 1, "Code D – 2 General": 1, "Code D – 3 Identification by Witnesses": 38, "Code D – 4 Identification by Fingerprints and Footwear Impressions": 21, "Code D – 5 Examinations to Establish Identity and the Taking of Photographs": 10, "Code D – 6 Identification by Body Samples and Impressions": 23, "Code D – Annex A: Video Identification": 4, "Code D – Annex B: Identification Parades": 4, "Code D – Annex C: Group Identification": 2, "Code D – Annex D: Confrontation by an Eye-witness": 1, "Code D – Annex E: Showing Photographs to Eye Witnesses": 3, "Code D – Annex F: Fingerprints, Samples and Footwear Impressions – Destruction and Speculative Searches": 3, "Code D – Annex G: Requirement for a Person to Attend a Police Station for Fingerprints and Samples": 1 } },
                "Interviews: PACE Codes C, E and F": { badge: "", subSubs: { "Code C – 10 Cautions": 11, "Code C – 11 Interviews – General": 17, "Code C – 12 Interviews in Police Stations": 11, "Code C – Annex C: Restriction on Drawing Adverse Inferences from Silence and Terms of the Caution when the Restriction Applies": 2, "Code C – Annex D: Written Statements under Caution": 1, "Code E – 1 General": 1, "Code E – 2 Interviews and other matters to be audio recorded under this Code": 2, "Code E – 3 Interview recording using removable recording media device": 11, "Code F – 1 General": 1, "Code F – 2 When interviews and matters to which Code F applies may be visually recorded with sound and provisions for their conduct and recording": 2, "Interviews on Behalf of Scottish Forces and Vice Versa": 2 } }
            }
        },
        "General Police Duties": {
            icon: "1f46e.png",
            subTopics: {
                "Stop and Search": { badge: "", subSubs: { "Code A – 1 Principles Governing Stop and Search": 4, "Code A – 2 Types of Stop and Search Powers": 29, "Code A – 3 Conduct of Searches": 7, "Code A – 4 Recording Requirements": 9 } },
                "Entry, Search and Seizure": { badge: "", subSubs: { "Code B – 2 General": 4, "Code B – 3 Search Warrants and Production Orders": 5, "Search Warrants for Indictable Offences": 3, "Execution of a Warrant": 1, "Code B – 4 Entry without Warrant – Particular Powers": 20, "Code B – 5 Search with Consent": 2, "Code B – 6 Searching Premises – General Considerations": 6, "Code B – 7 Seizure and Retention of Property": 13, "Code B – 8 Action After Searches": 2 } },
                "Powers of Arrest": { badge: "Bronze", subSubs: { "Code G – 1 Introduction": 4, "Code G – 2 Elements of Arrest under Section 24 PACE": 11, "Code G – 3 Information to be Given on Arrest": 4, "Code G – 4 Records of Arrest": 1, "Arrest Without Warrant – \"Citizen's Arrest\"": 3, "Voluntary Attendance at a Police Station": 2, "After Arrest": 3 } },
                "Protection of People Suffering from Mental Disorders": { badge: "Gold", subSubs: { "Removal etc of Mentally Disordered Persons Without a Warrant": 5, "Retaking of Patients Escaping from Custody": 2 } },
                "Offences Relating to Land and Premises": { badge: "", subSubs: { "Aggravated Trespass": 2, "Failure to Leave Land or Re-entry to Land when Directed to Leave": 1, "Power to Remove Trespassers on Land": 10, "Power to Remove Trespassers: Alternative Site Available": 6, "Squatting in a Residential Building": 1, "Nuisance on Educational Premises": 6, "Causing Nuisance or Disturbance on NHS Premises": 2 } },
                "Licensing and Offences Relating to Alcohol": { badge: "", subSubs: { "Power of Entry to Investigate Licensable Activities or Offences": 3, "Drunk and Disorderly": 3, "Found Drunk": 1, "Children – Offences under the Licensing Act 2003": 15, "Children – Other Offences": 9, "Licensed Premises: Exclusion Orders": 1, "Orders to Close Premises in Area Experiencing Disorder": 2, "Closure Notices and Orders for Unlicensed Premises": 2 } },
                "Protecting Citizens and the Community: Injunctions, Orders and Police Powers": { badge: "Bronze", subSubs: { "Injunctions to Prevent Gang-related Violence and Drug Dealing Activity": 2, "Injunctions under the Anti-social Behaviour, Crime and Policing Act 2014": 3, "Criminal Behaviour Orders": 4, "Dispersal Powers": 4, "Community Protection Notices": 1, "Public Spaces Protection Orders": 2, "Closure of Premises Associated with Nuisance and Disorder": 2, "Orders Against Parents": 12, "Removal of Truants and Excluded Pupils to Designated Premises, etc.": 9 } },
                "Processions and Assemblies": { badge: "", subSubs: { "Public Processions and Assemblies": 10 } },
                "Public Order Offences": { badge: "Silver", subSubs: { "Breach of the Peace": 12, "Riot": 8, "Violent Disorder": 6, "Affray": 7, "Fear or Provocation of Violence": 4, "Intentional Harassment Alarm or Distress": 7, "Harassment Alarm or Distress": 8 } },
                "Sporting Events": { badge: "", subSubs: { "Designated and Regulated Football Matches": 2, "The Football (Offences) Act 1991": 7, "Banning Orders and Detention": 4, "The Sporting Events (Control of Alcohol etc) Act 1985": 13, "Ticket Touts": 3 } },
                "Domestic Violence and Abuse": { badge: "Silver", subSubs: { "Domestic Violence Protection Notices and Orders": 3 } },
                "Hatred and Harassment Offences": { badge: "Silver", subSubs: { "Offences Involving Racial, Religious or Sexual Orientation Hatred": 7, "The Harassment Offences": 13, "Putting People in Fear of Violence": 6, "The Stalking Offences": 2, "Police Direction to Prevent Intimidation or Harassment": 2 } },
                "Offences and Powers Relating to Information and Communications": { badge: "", subSubs: { "Offences Under the Computer Misuse Act 1990": 13, "The Data Protection Act 2018": 5, "The Regulation of Investigatory Powers Act 2000": 20, "Offence of Sending Letters etc. with Intent to Cause Distress or Anxiety": 3, "False Communications Offence": 1, "Improper Use of Public Electronic Communications Network": 5 } },
                "Offences Against the Administration of Justice & Public Interest": { badge: "", subSubs: { "Perjury": 5, "Offences Similar to Perjury": 2, "Perverting the Course of Justice": 4, "Considerations Affecting Witnesses, Jurors and Others": 6, "Assisting Offenders": 8, "Concealing Relevant Offences": 3, "Miscellaneous Offences Relating to Offenders": 5, "Wasting Police Time": 6 } },
                "Terrorism and Associated Offences": { badge: "", subSubs: { "Terrorism Defined": 4, "Terrorism Act 2000: Financial Measures": 2, "Terrorism Act 2000: Duty of Disclosure and Tipping Off": 2, "Terrorism Act 2006: Offences": 3, "Terrorism Act 2000: Police Powers": 3, "Cordons": 6, "Offences Involving Explosive Substance": 5 } },
                "Diversity, Equality and Inclusion": { badge: "", subSubs: { "Article 14 – Prohibition of Discrimination": 1, "Protected Characteristics": 12, "Discrimination": 6, "Police Officers": 1, "Employees and Applicants": 5, "Liability for Discrimination in Employment": 2 } },
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
        const saved = localStorage.getItem('saved_exam_progress');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.currentMode === 'Mock Exam' || data.currentFlow === 'mock' || data.selectedCategory === 'Mock Exam' || data.selectedCategory === 'Promotion Exam') {
                    const overlay = document.getElementById('resume-exam-overlay');
                    if (overlay) {
                        overlay.style.opacity = '1';
                        overlay.style.pointerEvents = 'auto';
                        overlay.querySelector('.exit-confirm-modal').style.transform = 'scale(1)';
                    }
                    return;
                }
            } catch (e) {
                console.error("Error parsing saved exam progress:", e);
            }
        }

        this.selectedCategory = examName;
        this.currentFormat = 'Mock Exam';
        this.currentMode = 'Mock Exam';

        const examsData = {
            'Sergeant Exam': { icon: '1f46e.png', sub: 'Crime, Evidence, GP', q: 150, d: '3h 15m', pass: '55%' },
            'Inspector Exam': { icon: '1f46e.png', sub: 'Crime, Evidence, GP, Traffic', q: 150, d: '3h 15m', pass: '55%' },
            'National Investigators Exam': { icon: '1f50d.png', sub: 'Crime, Evidence, Investigation', q: 80, d: '2h', pass: '55%' }
        };
        const data = examsData[examName] || examsData['Sergeant Exam'];

        const cardHtml = `
            <div class="format-card" style="flex-direction: column; align-items: stretch; padding: 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                    <div style="display: flex; align-items: flex-start;">
                        <div style="background: #eff6ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${data.icon}" style="width: 24px; height: 24px; object-fit: contain;">
                        </div>
                        <div>
                            <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">${examName}</h3>
                            <p style="font-size: 14px; color: #64748b; margin: 0;">${data.sub}</p>
                        </div>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; width: 100%; text-align: left; padding-top: 16px; border-top: 1.5px solid rgba(15, 23, 42, 0.04);">
                    <div>
                        <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions</div>
                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${data.q}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration</div>
                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${data.d}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark</div>
                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${data.pass}</div>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('exam-details-card-container');
        if (container) container.innerHTML = cardHtml;

        this.navigate('view-exam-details');
    },

    beginMockSimulation: function () {
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
                btn.style.background = '#466ba9';
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
            this.showToast('✓ Thank You<br>Your feedback helps improve future questions. 🙏');
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
        this.showToast('✓ Thank You<br>Your feedback helps improve future questions. 🙏');
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
                        title.style.color = "#4ade80"; // Light green text for blue header
                        title.style.animation = "popIn 0.5s ease-out";
                    }
                    const subtitle = document.getElementById('waiting-subtitle');
                    if (subtitle) subtitle.innerText = "Starting challenge...";

                    const spinner = document.getElementById('waiting-spinner');
                    if (spinner) {
                        spinner.style.animation = "none";
                        spinner.innerHTML = '<polyline points="20 6 9 17 4 12" stroke="#4ade80" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>';
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

        // Special initializers
        if (viewId === 'view-active') {
            if (!this.isReviewingSkipped) {
                this.initActiveQuiz();
            }
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

            if (isExamFlow) {
                if (titleEl) titleEl.innerText = 'Exit Exam?';
                if (descEl) descEl.innerText = 'What would you like to do with your current progress?';

                // Show vertical three-button stack and hide horizontal two buttons
                const twoButtons = document.getElementById('exit-two-buttons');
                const threeButtons = document.getElementById('exit-three-buttons');
                if (twoButtons) twoButtons.style.display = 'none';
                if (threeButtons) threeButtons.style.display = 'flex';
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

        if (this.currentMode === 'Practice By Topic') {
            const returnView = this.history.length >= 2 ? this.history[this.history.length - 2] : null;
            if (returnView === 'view-practice-topic') {
                this.practiceAidsStep = 1;
                this.practiceSelectedMains = [];
                this.practiceSelectedSubs = [];
                this.practiceSelectedSubSubs = [];
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
        if (this.currentMode === 'Practice By Topic') {
            const returnView = this.history.length >= 2 ? this.history[this.history.length - 2] : null;
            if (returnView === 'view-practice-topic') {
                this.practiceAidsStep = 1;
                this.practiceSelectedMains = [];
                this.practiceSelectedSubs = [];
                this.practiceSelectedSubSubs = [];
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

    returnHome: function () {
        this.stopConfetti();
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.history = ['view-hub'];
        window.history.pushState({ viewId: 'view-hub', index: 0 }, "", `#view-hub`);
        document.querySelectorAll('.quiz-view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-hub').classList.add('active');
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
                        icon = '<span style="font-size: 16px; font-weight: 700; color: #10b981;">✓</span>';
                    } else if (oIndex === qData.selected) {
                        style = "padding: 12px 14px; border-radius: 10px; font-size: 14px; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; border: 1.5px solid #ef4444; background: #fef2f2; color: #991b1b;";
                        icon = '<span style="font-size: 16px; font-weight: 700; color: #ef4444;">✕</span>';
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
            q: "What is the primary objective of PACE Code A?",
            opts: ["To regulate the detention of suspects", "To regulate statutory powers of stop and search", "To regulate the searching of premises", "To regulate identification procedures"],
            correct: 1,
            expCorrect: "<strong>PACE Code A</strong> specifically governs the exercise of statutory powers to search a person or a vehicle without first making an arrest.<br><br><strong>Why other options are incorrect:</strong><ul style='margin-top: 8px; padding-left: 20px; line-height: 1.5;'><li><strong>Detention of suspects:</strong> Governed by Code C.</li><li><strong>Searching of premises:</strong> Governed by Code B.</li><li><strong>Identification procedures:</strong> Governed by Code D.</li></ul>",
            expWrong: "You selected the wrong code! <strong>Code A</strong> is exclusively for <strong>Stop and Search</strong>.<br><br><strong>Where the other codes apply:</strong><ul style='margin-top: 8px; padding-left: 20px; line-height: 1.5;'><li><strong>Detention & Questioning:</strong> Code C</li><li><strong>Searching Premises:</strong> Code B</li><li><strong>Identification:</strong> Code D</li></ul><em>Tip: Think 'A for Action' (Stop & Search in the streets).</em>"
        },
        {
            q: "Under PACE Code C, how often should a detained person be offered a meal?",
            opts: ["Every 4 hours", "Every 6 hours", "Approximately every 8 hours", "Only upon request"],
            correct: 2,
            expCorrect: "<strong>Correct!</strong> Code C requires at least two light meals and one main meal in any 24-hour period, which averages to approximately every 8 hours.<br><br><strong>Why other options are incorrect:</strong><ul style='margin-top: 8px; padding-left: 20px; line-height: 1.5;'><li><strong>Every 4/6 hours:</strong> This exceeds the statutory minimums.</li><li><strong>Only upon request:</strong> Police have a proactive duty of care; they must <em>offer</em> meals at recognised meal times, regardless of requests.</li></ul>",
            expWrong: "Incorrect. The statutory minimum under Code C requires meals to be offered <strong>approximately every 8 hours</strong>.<br><br><strong>Why your selection is wrong:</strong><ul style='margin-top: 8px; padding-left: 20px; line-height: 1.5;'><li><strong>Every 4/6 hours:</strong> Too frequent compared to statutory rules.</li><li><strong>Only upon request:</strong> Police have a proactive duty of care and cannot wait for the suspect to ask.</li></ul>"
        },
        {
            q: "Which section of PACE 1984 gives police the power of arrest without warrant?",
            opts: ["Section 1", "Section 17", "Section 24", "Section 32"],
            correct: 2,
            expCorrect: "<strong>Section 24</strong> provides the core framework for a lawful arrest without a warrant.<br><br><strong>Where the other sections are used:</strong><ul style='margin-top: 8px; padding-left: 20px; line-height: 1.5;'><li><strong>Section 1:</strong> Power to stop and search persons/vehicles.</li><li><strong>Section 17:</strong> Power to enter and search premises to make an arrest.</li><li><strong>Section 32:</strong> Power to search a person <em>after</em> they have been arrested.</li></ul>",
            expWrong: "You selected an incorrect section. The power of arrest without warrant is found in <strong>Section 24</strong>.<br><br><strong>Where the other sections apply:</strong><ul style='margin-top: 8px; padding-left: 20px; line-height: 1.5;'><li><strong>Section 1:</strong> Used for Stop & Search before arrest.</li><li><strong>Section 17:</strong> Used to enter premises to find a suspect.</li><li><strong>Section 32:</strong> Used to search a person upon arrest.</li></ul>"
        },
        {
            q: "What is the maximum initial period of detention without charge under PACE?",
            opts: ["12 hours", "24 hours", "36 hours", "72 hours"],
            correct: 1,
            expCorrect: "The initial period is 24 hours, which can be extended up to 36 hours by a Superintendent.",
            expWrong: "The standard initial limit is 24 hours. Extensions require senior authorization."
        },
        {
            q: "When must a suspect be cautioned?",
            opts: ["Upon arrest only", "Before asking any questions regarding their involvement in an offence", "After arriving at the station", "When they ask for a solicitor"],
            correct: 1,
            expCorrect: "A person must be cautioned before any questions about an offence are put to them.",
            expWrong: "A caution must be given before questioning about suspected offences to ensure admissibility."
        }
    ],

    initActiveQuiz: function () {
        this.mockAnswers = [];
        this.isTimeUp = false;
        this.isReviewingSkipped = false;
        if (this.isResuming) {
            this.isResuming = false;
            // First, try to restore from resumedData
            const resumedCurrent = this.resumedData?.currentQuestion || 67;
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
            if (this.currentMode !== 'Practice By Topic') {
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

        // If it's a Live Challenge, count down. Otherwise count up.
        // 1 minute total for the exam (for quick scenario testing)
        this.timeLeft = 60;

        this.timerInterval = setInterval(() => {
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

        this.loadQuestion();
    },

    loadQuestion: function (targetQuestion = null) {
        if (targetQuestion !== null) {
            this.currentQuestion = targetQuestion;
        } else {
            this.currentQuestion++;
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

        if (mockActions) {
            if (isMockExam) {
                mockActions.style.display = 'block';
                const mockSkipBtn = document.getElementById('mock-skip-btn');
                if (mockSkipBtn) {
                    if (this.isReviewingSkipped) {
                        mockSkipBtn.style.display = 'none';
                    } else {
                        mockSkipBtn.style.display = 'inline-block';
                        mockSkipBtn.innerText = 'Skip Question';
                    }
                }
            } else {
                mockActions.style.display = 'none';
            }
        }

        // Layout is now uniform: timer is always in the top bar and XP/Level/Streak are removed.

        // Mock Question Data
        const qData = this.questionsData[(this.currentQuestion - 1) % this.questionsData.length];
        document.getElementById('question-text').innerText = qData.q;

        const answersGrid = document.getElementById('answers-grid');
        answersGrid.innerHTML = qData.opts.map((opt, index) => {
            const isCorrect = (index === qData.correct);
            const letter = String.fromCharCode(65 + index);
            return `<button class="answer-btn" onclick="QuizEngine.selectAnswer(this, ${isCorrect}, ${index})" style="transition: transform 0.1s ease, box-shadow 0.1s ease; display: flex; gap: 12px; align-items: flex-start;">
                        <span style="font-weight: 700; opacity: 0.7; flex-shrink: 0;">${letter}.</span>
                        <span>${opt}</span>
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
            if (!this.mockAnswers) this.mockAnswers = [];
            this.mockAnswers[this.currentQuestion - 1] = { answered: true, isCorrect: isCorrect, selectedIndex: selectedIndex };
            if (isCorrect) this.score++;
            const mockSkipBtn = document.getElementById('mock-skip-btn');
            if (mockSkipBtn) mockSkipBtn.style.display = 'none';

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

        if (isCorrect) {
            btnElement.classList.add('correct');

            this.score++;
            this.streak++;
            if (this.streak > this.bestStreak) this.bestStreak = this.streak;

            let xpEarned = 25; // Base 25 XP
            if (timeTaken < 3.0) {
                xpEarned += 15; // Speed bonus +15 XP
                this.showToast('⚡ Quick Thinker +15 Bonus XP');
            }
            this.totalXp += xpEarned;

            // Floating XP Gamification
            const floatXP = document.createElement('div');
            floatXP.className = 'floating-xp';
            floatXP.innerHTML = `✔ Correct<br>+${xpEarned} XP`;
            btnElement.appendChild(floatXP);
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
            document.getElementById('feedback-details').style.display = 'flex';

            icon.innerHTML = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f973.png" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle;">';
            title.innerText = 'Excellent!';

            streakMsg.innerHTML = `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Streak: ${this.streak}`;
            streakMsg.style.display = 'block';

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
            icon.innerHTML = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/274c.png" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle;">';
            title.innerText = 'Incorrect';
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

                if (isCorrect) {
                    inlineIcon.style.background = 'transparent';
                    inlineIcon.innerHTML = '🎉';
                    inlineIcon.style.fontSize = '24px';
                    inlineTitle.innerText = 'Correct!';
                    inlineTitle.style.color = '#ffffff';

                    let xpEarned = (timeTaken < 3.0) ? 40 : 25;
                    inlineXp.style.color = '#ffffff';
                    inlineXp.innerText = `+${xpEarned} XP Earned`;
                    inlineStreakMsg.innerText = `🔥 Streak: ${this.streak}`;
                } else {
                    inlineIcon.style.background = 'transparent';
                    inlineIcon.innerHTML = '❌';
                    inlineIcon.style.fontSize = '24px';
                    inlineTitle.innerText = 'Incorrect';
                    inlineTitle.style.color = '#ffffff';

                    inlineXp.style.color = '#ffffff';
                    inlineXp.innerText = '+0 XP Earned';
                    inlineStreakMsg.innerText = `🔥 Streak Lost`;
                }

                // Hide XP and Accuracy for Practice Aids
                if (this.currentMode === 'Practice By Topic') {
                    inlineXp.style.display = 'none';
                    inlineAccuracy.style.display = 'none';
                } else {
                    inlineXp.style.display = 'block';
                    inlineAccuracy.style.display = 'block';
                }
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
            // Remove correct/wrong classes to ensure it uses default white background
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

    nextQuestion: function () {
        this.stopConfetti();
        const sheet = document.getElementById('feedback-sheet');
        const overlay = document.getElementById('feedback-overlay');
        sheet.classList.add('hidden');
        overlay.classList.add('hidden');

        if (this.isReviewingSkipped) {
            let nextSkipped = -1;
            // Search forward
            for (let i = this.currentQuestion; i < this.totalQuestions; i++) {
                if (!this.mockAnswers[i] || !this.mockAnswers[i].answered) {
                    nextSkipped = i;
                    break;
                }
            }
            // Search backward if not found forward
            if (nextSkipped === -1) {
                for (let i = 0; i < this.currentQuestion - 1; i++) {
                    if (!this.mockAnswers[i] || !this.mockAnswers[i].answered) {
                        nextSkipped = i;
                        break;
                    }
                }
            }

            if (nextSkipped !== -1) {
                this.reviewSkippedQuestion(nextSkipped);
            } else {
                this.showToast('🏆 Challenge Complete');
                setTimeout(() => {
                    this.finishQuiz();
                }, 1000);
            }
            return;
        }

        // currentQuestion is incremented by loadQuestion(), so we check against currentQuestion (before incrementing)
        if (this.currentQuestion >= this.totalQuestions) {
            const isMockExam = (this.currentFlow === 'mock' || this.selectedCategory === 'Mock Exam' || this.selectedCategory === 'Promotion Exam');
            let hasSkipped = false;
            if (isMockExam) {
                for (let i = 0; i < this.totalQuestions; i++) {
                    if (!this.mockAnswers[i] || !this.mockAnswers[i].answered) {
                        hasSkipped = true;
                        break;
                    }
                }
            }

            if (hasSkipped && !this.isTimeUp) {
                this.showSkippedQuestionsView();
            } else {
                this.showToast('🏆 Challenge Complete');
                setTimeout(() => {
                    this.finishQuiz();
                }, 1000);
            }
            return;
        }

        if (this.currentQuestion === Math.floor(this.totalQuestions / 2)) {
            this.showToast('🚀 Halfway There');
        } else if (this.currentQuestion === this.totalQuestions - 1) {
            this.showToast('⭐ Final Question');
        }

        this.loadQuestion();
    },

    showSkippedQuestionsView: function () {
        this.navigate('view-skipped-questions', 'view-active');
        const grid = document.getElementById('skipped-questions-grid');
        if (grid) {
            grid.innerHTML = '';
            let hasSkipped = false;

            for (let i = 0; i < this.totalQuestions; i++) {
                const answerData = this.mockAnswers[i];
                if (!answerData || !answerData.answered) {
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
        this.isReviewingSkipped = true;
        this.navigate('view-active', 'view-skipped-questions');
        this.loadQuestion(index + 1);
    },

    finishQuiz: function () {
        // Clear any saved progress since the exam is now finished
        localStorage.removeItem('saved_exam_progress');
        this.updateResumeWidget();

        const accuracy = Math.round((this.score / this.totalQuestions) * 100);

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

        document.getElementById('completion-emoji').innerHTML = `<img src="${emojiUrl}" style="width: 160px; height: 160px; object-fit: contain;">`;

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
        const isSolo = !isCompetitive && (this.currentFlow === 'quick' || this.currentFlow === 'mixed' || this.currentFlow === 'topic' || this.currentFlow === 'mock' || this.currentMode === 'Practice By Topic' || this.currentMode === 'Quick Quiz' || this.currentMode === 'Quick Play' || this.currentMode === 'Mixed Practice' || this.currentMode === 'Mock Exam' || this.selectedFormat === 'Quick Quiz' || this.selectedFormat === 'Quick Play' || this.selectedFormat === 'Practice By Topic' || this.selectedFormat === 'Mixed Practice');
        if (isSolo) {
            const myStreak = this.bestStreak || Math.max(1, Math.floor(this.score / 2));
            let avgTime = 3.4; // Default mock
            if (this.quizStartTime) {
                avgTime = Math.max(0.1, ((Date.now() - this.quizStartTime) / 1000) / this.totalQuestions).toFixed(1);
            }

            let actualCorrect = 0;
            let actualIncorrect = 0;
            let actualSkipped = 0;

            if (this.mockAnswers && this.mockAnswers.length > 0) {
                for (let i = 0; i < this.totalQuestions; i++) {
                    if (this.mockAnswers[i] && this.mockAnswers[i].answered) {
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

            document.getElementById('solo-best-topic-val').innerText = this.selectedCategory || 'General Law';

            const weakestTopicContainer = document.getElementById('solo-weakest-topic-container');
            if (actualIncorrect === 0) {
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
            }

            const actionsContainer = document.getElementById('solo-completion-actions');
            if (actionsContainer) {
                if (quizType === 'mock') {
                    actionsContainer.innerHTML = `
                        <button class="w-100" style="background: #ffffff; color: #466ba9; padding: 16px; font-size: 16px; font-weight: 700; margin-bottom: 12px; border-radius: 16px; border: none; box-shadow: 0 8px 16px rgba(0,0,0,0.15);" onclick="QuizEngine.navigate('view-analytics')">
                            Review Answer
                        </button>
                        ${this.score < this.totalQuestions ? `
                        <button class="w-100" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; padding: 16px; font-size: 16px; font-weight: 700; margin-bottom: 12px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3);" onclick="QuizEngine.startFlow('topic')">
                            Practice Weak Area
                        </button>
                        ` : ''}
                        <button class="w-100" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; padding: 16px; font-size: 16px; font-weight: 700; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3);" onclick="QuizEngine.returnHome()">
                            Return to Hub
                        </button>
                    `;
                } else if (quizType === 'practice') {
                    actionsContainer.innerHTML = `
                        <button class="w-100" style="background: #ffffff; color: #466ba9; padding: 16px; font-size: 16px; font-weight: 700; margin-bottom: 12px; border-radius: 16px; border: none; box-shadow: 0 8px 16px rgba(0,0,0,0.15);" onclick="QuizEngine.returnHome()">
                            Back to Hub
                        </button>
                        <button class="w-100" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; padding: 16px; font-size: 16px; font-weight: 700; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3);" onclick="QuizEngine.startFlow('mock')">
                            Start Mock Exam
                        </button>
                    `;
                } else {
                    actionsContainer.innerHTML = `
                        <button class="w-100" style="background: #ffffff; color: #466ba9; padding: 16px; font-size: 16px; font-weight: 700; margin-bottom: 12px; border-radius: 16px; border: none; box-shadow: 0 8px 16px rgba(0,0,0,0.15);" onclick="QuizEngine.startFlow('quick')">
                            Play Again
                        </button>
                        <button class="w-100" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; padding: 16px; font-size: 16px; font-weight: 700; margin-bottom: 12px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3);" onclick="QuizEngine.startFlow('colleague')">
                            Challenge Officer
                        </button>
                        <button class="w-100" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; padding: 16px; font-size: 16px; font-weight: 700; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3);" onclick="QuizEngine.navigate('view-leaderboard')">
                            Leaderboard
                        </button>
                    `;
                }
            }

            const emojiEl = document.getElementById('solo-completion-emoji');
            if (emojiEl) {
                if (accuracy >= 60) {
                    emojiEl.innerHTML = `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f389.png" style="width: 120px; height: 120px; object-fit: contain;">`;
                } else {
                    emojiEl.innerHTML = `<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f60a.png" style="width: 120px; height: 120px; object-fit: contain;">`;
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

        setTimeout(() => {
            this.initProgressChart('recent');
        }, 100);
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
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: { top: 12, right: 12, bottom: 4, left: 4 }
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
                color = '#16a34a'; bgColor = '#ecfdf5'; icon = '🏅'; title = 'Mastered';
            } else if (topic.score >= 80) {
                color = '#10b981'; bgColor = '#d1fae5'; icon = '✅'; title = 'Strong';
            } else if (topic.score >= 65) {
                color = '#f59e0b'; bgColor = '#fef3c7'; icon = '📈'; title = 'Developing';
            } else {
                color = '#ef4444'; bgColor = '#fee2e2'; icon = '⚠️'; title = 'Weak';
            }

            const diff = topic.score - topic.prevScore;
            let trendHtml = '';
            if (diff > 0) {
                trendHtml = `<span style="font-size: 11px; font-weight: 700; color: #16a34a; margin-left: 6px;">↑ +${diff}%</span>`;
            } else if (diff < 0) {
                trendHtml = `<span style="font-size: 11px; font-weight: 700; color: #ef4444; margin-left: 6px;">↓ ${diff}%</span>`;
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
                btn.style.background = '#eff6ff';
                btn.style.border = '2px solid #466ba9';
                btn.style.color = '#1d4ed8';
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

        let totalTimeSeconds = 124;
        if (this.quizStartTime) {
            totalTimeSeconds = Math.floor((Date.now() - this.quizStartTime) / 1000);
        }
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
            if (!answerData || !answerData.answered) {
                skippedCount++;
            }

            const isAnswered = answerData && answerData.answered;
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
                <div class="breakdown-item ${statusClass}" style="flex-direction: column; align-items: flex-start; padding: 16px;">
                    <div style="display: flex; gap: 12px; width: 100%; margin-bottom: 12px;">
                        <div class="breakdown-icon" style="flex-shrink: 0;">
                            ${iconSvg}
                        </div>
                        <div class="breakdown-text" style="flex-grow: 1;"><strong>Q${i + 1}:</strong> ${qData.q}</div>
                    </div>
                    
                    <div style="font-size: 14px; width: 100%; background: rgba(0,0,0,0.03); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                        <div style="margin-bottom: 8px;"><strong>Your Answer:</strong> <span style="color: ${isCorrect ? '#10b981' : (isSkipped ? '#64748b' : '#ef4444')}">${chosenText}</span></div>
                        ${!isCorrect ? `<div><strong>Correct Answer:</strong> <span style="color: #10b981">${correctText}</span></div>` : ''}
                    </div>
                    
                    ${explanation ? `
                    <div style="font-size: 13px; color: #475569; width: 100%; padding-top: 8px; border-top: 1px solid rgba(0,0,0,0.05);">
                        <strong>AI Explanation:</strong>
                        <div style="margin-top: 4px;">${explanation}</div>
                    </div>
                    ` : ''}
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
            const checkIndicator = isUnlocked ? `<div style="position: absolute; top: 12px; right: 12px; font-size: 13.33px; z-index: 2; line-height: 1; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">✓</div>` : '';

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
            ? `<div style="display: inline-block; background: rgba(70,107,169,0.1); color: #466ba9; padding: 6px 12px; border-radius: 14px; font-size: 13px; font-weight: 600; margin-bottom: 24px; font-family: 'Inter', sans-serif;">✓ Unlocked</div>`
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
                        <span style="font-size: 14px; color: #b45309; font-weight: 700;">⭐ +${badge.rewardXp} XP</span>
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

                <button onclick="QuizEngine.closeIosBadgeDetails()" style="width: 100%; padding: 16px; background: #466ba9; color: #ffffff; border-radius: 14px; border: none; font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; font-family: 'Poppins', sans-serif; box-shadow: 0 8px 16px rgba(70,107,169,0.25);">
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
        document.getElementById('completion-emoji').innerHTML = `<img src="${emojiUrl}" style="width: 140px; height: 140px; object-fit: contain;">`;

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
            btn.style.borderColor = '#cbd5e1';
            btn.style.boxShadow = 'none';
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

            html += `
                <div style="margin-bottom: ${isExpanded ? '0' : '12px'}; opacity: ${cardOpacity}; pointer-events: ${cardPointerEvents}; transition: all 0.3s ease;">
                    <div class="practice-card ${isSelected ? 'selected' : ''}" onclick="QuizEngine.togglePracticeMainExpand('${mainTopic}')" style="display: flex; align-items: center; justify-content: space-between; padding: 16px; cursor: pointer; border: 1.5px solid ${isSelected ? '#466ba9' : 'rgba(15, 23, 42, 0.04)'}; border-bottom-color: ${isExpanded ? (isSelected ? '#466ba9' : 'rgba(15, 23, 42, 0.04)') : (isSelected ? '#466ba9' : 'rgba(15, 23, 42, 0.04)')}; background: #ffffff; border-radius: ${isExpanded ? '16px 16px 0 0' : '16px'}; transition: all 0.2s ease; position: relative; z-index: 2; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                        
                        <!-- Left Side: Emoji & Title -->
                        <div style="display: flex; align-items: center; gap: 16px; flex: 1;">
                            <div style="width: 44px; height: 44px; background: #E9F5FF; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s ease;">
                                <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${this.practiceAidsData[mainTopic].icon}" style="width: 24px; height: 24px; object-fit: contain;">
                            </div>
                            <div style="font-size: 16px; font-weight: 700; color: ${isSelected ? '#1e3a8a' : '#0f172a'};">${mainTopic}</div>
                        </div>
                        
                        <!-- Right Side: Checkbox -->
                        <div style="display: flex; align-items: center;">
                            <div class="mixed-checkbox" onclick="event.stopPropagation(); QuizEngine.togglePracticeMain('${mainTopic}')" style="width: 24px; height: 24px; border-radius: 6px; border: 2px solid ${isSelected ? '#466ba9' : '#cbd5e1'}; background: ${isSelected ? '#466ba9' : 'transparent'}; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; flex-shrink: 0;">
                                ${isSelected ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
                            </div>
                        </div>
                    </div>
            `;

            // Render subtopics if this main topic is expanded
            if (isExpanded) {
                const subTopics = this.practiceAidsData[mainTopic].subTopics;
                html += `<div style="border: 1.5px solid ${isSelected ? '#466ba9' : 'rgba(15, 23, 42, 0.04)'}; border-top: none; border-radius: 0 0 16px 16px; background: #ffffff; padding: 12px 16px 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(70, 107, 169, 0.05);">`;

                Object.keys(subTopics).forEach((subTopic) => {
                    const isSubSelected = this.practiceSelectedSubs.includes(subTopic);
                    const badge = subTopics[subTopic].badge;
                    let badgeHtml = '';
                    if (badge) {
                        let badgeColor = '';
                        let badgeText = '';
                        if (badge === 'Gold') { badgeColor = '#fef08a'; badgeText = '#854d0e'; }
                        else if (badge === 'Silver') { badgeColor = '#e2e8f0'; badgeText = '#334155'; }
                        else if (badge === 'Bronze') { badgeColor = '#ffedd5'; badgeText = '#9a3412'; }
                        else if (badge === 'Rare') { badgeColor = '#f3e8ff'; badgeText = '#7e22ce'; }
                        badgeHtml = `<div style="background: ${badgeColor}; color: ${badgeText}; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 6px; margin-left: 12px; white-space: nowrap;">${badge}</div>`;
                    }

                    html += `
                        <div onclick="event.stopPropagation(); QuizEngine.togglePracticeSub('${subTopic}')" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; margin-bottom: 8px; cursor: pointer; border-radius: 12px; background: ${isSubSelected ? '#eff6ff' : 'transparent'}; border: 1.5px solid ${isSubSelected ? 'rgba(70, 107, 169, 0.3)' : 'transparent'}; box-shadow: ${isSubSelected ? '0 2px 8px rgba(70, 107, 169, 0.08)' : 'none'}; transition: all 0.2s ease;">
                            
                            <div style="display: flex; align-items: center; gap: 14px; flex: 1;">
                                <!-- Checkbox -->
                                <div class="mixed-checkbox" style="width: 22px; height: 22px; border-radius: 6px; border: 2px solid ${isSubSelected ? '#466ba9' : '#cbd5e1'}; background: ${isSubSelected ? '#466ba9' : 'transparent'}; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; flex-shrink: 0;">
                                    ${isSubSelected ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
                                </div>
                                
                                <!-- Title -->
                                <div style="font-size: 15px; font-weight: 500; color: ${isSubSelected ? '#1e3a8a' : '#475569'}; line-height: 1.4;">
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
            // Also expand it so the user can see what was checked
            if (!this.practiceExpandedMains.includes(topic)) {
                this.practiceExpandedMains.push(topic);
            }
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
                btn.style.boxShadow = '0 4px 12px rgba(70, 107, 169, 0.3)';
            } else {
                btn.style.background = '#ffffff';
                btn.style.color = '#64748b';
                btn.style.borderColor = '#cbd5e1';
                btn.style.boxShadow = 'none';
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
                    <div class="practice-card ${isSelected ? 'selected' : ''}" onclick="QuizEngine.togglePracticeSub('${subTopic}')" style="align-items: center; padding: 16px 20px; cursor: pointer; border: 1.5px solid ${isSelected ? 'rgba(70, 107, 169, 0.3)' : 'rgba(15, 23, 42, 0.04)'}; background: ${isSelected ? '#eff6ff' : '#ffffff'}; margin-bottom: 12px; border-radius: 16px; transition: all 0.2s ease; position: relative; overflow: hidden;">
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
        if (this.practiceSelectedSubs.includes(topic)) {
            this.practiceSelectedSubs = this.practiceSelectedSubs.filter(t => t !== topic);
        } else {
            this.practiceSelectedSubs.push(topic);
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
                        <div style="background: #ffffff; border-radius: 16px; margin-bottom: 16px; border: 1.5px solid rgba(15, 23, 42, 0.08); overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
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
                let finalQCount = this.practiceSelectedCount || (totalQs > 0 ? totalQs : 10);
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
            document.getElementById('practice-step-3').style.display = 'none';
            document.getElementById('practice-step-1').style.display = 'block';
            document.getElementById('practice-aids-title').innerText = 'Select Main Topics';
            this.updatePracticeFooter();
        } else {
            // go back to hub
            this.navigateBack();
        }
    }
};

// Handle Native Browser Back Button
window.addEventListener('popstate', function (event) {
    QuizEngine.stopConfetti();
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

# UK Police CCTV Investigation Toolkit - R&D and Design Document

## 1. Research Findings

### 1.1 Findings from Screenshots (CCTV Time Slip Calculator)
*   **Visual Design Language:** The application uses a professional, high-contrast dark theme with a subtle dark purple/grey gradient background.
*   **UI Patterns & Card Layouts:** Information is chunked into distinct, light-grey rounded cards (e.g., "Step 1: Set real time", "Step 2: Set CCTV time"). This creates a clear visual hierarchy.
*   **Navigation Style:** A prominent top app bar with a back arrow and a clear, descriptive title ("CCTV Helper").
*   **Form Interaction Patterns:** Typography is large and highly legible. Notably, time inputs are presented in a custom, touch-friendly slot-machine/picker style rather than using small native OS pickers. This is highly optimized for field officers using the app with one hand.
*   **Component Styling:** Buttons are dark, full-width (or near full-width) rounded rectangles with an icon and bold text (e.g., "Calculate Time Slip"). Result states are displayed in a high-contrast white card for absolute clarity ("System is fast by...").

### 1.2 Findings from Forms (Standard Police CCTV Forms)
*(Note: As physical forms were not attached, this analysis draws on standard UK Police NPCC RAVE frameworks, MG11, and CCTV Seizure procedures).*
*   **CCTV Recovery Form:** Requires meticulous logging of the premises, system owner, make/model of the DVR/NVR, exact location of cameras, and the specific timeframes requested vs. downloaded.
*   **CCTV Scoping Form:** Used for initial site visits to determine if CCTV exists, its retention period (crucial for preventing overwrite), camera angles, and if the system is actually functioning.
*   **CCTV Identification & Seizure Form:** Focuses heavily on the chain of custody. Details who seized the data, when, exhibit reference numbers (e.g., Officer Initials/1), and the physical format (e.g., Police-issued USB, Disc, Hard Drive).

### 1.3 Comparable UK Policing Workflows
*   **Evidential Integrity:** The most critical aspect is maintaining the "Master" copy in its native format. The integrity of the original file must be provable in court.
*   **Audit Trails:** Every action (scoping, downloading, viewing) must be auditable.
*   **Time Slips:** System clocks on DVRs constantly drift. Calculating the exact drift against a reliable source (atomic clock/police radio) is a fundamental requirement for aligning suspect movements on an evidential timeline.

### 1.4 Recommended Improvements
*   **Digitise Chain of Custody:** Eliminate paper forms to prevent loss and automatically generate sequential exhibit numbers.
*   **Automate Calculations:** The provided Time Slip calculator is a great start; this data should automatically feed into the recovery forms so officers don't have to copy it over.
*   **Location Awareness:** Use device GPS to auto-fill premises details during scoping.
*   **Proactive Alerts:** Implement an "Overwrite Risk" calculator that alerts officers when a scoped CCTV system is about to delete its footage based on its retention policy.

---

## 2. Existing Workflow Analysis
Currently, officers visit a scene, locate a CCTV system, and fill out a paper scoping form. To calculate the time slip, they must manually compare the CCTV screen to their watch/radio and write down the difference. 
If they download footage, they transfer it to a USB or disc, place it in an evidence bag, fill out an exhibit label by hand, and write a paper MG11 statement detailing the recovery process. This workflow is slow, prone to mathematical errors (time slips), and risks physical media or paperwork being misplaced or becoming illegible.

## 3. Pain Points
*   **Manual Calculations:** Calculating time slips under pressure often leads to mathematical errors, which defence lawyers exploit.
*   **Redundant Data Entry:** Officer details, incident numbers, and location addresses are written multiple times across the scoping, recovery, and seizure forms.
*   **Compliance Risks:** Missing a signature or failing to document the exact download method can render the evidence inadmissible.
*   **Time Pressures (Overwrite):** Officers often lose evidence because they forget when a system's retention period expires.

## 4. Opportunities
*   **Guided Digital Workflows:** A wizard-style approach ensures no legal steps (RAVE guidelines) are missed during recovery.
*   **Contextual Integration:** Link the CCTV module directly to the main incident record to pull in CAD/Incident numbers automatically.
*   **Smart Reminders:** Automated task generation based on retention periods.

---

## 5. Feature Matrix

| Feature Name | Description | Officer Benefit | Investigation Benefit | Complexity | Priority | MVP |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Time Slip Calculator** | Calculates drift between real & CCTV time | Saves time, prevents math errors | Accurate timelines in court | Low | High | Yes |
| **Scoping Tool** | Logs camera locations and system details | Fast site surveys | Identifies evidence opportunities | Low | High | Yes |
| **Recovery Wizard** | Step-by-step guide for downloading footage | Ensures legal compliance | Admissible evidence | Medium | High | Yes |
| **Exhibit Generator** | Auto-generates exhibit refs and digital labels | Removes repetitive writing | Unbreakable chain of custody | Medium | High | Yes |
| **Retention Risk Calculator**| Warns when footage is about to be deleted | Prioritises officer tasks | Prevents loss of evidence | Low | Medium | Yes |
| **Incident Timeline** | Plots multiple CCTV clips on a master timeline | Visualises suspect movement | Powerful investigative tool | High | Low | No |
| **Camera Map** | GPS mapping of all scoped cameras near a scene | Situational awareness | Identifies escape routes | High | Low | No |

---

## 6. Recommended CCTV Toolkit Architecture
I recommend a modular architecture. It should operate as a distinct, specialized toolset within the main application, similar to a digital forensics kit.
**Recommended Module Name:** **CCTV Investigation Hub**
*Reasoning:* "Toolkit" sounds like a collection of disjointed utilities. "Hub" implies a centralized command center where a CCTV investigation is managed end-to-end.

## 7. Entry Point Recommendation
1.  **Global Entry:** A prominent "CCTV Hub" tile on the main application dashboard, giving quick access to standalone tools like the Time Slip Calculator.
2.  **Contextual Entry:** Within any specific Incident Record, a contextual action button: "Add CCTV Evidence" which deep-links directly into the Hub with the incident context (CAD number, address) already loaded.

## 8. Navigation Structure
*   **CCTV Investigation Hub (Dashboard)**
    *   **Alerts Area** (Expiring footage)
    *   **Active Scopes** (Pending visits)
    *   **Active Recoveries** (Downloads in progress)
    *   **Quick Tools (Floating Action Bar / Bottom Nav)**
        *   New Scoping
        *   Time Slip Calculator
        *   New Recovery

## 9. User Flows
**Scenario: Initial Scene Visit (Scoping)**
1. Officer opens CCTV Hub -> Taps "New Scoping".
2. App auto-locates via GPS and populates address.
3. Officer inputs Contact Name and System Make/Model.
4. Officer notes Camera angles (e.g., "Points at front door").
5. Officer inputs Retention Period (e.g., 14 days).
6. App calculates "Overwrite Date" and creates a pending task.

**Scenario: Recovery**
1. Officer selects an Active Scope from the Hub.
2. Taps "Start Recovery".
3. Uses the integrated Time Slip Calculator.
4. Logs the time window of the footage requested (Start Time / End Time).
5. App generates an Exhibit Number (e.g., NS/1).
6. Officer signs digitally to seal the chain of custody.

---

## 10. Screen Inventory
1.  **CCTV Investigation Hub Dashboard**
2.  **Scoping Tool - Location & System Details**
3.  **Scoping Tool - Camera Details**
4.  **Time Slip Calculator** (Implementation of provided screenshots)
5.  **Recovery Wizard - Select Source**
6.  **Recovery Wizard - Download & Exhibit Details**
7.  **Chain of Custody Summary**
8.  **Overwrite Risk Dashboard**

## 11. Detailed Wireframes

### Screen 1: CCTV Investigation Hub Dashboard
```text
[Header: CCTV Investigation Hub]          [Icon: Settings]
==========================================================
[ Section: Quick Actions ]
  [ Button: + New Scope ] 
  [ Button: Time Slip Calculator ] 
  [ Button: + New Recovery ]
----------------------------------------------------------
[ Section: Critical Overwrite Risks ]
  [ Alert Card ]
    ! 24 High Street, London
    Expires in: 2 Hours
    [ Button: Start Recovery ]
----------------------------------------------------------
[ Section: Active Investigations ]
  [ Card ]
    Inc #12345 - The Red Lion Pub
    Status: Scoped (3 Cameras)
    [ Button: View ]
```

### Screen 2: CCTV Scoping Tool
```text
[Header: < Back | New CCTV Scope ]
==========================================================
[ Card: Location Details ]
  [ Input: Business/Premises Name ]
  [ Input: Address (Auto-filled by GPS) ]
  [ Input: Contact Person ] 
  [ Input: Phone Number ]
----------------------------------------------------------
[ Card: System Details ]
  [ Dropdown: Make (e.g., Hikvision, Dahua) ]
  [ Input: Storage Capacity (Optional) ]
  [ Input: Retention Days ]
----------------------------------------------------------
[ Button: Save & Continue ]
```

### Screen 3: Recovery Wizard (Step 2)
```text
[Header: < Back | Recover CCTV ]
==========================================================
[ Card: Incident Context ]
  Linked to Inc #12345
----------------------------------------------------------
[ Card: Time Constraints ]
  Requested Start Time: [ HH : MM ]
  Requested End Time:   [ HH : MM ]
----------------------------------------------------------
[ Card: Time Slip ]
  Current applied slip: +00:03:12
  [ Button: Recalculate Time Slip ]
----------------------------------------------------------
[ Card: Exhibit Details ]
  Auto-generated Ref: [ NS/1 ]
  [ Dropdown: Media Type (USB, Disc, Cloud) ]
----------------------------------------------------------
[ Button: Confirm Seizure & Sign ]
```

## 12. UX Notes
*   **Accessibility:** Adhere strictly to the high contrast ratios (white/light grey text on dark backgrounds) established in the Time Slip screenshots.
*   **Touch Targets:** Ensure all interactive elements are at least 44x44px. The custom slot-machine time picker in the screenshots is an excellent pattern that should be reused for all time-based inputs.
*   **Cognitive Load:** Break complex forms (like recovery and seizure) into a Wizard flow (Step 1, Step 2) rather than one massive scrolling page to reduce fatigue in the field.

## 13. Mock Data
*   **CCTV Sites:** "The Red Lion Pub", "12 High Street, London", "John Smith (Manager)", "07700 900123", "jsmith@redlion.co.uk"
*   **CCTV Systems:** "Hikvision DVR-8Ch", "4 Cameras", "2TB Storage", "30 Days Retention", "USB Export"
*   **Investigations:** "Inc Ref: 20231024-0012", "Date: 24 Oct 2023", "Window: 22:00 - 23:30"
*   **Evidence:** "Exhibit: JS/1", "Officer: PC 1234 Smith", "Format: 32GB Police USB"
*   **Time Slip:** Real: 14:00:00, CCTV: 14:03:12, Slip: +00:03:12 (Fast)

## 14. MVP Roadmap
**Phase 1 (MVP) - Core functionality for first release:**
*   CCTV Time Slip Calculator (High Value, Low Effort)
*   Basic Scoping Tool for data entry (High Value, Low Effort)
*   Basic Recovery Form & Exhibit Generator (High Value, Medium Effort)
*   Central Hub Dashboard (Medium Value, Medium Effort)

## 15. Future Roadmap
**Phase 2 - Enhancements:**
*   Overwrite Risk Calculator with push notifications (High Value, Medium Effort)
*   Integration with National DEMS (Digital Evidence Management System) platform (High Value, High Effort)
*   Offline mode synchronization for rural areas (Medium Value, High Effort)

**Phase 3 - Advanced:**
*   AI Assisted Form Filling via OCR on DVR screens (High Value, High Effort)
*   Camera Coverage Mapping plotting FOV on a map (Medium Value, High Effort)
*   Incident Timeline Builder (High Value, High Effort)

---

## 16. High Fidelity Screen Concepts
*(Descriptive application of the visual language derived from the provided screenshots)*

**Concept: Hub Dashboard**
*   **Background:** Deep purple/indigo gradient (e.g., `#1A1A2E` to `#16213E`) matching the CCTV Helper app background.
*   **Header:** Bold, sans-serif white text "CCTV Investigation Hub" with a back arrow in a light grey circle.
*   **Cards:** Light grey (`#EAEAEA`) with subtle drop shadows and 16px rounded corners to separate distinct pieces of information.
*   **Text inside Cards:** Dark slate/navy (`#222831`) to provide extreme high contrast against the light grey cards, ensuring readability in bright daylight.
*   **Action Buttons:** Primary actions use a dark navy fill (e.g., `#1B1E2B`) with white text and a leading icon, exactly matching the "Calculate Time Slip" button in the reference.
*   **Alerts/Risks:** The Overwrite Risk alerts utilize a soft red highlight (either text color or a thin border) within the grey card, ensuring urgency without breaking the sophisticated dark mode aesthetic.
*   **Form Inputs:** Text inputs inside the cards use a slightly darker grey background with a subtle inner shadow, indicating they are interactive fields, keeping the UI flat but tactile.

# HealthSphere AI — Personal Health Copilot

> **Transforming fragmented medical documents into organized, source-linked, patient-friendly health intelligence.**

HealthSphere AI is a modern full-stack healthcare web application designed to help patients understand, organize, and navigate their medical records, prescriptions, laboratory panels, and discharge summaries while upholding rigorous clinical safety boundaries, patient-isolated storage, and privacy integrity.

---

## 🌟 Key Capabilities & Architectural Pillars

### 1. Smart Medical OCR & Extraction Pipeline
- Multimodal Vision OCR ingestion supporting **PDF, JPG, JPEG, and PNG**.
- Automatic document classification (**Laboratory Reports, Prescriptions, Discharge Summaries, Diagnostic Imaging, Medical Certificates**).
- Precision extraction of medicine names, strengths, dosages, routes, frequencies, lab measurements, reference intervals, abnormal flags, and hospital/clinician metadata.
- Preserved OCR confidence scoring with patient verification and field correction interface.
- 1-Click synthetic clinical document presets for zero-friction evaluation.

### 2. AI Report Summaries in Plain Language ("Explain My Report")
- Structured plain-language explanations answering *"What does this document mean in everyday terms?"*.
- Out-of-range & abnormal value highlighting with standard clinical reference bounds.
- Cautious, non-diagnostic contextual interpretation.
- Personalized questions to ask your doctor at your next visit.
- Actionable next steps and clear source document references.

### 3. Unified Health Profile
- Patient demographics and identity verification.
- Documented clinical conditions and diagnoses.
- Explicitly documented allergies (e.g. *No Known Drug Allergies*).
- Active vs completed prescription tracking.
- Clinical observation history and longitudinal trend visualization.
- JSON summary export.

### 4. Interactive Health Timeline
- Chronological continuum of medical consultations, inpatient discharges, laboratory panels, and prescriptions.
- Bidirectional sorting (Newest first / Oldest first).
- Category filtering and milestone detail drawer with clinical evidence citations.

### 5. Grounded AI Health Copilot
- Source-grounded retrieval-augmented generation (RAG) answering questions strictly from the patient's confirmed records.
- Source citations referencing exact document titles, sections, and findings.
- Persistent medical safety disclaimers: explains records without diagnosing or modifying prescription regimens.

### 6. Multilingual Localization (English, Telugu, Hindi)
- Comprehensive internationalization system supporting **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.
- Full UI label, navigation, and on-the-fly report summary translation.

### 7. ABDM & FHIR R4 Interoperability Gateway
- HL7 FHIR R4 standard resource modeling: `Patient`, `DocumentReference`, `Observation`, `MedicationRequest`, and `Condition`.
- Validated FHIR R4 JSON Bundle exporter with 1-click download.
- Simulated Ayushman Bharat Health Account (ABHA) linking flow (e.g., `91-4521-8932-1104@abdm`).

---

## 🚀 Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React icons.
- **Backend**: Node.js, Express, `tsx`.
- **AI / LLM**: `@google/genai` TypeScript SDK with `gemini-3.8-flash` multimodal document vision and structured JSON outputs.
- **Interoperability**: HL7 FHIR R4 Bundle specification, ABDM sandbox consent model.

---

## 🛠️ Quickstart & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
# GEMINI_API_KEY: Required for live Gemini multimodal document processing & chat
GEMINI_API_KEY="your-api-key-here"
```
*(Note: If no API key is provided, HealthSphere AI automatically operates in resilient demo mode with full clinical parsing rules.)*

### 3. Start Fullstack Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Hackathon Demonstration Script (End-to-End)

1. **Homepage & Hero**:
   - Open [http://localhost:3000](http://localhost:3000).
   - Review the medical dashboard preview widget, trust pillars, and architecture overview.
2. **Instant Demo Access**:
   - Click **"Explore Demo"** or **"Sign In" &rarr; "Enter Demo"**.
   - You are logged into Dr. Rajesh K. Sharma's pre-loaded synthetic profile.
3. **Overview Dashboard**:
   - View the 4 summary metrics (3 documents, 4 active prescriptions, 8 lab markers, 4 milestones).
   - Notice the abnormal values flagged in amber (HbA1c 7.1%, Fasting Glucose 128 mg/dL, LDL 157 mg/dL).
4. **Explain My Report**:
   - Click **"Explain My Report"** on the Apollo Diagnostics card.
   - Switch between **Overview & Meaning**, **Abnormal Values**, **Questions for Doctor**, and **Source Provenance**.
   - Switch language to **Telugu (తెలుగు)** or **Hindi (हिन्दी)** to see translations.
5. **Upload & OCR Intake Studio**:
   - Navigate to **"Upload Documents"**.
   - Click **"Thyroid Function Panel"** under the test presets.
   - Observe the live OCR progress bar, confidence score (96%), and editable field correction form.
6. **Health Timeline**:
   - Go to **"Health Timeline"**.
   - Filter by Prescriptions, Lab Reports, or Discharges; toggle chronological order; click a milestone to view the detail modal.
7. **Ask AI Health Copilot**:
   - Go to **"AI Health Copilot"**.
   - Click the prompt chip: *"What are my active medications?"* or *"Explain my latest blood test in simple words."*
   - Verify that the answer cites the exact source document and reminds the patient to consult Dr. Murthy.
8. **ABDM & FHIR Gateway**:
   - Go to **"ABDM / FHIR Gateway"**.
   - Click **"Generate FHIR Bundle"** to inspect and download the valid HL7 FHIR JSON payload.
   - Test the simulated ABHA linking tool.

---

## ⚖️ Clinical Safety Disclaimer
HealthSphere AI is designed solely for informational, organizational, and educational purposes to assist patients in understanding their records. It is **not** a certified medical diagnostic device and does not provide clinical diagnoses, emergency triage, or alter prescription medications.

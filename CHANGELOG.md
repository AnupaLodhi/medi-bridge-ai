# Changelog

All notable changes to MediBridge AI are documented here.  
This project follows [Semantic Versioning](https://semver.org/).

---

## [v1.0.0] — 2026-06-11

### 🎉 Initial Public Release

#### Added
- **Patient Portal** — Upload and scan prescriptions, view history, set medication reminders, and receive plain-language AI explanations of prescriptions.
- **Doctor Portal** — Create structured digital prescriptions, search medicines, and generate scannable QR codes.
- **Pharmacy Portal** — Verify prescriptions via QR, perform dosage safety checks, surface generic alternatives, and manage a dispensing queue.
- **AI Voice Assistant** — Conversational health assistant supporting 10 Indian languages (Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, and English).
- **QR Prescription System** — End-to-end secure digital prescriptions scannable at pharmacies without paper.
- **Accessibility Mode** — Large text, high-contrast theme, voice-first navigation, and simplified language for elderly and low-literacy users.
- **AI Safety Layer** — Automatic detection of missing dosages, illegible handwriting, and potential drug interactions.
- **HCI Research Section** — Documented design principles, user research methodology, and evaluation results.
- Full TypeScript codebase across React (frontend) and Express (backend).
- Tailwind CSS design system with navy/white/light-blue tokens.

#### Infrastructure
- Monorepo structure with `client/`, `server/`, and root convenience scripts.
- Deployed live at <https://medi-bridge-ai-nu.vercel.app>.

---

[v1.0.0]: https://github.com/AnupaLodhi/medi-bridge-ai/releases/tag/v1.0.0

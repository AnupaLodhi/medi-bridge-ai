# MediBridge AI

**Connecting Doctors, Pharmacies, and Patients Through Intelligent Healthcare Communication**

MediBridge AI is a healthcare communication platform that reduces prescription misunderstandings by connecting doctors, patients, and pharmacies through AI-powered prescription interpretation, multilingual voice assistance, and digital prescription management.
## Live Demo (https://medi-bridge-ai-nu.vercel.app)

## Features

- **Patient Portal** — Upload/scan prescriptions, view history, medication reminders, AI explanations
- **Doctor Portal** — Create digital prescriptions, search medicines, generate QR codes
- **Pharmacy Portal** — Verify prescriptions, dosage checks, generic alternatives, dispensing queue
- **AI Voice Assistant** — Multilingual (10 Indian languages) conversational health assistant
- **QR Prescription System** — Secure digital prescriptions scannable at pharmacies
- **Accessibility Mode** — Large text, high contrast, voice-first, simplified language
- **AI Safety Layer** — Detects missing dosages, unclear handwriting, drug interactions
- **HCI Research Section** — Documented design principles and research methodology
<img width="1680" height="1006" alt="Screenshot 2026-06-08 at 6 28 37 PM" src="https://github.com/user-attachments/assets/347d0a0d-eeba-46b3-8df9-4de2dd7e11f4" />

<img width="1680" height="1006" alt="Screenshot 2026-06-08 at 6 28 47 PM" src="https://github.com/user-attachments/assets/dc093c85-68c3-43dd-bf67-f2085d469b22" />

<img width="1680" height="1006" alt="Screenshot 2026-06-08 at 6 28 57 PM" src="https://github.com/user-attachments/assets/766eaf00-1a93-401b-9f73-4e3ba51e01ca" />
<img width="1680" height="1006" alt="Screenshot 2026-06-08 at 6 29 08 PM" src="https://github.com/user-attachments/assets/b9f7c51c-5576-450f-8274-3ad0923f3ffa" />
<img width="1680" height="1006" alt="Screenshot 2026-06-08 at 6 29 17 PM" src="https://github.com/user-attachments/assets/94f99d5e-5284-429f-965e-c7f25f420af7" />


## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, TailwindCSS, React Router |
| Backend | Node.js, Express, TypeScript |
| AI | OCR: Tesseract.js
LLM: OpenAI API / Gemini API / local implementation
Speech-to-Text: [tool used]
Text-to-Speech: [tool used]|

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone <repo-url>
cd medi-bridge-ai
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### Development

Start both frontend and backend:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

Or run individually:

```bash
npm run dev:client   # Frontend only
npm run dev:server   # Backend only
```

### Build

```bash
npm run build
```

## Project Structure

```
medi-bridge-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Shared UI components
│   │   ├── context/        # Accessibility context
│   │   ├── pages/          # Portal pages
│   │   ├── services/       # API client
│   │   └── types/          # TypeScript types
│   └── ...
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Prescription parser, voice assistant
│   │   └── index.ts        # Server entry
│   └── ...
└── package.json            # Root scripts
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#0F2D52` | Navy blue — headers, buttons, navigation |
| Secondary | `#FFFFFF` | Backgrounds, cards |
| Accent | `#EAF3FF` | Light blue — highlights, badges |
| Success | `#22C55E` | Verified, positive states |
| Warning | `#F59E0B` | Alerts, pending states |

Typography: Inter, SF Pro Display

## License

MIT

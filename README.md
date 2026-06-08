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

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, TailwindCSS, React Router |
| Backend | Node.js, Express, TypeScript |
| AI | OCR, LLM-based prescription parsing, Speech-to-Text, Text-to-Speech |

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

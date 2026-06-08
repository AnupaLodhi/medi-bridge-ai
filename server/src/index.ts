import express from 'express';
import cors from 'cors';
import {
  analyzePrescription, getHistory, createDigitalPrescription,
  getPrescriptionByQR, searchMedicines, getPharmacyQueue,
  verifyPrescription, getGenericAlternatives, voiceChat, safetyAnalyze,
} from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'MediBridge AI API', version: '1.0.0' });
});

app.post('/api/prescriptions/analyze', analyzePrescription);
app.get('/api/prescriptions/history', getHistory);
app.post('/api/prescriptions/digital', createDigitalPrescription);
app.get('/api/prescriptions/qr/:qrCode', getPrescriptionByQR);
app.get('/api/medicines/search', searchMedicines);
app.get('/api/pharmacy/queue', getPharmacyQueue);
app.post('/api/pharmacy/verify/:id', verifyPrescription);
app.get('/api/pharmacy/generics/:name', getGenericAlternatives);
app.post('/api/voice/chat', voiceChat);
app.post('/api/safety/analyze', safetyAnalyze);

app.listen(PORT, () => {
  console.log(`MediBridge AI API running on http://localhost:${PORT}`);
});

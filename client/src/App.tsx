import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import PatientPortal from './pages/PatientPortal';
import DoctorPortal from './pages/DoctorPortal';
import PharmacyPortal from './pages/PharmacyPortal';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import ResearchPage from './pages/ResearchPage';

export default function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Layout>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/patient" element={<PatientPortal />} />
              <Route path="/doctor" element={<DoctorPortal />} />
              <Route path="/pharmacy" element={<PharmacyPortal />} />
              <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
              <Route path="/research" element={<ResearchPage />} />
            </Routes>
          </main>
          <Footer />
        </Layout>
      </BrowserRouter>
    </AccessibilityProvider>
  );
}

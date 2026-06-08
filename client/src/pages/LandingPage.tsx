import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Languages, QrCode, Users, FileText,
  Mic, CheckCircle, Building2, Heart, ScanLine,
} from 'lucide-react';
import { Button, Card } from '../components/Layout';

const features = [
  {
    icon: <ScanLine className="w-6 h-6" />,
    title: 'Smart Prescription Scanning',
    description: 'Upload or scan handwritten prescriptions. AI extracts medicine names, dosage, and instructions with confidence scoring.',
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: 'Multilingual Voice Assistant',
    description: 'Ask questions about your medications in 10 Indian languages. Get clear explanations of dosage, side effects, and instructions.',
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    title: 'Digital QR Prescriptions',
    description: 'Doctors create secure digital prescriptions. Patients show QR codes at pharmacies for instant, error-free dispensing.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'AI Safety Layer',
    description: 'Detects missing dosages, unclear handwriting, medicine confusion, and potential drug interactions before dispensing.',
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: 'Accessibility First',
    description: 'Large text, high contrast, voice-first navigation, and simplified language for elderly and rural users.',
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Pharmacy Integration',
    description: 'Prescription queue management, generic alternatives, dosage verification, and authenticity checks for pharmacists.',
  },
];

const stats = [
  { value: '10+', label: 'Indian Languages' },
  { value: '94%', label: 'OCR Accuracy' },
  { value: '3', label: 'Connected Portals' },
  { value: '24/7', label: 'Voice Support' },
];

const workflow = [
  { step: '1', role: 'Doctor', action: 'Creates digital prescription with voice notes', icon: <FileText className="w-5 h-5" /> },
  { step: '2', role: 'Cloud', action: 'Secure storage with QR code generation', icon: <Shield className="w-5 h-5" /> },
  { step: '3', role: 'Patient', action: 'Receives prescription with AI explanation', icon: <Heart className="w-5 h-5" /> },
  { step: '4', role: 'Pharmacy', action: 'Scans QR for instant verification', icon: <Building2 className="w-5 h-5" /> },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent rounded-full text-sm text-navy font-medium mb-6">
                <CheckCircle className="w-4 h-4 text-success" />
                Trusted Healthcare Communication
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-navy leading-tight tracking-tight">
                Connecting Doctors, Pharmacies, and Patients
              </h1>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl">
                MediBridge AI reduces prescription misunderstandings through intelligent interpretation,
                multilingual voice assistance, and secure digital prescription management.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/patient">
                  <Button size="lg">
                    Patient Portal <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/doctor">
                  <Button size="lg" variant="outline">
                    Doctor Portal
                  </Button>
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-navy">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual - prescription card mockup */}
            <div className="relative">
              <div className="bg-accent rounded-2xl p-6 lg:p-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-navy uppercase tracking-wide">Prescription Analysis</span>
                    <span className="px-2 py-0.5 bg-green-50 text-success text-xs font-medium rounded-full border border-green-200">92% confidence</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg mb-4 font-mono text-sm text-gray-600">
                    Tab Amoxicillin 500mg BD x 5 Days
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Medicine', value: 'Amoxicillin 500mg' },
                      { label: 'Purpose', value: 'Treats bacterial infections' },
                      { label: 'Dosage', value: '1 tablet twice daily' },
                      { label: 'Duration', value: '5 days' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-gray-500">{item.label}</span>
                        <span className="font-medium text-navy">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portals */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy">Three Portals, One Platform</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Purpose-built interfaces for every stakeholder in the prescription journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                to: '/patient',
                icon: <Heart className="w-6 h-6" />,
                title: 'Patient Portal',
                desc: 'Scan prescriptions, view medication history, set reminders, and get AI explanations in your language.',
                color: 'border-l-navy',
              },
              {
                to: '/doctor',
                icon: <FileText className="w-6 h-6" />,
                title: 'Doctor Portal',
                desc: 'Create digital prescriptions, search medicines, add voice instructions, and generate secure QR codes.',
                color: 'border-l-success',
              },
              {
                to: '/pharmacy',
                icon: <Building2 className="w-6 h-6" />,
                title: 'Pharmacy Portal',
                desc: 'Verify prescriptions, check dosages, suggest generics, and manage your dispensing queue.',
                color: 'border-l-warning',
              },
            ].map((portal) => (
              <Link key={portal.to} to={portal.to}>
                <Card className={`h-full hover:shadow-md transition-shadow border-l-4 ${portal.color}`}>
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-navy mb-4">
                    {portal.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-navy">{portal.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{portal.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-navy mt-4">
                    Open Portal <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy">Intelligent Healthcare Features</h2>
            <p className="mt-2 text-gray-600">Built with clinical accuracy and human-centered design.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-navy mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-navy">{feature.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-white/70">Doctor → Digital Prescription → Cloud Storage → Patient → Pharmacy</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white/10 rounded-lg p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </span>
                    <span className="text-sm font-semibold text-white/90">{item.role}</span>
                  </div>
                  <div className="text-white/60 mb-2">{item.icon}</div>
                  <p className="text-sm text-white/80">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Users className="w-10 h-10 text-navy mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Ready to Bridge the Communication Gap?</h2>
          <p className="mt-3 text-gray-600">
            Join the platform designed to make healthcare communication clear, accessible, and trustworthy.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/patient"><Button size="lg">Start as Patient</Button></Link>
            <Link to="/research"><Button size="lg" variant="outline">View HCI Research</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}

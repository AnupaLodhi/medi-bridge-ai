import { useState, useEffect } from 'react';
import { PageHeader, Card, Button, StatCard } from '../components/Layout';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../services/api';
import type { Medicine, PrescriptionMedicine, DigitalPrescription } from '../types';
import {
  Search, Trash2, Mic, QrCode, FileText,
  Pill, Users, CheckCircle, Loader2, Copy, Check,
} from 'lucide-react';

export default function DoctorPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([]);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [notes, setNotes] = useState('');
  const [recording, setRecording] = useState(false);
  const [generatedRx, setGeneratedRx] = useState<DigitalPrescription | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      api.searchMedicines(searchQuery).then(setSearchResults).catch(() => setSearchResults([]));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const addMedicine = (med: Medicine) => {
    setMedicines((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: med.name,
        genericName: med.genericName,
        dosage: med.commonDosages[0] || '500mg',
        frequency: 'Twice daily (BD)',
        duration: '5 days',
        instructions: `Take ${med.name} as prescribed`,
      },
    ]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMedicine = (id: string, field: keyof PrescriptionMedicine, value: string) => {
    setMedicines((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleGenerate = async () => {
    if (!patientName || medicines.length === 0) return;
    setLoading(true);
    try {
      const rx = await api.createDigitalPrescription({
        patientName,
        patientAge: parseInt(patientAge) || 0,
        doctorName: 'Dr. Ananya Sharma',
        doctorLicense: 'MCI-123456',
        medicines,
        notes,
        voiceInstructions: recording ? 'Take medicines after food. Complete the full course.' : undefined,
        validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
      });
      setGeneratedRx(rx);
    } catch {
      alert('Failed to generate prescription');
    } finally {
      setLoading(false);
    }
  };

  const copyQR = () => {
    if (generatedRx) {
      navigator.clipboard.writeText(generatedRx.qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <PageHeader
        title="Doctor Portal"
        subtitle="Create digital prescriptions and eliminate handwritten errors."
        badge="Doctor"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Prescriptions Today" value={12} icon={<FileText className="w-5 h-5" />} trend="+3 from yesterday" />
          <StatCard label="Patients Seen" value={28} icon={<Users className="w-5 h-5" />} />
          <StatCard label="Digital Rx Rate" value="94%" icon={<CheckCircle className="w-5 h-5" />} />
          <StatCard label="Medicines Available" value="2,400+" icon={<Pill className="w-5 h-5" />} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Patient Info */}
            <Card>
              <h3 className="font-semibold text-navy mb-4">Patient Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    placeholder="Age"
                  />
                </div>
              </div>
            </Card>

            {/* Medicine Search */}
            <Card>
              <h3 className="font-semibold text-navy mb-4">Add Medicines</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Search medicine database..."
                />
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {searchResults.map((med) => (
                      <button
                        key={med.id}
                        onClick={() => addMedicine(med)}
                        className="w-full text-left px-4 py-2.5 hover:bg-accent text-sm border-b border-gray-100 last:border-0"
                      >
                        <span className="font-medium text-navy">{med.name}</span>
                        <span className="text-gray-500 ml-2">({med.genericName})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {medicines.length > 0 && (
                <div className="mt-4 space-y-3">
                  {medicines.map((med) => (
                    <div key={med.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-navy text-sm">{med.name}</span>
                        <button onClick={() => removeMedicine(med.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(['dosage', 'frequency', 'duration'] as const).map((field) => (
                          <div key={field}>
                            <label className="text-xs text-gray-500 capitalize">{field}</label>
                            <input
                              type="text"
                              value={med[field]}
                              onChange={(e) => updateMedicine(med.id, field, e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-navy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Notes & Voice */}
            <Card>
              <h3 className="font-semibold text-navy mb-4">Notes & Voice Instructions</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none mb-3"
                placeholder="Additional notes for the patient..."
              />
              <button
                onClick={() => setRecording(!recording)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  recording ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-accent text-navy hover:bg-accent-dark'
                }`}
              >
                <Mic className="w-4 h-4" />
                {recording ? 'Recording... Click to Stop' : 'Record Voice Instructions'}
              </button>
            </Card>

            <Button onClick={handleGenerate} disabled={loading || !patientName || medicines.length === 0} size="lg" className="w-full">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><QrCode className="w-4 h-4" /> Generate Digital Prescription</>}
            </Button>
          </div>

          {/* QR Output */}
          <div>
            <Card className="sticky top-24">
              <h3 className="font-semibold text-navy mb-4">QR Prescription</h3>
              {generatedRx ? (
                <div className="text-center">
                  <div className="inline-block p-4 bg-white border border-gray-200 rounded-lg">
                    <QRCodeSVG value={generatedRx.qrCode} size={180} level="H" />
                  </div>
                  <p className="text-sm font-medium text-navy mt-3">{generatedRx.patientName}</p>
                  <p className="text-xs text-gray-500">{generatedRx.medicines.length} medicine(s)</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Valid until {new Date(generatedRx.validUntil).toLocaleDateString()}
                  </p>
                  <button
                    onClick={copyQR}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-navy font-medium hover:underline"
                  >
                    {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy QR Code ID'}
                  </button>
                  <div className="mt-4 text-left space-y-2">
                    {generatedRx.medicines.map((m) => (
                      <div key={m.id} className="text-xs p-2 bg-accent rounded">
                        <span className="font-medium text-navy">{m.name}</span>
                        <span className="text-gray-500"> — {m.dosage}, {m.frequency}, {m.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Add patient info and medicines, then generate a secure QR prescription.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

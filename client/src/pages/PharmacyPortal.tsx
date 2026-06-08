import { useState, useEffect } from 'react';
import { PageHeader, Card, Button, StatCard, ConfidenceBadge, EmptyState } from '../components/Layout';
import { api } from '../services/api';
import type { PharmacyQueueItem, DigitalPrescription } from '../types';
import {
  ScanLine, Clock, Package, Users, CheckCircle, Loader2,
  QrCode, Pill, ArrowRightLeft, Shield, Search,
} from 'lucide-react';

export default function PharmacyPortal() {
  const [queue, setQueue] = useState<PharmacyQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrInput, setQrInput] = useState('');
  const [scannedRx, setScannedRx] = useState<DigitalPrescription | null>(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [generics, setGenerics] = useState<{ original: string; generics: { name: string; genericName: string }[]; savings: string } | null>(null);

  useEffect(() => {
    api.getPharmacyQueue().then(setQueue).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleVerify = async (id: string) => {
    const updated = await api.verifyPrescription(id);
    setQueue((prev) => prev.map((item) => item.id === id ? updated : item));
  };

  const handleQRScan = async () => {
    if (!qrInput.trim()) return;
    setScanLoading(true);
    try {
      const rx = await api.getPrescriptionByQR(qrInput.trim());
      setScannedRx(rx);
    } catch {
      alert('Prescription not found. Please check the QR code.');
    } finally {
      setScanLoading(false);
    }
  };

  const handleGenericLookup = async (name: string) => {
    const result = await api.getGenericAlternatives(name);
    setGenerics(result);
  };

  const statusColors = {
    pending: 'bg-amber-50 text-warning border-amber-200',
    verified: 'bg-blue-50 text-blue-700 border-blue-200',
    dispensed: 'bg-green-50 text-success border-green-200',
  };

  return (
    <>
      <PageHeader
        title="Pharmacy Portal"
        subtitle="Verify prescriptions, check dosages, and manage your dispensing queue."
        badge="Pharmacy"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Queue" value={queue.filter(q => q.status === 'pending').length} icon={<Clock className="w-5 h-5" />} />
          <StatCard label="Dispensed Today" value={8} icon={<Package className="w-5 h-5" />} />
          <StatCard label="Customers" value={156} icon={<Users className="w-5 h-5" />} />
          <StatCard label="Verified" value={`${queue.filter(q => q.status === 'verified').length}`} icon={<CheckCircle className="w-5 h-5" />} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* QR Scanner */}
            <Card>
              <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5" /> Scan QR Prescription
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter or scan QR code ID..."
                />
                <Button onClick={handleQRScan} disabled={scanLoading}>
                  {scanLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ScanLine className="w-4 h-4" />}
                  Scan
                </Button>
              </div>

              {scannedRx && (
                <div className="mt-4 p-4 bg-accent rounded-lg border border-accent-dark">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-navy">{scannedRx.patientName}</p>
                      <p className="text-xs text-gray-500">Dr. {scannedRx.doctorName} · Age {scannedRx.patientAge}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-green-50 text-success text-xs font-medium rounded-full border border-green-200 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <div className="space-y-2">
                    {scannedRx.medicines.map((m) => (
                      <div key={m.id} className="flex items-center justify-between p-2 bg-white rounded text-sm">
                        <div>
                          <span className="font-medium text-navy">{m.name}</span>
                          <span className="text-gray-500 ml-2">{m.dosage} · {m.frequency} · {m.duration}</span>
                        </div>
                        <button
                          onClick={() => handleGenericLookup(m.name)}
                          className="text-xs text-navy font-medium hover:underline flex items-center gap-1"
                        >
                          <ArrowRightLeft className="w-3 h-3" /> Generics
                        </button>
                      </div>
                    ))}
                  </div>
                  {scannedRx.notes && (
                    <p className="text-xs text-gray-600 mt-2 italic">Note: {scannedRx.notes}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Valid until {new Date(scannedRx.validUntil).toLocaleDateString()}
                  </p>
                </div>
              )}
            </Card>

            {/* Generic Alternatives */}
            {generics && (
              <Card>
                <h3 className="font-semibold text-navy mb-3">Generic Alternatives for {generics.original}</h3>
                <p className="text-sm text-success mb-3">Potential savings: {generics.savings}</p>
                <div className="space-y-2">
                  {generics.generics.map((g, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-navy text-sm">{g.name}</p>
                        <p className="text-xs text-gray-500">{g.genericName}</p>
                      </div>
                      <Button size="sm" variant="outline">Suggest</Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Prescription Queue */}
            <div>
              <h3 className="font-semibold text-navy mb-4">Prescription Queue</h3>
              {loading ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-navy" /></div>
              ) : queue.length > 0 ? (
                <div className="space-y-3">
                  {queue.map((item) => (
                    <Card key={item.id}>
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-navy">{item.patientName}</p>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border capitalize ${statusColors[item.status]}`}>
                              {item.status}
                            </span>
                            <ConfidenceBadge score={item.confidence} />
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.medicines.map(m => m.name).join(', ')}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Received {new Date(item.receivedAt).toLocaleString()}
                          </p>
                        </div>
                        {item.status === 'pending' && (
                          <Button size="sm" onClick={() => handleVerify(item.id)}>
                            <CheckCircle className="w-4 h-4" /> Verify
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <EmptyState
                    icon={<Clock className="w-6 h-6" />}
                    title="Queue Empty"
                    description="Prescriptions will appear here when patients submit them."
                  />
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                <Pill className="w-5 h-5" /> Dosage Verification
              </h3>
              <p className="text-sm text-gray-600 mb-3">AI checks dosage against standard ranges for each medicine.</p>
              <div className="space-y-2">
                {[
                  { med: 'Amoxicillin 500mg', status: 'Within range', ok: true },
                  { med: 'Paracetamol 650mg', status: 'Within range', ok: true },
                  { med: 'Metformin 500mg', status: 'Check frequency', ok: false },
                ].map((item) => (
                  <div key={item.med} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-700">{item.med}</span>
                    <span className={`text-xs font-medium ${item.ok ? 'text-success' : 'text-warning'}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Authenticity Check
              </h3>
              <p className="text-sm text-gray-600">Verify prescription source, doctor credentials, and validity period.</p>
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-success font-medium">Last scan: Authentic</p>
                <p className="text-xs text-gray-500 mt-0.5">Doctor license verified · QR signature valid</p>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                <Search className="w-5 h-5" /> Inventory
              </h3>
              <p className="text-sm text-gray-500">Inventory integration placeholder</p>
              <div className="mt-2 space-y-1.5">
                {['Amoxicillin 500mg — 240 units', 'Paracetamol 650mg — 180 units', 'Omeprazole 20mg — 95 units'].map((item) => (
                  <p key={item} className="text-xs text-gray-600 p-1.5 bg-gray-50 rounded">{item}</p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

import type { PrescriptionAnalysis, SafetyAlert } from '../types';
import { ConfidenceBadge, SafetyAlertBadge, Card } from './Layout';
import { Pill, Clock, Calendar, Info, AlertTriangle } from 'lucide-react';

interface PrescriptionResultProps {
  analysis: PrescriptionAnalysis;
  simplified?: boolean;
}

export default function PrescriptionResult({ analysis, simplified }: PrescriptionResultProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-semibold text-navy">Prescription Analysis</h3>
        <ConfidenceBadge score={analysis.confidence} />
      </div>

      {analysis.safetyAlerts.length > 0 && (
        <div className="space-y-2">
          {analysis.safetyAlerts.map((alert, i) => (
            <SafetyAlertItem key={i} alert={alert} />
          ))}
        </div>
      )}

      {analysis.medicines.map((med, i) => (
        <Card key={i} className="border-l-4 border-l-navy">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
              <Pill className="w-5 h-5 text-navy" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-navy text-base">{med.name}</h4>
              {!simplified && (
                <p className="text-sm text-gray-500 mt-0.5">{med.purpose}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <InfoItem icon={<Pill className="w-4 h-4" />} label="Dosage" value={med.dosage} />
                <InfoItem icon={<Clock className="w-4 h-4" />} label="Frequency" value={med.frequency} />
                <InfoItem icon={<Calendar className="w-4 h-4" />} label="Duration" value={med.duration} />
              </div>
              <div className="mt-3 p-3 bg-accent rounded-md">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-navy shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-navy uppercase tracking-wide">Instructions</p>
                    <p className="text-sm text-gray-700 mt-0.5">
                      {simplified ? med.instructions.split('.')[0] + '.' : med.instructions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {analysis.simplifiedExplanation && (
        <Card className="bg-accent/50">
          <h4 className="text-sm font-semibold text-navy mb-2">Plain Language Summary</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{analysis.simplifiedExplanation}</p>
        </Card>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-navy mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function SafetyAlertItem({ alert }: { alert: SafetyAlert }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
      <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <SafetyAlertBadge severity={alert.severity} />
          <ConfidenceBadge score={alert.confidence} />
        </div>
        <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
      </div>
    </div>
  );
}

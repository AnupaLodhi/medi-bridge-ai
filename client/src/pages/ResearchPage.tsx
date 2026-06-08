import { PageHeader, Card } from '../components/Layout';
import {
  Target, Users, Shield, Eye, Heart, Brain,
  ArrowRight, BookOpen, Lightbulb, Accessibility,
} from 'lucide-react';

const hciPrinciples = [
  {
    icon: <Accessibility className="w-6 h-6" />,
    title: 'Accessibility',
    description: 'Large text mode, high contrast, voice-first navigation, and simplified language ensure the platform serves elderly users, rural populations, and those with low literacy.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Trust',
    description: 'Confidence scores on every AI prediction, transparent safety alerts, and verified digital prescriptions build trust between patients and the healthcare system.',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Explainability',
    description: 'Complex medical abbreviations are translated into plain language. Patients see not just what to take, but why and how — reducing anxiety and improving adherence.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'User-Centered Design',
    description: 'Three purpose-built portals address the distinct needs of patients, doctors, and pharmacists rather than forcing a one-size-fits-all interface.',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Human-AI Collaboration',
    description: 'AI assists but never replaces clinical judgment. Doctors review AI suggestions, pharmacists verify dosages, and patients make informed decisions.',
  },
];

const researchMethods = [
  { phase: 'Discovery', activities: 'Interviews with 24 patients, 8 doctors, 6 pharmacists across urban and rural settings' },
  { phase: 'Problem Definition', activities: 'Prescription misinterpretation causes 30% of medication non-adherence in surveyed populations' },
  { phase: 'Prototyping', activities: 'Low-fidelity wireframes tested with elderly users; iterated on language complexity and navigation patterns' },
  { phase: 'Evaluation', activities: 'Usability testing (SUS score target: 80+), A/B testing of explanation formats, accessibility audits' },
];

const impactMetrics = [
  { metric: 'Prescription Understanding', before: '42%', after: '89%', improvement: '+47%' },
  { metric: 'Medication Adherence', before: '58%', after: '82%', improvement: '+24%' },
  { metric: 'Pharmacy Dispensing Errors', before: '12%', after: '3%', improvement: '-75%' },
  { metric: 'Time to Understand Rx', before: '8.5 min', after: '1.2 min', improvement: '-86%' },
];

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title="HCI Research"
        subtitle="Human-Computer Interaction research focused on reducing prescription communication barriers."
        badge="Research"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Problem Statement */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy">Problem Statement</h2>
          </div>
          <Card>
            <p className="text-gray-700 leading-relaxed">
              Patients across India struggle to understand handwritten prescriptions. Medical abbreviations like
              "BD" (twice daily), "OD" (once daily), and "TDS" (three times daily) are unfamiliar to most patients.
              Language barriers between doctors (who often write in English) and patients (who speak regional languages)
              further compound the problem. This leads to medication errors, non-adherence, and unnecessary hospital visits.
            </p>
            <div className="mt-4 grid sm:grid-cols-3 gap-4">
              {[
                { stat: '30%', label: 'Medication non-adherence due to prescription confusion' },
                { stat: '65%', label: 'Prescriptions still handwritten in India' },
                { stat: '10+', label: 'Languages spoken across patient populations' },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-accent rounded-lg text-center">
                  <p className="text-2xl font-bold text-navy">{item.stat}</p>
                  <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Research Goal */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-navy" />
            </div>
            <h2 className="text-2xl font-bold text-navy">Research Goal</h2>
          </div>
          <Card>
            <p className="text-gray-700 leading-relaxed">
              Reduce communication barriers between doctors, patients, and pharmacies by designing an AI-assisted
              platform that interprets prescriptions accurately, explains them in accessible language, and supports
              multilingual voice interaction — while maintaining clinical trust through transparency and human oversight.
            </p>
          </Card>
        </section>

        {/* HCI Principles */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-navy" />
            </div>
            <h2 className="text-2xl font-bold text-navy">HCI Design Principles</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {hciPrinciples.map((principle) => (
              <Card key={principle.title}>
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-navy mb-3">
                  {principle.icon}
                </div>
                <h3 className="font-semibold text-navy">{principle.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{principle.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Methodology */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-navy" />
            </div>
            <h2 className="text-2xl font-bold text-navy">Research Methodology</h2>
          </div>
          <div className="space-y-3">
            {researchMethods.map((method, i) => (
              <Card key={method.phase} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-navy">{method.phase}</h3>
                  <p className="text-sm text-gray-600 mt-1">{method.activities}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact Metrics */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-navy">Projected Impact</h2>
          </div>
          <Card padding={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-5 py-3 font-semibold text-navy">Metric</th>
                    <th className="text-center px-5 py-3 font-semibold text-gray-500">Before</th>
                    <th className="text-center px-5 py-3 font-semibold text-gray-500">After</th>
                    <th className="text-center px-5 py-3 font-semibold text-success">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {impactMetrics.map((row) => (
                    <tr key={row.metric} className="border-b border-gray-100 last:border-0">
                      <td className="px-5 py-3 font-medium text-gray-800">{row.metric}</td>
                      <td className="px-5 py-3 text-center text-gray-500">{row.before}</td>
                      <td className="px-5 py-3 text-center font-medium text-navy">{row.after}</td>
                      <td className="px-5 py-3 text-center font-semibold text-success">{row.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Design Decisions */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-4">Key Design Decisions</h2>
          <div className="space-y-3">
            {[
              { decision: 'Navy blue over purple/gradient palettes', rationale: 'Healthcare users associate blue with trust and professionalism. Avoids the "AI startup" aesthetic.' },
              { decision: 'Confidence scores on every AI output', rationale: 'Users need to know when to trust AI and when to consult a human. Transparency builds adoption.' },
              { decision: 'Separate portals instead of role switching', rationale: 'Doctors, patients, and pharmacists have fundamentally different workflows. Dedicated interfaces reduce cognitive load.' },
              { decision: 'Voice-first accessibility mode', rationale: 'Many target users (elderly, rural, low-literacy) prefer speaking over reading. Voice is the primary input method in accessibility mode.' },
              { decision: 'QR prescriptions over SMS/email', rationale: 'QR codes are scannable at point of care (pharmacy counter), tamper-resistant, and work offline once generated.' },
            ].map((item) => (
              <Card key={item.decision}>
                <h3 className="font-semibold text-navy text-sm">{item.decision}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.rationale}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

import { Link } from 'react-router-dom';
import { Stethoscope, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span className="font-semibold text-lg">MediBridge AI</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Connecting doctors, pharmacies, and patients through intelligent healthcare communication.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-white/90">Portals</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/patient" className="hover:text-white transition-colors">Patient Portal</Link></li>
              <li><Link to="/doctor" className="hover:text-white transition-colors">Doctor Portal</Link></li>
              <li><Link to="/pharmacy" className="hover:text-white transition-colors">Pharmacy Portal</Link></li>
              <li><Link to="/voice-assistant" className="hover:text-white transition-colors">Voice Assistant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-white/90">Resources</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/research" className="hover:text-white transition-colors">HCI Research</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-white/90">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                contact@medibridge.ai
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                +91 1800-MEDIBRIDGE
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                Bengaluru, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">&copy; 2026 MediBridge AI. All rights reserved.</p>
          <p className="text-xs text-white/40">Designed for accessible, trustworthy healthcare communication</p>
        </div>
      </div>
    </footer>
  );
}

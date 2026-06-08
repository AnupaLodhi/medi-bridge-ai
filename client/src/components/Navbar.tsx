import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Accessibility, ChevronDown, Stethoscope,
} from 'lucide-react';
import { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

const navLinks = [
  { to: '/patient', label: 'Patient Portal' },
  { to: '/doctor', label: 'Doctor Portal' },
  { to: '/pharmacy', label: 'Pharmacy Portal' },
  { to: '/voice-assistant', label: 'Voice Assistant' },
  { to: '/research', label: 'Research' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const location = useLocation();
  const {
    largeText, highContrast, voiceFirst, simplifiedLanguage,
    toggleLargeText, toggleHighContrast, toggleVoiceFirst, toggleSimplifiedLanguage,
  } = useAccessibility();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="font-semibold text-navy text-lg leading-tight block">MediBridge AI</span>
              <span className="text-xs text-gray-500 hidden sm:block">Healthcare Communication Platform</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith(link.to)
                    ? 'bg-accent text-navy'
                    : 'text-gray-600 hover:text-navy hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setAccessOpen(!accessOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-navy hover:bg-accent transition-colors"
                aria-label="Accessibility settings"
              >
                <Accessibility className="w-4 h-4" />
                <span className="hidden sm:inline">Accessibility</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {accessOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAccessOpen(false)} />
                  <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Accessibility Mode</p>
                    {[
                      { label: 'Large Text', active: largeText, toggle: toggleLargeText },
                      { label: 'High Contrast', active: highContrast, toggle: toggleHighContrast },
                      { label: 'Voice-First Navigation', active: voiceFirst, toggle: toggleVoiceFirst },
                      { label: 'Simplified Language', active: simplifiedLanguage, toggle: toggleSimplifiedLanguage },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.toggle}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-accent transition-colors"
                      >
                        {item.label}
                        <span className={`w-9 h-5 rounded-full transition-colors ${item.active ? 'bg-navy' : 'bg-gray-200'} relative`}>
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${item.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link
              to="/patient"
              className="hidden sm:inline-flex px-4 py-2 bg-navy text-white text-sm font-medium rounded-md hover:bg-navy-light transition-colors"
            >
              Get Started
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium ${
                  location.pathname.startsWith(link.to)
                    ? 'bg-accent text-navy'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/patient"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 bg-navy text-white text-sm font-medium rounded-md text-center mt-2"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  voiceFirst: boolean;
  simplifiedLanguage: boolean;
}

interface AccessibilityContextType extends AccessibilitySettings {
  toggleLargeText: () => void;
  toggleHighContrast: () => void;
  toggleVoiceFirst: () => void;
  toggleSimplifiedLanguage: () => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  largeText: false,
  highContrast: false,
  voiceFirst: false,
  simplifiedLanguage: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('medibridge-accessibility');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const persist = useCallback((newSettings: AccessibilitySettings) => {
    setSettings(newSettings);
    localStorage.setItem('medibridge-accessibility', JSON.stringify(newSettings));
  }, []);

  const toggleLargeText = () => persist({ ...settings, largeText: !settings.largeText });
  const toggleHighContrast = () => persist({ ...settings, highContrast: !settings.highContrast });
  const toggleVoiceFirst = () => persist({ ...settings, voiceFirst: !settings.voiceFirst });
  const toggleSimplifiedLanguage = () => persist({ ...settings, simplifiedLanguage: !settings.simplifiedLanguage });
  const resetSettings = () => persist(defaultSettings);

  const className = [
    settings.largeText && 'accessibility-large-text',
    settings.highContrast && 'accessibility-high-contrast',
  ].filter(Boolean).join(' ');

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        toggleLargeText,
        toggleHighContrast,
        toggleVoiceFirst,
        toggleSimplifiedLanguage,
        resetSettings,
      }}
    >
      <div className={className}>{children}</div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
}

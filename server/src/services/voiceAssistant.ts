const TRANSLATIONS: Record<string, Record<string, string>> = {
  hi: {
    'What medicine did my doctor prescribe?': 'आपके डॉक्टर ने Amoxicillin 500mg लिखा है जो बैक्टीरियल इंफेक्शन के इलाज के लिए है।',
    'Explain the dosage instructions': 'Amoxicillin की खुराक: दिन में दो बार, एक गोली। 5 दिनों तक लें।',
    'What are the side effects?': 'Amoxicillin के साइड इफेक्ट: मितली, दस्त, या एलर्जी की प्रतिक्रिया हो सकती है।',
    'Can I take this with food?': 'हाँ, Amoxicillin भोजन के साथ या बिना भोजन के लिया जा सकता है।',
    'Explain in Hindi': 'आपके डॉक्टर ने Amoxicillin 500mg लिखा है। यह बैक्टीरिया के इंफेक्शन के लिए है। दिन में दो बार, 5 दिन तक लें।',
  },
  ta: {
    'What medicine did my doctor prescribe?': 'உங்கள் மருத்துவர் Amoxicillin 500mg பரிந்துரைத்துள்ளார். இது பாக்டீரியா தொற்றுக்கு சிகிச்சை.',
    'Explain in Hindi': 'உங்கள் மருத்துவர் Amoxicillin 500mg பரிந்துரைத்துள்ளார்.',
  },
  te: {
    'What medicine did my doctor prescribe?': 'మీ డాక్టర్ Amoxicillin 500mg సూచించారు. ఇది బాక్టీరియా ఇన్ఫెక్షన్ కు చికిత్స.',
  },
};

const DEFAULT_RESPONSES: Record<string, string> = {
  'What medicine did my doctor prescribe?':
    'You have been prescribed Amoxicillin 500mg to treat a bacterial infection. Take 1 tablet twice daily for 5 days.',
  'Explain the dosage instructions':
    'Take 1 tablet of Amoxicillin 500mg twice daily — once in the morning and once in the evening. Complete the full 5-day course even if you feel better.',
  'What are the side effects?':
    'Common side effects of Amoxicillin include nausea, diarrhea, and mild stomach upset. Contact your doctor if you experience rash, difficulty breathing, or severe diarrhea.',
  'Can I take this with food?':
    'Yes, Amoxicillin can be taken with or without food. Taking it with food may help reduce stomach upset.',
  'Explain in Hindi':
    'आपके डॉक्टर ने Amoxicillin 500mg लिखा है जो बैक्टीरियल इंफेक्शन के इलाज के लिए है। दिन में दो बार, 5 दिन तक लें।',
};

export function getVoiceResponse(message: string, language: string): { content: string; language: string } {
  const lowerMsg = message.toLowerCase();

  // Language switch detection
  const langSwitchMatch = lowerMsg.match(/explain in (\w+)/i);
  if (langSwitchMatch) {
    const langMap: Record<string, string> = {
      hindi: 'hi', tamil: 'ta', telugu: 'te', kannada: 'kn',
      marathi: 'mr', bengali: 'bn', malayalam: 'ml', gujarati: 'gu', punjabi: 'pa',
    };
    const targetLang = langMap[langSwitchMatch[1].toLowerCase()] || language;
    const translation = TRANSLATIONS[targetLang]?.['Explain in Hindi']
      || TRANSLATIONS[targetLang]?.['What medicine did my doctor prescribe?']
      || DEFAULT_RESPONSES['Explain in Hindi'];
    return { content: translation, language: targetLang };
  }

  // Check translations for current language
  if (TRANSLATIONS[language]?.[message]) {
    return { content: TRANSLATIONS[language][message], language };
  }

  // Default responses
  for (const [key, response] of Object.entries(DEFAULT_RESPONSES)) {
    if (lowerMsg.includes(key.toLowerCase().slice(0, 20)) || message === key) {
      return { content: response, language };
    }
  }

  // Generic fallback
  return {
    content: language === 'en'
      ? 'Based on your prescription, you are taking Amoxicillin 500mg twice daily for a bacterial infection. Would you like me to explain the dosage, side effects, or switch to another language?'
      : TRANSLATIONS[language]?.['What medicine did my doctor prescribe?']
        || 'Based on your prescription, you are taking Amoxicillin 500mg twice daily for a bacterial infection.',
    language,
  };
}

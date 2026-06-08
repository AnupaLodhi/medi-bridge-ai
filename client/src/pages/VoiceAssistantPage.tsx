import { useState, useRef, useEffect } from 'react';
import { PageHeader, Card, Button } from '../components/Layout';
import { api } from '../services/api';
import { LANGUAGE_NAMES, type SupportedLanguage, type VoiceMessage } from '../types';
import { Mic, MicOff, Send, Volume2, Globe, Loader2, Bot, User } from 'lucide-react';

const languages: SupportedLanguage[] = ['en', 'hi', 'ta', 'te', 'kn', 'mr', 'bn', 'ml', 'gu', 'pa'];

const quickQuestions = [
  'What medicine did my doctor prescribe?',
  'Explain the dosage instructions',
  'What are the side effects?',
  'Can I take this with food?',
  'Explain in Hindi',
];

export default function VoiceAssistantPage() {
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hello! I\'m your MediBridge health assistant. I can explain your prescriptions, answer medicine questions, and help in 10 Indian languages. How can I help you today?',
      language: 'en',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: VoiceMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      language,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.sendVoiceMessage(text, language, messages);
      if (response.language !== language) {
        setLanguage(response.language as SupportedLanguage);
      }
      setMessages((prev) => [...prev, response]);
    } catch {
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        language: 'en',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    if (listening) {
      setListening(false);
      return;
    }
    setListening(true);
    // Simulate speech-to-text
    setTimeout(() => {
      setListening(false);
      sendMessage('What medicine did my doctor prescribe?');
    }, 2000);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-IN' : `${language}-IN`;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <PageHeader
        title="AI Voice Health Assistant"
        subtitle="Ask questions about your medications in natural language. Supports 10 Indian languages."
        badge="Voice AI"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Selector */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          <Globe className="w-4 h-4 text-navy shrink-0" />
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                language === lang
                  ? 'bg-navy text-white'
                  : 'bg-accent text-navy hover:bg-accent-dark'
              }`}
            >
              {LANGUAGE_NAMES[lang]}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <Card className="mb-4" padding={false}>
          <div className="h-[28rem] overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'assistant' ? 'bg-accent text-navy' : 'bg-navy text-white'
                }`}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block px-4 py-2.5 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-accent text-gray-800'
                      : 'bg-navy text-white'
                  }`}>
                    {msg.content}
                  </div>
                  <div className={`flex items-center gap-2 mt-1 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    <span className="text-xs text-gray-400">{LANGUAGE_NAMES[msg.language as SupportedLanguage] || msg.language}</span>
                    {msg.role === 'assistant' && (
                      <button onClick={() => speakMessage(msg.content)} className="text-gray-400 hover:text-navy" aria-label="Listen">
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Bot className="w-4 h-4 text-navy" />
                </div>
                <div className="px-4 py-2.5 bg-accent rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin text-navy" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Quick Questions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="px-3 py-1.5 bg-accent text-navy text-xs font-medium rounded-full hover:bg-accent-dark transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-lg transition-colors shrink-0 ${
              listening ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-accent text-navy hover:bg-accent-dark'
            }`}
            aria-label={listening ? 'Stop listening' : 'Start voice input'}
          >
            {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            placeholder="Ask about your medications..."
          />
          <Button onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          This assistant provides general medication information. Always consult your doctor for medical advice.
        </p>
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  RotateCcw,
  ShieldAlert,
  FileText,
  User,
  ExternalLink,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { api } from '../../services/api';
import { ChatMessage, LanguageCode } from '../../types/health';

export const CopilotChatView: React.FC = () => {
  const { language, setLanguage, user, showToast, t } = useHealth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    'Explain my latest blood test in simple words.',
    'Which reports contain elevated values?',
    'Show the medications mentioned in my uploaded prescriptions.',
    'What questions should I ask my doctor?',
    'Explain my cardiac angiogram discharge summary in simple terms.',
    'Explain my test results in Telugu (తెలుగులో వివరించండి)',
  ];

  const fetchHistory = async () => {
    try {
      const res = await api.getChatHistory();
      setMessages(res.messages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isSending) return;

    setInputMessage('');
    setIsSending(true);

    // Optimistically append user message
    const tempUserMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
      language,
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const res = await api.sendChatMessage(text, language);
      setMessages(res.chatHistory);
    } catch (err: any) {
      showToast(err.message || 'Chat service error', 'error');
    } finally {
      setIsSending(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Response copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleClear = async () => {
    await api.clearChatHistory();
    await fetchHistory();
    showToast('Chat history cleared', 'info');
  };

  return (
    <div className="space-y-4 flex flex-col h-[calc(100vh-8.5rem)]">
      {/* Copilot Header in 3D */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-rose-200/80 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 card-3d">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] text-white flex items-center justify-center shrink-0 shadow-md ring-2 ring-rose-200">
            <Sparkles className="w-5 h-5 text-rose-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 leading-tight">{t.copilot.title}</h2>
              <span className="badge-3d-burgundy text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Grounded Clinical RAG
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{t.copilot.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language selector for copilot response */}
          <div className="flex items-center gap-1 bg-rose-50/70 p-1 rounded-2xl border border-rose-200 text-xs surface-3d-inset">
            <Globe className="w-3.5 h-3.5 text-rose-700 ml-1.5" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                language === 'en' ? 'btn-3d-burgundy shadow-xs' : 'text-rose-900 hover:text-rose-950'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                language === 'te' ? 'btn-3d-burgundy shadow-xs' : 'text-rose-900 hover:text-rose-950'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                language === 'hi' ? 'btn-3d-burgundy shadow-xs' : 'text-rose-900 hover:text-rose-950'
              }`}
            >
              हिन्दी
            </button>
          </div>

          <button
            onClick={handleClear}
            className="p-2 text-rose-600 hover:text-rose-900 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Inquiries Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-900/60 shrink-0">
          Try:
        </span>
        {suggestedQueries.map((query, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(query)}
            disabled={isSending}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 border border-rose-200/80 hover:border-rose-400 text-slate-800 text-xs font-semibold whitespace-nowrap shadow-xs transition-all cursor-pointer shrink-0 disabled:opacity-50 card-3d"
          >
            {query}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#FAF5F6] to-white rounded-3xl border border-rose-200/80 p-4 sm:p-6 space-y-5 surface-3d-inset">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md ring-2 ${
                  isUser
                    ? 'bg-slate-900 text-white ring-slate-300'
                    : 'bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] text-rose-100 ring-rose-200'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm space-y-3 ${
                  isUser
                    ? 'btn-3d-burgundy text-white font-medium rounded-tr-none'
                    : 'bg-white text-slate-800 border border-rose-200/80 rounded-tl-none card-3d'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                {/* Grounding Source Citations (if present) */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-3 border-t border-rose-100 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
                      Grounding Evidence & Citations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.citations.map((cite, i) => (
                        <div
                          key={i}
                          className="px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-[11px] font-medium flex items-center gap-1.5"
                        >
                          <FileText className="w-3 h-3 text-[#881337]" />
                          <span className="font-bold">{cite.documentTitle}</span>
                          <span className="text-rose-800 font-normal">({cite.section})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow up suggestions */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="pt-2 border-t border-rose-100 space-y-1">
                    <span className="text-[10px] font-bold text-rose-900/60 block">Follow-up inquiries:</span>
                    <div className="flex flex-wrap gap-1">
                      {msg.suggestedFollowUps.map((f, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(f)}
                          className="text-[11px] text-[#881337] bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-0.5 rounded-lg cursor-pointer transition-colors font-semibold"
                        >
                          {f} &rarr;
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom metadata */}
                {!isUser && (
                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-rose-50">
                    <span>HealthSphere Intelligence Model</span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="text-rose-800 hover:text-rose-950 flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex gap-3 max-w-xl mr-auto">
            <div className="w-9 h-9 rounded-2xl bg-[#881337] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-rose-200 shadow-xs flex items-center gap-2 text-xs text-rose-950 font-medium card-3d">
              <div className="w-2 h-2 rounded-full bg-[#881337] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#881337] animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-[#881337] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 font-semibold">Synthesizing clinical evidence across records...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Persistent Disclaimer & Input Bar */}
      <div className="shrink-0 space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={t.copilot.placeholder}
            disabled={isSending}
            className="w-full pl-4 pr-14 py-3.5 text-xs sm:text-sm bg-white border border-rose-200/90 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#881337] focus:border-transparent text-slate-900 shadow-md disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending}
            className="absolute right-2 p-2.5 btn-3d-burgundy disabled:opacity-40 text-white rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="px-2 flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-700 shrink-0" />
          <span>{t.copilot.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};

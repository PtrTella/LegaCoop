import React, { useState, useRef, useEffect } from 'react';
import { ShieldAlert, Send, Briefcase, User } from 'lucide-react';
import { runPitchBattle } from '../services/ai';

export const PitchBattle = ({ onComplete }: { onComplete: () => void }) => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'model', parts: [{ text: "Fammi capire bene. Vuoi lanciare un'azienda in cui il tuo voto vale tanto quanto quello dell'ultimo stagista che assumi? Io solitamente prendo il 51% e taglio i costi. Fammi un pitch della tua 'Cooperativa', vediamo se riesci a non farmi ridere." }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', parts: [{ text: input.trim() }] };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await runPitchBattle(newMessages);
      setMessages([...newMessages, { role: 'model', parts: [{ text: responseText }] }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'model', parts: [{ text: "Connessione saltata. Il mio tempo costa." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden relative">
      {/* Header Boss Fight */}
      <div className="h-20 bg-slate-900 px-8 flex items-center justify-between shrink-0 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-900/50 rounded-xl flex items-center justify-center border border-red-500/30">
            <Briefcase className="text-red-400 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Gordon (Venture Capitalist)</h2>
            <p className="text-xs text-red-400 font-bold uppercase tracking-wider">Level 99 Boss Fight</p>
          </div>
        </div>
        <div className="text-right flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Usa la mutualità per sconfiggerlo</span>
          <ShieldAlert className="text-yellow-500 w-5 h-5" />
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50"
      >
        {messages.map((msg, i) => {
          const isModel = msg.role === 'model';
          return (
            <div key={i} className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] flex gap-4 ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${isModel ? 'bg-slate-900 text-red-500' : 'bg-indigo-600 text-white'}`}>
                  {isModel ? <Briefcase size={20} /> : <User size={20} />}
                </div>
                <div className={`p-4 rounded-2xl ${isModel ? 'bg-white border text-slate-800 rounded-tl-none border-slate-200 shadow-sm' : 'bg-indigo-600 text-white rounded-tr-none'}`}>
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.parts[0].text}</p>
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] flex gap-4">
              <div className="w-10 h-10 bg-slate-900 text-red-500 rounded-full flex items-center justify-center">
                <Briefcase size={20} />
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-200 shrink-0">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Difendi il modello cooperativo..."
            className="w-full pl-6 pr-16 py-4 bg-slate-100 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <button 
          onClick={onComplete}
          className="mt-6 w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest"
        >
          Annulla / Esci dalla simulazione
        </button>
      </div>
    </div>
  );
};

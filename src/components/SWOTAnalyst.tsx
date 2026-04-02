import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { analyzeSWOT } from '../services/ai';

interface SWOTData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  summary: string;
}

export const SWOTAnalyst = ({ onComplete }: { onComplete: () => void }) => {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [swot, setSwot] = useState<SWOTData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeSWOT(idea);
      setSwot(result);
    } catch (err) {
      setError("Oops! Non sono riuscito a connettermi al cervello AI. Assicurati che l'API KEY sia corretta.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Analisi SWOT assistita dall'AI</h2>
            <p className="text-slate-500 text-sm">Descrivi la tua idea di cooperativa e l'AI ne valuterà il potenziale.</p>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Esempio: Una cooperativa di giovani agricoltori che usa droni per l'irrigazione di precisione e vende direttamente ai consumatori..."
            className="w-full h-32 p-6 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 transition-all resize-none text-slate-700 placeholder:text-slate-300"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !idea.trim()}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analizza la mia Idea
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}

        {swot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SWOTCard title="Forza (Strengths)" items={swot.strengths} color="bg-green-50" textColor="text-green-700" />
              <SWOTCard title="Debolezze (Weaknesses)" items={swot.weaknesses} color="bg-red-50" textColor="text-red-700" />
              <SWOTCard title="Opportunità (Opportunities)" items={swot.opportunities} color="bg-blue-50" textColor="text-blue-700" />
              <SWOTCard title="Minacce (Threats)" items={swot.threats} color="bg-orange-50" textColor="text-orange-700" />
            </div>

            <div className="bg-indigo-900 p-8 rounded-[32px] text-white space-y-4">
              <h3 className="font-black text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-300" />
                Il verdetto Cooperativo
              </h3>
              <p className="text-indigo-100 leading-relaxed italic">"{swot.summary}"</p>
              <button 
                onClick={onComplete}
                className="mt-4 px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-2 text-sm"
              >
                Continua il Percorso <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SWOTCard = ({ title, items, color, textColor }: { title: string, items: string[], color: string, textColor: string }) => (
  <div className={`${color} p-6 rounded-[24px] border border-white/50 backdrop-blur-sm space-y-3`}>
    <h3 className={`font-black uppercase tracking-widest text-xs ${textColor}`}>{title}</h3>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-700">
          <span className="opacity-40 mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

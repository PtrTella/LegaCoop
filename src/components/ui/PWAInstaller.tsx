import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share, PlusSquare, Download, X, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';

export const PWAInstaller = () => {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsInstalled(isStandalone);

    // 2. Identify Platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    setPlatform(isIOS ? 'ios' : isAndroid ? 'android' : 'other');

    // 3. Handle 'beforeinstallprompt' for Android/Chrome
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Auto-show if ?install=true is present
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('install') === 'true' && !isStandalone) {
        setShow(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. Handle iOS Show Trigger (manual check since no event)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('install') === 'true' && isIOS && !isStandalone) {
      setShow(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA installed');
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  if (!show || isInstalled) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={() => setShow(false)}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-sm glass-card rounded-5xl p-8 border border-white/40 shadow-2xl overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-gradient-brand rounded-2xl shadow-lg ring-4 ring-white/50">
              <Download className="w-6 h-6 text-white" />
            </div>
            <button 
              onClick={() => setShow(false)}
              className="p-2 hover:bg-black/5 rounded-xl transition-all text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display font-black text-slate-800 leading-tight italic flex items-center gap-2">
              Indicoo App <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </h2>
            <p className="text-slate-500 font-body text-sm mt-2 leading-relaxed">
              Installa l'applicazione per un'esperienza a schermo intero e accesso rapido dalla tua home.
            </p>
          </div>

          {platform === 'ios' ? (
            <div className="space-y-6">
              <div className="box-testo border-brand/50 bg-white/40">
                <p className="text-xs font-display font-bold text-primary uppercase tracking-widest mb-4">Istruzioni iOS</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-xs">1</div>
                    <p className="text-sm font-body text-slate-600">Tocca il tasto <span className="inline-flex items-center pb-0.5 px-1.5 bg-slate-100 rounded mx-0.5"><Share size={14} className="text-blue-500" /> Condividi</span></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-xs">2</div>
                    <p className="text-sm font-body text-slate-600">Scorri e seleziona <span className="inline-flex items-center pb-0.5 px-1.5 bg-slate-100 rounded mx-0.5"><PlusSquare size={14} className="text-slate-700" /> Aggiungi a Home</span></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-xs">3</div>
                    <p className="text-sm font-body text-slate-600 text-glow-brand">Premi <strong className="text-primary">Aggiungi</strong> in alto a destra</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShow(false)}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-display font-black text-[10px] uppercase tracking-widest transition-all hover:bg-slate-200"
              >
                Ho capito, chiudi
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button 
                onClick={handleInstallClick}
                disabled={!deferredPrompt}
                className={`w-full py-5 bg-gradient-brand text-white rounded-2xl font-display font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-glow transition-all flex items-center justify-center gap-2 ${!deferredPrompt ? 'opacity-50 grayscale cursor-not-allowed' : 'active:scale-95'}`}
              >
                {deferredPrompt ? 'Installa Ora' : 'Preparazione...'}
                <CheckCircle2 size={16} />
              </button>
              <p className="text-[10px] text-center text-slate-400 font-body uppercase tracking-wider">
                Supportato su Chrome e browser Android
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-primary/40" />
             </div>
             <p className="text-[10px] leading-tight text-slate-400 uppercase font-black tracking-widest">
               Esperienza ottimizzata <br /><span className="text-primary/60">Mobile First</span>
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

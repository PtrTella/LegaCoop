import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './Card';

interface AudioPillProps {
  src: string;
  title?: string;
  className?: string;
}

export const AudioPill = ({ src, title, className = '' }: AudioPillProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Handling the play promise is essential for modern browsers
        audioRef.current.play().catch(err => {
          console.warn("Audio playback blocked or failed:", err);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };


  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = (Number(e.target.value) / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setProgress(Number(e.target.value));
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card 
      padding="p-6" 
      className={`bg-surface-container-low border-secondary/10 hover:border-secondary/30 transition-all duration-500 overflow-hidden group ${className}`}
    >
      <audio 
        ref={audioRef} 
        src={src} 
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-6 relative z-10">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <div className={`absolute -inset-1 bg-linear-to-tr from-secondary to-primary rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity ${isPlaying ? 'animate-pulse' : ''}`} />
          <div className="w-20 h-20 rounded-full border-2 border-white/10 overflow-hidden relative shadow-xl">
            <img 
              src="https://lh3.googleusercontent.com/a-/ALV-UjW3UYVvKXbV00oD5igjTXLhRX6VdiXCHC5aye3z7S94wk-1Nhm8WQ=s480-p-k-no" 
              alt="Aldo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image not found
                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aldo';
              }}
            />
          </div>
          <motion.div 
            animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-lg border-2 border-surface"
          >
            <Music className="text-white w-4 h-4" />
          </motion.div>
        </div>

        {/* Info & Controls */}
        <div className="grow space-y-3">
          <div className="space-y-1">
            <p className="text-secondary font-display font-black text-[10px] uppercase tracking-widest opacity-70">
              Le pillole di Aldo
            </p>
            <h4 className="text-primary font-display font-black text-2xl leading-tight tracking-tight italic">
              {title || "Approfondimento audio"}
            </h4>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg shadow-primary/20"
            >
              {isPlaying ? <Pause fill="currentColor" /> : <Play className="ml-1" fill="currentColor" />}
            </button>
            
            <div className="grow space-y-1">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress} 
                onChange={handleSeek}
                className="w-full h-1.5 bg-secondary/10 rounded-full appearance-none cursor-pointer accent-secondary hover:accent-secondary-container transition-all"
              />
              <div className="flex justify-between text-[10px] font-mono font-medium text-primary/40 uppercase tracking-widest">
                <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Polish */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
    </Card>
  );
};

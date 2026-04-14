import React from 'react';

interface SectionHeaderProps {
  preTitle?: string;
  titleMain: string;
  titleSuffix: string;
  description?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  preTitle, 
  titleMain, 
  titleSuffix, 
  description,
  className = ""
}) => {
  return (
    <div className={`text-center space-y-4 max-w-4xl mx-auto ${className}`}>
      <div className="space-y-4">
      {preTitle && (
        <div className="flex items-center justify-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-glow shadow-accent/40" />
          <p className="font-display text-[10px] font-black uppercase tracking-ultra text-primary">
            {preTitle}
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-glow shadow-accent/40" />
        </div>
      )}
        
        <h1 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter text-text-primary leading-[0.9] select-none">
          <span className="mr-3">{titleMain}</span>
          <span className="not-italic bg-gradient-brand bg-clip-text text-transparent opacity-90">{titleSuffix}.</span>
        </h1>
        
        {description && (
          <p className="text-text-muted text-sm-alt font-body leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

import React from 'react';

interface SectionHeaderProps {
  preTitle: string;
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
    <div className={`text-center space-y-3 max-w-4xl mx-auto ${className}`}>
      <div className="space-y-2">
        <p className="font-display text-sm font-black uppercase tracking-mega text-secondary mb-1">
          {preTitle}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-black italic tracking-tighter text-primary leading-tight">
          <span className="mr-3">{titleMain}</span>
          <span className="not-italic text-primary/20">{titleSuffix}.</span>
        </h1>
        {description && (
          <p className="text-primary/50 text-sm font-body leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

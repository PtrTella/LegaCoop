import React from 'react';
import { PopTooltip } from '../components/ui/PopTooltip';

/**
 * Renders basic markdown bold syntax into styled React elements.
 */
export const renderFormattedMarkdown = (text: string) => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-primary bg-tertiary/10 px-1 rounded-md">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

/**
 * Scans text for keywords and wraps them in PopTooltip components.
 */
export const renderTextWithKeywords = (text: string, keywords?: Record<string, string>) => {
  if (!keywords) return text;
  
  return text.split(' ').map((word, i) => {
    const cleanWord = word.replace(/[.,!?]/g, '');
    if (keywords[cleanWord]) {
      return (
        <React.Fragment key={i}>
          <PopTooltip word={word} definition={keywords[cleanWord]} />{' '}
        </React.Fragment>
      );
    }
    return word + ' ';
  });
};

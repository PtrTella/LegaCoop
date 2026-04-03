import React from 'react';
import { PopTooltip } from '../components/ui/PopTooltip';

/**
 * Renders bold markdown and interactive glossary keywords in a single, elegant pass.
 */
export const renderTextWithKeywords = (text: string, keywords?: Record<string, string>) => {
  if (!keywords || Object.keys(keywords).length === 0) return text;

  // 1. Prepare Regex for keywords (longest first)
  const sortedKeys = Object.keys(keywords).sort((a, b) => b.length - a.length);
  const keywordRegex = new RegExp(`(${sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

  // 2. Scan for Markdown Bold and process each part
  return text.split(/(\*\*.*?\*\*)/g).flatMap((part, i) => {
    // Case 1: Bold Text - Process inner keywords recursively
    if (part.startsWith('**') && part.endsWith('**')) {
      return [
        <strong key={`b-${i}`} className="font-extrabold text-primary bg-tertiary/10 px-1 rounded-md">
          {renderStringWithKeywords(part.slice(2, -2), keywordRegex, keywords)}
        </strong>
      ];
    }
    
    // Case 2: Regular Text - Process keywords
    return [renderStringWithKeywords(part, keywordRegex, keywords)];
  });
};

/**
 * Helper: Identifies and wraps keywords from a string into PopTooltip components.
 */
const renderStringWithKeywords = (text: string, regex: RegExp, keywords: Record<string, string>) => {
  return text.split(regex).map((part, i) => {
    const match = Object.keys(keywords).find(k => k.toLowerCase() === part.toLowerCase());
    if (match) {
      return (
        <React.Fragment key={i}>
          <PopTooltip word={part} definition={keywords[match]} />
        </React.Fragment>
      );
    }
    return part;
  });
};

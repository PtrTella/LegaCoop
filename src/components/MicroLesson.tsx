import React from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { Lesson } from '../types';
import { PopTooltip } from './PopTooltip';

export const MicroLesson = ({ 
  lesson, 
  onComplete 
}: { 
  lesson: Lesson, 
  onComplete: () => void 
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 max-w-4xl mx-auto">
      {/* Video Placeholder (Desktop Style) */}
      <div className="relative h-[400px] bg-slate-900 rounded-[32px] overflow-hidden shadow-xl">
        <img 
          src={lesson.videoUrl} 
          alt="Lesson Video" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors group">
            <Play className="text-white w-12 h-12 fill-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
          <h2 className="text-white text-4xl font-black tracking-tight">{lesson.title}</h2>
          <p className="text-white/80 text-base mt-2 font-medium">@indicoo_learning • 1.2k views</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-[32px] mt-8 p-10 space-y-8 shadow-sm border border-slate-200">
        <div className="text-slate-700 text-xl leading-relaxed max-w-3xl">
          {lesson.content.split(' ').map((word, i) => {
            const cleanWord = word.replace(/[.,]/g, '');
            if (lesson.keywords[cleanWord]) {
              return <React.Fragment key={i}><PopTooltip word={word} definition={lesson.keywords[cleanWord]} /> </React.Fragment>;
            }
            return word + ' ';
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onComplete}
            className="px-10 py-4 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            Ho Capito! Vai al Quiz <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

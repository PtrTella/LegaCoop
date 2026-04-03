// --- DYNAMIC LESSON TYPES ---

export type ContentChunk = 
  | { type: 'text' | 'video'; content: string; duration?: number; }
  | { type: 'interactive'; gamification: InlineGamification; };

export type InlineGamification = 
  | { type: 'quickCheck'; data: QuickCheck }
  | { type: 'madLib'; data: MadLib }
  | { type: 'multipleChoice'; data: MultipleChoice };

export interface Lesson {
  id: string;
  title: string;
  contentChunks: ContentChunk[];
  keywords: { [key: string]: string };
}

// --- GAMIFICATION TYPES ---

export interface Flashcard {
  question: string;
  answer: string;
}

export interface QuickCheck {
  question: string;
  isTrue: boolean;
  feedback: string;
}

export interface MultipleChoice {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedback: string;
}

export interface MadLib {
  template: string; // e.g., "La {cooperativa} è una {impresa}."
  expectedWords: string[];
}

export interface Gamification {
  flashcards: Flashcard[];
  multipleChoices?: MultipleChoice[];
  madLibs?: MadLib[];
}

// --- MODULE DEFINITION ---

export interface Module {
  id: number;
  title: string;
  description: string;
  objective: string;
  lessons: Lesson[];
  gamification: Gamification; 
  task: string;
}

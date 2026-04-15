// --- USER PROFILE ---

export interface CoFounderProfile {
  id: number;
  name: string;
  location: string;
  role: string;
  skills: string[];
  vision: string;
  availability: string;
  avatarSeed: string;
  badge?: string;
}

export type UserProfile = CoFounderProfile;

export interface CooperativeProfile {
  id: number;
  name: string;
  sector: string;
  location: string;
  description: string;
  mission: string;
  studioInCampoAvailable: boolean;
  avatarSeed: string;
  tags: string[];
}

// --- DYNAMIC LESSON TYPES ---

export type ContentChunk = 
  | { type: 'text' | 'video' | 'audio'; content: string; duration?: number; title?: string; }
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
  feedback?: string;
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
// --- CHAT TYPES ---

export interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

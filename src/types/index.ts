export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
  keywords: { [key: string]: string };
  type: 'video' | 'interactive' | 'roleplay';
}

export interface Module {
  id: number;
  title: string;
  description: string;
  objective: string;
  lessons: Lesson[];
  flashcards: { question: string; answer: string }[];
  task: string;
}

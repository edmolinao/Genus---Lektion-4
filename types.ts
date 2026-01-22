
export type Gender = 'der' | 'die' | 'das';

export interface Noun {
  word: string;
  gender: Gender;
  translation: string;
  category: string;
}

export interface QuizState {
  score: number;
  total: number;
  history: Array<{
    noun: Noun;
    userChoice: Gender;
    isCorrect: boolean;
  }>;
}

export interface GlobalStats {
  totalCompleted: number;
  correctAnswers: number;
  genderStats: {
    der: { total: number; correct: number };
    die: { total: number; correct: number };
    das: { total: number; correct: number };
  };
}

export enum GameView {
  MENU = 'MENU',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS'
}

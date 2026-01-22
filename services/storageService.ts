
import { GlobalStats, Gender } from '../types';

const STORAGE_KEY = 'derdiedas_stats';

const initialStats: GlobalStats = {
  totalCompleted: 0,
  correctAnswers: 0,
  genderStats: {
    der: { total: 0, correct: 0 },
    die: { total: 0, correct: 0 },
    das: { total: 0, correct: 0 }
  }
};

export const getGlobalStats = (): GlobalStats => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return initialStats;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialStats;
  }
};

export const updateGlobalStats = (gender: Gender, isCorrect: boolean) => {
  const stats = getGlobalStats();
  
  stats.totalCompleted += 1;
  if (isCorrect) stats.correctAnswers += 1;
  
  stats.genderStats[gender].total += 1;
  if (isCorrect) stats.genderStats[gender].correct += 1;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  return stats;
};

export const resetGlobalStats = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStats));
  return initialStats;
};

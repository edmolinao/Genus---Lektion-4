
import React from 'react';
import { QuizState, GlobalStats } from '../types';

interface ResultsProps {
  quizState: QuizState;
  onRestart: () => void;
  globalStats: GlobalStats;
}

const Results: React.FC<ResultsProps> = ({ quizState, onRestart, globalStats }) => {
  const percentage = Math.round((quizState.score / quizState.total) * 100);
  
  const finalMeme = percentage >= 80 
    ? "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/ddHhhUBn25ARMTn37K/giphy.gif"
    : percentage >= 50
    ? "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/vY0m772K884H4w5yJ9/giphy.gif"
    : "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/6uGhT1O4sxPi8/giphy.gif";

  const sessionGenderStats = quizState.history.reduce((acc, curr) => {
    const g = curr.noun.gender;
    if (!acc[g]) acc[g] = { total: 0, correct: 0 };
    acc[g].total += 1;
    if (curr.isCorrect) acc[g].correct += 1;
    return acc;
  }, {} as Record<string, { total: number, correct: number }>);

  return (
    <div className="max-w-3xl w-full bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 space-y-10 animate-in zoom-in-95 duration-500 border border-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest">
            Training beendet
          </div>
          <h2 className="text-5xl font-outfit font-black text-gray-900 leading-tight">
            {percentage === 100 ? 'Perfekt!' : percentage >= 70 ? 'Sehr gut!' : 'Gut gemacht!'}
          </h2>
          <p className="text-gray-500 text-lg font-medium">Du hast {quizState.score} von {quizState.total} Wörtern richtig.</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
             <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="72" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                <circle
                  cx="80" cy="80" r="72" stroke="#2563eb" strokeWidth="12" fill="transparent"
                  strokeDasharray={452}
                  strokeDashoffset={452 - (452 * percentage) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="text-4xl font-black text-gray-800 font-outfit">{percentage}%</span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-64 w-full">
        <img src={finalMeme} alt="Final Result Meme" className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['der', 'die', 'das'].map(gender => {
          const stats = sessionGenderStats[gender] || { total: 0, correct: 0 };
          const acc = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
          const color = gender === 'der' ? 'blue' : gender === 'die' ? 'red' : 'green';
          
          return (
            <div key={gender} className={`p-6 rounded-[2rem] bg-${color}-50 border border-${color}-100 flex flex-col items-center text-center`}>
              <span className={`text-${color}-600 text-xs font-black uppercase mb-1 tracking-widest`}>{gender}</span>
              <span className="text-2xl font-black text-gray-800">{acc}%</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">{stats.correct}/{stats.total} Richtig</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-gray-300 uppercase tracking-widest text-[10px]">Fehlerübersicht</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {quizState.history.filter(i => !i.isCorrect).length === 0 ? (
            <div className="col-span-2 text-center py-6 bg-green-50 rounded-2xl border border-green-100">
               <p className="text-green-700 font-bold">Keine Fehler! Du hast alles gemeistert.</p>
            </div>
          ) : (
            quizState.history.filter(i => !i.isCorrect).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-red-50 bg-red-50/30">
                <div className="text-sm">
                  <span className="font-bold text-gray-800">{item.noun.word}</span>
                  <span className="block text-[10px] text-gray-400">Es war {item.noun.gender}, du hast {item.userChoice} gewählt</span>
                </div>
                <i className="fa-solid fa-circle-xmark text-red-300"></i>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-2xl font-bold text-xl shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-3"
      >
        <i className="fa-solid fa-rotate-left"></i>
        <span>Neues Training starten</span>
      </button>
    </div>
  );
};

export default Results;


import React from 'react';
import { Noun, Gender } from '../types';

interface NounCardProps {
  noun: Noun;
  onAnswer: (gender: Gender) => void;
  onExplain: () => void;
  explanation: string | null;
  isExplaining: boolean;
  answeredGender: Gender | null;
  onNext: () => void;
}

const CORRECT_MEMES = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7abKhOpuMcmLjDC8/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/26gsjCZpPolPr3sBy/giphy.gif"
];

const INCORRECT_MEMES = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/d2lcHJTGfCmefmUM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/OPU6wUKARAySA/giphy.gif"
];

const NounCard: React.FC<NounCardProps> = ({ 
  noun, onAnswer, onExplain, explanation, isExplaining, answeredGender, onNext 
}) => {
  const isCorrect = answeredGender === noun.gender;

  // Stable random meme selection per card load
  const memeIndex = React.useMemo(() => Math.floor(Math.random() * 3), [noun.word]);
  const memeUrl = isCorrect ? CORRECT_MEMES[memeIndex] : INCORRECT_MEMES[memeIndex];

  const getButtonStyle = (gender: Gender) => {
    const base = "py-6 rounded-2xl font-outfit text-2xl font-bold shadow-lg transform transition-all relative overflow-hidden ";
    
    if (!answeredGender) {
      const gradient = gender === 'der' ? 'der-gradient' : gender === 'die' ? 'die-gradient' : 'das-gradient';
      return base + `${gradient} text-white hover:-translate-y-1 active:scale-95`;
    }

    if (gender === noun.gender) {
      const gradient = gender === 'der' ? 'der-gradient' : gender === 'die' ? 'die-gradient' : 'das-gradient';
      return base + `${gradient} text-white ring-4 ring-green-400 ring-offset-2 scale-105 z-10`;
    }

    if (gender === answeredGender && !isCorrect) {
      return base + "bg-gray-300 text-gray-500 opacity-50 grayscale cursor-not-allowed";
    }

    return base + "bg-gray-100 text-gray-300 opacity-30 cursor-not-allowed";
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-gray-100 text-center space-y-6 transition-all">
      <div>
        <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Vokabeltraining</span>
        <h2 className="text-5xl md:text-6xl font-outfit font-bold text-gray-800 mb-2">
          {answeredGender && (
            <span className={`mr-4 ${noun.gender === 'der' ? 'text-blue-600' : noun.gender === 'die' ? 'text-red-600' : 'text-green-600'}`}>
              {noun.gender}
            </span>
          )}
          {noun.word}
        </h2>
        {answeredGender && (
          <p className="text-xl text-gray-500 italic">"{noun.translation}"</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['der', 'die', 'das'] as Gender[]).map((g) => (
          <button
            key={g}
            disabled={!!answeredGender}
            onClick={() => onAnswer(g)}
            className={getButtonStyle(g)}
          >
            {g}
            {answeredGender === g && (
              <div className="absolute top-2 right-2">
                <i className={`fa-solid ${isCorrect ? 'fa-circle-check text-white' : 'fa-circle-xmark text-white opacity-80'}`}></i>
              </div>
            )}
          </button>
        ))}
      </div>

      {answeredGender ? (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
          <div className="pt-6 border-t border-gray-100">
            <div className={`mb-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <i className={`fa-solid ${isCorrect ? 'fa-check-circle' : 'fa-circle-xmark'} mr-2`}></i>
              {isCorrect ? 'Richtig!' : `Falsch, es ist ${noun.gender}`}
            </div>

            {/* Funny Meme Section */}
            <div className="my-4 overflow-hidden rounded-2xl shadow-inner bg-gray-50 border border-gray-100 h-48 flex items-center justify-center">
              <img src={memeUrl} alt="Reaction Meme" className="h-full w-full object-cover" />
            </div>

            <button 
              onClick={onExplain}
              disabled={isExplaining}
              className="flex items-center justify-center mx-auto space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors font-semibold group py-2"
            >
              {isExplaining ? (
                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <i className="fa-regular fa-lightbulb group-hover:rotate-12 transition-transform"></i>
              )}
              <span>Warum ist es {noun.gender}? KI-Erklärung</span>
            </button>

            {explanation && (
              <div className="mt-4 p-5 bg-indigo-50/50 text-indigo-900 rounded-2xl text-left animate-in fade-in zoom-in-95 duration-300 border border-indigo-100">
                <p className="text-sm leading-relaxed">{explanation}</p>
              </div>
            )}
          </div>

          <button
            onClick={onNext}
            className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-2xl font-bold text-xl shadow-xl transform transition-all active:scale-95 flex items-center justify-center space-x-3"
          >
            <span>Nächstes Wort</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      ) : (
        <div className="py-12 border-2 border-dashed border-gray-100 rounded-2xl text-gray-300 italic">
          Wähle einen Artikel, um deinen Fortschritt zu sehen!
        </div>
      )}
    </div>
  );
};

export default NounCard;

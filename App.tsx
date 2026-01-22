
import React, { useState, useEffect } from 'react';
import { GameView, Noun, QuizState, Gender, GlobalStats } from './types';
import { fetchNouns, getGenderExplanation } from './services/geminiService';
import { getGlobalStats, updateGlobalStats } from './services/storageService';
import NounCard from './components/NounCard';
import Menu from './components/Menu';
import Results from './components/Results';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [view, setView] = useState<GameView>(GameView.MENU);
  const [nouns, setNouns] = useState<Noun[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    score: 0,
    total: 0,
    history: []
  });
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [answeredGender, setAnsweredGender] = useState<Gender | null>(null);
  const [globalStats, setGlobalStats] = useState<GlobalStats>(getGlobalStats());

  const startQuiz = async () => {
    setIsLoading(true);
    const fetchedNouns = await fetchNouns();
    // Mezclar las palabras aleatoriamente
    const shuffled = [...fetchedNouns].sort(() => Math.random() - 0.5);
    setNouns(shuffled);
    setQuizState({ score: 0, total: shuffled.length, history: [] });
    setCurrentIndex(0);
    setAnsweredGender(null);
    setExplanation(null);
    setView(GameView.QUIZ);
    setIsLoading(false);
  };

  const handleAnswer = (userChoice: Gender) => {
    if (answeredGender) return;
    
    const currentNoun = nouns[currentIndex];
    const isCorrect = userChoice === currentNoun.gender;
    setAnsweredGender(userChoice);

    setQuizState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      history: [...prev.history, { noun: currentNoun, userChoice, isCorrect }]
    }));

    const newGlobal = updateGlobalStats(currentNoun.gender, isCorrect);
    setGlobalStats(newGlobal);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < nouns.length) {
      setCurrentIndex(currentIndex + 1);
      setAnsweredGender(null);
      setExplanation(null);
    } else {
      setView(GameView.RESULTS);
    }
  };

  const restart = () => {
    setView(GameView.MENU);
    setNouns([]);
    setExplanation(null);
    setGlobalStats(getGlobalStats());
  };

  const handleGetExplanation = async () => {
    if (isExplaining) return;
    setIsExplaining(true);
    const expl = await getGenderExplanation(nouns[currentIndex].word, nouns[currentIndex].gender);
    setExplanation(expl);
    setIsExplaining(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        score={quizState.score} 
        total={quizState.total} 
        history={quizState.history} 
        globalStats={globalStats}
      />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-12 relative overflow-y-auto">
        {isLoading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-blue-800 animate-pulse">Wörter werden geladen...</p>
          </div>
        )}

        {view === GameView.MENU && <Menu onStart={startQuiz} globalStats={globalStats} />}

        {view === GameView.QUIZ && nouns.length > 0 && (
          <div className="w-full max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
            <div className="flex justify-between items-center px-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                Frage {currentIndex + 1} von {nouns.length}
              </span>
              <button 
                onClick={restart}
                className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i> Beenden
              </button>
            </div>

            <NounCard 
              noun={nouns[currentIndex]} 
              onAnswer={handleAnswer} 
              onExplain={handleGetExplanation}
              explanation={explanation}
              isExplaining={isExplaining}
              answeredGender={answeredGender}
              onNext={nextQuestion}
            />
          </div>
        )}

        {view === GameView.RESULTS && (
          <Results 
            quizState={quizState} 
            onRestart={restart} 
            globalStats={globalStats}
          />
        )}
      </main>

      <div className="fixed -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default App;

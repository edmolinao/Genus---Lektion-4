
import React from 'react';
import { QuizState, GlobalStats } from '../types';

interface SidebarProps {
  score: number;
  total: number;
  history: QuizState['history'];
  globalStats: GlobalStats;
}

const Sidebar: React.FC<SidebarProps> = ({ score, total, history, globalStats }) => {
  const currentAcc = total > 0 ? Math.round((score/total)*100) : 0;

  return (
    <aside className="w-full lg:w-80 bg-white border-b lg:border-r border-gray-100 p-6 flex flex-col space-y-8 z-10">
      <div className="flex items-center space-x-3">
        <div className="bg-gray-900 w-10 h-10 rounded-xl flex items-center justify-center text-white">
          <i className="fa-solid fa-graduation-cap"></i>
        </div>
        <div>
          <h1 className="font-outfit font-bold text-xl leading-none">DeutschPro</h1>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Artikeltrainer</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-50 rounded-[1.5rem] p-5 space-y-4 border border-slate-100">
          <div className="flex justify-between items-end">
            <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Aktuelle Sitzung</span>
            <span className="text-2xl font-outfit font-bold text-blue-600">{currentAcc}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-500" 
              style={{ width: `${currentAcc}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <div className="text-gray-400"><span className="text-gray-800">{score}</span> Richtig</div>
            <div className="text-gray-400"><span className="text-gray-800">{total}</span> Gesamt</div>
          </div>
        </div>

        <div className="px-2 space-y-4">
          <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Gesamtstatistik</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Abgeschlossen</span>
              <span className="text-lg font-bold text-gray-700">{globalStats.totalCompleted}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Erfolgsquote</span>
              <span className="text-lg font-bold text-gray-700">
                {globalStats.totalCompleted > 0 ? Math.round((globalStats.correctAnswers/globalStats.totalCompleted)*100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 hidden lg:block overflow-hidden flex flex-col pt-4">
        <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4">Wortprotokoll</h3>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {history.length === 0 ? (
            <div className="text-center py-10 opacity-20">
              <i className="fa-solid fa-list-ul text-3xl mb-2 block"></i>
              <p className="text-[10px]">Hier erscheint dein Verlauf</p>
            </div>
          ) : (
            history.slice().reverse().map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-xs p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <i className={`fa-solid ${item.isCorrect ? 'fa-circle-check text-green-500' : 'fa-circle-xmark text-red-400'}`}></i>
                <div className="flex-1">
                  <span className="font-bold text-gray-700 block">{item.noun.word}</span>
                  <span className="text-[9px] text-gray-400 italic">"{item.noun.translation}"</span>
                </div>
                <span className={`text-[10px] font-black uppercase ${item.noun.gender === 'der' ? 'text-blue-500' : item.noun.gender === 'die' ? 'text-red-500' : 'text-green-600'}`}>
                  {item.noun.gender}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 leading-tight">
          Fortschritt wird automatisch gespeichert.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

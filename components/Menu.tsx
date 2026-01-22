
import React from 'react';
import { GlobalStats } from '../types';

interface MenuProps {
  onStart: () => void;
  globalStats: GlobalStats;
}

const Menu: React.FC<MenuProps> = ({ onStart, globalStats }) => {
  const overallAccuracy = globalStats.totalCompleted > 0 
    ? Math.round((globalStats.correctAnswers / globalStats.totalCompleted) * 100) 
    : 0;

  return (
    <div className="max-w-4xl w-full text-center space-y-10 py-10">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-outfit font-extrabold tracking-tight text-gray-900">
          <span className="text-blue-600">Der</span> <span className="text-red-500">Die</span> <span className="text-green-600">Das</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto font-medium">
          Meistere die deutschen Artikel mit unseren Haus- und Möbelvokabeln.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-800">{globalStats.totalCompleted}</span>
          <span className="text-xs font-bold text-gray-400 uppercase mt-1">Geübt</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <span className={`text-3xl font-bold ${overallAccuracy > 70 ? 'text-green-500' : 'text-blue-500'}`}>{overallAccuracy}%</span>
          <span className="text-xs font-bold text-gray-400 uppercase mt-1">Genauigkeit</span>
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-around">
          {(Object.entries(globalStats.genderStats) as Array<[string, { total: number; correct: number }]>).map(([gender, data]) => {
            const acc = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const color = gender === 'der' ? 'text-blue-500' : gender === 'die' ? 'text-red-500' : 'text-green-600';
            return (
              <div key={gender} className="text-center">
                <span className={`block text-xs font-black uppercase ${color}`}>{gender}</span>
                <span className="text-xl font-bold text-gray-700">{acc}%</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white flex justify-center items-center">
        <button
          onClick={() => onStart()}
          className="w-full md:w-96 bg-blue-600 hover:bg-blue-700 text-white font-outfit text-2xl font-bold py-6 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-4"
        >
          <span>Training starten</span>
          <i className="fa-solid fa-bolt"></i>
        </button>
      </div>
    </div>
  );
};

export default Menu;

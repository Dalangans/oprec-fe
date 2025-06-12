import React, { useState } from 'react';
import { ShotgunOnTable, ShotgunInHand } from './Shotgun';
import Lamp from './Lamp';
import Enemy from './Enemy';

function Play({ onNavigate }) {
  // stage: 'table' | 'hand' | 'fire'
  const [stage, setStage] = useState('table');
  const [showBang, setShowBang] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = () => {
    if (stage === 'table') {
      setStage('hand');
    } else if (stage === 'hand') {
      setStage('fire');
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 100); // Flash for 0.1s
      setShowBang(true);
      setTimeout(() => {
        setShowBang(false);
        setStage('table');
      }, 700);
    }
  };

  const handleRestart = () => {
    setStage('table');
    setShowBang(false);
    setIsPaused(false);
  };

  return (
    <div className="fixed inset-0 min-h-screen w-full flex flex-col items-center justify-end bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
      {/* Table - 3D effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
        <Lamp />
        
        <svg width="1200" height="300" viewBox="0 0 1200 300" fill="none" className="w-[95vw] max-w-5xl">
          {/* Light Cone */}
          <path 
            d="M450,0 L750,0 L900,200 L300,200 Z" 
            fill="url(#lightCone)"
            opacity="0.15"
          />
          
          {/* Table top (rectangle with rounded corners) */}
          <path
            d="M100,80 
               L1100,80 
               C1120,80 1140,90 1150,100 
               L1180,200 
               C1190,220 1180,240 1160,250
               L40,250
               C20,240 10,220 20,200
               L50,100
               C60,90 80,80 100,80 Z"
            fill="url(#tableTopGradient)"
            stroke="#5c4737"
            strokeWidth="4"
          />

          {/* Table shadow */}
          <path
            d="M60,250 L1140,250 L1100,280 L100,280 Z"
            fill="#2a1f1a"
            opacity="0.5"
          />

          {/* Floor shadow */}
          <ellipse cx="600" cy="285" rx="500" ry="15" fill="black" opacity="0.3" />

          <defs>
            <linearGradient id="tableTopGradient" x1="600" y1="80" x2="600" y2="250">
              <stop offset="0%" stopColor="#8B7355" />
              <stop offset="100%" stopColor="#6F4E37" />
            </linearGradient>
            <radialGradient id="lightCone" cx="600" cy="0" r="600" gradientUnits="userSpaceOnUse">
              <stop offset="20%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Ajust shotgun position for wider table */}
      {stage === 'table' && (
        <div
          className="absolute left-1/2 bottom-32 sm:bottom-16 -translate-x-1/2 z-20 cursor-pointer hover:scale-105 transition-all duration-200"
          onClick={handleClick}
        >
          <ShotgunOnTable />
        </div>
      )}
      {stage === 'hand' && (
        <div
          className="absolute left-[65%] bottom-28 sm:bottom-22 -translate-x-1/2 z-20 cursor-pointer"
          onClick={handleClick}
        >
          <ShotgunInHand />
          <div className="absolute -bottom-12 -right-14 w-48 h-48 rounded-full bg-black/60 blur-2xl transform rotate-45"></div>
          <div className="absolute -bottom-8 -right-12 w-32 h-32 rounded-full bg-black/80 blur-xl"></div>
        </div>
      )}
      {stage === 'fire' && (
        <div className="absolute left-[65%] bottom-28 sm:bottom-22 -translate-x-1/2 z-20 pointer-events-none">
          <ShotgunInHand />
          <div className="absolute -bottom-12 -right-14 w-48 h-48 rounded-full bg-black/60 blur-2xl transform rotate-45"></div>
          <div className="absolute -bottom-8 -right-12 w-32 h-32 rounded-full bg-black/80 blur-xl"></div>
          {showBang && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-50 select-none pointer-events-none">
              <span className="text-6xl sm:text-7xl font-extrabold text-yellow-300 drop-shadow-[0_0_24px_#fff] animate-bounce-fast" style={{ textShadow: '0 0 32px #fff, 0 0 8px #ff0' }}>
                !
              </span>
            </div>
          )}
        </div>
      )}
      {/* Delete/comment out Player arms section */}
      {/* Player arms (First Person) 
      {(stage === 'hand' || stage === 'fire') && (
        <div className="absolute left-1/2 bottom-0 flex gap-32 sm:gap-56 -translate-x-1/2 z-30 pointer-events-none">
          <div className="w-24 h-48 rounded-t-[60px] rounded-b-[80px] bg-gradient-to-t from-[#2a1a1a] via-[#3a2323] to-[#6b3b1a] shadow-2xl border-b-8 border-[#3a2323] rotate-[-24deg] -mb-8"></div>
          <div className="w-24 h-48 rounded-t-[60px] rounded-b-[80px] bg-gradient-to-t from-[#2a1a1a] via-[#3a2323] to-[#6b3b1a] shadow-2xl border-b-8 border-[#3a2323] rotate-[24deg] -mb-8"></div>
        </div>
      )} */}
      {/* Overlay darkness */}
      <div className="absolute inset-0 bg-black opacity-60 pointer-events-none z-40"></div>

      {/* Menu Button (top-left corner) */}
      <button 
        className="absolute top-4 left-4 z-50 p-2 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
        onClick={() => setIsPaused(true)}
      >
        <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Pause Menu Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="flex flex-col gap-4">
              <button
                className="w-48 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-gray-600 hover:border-yellow-400"
                onClick={() => setIsPaused(false)}
              >
                ▶
              </button>
              <button
                className="w-48 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-gray-600 hover:border-yellow-400"
                onClick={handleRestart}
              >
                ↺
              </button>
              <button
                className="w-48 py-3 rounded-xl bg-gradient-to-r from-red-900 to-red-800 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-red-700 hover:border-yellow-400"
                onClick={() => onNavigate('home')}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flash effect overlay */}
      {showFlash && (
        <div className="fixed inset-0 bg-white z-[55] animate-flash pointer-events-none"></div>
      )}

      {/* Enemy position */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-32 sm:bottom-16 z-20">
        <div className="relative -translate-y-24">
          <Enemy />
        </div>
      </div>

      <style>
        {`
          .font-creepster {
            font-family: 'Creepster', cursive;
          }
          .animate-bounce-fast {
            animation: bounce-fast 0.7s;
          }
          @keyframes bounce-fast {
            0% { transform: scale(0.7);}
            30% { transform: scale(1.2);}
            60% { transform: scale(0.95);}
            100% { transform: scale(1);}
          }
          @keyframes flash {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          .animate-flash {
            animation: flash 0.1s linear forwards;
          }
          @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          
          .animate-breathe {
            animation: breathe 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Play;

import React from 'react';

function Home({ onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background mist/fog effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* No dynamic mist/blur, no pattern */}
      </div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <div className="text-center">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 select-none"
            style={{
              color: '#ff2e2e',
              textShadow: '0 0 20px #ff0000, 0 0 40px #000, 2px 2px 0 #000',
              letterSpacing: '0.08em',
              fontFamily: "'Creepster', cursive"
            }}
          >
            Shotgun Roulette
          </h1>
          <p className="text-lg sm:text-2xl text-gray-300 font-semibold tracking-wide mb-8" style={{ textShadow: '0 0 8px #000' }}>
            <span className="text-red-600 font-bold">Welcome to the ultimate game of fate.</span>
          </p>
          <div className="flex flex-col items-center gap-6">
            <button
              className="w-48 py-3 rounded-xl bg-gradient-to-r from-red-700 to-red-900 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-red-900 hover:border-yellow-400"
              onClick={() => onNavigate('play')}
            >
              Play
            </button>
            <button
              className="w-48 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-gray-800 hover:border-yellow-400"
              onClick={() => onNavigate('settings')}
            >
              Settings
            </button>
            <button className="w-48 py-3 rounded-xl bg-gradient-to-r from-black to-gray-800 text-red-400 text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-gray-900 hover:border-yellow-400">
              Quit
            </button>
          </div>
        </div>
      </div>
      {/* Google Fonts for Creepster */}
      <link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet" />
    </div>
  );
}

export default Home;

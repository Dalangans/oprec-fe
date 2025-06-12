import React from 'react';

function Settings({ onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-gray-900 bg-opacity-90 rounded-xl shadow-lg px-8 py-6 max-w-md w-full text-center border border-gray-700">
        <h2 className="text-2xl font-bold text-red-500 mb-4 font-creepster">Settings</h2>
        <p className="text-gray-300 mb-8">Settings menu coming soon...</p>
        <button
          className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-black text-white text-lg font-bold shadow hover:scale-105 transition-all duration-200 border-2 border-gray-700 hover:border-yellow-400"
          onClick={() => onNavigate && onNavigate('home')}
        >
          Back to Home
        </button>
      </div>
      <style>
        {`
          .font-creepster {
            font-family: 'Creepster', cursive;
          }
        `}
      </style>
    </div>
  );
}

export default Settings;

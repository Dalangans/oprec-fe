import React from 'react';

function Enemy() {
  return (
    <div className="animate-breathe">
      <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
        {/* Head */}
        <ellipse 
          cx="100" 
          cy="80" 
          rx="40" 
          ry="45" 
          className="fill-gray-800"
        />
        
        {/* Body */}
        <path
          d="M60,120 
             C60,180 60,240 100,270
             C140,240 140,180 140,120
             C140,110 120,100 100,100
             C80,100 60,110 60,120"
          className="fill-gray-900"
        />

        {/* Shadow */}
        <ellipse
          cx="100"
          cy="280"
          rx="50"
          ry="10"
          className="fill-black opacity-30 blur-sm"
        />
      </svg>
    </div>
  );
}

export default Enemy;

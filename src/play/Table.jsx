import React from 'react';

function Table() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
      <svg width="1200" height="300" viewBox="0 0 1200 300" fill="none" className="w-[95vw] max-w-5xl">
        {/* Light Cone */}
        <path 
          d="M450,0 L750,0 L900,200 L300,200 Z" 
          fill="url(#lightCone)"
          opacity="0.15"
        />
        
        {/* Table top */}
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
  );
}

export default Table;

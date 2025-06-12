import React from 'react';

function Lamp() {
  return (
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 z-20">
      <div className="w-2 h-32 bg-gradient-to-b from-gray-600 to-gray-800"></div>
      <div className="w-24 h-16 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-full relative">
        <div className="absolute inset-0 bg-yellow-50/20 rounded-t-full filter blur-sm"></div>
      </div>
    </div>
  );
}

export default Lamp;

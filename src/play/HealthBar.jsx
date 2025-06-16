import React from 'react';
import heartIcon from '../assets/Heart.webp';

function HealthDisplay({ current, max }) {
  const hearts = Array(max).fill(null);
  return (
    // Remove any margins that might affect positioning
    <div className="flex gap-2 justify-center p-0 m-0">
      {hearts.map((_, index) => (
        <img
          key={index}
          src={heartIcon}
          alt="heart"
          className={`w-8 h-8 transition-all duration-300 ${
            index < current ? 'opacity-100' : 'opacity-30'
          }`}
          style={{ margin: 0, padding: 0 }} // Ensure no extra spacing
        />
      ))}
    </div>
  );
}

export function EnemyHealthBar({ current, max }) {
  return (
    // Use fixed positioning for precise control
    <div className="fixed left-1/2 -translate-x-1/2 z-50" style={{ top: '48px' }}>
      <HealthDisplay current={current} max={max} />
    </div>
  );
}

export function PlayerHealthBar({ current, max }) {
  return (
    // Use fixed positioning for precise control
    <div className="fixed left-1/2 -translate-x-1/2 z-50" style={{ bottom: '70px' }}>
      <HealthDisplay current={current} max={max} />
    </div>
  );
}

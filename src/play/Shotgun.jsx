import React from 'react';
import FPSShotgun from '../assets/FPSShotgun.png';
import TableShotgun from '../assets/Shotgun.png';

// Shotgun di atas meja (horizontal, di tengah meja)
export function ShotgunOnTable() {
  return (
    <img 
      src={TableShotgun}
      alt="Shotgun on Table"
      className="drop-shadow-[0_0_24px_#000] w-[520px] h-auto rotate-[2deg]"
    />
  );
}

// Shotgun di tangan sendiri (POV, besar, menghadap ke depan bawah)
export function ShotgunInHand() {
  return (
    <img 
      src={FPSShotgun}
      alt="Shotgun FPS View"
      className="drop-shadow-[0_0_24px_#000] scale-20 w-[300px] h-auto"
    />
  );
}

// Shotgun di tangan musuh (lebih kecil, menghadap ke user, dari sudut musuh)
export function ShotgunEnemyPOV() {
  return (
    <svg width="320" height="80" viewBox="0 0 520 120" fill="none" className="drop-shadow-[0_0_16px_#000] scale-90 rotate-[8deg]">
      {/* Barrel */}
      <rect x="120" y="54" width="320" height="20" rx="10" fill="#bbb" stroke="#222" strokeWidth="2"/>
      {/* Barrel shadow */}
      <rect x="120" y="66" width="320" height="8" rx="4" fill="#888" opacity="0.4"/>
      {/* Muzzle */}
      <ellipse cx="440" cy="64" rx="16" ry="18" fill="#444" stroke="#222" strokeWidth="2"/>
      {/* Wood stock */}
      <rect x="10" y="48" width="110" height="32" rx="16" fill="#6b3b1a" stroke="#3a2323" strokeWidth="2"/>
      {/* Trigger guard */}
      <ellipse cx="70" cy="88" rx="14" ry="10" fill="#222"/>
      {/* Pump */}
      <rect x="200" y="48" width="48" height="32" rx="12" fill="#a67c52" stroke="#7c5a36" strokeWidth="2"/>
      {/* Shell ejection port */}
      <rect x="320" y="60" width="28" height="12" rx="3" fill="#222" opacity="0.7"/>
      {/* Barrel highlight */}
      <rect x="130" y="56" width="300" height="5" rx="2.5" fill="#fff" opacity="0.10"/>
      {/* Hand grip */}
      <ellipse cx="100" cy="100" rx="32" ry="18" fill="#222" opacity="0.5"/>
    </svg>
  );
}

// Default export: ShotgunInHand for backward compatibility
export default ShotgunInHand;

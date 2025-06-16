import React from 'react';
import sodaIcon from '../assets/Soda.png';
import glassIcon from '../assets/MagnifyingGlass.png';

export const POWERUP_TYPES = {
  SODA: 'SODA',
  MAGNIFYING_GLASS: 'MAGNIFYING_GLASS'
};

function PowerUpItem({ type, isEnabled, onClick }) {
  const icon = type === POWERUP_TYPES.SODA ? sodaIcon : glassIcon;
  const label = type === POWERUP_TYPES.SODA ? 'Skip Shot' : 'Peek Next';

  return (
    <button
      className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all duration-200 ${
        isEnabled 
          ? 'bg-yellow-400/20 hover:bg-yellow-400/30 cursor-pointer' 
          : 'bg-gray-800/50 cursor-not-allowed opacity-50'
      }`}
      onClick={isEnabled ? onClick : undefined}
      disabled={!isEnabled}
    >
      <img src={icon} alt={label} className="w-10 h-10" />
      <span className="text-xs text-white font-medium">{label}</span>
    </button>
  );
}

function PowerUps({ onUsePowerUp, powerUps }) {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      <PowerUpItem
        type={POWERUP_TYPES.SODA}
        isEnabled={powerUps.soda > 0}
        onClick={() => onUsePowerUp(POWERUP_TYPES.SODA)}
      />
      <PowerUpItem
        type={POWERUP_TYPES.MAGNIFYING_GLASS}
        isEnabled={powerUps.magnifyingGlass > 0}
        onClick={() => onUsePowerUp(POWERUP_TYPES.MAGNIFYING_GLASS)}
      />
    </div>
  );
}

export default PowerUps;

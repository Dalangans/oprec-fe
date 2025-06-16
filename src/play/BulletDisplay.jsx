import React from 'react';
import liveBullet from '../assets/LiveBullet.png';
import emptyBullet from '../assets/EmptyBullet.png';
import { BULLET_TYPES } from './BulletLogic';

function BulletDisplay({ type, isVisible }) {
  if (!isVisible) return null;

  const bulletSrc = type === BULLET_TYPES.LIVE ? liveBullet : emptyBullet;
  
  return (
    <div className="absolute left-[65%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 animate-bullet-shot">
      <img 
        src={bulletSrc}
        alt={type === BULLET_TYPES.LIVE ? "Live Bullet" : "Empty Bullet"}
        className="w-8 h-8 animate-bullet-spin"
      />
      <style>
        {`
          @keyframes bullet-shot {
            0% { 
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 0;
            }
            10% { 
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 1;
            }
            35% { 
              transform: translate(-50%, -300%) scale(1);
              opacity: 1;
            }
            70% {
              transform: translate(-150%, -150%) scale(1);
              opacity: 1;
            }
            100% { 
              transform: translate(-250%, 50%) scale(1);
              opacity: 0;
            }
          }

          @keyframes bullet-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(1080deg); }
          }
          
          .animate-bullet-shot {
            animation: bullet-shot 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          
          .animate-bullet-spin {
            animation: bullet-spin 2s linear forwards;
          }
        `}
      </style>
    </div>
  );
}

export default BulletDisplay;

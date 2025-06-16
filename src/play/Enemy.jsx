import React from 'react';
import { getStageConfig } from './GameStageLogic';
import enemyImage from '../assets/EnemyNormal.png';

function Enemy({ stage = 1 }) { // Remove onTarget and isTargetable props
  const config = getStageConfig(stage);

  return (
    <div className="animate-breathe relative pointer-events-none"> {/* Add pointer-events-none */}
      <img 
        src={enemyImage}
        alt="Enemy character" 
        width="400" 
        height="600"
      />
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 text-xl font-bold whitespace-nowrap">
        {config.stageTitle}
      </div>
    </div>
  );
}

export default Enemy;

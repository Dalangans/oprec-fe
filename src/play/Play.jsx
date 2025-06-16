import React, { useState, useEffect } from 'react';
import { ShotgunOnTable, ShotgunInHand } from './Shotgun';
import enemyShotgunImage from '../assets/EnemyShotgun.png';
import Enemy from './Enemy';
import Table from './Table';
import { generateBullets, getCurrentBullet, isLiveBullet } from './BulletLogic';
import { generateInitialHealth } from './HealthLogic';
import { EnemyHealthBar, PlayerHealthBar } from './HealthBar';
import BulletDisplay from './BulletDisplay';
import PowerUps, { POWERUP_TYPES } from './PowerUps';
import { API_ENDPOINTS, apiRequest } from '../api/config';

// Remove unused imports
const TARGET = {
  ENEMY: 'ENEMY',
  SELF: 'SELF'
};

// Modify BulletInfo to only show remaining shots
function BulletInfo({ total, live, empty, shotsLeft, isReloading }) {
  if (isReloading) {
    return (
      <div className="absolute top-4 right-4 z-50 bg-black/50 p-4 rounded-lg text-white animate-pulse">
        <div className="font-bold mb-2 text-yellow-400">RELOADING...</div>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-50 bg-black/50 p-4 rounded-lg text-white">
      <div className="font-bold mb-2 text-yellow-400">BULLETS</div>
      <div>Total: {total}</div>
      <div>Live: {live}</div>
      <div>Empty: {empty}</div>
      <div className="mt-2 text-sm">
        Left: {shotsLeft}
      </div>
    </div>
  );
}

function GameOver({ playerHealth, onExit }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[80]">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border-2 border-gray-700 shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {playerHealth <= 0 ? 'Game Over' : 'Congratulations!'}
        </h2>
        <p className="text-gray-300 mb-6">
          {playerHealth <= 0 ? 'You were shot!' : 'You completed all stages!'}
        </p>
        <button
          className="w-48 py-3 rounded-xl bg-gradient-to-r from-red-900 to-red-800 text-white text-xl font-bold"
          onClick={onExit}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

function PauseMenu({ onResume, onRestart, onExit }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border-2 border-gray-700 shadow-2xl">
        <div className="flex flex-col gap-4">
          <button
            className="w-48 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-gray-600 hover:border-yellow-400"
            onClick={onResume}
          >
            ▶
          </button>
          <button
            className="w-48 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-gray-600 hover:border-yellow-400"
            onClick={onRestart}
          >
            ↺
          </button>
          <button
            className="w-48 py-3 rounded-xl bg-gradient-to-r from-red-900 to-red-800 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-red-700 hover:border-yellow-400"
            onClick={onExit}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

// Modify TargetSelection component for better positioning
function TargetPrompt({ onSelect, isPlayerTurn }) {
  if (!isPlayerTurn) return null;
  
  return (
    <>
      {/* Dealer text - moved down slightly */}
      <div 
        style={{left: '50%', transform: 'translateX(-50%)'}} 
        className="absolute top-24 z-[51] text-center cursor-pointer"
        onClick={() => onSelect(TARGET.ENEMY)}
      >
        <div className="text-red-500 text-5xl font-bold mb-2 hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
          DEALER
        </div>
      </div>
      
      {/* You text - unchanged */}
      <div 
        style={{left: '50%', transform: 'translateX(-50%)'}} 
        className="absolute bottom-24 z-[51] text-center cursor-pointer"
        onClick={() => onSelect(TARGET.SELF)}
      >
        <div className="text-yellow-500 text-5xl font-bold mb-2 hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">
          YOU
        </div>
      </div>
    </>
  );
}

function Play({ onNavigate, user }) {
  // stage: 'table' | 'hand' | 'fire'
  const [stage, setStage] = useState('table');
  const [showBang, setShowBang] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [bullets, setBullets] = useState([]);
  const [currentBulletIndex, setCurrentBulletIndex] = useState(0);
  const [showNewRoundNotif, setShowNewRoundNotif] = useState(true);
  const [maxHealth, setMaxHealth] = useState(generateInitialHealth());
  const [playerHealth, setPlayerHealth] = useState(maxHealth);
  const [enemyHealth, setEnemyHealth] = useState(maxHealth);
  const [currentStage, setCurrentStage] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStageTransition, setIsStageTransition] = useState(false);
  const [showBullet, setShowBullet] = useState(false);
  const [currentBulletType, setCurrentBulletType] = useState(null);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [powerUps, setPowerUps] = useState({
    soda: 1,
    magnifyingGlass: 1
  });
  const [showNextBullet, setShowNextBullet] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [showScoreNotification, setShowScoreNotification] = useState(false);

  const handleRestart = () => {
    // Reset all game states
    setStage('table');
    setShowBang(false);
    setShowFlash(false);
    setIsPaused(false);
    setIsGameOver(false);
    setIsStageTransition(false);
    setShowBullet(false);
    setCurrentBulletType(null);
    setIsSelectingTarget(false);
    setShowPrompt(false);
    setCurrentStage(1);
    
    // Generate new bullets and health
    const newBullets = generateBullets();
    setBullets(newBullets);
    setCurrentBulletIndex(0);
    
    const newMaxHealth = generateInitialHealth();
    setMaxHealth(newMaxHealth);
    setPlayerHealth(newMaxHealth);
    setEnemyHealth(newMaxHealth);
    
    setShowNewRoundNotif(true);
    setTimeout(() => setShowNewRoundNotif(false), 2000);
  };

  useEffect(() => {
    handleRestart(); // Initialize game on mount
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (enemyHealth <= 0) {
      const completeStage = async () => {
        try {
          await apiRequest(`${API_ENDPOINTS.COMPLETE_STAGE}/${currentStage}`, {
            method: 'PUT'
          });
          
          // Update leaderboard
          await apiRequest(API_ENDPOINTS.UPDATE_LEADERBOARD, {
            method: 'POST',
            body: JSON.stringify({
              level: currentStage,
              score: 1000,
              accountId: user.id
            })
          });

          setShowScoreNotification(true);
          setTimeout(() => setShowScoreNotification(false), 2000);
          
          if (currentStage >= 3) {
            setIsGameOver(true);
          } else {
            setIsStageTransition(true);
            setTimeout(() => {
              setCurrentStage(prev => prev + 1);
              const newMaxHealth = generateInitialHealth();
              setMaxHealth(newMaxHealth);
              setPlayerHealth(newMaxHealth);
              setEnemyHealth(newMaxHealth);
              
              const newBullets = generateBullets();
              setBullets(newBullets);
              setCurrentBulletIndex(0);
              
              setShowNewRoundNotif(true);
              
              setTimeout(() => {
                setIsStageTransition(false);
                setTimeout(() => setShowNewRoundNotif(false), 2000);
              }, 1000);
            }, 2000);
          }
        } catch (error) {
          console.error('Error completing stage:', error);
        }
      };

      completeStage();
    } else if (playerHealth <= 0) {
      setIsGameOver(true);
    }
  }, [enemyHealth, currentStage, user]);

  // Update bullet reset logic in handleEnemyTurn
  const handleEnemyTurn = () => {
    const currentBullet = bullets[currentBulletIndex];
    
    if (currentBulletIndex >= bullets.length - 1) {
      setIsReloading(true);
      const newBullets = generateBullets();
      setBullets(newBullets);
      setCurrentBulletIndex(0);
      setShowNewRoundNotif(true);
      setTimeout(() => {
        setIsReloading(false);
        setShowNewRoundNotif(false);
      }, 2000);
      setIsPlayerTurn(true);
      setStage('table');
      return;
    }
    
    setStage('fire');
    setShowFlash(true);
    setCurrentBulletType(currentBullet.type);
    setShowBullet(true);
    
    setTimeout(() => setShowFlash(false), 100);
    
    if (isLiveBullet(currentBullet)) {
      setShowBang(true);
      setPlayerHealth(prev => Math.max(0, prev - 1));
    }
    
    setTimeout(() => {
      setShowBang(false);
      setShowBullet(false);
      
      setTimeout(() => {
        setStage('table');
        setCurrentBulletIndex(prev => prev + 1);
        setIsPlayerTurn(true);
      }, 3000); // Changed from 5000 to 3000
    }, 3000); // Changed from 5000 to 3000
  };

  // Update bullet reset logic in handleTargetSelection
  const handleTargetSelection = (target) => {
    const currentBullet = bullets[currentBulletIndex]; // Use direct array access
    
    setStage('fire');
    setShowFlash(true);
    setCurrentBulletType(currentBullet.type);
    setShowBullet(true);
    setIsSelectingTarget(false);
    
    setTimeout(() => setShowFlash(false), 100);
    
    // Handle health changes first
    if (isLiveBullet(currentBullet)) {
      setShowBang(true);
      if (target === TARGET.SELF) {
        setPlayerHealth(prev => Math.max(0, prev - 1));
      } else {
        setEnemyHealth(prev => Math.max(0, prev - 1));
      }
    }

    // Player shooting sequence
    setTimeout(() => {
      setShowBang(false);
      setShowBullet(false);
      
      setTimeout(() => {
        setStage('table');
        setCurrentBulletIndex(prev => prev + 1);
        
        // Update bullet reset logic
        if (currentBulletIndex >= bullets.length - 1) {
          setIsReloading(true);
          const newBullets = generateBullets();
          setBullets(newBullets);
          setCurrentBulletIndex(0);
          setShowNewRoundNotif(true);
          setTimeout(() => {
            setIsReloading(false);
            setShowNewRoundNotif(false);
          }, 2000);
          setIsPlayerTurn(true);
          return;
        }

        const shouldChangeToEnemyTurn = target === TARGET.ENEMY || (target === TARGET.SELF && isLiveBullet(currentBullet));
        
        if (shouldChangeToEnemyTurn) {
          setTimeout(() => {
            setIsPlayerTurn(false);
            setStage('hand');
            
            setTimeout(() => {
              handleEnemyTurn();
            }, 3000); // Changed from 5000 to 3000
          }, 3000); // Changed from 3000 to match the new timing
        }
      }, 3000); // Changed from 5000 to 3000
    }, 3000); // Changed from 5000 to 3000
  };

  const handleClick = () => {
    if (isGameOver) return;
    
    if (stage === 'table') {
      setStage('hand');
      // Add delay before allowing target selection
      setTimeout(() => {
        setIsSelectingTarget(true);
      }, 2000);
    }
  };

  const handleUsePowerUp = (type) => {
    if (type === POWERUP_TYPES.SODA) {
      // Skip current bullet
      setCurrentBulletIndex(prev => prev + 1);
      setPowerUps(prev => ({ ...prev, soda: prev.soda - 1 }));
      
      // Check if all bullets used
      if (currentBulletIndex >= bullets.length - 1) {
        const newBullets = generateBullets();
        setBullets(newBullets);
        setCurrentBulletIndex(0);
      }
    } else if (type === POWERUP_TYPES.MAGNIFYING_GLASS) {
      // Show next bullet type
      setShowNextBullet(true);
      setPowerUps(prev => ({ ...prev, magnifyingGlass: prev.magnifyingGlass - 1 }));
      setTimeout(() => setShowNextBullet(false), 2000);
    }
  };

  // Count live and empty bullets
  const bulletCounts = bullets.reduce((acc, bullet) => {
    if (isLiveBullet(bullet)) acc.live++;
    else acc.empty++;
    return acc;
  }, { live: 0, empty: 0 });

  // Add renderShotgun function to handle conditional rendering
  const renderShotgun = () => {
    if (!isPlayerTurn) {
      // Enemy's turn - show enemy shotgun in lower position
      if (stage === 'hand' || stage === 'fire') {
        return (
          <div className="absolute left-[50%] bottom-[45%] -translate-x-1/2 z-20">
            <img 
              src={enemyShotgunImage}
              alt="Enemy Shotgun"
              className="w-[300px] h-auto transform scale-x-[-1]"
            />
          </div>
        );
      }
      return null;
    }

    // Player's turn
    if (stage === 'table') {
      return (
        <div className="absolute left-[50%] bottom-32 sm:bottom-16 -translate-x-1/2 z-20">
          <div className="cursor-pointer hover:scale-105 transition-all duration-200 animate-fade-in"
               onClick={handleClick}>
            <ShotgunOnTable />
          </div>
        </div>
      );
    } else if (stage === 'hand' || stage === 'fire') {
      return (
        <div className="absolute left-[65%] bottom-28 sm:bottom-22 -translate-x-1/2 z-20 pointer-events-none">
          <ShotgunInHand />
          <div className="absolute -bottom-12 -right-14 w-48 h-48 rounded-full bg-black/60 blur-2xl transform rotate-45"></div>
          <div className="absolute -bottom-8 -right-12 w-32 h-32 rounded-full bg-black/80 blur-xl"></div>
        </div>
      );
    }
    return null;
  };

  // Update getRemainingBullets to be more accurate
  const getRemainingBullets = () => {
    const remainingBullets = bullets.slice(currentBulletIndex);
    const liveBullets = remainingBullets.filter(b => isLiveBullet(b));
    const emptyBullets = remainingBullets.filter(b => !isLiveBullet(b));
    
    return {
      total: remainingBullets.length,
      live: liveBullets.length,
      empty: emptyBullets.length,
      left: remainingBullets.length,
      isReloading
    };
  };

  // Add score notification component
  const ScoreNotification = () => (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70]">
      <div className="bg-yellow-400 text-black px-8 py-4 rounded-xl text-3xl font-bold animate-bounce-fast">
        +1000 POINTS!
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 min-h-screen w-full flex flex-col items-center justify-end bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
      <BulletInfo {...getRemainingBullets()} />

      {/* Stage indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-2xl font-bold text-white">
        Stage {currentStage}
      </div>

      {isGameOver && <GameOver playerHealth={playerHealth} onExit={() => onNavigate('home')} />}

      {/* Enemy position - only show when it's player's turn */}
      {isPlayerTurn && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-32 sm:bottom-16 z-[5]">
          <div className="relative -translate-y-24">
            <Enemy 
              stage={currentStage}
            />
          </div>
        </div>
      )}

      {/* Table Component */}
      <Table />
      
      {/* Replace all shotgun rendering with new renderShotgun function */}
      {renderShotgun()}

      {/* Overlay darkness */}
      <div className="absolute inset-0 bg-black opacity-60 pointer-events-none z-40"></div>

      {/* Menu Button (top-left corner) */}
      <button 
        className="absolute top-4 left-4 z-50 p-2 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
        onClick={() => setIsPaused(true)}
      >
        <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Pause Menu Overlay */}
      {isPaused && (
        <PauseMenu
          onResume={() => setIsPaused(false)}
          onRestart={handleRestart}
          onExit={() => onNavigate('home')}
        />
      )}

      {/* Flash effect overlay */}
      {showFlash && (
        <div className="fixed inset-0 bg-white z-[55] animate-flash pointer-events-none"></div>
      )}

      {/* Add HealthBars */}
      <EnemyHealthBar current={enemyHealth} max={maxHealth} />
      <PlayerHealthBar current={playerHealth} max={maxHealth} />

      {/* Stage Transition Overlay */}
      {isStageTransition && (
        <div className="fixed inset-0 bg-black z-[75] animate-stage-transition pointer-events-none" />
      )}

      <BulletDisplay 
        type={currentBulletType}
        isVisible={showBullet}
      />

      {/* Update targeting prompt to pass isPlayerTurn */}
      {stage === 'hand' && (
        <TargetPrompt 
          onSelect={handleTargetSelection} 
          isPlayerTurn={isPlayerTurn}
        />
      )}

      {/* Add PowerUps component */}
      <PowerUps 
        onUsePowerUp={handleUsePowerUp}
        powerUps={powerUps}
      />

      {/* Show next bullet hint when using magnifying glass */}
      {showNextBullet && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-black/80 px-6 py-4 rounded-xl border-2 border-yellow-400">
          <p className="text-white text-xl font-bold">
            Next bullet is: {isLiveBullet(getCurrentBullet(bullets, currentBulletIndex + 1)) ? 'LIVE' : 'EMPTY'}
          </p>
        </div>
      )}

      {/* Add turn indicator */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 text-xl font-bold text-white">
        {isPlayerTurn ? "Your Turn" : "Enemy's Turn"}
      </div>

      {showScoreNotification && <ScoreNotification />}

      <style>
        {`
          .font-creepster {
            font-family: 'Creepster', cursive;
          }
          .animate-bounce-fast {
            animation: bounce-fast 0.7s;
          }
          @keyframes bounce-fast {
            0% { transform: scale(0.7);}
            30% { transform: scale(1.2);}
            60% { transform: scale(0.95);}
            100% { transform: scale(1);}
          }
          @keyframes flash {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          .animate-flash {
            animation: flash 0.1s linear forwards;
          }
          @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          
          .animate-breathe {
            animation: breathe 4s ease-in-out infinite;
          }
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          @keyframes slide-in {
            0% { opacity: 0; transform: translate(-50%, 100px); }
            100% { opacity: 1; transform: translate(-50%, 0); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          
          .animate-slide-in {
            animation: slide-in 0.5s ease-out forwards;
          }
          @keyframes stage-transition {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          .animate-stage-transition {
            animation: stage-transition 3s ease-in-out forwards;
          }
          @keyframes bullet-shot {
            0% { 
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 0;
            }
            20% { 
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 1;
            }
            100% { 
              transform: translate(-50%, -200%) scale(1);
              opacity: 0;
            }
          }
          
          .animate-bullet-shot {
            animation: bullet-shot 0.7s ease-out forwards;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Play;

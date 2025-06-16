import { isLiveBullet } from './BulletLogic';

export const TARGET = {
  ENEMY: 'ENEMY',
  SELF: 'SELF'
};

export function handleShot({ 
  currentBullet, 
  playerHealth, 
  enemyHealth, 
  target 
}) {
  if (!currentBullet) return { playerHealth, enemyHealth };

  // Only reduce health if it's a live bullet
  if (isLiveBullet(currentBullet)) {
    if (target === TARGET.SELF) {
      return {
        playerHealth: Math.max(0, playerHealth - 1),
        enemyHealth
      };
    } else if (target === TARGET.ENEMY) {
      return {
        playerHealth,
        enemyHealth: Math.max(0, enemyHealth - 1)
      };
    }
  }

  // Return unchanged health for empty bullets
  return { playerHealth, enemyHealth };
}

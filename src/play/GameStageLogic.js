export const STAGE_CONFIG = {
  1: {
    enemyDamage: 1,
    enemySprite: '/assets/Enemy.png'
  },
  2: {
    enemyDamage: 2,
    enemySprite: '/assets/Enemy.png'
  },
  3: {
    enemyDamage: 3,
    enemySprite: '/assets/Enemy.png'
  }
};

export function getStageConfig(stage) {
  return STAGE_CONFIG[stage] || STAGE_CONFIG[1];
}

export function shouldAdvanceStage(enemyHealth) {
  return enemyHealth <= 0;
}

export function isGameComplete(stage) {
  return stage > 3;
}

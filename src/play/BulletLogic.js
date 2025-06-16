export const BULLET_TYPES = {
  LIVE: 'LIVE',
  EMPTY: 'EMPTY'
};

export function generateBullets() {
  // Random jumlah bullet (2-8)
  const bulletCount = Math.floor(Math.random() * 7) + 2;
  const bullets = [];

  // Special case for 2 bullets to ensure exactly 1 live and 1 empty
  if (bulletCount === 2) {
    bullets.push({ type: BULLET_TYPES.LIVE });
    bullets.push({ type: BULLET_TYPES.EMPTY });
    
    // Shuffle these two bullets
    if (Math.random() > 0.5) {
      [bullets[0], bullets[1]] = [bullets[1], bullets[0]];
    }
    return bullets;
  }
  
  // For more than 2 bullets, use the existing logic
  bullets.push({ type: BULLET_TYPES.LIVE });
  bullets.push({ type: BULLET_TYPES.EMPTY });
  
  // Generate sisa bullet secara random
  for (let i = 2; i < bulletCount; i++) {
    const randomType = Math.random() > 0.5 ? BULLET_TYPES.LIVE : BULLET_TYPES.EMPTY;
    bullets.push({ type: randomType });
  }

  // Shuffle array
  for (let i = bullets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bullets[i], bullets[j]] = [bullets[j], bullets[i]];
  }

  return bullets;
}

export function getCurrentBullet(bullets, index) {
  if (!bullets || index >= bullets.length) return null;
  return bullets[index];
}

export function isLiveBullet(bullet) {
  return bullet?.type === BULLET_TYPES.LIVE;
}

export function generateInitialHealth() {
  return Math.floor(Math.random() * 5) + 2; // Random between 2-6
}

export function calculateHealthPercentage(current, max) {
  return (current / max) * 100;
}

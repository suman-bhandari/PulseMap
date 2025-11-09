// Utility functions for reputation and karma

/**
 * Normalize reputation score from 0-100 to 0-5
 */
export function normalizeReputation(trustability: number): number {
  // Convert 0-100 trustability to 0-5 reputation
  return Math.min(5, Math.max(0, (trustability / 100) * 5));
}

/**
 * Get color for reputation-based username box
 * 0-1: red, 1-2: orange, 2-3: yellow, 3-4: light green, 4-5: green
 */
export function getReputationColor(reputation: number): string {
  if (reputation >= 4) return '#22C55E'; // green-500
  if (reputation >= 3) return '#84CC16'; // lime-500
  if (reputation >= 2) return '#EAB308'; // yellow-500
  if (reputation >= 1) return '#F97316'; // orange-500
  return '#EF4444'; // red-500
}

/**
 * Get background color for reputation box (lighter version)
 */
export function getReputationBgColor(reputation: number): string {
  if (reputation >= 4) return '#D1FAE5'; // green-100
  if (reputation >= 3) return '#ECFCCB'; // lime-100
  if (reputation >= 2) return '#FEF9C3'; // yellow-100
  if (reputation >= 1) return '#FFEDD5'; // orange-100
  return '#FEE2E2'; // red-100
}

/**
 * Format time ago from a date
 */
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000; // years
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000; // months
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400; // days
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600; // hours
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60; // minutes
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
}

/**
 * Generate a random number from Gamma distribution
 * Using Marsaglia and Tsang's method
 * @param alpha shape parameter (k)
 * @param theta scale parameter
 * @returns random value from Gamma(alpha, theta)
 */
export function generateGamma(alpha: number, theta: number): number {
  // Marsaglia and Tsang's method for Gamma distribution
  if (alpha < 1) {
    // For alpha < 1, use transformation
    return generateGamma(alpha + 1, theta) * Math.pow(Math.random(), 1 / alpha);
  }
  
  const d = alpha - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  
  while (true) {
    let x: number;
    let v: number;
    
    // Generate normal random variable
    do {
      x = Math.random() * 2 - 1;
      v = 1 + c * x;
    } while (v <= 0);
    
    v = v * v * v;
    const u = Math.random();
    
    if (u < 1 - 0.0331 * (x * x) * (x * x)) {
      return d * v * theta;
    }
    
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
      return d * v * theta;
    }
  }
}

/**
 * Generate a random number from Normal distribution using Box-Muller transform
 * @param mean mean of the distribution
 * @param stdDev standard deviation of the distribution
 * @returns random value from Normal(mean, stdDev)
 */
export function generateNormal(mean: number, stdDev: number): number {
  // Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0 * stdDev + mean;
}

/**
 * Generate EXP using max(500, normal(2000, 1000))
 * @returns EXP value
 */
export function generateExp(): number {
  const normalValue = generateNormal(2000, 1000);
  return Math.max(500, Math.round(normalValue));
}


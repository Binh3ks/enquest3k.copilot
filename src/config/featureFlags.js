/**
 * Feature Flags Configuration
 * Used for safe staged rollout of new engines and experimental features.
 */

export const FEATURES = {
  // Hub World Phaser Canvas Engine (vs legacy CSS grid room nodes)
  // Default: false (stable legacy CSS map).
  // Toggle in dev/test via: localStorage.setItem('ff_phaser_hub', 'true')
  PHASER_HUB_WORLD: typeof window !== 'undefined' && window.localStorage?.getItem('ff_phaser_hub') === 'true',
};

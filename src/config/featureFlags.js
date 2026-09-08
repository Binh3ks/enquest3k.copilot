/**
 * Feature Flags Configuration
 * Used for safe staged rollout of new engines and experimental features.
 */

export const FEATURES = {
  // Hub World Phaser Canvas Engine (vs legacy CSS grid room nodes)
  // Default: true — Phaser 2D Hub is the primary experience.
  // Override via: localStorage.setItem('ff_phaser_hub', 'false') to revert to legacy grid.
  PHASER_HUB_WORLD: typeof window !== 'undefined'
    ? window.localStorage?.getItem('ff_phaser_hub') !== 'false'
    : true,
};

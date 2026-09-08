/**
 * Feature Flags Configuration
 * Used for safe staged rollout of new engines and experimental features.
 */

export const FEATURES = {
  // Hub World Phaser Canvas Engine (vs legacy CSS grid room nodes)
  // Default: true — 2D RPG Grand Citadel Hall v5.0 with Fauna animated hero spritesheet.
  // Toggle via UI button or: localStorage.setItem('ff_phaser_hub', 'false') to view legacy grid.
  PHASER_HUB_WORLD: typeof window !== 'undefined'
    ? window.localStorage?.getItem('ff_phaser_hub') !== 'false'
    : true,
};

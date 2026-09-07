/**
 * src/modules/quest/index.js
 * Barrel exports for Lexio's Quest physics foundation (Sprint 1)
 */

// Physics utilities (pure JS — no React)
export * from './LeoPhysics';

// Core components
export { default as DungeonRoom }   from './DungeonRoom';
export { default as LeoCharacter }  from './LeoCharacter';
export { default as VirtualDPad }   from './VirtualDPad';
export { default as HUDOverlay }    from './HUDOverlay';
export { default as WordCrystal }   from './WordCrystal';
export { WordCrystalLayer }         from './WordCrystal';
export { default as MCQBlitzPopup } from './MCQBlitzPopup';
export { generateMCQChoices }       from './MCQBlitzPopup';

// Enemy AI
export { default as EnemyLayer }    from './EnemyAI';
export { EnemySprite }              from './EnemyAI';
export { createEnemy, updateEnemyPatrol, freezeAllEnemies, speedupAllEnemies, ENEMY_TYPES } from './EnemyAI';

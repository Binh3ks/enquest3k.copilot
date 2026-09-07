/**
 * LeoPhysics.js — Core physics constants & collision utilities for Lexio's Quest
 * GDD §1.2 — Leo Core Movement Engine
 * Pure JS module (no React dependencies) — imported by DungeonRoom, EnemyAI, etc.
 */

// ─── PHYSICS CONSTANTS (GDD spec) ────────────────────────────────────────────

export const LEO_SPEED        = 4;     // px/frame horizontal movement
export const LEO_JUMP_FORCE   = -14;   // px/frame initial upward velocity
export const GRAVITY          = 0.6;   // px/frame² gravitational acceleration
export const FLOOR_Y          = 520;   // px from top — ground level
export const MAX_FALL_SPEED   = 18;    // terminal velocity (px/frame)
export const INVINCIBILITY_MS = 2000;  // ms of invincibility after being hit
export const ENEMY_FREEZE_MS  = 3000;  // ms enemies stay frozen after correct MCQ
export const ENEMY_SPEEDUP_MS = 5000;  // ms enemies move faster after wrong MCQ
export const ENEMY_SPEEDUP_MULT = 1.8; // speed multiplier during speedup

// ─── HITBOXES (GDD spec) ─────────────────────────────────────────────────────

export const LEO_HITBOX         = { width: 40, height: 60 }; // smaller than sprite for fairness
export const ENEMY_HITBOX       = { width: 50, height: 60 };
export const WORD_COLLECT_RADIUS = 55; // px — proximity trigger for word crystal

// ─── ROOM DIMENSIONS ─────────────────────────────────────────────────────────

export const ROOM_WIDTH  = 900;  // logical room width px
export const ROOM_HEIGHT = 600;  // logical room height px

// ─── PLATFORM HELPERS ────────────────────────────────────────────────────────

/**
 * Default floor platform (always present)
 */
export const DEFAULT_FLOOR_PLATFORM = { x: 0, y: FLOOR_Y, width: ROOM_WIDTH, height: 20 };

/**
 * Standard platform configs per floor theme
 */
export const FLOOR_PLATFORMS = {
  'chamber-of-tales': [
    DEFAULT_FLOOR_PLATFORM,
    { x: 80,  y: 400, width: 160, height: 16 },
    { x: 380, y: 320, width: 160, height: 16 },
    { x: 660, y: 400, width: 160, height: 16 },
  ],
  'alchemy-lab': [
    DEFAULT_FLOOR_PLATFORM,
    { x: 100, y: 420, width: 140, height: 16 },
    { x: 350, y: 340, width: 140, height: 16 },
    { x: 620, y: 420, width: 140, height: 16 },
  ],
  'thunder-arena': [
    DEFAULT_FLOOR_PLATFORM,
    { x: 50,  y: 380, width: 180, height: 16 },
    { x: 360, y: 300, width: 180, height: 16 },
    { x: 670, y: 380, width: 180, height: 16 },
  ],
  'rune-sanctum': [
    DEFAULT_FLOOR_PLATFORM,
    { x: 120, y: 420, width: 130, height: 16 },
    { x: 380, y: 350, width: 130, height: 16 },
    { x: 640, y: 420, width: 130, height: 16 },
  ],
  'apex-spire': [
    DEFAULT_FLOOR_PLATFORM,
    { x: 60,  y: 390, width: 150, height: 16 },
    { x: 375, y: 310, width: 150, height: 16 },
    { x: 690, y: 390, width: 150, height: 16 },
  ],
};

// ─── COLLISION UTILITIES ─────────────────────────────────────────────────────

/**
 * AABB (Axis-Aligned Bounding Box) overlap check
 * @param {{ x, y, width, height }} a
 * @param {{ x, y, width, height }} b
 * @returns {boolean}
 */
export function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width  &&
    a.x + a.width  > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

/**
 * Circle vs Rectangle overlap (used for word crystal proximity)
 * @param {{ x, y, radius }} circle  — circle center + radius
 * @param {{ x, y, width, height }} rect
 * @returns {boolean}
 */
export function circleRectOverlap(circle, rect) {
  const nearestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const nearestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  const dx = circle.x - nearestX;
  const dy = circle.y - nearestY;
  return (dx * dx + dy * dy) < (circle.radius * circle.radius);
}

/**
 * Apply gravity to an entity with velocity
 * Mutates entity in place (vy updated, bounded by MAX_FALL_SPEED)
 * @param {{ vy: number }} entity
 */
export function applyGravity(entity) {
  entity.vy = Math.min(entity.vy + GRAVITY, MAX_FALL_SPEED);
}

/**
 * Resolve platform landing: check if entity is falling through a platform
 * Returns the landing Y if landed, or null
 * Mutates entity: sets vy=0 and snaps y if landing detected
 *
 * @param {{ x, y, vy, width, height }} entity
 * @param {Array<{ x, y, width, height }>} platforms
 * @returns {boolean} landed
 */
export function checkPlatformLanding(entity, platforms) {
  if (entity.vy < 0) return false; // can't land while rising

  const entityBottom = entity.y + (entity.height || LEO_HITBOX.height);
  const prevBottom   = entityBottom - entity.vy; // bottom position last frame

  for (const plat of platforms) {
    const entityLeft  = entity.x;
    const entityRight = entity.x + (entity.width || LEO_HITBOX.width);

    // Horizontal overlap
    if (entityRight <= plat.x || entityLeft >= plat.x + plat.width) continue;

    // Top surface crossing (was above, now at or below platform top)
    if (prevBottom <= plat.y && entityBottom >= plat.y) {
      entity.y  = plat.y - (entity.height || LEO_HITBOX.height);
      entity.vy = 0;
      return true;
    }
  }
  return false;
}

/**
 * Clamp a value between min and max
 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Check if entity center is within WORD_COLLECT_RADIUS of a crystal center
 * @param {{ x, y }} leoPos  — Leo top-left position
 * @param {{ x, y }} crystalPos — Crystal center position
 * @returns {boolean}
 */
export function isNearCrystal(leoPos, crystalPos) {
  const leoCenterX = leoPos.x + LEO_HITBOX.width  / 2;
  const leoCenterY = leoPos.y + LEO_HITBOX.height / 2;
  const dx = leoCenterX - crystalPos.x;
  const dy = leoCenterY - crystalPos.y;
  return (dx * dx + dy * dy) < (WORD_COLLECT_RADIUS * WORD_COLLECT_RADIUS);
}

/**
 * Check Leo AABB vs Enemy AABB collision (accounting for invincibility)
 * @param {{ x, y, invincibleUntil: number }} leo
 * @param {{ x, y, state: string }} enemy
 * @returns {boolean} — true if a damaging hit occurred
 */
export function checkLeoEnemyCollision(leo, enemy) {
  if (Date.now() < (leo.invincibleUntil || 0)) return false;   // Leo invincible
  if (enemy.state === 'frozen') return false;                   // enemy frozen

  const leoRect    = { x: leo.x,    y: leo.y,    ...LEO_HITBOX };
  const enemyRect  = { x: enemy.x,  y: enemy.y,  ...ENEMY_HITBOX };
  return rectsOverlap(leoRect, enemyRect);
}

/**
 * EnemyAI.jsx — Enemy entity + patrol AI for Lexio's Quest dungeon rooms
 * GDD §1.2 — "zombie/worm patrol + freeze/speed mechanics"
 * Pure rendering component — game loop mutation happens in DungeonRoom
 */
import React from 'react';
import './EnemyAI.css';

// ─── ENEMY TYPE CONFIGS ───────────────────────────────────────────────────────

export const ENEMY_TYPES = {
  zombie: {
    emoji: '🧟',
    speed: 1.5,
    patrolRange: 200,   // px range from spawn point
    canJump: false,
    width: 50,
    height: 60,
    label: 'Zombie',
  },
  worm: {
    emoji: '🪱',
    speed: 1.0,
    patrolRange: 160,
    canJump: false,
    width: 44,
    height: 44,
    label: 'Grammar Worm',
  },
  shadow_guard: {
    emoji: '🤖',
    speed: 1.2,
    patrolRange: 250,
    canJump: false,
    width: 50,
    height: 60,
    label: 'Shadow Guard',
  },
  forge_imp: {
    emoji: '👿',
    speed: 2.0,
    patrolRange: 180,
    canJump: true,
    width: 44,
    height: 50,
    label: 'Forge Imp',
  },
};

// ─── ENEMY FACTORY ────────────────────────────────────────────────────────────

/**
 * Create a new enemy entity object
 * @param {{ type: string, x: number, y: number, id?: string }} config
 * @returns {Object} mutable enemy state object
 */
export function createEnemy({ type = 'zombie', x, y, id }) {
  const cfg = ENEMY_TYPES[type] || ENEMY_TYPES.zombie;
  return {
    id:          id || `enemy_${type}_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    type,
    x,
    y,
    vx:          cfg.speed,         // start moving right
    vy:          0,
    spawnX:      x,                 // origin for patrol range
    state:       'patrol',          // 'patrol' | 'frozen' | 'speedup'
    frozenUntil: 0,
    speedupUntil: 0,
    facingRight: true,
    ...cfg,
  };
}

// ─── ENEMY UPDATE (called every frame in DungeonRoom game loop) ───────────────

/**
 * Update a single enemy's position and state for one frame.
 * Mutates enemy in place.
 *
 * @param {Object} enemy       — mutable enemy state
 * @param {number} floorY      — ground Y pixel
 * @param {number} roomWidth   — room logical width
 */
export function updateEnemyPatrol(enemy, floorY, roomWidth) {
  const now = Date.now();

  // ── State transitions ──────────────────────────────────────────────
  if (enemy.state === 'frozen' && now >= enemy.frozenUntil) {
    enemy.state = 'patrol';
  }
  if (enemy.state === 'speedup' && now >= enemy.speedupUntil) {
    enemy.state = 'patrol';
  }

  // ── Frozen: don't move ────────────────────────────────────────────
  if (enemy.state === 'frozen') return;

  // ── Effective speed ───────────────────────────────────────────────
  const baseSpeed  = ENEMY_TYPES[enemy.type]?.speed ?? 1.5;
  const speedMult  = enemy.state === 'speedup'
    ? (ENEMY_TYPES[enemy.type]?.speedupMult ?? 1.8)
    : 1.0;
  const effectiveSpeed = baseSpeed * speedMult;

  // ── Patrol left/right within range ───────────────────────────────
  enemy.x += enemy.vx > 0 ? effectiveSpeed : -effectiveSpeed;

  const leftBound  = Math.max(0, enemy.spawnX - enemy.patrolRange / 2);
  const rightBound = Math.min(roomWidth - enemy.width, enemy.spawnX + enemy.patrolRange / 2);

  if (enemy.x <= leftBound) {
    enemy.x = leftBound;
    enemy.vx = Math.abs(enemy.vx); // turn right
    enemy.facingRight = true;
  } else if (enemy.x >= rightBound) {
    enemy.x = rightBound;
    enemy.vx = -Math.abs(enemy.vx); // turn left
    enemy.facingRight = false;
  }

  // ── Snap to floor if not on platform ─────────────────────────────
  // (simple version: all enemies stay on floor_y unless on platform)
  if (enemy.y !== floorY - enemy.height) {
    enemy.y = floorY - enemy.height;
  }
}

/**
 * Apply FREEZE effect to all enemies in array
 */
export function freezeAllEnemies(enemies, durationMs = 3000) {
  const until = Date.now() + durationMs;
  enemies.forEach(e => {
    e.state = 'frozen';
    e.frozenUntil = until;
  });
}

/**
 * Apply SPEEDUP effect to all enemies in array
 */
export function speedupAllEnemies(enemies, durationMs = 5000) {
  const until = Date.now() + durationMs;
  enemies.forEach(e => {
    e.state = 'speedup';
    e.speedupUntil = until;
  });
}

// ─── ENEMY RENDERING COMPONENT ────────────────────────────────────────────────

/**
 * EnemySprite — renders a single enemy at its current position with state visuals
 *
 * @param {{ enemy: Object }} props
 */
export function EnemySprite({ enemy }) {
  const cfg = ENEMY_TYPES[enemy.type] || ENEMY_TYPES.zombie;

  const stateClass = enemy.state === 'frozen'
    ? 'enemy-frozen'
    : enemy.state === 'speedup'
    ? 'enemy-speedup'
    : 'enemy-patrol';

  return (
    <div
      className={`enemy-sprite enemy-${enemy.type} ${stateClass}`}
      style={{
        left: enemy.x,
        top:  enemy.y,
        width:  enemy.width,
        height: enemy.height,
        transform: enemy.facingRight ? 'scaleX(1)' : 'scaleX(-1)',
      }}
      aria-hidden="true"
    >
      <span className="enemy-emoji">{cfg.emoji}</span>

      {/* State indicators */}
      {enemy.state === 'frozen'  && <span className="enemy-state-badge">❄️</span>}
      {enemy.state === 'speedup' && <span className="enemy-state-badge">💨</span>}

      {/* Shadow */}
      <div className="enemy-shadow" />
    </div>
  );
}

/**
 * EnemyLayer — renders all enemies for a dungeon room
 *
 * @param {{ enemies: Array }} props
 */
export default function EnemyLayer({ enemies = [] }) {
  return (
    <>
      {enemies.map(enemy => (
        <EnemySprite key={enemy.id} enemy={enemy} />
      ))}
    </>
  );
}

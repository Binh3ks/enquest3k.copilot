/**
 * HubScene.js — Chronicles Hub World Exploration Scene
 * 
 * Spec v4.0 & Plan v4.1 (QĐ-2):
 * - Sprite-grid pure code (KHÔNG dùng make.tilemap() hay Tiled JSON)
 * - Static physics group for boundary walls and dividers
 * - Tap-to-move pointer pathfinding / velocity movement
 * - Door portals with overlap detection & React event bridge emission
 * - Smooth camera follow with world clamping
 */

import defaultLayout from '../../data/chronicles/hubLayouts/chapter3_layout.json';

export default class HubScene {
  constructor() {
    this.layout = defaultLayout;
    this.targetPos = null;
    this.lastTriggeredDoor = null;
    this.moveSpeed = 220; // pixels per second
  }

  init(data) {
    if (data?.layout) {
      this.layout = data.layout;
    }
    this.hubData = data || {};
  }

  preload() {
    // All textures generated procedurally — no dependency on external PNG files.
    const gfx = this.make.graphics({ x: 0, y: 0, add: false });

    // ── Floor Tile (64×64) ─────────────────────────────────────────────────
    gfx.clear();
    gfx.fillStyle(0x1e293b); gfx.fillRect(0, 0, 64, 64);
    gfx.lineStyle(1, 0x334155, 0.8);
    gfx.strokeRect(0, 0, 64, 64);
    // Subtle cross-hatch accent
    gfx.lineStyle(1, 0x38bdf8, 0.06);
    gfx.lineBetween(0, 0, 64, 64);
    gfx.lineBetween(64, 0, 0, 64);
    gfx.generateTexture('floor_tile', 64, 64);

    // ── Wall Tile (64×64) ──────────────────────────────────────────────────
    gfx.clear();
    gfx.fillStyle(0x0f172a); gfx.fillRect(0, 0, 64, 64);
    gfx.lineStyle(2, 0x6366f1, 0.5); gfx.strokeRect(2, 2, 60, 60);
    gfx.fillStyle(0x312e81, 0.4); gfx.fillRect(8, 8, 48, 48);
    gfx.generateTexture('wall_tile', 64, 64);

    // ── Player Sprite (48×48) ─────────────────────────────────────────────
    gfx.clear();
    // Shadow
    gfx.fillStyle(0x000000, 0.4); gfx.fillEllipse(24, 40, 36, 10);
    // Body
    gfx.fillStyle(0x7c3aed); gfx.fillRoundedRect(12, 8, 24, 30, 8);
    // Head
    gfx.fillStyle(0xfbbf24); gfx.fillCircle(24, 10, 10);
    // Eyes
    gfx.fillStyle(0x1e293b); gfx.fillCircle(20, 9, 2.5); gfx.fillCircle(28, 9, 2.5);
    // Legs
    gfx.fillStyle(0x4c1d95);
    gfx.fillRoundedRect(13, 36, 9, 10, 3);
    gfx.fillRoundedRect(26, 36, 9, 10, 3);
    gfx.generateTexture('player', 48, 48);

    // ── Door / Chamber Portal (80×80) ─────────────────────────────────────
    gfx.clear();
    // Outer glow
    gfx.fillStyle(0x4f46e5, 0.3); gfx.fillCircle(40, 40, 40);
    // Door frame
    gfx.fillStyle(0x1e1b4b); gfx.fillRoundedRect(8, 8, 64, 64, 10);
    gfx.lineStyle(3, 0x818cf8, 1); gfx.strokeRoundedRect(8, 8, 64, 64, 10);
    // Inner portal glow
    gfx.fillStyle(0x312e81, 0.9); gfx.fillRoundedRect(14, 14, 52, 52, 8);
    gfx.fillStyle(0x6366f1, 0.5); gfx.fillCircle(40, 40, 20);
    gfx.fillStyle(0xa5b4fc, 0.7); gfx.fillCircle(40, 40, 10);
    gfx.generateTexture('door_chamber', 80, 80);

    gfx.destroy();
  }

  create() {
    const { bounds, walls, doors, spawn } = this.layout;

    // 1. World Physics Bounds
    this.physics.world.setBounds(0, 0, bounds.width, bounds.height);

    // 2. Ground TileSprite
    this.ground = this.add.tileSprite(0, 0, bounds.width, bounds.height, 'floor_tile').setOrigin(0);

    // Subtle decorative grid accent lines
    const grid = this.add.grid(
      bounds.width / 2,
      bounds.height / 2,
      bounds.width,
      bounds.height,
      120,
      120,
      0x000000,
      0,
      0x38bdf8,
      0.08
    );

    // 3. Static Physics Group: Walls & Dividers
    this.wallGroup = this.physics.add.staticGroup();
    if (Array.isArray(walls)) {
      walls.forEach((w) => {
        const wall = this.wallGroup.create(w.x, w.y, 'wall_tile');
        wall.setDisplaySize(w.w, w.h).refreshBody();
      });
    }

    // 4. Doors & Chamber Portals
    this.doorGroup = this.physics.add.staticGroup();
    if (Array.isArray(doors)) {
      doors.forEach((d) => {
        const door = this.doorGroup.create(d.x, d.y, 'door_chamber');
        door.doorData = d;
        door.setDisplaySize(64, 64).refreshBody();

        // Pulsing portal animation
        this.tweens.add({
          targets: door,
          alpha: { from: 0.85, to: 1.0 },
          scaleX: { from: 1.0, to: 1.05 },
          scaleY: { from: 1.0, to: 1.05 },
          yoyo: true,
          repeat: -1,
          duration: 1200,
          ease: 'Sine.easeInOut',
        });

        // Floating Title Label
        this.add.text(d.x, d.y - 48, d.name, {
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '13px',
          fontStyle: 'bold',
          color: d.isBoss ? '#fbbf24' : '#38bdf8',
          stroke: '#0f172a',
          strokeThickness: 3,
        }).setOrigin(0.5);

        // Subtitle / PP Requirement
        const sub = d.subtitle || (d.requiredPP > 0 ? `${d.requiredPP} PP required` : 'Unlocked');
        this.add.text(d.x, d.y + 44, sub, {
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '10px',
          color: '#94a3b8',
          stroke: '#0f172a',
          strokeThickness: 2,
        }).setOrigin(0.5);
      });
    }

    // 5. Player Sprite
    const spawnX = spawn?.x || 200;
    const spawnY = spawn?.y || 400;
    this.player = this.physics.add.sprite(spawnX, spawnY, 'player');
    this.player.setDisplaySize(44, 44);
    this.player.setCollideWorldBounds(true);

    // Collide with boundary walls
    this.physics.add.collider(this.player, this.wallGroup);

    // Door Overlap detection
    this.physics.add.overlap(this.player, this.doorGroup, (player, doorObj) => {
      const d = doorObj.doorData;
      if (d && this.lastTriggeredDoor !== d.id) {
        this.lastTriggeredDoor = d.id;
        // Emit bridge event to React
        this.events.emit('bridge:event', 'door_enter', d);
      }
    });

    // 6. Camera Follow
    this.cameras.main.setBounds(0, 0, bounds.width, bounds.height);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setZoom(1.0);

    // 7. Tap-to-Move Pointer Input
    this.input.on('pointerdown', (pointer) => {
      this.targetPos = { x: pointer.worldX, y: pointer.worldY };

      // Tap marker effect
      const tapCircle = this.add.circle(pointer.worldX, pointer.worldY, 6, 0x6366f1, 0.7);
      this.tweens.add({
        targets: tapCircle,
        radius: 20,
        alpha: 0,
        duration: 350,
        onComplete: () => tapCircle.destroy(),
      });
    });
  }

  update() {
    if (!this.player || !this.player.body) return;

    if (this.targetPos) {
      const dx = this.targetPos.x - this.player.x;
      const dy = this.targetPos.y - this.player.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 6) {
        this.player.setVelocity(0, 0);
        this.targetPos = null;
      } else {
        const angle = Math.atan2(dy, dx);
        this.player.setVelocity(
          Math.cos(angle) * this.moveSpeed,
          Math.sin(angle) * this.moveSpeed
        );
      }
    } else {
      this.player.setVelocity(0, 0);
    }

    // Reset lastTriggeredDoor when moving away from doors
    if (this.lastTriggeredDoor) {
      let isNearAny = false;
      this.doorGroup.getChildren().forEach((door) => {
        const d = Math.hypot(this.player.x - door.x, this.player.y - door.y);
        if (d < 70) isNearAny = true;
      });
      if (!isNearAny) {
        this.lastTriggeredDoor = null;
      }
    }
  }
}

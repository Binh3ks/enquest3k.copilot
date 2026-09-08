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
    this.load.image('floor_tile', '/phaser-assets/floor_tile.png');
    this.load.image('wall_tile', '/phaser-assets/wall_tile.png');
    this.load.image('player', '/phaser-assets/player.png');
    this.load.image('door_chamber', '/phaser-assets/door_chamber.png');
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

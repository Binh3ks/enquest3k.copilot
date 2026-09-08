/**
 * HubScene.js — Chronicles 2D RPG Grand Citadel Hall
 * 
 * Spec v5.0:
 * - Single-Screen Grand Citadel Hall (800×500) — no awkward camera drift
 * - 4-Direction animated hero walk/run cycles via TexturePacker atlas
 * - Rich castle architecture: stone tile floor, velvet royal carpet, flickering torches, and stone arches
 * - 5 Chamber Portals + 1 Boss Chamber with live star ratings & lock states
 * - Dual Input: Tap-to-move target pathing + WASD/Arrow keys
 * - Depth-sorted RPG rendering with proximity interaction prompts
 */

import { CHAMBER_METADATA } from '../../stores/useChroniclesStore';

export default class HubScene {
  constructor() {
    this.targetPos = null;
    this.lastTriggeredDoor = null;
    this.moveSpeed = 190;
    this.facing = 'down';
    this.nearbyDoor = null;
  }

  init(data) {
    this.hubData = data || {};
    this.weekNumber = data?.weekNumber || 33;
    this.weeklyPP = data?.weeklyPP || 0;
    this.bossTier = data?.bossTier || 'none';
    this.isBossDefeated = data?.isBossDefeated || false;
    this.roomStatuses = data?.roomStatuses || [];
  }

  preload() {
    // 1. Load real 2D RPG hero character atlas (Fauna from 0x72 Dungeon II)
    this.load.atlas('player_hero', '/phaser-assets/rpg/fauna.png', '/phaser-assets/rpg/fauna.json');

    // 2. Generate procedural high-detail textures for castle environment
    const gfx = this.make.graphics({ x: 0, y: 0, add: false });

    // ── Stone Floor Tile (64×64) ──────────────────────────────────────────
    gfx.clear();
    gfx.fillStyle(0x0f172a); gfx.fillRect(0, 0, 64, 64);
    // Masonry stone lines
    gfx.lineStyle(1, 0x1e293b, 0.9);
    gfx.strokeRect(0, 0, 64, 64);
    gfx.lineBetween(0, 32, 64, 32);
    gfx.lineBetween(32, 0, 32, 32);
    gfx.lineBetween(16, 32, 16, 64);
    gfx.lineBetween(48, 32, 48, 64);
    // Subtle stone texture flecks
    gfx.fillStyle(0x334155, 0.35);
    gfx.fillRect(4, 4, 24, 10);
    gfx.fillRect(36, 18, 24, 10);
    gfx.fillRect(8, 42, 36, 14);
    gfx.generateTexture('citadel_floor', 64, 64);

    // ── Castle Battlement Wall (64×64) ─────────────────────────────────────
    gfx.clear();
    gfx.fillStyle(0x020617); gfx.fillRect(0, 0, 64, 64);
    gfx.fillStyle(0x1e1b4b, 0.6); gfx.fillRect(2, 2, 60, 60);
    gfx.lineStyle(2, 0x4338ca, 0.5); gfx.strokeRect(2, 2, 60, 60);
    // Top stone bevel
    gfx.fillStyle(0x312e81, 0.8); gfx.fillRect(4, 4, 56, 12);
    gfx.generateTexture('citadel_wall', 64, 64);

    // ── Royal Velvet Carpet (64×64) ────────────────────────────────────────
    gfx.clear();
    gfx.fillStyle(0x881337); gfx.fillRect(0, 0, 64, 64);
    // Gold embroidery border on left and right
    gfx.fillStyle(0xf59e0b);
    gfx.fillRect(0, 0, 4, 64);
    gfx.fillRect(60, 0, 4, 64);
    gfx.lineStyle(1, 0xfde047, 0.7);
    gfx.strokeRect(4, 4, 56, 56);
    gfx.generateTexture('royal_carpet', 64, 64);

    // ── Portal Arched Door Frame (72×80) ──────────────────────────────────
    gfx.clear();
    // Outer stone arch
    gfx.fillStyle(0x1e1b4b); gfx.fillRoundedRect(4, 4, 64, 72, 12);
    gfx.lineStyle(2, 0x6366f1, 0.8); gfx.strokeRoundedRect(4, 4, 64, 72, 12);
    // Inner wooden door panels
    gfx.fillStyle(0x312e81); gfx.fillRoundedRect(10, 10, 52, 62, 8);
    // Door slats & iron studs
    gfx.lineStyle(1, 0x4f46e5, 0.6);
    gfx.lineBetween(10, 30, 62, 30);
    gfx.lineBetween(10, 50, 62, 50);
    gfx.lineBetween(36, 10, 36, 72);
    // Center glowing rune
    gfx.fillStyle(0x38bdf8, 0.8); gfx.fillCircle(36, 40, 7);
    gfx.generateTexture('portal_door', 72, 80);

    // ── Boss Portal Gate (88×96) ──────────────────────────────────────────
    gfx.clear();
    // Outer dark purple aura
    gfx.fillStyle(0x581c87, 0.4); gfx.fillCircle(44, 48, 44);
    // Grand obsidian arch
    gfx.fillStyle(0x1e1b4b); gfx.fillRoundedRect(6, 6, 76, 84, 16);
    gfx.lineStyle(3, 0xa855f7, 0.9); gfx.strokeRoundedRect(6, 6, 76, 84, 16);
    // Portal swirling vortex
    gfx.fillStyle(0x3b0764); gfx.fillRoundedRect(12, 12, 64, 72, 10);
    gfx.fillStyle(0xc084fc, 0.7); gfx.fillCircle(44, 48, 16);
    gfx.fillStyle(0xf3e8ff, 0.9); gfx.fillCircle(44, 48, 8);
    gfx.generateTexture('boss_portal_gate', 88, 96);

    // ── Wall Torch (16×28) ─────────────────────────────────────────────────
    gfx.clear();
    // Iron sconce bracket
    gfx.fillStyle(0x475569); gfx.fillRect(6, 12, 4, 14);
    gfx.fillRect(4, 24, 8, 4);
    // Flame core
    gfx.fillStyle(0xf97316); gfx.fillCircle(8, 8, 6);
    gfx.fillStyle(0xfef08a); gfx.fillCircle(8, 7, 3);
    gfx.generateTexture('wall_torch', 16, 28);

    gfx.destroy();
  }

  create() {
    const W = 800;
    const H = 500;

    // 1. World Bounds
    this.physics.world.setBounds(0, 0, W, H);

    // 2. Background: Stone Floor Grid
    this.add.tileSprite(0, 0, W, H, 'citadel_floor').setOrigin(0).setDepth(0);

    // 3. Central Royal Red Carpet Runner (from entrance to dais)
    this.add.tileSprite(400, 310, 110, 380, 'royal_carpet').setOrigin(0.5).setDepth(1);

    // 4. Upper Castle Battlement Wall
    this.add.tileSprite(400, 35, W, 70, 'citadel_wall').setOrigin(0.5).setDepth(2);

    // Wall physics boundary
    this.wallGroup = this.physics.add.staticGroup();
    const topWall = this.wallGroup.create(W / 2, 35, 'citadel_wall');
    topWall.setDisplaySize(W, 70).setVisible(false).refreshBody();

    // Side walls boundary
    const leftWall = this.wallGroup.create(10, H / 2, 'citadel_wall');
    leftWall.setDisplaySize(20, H).setVisible(false).refreshBody();
    const rightWall = this.wallGroup.create(W - 10, H / 2, 'citadel_wall');
    rightWall.setDisplaySize(20, H).setVisible(false).refreshBody();

    // 5. Flickering Wall Torches with dynamic light halos
    const torchXPositions = [70, 200, 600, 730];
    torchXPositions.forEach((tx) => {
      // Glow halo
      const halo = this.add.circle(tx, 45, 34, 0xf59e0b, 0.12).setDepth(3);
      this.tweens.add({
        targets: halo,
        alpha: { from: 0.08, to: 0.18 },
        scale: { from: 0.9, to: 1.1 },
        duration: 800 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      // Torch bracket & flame
      const torch = this.add.image(tx, 48, 'wall_torch').setDepth(4);
      this.tweens.add({
        targets: torch,
        scaleY: { from: 0.95, to: 1.05 },
        duration: 350 + Math.random() * 200,
        yoyo: true,
        repeat: -1,
      });
    });

    // 6. Chamber Portals Layout (Amphitheater Citadel Layout)
    this.doorGroup = this.physics.add.staticGroup();
    this.setupPortals(W, H);

    // 7. Animations Setup
    this.createHeroAnimations();

    // 8. Player Character Setup
    this.setupPlayer(W, H);

    // 9. Input & Controls Setup (Touch/Click + Keyboard)
    this.setupControls(W, H);

    // 10. Proximity Tooltip UI
    this.setupTooltip();
  }

  setupPortals(W, H) {
    // 5 Chambers + 1 Boss Portal
    const portalConfigs = [
      { dayIndex: 0, name: 'Chamber of Tales', sub: 'Floor 1 • Story World', x: 130, y: 165, isBoss: false },
      { dayIndex: 1, name: 'Alchemy Lab', sub: 'Floor 2 • Knowledge Lab', x: 265, y: 140, isBoss: false },
      { dayIndex: 2, name: 'Thunder Arena', sub: 'Floor 3 • Battle Arena', x: 535, y: 140, isBoss: false },
      { dayIndex: 3, name: 'Rune Sanctum', sub: 'Floor 4 • Creator Studio', x: 670, y: 165, isBoss: false },
      { dayIndex: 4, name: 'Apex Spire', sub: 'Floor 5 • Boss Castle', x: 400, y: 255, isBoss: false },
      { dayIndex: 5, name: 'Storm Titan Guardian', sub: 'Weekly Boss Battle', x: 400, y: 95, isBoss: true },
    ];

    portalConfigs.forEach((cfg) => {
      const roomStatus = this.roomStatuses.find((r) => r.dayIndex === cfg.dayIndex);
      const isUnlocked = cfg.isBoss
        ? (this.bossTier !== 'none')
        : (roomStatus ? roomStatus.unlocked : (cfg.dayIndex === 0));
      const isCompleted = cfg.isBoss
        ? this.isBossDefeated
        : (roomStatus?.completed || (roomStatus?.stars > 0));
      const stars = roomStatus?.stars || 0;

      const doorKey = cfg.isBoss ? 'boss_portal_gate' : 'portal_door';
      const door = this.doorGroup.create(cfg.x, cfg.y, doorKey);
      door.doorData = {
        ...cfg,
        isUnlocked,
        isCompleted,
        stars,
      };

      if (cfg.isBoss) {
        door.setDisplaySize(80, 88).refreshBody();
        // Pulsing purple aura for boss
        this.tweens.add({
          targets: door,
          alpha: { from: 0.85, to: 1.0 },
          scaleX: { from: 1.0, to: 1.04 },
          scaleY: { from: 1.0, to: 1.04 },
          yoyo: true,
          repeat: -1,
          duration: 1500,
          ease: 'Sine.easeInOut',
        });
      } else {
        door.setDisplaySize(64, 72).refreshBody();
        if (isUnlocked) {
          this.tweens.add({
            targets: door,
            alpha: { from: 0.9, to: 1.0 },
            yoyo: true,
            repeat: -1,
            duration: 1800,
          });
        }
      }

      door.setDepth(10);

      // Door Click Listener: Walk to door and enter
      door.setInteractive({ useHandCursor: true });
      door.on('pointerdown', (pointer) => {
        this.targetPos = { x: cfg.x, y: cfg.y + (cfg.isBoss ? 45 : 35) };
        this.showTapMarker(cfg.x, cfg.y + (cfg.isBoss ? 45 : 35));
      });

      // Top Title Label
      const titleColor = cfg.isBoss ? '#c084fc' : (isUnlocked ? '#38bdf8' : '#64748b');
      this.add.text(cfg.x, cfg.y - (cfg.isBoss ? 52 : 44), cfg.name, {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: cfg.isBoss ? '12px' : '11px',
        fontStyle: 'bold',
        color: titleColor,
        stroke: '#0f172a',
        strokeThickness: 3,
      }).setOrigin(0.5).setDepth(20);

      // Subtitle / Status Badge
      let statusText = '';
      let statusColor = '#94a3b8';
      if (cfg.isBoss) {
        statusText = this.isBossDefeated ? '⚔️ DEFEATED' : (isUnlocked ? '👑 READY' : '🔒 150⚡ needed');
        statusColor = this.isBossDefeated ? '#10b981' : (isUnlocked ? '#fbbf24' : '#ef4444');
      } else if (isCompleted) {
        statusText = `✓ Done ★${stars}/9`;
        statusColor = '#10b981';
      } else if (isUnlocked) {
        statusText = '⚡ Unlocked';
        statusColor = '#fbbf24';
      } else {
        statusText = '🔒 Locked';
        statusColor = '#64748b';
      }

      this.add.text(cfg.x, cfg.y + (cfg.isBoss ? 48 : 42), statusText, {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        color: statusColor,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        padding: { x: 5, y: 2 },
      }).setOrigin(0.5).setDepth(20);
    });
  }

  createHeroAnimations() {
    if (!this.textures.exists('player_hero')) return;

    const anims = this.anims;

    // Run Down (8 frames)
    if (!anims.exists('hero-run-down')) {
      anims.create({
        key: 'hero-run-down',
        frames: anims.generateFrameNames('player_hero', {
          start: 1, end: 8, prefix: 'run-down-', suffix: '.png',
        }),
        frameRate: 12,
        repeat: -1,
      });
    }

    // Run Up (8 frames)
    if (!anims.exists('hero-run-up')) {
      anims.create({
        key: 'hero-run-up',
        frames: anims.generateFrameNames('player_hero', {
          start: 1, end: 8, prefix: 'run-up-', suffix: '.png',
        }),
        frameRate: 12,
        repeat: -1,
      });
    }

    // Run Side (8 frames)
    if (!anims.exists('hero-run-side')) {
      anims.create({
        key: 'hero-run-side',
        frames: anims.generateFrameNames('player_hero', {
          start: 1, end: 8, prefix: 'run-side-', suffix: '.png',
        }),
        frameRate: 12,
        repeat: -1,
      });
    }

    // Idle Down
    if (!anims.exists('hero-idle-down')) {
      anims.create({
        key: 'hero-idle-down',
        frames: [{ key: 'player_hero', frame: 'walk-down-3.png' }],
        frameRate: 1,
      });
    }

    // Idle Up
    if (!anims.exists('hero-idle-up')) {
      anims.create({
        key: 'hero-idle-up',
        frames: [{ key: 'player_hero', frame: 'walk-up-3.png' }],
        frameRate: 1,
      });
    }

    // Idle Side
    if (!anims.exists('hero-idle-side')) {
      anims.create({
        key: 'hero-idle-side',
        frames: [{ key: 'player_hero', frame: 'walk-side-3.png' }],
        frameRate: 1,
      });
    }
  }

  setupPlayer(W, H) {
    const spawnX = 400;
    const spawnY = 410;

    // Shadow underneath
    this.playerShadow = this.add.ellipse(spawnX, spawnY + 16, 24, 8, 0x000000, 0.4).setDepth(29);

    if (this.textures.exists('player_hero')) {
      this.player = this.physics.add.sprite(spawnX, spawnY, 'player_hero', 'walk-down-3.png');
      this.player.setDisplaySize(36, 42);
    } else {
      // Fallback
      this.player = this.physics.add.sprite(spawnX, spawnY, 'player');
      this.player.setDisplaySize(36, 42);
    }

    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(18, 14);
    this.player.body.setOffset(7, 18);
    this.player.setDepth(30);

    // Collide with boundary walls
    this.physics.add.collider(this.player, this.wallGroup);

    // Overlap with doors
    this.physics.add.overlap(this.player, this.doorGroup, (player, doorObj) => {
      const d = doorObj.doorData;
      if (d && d.isUnlocked && this.lastTriggeredDoor !== d.dayIndex) {
        this.lastTriggeredDoor = d.dayIndex;
        this.triggerDoorEnter(d);
      }
    });
  }

  setupControls(W, H) {
    // Keyboard Cursor Keys + WASD
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey('W');
    this.keyA = this.input.keyboard.addKey('A');
    this.keyS = this.input.keyboard.addKey('S');
    this.keyD = this.input.keyboard.addKey('D');
    this.keySpace = this.input.keyboard.addKey('SPACE');

    // Tap-to-Move Pointer
    this.input.on('pointerdown', (pointer) => {
      // Ignore clicks outside canvas bounds
      if (pointer.x < 10 || pointer.x > W - 10 || pointer.y < 70 || pointer.y > H - 10) return;

      this.targetPos = { x: pointer.x, y: pointer.y };
      this.showTapMarker(pointer.x, pointer.y);
    });
  }

  showTapMarker(x, y) {
    const ring = this.add.circle(x, y, 6, 0x38bdf8, 0.8).setDepth(25);
    ring.setStrokeStyle(2, 0x67e8f9);

    this.tweens.add({
      targets: ring,
      radius: 20,
      alpha: 0,
      duration: 400,
      ease: 'Quad.easeOut',
      onComplete: () => ring.destroy(),
    });
  }

  setupTooltip() {
    this.tooltipContainer = this.add.container(400, 360).setDepth(50).setAlpha(0);
    const bg = this.add.rectangle(0, 0, 180, 26, 0x0f172a, 0.9);
    bg.setStrokeStyle(1.5, 0xf59e0b);
    this.tooltipText = this.add.text(0, 0, '⚡ Space / Tap to Enter', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#fbbf24',
    }).setOrigin(0.5);

    this.tooltipContainer.add([bg, this.tooltipText]);
  }

  triggerDoorEnter(doorData) {
    // Trigger visual pulse
    const flash = this.add.rectangle(400, 250, 800, 500, 0xffffff, 0.4).setDepth(999);
    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 300,
      onComplete: () => flash.destroy(),
    });

    // Bridge event to React
    this.events.emit('bridge:event', 'door_enter', doorData);
  }

  update() {
    if (!this.player || !this.player.body) return;

    // Sync shadow with player position
    if (this.playerShadow) {
      this.playerShadow.setPosition(this.player.x, this.player.y + 18);
    }

    let vx = 0;
    let vy = 0;

    // 1. Check Keyboard Input (priority)
    const isLeft = this.cursors.left.isDown || this.keyA.isDown;
    const isRight = this.cursors.right.isDown || this.keyD.isDown;
    const isUp = this.cursors.up.isDown || this.keyW.isDown;
    const isDown = this.cursors.down.isDown || this.keyS.isDown;

    if (isLeft) vx -= this.moveSpeed;
    if (isRight) vx += this.moveSpeed;
    if (isUp) vy -= this.moveSpeed;
    if (isDown) vy += this.moveSpeed;

    if (vx !== 0 || vy !== 0) {
      // Direct keyboard drive cancels tap target
      this.targetPos = null;
    } else if (this.targetPos) {
      // 2. Tap-to-move pathing
      const dx = this.targetPos.x - this.player.x;
      const dy = this.targetPos.y - this.player.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 6) {
        this.targetPos = null;
      } else {
        const angle = Math.atan2(dy, dx);
        vx = Math.cos(angle) * this.moveSpeed;
        vy = Math.sin(angle) * this.moveSpeed;
      }
    }

    // Apply Velocity
    this.player.setVelocity(vx, vy);

    // 3. Animation State Machine
    const isHeroAtlas = this.textures.exists('player_hero');

    if (vx !== 0 || vy !== 0) {
      if (Math.abs(vx) > Math.abs(vy)) {
        this.facing = 'side';
        if (isHeroAtlas) this.player.play('hero-run-side', true);
        this.player.setFlipX(vx < 0);
      } else if (vy > 0) {
        this.facing = 'down';
        if (isHeroAtlas) this.player.play('hero-run-down', true);
        this.player.setFlipX(false);
      } else {
        this.facing = 'up';
        if (isHeroAtlas) this.player.play('hero-run-up', true);
        this.player.setFlipX(false);
      }
    } else {
      // Idle frame matching last facing direction
      if (isHeroAtlas) {
        this.player.play(`hero-idle-${this.facing}`, true);
      }
    }

    // 4. Proximity Check for Tooltip Prompt
    let closestDoor = null;
    let minDist = 75;

    this.doorGroup.getChildren().forEach((doorObj) => {
      const d = Math.hypot(this.player.x - doorObj.x, this.player.y - doorObj.y);
      if (d < minDist) {
        minDist = d;
        closestDoor = doorObj.doorData;
      }
    });

    if (closestDoor && closestDoor.isUnlocked) {
      this.nearbyDoor = closestDoor;
      this.tooltipContainer.setPosition(this.player.x, this.player.y - 34);
      this.tooltipContainer.setAlpha(1);
      this.tooltipText.setText(`⚡ Space / Click: ${closestDoor.name}`);

      // Spacebar hotkey to enter nearby door
      if (this.keySpace.isDown && this.lastTriggeredDoor !== closestDoor.dayIndex) {
        this.lastTriggeredDoor = closestDoor.dayIndex;
        this.triggerDoorEnter(closestDoor);
      }
    } else {
      this.nearbyDoor = null;
      this.tooltipContainer.setAlpha(0);
    }

    // Reset lastTriggeredDoor when moving away
    if (this.lastTriggeredDoor !== null && minDist > 85) {
      this.lastTriggeredDoor = null;
    }
  }
}

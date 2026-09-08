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
    this.isOwnerBypass = data?.isOwnerBypass || false;
    this.roomStatuses = data?.roomStatuses || [];
  }

  preload() {
    // 1. Load real 2D RPG hero character atlas (Fauna from 0x72 Dungeon II)
    this.load.atlas('player_hero', '/phaser-assets/rpg/fauna.png', '/phaser-assets/rpg/fauna.json');

    // 2. Generate high-contrast, rich procedural textures for Citadel Hall environment
    const gfx = this.make.graphics({ x: 0, y: 0, add: false });

    // ── Citadel Stone Floor (128×128) ──────────────────────────────────────
    gfx.clear();
    // Base stone mortar
    gfx.fillStyle(0x161e2e); gfx.fillRect(0, 0, 128, 128);

    // 4 large flagstones per tile with distinct bevels and realistic stone texture
    const flagstones = [
      { x: 3, y: 3, w: 58, h: 58, c: 0x243048 },
      { x: 67, y: 3, w: 58, h: 58, c: 0x293752 },
      { x: 3, y: 67, w: 58, h: 58, c: 0x2a3955 },
      { x: 67, y: 67, w: 58, h: 58, c: 0x243048 },
    ];

    flagstones.forEach((f) => {
      // Main stone body
      gfx.fillStyle(f.c); gfx.fillRect(f.x, f.y, f.w, f.h);
      // Top and left light bevel highlight
      gfx.lineStyle(2, 0x4a5d7c, 0.85);
      gfx.lineBetween(f.x, f.y, f.x + f.w, f.y);
      gfx.lineBetween(f.x, f.y, f.x, f.y + f.h);
      // Bottom and right shadow bevel
      gfx.lineStyle(2, 0x101724, 0.9);
      gfx.lineBetween(f.x, f.y + f.h, f.x + f.w, f.y + f.h);
      gfx.lineBetween(f.x + f.w, f.y, f.x + f.w, f.y + f.h);
      // Natural stone flecks / grain
      gfx.fillStyle(0x3e4f6d, 0.35);
      gfx.fillRect(f.x + 8, f.y + 8, f.w - 24, 8);
      gfx.fillRect(f.x + 16, f.y + 24, f.w - 24, 12);
      gfx.fillRect(f.x + 10, f.y + 42, f.w - 20, 8);
    });
    gfx.generateTexture('citadel_floor', 128, 128);

    // ── Royal Velvet Carpet (160×64) ────────────────────────────────────────
    gfx.clear();
    // Velvet crimson runner base
    gfx.fillStyle(0xb91c1c); gfx.fillRect(0, 0, 160, 64);
    // Subtle velvet weave shading
    gfx.fillStyle(0xdc2626, 0.3);
    for (let i = 0; i < 64; i += 8) {
      gfx.fillRect(16, i, 128, 4);
    }
    // Deep red shadow under gold trim
    gfx.fillStyle(0x7f1d1d);
    gfx.fillRect(0, 0, 4, 64);
    gfx.fillRect(156, 0, 4, 64);

    // Left & Right Thick Gold Embroidered Borders (12px wide on each side)
    gfx.fillStyle(0xf59e0b);
    gfx.fillRect(4, 0, 10, 64);
    gfx.fillRect(146, 0, 10, 64);
    // Inner bright yellow-gold piping
    gfx.fillStyle(0xfde047);
    gfx.fillRect(14, 0, 2, 64);
    gfx.fillRect(144, 0, 2, 64);
    // Outer rope-stitch dash details
    gfx.fillStyle(0xfef08a);
    for (let y = 2; y < 64; y += 8) {
      gfx.fillRect(7, y, 4, 4);
      gfx.fillRect(149, y, 4, 4);
    }

    // Center gold diamond lattice embroidery
    gfx.lineStyle(1.5, 0xfbbf24, 0.55);
    for (let cy = 0; cy < 64; cy += 32) {
      gfx.strokeCircle(80, cy + 16, 10);
      gfx.lineBetween(80, cy + 4, 94, cy + 16);
      gfx.lineBetween(94, cy + 16, 80, cy + 28);
      gfx.lineBetween(80, cy + 28, 66, cy + 16);
      gfx.lineBetween(66, cy + 16, 80, cy + 4);
    }
    gfx.generateTexture('royal_carpet', 160, 64);

    // ── Castle Battlement Wall (128×90) ─────────────────────────────────────
    gfx.clear();
    // Deep masonry base
    gfx.fillStyle(0x161e2e); gfx.fillRect(0, 0, 128, 90);
    // 3 Rows of ashlar castle stone blocks
    const wallRows = [
      { y: 0, h: 26 },
      { y: 28, h: 28 },
      { y: 58, h: 26 },
    ];
    wallRows.forEach((r, rIdx) => {
      const offset = (rIdx % 2 === 0) ? 0 : 32;
      for (let x = -32 + offset; x < 128; x += 64) {
        gfx.fillStyle(0x273449); gfx.fillRect(x + 2, r.y + 2, 60, r.h - 4);
        // Top/left highlight
        gfx.lineStyle(1.5, 0x4a5d7c, 0.7);
        gfx.lineBetween(x + 2, r.y + 2, x + 62, r.y + 2);
        gfx.lineBetween(x + 2, r.y + 2, x + 2, r.y + r.h - 2);
        // Bottom/right shadow
        gfx.lineStyle(1.5, 0x0f1422, 0.9);
        gfx.lineBetween(x + 2, r.y + r.h - 2, x + 62, r.y + r.h - 2);
        gfx.lineBetween(x + 62, r.y + 2, x + 62, r.y + r.h - 2);
      }
    });
    // Bottom carved stone plinth cornice (y: 84 - 90)
    gfx.fillStyle(0x334155); gfx.fillRect(0, 84, 128, 6);
    gfx.lineStyle(1.5, 0x64748b, 0.9); gfx.lineBetween(0, 84, 128, 84);
    gfx.lineStyle(1.5, 0x0f172a, 0.9); gfx.lineBetween(0, 90, 128, 90);
    gfx.generateTexture('citadel_wall', 128, 90);

    // ── Gothic Castle Arched Window (44×66) ────────────────────────────────
    gfx.clear();
    // Stone outer arch frame
    gfx.fillStyle(0x1e293b); gfx.fillRoundedRect(0, 0, 44, 66, 12);
    gfx.lineStyle(2, 0x475569, 0.9); gfx.strokeRoundedRect(0, 0, 44, 66, 12);
    // Deep starry night sky inside
    gfx.fillStyle(0x060b18); gfx.fillRoundedRect(4, 4, 36, 58, 8);
    // Twinkling stars
    gfx.fillStyle(0xffffff);
    gfx.fillCircle(12, 16, 1.5);
    gfx.fillCircle(28, 22, 1.5);
    gfx.fillCircle(18, 38, 1);
    gfx.fillCircle(30, 46, 1.5);
    // Golden crescent moon
    gfx.fillStyle(0xfde047); gfx.fillCircle(24, 14, 5);
    gfx.fillStyle(0x060b18); gfx.fillCircle(22, 13, 4.5);
    // Stone window mullion cross
    gfx.lineStyle(2, 0x334155, 0.9);
    gfx.lineBetween(22, 4, 22, 62);
    gfx.lineBetween(4, 32, 40, 32);
    gfx.generateTexture('castle_window', 44, 66);

    // ── Heavy Wrought-Iron Wall Torch (30×54) ──────────────────────────────
    gfx.clear();
    // Iron wall mounting plate with rivet bolts
    gfx.fillStyle(0x1e293b); gfx.fillRect(10, 20, 10, 28);
    gfx.fillStyle(0x94a3b8);
    gfx.fillCircle(12, 23, 1.5);
    gfx.fillCircle(18, 23, 1.5);
    gfx.fillCircle(12, 45, 1.5);
    gfx.fillCircle(18, 45, 1.5);
    // Curving wrought-iron sconce arm
    gfx.lineStyle(3, 0x334155, 1);
    gfx.lineBetween(15, 34, 15, 22);
    // Flared bronze/iron torch brazier bowl
    gfx.fillStyle(0xd97706); gfx.fillTriangle(4, 18, 26, 18, 15, 26);
    gfx.lineStyle(1.5, 0xfbbf24, 0.8); gfx.strokeTriangle(4, 18, 26, 18, 15, 26);
    // Wooden torch stave
    gfx.fillStyle(0x451a03); gfx.fillRect(13, 14, 4, 10);
    // Multi-layer blazing flame
    gfx.fillStyle(0xdc2626); gfx.fillEllipse(15, 10, 10, 14);
    gfx.fillStyle(0xf97316); gfx.fillEllipse(15, 9, 7, 10);
    gfx.fillStyle(0xfef08a); gfx.fillEllipse(15, 8, 4, 6);
    gfx.generateTexture('wall_torch', 30, 54);

    // ── Stone Header Nameplate Plaque (100×24) ────────────────────────────
    gfx.clear();
    gfx.fillStyle(0x1e293b); gfx.fillRoundedRect(0, 0, 100, 24, 6);
    gfx.lineStyle(2, 0x64748b, 0.9); gfx.strokeRoundedRect(0, 0, 100, 24, 6);
    gfx.lineStyle(1, 0x94a3b8, 0.7); gfx.lineBetween(3, 3, 97, 3);
    gfx.fillStyle(0xf59e0b);
    gfx.fillCircle(6, 6, 2);
    gfx.fillCircle(94, 6, 2);
    gfx.fillCircle(6, 18, 2);
    gfx.fillCircle(94, 18, 2);
    gfx.generateTexture('portal_stone_plaque', 100, 24);

    // ── Unlocked Portal: Grand Stone Arch & Cosmic Vortex (96×112) ────────
    gfx.clear();
    // 1. Stone Step Pedestal Base
    gfx.fillStyle(0x1e293b); gfx.fillRoundedRect(2, 98, 92, 14, 4);
    gfx.fillStyle(0x334155); gfx.fillRoundedRect(6, 94, 84, 8, 3);
    gfx.lineStyle(1.5, 0x64748b, 0.8); gfx.strokeRoundedRect(6, 94, 84, 8, 3);

    // 2. Heavy Carved Stone Pillars
    gfx.fillStyle(0x273449); gfx.fillRect(6, 28, 18, 68);
    gfx.lineStyle(1.5, 0x4a5d7c, 0.9);
    gfx.lineBetween(6, 28, 6, 96);
    gfx.lineStyle(1.5, 0x0f172a, 0.9);
    gfx.lineBetween(24, 28, 24, 96);
    gfx.fillStyle(0x3e4f6d); gfx.fillRect(4, 24, 22, 6);
    gfx.fillRect(4, 90, 22, 6);

    gfx.fillStyle(0x273449); gfx.fillRect(72, 28, 18, 68);
    gfx.lineStyle(1.5, 0x4a5d7c, 0.9);
    gfx.lineBetween(72, 28, 72, 96);
    gfx.lineStyle(1.5, 0x0f172a, 0.9);
    gfx.lineBetween(90, 28, 90, 96);
    gfx.fillStyle(0x3e4f6d); gfx.fillRect(70, 24, 22, 6);
    gfx.fillRect(70, 90, 22, 6);

    // 3. Heavy Stone Arch Ring (Top)
    gfx.fillStyle(0x273449); gfx.fillRoundedRect(6, 6, 84, 40, 20);
    gfx.lineStyle(3, 0x4a5d7c, 0.9); gfx.strokeRoundedRect(6, 6, 84, 40, 20);
    // Keystone at arch peak
    gfx.fillStyle(0x4a5d7c); gfx.fillRect(41, 2, 14, 12);
    gfx.lineStyle(1.5, 0x94a3b8, 0.9); gfx.strokeRect(41, 2, 14, 12);
    // Carved glowing cyan rune in keystone
    gfx.fillStyle(0x38bdf8); gfx.fillCircle(48, 8, 3);

    // 4. Portal Interior: Swirling Cosmic Energy Vortex
    gfx.fillStyle(0x02162e); gfx.fillRoundedRect(22, 22, 52, 74, 14);
    gfx.fillStyle(0x0369a1); gfx.fillEllipse(48, 58, 44, 60);
    gfx.fillStyle(0x0284c7); gfx.fillEllipse(48, 58, 34, 48);
    gfx.fillStyle(0x38bdf8); gfx.fillEllipse(48, 58, 22, 34);
    gfx.fillStyle(0xbae6fd); gfx.fillEllipse(48, 58, 12, 20);
    gfx.fillStyle(0xffffff); gfx.fillEllipse(48, 58, 5, 8);
    // Floating magical sparks
    gfx.fillStyle(0xfef08a);
    gfx.fillCircle(36, 44, 2);
    gfx.fillCircle(60, 48, 2);
    gfx.fillCircle(42, 74, 2);
    gfx.fillCircle(54, 70, 2);
    gfx.generateTexture('portal_door_unlocked', 96, 112);

    // ── Locked Portal: Carved Stone Arch & Iron-Bound Oak Gate (96×112) ───
    gfx.clear();
    // 1. Stone Step Pedestal Base
    gfx.fillStyle(0x1e293b); gfx.fillRoundedRect(2, 98, 92, 14, 4);
    gfx.fillStyle(0x334155); gfx.fillRoundedRect(6, 94, 84, 8, 3);
    gfx.lineStyle(1.5, 0x64748b, 0.8); gfx.strokeRoundedRect(6, 94, 84, 8, 3);

    // 2. Heavy Carved Stone Pillars
    gfx.fillStyle(0x273449); gfx.fillRect(6, 28, 18, 68);
    gfx.lineStyle(1.5, 0x4a5d7c, 0.9);
    gfx.lineBetween(6, 28, 6, 96);
    gfx.lineStyle(1.5, 0x0f172a, 0.9);
    gfx.lineBetween(24, 28, 24, 96);
    gfx.fillStyle(0x3e4f6d); gfx.fillRect(4, 24, 22, 6);
    gfx.fillRect(4, 90, 22, 6);

    gfx.fillStyle(0x273449); gfx.fillRect(72, 28, 18, 68);
    gfx.lineStyle(1.5, 0x4a5d7c, 0.9);
    gfx.lineBetween(72, 28, 72, 96);
    gfx.lineStyle(1.5, 0x0f172a, 0.9);
    gfx.lineBetween(90, 28, 90, 96);
    gfx.fillStyle(0x3e4f6d); gfx.fillRect(70, 24, 22, 6);
    gfx.fillRect(70, 90, 22, 6);

    // 3. Heavy Stone Arch Ring
    gfx.fillStyle(0x273449); gfx.fillRoundedRect(6, 6, 84, 40, 20);
    gfx.lineStyle(3, 0x4a5d7c, 0.9); gfx.strokeRoundedRect(6, 6, 84, 40, 20);
    gfx.fillStyle(0x4a5d7c); gfx.fillRect(41, 2, 14, 12);
    gfx.lineStyle(1.5, 0x94a3b8, 0.9); gfx.strokeRect(41, 2, 14, 12);

    // 4. Heavy Rustic Oak Timber Double Doors
    gfx.fillStyle(0x451a03); gfx.fillRoundedRect(22, 22, 52, 74, 12);
    gfx.lineStyle(1.5, 0x270e02, 0.9);
    gfx.lineBetween(48, 22, 48, 96);
    gfx.lineBetween(35, 26, 35, 96);
    gfx.lineBetween(61, 26, 61, 96);

    // 3 Heavy Wrought-Iron Hinge Straps with Rivet Studs
    const ironBands = [36, 56, 78];
    ironBands.forEach((by) => {
      gfx.fillStyle(0x1e293b); gfx.fillRect(22, by, 52, 6);
      gfx.lineStyle(1, 0x475569, 0.8); gfx.strokeRect(22, by, 52, 6);
      gfx.fillStyle(0x94a3b8);
      gfx.fillCircle(26, by + 3, 1.5);
      gfx.fillCircle(38, by + 3, 1.5);
      gfx.fillCircle(58, by + 3, 1.5);
      gfx.fillCircle(70, by + 3, 1.5);
    });

    // Crossed heavy iron chains
    gfx.lineStyle(2.5, 0x475569, 0.95);
    gfx.lineBetween(26, 42, 70, 72);
    gfx.lineBetween(26, 72, 70, 42);

    // Massive Golden Padlock
    gfx.lineStyle(3, 0x94a3b8, 1);
    gfx.strokeCircle(48, 52, 6);
    gfx.fillStyle(0xf59e0b); gfx.fillRoundedRect(42, 54, 12, 11, 2);
    gfx.lineStyle(1, 0xfde047, 0.9); gfx.strokeRoundedRect(42, 54, 12, 11, 2);
    gfx.fillStyle(0x451a03);
    gfx.fillCircle(48, 58, 1.5);
    gfx.fillRect(47, 58, 2, 4);

    gfx.generateTexture('portal_door_locked', 96, 112);

    // ── Boss Portal: Gargoyle Obsidian Arch & Lightning Void (124×136) ─────
    gfx.clear();
    // 1. Broad Obsidian Plinth Base
    gfx.fillStyle(0x0f172a); gfx.fillRoundedRect(2, 120, 120, 16, 4);
    gfx.fillStyle(0x1e1b4b); gfx.fillRoundedRect(6, 114, 112, 10, 3);
    gfx.lineStyle(2, 0x7c3aed, 0.8); gfx.strokeRoundedRect(6, 114, 112, 10, 3);

    // 2. Gargoyle Obsidian Horns
    gfx.fillStyle(0x1e1b4b);
    gfx.fillTriangle(14, 26, 4, 4, 30, 18);
    gfx.fillTriangle(110, 26, 120, 4, 94, 18);

    // 3. Obsidian Pillars
    gfx.fillStyle(0x1e1b4b); gfx.fillRect(8, 26, 24, 90);
    gfx.lineStyle(2, 0x6366f1, 0.7);
    gfx.lineBetween(8, 26, 8, 116);
    gfx.lineBetween(32, 26, 32, 116);
    gfx.fillStyle(0x312e81); gfx.fillRect(6, 20, 28, 8);
    gfx.fillRect(6, 108, 28, 8);

    gfx.fillStyle(0x1e1b4b); gfx.fillRect(92, 26, 24, 90);
    gfx.lineStyle(2, 0x6366f1, 0.7);
    gfx.lineBetween(92, 26, 92, 116);
    gfx.lineBetween(116, 26, 116, 116);
    gfx.fillStyle(0x312e81); gfx.fillRect(90, 20, 28, 8);
    gfx.fillRect(90, 108, 28, 8);

    // 4. Grand Arch Top
    gfx.fillStyle(0x1e1b4b); gfx.fillRoundedRect(8, 6, 108, 50, 24);
    gfx.lineStyle(3.5, 0xa855f7, 0.95); gfx.strokeRoundedRect(8, 6, 108, 50, 24);
    gfx.fillStyle(0x4c1d95); gfx.fillRect(52, 2, 20, 14);
    gfx.lineStyle(2, 0xc084fc, 0.9); gfx.strokeRect(52, 2, 20, 14);
    gfx.fillStyle(0xfde047); gfx.fillCircle(62, 9, 4);

    // 5. Dark Purple Storm Vortex
    gfx.fillStyle(0x1e0038); gfx.fillRoundedRect(28, 22, 68, 94, 16);
    gfx.fillStyle(0x3b0764); gfx.fillEllipse(62, 66, 60, 80);
    gfx.fillStyle(0x6b21a8); gfx.fillEllipse(62, 66, 44, 60);
    gfx.fillStyle(0xa855f7); gfx.fillEllipse(62, 66, 28, 40);
    gfx.fillStyle(0xe9d5ff); gfx.fillEllipse(62, 66, 14, 20);
    gfx.fillStyle(0xffffff); gfx.fillEllipse(62, 66, 6, 10);
    // Crackling purple lightning runes
    gfx.lineStyle(2, 0xf3e8ff, 0.9);
    gfx.lineBetween(48, 48, 54, 58);
    gfx.lineBetween(54, 58, 50, 68);
    gfx.lineBetween(74, 52, 68, 64);
    gfx.lineBetween(68, 64, 76, 76);
    gfx.generateTexture('boss_portal_gate', 124, 136);

    gfx.destroy();
  }

  create() {
    const W = 800;
    const H = 500;

    // 1. World Bounds
    this.physics.world.setBounds(0, 0, W, H);

    // 2. Background: High-Contrast Stone Floor Grid (128×128 flagstones)
    this.add.tileSprite(0, 0, W, H, 'citadel_floor').setOrigin(0).setDepth(0);

    // 3. Central Ambient Light Pool (Highlighting center hall & red carpet)
    this.add.ellipse(400, 290, 480, 320, 0xfde047, 0.08).setDepth(1);
    this.add.ellipse(400, 290, 280, 180, 0xffffff, 0.09).setDepth(1);

    // 4. Central Royal Red Velvet Carpet Runner (Width: 160px, running from dais to entrance)
    this.add.tileSprite(400, 310, 160, 390, 'royal_carpet').setOrigin(0.5).setDepth(2);

    // 5. Upper Castle Battlement Wall
    this.add.tileSprite(400, 45, W, 90, 'citadel_wall').setOrigin(0.5).setDepth(3);

    // Gothic Arched Windows on Wall (Left & Right)
    this.add.image(100, 45, 'castle_window').setDepth(4);
    this.add.image(700, 45, 'castle_window').setDepth(4);

    // Wall physics boundary
    this.wallGroup = this.physics.add.staticGroup();
    const topWall = this.wallGroup.create(W / 2, 45, 'citadel_wall');
    topWall.setDisplaySize(W, 90).setVisible(false).refreshBody();

    const leftWall = this.wallGroup.create(10, H / 2, 'citadel_wall');
    leftWall.setDisplaySize(20, H).setVisible(false).refreshBody();
    const rightWall = this.wallGroup.create(W - 10, H / 2, 'citadel_wall');
    rightWall.setDisplaySize(20, H).setVisible(false).refreshBody();

    // 6. Flickering Wall Torches with dynamic light halos (Prominently mounted at y: 78)
    const torchXPositions = [190, 310, 490, 610];
    torchXPositions.forEach((tx) => {
      // Glow halo
      const halo = this.add.circle(tx, 76, 75, 0xf59e0b, 0.22).setDepth(4);
      this.tweens.add({
        targets: halo,
        alpha: { from: 0.16, to: 0.28 },
        scale: { from: 0.92, to: 1.08 },
        duration: 800 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      // Torch bracket & flame
      const torch = this.add.image(tx, 78, 'wall_torch').setDepth(5);
      this.tweens.add({
        targets: torch,
        scaleY: { from: 0.96, to: 1.04 },
        scaleX: { from: 0.98, to: 1.02 },
        duration: 250 + Math.random() * 150,
        yoyo: true,
        repeat: -1,
      });
    });

    // 7. Chamber Portals Layout (Amphitheater Citadel Layout)
    this.doorGroup = this.physics.add.staticGroup();
    this.setupPortals(W, H);

    // 8. Animations Setup
    this.createHeroAnimations();

    // 9. Player Character Setup
    this.setupPlayer(W, H);

    // 10. Input & Controls Setup (Touch/Click + Keyboard)
    this.setupControls(W, H);

    // 11. Proximity Tooltip UI
    this.setupTooltip();
  }

  setupPortals(W, H) {
    // 5 Chambers + 1 Boss Portal
    const portalConfigs = [
      { dayIndex: 0, name: 'Chamber of Tales', sub: 'Floor 1 • Story World', x: 135, y: 195, isBoss: false },
      { dayIndex: 1, name: 'Alchemy Lab', sub: 'Floor 2 • Knowledge Lab', x: 265, y: 160, isBoss: false },
      { dayIndex: 2, name: 'Thunder Arena', sub: 'Floor 3 • Battle Arena', x: 535, y: 160, isBoss: false },
      { dayIndex: 3, name: 'Rune Sanctum', sub: 'Floor 4 • Creator Studio', x: 665, y: 195, isBoss: false },
      { dayIndex: 4, name: 'Apex Spire', sub: 'Floor 5 • Boss Castle', x: 400, y: 260, isBoss: false },
      { dayIndex: 5, name: 'Storm Titan Guardian', sub: 'Weekly Boss Battle', x: 400, y: 95, isBoss: true },
    ];

    portalConfigs.forEach((cfg) => {
      const roomStatus = this.roomStatuses.find((r) => r.dayIndex === cfg.dayIndex);
      const isUnlocked = cfg.isBoss
        ? (this.isOwnerBypass || this.bossTier !== 'none')
        : (this.isOwnerBypass || (roomStatus ? roomStatus.unlocked : (cfg.dayIndex === 0)));
      const isCompleted = cfg.isBoss
        ? this.isBossDefeated
        : (roomStatus?.completed || (roomStatus?.stars > 0));
      const stars = roomStatus?.stars || 0;

      // 1. Ambient Portal Light Aura on floor
      const auraColor = cfg.isBoss ? 0xa855f7 : (isUnlocked ? 0x38bdf8 : 0x334155);
      const auraAlpha = cfg.isBoss ? 0.28 : (isUnlocked ? 0.22 : 0.12);
      const auraWidth = cfg.isBoss ? 130 : 100;
      const auraHeight = cfg.isBoss ? 55 : 42;
      const floorAura = this.add.ellipse(cfg.x, cfg.y + (cfg.isBoss ? 55 : 46), auraWidth, auraHeight, auraColor, auraAlpha).setDepth(2);

      if (isUnlocked || cfg.isBoss) {
        this.tweens.add({
          targets: floorAura,
          alpha: { from: auraAlpha * 0.8, to: auraAlpha * 1.3 },
          scaleX: { from: 0.95, to: 1.05 },
          scaleY: { from: 0.95, to: 1.05 },
          yoyo: true,
          repeat: -1,
          duration: 1600,
          ease: 'Sine.easeInOut',
        });
      }

      // 2. Door Sprite: Real stone arch gate
      const doorKey = cfg.isBoss
        ? 'boss_portal_gate'
        : (isUnlocked ? 'portal_door_unlocked' : 'portal_door_locked');
      const door = this.doorGroup.create(cfg.x, cfg.y, doorKey);
      door.doorData = {
        ...cfg,
        isUnlocked,
        isCompleted,
        stars,
      };

      if (cfg.isBoss) {
        door.setDisplaySize(124, 136).refreshBody();
        // Pulsing purple aura for boss
        this.tweens.add({
          targets: door,
          alpha: { from: 0.9, to: 1.0 },
          scaleX: { from: 1.0, to: 1.03 },
          scaleY: { from: 1.0, to: 1.03 },
          yoyo: true,
          repeat: -1,
          duration: 1500,
          ease: 'Sine.easeInOut',
        });
      } else {
        door.setDisplaySize(96, 112).refreshBody();
        if (isUnlocked) {
          this.tweens.add({
            targets: door,
            alpha: { from: 0.92, to: 1.0 },
            yoyo: true,
            repeat: -1,
            duration: 1800,
          });
        }
      }

      door.setDepth(10);

      // Door Click Listener: Click to enter immediately with visual transition
      door.setInteractive({ useHandCursor: true });
      door.on('pointerdown', (pointer) => {
        if (pointer?.event?.stopPropagation) {
          pointer.event.stopPropagation();
        }
        if (isUnlocked) {
          this.triggerDoorEnter(door.doorData);
        } else {
          // Locked: shake door with padlock rattle
          this.tweens.add({
            targets: door,
            x: cfg.x + 5,
            duration: 60,
            yoyo: true,
            repeat: 3,
            onComplete: () => { door.x = cfg.x; },
          });
        }
      });

      // 3. Top Carved Stone Nameplate Plaque
      const plaqueY = cfg.y - (cfg.isBoss ? 74 : 62);
      this.add.image(cfg.x, plaqueY, 'portal_stone_plaque').setDepth(20).setDisplaySize(cfg.isBoss ? 116 : 96, 22);

      const titleColor = cfg.isBoss ? '#f3e8ff' : (isUnlocked ? '#fef08a' : '#cbd5e1');
      this.add.text(cfg.x, plaqueY, cfg.name, {
        fontFamily: 'Outfit, system-ui, -apple-system, sans-serif',
        fontSize: cfg.isBoss ? '11px' : '10px',
        fontStyle: 'bold',
        color: titleColor,
        stroke: '#090d16',
        strokeThickness: 3,
      }).setOrigin(0.5).setDepth(21);

      // 4. Subtitle / Status Pill Badge
      let statusText = '';
      let statusColor = '#94a3b8';
      let statusBg = 'rgba(15, 23, 42, 0.85)';
      let statusBorder = '#475569';

      if (cfg.isBoss) {
        statusText = this.isBossDefeated ? '⚔️ DEFEATED' : (isUnlocked ? '👑 READY' : '🔒 150⚡ CẦN');
        statusColor = this.isBossDefeated ? '#34d399' : (isUnlocked ? '#fde047' : '#f87171');
        statusBg = this.isBossDefeated ? 'rgba(6, 78, 59, 0.9)' : (isUnlocked ? 'rgba(113, 63, 18, 0.9)' : 'rgba(76, 29, 149, 0.9)');
        statusBorder = this.isBossDefeated ? '#10b981' : (isUnlocked ? '#fbbf24' : '#a855f7');
      } else if (isCompleted) {
        statusText = `✓ XONG ★${stars}/9`;
        statusColor = '#34d399';
        statusBg = 'rgba(6, 78, 59, 0.9)';
        statusBorder = '#10b981';
      } else if (isUnlocked) {
        statusText = '⚡ SẴN SÀNG';
        statusColor = '#38bdf8';
        statusBg = 'rgba(12, 74, 110, 0.9)';
        statusBorder = '#38bdf8';
      } else {
        statusText = '🔒 KHÓA';
        statusColor = '#94a3b8';
        statusBg = 'rgba(30, 41, 59, 0.9)';
        statusBorder = '#475569';
      }

      const statusBadgeY = cfg.y + (cfg.isBoss ? 68 : 58);
      const badgeText = this.add.text(cfg.x, statusBadgeY, statusText, {
        fontFamily: 'Outfit, system-ui, -apple-system, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        color: statusColor,
        stroke: '#090d16',
        strokeThickness: 2,
        backgroundColor: statusBg,
        padding: { x: 7, y: 2 },
      }).setOrigin(0.5).setDepth(21);

      const bounds = badgeText.getBounds();
      const badgeGfx = this.add.graphics().setDepth(20);
      badgeGfx.lineStyle(1.5, Phaser.Display.Color.HexStringToColor(statusBorder).color, 0.9);
      badgeGfx.strokeRoundedRect(bounds.x - 1, bounds.y - 1, bounds.width + 2, bounds.height + 2, 4);
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
    const spawnY = 350;

    // Shadow underneath (scaled to match 62x74 hero)
    this.playerShadow = this.add.ellipse(spawnX, spawnY + 32, 50, 16, 0x000000, 0.45).setDepth(29);

    if (this.textures.exists('player_hero')) {
      this.player = this.physics.add.sprite(spawnX, spawnY, 'player_hero', 'walk-down-3.png');
      this.player.setDisplaySize(62, 74);
    } else {
      // Fallback
      this.player = this.physics.add.sprite(spawnX, spawnY, 'player');
      this.player.setDisplaySize(62, 74);
    }

    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(26, 18);
    this.player.body.setOffset(18, 38);
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
    this.tooltipContainer.setSize(180, 26);
    this.tooltipContainer.setInteractive({ useHandCursor: true });
    this.tooltipContainer.on('pointerdown', () => {
      if (this.nearbyDoor && this.nearbyDoor.isUnlocked) {
        this.triggerDoorEnter(this.nearbyDoor);
      }
    });
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
      this.playerShadow.setPosition(this.player.x, this.player.y + 32);
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

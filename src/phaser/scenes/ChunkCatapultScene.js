/**
 * ChunkCatapultScene.js — Phaser 3 Arcade Gravity Parabola Catapult
 * 
 * Spec v4.0 & Plan v4.1 (Phase 4):
 * - Real physics gravity: physics.world.gravity.y = 300
 * - Kinematic launch: projectile.setVelocity(vx, vy) derived from slingshot drag vector
 * - True parabolic arc trajectory (changing gravity changes flight path)
 * - 3 Target Baskets bearing completion chunk options (1 correct + 2 distractors)
 * - Trajectory trajectory line / dot preview during pull-back
 */

export default class ChunkCatapultScene {
  constructor() {
    this.score = 0;
    this.shotsLeft = 10;
    this.currentPairIdx = 0;
    this.isDragging = false;
    this.isLaunched = false;
    this.gravityY = 320;
    this.slingshotBase = { x: 140, y: 380 };
  }

  init(data) {
    this.pairs = (data?.pairs && data.pairs.length > 0)
      ? data.pairs
      : [
          { starter: 'Jake was walking', completion: 'down the corridor' },
          { starter: 'Water on tiles', completion: 'reduces friction' },
          { starter: 'Rubber shoe soles', completion: 'provide strong grip' },
          { starter: 'Nurse Sarah wrapped', completion: 'a sterile bandage' },
          { starter: 'Be careful because', completion: 'the floor is slippery' },
        ];
    this.duration = data?.duration || 90;
    this.timeLeft = this.duration;
  }

  preload() {
    this.load.image('projectile', '/phaser-assets/projectile.png');
    this.load.image('target_ring', '/phaser-assets/target_ring.png');
    this.load.image('player', '/phaser-assets/player.png');
  }

  create() {
    const { width, height } = this.scale;

    // 1. Set Real Gravity
    this.physics.world.gravity.y = this.gravityY;

    // 2. Castle Yard Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x090d16);
    // Ground platform
    const ground = this.add.rectangle(width / 2, height - 20, width, 40, 0x1e293b);
    this.physics.add.existing(ground, true);

    // 3. Slingshot Mount / Catapult Stand
    this.add.rectangle(this.slingshotBase.x, this.slingshotBase.y + 35, 18, 70, 0x475569);
    this.add.circle(this.slingshotBase.x, this.slingshotBase.y, 22, 0x6366f1);

    // Aim guide line graphics
    this.aimGraphics = this.add.graphics();

    // 4. Starter Chunk Prompt Banner
    this.promptBg = this.add.rectangle(width / 2, 40, width - 40, 60, 0x1e1b4b, 0.95);
    this.promptBg.setStrokeStyle(1.5, 0x6366f1);

    this.promptHeader = this.add.text(width / 2, 22, 'CHUNK CATAPULT — LAUNCH INTO THE MATCHING COMPLETION:', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#a5b4fc',
    }).setOrigin(0.5);

    this.starterText = this.add.text(width / 2, 46, '', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#facc15',
    }).setOrigin(0.5);

    // HUD Text
    this.hudText = this.add.text(24, 85, 'Score: 0 | Shots: 10', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#38bdf8',
    });

    // 5. Target Baskets Group
    this.targetGroup = this.physics.add.staticGroup();
    this.targetLabels = [];

    // 6. Projectile
    this.projectile = this.physics.add.sprite(this.slingshotBase.x, this.slingshotBase.y, 'projectile');
    this.projectile.setDisplaySize(28, 28);
    this.projectile.body.setAllowGravity(false);

    // 7. Initialize Round
    this.loadRound();

    // 8. Slingshot Drag Input
    this.input.on('pointerdown', (pointer) => {
      if (this.isLaunched) return;
      const d = Math.hypot(pointer.x - this.slingshotBase.x, pointer.y - this.slingshotBase.y);
      if (d < 70) {
        this.isDragging = true;
      }
    });

    this.input.on('pointermove', (pointer) => {
      if (!this.isDragging || this.isLaunched) return;

      // Clamp drag distance
      const dx = pointer.x - this.slingshotBase.x;
      const dy = pointer.y - this.slingshotBase.y;
      const dist = Math.hypot(dx, dy);
      const maxDrag = 90;
      const clampedDist = Math.min(dist, maxDrag);
      const angle = Math.atan2(dy, dx);

      this.projectile.x = this.slingshotBase.x + Math.cos(angle) * clampedDist;
      this.projectile.y = this.slingshotBase.y + Math.sin(angle) * clampedDist;

      // Draw Slingshot Elastic & Trajectory Preview
      this.aimGraphics.clear();
      this.aimGraphics.lineStyle(3, 0xf59e0b, 0.8);
      this.aimGraphics.lineBetween(this.slingshotBase.x, this.slingshotBase.y, this.projectile.x, this.projectile.y);

      // Trajectory dots
      const vx = (this.slingshotBase.x - this.projectile.x) * 6.5;
      const vy = (this.slingshotBase.y - this.projectile.y) * 6.5;
      this.aimGraphics.fillStyle(0x38bdf8, 0.6);
      for (let t = 0.1; t < 1.2; t += 0.12) {
        const px = this.projectile.x + vx * t;
        const py = this.projectile.y + vy * t + 0.5 * this.gravityY * t * t;
        this.aimGraphics.fillCircle(px, py, 3);
      }
    });

    this.input.on('pointerup', () => {
      if (!this.isDragging || this.isLaunched) return;
      this.isDragging = false;
      this.launchProjectile();
    });

    // 9. Overlap with Target Baskets
    this.physics.add.overlap(this.projectile, this.targetGroup, this.handleHitTarget, null, this);
  }

  loadRound() {
    this.currentPair = this.pairs[this.currentPairIdx % this.pairs.length];
    this.starterText.setText(`"${this.currentPair.starter} ... ?"`);

    // Clear old targets
    this.targetGroup.clear(true, true);
    this.targetLabels.forEach((l) => l.destroy());
    this.targetLabels = [];

    // Distractors
    const otherCompletions = this.pairs
      .filter((p) => p.completion !== this.currentPair.completion)
      .map((p) => p.completion);

    const candidates = [this.currentPair.completion, otherCompletions[0] || 'on the tiles', otherCompletions[1] || 'in class'];
    const shuffled = candidates.sort(() => Math.random() - 0.5);

    // Target Basket Positions (Upper Right Castle Spire Area)
    const positions = [
      { x: 440, y: 170 },
      { x: 620, y: 220 },
      { x: 740, y: 320 },
    ];

    positions.forEach((pos, idx) => {
      const ring = this.targetGroup.create(pos.x, pos.y, 'target_ring');
      ring.setDisplaySize(54, 54).refreshBody();
      ring.completionText = shuffled[idx];
      ring.isCorrect = shuffled[idx] === this.currentPair.completion;

      // Basket label
      const lbl = this.add.text(pos.x, pos.y + 36, shuffled[idx], {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: ring.isCorrect ? '#fef08a' : '#cbd5e1',
        stroke: '#0f172a',
        strokeThickness: 3,
        align: 'center',
        wordWrap: { width: 140 },
      }).setOrigin(0.5);

      this.targetLabels.push(lbl);
    });

    this.resetProjectile();
  }

  resetProjectile() {
    this.isLaunched = false;
    this.projectile.setPosition(this.slingshotBase.x, this.slingshotBase.y);
    this.projectile.setVelocity(0, 0);
    this.projectile.body.setAllowGravity(false);
    this.aimGraphics.clear();
  }

  launchProjectile() {
    this.isLaunched = true;
    this.aimGraphics.clear();
    this.shotsLeft--;
    this.hudText.setText(`Score: ${this.score} | Shots: ${this.shotsLeft}`);

    // Velocity calculated from pull-back displacement
    const vx = (this.slingshotBase.x - this.projectile.x) * 6.5;
    const vy = (this.slingshotBase.y - this.projectile.y) * 6.5;

    this.projectile.body.setAllowGravity(true);
    this.projectile.setVelocity(vx, vy);

    // Timeout reset if projectile flies out of screen
    this.time.delayedCall(2200, () => {
      if (this.isLaunched) {
        this.nextShot();
      }
    });
  }

  handleHitTarget(projectile, basket) {
    if (!this.isLaunched) return;
    this.isLaunched = false;

    if (basket.isCorrect) {
      this.score += 20;
      this.cameras.main.flash(200, 74, 222, 128, 0.4);

      // Score Pop Text
      const popup = this.add.text(basket.x, basket.y - 20, '+20 PERFECT!', {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '16px',
        fontStyle: 'bold',
        color: '#4ade80',
        stroke: '#0f172a',
        strokeThickness: 3,
      }).setOrigin(0.5);

      this.tweens.add({
        targets: popup,
        y: basket.y - 50,
        alpha: 0,
        duration: 800,
        onComplete: () => popup.destroy(),
      });

      this.currentPairIdx++;
      this.hudText.setText(`Score: ${this.score} | Shots: ${this.shotsLeft}`);

      this.time.delayedCall(700, () => {
        if (this.shotsLeft <= 0 || this.currentPairIdx >= this.pairs.length) {
          this.endGame();
        } else {
          this.loadRound();
        }
      });
    } else {
      this.cameras.main.shake(160, 0.012);
      this.time.delayedCall(600, () => {
        this.nextShot();
      });
    }
  }

  nextShot() {
    if (this.shotsLeft <= 0) {
      this.endGame();
    } else {
      this.resetProjectile();
    }
  }

  endGame() {
    const starsEarned = Math.min(3, Math.max(1, Math.ceil(this.score / 35)));

    this.add.rectangle(400, 250, 420, 200, 0x0f172a, 0.95).setStrokeStyle(2, 0x6366f1);
    this.add.text(400, 190, 'CATAPULT CHALLENGE COMPLETED!', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#6366f1',
    }).setOrigin(0.5);

    this.add.text(400, 230, `Final Score: ${this.score} | Stars: ${'⭐'.repeat(starsEarned)}`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      color: '#f8fafc',
    }).setOrigin(0.5);

    this.events.emit('bridge:event', 'game_complete', {
      score: this.score,
      stars: starsEarned,
    });
  }
}

/**
 * HighwayRunnerScene.js — Phaser 3 Arcade Physics Highway Word Runner
 * 
 * Spec v4.0 & Plan v4.1 (Phase 3):
 * - 3-Lane velocity-driven movement (Lanes: 240, 400, 560 on 800w canvas)
 * - Downward scrolling word crystals via physics group
 * - Target Definition Prompt HUD (audio + visual definition matching)
 * - Swipe / Tap / Arrow key lane switching with smooth tweening
 * - Score, Combo Multiplier, and Strike feedback
 */

import { validateMCQOptions } from '../../utils/quizValidation';

export default class HighwayRunnerScene {
  constructor() {
    this.lanes = [240, 400, 560];
    this.currentLane = 1; // Middle lane
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.strikes = 0;
    this.targetIdx = 0;
    this.isGameOver = false;
  }

  init(data) {
    this.vocabItems = (data?.vocabItems && data.vocabItems.length > 0)
      ? data.vocabItems
      : [
          { word: 'friction', definition: 'The force that slows things down when surfaces slide together' },
          { word: 'traction', definition: 'The grip that prevents slipping on smooth floors' },
          { word: 'slippery', definition: 'Very smooth and causing people or things to slide' },
          { word: 'corridor', definition: 'A long indoor passage connecting classrooms' },
          { word: 'bandage', definition: 'A clean strip of medical cloth used to wrap a wound' },
        ];
    this.duration = data?.duration || 60;
    this.timeLeft = this.duration;
  }

  preload() {
    // Generate all textures procedurally — no external PNG files needed.
    // This prevents solid-color placeholder blocks and works even if /phaser-assets/ is missing.
    const gfx = new Phaser.GameObjects.Graphics(this);

    // ── Player Car (top-down view, 48×64) ──────────────────────────────────
    gfx.clear();
    // Car body — dark slate with highlight
    gfx.fillStyle(0x1e293b); gfx.fillRoundedRect(8, 4, 32, 56, 6);
    // Car body color (rose-red)
    gfx.fillStyle(0xe11d48); gfx.fillRoundedRect(10, 8, 28, 48, 5);
    // Windshield — front
    gfx.fillStyle(0x38bdf8, 0.8); gfx.fillRoundedRect(13, 10, 22, 14, 4);
    // Rear window
    gfx.fillStyle(0x38bdf8, 0.6); gfx.fillRoundedRect(13, 38, 22, 10, 3);
    // Left wheels
    gfx.fillStyle(0x0f172a); gfx.fillRect(4, 12, 8, 12); gfx.fillRect(4, 40, 8, 12);
    // Right wheels
    gfx.fillStyle(0x0f172a); gfx.fillRect(36, 12, 8, 12); gfx.fillRect(36, 40, 8, 12);
    // Headlights
    gfx.fillStyle(0xfef08a); gfx.fillRect(12, 8, 6, 4); gfx.fillRect(30, 8, 6, 4);
    // Engine exhaust glow
    gfx.fillStyle(0xf97316, 0.7); gfx.fillRect(18, 58, 5, 4); gfx.fillRect(25, 58, 5, 4);
    gfx.generateTexture('player', 48, 64);

    // ── Word Star Badge (40×40) ─────────────────────────────────────────────
    gfx.clear();
    // Outer glow ring
    gfx.fillStyle(0xfef08a, 0.3); gfx.fillCircle(20, 20, 20);
    // Inner badge
    gfx.fillStyle(0x1e1b4b); gfx.fillCircle(20, 20, 16);
    // Star border
    gfx.lineStyle(2, 0xa855f7, 1);
    gfx.strokeCircle(20, 20, 16);
    gfx.generateTexture('word_star', 40, 40);

    // ── Hazard Badge (40×40) ────────────────────────────────────────────────
    gfx.clear();
    gfx.fillStyle(0x7f1d1d, 0.5); gfx.fillCircle(20, 20, 20);
    gfx.fillStyle(0x450a0a); gfx.fillCircle(20, 20, 15);
    gfx.lineStyle(2, 0xef4444, 1); gfx.strokeCircle(20, 20, 15);
    gfx.generateTexture('word_hazard', 40, 40);

    // ── Scrolling Road Stripe (16×64) ──────────────────────────────────────
    gfx.clear();
    gfx.fillStyle(0x1e293b); gfx.fillRect(0, 0, 16, 64);
    gfx.fillStyle(0xfbbf24, 0.8); gfx.fillRect(6, 0, 4, 24);
    gfx.generateTexture('road_stripe', 16, 64);

    gfx.destroy();
  }

  create() {
    const { width, height } = this.scale;

    // 1. Road Background with scrolling stripe tiles
    this.add.rectangle(width / 2, height / 2, 480, height, 0x0f172a);
    // Road border lines
    this.add.rectangle(160, height / 2, 4, height, 0x6366f1);
    this.add.rectangle(640, height / 2, 4, height, 0x6366f1);
    // Lane dashed lines (scrolling TileSprites)
    this.laneStripe1 = this.add.tileSprite(320, height / 2, 4, height, 'road_stripe').setAlpha(0.5);
    this.laneStripe2 = this.add.tileSprite(480, height / 2, 4, height, 'road_stripe').setAlpha(0.5);

    // 2. HUD Top Banner: Target Definition
    this.hudBg = this.add.rectangle(width / 2, 40, width - 40, 68, 0x1e1b4b, 0.95);
    this.hudBg.setStrokeStyle(1.5, 0xa855f7);

    this.promptTitle = this.add.text(width / 2, 22, 'TARGET DEFINITION — CATCH THE MATCHING WORD:', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#fbbf24',
    }).setOrigin(0.5);

    this.definitionText = this.add.text(width / 2, 48, '', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      color: '#f8fafc',
      align: 'center',
      wordWrap: { width: width - 80 },
    }).setOrigin(0.5);

    // Score & Timer HUD
    this.scoreText = this.add.text(24, 95, 'Score: 0', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#38bdf8',
    });

    this.timerText = this.add.text(width - 24, 95, `Time: ${this.timeLeft}s`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#f59e0b',
    }).setOrigin(1, 0);

    // 3. Player Vehicle / Runner
    this.player = this.physics.add.sprite(this.lanes[this.currentLane], height - 80, 'player');
    this.player.setDisplaySize(44, 60);
    this.player.setDepth(10);

    // 4. Falling Word Containers Group (sprite + label bundled)
    this.stars = this.physics.add.group();

    // 5. Initial Target
    this.updateTarget();

    // 6. Spawn Timer
    this.time.addEvent({
      delay: 1400,
      callback: this.spawnWave,
      callbackScope: this,
      loop: true,
    });

    // 7. Game Countdown Timer
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.isGameOver) return;
        this.timeLeft--;
        this.timerText.setText(`Time: ${this.timeLeft}s`);
        if (this.timeLeft <= 0) {
          this.endGame();
        }
      },
      loop: true,
    });

    // 8. Controls: Keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Controls: Touch / Pointer Tap
    this.input.on('pointerdown', (pointer) => {
      if (this.isGameOver) return;
      if (pointer.x < width / 2) {
        this.steerLeft();
      } else {
        this.steerRight();
      }
    });

    // 9. Collision / Overlap
    this.physics.add.overlap(this.player, this.stars, this.handleCollectStar, null, this);
  }

  updateTarget() {
    this.currentTarget = this.vocabItems[this.targetIdx % this.vocabItems.length];
    this.targetIdx++;
    this.definitionText.setText(`"${this.currentTarget.definition || this.currentTarget.word}"`);

    // Emit bridge event to React
    this.events.emit('bridge:event', 'target_changed', this.currentTarget);
  }

  steerLeft() {
    if (this.currentLane > 0) {
      this.currentLane--;
      this.tweens.add({
        targets: this.player,
        x: this.lanes[this.currentLane],
        duration: 140,
        ease: 'Cubic.easeOut',
      });
    }
  }

  steerRight() {
    if (this.currentLane < 2) {
      this.currentLane++;
      this.tweens.add({
        targets: this.player,
        x: this.lanes[this.currentLane],
        duration: 140,
        ease: 'Cubic.easeOut',
      });
    }
  }

  spawnWave() {
    if (this.isGameOver) return;

    const correctLane = Phaser.Math.Between(0, 2);
    const otherWords = this.vocabItems.filter((v) => v.word !== this.currentTarget.word).map((v) => v.word);
    const pool = this.vocabItems.map((v) => v.word);
    const validated = validateMCQOptions(otherWords, this.currentTarget.word, pool, 3);
    const distractors = validated.filter((w) => w.toLowerCase() !== this.currentTarget.word.toLowerCase());

    const baseSpeed = 170 + Math.min(this.score * 1.5, 90);

    for (let lane = 0; lane < 3; lane++) {
      const isCorrect = lane === correctLane;
      const wordText = isCorrect ? this.currentTarget.word : (distractors.pop() || 'hazard');
      const texKey = isCorrect ? 'word_star' : 'word_hazard';

      // Use physics sprite for the badge (moves with velocity)
      const badge = this.stars.create(this.lanes[lane], -30, texKey);
      badge.setDisplaySize(40, 40);
      badge.setVelocityY(baseSpeed);
      badge.setDepth(8);
      badge.word = wordText;
      badge.isTarget = isCorrect;

      // Word label — manually positioned each frame in update()
      const label = this.add.text(this.lanes[lane], -46, wordText, {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '13px',
        fontStyle: 'bold',
        color: isCorrect ? '#fef08a' : '#fca5a5',
        stroke: '#0f172a',
        strokeThickness: 4,
        shadow: { x: 0, y: 1, color: '#000', blur: 3, fill: true },
      }).setOrigin(0.5).setDepth(9);

      badge.label = label;
    }
  }

  handleCollectStar(player, badge) {
    if (!badge || !badge.active) return;
    // Destroy label first before badge
    if (badge.label && badge.label.active) badge.label.destroy();

    if (badge.isTarget) {
      this.score += 10 + this.combo * 2;
      this.combo++;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;

      this.scoreText.setText(`Score: ${this.score} (${this.combo}x)`);

      // Camera Flash Green
      this.cameras.main.flash(180, 56, 189, 248, 0.3);

      // Advance to next target definition
      this.updateTarget();
    } else {
      this.strikes++;
      this.combo = 0;
      this.scoreText.setText(`Score: ${this.score}`);

      // Camera Shake Red
      this.cameras.main.shake(150, 0.012);
    }

    badge.destroy();
  }

  update() {
    if (this.isGameOver) return;

    // Keyboard inputs
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left) || Phaser.Input.Keyboard.JustDown(this.keyA)) {
      this.steerLeft();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right) || Phaser.Input.Keyboard.JustDown(this.keyD)) {
      this.steerRight();
    }

    // Scroll lane stripes downward for road movement effect
    if (this.laneStripe1) this.laneStripe1.tilePositionY -= 4;
    if (this.laneStripe2) this.laneStripe2.tilePositionY -= 4;

    // Sync labels with moving badges every frame, clean out-of-bounds
    const sceneHeight = this.scale.height;
    this.stars.getChildren().forEach((badge) => {
      if (badge && badge.active) {
        // Label tracks badge position precisely
        if (badge.label && badge.label.active) {
          badge.label.setPosition(badge.x, badge.y - 28);
        }
        // Remove if below screen
        if (badge.y > sceneHeight + 40) {
          if (badge.label) badge.label.destroy();
          badge.destroy();
        }
      }
    });
  }

  endGame() {
    this.isGameOver = true;
    this.stars.clear(true, true);

    const starsEarned = Math.min(3, Math.max(1, Math.ceil(this.score / 40)));

    this.add.rectangle(400, 250, 420, 220, 0x0f172a, 0.95).setStrokeStyle(2, 0x38bdf8);
    this.add.text(400, 180, 'HIGHWAY RUNNER CLEARED!', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#38bdf8',
    }).setOrigin(0.5);

    this.add.text(400, 220, `Final Score: ${this.score} | Max Streak: ${this.maxCombo}x`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      color: '#f8fafc',
    }).setOrigin(0.5);

    this.add.text(400, 260, `Earned: ${'⭐'.repeat(starsEarned)} (${starsEarned * 5} PP)`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '16px',
      color: '#f59e0b',
    }).setOrigin(0.5);

    // Emit completion event to React
    this.events.emit('bridge:event', 'game_complete', {
      score: this.score,
      maxCombo: this.maxCombo,
      stars: starsEarned,
    });
  }
}

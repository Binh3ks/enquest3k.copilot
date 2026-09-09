/**
 * HighwayRunnerScene.js — Phaser 3 Arcade Physics Highway Word Runner
 * 
 * Spec v5.0:
 * - Authentic Kenney sports car sprite + dynamic headlight beam
 * - Scrolling asphalt highway texture + luminous lane stripes
 * - HUD banner with depth protection (prevents text labels from overlapping HUD)
 * - Luminous crystal word stars & dark red hazard badges
 * - Responsive 3-lane velocity controls with smooth tweening
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
    // 1. Load authentic Kenney sports car sprite
    this.load.image('player_car', '/phaser-assets/car_red.png');

    const gfx = this.make.graphics({ x: 0, y: 0, add: false });

    // Fallback player
    gfx.clear();
    gfx.fillStyle(0xe11d48); gfx.fillRoundedRect(8, 4, 32, 56, 6);
    gfx.generateTexture('player_fallback', 48, 64);

    // Word Star Badge (44×44, glowing crystal star)
    gfx.clear();
    gfx.fillStyle(0x38bdf8, 0.3); gfx.fillCircle(22, 22, 22);
    gfx.fillStyle(0x0284c7); gfx.fillCircle(22, 22, 17);
    gfx.lineStyle(2, 0x38bdf8, 1); gfx.strokeCircle(22, 22, 17);
    gfx.fillStyle(0xffffff, 0.9); gfx.fillCircle(22, 22, 6);
    gfx.generateTexture('word_star', 44, 44);

    // Hazard Badge (44×44, dark red warning orb)
    gfx.clear();
    gfx.fillStyle(0xef4444, 0.3); gfx.fillCircle(22, 22, 22);
    gfx.fillStyle(0x7f1d1d); gfx.fillCircle(22, 22, 17);
    gfx.lineStyle(2, 0xef4444, 1); gfx.strokeCircle(22, 22, 17);
    gfx.fillStyle(0xf87171, 0.9); gfx.fillCircle(22, 22, 5);
    gfx.generateTexture('word_hazard', 44, 44);

    // Asphalt Road Texture (64×64)
    gfx.clear();
    gfx.fillStyle(0x090d16); gfx.fillRect(0, 0, 64, 64);
    gfx.fillStyle(0x111827, 0.4); gfx.fillRect(4, 4, 28, 28);
    gfx.fillRect(36, 36, 28, 28);
    gfx.generateTexture('road_asphalt', 64, 64);

    // Scrolling Road Stripe (16×64)
    gfx.clear();
    gfx.fillStyle(0x090d16); gfx.fillRect(0, 0, 16, 64);
    gfx.fillStyle(0xfbbf24, 0.9); gfx.fillRect(6, 0, 4, 32);
    gfx.generateTexture('road_stripe', 16, 64);

    gfx.destroy();
  }

  create() {
    const { width, height } = this.scale;

    // 1. Road Background (asphalt grid with glowing borders)
    this.add.tileSprite(width / 2, height / 2, 480, height, 'road_asphalt').setDepth(0);
    // Outer shoulder
    this.add.rectangle(80, height / 2, 160, height, 0x030712).setDepth(0);
    this.add.rectangle(720, height / 2, 160, height, 0x030712).setDepth(0);

    // Road guard rails with neon glow
    this.add.rectangle(160, height / 2, 6, height, 0x6366f1).setDepth(1);
    this.add.rectangle(640, height / 2, 6, height, 0x6366f1).setDepth(1);

    // Lane dashed lines (scrolling TileSprites)
    this.laneStripe1 = this.add.tileSprite(320, height / 2, 4, height, 'road_stripe').setAlpha(0.6).setDepth(2);
    this.laneStripe2 = this.add.tileSprite(480, height / 2, 4, height, 'road_stripe').setAlpha(0.6).setDepth(2);

    // Headlight glow cone in front of car
    this.headlightGlow = this.add.polygon(
      this.lanes[this.currentLane],
      height - 110,
      [0, 50, -40, -100, 40, -100],
      0xfef08a,
      0.12
    ).setDepth(5);

    // 2. Player Vehicle / Runner
    const carKey = this.textures.exists('player_car') ? 'player_car' : 'player_fallback';
    this.player = this.physics.add.sprite(this.lanes[this.currentLane], height - 70, carKey);
    this.player.setDisplaySize(38, 70);
    this.player.setDepth(20);

    // 3. HUD Top Banner: Target Definition (Depth 100+ prevents badges from overlapping!)
    this.hudBg = this.add.rectangle(width / 2, 42, width - 40, 72, 0x0a0e1a, 0.98);
    this.hudBg.setStrokeStyle(2, 0xa855f7);
    this.hudBg.setDepth(100);

    this.promptTitle = this.add.text(width / 2, 22, '🎯 TARGET DEFINITION — CATCH THE MATCHING WORD:', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#fbbf24',
    }).setOrigin(0.5).setDepth(101);

    this.definitionText = this.add.text(width / 2, 50, '', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#f8fafc',
      align: 'center',
      wordWrap: { width: width - 80 },
    }).setOrigin(0.5).setDepth(101);

    // Score & Timer HUD
    this.scoreText = this.add.text(24, 98, 'Score: 0', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#38bdf8',
    }).setDepth(101);

    this.timerText = this.add.text(width - 24, 98, `Time: ${this.timeLeft}s`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#f59e0b',
    }).setOrigin(1, 0).setDepth(101);

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
    this.keyA = this.input.keyboard.addKey('A');
    this.keyD = this.input.keyboard.addKey('D');

    // Controls: Touch / Pointer Tap
    this.input.on('pointerdown', (pointer) => {
      if (this.isGameOver) return;
      if (pointer.x < width / 2) {
        this.steerLeft();
      } else {
        this.steerRight();
      }
    });

    // 9. Overlap Collision Detection
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
      const targetX = this.lanes[this.currentLane];
      this.tweens.add({
        targets: [this.player, this.headlightGlow],
        x: targetX,
        duration: 130,
        ease: 'Cubic.easeOut',
      });
    }
  }

  steerRight() {
    if (this.currentLane < 2) {
      this.currentLane++;
      const targetX = this.lanes[this.currentLane];
      this.tweens.add({
        targets: [this.player, this.headlightGlow],
        x: targetX,
        duration: 130,
        ease: 'Cubic.easeOut',
      });
    }
  }

  spawnWave() {
    if (this.isGameOver) return;

    const correctLane = Math.floor(Math.random() * 3);
    const otherWords = this.vocabItems.filter((v) => v.word !== this.currentTarget.word).map((v) => v.word);
    const pool = this.vocabItems.map((v) => v.word);
    const validated = validateMCQOptions(otherWords, this.currentTarget.word, pool, 3);
    const distractors = validated.filter((w) => w.toLowerCase() !== this.currentTarget.word.toLowerCase());

    const baseSpeed = 175 + Math.min(this.score * 1.5, 90);

    for (let lane = 0; lane < 3; lane++) {
      const isCorrect = lane === correctLane;
      const wordText = isCorrect ? this.currentTarget.word : (distractors.pop() || 'hazard');
      const texKey = isCorrect ? 'word_star' : 'word_hazard';

      // Badge spawns safely at y: 88, just emerging beneath the HUD banner
      const badge = this.stars.create(this.lanes[lane], 88, texKey);
      badge.setDisplaySize(42, 42);
      badge.setVelocityY(baseSpeed);
      badge.setDepth(10);
      badge.word = wordText;
      badge.isTarget = isCorrect;

      // Word label
      const label = this.add.text(this.lanes[lane], 60, wordText, {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '13px',
        fontStyle: 'bold',
        color: isCorrect ? '#fef08a' : '#fca5a5',
        stroke: '#0f172a',
        strokeThickness: 4,
        shadow: { x: 0, y: 1, color: '#000', blur: 3, fill: true },
      }).setOrigin(0.5).setDepth(11);
      label.setVisible(false); // Initially hidden while emerging

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

      // Camera Flash Green/Cyan
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
    const justDown = (key) => {
      if (!key) return false;
      const phaserJustDown = window.Phaser?.Input?.Keyboard?.JustDown;
      return phaserJustDown ? phaserJustDown(key) : false;
    };
    if (justDown(this.cursors.left) || justDown(this.keyA)) {
      this.steerLeft();
    } else if (justDown(this.cursors.right) || justDown(this.keyD)) {
      this.steerRight();
    }

    // Scroll lane stripes downward for road movement effect
    if (this.laneStripe1) this.laneStripe1.tilePositionY -= 5;
    if (this.laneStripe2) this.laneStripe2.tilePositionY -= 5;

    // Sync labels with moving badges every frame, clean out-of-bounds
    const sceneHeight = this.scale.height;
    this.stars.getChildren().forEach((badge) => {
      if (badge && badge.active) {
        if (badge.label && badge.label.active) {
          // Strictly prevent labels from rendering over the HUD top banner
          if (badge.y < 85) {
            badge.label.setVisible(false);
          } else {
            badge.label.setVisible(true);
            badge.label.setPosition(badge.x, badge.y - 30);
          }
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

    const isWin = this.score >= 50;
    const earnedStars = this.score >= 120 ? 3 : this.score >= 80 ? 2 : this.score >= 50 ? 1 : 0;
    const earnedPP = Math.round(this.score * 0.5);

    // End Game Banner
    const { width, height } = this.scale;
    const endBg = this.add.rectangle(width / 2, height / 2, 420, 220, 0x020617, 0.95);
    endBg.setStrokeStyle(2, isWin ? 0x10b981 : 0xf43f5e);
    endBg.setDepth(200);

    const title = isWin ? '🏁 SPEEDWAY VICTORY!' : '⚡ TIME UP!';
    this.add.text(width / 2, height / 2 - 60, title, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '22px',
      fontStyle: 'bold',
      color: isWin ? '#34d399' : '#f87171',
    }).setOrigin(0.5).setDepth(201);

    this.add.text(width / 2, height / 2 - 15, `Final Score: ${this.score}  •  Max Combo: ${this.maxCombo}x`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      color: '#e2e8f0',
    }).setOrigin(0.5).setDepth(201);

    this.add.text(width / 2, height / 2 + 20, `Reward: ★${earnedStars} Stars  •  +${earnedPP} ⚡ Boss Energy`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#fbbf24',
    }).setOrigin(0.5).setDepth(201);

    // Exit Button
    const exitBtn = this.add.rectangle(width / 2, height / 2 + 65, 180, 36, 0x4f46e5);
    exitBtn.setStrokeStyle(1.5, 0x818cf8).setDepth(201).setInteractive({ useHandCursor: true });

    const btnText = this.add.text(width / 2, height / 2 + 65, '✓ Complete Room', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5).setDepth(202);

    exitBtn.on('pointerdown', () => {
      this.events.emit('bridge:event', 'game_complete', {
        score: this.score,
        stars: earnedStars,
        powerPoints: earnedPP,
        maxCombo: this.maxCombo,
      });
    });
  }
}

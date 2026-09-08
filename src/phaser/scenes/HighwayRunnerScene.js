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
    this.load.image('road_lane', '/phaser-assets/road_lane.png');
    this.load.image('player', '/phaser-assets/player.png');
    this.load.image('word_star', '/phaser-assets/word_star.png');
  }

  create() {
    const { width, height } = this.scale;

    // 1. Road Background & Visual Lane Dividers
    this.add.rectangle(width / 2, height / 2, 480, height, 0x0f172a);
    // Road border lines
    this.add.rectangle(160, height / 2, 4, height, 0x6366f1);
    this.add.rectangle(640, height / 2, 4, height, 0x6366f1);
    // Lane dashed lines
    this.add.rectangle(320, height / 2, 2, height, 0x334155);
    this.add.rectangle(480, height / 2, 2, height, 0x334155);

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
    this.player = this.physics.add.sprite(this.lanes[this.currentLane], 430, 'player');
    this.player.setDisplaySize(44, 44);

    // 4. Falling Word Stars Group
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

    for (let lane = 0; lane < 3; lane++) {
      const isCorrect = lane === correctLane;
      const wordText = isCorrect ? this.currentTarget.word : (distractors.pop() || 'hazard');
      const star = this.stars.create(this.lanes[lane], -20, 'word_star');

      star.setDisplaySize(36, 36);
      star.setVelocityY(170 + Math.min(this.score * 1.5, 90));
      star.word = wordText;
      star.isTarget = isCorrect;

      // Word text label following star
      const label = this.add.text(this.lanes[lane], -20, wordText, {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '12px',
        fontStyle: 'bold',
        color: isCorrect ? '#fef08a' : '#cbd5e1',
        stroke: '#0f172a',
        strokeThickness: 3,
      }).setOrigin(0.5);

      star.label = label;
    }
  }

  handleCollectStar(player, star) {
    if (star.label) star.label.destroy();

    if (star.isTarget) {
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

    star.destroy();
  }

  update() {
    if (this.isGameOver) return;

    // Keyboard inputs
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left) || Phaser.Input.Keyboard.JustDown(this.keyA)) {
      this.steerLeft();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right) || Phaser.Input.Keyboard.JustDown(this.keyD)) {
      this.steerRight();
    }

    // Sync labels with moving stars & clean out-of-bounds
    this.stars.getChildren().forEach((star) => {
      if (star && star.active) {
        if (star.label) {
          star.label.y = star.y - 24;
          star.label.x = star.x;
        }
        if (star.y > 520) {
          if (star.label) star.label.destroy();
          star.destroy();
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

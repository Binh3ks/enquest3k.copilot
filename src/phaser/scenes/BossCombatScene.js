/**
 * BossCombatScene.js — Phaser 3 Boss Combat Engine for Boss Type 1 (Ancient Sorcerer)
 * 
 * Spec v4.0 & Plan v4.1 (Phase 5):
 * - Ancient Sorcerer 🧙‍♂️ with floating sine levitation
 * - Dynamic HP Bars drawn via Phaser.GameObjects.Graphics
 * - Mirror Spell Special Ability: adds 5th decoy option at <= 50% HP
 * - Real-time attack tweens, damage numbers, and camera feedback
 * - Interactive canvas buttons with hover / press states
 */

import { validateMCQOptions } from '../../utils/quizValidation';

export default class BossCombatScene {
  constructor() {
    this.bossHP = 100;
    this.playerHP = 100;
    this.currentQIdx = 0;
    this.mirrorActive = false;
    this.isAnswering = false;
    this.isGameOver = false;
    this.choiceButtons = [];
  }

  init(data) {
    this.questions = (data?.questions && data.questions.length > 0)
      ? data.questions
      : [
          {
            prompt: 'What does "friction" mean?',
            answer: 'The force resisting sliding motion',
            options: ['The force resisting sliding motion', 'A shiny floor surface', 'A high speed vehicle', 'A medical bandage'],
            mirrorDecoy: 'A magnetic pull between metals',
          },
          {
            prompt: 'Tom walked _____ down the school corridor.',
            answer: 'carefully',
            options: ['carefully', 'slippery', 'friction', 'tile'],
            mirrorDecoy: 'quickly',
          },
          {
            prompt: 'What does "slippery" mean?',
            answer: 'Hard to walk on without sliding',
            options: ['Hard to walk on without sliding', 'Very sticky and solid', 'Extremely heavy', 'Loud and echoing'],
            mirrorDecoy: 'Smooth to touch',
          },
          {
            prompt: 'Which shoe soles provide the strongest grip on wet tiles?',
            answer: 'Rubber soles',
            options: ['Rubber soles', 'Plastic soles', 'Paper soles', 'Ice blades'],
            mirrorDecoy: 'Leather soles',
          },
        ];

    this.playerDamage = data?.playerDamage || 15;
    this.tier = data?.tier || 'silver';
  }

  preload() {
    this.load.image('player', '/phaser-assets/player.png');
    this.load.image('projectile', '/phaser-assets/projectile.png');
  }

  create() {
    const { width, height } = this.scale;

    // 1. Dark Sorcery Citadel Chamber Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x070913);
    const arenaFloor = this.add.rectangle(width / 2, height - 15, width, 30, 0x1e1b4b);
    this.add.grid(width / 2, height / 2, width, height, 80, 80, 0x000000, 0, 0xa855f7, 0.06);

    // 2. HP Graphics Overlay
    this.hpGraphics = this.add.graphics();
    this.drawHPBars();

    // 3. Characters: Boss (Sorcerer) & Player (Leo)
    // Boss Sorcerer Avatar
    this.bossContainer = this.add.container(width - 150, 150);
    const bossGlow = this.add.circle(0, 0, 48, 0xa855f7, 0.25);
    const bossIcon = this.add.text(0, 0, '🧙‍♂️', { fontSize: '56px' }).setOrigin(0.5);
    const bossName = this.add.text(0, 54, 'Ancient Sorcerer', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#c084fc',
    }).setOrigin(0.5);
    this.bossContainer.add([bossGlow, bossIcon, bossName]);

    // Floating Levitation Tween
    this.tweens.add({
      targets: this.bossContainer,
      y: 135,
      yoyo: true,
      repeat: -1,
      duration: 1600,
      ease: 'Sine.easeInOut',
    });

    // Player (Leo)
    this.playerContainer = this.add.container(130, 160);
    this.playerSprite = this.physics.add.sprite(0, 0, 'player');
    this.playerSprite.setDisplaySize(48, 48);
    const playerName = this.add.text(0, 40, 'Leo the Brave', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#38bdf8',
    }).setOrigin(0.5);
    this.playerContainer.add([this.playerSprite, playerName]);

    // 4. Ability Banner
    this.abilityBanner = this.add.text(width / 2, 75, '', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#f43f5e',
      stroke: '#0f172a',
      strokeThickness: 3,
    }).setOrigin(0.5).setAlpha(0);

    // 5. Question Display Area
    this.qBox = this.add.rectangle(width / 2, 250, width - 60, 60, 0x1e1b4b, 0.95);
    this.qBox.setStrokeStyle(1.5, 0xa855f7);

    this.qMeta = this.add.text(width / 2, 230, '', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#fbbf24',
    }).setOrigin(0.5);

    this.qText = this.add.text(width / 2, 258, '', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      color: '#f8fafc',
      align: 'center',
      wordWrap: { width: width - 100 },
    }).setOrigin(0.5);

    // 6. Render First Question
    this.renderQuestion();
  }

  drawHPBars() {
    this.hpGraphics.clear();
    const { width } = this.scale;

    // Player HP (Left)
    this.hpGraphics.fillStyle(0x334155, 1);
    this.hpGraphics.fillRoundedRect(30, 25, 200, 16, 6);
    this.hpGraphics.fillStyle(0x10b981, 1);
    const pW = Math.max(0, (this.playerHP / 100) * 196);
    this.hpGraphics.fillRoundedRect(32, 27, pW, 12, 4);

    // Boss HP (Right)
    this.hpGraphics.fillStyle(0x334155, 1);
    this.hpGraphics.fillRoundedRect(width - 230, 25, 200, 16, 6);
    this.hpGraphics.fillStyle(0xef4444, 1);
    const bW = Math.max(0, (this.bossHP / 100) * 196);
    this.hpGraphics.fillRoundedRect(width - 228, 27, bW, 12, 4);
  }

  renderQuestion() {
    if (this.isGameOver) return;

    this.isAnswering = false;
    const q = this.questions[this.currentQIdx % this.questions.length];
    this.qMeta.setText(`GAUNTLET QUESTION ${this.currentQIdx + 1} / ${this.questions.length}`);
    this.qText.setText(q.prompt);

    // Clean up previous choice buttons
    this.choiceButtons.forEach((b) => {
      b.bg.destroy();
      b.text.destroy();
    });
    this.choiceButtons = [];

    // Build options with validation & Mirror Spell check
    let options = validateMCQOptions(q.options, q.answer, q.options, 4);
    if (this.mirrorActive && q.mirrorDecoy && !options.includes(q.mirrorDecoy)) {
      options = [...options, q.mirrorDecoy].sort(() => Math.random() - 0.5);
    }

    const { width } = this.scale;
    const btnW = options.length === 5 ? (width - 70) / 2 : (width - 70) / 2;
    const btnH = 46;

    options.forEach((opt, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);

      const x = 35 + col * (btnW + 15) + btnW / 2;
      const y = 310 + row * (btnH + 12) + btnH / 2;

      const bg = this.add.rectangle(x, y, btnW, btnH, 0x1e293b, 0.95);
      bg.setStrokeStyle(1.5, 0x6366f1);
      bg.setInteractive({ useHandCursor: true });

      const text = this.add.text(x, y, `${String.fromCharCode(65 + idx)}. ${opt}`, {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '12px',
        color: '#f1f5f9',
        align: 'center',
        wordWrap: { width: btnW - 20 },
      }).setOrigin(0.5);

      bg.on('pointerover', () => {
        if (!this.isAnswering) bg.setStrokeStyle(2, 0x38bdf8);
      });
      bg.on('pointerout', () => {
        if (!this.isAnswering) bg.setStrokeStyle(1.5, 0x6366f1);
      });

      bg.on('pointerdown', () => {
        if (this.isAnswering) return;
        this.handleChoiceSelect(opt, q, bg);
      });

      this.choiceButtons.push({ bg, text });
    });
  }

  handleChoiceSelect(selected, currentQ, btnBg) {
    this.isAnswering = true;
    const isCorrect = selected.trim().toLowerCase() === currentQ.answer.trim().toLowerCase();

    if (isCorrect) {
      btnBg.setFillStyle(0x065f46);
      btnBg.setStrokeStyle(2, 0x10b981);

      // Player attacks Boss
      this.tweens.add({
        targets: this.playerContainer,
        x: this.playerContainer.x + 80,
        duration: 120,
        yoyo: true,
        ease: 'Power2',
      });

      // Boss takes damage
      this.bossHP = Math.max(0, this.bossHP - 10);
      this.drawHPBars();

      // Shake Boss
      this.tweens.add({
        targets: this.bossContainer,
        x: this.bossContainer.x + 10,
        duration: 50,
        yoyo: true,
        repeat: 3,
      });

      // Check Mirror Spell trigger
      if (this.bossHP <= 50 && !this.mirrorActive) {
        this.triggerMirrorSpell();
      }
    } else {
      btnBg.setFillStyle(0x881337);
      btnBg.setStrokeStyle(2, 0xf43f5e);

      // Boss attacks Player
      this.cameras.main.shake(180, 0.012);
      this.playerHP = Math.max(0, this.playerHP - this.playerDamage);
      this.drawHPBars();
    }

    this.time.delayedCall(900, () => {
      if (this.bossHP <= 0) {
        this.victory();
      } else if (this.playerHP <= 0) {
        this.defeat();
      } else {
        this.currentQIdx++;
        this.renderQuestion();
      }
    });
  }

  triggerMirrorSpell() {
    this.mirrorActive = true;
    this.abilityBanner.setText('⚡ MIRROR SPELL ACTIVATED! 5TH ILLUSION DECOY MANIFESTS!');
    this.tweens.add({
      targets: this.abilityBanner,
      alpha: 1,
      duration: 300,
      yoyo: true,
      hold: 2000,
      ease: 'Sine.easeInOut',
    });
    this.cameras.main.flash(300, 168, 85, 247, 0.35);
  }

  victory() {
    this.isGameOver = true;
    this.tweens.add({
      targets: this.bossContainer,
      alpha: 0,
      scaleX: 0.2,
      scaleY: 0.2,
      duration: 800,
      ease: 'Power2',
    });

    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, 440, 220, 0x0f172a, 0.96).setStrokeStyle(2, 0x10b981);
    this.add.text(width / 2, height / 2 - 40, '👑 BOSS DEFEATED — VICTORY!', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#10b981',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2, 'The Ancient Sorcerer has been banished from the Citadel!', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      color: '#f1f5f9',
    }).setOrigin(0.5);

    this.events.emit('bridge:event', 'boss_victory', {
      score: 100,
      coinsEarned: 30,
    });
  }

  defeat() {
    this.isGameOver = true;
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, 440, 200, 0x0f172a, 0.96).setStrokeStyle(2, 0xef4444);
    this.add.text(width / 2, height / 2 - 30, '💀 DEFEAT', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#ef4444',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 10, 'Leo has fallen in battle. Return and power up!', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      color: '#94a3b8',
    }).setOrigin(0.5);

    this.events.emit('bridge:event', 'boss_defeat');
  }
}

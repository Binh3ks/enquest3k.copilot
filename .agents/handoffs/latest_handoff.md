# Session Handoff — Mobile Game Engine Redesign v2
**Date**: 2026-09-08T09:50+07:00
**From**: Gemini (current session)
**To**: Next agent (Gemini 2.5 Pro or Claude)
**Branch**: main @ commit aba03bbb

---

## 🎯 Mission: Mobile-First Game Redesign

User is extremely unhappy with current mobile UX. Specific complaints from real phone screenshots:
1. **D-Pad + JUMP/SLIDE buttons cover 40% of screen** — must be REMOVED entirely
2. **Game world is empty black space** — useGameScale hook made content invisible
3. **No exit button** visible inside games
4. **Obstacles are text boxes** ("JUMP!" red badge) — must be real visual obstacles
5. **EchoArenaShooter** = completely empty game area on phone

---

## 🔴 CRITICAL: What NOT to do

- **DO NOT keep VirtualDPad** — remove all D-pad buttons from all 15 games
- **DO NOT use useGameScale** — it was added last session but BREAKS the game (scales viewport to ~43% making it nearly invisible while still taking same space)
- **DO NOT use Three.js** — too heavy (500KB+), use Canvas 2D pseudo-3D instead
- **DO NOT hardcode 900px positions** without adapting to real screen width

---

## ✅ Approved Plan (user approved concept)

Full plan at: `/Users/binhnguyen/.gemini/antigravity-ide/brain/ca208f83-1a01-48c3-a922-1aabfe360652/implementation_plan.md`

### Priority 1 (do first):
1. Create `FloatingExitBtn.jsx` — always-visible exit button top-left (position:fixed, z-index:999)
2. Remove `<VirtualDPad>` from ALL 15 games (it's imported in every game)
3. Remove `useGameScale` from all 13 games it was added to
4. Fix EchoArenaShooter: game orbs must use `window.innerWidth/Height` not hardcoded 900px

### Priority 2:
5. Create `useGestureControls.js` hook:
   - Double-tap = jump
   - Swipe down = slide
   - Tap left 33% = move lane left
   - Tap right 33% = move lane right
6. Apply gesture controls to HighwaySprint + all platform games

### Priority 3:
7. Rewrite `HighwaySprint.jsx` → `HighwaySprintCanvas.jsx`:
   - Canvas 2D pseudo-3D road renderer
   - Real 3D-projected obstacles (barrier, laser beam, barrel)
   - Word badges as 3D billboards
   - Character as CSS overlay above canvas

---

## 📁 Key Files

| File | Status | Notes |
|------|--------|-------|
| `src/modules/quest/VirtualDPad.jsx` | KEEP file but remove all usage in games | |
| `src/modules/quest/useGameScale.js` | DELETE import from all games | Causes invisible content |
| `src/modules/quest/HighwaySprint.jsx` | REPLACE with canvas version | |
| `src/modules/chronicles/DailyRoomScreen.jsx` | Contains game router (switch on gameId) | Update to use new HighwaySprintCanvas |
| `src/modules/chronicles/ChroniclesWorldMap.css` | Has new @media mobile styles | Keep these |

## Game viewport class names (for finding containers):
```
BubbleStormChase: .bubble-storm-container → .storm-world-viewport
WordWagonJump: .word-wagon-container → .wagon-world-viewport  
ShadowVaultInfiltrate: .shadow-vault-container → .vault-world-viewport
PotionFlipDungeon: .potion-flip-container → .potion-world-viewport
AnvilRushGrammar: .anvil-rush-container → .anvil-world-viewport
ScrollChamberDecode: .scroll-chamber-root → .scroll-chamber-viewport
EchoArenaShooter: .echo-arena-root → .echo-arena-viewport
CatapultCommander: .catapult-commander-root → .catapult-rampart-viewport
StormShieldDefense: .storm-shield-root → .storm-spire-viewport
SyntaxExpressRail: .syntax-rail-root → .syntax-rail-viewport
RiddleRunMaze: .riddle-maze-root → .riddle-maze-viewport
GrandMatrixDungeon: .matrix-dungeon-root → .matrix-arena-viewport
TitanGrammarForge: .titan-forge-root → .titan-forge-viewport
CambridgeClozeGauntlet: .gauntlet-cloze-root → .gauntlet-viewport
HighwaySprint: .highway-3d-root → .highway-3d-viewport (REPLACE ENTIRELY)
```

---

## 🧪 Acceptance Test (run on real phone or Chrome DevTools iPhone 13 Pro 390×844)

- [ ] Zero buttons in game area (D-Pad / JUMP / SLIDE all gone)
- [ ] Exit/Chamber button always visible top-left
- [ ] Game world fills ENTIRE screen (no black empty areas)
- [ ] HighwaySprint shows 3D road with colored obstacle shapes
- [ ] Double-tap anywhere = character jumps
- [ ] Swipe down = character slides
- [ ] npm run build → exit code 0


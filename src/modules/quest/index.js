/**
 * src/modules/quest/index.js
 * Barrel exports for Lexio's Quest physics foundation (Sprint 1)
 */

// Physics utilities (pure JS — no React)
export * from './LeoPhysics';

// Core components
export { default as DungeonRoom }       from './DungeonRoom';
export { default as LeoCharacter }      from './LeoCharacter';
export { default as VirtualDPad }       from './VirtualDPad';
export { default as FloatingExitBtn }   from './FloatingExitBtn';
export { default as useGestureControls } from './useGestureControls';
export { default as HUDOverlay }        from './HUDOverlay';
export { default as WordCrystal }   from './WordCrystal';
export { WordCrystalLayer }         from './WordCrystal';
export { default as MCQBlitzPopup } from './MCQBlitzPopup';
export { generateMCQChoices }       from './MCQBlitzPopup';

// Enemy AI
export { default as EnemyLayer }    from './EnemyAI';
export { EnemySprite }              from './EnemyAI';
export { createEnemy, updateEnemyPatrol, freezeAllEnemies, speedupAllEnemies, ENEMY_TYPES } from './EnemyAI';

// Floor 1 Games (Sprint 2)
export { default as BubbleStormChase }      from './BubbleStormChase';
export { default as WordWagonJump }         from './WordWagonJump';
export { default as ShadowVaultInfiltrate } from './ShadowVaultInfiltrate';

// Floor 2 Games (Sprint 3)
export { default as PotionFlipDungeon }     from './PotionFlipDungeon';
export { default as AnvilRushGrammar }      from './AnvilRushGrammar';
export { default as ScrollChamberDecode }   from './ScrollChamberDecode';

// Floor 3 Games (Sprint 3)
export { default as EchoArenaShooter }      from './EchoArenaShooter';
export { default as CatapultCommander }     from './CatapultCommander';
export { default as StormShieldDefense }    from './StormShieldDefense';

// Floor 4 Games (Sprint 4)
export { default as HighwaySprint }         from './HighwaySprint';
export { default as HighwaySprintCanvas }   from './HighwaySprintCanvas';
export { default as SyntaxExpressRail }     from './SyntaxExpressRail';
export { default as RiddleRunMaze }         from './RiddleRunMaze';

// Floor 5 Games (Sprint 4)
export { default as GrandMatrixDungeon }    from './GrandMatrixDungeon';
export { default as TitanGrammarForge }     from './TitanGrammarForge';
export { default as CambridgeClozeGauntlet } from './CambridgeClozeGauntlet';

// Floor 6 Games (Redesign Sprint)
export { default as SynonymStormDefense }   from './SynonymStormDefense';
export { default as ConnectorRelayCanvas }  from './ConnectorRelayCanvas';

// Floor 7 Games (Redesign Sprint)
export { default as WordForgeCarryEngine }  from './WordForgeCarryEngine';




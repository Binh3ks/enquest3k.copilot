// Re-export StoryWriting from its canonical location (write_speak module).
// cambridge/StoryWriting.jsx acts as a shim so BossBattleZone can import
// from the cambridge/ directory consistently.
export { default, StoryWriting } from '../../modules/write_speak/StoryWriting';

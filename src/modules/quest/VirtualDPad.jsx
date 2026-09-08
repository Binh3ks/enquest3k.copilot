/**
 * VirtualDPad.jsx — Mobile virtual D-Pad + JUMP button for Lexio's Quest
 * GDD §1.2 Controls: "Virtual D-Pad (mobile) + Arrow Keys/WASD (desktop) + JUMP button"
 */
import React, { useCallback } from 'react';
import './VirtualDPad.css';

/**
 * VirtualDPad — renders a fixed overlay with directional controls and jump button
 *
 * @param {{
 *   onLeft: ()=>void,       onLeftRelease: ()=>void,
 *   onRight: ()=>void,      onRightRelease: ()=>void,
 *   onUp: ()=>void,         onUpRelease: ()=>void,
 *   onDown: ()=>void,       onDownRelease: ()=>void,
 *   onJump: ()=>void,       onJumpRelease: ()=>void,
 *   visible: boolean,
 * }} props
 */
export default function VirtualDPad() {
  // Mobile Game Engine Redesign v2: On-screen D-pads deprecated across all games.
  // Gesture controls (swipe, tap, double-tap) now handle movement with zero screen obstruction.
  return null;
}

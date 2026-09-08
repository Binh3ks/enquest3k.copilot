/**
 * PhaserGameCanvas.jsx — React-to-Phaser Canvas Bridge Component
 * 
 * Invariants:
 * 1. Lazy-loads Phaser monolithic chunk dynamically (QĐ-1)
 * 2. Forces Phaser.CANVAS renderer to prevent WebGL context leaks on mobile (QĐ-3)
 * 3. Cleans up Game instance and orphan canvases on unmount (QĐ-3)
 * 4. Bridges custom Phaser Scene events to React via onSceneEvent prop
 */

import React, { useEffect, useRef, useState } from 'react';

let cachedPhaser = null;

/**
 * Dynamically imports the Phaser library so it is split into a separate bundle chunk.
 * @returns {Promise<any>}
 */
export async function loadPhaser() {
  if (!cachedPhaser) {
    const mod = await import('phaser');
    cachedPhaser = mod.default || mod;
    if (typeof window !== 'undefined') {
      window.Phaser = cachedPhaser;
    }
  }
  return cachedPhaser;
}

export default function PhaserGameCanvas({
  sceneClass,
  sceneData = {},
  width = 800,
  height = 500,
  className = '',
  style = {},
  onSceneEvent,
}) {
  const containerRef = useRef(null);
  const gameRef = useRef(null);
  const [isLoading, setIsLoading] = useState(!cachedPhaser);

  useEffect(() => {
    let isMounted = true;

    async function initGame() {
      try {
        const Phaser = await loadPhaser();
        if (!isMounted || !containerRef.current) return;

        setIsLoading(false);

        // Destroy any previous instance in container before creating a new one
        if (gameRef.current) {
          gameRef.current.destroy(true, false);
          gameRef.current = null;
        }
        if (containerRef.current) {
          const orphans = containerRef.current.querySelectorAll('canvas');
          orphans.forEach((c) => c.remove());
        }

        // Bridge helper: bind event emitter bridge if scene supports it
        class BridgedScene extends sceneClass {
          init(data) {
            super.init ? super.init(data) : null;
            this.bridgeData = data;
          }

          create() {
            // Forward events to React parent component
            this.events.on('bridge:event', (name, payload) => {
              if (onSceneEvent) onSceneEvent(name, payload);
            });
            super.create ? super.create() : null;
          }
        }

        const config = {
          type: Phaser.CANVAS, // BẮT BUỘC: Không dùng WEBGL hay AUTO để tránh tràn context trên mobile
          parent: containerRef.current,
          width,
          height,
          backgroundColor: '#0a0d18',
          scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
          },
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { y: 0 },
              debug: false,
            },
          },
          scene: [BridgedScene],
        };

        const game = new Phaser.Game(config);
        gameRef.current = game;

        // Pass sceneData to initial scene
        game.scene.start('BridgedScene', sceneData);
      } catch (err) {
        console.error('[PhaserGameCanvas] Failed to initialize Phaser game:', err);
      }
    }

    initGame();

    return () => {
      isMounted = false;
      if (gameRef.current) {
        gameRef.current.destroy(true, false); // removeCanvas = true
        gameRef.current = null;
      }
      if (containerRef.current) {
        const orphans = containerRef.current.querySelectorAll('canvas');
        orphans.forEach((c) => c.remove());
      }
    };
  }, [sceneClass, width, height]);

  return (
    <div
      ref={containerRef}
      className={`phaser-game-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0d18',
        ...style,
      }}
    >
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            color: '#a78bfa',
            fontSize: '14px',
            fontWeight: 600,
            background: 'rgba(10, 13, 24, 0.9)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid rgba(167, 139, 250, 0.2)',
              borderTopColor: '#a78bfa',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span>Loading Engine...</span>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
}

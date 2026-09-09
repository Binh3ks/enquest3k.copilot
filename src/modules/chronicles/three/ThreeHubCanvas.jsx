/**
 * ThreeHubCanvas.jsx — Real 3D WebGL Canvas for The Lexio Chronicles Hub World
 * 
 * Spec v7.0:
 * - Powered by @react-three/fiber & @react-three/drei
 * - Strict WebGL Context Management: Disposes geometries, materials, textures, and renderer on unmount
 * - Seamlessly receives state from ChroniclesWorldMap: weekNumber, PP, bossTier, ownerBypass, roomStatuses
 * - Bridges 3D portal clicks to parent navigation callbacks
 */

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import CitadelHallScene from './CitadelHallScene';
import './ThreeHubCanvas.css';

// ─── WebGL Recursive Disposal Helper ──────────────────────────────────────────

function disposeSceneResources(scene, gl) {
  if (!scene) return;
  scene.traverse((obj) => {
    if (obj.geometry) {
      obj.geometry.dispose();
    }
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach((mat) => {
          disposeMaterialTextures(mat);
          mat.dispose();
        });
      } else {
        disposeMaterialTextures(obj.material);
        obj.material.dispose();
      }
    }
  });

  if (gl && gl.dispose) {
    gl.dispose();
  }
}

function disposeMaterialTextures(material) {
  if (!material) return;
  Object.keys(material).forEach((prop) => {
    const val = material[prop];
    if (val && typeof val === 'object' && val.isTexture) {
      val.dispose();
    }
  });
}

// ─── Canvas Lifecycle Manager Component ────────────────────────────────────────

function SceneManager({ sceneRef, glRef, children }) {
  useEffect(() => {
    return () => {
      if (sceneRef.current && glRef.current) {
        console.log('[ThreeHubCanvas] Performing safe WebGL context & scene disposal...');
        disposeSceneResources(sceneRef.current, glRef.current);
      }
    };
  }, [sceneRef, glRef]);

  return <>{children}</>;
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ThreeHubCanvas({
  weekNumber = 33,
  weeklyPP = 0,
  bossTier = 'none',
  isBossDefeated = false,
  isOwnerBypass = false,
  roomStatuses = [],
  onPortalEnter,
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const glRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div
      ref={containerRef}
      className="three-hub-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #090d16 0%, #111827 100%)',
      }}
    >
      {hasError ? (
        <div className="three-hub-error-fallback">
          <p>⚠️ WebGL 3D Error: {errorMessage}</p>
        </div>
      ) : (
        <Canvas
          shadows
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          onCreated={({ gl, scene }) => {
            glRef.current = gl;
            sceneRef.current = scene;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            console.log('[ThreeHubCanvas] WebGL 3D context created successfully');
          }}
          onError={(err) => {
            console.error('[ThreeHubCanvas] Canvas error:', err);
            setHasError(true);
            setErrorMessage(err?.message || String(err));
          }}
        >
          {/* Camera: FOV=52, Z=22 (xa hơn để thấy cửa ở Ground Floor) */}
          <PerspectiveCamera
            makeDefault
            fov={52}
            position={[0, 6.5, 22]}
          />

          {/* Free Inspection Orbit Camera */}
          <OrbitControls
            makeDefault
            enableRotate={true}
            enablePan={true}
            enableZoom={true}
            enableDamping={true}
            dampingFactor={0.06}
            minPolarAngle={0.05}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minAzimuthAngle={-Math.PI / 1.5}
            maxAzimuthAngle={Math.PI / 1.5}
            minDistance={1.8}
            maxDistance={25}
            target={[0, 2.5, -2.0]}
          />

          <SceneManager sceneRef={sceneRef} glRef={glRef}>
            <CitadelHallScene roomStatuses={roomStatuses} onPortalEnter={onPortalEnter} />
          </SceneManager>
        </Canvas>
      )}
    </div>
  );
}

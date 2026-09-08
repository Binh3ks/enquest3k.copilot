/**
 * CitadelHallScene.jsx — Chronicles Grand Citadel Hall 3D Scene
 * 
 * Spec v7.0:
 * - Real 3D WebGL architecture built with Three.js & @react-three/fiber
 * - Warm, radiant castle aesthetic (warm sandstone/cream stone, crimson royal velvet carpet, gold piping)
 * - Real 3D Grand Staircase leading up to Raised Dais (Y: +1.5m) for the Boss Chamber
 * - 6 Portals as true 3D architectural gateways with depth, stone arches, and emissive energy fields
 * - Real 3D lighting: Directional sunlight with soft shadows, warm ambient fill, and point lights on wall torches
 * - Isometric-influenced PerspectiveCamera framing the full majesty of the hall
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// ─── Procedural Canvas Textures ────────────────────────────────────────────────

function createSandstoneTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base warm sandstone cream
  ctx.fillStyle = '#eddcc8';
  ctx.fillRect(0, 0, 512, 512);

  // Large flagstone grid with bevel highlights and shadows
  const tileSize = 128;
  for (let x = 0; x < 512; x += tileSize) {
    for (let y = 0; y < 512; y += tileSize) {
      // Tile body with subtle shade variance
      const variance = (Math.sin(x * 12.9898 + y * 78.233) * 0.5 + 0.5) * 15;
      const r = Math.floor(238 - variance);
      const g = Math.floor(222 - variance);
      const b = Math.floor(202 - variance);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

      // Light bevel top & left
      ctx.strokeStyle = '#fff5ea';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 2, y + tileSize - 3);
      ctx.lineTo(x + 2, y + 2);
      ctx.lineTo(x + tileSize - 3, y + 2);
      ctx.stroke();

      // Shadow bevel bottom & right
      ctx.strokeStyle = '#c2ae96';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 3, y + tileSize - 3);
      ctx.lineTo(x + tileSize - 3, y + tileSize - 3);
      ctx.lineTo(x + tileSize - 3, y + 3);
      ctx.stroke();

      // Stone flecks
      ctx.fillStyle = 'rgba(150, 130, 110, 0.08)';
      for (let i = 0; i < 8; i++) {
        const fx = x + 10 + Math.random() * (tileSize - 20);
        const fy = y + 10 + Math.random() * (tileSize - 20);
        ctx.fillRect(fx, fy, 4, 3);
      }
    }
  }

  // Deep mortar gaps
  ctx.strokeStyle = '#9c8770';
  ctx.lineWidth = 3;
  for (let i = 0; i <= 512; i += tileSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 5);
  return texture;
}

// ─── Wall Torch with Animated Flicker ─────────────────────────────────────────

function WallTorch({ position, rotation = [0, 0, 0] }) {
  const lightRef = useRef();
  const flameRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lightRef.current) {
      // Natural organic flicker
      lightRef.current.intensity = 2.2 + Math.sin(t * 11) * 0.3 + Math.cos(t * 17) * 0.2;
    }
    if (flameRef.current) {
      flameRef.current.scale.y = 1.0 + Math.sin(t * 14) * 0.15;
      flameRef.current.scale.x = 1.0 + Math.cos(t * 12) * 0.08;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Wall Mounting Plate */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[0.22, 0.45, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Sconce Arm */}
      <mesh position={[0, 0, 0.22]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.42, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Torch Cup */}
      <mesh position={[0, 0.2, 0.36]}>
        <cylinderGeometry args={[0.16, 0.08, 0.22, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* 3D Stylized Flame */}
      <mesh ref={flameRef} position={[0, 0.42, 0.36]}>
        <coneGeometry args={[0.13, 0.34, 8]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      {/* Flame Inner Core */}
      <mesh position={[0, 0.38, 0.36]}>
        <coneGeometry args={[0.07, 0.2, 8]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      {/* Warm Point Light */}
      <pointLight
        ref={lightRef}
        color="#fbbf24"
        intensity={2.4}
        distance={7.5}
        decay={2}
        position={[0, 0.48, 0.45]}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.001}
      />
    </group>
  );
}

// ─── Classical Architectural Stone Pillar ─────────────────────────────────────

function StonePillar({ position }) {
  return (
    <group position={position}>
      {/* Plinth Base */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.4, 1.0]} />
        <meshStandardMaterial color="#d8cbba" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.16, 0.82]} />
        <meshStandardMaterial color="#eddcc8" roughness={0.65} metalness={0.1} />
      </mesh>
      {/* Main Fluted Shaft */}
      <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.37, 5.3, 16]} />
        <meshStandardMaterial color="#f2e3d3" roughness={0.6} metalness={0.08} />
      </mesh>
      {/* Capital Crown */}
      <mesh position={[0, 5.95, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.18, 0.82]} />
        <meshStandardMaterial color="#eddcc8" roughness={0.65} metalness={0.1} />
      </mesh>
      <mesh position={[0, 6.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.22, 1.0]} />
        <meshStandardMaterial color="#d8cbba" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}

// ─── 3D Portal Gateway (Regular Chambers & Boss Gate) ─────────────────────────

function PortalGateway3D({ config, isUnlocked, isCompleted, stars, onSelect }) {
  const { name, isBoss, position, rotation = [0, 0, 0] } = config;
  const vortexRef = useRef();

  useFrame(({ clock }) => {
    if (vortexRef.current) {
      vortexRef.current.rotation.z = clock.getElapsedTime() * (isBoss ? 1.2 : 0.8);
    }
  });

  // Dimensions
  const archWidth = isBoss ? 2.4 : 1.7;
  const archHeight = isBoss ? 3.2 : 2.5;
  const archDepth = isBoss ? 0.6 : 0.45;

  const stoneColor = isBoss ? '#1c1924' : '#e6d7c5';
  const energyColor = isBoss ? '#a855f7' : (isUnlocked ? '#38bdf8' : '#475569');
  const glowIntensity = isBoss ? 2.0 : (isUnlocked ? 1.6 : 0.2);

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Stone Arch Frame — Left Pillar */}
      <mesh position={[-archWidth / 2 + 0.18, archHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.36, archHeight, archDepth]} />
        <meshStandardMaterial color={stoneColor} roughness={0.6} metalness={isBoss ? 0.4 : 0.1} />
      </mesh>
      {/* Right Pillar */}
      <mesh position={[archWidth / 2 - 0.18, archHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.36, archHeight, archDepth]} />
        <meshStandardMaterial color={stoneColor} roughness={0.6} metalness={isBoss ? 0.4 : 0.1} />
      </mesh>
      {/* Top Lintel Arch */}
      <mesh position={[0, archHeight - 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[archWidth + 0.3, 0.42, archDepth + 0.08]} />
        <meshStandardMaterial color={stoneColor} roughness={0.55} metalness={isBoss ? 0.45 : 0.1} />
      </mesh>
      {/* Crown Pediment */}
      <mesh position={[0, archHeight + 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[archWidth * 0.75, 0.38, archDepth * 0.9]} />
        <meshStandardMaterial color={stoneColor} roughness={0.5} metalness={isBoss ? 0.5 : 0.15} />
      </mesh>

      {/* 2. Recessed Door / Energy Field */}
      {isUnlocked || isBoss ? (
        // Glowing Cosmic / Runed Energy Vortex
        <group position={[0, archHeight / 2 - 0.1, -0.05]}>
          <mesh ref={vortexRef}>
            <circleGeometry args={[(archWidth - 0.45) / 2, 32]} />
            <meshStandardMaterial
              color={energyColor}
              emissive={energyColor}
              emissiveIntensity={glowIntensity}
              roughness={0.2}
              metalness={0.1}
              transparent
              opacity={0.92}
            />
          </mesh>
          {/* Pulsing Light Glow into Citadel */}
          <pointLight
            color={energyColor}
            intensity={isBoss ? 2.5 : 1.4}
            distance={4.5}
            decay={2}
            position={[0, 0, 0.3]}
          />
        </group>
      ) : (
        // Heavy Sturdy Oak Door with Iron Straps (Locked)
        <group position={[0, archHeight / 2 - 0.1, -0.05]}>
          <mesh castShadow receiveShadow>
            <planeGeometry args={[archWidth - 0.4, archHeight - 0.4]} />
            <meshStandardMaterial color="#451a03" roughness={0.8} />
          </mesh>
          {/* Iron Padlock Clasp */}
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[0.22, 0.28, 0.08]} />
            <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* 3. Floating Carved Nameplate & Status */}
      <group position={[0, archHeight + 0.65, 0.1]}>
        {/* Stone Plaque Backing */}
        <mesh castShadow>
          <boxGeometry args={[isBoss ? 2.6 : 2.0, 0.42, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          fontSize={isBoss ? 0.16 : 0.13}
          color={isBoss ? '#f3e8ff' : '#fef08a'}
          anchorX="center"
          anchorY="middle"
          fontStyle="bold"
        >
          {name}
        </Text>
      </group>
    </group>
  );
}

// ─── Grand Staircase (Cầu thang 3D thật dẫn lên bục cao) ─────────────────────

function GrandStaircase({ startZ = -2.2, endZ = -4.8, startY = 0, endY = 1.5, steps = 8, width = 4.2 }) {
  const stepElements = useMemo(() => {
    const list = [];
    const stepDepth = (startZ - endZ) / steps;
    const stepHeight = (endY - startY) / steps;

    for (let i = 0; i < steps; i++) {
      const y = startY + i * stepHeight + stepHeight / 2;
      const z = startZ - i * stepDepth - stepDepth / 2;
      const h = (i + 1) * stepHeight;

      list.push(
        <group key={i}>
          {/* Solid Step Block */}
          <mesh position={[0, y - stepHeight / 2 + h / 2, z]} castShadow receiveShadow>
            <boxGeometry args={[width, h, stepDepth + 0.04]} />
            <meshStandardMaterial color="#e0cfbc" roughness={0.65} metalness={0.1} />
          </mesh>
          {/* Step Tread Bevel Trim */}
          <mesh position={[0, y + stepHeight / 2, z]} castShadow receiveShadow>
            <boxGeometry args={[width + 0.1, 0.04, stepDepth + 0.06]} />
            <meshStandardMaterial color="#fff3e2" roughness={0.5} metalness={0.15} />
          </mesh>
          {/* Red Velvet Runner on Step */}
          <mesh position={[0, y + stepHeight / 2 + 0.025, z]} receiveShadow>
            <boxGeometry args={[1.8, 0.02, stepDepth]} />
            <meshStandardMaterial color="#b91c1c" roughness={0.8} />
          </mesh>
          {/* Gold Trim Left & Right of Step Runner */}
          <mesh position={[-0.92, y + stepHeight / 2 + 0.03, z]}>
            <boxGeometry args={[0.06, 0.02, stepDepth]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.92, y + stepHeight / 2 + 0.03, z]}>
            <boxGeometry args={[0.06, 0.02, stepDepth]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      );
    }
    return list;
  }, [startZ, endZ, startY, endY, steps, width]);

  return <group>{stepElements}</group>;
}

// ─── Main Citadel Hall 3D Scene Graph ─────────────────────────────────────────

export default function CitadelHallScene({
  weekNumber = 33,
  weeklyPP = 0,
  bossTier = 'none',
  isBossDefeated = false,
  isOwnerBypass = false,
  roomStatuses = [],
  onPortalEnter,
}) {
  const sandstoneTexture = useMemo(() => createSandstoneTexture(), []);

  // 6 Portal Configurations in 3D Space
  const portalConfigs = useMemo(() => [
    { dayIndex: 0, name: 'Chamber of Tales', sub: 'Floor 1 • Story World', isBoss: false, position: [-3.8, 0, 2.2], rotation: [0, 0.35, 0] },
    { dayIndex: 1, name: 'Alchemy Lab', sub: 'Floor 2 • Knowledge Lab', isBoss: false, position: [-3.8, 0, -1.0], rotation: [0, 0.25, 0] },
    { dayIndex: 2, name: 'Thunder Arena', sub: 'Floor 3 • Battle Arena', isBoss: false, position: [3.8, 0, -1.0], rotation: [0, -0.25, 0] },
    { dayIndex: 3, name: 'Rune Sanctum', sub: 'Floor 4 • Creator Studio', isBoss: false, position: [3.8, 0, 2.2], rotation: [0, -0.35, 0] },
    { dayIndex: 4, name: 'Apex Spire', sub: 'Floor 5 • Boss Castle', isBoss: false, position: [-2.8, 1.5, -6.6], rotation: [0, 0.1, 0] },
    { dayIndex: 5, name: 'Storm Titan Guardian', sub: 'Weekly Boss Battle', isBoss: true, position: [0, 1.5, -6.8], rotation: [0, 0, 0] },
  ], []);

  // Wall Torch coordinates flanking the hall
  const torchPositions = useMemo(() => [
    { pos: [-4.6, 2.8, 3.5], rot: [0, 0, 0] },
    { pos: [-4.6, 2.8, 0.5], rot: [0, 0, 0] },
    { pos: [-4.6, 2.8, -2.5], rot: [0, 0, 0] },
    { pos: [4.6, 2.8, 3.5], rot: [0, Math.PI, 0] },
    { pos: [4.6, 2.8, 0.5], rot: [0, Math.PI, 0] },
    { pos: [4.6, 2.8, -2.5], rot: [0, Math.PI, 0] },
    // Upper Dais Torches flanking the Boss Gate
    { pos: [-1.8, 4.2, -6.8], rot: [0, 0, 0] },
    { pos: [1.8, 4.2, -6.8], rot: [0, 0, 0] },
  ], []);

  // Pillar positions
  const pillarPositions = useMemo(() => [
    [-4.5, 0, 3.8],
    [-4.5, 0, 0.6],
    [-4.5, 0, -2.4],
    [4.5, 0, 3.8],
    [4.5, 0, 0.6],
    [4.5, 0, -2.4],
    // Dais balustrade pillars
    [-3.8, 1.5, -5.2],
    [3.8, 1.5, -5.2],
  ], []);

  return (
    <group>
      {/* ── 1. Lighting System (True 3D Radiance) ─────────────────────────── */}
      {/* Warm Ambient Fill: Guarantees high visibility, eliminates gloomy dark spots */}
      <ambientLight color="#fff8ed" intensity={1.3} />

      {/* Main Directional Sunbeam pouring through clerestory arches */}
      <directionalLight
        position={[6, 14, 8]}
        color="#fff1d6"
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={35}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />

      {/* Soft Secondary Rim Light from opposite angle */}
      <directionalLight position={[-8, 10, -4]} color="#bae6fd" intensity={0.55} />

      {/* Wall Torches with Real Dynamic Point Lights */}
      {torchPositions.map((t, idx) => (
        <WallTorch key={idx} position={t.pos} rotation={t.rot} />
      ))}

      {/* ── 2. Floors & Architecture ──────────────────────────────────────── */}
      {/* Main Ground Floor (Sandstone Flagstones) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.5]} receiveShadow>
        <planeGeometry args={[11, 7]} />
        <meshStandardMaterial map={sandstoneTexture} roughness={0.7} metalness={0.08} />
      </mesh>

      {/* Royal Velvet Carpet on Main Ground Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.8]} receiveShadow>
        <planeGeometry args={[1.8, 6.2]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.8} />
      </mesh>
      {/* Gold Embroidered Left & Right Borders */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.92, 0.025, 0.8]}>
        <planeGeometry args={[0.06, 6.2]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.92, 0.025, 0.8]}>
        <planeGeometry args={[0.06, 6.2]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ── 3. Real 3D Grand Staircase (Cầu thang thật leo độ cao Y) ────────── */}
      <GrandStaircase startZ={-2.2} endZ={-4.8} startY={0} endY={1.5} steps={8} width={4.2} />

      {/* ── 4. Raised Dais (Bục cao Y: 1.5m phía sau sảnh) ────────────────── */}
      <mesh position={[0, 0.75, -6.8]} castShadow receiveShadow>
        <boxGeometry args={[11, 1.5, 4.0]} />
        <meshStandardMaterial color="#ecd9c6" roughness={0.65} metalness={0.1} />
      </mesh>
      {/* Dais Floor Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.505, -6.8]} receiveShadow>
        <planeGeometry args={[10.8, 3.8]} />
        <meshStandardMaterial map={sandstoneTexture} roughness={0.65} />
      </mesh>
      {/* Carpet continuing across Dais to Boss Gate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.515, -6.2]} receiveShadow>
        <planeGeometry args={[1.8, 2.6]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.92, 1.52, -6.2]}>
        <planeGeometry args={[0.06, 2.6]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.92, 1.52, -6.2]}>
        <planeGeometry args={[0.06, 2.6]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ── 5. Castle Walls & Arched Ceilings ─────────────────────────────── */}
      {/* Back High Battlement Wall behind Boss Dais */}
      <mesh position={[0, 4.5, -8.7]} castShadow receiveShadow>
        <boxGeometry args={[12, 9, 0.8]} />
        <meshStandardMaterial color="#cbb8a3" roughness={0.75} metalness={0.1} />
      </mesh>
      {/* Left Castle Wall */}
      <mesh position={[-5.4, 4.5, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 9, 14]} />
        <meshStandardMaterial color="#cbb8a3" roughness={0.75} metalness={0.1} />
      </mesh>
      {/* Right Castle Wall */}
      <mesh position={[5.4, 4.5, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 9, 14]} />
        <meshStandardMaterial color="#cbb8a3" roughness={0.75} metalness={0.1} />
      </mesh>

      {/* High Arched Vault Ribs Across Ceiling */}
      {[-2, 1, 4].map((zPos, idx) => (
        <group key={idx} position={[0, 7.5, zPos]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[5.2, 0.28, 8, 24, Math.PI]} />
            <meshStandardMaterial color="#e0cfbc" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* ── 6. Classical Stone Pillars ────────────────────────────────────── */}
      {pillarPositions.map((p, idx) => (
        <StonePillar key={idx} position={p} />
      ))}

      {/* ── 7. 6 3D Architectural Portals ─────────────────────────────────── */}
      {portalConfigs.map((cfg) => {
        const roomStatus = roomStatuses.find((r) => r.dayIndex === cfg.dayIndex);
        const isUnlocked = cfg.isBoss
          ? (isOwnerBypass || bossTier !== 'none')
          : (isOwnerBypass || (roomStatus ? roomStatus.unlocked : (cfg.dayIndex === 0)));
        const isCompleted = cfg.isBoss
          ? isBossDefeated
          : (roomStatus?.completed || (roomStatus?.stars > 0));
        const stars = roomStatus?.stars || 0;

        return (
          <PortalGateway3D
            key={cfg.dayIndex}
            config={cfg}
            isUnlocked={isUnlocked}
            isCompleted={isCompleted}
            stars={stars}
            onSelect={onPortalEnter}
          />
        );
      })}
    </group>
  );
}

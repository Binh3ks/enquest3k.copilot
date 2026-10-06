/**
 * CitadelHallScene.jsx — v9.1
 *
 * Layout cố định (camera pos=[0,5.5,9], target=[0,2,-2]):
 *
 *   Z trục (camera nhìn theo -Z):
 *   z=+9  tường vào (sau lưng camera)
 *   z=+6  cổng phòng hành lang (3 cổng mỗi bên)
 *   z=+5  ─── CẦU THANG BẮT ĐẦU (chân thang, y=0) ────
 *   z=+2  ─── CẦU THANG KẾT THÚC (đỉnh thang, y=UPPER) ─
 *   z=+1  sàn tầng 2 bắt đầu
 *   z= 0  cột hàng 1 (tầng 2)
 *   z=-3  cột hàng 2 (tầng 2)   + đèn chùm 1
 *   z=-6  cột hàng 3 (tầng 2)   + đèn chùm 2
 *   z=-8  cổng Boss (tầng 2)
 *   z=-9  tường Boss
 *
 *   X: -7 đến +7 (rộng 14m)
 *   Y: 0 đến 10 (cao 10m, tầng 2 ở y=4)
 *
 * Cửa phòng & Boss: 5 Chamber (Floor 1-5, 3 rương/game mỗi phòng = 15 game-slot) + 1 Weekly Boss Gate (tầng 2)
 */

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Palette ───────────────────────────────────────────────────────────────────
const C = {
  sky:        '#90cdf4',   // bầu trời xanh
  stone:      '#d69e2e',   // tường gạch nung ấm
  stoneDark:  '#b7791f',   // gạch nung sẫm màu
  stoneLight: '#f8f8f8',   // đá trắng (sàn tầng 2, cột lan can)
  stairStone: '#cbd5e1',   // đá cẩm thạch xám mát cho cầu thang
  gold:       '#ffd700',   // vàng chanh rực rỡ
  floorA:     '#ffffff',   // ô sàn trắng
  floorB:     '#222222',   // ô sàn xám đen
  carpetRed:  '#e3000b',   // thảm đỏ tươi
  wood:       '#7a4b3a',   // gỗ nâu (tay vịn)
  torch:      '#3a2810',   // cán đuốc
  bossWall:   '#4a5568',   // tường Boss (đá xám đậm tạo tương phản)
  door:       '#7a4b3a',   // cổng gỗ nâu
};

// ─── Constants ──────────────────────────────────────────────────────────────────
const W = 24;     // Giảm chiều rộng phòng xuống 24 để cửa 2 bên vừa vặn trong FOV camera
const HW = W / 2;
const D = 50;     // chiều sâu (z) từ -25 đến +25 (đủ dài để camera xa không thấy góc)
const HD = D / 2;
const H = 14;     // trần nhà
const UP = 4.0;   // độ cao tầng 2

// ─── SceneBG ──────────────────────────────────────────────────────────────────
function SceneBG() {
  const { scene } = useThree();
  useEffect(() => {
    const prev = scene.background;
    scene.background = new THREE.Color(C.sky);
    scene.fog = new THREE.Fog(C.sky, 22, 45);
    return () => { scene.background = prev; scene.fog = null; };
  }, [scene]);
  return null;
}

// ─── Sàn ô cờ (CanvasTexture) ─────────────────────────────────────────────────
function TiledFloor({ y = 0, w = W, d = D, cx = 0, cz = 0, repX = 7, repZ = 9 }) {
  const tex = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    [[0, 0, C.floorA], [1, 1, C.floorA], [1, 0, C.floorB], [0, 1, C.floorB]].forEach(([rx, ry, col]) => {
      ctx.fillStyle = col;
      ctx.fillRect(rx * 128, ry * 128, 128, 128);
    });
    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repX, repZ);
    return t;
  }, [repX, repZ]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, y, cz]} receiveShadow>
      <planeGeometry args={[w, d]} />
      <meshStandardMaterial map={tex} roughness={0.55} />
    </mesh>
  );
}

// ─── Cột trụ đơn (CylinderGeometry — gốc tọa độ tại đáy) ─────────────────────
function Column({ x, y = 0, z, height = UP, r = 0.32, color = C.stone }) {
  return (
    <group position={[x, y, z]}>
      {/* Thân cột */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[r * 0.82, r, height, 14]} />
        <meshStandardMaterial color={color} roughness={0.65} />
      </mesh>
      {/* Chân cột */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[r + 0.1, r + 0.14, 0.36, 14]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.6} />
      </mesh>
      {/* Đầu cột */}
      <mesh position={[0, height - 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[r + 0.14, r * 0.82, 0.36, 14]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.6} />
      </mesh>
    </group>
  );
}

// ─── Vòm đá nửa tròn giữa 2 cột ───────────────────────────────────────────────
function Arch({ x, fromZ, toZ, y, tubeR = 0.2 }) {
  const span = Math.abs(toZ - fromZ);
  const midZ = (fromZ + toZ) / 2;
  return (
    <mesh position={[x, y, midZ]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <torusGeometry args={[span / 2, tubeR, 8, 14, Math.PI]} />
      <meshStandardMaterial color={C.stoneDark} roughness={0.7} />
    </mesh>
  );
}

// ─── Đuốc tường ───────────────────────────────────────────────────────────────
function Torch({ x, y, z }) {
  return (
    <group position={[x, y, z]}>
      {/* Cán ngang */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.38, 6]} />
        <meshStandardMaterial color={C.torch} roughness={0.9} />
      </mesh>
      {/* Bát đựng + ngọn lửa tự phát sáng (emissive) */}
      <mesh position={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.06, 0.12, 8]} />
        <meshStandardMaterial color="#ff6010" roughness={0.8} emissive="#ff4800" emissiveIntensity={2.5} />
      </mesh>
      {/* Lửa (pointLight) */}
      <pointLight position={[0.22, 0.12, 0]} color="#ff8c20" intensity={5} distance={8} decay={2} />
    </group>
  );
}

// ─── Đèn chùm ─────────────────────────────────────────────────────────────────
function Chandelier({ x = 0, z }) {
  const R = 0.85;
  const N = 8;
  return (
    <group position={[x, H - 0.4, z]}>
      {/* Chuỗi treo */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
        <meshStandardMaterial color={C.gold} roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Vòng ngoài */}
      <mesh>
        <torusGeometry args={[R, 0.045, 6, 18]} />
        <meshStandardMaterial color={C.gold} roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Nến nhỏ */}
      {Array.from({ length: N }).map((_, i) => {
        const a = (i / N) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * R, -0.08, Math.sin(a) * R]}>
            <cylinderGeometry args={[0.04, 0.04, 0.18, 6]} />
            <meshStandardMaterial color="#f5f0e0" roughness={0.9} />
          </mesh>
        );
      })}
      {/* Ánh sáng */}
      <pointLight color="#ffe8a0" intensity={5} distance={16} decay={2} castShadow={false} />
    </group>
  );
}

// ─── Cầu thang trung tâm ──────────────────────────────────────────────────────
// Từ z=+5 (chân thang, y=0) đến z=+2 (đỉnh thang, y=UP)
const STAIR_W     = 7.0;
const STAIR_STEPS = 12;
const STAIR_H_EA  = UP / STAIR_STEPS;           // 0.333m mỗi bậc
const STAIR_D_EA  = 3.0 / STAIR_STEPS;          // 0.25m mỗi bậc
const STAIR_BASE_Z = 5.0;                        // chân thang (z lớn = gần camera)

function GrandStaircase() {
  return (
    <group>
      {/* Bậc thang */}
      {Array.from({ length: STAIR_STEPS }).map((_, i) => (
        <mesh key={i} position={[0, i * STAIR_H_EA + STAIR_H_EA / 2, STAIR_BASE_Z - i * STAIR_D_EA]} receiveShadow castShadow>
          <boxGeometry args={[STAIR_W, STAIR_H_EA, STAIR_D_EA]} />
          <meshStandardMaterial color={C.stairStone} roughness={0.5} />
        </mesh>
      ))}

      {/* Thảm đỏ từng bậc */}
      {Array.from({ length: STAIR_STEPS }).map((_, i) => {
        const stepY = i * STAIR_H_EA + STAIR_H_EA;
        const stepZ = STAIR_BASE_Z - i * STAIR_D_EA;
        return (
          <mesh key={`carpet${i}`} position={[0, stepY + 0.01, stepZ]} receiveShadow>
            <boxGeometry args={[2.4, 0.02, STAIR_D_EA]} />
            <meshStandardMaterial color={C.carpetRed} roughness={0.85} />
          </mesh>
        );
      })}

      {/* Viền vàng mặt trước từng bậc */}
      {Array.from({ length: STAIR_STEPS }).map((_, i) => {
        const edgeY = i * STAIR_H_EA;
        const edgeZ = STAIR_BASE_Z - i * STAIR_D_EA;
        return (
          <mesh key={`e${i}`} position={[0, edgeY, edgeZ]} castShadow>
            <boxGeometry args={[STAIR_W + 0.05, 0.05, 0.05]} />
            <meshStandardMaterial color={C.gold} roughness={0.2} metalness={0.8} />
          </mesh>
        );
      })}

      {/* Lan can trái */}
      <StairRailing side={-1} />
      {/* Lan can phải */}
      <StairRailing side={1} />
    </group>
  );
}

function StairRailing({ side }) {
  const railX = side * (STAIR_W / 2 + 0.12);
  return (
    <group>
      {/* Cột lan can mỗi 2 bậc */}
      {Array.from({ length: Math.ceil(STAIR_STEPS / 2) }).map((_, j) => {
        const i = j * 2;
        const py = i * STAIR_H_EA + STAIR_H_EA * 0.5 + 0.55;
        const pz = STAIR_BASE_Z - i * STAIR_D_EA - STAIR_D_EA / 2;
        return (
          <mesh key={j} position={[railX, py, pz]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.1, 8]} />
            <meshStandardMaterial color={C.stoneLight} roughness={0.6} />
          </mesh>
        );
      })}
      {/* Thanh tay vịn dài chạy dọc */}
      <mesh
        position={[railX, UP * 0.5 + 0.6, STAIR_BASE_Z - STAIR_STEPS * STAIR_D_EA / 2]}
        rotation={[Math.atan2(UP, STAIR_STEPS * STAIR_D_EA), 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.1, 0.1, Math.hypot(UP, STAIR_STEPS * STAIR_D_EA) + 0.3]} />
        <meshStandardMaterial color={C.wood} roughness={0.6} />
      </mesh>
    </group>
  );
}

// ─── Cổng phòng (Portal Door) ─────────────────────────────────────────────────
// Đặt áp vào tường bên (x = ±HW), vòm nửa tròn + bảng tên
function PortalDoor({ side, z, label, icon, unlocked, onClick }) {
  const wx  = side > 0 ? HW - 0.08 : -HW + 0.08;
  const rot = side > 0 ? -Math.PI / 2 : Math.PI / 2;
  const dW  = 2.4;   // rộng cổng
  const dH  = 3.2;   // cao cổng
  const archR = dW / 2;
  const [hovered, setHovered] = React.useState(false);

  // Mở khóa thì màu gỗ sáng hơn, khóa thì tối xỉn
  const doorColor = unlocked ? (hovered ? '#96614d' : C.door) : '#4a362e';

  return (
    <group
      position={[wx, 0, z]}
      rotation={[0, rot, 0]}
      onClick={(e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        if (onClick) onClick(e);
      }}
      onPointerOver={(e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setHovered(true);
        if (unlocked) document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Khung cổng trái */}
      <mesh position={[-archR - 0.14, dH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.28, dH, 0.5]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.7} />
      </mesh>
      {/* Khung cổng phải */}
      <mesh position={[archR + 0.14, dH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.28, dH, 0.5]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.7} />
      </mesh>
      {/* Cửa gỗ (fill) */}
      <mesh position={[0, dH / 2, 0.1]} receiveShadow>
        <boxGeometry args={[dW, dH, 0.1]} />
        <meshStandardMaterial color={doorColor} roughness={0.9} />
      </mesh>
      {/* Ổ khóa (nếu chưa mở) */}
      {!unlocked && (
        <group position={[0, dH / 2, 0.16]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.4, 0.05]} />
            <meshStandardMaterial color="#333" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color="#ff4444" />
          </mesh>
        </group>
      )}
      {/* Vòm nửa tròn */}
      <mesh position={[0, dH, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[archR, 0.18, 8, 14, Math.PI]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.7} />
      </mesh>
      {/* Đá điền vào vòm (fill vòm nửa tròn) */}
      <mesh position={[0, dH + archR * 0.5, 0.05]}>
        <cylinderGeometry args={[archR - 0.02, archR - 0.02, 0.06, 14, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      {/* Bảng tên */}
      <group position={[0, dH + archR + 0.35, 0.15]}>
        <mesh castShadow>
          <boxGeometry args={[dW + 0.3, 0.52, 0.08]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Balcony Tầng 2 ───────────────────────────────────────────────────────────
function Balcony({ side, fromZ, toZ }) {
  const bx  = side * (HW - 1.2);
  const dz  = Math.abs(toZ - fromZ);
  const midZ = (fromZ + toZ) / 2;
  const bW  = 2.4;
  const postCount = Math.floor(dz / 0.7) + 1;

  return (
    <group>
      {/* Sàn balcony */}
      <mesh position={[bx, UP + 0.08, midZ]} receiveShadow castShadow>
        <boxGeometry args={[bW, 0.22, dz]} />
        <meshStandardMaterial color={C.stoneLight} roughness={0.65} />
      </mesh>
      {/* Cột lan can nhỏ */}
      {Array.from({ length: postCount }).map((_, i) => (
        <mesh
          key={i}
          position={[bx - side * (bW / 2 - 0.15), UP + 0.85, fromZ + i * (dz / (postCount - 1 || 1))]}
          castShadow
        >
          <cylinderGeometry args={[0.05, 0.05, 1.3, 8]} />
          <meshStandardMaterial color={C.stoneLight} roughness={0.6} />
        </mesh>
      ))}
      {/* Tay vịn ngang */}
      <mesh position={[bx - side * (bW / 2 - 0.15), UP + 1.5, midZ]} castShadow>
        <boxGeometry args={[0.1, 0.1, dz]} />
        <meshStandardMaterial color={C.wood} roughness={0.6} />
      </mesh>
    </group>
  );
}

// ─── Cổng Boss (Boss Gate) - Được dời ra mép ban công (z=-8) ────────────────────
function BossGate({ onEnter }) {
  const gW = 4.5;
  const gH = 5.5;
  const baseY = UP + 0.5; // Đặt trên nền đài cao
  const [hovered, setHovered] = React.useState(false);

  return (
    <group
      position={[0, baseY, -8]}
      onClick={(e) => {
        e.stopPropagation();
        if (onEnter) onEnter();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Tháp đá trái */}
      <mesh position={[-gW / 2 - 0.7, gH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, gH, 1.0]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.7} />
      </mesh>
      {/* Tháp đá phải */}
      <mesh position={[gW / 2 + 0.7, gH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, gH, 1.0]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.7} />
      </mesh>
      {/* Khung cổng trung tâm — đồng/gỗ sẫm ấm */}
      <mesh position={[0, gH / 2, 0.1]} receiveShadow>
        <boxGeometry args={[gW, gH, 0.3]} />
        <meshStandardMaterial color={hovered ? '#8a5c32' : '#6b4423'} roughness={0.6} />
      </mesh>
      {/* Viền vàng quanh cổng */}
      <mesh position={[0, gH / 2, 0.26]}>
        <boxGeometry args={[gW + 0.12, gH + 0.12, 0.06]} />
        <meshStandardMaterial color={C.gold} roughness={0.2} metalness={0.85} />
      </mesh>
      {/* PointLight chiếu mặt cổng */}
      <pointLight position={[0, gH * 0.6, 3.5]} color="#ffd070" intensity={8} distance={10} decay={2} />
      {/* Đà ngang trên */}
      <mesh position={[0, gH + 0.3, 0]} castShadow>
        <boxGeometry args={[gW + 2.0, 0.5, 0.7]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.65} />
      </mesh>
      {/* Vòm Boss */}
      <mesh position={[0, gH, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[gW / 2, 0.28, 10, 16, Math.PI]} />
        <meshStandardMaterial color={C.gold} roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Ánh đèn vàng Boss */}
      <pointLight position={[0, gH * 0.6, 1]} color="#ffd060" intensity={6} distance={12} decay={2} />
    </group>
  );
}

// ─── Nhân vật Leo 3D & Điều khiển Bàn phím ──────────────────────────────────
function LeoCharacter({ onEnterDoor }) {
  const groupRef = useRef();
  
  // Track keys
  const keys = useRef({ w: false, a: false, s: false, d: false, up: false, down: false, left: false, right: false });
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keys.current.w = true;
      if (k === 's' || k === 'arrowdown') keys.current.s = true;
      if (k === 'a' || k === 'arrowleft') keys.current.a = true;
      if (k === 'd' || k === 'arrowright') keys.current.d = true;
    };
    const handleKeyUp = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keys.current.w = false;
      if (k === 's' || k === 'arrowdown') keys.current.s = false;
      if (k === 'a' || k === 'arrowleft') keys.current.a = false;
      if (k === 'd' || k === 'arrowright') keys.current.d = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const speed = 10;
    const move = new THREE.Vector3(0, 0, 0);

    if (keys.current.w) move.z -= 1;
    if (keys.current.s) move.z += 1;
    if (keys.current.a) move.x -= 1;
    if (keys.current.d) move.x += 1;

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed * delta);
      
      const newPos = groupRef.current.position.clone().add(move);
      
      // Giới hạn trong tường
      newPos.x = THREE.MathUtils.clamp(newPos.x, -HW + 1, HW - 1);
      newPos.z = THREE.MathUtils.clamp(newPos.z, -22, 22);

      // Cầu thang (từ z=5 đến z=2)
      if (newPos.z <= 5 && newPos.z >= 2 && Math.abs(newPos.x) < 3.5) {
        // Leo thang: lerp Y từ 0 (tại z=5) lên UP (tại z=2)
        const progress = (5 - newPos.z) / 3;
        newPos.y = progress * UP;
      } else if (newPos.z < 2) {
        // Tầng 2
        newPos.y = UP;
      } else {
        // Tầng 1
        newPos.y = 0;
      }

      groupRef.current.position.copy(newPos);
      
      // Look at direction
      const lookTarget = groupRef.current.position.clone().add(move);
      lookTarget.y = groupRef.current.position.y;
      groupRef.current.lookAt(lookTarget);

      // Trigger cửa khi đến gần
      if (onEnterDoor) {
        onEnterDoor(newPos);
      }
      // Trigger Boss Gate (Z < -6 trên tầng 2)
      if (newPos.y > UP - 1 && newPos.z < -6) {
        if (onEnterDoor) onEnterDoor(newPos, true); // isBoss = true
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 8]}>
      <group position={[0, 0.4, 0]}>
        {/* Thân */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.8} />
        </mesh>
        {/* Đầu */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.6} />
        </mesh>
        {/* Mắt */}
        <mesh position={[-0.15, 1.3, 0.36]}>
          <boxGeometry args={[0.1, 0.1, 0.05]} />
          <meshBasicMaterial color="#000" />
        </mesh>
        <mesh position={[0.15, 1.3, 0.36]}>
          <boxGeometry args={[0.1, 0.1, 0.05]} />
          <meshBasicMaterial color="#000" />
        </mesh>
        {/* Tai trái */}
        <mesh position={[-0.3, 1.6, 0]} castShadow>
          <boxGeometry args={[0.2, 0.3, 0.2]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.8} />
        </mesh>
        {/* Tai phải */}
        <mesh position={[0.3, 1.6, 0]} castShadow>
          <boxGeometry args={[0.2, 0.3, 0.2]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.8} />
        </mesh>
        {/* Tay trái */}
        <mesh position={[-0.4, 0.5, 0]} castShadow>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.7} />
        </mesh>
        {/* Tay phải */}
        <mesh position={[0.4, 0.5, 0]} castShadow>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.7} />
        </mesh>
        {/* Chân trái */}
        <mesh position={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.4, 0.2]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.9} />
        </mesh>
        {/* Chân phải */}
        <mesh position={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.4, 0.2]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// ─── SCENE CHÍNH ──────────────────────────────────────────────────────────────
export default function CitadelHallScene({ roomStatuses = [], onPortalEnter }) {
  // Trạng thái debounce để không gọi onPortalEnter liên tục
  const [lastEntered, setLastEntered] = useState(null);

  // Vị trí cột arcade (tầng 2): z = 0, -3, -6
  const arcadeColZ = [0, -3, -6];

  // Ánh xạ 7 cánh cửa (5 thật + 2 giả):
  // Dời các cửa vào các vị trí z=3, z=7, z=11 để lọt vào khung hình camera
  const doors = [
    { idx: 0, side: -1, z: 7,   y: 0,  label: '📖 Story World',   icon: '📖', isFake: false },
    { idx: 1, side: -1, z: 3,   y: 0,  label: '🔬 Action Lab',    icon: '🔬', isFake: false },
    { idx: 5, side: -1, z: 11,  y: 0,  label: '❓ Mystery Vault', icon: '❓', isFake: true },
    { idx: 2, side:  1, z: 7,   y: 0,  label: '⚡ Arena',         icon: '⚡', isFake: false },
    { idx: 3, side:  1, z: 3,   y: 0,  label: '✍️ Creator Studio',icon: '✍️', isFake: false },
    { idx: 6, side:  1, z: 11,  y: 0,  label: '🕳️ Secret Room',    icon: '🔒', isFake: true },
  ];

  const handleLeoProximity = (leoPos, isBoss = false) => {
    if (isBoss) {
      if (lastEntered !== 'boss') {
        setLastEntered('boss');
        if (onPortalEnter) onPortalEnter({ isBoss: true });
      }
      return;
    }

    // Kiểm tra khoảng cách với các cửa
    for (let door of doors) {
      const status = roomStatuses.find(r => r.dayIndex === door.idx) || { unlocked: false };
      if (!door.isFake && !status.unlocked) continue;

      const doorX = door.side > 0 ? HW : -HW;
      const doorZ = door.z;
      const doorY = door.y;
      
      const dx = leoPos.x - doorX;
      const dy = leoPos.y - doorY;
      const dz = leoPos.z - doorZ;
      const distSq = dx*dx + dy*dy + dz*dz;
      
      if (distSq < 4.0) { // Bán kính 2m
        if (lastEntered !== door.idx) {
          setLastEntered(door.idx);
          if (onPortalEnter) onPortalEnter({ dayIndex: door.idx });
        }
        return;
      }
    }
  };

  return (
    <group>
      <SceneBG />

      {/* ── Ánh sáng chính ── */}
      <ambientLight color="#fff8ee" intensity={0.9} />
      <directionalLight
        position={[5, 18, 10]}
        color="#fff5d8"
        intensity={2.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={55}
        shadow-camera-left={-HW - 1}
        shadow-camera-right={HW + 1}
        shadow-camera-top={HD}
        shadow-camera-bottom={-HD}
        shadow-bias={-0.001}
      />
      {/* Ánh sáng dịu tầng 2 (cửa sổ) */}
      <pointLight position={[0, 8, -HD + 1]} color="#c8e8ff" intensity={4} distance={18} decay={2} />

      {/* ──────────────────────────────────────────
          SÀN & TRẦN & TƯỜNG
      ────────────────────────────────────────── */}

      {/* ── Mặt đất (Floor) ── */}
      <TiledFloor y={0} w={W} d={D} cx={0} cz={0} repX={15} repZ={25} />

      {/* Sàn tầng 2 (UPPER level: z từ +2 đến -9) */}
      <TiledFloor y={UP + 0.01} w={W} d={11} cx={0} cz={-3.5} repX={7} repZ={5} />

      {/* Trần */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, 0]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.85} side={THREE.BackSide} />
      </mesh>

      {/* Trần nhà mở rộng với Murals */}
      <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color="#1a1c23" roughness={0.9} />
      </mesh>
      {/* Họa tiết trần (Murals - Glowing geometry) */}
      <mesh position={[0, H - 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 4, D - 4]} />
        <meshStandardMaterial color="#ffd700" roughness={0.4} emissive="#ffc800" emissiveIntensity={0.1} wireframe />
      </mesh>
      {/* Tường TRÁI (x=-HW) - Đã được phục hồi */}
      <mesh position={[-HW, H / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color={C.stone} roughness={0.8} />
      </mesh>
      {/* Tường PHẢI (x=+HW) */}
      <mesh position={[HW, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color={C.stone} roughness={0.8} />
      </mesh>
      {/* Tường HẬU (Boss wall, z=-HD) */}
      <mesh position={[0, H / 2, -HD]} receiveShadow>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color={C.bossWall} roughness={0.75} />
      </mesh>
      {/* Tường TRƯỚC (entrance, z=+HD) */}
      <mesh position={[0, H / 2, HD]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color={C.stone} roughness={0.8} />
      </mesh>

      {/* Bậc tường phân tầng (ledge từ tầng 1 lên tầng 2, ở z=+2) */}
      <mesh position={[0, UP / 2, 1.8]} castShadow receiveShadow>
        <boxGeometry args={[W, UP, 0.5]} />
        <meshStandardMaterial color={C.stoneDark} roughness={0.7} />
      </mesh>

      {/* ──────────────────────────────────────────
          THẢM
      ────────────────────────────────────────── */}
      {/* Thảm xanh tầng 1 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 3.5]} receiveShadow>
        <planeGeometry args={[2.4, 7]} />
        <meshStandardMaterial color={C.carpetRed} roughness={0.85} />
      </mesh>
      {/* Thảm xanh tầng 2 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, UP + 0.04, -3.5]} receiveShadow>
        <planeGeometry args={[2.4, 9]} />
        <meshStandardMaterial color={C.carpetRed} roughness={0.85} />
      </mesh>

      {/* ──────────────────────────────────────────
          CẦU THANG TRUNG TÂM (điểm nhấn chính)
      ────────────────────────────────────────── */}
      <GrandStaircase />

      {/* ──────────────────────────────────────────
          NHÂN VẬT LEO
      ────────────────────────────────────────── */}
      <LeoCharacter onEnterDoor={handleLeoProximity} />

      {/* CỘT ARCADE (arcade tầng 2, theo HW mới) */}
      {arcadeColZ.map((z) => (
        <React.Fragment key={z}>
          <Column x={-HW + 2} y={UP} z={z} height={5} r={0.32} />
          <Column x={HW - 2}  y={UP} z={z} height={5} r={0.32} />
        </React.Fragment>
      ))}

      {/* Vòm đá giữa các cặp cột arcade */}
      {[[ 0, -3], [-3, -6]].map(([z1, z2], i) => (
        <React.Fragment key={i}>
          <Arch x={-HW + 2} fromZ={z1} toZ={z2} y={UP + 5} />
          <Arch x={HW - 2}  fromZ={z1} toZ={z2} y={UP + 5} />
        </React.Fragment>
      ))}

      {/* ĐUỐC */}
      {arcadeColZ.map((z) => (
        <React.Fragment key={z}>
          <Torch x={-HW + 2.45} y={UP + 1.5} z={z} />
          <Torch x={HW - 2.45}  y={UP + 1.5} z={z} />
        </React.Fragment>
      ))}
      {[-1, 3, 7, 11].map((z) => (
        <React.Fragment key={`walltorch-${z}`}>
          <Torch x={-HW + 0.1} y={4} z={z} />
          <Torch x={HW - 0.1}  y={4} z={z} />
        </React.Fragment>
      ))}

      {/* ──────────────────────────────────────────
          CỔNG PHÒNG (5 CHAMBERS)
      ────────────────────────────────────────── */}
      {doors.map((door) => {
        const status = roomStatuses.find(r => r.dayIndex === door.idx) || { unlocked: false };
        return (
          <group key={`door-${door.idx}`} position={[0, door.y, 0]}>
            <PortalDoor
              side={door.side}
              z={door.z}
              label={door.label}
              icon={door.icon}
              unlocked={door.isFake ? true : status.unlocked}
              onClick={(e) => {
                if (e && e.stopPropagation) e.stopPropagation();
                if (door.isFake || status.unlocked) {
                  if (onPortalEnter) onPortalEnter({ dayIndex: door.idx });
                }
              }}
            />
          </group>
        );
      })}

      {/* ──────────────────────────────────────────
          BALCONY TẦNG 2 (2 bên từ z=+2 đến z=-8)
      ────────────────────────────────────────── */}
      <Balcony side={-1} fromZ={-8} toZ={1.8} />
      <Balcony side={1}  fromZ={-8} toZ={1.8} />

      {/* ──────────────────────────────────────────
          ĐÈN CHÙM (Trang trí rực rỡ hơn)
      ────────────────────────────────────────── */}
      <Chandelier x={0} z={5} />
      <Chandelier x={0} z={-2} />
      <Chandelier x={-8} z={2} />
      <Chandelier x={8} z={2} />

      {/* ──────────────────────────────────────────
          CỔNG BOSS NÂNG CẤP
      ────────────────────────────────────────── */}
      <BossGate
        onEnter={() => {
          if (onPortalEnter) onPortalEnter({ isBoss: true });
        }}
      />
    </group>
  );
}

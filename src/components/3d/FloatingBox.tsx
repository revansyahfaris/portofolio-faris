'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingBox() {
  // Explicitly type `THREE.Mesh` agar properti .rotation dan .position tidak dianggap 'never'
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.6 : 1.3}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1.5, 0]} />
      <MeshDistortMaterial
        color={hovered ? '#818cf8' : '#6366f1'}
        attach="material"
        distort={0.25}
        speed={1.5}
        roughness={0.3}
        metalness={0.5}
      />
    </mesh>
  );
}
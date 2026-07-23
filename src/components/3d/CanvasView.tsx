'use client';

import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import FloatingBox from './FloatingBox';

export default function CanvasView() {
  return (
    <div className="h-full w-full">
      <Canvas 
        dpr={[1, 1.5]} 
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
          <FloatingBox />
        </Float>

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
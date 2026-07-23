'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sfx } from '../../lib/sfx';

interface TechNode {
  id: string;
  category: string;
  primaryTech: string;
  skills: string[];
  color: number;
  position: [number, number, number];
}

const TECH_NODES: TechNode[] = [
  {
    id: 'ARCH-01',
    category: 'FULL-STACK WEB',
    primaryTech: 'Next.js & FastAPI',
    skills: ['TypeScript', 'React Flow', 'Express.js', 'REST & GraphQL'],
    color: 0xdc2626, // Crimson Red
    position: [-1.4, 0.8, 0],
  },
  {
    id: 'ARCH-02',
    category: 'EMBEDDED SYSTEMS',
    primaryTech: 'C++ & Microcontrollers',
    skills: ['Python / OpenCV', 'Google MediaPipe', 'Sensors & Hardware', 'Multi-Threading'],
    color: 0x0d9488, // Teal
    position: [1.4, 0.8, 0],
  },
  {
    id: 'ARCH-03',
    category: 'DATABASE & SECURITY',
    primaryTech: 'PostgreSQL & Encryption',
    skills: ['Neon Postgres', 'Fernet AES-128', 'Relational Joins', 'Audit Logs'],
    color: 0xf59e0b, // Amber
    position: [0, -1.2, 0.5],
  },
];

export default function AtlusThreeCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeTech, setActiveTech] = useState<TechNode>(TECH_NODES[0]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 400;
    const height = currentMount.clientHeight || 450;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Center Rotating Core / Radar Rings
    const group = new THREE.Group();
    scene.add(group);

    const ringGeo = new THREE.RingGeometry(1.8, 1.82, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x3f3f46, side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    group.add(ringMesh);

    // 3. Create 3D Nodes for Each Tech Archetype
    const nodeMeshes: THREE.Mesh[] = [];

    TECH_NODES.forEach((node) => {
      const geo = new THREE.OctahedronGeometry(0.45, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...node.position);

      // Inner Solid Core
      const coreGeo = new THREE.OctahedronGeometry(0.25, 0);
      const coreMat = new THREE.MeshBasicMaterial({ color: node.color });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      mesh.add(coreMesh);

      group.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Connecting Lines Between Nodes
    const points = TECH_NODES.map((n) => new THREE.Vector3(...n.position));
    points.push(new THREE.Vector3(...TECH_NODES[0].position)); // Close loop
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineDashedMaterial({
      color: 0x52525b,
      dashSize: 0.1,
      gapSize: 0.05,
    });
    const line = new THREE.Line(lineGeo, lineMat);
    line.computeLineDistances();
    group.add(line);

    // 4. Render & Animation Loop
    let animationFrameId: number;
    const animate = () => {
      group.rotation.y += 0.004;

      // Pulse & spin nodes
      nodeMeshes.forEach((mesh, i) => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        mesh.position.y =
          TECH_NODES[i].position[1] + Math.sin(Date.now() * 0.002 + i) * 0.05;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleSelectTech = (node: TechNode) => {
    sfx.playSelect();
    setActiveTech(node);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[480px] flex flex-col justify-between items-center select-none">
      
      {/* 3D CANVAS INTERACTIVE STAGE */}
      <div ref={mountRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* TOP CONTROLS: INTERACTIVE ARCHETYPE SWITCHER */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 pt-2">
        {TECH_NODES.map((node) => (
          <button
            key={node.id}
            onClick={() => handleSelectTech(node)}
            onMouseEnter={() => sfx.playHover()}
            className={`font-mono text-[10px] px-3 py-1 -skew-x-12 transition-all border ${
              activeTech.id === node.id
                ? 'bg-red-600 text-white border-white scale-105 shadow-[0_0_15px_rgba(220,38,38,0.8)]'
                : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:border-red-500 hover:text-white'
            }`}
          >
            {node.id}{node.category}
          </button>
        ))}
      </div>

      {/* BOTTOM DISPLAY HUD: DYNAMIC TECH STACK OVERLAY */}
      <div
        className="relative z-10 w-full max-w-sm bg-zinc-900/95 border-2 border-red-600 p-4 shadow-2xl -rotate-1 transition-all duration-300 backdrop-blur-none"
        style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 92%)' }}
      >
        <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2">
          <span className="font-mono text-[10px] font-bold text-teal-400">
            [ ARCHETYPE: {activeTech.id} ]
          </span>
          <span className="font-mono text-[10px] text-zinc-500 uppercase">
            3D TECH RADAR
          </span>
        </div>

        <h3 className="font-serif font-black text-lg text-white uppercase leading-tight mb-1">
          {activeTech.primaryTech}
        </h3>

        <p className="font-mono text-[10px] text-red-500 font-bold mb-3">
          CORE DOMAIN: {activeTech.category}
        </p>

        {/* SKILLS CHIPS */}
        <div className="flex flex-wrap gap-1.5">
          {activeTech.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 bg-zinc-950 text-zinc-300 border border-zinc-800 -skew-x-6"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
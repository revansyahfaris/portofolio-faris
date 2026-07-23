'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AtlusThreeCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.6, 0);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);

    const innerGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x0d9488,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);

    const shapeGroup = new THREE.Group();
    shapeGroup.add(wireframeMesh);
    shapeGroup.add(innerMesh);
    scene.add(shapeGroup);

    let animationFrameId: number;
    const animate = () => {
      shapeGroup.rotation.x += 0.005;
      shapeGroup.rotation.y += 0.008;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      innerGeometry.dispose();
      wireframeMaterial.dispose();
      innerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[300px] md:h-[450px] flex items-center justify-center pointer-events-none"
    />
  );
}
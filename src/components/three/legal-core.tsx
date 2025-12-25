"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const Core = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color={"#22d3ee"}
          metalness={0.9}
          roughness={0.2}
          emissive={"#0ea5e9"}
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2, 0.06, 32, 180]} />
        <meshStandardMaterial
          color={"#e36a2e"}
          emissive={"#e36a2e"}
          emissiveIntensity={0.7}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 5, Math.PI / 9]}>
        <torusGeometry args={[1.5, 0.04, 32, 120]} />
        <meshStandardMaterial
          color={"#8b5cf6"}
          emissive={"#8b5cf6"}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <pointLight position={[3, 2, 3]} intensity={30} color={"#22d3ee"} />
      <pointLight position={[-3, -2, -2]} intensity={10} color={"#e36a2e"} />
    </group>
  );
};

export const LegalCore = () => {
  return (
    <div className="h-[320px] w-full">
      <Canvas dpr={[1, 1.8]} gl={{ antialias: true }}>
        <color attach="background" args={["transparent"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Core />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

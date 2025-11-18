import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

function OnexxatronModel() {
  const group = useRef();

  const { scene, animations } = useGLTF("/public/untitledRigged Robot.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      const clipNames = Object.keys(actions);
      if (clipNames.length > 0) {
        // Play first animation and loop
        actions[clipNames[0]].reset().play();
        actions[clipNames[0]].setLoop(THREE.LoopRepeat);
      }
    }
  }, [actions]);

  // Subtle idle rotation so it looks alive
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return <primitive ref={group} object={scene} scale={1} position={[0, -1, 0]} />;
}

export default function RobotAnimation() {
  return (
    <div style={{ width: "100%", height: "700px" }}>
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OnexxatronModel />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, useAnimations } from "@react-three/drei";
import * as THREE from "three";

function OnexxatronModel() {
  const group = useRef();

  // Load GLB model
  const { scene: glbScene, animations } = useGLTF("/public/2robo.glb"); // ✅ path
  const model = React.useMemo(() => glbScene.clone(true), [glbScene]); // deep clone for skeleton

  // Setup animations
  const { actions } = useAnimations(animations, model);

  // Stop all GLB animations only
  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => action.stop());
  }, [actions]);

  // Apply custom pose and force skeleton update
  useEffect(() => {
  if (!model) return;

  const rUpper = model.getObjectByName("CC_Base_R_Upperarm");
  const rFore = model.getObjectByName("CC_Base_R_Forearm");
  const rHand = model.getObjectByName("CC_Base_R_Hand");

  const lUpper = model.getObjectByName("CC_Base_L_Upperarm");
  const lFore = model.getObjectByName("CC_Base_L_Forearm");
  const lHand = model.getObjectByName("CC_Base_L_Hand");

  // Right arm downward
  if (rUpper) rUpper.rotation.set(THREE.MathUtils.degToRad(-10), 0, THREE.MathUtils.degToRad(-75));
  if (rFore) rFore.rotation.set(0, 0, THREE.MathUtils.degToRad(-15));
  if (rHand) rHand.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(10), 0);

  // Left arm downward (mirrored)
  if (lUpper) lUpper.rotation.set(THREE.MathUtils.degToRad(-10), 0, THREE.MathUtils.degToRad(-75));
  if (lFore) lFore.rotation.set(0, 0, THREE.MathUtils.degToRad(-15));
  if (lHand) lHand.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(10), 0);

  model.traverse((obj) => {
    if (obj.isSkinnedMesh) {
      obj.skeleton.pose();
      obj.updateMatrixWorld(true);
    }
  });

  model.traverse((obj) => {
    if (obj.isMesh && obj.material) {
      obj.material.metalness = 0.85;
      obj.material.roughness = 0.25;
      obj.material.envMapIntensity = 1.3;
    }
  });
}, [model]);


  return <primitive ref={group} object={model} scale={1} position={[0, 0, 0]} />;
}

export default function RobotAnimation() {
  return (
    <div style={{ width: "100%", height: "700px" }}>
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Environment preset="city" environmentIntensity={0.4} />
        <OnexxatronModel />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

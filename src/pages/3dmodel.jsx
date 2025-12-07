/* 3dmodel.js */
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// Make this the DEFAULT export
export default function OnexxatronModel() {
  const group = useRef();
  
  // Ensure path is correct (files in public folder are accessed via root "/")
  const { scene: glbScene, animations } = useGLTF("/2robo_optimized.glb");
  const model = React.useMemo(() => glbScene.clone(true), [glbScene]);

  const { actions } = useAnimations(animations, model);

  // Stop animations initially
  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => action.stop());
  }, [actions]);

  // Pose and Material adjustments
  useEffect(() => {
    if (!model) return;

    // Apply rotations
    const rUpper = model.getObjectByName("CC_Base_R_Upperarm");
    const rFore = model.getObjectByName("CC_Base_R_Forearm");
    const rHand = model.getObjectByName("CC_Base_R_Hand");
    const lUpper = model.getObjectByName("CC_Base_L_Upperarm");
    const lFore = model.getObjectByName("CC_Base_L_Forearm");
    const lHand = model.getObjectByName("CC_Base_L_Hand");

    if (rUpper) rUpper.rotation.set(THREE.MathUtils.degToRad(-10), 0, THREE.MathUtils.degToRad(-75));
    if (rFore) rFore.rotation.set(0, 0, THREE.MathUtils.degToRad(-15));
    if (rHand) rHand.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(10), 0);
    if (lUpper) lUpper.rotation.set(THREE.MathUtils.degToRad(-10), 0, THREE.MathUtils.degToRad(-75));
    if (lFore) lFore.rotation.set(0, 0, THREE.MathUtils.degToRad(-15));
    if (lHand) lHand.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(10), 0);

    // Apply materials
    model.traverse((obj) => {
      if (obj.isSkinnedMesh) {
        obj.skeleton.pose();
        obj.updateMatrixWorld(true);
      }
      if (obj.isMesh && obj.material) {
        obj.material.metalness = 0.85;
        obj.material.roughness = 0.25;
        obj.material.envMapIntensity = 1.3;
      }
    });
  }, [model]);

  return (
    <group ref={group}>
      <primitive object={model} scale={1} position={[0, -1, 0]} />
      
      {/* Lighting attached to model group */}
      <spotLight
        color="#016396"
        intensity={100}
        distance={5}
        angle={Math.PI / 5.5}
        penumbra={0.5}
        decay={2}
        position={[0, 0.2, 3]}
      />
    </group>
  );
}

// Preload to prevent loading delays
useGLTF.preload("/public/2robo_optimized.glb");
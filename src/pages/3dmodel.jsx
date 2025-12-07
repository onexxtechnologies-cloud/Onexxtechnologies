import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, useAnimations } from "@react-three/drei";
import * as THREE from "three";

function OnexxatronModel() {
  const group = useRef();
  const glowLight = useRef();

  const { scene: glbScene, animations } = useGLTF("/2robo_optimized.glb");
  const model = React.useMemo(() => glbScene.clone(true), [glbScene]);

  const { actions } = useAnimations(animations, model);

  // Stop animations
  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => action.stop());
  }, [actions]);

  // Pose adjustments
  useEffect(() => {
    if (!model) return;

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

  // ⭐ ADD GLOWING POINT LIGHT IN CENTER
useEffect(() => {
  if (!model) return;

  const light = new THREE.SpotLight("#016396", 10, 5, Math.PI / 5.5, 0.5, 2);
  light.position.set(0, 0.2, 3);        // position of spotlight
  

  model.add(light);
  

  glowLight.current = light;
}, [model]);


  return (
    <group ref={group}>
      <primitive object={model} scale={1} position={[0, 0, 0]} />
    </group>
  );
}

export default function RobotAnimation() {
  const robotRef = useRef();

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Environment preset="city" environmentIntensity={0.4} />

        <group ref={robotRef}>
          <OnexxatronModel />
        </group>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

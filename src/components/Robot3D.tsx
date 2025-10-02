import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function RobotModel() {
  const group = useRef<any>();
  const { scene } = useGLTF("/images/models/space_maintenance_robot.glb");

  // Rotación automática
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={group} object={scene} scale={2} />;
}

export default function Robot3D() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        {/* Luces */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Robot */}
        <RobotModel />

        {/* Controles */}
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}

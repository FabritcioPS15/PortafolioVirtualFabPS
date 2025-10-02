// src/components/Enhanced3DRobot.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface Enhanced3DRobotProps {
  position?: 'bottom-right' | 'bottom-left';
  size?: 'small' | 'medium' | 'large';
}

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

const Enhanced3DRobot: React.FC<Enhanced3DRobotProps> = ({
  position = 'bottom-right',
  size = 'medium',
}) => {
  const sizes = {
    small: '200px',
    medium: '300px',
    large: '400px',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: position === 'bottom-right' ? '20px' : 'auto',
        left: position === 'bottom-left' ? '20px' : 'auto',
        width: sizes[size],
        height: sizes[size],
        zIndex: 50,
      }}
    >
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} />
        <Suspense fallback={null}>
          {/* 👇 Cambia la ruta por tu archivo descargado */}
          <Model url="/models/robot.glb" />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Enhanced3DRobot;

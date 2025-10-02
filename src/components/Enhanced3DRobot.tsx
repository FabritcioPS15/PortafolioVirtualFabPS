// src/components/Enhanced3DRobot.tsx
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';
import * as THREE from 'three';

interface Enhanced3DRobotProps {
  position?: 'bottom-right' | 'bottom-left';
  size?: 'small' | 'medium' | 'large';
}

const Model = ({ url, themeColors, mousePosition }: { url: string; themeColors: any; mousePosition: { x: number; y: number } }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const [processedScene, setProcessedScene] = useState<THREE.Group | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<string>('');
  const [rotationProgress, setRotationProgress] = useState(0);
  const rotationStartRef = useRef<number>(0);
  
  // Detectar cambio de tema
  const currentThemeKey = `${themeColors.primary}-${themeColors.secondary}-${themeColors.accent}`;
  
  useEffect(() => {
    if (previousTheme && previousTheme !== currentThemeKey) {
      // El tema cambió, activar animación de rotación
      console.log('🎨 TEMA CAMBIADO! Activando rotación de 360°...');
      setIsRotating(true);
      setRotationProgress(0);
      rotationStartRef.current = 0;
      
      // Detener la rotación después de completar 360 grados (aproximadamente 2 segundos)
      setTimeout(() => {
        setIsRotating(false);
        setRotationProgress(0);
        console.log('🛑 Rotación de 360° completada');
      }, 2000);
    }
    setPreviousTheme(currentThemeKey);
  }, [currentThemeKey, previousTheme]);

  // Animación de frame
  useFrame((state, delta) => {
    if (modelRef.current) {
      if (isRotating) {
        // ROTACIÓN DE 360 GRADOS EXACTOS - TODO EL ROBOT
        const rotationSpeed = Math.PI; // π radianes por segundo = 180° por segundo
        const newProgress = rotationProgress + (delta * rotationSpeed);
        
        // Completar exactamente una vuelta (2π radianes = 360°)
        if (newProgress >= Math.PI * 2) {
          modelRef.current.rotation.y = rotationStartRef.current + Math.PI * 2;
          setRotationProgress(Math.PI * 2);
        } else {
          modelRef.current.rotation.y = rotationStartRef.current + newProgress;
          setRotationProgress(newProgress);
        }
        
        // Efecto de oscilación durante la rotación
        modelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.1;
        
        // Efecto de escala pulsante durante la rotación
        const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
        modelRef.current.scale.setScalar(scale * 0.8);
      } else {
        // SEGUIMIENTO NATURAL DEL MOUSE - SIN INVERSIONES
        const targetRotationY = (mousePosition.x - 0.5) * 1.5; // Horizontal: reducir sensibilidad
        // Eje Y natural: arriba = arriba, abajo = abajo
        const targetRotationX = (mousePosition.y - 0.5) * 1.2; // Vertical: natural y menos sensible
        
        // Interpolación más rápida y responsiva
        const lerpFactor = delta * 4.0; // Velocidad aumentada para mejor respuesta
        
        // Límites más conservadores para seguimiento natural
        const maxRotationY = Math.PI / 3; // ~60 grados máximo
        const maxRotationX = Math.PI / 4; // ~45 grados máximo
        
        const clampedTargetY = Math.max(-maxRotationY, Math.min(maxRotationY, targetRotationY));
        const clampedTargetX = Math.max(-maxRotationX, Math.min(maxRotationX, targetRotationX));
        
        if (headRef.current) {
          // SEGUIMIENTO CONTINUO - Interpolación directa hacia el objetivo
          headRef.current.rotation.y = headRef.current.rotation.y + (clampedTargetY - headRef.current.rotation.y) * lerpFactor;
          headRef.current.rotation.x = headRef.current.rotation.x + (clampedTargetX - headRef.current.rotation.x) * lerpFactor;
          
          // Debug del seguimiento natural de cabeza
          if (Math.random() < 0.008) {
            console.log('🎯 Natural head tracking:', {
              mouseX: mousePosition.x.toFixed(2),
              mouseY: mousePosition.y.toFixed(2),
              targetY: (clampedTargetY * 180 / Math.PI).toFixed(1) + '°',
              targetX: (clampedTargetX * 180 / Math.PI).toFixed(1) + '°',
              currentY: (headRef.current.rotation.y * 180 / Math.PI).toFixed(1) + '°',
              currentX: (headRef.current.rotation.x * 180 / Math.PI).toFixed(1) + '°',
              lerpSpeed: lerpFactor.toFixed(2)
            });
          }
        } else {
          // FALLBACK SUAVE: Si no se encontró cabeza, rotar todo el modelo
          const fallbackTargetY = targetRotationY * 0.7; // Reducir intensidad para suavidad
          const fallbackTargetX = targetRotationX * 0.7; // Usar mismo cálculo que la cabeza
          
          const currentRotY = modelRef.current.rotation.y;
          const currentRotX = modelRef.current.rotation.x;
          
          modelRef.current.rotation.y += (fallbackTargetY - currentRotY) * lerpFactor;
          modelRef.current.rotation.x += (fallbackTargetX - currentRotX) * lerpFactor;
          
          // Debug del fallback suave
          if (Math.random() < 0.001) {
            console.log('⚠️ Smooth fallback tracking:', {
              mouseX: mousePosition.x.toFixed(2),
              mouseY: mousePosition.y.toFixed(2),
              targetY: (fallbackTargetY * 180 / Math.PI).toFixed(1) + '°',
              targetX: (fallbackTargetX * 180 / Math.PI).toFixed(1) + '°'
            });
          }
        }
        
        // Escala estable sin efectos adicionales
        modelRef.current.scale.setScalar(0.8);
      }
    }
  });

  useEffect(() => {
    if (scene && themeColors) {
      console.log('🤖 PROCESANDO MODELO CON COLORES:', themeColors);

      const clonedScene = scene.clone();

      console.log('📊 ESTRUCTURA DEL MODELO Y BÚSQUEDA DE CABEZA:');
      let objectIndex = 0;
      let foundHead: THREE.Object3D | null = null;

      clonedScene.traverse((child) => {
        console.log(`Objeto ${objectIndex}:`, child.type, child.name, child.position);

        // 👇 MOSTRAR TODOS LOS OBJETOS PARA IDENTIFICAR LA CÁMARA MANUALMENTE
        if (child instanceof THREE.Mesh) {
          console.log(`🔍 MESH DISPONIBLE: "${child.name || 'Sin nombre'}" - Posición: X:${child.position.x.toFixed(3)}, Y:${child.position.y.toFixed(3)}, Z:${child.position.z.toFixed(3)}`);
        }
        
        // 👇 PROBAR CON UN OBJETO ESPECÍFICO (cambiaremos este nombre basándonos en los logs)
        // Por ahora, usemos Object_5 como ejemplo, pero podemos cambiarlo
        if (child.name === 'Object_2') {
          foundHead = child;
          console.log('🎯 USANDO COMO CÁMARA:', child.name, 'Pos:', child.position);
        }

        objectIndex++;

        if (child instanceof THREE.Mesh) {
          console.log(`  📦 Mesh encontrado: ${child.name || 'Sin nombre'}`);

          if (child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];

            materials.forEach((mat, matIndex) => {
              const newMaterial = new THREE.MeshStandardMaterial();
              const originalMat = mat as THREE.MeshStandardMaterial;

              if (originalMat.map) newMaterial.map = originalMat.map;
              if (originalMat.normalMap) newMaterial.normalMap = originalMat.normalMap;
              if (originalMat.roughnessMap) newMaterial.roughnessMap = originalMat.roughnessMap;
              if (originalMat.metalnessMap) newMaterial.metalnessMap = originalMat.metalnessMap;

              newMaterial.roughness = originalMat.roughness || 0.5;
              newMaterial.metalness = originalMat.metalness || 0.0;

              const originalColor = originalMat.color?.getHexString() || 'ffffff';
              console.log(`    🎨 Material ${matIndex} color original: #${originalColor}`);

              if (originalColor === 'ffffff' || originalColor === 'fefefe' || originalColor === 'f8f8f8') {
                newMaterial.color.setHex(0xffffff);
                console.log(`    ⚪ PRESERVADO: Blanco puro`);
              } else {
                newMaterial.color.setHex(parseInt(themeColors.primary.replace('#', ''), 16));
                console.log(`    🔥 CAMBIADO: #${originalColor} → ${themeColors.primary}`);
              }

              if (Array.isArray(child.material)) {
                child.material[matIndex] = newMaterial;
              } else {
                child.material = newMaterial;
              }
            });
          }
        }
      });

      if (foundHead) {
        headRef.current = foundHead;
        console.log('✅ CABEZA CONFIGURADA PARA SEGUIMIENTO:', (foundHead as any).name || 'Sin nombre');
      } else {
        console.log('⚠️ NO SE ENCONTRÓ CABEZA ESPECÍFICA - Usando modelo completo');
        headRef.current = null;
      }

      setProcessedScene(clonedScene);
      console.log('✅ MODELO PROCESADO COMPLETAMENTE');
    }
  }, [scene, themeColors]);

  // Crear key única para forzar re-render completo
  const themeKey = `${themeColors.primary}-${themeColors.secondary}-${themeColors.accent}`;
  
  if (!processedScene) {
    return null; // Mostrar nada hasta que esté procesado
  }
  
  return <primitive key={themeKey} ref={modelRef} object={processedScene} scale={0.8} position={[0, -0.5, 0]} />;
};

const Enhanced3DRobot: React.FC<Enhanced3DRobotProps> = ({
  position = 'bottom-right',
  size = 'medium',
}) => {
  const [animationState, setAnimationState] = useState<'hidden' | 'entering' | 'arrived'>('hidden');
  const [showRobot, setShowRobot] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const { colorScheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Tamaños para desktop y móvil
  const desktopSizes = {
    small: '180px',
    medium: '250px',
    large: '320px',
  };
  const mobileSizes = {
    small: '110px',
    medium: '140px',
    large: '180px',
  };

  // Obtener colores según el tema actual
  const getThemeColors = () => {
    const colorMaps = {
      'dark-blue': { primary: '#4854ff', secondary: '#6a80ff', accent: '#2b28ff' },
      'grenadier': { primary: '#f4561b', secondary: '#f77940', accent: '#d53810' },
      'forest-green': { primary: '#23d210', secondary: '#45ec2f', accent: '#15a808' },
      'voodoo': { primary: '#c372c2', secondary: '#d89ad8', accent: '#a653a3' },
      'waterloo': { primary: '#999ebb', secondary: '#aeb4cb', accent: '#787aa1' },
      'wattle': { primary: '#cec324', secondary: '#ddda32', accent: '#b19c1d' },
    };
    return colorMaps[colorScheme] || colorMaps['grenadier'];
  };

  const themeColors = getThemeColors();
  const currentThemeKey = `${themeColors.primary}-${themeColors.secondary}-${themeColors.accent}`;
  const [previousTheme, setPreviousTheme] = useState<string>('');

  // Detectar cambios de tema
  useEffect(() => {
    if (previousTheme && previousTheme !== currentThemeKey) {
      console.log('🎨 TEMA CAMBIADO en componente principal!', { 
        anterior: previousTheme, 
        nuevo: currentThemeKey 
      });
    }
    setPreviousTheme(currentThemeKey);
  }, [currentThemeKey, previousTheme]);

  // Referencias persistentes para el seguimiento del mouse
  const smoothedPositionRef = useRef({ x: 0.5, y: 0.5 });
  const lastUpdateTimeRef = useRef(Date.now());

  // Detectar móvil y escuchar cambios de tamaño
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Seguimiento del mouse/touch VERDADERAMENTE CONTINUO
  useEffect(() => {
    
    const handleMouseMove = (event: MouseEvent) => {
      // Throttle optimizado para mejor seguimiento
      const now = Date.now();
      if (now - lastUpdateTimeRef.current < 16) return; // 60fps para seguimiento más responsivo
      lastUpdateTimeRef.current = now;
      
      // Convertir posición del mouse a coordenadas normalizadas (0-1)
      const rawX = event.clientX / window.innerWidth;
      const rawY = event.clientY / window.innerHeight;
      
      // Aplicar suavizado más responsivo para mejor seguimiento
      const smoothingFactor = 0.25; // Factor más alto para mejor respuesta al mouse
      smoothedPositionRef.current.x += (rawX - smoothedPositionRef.current.x) * smoothingFactor;
      smoothedPositionRef.current.y += (rawY - smoothedPositionRef.current.y) * smoothingFactor;
      
      setMousePosition({ x: smoothedPositionRef.current.x, y: smoothedPositionRef.current.y });
      
      // Debug del seguimiento natural
      if (Math.random() < 0.012) {
        console.log('🎯 Natural mouse tracking:', { 
          rawX: rawX.toFixed(2), 
          rawY: rawY.toFixed(2),
          smoothX: smoothedPositionRef.current.x.toFixed(3),
          smoothY: smoothedPositionRef.current.y.toFixed(3),
          targetRotY: ((smoothedPositionRef.current.x - 0.5) * 1.5 * 180 / Math.PI).toFixed(1) + '°',
          targetRotX: ((smoothedPositionRef.current.y - 0.5) * 1.2 * 180 / Math.PI).toFixed(1) + '°',
          smoothFactor: smoothingFactor,
          natural: 'SIN INVERSIONES! 🎯'
        });
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        const rawX = touch.clientX / window.innerWidth;
        const rawY = touch.clientY / window.innerHeight;
        const smoothingFactor = 0.3; // un poco más suave en móvil
        smoothedPositionRef.current.x += (rawX - smoothedPositionRef.current.x) * smoothingFactor;
        smoothedPositionRef.current.y += (rawY - smoothedPositionRef.current.y) * smoothingFactor;
        setMousePosition({ x: smoothedPositionRef.current.x, y: smoothedPositionRef.current.y });
      }
    };

    // Agregar event listener
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    
    // Limpiar event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove as any);
      window.removeEventListener('touchstart', handleTouchMove as any);
    };
  }, []);

  useEffect(() => {
    // Verificar si ya se ejecutó la animación en esta sesión
    const animationPlayed = sessionStorage.getItem('robot-entrance-played');
    
    if (!animationPlayed) {
      // Primera vez en la sesión - mostrar animación
      const showTimer = setTimeout(() => {
        setShowRobot(true);
        setAnimationState('entering');
      }, 1000); // Delay de 1s para que aparezca después de que cargue la página
      
      const arriveTimer = setTimeout(() => {
        setAnimationState('arrived');
        sessionStorage.setItem('robot-entrance-played', 'true');
      }, 4000); // 3 segundos de animación de entrada

      return () => {
        clearTimeout(showTimer);
        clearTimeout(arriveTimer);
      };
    } else {
      // Ya se ejecutó la animación - mostrar robot inmediatamente
      setShowRobot(true);
      setAnimationState('arrived');
    }
  }, []);

  if (!showRobot) {
    return null; // No mostrar nada hasta que sea momento de la animación
  }

  // Calcular posiciones para la animación
  const getAnimationStyles = () => {
    const isLeft = position === 'bottom-left';
    
    switch (animationState) {
      case 'entering':
        return {
          transform: isLeft 
            ? 'translateX(-100vw) translateY(0px)' 
            : 'translateX(100vw) translateY(0px)',
          opacity: 1,
        };
      case 'arrived':
        return {
          transform: 'translateX(0px) translateY(0px)',
          opacity: 1,
        };
      default:
        return {
          transform: 'translateX(0px) translateY(0px)',
          opacity: 0,
        };
    }
  };

  return (
    <div
      className="fixed z-50 transition-all duration-3000 ease-out"
      style={{
        bottom: isMobile ? '12px' : '20px',
        right: position === 'bottom-right' ? (isMobile ? '12px' : '20px') : 'auto',
        left: position === 'bottom-left' ? (isMobile ? '12px' : '20px') : 'auto',
        width: (isMobile ? mobileSizes[size] : desktopSizes[size]),
        height: (isMobile ? mobileSizes[size] : desktopSizes[size]),
        ...getAnimationStyles(),
      }}
    >
      {/* Contenedor del robot */}
      <div className={`relative w-full h-full ${
        animationState === 'entering' ? 'robot-walking' : ''
      }`}>
      <Canvas camera={{ position: isMobile ? [0, 0.8, 3.6] : [0, 1, 3], fov: isMobile ? 70 : 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <Suspense fallback={null}>
            {/* 👇 Using the available robot model with theme colors and mouse tracking */}
            <Model url="/images/models/robotinteractivo.glb" themeColors={themeColors} mousePosition={mousePosition} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
      </div>
      
      {/* Efectos durante la animación de entrada */}
      {animationState === 'entering' && (
        <>
          {/* Rastro de movimiento */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute bottom-2 left-1/2 w-3 h-1 rounded-full animate-pulse" 
              style={{ 
                transform: 'translateX(-50%)',
                backgroundColor: `${themeColors.primary}99` // 60% opacity
              }} 
            />
            <div 
              className="absolute bottom-1 left-1/2 w-2 h-1 rounded-full animate-pulse animation-delay-200" 
              style={{ 
                transform: 'translateX(-50%)',
                backgroundColor: `${themeColors.secondary}66` // 40% opacity
              }} 
            />
          </div>
          
          {/* Partículas de movimiento */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-1/2 left-2 w-1 h-1 rounded-full animate-bounce" 
              style={{ backgroundColor: themeColors.primary }}
            />
            <div 
              className="absolute top-1/3 right-2 w-1 h-1 rounded-full animate-bounce animation-delay-200" 
              style={{ backgroundColor: themeColors.secondary }}
            />
            <div 
              className="absolute bottom-1/3 left-1/2 w-1 h-1 rounded-full animate-bounce animation-delay-400" 
              style={{ backgroundColor: themeColors.accent }}
            />
          </div>
        </>
      )}
      
      {/* Efectos durante el cambio de tema (rotación) */}
      {previousTheme && previousTheme !== currentThemeKey && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Anillo de energía giratorio */}
          <div 
            className="absolute inset-2 border-2 rounded-full animate-spin"
            style={{ 
              borderColor: `${themeColors.primary}80`,
              borderTopColor: themeColors.primary,
              animationDuration: '1s'
            }}
          />
          
          {/* Partículas de transformación */}
          <div className="absolute inset-0">
            <div 
              className="absolute top-4 right-4 w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: themeColors.primary }}
            />
            <div 
              className="absolute bottom-4 left-4 w-2 h-2 rounded-full animate-ping animation-delay-200"
              style={{ backgroundColor: themeColors.secondary }}
            />
            <div 
              className="absolute top-1/2 left-4 w-2 h-2 rounded-full animate-ping animation-delay-400"
              style={{ backgroundColor: themeColors.accent }}
            />
            <div 
              className="absolute top-4 left-1/2 w-1 h-1 rounded-full animate-ping animation-delay-200"
              style={{ backgroundColor: themeColors.primary }}
            />
            <div 
              className="absolute bottom-1/2 right-4 w-2 h-2 rounded-full animate-ping animation-delay-400"
              style={{ backgroundColor: themeColors.secondary }}
            />
          </div>
          
          {/* Ondas de energía */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ 
                backgroundColor: `${themeColors.primary}20`,
                animationDuration: '0.8s'
              }}
            />
            <div 
              className="absolute inset-2 rounded-full animate-pulse animation-delay-200"
              style={{ 
                backgroundColor: `${themeColors.secondary}15`,
                animationDuration: '0.6s'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Efecto de llegada */}
      {animationState === 'arrived' && !sessionStorage.getItem('robot-entrance-played-before') && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping" 
            style={{ backgroundColor: themeColors.primary }}
          />
          <div 
            className="absolute bottom-4 left-4 w-2 h-2 rounded-full animate-ping animation-delay-200" 
            style={{ backgroundColor: themeColors.secondary }}
          />
          <div 
            className="absolute top-1/2 left-4 w-2 h-2 rounded-full animate-ping animation-delay-400" 
            style={{ backgroundColor: themeColors.accent }}
          />
          <div 
            className="absolute top-4 left-1/2 w-1 h-1 rounded-full animate-ping animation-delay-200" 
            style={{ backgroundColor: themeColors.primary }}
          />
        </div>
      )}
      
      {/* Debug visual del mouse NATURAL (temporal) */}
      {showRobot && !isMobile && (
        <div className="absolute top-2 left-2 text-xs text-white bg-black/70 px-3 py-2 rounded-lg pointer-events-none font-mono">
          <div>🖱️ X: {(mousePosition.x * 100).toFixed(1)}% Y: {(mousePosition.y * 100).toFixed(1)}%</div>
          <div className="text-purple-400">
            🤖 RotY: {((mousePosition.x - 0.5) * 1.5 * 180 / Math.PI).toFixed(1)}° 
            RotX: {((mousePosition.y - 0.5) * 1.2 * 180 / Math.PI).toFixed(1)}°
          </div>
          <div className="text-pink-300 text-xs">
            🎯 Natural (sin inversiones, direcciones normales)
          </div>
        </div>
      )}
    </div>
  );
};

export default Enhanced3DRobot;

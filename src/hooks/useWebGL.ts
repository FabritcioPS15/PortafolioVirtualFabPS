import { useState, useEffect } from 'react';

export const useWebGL = () => {
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!context;
      } catch (e) {
        return false;
      }
    };

    setIsWebGLSupported(checkWebGLSupport());
  }, []);

  return isWebGLSupported;
};

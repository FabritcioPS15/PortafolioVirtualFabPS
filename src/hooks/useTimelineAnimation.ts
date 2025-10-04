import { useState, useEffect, useRef } from 'react';

interface UseTimelineAnimationProps {
  containerRef: React.RefObject<HTMLElement>;
  lineRef: React.RefObject<HTMLElement>;
  itemsCount: number;
}

export const useTimelineAnimation = ({ containerRef, lineRef, itemsCount }: UseTimelineAnimationProps) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [lineProgress, setLineProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    
    if (!container || !line) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            animateTimeline();
          } else {
            setIsVisible(false);
            setVisibleItems([]);
            setLineProgress(0);
          }
        });
      },
      {
        threshold: 0.3, // Se activa cuando el 30% del contenedor es visible
        rootMargin: '0px 0px -100px 0px' // Se activa un poco antes de que sea completamente visible
      }
    );

    observer.observe(container);

    const animateTimeline = () => {
      // Animar la línea progresivamente
      const lineAnimation = setInterval(() => {
        setLineProgress((prev) => {
          if (prev >= 100) {
            clearInterval(lineAnimation);
            return 100;
          }
          return prev + 2; // Incremento suave
        });
      }, 30); // Cada 30ms

      // Animar los elementos uno por uno con delay
      for (let i = 0; i < itemsCount; i++) {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, i]);
        }, i * 200 + 500); // Delay progresivo + tiempo inicial
      }
    };

    return () => {
      observer.disconnect();
    };
  }, [containerRef, lineRef, itemsCount]);

  return {
    visibleItems,
    lineProgress,
    isVisible
  };
};


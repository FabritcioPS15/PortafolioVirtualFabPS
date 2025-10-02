import React, { useEffect, useState, useRef } from 'react';

interface SimpleCursorProps {
  isVisible?: boolean;
}

const SimpleCursor: React.FC<SimpleCursorProps> = ({ isVisible = true }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const animationFrameRef = useRef<number>();
  const trailIdRef = useRef(0);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    if (!isVisible) return;

    const updateCursor = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsCursorVisible(true);
        
        // Add trail effect
        const newTrail = {
          id: trailIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          opacity: 0.6
        };
        
        setTrails(prev => {
          const updated = [...prev, newTrail].slice(-8); // Keep only last 8 trails
          return updated;
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e);
      
      // Enhanced element detection
      const target = e.target as HTMLElement;
      if (target) {
        // Check for buttons and button-like elements
        if (target.tagName === 'BUTTON' || 
            target.closest?.('button') || 
            target.getAttribute('role') === 'button' ||
            target.classList.contains('btn') ||
            target.classList.contains('button')) {
          setCursorType('button');
          setIsHovering(true);
        } 
        // Check for links and link-like elements
        else if (target.tagName === 'A' || 
                 target.closest?.('a') || 
                 target.getAttribute('role') === 'link' ||
                 target.classList.contains('link') ||
                 target.classList.contains('nav-link')) {
          setCursorType('link');
          setIsHovering(true);
        } 
        // Check for text input elements
        else if (target.tagName === 'INPUT' || 
                 target.tagName === 'TEXTAREA' || 
                 target.getAttribute('contenteditable') === 'true' ||
                 target.classList.contains('input') ||
                 target.classList.contains('textarea')) {
          setCursorType('text');
          setIsHovering(false);
        } 
        // Check for any interactive element
        else if (target.closest?.('[role="button"]') || 
                 target.closest?.('[role="link"]') ||
                 target.closest?.('.clickable') ||
                 target.closest?.('.interactive') ||
                 target.closest?.('[onclick]') ||
                 target.closest?.('[onmousedown]')) {
          setCursorType('interactive');
          setIsHovering(true);
        } 
        else {
          setCursorType('default');
          setIsHovering(false);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Add ripple effect
      const newRipple = {
        id: rippleIdRef.current++,
        x: e.clientX,
        y: e.clientY
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  // Update trail opacity
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => 
        prev.map(trail => ({
          ...trail,
          opacity: Math.max(0, trail.opacity - 0.05)
        })).filter(trail => trail.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || !isCursorVisible) return null;

  return (
    <>
      {/* Trail effects */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            opacity: trail.opacity,
          }}
        />
      ))}
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="cursor-ripple"
          style={{
            left: ripple.x - 2,
            top: ripple.y - 2,
          }}
        />
      ))}
      
      {/* Main cursor - smaller and more elegant */}
      <div
        className={`custom-cursor ${cursorType} ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
        style={{
          left: position.x - 8,
          top: position.y - 8,
          width: isHovering ? '16px' : '12px',
          height: isHovering ? '16px' : '12px',
        }}
      />
      
      {/* Cursor dot - smaller and more precise */}
      <div
        className="custom-cursor-dot"
        style={{
          left: position.x - 1,
          top: position.y - 1,
          width: '2px',
          height: '2px',
        }}
      />
    </>
  );
};

export default SimpleCursor;

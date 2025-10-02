import React, { useState } from 'react';

interface SimpleRobotProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'small' | 'medium' | 'large';
}

const SimpleRobot: React.FC<SimpleRobotProps> = ({ 
  className = '', 
  position = 'bottom-right',
  size = 'medium'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Position configurations
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-24 right-4',
    'top-left': 'top-24 left-4',
  };

  // Size configurations
  const sizeConfigs = {
    small: { width: 60, height: 60, fontSize: '24px' },
    medium: { width: 80, height: 80, fontSize: '32px' },
    large: { width: 100, height: 100, fontSize: '40px' },
  };

  const config = sizeConfigs[size];

  const handleRobotClick = () => {
    setIsClicked(!isClicked);
    setShowTooltip(!showTooltip);
    
    // Hide tooltip after 3 seconds
    if (!showTooltip) {
      setTimeout(() => {
        setShowTooltip(false);
        setIsClicked(false);
      }, 3000);
    }
  };

  const handlePointerOver = () => {
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'default';
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-30 ${className}`}>
      {/* Robot Container */}
      <div 
        className="relative rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer flex items-center justify-center"
        style={{ 
          width: config.width, 
          height: config.height,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
        onClick={handleRobotClick}
        onMouseEnter={handlePointerOver}
        onMouseLeave={handlePointerOut}
      >
        {/* Robot Emoji with animations */}
        <div 
          className="transition-all duration-300 animate-bounce-slow"
          style={{ 
            fontSize: config.fontSize,
            transform: isHovered ? 'rotate(10deg)' : 'rotate(0deg)',
          }}
        >
          🤖
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg animate-fade-in">
            <div className="relative">
              ¡Hola! Soy tu asistente robótico 🤖
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}

        {/* Pulse effect when active */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
        )}

        {/* Glow effect when hovered */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse"></div>
        )}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float-particle opacity-60"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleRobot;

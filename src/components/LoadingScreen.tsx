import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
  progress?: number;
  isExiting?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isLoading, 
  message = "Cargando...", 
  progress,
  isExiting = false
}) => {
  const [dots, setDots] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading && !isExiting) {
      setIsVisible(true);
    } else if (isExiting) {
      setIsVisible(false);
    }
  }, [isLoading, isExiting]);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ${
      isLoading && !isExiting ? 'loading-enter' : isExiting ? 'loading-exit' : ''
    }`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 opacity-10 ${
        isLoading && !isExiting ? 'loading-background-enter' : isExiting ? 'loading-background-exit' : ''
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.05)_90deg,transparent_180deg,rgba(255,255,255,0.05)_270deg,transparent_360deg)]"></div>
      </div>

      {/* Main Loading Content */}
      <div className={`relative z-10 flex flex-col items-center space-y-8 ${
        isLoading && !isExiting ? 'loading-content-enter' : isExiting ? 'loading-content-exit' : ''
      }`}>
        {/* Logo/Icon Animation */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-24 h-24 border-4 border-transparent rounded-full animate-spin" 
               style={{ 
                 borderTopColor: 'var(--accent-600)',
                 borderRightColor: 'var(--accent-hover)',
                 animationDuration: '2s'
               }}>
          </div>
          
          {/* Inner Ring */}
          <div className="absolute top-2 left-2 w-20 h-20 border-4 border-transparent rounded-full animate-spin" 
               style={{ 
                 borderBottomColor: 'var(--accent-600)',
                 borderLeftColor: 'var(--accent-hover)',
                 animationDuration: '1.5s',
                 animationDirection: 'reverse'
               }}>
          </div>
          
          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse"
               style={{ backgroundColor: 'var(--accent-600)' }}>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white animate-pulse">
            {message}{dots}
          </h2>
          
          {/* Progress Bar */}
          {progress !== undefined && (
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--accent-600), var(--accent-hover))',
                  boxShadow: '0 0 10px var(--accent-600)'
                }}
              />
            </div>
          )}
          
          {/* Loading Dots Animation */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ 
                  backgroundColor: 'var(--accent-600)',
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: 'var(--accent-600)',
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Brand */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-gray-400 text-sm font-medium animate-fade-in">
          Portafolio Virtual - Fabritcio Peña
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;

import React from 'react';

interface ProjectsBannerProps {
  title: string;
  subtitle: string;
}

const ProjectsBanner: React.FC<ProjectsBannerProps> = ({ title, subtitle }) => {
  return (
    <div 
      className="relative overflow-hidden py-20 lg:py-32"
      style={{ background: 'linear-gradient(135deg, var(--bg) 0%, rgba(0,0,0,0.02) 50%, var(--bg) 100%)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Title with neon effect */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 relative">
            <span 
              className="gradient-text"
              style={{
                background: 'linear-gradient(-45deg, var(--accent-600), var(--accent-hover), var(--accent-400), var(--accent-600))',
                backgroundSize: '400% 400%',
                animation: 'gradient 3s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px var(--accent-600)',
                filter: 'drop-shadow(0 0 10px var(--accent-600))'
              }}
            >
              {title}
            </span>
            
            {/* Neon glow effect */}
            <div 
              className="absolute inset-0 blur-sm opacity-50"
              style={{
                background: 'linear-gradient(-45deg, var(--accent-600), var(--accent-hover), var(--accent-400), var(--accent-600))',
                backgroundSize: '400% 400%',
                animation: 'gradient 3s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                zIndex: -1
              }}
            >
              {title}
            </div>
          </h1>

          {/* Subtitle with animated underline */}
          <p className="text-xl lg:text-2xl relative inline-block" style={{ color: 'var(--text)', opacity: 0.8 }}>
            {subtitle}
            <span 
              className="absolute -bottom-2 left-0 w-full h-1 rounded-full animate-pulse"
              style={{ 
                background: 'linear-gradient(90deg, var(--accent-600), var(--accent-hover), var(--accent-600))',
                backgroundSize: '200% 100%',
                animation: 'gradient 2s ease infinite'
              }}
            ></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsBanner;

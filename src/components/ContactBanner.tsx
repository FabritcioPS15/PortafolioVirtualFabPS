import React from 'react';

interface ContactBannerProps {
  title: string;
  subtitle: string;
}

const ContactBanner: React.FC<ContactBannerProps> = ({ title, subtitle }) => {
  return (
    <div 
      className="relative overflow-hidden py-20 lg:py-32"
      style={{ background: 'linear-gradient(135deg, var(--bg) 0%, rgba(0,0,0,0.02) 50%, var(--bg) 100%)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Title */}
          <h1 
            className="text-5xl lg:text-7xl font-bold mb-6"
            style={{ 
              color: 'var(--text-dark)',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {title}
          </h1>

          {/* Subtitle with animated underline */}
          <p 
            className="text-xl lg:text-2xl relative inline-block"
            style={{ color: 'var(--text)', opacity: 0.8 }}
          >
            {subtitle}
            <span 
              className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
              style={{ 
                background: 'linear-gradient(90deg, var(--accent-600), var(--accent-hover))'
              }}
            ></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;

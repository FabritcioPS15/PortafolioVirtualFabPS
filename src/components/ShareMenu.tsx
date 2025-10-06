import React, { useState } from 'react';
import { Share2, Copy, Check, Facebook, Twitter, Linkedin, Mail, ChevronDown } from 'lucide-react';

interface ShareMenuProps {
  variant?: 'navbar' | 'footer';
  className?: string;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ variant = 'navbar', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;
  const portfolioTitle = "Portafolio Virtual - Fabritcio Peña";
  const portfolioDescription = "Desarrollador Full Stack especializado en React, Node.js y tecnologías modernas. Explora mis proyectos y experiencia profesional.";

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:text-blue-600',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'hover:text-blue-400',
      action: () => {
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(portfolioTitle)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:text-blue-700',
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'hover:text-red-500',
      action: () => {
        const subject = encodeURIComponent(portfolioTitle);
        const body = encodeURIComponent(`${portfolioDescription}\n\n${currentUrl}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      }
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const isNavbar = variant === 'navbar';

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
       <button
         onClick={() => setIsOpen(!isOpen)}
         className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
           isNavbar 
             ? 'text-white hover:bg-white/20' 
             : 'hover:bg-gray-100 dark:hover:bg-gray-800'
         }`}
         style={isNavbar ? {} : { 
           backgroundColor: 'var(--accent-600)',
           color: 'white',
           padding: '12px 16px',
           borderRadius: '8px'
         }}
         onMouseEnter={(e) => {
           if (isNavbar) {
             e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
           } else {
             e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
           }
         }}
         onMouseLeave={(e) => {
           if (isNavbar) {
             e.currentTarget.style.backgroundColor = 'transparent';
           } else {
             e.currentTarget.style.backgroundColor = 'var(--accent-600)';
           }
         }}
       >
         <Share2 size={16} />
         <span className="hidden sm:inline">Compartir</span>
         <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''} hidden sm:inline`} />
       </button>

      {/* Share Options Dropdown */}
      {isOpen && (
        <div 
          className={`absolute ${
            isNavbar ? 'top-full mt-2 right-0' : 'bottom-full mb-2 right-0'
          } bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-[240px] z-50`}
          style={{ 
            boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 0 30px rgba(0,0,0,0.1)',
            animation: isNavbar ? 'slideDown 0.3s ease-out' : 'slideUp 0.3s ease-out'
          }}
        >
          {/* Share Options */}
          <div className="space-y-2 mb-3">
            {shareOptions.map((option, index) => (
              <button
                key={option.name}
                onClick={option.action}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 group ${option.color}`}
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  animation: 'fadeInUp 0.3s ease-out forwards'
                }}
              >
                <option.icon size={16} className="transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {option.name}
                </span>
              </button>
            ))}
          </div>

          {/* Copy Link Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <p className="text-xs font-mono text-gray-600 dark:text-gray-300 truncate">
                  {currentUrl}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  copied 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
              {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
            </p>
          </div>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ShareMenu;

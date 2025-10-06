import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Linkedin, Github, Instagram, Briefcase, Clock, Globe, Download, Layers, Sparkles, MessageCircle } from 'lucide-react';
import ShareMenu from './ShareMenu';

const Footer: React.FC = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [showMore, setShowMore] = useState(false);

  const navigation = [
    { name: 'Sobre mí', href: '/' },
    { name: 'Proyectos', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/fabritciops15/',
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/FabritcioPS15',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/tu-usuario',
      color: 'hover:text-pink-600 dark:hover:text-pink-400'
    }
  ];

  const contactInfo = [
    {
      icon: MessageCircle,
      label: '+51 958 077 827',
      href: 'https://wa.me/51958077827?text=Hola%20Fabritcio%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20un%20proyecto.%20%C2%BFPodemos%20coordinar%3F'
    },
    {
      icon: Phone,
      label: '+51 958 077 827',
      href: 'tel:+51958077827'
    },
    {
      icon: MapPin,
      label: 'Lima, Perú',
      href: 'https://maps.google.com'
    }
  ];

  // Detect responsive breakpoint
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Reveal animation when footer enters viewport
  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1 });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const containerBaseStyle = useMemo(() => ({
    backgroundColor: 'var(--bg)',
    borderColor: 'var(--accent-600)'
  }), []);

  const revealStyle = useMemo(() => ({
    transition: 'opacity 700ms ease, transform 700ms ease',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(12px)'
  }), [isVisible]);

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" style={containerBaseStyle}>
      <div ref={footerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={revealStyle}>
        {!isMobile ? (
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link 
              to="/" 
              className="text-2xl font-bold transition-colors duration-200 mb-4 block accent-text hover:opacity-80"
              style={{color: 'var(--accent-600)'}}
            >
              Portafolio
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--text)'}}>
              Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--accent-600)',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-600)')}
                  title={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            {/* Más info - desktop */}
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{
                color: 'var(--accent-600)',
                border: '1px solid var(--accent-600)'
              }}
            >
              <Sparkles size={16} /> Más info
            </button>
            <div
              className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: showMore ? 320 : 0
              }}
            >
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-start gap-3" style={{color: 'var(--text)'}}>
                  <Briefcase size={16} style={{color: 'var(--accent-600)'}} />
                  <span>Disponible para proyectos freelance y contratos a tiempo parcial.</span>
                </div>
                <div className="flex items-start gap-3" style={{color: 'var(--text)'}}>
                  <Clock size={16} style={{color: 'var(--accent-600)'}} />
                  <span>Tiempo de respuesta típico: 24–48 h.</span>
                </div>
                <div className="flex items-start gap-3" style={{color: 'var(--text)'}}>
                  <Globe size={16} style={{color: 'var(--accent-600)'}} />
                  <span>Zona horaria: GMT-5 (flexible para reuniones internacionales).</span>
                </div>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 self-start px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--accent-600)', color: 'white' }}
                >
                  <Download size={16} /> Descargar CV
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--text)'}}>
              Navegación
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm transition-colors duration-200 flex items-center gap-2"
                      style={{color: isActive ? 'var(--accent-600)' : 'var(--text)'}}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--accent-600)'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = isActive ? 'var(--accent-600)' : 'var(--text)'}
                    >
                      {isActive && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: 6,
                            height: 6,
                            borderRadius: '9999px',
                            backgroundColor: 'var(--accent-600)'
                          }}
                        />
                      )}
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--text)'}}>
              Contacto
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <a
                    href={info.href}
                    className="flex items-center text-sm group transition-colors duration-200"
                    style={{color: 'var(--text)'}}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--accent-600)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text)'}
                  >
                    <info.icon size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" style={{color: 'var(--accent-600)'}} />
                    {info.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--text)'}}>
              Colaboremos
            </h3>
            <p className="text-sm mb-4" style={{color: 'var(--text)'}}>
              ¿Tienes un proyecto en mente? Me encantaría saber más.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 text-white text-sm rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium"
              style={{ backgroundColor: 'var(--accent-600)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-600)')}
            >
              Hablemos
              <Mail size={16} className="ml-2" />
            </Link>
          </div>
        </div>
        ) : (
        // Minimal, focused mobile footer
        <div className="grid grid-cols-1 gap-8">
          <div>
            <Link 
              to="/" 
              className="text-xl font-bold transition-colors duration-200 mb-3 block accent-text hover:opacity-80"
              style={{color: 'var(--accent-600)'}}
            >
              Portafolio
            </Link>
            <p className="text-sm mb-4" style={{color: 'var(--text)'}}>
              ¿Hablamos? Estoy disponible.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.slice(0, 2).map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    style={{ backgroundColor: 'var(--accent-600)', color: 'white' }}
                    title={social.name}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-600)')}
                  >
                    <social.icon size={18} />
                  </a>
              ))}
              
              <Link
                to="/contact"
                className="ml-auto inline-flex items-center px-3 py-2 text-white text-sm rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: 'var(--accent-600)' }}
              >
                Contacto
                <Mail size={16} className="ml-2" />
              </Link>
            </div>

            {/* Más info - móvil (resumen corto) */}
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full justify-center transition-all duration-300"
              style={{ color: 'var(--accent-600)', border: '1px solid var(--accent-600)' }}
            >
              <Sparkles size={16} /> Más info
            </button>
            <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: showMore ? 260 : 0 }}>
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-start gap-3" style={{color: 'var(--text)'}}>
                  <Briefcase size={16} style={{color: 'var(--accent-600)'}} />
                  <span>Disponible para proyectos.</span>
                </div>
                <div className="flex items-start gap-3" style={{color: 'var(--text)'}}>
                  <Layers size={16} style={{color: 'var(--accent-600)'}} />
                  <span>Stack: React, TS, Node.</span>
                </div>
                <div className="space-y-2">
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: 'var(--accent-600)', color: 'white' }}
                  >
                    <Download size={16} /> CV
                  </a>
                  
                  {/* Share Menu - Ancho completo */}
                  <div className="w-full">
                    <ShareMenu variant="footer" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/51958077827?text=Hola%20Fabritcio%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20un%20proyecto.%20%C2%BFPodemos%20coordinar%3F" className="flex items-center text-sm transition-colors duration-200" style={{color: 'var(--text)'}}
                   onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-600)')}
                   onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}>
                  <MessageCircle size={16} className="mr-2" style={{color: 'var(--accent-600)'}} />
                  WhatsApp: +51 958 077 827
                </a>
              </li>
            </ul>
          </div>
        </div>
        )}

        {/* Bottom Section */}
        <div className="mt-12 pt-8" style={{borderTop: '1px solid var(--accent-600)'}}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-sm mb-4 md:mb-0" style={{color: 'var(--text)'}}>
              <span>© {currentYear} Fabritcio Peña. Hecho con</span>
              <Heart size={16} className="mx-2 animate-pulse" style={{color: 'var(--accent-600)'}} />
              <span>y mucho café</span>
            </div>
            {!isMobile && (
              <div className="flex items-center space-x-6 text-sm" style={{color: 'var(--text)'}}>
                <a 
                  href="#" 
                  className="transition-colors duration-200 hover:opacity-80"
                  style={{color: 'var(--accent-600)'}}
                >
                  Política de Privacidad
                </a>
                <a 
                  href="#" 
                  className="transition-colors duration-200 hover:opacity-80"
                  style={{color: 'var(--accent-600)'}}
                >
                  Términos de Uso
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
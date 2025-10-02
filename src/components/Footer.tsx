import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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
      href: 'https://linkedin.com/in/tu-perfil',
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/tu-usuario',
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
      icon: Mail,
      label: 'tu@email.com',
      href: 'mailto:tu@email.com'
    },
    {
      icon: Phone,
      label: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Ciudad, País',
      href: 'https://maps.google.com'
    }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" style={{backgroundColor: 'var(--bg)', borderColor: 'var(--accent-600)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                  title={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--text)'}}>
              Navegación
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm transition-colors duration-200 hover:opacity-80"
                    style={{color: 'var(--text)'}}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
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
                    className="flex items-center text-sm group transition-colors duration-200 hover:opacity-80"
                    style={{color: 'var(--text)'}}
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
              style={{
                backgroundColor: 'var(--accent-600)'
              }}
            >
              Hablemos
              <Mail size={16} className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8" style={{borderTop: '1px solid var(--accent-600)'}}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-sm mb-4 md:mb-0" style={{color: 'var(--text)'}}>
              <span>© {currentYear} Tu Nombre. Hecho con</span>
              <Heart size={16} className="mx-2 animate-pulse" style={{color: 'var(--accent-600)'}} />
              <span>y mucho café</span>
            </div>
            
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Palette, Github, Linkedin, Download, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from './Footer';
import SimpleCursor from './SimpleCursor';
import Enhanced3DRobot from './Enhanced3DRobot';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { theme, toggleTheme, colorScheme, setColorScheme, handleColorSchemeChange, isTransitioning } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: t('nav.about'), href: '/' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const socialLinks = {
    github: 'https://github.com/tu-usuario',
    linkedin: 'https://linkedin.com/in/tu-perfil',
  };

  const cvUrl = '/cv.pdf';

  const colorSchemes = [
    { name: 'Azul Oscuro', value: 'dark-blue', colors: ['#4854ff', '#6a80ff', '#2b28ff'] },
    { name: 'Grenadier', value: 'grenadier', colors: ['#f4561b', '#f77940', '#d53810'] },
    { name: 'Verde Bosque', value: 'forest-green', colors: ['#23d210', '#45ec2f', '#15a808'] },
    { name: 'Voodoo', value: 'voodoo', colors: ['#c372c2', '#d89ad8', '#a653a3'] },
    { name: 'Waterloo', value: 'waterloo', colors: ['#999ebb', '#aeb4cb', '#787aa1'] },
    { name: 'Wattle', value: 'wattle', colors: ['#cec324', '#ddda32', '#b19c1d'] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-menu]')) {
        setIsThemeMenuOpen(false);
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  function App() {
    return (
      <div>
        <h1>Mi Robot 3D 🚀</h1>
        <Robot3D />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-sm shadow-lg' : ''
      }`}>
        {/* Animated linear gradient background - Theme based */}
        <div className="absolute inset-0 opacity-80 dark:opacity-70">
          <div 
            className="absolute inset-0 bg-gradient-to-r animate-gradient-shift"
            style={{
              background: `linear-gradient(135deg, var(--accent-600) 0%, var(--accent-hover) 50%, transparent 100%)`
            }}
          ></div>
          <div 
            className="absolute inset-0 bg-gradient-to-l animate-gradient-shift-reverse"
            style={{
              background: `linear-gradient(225deg, var(--accent-hover) 0%, var(--accent-600) 50%, transparent 100%)`
            }}
          ></div>
        </div>
        
        {/* Animated particles - Theme based - Hidden on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          <div 
            className="absolute top-2 left-1/4 w-1 h-1 rounded-full animate-float-slow opacity-40"
            style={{backgroundColor: 'var(--accent-600)'}}
          ></div>
          <div 
            className="absolute top-4 right-1/3 w-1.5 h-1.5 rounded-full animate-float-slow-delayed opacity-30"
            style={{backgroundColor: 'var(--accent-hover)'}}
          ></div>
          <div 
            className="absolute top-6 left-2/3 w-1 h-1 rounded-full animate-float-slow-delayed-2 opacity-25"
            style={{backgroundColor: 'var(--accent-600)'}}
          ></div>
          <div 
            className="absolute top-3 right-1/4 w-1 h-1 rounded-full animate-float-slow opacity-35"
            style={{backgroundColor: 'var(--accent-hover)'}}
          ></div>
        </div>
        
        {/* Content with relative positioning */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Background overlay for better text readability */}
            <div className="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm rounded-lg mx-4"></div>
            {/* Logo */}
            <div className="flex items-center relative z-10">
              <Link 
                to="/" 
                className="text-2xl font-bold transition-colors duration-200 navbar-text"
                style={{
                  color: 'var(--text)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-400)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text)';
                }}
              >
                {t('nav.portfolio')}
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center space-x-8 flex-1 relative z-10">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-4 py-3 font-medium transition-all duration-200 whitespace-nowrap leading-none navbar-text ${
                      isActive
                        ? 'underline underline-offset-8 decoration-2 text-lg md:text-xl'
                        : 'text-sm md:text-base'
                    }`}
                    style={{
                      color: isActive ? 'var(--accent-600)' : 'var(--text)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--accent-400)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--text)';
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
                <div className="hidden md:flex items-center justify-end space-x-3 relative z-10">
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm md:text-base rounded-lg text-white transition-colors accent-bg"
                  >
                    <Download size={18} className="mr-2" /> {t('nav.download_cv')}
                  </a>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--accent-600)',
                      color: 'white'
                    }}
                    title="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--accent-600)',
                      color: 'white'
                    }}
                    title="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  {/* Language Selector */}
                  <div className="relative" data-menu>
                    <button
                      onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                      className="p-2.5 rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      style={{
                        backgroundColor: 'var(--accent-600)',
                        color: 'white',
                        border: '1px solid var(--accent-hover)'
                      }}
                      aria-label={t('nav.language')}
                    >
                      <Globe size={20} />
                    </button>
                    
                    {/* Language Dropdown */}
                    {isLanguageMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-[color:var(--border)] p-4 z-50">
                        <div className="space-y-2">
                          <span className="text-sm font-medium" style={{color:'var(--text)'}}>{t('nav.language')}</span>
                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                setLanguage('es');
                                setIsLanguageMenuOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                                language === 'es' ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                              }`}
                              style={{ 
                                backgroundColor: language === 'es' ? 'var(--accent-600)' : 'transparent',
                                borderColor: language === 'es' ? 'var(--accent-600)' : 'var(--border)',
                                color: language === 'es' ? 'white' : 'var(--text)',
                                border: '1px solid var(--border)'
                              }}
                            >
                              <span className="text-lg">🇪🇸</span>
                              <span className="text-sm font-medium">Español</span>
                            </button>
                            <button
                              onClick={() => {
                                setLanguage('en');
                                setIsLanguageMenuOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                                language === 'en' ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                              }`}
                              style={{ 
                                backgroundColor: language === 'en' ? 'var(--accent-600)' : 'transparent',
                                borderColor: language === 'en' ? 'var(--accent-600)' : 'var(--border)',
                                color: language === 'en' ? 'white' : 'var(--text)',
                                border: '1px solid var(--border)'
                              }}
                            >
                              <span className="text-lg">🇺🇸</span>
                              <span className="text-sm font-medium">English</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Theme & Color Selector */}
                  <div className="relative" data-menu>
                    <button
                      onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                      disabled={isTransitioning}
                      className={`p-2.5 rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg
                                 ${isTransitioning ? 'animate-pulse opacity-75' : ''}`}
                      style={{
                        backgroundColor: 'var(--accent-600)',
                        color: 'white',
                        border: '1px solid var(--accent-hover)'
                      }}
                      aria-label="Seleccionar tema y colores"
                    >
                      <Palette size={20} className={isTransitioning ? 'animate-spin' : ''} />
                    </button>
                    
                    {/* Theme Dropdown */}
                    {isThemeMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-[color:var(--border)] p-4 z-50">
                        <div className="space-y-4">
                          {/* Light/Dark Toggle */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium" style={{color:'var(--text)'}}>Tema</span>
                            <button
                              onClick={toggleTheme}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                theme === 'dark' ? 'accent-bg' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          
                          {/* Color Schemes */}
                          <div>
                            <span className="text-sm font-medium mb-3 block" style={{color:'var(--text)'}}>Paletas de Color</span>
                            <div className="space-y-3">
                              {colorSchemes.map((scheme) => (
                                <button
                                  key={scheme.value}
                                  onClick={() => handleColorSchemeChange(scheme.value as any)}
                                  disabled={isTransitioning}
                                  className={`w-full flex items-center gap-3 p-2 rounded-lg border-2 transition-all duration-200 ${
                                    colorScheme === scheme.value
                                      ? 'scale-[1.02]'
                                      : 'hover:scale-[1.01]'
                                  } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  style={{ 
                                    backgroundColor: colorScheme === scheme.value ? 'var(--accent-600)' : 'transparent',
                                    borderColor: colorScheme === scheme.value ? 'var(--accent-600)' : 'var(--border)',
                                    color: colorScheme === scheme.value ? 'white' : 'var(--text)'
                                  }}
                                  aria-label={`Seleccionar esquema ${scheme.name}`}
                                >
                                  <div className="flex gap-1">
                                    {scheme.colors.map((color, idx) => (
                                      <div 
                                        key={idx}
                                        className="w-4 h-4 rounded-full border border-white/20"
                                        style={{ backgroundColor: color }}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium">{scheme.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

            {/* Mobile menu button */}
            <div className="md:hidden relative z-10">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--accent-600)',
                  color: 'white'
                }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden fixed inset-0 z-[60] transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`absolute top-0 right-0 w-80 max-w-[85vw] transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`} style={{
            backgroundColor: 'var(--bg)',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
            zIndex: 61,
            height: '100vh',
            minHeight: '100vh',
            maxHeight: '100vh',
            overflowY: 'auto'
          }}>
            <div className="flex flex-col h-full min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b flex-shrink-0" style={{borderColor: 'var(--accent-600)', backgroundColor: 'var(--bg)'}}>
                <h2 className="text-lg font-semibold" style={{color: 'var(--text)'}}>Menú</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                  style={{color: 'var(--accent-600)'}}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 p-4 space-y-2 overflow-y-auto" style={{backgroundColor: 'var(--bg)'}}>
                {navigation.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 transform ${
                        isActive
                          ? 'scale-105 shadow-lg'
                          : 'hover:scale-102 hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: isActive ? 'var(--accent-600)' : 'transparent',
                        color: isActive ? 'white' : 'var(--text)',
                        border: isActive ? 'none' : '1px solid var(--accent-600)'
                      }}
                    >
                      <span className="flex items-center">
                        {item.name}
                        {isActive && <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse" />}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Actions Section */}
              <div className="p-4 space-y-4 flex-shrink-0" style={{borderTop: '1px solid var(--accent-600)', backgroundColor: 'var(--bg)'}}>
                {/* CV Download */}
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                  style={{backgroundColor: 'var(--accent-600)'}}
                >
                  <Download size={20} className="mr-2" />
                  Descargar CV
                </a>

                {/* Social Links */}
                <div className="flex space-x-3">
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center p-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                    style={{
                      backgroundColor: 'var(--accent-600)',
                      color: 'white'
                    }}
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center p-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                    style={{
                      backgroundColor: 'var(--accent-600)',
                      color: 'white'
                    }}
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl" style={{backgroundColor: 'var(--accent-600)', color: 'white'}}>
                  <span className="text-sm font-medium">Modo Oscuro</span>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      theme === 'dark' ? 'bg-white/20' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Color Schemes */}
                <div>
                  <span className="text-sm font-medium block mb-3" style={{color: 'var(--text)'}}>Paletas de Color</span>
                  <div className="grid grid-cols-2 gap-2">
                    {colorSchemes.map((scheme) => (
                      <button
                        key={scheme.value}
                        onClick={() => handleColorSchemeChange(scheme.value as any)}
                        disabled={isTransitioning}
                        className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                          colorScheme === scheme.value
                            ? 'scale-105 shadow-lg'
                            : 'hover:scale-102'
                        } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{ 
                          backgroundColor: colorScheme === scheme.value ? 'var(--accent-600)' : 'transparent',
                          borderColor: 'var(--accent-600)',
                          color: colorScheme === scheme.value ? 'white' : 'var(--text)'
                        }}
                        aria-label={`Seleccionar esquema ${scheme.name}`}
                      >
                        <div className="flex justify-center gap-1 mb-1">
                          {scheme.colors.map((color, idx) => (
                            <div 
                              key={idx}
                              className="w-2 h-2 rounded-full border border-white/20"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-center block">{scheme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <span className="text-sm font-medium block mb-3" style={{color: 'var(--text)'}}>{t('nav.language')}</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setLanguage('es');
                        setIsMenuOpen(false);
                      }}
                      className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                        language === 'es' ? 'scale-105 shadow-lg' : 'hover:scale-102'
                      }`}
                      style={{ 
                        backgroundColor: language === 'es' ? 'var(--accent-600)' : 'transparent',
                        borderColor: 'var(--accent-600)',
                        color: language === 'es' ? 'white' : 'var(--text)'
                      }}
                    >
                      <span className="text-base">🇪🇸</span>
                      <span className="text-sm font-medium">Español</span>
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsMenuOpen(false);
                      }}
                      className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                        language === 'en' ? 'scale-105 shadow-lg' : 'hover:scale-102'
                      }`}
                      style={{ 
                        backgroundColor: language === 'en' ? 'var(--accent-600)' : 'transparent',
                        borderColor: 'var(--accent-600)',
                        color: language === 'en' ? 'white' : 'var(--text)'
                      }}
                    >
                      <span className="text-base">🇺🇸</span>
                      <span className="text-sm font-medium">English</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Bottom padding for safe area */}
              <div className="h-4 flex-shrink-0" style={{backgroundColor: 'var(--bg)'}}></div>
            </div>
          </div>
        </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Custom Cursor */}
      <SimpleCursor isVisible={true} />
      
      {/* Enhanced 3D Robot */}
      <Enhanced3DRobot position="bottom-right" size="medium" />
    </div>
  );
};

export default Layout;
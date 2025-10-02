import React, { useState, useEffect } from 'react';
import { Code, Palette, Rocket, Users, Award, Calendar, Building, ExternalLink, X, ChevronRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  // Estados para el carrusel interactivo
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const { t } = useLanguage();

  // Definir tecnologías con sus iconos/símbolos e imágenes
  const technologies = [
    { name: 'React', icon: '⚛️', color: '#61DAFB', image: '/images/technologies/REACT.png' },
    { name: 'TypeScript', icon: '🔷', color: '#3178C6', image: '/images/technologies/TYPESCRIPT.svg' },
    { name: 'JavaScript', icon: '🟨', color: '#F7DF1E', image: '/images/technologies/JAVASCRIPT.png' },
    { name: 'HTML5', icon: '🟧', color: '#E34F26', image: '/images/technologies/HTML.png' },
    { name: 'CSS3', icon: '🟦', color: '#1572B6', image: '/images/technologies/CSS.png' },
    { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4', image: '/images/technologies/TAILWIND.png' },
    { name: 'Node.js', icon: '🟩', color: '#339933', image: '/images/technologies/NODEJS.png' },
    { name: 'Firebase', icon: '🔥', color: '#FFCA28', image: '/images/technologies/FIREBASE.png' },
    { name: 'Supabase', icon: '🟢', color: '#3ECF8E', image: '/images/technologies/SUPABASE.png' },
    { name: 'Vite', icon: '⚡', color: '#646CFF', image: '/images/technologies/VITE.png' },
    // Tecnologías sin imagen (usando emojis)
    { name: 'Vue.js', icon: '🟢', color: '#4FC08D' },
    { name: 'Angular', icon: '🅰️', color: '#DD0031' },
    { name: 'Sass', icon: '💗', color: '#CC6699' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
    { name: 'Nuxt.js', icon: '🔺', color: '#00DC82' },
    { name: 'Express', icon: '🚀', color: '#000000' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Django', icon: '🏛️', color: '#092E20' },
    { name: 'FastAPI', icon: '⚡', color: '#009688' },
    { name: 'PHP', icon: '🐘', color: '#777BB4' },
    { name: 'Laravel', icon: '🔴', color: '#FF2D20' },
    { name: 'Java', icon: '☕', color: '#ED8B00' },
    { name: 'Spring Boot', icon: '🍃', color: '#6DB33F' },
    { name: 'C#', icon: '🔷', color: '#239120' },
    { name: '.NET', icon: '🟣', color: '#512BD4' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
    { name: 'MySQL', icon: '🐬', color: '#4479A1' },
    { name: 'Redis', icon: '🔴', color: '#DC382D' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'Kubernetes', icon: '⚓', color: '#326CE5' },
    { name: 'AWS', icon: '☁️', color: '#FF9900' },
    { name: 'Azure', icon: '🔷', color: '#0078D4' },
    { name: 'Git', icon: '📝', color: '#F05032' },
    { name: 'GitHub', icon: '🐙', color: '#181717' },
    { name: 'GitLab', icon: '🦊', color: '#FCA326' }
  ];

  const roles = [
    t('about.roles.developer'),
    t('about.roles.fullstack'),
    t('about.roles.frontend'),
    t('about.roles.backend'),
    t('about.roles.designer'),
    t('about.roles.problem_solver')
  ];

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  // Auto-scroll del carrusel
  useEffect(() => {
    if (!isAutoScrolling || isDragging) return;
    
    const interval = setInterval(() => {
      setCarouselOffset(prev => {
        // Calcular el ancho aproximado de un conjunto completo de tecnologías (solo vista de iconos)
        const itemWidth = 156; // min-width + margin para vista de iconos
        const totalWidth = technologies.length * itemWidth;
        
        // Si hemos scrolleado más de un conjunto completo, resetear
        if (prev <= -totalWidth) {
          return 0;
        }
        return prev - 1;
      });
    }, 30); // Velocidad del scroll automático
    
    return () => clearInterval(interval);
  }, [isAutoScrolling, isDragging, technologies.length]);

  // Efecto para manejar el bucle infinito en el arrastre manual
  useEffect(() => {
    const itemWidth = 156; // Solo vista de iconos
    const totalWidth = technologies.length * itemWidth;
    
    // Si el offset es muy negativo, resetear suavemente
    if (carouselOffset <= -totalWidth * 2) {
      setCarouselOffset(-totalWidth);
    }
    // Si el offset es muy positivo, resetear suavemente
    else if (carouselOffset >= totalWidth) {
      setCarouselOffset(0);
    }
  }, [carouselOffset, technologies.length]);

  // Funciones para el manejo del arrastre
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoScrolling(false);
    setStartX(e.pageX);
    setScrollLeft(carouselOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 2; // Multiplicador para sensibilidad
    setCarouselOffset(scrollLeft + walk);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reanudar auto-scroll después de 3 segundos
    setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  // Funciones para touch (móvil)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoScrolling(false);
    setStartX(e.touches[0].pageX);
    setScrollLeft(carouselOffset);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    setCarouselOffset(scrollLeft + walk);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoScrolling(true), 3000);
  };
  const skills = [
    { name: t('about.skills.frontend'), icon: Code, level: 90 },
    { name: t('about.skills.design'), icon: Palette, level: 85 },
    { name: t('about.skills.projects'), icon: Rocket, level: 80 },
    { name: t('about.skills.teamwork'), icon: Users, level: 95 },
  ];

  const experiences = [
    {
      company: 'TechCorp',
      role: 'Soporte técnico',
      location: 'Lima, Perú',
      start: '2023',
      end: '2023',
      description: 'Lidero el desarrollo de aplicaciones web complejas y mentoreo a desarrolladores junior.'
    },
    {
      company: 'Freelance',
      role: 'Frontend Developer',
      location: 'Remoto',
      start: '2021',
      end: '2023',
      description: 'Construí interfaces modernas y accesibles para múltiples clientes, optimizando rendimiento.'
    },
    {
      company: 'Freelance',
      role: 'Full Stack Developer',
      location: 'Ciudad, País',
      start: '2020',
      end: '2021',
      description: 'Desarrollé funcionalidades end-to-end y diseñé APIs REST robustas.'
    },
    {
      company: 'Freelance',
      role: 'Web Developer',
      location: 'Remoto',
      start: '2019',
      end: '2020',
      description: 'Implementé sitios responsivos y mejoré la puntuación Lighthouse de proyectos existentes.'
    },
    {
      company: 'Freelance',
      role: 'Grupo San Cristobal',
      location: 'Remoto',
      start: '2017',
      end: '2019',
      description: 'Proyectos a medida para PYMES: landings, e-commerce y dashboards.'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'Certified React Developer',
      issuer: 'Meta (Facebook)',
      date: '2023',
      description: 'Certificación avanzada en desarrollo con React, incluyendo hooks y patrones avanzados.',
      certificateUrl: 'https://example.com/cert1'
    },
    {
      id: '2',
      title: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      description: 'Arquitectura de soluciones en la nube y diseño de sistemas escalables.',
      certificateUrl: 'https://example.com/cert2'
    },
    {
      id: '3',
      title: 'Full Stack Web Development',
      issuer: 'Universidad Tecnológica',
      date: '2022',
      description: 'Especialización completa en desarrollo web full stack con tecnologías modernas.',
      certificateUrl: 'https://example.com/cert3'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Left pull-tab button (visible over hero) - Mobile optimized */}
      <button
        type="button"
        aria-label="Abrir más información"
        aria-expanded={isInfoOpen}
        onClick={() => setIsInfoOpen(true)}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 w-10 sm:w-12 md:w-14 h-28 sm:h-36 md:h-40 text-white shadow-xl rounded-r-lg sm:rounded-r-xl border border-blue-500/60 flex flex-col items-center justify-center gap-1 sm:gap-1.5 hover:opacity-90 active:translate-x-1 transition-all duration-200 ${isInfoOpen ? 'translate-x-1' : ''}`}
        style={{backgroundColor: 'var(--accent-600)'}}
      >
        <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 opacity-90" />
        <span className="text-[8px] sm:text-[10px] md:text-xs tracking-widest uppercase">Más</span>
        <span className="text-[8px] sm:text-[10px] md:text-xs tracking-widest uppercase">Info</span>
        <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 opacity-90 animate-pulse" />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsInfoOpen(false)}
        className={`${isInfoOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300`}
      />

      {/* Slide-out Panel - Mobile optimized */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-info-title"
        className={`fixed top-0 left-0 z-50 h-full w-72 sm:w-80 md:w-96 shadow-2xl transform transition-transform duration-300 ${isInfoOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{backgroundColor: 'var(--bg)'}}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{borderColor: 'var(--accent-600)'}}>
          <h3 id="about-info-title" className="text-lg font-semibold" style={{color: 'var(--text-dark)'}}>Más información</h3>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setIsInfoOpen(false)}
            className="p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{backgroundColor: 'var(--accent-600)', color: 'white'}}
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
          <div>
            <h4 className="text-sm font-semibold mb-2" style={{color: 'var(--text-dark)'}}>Tecnologías favoritas</h4>

          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2" style={{color: 'var(--text-dark)'}}>Intereses</h4>
            <ul className="list-disc list-inside text-sm space-y-1" style={{color: 'var(--text)'}}>
              <li>Optimización de rendimiento y DX</li>
              <li>Diseño accesible y animaciones sutiles</li>
              <li>Arquitecturas limpias y escalables</li>
            </ul>
          </div>
        </div>
      </aside>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32" style={{background: 'linear-gradient(135deg, var(--bg) 0%, rgba(0,0,0,0.02) 50%, var(--bg) 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <AnimatedSection animation="slide-right">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium" style={{
                    backgroundColor: 'var(--accent-600)',
                    color: 'white'
                  }}>
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    {t('about.available')}
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight" style={{color: 'var(--text-dark)'}}>
                    {t('about.hello')}{' '}
                    <span className="gradient-text">
                      Tu Nombre
                    </span>
                  </h1>
                  
                  <div className="text-xl lg:text-2xl font-medium" style={{color: 'var(--accent-600)'}}>
                    {displayText}
                    <span className="animate-typewriter-cursor">|</span>
                  </div>
                  
                  <p className="text-lg leading-relaxed" style={{color: 'var(--text)', opacity: 0.8}}>
                    {t('about.description')}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a href="/projects" className="btn-primary">
                      {t('about.view_projects')}
                    </a>
                    <a href="mailto:fabpsandoval@gmail.com" className="btn-secondary">
                      {t('about.download_cv')}
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column - Profile Image */}
            <div className="relative">
              <AnimatedSection animation="slide-left">
                <div className="relative inline-block">
                  {/* Decorative background elements */}
                  <div className="absolute -inset-4 rounded-2xl opacity-20 animate-pulse" style={{
                    background: 'conic-gradient(from 0deg, var(--accent-600), var(--accent-hover), var(--accent-600))',
                    filter: 'blur(20px)'
                  }}></div>
                  
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Perfil profesional"
                      className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                    />
                    
                    {/* Status indicator */}
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse">
                      <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tech Stack Carousel */}
      <section className="py-20 overflow-hidden" style={{backgroundColor: 'var(--accent-50)'}}>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold mb-8" style={{color: 'var(--text-dark)'}}>
                {t('about.technologies_title')}
              </h2>
            </div>
          </AnimatedSection>
          
          <div 
            className="relative overflow-hidden py-8 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-100 ease-out"
              style={{
                transform: `translateX(${carouselOffset}px)`,
                width: 'fit-content'
              }}
            >
              {/* Crear múltiples copias para bucle infinito */}
              {[...Array(4)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex space-x-8 mr-8">
                  {technologies.map((tech, index) => (
                    <div 
                      key={`${groupIndex}-${index}`} 
                      className="flex-shrink-0 group relative"
                      style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                    >
                      {/* Vista de iconos/imágenes únicamente */}
                      <div className="flex flex-col items-center p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 min-w-[140px]" 
                           style={{
                             backgroundColor: 'var(--bg)',
                             border: '2px solid var(--border)'
                           }}>
                        <div className="mb-3 group-hover:scale-125 transition-transform duration-300 flex items-center justify-center w-12 h-12">
                          {tech.image ? (
                            <img 
                              src={tech.image} 
                              alt={tech.name}
                              className="w-full h-full object-contain"
                              draggable={false}
                              onError={(e) => {
                                // Fallback a emoji si la imagen no carga
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<span class="text-4xl">${tech.icon}</span>`;
                                }
                              }}
                            />
                          ) : (
                            <span className="text-4xl">{tech.icon}</span>
                          )}
                        </div>
                        <span className="font-bold text-sm text-center whitespace-nowrap leading-tight" 
                              style={{color: 'var(--text-dark)'}}>
                          {tech.name}
                        </span>
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                             style={{backgroundColor: tech.color}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Gradient overlays para efecto fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--accent-50)] to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--accent-50)] to-transparent pointer-events-none z-10"></div>
            
            {/* Indicador de arrastre */}
            {isDragging && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/20 text-white px-3 py-1 rounded-full text-sm z-20">
                Arrastrando...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white whitespace-nowrap leading-none">
              {t('about.biography_title')}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="slide-left">
            <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {t('about.biography_text1')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {t('about.biography_text2')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('about.biography_text3')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              {t('about.experience_title')}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <div className="rounded-2xl p-6 sm:p-8 shadow-lg" style={{backgroundColor: 'var(--bg)', border: '1px solid var(--border)'}}>
              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-10">
                  {experiences.map((exp, index) => (
                    <div
                      key={exp.company + index}
                      className="relative pt-12 md:pt-0 md:pl-12 text-center md:text-left"
                    >
                      <div className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center shadow" style={{backgroundColor: 'var(--bg)', borderColor: 'var(--accent-600)'}}>
                        <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{backgroundColor: 'var(--accent-600)'}}></span>
                        <div className="relative w-3 h-3 rounded-full" style={{backgroundColor: 'var(--accent-600)'}}></div>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-2 justify-center md:justify-start">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{exp.role}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">@ {exp.company}</span>
                      </div>
                      <div className="text-sm font-medium mt-1 accent-text">
                        {exp.start} - {exp.end} · {exp.location}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              Logros y Certificaciones
            </h2>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow" style={{backgroundColor: 'var(--bg)', border: '1px solid var(--border)'}}>
                <div className="text-4xl font-bold mb-2 accent-text">{achievements.length}+</div>
                <div style={{color: 'var(--text-dark)'}}>Certificaciones</div>
              </div>
              <div className="text-center p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow" style={{backgroundColor: 'var(--bg)', border: '1px solid var(--border)'}}>
                <div className="text-4xl font-bold mb-2 accent-text">3</div>
                <div style={{color: 'var(--text-dark)'}}>Años de Experiencia</div>
              </div>
              <div className="text-center p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow" style={{backgroundColor: 'var(--bg)', border: '1px solid var(--border)'}}>
                <div className="text-4xl font-bold mb-2 accent-text">15+</div>
                <div style={{color: 'var(--text-dark)'}}>Proyectos Completados</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <AnimatedSection key={achievement.id} delay={index * 100}>
                <div className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group" style={{backgroundColor: 'var(--bg)', border: '1px solid var(--border)'}}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg mr-4" style={{backgroundColor: 'var(--accent-600)', opacity: 0.1}}>
                        <Award className="w-6 h-6 accent-text" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold transition-colors group-hover:accent-text" style={{color: 'var(--text-dark)'}}>
                          {achievement.title}
                        </h3>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
                          <Building size={16} className="mr-2" />
                          <span className="text-sm">{achievement.issuer}</span>
                        </div>
                      </div>
                    </div>

                    {achievement.certificateUrl && (
                        <a 
                          href={achievement.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:accent-text transition-colors"
                          title="Ver certificado"
                        >
                          <ExternalLink size={20} />
                        </a>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar size={16} className="mr-2" />
                    {achievement.date}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>

                  <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-medium rounded-full">
                    ✓ Verificado
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              {t('about.skills_title')}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={index * 100}>
                <div className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{backgroundColor: 'var(--bg)', border: '1px solid var(--border)'}}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg mr-4" style={{backgroundColor: 'var(--accent-600)', opacity: 0.1}}>
                      <skill.icon className="w-6 h-6 accent-text" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{color: 'var(--text-dark)'}}>{skill.name}</h3>
                      <p className="text-sm" style={{color: 'var(--text)', opacity: 0.7}}>{skill.level}% {t('about.skills.level')}</p>
                    </div>
                  </div>
                  <div className="w-full rounded-full h-2" style={{backgroundColor: 'var(--border)'}}>
                    <div 
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%`, background: 'linear-gradient(to right, var(--accent-800), var(--accent-600))' }}
                    ></div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
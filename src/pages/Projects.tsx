import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Filter, Search, Star, Eye, Code2, Zap, Award, Users, ChevronDown, X, Grid, Smartphone, Brain, Link, Wifi } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ProjectsBanner from '../components/ProjectsBanner';
import { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useLanguage();

  const allProjects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Plataforma completa de comercio electrónico con panel de administración, gestión de inventario y pasarela de pagos.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'completed',
      link: 'https://example.com',
      github: 'https://github.com/example',
      category: 'web',
      featured: true,
      views: 1250,
      likes: 89,
      completionDate: 'Enero 2024'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Aplicación de gestión de tareas con colaboración en tiempo real y notificaciones push.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
      status: 'completed',
      link: 'https://example.com',
      github: 'https://github.com/example',
      category: 'web',
      featured: false,
      views: 890,
      likes: 67,
      completionDate: 'Diciembre 2023'
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'Sitio web personal con diseño moderno y animaciones interactivas.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      status: 'completed',
      link: 'https://example.com',
      github: 'https://github.com/example',
      category: 'web',
      featured: true,
      views: 2100,
      likes: 156,
      completionDate: 'Febrero 2024'
    },
    {
      id: '4',
      title: 'AI Chat Assistant',
      description: 'Asistente de chat inteligente con procesamiento de lenguaje natural.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'FastAPI', 'OpenAI', 'Redis'],
      status: 'in-progress',
      estimatedDate: 'Marzo 2024',
      category: 'ai',
      featured: true,
      views: 450,
      likes: 34,
      progress: 75
    },
    {
      id: '5',
      title: 'Mobile Fitness App',
      description: 'Aplicación móvil para seguimiento de ejercicios y nutrición.',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React Native', 'Firebase', 'Redux'],
      status: 'testing',
      estimatedDate: 'Abril 2024',
      category: 'mobile',
      featured: false,
      views: 320,
      likes: 28,
      progress: 90
    },
    {
      id: '6',
      title: 'Blockchain Voting System',
      description: 'Sistema de votación descentralizado con tecnología blockchain para transparencia total.',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      status: 'completed',
      link: 'https://example.com',
      github: 'https://github.com/example',
      category: 'blockchain',
      featured: true,
      views: 1800,
      likes: 134,
      completionDate: 'Noviembre 2023'
    },
    {
      id: '7',
      title: 'Real-time Dashboard',
      description: 'Dashboard en tiempo real para monitoreo de métricas y KPIs empresariales.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Vue.js', 'D3.js', 'WebSocket', 'Docker'],
      status: 'completed',
      link: 'https://example.com',
      github: 'https://github.com/example',
      category: 'web',
      featured: false,
      views: 950,
      likes: 72,
      completionDate: 'Enero 2024'
    },
    {
      id: '8',
      title: 'IoT Home Automation',
      description: 'Sistema de automatización del hogar con sensores IoT y control remoto.',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Arduino', 'Raspberry Pi', 'MQTT', 'React Native'],
      status: 'in-progress',
      estimatedDate: 'Mayo 2024',
      category: 'iot',
      featured: false,
      views: 280,
      likes: 19,
      progress: 45
    }
  ];

  const categories = [
    { id: 'all', name: t('projects.all'), count: allProjects.length, icon: Grid },
    { id: 'web', name: t('projects.web'), count: allProjects.filter(p => p.category === 'web').length, icon: Code2 },
    { id: 'mobile', name: t('projects.mobile'), count: allProjects.filter(p => p.category === 'mobile').length, icon: Smartphone },
    { id: 'ai', name: t('projects.ai'), count: allProjects.filter(p => p.category === 'ai').length, icon: Brain },
    { id: 'blockchain', name: t('projects.blockchain'), count: allProjects.filter(p => p.category === 'blockchain').length, icon: Link },
    { id: 'iot', name: t('projects.iot'), count: allProjects.filter(p => p.category === 'iot').length, icon: Wifi }
  ];

  const filteredProjects = allProjects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredProjects = allProjects.filter(project => project.featured);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'testing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'completed': return t('projects.status.completed');
      case 'in-progress': return t('projects.status.in_progress');
      case 'testing': return t('projects.status.testing');
      default: return t('projects.status.unknown');
    }
  };

  const ProjectCard: React.FC<{ project: Project; index: number; featured?: boolean }> = ({ project, index, featured = false }) => (
    <AnimatedSection delay={index * 100}>
      <div className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group ${featured ? 'ring-2' : ''}`} style={{ backgroundColor: 'var(--bg)', borderColor: featured ? 'var(--accent-600)' : 'transparent' }}>
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center px-3 py-1 text-white rounded-full text-xs font-bold shadow-lg" style={{ background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))' }}>
              <Star size={12} className="mr-1" />
              {t('projects.featured')}
            </div>
          </div>
        )}

        {/* Image with overlay effects */}
        <div className="relative overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-105"
          />
          
          {/* Minimal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(project.status)}`}>
              {getStatusText(project.status)}
            </span>
          </div>

          {/* Progress bar for in-progress projects */}
          {project.progress && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${project.progress}%`,
                    background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))'
                  }}
                ></div>
              </div>
              <p className="text-white text-xs mt-1 font-medium">{project.progress}% {t('projects.progress_completed')}</p>
            </div>
          )}

          {/* Subtle hover particles */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="particle particle-1"></span>
            <span className="particle particle-2"></span>
            <span className="particle particle-3"></span>
            <span className="particle particle-4"></span>
            <span className="particle particle-5"></span>
          </div>
        </div>
        {/* Always-visible content (no reveal) */}
        <div className="p-6">
          {/* Title with category */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold transition-colors flex-1" style={{ color: 'var(--text-dark)' }}>
              {project.title}
            </h3>
            {project.category && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full font-medium" style={{ 
                backgroundColor: 'var(--accent-600)', 
                color: 'white',
                opacity: 0.9
              }}>
                {project.category}
              </span>
            )}
          </div>

          <p className="mb-4 line-clamp-2 leading-relaxed" style={{ color: 'var(--text)', opacity: 0.8 }}>
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 text-xs rounded-full font-medium"
                style={{ 
                  backgroundColor: 'var(--accent-600)', 
                  color: 'white',
                  opacity: 0.8
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 text-xs rounded-full font-medium" style={{ 
                backgroundColor: 'var(--accent-600)', 
                color: 'white',
                opacity: 0.6
              }}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Stats & actions */}
          <div className="flex items-center justify-between mb-4 text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Eye size={14} className="mr-1" />
                {project.views?.toLocaleString() || 0}
              </div>
              <div className="flex items-center">
                <Star size={14} className="mr-1" />
                {project.likes || 0}
              </div>
            </div>
            {project.completionDate && (
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {project.completionDate}
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            {project.link && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-white rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))' }}
              >
                <ExternalLink size={16} className="mr-2" />
                {t('projects.view_demo')}
              </a>
            )}
            {project.github && (
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-white rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-105"
                style={{ backgroundColor: 'var(--accent-600)' }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-hover)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)'}
              >
                <Github size={16} className="mr-2" />
                {t('projects.view_code')}
              </a>
            )}
            <button 
              onClick={() => setSelectedProject(project)}
              className="flex items-center px-4 py-2 border-2 rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-105"
              style={{ 
                borderColor: 'var(--accent-600)', 
                color: 'var(--accent-600)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)';
                (e.target as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.color = 'var(--accent-600)';
              }}
            >
              <Eye size={16} className="mr-2" />
              {t('projects.details')}
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );

  return (
    <div className="min-h-screen">
      {/* Projects Banner */}
      <ProjectsBanner 
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-20">

        {/* Search and Filter Section */}
        <AnimatedSection>
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg mb-8 sm:mb-12" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: 'var(--text)', opacity: 0.6 }} />
                <input
                  type="text"
                  placeholder={t('projects.search_placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent text-sm sm:text-base"
                  style={{ 
                    borderColor: 'var(--border)', 
                    backgroundColor: 'var(--bg)', 
                    color: 'var(--text)'
                  }}
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 text-white rounded-lg transition-colors text-sm sm:text-base"
                style={{ backgroundColor: 'var(--accent-600)' }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-hover)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)'}
              >
                <Filter size={16} className="mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">{t('projects.filters')}</span>
                <span className="sm:hidden">{t('projects.filter')}</span>
                <ChevronDown size={16} className={`ml-1.5 sm:ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Filter Categories */}
            {showFilters && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                        activeFilter === category.id
                          ? 'text-white shadow-lg transform scale-105'
                          : 'hover:opacity-80'
                      }`}
                      style={{
                        backgroundColor: activeFilter === category.id ? 'var(--accent-600)' : 'var(--bg)',
                        color: activeFilter === category.id ? 'white' : 'var(--text)',
                        border: activeFilter === category.id ? 'none' : '1px solid var(--border)'
                      }}
                    >
                      <category.icon size={14} className="mr-1.5 sm:mr-2" />
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                      <span className="ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center" style={{ color: 'var(--text-dark)' }}>
                <Award className="mr-2 sm:mr-3" size={24} style={{ color: 'var(--accent-600)' }} />
                <span className="hidden sm:inline">{t('projects.featured_projects')}</span>
                <span className="sm:hidden">{t('projects.featured_short')}</span>
              </h2>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* All Projects Grid */}
        <section className="mb-12 sm:mb-16">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center flex-wrap" style={{ color: 'var(--text-dark)' }}>
              <Grid className="mr-2 sm:mr-3" size={24} style={{ color: 'var(--accent-600)' }} />
              <span className="hidden sm:inline">{t('projects.all_projects')}</span>
              <span className="sm:hidden">{t('projects.projects_short')}</span>
              <span className="ml-2 sm:ml-3 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium" style={{ backgroundColor: 'var(--accent-600)', color: 'white' }}>
                {filteredProjects.length}
              </span>
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4" style={{ color: 'var(--text)', opacity: 0.6 }}>
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                {t('projects.no_projects')}
              </h3>
              <p style={{ color: 'var(--text)', opacity: 0.7 }}>
                {t('projects.adjust_filters')}
              </p>
            </div>
          )}
        </section>

        {/* Enhanced Call to Action */}
        <AnimatedSection>
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))', opacity: 0.1 }}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16" style={{ backgroundColor: 'var(--accent-600)', opacity: 0.1 }}></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12" style={{ backgroundColor: 'var(--accent-hover)', opacity: 0.1 }}></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--text-dark)' }}>
                  {t('projects.have_project')}
                </h3>
                <p className="text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto px-4" style={{ color: 'var(--text)', opacity: 0.8 }}>
                  {t('projects.collaborate')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a 
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-medium text-sm sm:text-base"
                    style={{ background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))' }}
                  >
                    <Users size={18} className="mr-2" />
                    {t('projects.lets_talk')}
                  </a>
                  <a 
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 font-medium text-sm sm:text-base"
                    style={{ 
                      borderColor: 'var(--border)', 
                      color: 'var(--text)',
                      backgroundColor: 'var(--bg)'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.borderColor = 'var(--accent-600)';
                      (e.target as HTMLElement).style.color = 'var(--accent-600)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.borderColor = 'var(--border)';
                      (e.target as HTMLElement).style.color = 'var(--text)';
                    }}
                  >
                    <Zap size={18} className="mr-2" />
                    {t('projects.view_cv')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold pr-2" style={{ color: 'var(--text-dark)' }}>
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0"
                  style={{ backgroundColor: 'var(--bg)' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--bg)'}
                >
                  <X size={20} style={{ color: 'var(--text)' }} />
                </button>
              </div>
              
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 sm:mb-6"
              />
              
              <p className="text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed" style={{ color: 'var(--text)', opacity: 0.8 }}>
                {selectedProject.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {selectedProject.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full"
                    style={{ 
                      backgroundColor: 'var(--accent-600)', 
                      color: 'white',
                      opacity: 0.8
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 text-white rounded-lg transition-colors text-sm sm:text-base"
                    style={{ backgroundColor: 'var(--accent-600)' }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-hover)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)'}
                  >
                    <ExternalLink size={16} className="mr-1.5 sm:mr-2" />
                    {t('projects.view_demo')}
                  </a>
                )}
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 text-white rounded-lg transition-colors text-sm sm:text-base"
                    style={{ backgroundColor: 'var(--accent-600)' }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-hover)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)'}
                  >
                    <Github size={16} className="mr-1.5 sm:mr-2" />
                    {t('projects.view_code')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
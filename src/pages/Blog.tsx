import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, Eye, Heart, BookOpen, ChevronDown, X, ArrowRight, User, Share2, Bookmark, TrendingUp } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import BlogBanner from '../components/BlogBanner';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  views: number;
  likes: number;
  author: string;
  image: string;
  published: boolean;
}

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Construyendo Aplicaciones React Modernas con TypeScript',
      excerpt: 'Una guía completa sobre cómo crear aplicaciones React escalables y mantenibles usando TypeScript, incluyendo mejores prácticas y patrones avanzados.',
      content: 'En este artículo exploramos las mejores prácticas para desarrollar aplicaciones React con TypeScript...',
      date: '2024-01-15',
      readTime: 8,
      tags: ['React', 'TypeScript', 'Frontend', 'JavaScript'],
      category: 'frontend',
      featured: true,
      views: 1250,
      likes: 89,
      author: 'Tu Nombre',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      published: true
    },
    {
      id: '2',
      title: 'Arquitectura de Microservicios: Lecciones Aprendidas',
      excerpt: 'Comparto mi experiencia implementando microservicios en producción, los desafíos enfrentados y las soluciones que funcionaron mejor.',
      content: 'Después de 2 años trabajando con microservicios, he aprendido valiosas lecciones...',
      date: '2024-01-10',
      readTime: 12,
      tags: ['Microservicios', 'Backend', 'Arquitectura', 'DevOps'],
      category: 'backend',
      featured: true,
      views: 980,
      likes: 67,
      author: 'Tu Nombre',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      published: true
    },
    {
      id: '3',
      title: 'Optimización de Performance en Aplicaciones Web',
      excerpt: 'Técnicas avanzadas para mejorar el rendimiento de aplicaciones web, desde optimización de imágenes hasta lazy loading y code splitting.',
      content: 'La performance es crucial para la experiencia del usuario. En este artículo...',
      date: '2024-01-05',
      readTime: 6,
      tags: ['Performance', 'Web', 'Optimización', 'Frontend'],
      category: 'frontend',
      featured: false,
      views: 750,
      likes: 45,
      author: 'Tu Nombre',
      image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=600',
      published: true
    },
    {
      id: '4',
      title: 'Introducción a Machine Learning con Python',
      excerpt: 'Una introducción práctica al machine learning usando Python, con ejemplos de código y proyectos reales.',
      content: 'El machine learning está transformando la industria tecnológica...',
      date: '2024-01-01',
      readTime: 15,
      tags: ['Python', 'Machine Learning', 'AI', 'Data Science'],
      category: 'ai',
      featured: false,
      views: 1100,
      likes: 78,
      author: 'Tu Nombre',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600',
      published: true
    },
    {
      id: '5',
      title: 'Diseño de APIs RESTful: Mejores Prácticas',
      excerpt: 'Cómo diseñar APIs RESTful escalables y fáciles de usar, incluyendo versionado, autenticación y documentación.',
      content: 'Una API bien diseñada es la base de cualquier aplicación moderna...',
      date: '2023-12-28',
      readTime: 10,
      tags: ['API', 'REST', 'Backend', 'Design'],
      category: 'backend',
      featured: false,
      views: 650,
      likes: 42,
      author: 'Tu Nombre',
      image: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&w=600',
      published: true
    },
    {
      id: '6',
      title: 'Desarrollo de Aplicaciones Móviles con React Native',
      excerpt: 'Mi experiencia desarrollando aplicaciones móviles cross-platform usando React Native, ventajas y desafíos.',
      content: 'React Native permite crear aplicaciones móviles nativas usando JavaScript...',
      date: '2023-12-20',
      readTime: 9,
      tags: ['React Native', 'Mobile', 'JavaScript', 'Cross-platform'],
      category: 'mobile',
      featured: false,
      views: 820,
      likes: 56,
      author: 'Tu Nombre',
      image: 'https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg?auto=compress&cs=tinysrgb&w=600',
      published: true
    },
    {
      id: '7',
      title: 'Blockchain y Web3: El Futuro de Internet',
      excerpt: 'Explorando las posibilidades de la tecnología blockchain y su impacto en el desarrollo web moderno.',
      content: 'La tecnología blockchain está revolucionando la forma en que pensamos sobre internet...',
      date: '2023-12-15',
      readTime: 11,
      tags: ['Blockchain', 'Web3', 'Crypto', 'Decentralized'],
      category: 'blockchain',
      featured: true,
      views: 1400,
      likes: 95,
      author: 'Tu Nombre',
      image: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg?auto=compress&cs=tinysrgb&w=600',
      published: true
    },
    {
      id: '8',
      title: 'DevOps: Automatización y CI/CD',
      excerpt: 'Cómo implementar pipelines de CI/CD efectivos y automatizar el despliegue de aplicaciones.',
      content: 'DevOps no es solo una metodología, es una cultura que transforma la forma de desarrollar software...',
      date: '2023-12-10',
      readTime: 7,
      tags: ['DevOps', 'CI/CD', 'Automation', 'Docker'],
      category: 'devops',
      featured: false,
      views: 580,
      likes: 38,
      author: 'Tu Nombre',
      image: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=600',
      published: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', count: posts.length, icon: BookOpen },
    { id: 'frontend', name: 'Frontend', count: posts.filter(p => p.category === 'frontend').length, icon: TrendingUp },
    { id: 'backend', name: 'Backend', count: posts.filter(p => p.category === 'backend').length, icon: BookOpen },
    { id: 'ai', name: 'AI/ML', count: posts.filter(p => p.category === 'ai').length, icon: TrendingUp },
    { id: 'mobile', name: 'Mobile', count: posts.filter(p => p.category === 'mobile').length, icon: BookOpen },
    { id: 'blockchain', name: 'Blockchain', count: posts.filter(p => p.category === 'blockchain').length, icon: TrendingUp },
    { id: 'devops', name: 'DevOps', count: posts.filter(p => p.category === 'devops').length, icon: BookOpen }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch && post.published;
  });

  const featuredPosts = posts.filter(post => post.featured);

  const BlogCard: React.FC<{ post: BlogPost; index: number; featured?: boolean }> = ({ post, index, featured = false }) => (
    <AnimatedSection delay={index * 100}>
      <article className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group ${featured ? 'ring-2' : ''}`} style={{ backgroundColor: 'var(--bg)', borderColor: featured ? 'var(--accent-600)' : 'transparent' }}>
        {/* Featured badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center px-3 py-1 text-white rounded-full text-xs font-bold shadow-lg" style={{ background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))' }}>
              <TrendingUp size={12} className="mr-1" />
              Destacado
            </div>
          </div>
        )}

        {/* Image */}
        <div className="relative overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 backdrop-blur-sm rounded-full text-xs font-medium" style={{ 
              backgroundColor: 'var(--accent-600)', 
              color: 'white',
              opacity: 0.9
            }}>
              {post.category}
            </span>
          </div>

          {/* Hover overlay with actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-3">
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                <BookOpen size={20} className="text-white" />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                <Heart size={20} className="text-white" />
              </button>
              <button 
                onClick={() => setSelectedPost(post)}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <ArrowRight size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Meta info */}
          <div className="flex items-center justify-between mb-3 text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                {post.readTime} min
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Eye size={14} className="mr-1" />
                {post.views.toLocaleString()}
              </div>
              <div className="flex items-center">
                <Heart size={14} className="mr-1" />
                {post.likes}
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-3 transition-colors line-clamp-2" style={{ color: 'var(--text-dark)' }}>
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-3 leading-relaxed" style={{ color: 'var(--text)', opacity: 0.8 }}>
            {post.excerpt}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 text-xs rounded-full font-medium"
                style={{ 
                  backgroundColor: 'var(--accent-600)', 
                  color: 'white',
                  opacity: 0.8
                }}
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-3 py-1 text-xs rounded-full font-medium" style={{ 
                backgroundColor: 'var(--accent-600)', 
                color: 'white',
                opacity: 0.6
              }}>
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          {/* Author and actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User size={16} className="mr-2" style={{ color: 'var(--text)', opacity: 0.6 }} />
              <span className="text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>{post.author}</span>
            </div>
            <button 
              onClick={() => setSelectedPost(post)}
              className="flex items-center transition-colors text-sm font-medium"
              style={{ color: 'var(--accent-600)' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--accent-hover)'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--accent-600)'}
            >
              Leer más
              <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </article>
    </AnimatedSection>
  );

  return (
    <div className="min-h-screen">
      {/* Blog Banner */}
      <BlogBanner 
        title="Mi Blog"
        subtitle="Artículos sobre desarrollo, tecnología y experiencias profesionales. Comparto conocimientos y aprendizajes de mi carrera."
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
                  placeholder="Buscar artículos..."
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
                <span className="hidden sm:inline">Categorías</span>
                <span className="sm:hidden">Filtrar</span>
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
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                        selectedCategory === category.id
                          ? 'text-white shadow-lg transform scale-105'
                          : 'hover:opacity-80'
                      }`}
                      style={{
                        backgroundColor: selectedCategory === category.id ? 'var(--accent-600)' : 'var(--bg)',
                        color: selectedCategory === category.id ? 'white' : 'var(--text)',
                        border: selectedCategory === category.id ? 'none' : '1px solid var(--border)'
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

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center" style={{ color: 'var(--text-dark)' }}>
                <TrendingUp className="mr-2 sm:mr-3" size={24} style={{ color: 'var(--accent-600)' }} />
                <span className="hidden sm:inline">Artículos Destacados</span>
                <span className="sm:hidden">Destacados</span>
              </h2>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="mb-12 sm:mb-16">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center flex-wrap" style={{ color: 'var(--text-dark)' }}>
              <BookOpen className="mr-2 sm:mr-3" size={24} style={{ color: 'var(--accent-600)' }} />
              <span className="hidden sm:inline">Todos los Artículos</span>
              <span className="sm:hidden">Artículos</span>
              <span className="ml-2 sm:ml-3 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium" style={{ backgroundColor: 'var(--accent-600)', color: 'white' }}>
                {filteredPosts.length}
              </span>
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="mb-3 sm:mb-4" style={{ color: 'var(--text)', opacity: 0.6 }}>
                <Search size={40} className="mx-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                No se encontraron artículos
              </h3>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text)', opacity: 0.7 }}>
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <AnimatedSection>
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))', opacity: 0.1 }}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16" style={{ backgroundColor: 'var(--accent-600)', opacity: 0.1 }}></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12" style={{ backgroundColor: 'var(--accent-hover)', opacity: 0.1 }}></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--text-dark)' }}>
                  ¿Te gusta el contenido?
                </h3>
                <p className="text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto px-4" style={{ color: 'var(--text)', opacity: 0.8 }}>
                  Suscríbete para recibir notificaciones de nuevos artículos y contenido exclusivo sobre desarrollo y tecnología.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent text-sm sm:text-base"
                    style={{ 
                      borderColor: 'var(--border)', 
                      backgroundColor: 'var(--bg)', 
                      color: 'var(--text)'
                    }}
                  />
                  <button className="px-5 sm:px-6 py-2.5 sm:py-3 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-medium text-sm sm:text-base" style={{ background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))' }}>
                    Suscribirse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold flex-1 pr-2" style={{ color: 'var(--text-dark)' }}>
                  {selectedPost.title}
                </h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 sm:p-2 rounded-lg transition-colors ml-2 sm:ml-4 flex-shrink-0"
                  style={{ backgroundColor: 'var(--bg)' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--bg)'}
                >
                  <X size={20} style={{ color: 'var(--text)' }} />
                </button>
              </div>
              
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6"
              />
              
              <div className="grid grid-cols-1 sm:flex sm:items-center sm:justify-between gap-3 sm:gap-6 mb-4 sm:mb-6 text-xs sm:text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>
                <div className="flex items-center space-x-3 sm:space-x-6">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1.5 sm:mr-2" />
                    {new Date(selectedPost.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1.5 sm:mr-2" />
                    {selectedPost.readTime} min
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1.5 sm:mr-2" />
                    {selectedPost.author}
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex items-center">
                    <Eye size={14} className="mr-1.5 sm:mr-2" />
                    {selectedPost.views.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Heart size={14} className="mr-1.5 sm:mr-2" />
                    {selectedPost.likes}
                  </div>
                </div>
              </div>
              
              <p className="mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg" style={{ color: 'var(--text)', opacity: 0.8 }}>
                {selectedPost.content}
              </p>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                {selectedPost.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium"
                    style={{ 
                      backgroundColor: 'var(--accent-600)', 
                      color: 'white',
                      opacity: 0.9
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button className="flex items-center justify-center px-4 py-2 text-white rounded-lg transition-colors text-sm sm:text-base" style={{ backgroundColor: 'var(--accent-600)' }} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-hover)'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)'}>
                  <Heart size={16} className="mr-2" />
                  Me gusta
                </button>
                <button className="flex items-center justify-center px-4 py-2 border rounded-lg transition-colors text-sm sm:text-base" style={{ borderColor: 'var(--border)', color: 'var(--text)', backgroundColor: 'var(--bg)' }} onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = 'var(--accent-600)'; (e.target as HTMLElement).style.color = 'var(--accent-600)'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; (e.target as HTMLElement).style.color = 'var(--text)'; }}>
                  <Share2 size={16} className="mr-2" />
                  Compartir
                </button>
                <button className="flex items-center justify-center px-4 py-2 border rounded-lg transition-colors text-sm sm:text-base" style={{ borderColor: 'var(--border)', color: 'var(--text)', backgroundColor: 'var(--bg)' }} onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = 'var(--accent-600)'; (e.target as HTMLElement).style.color = 'var(--accent-600)'; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; (e.target as HTMLElement).style.color = 'var(--text)'; }}>
                  <Bookmark size={16} className="mr-2" />
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;



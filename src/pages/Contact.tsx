import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin, Github, Instagram, CheckCircle, Clock, MessageCircle, Calendar, Star, Award, Users, Code, Rocket, ExternalLink, ChevronDown, AlertCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Captcha from '../components/Captcha';
import { ContactForm } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { emailService } from '../services/emailService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const { t } = useLanguage();

  // Initialize EmailJS
  useEffect(() => {
    emailService.init();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar CAPTCHA antes de enviar
    if (!isCaptchaValid) {
      setSubmitError('Por favor, completa la verificación de seguridad correctamente.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const selectedServiceName = selectedService ? services.find(s => s.id === selectedService)?.name || 'No especificado' : 'No especificado';
      
      console.log('Debug - Selected Service:', {
        selectedService,
        selectedServiceName,
        services: services.map(s => ({ id: s.id, name: s.name }))
      });

      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        service_type: selectedServiceName,
        to_name: 'Fabritcio'
      };

      const success = await emailService.sendEmail(emailParams);
      
      if (success) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
          setSelectedService('');
          setIsCaptchaValid(false);
        }, 3000);
      } else {
        setSubmitError('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitError('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { id: 'web-development', name: t('contact.services.web_development'), icon: Code, description: t('contact.service_descriptions.web_development') },
    { id: 'mobile-development', name: t('contact.services.mobile_development'), icon: Phone, description: t('contact.service_descriptions.mobile_development') },
    { id: 'consulting', name: t('contact.services.consulting'), icon: Users, description: t('contact.service_descriptions.consulting') },
    { id: 'maintenance', name: t('contact.services.maintenance'), icon: Clock, description: t('contact.service_descriptions.maintenance') }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/fabritciops15/',
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
      followers: '2.5K'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/FabritcioPS15',
      color: 'hover:text-gray-900 dark:hover:text-white',
      followers: '1.2K'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/tu-usuario',
      color: 'hover:text-pink-600 dark:hover:text-pink-400',
      followers: '850'
    }
  ];

  const contactInfo = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+51 958 077 827',
      href: 'https://wa.me/51958077827?text=Hola%20Fabritcio%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20un%20proyecto.%20%C2%BFPodemos%20coordinar%3F',
      description: 'Respuesta rápida por WhatsApp'
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+51 958 077 827',
      href: 'tel:+51958077827',
      description: 'Lunes a Viernes 9AM-6PM'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Lima, Perú',
      href: 'https://maps.google.com',
      description: 'Disponible para reuniones'
    }
  ];

  const testimonials = [
    {
      name: 'María García',
      role: 'CEO, TechStart',
      content: 'Excelente trabajo en nuestro proyecto web. Profesional, puntual y muy creativo.',
      rating: 5
    },
    {
      name: 'Carlos López',
      role: 'CTO, InnovateLab',
      content: 'La mejor decisión que tomamos fue contratar sus servicios. Resultados excepcionales.',
      rating: 5
    },
    {
      name: 'Ana Rodríguez',
      role: 'Product Manager, DigitalCo',
      content: 'Comunicación clara, entregas a tiempo y calidad superior. Altamente recomendado.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: t('contact.faqs.delivery_time'),
      answer: t('contact.faqs.delivery_answer')
    },
    {
      question: t('contact.faqs.maintenance'),
      answer: t('contact.faqs.maintenance_answer')
    },
    {
      question: t('contact.faqs.budget'),
      answer: t('contact.faqs.budget_answer')
    },
    {
      question: t('contact.faqs.technologies'),
      answer: t('contact.faqs.technologies_answer')
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Header */}
        <AnimatedSection>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl page-title mb-4 sm:mb-6 lg:mb-8">
              {t('contact.title')}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              {t('contact.subtitle')}
            </p>
          </div>
        </AnimatedSection>


        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Enhanced Contact Form */}
          <AnimatedSection animation="slide-left">
            <div className="rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16" style={{ backgroundColor: 'var(--accent-600)', opacity: 0.1 }}></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12" style={{ backgroundColor: 'var(--accent-hover)', opacity: 0.1 }}></div>
              
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 flex items-center" style={{ color: 'var(--text-dark)' }}>
                  <Send className="mr-2 sm:mr-3" size={20} style={{ color: 'var(--accent-600)' }} />
                  <span className="hidden sm:inline">{t('contact.send_message')}</span>
                  <span className="sm:hidden">{t('contact.message_short')}</span>
                </h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="relative">
                      <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-4 sm:mb-6 animate-bounce" />
                      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--text-dark)' }}>
                      {t('contact.message_sent')}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--text)', opacity: 0.8 }}>
                      {t('contact.thanks_response')}
                    </p>
                  </div>
                ) : submitError ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="relative">
                      <AlertCircle className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mx-auto mb-4 sm:mb-6" />
                      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--text-dark)' }}>
                      Error al enviar
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg mb-4" style={{ color: 'var(--text)', opacity: 0.8 }}>
                      {submitError}
                    </p>
                    <button
                      onClick={() => setSubmitError(null)}
                      className="px-6 py-2 text-white rounded-lg transition-all duration-300"
                      style={{ backgroundColor: 'var(--accent-600)' }}
                    >
                      Intentar de nuevo
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text)', opacity: 0.8 }}>
                          {t('contact.full_name')} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                          style={{ 
                            borderColor: 'var(--border)', 
                            backgroundColor: 'var(--bg)', 
                            color: 'var(--text)'
                          }}
                          placeholder={t('contact.full_name_placeholder')}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text)', opacity: 0.8 }}>
                          {t('contact.email')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                          style={{ 
                            borderColor: 'var(--border)', 
                            backgroundColor: 'var(--bg)', 
                            color: 'var(--text)'
                          }}
                          placeholder={t('contact.email_placeholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text)', opacity: 0.8 }}>
                        {t('contact.service_type')}
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        style={{ 
                          borderColor: 'var(--border)', 
                          backgroundColor: 'var(--bg)', 
                          color: 'var(--text)'
                        }}
                      >
                        <option value="">{t('contact.select_service')}</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text)', opacity: 0.8 }}>
                        {t('contact.message')} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                        style={{ 
                          borderColor: 'var(--border)', 
                          backgroundColor: 'var(--bg)', 
                          color: 'var(--text)'
                        }}
                        placeholder={t('contact.message_placeholder')}
                      />
                    </div>

                    {/* CAPTCHA */}
                    <Captcha 
                      onValidationChange={setIsCaptchaValid}
                      disabled={isSubmitting}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting || !isCaptchaValid}
                      className="w-full flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-medium disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                      style={{ 
                        background: isSubmitting 
                          ? 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))' 
                          : 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))',
                        opacity: isSubmitting || !isCaptchaValid ? 0.7 : 1
                      }}
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Send size={18} className="mr-2" />
                      )}
                      {isSubmitting 
                        ? t('contact.sending') 
                        : !isCaptchaValid 
                          ? 'Completa la verificación' 
                          : t('contact.send')
                      }
                    </button>
                  </form>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Enhanced Contact Info */}
          <AnimatedSection animation="slide-right">
            <div className="space-y-6 sm:space-y-8">
              {/* Contact Information */}
              <div className="rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8" style={{ backgroundColor: 'var(--bg)' }}>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 flex items-center" style={{ color: 'var(--text-dark)' }}>
                  <MessageCircle className="mr-2 sm:mr-3" size={20} style={{ color: 'var(--accent-600)' }} />
                  <span className="hidden sm:inline">{t('contact.contact_info')}</span>
                  <span className="sm:hidden">{t('contact.contact_short')}</span>
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start group p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-md" style={{ backgroundColor: 'transparent' }}>
                      <div className="p-3 sm:p-4 rounded-xl mr-3 sm:mr-4 group-hover:scale-110 transition-all duration-300 shadow-lg" style={{ 
                        background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                      }}>
                        <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: 'var(--text)', opacity: 0.6 }}>{info.label}</p>
                        <a 
                          href={info.href}
                          className="text-base sm:text-lg font-semibold transition-colors block mb-1"
                          style={{ color: 'var(--text)' }}
                          onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--accent-600)'}
                          onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text)'}
                        >
                          {info.value}
                        </a>
                        <p className="text-xs sm:text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8" style={{ backgroundColor: 'var(--bg)' }}>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 flex items-center" style={{ color: 'var(--text-dark)' }}>
                  <Rocket className="mr-2 sm:mr-3" size={20} style={{ color: 'var(--accent-600)' }} />
                  <span className="hidden sm:inline">{t('contact.services_offered')}</span>
                  <span className="sm:hidden">{t('contact.services_short')}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {services.map((service) => (
                    <div key={service.id} className="p-3 sm:p-4 rounded-xl hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/50 dark:hover:bg-gray-700/30">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" style={{ color: 'var(--accent-600)' }} />
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: 'var(--text-dark)' }}>{service.name}</h4>
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--text)', opacity: 0.8 }}>{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Availability */}
              <div className="rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden border border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg)' }}>
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full -translate-y-8 sm:-translate-y-12 translate-x-8 sm:translate-x-12" style={{ backgroundColor: 'var(--accent-600)', opacity: 0.15 }}></div>
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 flex items-center" style={{ color: 'var(--text-dark)' }}>
                    <Clock className="mr-2 sm:mr-3" size={20} style={{ color: 'var(--accent-600)' }} />
                    <span className="hidden sm:inline">{t('contact.availability')}</span>
                    <span className="sm:hidden">{t('contact.available_short')}</span>
                  </h3>
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 sm:mr-3 animate-pulse" style={{ backgroundColor: 'var(--accent-600)' }}></div>
                    <span className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>{t('contact.available_projects')}</span>
                  </div>
                  <p className="text-sm sm:text-base mb-3 sm:mb-4" style={{ color: 'var(--text)', opacity: 0.9 }}>
                    {t('contact.response_time')}
                  </p>
                  <div className="flex items-center text-xs sm:text-sm" style={{ color: 'var(--text)', opacity: 0.8 }}>
                    <Calendar size={14} className="mr-1.5 sm:mr-2" style={{ color: 'var(--accent-600)' }} />
                    {t('contact.schedule')}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Testimonials Section */}
        <AnimatedSection>
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 flex items-center justify-center" style={{ color: 'var(--text-dark)' }}>
              <Star className="mr-2 sm:mr-3" size={24} style={{ color: 'var(--accent-600)' }} />
              <span className="hidden sm:inline">{t('contact.testimonials')}</span>
              <span className="sm:hidden">{t('contact.testimonials_short')}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: 'var(--bg)' }}>
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" style={{ color: 'var(--accent-600)' }} />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base mb-3 sm:mb-4 italic" style={{ color: 'var(--text)', opacity: 0.8 }}>"{testimonial.content}"</p>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base" style={{ color: 'var(--text-dark)' }}>{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm" style={{ color: 'var(--text)', opacity: 0.6 }}>{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection>
          <div className="rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center" style={{ color: 'var(--text-dark)' }}>
                <Award className="mr-2 sm:mr-3" size={20} style={{ color: 'var(--accent-600)' }} />
                <span className="hidden sm:inline">{t('contact.faq')}</span>
                <span className="sm:hidden">{t('contact.faq')}</span>
              </h2>
              <button
                onClick={() => setShowFAQ(!showFAQ)}
                className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-lg transition-colors text-sm sm:text-base"
                style={{ backgroundColor: 'var(--accent-600)' }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-hover)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)'}
              >
                {showFAQ ? t('contact.hide') : t('contact.show_all')}
                <ChevronDown size={14} className={`ml-1.5 sm:ml-2 transition-transform ${showFAQ ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            <div className={`space-y-3 sm:space-y-4 ${showFAQ ? 'block' : 'hidden md:block'}`}>
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300" style={{ borderColor: 'var(--border)' }}>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base" style={{ color: 'var(--text-dark)' }}>{faq.question}</h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text)', opacity: 0.8 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection>
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
            {/* Fondo con alto contraste para todos los temas */}
            <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent-600), var(--accent-hover))' }}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16" style={{ backgroundColor: 'var(--accent-600)', opacity: 0.1 }}></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12" style={{ backgroundColor: 'var(--accent-hover)', opacity: 0.1 }}></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#ffffff' }}>
                  {t('contact.ready_start')}
                </h3>
                <p className="text-sm sm:text-base lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {t('contact.work_together')}
                </p>
                <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center">
                  <a 
                    href="https://wa.me/51958077827?text=Hola%20Fabritcio%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20un%20proyecto.%20%C2%BFPodemos%20coordinar%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-medium text-sm sm:text-base"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))', border: '1px solid rgba(255,255,255,0.35)' }}
                  >
                    <MessageCircle size={18} className="mr-2" />
                    WhatsApp
                  </a>
                  <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    ¿Aún tienes dudas? ¿Quieres ver otros trabajos?
                  </p>
                  <a 
                    href="/projects"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 font-medium text-sm sm:text-base text-white"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))', border: '1px solid rgba(255,255,255,0.35)' }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).setAttribute('style', 'background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.2)); border: 1px solid rgba(255,255,255,0.6); color: #ffffff');
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).setAttribute('style', 'background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1)); border: 1px solid rgba(255,255,255,0.35); color: #ffffff');
                    }}
                  >
                    <Rocket size={18} className="mr-2" />
                    Ver proyectos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;
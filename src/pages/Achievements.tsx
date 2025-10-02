import React from 'react';
import { Award, Calendar, Building, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Achievement } from '../types';

const Achievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Certified React Developer',
      issuer: 'Meta (Facebook)',
      date: '2023',
      description: 'Certificación avanzada en desarrollo con React, incluyendo hooks, context API y patrones avanzados.',
      certificateUrl: 'https://example.com/cert1'
    },
    {
      id: '2',
      title: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      description: 'Certificación en arquitectura de soluciones en la nube, diseño de sistemas escalables y mejores prácticas.',
      certificateUrl: 'https://example.com/cert2'
    },
    {
      id: '3',
      title: 'Full Stack Web Development',
      issuer: 'Universidad Tecnológica',
      date: '2022',
      description: 'Especialización completa en desarrollo web full stack con tecnologías modernas.',
      certificateUrl: 'https://example.com/cert3'
    },
    {
      id: '4',
      title: 'UI/UX Design Fundamentals',
      issuer: 'Google Design',
      date: '2022',
      description: 'Certificación en fundamentos de diseño de experiencia e interfaz de usuario.',
      certificateUrl: 'https://example.com/cert4'
    },
    {
      id: '5',
      title: 'Agile Project Management',
      issuer: 'Scrum Alliance',
      date: '2021',
      description: 'Certificación en metodologías ágiles y gestión de proyectos con Scrum.',
      certificateUrl: 'https://example.com/cert5'
    },
    {
      id: '6',
      title: 'Best Innovation Award',
      issuer: 'Tech Conference 2023',
      date: '2023',
      description: 'Reconocimiento por proyecto innovador en inteligencia artificial aplicada al desarrollo web.',
      certificateUrl: 'https://example.com/cert6'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Logros y Certificaciones
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Una trayectoria de aprendizaje continuo y reconocimientos profesionales
            </p>
          </div>
        </AnimatedSection>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <AnimatedSection key={achievement.id} delay={index * 100}>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                      <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Ver certificado"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar size={16} className="mr-2" />
                  {achievement.date}
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {achievement.description}
                </p>

                {/* Certificate Badge */}
                <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-medium rounded-full">
                  ✓ Verificado
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedSection>
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-12">
              <Award className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Compromiso con la Excelencia
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Mi dedicación al aprendizaje continuo y la mejora constante se refleja en cada proyecto que realizo. 
                Cada certificación representa un paso más hacia la maestría en mi campo.
              </p>
              <a 
                href="/projects"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium"
              >
                Ver Mis Proyectos
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Achievements;
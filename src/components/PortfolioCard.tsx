import React, { useState } from 'react';
import type { Project } from '../hooks/usePortfolio';
import FlipCard from './FlipCard';
import ProgressRing from './ProgressRing';

interface PortfolioCardProps {
  project: Project;
  getLocalizedTitle: (project: Project) => string;
  getLocalizedDescription: (project: Project) => string;
  t: (key: string) => string;
  index: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  getLocalizedTitle,
  getLocalizedDescription,
  t,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      style={{
        animationDelay: `${index * 150}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards',
        opacity: 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Gradient overlay that appears on hover */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 pointer-events-none
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
          `}
        />

        {/* Image section */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
          <div
            className={`
              transition-transform duration-500
              ${isHovered ? 'scale-110 rotate-1' : 'scale-100 rotate-0'}
            `}
          >
            {project.image ? (
              <img
                src={`/${project.image}`}
                alt={getLocalizedTitle(project)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <i className={`${project.icon} text-white text-6xl transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}></i>
            )}
          </div>

          {/* Live indicator */}
          {project.liveDemo && (
            <div className={`absolute top-4 right-4 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
              <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs hover:bg-green-600 transition-colors">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-6">
          <h3 className="text-xl font-tech font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 transform group-hover:translate-x-1">
            {getLocalizedTitle(project)}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
            {getLocalizedDescription(project)}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 hover:scale-105 hover:shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-all duration-300 hover:scale-105 hover:gap-2 group"
                >
                  <i className="fas fa-external-link-alt transition-transform duration-300 group-hover:rotate-45"></i>
                  <span className="hidden sm:inline">{t('portfolio.viewDemo')}</span>
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium text-sm transition-all duration-300 hover:scale-105 hover:gap-2 group"
                >
                  <i className="fab fa-github transition-transform duration-300 group-hover:rotate-12"></i>
                  <span className="hidden sm:inline">{t('portfolio.viewGithub')}</span>
                </a>
              )}
            </div>

            {/* Hover indicator */}
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 group-hover:text-blue-500">
              <i className="fas fa-arrow-right animate-pulse"></i>
            </div>
          </div>
        </div>

        {/* Floating gradient border */}
        <div
          className={`
            absolute inset-0 rounded-xl border-2 pointer-events-none
            transition-all duration-500
            ${isHovered
              ? 'border-blue-500 scale-[1.02] opacity-100 shadow-lg shadow-blue-500/20'
              : 'border-transparent opacity-0'
            }
          `}
        />

        {/* Particle effect on hover */}
        <div className={`
          absolute inset-0 pointer-events-none overflow-hidden rounded-xl
          transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      </div>
    );
};

export default PortfolioCard;
import React, { useEffect, useRef } from 'react';
import portfolioData from '../data/portfolio.json';
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';
import PortfolioCard from './PortfolioCard';

const Portfolio: React.FC = () => {
  const { t, currentLanguage } = useSimpleLanguage();
  const portfolioRef = useRef<HTMLDivElement>(null);

  // Get localized title
  const getLocalizedTitle = (project: any) => {
    return project.title[currentLanguage] || project.title.en;
  };

  // Get localized description
  const getLocalizedDescription = (project: any) => {
    return project.description[currentLanguage] || project.description.en;
  };

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = portfolioRef.current?.querySelectorAll('.portfolio-item-reveal');
    elements?.forEach((el, index) => {
      setTimeout(() => {
        observer.observe(el);
      }, index * 100);
    });

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-cyber font-bold text-center mb-16">
          <span className="gradient-text">{t('portfolio.title')}</span>
        </h2>

        <div ref={portfolioRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project: any, index: number) => (
            <PortfolioCard
              key={project.id}
              project={project}
              getLocalizedTitle={getLocalizedTitle}
              getLocalizedDescription={getLocalizedDescription}
              t={t}
              index={index}
            />
          ))}
        </div>
      </div>

      </section>
  );
};

export default Portfolio;
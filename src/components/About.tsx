import React, { useState, useEffect, useRef } from 'react';
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';

const About: React.FC = () => {
  const { t } = useSimpleLanguage();
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const aboutPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preload the photo
    const img = new Image();
    img.onload = () => {
      setPhotoLoaded(true);
    };
    img.onerror = () => {
      setPhotoError(true);
    };
    img.src = '/foto/foto.png';

    // Intersection Observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const traits = [
    { icon: 'fa-check-circle', text: t('about.traits.problemSolver') },
    { icon: 'fa-check-circle', text: t('about.traits.teamPlayer') },
    { icon: 'fa-check-circle', text: t('about.traits.fastLearner') },
    { icon: 'fa-check-circle', text: t('about.traits.detailOriented') },
  ];

  
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-cyber font-bold text-center mb-16 reveal-on-scroll">
          <span className="gradient-text">{t('about.title')}</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Photo Section */}
          <div className="relative reveal-on-scroll flex justify-center items-center h-96" ref={aboutPhotoRef}>
            <div className="relative group">
              {/* Simple photo frame */}
              <div className="relative w-80 h-80 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={photoError ? "https://ui-avatars.com/api/?name=Albert+Assidiq&background=3B82F6&color=fff&size=400" : "/foto/foto.png"}
                  alt="Albert Assidiq"
                  className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${photoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setPhotoLoaded(true)}
                  onError={() => setPhotoError(true)}
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="reveal-on-scroll">
            <h3 className="text-2xl font-tech font-bold mb-6 text-gray-900 dark:text-white">
              {t('about.subtitle')}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('about.description1')}
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('about.description2')}
            </p>

            {/* Traits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {traits.map((trait, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <i className={`${trait.icon} bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text`}></i>
                  <span className="text-gray-700 dark:text-gray-300">{trait.text}</span>
                </div>
              ))}
            </div>

            </div>
        </div>
      </div>

            </section>
  );
};

export default About;
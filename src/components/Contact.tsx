import React, { useEffect } from 'react';
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';
import MagneticButton from './MagneticButton';

const Contact: React.FC = () => {
  const { t } = useSimpleLanguage();

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

    const elements = document.querySelectorAll('.contact-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      url: 'https://github.com/OliviaBernkastell',
      description: t('contact.githubDesc'),
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      url: 'https://www.linkedin.com/in/albert-assidiq/',
      description: t('contact.linkedinDesc'),
    },
    {
      name: 'Medium',
      icon: 'fab fa-medium',
      url: 'https://medium.com/@assidiqalbert',
      description: t('contact.mediumDesc'),
    },
  ];

  return (
    <section id="contact" className="py-20 relative bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-cyber font-bold text-center mb-16 contact-reveal">
          <span className="gradient-text">{t('contact.title')}</span>
        </h2>

        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-tech font-bold mb-8 text-gray-900 dark:text-white contact-reveal">
            {t('contact.subtitle')}
          </h3>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed contact-reveal">
            {t('contact.description')}
          </p>

          {/* Primary Contact Methods */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <MagneticButton
              href="https://wa.me/6281370501796?text=Hi%20Albert,%20I'm%20interested%20in%20your%20web%20development%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-6 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:shadow-cyan-500/25 contact-reveal"
            >
              <div className="flex items-center space-x-4">
                <i className="fab fa-whatsapp text-3xl"></i>
                <div className="text-left">
                  <div className="font-bold">{t('contact.whatsappChat')}</div>
                  <div className="text-sm opacity-90">+62 813-7050-1796</div>
                </div>
              </div>
            </MagneticButton>

            <MagneticButton
              href="mailto:assidiqalbert@gmail.com"
              className="px-8 py-6 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:shadow-cyan-500/25 contact-reveal"
            >
              <div className="flex items-center space-x-4">
                <i className="fas fa-envelope text-3xl"></i>
                <div className="text-left">
                  <div className="font-bold">{t('contact.sendEmail')}</div>
                  <div className="text-sm opacity-90">assidiqalbert@gmail.com</div>
                </div>
              </div>
            </MagneticButton>
          </div>

          {/* Other Ways to Connect */}
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-cyan-500/50 contact-reveal">
            <h4 className="text-xl font-tech font-bold mb-6 text-gray-900 dark:text-white text-center">
              {t('contact.otherWays')}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <i className={`${link.icon} text-3xl text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}></i>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {link.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {link.description}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      </section>
  );
};

export default Contact;
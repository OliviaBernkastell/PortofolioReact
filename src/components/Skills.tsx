import React, { useEffect, useRef } from 'react';
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';
import TechIcon from './TechIcon';
import ProgressRing from './ProgressRing';

const Skills: React.FC = () => {
  const { t } = useSimpleLanguage();
  const skillsRef = useRef<HTMLDivElement>(null);

  const techStack = [
    { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500', level: 95 },
    { name: 'CSS', icon: 'fab fa-css3-alt', color: 'text-blue-500', level: 90 },
    { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-400', level: 85 },
    { name: 'Flowbite', icon: 'custom-flowbite', color: 'text-blue-600', image: 'https://flowbite.s3.amazonaws.com/brand/logo-dark/mark/flowbite-logo.png', level: 80 },
    { name: 'React', icon: 'fab fa-react', color: 'text-blue-500', level: 88 },
    { name: 'Vue.js', icon: 'fab fa-vuejs', color: 'text-green-500', level: 75 },
    { name: 'Node.js', icon: 'fab fa-node', color: 'text-green-600', level: 82 },
    { name: 'Python', icon: 'fab fa-python', color: 'text-yellow-500', level: 70 },
    { name: 'Docker', icon: 'fab fa-docker', color: 'text-blue-600', level: 65 },
    { name: 'Laravel', icon: 'fab fa-laravel', color: 'text-red-500', level: 85 },
    { name: 'Livewire', icon: 'custom-livewire', color: 'text-red-600', image: 'https://avatars.githubusercontent.com/u/51960834?s=280&v=4', level: 80 },
    { name: 'Git', icon: 'fab fa-git', color: 'text-red-500', level: 90 },
    { name: 'Database', icon: 'fas fa-database', color: 'text-gray-600', level: 75 },
  ];

  const stats = [
    { number: '15+', label: t('skills.frontend') },
    { number: '12+', label: t('skills.backend') },
    { number: '8+', label: t('skills.ai') },
  ];

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

    const elements = skillsRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el, index) => {
      // Apply staggered delay
      setTimeout(() => {
        observer.observe(el);
      }, index * 100);
    });

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="skills" className="py-20 relative bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={skillsRef}>
        <h2 className="text-4xl md:text-5xl font-cyber font-bold text-center mb-16 reveal-on-scroll">
          <span className="gradient-text">{t('skills.title')}</span>
        </h2>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center reveal-on-scroll">
              <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h3 className="text-2xl font-tech font-bold mb-8 text-gray-900 dark:text-white reveal-on-scroll">
            Tech Stack
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech, index) => (
              <TechIcon
                key={index}
                icon={tech.icon}
                image={tech.image}
                name={tech.name}
                color={tech.color}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>

      </section>
  );
};

export default Skills;
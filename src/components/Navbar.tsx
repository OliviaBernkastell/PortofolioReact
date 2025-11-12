import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';
import LanguageToggle from './LanguageToggle';

const Navbar: React.FC = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { currentLanguage, toggleLanguage, t } = useSimpleLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#portfolio', label: t('nav.portfolio') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white dark:bg-slate-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-lg'
        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-cyber gradient-text">AA</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="nav-link font-tech text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              title="Toggle dark mode"
            >
              {isDark ? (
                <i className="fas fa-moon text-yellow-400"></i>
              ) : (
                <i className="fas fa-sun text-orange-400"></i>
              )}
            </button>

            <LanguageToggle
              currentLanguage={currentLanguage}
              onToggle={toggleLanguage}
            />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 nav-link font-accent text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-sm transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
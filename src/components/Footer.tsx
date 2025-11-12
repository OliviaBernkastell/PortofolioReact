import React from 'react';
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';

const Footer: React.FC = () => {
  const { t } = useSimpleLanguage();

  return (
    <footer className="py-6 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            <span className="inline-flex items-center space-x-2">
              <i className="fas fa-code text-blue-600 dark:text-blue-400"></i>
              <span>{t('copyright')}</span>
              <i className="fas fa-heart text-red-500 dark:text-red-400 animate-pulse"></i>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
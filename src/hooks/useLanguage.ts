import { useState, useEffect } from 'react';
import translations from '../data/translations.json';

type Language = 'en' | 'id';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferredLanguage');
      return (savedLang as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', currentLanguage);
    }
  }, [currentLanguage]);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'id' : 'en';
    console.log('Mengganti bahasa dari', currentLanguage, 'ke', newLanguage);
    setCurrentLanguage(newLanguage);
  };

  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations.translations[currentLanguage];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key} for language: ${currentLanguage}`);
          return key;
        }
      }

      return typeof value === 'string' ? value : key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  return {
    currentLanguage,
    toggleLanguage,
    t,
    setLanguage: setCurrentLanguage
  };
};
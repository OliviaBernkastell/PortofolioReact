import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import translations from '../data/translations.json';

type Language = 'en' | 'id';

interface LanguageContextType {
  currentLanguage: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferredLanguage');
      return (saved as Language) || 'en';
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
    console.log('🔄 LANGUAGE TOGGLE:', currentLanguage, '->', newLanguage);
    setCurrentLanguage(newLanguage);
  };

  const setLanguage = (lang: Language) => {
    console.log('🌍 SET LANGUAGE:', lang);
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations.translations[currentLanguage];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`❌ Translation key not found: ${key} (${currentLanguage})`);
          return key;
        }
      }

      const result = typeof value === 'string' ? value : key;
      console.log(`📝 Translation: ${key} -> "${result}" (${currentLanguage})`);
      return result;
    } catch (error) {
      console.error('❌ Translation error:', error);
      return key;
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    toggleLanguage,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
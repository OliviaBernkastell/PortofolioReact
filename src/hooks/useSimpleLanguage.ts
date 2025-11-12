import { useLanguageContext } from '../contexts/LanguageContext';

// Simple wrapper hook for backward compatibility
export const useSimpleLanguage = () => {
  return useLanguageContext();
};
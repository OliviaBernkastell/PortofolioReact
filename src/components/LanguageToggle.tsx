import React from 'react';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'id';
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all transform hover:scale-105 shadow-lg"
      title="Switch Language"
    >
      <i className="fas fa-language"></i>
      <span className="ml-1 text-xs font-bold">
        {currentLanguage === 'en' ? 'EN' : 'ID'}
      </span>
    </button>
  );
};

export default LanguageToggle;
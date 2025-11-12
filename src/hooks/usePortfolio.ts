import { useState } from 'react';
import portfolioData from '../data/portfolio.json';
import { useLanguage } from './useLanguage';

export interface Project {
  id: number;
  title: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  techStack: string[];
  liveDemo: string | null;
  github: string | null;
  image: string;
  icon: string;
  gradient: string;
}

export const usePortfolio = () => {
  const { currentLanguage } = useLanguage();
  const [projects] = useState<Project[]>(portfolioData.projects);

  const getLocalizedTitle = (project: Project) => {
    return project.title[currentLanguage] || project.title.en;
  };

  const getLocalizedDescription = (project: Project) => {
    return project.description[currentLanguage] || project.description.en;
  };

  return {
    projects,
    getLocalizedTitle,
    getLocalizedDescription,
    currentLanguage
  };
};
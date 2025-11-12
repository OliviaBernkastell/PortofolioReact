import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import FloatingParticles from './components/FloatingParticles';
import MorphingShapes from './components/MorphingShapes';
import ThemeClickSpark from './components/ThemeClickSpark';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

// Prevent flash of unstyled content
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('darkMode');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'true' || (!savedTheme && systemDark)) {
    document.documentElement.classList.add('dark');
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Main App Content */}
      <LanguageProvider>
        <ThemeClickSpark>
          <div className={`bg-slate-50 dark:bg-slate-900 transition-all duration-500 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'} relative`} id="app-body">
          {/* Main Content */}
          <div className="relative z-10">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Portfolio />
            <Contact />
            <Footer />
          </div>

          {/* Animated Background - behind content */}
          <div className="fixed inset-0 -z-10">
            <AnimatedBackground />
          </div>

          {/* Custom Cursor (only on desktop) */}
          <CustomCursor />

          {/* Floating Particles */}
          <FloatingParticles count={20} />

          {/* Morphing Shapes */}
          <MorphingShapes />

          {/* Scroll Progress Indicator */}
          <ScrollProgress />
          </div>
        </ThemeClickSpark>
      </LanguageProvider>
    </>
  );
}

export default App;

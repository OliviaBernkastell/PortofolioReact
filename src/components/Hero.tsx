import React, { useEffect, useRef } from 'react';
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';
import { TextRevealSimple } from './TextReveal';
import MagneticButton from './MagneticButton';
import AnimatedGradientText from './AnimatedGradientText';
import GlitchText from './GlitchText';
import RippleButton from './RippleButton';
import TextType from './TextType';
import DecryptedText from './DecryptedText';

const Hero: React.FC = () => {
  const { t, currentLanguage } = useSimpleLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId: number;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.reset(canvasWidth, canvasHeight);
      }

      reset(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        if (!context) return;
        context.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const distance = Math.hypot(
            particle.x - otherParticle.x,
            particle.y - otherParticle.y
          );

          if (distance < 100) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-blue-50/90 to-cyan-50/90 dark:from-slate-900/90 dark:via-slate-800/90 dark:to-slate-900/90 transition-colors duration-300">
        {/* Animated network particles background */}
        <canvas
          ref={canvasRef}
          id="hero-canvas"
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="hero-content">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cyber font-bold mb-8">
            <div className="flex flex-wrap justify-center items-baseline gap-x-2">
              <TextRevealSimple
                text={t('hero.greeting')}
                className="text-slate-900 dark:text-white"
                delay={300}
                duration={1000}
              />
              <GlitchText
                text="Albert Assidiq"
                className="font-cyber font-bold"
                glitchOnHover={true}
              />
            </div>
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl mb-8 text-slate-600 dark:text-slate-300 font-semibold opacity-0 animate-fade-in" style={{ animationDelay: '1500ms', animationDuration: '800ms', animationFillMode: 'forwards' }}>
            <TextType
              text={currentLanguage === 'en' ?
                ["Web Developer & AI Engineer"] :
                ["Web Developer & AI Engineer"]
              }
              typingSpeed={100}
              pauseDuration={2000}
              initialDelay={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-slate-600 dark:text-slate-300"
              cursorClassName="text-blue-500 dark:text-cyan-400"
            />
          </div>

          <div className="text-lg sm:text-xl mb-16 max-w-4xl mx-auto text-slate-600 dark:text-slate-400 leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '2500ms', animationDuration: '800ms', animationFillMode: 'forwards' }}>
            <DecryptedText
              text={t('hero.description')}
              speed={80}
              maxIterations={15}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+1234567890"
              animateOn="view"
              revealDirection="center"
              className="revealed text-slate-600 dark:text-slate-400"
              parentClassName="inline-block"
              encryptedClassName="encrypted"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <MagneticButton
              href="https://wa.me/6281370501796?text=Hi%20Albert,%20I'm%20interested%20in%20your%20web%20development%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg"
            >
              <i className="fab fa-whatsapp mr-2"></i> WhatsApp Me
            </MagneticButton>
          </div>

          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/OliviaBernkastell"
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer transform transition-all duration-300 hover:scale-110"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                <i className="fab fa-github text-3xl sm:text-4xl text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"></i>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/albert-assidiq/"
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer transform transition-all duration-300 hover:scale-110"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                <i className="fab fa-linkedin text-3xl sm:text-4xl text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"></i>
              </div>
            </a>

            <a
              href="https://medium.com/@assidiqalbert"
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer transform transition-all duration-300 hover:scale-110"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                <i className="fab fa-medium text-3xl sm:text-4xl text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"></i>
              </div>
            </a>
          </div>

          <RippleButton
            onClick={() => scrollToSection('about')}
            className="floating animate-bounce w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          >
            <i className="fas fa-chevron-down text-2xl sm:text-3xl"></i>
          </RippleButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
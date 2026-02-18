import { Button } from "@/components/ui/button";
import { Shield, Coffee, Users, BookOpen } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Componente para animar números quando a seção entra na viewport
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-2xl md:text-3xl font-bold text-primary">
      {count}{suffix}
    </div>
  );
}

const HeroSection = () => {
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // h-16 = 64px
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark"></div>
      <div className="absolute inset-0 bg-gradient-cyber opacity-30"></div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      <div className="container relative z-10 text-center space-y-8">
        {/* Main Hero Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6 mt-8 md:mt-0">
            <img 
              src="/lovable-uploads/5d9ff38a-d664-47c2-bd17-2ea73ba5f9d4.png" 
              alt="Café com Cyber"
              className="h-24 w-24 animate-pulsate-blue"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-cyber-light via-primary to-accent bg-clip-text text-transparent">
              Café com Cyber
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Encontre artigos, notícias e insights da comunidade para expandir seu conhecimento em Cibersegurança.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#articles" 
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick('articles');
            }}
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-cyber">
              <BookOpen className="mr-2 h-5 w-5" />
              Explorar Artigos
            </Button>
          </a>
          <a 
            href="#community"
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick('community');
            }}
          >
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Users className="mr-2 h-5 w-5" />
              Conhecer a Comunidade
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
          <div className="text-center">
            <AnimatedCounter value={230} suffix="+" />
            <div className="text-sm text-muted-foreground">Analistas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">Diversos</div>
            <div className="text-sm text-muted-foreground">Artigos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Discussões</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">Contínuo</div>
            <div className="text-sm text-muted-foreground">Aprendizado</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-30">
        <Shield className="h-8 w-8 text-primary animate-cyber-float" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-30">
        <Coffee className="h-8 w-8 text-accent animate-cyber-float" style={{ animationDelay: "1s" }} />
      </div>

      <style>{`
        /* Animação para a sombra pulsante */
        @keyframes pulsate-blue {
          0%, 100% {
            filter: drop-shadow(0 0 5px hsl(220, 80%, 60%));
          }
          50% {
            filter: drop-shadow(0 0 15px hsl(220, 80%, 60%));
          }
        }
        .animate-pulsate-blue {
          animation: pulsate-blue 3s ease-in-out infinite;
        }

        /* Animação para os ícones flutuantes */
        @keyframes cyber-float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          25% {
            transform: translateY(-5px) translateX(2px) scale(1.05);
          }
          50% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          75% {
            transform: translateY(5px) translateX(-2px) scale(1.05);
          }
        }
        .animate-cyber-float {
          animation: cyber-float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

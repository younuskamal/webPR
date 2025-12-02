import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import { useAdmin } from '../../context/AdminContext'; // Import Admin Context
import { ArrowLeft, ArrowRight, MousePointer2, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const { settings } = useAdmin(); // Use settings
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const scrollToNext = () => {
    window.scrollTo({
      top: 600,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center text-white overflow-hidden text-center">
      
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 bg-fixed-parallax transform scale-105"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920')",
        }}
      ></div>

      {/* Deep Blue Overlay with Gradient */}
      <div className="absolute inset-0 bg-[#0B2B5B]/85 z-0 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2B5B] via-transparent to-black/30 z-0"></div>
      
      {/* Dynamic Animated Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow"></div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Badge */}
          <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs md:text-sm font-medium mb-8 backdrop-blur-md shadow-lg hover:bg-white/20 transition-colors cursor-default">
               <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
               أهلا بكم في إتمام لخدمات الأعمال
            </div>
          </div>

          {/* Main Headline - Dynamic */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 tracking-tight drop-shadow-2xl animate-fade-up" style={{ animationDelay: '200ms' }}>
            {settings.heroTitle}
          </h1>
          
          {/* Subtitle - Dynamic */}
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl leading-relaxed font-light px-4 opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            {settings.heroSubtitle}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-4 mb-16 opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <Link to="/services" className="bg-secondary hover:bg-secondary-light text-white px-10 py-4 rounded-full font-bold transition-all text-base md:text-lg w-full sm:w-auto min-w-[200px] shadow-lg hover:shadow-secondary/50 hover:-translate-y-1 flex items-center justify-center gap-2 group ring-4 ring-transparent hover:ring-secondary/20">
              استكشف خدماتنا
              <Arrow size={20} className="group-hover:-translate-x-1 transition-transform rtl:rotate-0 ltr:rotate-180" />
            </Link>
            <Link to="/about" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 rounded-full font-bold transition-all text-base md:text-lg w-full sm:w-auto min-w-[200px] backdrop-blur-md hover:-translate-y-1 flex items-center justify-center group">
              عن إتمام
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow">
        <button 
          onClick={scrollToNext}
          className="flex flex-col items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">اكتشف المزيد</span>
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-2 group-hover:border-white transition-colors">
             <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
          </div>
        </button>
      </div>
      
    </section>
  );
};

export default Hero;
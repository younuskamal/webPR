import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import CountUp from '../CountUp';

const Stats: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-primary-dark text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
         <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 md:p-16 text-center border border-white/10 shadow-2xl animate-on-scroll relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
            
            <h2 className="text-3xl font-bold mb-4">{t.stats.title}</h2>
            <p className="text-blue-200 mb-12 max-w-2xl mx-auto">{t.stats.subtitle}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
               {[
                 { val: 5000, suffix: '+', label: t.stats.clients },
                 { val: 1500, suffix: '+', label: t.stats.consultations },
                 { val: 98, suffix: '%', label: t.stats.reviews },
                 { val: 10, suffix: 'M+', label: t.stats.access }
               ].map((stat, idx) => (
                 <div key={idx} className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors transform hover:-translate-y-2 hover:shadow-lg border border-white/5">
                    <span className="block text-4xl md:text-5xl font-bold text-secondary mb-2" dir="ltr">
                      <CountUp end={stat.val} suffix={stat.suffix} />
                    </span>
                    <span className="text-sm text-gray-300 font-medium">{stat.label}</span>
                 </div>
               ))}
            </div>
            
            <div className="mt-12 pt-12 border-t border-white/10">
              <h3 className="text-2xl font-bold mb-8">{t.stats.ctaTitle}</h3>
              <Link to="/contact" className="group bg-secondary hover:bg-secondary-light text-white px-12 py-5 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-3 text-lg relative overflow-hidden">
                 <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></span>
                 <ThumbsUp size={24} className="relative z-10" />
                 <span className="relative z-10">{t.stats.ctaButton}</span>
              </Link>
            </div>
         </div>
      </div>
    </section>
  );
};

export default Stats;
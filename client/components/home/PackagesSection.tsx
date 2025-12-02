import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Building2 } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { PACKAGES } from '../../constants';
import PriceCard from '../PriceCard';

const PackagesSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative BG Icon */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform rotate-12">
         <Building2 size={500} className="text-white" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 animate-on-scroll">
          <div className="text-white mb-8 lg:mb-0 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">{t.packages.title}</h2>
            <p className="text-blue-200 text-lg">
              {t.packages.subtitle}
            </p>
          </div>
          <Link to="/packages" className="group bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-secondary/50 whitespace-nowrap flex items-center gap-2">
            <span>{t.packages.browse}</span>
            <ArrowIcon size={20} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, idx) => (
             <div key={idx} className={`animate-on-scroll ${pkg.isFeatured ? 'md:-translate-y-6' : ''}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                <PriceCard pkg={{...pkg, name: idx === 0 ? t.packages.basic : idx === 1 ? t.packages.pro : t.packages.enterprise, period: t.packages.period}} />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
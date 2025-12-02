import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Building2, Globe, Users, Scale } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

const Features: React.FC = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const features = [
    { title: t.features.f1_title, description: t.features.f1_desc, icon: Building2 },
    { title: t.features.f2_title, description: t.features.f2_desc, icon: Globe },
    { title: t.features.f3_title, description: t.features.f3_desc, icon: Users },
    { title: t.features.f4_title, description: t.features.f4_desc, icon: Scale },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t.features.title}</h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.features.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl hover:bg-gradient-to-br hover:from-white hover:to-blue-50 transition-all duration-500 border border-gray-100 hover:border-blue-200 text-center group animate-on-scroll hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] h-full flex flex-col transform hover:-translate-y-2" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="relative w-20 h-20 mx-auto mb-8">
                 <div className="absolute inset-0 bg-blue-100 rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-300"></div>
                 <div className="absolute inset-0 bg-white rounded-2xl shadow-sm flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform duration-300 z-10 border border-gray-50">
                    <feature.icon className="text-secondary group-hover:text-primary transition-colors duration-300" size={36} strokeWidth={1.5} />
                 </div>
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                {feature.description}
              </p>
              
              <Link to="/services" className="inline-flex items-center justify-center text-secondary text-sm font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:text-primary bg-secondary/10 hover:bg-secondary/20 px-6 py-3 rounded-xl mt-auto w-full">
                {t.features.more} <ArrowIcon size={16} className="mx-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
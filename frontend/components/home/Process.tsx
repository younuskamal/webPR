import React from 'react';
import { FileText, Users, Scale, CreditCard, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

const Process: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { id: 1, title: t.steps.s1, desc: t.steps.s1_desc, icon: FileText },
    { id: 2, title: t.steps.s2, desc: t.steps.s2_desc, icon: Users },
    { id: 3, title: t.steps.s3, desc: t.steps.s3_desc, icon: Scale },
    { id: 4, title: t.steps.s4, desc: t.steps.s4_desc, icon: CreditCard },
    { id: 5, title: t.steps.s5, desc: t.steps.s5_desc, icon: ThumbsUp },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gray-50 rounded-full blur-3xl -z-10 opacity-50"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-24 animate-on-scroll">
          <h2 className="text-3xl font-bold text-primary mb-4">{t.steps.title}</h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.steps.subtitle}</p>
        </div>

        <div className="relative">
           {/* Steps Container */}
           <div className="flex flex-col md:flex-row justify-between items-start relative z-10 gap-10 md:gap-0">
             {steps.map((step, idx) => (
               <div key={step.id} className="flex flex-row md:flex-col items-start md:items-center md:text-center w-full md:w-1/5 group animate-on-scroll relative" style={{ transitionDelay: `${idx * 200}ms` }}>
                  
                  {/* Connector Line (Desktop: Horizontal) */}
                  {idx !== steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-1 bg-gray-100 -z-10 rtl:right-1/2 rtl:left-auto">
                       <div className="h-full bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300 rtl:origin-right"></div>
                    </div>
                  )}

                  {/* Connector Line (Mobile: Vertical) */}
                  {idx !== steps.length - 1 && (
                    <div className="md:hidden absolute top-16 right-8 w-1 h-full bg-gray-100 -z-10 bottom-0 -mb-10"></div>
                  )}
                  
                  {/* Circle & Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center text-primary group-hover:border-secondary group-hover:text-white group-hover:bg-secondary transition-all duration-300 shadow-md z-20 relative transform group-hover:scale-110">
                      <step.icon size={28} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-md transform group-hover:rotate-12 transition-transform z-30">
                      {step.id}
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="mr-6 md:mr-0 md:mt-8 text-start md:text-center flex-grow">
                    <h3 className="font-bold text-xl text-primary mb-2 group-hover:text-secondary transition-colors">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
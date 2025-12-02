import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2, Globe, Tv, Briefcase, Factory, Users, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

const Ministries: React.FC = () => {
  const { t, language } = useLanguage();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const ministries = [
    { name: t.ministries.commerce, icon: Building2, count: 26, color: 'text-blue-600', bg: 'bg-blue-50/50', border: 'group-hover:border-blue-200' },
    { name: t.ministries.investment, icon: Globe, count: 12, color: 'text-green-600', bg: 'bg-green-50/50', border: 'group-hover:border-green-200' },
    { name: t.ministries.media, icon: Tv, count: 5, color: 'text-purple-600', bg: 'bg-purple-50/50', border: 'group-hover:border-purple-200' },
    { name: t.ministries.foreign, icon: Briefcase, count: 8, color: 'text-indigo-600', bg: 'bg-indigo-50/50', border: 'group-hover:border-indigo-200' },
    { name: t.ministries.industry, icon: Factory, count: 14, color: 'text-orange-600', bg: 'bg-orange-50/50', border: 'group-hover:border-orange-200' },
    { name: t.ministries.hr, icon: Users, count: 18, color: 'text-teal-600', bg: 'bg-teal-50/50', border: 'group-hover:border-teal-200' },
  ];

  return (
    <section className="relative z-30 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">

        {/* 1. Cards Grid - Floating overlapping effect */}
        <div className="relative mt-8 mb-20 z-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {ministries.map((item, idx) => (
              <Link
                to="/services"
                key={idx}
                className={`bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-500 group cursor-pointer flex flex-col items-center text-center transform hover:-translate-y-3 relative overflow-hidden animate-fade-up ${item.border}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon Container with Pulse */}
                <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${item.bg} ${item.color}`}>
                  <item.icon size={28} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="relative z-10 font-bold text-gray-800 text-sm mb-3 group-hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </h3>

                {/* Count Badge */}
                <div className="relative z-10 inline-flex items-center justify-center px-3 py-1 bg-gray-50 border border-gray-100 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-secondary transition-colors">
                    {item.count} خدمة
                  </span>
                </div>

                {/* Bottom Active Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-secondary group-hover:w-1/2 transition-all duration-300 rounded-t-full"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Section Header - Refined Typography */}
        <div className="text-center mb-16 animate-on-scroll relative z-20">

          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-5 py-2 rounded-full mb-6 cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
            <span className="text-primary font-bold text-xs tracking-wider uppercase">منظومة الربط الحكومي</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            ننجز معاملاتك في <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary relative">
              كافة القطاعات
            </span>
          </h2>

          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            شبكة علاقات واسعة وخبرة عميقة في الإجراءات الحكومية لضمان سرعة الإنجاز، مما يتيح لك التفرغ لتطوير أعمالك.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center relative z-20 pb-8">
          <Link to="/services" className="inline-flex items-center gap-3 bg-white text-primary px-10 py-4 rounded-full border border-gray-200 hover:border-secondary hover:text-secondary hover:shadow-xl transition-all font-bold group text-lg">
            <span>عرض دليل الخدمات الشامل</span>
            <Arrow size={20} className="group-hover:-translate-x-1 transition-transform rtl:rotate-0 ltr:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Ministries;
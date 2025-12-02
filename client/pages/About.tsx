import React, { useEffect } from 'react';
import { Target, Lightbulb, ChevronLeft, ChevronRight, Building2, TrendingUp, ShieldCheck, History, Award, Users, Flag, MapPin, Laptop2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from '../components/CountUp';
import { useLanguage } from '../LanguageContext';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const ChevronIcon = language === 'ar' ? ChevronLeft : ChevronRight;

  // Trigger animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Milestones Data (Translated based on language)
  const milestones = language === 'ar' ? [
    { year: '2008', title: 'انطلاقة إتمام', icon: Flag, desc: 'تأسست الشركة في الرياض برؤية طموحة لسد الفجوة في خدمات قطاع الأعمال.' },
    { year: '2015', title: 'التوسع الجغرافي', icon: MapPin, desc: 'افتتاح فروع جديدة في جدة والدمام لتغطية كافة المناطق الرئيسية بالمملكة.' },
    { year: '2020', title: 'التحول الرقمي', icon: Laptop2, desc: 'إطلاق المنصة الإلكترونية الشاملة لخدمة العملاء عن بعد بنسبة 100%.' },
    { year: '2024', title: 'الريادة والتميز', icon: Award, desc: 'خدمة أكثر من 5000 شركة، والحصول على شهادة الآيزو في جودة الخدمات.' },
  ] : [
    { year: '2008', title: 'Etmaam Launch', icon: Flag, desc: 'Founded in Riyadh with an ambitious vision to bridge the gap in business services.' },
    { year: '2015', title: 'Geographic Expansion', icon: MapPin, desc: 'Opened new branches in Jeddah and Dammam to cover key regions.' },
    { year: '2020', title: 'Digital Transformation', icon: Laptop2, desc: 'Launched a comprehensive digital platform to serve clients 100% remotely.' },
    { year: '2024', title: 'Leadership & Excellence', icon: Award, desc: 'Serving over 5000 companies and obtaining ISO certification for quality.' },
  ];

  return (
    <div className="animate-fade-in bg-white pb-0 overflow-hidden">
      
      {/* 1. Header Banner */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-fixed-parallax transform scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920')" }} 
        ></div>
        <div className="absolute inset-0 bg-[#0B2B5B]/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-10"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20 text-white pt-20 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200 mb-6 font-medium animate-fade-up">
            <Link to="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
            <ChevronIcon size={14} />
            <span className="text-white">{t.about.title}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t.about.heroTitle}
          </h1>
          <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {t.about.heroSubtitle}
          </p>
        </div>

        {/* Floating Abstract Shape */}
        <div className="absolute -bottom-10 left-0 w-full h-20 bg-white rounded-t-[50%] scale-150 z-20"></div>
      </div>

      {/* 2. Story Section (Split Layout) */}
      <div className="container mx-auto px-4 md:px-8 py-20 relative z-30">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Side */}
          <div className="w-full lg:w-1/2 animate-on-scroll">
             <div className="flex items-center gap-2 mb-4">
                <span className="w-12 h-1 bg-secondary rounded-full"></span>
                <span className="text-secondary font-bold uppercase tracking-wider text-sm">{t.about.storyTitle}</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-snug">
               {t.about.storyHeadline}
             </h2>
             <p className="text-gray-600 leading-loose text-lg mb-6 text-justify">
               {t.about.storyText1}
             </p>
             <p className="text-gray-600 leading-loose text-lg mb-8 text-justify">
               {t.about.storyText2}
             </p>
             
             {/* Simple Stats Grid inside Story */}
             <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                <div>
                   <h4 className="text-3xl font-bold text-primary mb-1 flex items-center gap-1">
                     <span dir="ltr">+<CountUp end={16} /></span>
                   </h4>
                   <p className="text-sm text-gray-500">{t.about.yearsExp}</p>
                </div>
                <div>
                   <h4 className="text-3xl font-bold text-primary mb-1 flex items-center gap-1">
                      <span dir="ltr">+<CountUp end={5000} /></span>
                   </h4>
                   <p className="text-sm text-gray-500">{t.about.clientsServed}</p>
                </div>
             </div>
          </div>

          {/* Image Composition Side */}
          <div className="w-full lg:w-1/2 relative animate-on-scroll">
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000" alt="Meeting" className="w-full h-auto object-cover" />
             </div>
             {/* Secondary Image */}
             <div className="absolute -bottom-10 -left-10 w-2/3 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 hidden md:block animate-float">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600" alt="Teamwork" className="w-full h-auto object-cover" />
             </div>
             {/* Decorative Elements */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
             <div className="absolute bottom-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* 3. Timeline Section */}
      <div className="bg-gray-50 py-24 relative overflow-hidden">
         <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-20 animate-on-scroll">
               <span className="text-secondary font-bold tracking-widest text-sm uppercase">{t.about.timelineTitle}</span>
               <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">{t.about.timelineSubtitle}</h2>
               <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
               {/* Center Line (Desktop) */}
               <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-secondary/30 to-transparent hidden md:block rounded-full"></div>
               {/* Center Line Progress (Visual) */}
               <div className="absolute left-1/2 transform -translate-x-1/2 h-3/4 w-1 bg-gradient-to-b from-secondary to-primary/50 hidden md:block rounded-full top-0"></div>

               {/* Side Line (Mobile - Responsive) */}
               <div className={`absolute ${language === 'ar' ? 'right-8' : 'left-8'} h-full w-1 bg-gray-200 md:hidden rounded-full`}></div>
               
               <div className="space-y-12 md:space-y-20">
                  {milestones.map((item, idx) => {
                     const Icon = item.icon;
                     return (
                     <div key={idx} className={`flex flex-col md:flex-row items-center justify-between w-full relative animate-on-scroll group ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                        
                        {/* Content Box */}
                        <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? (language === 'ar' ? 'md:pl-10' : 'md:pr-10') : (language === 'ar' ? 'md:pr-10' : 'md:pl-10')} ${language === 'ar' ? 'pr-20 md:pr-0' : 'pl-20 md:pl-0'}`}>
                           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-secondary/30 transition-all duration-300 relative z-10 hover:-translate-y-2 group-hover:ring-1 ring-secondary/10">
                              
                              {/* Year Badge */}
                              <div className="inline-block bg-primary/5 text-primary font-bold px-4 py-1 rounded-full text-sm mb-4 border border-primary/10">
                                 {item.year}
                              </div>

                              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-secondary transition-colors">{item.title}</h3>
                              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                           </div>
                        </div>

                        {/* Center Node (Desktop) */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full border-4 border-gray-50 shadow-lg z-20 hidden md:flex items-center justify-center group-hover:scale-110 group-hover:border-secondary transition-all duration-300">
                           <Icon size={20} className="text-gray-400 group-hover:text-secondary transition-colors" />
                        </div>
                        
                        {/* Center Node (Mobile) */}
                        <div className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-0 w-12 h-12 bg-white rounded-full border-4 border-gray-50 shadow-md z-20 md:hidden flex items-center justify-center`}>
                           <Icon size={18} className="text-secondary" />
                        </div>
                        
                        {/* Empty Spacer */}
                        <div className="w-full md:w-5/12 hidden md:block"></div>
                     </div>
                  )})}
               </div>
               
               {/* Bottom End Dot */}
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-200 rounded-full hidden md:block"></div>
            </div>
         </div>
      </div>

      {/* 4. Vision & Mission (Glass Cards) */}
      <div className="bg-white py-24 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         
         <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
               <h2 className="text-3xl font-bold text-primary mb-4">ما الذي يحركنا؟</h2>
               <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
               
               {/* Vision Card */}
               <div className="bg-blue-50/50 p-10 rounded-3xl border border-blue-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll">
                  <div className={`absolute top-0 ${language === 'ar' ? 'right-0 -mr-8' : 'left-0 -ml-8'} w-40 h-40 bg-white rounded-bl-[100px] -mt-8 transition-transform group-hover:scale-110 shadow-sm`}></div>
                  <div className="relative z-10">
                     <div className="w-16 h-16 bg-white text-primary rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                        <Lightbulb size={32} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-2xl font-bold text-primary mb-4">{t.about.vision}</h3>
                     <p className="text-gray-600 leading-relaxed text-lg">
                        {t.about.visionText}
                     </p>
                  </div>
               </div>

               {/* Mission Card */}
               <div className="bg-teal-50/50 p-10 rounded-3xl border border-teal-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                  <div className={`absolute top-0 ${language === 'ar' ? 'right-0 -mr-8' : 'left-0 -ml-8'} w-40 h-40 bg-white rounded-bl-[100px] -mt-8 transition-transform group-hover:scale-110 shadow-sm`}></div>
                  <div className="relative z-10">
                     <div className="w-16 h-16 bg-white text-secondary rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                        <Target size={32} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-2xl font-bold text-primary mb-4">{t.about.mission}</h3>
                     <p className="text-gray-600 leading-relaxed text-lg">
                        {t.about.missionText}
                     </p>
                  </div>
               </div>

            </div>
         </div>
      </div>

      {/* 5. Core Values Grid */}
      <div className="bg-[#0B2B5B] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.about.valuesTitle}</h2>
              <p className="text-blue-200 max-w-2xl mx-auto text-lg">
                 {t.about.valuesSubtitle}
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                 { icon: ShieldCheck, title: t.about.val1, desc: t.about.val1Desc },
                 { icon: TrendingUp, title: t.about.val2, desc: t.about.val2Desc },
                 { icon: Users, title: t.about.val3, desc: t.about.val3Desc }
              ].map((val, idx) => (
                 <div key={idx} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group text-center hover:-translate-y-2 animate-on-scroll" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                       <val.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{val.title}</h3>
                    <p className="text-blue-100 font-light leading-relaxed">{val.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </div>

    </div>
  );
};

export default About;
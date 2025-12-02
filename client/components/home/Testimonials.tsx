import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: language === 'ar' ? 'محمد العتيبي' : 'Mohammed Al-Otaibi',
      role: language === 'ar' ? 'رئيس تنفيذي - شركة الأفق' : 'CEO - Horizon Co.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
      text: language === 'ar' 
        ? 'تجربة استثنائية مع إتمام. ساعدونا في تأسيس شركتنا في وقت قياسي وباحترافية عالية. فريق الدعم كان متواجداً في كل خطوة.'
        : 'An exceptional experience with Etmaam. They helped us establish our company in record time with high professionalism. The support team was there at every step.',
      rating: 5
    },
    {
      id: 2,
      name: language === 'ar' ? 'سارة القحطاني' : 'Sara Al-Qahtani',
      role: language === 'ar' ? 'مستثمرة عقارية' : 'Real Estate Investor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop',
      text: language === 'ar'
        ? 'خدمة المستثمر الأجنبي لديهم ممتازة. قاموا بإنهاء كافة إجراءات التراخيص والإقامات دون الحاجة لحضوري الشخصي.'
        : 'Their foreign investor service is excellent. They completed all licensing and residency procedures without the need for my personal presence.',
      rating: 5
    },
    {
      id: 3,
      name: language === 'ar' ? 'عبدالله الزهراني' : 'Abdullah Al-Zahrani',
      role: language === 'ar' ? 'مدير الموارد البشرية - تقنية المستقبل' : 'HR Manager - Future Tech',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop',
      text: language === 'ar'
        ? 'نظام حماية الأجور كان يمثل تحدياً لنا، ولكن مع إتمام أصبحت العملية سلسة وتلقائية. أنصح بشدة بالتعامل معهم.'
        : 'The wage protection system was a challenge for us, but with Etmaam, the process became smooth and automatic. I highly recommend dealing with them.',
      rating: 4
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
           
           {/* Navigation Buttons */}
           <button onClick={prevTestimonial} className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:scale-110 transition-all rtl:hidden">
              <ChevronLeft size={20} />
           </button>
           <button onClick={nextTestimonial} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:scale-110 transition-all rtl:hidden">
              <ChevronRight size={20} />
           </button>
           
           {/* RTL Buttons */}
            <button onClick={nextTestimonial} className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:scale-110 transition-all ltr:hidden">
              <ChevronLeft size={20} />
           </button>
           <button onClick={prevTestimonial} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:scale-110 transition-all ltr:hidden">
              <ChevronRight size={20} />
           </button>

           <div className="relative overflow-hidden min-h-[350px] flex items-center">
              {testimonials.map((item, idx) => {
                 let position = 'opacity-0 translate-x-full pointer-events-none absolute inset-0';
                 if (idx === activeIndex) position = 'opacity-100 translate-x-0 relative z-10';
                 if (idx === (activeIndex - 1 + testimonials.length) % testimonials.length) position = 'opacity-0 -translate-x-full absolute inset-0';

                 return (
                    <div 
                      key={item.id} 
                      className={`transition-all duration-700 ease-in-out w-full flex flex-col items-center text-center ${position}`}
                    >
                       <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden mb-6 relative z-10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       </div>
                       
                       <div className="bg-gray-50 rounded-3xl p-8 md:p-12 relative w-full">
                          <Quote size={40} className="text-secondary/20 absolute top-6 right-8 rtl:right-8 ltr:left-8 ltr:right-auto" />
                          
                          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 italic relative z-10">
                             "{item.text}"
                          </p>
                          
                          <div className="flex justify-center gap-1 mb-4">
                             {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className={`${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                             ))}
                          </div>
                          
                          <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.role}</p>
                       </div>
                    </div>
                 );
              })}
           </div>
           
           {/* Dots */}
           <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setActiveIndex(idx)}
                   className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-secondary w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                 ></button>
              ))}
           </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
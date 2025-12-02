import React from 'react';
import { useLanguage } from '../../LanguageContext';
import { ShieldCheck, CheckCircle2, Building2, CreditCard } from 'lucide-react';

const Partners: React.FC = () => {
  const { t } = useLanguage();

  // فئة الجهات الحكومية والمنصات
  const govtPartners = [
    { name: 'Vision 2030', logo: 'https://upload.wikimedia.org/wikipedia/ar/d/d3/Saudi_Vision_2030_logo.svg' },
    { name: 'Ministry of Commerce', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Ministry_of_Commerce_%28Saudi_Arabia%29_Logo.svg' },
    { name: 'MISA', logo: 'https://upload.wikimedia.org/wikipedia/en/3/36/Ministry_of_Investment_%28Saudi_Arabia%29_Logo.svg' },
    { name: 'ZATCA', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Zakat%2C_Tax_and_Customs_Authority_Logo.svg' },
    { name: 'MHRSD', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Ministry_of_Human_Resources_and_Social_Development_%28Saudi_Arabia%29_Logo.svg' },
    { name: 'Qiwa', logo: 'https://seeklogo.com/images/Q/qiwa-logo-C7273C7FAD-seeklogo.com.png' },
    { name: 'Mudad', logo: 'https://mudad.com.sa/sites/default/files/logo_0.png' },
  ];

  // فئة حلول الدفع والشركاء الماليين
  const financialPartners = [
    { name: 'Mada', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mada_Logo.svg' }, 
    { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
    { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard_logo.svg' },
    { name: 'Apple Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg' },
    { name: 'Monshaat', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Monshaat_Logo.svg' },
    { name: 'STC Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Stc_pay_logo.svg/1200px-Stc_pay_logo.svg.png' },
    { name: 'UrPay', logo: 'https://urpay.com.sa/wp-content/uploads/2021/04/urpay-logo-1.png' },
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/200x100/f8f9fa/0B2B5B?text=${encodeURIComponent(name)}`;
    e.currentTarget.classList.remove('grayscale', 'opacity-60');
  };

  // Helper component for the ticker Item
  const PartnerCard = ({ partner }: { partner: any }) => (
    <div className="w-48 h-28 mx-4 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center p-6 flex-shrink-0 group hover:border-secondary/30 hover:shadow-[0_8px_30px_-10px_rgba(0,136,145,0.15)] transition-all duration-300">
        <img 
            src={partner.logo} 
            alt={partner.name} 
            className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
            onError={(e) => handleImageError(e, partner.name)}
            loading="lazy"
        />
    </div>
  );

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200 relative overflow-hidden" dir="ltr">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full mb-4 shadow-sm">
             <ShieldCheck size={16} className="text-secondary" />
             <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">منظومة موثوقة وآمنة</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary mb-4">شركاء النجاح</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            نعمل كحلقة وصل معتمدة بين منشأتك وبين كافة الجهات الحكومية والمالية.
          </p>
        </div>

        {/* --- Ticker 1: Government (Scrolls Left) --- */}
        <div className="mb-16 animate-on-scroll">
           <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-2 bg-blue-100 rounded-lg text-primary"><Building2 size={20} /></div>
              <h3 className="text-xl font-bold text-gray-800">الربط الحكومي والتشريعي</h3>
           </div>
           
           <div className="relative w-full overflow-hidden mask-gradient-sides">
               {/* Left Fade */}
               <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
               {/* Right Fade */}
               <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

               <div className="flex w-max hover:[animation-play-state:paused]">
                   {/* Primary Loop */}
                   <div className="flex animate-scroll">
                       {[...govtPartners, ...govtPartners].map((partner, idx) => (
                           <PartnerCard key={`g1-${idx}`} partner={partner} />
                       ))}
                   </div>
                   {/* Seamless Clone Loop */}
                   <div className="flex animate-scroll" aria-hidden="true">
                       {[...govtPartners, ...govtPartners].map((partner, idx) => (
                           <PartnerCard key={`g2-${idx}`} partner={partner} />
                       ))}
                   </div>
               </div>
           </div>
        </div>

        {/* --- Ticker 2: Financial (Scrolls Right/Reverse) --- */}
        <div className="mb-12 animate-on-scroll" style={{ transitionDelay: '100ms' }}>
           <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-2 bg-green-100 rounded-lg text-green-700"><CreditCard size={20} /></div>
              <h3 className="text-xl font-bold text-gray-800">شركاء الدفع والتمويل</h3>
           </div>
           
           <div className="relative w-full overflow-hidden mask-gradient-sides">
               {/* Left Fade */}
               <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
               {/* Right Fade */}
               <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

               <div className="flex w-max hover:[animation-play-state:paused]">
                   {/* We use 'flex-row-reverse' or negative animation to change direction, 
                       but standard 'animate-scroll' moves left. 
                       To move right, we can just reverse the order visually or use a custom reverse animation.
                       Here we use inline style for reverse direction. */}
                   <div className="flex animate-scroll" style={{ animationDirection: 'reverse' }}>
                       {[...financialPartners, ...financialPartners].map((partner, idx) => (
                           <PartnerCard key={`f1-${idx}`} partner={partner} />
                       ))}
                   </div>
                   <div className="flex animate-scroll" aria-hidden="true" style={{ animationDirection: 'reverse' }}>
                       {[...financialPartners, ...financialPartners].map((partner, idx) => (
                           <PartnerCard key={`f2-${idx}`} partner={partner} />
                       ))}
                   </div>
               </div>
           </div>
        </div>

        {/* Trust Badges Footer */}
        <div className="mt-16 pt-10 border-t border-gray-200 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 animate-on-scroll">
           <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
              <CheckCircle2 size={18} className="text-secondary" />
              <span>معتمدون لدى وزارة التجارة</span>
           </div>
           <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
              <CheckCircle2 size={18} className="text-secondary" />
              <span>دفع إلكتروني آمن 100%</span>
           </div>
           <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
              <CheckCircle2 size={18} className="text-secondary" />
              <span>مرخصون للاستثمار الأجنبي</span>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Partners;
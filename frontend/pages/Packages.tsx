import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Check, X, HelpCircle, Star, Zap, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Packages: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const { t, language } = useLanguage();
  const ChevronIcon = language === 'ar' ? ChevronLeft : ChevronRight;
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  // Local data with translations
  const packagesData = [
    {
      id: 'basic',
      name: t.packages.monthly,
      basePrice: 7500, // Yearly price
      icon: Shield,
      description: language === 'ar' ? 'مثالية للشركات الناشئة والمشاريع الصغيرة' : 'Ideal for startups and small projects',
      features: language === 'ar' ? [
        'تأسيس الشركة وإصدار السجل',
        'اشتراك الغرفة التجارية (سنة)',
        'فتح ملف وزارة العمل',
        'تسجيل في التأمينات',
        'دعم فني عبر البريد'
      ] : [
        'Company Formation & CR',
        'Chamber of Commerce (1 Year)',
        'Labor Office File Opening',
        'GOSI Registration',
        'Email Support'
      ],
      isPopular: false,
      color: 'blue'
    },
    {
      id: 'pro',
      name: t.packages.yearly,
      basePrice: 13500,
      icon: Zap,
      description: language === 'ar' ? 'للشركات التي تبحث عن نمو متسارع ودعم مستمر' : 'For companies seeking rapid growth and ongoing support',
      features: language === 'ar' ? [
        'جميع مميزات الباقة الفضية',
        'إدارة حساب قوى ومدد',
        'تسجيل العلامة التجارية',
        'استشارات قانونية (5 ساعات)',
        'مدير حساب مخصص',
        'دعم فني عبر الواتساب'
      ] : [
        'All Silver Features',
        'Qiwa & Mudad Management',
        'Trademark Registration',
        'Legal Consultation (5 Hrs)',
        'Dedicated Account Manager',
        'WhatsApp Support'
      ],
      isPopular: true,
      color: 'gold'
    },
    {
      id: 'enterprise',
      name: t.packages.yearly,
      basePrice: 20000,
      icon: Star,
      description: language === 'ar' ? 'حلول متكاملة للشركات الكبرى والمستثمرين' : 'Integrated solutions for enterprises and investors',
      features: language === 'ar' ? [
        'جميع مميزات الباقة الذهبية',
        'خدمات المستثمر الأجنبي',
        'دراسة جدوى مبدئية',
        'تعقيب جميع الدوائر الحكومية',
        'زيارات ميدانية شهرية',
        'أولوية قصوى في التنفيذ'
      ] : [
        'All Gold Features',
        'Foreign Investor Services',
        'Initial Feasibility Study',
        'Government Relations Officer',
        'Monthly Site Visits',
        'Priority Execution'
      ],
      isPopular: false,
      color: 'navy'
    }
  ];

  // Override names based on translations
  const displayPackages = packagesData.map((pkg, idx) => ({
    ...pkg,
    name: idx === 0 ? t.packages.monthly : idx === 1 ? t.packages.yearly : t.packages.yearly // Logic mismatch in original code, fixing display names to be Package Names not cycles
  })).map((pkg, idx) => ({
    ...pkg,
    name: idx === 0 ? (language === 'ar' ? 'الباقة الفضية' : 'Silver') : idx === 1 ? (language === 'ar' ? 'الباقة الذهبية' : 'Gold') : (language === 'ar' ? 'باقة الأعمال' : 'Enterprise')
  }));


  // Helper to calculate price
  const getPrice = (basePrice: number) => {
    if (billingCycle === 'yearly') return basePrice.toLocaleString();
    // Monthly calculation: base / 12 * 1.2 (20% markup for monthly)
    return Math.round((basePrice * 1.2) / 12).toLocaleString();
  };

  return (
    <div className="animate-fade-in pb-12 bg-gray-50 min-h-screen font-sans">

      {/* 1. Enhanced Hero Section */}
      <div className="relative h-[450px] flex items-center justify-center overflow-hidden mb-12">
        <div
          className="absolute inset-0 z-0 bg-fixed-parallax"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-9726b30c8d1b?q=80&w=1920')" }}
        ></div>
        <div className="absolute inset-0 bg-[#0B2B5B]/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-10"></div>

        {/* Animated Shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow z-10"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px] animate-float z-10"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-20 text-white pt-20 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200 mb-6 font-medium animate-fade-up">
            <Link to="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
            <ChevronIcon size={14} />
            <span className="text-white">{t.nav.packages}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-xl animate-fade-up delay-100">
            {t.packages.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light animate-fade-up delay-200 leading-relaxed">
            {t.packages.heroSubtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* 2. Toggle Switch - Improved for RTL Stability */}
        <div className="flex justify-center mb-16 animate-fade-up delay-300">
          <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100 flex items-center relative gap-2">
            {/* Slider Background */}
            <div
              className={`absolute top-2 bottom-2 bg-primary rounded-full transition-all duration-300 ease-out shadow-sm`}
              style={{
                left: billingCycle === 'monthly' ? (language === 'ar' ? '8px' : 'calc(50% + 4px)') : (language === 'ar' ? 'calc(50% + 4px)' : '8px'),
                width: 'calc(50% - 10px)',
                // right: 'auto' // Important for RTL mix-ups
              }}
            ></div>

            {/* Buttons (Using explicit width to ensure alignment) */}
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`relative z-10 w-40 py-3 rounded-full text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {t.packages.yearly}
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${billingCycle === 'yearly' ? 'bg-white/20 text-white border-white/20' : 'bg-green-100 text-green-600 border-green-200'} animate-pulse`}>
                {t.packages.save}
              </span>
            </button>

            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative z-10 w-32 py-3 rounded-full text-sm font-bold transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {t.packages.monthly}
            </button>
          </div>
        </div>

        {/* 3. Pricing Cards - Improved Layout and Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start mb-24">
          {displayPackages.map((pkg, idx) => {
            const isGold = pkg.color === 'gold';
            const isNavy = pkg.color === 'navy';
            const isPopular = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 group ${isPopular
                  ? 'bg-white shadow-2xl ring-4 ring-secondary/10 z-10 transform md:-translate-y-6'
                  : 'bg-white shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2'
                  }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-secondary to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider flex items-center gap-2 whitespace-nowrap">
                      <Star size={14} className="fill-white" /> {t.packages.mostPopular}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8 pt-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform duration-500 group-hover:scale-110 ${isGold ? 'bg-orange-50 text-orange-500' : isNavy ? 'bg-blue-50 text-primary' : 'bg-gray-50 text-gray-500'
                    }`}>
                    <pkg.icon size={32} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm h-10 mb-6 leading-relaxed px-4">{pkg.description}</p>

                  <div className="flex items-center justify-center text-primary font-bold py-4 border-t border-b border-gray-50">
                    <span className="text-sm text-gray-400 mt-4 mr-1">{t.packages.currency}</span>
                    <span className="text-5xl tracking-tight">{getPrice(pkg.basePrice)}</span>
                  </div>
                  <div className="text-gray-400 text-xs mt-3 font-medium bg-gray-50 inline-block px-3 py-1 rounded-full">
                    {billingCycle === 'yearly' ? t.packages.yearlyBilling : t.packages.monthlyBilling}
                  </div>
                </div>

                <div className="flex-grow space-y-4 mb-10">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 min-w-[20px] h-[20px] rounded-full flex items-center justify-center ${isPopular ? 'bg-secondary/10 text-secondary' : 'bg-green-50 text-green-600'
                        }`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-gray-600 text-sm leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 ${isPopular
                    ? 'bg-secondary text-white hover:bg-secondary-light'
                    : isNavy
                      ? 'bg-primary text-white hover:bg-primary-light'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                >
                  {t.packages.subscribe} <ArrowIcon size={18} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* 4. Comparison Table Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-24 animate-on-scroll">
          <div className="p-8 md:p-10 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{t.packages.compareTitle}</h2>
              <p className="text-gray-500 mt-2">{t.packages.compareSubtitle}</p>
            </div>
            <Link to="/contact" className="hidden md:flex text-secondary font-bold hover:underline items-center gap-1">
              {t.serviceDetails.contactSupport} <HelpCircle size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr>
                  <th className={`p-6 ${language === 'ar' ? 'text-right' : 'text-left'} text-gray-500 font-medium w-1/3 border-b border-gray-100`}>Feature</th>
                  <th className="p-6 text-center text-primary font-bold w-1/5 bg-gray-50/30 border-b border-gray-100">{displayPackages[0].name}</th>
                  <th className="p-6 text-center text-secondary font-bold w-1/5 bg-secondary/5 border-t-4 border-secondary border-b border-secondary/10 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-50"></div>
                    {displayPackages[1].name}
                  </th>
                  <th className="p-6 text-center text-primary-dark font-bold w-1/5 bg-gray-50/30 border-b border-gray-100">{displayPackages[2].name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: language === 'ar' ? 'تأسيس الشركة' : 'Company Formation', basic: true, pro: true, ent: true },
                  { name: language === 'ar' ? 'إصدار السجل التجاري' : 'Commercial Registration', basic: true, pro: true, ent: true },
                  { name: language === 'ar' ? 'إدارة الموارد البشرية (مدد/قوى)' : 'HR Management (Qiwa)', basic: false, pro: true, ent: true },
                  { name: language === 'ar' ? 'تسجيل العلامة التجارية' : 'Trademark Registration', basic: false, pro: true, ent: true },
                  { name: language === 'ar' ? 'استشارات قانونية' : 'Legal Consultation', basic: false, pro: language === 'ar' ? '5 ساعات' : '5 Hrs', ent: language === 'ar' ? 'غير محدود' : 'Unlimited' },
                  { name: language === 'ar' ? 'مدير حساب خاص' : 'Dedicated Acc. Manager', basic: false, pro: true, ent: true },
                  { name: language === 'ar' ? 'خدمات المستثمر الأجنبي' : 'Investor Services', basic: false, pro: false, ent: true },
                  { name: language === 'ar' ? 'دراسة الجدوى' : 'Feasibility Study', basic: false, pro: false, ent: true },
                  { name: language === 'ar' ? 'أولوية الدعم الفني' : 'Support Priority', basic: language === 'ar' ? 'بريد' : 'Email', pro: language === 'ar' ? 'واتساب' : 'WhatsApp', ent: language === 'ar' ? 'مباشر 24/7' : '24/7 Direct' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-5 text-gray-700 font-medium flex items-center gap-2 group-hover:text-primary transition-colors">
                      <Check size={14} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                      {row.name}
                    </td>
                    <td className="p-5 text-center border-l border-gray-50 bg-gray-50/30">
                      {renderCheck(row.basic)}
                    </td>
                    <td className="p-5 text-center border-l border-gray-50 bg-secondary/5 font-medium text-secondary shadow-[inset_0_0_10px_rgba(0,0,0,0.01)]">
                      {renderCheck(row.pro)}
                    </td>
                    <td className="p-5 text-center bg-gray-50/30 font-medium text-primary">
                      {renderCheck(row.ent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Custom Quote CTA */}
        <div className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden animate-on-scroll shadow-2xl mb-24">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">{t.packages.needCustom}</h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              {t.packages.needCustomDesc}
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:-translate-y-1 group">
              {t.packages.requestQuote}
              <ArrowIcon size={20} className={`group-hover:${language === 'ar' ? '-' : ''}translate-x-1 transition-transform`} />
            </Link>
          </div>
        </div>

        {/* 6. Why Choose Us Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 animate-on-scroll">
          {[
            { icon: Shield, title: language === 'ar' ? 'شفافية تامة' : 'Full Transparency', desc: language === 'ar' ? 'لا رسوم خفية، جميع التكاليف واضحة منذ البداية.' : 'No hidden fees, all costs are clear upfront.' },
            { icon: Zap, title: language === 'ar' ? 'سرعة الإنجاز' : 'Fast Execution', desc: language === 'ar' ? 'نلتزم بالجداول الزمنية المحددة لضمان سير أعمالك.' : 'We stick to timelines to ensure your business runs smoothly.' },
            { icon: HelpCircle, title: language === 'ar' ? 'دعم مستمر' : 'Ongoing Support', desc: language === 'ar' ? 'فريقنا معك في كل خطوة لتقديم المشورة والمساعدة.' : 'Our team is with you every step of the way.' },
            { icon: Star, title: language === 'ar' ? 'خبرة عريقة' : 'Proven Expertise', desc: language === 'ar' ? 'سنوات من الخبرة في خدمة قطاع الأعمال في المملكة.' : 'Years of experience serving the business sector in KSA.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <item.icon size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 7. FAQ Section */}
        <div className="max-w-4xl mx-auto animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{language === 'ar' ? 'الأسئلة الشائعة حول الباقات' : 'Frequently Asked Questions'}</h2>
            <p className="text-gray-500">{language === 'ar' ? 'إجابات على أكثر الاستفسارات شيوعاً بخصوص الأسعار والاشتراكات' : 'Answers to common questions about pricing and subscriptions'}</p>
          </div>

          <div className="space-y-4">
            {[
              { q: language === 'ar' ? 'هل يمكنني ترقية باقتي لاحقاً؟' : 'Can I upgrade my plan later?', a: language === 'ar' ? 'نعم، يمكنك ترقية باقتك في أي وقت وسيتم احتساب الفرق في السعر للفترة المتبقية.' : 'Yes, you can upgrade your plan at any time and pay the difference for the remaining period.' },
              { q: language === 'ar' ? 'هل الأسعار تشمل الرسوم الحكومية؟' : 'Do prices include government fees?', a: language === 'ar' ? 'أسعار الباقات تشمل أتعاب الخدمات الإدارية والاستشارية فقط. الرسوم الحكومية يتم دفعها بشكل منفصل حسب الفواتير الصادرة من الجهات الرسمية.' : 'Package prices cover administrative and consulting fees only. Government fees are paid separately based on official invoices.' },
              { q: language === 'ar' ? 'ما هي طرق الدفع المتاحة؟' : 'What payment methods are accepted?', a: language === 'ar' ? 'نقبل التحويل البنكي، بطاقات مدى، فيزا، وماستركارد. للشركات الكبرى يمكن ترتيب خيارات دفع مخصصة.' : 'We accept Bank Transfer, Mada, Visa, and MasterCard. Custom payment options are available for enterprises.' },
              { q: language === 'ar' ? 'هل يوجد عقد ملزم؟' : 'Is there a binding contract?', a: language === 'ar' ? 'الباقات السنوية تتطلب التزاماً لمدة سنة للحصول على السعر المخفض. الباقات الشهرية يمكن إلغاؤها في أي وقت مع إشعار مسبق بـ 30 يوم.' : 'Yearly packages require a one-year commitment for the discounted rate. Monthly packages can be cancelled anytime with 30 days notice.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <details className="group">
                  <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-gray-800 hover:text-primary transition-colors">
                    <span>{item.q}</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronIcon size={20} />
                    </span>
                  </summary>
                  <div className="text-gray-600 px-6 pb-6 leading-relaxed animate-fade-in">
                    {item.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper component for table cells
const renderCheck = (value: boolean | string) => {
  if (value === true) return <div className="flex justify-center"><div className="bg-green-100 text-green-600 rounded-full p-1.5"><Check size={16} strokeWidth={3} /></div></div>;
  if (value === false) return <div className="flex justify-center"><div className="bg-gray-100 text-gray-400 rounded-full p-1.5"><X size={16} strokeWidth={3} /></div></div>;
  return <span className="text-sm font-bold">{value}</span>;
};

export default Packages;
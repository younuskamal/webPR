import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, ChevronLeft, MessageCircle, FileText, Wallet, Users, Briefcase, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Rich Data for FAQ with Categories
const FAQ_DATA = [
  {
    id: 1,
    category: 'establishment',
    question: 'ما هي المستندات المطلوبة لتأسيس شركة؟',
    answer: 'تختلف المستندات حسب نوع النشاط والهيكل القانوني للشركة. بشكل عام، تتطلب العملية: صورة الهوية الوطنية للملاك، حجز الاسم التجاري، وعقد التأسيس. في بعض الأنشطة المتخصصة قد يتطلب الأمر موافقات مبدئية من جهات حكومية أخرى.'
  },
  {
    id: 2,
    category: 'establishment',
    question: 'كم يستغرق وقت إصدار السجل التجاري؟',
    answer: 'في ظل التحول الرقمي للمملكة، يتم إصدار السجل التجاري فورياً (خلال 180 ثانية) لمعظم الأنشطة التجارية عبر المنصات الإلكترونية، وقد يستغرق 24 ساعة في حالات محددة تتطلب تدقيقاً إضافياً.'
  },
  {
    id: 3,
    category: 'investors',
    question: 'هل تقدمون خدمات للمستثمر الأجنبي؟',
    answer: 'نعم، لدينا قسم مختص لخدمات الاستثمار الأجنبي. نساعدك في إصدار رخصة وزارة الاستثمار (MISA)، تأسيس الشركة، فتح الحسابات البنكية، وإصدار إقامات المستثمرين والمدراء التنفيذيين.'
  },
  {
    id: 4,
    category: 'hr',
    question: 'ما هو نظام حماية الأجور؟',
    answer: 'هو نظام إلزامي من وزارة الموارد البشرية يهدف لضمان صرف أجور الموظفين في الوقت المحدد وبالقيمة المتفق عليها. نقوم نحن بإعداد ورفع ملفات الأجور الشهرية عبر منصة "مدد" لضمان التزام منشأتك وتجنب إيقاف الخدمات.'
  },
  {
    id: 5,
    category: 'financial',
    question: 'هل التسجيل في ضريبة القيمة المضافة إلزامي؟',
    answer: 'يكون التسجيل إلزامياً إذا تجاوزت إيراداتك السنوية 375,000 ريال سعودي. ويكون اختيارياً إذا كانت الإيرادات بين 187,500 و 375,000 ريال. نحن نساعدك في التسجيل وتقديم الإقرارات الضريبية بشكل صحيح.'
  },
  {
    id: 6,
    category: 'general',
    question: 'هل يمكنني إدارة أعمالي عن بعد من خلالكم؟',
    answer: 'بالتأكيد. توفر منصة "إتمام" حلولاً رقمية تمكنك من متابعة كافة إجراءاتك الحكومية والإدارية عن بعد. كما نوفر خدمة "مدير حساب خاص" ليكون ممثلك أمام الجهات المعنية دون الحاجة لحضورك الشخصي.'
  },
  {
    id: 7,
    category: 'investors',
    question: 'ما هي شروط الحصول على الإقامة المميزة؟',
    answer: 'تختلف الشروط حسب فئة الإقامة (مستثمر، موهبة، عقار، إلخ). بشكل عام تتطلب وجود ملاءة مالية، سجل جنائي نظيف، وتقرير صحي. فريقنا يقدم استشارة مجانية لتحديد الفئة الأنسب لك وتجهيز الملف بالكامل.'
  },
];

const CATEGORIES = [
  { id: 'all', label: 'الكل', icon: HelpCircle },
  { id: 'establishment', label: 'تأسيس الشركات', icon: Briefcase },
  { id: 'investors', label: 'المستثمرين', icon: Users },
  { id: 'hr', label: 'الموارد البشرية', icon: FileText },
  { id: 'financial', label: 'المالية والضرائب', icon: Wallet },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter Logic (Category Only)
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      return activeCategory === 'all' || item.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="animate-fade-in pb-20 bg-gray-50 min-h-screen">
      
      {/* 1. Elegant Hero Section without Search */}
      <div className="relative h-[350px] flex flex-col items-center justify-center overflow-hidden mb-12">
        <div 
          className="absolute inset-0 z-0 bg-fixed-parallax"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1920')" }}
        ></div>
        <div className="absolute inset-0 bg-[#0B2B5B]/90 z-10"></div>
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-bl-full blur-3xl z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-tr-full blur-3xl z-10"></div>

        <div className="container mx-auto px-4 md:px-8 text-center relative z-20 text-white pt-20 animate-fade-up">
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <span className="text-white">الأسئلة الشائعة</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-xl">مركز المساعدة والمعلومات</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
             جمعنا لك إجابات دقيقة لأكثر الاستفسارات شيوعاً لتوفير وقتك وجهدك
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl -mt-10 relative z-30">
        
        {/* 2. Category Tabs */}
        <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 mb-10 overflow-x-auto">
           <div className="flex items-center justify-between md:justify-center gap-2 min-w-max">
              {CATEGORIES.map((cat) => {
                 const Icon = cat.icon;
                 const isActive = activeCategory === cat.id;
                 return (
                    <button
                       key={cat.id}
                       onClick={() => setActiveCategory(cat.id)}
                       className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                          isActive 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-gray-500 hover:bg-gray-50 hover:text-secondary'
                       }`}
                    >
                       <Icon size={16} />
                       {cat.label}
                    </button>
                 );
              })}
           </div>
        </div>

        {/* 3. Accordion List */}
        <div className="space-y-4 min-h-[400px]">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => {
               const isOpen = openIndex === item.id; 
               return (
                  <div 
                    key={item.id} 
                    className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 group ${
                      isOpen 
                      ? 'shadow-lg border-secondary ring-1 ring-secondary/20' 
                      : 'shadow-sm border-gray-100 hover:border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <button
                      className="w-full px-6 py-5 md:px-8 md:py-6 flex justify-between items-center text-right focus:outline-none bg-white relative z-10"
                      onClick={() => toggleFaq(item.id)}
                    >
                      <div className="flex items-center gap-5">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-secondary text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-primary'}`}>
                             {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                          </div>
                          <span className={`font-bold text-base md:text-lg transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-gray-700'}`}>
                            {item.question}
                          </span>
                      </div>
                      <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-secondary' : 'text-gray-300'}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    
                    {/* Smooth Collapse Animation */}
                    <div 
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                         isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                       <div className="overflow-hidden">
                          <div className="px-6 pb-6 md:px-8 md:pb-8 pr-[4.5rem] md:pr-[5.5rem] pt-0">
                             <div className="h-px w-full bg-gray-50 mb-4"></div>
                             <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                                {item.answer}
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>
               );
            })
          ) : (
             <div className="text-center py-20">
                <p className="text-gray-500">لا توجد أسئلة في هذا القسم حالياً.</p>
             </div>
          )}
        </div>

        {/* 4. Still have questions? */}
        <div className="mt-16 bg-gradient-to-r from-primary to-[#1a3d75] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl animate-on-scroll">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
              <div>
                 <h2 className="text-2xl md:text-3xl font-bold mb-3">لم تجد إجابة لسؤالك؟</h2>
                 <p className="text-blue-100 text-lg">فريقنا جاهز للإجابة على جميع استفساراتك وتقديم الاستشارة المناسبة.</p>
              </div>
              <Link to="/contact" className="bg-white text-primary px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all hover:-translate-y-1 flex items-center gap-2 group whitespace-nowrap">
                 <MessageCircle size={20} className="text-secondary" />
                 <span>تواصل معنا مباشرة</span>
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
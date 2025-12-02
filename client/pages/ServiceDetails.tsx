import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useServices } from '../context/ServiceContext'; // Use Context
import { 
  ArrowLeft, 
  ChevronLeft, 
  Clock, 
  Wallet, 
  Building2, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  Share2, 
  MessageCircle,
  Twitter,
  Linkedin,
  Copy,
  ArrowRight
} from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from '../LanguageContext';

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { services } = useServices(); // Get data from context
  const [service, setService] = useState<Service | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { language } = useLanguage();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const found = services.find(s => s.id === id);
    if (found) {
      setService(found);
    } else {
      navigate('/services');
    }
    window.scrollTo(0, 0);
  }, [id, navigate, services]);

  if (!service) return null;

  // WhatsApp Message Generator
  const whatsappUrl = `https://wa.me/966554799222?text=${encodeURIComponent(
    `السلام عليكم، أود طلب خدمة: ${service.title}`
  )}`;
  
  const whatsappSupportUrl = `https://wa.me/966554799222?text=${encodeURIComponent(
    `السلام عليكم، لدي استفسار بخصوص خدمة: ${service.title}`
  )}`;

  return (
    <div className="bg-[#F8F9FB] min-h-screen pb-20 animate-fade-in font-sans">
      
      {/* 1. Header with integrated top padding for fixed Navbar */}
      <div className="bg-[#0B2B5B] text-white pt-32 pb-16 relative overflow-hidden">
         {/* Background Patterns */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="absolute right-0 top-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

         <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex items-center gap-2 text-sm text-blue-200 mb-6 font-medium">
               <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
               <ChevronLeft size={14} className="rtl:rotate-0 ltr:rotate-180" />
               <Link to="/services" className="hover:text-white transition-colors">الخدمات</Link>
               <ChevronLeft size={14} className="rtl:rotate-0 ltr:rotate-180" />
               <span className="text-white opacity-80">{service.title}</span>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                   <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{service.title}</h1>
                   <p className="text-blue-200 text-lg opacity-90 max-w-2xl leading-relaxed">{service.description}</p>
                </div>
                
                {/* Share Button */}
                <div className="relative">
                  <button 
                     onClick={() => setIsShareOpen(!isShareOpen)}
                     className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all border border-white/10 flex items-center gap-2 font-bold backdrop-blur-sm"
                  >
                     <Share2 size={18} />
                     <span>مشاركة</span>
                  </button>
                   {isShareOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl text-gray-800 p-2 z-50 animate-fade-up border border-gray-100 flex gap-2 justify-center">
                           <button className="p-3 hover:bg-gray-100 rounded-lg text-blue-500 transition-colors"><Twitter size={20} /></button>
                           <button className="p-3 hover:bg-gray-100 rounded-lg text-blue-700 transition-colors"><Linkedin size={20} /></button>
                           <button className="p-3 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"><Copy size={20} /></button>
                        </div>
                     )}
                </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-8 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 2. Main Content (Right Side in RTL) */}
            <div className="lg:col-span-8 space-y-8 order-2 lg:order-1">
               
               {/* Description Section */}
               <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 animate-fade-up">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-3 bg-blue-50 rounded-xl text-primary">
                        <FileText size={28} />
                     </div>
                     <h2 className="text-2xl font-bold text-gray-800">وصف الخدمة</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-600 leading-loose">
                     <p>{service.details || service.description}</p>
                  </div>
               </div>

               {/* Requirements Section */}
               {service.requirements && service.requirements.length > 0 && (
                  <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 animate-fade-up" style={{ animationDelay: '100ms' }}>
                     <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                           <CheckCircle2 size={28} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">المستندات المطلوبة</h2>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.requirements.map((req, idx) => (
                           <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-secondary/30 transition-all group">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform">
                                 <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                              </div>
                              <span className="text-gray-700 font-medium">{req}</span>
                           </div>
                        ))}
                     </div>
                     <p className="text-sm text-gray-400 mt-4 px-2">* يتم تحديد المستندات الإضافية لاحقاً حسب حالة الطلب</p>
                  </div>
               )}

               {/* Conditions Section */}
               {service.conditions && service.conditions.length > 0 && (
                  <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 animate-fade-up" style={{ animationDelay: '200ms' }}>
                     <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-orange-50 rounded-xl text-orange-500">
                           <AlertCircle size={28} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">الشروط والأحكام</h2>
                     </div>
                     <ul className="space-y-4">
                        {service.conditions.map((cond, idx) => (
                           <li key={idx} className="flex items-start gap-4">
                              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"></div>
                              <span className="text-gray-600 text-lg">{cond}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               )}
            </div>

            {/* 3. Sidebar (Left Side in RTL) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 order-1 lg:order-2">
               
               {/* Main Info Card */}
               <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 animate-fade-up z-10 relative">
                  
                   {/* Header of Card */}
                  <div className="text-center mb-8 pb-6 border-b border-gray-100">
                     <div className="w-20 h-20 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center mb-4 text-primary shadow-inner">
                        <service.icon size={40} />
                     </div>
                     <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                     <div className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                        متاح الآن
                     </div>
                  </div>

                  {/* Stats List */}
                  <div className="space-y-5 mb-8">
                     <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3 text-gray-500">
                           <Wallet size={20} className="text-primary" />
                           <span className="text-sm font-medium">رسوم الخدمة</span>
                        </div>
                        <span className="text-lg font-bold text-primary">{service.price ? service.price.toLocaleString() : '---'} ريال</span>
                     </div>

                     <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3 text-gray-500">
                           <Clock size={20} className="text-green-600" />
                           <span className="text-sm font-medium">مدة الإنجاز</span>
                        </div>
                        <span className="text-base font-bold text-gray-800 dir-ltr">{service.duration || 'غير محدد'}</span>
                     </div>

                     <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3 text-gray-500">
                           <Building2 size={20} className="text-orange-500" />
                           <span className="text-sm font-medium">الرسوم الحكومية</span>
                        </div>
                        <span className="text-base font-bold text-gray-800">{service.govtFees ? service.govtFees.toLocaleString() : '0'} ريال</span>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                     <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#0B2B5B] hover:bg-[#164082] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 text-center flex items-center justify-center gap-2 group"
                     >
                        <span>طلب الخدمة</span>
                        <Arrow size={20} className="group-hover:-translate-x-1 transition-transform rtl:rotate-0 ltr:rotate-180" />
                     </a>
                     
                     <a 
                        href={whatsappSupportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#20b85c] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all hover:-translate-y-1 text-center flex items-center justify-center gap-2"
                     >
                        <MessageCircle size={22} />
                        <span>تواصل معنا (واتساب)</span>
                     </a>
                  </div>
               </div>

               {/* Help Widget */}
               <div className="bg-[#EBF5FF] rounded-3xl p-6 border border-blue-100 flex items-start gap-4">
                  <div className="bg-white p-2.5 rounded-full text-primary shadow-sm shrink-0">
                     <MessageCircle size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-800 mb-1">هل تحتاج مساعدة؟</h4>
                     <p className="text-sm text-gray-600 mb-3">فريقنا جاهز للرد على جميع استفساراتك قبل طلب الخدمة.</p>
                     <a href="tel:920022444" className="text-primary font-bold text-sm hover:underline">
                        اتصل بنا: 920022444
                     </a>
                  </div>
               </div>

            </div>

         </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

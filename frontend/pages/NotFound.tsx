import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const NotFound: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>

      <div className="container mx-auto px-4 text-center relative z-10 animate-fade-up">
        
        {/* 404 Icon/Graphic */}
        <div className="relative inline-block mb-8">
           <div className="text-[150px] md:text-[200px] font-extrabold text-gray-100 leading-none select-none">
              404
           </div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 animate-bounce-slow">
                 <FileQuestion size={64} className="text-secondary" />
              </div>
           </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">
          {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
          {isAr 
            ? 'عذراً، يبدو أن الصفحة التي تحاول الوصول إليها غير متاحة أو تم نقلها.' 
            : 'Sorry, the page you are looking for does not exist or has been moved.'}
        </p>

        {/* Action Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
        >
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          <Home size={20} />
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;
  const { language } = useLanguage();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
      {/* Decorative Gradient Blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
      
      <div className="relative z-10 w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary shadow-sm">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className="relative z-10 text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{service.title}</h3>
      
      <p className="relative z-10 text-gray-500 mb-8 leading-relaxed flex-grow text-[15px] line-clamp-3">
        {service.description}
      </p>
      
      <Link 
        to={`/services/${service.id}`} 
        className="relative z-10 inline-flex items-center text-gray-500 font-bold text-sm hover:text-secondary transition-colors mt-auto group/btn w-fit"
      >
        <span className="border-b-2 border-transparent group-hover/btn:border-secondary transition-all pb-0.5">تفاصيل الخدمة</span>
        <div className="bg-gray-50 p-2 rounded-full mr-3 group-hover/btn:bg-secondary/10 group-hover/btn:text-secondary transition-colors">
            <Arrow size={16} className="group-hover/btn:-translate-x-1 transition-transform rtl:rotate-0 ltr:rotate-180" />
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
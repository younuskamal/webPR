import React from 'react';
import { Check } from 'lucide-react';
import { Package } from '../types';
import { Link } from 'react-router-dom';

interface PriceCardProps {
  pkg: Package;
}

const PriceCard: React.FC<PriceCardProps> = ({ pkg }) => {
  return (
    <div 
      className={`relative bg-white rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${
        pkg.isFeatured 
          ? 'shadow-2xl scale-105 border-2 border-yellow-400 z-10' 
          : 'shadow-lg border border-gray-100 hover:shadow-xl'
      }`}
    >
      {pkg.isFeatured && (
        <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-primary-dark text-xs font-bold px-4 py-1 rounded-full shadow-sm">
          الأكثر طلباً
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{pkg.name}</h3>
        <div className="text-primary font-bold">
          <span className="text-4xl">{pkg.price}</span>
          <span className="text-sm text-gray-500 block mt-1">{pkg.period}</span>
        </div>
      </div>

      <div className="flex-grow mb-8">
        <ul className="space-y-4">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className={`mt-1 rounded-full p-0.5 ${pkg.isFeatured ? 'bg-yellow-100 text-yellow-600' : 'bg-green-50 text-green-600'}`}>
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="text-gray-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link 
        to="/contact"
        className={`w-full py-3 rounded-lg font-bold text-center transition-colors ${
          pkg.isFeatured 
            ? 'bg-primary text-white hover:bg-primary-light' 
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        اطلب الباقة
      </Link>
    </div>
  );
};

export default PriceCard;
import React, { useState, useMemo } from 'react';
import { useServices } from '../context/ServiceContext'; // Use Context
import ServiceCard from '../components/ServiceCard';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, X, Zap, Layers, Shield, Users, Briefcase } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const ChevronIcon = language === 'ar' ? ChevronLeft : ChevronRight;
  
  // Consume data from Context
  const { services } = useServices();

  const categories = [
    { id: 'all', label: t.servicesPage.cats.all, icon: Layers },
    { id: 'establishment', label: t.servicesPage.cats.establishment, icon: Briefcase },
    { id: 'hr', label: t.servicesPage.cats.hr, icon: Users },
    { id: 'legal', label: t.servicesPage.cats.legal, icon: Shield },
    { id: 'digital', label: t.servicesPage.cats.digital, icon: Zap },
  ];

  const getServiceCategory = (id: string) => {
    if (['1', '2'].includes(id)) return 'establishment';
    if (['3', '6'].includes(id)) return 'hr';
    if (['4'].includes(id)) return 'legal';
    if (['5'].includes(id)) return 'digital';
    return 'other';
  };

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.title.includes(searchTerm) || service.description.includes(searchTerm);
      const matchesCategory = activeCategory === 'all' || getServiceCategory(service.id) === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, services]);

  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    setIsAnimating(true);
    setActiveCategory(catId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setActiveCategory('all');
  };

  return (
    <div className="animate-fade-in pb-24 bg-gray-50 min-h-screen">
      
      {/* 1. Dynamic Hero Section */}
      <div className="relative h-[450px] flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-fixed-parallax"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920')" }}
        ></div>
        <div className="absolute inset-0 bg-[#0B2B5B]/90 z-10"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20 text-white pt-20 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200 mb-6 font-medium animate-fade-up">
            <Link to="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
            <ChevronIcon size={14} />
            <span className="text-white">{t.nav.services}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-xl animate-fade-up">
            {t.servicesPage.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light mb-12 animate-fade-up delay-100">
            {t.servicesPage.heroSubtitle}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative animate-fade-up delay-200 z-30 w-full">
             <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                 <div className="relative flex items-center bg-white rounded-xl shadow-2xl">
                     <div className="pl-4 pr-6 py-4 text-gray-400">
                        <Search size={24} />
                     </div>
                     <input 
                       type="text" 
                       placeholder={t.servicesPage.searchPlaceholder}
                       className="w-full py-4 text-gray-800 focus:outline-none text-lg placeholder:text-gray-400 bg-transparent"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                     />
                     {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="p-2 mr-2 text-gray-400 hover:text-red-500 transition-colors">
                            <X size={20} />
                        </button>
                     )}
                 </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Filter Tabs (Sticky) */}
      <div className="sticky top-[70px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
         <div className="container mx-auto px-4 md:px-8 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 py-4 min-w-max">
               {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const Icon = cat.icon;
                  return (
                     <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                           isActive 
                           ? 'bg-primary text-white border-primary shadow-lg scale-105' 
                           : 'bg-white text-gray-500 border-gray-200 hover:border-secondary hover:text-secondary hover:bg-gray-50'
                        }`}
                     >
                        <Icon size={16} className={isActive ? 'animate-bounce' : ''} />
                        {cat.label}
                     </button>
                  );
               })}
            </div>
         </div>
      </div>

      {/* 3. Results Section */}
      <div className="container mx-auto px-4 md:px-8 py-12 min-h-[500px]">
        
        {/* Count & Reset */}
        <div className="flex justify-between items-center mb-8">
           <div className="text-gray-500 font-medium">
              {t.servicesPage.found} <span className="text-secondary font-bold text-xl mx-1">{filteredServices.length}</span> {t.servicesPage.servicesAvailable}
           </div>
           {(searchTerm || activeCategory !== 'all') && (
              <button onClick={clearSearch} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 font-bold bg-red-50 px-3 py-1 rounded-full">
                 <X size={14} /> {t.servicesPage.reset}
              </button>
           )}
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service, idx) => (
              <div 
                 key={service.id} 
                 className="h-full animate-fade-up cursor-pointer group perspective-1000" 
                 style={{ animationDelay: `${idx * 50}ms` }}
                 onClick={() => navigate(`/services/${service.id}`)}
              >
                 <div className="relative h-full transition-transform duration-500 group-hover:-translate-y-2">
                    <ServiceCard service={service} />
                 </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center animate-fade-in">
               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <Search size={40} />
               </div>
               <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.servicesPage.noResults}</h3>
               <p className="text-gray-500 mb-8">{t.servicesPage.tryAgain}</p>
               <button onClick={clearSearch} className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary-light transition-all shadow-lg hover:-translate-y-1">
                  {t.servicesPage.showAll}
               </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Services;
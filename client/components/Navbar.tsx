import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Globe, Search, Instagram, Linkedin, Youtube, Twitter, Facebook, ArrowRight, ArrowLeft, TrendingUp, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useServices } from '../context/ServiceContext';
import { useAdmin } from '../context/AdminContext'; // Import Admin Context

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { settings } = useAdmin(); // Use dynamic settings
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null); // Ref for click outside
  
  // Dynamic Services
  const { services } = useServices();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu and search on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Handle Click Outside to Close Search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        // Only close if we are not clicking the toggle button
        const toggleBtn = document.getElementById('search-toggle-btn');
        if (toggleBtn && toggleBtn.contains(event.target as Node)) return;
        
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Scroll Locking only for Mobile Menu, NOT for Search anymore
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    }
    return () => { 
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
      if (!isSearchOpen) setSearchQuery(''); // Clear query on open
  };

  const closeSearch = () => {
      setIsSearchOpen(false);
  };

  const handleSearchClear = () => {
      if (searchQuery) {
          setSearchQuery('');
          searchInputRef.current?.focus();
      } else {
          closeSearch();
      }
  };

  const filteredServices = services.filter(s => 
    s.title.includes(searchQuery) || s.description.includes(searchQuery)
  );

  const popularSearches = ['تأسيس شركة', 'حماية الأجور', 'العلامة التجارية', 'استثمار أجنبي'];

  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.services, path: '/services' },
    { label: t.nav.packages, path: '/packages' },
    { label: t.nav.faq, path: '/faq' },
    { label: t.nav.contact, path: '/contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 w-full font-sans z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-[#0B2B5B]/95 backdrop-blur-md shadow-lg py-0' 
            : 'bg-transparent py-4'
        }`}
      >
        
        {/* 1. Top Bar - Hidden on Mobile, Fades out on Scroll */}
        <div className={`hidden lg:block transition-all duration-500 ease-in-out border-b border-white/10 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'}`}>
          <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center pb-3 text-white/80 text-xs font-medium tracking-wide">
            
            {/* Contact Info - Dynamic */}
            <div className="flex items-center gap-6">
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-white transition-colors group">
                <Mail size={14} className="group-hover:scale-110 transition-transform" />
                <span>{settings.email}</span>
              </a>
              <span className="w-px h-3 bg-white/20"></span>
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors group" dir="ltr">
                <Phone size={14} className="group-hover:scale-110 transition-transform" />
                <span>{settings.phone}</span>
              </a>
            </div>

            {/* Socials & Settings */}
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-4 border-s border-white/10 ps-6">
                  <a href="#" className="hover:text-secondary hover:-translate-y-0.5 transition-all"><Twitter size={14} /></a>
                  <a href="#" className="hover:text-secondary hover:-translate-y-0.5 transition-all"><Facebook size={14} /></a>
                  <a href="#" className="hover:text-secondary hover:-translate-y-0.5 transition-all"><Linkedin size={14} /></a>
                  <a href="#" className="hover:text-secondary hover:-translate-y-0.5 transition-all"><Youtube size={14} /></a>
               </div>
               
               <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 hover:text-white transition-colors font-bold tracking-wide uppercase text-[11px]"
              >
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                <Globe size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Main Navbar */}
        <nav className="w-full relative z-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-[70px]' : 'h-[80px]'}`}>
              
              {/* Logo Area */}
              <Link to="/" className="flex items-center gap-3 group relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700 shadow-xl border border-white/20">
                   <div className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-primary transform rotate-45"></div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">إتمام</span>
                  <span className="text-[10px] lg:text-xs text-blue-200 tracking-[0.3em] uppercase font-english pt-1">Etmaam</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `text-[15px] font-bold transition-all duration-300 relative py-2 ${
                        isActive 
                        ? 'text-white' 
                        : 'text-blue-100 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-secondary rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-4">
                 <button 
                    id="search-toggle-btn"
                    onClick={toggleSearch}
                    className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center border backdrop-blur-sm ${isSearchOpen ? 'bg-white text-primary border-white scale-110 shadow-lg' : 'bg-white/10 text-white border-white/10 hover:bg-white hover:text-primary hover:border-transparent'}`}
                    title={t.common.search}
                 >
                    {isSearchOpen ? <X size={20} /> : <Search size={18} />}
                 </button>

                 <Link 
                   to="/contact" 
                   className="bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-secondary/50 hover:-translate-y-1 text-sm border border-transparent hover:border-white/20"
                 >
                   {t.common.startNow}
                 </Link>
              </div>
              
              {/* Mobile Toggle Button */}
              <button 
                className="lg:hidden text-white p-2.5 focus:outline-none bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-md relative z-50"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* 
            ==============================================
            Dynamic Search Dropdown (Replacing Full Screen)
            ==============================================
          */}
          <div 
             ref={searchContainerRef}
             className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 transition-all duration-300 origin-top transform ${
                isSearchOpen 
                ? 'opacity-100 scale-y-100 translate-y-0 visible' 
                : 'opacity-0 scale-y-95 -translate-y-2 invisible'
             }`}
          >
             <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header with Close option for clarity */}
                    <div className="flex justify-between items-center mb-4 lg:hidden">
                        <span className="text-sm font-bold text-gray-400">بحث</span>
                        <button onClick={closeSearch} className="flex items-center gap-1 text-red-500 text-sm font-bold bg-red-50 px-3 py-1 rounded-full">
                            <X size={14} /> إغلاق
                        </button>
                    </div>

                    {/* Search Input */}
                    <div className="relative flex items-center mb-6">
                        <Search className="absolute text-gray-400 pointer-events-none" size={24} />
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            className="w-full pl-12 pr-12 py-3 text-xl md:text-2xl font-bold text-gray-800 border-b-2 border-gray-100 focus:border-secondary focus:outline-none placeholder-gray-300 bg-transparent transition-colors"
                            placeholder={t.servicesPage.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') closeSearch();
                            }}
                        />
                        {/* Clear/Close Button inside Input */}
                        <button 
                            onClick={handleSearchClear} 
                            className={`absolute left-0 text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100 ${!searchQuery && 'hidden'}`}
                            title="Clear Search"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Search Results Area */}
                    <div className="min-h-[100px] max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                        {!searchQuery ? (
                            /* State: Empty Search (Show Popular) */
                            <div className="animate-fade-in">
                                <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                                    <TrendingUp size={16} /> عمليات بحث شائعة
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularSearches.map((term, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setSearchQuery(term)}
                                            className="px-4 py-2 bg-gray-50 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/20 border border-gray-100 rounded-lg text-sm text-gray-600 transition-all duration-200"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* State: Results List */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
                                {filteredServices.length > 0 ? (
                                    filteredServices.map(service => (
                                        <Link 
                                            key={service.id} 
                                            to={`/services/${service.id}`}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
                                        >
                                            <div className="w-12 h-12 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                                                <service.icon size={20} />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">{service.title}</h4>
                                                <p className="text-xs text-gray-500 line-clamp-1">{service.description}</p>
                                            </div>
                                            <div className={`text-gray-300 group-hover:text-secondary transform ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-all`}>
                                                {language === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-2 py-8 text-center">
                                        <p className="text-gray-400">لا توجد نتائج مطابقة لـ "{searchQuery}"</p>
                                        <button onClick={() => setSearchQuery('')} className="text-secondary text-sm font-bold mt-2 hover:underline">مسح البحث</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
             </div>
             {/* Bottom decorative bar */}
             <div className="h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent w-full"></div>
          </div>

        </nav>
      </header>

      {/* 3. Mobile Menu Drawer (Completely Independent Layer) */}
      <div 
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>

        {/* Drawer */}
        <div 
          className={`absolute top-0 bottom-0 w-[85%] max-w-[360px] bg-[#0B2B5B] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col h-full ${
            isOpen ? 'ltr:translate-x-0 rtl:translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'
          } ${language === 'ar' ? 'right-0' : 'left-0'}`}
          style={{ touchAction: 'pan-y' }} // Allow internal scrolling
        >
          {/* Menu Header */}
          <div className="p-6 flex justify-between items-center border-b border-white/10">
              <span className="text-2xl font-bold text-white">إتمام</span>
              <button onClick={toggleMenu} className="text-white/70 hover:text-white">
                  <X size={24} />
              </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Mobile Search Integrated */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={t.nav.searchPlaceholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-12 text-white placeholder:text-gray-400 focus:outline-none focus:bg-white/10 transition-all text-base focus:border-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                      if(window.innerWidth >= 1024) {
                        setIsOpen(false);
                        toggleSearch();
                      }
                  }}
                />
                <Search className={`absolute top-4 text-gray-400 ${language === 'ar' ? 'left-4' : 'right-4'}`} size={20} />
                
                {/* Mobile Search Results */}
                {searchQuery && isOpen && (
                    <div className="mt-4 space-y-2 bg-white/5 rounded-xl p-2 border border-white/10">
                        {filteredServices.slice(0, 3).map(service => (
                            <Link 
                            key={service.id} 
                            to={`/services/${service.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <div className="text-secondary"><service.icon size={16} /></div>
                                <span className="text-white text-sm">{service.title}</span>
                            </Link>
                        ))}
                         {filteredServices.length === 0 && <p className="text-gray-400 text-xs text-center py-2">لا توجد نتائج</p>}
                    </div>
                )}
              </div>

            <div className="space-y-2">
              {navItems.map((item, idx) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  className={({ isActive }) =>
                    `block px-5 py-4 rounded-xl text-lg font-bold transition-all border border-transparent ${
                      isActive 
                      ? 'bg-white/10 text-white border-white/10 ps-8' 
                      : 'text-gray-300 hover:bg-white/5 hover:ps-8 hover:text-white'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-white/10 bg-[#051836] space-y-4">
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-secondary text-white font-bold w-full py-4 rounded-xl hover:bg-secondary-light shadow-lg transition-transform active:scale-95"
              >
                <span>{t.common.startNow}</span>
              </Link>
              
              <button 
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/10 text-gray-200 font-bold hover:bg-white/5 transition-colors"
              >
                <Globe size={18} />
                <span>{t.nav.switchLang}</span>
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ArrowUp, Youtube } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useAdmin } from '../context/AdminContext'; // Import Admin Context

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useAdmin(); // Use dynamic settings
  const [showScroll, setShowScroll] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScroll(true);
        } else {
            setShowScroll(false);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-[#001835] text-white pt-16 md:pt-20 pb-10 border-t border-white/5 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          
          {/* Brand & Desc */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center transform rotate-45">
                 <div className="w-5 h-5 border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-wide">إتمام</span>
                <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Etmaam</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 text-sm max-w-sm">
              {t.footer.desc}
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 md:block">
            <h3 className="text-lg font-bold mb-6 text-white col-span-2 md:col-span-1">{t.footer.links}</h3>
            <ul className="space-y-4 text-sm text-gray-400 col-span-2 md:col-span-1">
              <li><Link to="/about" className="hover:text-secondary transition-colors block py-1">{t.nav.about}</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors block py-1">{t.nav.services}</Link></li>
              <li><Link to="/packages" className="hover:text-secondary transition-colors block py-1">{t.nav.packages}</Link></li>
              <li><Link to="/faq" className="hover:text-secondary transition-colors block py-1">{t.nav.faq}</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors block py-1">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Contact - Dynamic */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t.footer.contact}</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={16} className="shrink-0" />
                <span className="break-all">{settings.email}</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={16} className="shrink-0" />
                <span dir="ltr">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={16} className="shrink-0" />
                <span dir="ltr">{settings.whatsapp}</span>
              </li>
              <li className="flex items-start gap-3 hover:text-white transition-colors">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>{settings.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t.footer.newsletter}</h3>
            <div className="flex gap-2 mb-8">
               <input type="email" placeholder={t.footer.emailPlace} className="bg-white text-gray-800 px-4 py-2 rounded text-sm w-full focus:outline-none min-w-0" />
               <button className="bg-secondary hover:bg-secondary-light text-white px-4 py-2 rounded text-sm font-bold whitespace-nowrap">{t.footer.subscribe}</button>
            </div>
            
            <h3 className="text-lg font-bold mb-4 text-white">{t.footer.follow}</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"><Twitter size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"><Facebook size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"><Linkedin size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"><Instagram size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"><Youtube size={18} /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 text-center md:text-right">
          <p>{t.footer.commercial}</p>
          <div className="flex gap-4 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
             <span>VISA</span>
             <span>Mastercard</span>
             <span>Mada</span>
             <span>ApplePay</span>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-600">
           {t.footer.rights}
        </div>
      </div>
      
      {/* Scroll to top button - FIXED and Interactive */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-8 right-8 bg-secondary hover:bg-secondary-light text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 z-[90] transform hover:-translate-y-1 hover:scale-110 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
         <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
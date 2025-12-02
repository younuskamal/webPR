import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronLeft, CheckCircle2, Copy, Check, Twitter, Linkedin, Facebook, Instagram, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useAdmin } from '../context/AdminContext'; // Import Context

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { addMessage, settings } = useAdmin(); // Use Context
  const ChevronIcon = language === 'ar' ? ChevronLeft : ChevronRight;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay, then save to context
    setTimeout(() => {
      addMessage({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || 'general',
          message: formData.message
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      // Scroll to top of form area
      const formElement = document.getElementById('contact-form-area');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="animate-fade-in pb-20">
      {/* Header with Parallax & Overlay */}
      <div className="relative h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-fixed-parallax"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f142fcb963ce?q=80&w=1920')" }} 
        ></div>
        <div className="absolute inset-0 bg-[#0B2B5B]/90 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 z-10"></div>
        
        {/* Animated dots/grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-10"></div>

        <div className="container mx-auto px-4 md:px-8 text-center relative z-20 text-white pt-16 md:pt-20 animate-fade-up">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-300 mb-4 md:mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
            <ChevronIcon size={14} />
            <span className="text-white">{t.contact.title}</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 drop-shadow-xl">{t.contact.heroTitle}</h1>
          <div className="w-16 md:w-24 h-1 bg-secondary mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed px-4">
            {t.contact.heroSubtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-4 md:-mt-20 relative z-30 mb-12" id="contact-form-area">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 min-h-[600px]">
          
          {/* Left Side: Interactive Contact Info */}
          <div className="bg-[#0B2B5B] text-white p-8 md:p-14 relative overflow-hidden flex flex-col justify-center order-2 lg:order-1">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.contact.infoTitle}</h2>
              <p className="text-blue-200 mb-8 md:mb-10 text-base md:text-lg">
                 {t.contact.infoSubtitle}
              </p>
              
              <div className="space-y-4 md:space-y-6">
                
                {/* Location Card */}
                <div className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 flex items-start gap-4 md:gap-5">
                  <div className="bg-white/10 p-2.5 md:p-3 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                    <MapPin size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-1 text-white">{t.contact.addressTitle}</h3>
                    <p className="text-blue-100 text-xs md:text-sm leading-relaxed">
                      {settings.address}
                    </p>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-block mt-3 text-xs font-bold text-secondary hover:text-white border-b border-secondary/30 hover:border-white transition-all pb-0.5"
                    >
                      {t.contact.mapLink}
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 flex items-start gap-4 md:gap-5 relative">
                  <div className="bg-white/10 p-2.5 md:p-3 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                    <Phone size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-base md:text-lg mb-1 text-white">{t.contact.phoneTitle}</h3>
                    <p className="text-blue-100 text-base md:text-lg font-english tracking-wide" dir="ltr">{settings.phone}</p>
                    <p className="text-blue-300 text-xs mt-1">{t.contact.hours}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(settings.phone, 'phone')}
                    className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} md:top-5 md:${language === 'ar' ? 'left-5' : 'right-5'} text-gray-400 hover:text-white transition-colors`}
                    title="Copy"
                  >
                    {copiedField === 'phone' ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                </div>

                {/* Email Card */}
                <div className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 flex items-start gap-4 md:gap-5 relative">
                  <div className="bg-white/10 p-2.5 md:p-3 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                    <Mail size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-base md:text-lg mb-1 text-white">{t.contact.emailTitle}</h3>
                    <p className="text-blue-100 font-english text-sm md:text-base">{settings.email}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(settings.email, 'email')}
                    className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} md:top-5 md:${language === 'ar' ? 'left-5' : 'right-5'} text-gray-400 hover:text-white transition-colors`}
                    title="Copy"
                  >
                    {copiedField === 'email' ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                 <span className="text-sm text-blue-200 font-medium">{t.contact.followUs}</span>
                 <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center text-white transition-all hover:-translate-y-1"><Twitter size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center text-white transition-all hover:-translate-y-1"><Linkedin size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center text-white transition-all hover:-translate-y-1"><Facebook size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center text-white transition-all hover:-translate-y-1"><Instagram size={18} /></a>
                 </div>
              </div>

            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="p-8 md:p-14 bg-white relative order-1 lg:order-2">
            {isSubmitted ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center animate-fade-in bg-white z-20">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                     <CheckCircle2 size={40} className="md:w-12 md:h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{t.contact.successTitle}</h3>
                  <p className="text-gray-500 text-base md:text-lg mb-8 max-w-md">
                     {t.contact.successDesc}
                  </p>
                  <button 
                     onClick={() => setIsSubmitted(false)}
                     className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                  >
                     {t.contact.sendAnother}
                  </button>
               </div>
            ) : (
               <>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">{t.contact.formTitle}</h2>
                <p className="text-gray-500 mb-8">{t.contact.formSubtitle}</p>
                
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="peer w-full px-4 py-3.5 md:py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-secondary focus:bg-white outline-none transition-all placeholder-transparent"
                        placeholder={t.contact.namePlaceholder}
                        id="nameInput"
                      />
                      <label htmlFor="nameInput" className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-secondary peer-focus:bg-white peer-focus:px-2 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 pointer-events-none`}>
                         {t.contact.nameLabel}
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="peer w-full px-4 py-3.5 md:py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-secondary focus:bg-white outline-none transition-all placeholder-transparent"
                        placeholder={t.contact.phonePlaceholder}
                        id="phoneInput"
                      />
                      <label htmlFor="phoneInput" className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-secondary peer-focus:bg-white peer-focus:px-2 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 pointer-events-none`}>
                         {t.contact.phoneLabel}
                      </label>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full px-4 py-3.5 md:py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-secondary focus:bg-white outline-none transition-all placeholder-transparent"
                      placeholder={t.contact.emailPlaceholder}
                      id="emailInput"
                    />
                    <label htmlFor="emailInput" className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-secondary peer-focus:bg-white peer-focus:px-2 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 pointer-events-none`}>
                       {t.contact.emailLabel}
                    </label>
                  </div>

                  <div className="relative group">
                     <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 md:py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-secondary focus:bg-white outline-none transition-all appearance-none cursor-pointer text-gray-700"
                    >
                      <option value="" disabled>{t.contact.serviceLabel}</option>
                      <option value="company-formation">Company Formation</option>
                      <option value="investor-services">Investor Services</option>
                      <option value="wage-protection">Wage Protection</option>
                      <option value="trademark">Trademarks</option>
                      <option value="other">Other</option>
                    </select>
                    {/* Fixed Icon Positioning */}
                    <div className={`absolute ${language === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 pointer-events-none text-gray-400`}>
                       <ChevronDown size={20} />
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="peer w-full px-4 py-3.5 md:py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-secondary focus:bg-white outline-none transition-all resize-none placeholder-transparent"
                      placeholder={t.contact.msgPlaceholder}
                      id="messageInput"
                    ></textarea>
                    <label htmlFor="messageInput" className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-secondary peer-focus:bg-white peer-focus:px-2 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 pointer-events-none`}>
                       {t.contact.msgLabel}
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 md:py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 text-base md:text-lg disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                       <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          {t.contact.sending}
                       </span>
                    ) : (
                       <>
                          <span>{t.contact.submit}</span>
                          <Send size={20} className="group-hover:-translate-x-1 transition-transform" />
                       </>
                    )}
                  </button>
                </form>
               </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
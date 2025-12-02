import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress'; 
import { LanguageProvider } from './LanguageContext';
import { ServiceProvider } from './context/ServiceContext'; 
import { AdminProvider } from './context/AdminContext'; 
import { ToastProvider } from './context/ToastContext'; // Import ToastProvider
import ProtectedRoute from './components/ProtectedRoute'; 

// New Pages
import ServiceDetails from './pages/ServiceDetails';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  // Check if current route is admin to hide Navbar/Footer
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Page Title Map
  const pageTitles: { [key: string]: string } = {
    '/': 'الرئيسية | إتمام لخدمات الأعمال',
    '/about': 'من نحن | إتمام',
    '/services': 'خدماتنا | إتمام',
    '/packages': 'الباقات والأسعار | إتمام',
    '/faq': 'الأسئلة الشائعة | إتمام',
    '/contact': 'تواصل معنا | إتمام',
    '/admin': 'دخول المسؤول | إتمام',
    '/admin/dashboard': 'لوحة التحكم | إتمام'
  };

  useEffect(() => {
    const title = pageTitles[location.pathname] || 'إتمام | خدمات الأعمال';
    document.title = title;

    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (!isAdminRoute) {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 3500); 
        return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden selection:bg-primary selection:text-white">
      {!isAdminRoute && isLoading && <LoadingScreen />}
      
      {!isAdminRoute && <ScrollProgress />}
      {!isAdminRoute && <Navbar />}
      
      <main className={`flex-grow transition-all duration-500 ease-in-out ${transitionStage === 'fadeOut' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
             <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {!isAdminRoute && <Footer />}
      
      {!isAdminRoute && (
        <a 
            href="https://wa.me/966554799222" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-[60] bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:bg-[#20b85c] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all hover:-translate-y-1 hover:scale-105 flex items-center justify-center group"
            aria-label="Contact on WhatsApp"
        >
            <span className="absolute left-full ml-3 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg font-bold tracking-wide hidden md:block">
            تواصل معنا مباشرة
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        </a>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AdminProvider>
        <ServiceProvider>
            <ToastProvider>
              <Router>
                  <AppContent />
              </Router>
            </ToastProvider>
        </ServiceProvider>
      </AdminProvider>
    </LanguageProvider>
  );
};

export default App;
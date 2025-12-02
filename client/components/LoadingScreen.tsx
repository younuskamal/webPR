import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center animate-fade-out">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-8">
        {/* Outer Ring - Static */}
        <div className="absolute inset-0 border-4 border-gray-50 rounded-full"></div>
        
        {/* Inner Ring - Spinner (Blue) */}
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" style={{ animationDuration: '1.2s' }}></div>
        
        {/* Logo Simulation */}
        <div className="relative z-10 animate-pulse">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-xl transform rotate-45 flex items-center justify-center shadow-2xl">
              <div className="flex flex-col gap-1.5 transform -rotate-45">
                 <div className="flex gap-1.5">
                   <div className="w-3.5 h-3.5 bg-white rounded-sm"></div>
                   <div className="w-3.5 h-3.5 bg-white/40 rounded-sm"></div>
                 </div>
                 <div className="flex gap-1.5">
                   <div className="w-3.5 h-3.5 bg-white/40 rounded-sm"></div>
                   <div className="w-3.5 h-3.5 bg-white rounded-sm"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      {/* Slogan Container */}
      <div className="text-center px-6 relative z-10">
        <h2 
          className="text-2xl md:text-4xl font-bold text-primary tracking-wide opacity-0 animate-fade-up leading-relaxed" 
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          الحياة حلوة ....خليها علينا
        </h2>
        <div 
          className="w-16 h-1 bg-secondary mx-auto mt-4 rounded-full opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
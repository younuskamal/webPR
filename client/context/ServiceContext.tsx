import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service } from '../types'; // Using main types file for simplicity with Icon compatibility
import DB from '../utils/storage';
import { Building2, TrendingUp, ShieldCheck, FileBadge, Laptop, Users } from 'lucide-react';

// Helper to map icon names back to components if needed (simplified for this demo, we assume icon persistence handles object refs in memory or defaults)
const ICON_MAP: Record<string, any> = {
  '1': Building2,
  '2': TrendingUp,
  '3': ShieldCheck,
  '4': FileBadge,
  '5': Laptop,
  '6': Users,
};

const mapIcons = (services: any[]): Service[] => {
  return services.map(s => {
    // Restore icon based on ID, or default to Building2 if not found
    // This fixes the issue where localStorage might contain serialized objects or undefined for icons
    s.icon = ICON_MAP[s.id] || Building2;
    return s;
  });
};

interface ServiceContextType {
  services: Service[];
  updateService: (updatedService: Service) => void;
  deleteService: (id: string) => void;
  addService: (newService: Service) => void;
  resetServices: () => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => mapIcons(DB.getServices()));

  useEffect(() => {
    DB.saveServices(services);
  }, [services]);

  const updateService = (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addService = (newService: Service) => {
    setServices(prev => [...prev, newService]);
  };

  const resetServices = () => {
    DB.factoryReset(); // Global reset is safer for consistency
  };

  return (
    <ServiceContext.Provider value={{ services, updateService, deleteService, addService, resetServices }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};

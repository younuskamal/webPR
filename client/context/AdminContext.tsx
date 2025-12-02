import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import DB from '../utils/storage';
import { Message, SiteSettings } from './types';

interface AdminContextType {
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'date' | 'status'>) => void;
  updateMessageStatus: (id: string, status: Message['status']) => void;
  deleteMessage: (id: string) => void;
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => void;
  factoryReset: () => void;
  stats: {
    visits: number;
    requests: number;
    revenue: number;
    monthlyData: { name: string; visits: number; requests: number }[];
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => DB.getMessages());
  const [settings, setSettings] = useState<SiteSettings>(() => DB.getSettings());

  useEffect(() => {
    DB.saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    DB.saveSettings(settings);
  }, [settings]);

  const addMessage = (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    const newMessage: Message = {
      ...msg,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const updateMessageStatus = (id: string, status: Message['status']) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  const factoryReset = () => {
    if (window.confirm('تحذير: سيتم مسح جميع البيانات (الخدمات، الرسائل، الإعدادات) والعودة للوضع الافتراضي. هل أنت متأكد؟')) {
      DB.factoryReset();
    }
  };

  // Mock Analytics Data (Generated based on message count for realism)
  const reqCount = messages.length;
  const stats = {
    visits: 12500 + (reqCount * 100),
    requests: reqCount,
    revenue: reqCount * 2500, // Avg deal size simulation
    monthlyData: [
      { name: 'يناير', visits: 4000, requests: Math.floor(reqCount * 0.1) },
      { name: 'فبراير', visits: 3000, requests: Math.floor(reqCount * 0.15) },
      { name: 'مارس', visits: 2000, requests: Math.floor(reqCount * 0.2) },
      { name: 'أبريل', visits: 2780, requests: Math.floor(reqCount * 0.25) },
      { name: 'مايو', visits: 1890, requests: Math.floor(reqCount * 0.1) },
      { name: 'يونيو', visits: 2390, requests: Math.floor(reqCount * 0.1) },
      { name: 'يوليو', visits: 3490, requests: Math.floor(reqCount * 0.1) },
    ]
  };

  return (
    <AdminContext.Provider value={{ 
      messages, addMessage, updateMessageStatus, deleteMessage,
      settings, updateSettings, factoryReset,
      stats
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

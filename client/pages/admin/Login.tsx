import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation
    if(email === 'admin@etmaam.com' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
    } else {
        alert('Invalid Credentials (Try: admin@etmaam.com / admin123)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl">
        <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-45">
                <div className="transform -rotate-45 font-bold text-2xl">A</div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">تسجيل دخول المسؤول</h2>
            <p className="mt-2 text-sm text-gray-600">لوحة التحكم الخاصة بإدارة المحتوى</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                required
                className="appearance-none rounded-xl relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
               <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                required
                className="appearance-none rounded-xl relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
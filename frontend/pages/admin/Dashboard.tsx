import React, { useState } from 'react';
import { useServices } from '../../context/ServiceContext';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { 
  Edit, Save, Plus, Trash2, LogOut, LayoutDashboard, Settings, 
  X, PackageOpen, MessageSquare, TrendingUp, BarChart3, PieChart, 
  Check, Building2, RefreshCw, Search, ArrowLeft, MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Service } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, Pie, Cell
} from 'recharts';

type Tab = 'overview' | 'services' | 'crm' | 'settings';

const COLORS = ['#008891', '#0B2B5B', '#FFBB28', '#FF8042'];

const AdminDashboard: React.FC = () => {
  const { services, updateService, deleteService, addService } = useServices();
  const { messages, updateMessageStatus, deleteMessage, settings, updateSettings, stats, factoryReset } = useAdmin();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // --- Modals State ---
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});

  const handleLogout = () => {
    if(window.confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('isAdmin');
        navigate('/admin');
        addToast('تم تسجيل الخروج بنجاح', 'info');
    }
  };

  // --- Service Actions ---
  const handleOpenAdd = () => {
    setCurrentService({
        title: '', description: '', price: 0, govtFees: 0, duration: '', details: '',
        icon: Building2, requirements: [], conditions: [], benefits: []
    });
    setShowAddServiceModal(true);
  };

  const handleOpenEdit = (service: Service) => {
    setCurrentService({ ...service });
    setShowEditServiceModal(true);
  };

  const handleServiceSubmit = (e: React.FormEvent, isEdit: boolean) => {
    e.preventDefault();
    if (isEdit && currentService.id) {
        updateService(currentService as Service);
        addToast('تم تحديث الخدمة بنجاح');
        setShowEditServiceModal(false);
    } else {
        addService({
            ...currentService,
            id: Date.now().toString(),
            icon: Building2, // Default icon
            requirements: currentService.requirements || [],
            conditions: currentService.conditions || [],
            benefits: currentService.benefits || []
        } as Service);
        addToast('تم إضافة الخدمة بنجاح');
        setShowAddServiceModal(false);
    }
  };

  // --- Render Components ---

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                    <p className="text-gray-500 text-sm font-medium mb-2">إجمالي الزيارات</p>
                    <h3 className="text-3xl font-black text-gray-800" dir="ltr">{stats.visits.toLocaleString()}</h3>
                    <div className="flex items-center gap-1 text-green-500 text-xs mt-2 font-bold">
                        <TrendingUp size={14} /> +12% هذا الشهر
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                    <p className="text-gray-500 text-sm font-medium mb-2">طلبات الخدمة</p>
                    <h3 className="text-3xl font-black text-gray-800" dir="ltr">{stats.requests}</h3>
                    <div className="flex items-center gap-1 text-green-500 text-xs mt-2 font-bold">
                        <TrendingUp size={14} /> +5% هذا الشهر
                    </div>
                </div>
            </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                    <p className="text-gray-500 text-sm font-medium mb-2">الإيرادات المتوقعة</p>
                    <h3 className="text-3xl font-black text-gray-800" dir="ltr">{stats.revenue.toLocaleString()} ريال</h3>
                    <div className="flex items-center gap-1 text-orange-500 text-xs mt-2 font-bold">
                        <TrendingUp size={14} /> تقديري
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                    <p className="text-gray-500 text-sm font-medium mb-2">عدد الخدمات</p>
                    <h3 className="text-3xl font-black text-gray-800" dir="ltr">{services.length}</h3>
                     <div className="flex items-center gap-1 text-purple-500 text-xs mt-2 font-bold">
                        <Check size={14} /> نشطة
                    </div>
                </div>
            </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <BarChart3 size={20} className="text-secondary" />
                        تحليلات الأداء الشهري
                    </h3>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={stats.monthlyData}>
                        <defs>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0B2B5B" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#0B2B5B" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#008891" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#008891" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
                            cursor={{ stroke: '#0B2B5B', strokeWidth: 1, strokeDasharray: '5 5' }}
                        />
                        <Area type="monotone" dataKey="visits" stroke="#0B2B5B" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" name="الزيارات" />
                        <Area type="monotone" dataKey="requests" stroke="#008891" strokeWidth={3} fillOpacity={1} fill="url(#colorReq)" name="الطلبات" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 h-[400px]">
                 <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <PieChart size={20} className="text-secondary" />
                    توزيع الطلبات
                </h3>
                <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                        <Pie
                            data={[
                                { name: 'جديد', value: messages.filter(m => m.status === 'new').length },
                                { name: 'تم التواصل', value: messages.filter(m => m.status === 'contacted').length },
                                { name: 'مغلق', value: messages.filter(m => m.status === 'closed').length },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {/* Colors */}
                            <Cell key="cell-0" fill="#EF4444" />
                            <Cell key="cell-1" fill="#F59E0B" />
                            <Cell key="cell-2" fill="#10B981" />
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 gap-4">
             <div className="relative w-full md:w-96">
                <input 
                    type="text" 
                    placeholder="بحث عن خدمة..." 
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-secondary/20 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
             </div>
             <button onClick={handleOpenAdd} className="bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-secondary/30 transition-all">
                <Plus size={20} /> خدمة جديدة
             </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(s => s.title.includes(searchTerm)).map((service) => (
                <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group relative">
                    <div className="flex justify-between items-start mb-4">
                         <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                             <service.icon size={24} />
                         </div>
                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => handleOpenEdit(service)} className="p-2 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg"><Edit size={16} /></button>
                             <button onClick={() => { if(window.confirm('حذف الخدمة؟')) deleteService(service.id)}} className="p-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg"><Trash2 size={16} /></button>
                         </div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{service.description}</p>
                    <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                        <span className="font-bold text-primary text-lg">{service.price?.toLocaleString()} ريال</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{service.duration}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderCRM = () => (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare size={20} className="text-secondary" />
                سجل رسائل العملاء
            </h3>
            <div className="flex gap-2">
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">{messages.filter(m => m.status === 'new').length} جديد</span>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-right min-w-[900px]">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                        <th className="p-5">بيانات العميل</th>
                        <th className="p-5">تفاصيل الطلب</th>
                        <th className="p-5">الحالة</th>
                        <th className="p-5">التاريخ</th>
                        <th className="p-5 text-center">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {messages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="p-5">
                                <div className="font-bold text-gray-900">{msg.name}</div>
                                <div className="text-xs text-gray-500 font-mono mt-1" dir="ltr">{msg.phone}</div>
                                <div className="text-xs text-blue-500 font-mono" dir="ltr">{msg.email}</div>
                            </td>
                            <td className="p-5">
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold mb-2 inline-block">{msg.service}</span>
                                <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">{msg.message}</p>
                            </td>
                            <td className="p-5">
                                <select 
                                    value={msg.status} 
                                    onChange={(e) => { updateMessageStatus(msg.id, e.target.value as any); addToast('تم تحديث حالة الطلب'); }}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border-none outline-none cursor-pointer appearance-none transition-colors ${
                                        msg.status === 'new' ? 'bg-red-100 text-red-700' : 
                                        msg.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' : 
                                        'bg-green-100 text-green-700'
                                    }`}
                                >
                                    <option value="new">● طلب جديد</option>
                                    <option value="contacted">● تم التواصل</option>
                                    <option value="closed">● مغلق</option>
                                </select>
                            </td>
                            <td className="p-5 text-gray-400 text-xs font-mono" dir="ltr">{msg.date}</td>
                            <td className="p-5 text-center">
                                <button onClick={() => { if(window.confirm('حذف الرسالة نهائياً؟')) { deleteMessage(msg.id); addToast('تم حذف الرسالة', 'error'); } }} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-10" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 right-0 w-72 bg-[#0B2B5B] text-white p-6 hidden lg:flex flex-col z-40 shadow-2xl">
         <div className="text-2xl font-black mb-10 flex items-center gap-3 tracking-wide px-2 select-none cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-secondary p-1.5 rounded-lg"><LayoutDashboard size={22} /></div>
            لوحة التحكم
         </div>
         
         <nav className="flex-grow space-y-2">
            {[
                { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
                { id: 'services', label: 'إدارة الخدمات', icon: PackageOpen },
                { id: 'crm', label: 'إدارة العملاء', icon: MessageSquare },
                { id: 'settings', label: 'الإعدادات', icon: Settings },
            ].map((item) => (
                <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl font-bold transition-all text-sm group ${
                        activeTab === item.id 
                        ? 'bg-white text-primary shadow-lg translate-x-2' 
                        : 'text-blue-200 hover:bg-white/10 hover:text-white'
                    }`}
                >
                    <item.icon size={18} className={`transition-transform ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} /> {item.label}
                </button>
            ))}
         </nav>
         
         <div className="mt-auto space-y-4">
             <button onClick={factoryReset} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-white transition-all text-xs font-bold border border-red-500/20">
                <RefreshCw size={14} /> تصفير النظام (Reset)
             </button>

             <div className="pt-4 border-t border-white/10">
                 <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-blue-300 hover:text-white transition-colors text-sm font-bold">
                    <LogOut size={16} /> تسجيل خروج
                 </button>
             </div>
         </div>
      </aside>

      {/* Main Area */}
      <main className="lg:mr-72 p-6 md:p-8 pt-24 lg:pt-8">
         {/* Mobile Navbar */}
         <div className="lg:hidden bg-white p-4 rounded-xl shadow-sm mb-6 flex justify-between items-center border border-gray-100">
             <h1 className="font-bold text-primary">لوحة التحكم</h1>
             <button onClick={handleLogout}><LogOut className="text-red-500" /></button>
         </div>

         {/* Title Header */}
         <div className="flex justify-between items-end mb-8">
             <div>
                 <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {activeTab === 'overview' && 'نظرة عامة'}
                    {activeTab === 'services' && 'الخدمات والأسعار'}
                    {activeTab === 'crm' && 'طلبات العملاء'}
                    {activeTab === 'settings' && 'إعدادات الموقع'}
                 </h1>
                 <p className="text-gray-500">إدارة شاملة لنظام إتمام عبر قاعدة بيانات محلية.</p>
             </div>
             {/* Show current Date */}
             <div className="hidden md:block text-left">
                 <p className="text-2xl font-bold text-gray-800" dir="ltr">{new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}</p>
                 <p className="text-sm text-gray-400" dir="ltr">{new Date().toLocaleDateString('en-US', {weekday: 'long', day: 'numeric', month: 'long'})}</p>
             </div>
         </div>

         {activeTab === 'overview' && renderOverview()}
         {activeTab === 'services' && renderServices()}
         {activeTab === 'crm' && renderCRM()}
         {activeTab === 'settings' && (
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-fade-in max-w-4xl">
                 <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-primary"><Settings size={20} /> إعدادات النظام الأساسية</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">العنوان الرئيسي (Hero Title)</label>
                         <input value={settings.heroTitle} onChange={(e) => updateSettings({...settings, heroTitle: e.target.value})} className="w-full p-3 border rounded-xl focus:border-secondary outline-none" />
                     </div>
                     <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">الوصف الفرعي</label>
                         <input value={settings.heroSubtitle} onChange={(e) => updateSettings({...settings, heroSubtitle: e.target.value})} className="w-full p-3 border rounded-xl focus:border-secondary outline-none" />
                     </div>
                     <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                         <input value={settings.phone} onChange={(e) => updateSettings({...settings, phone: e.target.value})} className="w-full p-3 border rounded-xl focus:border-secondary outline-none text-left" dir="ltr" />
                     </div>
                     <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                         <input value={settings.email} onChange={(e) => updateSettings({...settings, email: e.target.value})} className="w-full p-3 border rounded-xl focus:border-secondary outline-none text-left" dir="ltr" />
                     </div>
                 </div>
                 <div className="mt-8 pt-6 border-t flex justify-end">
                     <button onClick={() => addToast('تم الحفظ بنجاح')} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-light transition-colors flex items-center gap-2">
                         <Save size={18} /> حفظ التغييرات
                     </button>
                 </div>
             </div>
         )}
      </main>

      {/* Service Modal (Shared for Add/Edit) */}
      {(showAddServiceModal || showEditServiceModal) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                      <h3 className="text-xl font-bold text-gray-800">
                          {showAddServiceModal ? 'إضافة خدمة جديدة' : 'تعديل الخدمة'}
                      </h3>
                      <button onClick={() => { setShowAddServiceModal(false); setShowEditServiceModal(false); }} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg"><X size={20} /></button>
                  </div>
                  <form onSubmit={(e) => handleServiceSubmit(e, showEditServiceModal)} className="p-8 space-y-6">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">اسم الخدمة</label>
                          <input required value={currentService.title} onChange={e => setCurrentService({...currentService, title: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:border-secondary outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">السعر</label>
                              <input type="number" required value={currentService.price} onChange={e => setCurrentService({...currentService, price: Number(e.target.value)})} className="w-full p-3 border border-gray-200 rounded-xl focus:border-secondary outline-none" />
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">المدة</label>
                              <input required value={currentService.duration} onChange={e => setCurrentService({...currentService, duration: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:border-secondary outline-none" />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">وصف قصير</label>
                          <textarea rows={2} required value={currentService.description} onChange={e => setCurrentService({...currentService, description: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:border-secondary outline-none" />
                      </div>
                      <div className="flex gap-4 pt-4">
                          <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-light">حفظ البيانات</button>
                          <button type="button" onClick={() => { setShowAddServiceModal(false); setShowEditServiceModal(false); }} className="px-6 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200">إلغاء</button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;

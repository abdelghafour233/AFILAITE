
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">أ</div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">أفلييت<span className="text-emerald-600 underline decoration-wavy underline-offset-4">برو</span></span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', name: 'الرئيسية' },
                { id: 'articles', name: 'المقالات' },
                { id: 'generator', name: 'كاتب الذكاء الاصطناعي' },
                { id: 'stats', name: 'إحصائيات' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === item.id ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-500'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center sm:text-right">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">أ</div>
                <span className="text-xl font-bold text-white">أفلييت برو</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                منصتك الموثوقة لتعلم أسرار الربح من التسويق بالعمولة. نحن نوفر لك أفضل الأدوات والشروحات لتبدأ رحلتك المالية اليوم.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-emerald-400">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-emerald-400">قصص نجاح</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">اشترك في النشرة</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="بريدك الإلكتروني" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-emerald-500" />
                <button className="bg-emerald-600 px-4 py-2 rounded-lg text-white">تم</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-xs text-center text-slate-500">
            &copy; 2024 أفلييت برو. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

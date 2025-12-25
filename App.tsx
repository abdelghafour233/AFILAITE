
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PostCard from './components/PostCard';
import { Post, Category } from './types';
import { generateAffiliateContent, suggestAffiliateIdeas } from './services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock Data
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'كيف تبدأ في أفلييت أمازون من الصفر في 2024',
    excerpt: 'دليل شامل يشرح الخطوات العملية للتقديم في برنامج Amazon Associates واختيار المنتجات المربحة وكيفية تسويقها بطرق مجانية ومدفوعة.',
    content: 'المحتوى الكامل هنا...',
    category: Category.Guides,
    author: 'أحمد علي',
    date: '12 مايو 2024',
    image: 'https://picsum.photos/seed/amazon/800/600',
    affiliateLink: 'https://amazon.com'
  },
  {
    id: '2',
    title: 'أفضل 5 أدوات ذكاء اصطناعي لكتابة مقالات الأفلييت',
    excerpt: 'اكتشف كيف يمكن للذكاء الاصطناعي أن يوفر عليك ساعات من البحث والكتابة، وكيف تستخدمه لرفع ترتيب مقالاتك في نتائج البحث.',
    content: 'المحتوى الكامل هنا...',
    category: Category.Tools,
    author: 'سارة خالد',
    date: '10 مايو 2024',
    image: 'https://picsum.photos/seed/ai-tools/800/600'
  },
  {
    id: '3',
    title: 'مراجعة شاملة لاستضافة Bluehost: هل لا تزال الأفضل؟',
    excerpt: 'نضع استضافة بلوهوست تحت المجهر، نختبر السرعة، الأمان، والدعم الفني لنخبرك ما إذا كانت تستحق الاستثمار لموقعك الجديد.',
    content: 'المحتوى الكامل هنا...',
    category: Category.Reviews,
    author: 'محمد محمود',
    date: '8 مايو 2024',
    image: 'https://picsum.photos/seed/hosting/800/600'
  }
];

const MOCK_STATS = [
  { name: 'يناير', earnings: 400 },
  { name: 'فبراير', earnings: 1200 },
  { name: 'مارس', earnings: 900 },
  { name: 'أبريل', earnings: 2200 },
  { name: 'مايو', earnings: 1800 },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // AI Generator State
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState('');
  const [generatedResult, setGeneratedResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const ideas = await suggestAffiliateIdeas();
        setAiSuggestions(ideas);
      } catch (err) {
        console.error("Failed to fetch AI suggestions", err);
      }
    };
    if (activeTab === 'generator') {
      fetchSuggestions();
    }
  }, [activeTab]);

  const handleGenerate = async () => {
    if (!productName || !features) return;
    setIsGenerating(true);
    try {
      const content = await generateAffiliateContent(productName, features);
      setGeneratedResult(content || "فشل توليد المحتوى.");
    } catch (err) {
      setGeneratedResult("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderHome = () => (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white rounded-[2rem] mx-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-20 md:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-sm font-bold mb-8 border border-emerald-500/30">
            <span>مدعوم بالذكاء الاصطناعي</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl">
            حول شغفك إلى أرباح حقيقية مع <span className="text-emerald-500">أفلييت برو</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            تعلم استراتيجيات التسويق بالعمولة الحديثة، واستخدم أدواتنا الذكية لكتابة مقالات تبيع بالنيابة عنك.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveTab('generator')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-600/20"
            >
              ابدأ الكتابة بالذكاء الاصطناعي
            </button>
            <button 
              onClick={() => setActiveTab('articles')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-sm transition-all"
            >
              تصفح المقالات
            </button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800">أحدث المقالات</h2>
            <p className="text-slate-500 mt-2">تعلم من الخبراء واقرأ أحدث الاستراتيجيات</p>
          </div>
          <button 
            onClick={() => setActiveTab('articles')}
            className="text-emerald-600 font-bold hover:underline"
          >
            مشاهدة الكل &larr;
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_POSTS.map(post => (
            <PostCard key={post.id} post={post} onClick={(p) => { setSelectedPost(p); setActiveTab('post-detail'); }} />
          ))}
        </div>
      </section>

      {/* Stats Preview */}
      <section className="bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-6">راقب نمو أرباحك</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              يوفر لك نظامنا تحليلات دقيقة حول أدائك التسويقي، لتعرف أي الروابط تجلب لك المال وأيها تحتاج لتحسين.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-emerald-600 text-3xl font-black">+450%</div>
                <div className="text-slate-500 text-sm mt-1 font-medium">نمو المبيعات</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-emerald-600 text-3xl font-black">1.2k</div>
                <div className="text-slate-500 text-sm mt-1 font-medium">عميل نشط</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_STATS}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );

  const renderArticles = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 mb-4">مكتبة المقالات</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {['الكل', ...Object.values(Category)].map(cat => (
            <button key={cat} className="px-5 py-2 rounded-full border border-slate-200 text-sm hover:bg-emerald-600 hover:text-white transition-all">
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...MOCK_POSTS, ...MOCK_POSTS].map((post, idx) => (
          <PostCard key={idx} post={post} onClick={(p) => { setSelectedPost(p); setActiveTab('post-detail'); }} />
        ))}
      </div>
    </div>
  );

  const renderGenerator = () => (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-lg">✨</span>
              كاتب المقالات الذكي
            </h2>
            <p className="text-slate-500 mb-8">أدخل تفاصيل المنتج وسيقوم الذكاء الاصطناعي بصياغة مراجعة احترافية لك.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">اسم المنتج أو الخدمة</label>
                <input 
                  type="text" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="مثال: استضافة بلوهوست" 
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">المميزات الرئيسية (واحدة في كل سطر)</label>
                <textarea 
                  rows={4} 
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="سرعة عالية&#10;دعم فني 24/7&#10;دومين مجاني" 
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full py-4 rounded-xl font-black text-white transition-all shadow-lg ${isGenerating ? 'bg-slate-400' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}`}
              >
                {isGenerating ? 'جاري الكتابة...' : 'توليد المحتوى التسويقي'}
              </button>
            </div>

            {generatedResult && (
              <div className="mt-12 p-8 bg-emerald-50 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-emerald-800">النتيجة المولدة:</h3>
                  <button onClick={() => navigator.clipboard.writeText(generatedResult)} className="text-xs bg-white px-3 py-1 rounded-full shadow-sm hover:bg-slate-50">نسخ المحتوى</button>
                </div>
                <div className="prose prose-emerald max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {generatedResult}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">لماذا تستخدم الذكاء الاصطناعي؟</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="text-emerald-500">✓</span>
                <span>توفير 90% من وقت الكتابة</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500">✓</span>
                <span>تحسين المحتوى لمحركات البحث (SEO)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500">✓</span>
                <span>أسلوب تسويقي مقنع يزيد التحويل</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100">
            <h3 className="font-black text-slate-800 mb-4">أفكار مقترحة لك</h3>
            <div className="space-y-4">
              {aiSuggestions.length > 0 ? aiSuggestions.map((idea, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer group">
                  <h4 className="font-bold text-sm text-slate-700 group-hover:text-emerald-700">{idea.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1">{idea.summary}</p>
                </div>
              )) : (
                <p className="text-xs text-slate-400">جاري تحميل المقترحات من الذكاء الاصطناعي...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPostDetail = () => (
    selectedPost && (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => setActiveTab('articles')}
          className="mb-8 text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
        >
          &rarr; العودة للمقالات
        </button>
        <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-96 object-cover rounded-[2.5rem] mb-10 shadow-2xl" />
        <div className="flex items-center gap-4 text-slate-500 mb-6">
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">{selectedPost.category}</span>
          <span>بواسطة {selectedPost.author}</span>
          <span>•</span>
          <span>{selectedPost.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-8 leading-tight">
          {selectedPost.title}
        </h1>
        <div className="prose prose-lg max-w-none text-slate-700 leading-loose space-y-6">
          <p className="text-xl text-slate-600 font-medium italic border-r-4 border-emerald-500 pr-6 py-2">
            {selectedPost.excerpt}
          </p>
          <p>هذا نص افتراضي للمحتوى. في النسخة الكاملة سيحتوي هذا الجزء على تفاصيل دقيقة تشرح كيفية العمل في هذا المجال.</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-12 mb-4">الخطوات العملية للبدء</h2>
          <p>ابدأ بالبحث عن النيش (Niche) المناسب لك، تأكد من وجود طلب حقيقي على المنتجات التي تنوي الترويج لها.</p>
        </div>
        
        {selectedPost.affiliateLink && (
          <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-white flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold mb-4">هل أنت مستعد للبدء؟</h3>
            <p className="text-slate-400 mb-8 max-w-md">اضغط على الرابط أدناه للتوجه مباشرة إلى العرض الرسمي المذكور في المقال.</p>
            <a 
              href={selectedPost.affiliateLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-xl font-black transition-all transform hover:scale-105"
            >
              اذهب إلى العرض الآن
            </a>
          </div>
        )}
      </div>
    )
  );

  const renderStats = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-black text-slate-800">لوحة التحكم والأرباح</h2>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border text-sm font-bold text-slate-600">آخر 30 يوم</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'إجمالي الأرباح', value: '$4,250', trend: '+12%', color: 'emerald' },
          { label: 'النقرات', value: '12.5k', trend: '+5%', color: 'blue' },
          { label: 'التحويل', value: '3.2%', trend: '-1%', color: 'amber' },
          { label: 'العملاء الجدد', value: '48', trend: '+18%', color: 'purple' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-slate-500 text-sm mb-2">{stat.label}</div>
            <div className="text-2xl font-black text-slate-800 mb-1">{stat.value}</div>
            <div className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
              {stat.trend} مقارنة بالشهر السابق
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-96">
        <h3 className="font-bold text-slate-800 mb-8">منحنى نمو الدخل الشهري</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_STATS}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
            />
            <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const getContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'articles': return renderArticles();
      case 'generator': return renderGenerator();
      case 'stats': return renderStats();
      case 'post-detail': return renderPostDetail();
      default: return renderHome();
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {getContent()}
    </Layout>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Cpu, Briefcase, Code, ShieldCheck, Network, Rocket, Target, 
  Menu, X, User, History, LogIn, LogOut, ChevronRight, ExternalLink,
  CheckCircle2, AlertCircle, BarChart3, Calendar, Trophy, Download,
  FileText, ClipboardList, Keyboard, Presentation, HardDrive, Lightbulb, Video,
  ChevronDown, Activity, Music, MousePointer2, Share2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Legend
} from 'recharts';

import { auth, db, signInWithGoogle, logout, incrementVisitCount, savePracticeResult, getAllHistory } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { TOPICS, PROBLEMS } from './constants';
import { Topic, Problem, PracticeHistory } from './types';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = ({ user }: { user: FirebaseUser | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRadioOpen, setIsRadioOpen] = useState(false);

  const radioLinks = [
    {
      title: "1年特進コース",
      color: "text-red-500",
      links: [
        { label: "1日1回Quizlet提出フォーム", url: "https://forms.gle/KM97m6Zs2nSjRS7G6" }
      ]
    },
    {
      title: "1年DFコース",
      color: "text-blue-500",
      links: [
        { label: "1日1回Quizlet提出フォーム", url: "https://forms.gle/nKgENU7qf85Xg6UMA" },
        { label: "タイピング", url: "https://typing.twi1.me/" },
        { label: "DFコースClassroom", url: "https://classroom.google.com/c/ODU3OTYxOTgxNzU4" }
      ]
    },
    {
      title: "1年BAコース",
      color: "text-orange-500",
      links: [
        { label: "1日1回Quizlet提出フォーム", url: "https://forms.gle/MyN2u3D4K43jUC2t5" }
      ]
    },
    {
      title: "2年特進・情報コース",
      color: "text-green-600",
      links: [
        { label: "1日1回Quizlet（2年ビジネス情報１級編）", url: "https://forms.gle/MgzxwDBPLCYLULBQA" },
        { label: "タイピング：１級ビジネス情報（前半）", url: "https://typing.twi1.me/game/291043" },
        { label: "タイピング：１級ビジネス情報（後半）", url: "https://typing.twi1.me/game/291047" }
      ]
    },
    {
      title: "提出状況確認",
      links: [
        { label: "提出状況", url: "/status", isInternal: true }
      ]
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
                <BookOpen size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                女子商 ITラボ
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Radio Exercise Dropdown */}
            <div className="relative">
              <button 
                onMouseEnter={() => setIsRadioOpen(true)}
                onMouseLeave={() => setIsRadioOpen(false)}
                className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 font-bold transition-colors py-2"
              >
                <Activity size={18} />
                <span>授業はじめのラジオ体操</span>
                <ChevronDown size={16} className={cn("transition-transform", isRadioOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isRadioOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setIsRadioOpen(true)}
                    onMouseLeave={() => setIsRadioOpen(false)}
                    className="absolute left-0 mt-0 w-80 bg-white rounded-2xl shadow-2xl border border-pink-50 overflow-hidden z-50"
                  >
                    <div className="p-4 space-y-4">
                      <div className="text-xs font-bold text-pink-600 border-b border-pink-50 pb-2 mb-2">
                        1日1回提出フォーム〜週に5回以上提出でGood!〜
                      </div>
                      {radioLinks.map((section: any, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className={cn("text-[10px] font-black uppercase tracking-widest", section.color || "text-pink-400")}>
                            {section.title}
                          </div>
                          <div className="grid gap-1">
                            {section.links.map((link, lIdx) => (
                              link.isInternal ? (
                                <Link
                                  key={lIdx}
                                  to={link.url}
                                  onClick={() => setIsRadioOpen(false)}
                                  className="flex items-center justify-between p-2 hover:bg-pink-50 rounded-lg text-sm text-gray-700 font-medium transition-colors group"
                                >
                                  <span>{link.label}</span>
                                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                              ) : (
                                <a
                                  key={lIdx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between p-2 hover:bg-pink-50 rounded-lg text-sm text-gray-700 font-medium transition-colors group"
                                >
                                  <span>{link.label}</span>
                                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                              )
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/status" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">提出状況</Link>
            <Link to="/" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">学習する</Link>
            <Link to="/roadmap" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">学年・コース別マップ</Link>
            {user && (
              <Link to="/history" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">学習履歴</Link>
            )}
            
            {/* Share Button */}
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin);
                alert("サイトのリンクをコピーしました！ブラウザのブックマークに登録すると、次回からすぐにアクセスできます。");
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-pink-200 text-pink-600 rounded-full hover:bg-pink-50 transition-all shadow-sm"
              title="サイトのリンクをコピー"
            >
              <Share2 size={18} />
              <span className="text-sm font-bold">共有</span>
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-pink-50 rounded-full border border-pink-100">
                  <img src={user.photoURL || ''} alt="" className="w-6 h-6 rounded-full" />
                  <span className="text-sm text-pink-700 font-medium">{user.displayName}</span>
                </div>
                <button onClick={logout} className="text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <LogIn size={18} />
                <span>ログイン</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-pink-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {/* Mobile Radio Exercise Section */}
              <div className="bg-pink-50 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 text-pink-600 font-bold text-sm">
                    <Activity size={16} />
                    <span>授業はじめのラジオ体操</span>
                  </div>
                  <div className="text-[10px] text-pink-400 font-medium">
                    1日1回提出フォーム〜週に5回以上提出でGood!〜
                  </div>
                </div>
                <div className="grid gap-2">
                  {radioLinks.map((section: any, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className={cn("text-[9px] font-black uppercase tracking-tighter", section.color || "text-pink-300")}>
                        {section.title}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {section.links.map((link, lIdx) => (
                          link.isInternal ? (
                            <Link
                              key={lIdx}
                              to={link.url}
                              onClick={() => setIsOpen(false)}
                              className="text-xs bg-white px-2 py-1 rounded-md border border-pink-100 text-pink-700 font-medium"
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <a
                              key={lIdx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-white px-2 py-1 rounded-md border border-pink-100 text-pink-700 font-medium"
                            >
                              {link.label}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Link to="/status" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">提出状況</Link>
                <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">学習する</Link>
                <Link to="/roadmap" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">学年・コース別マップ</Link>
                {user && (
                  <Link to="/history" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 font-medium">学習履歴</Link>
                )}
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin);
                    alert("サイトのリンクをコピーしました！");
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-pink-600 font-bold flex items-center space-x-2"
                >
                  <Share2 size={18} />
                  <span>サイトを共有する</span>
                </button>
              </div>
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full" />
                      <span className="text-gray-700 font-medium">{user.displayName}</span>
                    </div>
                    <button onClick={logout} className="p-2 text-red-500"><LogOut size={20} /></button>
                  </div>
                ) : (
                  <button 
                    onClick={signInWithGoogle}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-pink-500 text-white rounded-xl"
                  >
                    <LogIn size={18} />
                    <span>Googleでログイン</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TopicIcon = ({ name, size = 24 }: { name: string, size?: number }) => {
  switch (name) {
    case 'BookOpen': return <BookOpen size={size} />;
    case 'Cpu': return <Cpu size={size} />;
    case 'Briefcase': return <Briefcase size={size} />;
    case 'Code': return <Code size={size} />;
    case 'ShieldCheck': return <ShieldCheck size={size} />;
    case 'Network': return <Network size={size} />;
    case 'Rocket': return <Rocket size={size} />;
    case 'Target': return <Target size={size} />;
    default: return <BookOpen size={size} />;
  }
};

const ResourceIcon = ({ type, size = 20 }: { type?: string, size?: number }) => {
  switch (type) {
    case 'spreadsheet': return <BarChart3 size={size} className="text-emerald-500" />;
    case 'pdf': return <FileText size={size} className="text-red-500" />;
    case 'form': return <ClipboardList size={size} className="text-purple-500" />;
    case 'quizlet': return (
      <div className="bg-[#4255ff] p-1 rounded-lg flex items-center justify-center shadow-sm" style={{ width: size, height: size }}>
        <span className="text-white font-black leading-none" style={{ fontSize: size * 0.6 }}>Q</span>
      </div>
    );
    case 'typing': return <Keyboard size={size} className="text-blue-500" />;
    case 'presentation': return <Presentation size={size} className="text-orange-500" />;
    case 'drive': return <HardDrive size={size} className="text-blue-400" />;
    case 'video': return <Video size={size} className="text-red-400" />;
    default: return <ExternalLink size={size} className="text-gray-400" />;
  }
};

const TopicCard = ({ topic }: { topic: Topic }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn(
        "relative rounded-[32px] p-8 border shadow-sm hover:shadow-md transition-all group flex flex-col h-full",
        topic.isNew 
          ? "bg-gray-100 border-gray-200" 
          : "bg-[#FFFBF0] border-[#FEEFC3]"
      )}
    >
      {/* Badge at top right */}
      {topic.badge && (
        <div className="absolute top-8 right-8 bg-[#FEF3C7] text-[#92400E] px-4 py-1.5 rounded-full text-xs font-bold">
          {topic.badge}
        </div>
      )}

      {/* Icon in rounded square */}
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-105", 
        topic.color
      )}>
        <TopicIcon name={topic.icon} size={32} />
      </div>

      {/* Title and Subtitle */}
      <div className="mb-4">
        <h3 className="text-2xl font-black text-[#064E3B] mb-1 group-hover:text-pink-600 transition-colors">
          {topic.title}
        </h3>
        {topic.subtitle && (
          <p className="text-[#92400E] text-sm font-bold">
            {topic.subtitle}
          </p>
        )}
      </div>

      {/* Headline */}
      {topic.headline && (
        <div className="mb-4 p-3 bg-pink-50 border border-pink-100 rounded-xl">
          <p className="text-pink-600 text-xs font-black leading-relaxed">
            {topic.headline}
          </p>
        </div>
      )}

      {/* Description */}
      <p className="text-[#4B5563] text-sm leading-relaxed mb-8 flex-grow">
        {topic.description}
      </p>

      {/* Footer: Category and Link */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col space-y-1">
          {topic.category && (
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {topic.category}
            </span>
          )}
          {topic.level && (
            <div className="bg-[#FCD34D] text-[#92400E] px-4 py-1.5 rounded-lg text-sm font-black">
              {topic.level}
            </div>
          )}
        </div>
        <Link 
          to={`/topic/${topic.id}`}
          className="flex items-center space-x-1 text-[#92400E] font-bold hover:text-pink-600 transition-colors group/link"
        >
          <span>詳細を見る</span>
          <ChevronRight size={18} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

// --- Pages ---

const HomePage = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');

  useEffect(() => {
    incrementVisitCount();
    const unsub = onSnapshot(doc(db, 'stats', 'global'), (doc) => {
      if (doc.exists()) {
        setVisitCount(doc.data().visitCount);
      }
    });
    return () => unsub();
  }, []);

  const categories = ['すべて', ...new Set(TOPICS.map(t => t.category).filter(Boolean) as string[])];
  const filteredTopics = selectedCategory === 'すべて' 
    ? TOPICS 
    : TOPICS.filter(t => t.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-4"
        >
          女子商 ITラボ
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight"
        >
          「課題解決力」と「稼ぐ力」を、<br />
          <span className="text-pink-500">女子商</span>で手に入れる。
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg max-w-2xl mx-auto"
        >
          全商情報処理検定からITパスポートまで。
          あなたのペースで、楽しく学べる学習プラットフォームです。
        </motion.p>

        {visitCount !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 inline-flex items-center space-x-4 bg-white border border-pink-100 shadow-xl shadow-pink-50 rounded-3xl p-6"
          >
            <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500">
              <User size={24} />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">累計訪問者数</div>
              <div className="text-2xl font-black text-gray-900 tabular-nums">
                {visitCount.toLocaleString()} <span className="text-sm font-bold text-gray-400">人</span>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-black transition-all shadow-sm",
              selectedCategory === cat
                ? "bg-pink-600 text-white scale-105 shadow-pink-200"
                : "bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Next Exam Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-[32px] p-6 md:p-8 text-white shadow-xl shadow-pink-100 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
              <Calendar size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Next Exam Information</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-2">第75回 全商情報処理検定</h2>
              <p className="text-pink-100 text-sm mb-6 leading-relaxed">
                秋の検定に向けて、計画的に学習を進めましょう！<br />
                1年生は「情報処理・情報基礎」、2・3年生は「1級」に挑戦です。
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 flex-1 min-w-[180px]">
                  <div className="text-[10px] text-pink-200 font-bold mb-0.5 uppercase">申込期間（PBT）</div>
                  <div className="text-lg font-black">6/24（水）〜7/7（火）</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 flex-1 min-w-[180px]">
                  <div className="text-[10px] text-pink-200 font-bold mb-0.5 uppercase">検定日（PBT）</div>
                  <div className="text-lg font-black">令和8年9月27日（日）</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="w-1.5 h-1.5 bg-pink-300 rounded-full mr-2" />
                CBT方式（筆記・情報基礎）
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-pink-200 font-bold mb-0.5 uppercase">申込期間</div>
                    <div className="text-base font-bold">未定（順次連絡）</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-pink-200 font-bold mb-0.5 uppercase">検定期間</div>
                    <div className="text-base font-bold">9/5〜10/25</div>
                  </div>
                </div>
                <Link 
                  to="/roadmap" 
                  className="mt-2 inline-flex items-center space-x-2 text-xs font-black bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  <span>詳細スケジュールを確認</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full -ml-24 -mb-24 blur-3xl" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTopics.map((topic, idx) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <TopicCard topic={topic} />
          </motion.div>
        ))}
      </div>

      <section className="mt-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Paizaでプログラミングに挑戦！</h2>
          <p className="text-pink-100 text-lg mb-4 leading-relaxed">
            目標はCランク獲得！自分のスキルを可視化して、未来の可能性を広げましょう。
            Paizaのランクアップを目指して、今日からスタート！
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mb-8 border border-white/30 inline-block">
            <p className="text-sm font-bold flex items-center">
              <span className="mr-2">📢</span>
              今年度のクーポンが発行され次第生徒のみなさんに、連絡します。
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            <a 
              href="https://paiza.jp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-pink-600 rounded-2xl font-bold hover:bg-pink-50 transition-colors shadow-xl"
            >
              <span>Paiza公式サイトへ</span>
              <ExternalLink size={20} />
            </a>
            <Link 
              to="/paiza" 
              className="inline-flex items-center space-x-2 px-8 py-4 bg-pink-600 text-white rounded-2xl font-bold hover:bg-pink-700 transition-colors shadow-xl border border-pink-400"
            >
              <span>Paiza専用ページを見る</span>
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <BookOpen className="mr-2" size={24} />
              おすすめ講座
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "生成AI入門リテラシー編", url: "https://paiza.jp/works/generative-ai-literacy/trial", icon: "🤖" },
                { title: "生成AI組み込みアプリ企画開発", url: "https://paiza.jp/works/planning-and-development-of-generative-ai-embedded-applications/trial", icon: "💡" },
                { title: "Python×AI・機械学習入門編", url: "https://paiza.jp/works/ai_ml/primer", icon: "🧠" },
                { title: "情報処理入門テクノロジー編", url: "https://paiza.jp/works/technology/primer", icon: "⚙️" },
                { title: "情報処理入門ストラテジ編", url: "https://paiza.jp/works/strategy/primer", icon: "📊" },
                { title: "情報処理入門マネジメント編", url: "https://paiza.jp/works/management/primer", icon: "📋" },
                { title: "アルゴリズム入門編", url: "https://paiza.jp/works/algorithm/primer", icon: "🔢" },
                { title: "Webアプリ開発 PHP+MySQL", url: "https://paiza.jp/works/webapplicationlamp/primer", icon: "🌐" },
                { title: "Cランク獲得ストーリー(Java)", url: "https://paiza.jp/pages/works/stories/crank_java", icon: "☕" }
              ].map((course, idx) => (
                <a 
                  key={idx} 
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105 block group"
                >
                  <div className="text-2xl mb-2">{course.icon}</div>
                  <div className="font-bold text-sm leading-tight group-hover:text-pink-200 transition-colors">{course.title}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Code size={400} className="transform translate-x-1/4 -translate-y-1/4" />
        </div>
      </section>
    </div>
  );
};

const TopicPage = ({ user }: { user: FirebaseUser | null }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const topic = TOPICS.find(t => t.id === id);
  const [shuffledProblems, setShuffledProblems] = useState<Problem[]>([]);
  
  const [mode, setMode] = useState<'study' | 'practice'>(location.state?.mode || 'study');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      const original = [...PROBLEMS[id]];
      // Fisher-Yates shuffle
      for (let i = original.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [original[i], original[j]] = [original[j], original[i]];
      }
      setShuffledProblems(original);
      setCurrentIdx(0); // Reset index when shuffling
      setSelectedOption(null);
      setIsAnswered(false);
      setShowResult(false);
    }
  }, [id, mode]); // Reshuffle when id or mode changes

  if (!topic) return <div>Topic not found</div>;

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    const correct = idx === shuffledProblems[currentIdx].correctAnswer;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (correct) {
      setScore(s => s + 1);
    }
    
    // Save individual result
    if (user && topic) {
      savePracticeResult(user.uid, topic.id, shuffledProblems[currentIdx].id, correct);
    }
  };

  const nextProblem = () => {
    if (currentIdx + 1 < shuffledProblems.length) {
      setCurrentIdx(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartPractice = () => {
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    setSelectedOption(null);
    // Trigger reshuffle
    if (id && PROBLEMS[id]) {
      const original = [...PROBLEMS[id]];
      for (let i = original.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [original[i], original[j]] = [original[j], original[i]];
      }
      setShuffledProblems(original);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-pink-600 mb-8 transition-colors">
        <ChevronRight size={18} className="rotate-180 mr-1" />
        <span>戻る</span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm", topic.color)}>
            <TopicIcon name={topic.icon} size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#064E3B]">{topic.title}</h1>
            {topic.subtitle && (
              <p className="text-[#92400E] font-bold text-sm">{topic.subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {topic.level && (
            <div className="bg-[#FCD34D] text-[#92400E] px-4 py-1.5 rounded-lg text-sm font-black">
              {topic.level}
            </div>
          )}
          {topic.id !== 'paiza' && (
            <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start md:self-center">
              <button 
                onClick={() => setMode('study')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  mode === 'study' ? "bg-white text-pink-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                対策・学習
              </button>
              <button 
                onClick={() => setMode('practice')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  mode === 'practice' ? "bg-white text-pink-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                練習問題
              </button>
            </div>
          )}
          {topic.answerLink && (
            <a
              href={topic.answerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl text-sm font-black bg-yellow-400 text-yellow-900 hover:bg-yellow-300 transition-all shadow-sm flex items-center space-x-2"
            >
              <FileText size={18} />
              <span>解答集</span>
            </a>
          )}
        </div>
      </div>

      {mode === 'study' ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-white rounded-3xl p-8 border border-pink-50 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen size={24} className="mr-2 text-pink-500" />
              試験の概要
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {topic.studyContent?.overview || topic.description}
            </p>
            
            {topic.id === 'info-processing' && (
              <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                  <Video className="mr-2" size={20} />
                  実技問題の解き方解説
                </h3>
                <p className="text-blue-700 text-sm mb-4 leading-relaxed">
                  実技問題の解き方がわからない場合は、下記の解説動画を参考にしてね！（随時更新）<br />
                  動画を見ても解決できない時は、担当の先生にChatで質問してください（夜中休日は営業時間外）
                </p>
                <a 
                  href="https://www.youtube.com/playlist?list=PLz_Qz70gOXI9Bysfh9Mt3irWCiJ_95mU5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  <span>解説動画（Youtube）を見る</span>
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topic.studyContent?.sections.map((section, idx) => (
                <div key={idx} className="bg-pink-50/50 rounded-2xl p-6 border border-pink-100">
                  <h3 className="font-bold text-pink-700 mb-3">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <CheckCircle2 size={16} className="mr-2 mt-0.5 text-pink-400 shrink-0" />
                        {typeof item === 'string' ? (
                          <span>{item}</span>
                        ) : (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-700 hover:underline font-bold"
                          >
                            {item.title}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {topic.externalLinks && topic.externalLinks.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <ExternalLink size={20} className="mr-2 text-pink-500" />
                  関連学習サイト
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topic.externalLinks.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[24px] hover:border-pink-200 hover:bg-pink-50/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                          <ResourceIcon type={link.type} size={20} />
                        </div>
                        <span className="font-bold text-gray-700 group-hover:text-pink-600">{link.title}</span>
                      </div>
                      <ChevronRight size={20} className="text-gray-300 group-hover:text-pink-500 transition-transform group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {topic.resourceSections && topic.resourceSections.length > 0 && (
              <div className="mt-12 space-y-8">
                {topic.resourceSections.map((section, sIdx) => (
                  <div key={sIdx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <div className="w-2 h-8 bg-pink-500 rounded-full mr-4" />
                      {section.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {section.links.map((link, lIdx) => (
                        <a 
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-gray-50 border border-transparent rounded-2xl hover:border-pink-200 hover:bg-white hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center space-x-3 overflow-hidden">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                              <ResourceIcon type={link.type} size={20} />
                            </div>
                            <span className="font-bold text-gray-700 text-sm truncate group-hover:text-pink-600">
                              {link.title}
                            </span>
                          </div>
                          <ChevronRight size={18} className="text-gray-300 group-hover:text-pink-500 transition-transform group-hover:translate-x-1 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Exam Structure Table */}
          {topic.examStructure && (
            <section className="mt-12 bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart3 size={24} className="mr-2 text-pink-500" />
                {topic.examStructure.title}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">大問</th>
                      <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">出題内容</th>
                      <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">問題数</th>
                      <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">配点</th>
                      <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">小計</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {topic.examStructure.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-sm font-bold text-gray-900">{row.id}</td>
                        <td className="py-4 px-4 text-sm text-gray-700 whitespace-pre-line">{row.content}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{row.count}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{row.points}</td>
                        <td className="py-4 px-4 text-sm font-bold text-pink-600">{row.subtotal}</td>
                      </tr>
                    ))}
                    <tr className="bg-pink-50 font-black">
                      <td colSpan={2} className="py-4 px-4 text-sm text-pink-700 text-center">合　　　計</td>
                      <td className="py-4 px-4 text-sm text-pink-700">{topic.examStructure.totalCount}</td>
                      <td className="py-4 px-4 text-sm text-pink-700"></td>
                      <td className="py-4 px-4 text-sm text-pink-700">{topic.examStructure.totalPoints}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            {topic.id !== 'paiza' && (
              <button 
                onClick={() => setMode('practice')}
                className="flex-1 py-4 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200 flex items-center justify-center space-x-2"
              >
                <span>練習問題を解いてみる</span>
                <ChevronRight size={20} />
              </button>
            )}
            <a 
              href={topic.answerLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "py-4 bg-white border-2 border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2",
                topic.id === 'paiza' ? "w-full" : "flex-1"
              )}
            >
              <ExternalLink size={20} />
              <span>公式解答集・参考リンク</span>
            </a>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm"
            >
              <ExternalLink size={16} />
              <span>解答集を表示</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {showAnswers && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl overflow-hidden"
              >
                <h3 className="font-bold text-blue-800 mb-2">公式解答集・参考リンク</h3>
                <p className="text-blue-600 text-sm mb-4">
                  以下のリンクから公式の解答や解説を確認できます。
                </p>
                <a 
                  href={topic.answerLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-700 font-bold underline"
                >
                  <span>{topic.title} の解答集を開く</span>
                  <ExternalLink size={16} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {!showResult ? (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              {shuffledProblems.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-pink-500 uppercase tracking-wider">問題 {currentIdx + 1} / {shuffledProblems.length}</span>
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pink-500 transition-all duration-500" 
                        style={{ width: `${((currentIdx + 1) / shuffledProblems.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed whitespace-pre-wrap">
                    {shuffledProblems[currentIdx].question}
                  </h2>

                  <div className="space-y-4 mb-8">
                    {shuffledProblems[currentIdx].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={cn(
                          "w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between",
                          !isAnswered && "border-gray-100 hover:border-pink-200 hover:bg-pink-50",
                          isAnswered && idx === shuffledProblems[currentIdx].correctAnswer && "border-emerald-500 bg-emerald-50 text-emerald-700",
                          isAnswered && selectedOption === idx && idx !== shuffledProblems[currentIdx].correctAnswer && "border-red-500 bg-red-50 text-red-700",
                          isAnswered && selectedOption !== idx && idx !== shuffledProblems[currentIdx].correctAnswer && "border-gray-50 opacity-50"
                        )}
                      >
                        <span className="font-medium">{option}</span>
                        {isAnswered && idx === shuffledProblems[currentIdx].correctAnswer && <CheckCircle2 size={20} />}
                        {isAnswered && selectedOption === idx && idx !== shuffledProblems[currentIdx].correctAnswer && <AlertCircle size={20} />}
                      </button>
                    ))}
                  </div>

                  {isAnswered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gray-50 rounded-2xl mb-8"
                    >
                      <h4 className="font-bold text-gray-700 mb-2 flex items-center">
                        <AlertCircle size={18} className="mr-2 text-pink-500" />
                        解説
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {shuffledProblems[currentIdx].explanation || "解説は準備中です。"}
                      </p>
                    </motion.div>
                  )}

                  <button
                    onClick={nextProblem}
                    disabled={!isAnswered}
                    className={cn(
                      "w-full py-4 rounded-2xl font-bold transition-all shadow-lg",
                      isAnswered ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    {currentIdx + 1 === shuffledProblems.length ? "結果を見る" : "次の問題へ"}
                  </button>
                </>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">このカテゴリの問題は現在準備中です。</p>
                </div>
              )}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl text-center"
            >
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="text-pink-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">お疲れ様でした！</h2>
              <p className="text-gray-500 mb-8">練習問題が完了しました。</p>
              
              <div className="bg-gray-50 rounded-3xl p-8 mb-8">
                <div className="text-sm text-gray-400 uppercase font-bold mb-1">あなたのスコア</div>
                <div className="text-6xl font-black text-pink-500">
                  {score} <span className="text-2xl text-gray-400">/ {shuffledProblems.length}</span>
                </div>
              </div>

              {!user && (
                <p className="text-sm text-gray-400 mb-8">
                  ログインすると、学習履歴を保存できます。
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={restartPractice}
                  className="flex-1 py-4 bg-white border-2 border-pink-500 text-pink-500 rounded-2xl font-bold hover:bg-pink-50 transition-colors"
                >
                  もう一度解く
                </button>
                <Link 
                  to="/"
                  className="flex-1 py-4 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200"
                >
                  ホームに戻る
                </Link>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

const PaizaPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12">
        <Link to="/" className="text-pink-500 font-bold flex items-center mb-4 hover:underline">
          <ChevronRight className="rotate-180 mr-1" size={18} />
          ホームに戻る
        </Link>
        <h1 className="text-4xl font-black text-gray-900 mb-4">Paizaで掴む未来 🚀</h1>
        <p className="text-gray-500 text-lg">
          プログラミングスキルを磨き、目標のCランクを獲得しましょう。
        </p>
      </header>

      {/* C Rank Story */}
      <section className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-pink-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="mr-2 text-pink-500" size={28} />
          Cランク獲得ストーリー
        </h2>
        <div className="prose prose-pink max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">
            paizaのCランクレベルの問題であれば、どのような問題であっても要件通りのコードが書けるようになれるストーリーです。
          </p>
          <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 mb-8">
            <h3 className="text-pink-700 font-bold mb-3">このストーリーで身につくこと</h3>
            <p className="text-pink-600 text-sm leading-relaxed">
              STEP順に学習することにより、Python3を使用した標準入力、標準出力、算術演算、代入演算、論理演算、文字列処理、配列、条件分岐、簡単なソート、ループ処理について理解できるだけでなく、それらを使用したコードが書けるようになります。
              <br /><br />
              <span className="font-bold">※ 自身の学習状況に応じて、各ステップをスキップしても構いません。</span>
            </p>
          </div>
        </div>
      </section>

      {/* Learning Advice */}
      <section className="mb-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-[2.5rem] p-8 md:p-12 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Lightbulb className="mr-2 text-yellow-500" size={28} />
          Paiza学習のアドバイス
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center">
              <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-2" />
              知識と技術の相乗効果
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              「知識編」でAIやITパスポートの概念を学び、「技術編」で実際に手を動かしてコードを書く。この両輪を回すことで、理解が深まります。
              特に1年生は、この2つをつなぎ合わせることで、まずは<span className="font-bold text-blue-600">Dランククリア</span>を確実なものにしましょう。
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center">
              <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-2" />
              学年別の目標設定
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-12 font-bold text-blue-600">1年次:</span>
                <span>Dランククリア（標準入出力と基本演算の習得）</span>
              </li>
              <li className="flex items-center">
                <span className="w-12 font-bold text-blue-600">2年次:</span>
                <span>Cランククリア（条件分岐・ループ・配列の活用）</span>
              </li>
              <li className="flex items-center">
                <span className="w-12 font-bold text-blue-600">3年次:</span>
                <span>課題解決へ</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Flowchart Section */}
      <section className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <Activity className="mr-2 text-blue-500" size={28} />
          流れ図（フローチャート）の基本
        </h2>
        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop" 
                alt="流れ図の記号" 
                className="w-full h-auto rounded-xl shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "端子", desc: "開始・終了" },
                  { name: "処理", desc: "実行される処理" },
                  { name: "判断", desc: "条件分岐" },
                  { name: "入出力", desc: "データの入出力" },
                  { name: "ループ端", desc: "繰り返しの範囲" },
                  { name: "定義済み処理", desc: "サブルーチン" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 text-center">
                    <div className="font-bold text-gray-800 text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center">
            ※ プログラミングの論理構造を設計する際は、これらの標準的な記号を使用します。
          </p>
        </div>
      </section>

      {/* Recommended Courses */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <BookOpen className="mr-2 text-pink-500" size={28} />
          おすすめ講座
        </h2>

        {/* Priority Section */}
        <div className="mb-12 bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100">
          <h3 className="text-lg font-bold text-emerald-800 mb-6 flex items-center">
            <div className="w-1.5 h-5 bg-emerald-500 rounded-full mr-2" />
            技術面として最優先で学んでほしいもの
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Python体験版（テキスト）", url: "https://paiza.jp/works/python/trial/python-trial-1" },
              { title: "Python体験版（ドリル）言語＝Pythonを選択してね", url: "https://paiza.jp/works/mondai" },
            ].map((course, i) => (
              <a key={i} href={course.url} target="_blank" rel="noopener noreferrer" className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex justify-between items-center group">
                <span className="font-bold text-gray-700 group-hover:text-emerald-600">{course.title}</span>
                <ExternalLink size={18} className="text-gray-300 group-hover:text-emerald-400" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Category: Knowledge */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-700 px-2 border-l-4 border-pink-500">知識編</h3>
            <div className="grid gap-4">
              {[
                { title: "生成AI入門リテラシー編", url: "https://paiza.jp/works/generative-ai-literacy/trial" },
                { title: "生成AI組み込みアプリの企画開発基礎編", url: "https://paiza.jp/works/planning-and-development-of-generative-ai-embedded-applications/trial" },
                { title: "Python×AI・機械学習入門編", url: "https://paiza.jp/works/ai_ml/primer" },
                { title: "情報処理入門テクノロジー編（ITパスポート学習）", url: "https://paiza.jp/works/technology/primer" },
                { title: "情報処理入門ストラテジ編（ITパスポート学習）", url: "https://paiza.jp/works/strategy/primer" },
                { title: "情報処理入門マネジメント編（ITパスポート学習）", url: "https://paiza.jp/works/management/primer" },
              ].map((course, i) => (
                <a key={i} href={course.url} target="_blank" rel="noopener noreferrer" className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all flex justify-between items-center group">
                  <span className="font-bold text-gray-700 group-hover:text-pink-600">{course.title}</span>
                  <ExternalLink size={18} className="text-gray-300 group-hover:text-pink-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Category: Technical */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-700 px-2 border-l-4 border-purple-500">技術編</h3>
            <div className="grid gap-4">
              {[
                { title: "アルゴリズム入門編", url: "https://paiza.jp/works/algorithm/primer" },
                { title: "Webアプリ開発入門 PHP+MySQL編", url: "https://paiza.jp/works/webapplicationlamp/primer" },
                { title: "Cランク獲得ストーリー（Python）", url: "https://paiza.jp/works/python/trial/python-trial-1" },
              ].map((course, i) => (
                <a key={i} href={course.url} target="_blank" rel="noopener noreferrer" className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex justify-between items-center group">
                  <span className="font-bold text-gray-700 group-hover:text-purple-600">{course.title}</span>
                  <ExternalLink size={18} className="text-gray-300 group-hover:text-purple-400" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rubric */}
      <section className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white">
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <ShieldCheck className="mr-2 text-pink-400" size={28} />
          Paizaルーブリック
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs tracking-wider">評価</th>
                <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs tracking-wider">到達目標・状態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="py-6 px-4"><span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-lg font-black">S</span></td>
                <td className="py-6 px-4 font-medium">Cランクの問題を自力で、かつ効率的なアルゴリズムで解くことができる。</td>
              </tr>
              <tr>
                <td className="py-6 px-4"><span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg font-black">A</span></td>
                <td className="py-6 px-4 font-medium">Cランクの問題を時間をかければ自力で解くことができる。</td>
              </tr>
              <tr>
                <td className="py-6 px-4"><span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg font-black">B</span></td>
                <td className="py-6 px-4 font-medium">Dランクの問題は完璧に解け、Cランクの問題に挑戦し始めている。</td>
              </tr>
              <tr>
                <td className="py-6 px-4"><span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-lg font-black">C</span></td>
                <td className="py-6 px-4 font-medium">Dランクの問題をいくつか解くことができ、標準入出力の基本を理解している。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const Roadmap = () => {
  const [activeTab, setActiveTab] = useState(0);

  const roadmapData = {
    0: {
      title: "DF（デジタルフロンティア）コース",
      goal: "「学び→創る→価値に変える」経験の繰り返しが一生モノの基盤（ベース）になる",
      target: "Paiza Cランク / 全商情報処理1級 / ITパスポート",
      message: "テクノロジーを活用して社会の課題を解決する実践力を育成し、「AI時代を生き抜く力」を鍛えるコース。",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
      philosophy: [
        { label: "Learn", title: "学ぶ", description: "スキルという「材料」を集める", subtext: "基礎から応用まで、デジタルの道具箱を豊かにする" },
        { label: "Create", title: "創る", description: "自分なりの「答え」を形にする", subtext: "課題に対して、自分だけの視点でソリューションを構築する" },
        { label: "Transform", title: "価値に変える", description: "誰かへの「ギフト」として届ける", subtext: "創ったものを社会に放ち、誰かの喜びや助けに変える" }
      ],
      extraPracticeLinks: [
        { title: 'Python体験版（テキスト）', url: 'https://paiza.jp/works/python/trial/python-trial-1' },
        { title: 'Python体験版（ドリル）言語＝Pythonを選択してね', url: 'https://paiza.jp/works/mondai' },
        { title: '生成AI入門リテラシー編', url: 'https://paiza.jp/works/generative-ai-literacy/trial' },
        { title: '生成AI組み込みアプリの企画開発基礎編', url: 'https://paiza.jp/works/planning-and-development-of-generative-ai-embedded-applications/trial' },
        { title: 'アルゴリズム入門編', url: 'https://paiza.jp/works/algorithm/primer' },
        { title: 'Webアプリ開発入門 PHP+MySQL編', url: 'https://paiza.jp/works/webapplicationlamp/primer' },
        { title: 'Dランクストーリー', url: 'https://paiza.jp/pages/works/stories/drank/' }
      ],
      externalLinks: [
        {
          label: "R7年度3学年アプリ",
          url: "https://sites.google.com/yashima.jp/josho-dx/josho-dx-home"
        }
      ],
      actionGuidelines: [
        {
          title: "学び (Learn)",
          questions: [
            "私は、道具（デジタル）を自在に操れているか？",
            "これをデジタルに「置換」したら、何が変わるか？",
            "私は、自ら解決する「学びの体力」を持っているか？"
          ]
        },
        {
          title: "創る (Create)",
          questions: [
            "私は、なぜこれを解決したいのか？",
            "私なら、デジタルでどう変えるか？",
            "私だけの視点は、どこにあるのか？",
            "ターゲットを定め、私の考えを「仕様書」に刻んでいるか？"
          ]
        },
        {
          title: "価値に変える (Transform)",
          questions: [
            "私の創ったものは、誰かのための「ギフト」になっているか？",
            "私は今、「求められている私」を実感できているか？",
            "次の価値を生むために、私は再び「学び」へと向かっているか？"
          ]
        }
      ],
      schedule: [
        { period: "1年次：Will", content: "「好き」を見つける・検定学習・AI活用" },
        { period: "2年次：Bold", content: "「冒険」する・プロジェクト活動・技術習得" },
        { period: "3年次：Change", content: "「価値」を届ける・ポートフォリオ作成・社会実装" },
      ],
      practiceTopicIds: ['info-basics', 'info-processing']
    },
    1: {
      title: "1年生：商業人としての土台作り",
      goal: "9月情報基礎検定（CBT 他校で受験）\n1月情報処理検定（筆記・実技 本校で受験）\nプログラミング検定（PBT 本校で受験）\nPaiza Dランククリア",
      target: undefined,
      message: "知識と技術をつなぎ合わせてDランクを突破しよう！合格体験が自信になる",
      schedule: [
        { period: "4〜8月", content: "情報基礎分野・AI活用・情報処理の実技学習" },
        { period: "9月", content: "第75回「情報基礎（CBT）」に挑戦！（他校で受験）", isExam: true },
        { period: "10〜12月", content: "情報処理・プログラミングの基礎学習\n著作権・AIの利活用について学ぶ" },
        { period: "1月", content: "第77回「情報処理検定」（実技PBT・筆記CBT）に挑戦！", isExam: true },
      ],
      practiceTopicIds: ['info-basics', 'info-processing']
    },
    2: {
      title: "2年生：スキルの拡充と深化",
      goal: "情報１級取得を目指す\nITパスポート試験合格（CBT 随時）",
      target: undefined,
      message: "高度な情報処理能力を身につけ、ITパスポート合格を勝ち取ろう",
      schedule: [
        { period: "4〜6月", content: "１級の用語・関連知識・DB・アルゴリズムの学習" },
        { period: "7〜9月", content: "第75回検定に向けて過去問演習" },
        { period: "9月", content: "第75回「1級（ビジネス情報）」に挑戦！", isExam: true },
        { period: "10〜12月", content: "ITパスポート試験対策（過去問演習）" },
        { period: "1月", content: "ITパスポート試験に挑戦！（CBT方式で随時受験）", isExam: true },
      ],
      practiceTopicIds: ['biz-info-1']
    },
    3: {
      title: "3年生：集大成と未来への架け橋",
      goal: "ガクチカを語れる状態へ\nITパスポート未取得者はリベンジ合格",
      target: undefined,
      message: "高校生活の集大成！「学びの資産」を形にする（検定は希望制）",
      schedule: [
        { period: "4〜6月", content: "DX仕様書作成・アプリ作成・ITパスポート対策" },
        { period: "7〜9月", content: "アプリ成果発表・ITパスポート受験" },
        { period: "10〜12月", content: "卒業ポートフォリオ作成\nガクチカを固める" },
        { period: "1月", content: "進路決定後のスキルアップ・資格取得", isExam: true },
      ],
      practiceTopicIds: ['biz-info-1', 'prog-1', 'it-passport']
    },
    4: {
      title: "Paiza：プログラミングスキルを磨く",
      goal: "Dランク獲得を目指す（1年生終了時まで）\nCランク獲得を目指す（2年生終了時まで）\n課題解決へ（3年生）",
      target: "目標：Cランク以上",
      message: "「技術編」で実際に手を動かしてコードを書く。この両輪を回すことで、理解が深まります。",
      schedule: [
        { period: "1年次", content: "Dランククリア（標準入出力と基本演算の習得）" },
        { period: "2年次", content: "Cランククリア（条件分岐・ループ・配列の活用）" },
        { period: "3年次", content: "課題解決へ" },
      ],
      externalLinks: [
        {
          label: "Paizaで学習を始める",
          url: "https://paiza.jp/works"
        },
        {
          label: "Cランク獲得ストーリー",
          url: "https://paiza.jp/pages/works/stories/crank_java"
        },
        {
          label: "R7年度3学年アプリ",
          url: "https://sites.google.com/yashima.jp/josho-dx/josho-dx-home"
        }
      ],
      showPaizaCourses: true,
      extraPracticeLinks: [
        { title: 'Python体験版（テキスト）', url: 'https://paiza.jp/works/python/trial/python-trial-1' },
        { title: 'Python体験版（ドリル）言語＝Pythonを選択してね', url: 'https://paiza.jp/works/mondai' },
        { title: '生成AI入門リテラシー編', url: 'https://paiza.jp/works/generative-ai-literacy/trial' },
        { title: '生成AI組み込みアプリの企画開発基礎編', url: 'https://paiza.jp/works/planning-and-development-of-generative-ai-embedded-applications/trial' },
        { title: 'アルゴリズム入門編', url: 'https://paiza.jp/works/algorithm/primer' },
        { title: 'Webアプリ開発入門 PHP+MySQL編', url: 'https://paiza.jp/works/webapplicationlamp/primer' },
        { title: 'Dランクストーリー', url: 'https://paiza.jp/pages/works/stories/drank/' }
      ],
      practiceTopicIds: []
    },
    5: {
      title: "ITパスポート試験対策",
      goal: "ITを利活用するすべての社会人・学生が備えておくべき基礎知識の習得",
      target: "合格基準点：600点 / 1000点",
      message: "ITパスポートドットコムの「過去問道場」は最強の学習ツールです。100時間の学習時間を確保しましょう。",
      schedule: [
        { period: "STEP 01", content: "用語の理解とインプット。ストラテジ・マネジメント・テクノロジーの3分野を把握。" },
        { period: "STEP 02", content: "過去問演習（分野別）。過去問道場で正解率80%を目指す。" },
        { period: "STEP 03", content: "模擬試験と総仕上げ。CBTの操作感に慣れ、時間配分を身につける。" },
      ],
      externalLinks: [
        {
          label: "ITパスポートドットコムで学習",
          url: "https://www.itpassportsiken.com/"
        },
        {
          label: "ITパスポート試験の取り組み方 合格者から学べ！",
          url: "https://sites.google.com/yashima.jp/itpassportsikenjosho/ITpass"
        }
      ],
      extraPracticeLinks: [
        { title: 'Python体験版（テキスト）', url: 'https://paiza.jp/works/python/trial/python-trial-1' },
        { title: 'Python体験版（ドリル）言語＝Pythonを選択してね', url: 'https://paiza.jp/works/mondai' },
        { title: '情報処理入門テクノロジー編', url: 'https://paiza.jp/works/technology/primer' },
        { title: '情報処理入門ストラテジ編', url: 'https://paiza.jp/works/strategy/primer' },
        { title: '情報処理入門マネジメント編', url: 'https://paiza.jp/works/management/primer' }
      ],
      practiceTopicIds: ['it-passport']
    }
  };

  const current = roadmapData[activeTab as keyof typeof roadmapData] as any;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4">学年・コース別マップ</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          1年生から3年生まで、学年ごとに明確な目標を設定して「学びの資産」を積み上げていきましょう。<br />
          自分の学年やコースを選んで、当面のことを確認してみよう！
        </p>
      </div>

      {/* Grade Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {[
          { id: 0, label: "DFコース", icon: "🚀" },
          { id: 1, label: "1年生", icon: "🌱" },
          { id: 2, label: "2年生", icon: "📈" },
          { id: 3, label: "3年生", icon: "🏆" },
          { id: 4, label: "Paiza", icon: "💻" },
          { id: 5, label: "ITパスポート", icon: "🛡️" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center w-32 h-32 rounded-[32px] transition-all border-2",
              activeTab === tab.id 
                ? "bg-pink-500 border-pink-500 text-white shadow-xl shadow-pink-200 scale-105" 
                : "bg-white border-gray-100 text-gray-400 hover:border-pink-200 hover:text-pink-400"
            )}
          >
            <span className="text-3xl mb-2">{tab.icon}</span>
            <span className="font-bold">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Roadmap Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 rounded-[40px] p-8 md:p-12 border border-yellow-100 shadow-sm mb-16"
      >
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="inline-block px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full text-sm font-bold mb-4">
              {activeTab === 0 ? "DFコース" : activeTab === 4 ? "プログラミング" : activeTab === 5 ? "国家試験" : `${activeTab}年生`}
            </div>

            {activeTab === 0 && (
              <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-3xl shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                    <Presentation size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-blue-900">DFコースClassroom</h3>
                </div>
                <p className="text-blue-700 text-sm mb-4 leading-relaxed">
                  生徒が課題を見たり提出することができる部屋だ。
                </p>
                <a 
                  href="https://classroom.google.com/c/ODU3OTYxOTgxNzU4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                >
                  <span>Classroomを開く</span>
                  <ExternalLink size={18} className="ml-2" />
                </a>
              </div>
            )}

            <h2 className="text-3xl font-bold text-gray-900 mb-6">{current.title}</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">目標</div>
                  <div className="text-lg font-bold text-gray-800 whitespace-pre-line">{current.goal}</div>
                </div>
              </div>
              {current.target && (
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                      {activeTab === 4 ? "合格基準" : "取得を目指す級"}
                    </div>
                    <div className="text-lg font-bold text-gray-800">{current.target}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-pink-50 rounded-3xl border border-pink-100 italic text-pink-700">
              "{current.message}"
              {current.externalLinks && (
                <div className="mt-4 not-italic flex flex-wrap gap-3">
                  {current.externalLinks.map((link: any, idx: number) => (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={14} className="ml-2" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {current.image && (
              <div className="mt-8 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm bg-white">
                <img 
                  src={current.image} 
                  alt={current.title} 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {current.philosophy && (
              <div className="mt-8 p-8 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-white shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="w-1.5 h-6 bg-pink-500 rounded-full mr-3" />
                  コースフィロソフィー
                </h3>
                <div className="space-y-8 relative">
                  {/* Vertical line connecting the steps */}
                  <div className="absolute left-12 top-12 bottom-12 w-0.5 bg-pink-100 hidden md:block" />
                  
                  {current.philosophy.map((p: any, idx: number) => (
                    <div key={idx} className="relative flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                      <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center text-pink-600 shrink-0 border-4 border-pink-50 shadow-sm z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{p.label}</span>
                        <span className="text-xl font-black">{p.title}</span>
                      </div>
                      <div className="flex-1 text-center md:text-left pt-2">
                        <div className="text-xl font-black text-gray-800 mb-2">{p.description}</div>
                        <div className="text-sm text-gray-500 leading-relaxed">{p.subtext}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 pt-8 border-t border-pink-100 text-center">
                  <div className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-3xl font-black shadow-xl shadow-pink-200 mb-6">
                    {current.goal}
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-pink-600 font-bold italic">
                    <Rocket size={18} />
                    <span>価値を届けた先に次の『知りたい』が生まれる</span>
                  </div>
                </div>
              </div>
            )}

            {current.actionGuidelines && (
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <div className="w-1.5 h-6 bg-pink-500 rounded-full mr-3" />
                  DFコース行動指針
                </h3>
                <div className="grid gap-4">
                  {current.actionGuidelines.map((guideline: any, idx: number) => (
                    <div key={idx} className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm">
                      <h4 className="font-black text-pink-600 mb-3 flex items-center">
                        <span className="text-lg mr-2">●</span>
                        {guideline.title}
                      </h4>
                      <ul className="space-y-2">
                        {guideline.questions.map((q: string, qIdx: number) => (
                          <li key={qIdx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-pink-400 mr-2">Q.</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <History className="mr-2 text-pink-500" size={24} />
              令和8年度学習スケジュール
            </h3>
            <div className="space-y-4">
              {current.schedule.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-bold text-gray-400">{item.period}</div>
                  <div className={cn(
                    "flex-1 p-4 rounded-2xl border flex items-center justify-between",
                    item.isExam ? "bg-pink-500 text-white border-pink-500" : "bg-gray-50 text-gray-700 border-gray-100"
                  )}>
                    <span className="font-medium text-sm whitespace-pre-line">{item.content}</span>
                    {item.isExam && <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full uppercase">試験</span>}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-400 leading-relaxed">
              ※スケジュールは令和8年度の試験日程を基準にしています。学校の授業進度に合わせて調整しましょう。
            </p>

            {current.showPaizaCourses && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="mr-2 text-pink-500" size={20} />
                  Paizaのおすすめ講座
                </h3>
                <div className="grid gap-3">
                  {TOPICS.find(t => t.id === 'paiza')?.resourceSections?.flatMap(s => s.links).map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                          <ExternalLink size={16} />
                        </div>
                        <span className="font-bold text-gray-700 text-sm group-hover:text-pink-600">
                          {link.title}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-pink-500 transition-transform group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {current.extraPracticeLinks?.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <ExternalLink className="mr-2 text-pink-500" size={20} />
                  関連学習リソース
                </h3>
                <div className="grid gap-3">
                  {current.extraPracticeLinks.map((link: any, idx: number) => (
                    <a 
                      key={`extra-${idx}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-pink-200 hover:bg-pink-50/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                          <ExternalLink size={16} />
                        </div>
                        <span className="font-bold text-gray-700 text-sm group-hover:text-pink-600">
                          {link.title}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-pink-500 transition-transform group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Practice Topics Section */}
        {current.practiceTopicIds?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-yellow-200">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="w-1.5 h-6 bg-pink-500 rounded-full mr-3" />
              このレベルで学習する検定・分野
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {current.practiceTopicIds.map((topicId: string, idx: number) => {
                const topic = TOPICS.find(t => t.id === topicId);
                if (!topic) return null;
                return (
                  <motion.div
                    key={topicId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <TopicCard topic={topic} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>

      {/* General Info Section */}
      <div className="space-y-16">
        <section>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white">
              <BookOpen size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">全商情報処理検定とは</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "主催", content: "公益財団法人 全国商業高等学校協会（全商）が実施する公認資格" },
              { title: "対象分野", content: "ビジネス情報部門・プログラミング部門の2部門で情報活用能力を評価" },
              { title: "資格の価値", content: "高校生・専門学校生に広く認知された情報系資格。就職・進学で評価される" },
              { title: "試験頻度", content: "情報処理は9月・1月、情報基礎は9月・11月（再受験向け）・1月" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100">
                <div className="text-xs text-gray-400 font-bold mb-2 uppercase">{item.title}</div>
                <div className="text-sm text-gray-700 leading-relaxed">{item.content}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">受験級のレベル</h2>
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl mb-8 text-blue-800 text-sm leading-relaxed">
            <p className="font-bold mb-2">【合格・級の判定について】</p>
            <ul className="list-disc list-inside space-y-1">
              <li>１級：ビジネス情報部門もしくはプログラミング部門のいずれか１つを獲得すれば「１級」として認められます。</li>
              <li>※「情報処理」は、1回の申し込みで筆記と実技の両方を受験する試験です。</li>
              <li>※情報処理検定とビジネス情報部門１級は別資格ですので注意してください。</li>
            </ul>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                level: "1級", 
                desc: "高度な情報処理能力・プログラミング・データベース設計が問われる最上位級",
                items: ["データベース設計・SQL", "ネットワーク基礎", "プログラミング（BASIC/Java）", "アルゴリズム"]
              },
              { 
                level: "2級", 
                desc: "表計算・文書作成・基本的なデータ処理など実務のスキルを問う中級レベル",
                items: ["表計算（関数・グラフ）", "文書作成・書式設定", "データ処理基礎", "ファイル操作"]
              },
              { 
                level: "3級", 
                desc: "コンピュータの基本操作・情報リテラシーを問う入門レベル",
                items: ["コンピュータ基礎知識", "キーボード入力", "ファイル管理基礎", "インターネット基礎"]
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="text-2xl font-black text-pink-500 mb-4">{item.level}</div>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">{item.desc}</p>
                <ul className="space-y-2">
                  {item.items.map((li, i) => (
                    <li key={i} className="flex items-center text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-pink-300 rounded-full mr-2" />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-900 rounded-[40px] p-8 md:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">試験情報</h2>
              <p className="text-gray-400 mb-8">令和8年度（2026年度）情報処理検定試験の公式日程・受験料・試験形式です。</p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-xl">PBT</div>
                  <div>
                    <div className="font-bold">PBT方式</div>
                    <div className="text-sm text-gray-400">全国統一の紙の問題・ソフトウェア用紙で実施する従来型</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-xl">CBT</div>
                  <div>
                    <div className="font-bold">CBT方式</div>
                    <div className="text-sm text-gray-400">
                      他校に行き受験をします。<br />
                      受験の日時は決まり次第連絡をします。<br />
                      同期間内で複数回の受験はできません。回数を変えての受験は可能。
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">受験料（消費税含む）</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-400">1級（ビジネス情報・プログラミング）</span>
                  <span className="font-bold">各2,100円</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-400">2級（ビジネス情報・プログラミング）</span>
                  <span className="font-bold">各1,800円</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">情報処理・情報基礎</span>
                  <span className="font-bold">各1,800円</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">合格・級の判定について</h2>
          <div className="bg-pink-50 rounded-[32px] p-8 border border-pink-100">
            <p className="text-sm text-pink-700 mb-6 font-medium">
              ※「情報処理」は、1回の申し込みで筆記と実技の両方を受験する試験です。
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "「情報処理」または「情報基礎」いずれか1つ合格", result: "3級認定" },
                { label: "「情報処理」と「情報基礎」の両方合格", result: "2級認定" },
                { label: "1〜2級（PBT）で合格", result: "1〜2級認定" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="text-xs text-gray-400 mb-2">{item.label}</div>
                  <div className="text-lg font-black text-pink-600">{item.result}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">令和8年度試験日程一覧</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase">回数</th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase">級・部門</th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase">方法</th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase">検定日</th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase">申込期間</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { id: "第75回", level: "1〜2級", method: "PBT", date: "令和8年9月27日（日）", period: "6/24（水）〜7/7（火）" },
                  { id: "第75回", level: "情報処理（実技）", method: "PBT", date: "令和8年9月27日（日）", period: "—" },
                  { id: "第75回", level: "情報処理（筆記）", method: "CBT", date: "9/5（土）〜10/25（日）", period: "—" },
                  { id: "第75回", level: "情報基礎", method: "CBT", date: "9/5（土）〜10/25（日）", period: "—" },
                  { id: "第76回", level: "情報基礎", method: "CBT", date: "11/7（土）〜12/27（日）", period: "10/28（水）〜11/11（水）" },
                  { id: "第77回", level: "1〜2級", method: "PBT", date: "令和9年1月31日（日）", period: "11/16（月）〜11/25（水）" },
                  { id: "第77回", level: "情報処理（実技）", method: "PBT", date: "令和9年1月31日（日）", period: "—" },
                  { id: "第77回", level: "情報処理（筆記）", method: "CBT", date: "令和9年1/5（火）〜2/7（日）", period: "12/15（火）〜1/10（日）" },
                  { id: "第77回", level: "情報基礎", method: "CBT", date: "令和9年1/5（火）〜2/7（日）", period: "12/15（火）〜1/10（日）" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-bold text-gray-900">{row.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{row.level}</td>
                    <td className="py-4 px-4">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        row.method === "PBT" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                      )}>
                        {row.method}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{row.date}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{row.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 p-6 bg-gray-50 rounded-2xl text-[10px] text-gray-400 flex items-center">
            <ExternalLink size={14} className="mr-2" />
            出典：公益財団法人 全国商業高等学校協会 公式サイト（令和8年度情報）
          </div>
        </section>
      </div>
    </div>
  );
};

const HistoryPage = ({ user }: { user: FirebaseUser | null }) => {
  const [history, setHistory] = useState<PracticeHistory[]>([]);
  const [globalHistory, setGlobalHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'history'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PracticeHistory));
      setHistory(docs);
      setLoading(false);
    });

    // Global history for graph
    const qGlobal = query(collection(db, 'history'), orderBy('timestamp', 'asc'));
    const unsubGlobal = onSnapshot(qGlobal, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setGlobalHistory(data);
    });

    return () => {
      unsub();
      unsubGlobal();
    };
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <LogIn size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
        <p className="text-gray-500 mb-8">学習履歴を確認するには、Googleアカウントでログインしてください。</p>
        <button 
          onClick={signInWithGoogle}
          className="px-8 py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg"
        >
          ログインする
        </button>
      </div>
    );
  }

  // Calculate Crowns per problem
  const problemStats = history.reduce((acc, curr) => {
    if (!acc[curr.problemId]) acc[curr.problemId] = [];
    acc[curr.problemId].push(curr);
    return acc;
  }, {} as Record<string, PracticeHistory[]>);

  const masteryList = Object.entries(problemStats).map(([problemId, attempts]) => {
    const sorted = (attempts as PracticeHistory[]).slice().sort((a, b) => (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0));
    const last = sorted[0];
    const secondLast = sorted[1];
    
    let crown: 'gold' | 'silver' | 'bronze' = 'bronze';
    if (last.isCorrect) {
      if (secondLast && secondLast.isCorrect) {
        crown = 'gold';
      } else {
        crown = 'silver';
      }
    }

    // Find problem text
    let problemText = "不明な問題";
    let topicTitle = "不明なトピック";
    Object.entries(PROBLEMS).forEach(([topicId, problems]) => {
      const p = (problems as Problem[]).find(p => p.id === problemId);
      if (p) {
        problemText = p.question;
        topicTitle = TOPICS.find(t => t.id === topicId)?.title || topicTitle;
      }
    });

    return { problemId, crown, lastAttempt: last.timestamp, problemText, topicTitle };
  });

  // Individual Graph Data (Daily total problems solved by the user)
  const userChartData = history.reduce((acc: any[], curr) => {
    if (!curr.timestamp) return acc;
    const date = curr.timestamp.toDate().toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
    const existing = acc.find(d => d.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []).slice(-14);

  // Graph Data (Daily total problems solved by everyone)
  const chartData = globalHistory.reduce((acc: any[], curr) => {
    if (!curr.timestamp) return acc;
    const date = curr.timestamp.toDate().toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
    const existing = acc.find(d => d.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []).slice(-14);

  // Topic Mastery Data
  const topicMasteryData = TOPICS.map(topic => {
    const topicProblems = masteryList.filter(m => m.topicTitle === topic.title);
    const total = topicProblems.length;
    const gold = topicProblems.filter(m => m.crown === 'gold').length;
    const silver = topicProblems.filter(m => m.crown === 'silver').length;
    const bronze = topicProblems.filter(m => m.crown === 'bronze').length;
    
    return {
      name: topic.title,
      "完全習得": gold,
      "リーチ": silver,
      "要復習": bronze,
      total
    };
  }).filter(t => t.total > 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">学習履歴</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <History size={16} />
          <span>最新の学習状況を表示しています</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Individual Stats Graph */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-pink-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="mr-2 text-pink-500" size={24} />
            あなたの学習状況
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userChartData}>
                <defs>
                  <linearGradient id="colorUserCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorUserCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Topic Mastery Graph */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Trophy className="mr-2 text-yellow-500" size={24} />
            分野別の習得状況
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicMasteryData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#4b5563', fontWeight: 'bold'}}
                  width={80}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Bar dataKey="完全習得" stackId="a" fill="#FCD34D" radius={[0, 0, 0, 0]} />
                <Bar dataKey="リーチ" stackId="a" fill="#93C5FD" radius={[0, 0, 0, 0]} />
                <Bar dataKey="要復習" stackId="a" fill="#E5E7EB" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Global Stats Graph */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="mr-2 text-gray-400" size={24} />
            みんなの学習状況
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGlobalCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#9ca3af" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="count" stroke="#9ca3af" strokeWidth={3} fillOpacity={1} fill="url(#colorGlobalCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Mastery Crowns */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Trophy className="mr-2 text-yellow-500" size={24} />
            習得状況（王冠）
          </h2>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-3xl animate-pulse" />)}
            </div>
          ) : masteryList.length > 0 ? (
            <div className="grid gap-4">
              {masteryList.map((item) => (
                <div key={item.problemId} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4 overflow-hidden">
                    <div className="shrink-0">
                      {item.crown === 'gold' && <span title="完全習得" className="text-3xl">👑</span>}
                      {item.crown === 'silver' && <span title="リーチ" className="text-3xl">🥈</span>}
                      {item.crown === 'bronze' && <span title="要復習" className="text-3xl">🥉</span>}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-bold text-pink-500 uppercase mb-1">{item.topicTitle}</div>
                      <h3 className="font-bold text-gray-800 truncate text-sm">{item.problemText}</h3>
                      <p className="text-[10px] text-gray-400 mt-1">
                        最終回答: {item.lastAttempt?.toDate().toLocaleString('ja-JP')}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 ml-4">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold",
                      item.crown === 'gold' ? "bg-yellow-100 text-yellow-700" :
                      item.crown === 'silver' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                    )}>
                      {item.crown === 'gold' ? "完全習得" : item.crown === 'silver' ? "リーチ" : "要復習"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400">まだ習得した問題がありません。</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <History className="mr-2 text-pink-500" size={24} />
            最近の回答
          </h2>
          <div className="space-y-4">
            {history.slice(0, 10).map((item) => {
              const topic = TOPICS.find(t => t.id === item.topicId);
              return (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", item.isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600")}>
                      {item.isCorrect ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-700 truncate w-32">{topic?.title}</div>
                      <div className="text-[10px] text-gray-400">{item.timestamp?.toDate().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                  <div className={cn("text-xs font-black", item.isCorrect ? "text-emerald-500" : "text-red-500")}>
                    {item.isCorrect ? "正解" : "不正解"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubmissionStatusPage = () => {
  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1tnf1npd9mnIWnyVS2NoCiSySDgGAwhJmRwtExK-CQyY/edit?gid=149574598#gid=149574598";
  const previewUrl = "https://docs.google.com/spreadsheets/d/1tnf1npd9mnIWnyVS2NoCiSySDgGAwhJmRwtExK-CQyY/preview?gid=149574598";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-8">
        <Link to="/" className="text-pink-500 font-bold flex items-center mb-4 hover:underline">
          <ChevronRight className="rotate-180 mr-1" size={18} />
          ホームに戻る
        </Link>
        <h1 className="text-4xl font-black text-gray-900 mb-4">提出状況 📊</h1>
        <p className="text-gray-500 text-lg">
          最新の提出状況をリアルタイムで確認できます。
        </p>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-pink-100 shadow-xl overflow-hidden h-[800px] relative">
        <iframe 
          src={previewUrl}
          className="w-full h-full border-none"
          title="提出状況"
        />
        <div className="absolute bottom-6 right-6">
          <a 
            href={spreadsheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 shadow-lg transition-all"
          >
            <ExternalLink size={18} />
            <span>別タブで開く</span>
          </a>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start space-x-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
          <Activity size={20} />
        </div>
        <div>
          <h3 className="font-bold text-blue-900 mb-1">アクセスを速くするために</h3>
          <p className="text-sm text-blue-700 leading-relaxed">
            このページをブラウザの「お気に入り」や「ブックマーク」に登録しておくと、次回からワンクリックで提出状況を確認できます。
            また、アプリの「共有」ボタンからリンクをコピーして、クラスのチャットなどで共有することも可能です。
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-16 h-16 bg-pink-500 rounded-2xl shadow-xl shadow-pink-200"
        />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-pink-100 selection:text-pink-600">
        <Navbar user={user} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/status" element={<SubmissionStatusPage />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/topic/:id" element={<TopicPage user={user} />} />
            <Route path="/paiza" element={<PaizaPage />} />
            <Route path="/history" element={<HistoryPage user={user} />} />
          </Routes>
        </main>
        
        <footer className="mt-24 border-t border-gray-100 py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white">
                <BookOpen size={18} />
              </div>
              <span className="text-lg font-bold text-gray-800">女子商 ITラボ</span>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; 2026 女子商 ITラボ. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

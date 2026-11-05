import React from 'react';
import { Volume2, VolumeX, Sparkles, Map, Compass, Trophy, Award, Gamepad2, Plus, Star } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { ASSETS } from '../data/assets';

interface NavbarProps {
  currentTab: 'home' | 'units' | 'games' | 'assessments' | 'achievements';
  setCurrentTab: (tab: 'home' | 'units' | 'games' | 'assessments' | 'achievements') => void;
  xp: number;
  coins: number;
  studentName: string;
  completedLessonsCount: number;
  onOpenAddLesson: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  xp,
  coins,
  studentName,
  completedLessonsCount,
  onOpenAddLesson,
}) => {
  const [soundOn, setSoundOn] = React.useState(sounds.isEnabled());

  const handleToggleSound = () => {
    const next = sounds.toggleSound();
    setSoundOn(next);
    if (next) sounds.playClick();
  };

  const navItems = [
    { id: 'home', label: 'عالم الرحلة', icon: Map, color: 'from-amber-400 to-orange-500' },
    { id: 'units', label: 'جزر التعلم', icon: Compass, color: 'from-emerald-400 to-teal-500' },
    { id: 'games', label: 'عالم المغامرات', icon: Gamepad2, color: 'from-pink-400 to-rose-500' },
    { id: 'assessments', label: 'حلبة التحديات', icon: Trophy, color: 'from-sky-400 to-blue-500' },
    { id: 'achievements', label: 'خزانة الأوسمة', icon: Award, color: 'from-purple-400 to-indigo-500' },
  ] as const;

  return (
    <header className="sticky top-2 z-50 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-amber-300 shadow-[0_8px_0_#d97706,0_14px_25px_rgba(0,0,0,0.15)] px-3 sm:px-5 py-2.5 sm:py-3 transition-all">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Cartoon Brand & Student Avatar Lockup */}
          <button
            onClick={() => {
              sounds.playClick();
              setCurrentTab('home');
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group text-right focus:outline-none"
          >
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-amber-100 group-hover:scale-105 transition-transform shrink-0">
              <img
                src={ASSETS.mentorGuide}
                alt="مرشد الرحلة أنس"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[9px] font-black border border-white">
                ★
              </span>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black text-amber-950 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                  رحلتي الإسلامية
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 bg-amber-400/30 text-amber-900 font-extrabold text-[10px] rounded-full border border-amber-300">
                  الصف 6 · ف1
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500 block mt-0.5">
                البطل: <span className="text-emerald-700 font-black">{studentName}</span>
              </span>
            </div>
          </button>

          {/* Zone 2: 3D Gamified Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-amber-50/80 rounded-2xl border-2 border-amber-200/70">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sounds.playClick();
                    setCurrentTab(item.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-amber-950 shadow-[0_3px_0_#b45309] border border-amber-200'
                      : 'text-slate-600 hover:text-amber-950 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-950' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Game HUD Stats (Coins, Stars, XP, Sound) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Coins bubble */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-300 rounded-2xl shadow-xs">
              <span className="text-base sm:text-lg animate-bounce">🪙</span>
              <span className="text-xs sm:text-sm font-black text-amber-950 tabular-nums">
                {coins}
              </span>
            </div>

            {/* Stars / Completed bubble */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-b from-emerald-100 to-emerald-200 border-2 border-emerald-300 rounded-2xl shadow-xs">
              <Star className="w-4 h-4 text-emerald-600 fill-emerald-500" />
              <span className="text-xs sm:text-sm font-black text-emerald-950 tabular-nums">
                {completedLessonsCount} / 20 محطة
              </span>
            </div>

            {/* XP Level badge */}
            <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-gradient-to-b from-sky-100 to-sky-200 border-2 border-sky-300 rounded-2xl shadow-xs">
              <span className="text-xs font-black text-sky-900 tabular-nums">
                {xp} XP
              </span>
            </div>

            {/* Sound toggle */}
            <button
              onClick={handleToggleSound}
              title={soundOn ? 'كتم المؤثرات الصوتية' : 'تفعيل المؤثرات الصوتية'}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-white flex items-center justify-center text-slate-700 hover:text-emerald-600 transition-colors shadow-xs cursor-pointer"
            >
              {soundOn ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />}
            </button>

            {/* Add lesson button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAddLesson();
              }}
              title="إضافة درس جديد من كتاب المنهج"
              className="game-btn-green px-3 py-2 text-xs font-black text-white rounded-2xl hidden sm:flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>إضافة درس</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around pt-2.5 mt-2 border-t border-amber-200/80 gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playClick();
                  setCurrentTab(item.id);
                }}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[11px] font-black cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-amber-950 bg-amber-300/80'
                    : 'text-slate-600 hover:text-amber-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

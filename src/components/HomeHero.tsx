import React from 'react';
import {
  Sparkles,
  Star,
  PlayCircle,
  Compass,
  Gamepad2,
  Trophy,
  Award,
  PlusCircle,
  ChevronLeft,
  CheckCircle2,
  Flame,
  ArrowRight
} from 'lucide-react';
import { ASSETS } from '../data/assets';
import { MentorGuide } from './MentorGuide';
import { sounds } from '../utils/soundEffects';

interface HomeHeroProps {
  onNavigate: (tab: 'units' | 'games' | 'assessments' | 'achievements') => void;
  onOpenAddLesson: () => void;
  onSelectUnit?: (unitId: string) => void;
  studentName: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  xp: number;
  coins: number;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onNavigate,
  onOpenAddLesson,
  studentName,
  completedLessonsCount,
  totalLessonsCount,
  xp,
  coins,
}) => {
  const progressPercent = Math.round((completedLessonsCount / Math.max(1, totalLessonsCount)) * 100);

  // 3 Educational Islands Data
  const islands = [
    {
      id: 'unit-1',
      number: 1,
      name: 'الوحدة الأولى: الرَّحْمَةُ وَالرِّفْقُ',
      badge: 'المقرر الرسمي الكامل (7 دروس)',
      image: ASSETS.islandTawhid,
      lessonsSnippet: 'اليوم الآخر · سورة المعارج · التجويد · الحج · حنين · أبو هريرة · الرفق بالحيوان',
      color: 'from-amber-400 to-emerald-500',
      btnColor: 'game-btn-green',
      shadowColor: '#047857',
      lessonsCount: 7,
      stars: 3,
    },
    {
      id: 'unit-2',
      number: 2,
      name: 'جزيرة العبادة والأخلاق',
      badge: 'حديقة الفضائل والبر',
      image: ASSETS.islandWorship,
      lessonsSnippet: 'صلاة الجمعة والعيدين · الصدق والأمانة · بر الوالدين',
      color: 'from-emerald-400 to-teal-500',
      btnColor: 'game-btn-gold',
      shadowColor: '#b45309',
      lessonsCount: 3,
      stars: 3,
    },
    {
      id: 'unit-3',
      number: 3,
      name: 'جزيرة السيرة والمغامرات',
      badge: 'واحة الهجرة النبوية',
      image: ASSETS.islandSira,
      lessonsSnippet: 'الهجرة وغار ثور · أبو بكر الصديق · أم سلمة الحكيمة',
      color: 'from-orange-400 to-amber-600',
      btnColor: 'game-btn-blue',
      shadowColor: '#0369a1',
      lessonsCount: 3,
      stars: 3,
    },
  ];

  return (
    <div className="space-y-10 pb-16 text-right">
      {/* ================= 1. SKY WORLD HERO STAGE ================= */}
      <section className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden border-4 border-white shadow-[0_16px_0_#93c5fd,0_25px_35px_rgba(0,0,0,0.15)] bg-sky-200">
        {/* Sky Panorama 3D Scene */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] max-h-[480px] w-full overflow-hidden">
          <img
            src={ASSETS.skyWorldPanorama}
            alt="عالم رحلتي في التربية الإسلامية"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-1000"
          />

          {/* Floating animated clouds overlays */}
          <div className="absolute top-4 right-10 w-24 h-12 bg-white/70 rounded-full blur-[1px] animate-float-slow pointer-events-none" />
          <div className="absolute top-12 left-16 w-32 h-14 bg-white/60 rounded-full blur-[1px] animate-float-fast pointer-events-none" />

          {/* Measured Scrim for Perfect WCAG Contrast & Title Presence */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-5 sm:p-8 md:p-12 text-white">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black text-xs sm:text-sm rounded-full mb-3 shadow-lg border-2 border-white">
                <Sparkles className="w-4 h-4 fill-amber-950" />
                <span>الصف السادس الابتدائي · الفصل الدراسي الأول</span>
              </div>

              {/* Required Big 3D Title: رحلتي في عالم التربية الإسلامية */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-2 text-shadow-3d-gold drop-shadow-lg">
                رحلتي في عالم التربية الإسلامية
              </h1>

              <p className="text-sm sm:text-base md:text-xl text-sky-100 font-extrabold mb-6 drop-shadow-md leading-relaxed">
                مغامرة كرتونية ثلاثية الأبعاد لاكتشاف أركان الإيمان، وفقه الصلاة والعبادة، ومكارم الأخلاق وسيرة الحبيب المصطفى ﷺ
              </p>

              {/* Big Chunky 3D Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                {/* 1. زر ابدأ التعلم (Primary 3D Game Button) */}
                <button
                  onClick={() => {
                    sounds.playFanfare();
                    onNavigate('units');
                  }}
                  className="game-btn-green flex items-center gap-2.5 px-7 py-3.5 text-white text-base sm:text-lg font-black rounded-2xl cursor-pointer"
                >
                  <PlayCircle className="w-6 h-6 fill-white text-emerald-700" />
                  <span>ابدأ رحلة المغامرة الآن 🚀</span>
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 2. زر إضافة درس من كتاب المنهج */}
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenAddLesson();
                  }}
                  className="game-btn-gold flex items-center gap-2 px-5 py-3.5 text-amber-950 text-xs sm:text-sm font-black rounded-2xl cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-amber-950" />
                  <span>إضافة درس من كتاب المنهج ➕</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. STUDENT PROGRESS & LEVEL DASHBOARD ================= */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-sky-300 shadow-[0_8px_0_#7dd3fc,0_15px_25px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Level Info */}
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 font-black text-2xl flex items-center justify-center border-2 border-white shadow-md shrink-0">
              ⭐
            </div>
            <div>
              <span className="text-xs font-black text-slate-500 block">
                مستوى البطل:
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {studentName} · <span className="text-emerald-700">مكتشف الجزر</span>
              </h3>
            </div>
          </div>

          {/* Progress bar in center */}
          <div className="w-full md:flex-1 max-w-md space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-slate-600">إنجاز عالم التربية الإسلامية:</span>
              <span className="text-emerald-700 tabular-nums">
                {completedLessonsCount} من {totalLessonsCount} محطات ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full p-0.5 border border-slate-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-700 shadow-inner"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 bg-amber-50 rounded-2xl border-2 border-amber-300 text-center">
              <span className="text-[10px] font-black text-amber-800 block">العملات الذهبية</span>
              <span className="text-base font-black text-amber-950 tabular-nums">🪙 {coins}</span>
            </div>

            <div className="px-3.5 py-2 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-center">
              <span className="text-[10px] font-black text-emerald-800 block">نقاط الخبرة</span>
              <span className="text-base font-black text-emerald-950 tabular-nums">⚡ {xp} XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. 3D CARTOON MENTOR GUIDE COMPANION ================= */}
      <section>
        <MentorGuide
          studentName={studentName}
          onStartLearning={() => {
            sounds.playClick();
            onNavigate('units');
          }}
        />
      </section>

      {/* ================= 4. THE 3 GREAT FLOATING ISLANDS / PORTALS ================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-emerald-800 font-black text-xs rounded-full border-2 border-emerald-300 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>بوابات الجزر التعليمية الثلاثية المعتمدة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 text-shadow-3d-emerald">
            جزر التعلم الكرتونية الثلاثية
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-bold">
            ادخل كل جزيرة لتستكشف أسرارها وتخوض دروسها التفاعلية وتجمع نجوم التفوق
          </p>
        </div>

        {/* 3 Floating Islands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {islands.map((island) => (
            <div
              key={island.id}
              className="island-card-3d p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div>
                {/* 3D Island Portal Image */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-3 border-amber-300 shadow-md mb-4 bg-sky-50 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={island.image}
                    alt={island.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Island Number Badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 bg-amber-400 text-amber-950 font-black text-xs rounded-full shadow-md border border-white">
                    الوحدة {island.number}
                  </span>
                  {/* Stars Pill */}
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-black/60 backdrop-blur-xs text-amber-300 font-black text-xs rounded-full flex items-center gap-1">
                    ⭐⭐⭐
                  </span>
                </div>

                {/* Island Title and Subtitle */}
                <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5 border border-emerald-200">
                  {island.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {island.name}
                </h3>
                <p className="text-xs text-slate-600 font-bold leading-relaxed mb-4">
                  {island.lessonsSnippet}
                </p>
              </div>

              {/* Enter Island 3D Button */}
              <button
                onClick={() => {
                  sounds.playClick();
                  onNavigate('units');
                }}
                className={`w-full py-3 text-white text-xs sm:text-sm font-black rounded-2xl cursor-pointer flex items-center justify-center gap-2 ${island.btnColor}`}
              >
                <span>ادخل الجزيرة واستكشف ➜</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. THE 4 CORE ADVENTURE REALMS (Buttons Required) ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>عوالم الاستكشاف والمغامرات</span>
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-500">
              اختر وجهتك المفضلة وانطلق لخوض التحديات واكتساب المكافآت
            </p>
          </div>
        </div>

        {/* 4 Core Buttons / Cards:
            1. زر الوحدات الدراسية
            2. زر الألعاب التعليمية
            3. زر التقويم والاختبارات
            4. زر إنجازاتي وشاراتي */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Realm 1: جزر الوحدات الدراسية */}
          <div
            onClick={() => {
              sounds.playClick();
              onNavigate('units');
            }}
            role="button"
            tabIndex={0}
            className="island-card-3d p-5 text-right cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl shadow-[0_4px_0_#047857] mb-3">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-1.5">
                3 جزر · 9 دروس
              </span>
              <h3 className="text-lg font-black text-slate-900">
                الوحدات الدراسية
              </h3>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                استعراض محاور التوحيد، وأحكام الصلاة، والصدق، وسيرة الهجرة النبوية.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
              <span>افتح الخريطة</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>

          {/* Realm 2: عالم الألعاب التعليمية */}
          <div
            onClick={() => {
              sounds.playClick();
              onNavigate('games');
            }}
            role="button"
            tabIndex={0}
            className="island-card-3d p-5 text-right cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-2xl shadow-[0_4px_0_#b45309] mb-3">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1.5">
                4 ألعاب تفاعلية
              </span>
              <h3 className="text-lg font-black text-slate-900">
                الألعاب التعليمية
              </h3>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                فرسان المعرفة، ترتيب الآيات، بطاقات الذاكرة الإسلامية، وعجلة الفضائل.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-700">
              <span>العب واكسب 🪙</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>

          {/* Realm 3: حلبة التقويم والاختبارات */}
          <div
            onClick={() => {
              sounds.playClick();
              onNavigate('assessments');
            }}
            role="button"
            tabIndex={0}
            className="island-card-3d p-5 text-right cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center text-2xl shadow-[0_4px_0_#0369a1] mb-3">
                <Trophy className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-black text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full inline-block mb-1.5">
                بطولات واختبارات
              </span>
              <h3 className="text-lg font-black text-slate-900">
                التقويم والاختبارات
              </h3>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                اختبارات تشخيصية وشاملة وتصحيح فوري مع شهادة تقدير معتمدة.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-sky-700">
              <span>خض التحدي</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>

          {/* Realm 4: خزانة الأوسمة والشارات */}
          <div
            onClick={() => {
              sounds.playClick();
              onNavigate('achievements');
            }}
            role="button"
            tabIndex={0}
            className="island-card-3d p-5 text-right cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-[0_4px_0_#6d28d9] mb-3">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full inline-block mb-1.5">
                كأس و 8 أوسمة
              </span>
              <h3 className="text-lg font-black text-slate-900">
                إنجازاتي وشاراتي
              </h3>
              <p className="text-xs text-slate-600 font-bold mt-1.5 leading-relaxed">
                لوحة الشرف، الكأس الذهبي، وطباعة شهادة التفوق الإسلامية باسمك.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-700">
              <span>عرض شهاداتي</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import {
  Users,
  HelpCircle,
  Target,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Trophy,
  Award,
  Gamepad2,
  Compass,
  Star,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { ASSETS } from '../data/assets';
import { sounds } from '../utils/soundEffects';

interface FinalHomeHeroProps {
  onOpenSection: (section: 'team' | 'instructions' | 'objectives' | 'content') => void;
  onOpenAddLesson: () => void;
  studentName: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  xp: number;
  coins: number;
}

export const FinalHomeHero: React.FC<FinalHomeHeroProps> = ({
  onOpenSection,
  onOpenAddLesson,
  studentName,
  completedLessonsCount,
  totalLessonsCount,
  xp,
  coins,
}) => {
  const progressPercent = Math.round((completedLessonsCount / Math.max(1, totalLessonsCount)) * 100);

  // The 4 Core Main Sections required by user:
  // 1. فريق الإعداد
  // 2. التعليمات
  // 3. الأهداف العامة للمقرر
  // 4. المحتوى
  const mainSections = [
    {
      id: 'team',
      title: 'فريق الإعداد والتطوير',
      subtitle: 'نخبة الطالبات القائمات على إعداد البرمجية بقيادة جني البرعي',
      badge: 'إشراف أكاديمي',
      icon: Users,
      iconEmoji: '👥',
      gradient: 'from-blue-500 to-indigo-600',
      btnColor: 'game-btn-blue',
      borderColor: 'border-sky-300',
      shadowColor: '#0284c7',
      features: ['عرض أسماء الفريق', 'إبراز دور القائدة', 'توزيع المهام والمسؤوليات'],
    },
    {
      id: 'instructions',
      title: 'تعليمات استخدام البرمجية',
      subtitle: 'دليلك المبسط المصور لكيفية الاستماع، والحل، والتنقل، وجمع النجوم',
      badge: 'دليل خطوة بخطوة',
      icon: HelpCircle,
      iconEmoji: '💡',
      gradient: 'from-amber-400 to-orange-500',
      btnColor: 'game-btn-gold',
      borderColor: 'border-amber-300',
      shadowColor: '#b45309',
      features: ['طريقة تشغيل الصوتيات', 'آلية حل الأنشطة', 'نظام النجوم والشهادات'],
    },
    {
      id: 'objectives',
      title: 'الأهداف العامة للمقرر',
      subtitle: 'الأهداف المعرفية والمهارية والقيمية والتطبيقية للصف السادس ف1',
      badge: 'وثيقة المنهج المعتمدة',
      icon: Target,
      iconEmoji: '🎯',
      gradient: 'from-emerald-500 to-teal-600',
      btnColor: 'game-btn-green',
      borderColor: 'border-emerald-300',
      shadowColor: '#059669',
      features: ['الأهداف المعرفية', 'المهارات المكتسبة', 'القيم وتطبيقات الحياة اليومية'],
    },
    {
      id: 'content',
      title: 'المحتوى الدراسي (الوحدات)',
      subtitle: 'الوحدات الثلاثة كاملة: الرحمة والرفق، الأخوة، والتقوى والعمل الصالح',
      badge: '3 وحدات · 20 درساً معتمداً',
      icon: BookOpen,
      iconEmoji: '📚',
      gradient: 'from-purple-500 to-pink-600',
      btnColor: 'game-btn-purple',
      borderColor: 'border-purple-300',
      shadowColor: '#7c3aed',
      features: ['الوحدة 1 (الرحمة والرفق)', 'الوحدة 2 (الأخوة في الدين)', 'الوحدة 3 (التقوى والعمل الصالح)'],
    },
  ] as const;

  return (
    <div className="space-y-10 pb-16 text-right">
      {/* ================= 1. SKY WORLD HERO BANNER ================= */}
      <section className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden border-4 border-white shadow-[0_16px_0_#93c5fd,0_25px_35px_rgba(0,0,0,0.15)] bg-sky-200">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] max-h-[460px] w-full overflow-hidden">
          <img
            src={ASSETS.skyWorldPanorama}
            alt="رحلتي في عالم التربية الإسلامية"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-1000"
          />

          {/* Floating animated clouds overlays */}
          <div className="absolute top-4 right-10 w-24 h-12 bg-white/70 rounded-full blur-[1px] animate-float-slow pointer-events-none" />
          <div className="absolute top-12 left-16 w-32 h-14 bg-white/60 rounded-full blur-[1px] animate-float-fast pointer-events-none" />

          {/* Title Banner & Welcome */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-5 sm:p-8 md:p-10 text-white">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400 text-amber-950 font-black text-xs sm:text-sm rounded-full shadow-md border border-white">
                <Sparkles className="w-4 h-4 text-amber-950" />
                <span>برمجية تعليمية تفاعلية معتمدة · الفصل الدراسي الأول</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
                رِحْلَتِي فِي عَالَمِ التَّرْبِيَةِ الإِسْلامِيَّةِ
              </h1>

              <p className="text-xs sm:text-sm md:text-base font-bold text-sky-100 line-clamp-2 drop-shadow-sm max-w-2xl">
                مقرر التربية الدينية الإسلامية للصف السادس الابتدائي — تصميم كرتوني مبهج ثلاثي الأبعاد، تلاوات قرآنية خاشعة، أصوات حقيقية، وأنشطة تفاعلية شاملة.
              </p>

              {/* Action Buttons inside Hero */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenSection('content');
                  }}
                  className="game-btn-green flex items-center gap-2 px-6 py-3.5 text-white text-xs sm:text-sm font-black rounded-2xl cursor-pointer shadow-lg hover:scale-105 transition-transform"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>ابدأ التعلم وتصفح المحتوى 🚀</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenSection('instructions');
                  }}
                  className="game-btn-gold flex items-center gap-2 px-5 py-3.5 text-amber-950 text-xs sm:text-sm font-black rounded-2xl cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>دليل التعليمات 💡</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenSection('team');
                  }}
                  className="game-btn-blue flex items-center gap-2 px-5 py-3.5 text-white text-xs sm:text-sm font-black rounded-2xl cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>فريق الإعداد 👥</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. HUD PROGRESS & STUDENT DASHBOARD ================= */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-sky-300 shadow-[0_8px_0_#7dd3fc,0_15px_25px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 font-black text-2xl flex items-center justify-center border-2 border-white shadow-md shrink-0">
              ⭐
            </div>
            <div>
              <span className="text-xs font-black text-slate-500 block">
                مستوى البطل المتعلم:
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {studentName} · <span className="text-emerald-700">بطل الصف السادس</span>
              </h3>
            </div>
          </div>

          <div className="w-full md:flex-1 max-w-md space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-slate-600">إنجاز المقرر كاملاً:</span>
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

      {/* ================= 3. THE 4 MAIN CORE SECTIONS (REQUIRED) ================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-sky-800 font-black text-xs rounded-full border-2 border-sky-300 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>بوابات البرمجية التعليمية الأربعة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            أقسام البرمجية الرئيسية
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-bold">
            اضغط على أي قسم للدخول إلى صفحته المستقلة واستكشاف تفاصيله بالكامل
          </p>
        </div>

        {/* 4 Large Clean Cards in 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                onClick={() => {
                  sounds.playClick();
                  onOpenSection(sec.id);
                }}
                role="button"
                tabIndex={0}
                className="bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-7 border-4 border-sky-200 shadow-[0_12px_0_#bae6fd,0_20px_30px_rgba(0,0,0,0.07)] hover:border-sky-400 hover:shadow-[0_14px_0_#7dd3fc,0_24px_35px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group text-right"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                      {sec.badge}
                    </span>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${sec.gradient} text-white flex items-center justify-center text-3xl shadow-md border-3 border-white group-hover:scale-110 transition-transform`}>
                      {sec.iconEmoji}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 leading-relaxed">
                      {sec.subtitle}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="pt-2 space-y-1.5 border-t border-slate-100">
                    {sec.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-black text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black text-sky-700 group-hover:translate-x-[-4px] transition-transform flex items-center gap-1.5">
                    <span>فتح هذا القسم</span>
                    <ChevronLeft className="w-4 h-4" />
                  </span>
                  <span className={`px-4 py-2 text-white font-black text-xs rounded-xl shadow-xs ${sec.btnColor}`}>
                    دخول ➜
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 4. MENTOR GUIDE COMPANION SUMMARY ================= */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-[0_8px_0_#d97706] flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border-3 border-amber-400 shadow-md bg-amber-100 shrink-0">
          <img
            src={ASSETS.mentorGuide}
            alt="مرشد الرحلة"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1.5 text-center sm:text-right flex-1">
          <span className="text-xs font-black text-amber-900 bg-amber-200/60 px-2.5 py-0.5 rounded-full inline-block">
            نصيحة مرشدك أنس
          </span>
          <h4 className="text-lg font-black text-amber-950">
            «يا بطل، ابدأ بقراءة التعليمات والأهداف، ثم انطلق في جزر المحتوى درسًا بدرَس!»
          </h4>
          <p className="text-xs font-bold text-slate-600">
            احرص على الاستماع للتلاوات القرآنية الخاشعة وحل جميع الأنشطة لتحصل على الدرجات الكاملة والشارات الذهبية.
          </p>
        </div>
      </section>
    </div>
  );
};

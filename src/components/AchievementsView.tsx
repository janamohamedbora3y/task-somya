import React, { useState } from 'react';
import {
  Award,
  Trophy,
  Star,
  CheckCircle2,
  Lock,
  Printer,
  Sparkles,
  BookOpen,
  Gamepad2,
  UserCheck,
  Edit3
} from 'lucide-react';
import { Badge } from '../types/curriculum';
import { ASSETS } from '../data/assets';
import { sounds } from '../utils/soundEffects';

interface AchievementsViewProps {
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  xp: number;
  coins: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  badges: Badge[];
  onOpenCertificate: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  studentName,
  onUpdateStudentName,
  xp,
  coins,
  completedLessonsCount,
  totalLessonsCount,
  badges,
  onOpenCertificate,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(studentName);

  // Calculate Student Level
  // Level 1: 0 - 300 XP
  // Level 2: 301 - 700 XP
  // Level 3: 701 - 1200 XP
  // Level 4: 1201 - 2000 XP
  // Level 5: 2000+ XP
  let level = 1;
  let levelTitle = 'طالب المعرفة المبتدئ';
  let nextLevelXp = 400;

  if (xp >= 2000) {
    level = 5;
    levelTitle = 'فقيه الغد وقدوة الأخلاق ⭐⭐⭐⭐⭐';
    nextLevelXp = 3000;
  } else if (xp >= 1200) {
    level = 4;
    levelTitle = 'حارس العقيدة والحديث 🌟🌟🌟🌟';
    nextLevelXp = 2000;
  } else if (xp >= 700) {
    level = 3;
    levelTitle = 'صديق القرآن والسنة 🌟🌟🌟';
    nextLevelXp = 1200;
  } else if (xp >= 300) {
    level = 2;
    levelTitle = 'باحث مجتهد ومثابر 🌟🌟';
    nextLevelXp = 700;
  }

  const levelProgress = Math.min(100, Math.round((xp / nextLevelXp) * 100));

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      sounds.playSuccess();
      onUpdateStudentName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 text-right">
      {/* Achievements Hero Banner */}
      <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-amber-950 text-xs font-black rounded-full mb-3 shadow-md">
            <Trophy className="w-3.5 h-3.5 fill-amber-950" />
            <span>لوحة الشرف والإنجازات الشخصية</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            إنجازاتي وشاراتي المضيئة
          </h1>
          <p className="text-xs sm:text-base text-purple-100 font-semibold mt-1">
            تابع تقدمك، واجمع الأوسمة الذهبية، وطبّق ما تعلمته في حياتك لتكون قدوة صالحة بين زملائك!
          </p>

          {/* Student Profile Quick View */}
          <div className="mt-5 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-lg">
                {level}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-white">{studentName}</span>
                  {!isEditingName && (
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-white/60 hover:text-white cursor-pointer"
                      title="تعديل اسم الطالب في الشهادة"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <span className="text-xs font-bold text-amber-300 block">
                  {levelTitle}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenCertificate();
              }}
              className="btn-tactile-amber px-4 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl cursor-pointer"
            >
              طباعة شهادة التقدير 📜
            </button>
          </div>

          {/* Edit Name Form Modal Inline */}
          {isEditingName && (
            <form onSubmit={handleSaveName} className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="اكتب اسم الطالب للشهادة..."
                className="px-3 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-bold focus:outline-emerald-500 w-48"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                حفظ
              </button>
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="px-3 py-1.5 bg-white/20 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                إلغاء
              </button>
            </form>
          )}
        </div>

        {/* 3D Golden Trophy Asset */}
        <div className="relative shrink-0 w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-amber-500/20">
          <img
            src={ASSETS.trophy}
            alt="كأس التفوق الإسلامي"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Stats Counter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-right">
          <span className="text-xs font-bold text-slate-500 block mb-1">
            نقاط الخبرة المعرفية
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="text-2xl font-black text-slate-900 tabular-nums">
              {xp} XP
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-400 mt-1 block">
            {xp} من {nextLevelXp} للمستوى القادم
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-right">
          <span className="text-xs font-bold text-slate-500 block mb-1">
            العملات الذهبية
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl">🪙</span>
            <span className="text-2xl font-black text-amber-600 tabular-nums">
              {coins}
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-400 mt-4 block">
            مكتسبة من الألعاب والتقييمات
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-right">
          <span className="text-xs font-bold text-slate-500 block mb-1">
            الدروس المكتملة
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <span className="text-2xl font-black text-emerald-600 tabular-nums">
              {completedLessonsCount} / {totalLessonsCount}
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-400 mt-4 block">
            من دروس الفصل الأول المعتمدة
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-right">
          <span className="text-xs font-bold text-slate-500 block mb-1">
            الأوسمة المفتوحة
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏅</span>
            <span className="text-2xl font-black text-purple-600 tabular-nums">
              {badges.filter((b) => b.unlocked).length} / {badges.length}
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-400 mt-4 block">
            شارات التميز والإتقان
          </span>
        </div>
      </div>

      {/* Badges Grid Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              شارات وأوسمة التفوق الإسلامي
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              أكمل الدروس، وأجب عن الاختبارات بامتياز، والعب ألعاب الذكاء لتفتح جميع الشارات
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-amber-50/60 border-amber-300 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs ${
                      badge.unlocked
                        ? 'bg-amber-400 text-amber-950 shadow-amber-300'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  {badge.unlocked ? (
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>مفتوح</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>مغلق</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-slate-900 mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  {badge.description}
                </p>
              </div>

              {badge.unlocked && badge.unlockedAt && (
                <div className="mt-4 pt-2 border-t border-amber-200 text-[10px] font-bold text-amber-800">
                  تم الفتح: {badge.unlockedAt}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

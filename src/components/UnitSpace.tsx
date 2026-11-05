import React from 'react';
import {
  ChevronRight,
  Compass,
  Star,
  Lock,
  PlayCircle,
  Trophy,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Unit, Lesson } from '../types/curriculum';
import { sounds } from '../utils/soundEffects';

interface UnitSpaceProps {
  unit: Unit;
  onSelectLesson: (lesson: Lesson) => void;
  onStartUnitExam: (unit: Unit) => void;
  onBackToUnits: () => void;
}

export const UnitSpace: React.FC<UnitSpaceProps> = ({
  unit,
  onSelectLesson,
  onStartUnitExam,
  onBackToUnits,
}) => {
  const completedLessons = unit.lessons.filter((l) => l.isCompleted).length;
  const totalLessons = unit.lessons.length;
  const progressPercent = Math.round((completedLessons / Math.max(1, totalLessons)) * 100);

  return (
    <div className="space-y-8 pb-20 text-right animate-fade-in">
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl border-3 border-emerald-300 shadow-sm">
        <button
          onClick={() => {
            sounds.playClick();
            onBackToUnits();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة لخريطة الجزر</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            الوحدة {unit.unitNumber} · {unit.theme}
          </span>
        </div>
      </div>

      {/* Unit Hero Banner with 3D Island Portal */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 text-white shadow-[0_12px_0_#065f46] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-400 text-amber-950 font-black text-xs rounded-full mb-3 shadow-md border-2 border-white">
            <Compass className="w-4 h-4" />
            <span>المساحة المستقلة للوحدة {unit.unitNumber}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white mb-2 leading-tight">
            {unit.title}
          </h1>

          <p className="text-xs sm:text-base text-emerald-100 font-bold leading-relaxed mb-6">
            {unit.description}
          </p>

          {/* Unit Progress Tracker */}
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-md space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black">
              <span>نسبة إنجاز الجزيرة:</span>
              <span className="text-amber-300 tabular-nums">
                {completedLessons} من {totalLessons} محطات ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-3 bg-black/20 rounded-full p-0.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3D Island Avatar */}
        <div className="relative shrink-0 w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-sky-100">
          <img
            src={unit.islandImage}
            alt={unit.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ================= ADVENTURE JOURNEY PATHWAY (طريق رحلة الدروس) ================= */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border-4 border-amber-300 shadow-[0_12px_0_#d97706] space-y-8">
        <div className="text-center max-w-lg mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>خارطة طريق المحطات والدروس</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-bold">
            أكمل المحطة الحالية لتفتح المحطة التالية وتجمع النجوم والعملات!
          </p>
        </div>

        {/* Pathway Steps */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {unit.lessons.map((lesson, idx) => {
            const isUnlocked = lesson.isUnlocked || idx === 0 || completedLessons >= idx;
            const isDone = lesson.isCompleted;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  if (isUnlocked) {
                    sounds.playClick();
                    onSelectLesson(lesson);
                  } else {
                    sounds.playIncorrect();
                  }
                }}
                className={`p-5 sm:p-6 rounded-3xl border-3 transition-all flex items-center justify-between gap-4 cursor-pointer select-none ${
                  isDone
                    ? 'bg-emerald-50/80 border-emerald-400 hover:scale-[1.02] shadow-sm'
                    : isUnlocked
                    ? 'bg-amber-50/70 border-amber-400 hover:scale-[1.02] shadow-md animate-glow-gold'
                    : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Step Number Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-md shrink-0 ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isUnlocked
                        ? 'bg-amber-400 text-amber-950 shadow-amber-300'
                        : 'bg-slate-300 text-slate-500'
                    }`}
                  >
                    {isDone ? '✓' : isUnlocked ? idx + 1 : <Lock className="w-6 h-6" />}
                  </div>

                  <div>
                    <span className="text-[11px] font-black text-slate-400 block mb-0.5">
                      المحطة التعليمية {idx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold line-clamp-1 mt-0.5">
                      {lesson.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Action / Stars */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {isDone ? (
                    <span className="text-amber-400 font-black text-xs sm:text-sm">
                      ⭐⭐⭐
                    </span>
                  ) : isUnlocked ? (
                    <span className="game-btn-green px-4 py-2 text-white font-black text-xs rounded-xl flex items-center gap-1">
                      <PlayCircle className="w-4 h-4" />
                      <span>انطلق ➜</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>مغلق</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Unit Championship Exam Card */}
          <div
            onClick={() => {
              sounds.playClick();
              onStartUnitExam(unit);
            }}
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 border-3 border-sky-300 hover:scale-[1.02] transition-all flex items-center justify-between gap-4 cursor-pointer shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                🏆
              </div>
              <div>
                <span className="text-[11px] font-black text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  تحدي نهاية الجزيرة
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  اختبار تقييم الوحدة الشامل
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  أجب عن الأسئلة التشخيصية لتنال وسام الجزيرة الذهبي!
                </p>
              </div>
            </div>

            <button className="game-btn-blue px-4 py-2 text-white font-black text-xs rounded-xl shrink-0">
              بدء التحدي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

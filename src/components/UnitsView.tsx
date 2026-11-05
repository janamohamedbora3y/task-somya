import React, { useState } from 'react';
import {
  Compass,
  CheckCircle,
  PlayCircle,
  Search,
  PlusCircle,
  Sparkles,
  Shield,
  Clock,
  ChevronLeft,
  Star,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Unit, Lesson } from '../types/curriculum';
import { sounds } from '../utils/soundEffects';

interface UnitsViewProps {
  units: Unit[];
  completedLessonIds: string[];
  onSelectLesson: (lesson: Lesson, unitTitle: string) => void;
  onOpenUnitSpace: (unit: Unit) => void;
  onOpenAddLesson: () => void;
}

export const UnitsView: React.FC<UnitsViewProps> = ({
  units,
  completedLessonIds,
  onSelectLesson,
  onOpenUnitSpace,
  onOpenAddLesson,
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUnits = units.filter((u) => {
    if (selectedUnitId !== 'all' && u.id !== selectedUnitId) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16 text-right animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-emerald-300 shadow-[0_8px_0_#059669,0_15px_25px_rgba(0,0,0,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-black rounded-full mb-2 border border-emerald-300">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>خريطة استكشاف جزر المنهج الدراسي</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            جزر المنهج والمساحات التعليمية المستقلة
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
            لكل وحدة مساحة كرتونية مستقلة تضم محطات الشرح، والآيات الكريمة، والأنشطة التفاعلية
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onOpenAddLesson();
          }}
          className="game-btn-green self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 text-white font-black text-xs sm:text-sm rounded-2xl cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>إضافة درس من كتاب المنهج ➕</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Island filter tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-slate-200 overflow-x-auto shadow-xs">
          <button
            onClick={() => {
              sounds.playClick();
              setSelectedUnitId('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-colors cursor-pointer whitespace-nowrap ${
              selectedUnitId === 'all'
                ? 'bg-amber-400 text-amber-950 shadow-xs border border-amber-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            جميع الجزر 🏝️
          </button>
          {units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => {
                sounds.playClick();
                setSelectedUnitId(unit.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-colors cursor-pointer whitespace-nowrap ${
                selectedUnitId === unit.id
                  ? 'bg-amber-400 text-amber-950 shadow-xs border border-amber-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الجزيرة {unit.unitNumber}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن درس أو موضوع بالجزيرة..."
            className="w-full pr-10 pl-4 py-2.5 bg-white border-2 border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-emerald-500 shadow-2xs font-bold"
          />
        </div>
      </div>

      {/* Islands / Units List */}
      <div className="space-y-8">
        {filteredUnits.map((unit) => {
          const unitCompletedCount = unit.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;

          const displayedLessons = unit.lessons.filter((l) => {
            if (!searchQuery.trim()) return true;
            return (
              l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
            );
          });

          if (displayedLessons.length === 0) return null;

          return (
            <div
              key={unit.id}
              className="island-card-3d overflow-hidden"
            >
              {/* Island Portal Header Card */}
              <div className="p-5 sm:p-7 bg-gradient-to-l from-sky-50 via-white to-amber-50/40 border-b-2 border-slate-100 flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  {/* 3D Island Icon Avatar */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-3 border-amber-300 shadow-md bg-amber-100 shrink-0">
                    <img
                      src={unit.islandImage}
                      alt={unit.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 w-5 h-5 bg-amber-400 text-amber-950 font-black rounded-full flex items-center justify-center text-[10px] border border-white">
                      {unit.unitNumber}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-amber-200">
                      محور: {unit.theme}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {unit.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1 max-w-xl">
                      {unit.description}
                    </p>
                  </div>
                </div>

                {/* Island Actions (Enter Unit Space Button) */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onOpenUnitSpace(unit);
                    }}
                    className="game-btn-green px-4 py-2.5 text-white font-black text-xs sm:text-sm rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                    <span>ادخل مساحة الجزيرة المستقلة ➜</span>
                  </button>
                </div>
              </div>

              {/* Lessons Grid in Island */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/50">
                {displayedLessons.map((lesson, idx) => {
                  const isDone = completedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        sounds.playClick();
                        onSelectLesson(lesson, unit.title);
                      }}
                      className="group bg-white hover:bg-emerald-50/40 border-2 border-slate-200 hover:border-emerald-400 rounded-2xl p-5 text-right transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                            {idx + 1}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{lesson.durationMinutes} د</span>
                          </div>
                        </div>

                        <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-semibold">
                          {lesson.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>مكتمل بنجاح</span>
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            جاهز للاستكشاف
                          </span>
                        )}

                        <span className="text-xs font-black text-emerald-700 flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                          <span>ادخل الدرس</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

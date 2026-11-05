import React, { useState } from 'react';
import { X, Plus, BookOpen, Sparkles, Check } from 'lucide-react';
import { Lesson, Unit } from '../types/curriculum';
import { sounds } from '../utils/soundEffects';

interface AddLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  units: Unit[];
  onAddLesson: (unitId: string, newLesson: Lesson) => void;
}

export const AddLessonModal: React.FC<AddLessonModalProps> = ({
  isOpen,
  onClose,
  units,
  onAddLesson,
}) => {
  const [targetUnitId, setTargetUnitId] = useState(units[0]?.id || 'unit-1');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [objectivesText, setObjectivesText] = useState('');
  const [ayahText, setAyahText] = useState('');
  const [ayahSurah, setAyahSurah] = useState('');
  const [contentText, setContentText] = useState('');
  const [adviceText, setAdviceText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contentText.trim()) return;

    sounds.playSuccess();

    const objectives = objectivesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const newLesson: Lesson = {
      id: `custom-lesson-${Date.now()}`,
      unitId: targetUnitId,
      title: title.trim(),
      subtitle: subtitle.trim() || 'درس إضافي مضاف من كتاب المنهج المدرسي',
      durationMinutes: Number(durationMinutes) || 20,
      objectives:
        objectives.length > 0
          ? objectives
          : ['أن يتقن الطالب مفاهيم هذا الدرس من الكتاب المدرسي.'],
      quranVerses: ayahText.trim()
        ? [
            {
              ayah: ayahText.trim(),
              surah: ayahSurah.trim() || 'القرآن الكريم',
              number: 'آية مقررة',
              meaning: 'آية كريمة مباركة للتدبر والعمل بمقتضاها.',
            },
          ]
        : undefined,
      sections: [
        {
          title: 'شرح وعناصر الدرس من الكتاب المدرسي',
          content: contentText.trim(),
          keyPoints: ['مراجعة الدرس بعناية واستيعاب المفاهيم الرئيسية.'],
          takeaway: 'العلم النافع هو الذي يتبعه عمل صالح وخلق كريم.',
        },
      ],
      mentorAdvice:
        adviceText.trim() ||
        'بارك الله فيك يا بطل على إضافة هذا الدرس ومواصلة طلب العلم والتفوق!',
      quiz: [
        {
          id: `q-custom-${Date.now()}`,
          question: `ما هو المفهوم الأساسي في درس: ${title.trim()}؟`,
          options: [
            'العمل بما جاء في الدرس وتطبيقه في الحياة',
            'نسيان المعلومات بعد الامتحان',
            'عدم الاهتمام به',
            'حفظه فقط دون فهم',
          ],
          correctIndex: 0,
          explanation: 'الغاية الكبرى من دروس التربية الإسلامية هي الفهم والعمل الصالح.',
        },
      ],
      isCustom: true,
    };

    onAddLesson(targetUnitId, newLesson);
    onClose();

    // Reset form
    setTitle('');
    setSubtitle('');
    setObjectivesText('');
    setAyahText('');
    setContentText('');
    setAdviceText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-right animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-emerald-500/30 flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                إضافة درس جديد أو جزء من كتاب المنهج
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                يمكنك لصق أو كتابة نص أي درس جديد ليظهر مباشرة في قائمة الوحدات
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              الوحدة التابع لها الدرس:
            </label>
            <select
              value={targetUnitId}
              onChange={(e) => setTargetUnitId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold bg-white text-slate-800 focus:outline-emerald-500"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.title} ({u.theme})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              عنوان الدرس: *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: الإحسان إلى الجار، أو آداب المسجد..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              عنوان فرعي أو ملخص سريع:
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="مثال: حقوق الجار في الإسلام وتطبيقاتها في الحي..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              أهداف الدرس (هدف في كل سطر):
            </label>
            <textarea
              rows={2}
              value={objectivesText}
              onChange={(e) => setObjectivesText(e.target.value)}
              placeholder="1. أن يحدد الطالب معنى...\n2. أن يذكر صور..."
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                آية قرآنية مقررة (اختياري):
              </label>
              <input
                type="text"
                value={ayahText}
                onChange={(e) => setAyahText(e.target.value)}
                placeholder="اكتب الآية القرآنية..."
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                السورة / رقم الآية:
              </label>
              <input
                type="text"
                value={ayahSurah}
                onChange={(e) => setAyahSurah(e.target.value)}
                placeholder="مثال: سورة النساء: ٣٦"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              نص وشرح الدرس من الكتاب المدرسي: *
            </label>
            <textarea
              required
              rows={5}
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="الصق أو اكتب نص شرح الدرس هنا..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              توجيه أو نصيحة المرشد الكرتوني أنس للطالب:
            </label>
            <input
              type="text"
              value={adviceText}
              onChange={(e) => setAdviceText(e.target.value)}
              placeholder="مثال: يا بطل، بادر اليوم بإلقاء السلام والابتسامة في وجه جارك!"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-emerald-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="btn-tactile-emerald px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black rounded-xl cursor-pointer"
            >
              إضافة الدرس للمنهج ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

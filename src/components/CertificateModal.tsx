import React, { useRef } from 'react';
import { X, Printer, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  xp: number;
  completedLessonsCount: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  xp,
  completedLessonsCount,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const todayStr = new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm text-right animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border-4 border-amber-400/80 flex flex-col print:shadow-none print:border-none print:max-w-none print:w-full">
        {/* Controls Bar (Hidden in print) */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-black text-slate-800">
              معاينة شهادة التفوق الإسلامية
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn-tactile-amber inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs rounded-xl cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الشهادة الآن 🖨️</span>
            </button>
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
        </div>

        {/* Printable Certificate Canvas */}
        <div
          ref={certRef}
          className="p-8 sm:p-12 text-center relative bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 m-4 rounded-2xl border-8 border-double border-amber-500/80 shadow-inner"
        >
          {/* Islamic Frame Corners */}
          <div className="absolute top-2 right-2 text-2xl text-amber-500 pointer-events-none">
            ۞
          </div>
          <div className="absolute top-2 left-2 text-2xl text-amber-500 pointer-events-none">
            ۞
          </div>
          <div className="absolute bottom-2 right-2 text-2xl text-amber-500 pointer-events-none">
            ۞
          </div>
          <div className="absolute bottom-2 left-2 text-2xl text-amber-500 pointer-events-none">
            ۞
          </div>

          {/* Header */}
          <div className="space-y-1 mb-6">
            <span className="text-xs font-black text-emerald-800 tracking-wider block">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <span className="text-[11px] font-bold text-slate-500 block">
              منصة التربية الدينية الإسلامية المدرسية · الصف السادس الابتدائي
            </span>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-2" />
          </div>

          {/* Certificate Title */}
          <h2 className="text-2xl sm:text-4xl font-black text-emerald-950 tracking-tight mb-4">
            شَهَادَةُ تَمَيُّزٍ وَإِتْقَانٍ
          </h2>

          <p className="text-xs sm:text-sm font-bold text-slate-600 mb-6 max-w-lg mx-auto">
            تَشْهَدُ إِدَارَةُ المَنْهَجِ المَدْرَسِيِّ وَفَرِيقُ الإِرْشَادِ بِأَنَّ بَطَلَ العِلْمِ وَالمَعْرِفَةِ:
          </p>

          {/* Student Name */}
          <div className="my-6 py-3 px-8 bg-amber-100/60 border-y-2 border-amber-400/80 inline-block rounded-xl shadow-xs">
            <span className="text-2xl sm:text-4xl font-black text-amber-950 font-serif">
              الطالب: {studentName}
            </span>
          </div>

          {/* Commendation text */}
          <p className="text-xs sm:text-base text-slate-700 font-bold leading-loose max-w-xl mx-auto my-6">
            قَدْ اجْتَازَ بِنَجَاحٍ وَتَفَوُّقٍ مُقَرَّرَ <span className="text-emerald-800 font-black">التربية الدينية الإسلامية (الفصل الدراسي الأول)</span>،
            وَأَتَمَّ دِرَاسَةَ مَحَاوِرِ العَقِيدَةِ وَالتَّوْحِيدِ، وَفِقْهِ الصَّلَاةِ، وَمَكَارِمِ الأَخْلَاقِ،
            وَسِيرَةِ النَّبِيِّ ﷺ وَأَصْحَابِهِ الكِرَامِ، وَحَصَلَ عَلَى <span className="text-amber-700 font-black">{xp} نقطة تفوق (XP)</span>.
          </p>

          <p className="text-xs sm:text-sm font-semibold text-emerald-700 italic mb-8">
            «نَسْأَلُ اللَّهَ تَعَالَى أَنْ يَنْفَعَ بِهِ وَيَجْعَلَهُ قُدْوَةً صَالِحَةً وَذُخْراً لِأُمَّتِهِ وَوَطَنِهِ»
          </p>

          {/* Footer Seals & Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-200/90 items-center">
            {/* Signature 1 */}
            <div className="text-center">
              <span className="text-[11px] font-black text-slate-500 block mb-1">
                تاريخ الإصدار
              </span>
              <span className="text-xs font-bold text-slate-800 block">
                {todayStr}
              </span>
            </div>

            {/* Seal Golden Emblem */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 border-4 border-amber-300 shadow-lg flex flex-col items-center justify-center text-amber-950">
                <span className="text-xl sm:text-2xl">🏅</span>
                <span className="text-[9px] font-black">خَتْمُ التَّفَوُّقِ</span>
              </div>
            </div>

            {/* Signature 2 */}
            <div className="text-center">
              <span className="text-[11px] font-black text-slate-500 block mb-1">
                المرشد الكرتوني
              </span>
              <span className="text-xs font-black text-emerald-800 block">
                أنس & مريم
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                مُعْتَمَدٌ رسميّاً ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

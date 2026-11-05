import React, { useState } from 'react';
import { Volume2, Sparkles, HeartHandshake, Lightbulb, BookMarked, RefreshCw, Star } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { sounds } from '../utils/soundEffects';

interface MentorGuideProps {
  studentName?: string;
  onStartLearning?: () => void;
  compact?: boolean;
}

const MENTOR_QUOTES = [
  {
    type: 'greeting',
    text: 'السلام عليكم ورحمة الله وبركاته يا بطل! أنا صديقك ومُرشدك أنس. مرحباً بك في عالمنا الكرتوني المليء بالمغامرات والعلم النافع!',
    actionText: 'أهلاً بك يا أنس!',
  },
  {
    type: 'dua',
    text: '«اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً، وَرِزْقاً طَيِّباً، وَعَمَلاً مُتَقَبَّلاً». ردد هذا الدعاء كل يوم قبل بدء رحلتك في التعلم!',
    actionText: 'آمين يا رب',
  },
  {
    type: 'tawhid',
    text: 'هل تأملت اليوم زرقة السماء ونور الشمس؟ كل ما في هذا الكون العظيم يشهد بوحدانية الله وقدرته الباهرة، فسبحان الله العظيم!',
    actionText: 'سبحان الله وبحمده',
  },
  {
    type: 'ethics',
    text: 'الصدق تاج المسلم يا صديقي! قال النبي ﷺ: «عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى البِرِّ». كُن صادقاً دائماً في كلامك وواجباتك.',
    actionText: 'الصادق محبوب دائماً',
  },
  {
    type: 'motivation',
    text: 'أنت بطل حقيقي وقادر على حصد جميع النجوم والشارات الذهبية! استعن بالله، وحل التدريبات، وسترى كم هو جميل فهم ديننا!',
    actionText: 'أنا مستعد للمغامرة!',
  },
];

export const MentorGuide: React.FC<MentorGuideProps> = ({
  studentName = 'طالب العلم',
  onStartLearning,
  compact = false,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQuote = MENTOR_QUOTES[quoteIndex];

  const handleNextQuote = () => {
    sounds.playClick();
    setQuoteIndex((prev) => (prev + 1) % MENTOR_QUOTES.length);
  };

  const handleSpeak = () => {
    sounds.playClick();
    setIsSpeaking(true);
    sounds.speakArabic(currentQuote.text, () => {
      setIsSpeaking(false);
    });
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3.5 bg-white/95 rounded-3xl border-3 border-amber-300 shadow-[0_6px_0_#d97706] text-right">
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-amber-100">
            <img
              src={ASSETS.mentorGuide}
              alt="المرشد أنس"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -left-1 w-5 h-5 bg-amber-400 text-amber-950 font-black rounded-full flex items-center justify-center text-[10px] border border-white">
            ★
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-xs font-black text-amber-950">المرشد أنس:</span>
            <button
              onClick={handleSpeak}
              className="text-emerald-700 hover:text-emerald-900 text-xs flex items-center gap-1 font-bold cursor-pointer"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-amber-500 animate-pulse' : ''}`} />
              <span className="text-[11px]">{isSpeaking ? 'يتحدث...' : 'استمع'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-700 line-clamp-2 font-bold leading-relaxed">
            {currentQuote.text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 sm:p-7 md:p-8 text-amber-950 shadow-[0_12px_0_#b45309,0_20px_35px_rgba(180,83,9,0.3)] border-4 border-amber-200 overflow-hidden">
      {/* Decorative cartoon sparkle circles */}
      <div className="absolute top-2 right-4 text-3xl opacity-30 select-none pointer-events-none">✨</div>
      <div className="absolute bottom-3 left-4 text-3xl opacity-30 select-none pointer-events-none">⭐</div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 sm:gap-7">
        {/* 3D Mascot Character Avatar with Floating Glow */}
        <div className="relative shrink-0 text-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-amber-200 transform transition-transform hover:scale-105 duration-300">
            <img
              src={ASSETS.mentorGuide}
              alt="المرشد الكرتوني أنس - مرشد رحلتي في عالم التربية الإسلامية"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="inline-block -mt-4 relative z-10 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs sm:text-sm rounded-full shadow-md border-2 border-white">
            مُرشدك أنس 👋
          </div>
        </div>

        {/* Speech Bubble Deck */}
        <div className="flex-1 text-right w-full">
          {/* Header pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/40 backdrop-blur-xs text-amber-950 text-xs font-black rounded-full mb-3 border border-white/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>رسالة المرشد اليومية للأبطال</span>
          </div>

          {/* White speech bubble */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-3 border-amber-200 text-slate-800 relative">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-amber-100">
              <span className="text-xs sm:text-sm font-black text-amber-950 flex items-center gap-1.5">
                <span>💬</span>
                <span>حديث أنس إلى البطل: <span className="text-emerald-700">{studentName}</span></span>
              </span>

              {/* Voice Read Aloud Button */}
              <button
                onClick={handleSpeak}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-500 text-white shadow-xs animate-pulse'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950'
                }`}
                title="استمع لصوت المرشد أنس"
              >
                <Volume2 className="w-4 h-4 text-amber-800" />
                <span>{isSpeaking ? 'أنس يتحدث...' : 'استمع لصوت أنس 🔊'}</span>
              </button>
            </div>

            <p className="text-base sm:text-lg font-black text-slate-800 leading-relaxed font-sans">
              "{currentQuote.text}"
            </p>

            {/* Bubble Action Controls */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
              <button
                onClick={handleNextQuote}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                <span>نصيحة أخرى</span>
              </button>

              {onStartLearning && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onStartLearning();
                  }}
                  className="game-btn-green inline-flex items-center gap-2 px-5 py-2 text-white font-black text-xs sm:text-sm rounded-xl cursor-pointer"
                >
                  <BookMarked className="w-4 h-4" />
                  <span>انطلق إلى الجزر التعليمية 🚀</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Category Buttons */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setQuoteIndex(1); // Dua
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/40 hover:bg-white/60 text-amber-950 text-xs font-black border border-white/60 transition-colors cursor-pointer"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-700" />
              <span>دعاء المذاكرة</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setQuoteIndex(2); // Tawhid
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/40 hover:bg-white/60 text-amber-950 text-xs font-black border border-white/60 transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
              <span>تفكر في الكون</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setQuoteIndex(3); // Ethics
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/40 hover:bg-white/60 text-amber-950 text-xs font-black border border-white/60 transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-amber-800" />
              <span>خُلق الصدق</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

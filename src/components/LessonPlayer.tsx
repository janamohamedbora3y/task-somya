import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Volume2,
  Sparkles,
  Star,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Award,
  PlayCircle,
  RotateCcw,
  Check,
  X,
  Compass,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, LessonPage, InteractiveActivity } from '../types/curriculum';
import { sounds } from '../utils/soundEffects';
import { ASSETS } from '../data/assets';
import { LessonVideoPlayer } from './LessonVideoPlayer';
import { QuranAudioPlayer } from './QuranAudioPlayer';
import { ShariaAudioPlayer } from './ShariaAudioPlayer';

interface LessonPlayerProps {
  lesson: Lesson;
  unitTitle: string;
  onCompleteLesson: (lessonId: string, earnedStars: number, earnedXp: number) => void;
  onExit: () => void;
  onNextLesson?: () => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  unitTitle,
  onCompleteLesson,
  onExit,
  onNextLesson,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Activity / Question interaction states
  const [selectedSingleChoice, setSelectedSingleChoice] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // Matching activity states
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  // Final Quiz state in lesson
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const pages = lesson.pages || [];
  const totalPages = pages.length;
  const currentPage: LessonPage | undefined = pages[currentPageIndex];

  // If lesson has no pages yet (waiting for user unit upload)
  if (!currentPage || totalPages === 0) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl border-3 border-amber-300 shadow-xl text-center space-y-5 my-8">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-4xl">
          📖
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          مساحة درس: {lesson.title}
        </h2>
        <p className="text-sm font-bold text-slate-600 max-w-lg mx-auto leading-relaxed">
          هذا الدرس مجهز في بنية النظام وينتظر استلام محتوى الوحدة الدراسي الكامل لإدراجه بصفحاته التفاعلية وأنشطته الشاملة.
        </p>
        <button
          onClick={onExit}
          className="game-btn-green px-6 py-2.5 text-white font-black text-sm rounded-xl cursor-pointer"
        >
          العودة لخريطة الجزر
        </button>
      </div>
    );
  }

  const progressPercent = Math.round(((currentPageIndex + 1) / totalPages) * 100);

  // Speak Arabic helper
  const handleSpeak = (text: string) => {
    sounds.playClick();
    setIsSpeaking(true);
    sounds.speakArabic(text, () => {
      setIsSpeaking(false);
    });
  };

  // Check Single Choice Question
  const handleCheckSingleChoice = (choiceIndex: number, correctVal: string | number | string[]) => {
    sounds.playClick();
    setSelectedSingleChoice(choiceIndex);
    setIsAnswerChecked(true);

    const correct = Number(choiceIndex) === Number(correctVal);
    setIsAnswerCorrect(correct);

    if (correct) {
      sounds.playSuccess();
    } else {
      sounds.playIncorrect();
    }
  };

  // Handle Matching click
  const handleMatchClick = (side: 'left' | 'right', text: string, pairs: { left: string; right: string }[]) => {
    sounds.playClick();
    if (side === 'left') {
      setSelectedLeft(text);
    } else if (side === 'right' && selectedLeft) {
      // Check if pair matches
      const isMatch = pairs.some((p) => p.left === selectedLeft && p.right === text);
      if (isMatch) {
        sounds.playSuccess();
        setMatchedPairs((prev) => [...prev, `${selectedLeft}-${text}`]);
        setSelectedLeft(null);
      } else {
        sounds.playIncorrect();
        setSelectedLeft(null);
      }
    }
  };

  // Handle Next Page Navigation
  const handleNextPage = () => {
    sounds.playClick();
    if (currentPageIndex + 1 < totalPages) {
      setCurrentPageIndex((prev) => prev + 1);
      // Reset activity states for the next page
      setSelectedSingleChoice(null);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
      setSelectedLeft(null);
    } else {
      // Completed the whole lesson!
      sounds.playFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      onCompleteLesson(lesson.id, 3, 150);
    }
  };

  // Handle Previous Page Navigation
  const handlePrevPage = () => {
    sounds.playClick();
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      setSelectedSingleChoice(null);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
      setSelectedLeft(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 text-right animate-fade-in">
      {/* Top Gamified Player Header HUD */}
      <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl border-3 border-amber-300 shadow-[0_6px_0_#d97706] flex items-center justify-between gap-3">
        <button
          onClick={() => {
            sounds.playClick();
            onExit();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
          <span>خروج</span>
        </button>

        {/* Progress Bar & Page Stepper */}
        <div className="flex-1 max-w-md mx-2 space-y-1">
          <div className="flex items-center justify-between text-xs font-black">
            <span className="text-slate-600 truncate max-w-[200px]">
              {lesson.title}
            </span>
            <span className="text-emerald-700 tabular-nums">
              صفحة {currentPageIndex + 1} من {totalPages}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full p-0.5 border border-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-300 shadow-inner"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stars count */}
        <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-950 font-black text-xs rounded-xl border border-amber-300">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>⭐⭐⭐</span>
        </div>
      </div>

      {/* Main Interactive Stage Box */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border-4 border-amber-300 shadow-[0_12px_0_#d97706,0_20px_35px_rgba(0,0,0,0.1)] p-5 sm:p-8 md:p-10 space-y-6 relative overflow-hidden">
        {/* Mentor Guide Floating Bubble */}
        <div className="flex items-center gap-3.5 p-3.5 bg-gradient-to-r from-amber-100 via-yellow-50 to-emerald-50 rounded-2xl border-2 border-amber-300 shadow-xs">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400 bg-amber-200 shrink-0">
            <img
              src={ASSETS.mentorGuide}
              alt="أنس"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-black text-amber-950">توجيه المرشد أنس:</span>
              <button
                onClick={() => handleSpeak(currentPage.mentorPrompt || currentPage.title)}
                className="text-emerald-800 hover:text-emerald-950 text-xs flex items-center gap-1 font-black cursor-pointer"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-amber-600' : ''}`} />
                <span className="text-[11px]">{isSpeaking ? 'يتحدث...' : 'استمع'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-700 mt-0.5 leading-relaxed">
              "{currentPage.mentorPrompt || 'استمتع بتعلم وفهم هذا الجزء يا بطل!'}"
            </p>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="border-b-2 border-slate-100 pb-3">
          <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full inline-block mb-1 border border-emerald-300">
            {unitTitle} · المحطة {currentPageIndex + 1}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
            {currentPage.title}
          </h2>
          {currentPage.subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1">
              {currentPage.subtitle}
            </p>
          )}
        </div>

        {/* ================= PAGE CONTENT RENDERING BY TYPE ================= */}

        {/* 1. INTRO / HOOK */}
        {currentPage.type === 'intro' && currentPage.introHook && (
          <div className="space-y-6">
            <div className="p-5 bg-sky-50 rounded-2xl border-2 border-sky-300 space-y-2">
              <span className="text-xs font-black text-sky-900 block flex items-center gap-1.5">
                <span>🤔</span>
                <span>سؤال التمهيد والتفكير:</span>
              </span>
              <p className="text-base sm:text-lg font-black text-sky-950 leading-relaxed">
                {currentPage.introHook.question}
              </p>
            </div>

            <div className="p-5 bg-amber-50/70 rounded-2xl border-2 border-amber-200 text-slate-800 space-y-2">
              <span className="text-xs font-black text-amber-900 block flex items-center gap-1.5">
                <span>📖</span>
                <span>القصة الاستهلالية:</span>
              </span>
              <p className="text-sm sm:text-base font-bold leading-relaxed text-slate-700">
                {currentPage.introHook.storyText}
              </p>
            </div>
          </div>
        )}

        {/* 2. OBJECTIVES */}
        {currentPage.type === 'objectives' && currentPage.objectivesList && (
          <div className="space-y-4">
            <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-300">
              <h3 className="text-base font-black text-amber-950 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>ماذا ستتقن وتتعلم في هذا الدرس؟</span>
              </h3>
              <ul className="space-y-3">
                {currentPage.objectivesList.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-amber-200 shadow-2xs">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                      {obj}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* PAGE LEVEL ILLUSTRATION IF AVAILABLE */}
        {currentPage.illustrationUrl && currentPage.type !== 'media' && (
          <div className="rounded-3xl overflow-hidden border-3 border-amber-300 shadow-md bg-slate-900 aspect-[16/9] w-full max-h-[380px] my-4">
            <img
              src={currentPage.illustrationUrl}
              alt={currentPage.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* PAGE LEVEL SHARIA AUDIO IF AVAILABLE */}
        {currentPage.audioRecording && (
          <div className="my-4">
            <ShariaAudioPlayer
              audioUrl={currentPage.audioRecording.audioUrl}
              title={currentPage.audioRecording.title}
              subtitle={currentPage.audioRecording.subtitle}
              badge={currentPage.audioRecording.badge || 'تسجيل الحكم الشرعي'}
            />
          </div>
        )}

        {/* 3. DETAILED CONTENT */}
        {currentPage.type === 'content' && currentPage.contentParagraphs && (
          <div className="space-y-6">
            {currentPage.contentParagraphs.map((par, i) => (
              <div key={i} className="space-y-4">
                {par.heading && (
                  <h3 className="text-lg sm:text-xl font-black text-emerald-950 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    <span>{par.heading}</span>
                  </h3>
                )}

                {par.illustration && (
                  <div className="rounded-2xl overflow-hidden border-2 border-emerald-300 shadow-sm aspect-[16/9] w-full max-h-[320px]">
                    <img
                      src={par.illustration}
                      alt={par.heading || ''}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <p className="text-sm sm:text-base font-bold text-slate-700 leading-loose">
                  {par.text}
                </p>

                {par.audioUrl && (
                  <ShariaAudioPlayer
                    audioUrl={par.audioUrl}
                    title={par.heading || 'استماع للشرح والحكم الشرعي'}
                    badge="تسجيل الحكم الشرعي"
                  />
                )}

                {par.bulletPoints && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-black text-slate-800 block">
                      عناصر هامة للتأمل:
                    </span>
                    <ul className="space-y-2">
                      {par.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-600">
                          <span className="text-emerald-600 font-black mt-0.5">•</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {par.takeaway && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-emerald-950 font-black text-xs sm:text-sm flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    <span>خلاصة مفيدة: {par.takeaway}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 4. QURANIC AYAH RECITATION */}
        {currentPage.type === 'quran' && currentPage.quranVerse && (
          <div className="space-y-6">
            {/* Dedicated Bismillah Recitation Player if present */}
            {currentPage.quranVerse.bismillahAudioUrl && (
              <ShariaAudioPlayer
                audioUrl={currentPage.quranVerse.bismillahAudioUrl}
                title="تلاوة البسملة الشريفة: «بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ»"
                subtitle="بصوت الشيخ مشاري راشد العفاسي"
                badge="تلاوة البسملة القرآنية"
              />
            )}

            <div className="p-6 sm:p-8 bg-gradient-to-b from-emerald-50 to-teal-50 rounded-3xl border-3 border-emerald-300 text-center space-y-4 relative shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-900 bg-white px-3 py-1 rounded-full border border-emerald-200">
                  {currentPage.quranVerse.surahName} · {currentPage.quranVerse.ayahNumber}
                </span>

                <button
                  onClick={() => handleSpeak(currentPage.quranVerse?.ayahText || '')}
                  className="game-btn-green inline-flex items-center gap-1.5 px-4 py-1.5 text-white text-xs font-black rounded-xl cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>استمع للآيات الكريمة 🔊</span>
                </button>
              </div>

              <p className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-950 leading-loose py-4 font-serif">
                ﴿ {currentPage.quranVerse.ayahText} ﴾
              </p>

              {/* Embedded Authentic Recitation Player */}
              <div className="pt-2">
                <QuranAudioPlayer
                  audioUrl={currentPage.quranVerse.recitationAudioUrl || "/assets/audio/surah_maarij.mp3"}
                  surahName={currentPage.quranVerse.surahName}
                  ayahRange={currentPage.quranVerse.ayahNumber}
                />
              </div>
            </div>

            {/* Vocabulary Table */}
            {currentPage.quranVerse.vocabularyMeanings && (
              <div className="space-y-2.5">
                <h4 className="text-sm font-black text-slate-800">
                  معاني المفردات والكلمات القرآنية:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPage.quranVerse.vocabularyMeanings.map((vocab, vIdx) => (
                    <div key={vIdx} className="p-3 bg-white rounded-xl border-2 border-amber-200 flex items-center justify-between gap-2 shadow-2xs">
                      <span className="text-xs sm:text-sm font-black text-emerald-800 font-serif">
                        {vocab.word}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {vocab.meaning}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              <span className="font-black text-amber-950 block mb-1">الهدايات والدروس المستفادة:</span>
              <p>{currentPage.quranVerse.guidance}</p>
            </div>
          </div>
        )}

        {/* 5. HADITH SHARIF */}
        {currentPage.type === 'hadith' && currentPage.hadithData && (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl border-3 border-amber-300 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-950 bg-white px-3 py-1 rounded-full border border-amber-200">
                  {currentPage.hadithData.narrator}
                </span>

                <button
                  onClick={() => handleSpeak(currentPage.hadithData?.hadithText || '')}
                  className="game-btn-gold inline-flex items-center gap-1.5 px-4 py-1.5 text-amber-950 text-xs font-black rounded-xl cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>استمع للحديث الشريف 🔊</span>
                </button>
              </div>

              <p className="text-lg sm:text-2xl font-black text-amber-950 leading-relaxed text-center py-3">
                {currentPage.hadithData.hadithText}
              </p>

              {/* Dedicated Sharia Audio Player for Hadith */}
              {currentPage.hadithData.audioUrl && (
                <div className="pt-2">
                  <ShariaAudioPlayer
                    audioUrl={currentPage.hadithData.audioUrl}
                    title="استماع لتسجيل الحديث النبوي الشريف"
                    subtitle={currentPage.hadithData.narrator}
                    badge="الحديث النبوي الشريف"
                  />
                </div>
              )}
            </div>

            {/* Lessons Learned */}
            {currentPage.hadithData.lessonsLearned && (
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 space-y-2">
                <span className="text-xs font-black text-slate-800 block">
                  ما يرشدنا إليه الحديث الشريف:
                </span>
                <ul className="space-y-1.5">
                  {currentPage.hadithData.lessonsLearned.map((ll, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-700">
                      <span className="text-amber-500 font-black mt-0.5">•</span>
                      <span>{ll}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 6. INTERACTIVE ACTIVITY (MATCHING, ORDERING, SELECTION) */}
        {currentPage.type === 'interactive_activity' && currentPage.activity && (
          <div className="space-y-5">
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300">
              <span className="text-xs font-black text-amber-900 block mb-1">التعليمات:</span>
              <p className="text-sm font-bold text-amber-950">
                {currentPage.activity.instruction}
              </p>
            </div>

            {/* Matching Type */}
            {currentPage.activity.type === 'matching' && currentPage.activity.pairs && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Left items */}
                  <div className="space-y-2">
                    <span className="text-xs font-black text-slate-500 block">الاسم الكريم:</span>
                    {currentPage.activity.pairs.map((p, idx) => {
                      const isMatched = matchedPairs.some((mp) => mp.startsWith(p.left));
                      const isSelected = selectedLeft === p.left;
                      return (
                        <button
                          key={idx}
                          disabled={isMatched}
                          onClick={() => handleMatchClick('left', p.left, currentPage.activity?.pairs || [])}
                          className={`w-full p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-black transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-400 opacity-60'
                              : isSelected
                              ? 'bg-amber-400 text-amber-950 border-amber-500 scale-102 shadow-md'
                              : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          {p.left} {isMatched && '✓'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right items */}
                  <div className="space-y-2">
                    <span className="text-xs font-black text-slate-500 block">المعنى المقابل:</span>
                    {currentPage.activity.pairs.map((p, idx) => {
                      const isMatched = matchedPairs.some((mp) => mp.endsWith(p.right));
                      return (
                        <button
                          key={idx}
                          disabled={isMatched}
                          onClick={() => handleMatchClick('right', p.right, currentPage.activity?.pairs || [])}
                          className={`w-full p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-black transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-400 opacity-60'
                              : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          {p.right} {isMatched && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {matchedPairs.length === currentPage.activity.pairs.length && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-400 text-center font-black text-emerald-950 text-sm">
                    🎉 أحسنت صنعاً! طابقت جميع الأسماء الكريمة بمعانيها بنجاح!
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 7. QUICK QUESTION AFTER CONTENT WITH IMMEDIATE FEEDBACK */}
        {currentPage.type === 'quick_question' && currentPage.activity && (
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
              {currentPage.activity.question}
            </h3>

            <div className="space-y-3">
              {currentPage.activity.options?.map((opt, oIdx) => {
                const isSelected = selectedSingleChoice === oIdx;
                let btnStyle = 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800';

                if (isAnswerChecked) {
                  if (Number(oIdx) === Number(currentPage.activity?.correctAnswer)) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-700 font-black';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600 font-black';
                  } else {
                    btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-300 text-amber-950 border-amber-400 font-black';
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isAnswerChecked}
                    onClick={() => handleCheckSingleChoice(oIdx, currentPage.activity?.correctAnswer || 0)}
                    className={`w-full p-4 rounded-2xl border-2 text-right text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center text-xs">
                      {oIdx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Immediate Feedback Box */}
            {isAnswerChecked && (
              <div
                className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-bold leading-relaxed space-y-1 ${
                  isAnswerCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-rose-50 border-rose-400 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-sm">
                  {isAnswerCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>إجابة صحيحة وممتازة! (+50 XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>محاولة جيدة، الإجابة الصحيحة هي المحددة باللون الأخضر.</span>
                    </>
                  )}
                </div>
                <p className="mt-1">{currentPage.activity.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* 8. EDUCATIONAL ILLUSTRATION & VISUAL LEARNING */}
        {currentPage.type === 'media' && currentPage.mediaPayload && (
          <div className="space-y-4">
            <div className="p-4 sm:p-6 bg-gradient-to-b from-sky-50 to-blue-50 rounded-3xl border-3 border-sky-300 shadow-md space-y-4 text-center">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-900 bg-white px-3 py-1 rounded-full border border-sky-200">
                  لوحة تعليمية تفاعلية
                </span>
                <a
                  href={currentPage.mediaPayload.mediaUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="game-btn-blue inline-flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  <span>تحميل اللوحة التعليمية 💾</span>
                </a>
              </div>

              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-slate-900">
                <img
                  src={currentPage.mediaPayload.mediaUrl}
                  alt={currentPage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                />
              </div>

              <div className="p-3 bg-white/90 rounded-2xl border border-sky-200">
                <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-xl mx-auto leading-relaxed">
                  {currentPage.mediaPayload.caption}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 9. FINAL QUIZ */}
        {currentPage.type === 'final_quiz' && currentPage.quizQuestions && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                أسئلة التقويم الختامي للدرس
              </h3>
              <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                {currentPage.quizQuestions.length} أسئلة ختامية
              </span>
            </div>

            <div className="space-y-6">
              {currentPage.quizQuestions.map((q, idx) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-slate-900">
                        {q.question}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mr-9">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selected === oIdx;
                        let optStyle = 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800';

                        if (isQuizSubmitted) {
                          if (oIdx === q.correctIndex) {
                            optStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                          } else if (isChosen && !isCorrect) {
                            optStyle = 'bg-rose-500 text-white border-rose-500';
                          } else {
                            optStyle = 'bg-white/60 text-slate-400 border-slate-100';
                          }
                        } else if (isChosen) {
                          optStyle = 'bg-amber-300 text-amber-950 border-amber-500 font-bold';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isQuizSubmitted}
                            onClick={() => {
                              sounds.playClick();
                              setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                            }}
                            className={`p-3 rounded-xl border text-right text-xs sm:text-sm font-semibold transition-all cursor-pointer ${optStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && (
                      <div className="mr-9 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-bold">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!isQuizSubmitted ? (
              <button
                onClick={() => {
                  sounds.playSuccess();
                  setIsQuizSubmitted(true);
                }}
                disabled={Object.keys(quizAnswers).length < currentPage.quizQuestions.length}
                className="game-btn-green w-full py-3 text-white text-xs sm:text-sm font-black rounded-2xl cursor-pointer disabled:opacity-50"
              >
                تحقق من إجابات التقويم الختامي ✓
              </button>
            ) : (
              <div className="p-4 bg-emerald-100 rounded-2xl border-2 border-emerald-400 text-center font-black text-emerald-950 text-sm">
                🎉 تم تسليم التقويم بنجاح! اضغط التالي للحصول على النجوم وشارات التتويج!
              </div>
            )}
          </div>
        )}

        {/* 10. SUMMARY & CORONATION */}
        {currentPage.type === 'summary' && currentPage.summaryCard && (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-400 text-amber-950 flex items-center justify-center text-5xl shadow-lg border-4 border-white animate-bounce">
              🏆
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              مبارك إتقان درس {lesson.title}!
            </h3>

            {/* Stars & Points Display */}
            <div className="flex items-center justify-center gap-4">
              <div className="px-5 py-2 bg-amber-100 rounded-2xl border-2 border-amber-300 font-black text-base text-amber-950">
                ⭐⭐⭐ 3 نجوم كاملة
              </div>
              <div className="px-5 py-2 bg-emerald-100 rounded-2xl border-2 border-emerald-300 font-black text-base text-emerald-950">
                +{currentPage.summaryCard.awardedXp} XP خبرة
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 text-right space-y-2">
              <span className="text-xs font-black text-slate-800 block">
                ملخص ما تعلمناه اليوم:
              </span>
              <ul className="space-y-1.5">
                {currentPage.summaryCard.keyTakeaways.map((kt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-700">
                    <span className="text-emerald-500 font-black">✓</span>
                    <span>{kt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Item */}
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-right">
              <span className="text-xs font-black text-amber-950 block mb-1">
                🌟 مهمة العمل الصالح اليومية:
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-700">
                {currentPage.summaryCard.actionItem}
              </p>
            </div>
          </div>
        )}

        {/* ================= BOTTOM STEPPER BAR ================= */}
        <div className="pt-6 border-t-2 border-slate-100 flex items-center justify-between gap-3">
          <button
            disabled={currentPageIndex === 0}
            onClick={handlePrevPage}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
            <span>الصفحة السابقة</span>
          </button>

          {currentPageIndex + 1 < totalPages ? (
            <button
              onClick={handleNextPage}
              className="game-btn-green flex items-center gap-2 px-6 py-2.5 text-white text-xs sm:text-sm font-black rounded-xl cursor-pointer"
            >
              <span>الصفحة التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNextPage}
              className="game-btn-gold flex items-center gap-2 px-7 py-2.5 text-amber-950 text-xs sm:text-sm font-black rounded-xl cursor-pointer"
            >
              <span>إنهاء وحصد المكافأة 🏆</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle2,
  Volume2,
  BookOpen,
  HelpCircle,
  Award,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson } from '../types/curriculum';
import { sounds } from '../utils/soundEffects';
import { ASSETS } from '../data/assets';

interface LessonReaderProps {
  lesson: Lesson;
  unitTitle: string;
  isCompleted: boolean;
  onCompleteLesson: (lessonId: string) => void;
  onBack: () => void;
  onNextLesson?: () => void;
  onPreviousLesson?: () => void;
}

export const LessonReader: React.FC<LessonReaderProps> = ({
  lesson,
  unitTitle,
  isCompleted,
  onCompleteLesson,
  onBack,
  onNextLesson,
  onPreviousLesson,
}) => {
  const [activeTab, setActiveTab] = useState<'study' | 'quiz'>('study');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  const quizList = lesson.quiz || [];
  const objectivesList = lesson.objectives || [];
  const sectionsList = lesson.sections || [];

  // Calculate quiz score
  const correctCount = quizList.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    sounds.playClick();
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    sounds.playClick();
    setQuizSubmitted(true);
    if (quizList.length > 0 && correctCount === quizList.length) {
      sounds.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onCompleteLesson(lesson.id);
    } else if (correctCount > 0) {
      sounds.playSuccess();
    } else {
      sounds.playIncorrect();
    }
  };

  const handleResetQuiz = () => {
    sounds.playClick();
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  const handleSpeak = (text: string) => {
    sounds.playClick();
    setSpeakingText(text);
    sounds.speakArabic(text, () => {
      setSpeakingText(null);
    });
  };

  const handleMarkAsCompleted = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
    onCompleteLesson(lesson.id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 text-right">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة لقائمة الوحدات</span>
        </button>

        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {unitTitle}
        </span>

        <div className="flex items-center gap-2">
          {onPreviousLesson && (
            <button
              onClick={() => {
                sounds.playClick();
                onPreviousLesson();
              }}
              title="الدرس السابق"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {onNextLesson && (
            <button
              onClick={() => {
                sounds.playClick();
                onNextLesson();
              }}
              title="الدرس التالي"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-black mb-2">
            <BookOpen className="w-4 h-4" />
            <span>وقت التعلم المقترح: {lesson.durationMinutes} دقيقة</span>
            {isCompleted && (
              <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 px-2.5 py-0.5 rounded-full text-xs">
                مكتمل بنجاح ✓
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white mb-2">
            {lesson.title}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-medium">
            {lesson.subtitle}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mt-6 p-1 bg-black/20 backdrop-blur-md rounded-2xl w-max border border-white/10">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('study');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'study'
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              📖 الشرح والآيات
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('quiz');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              ❓ تدريب سريع وفهم ({quizList.length} أسئلة)
            </button>
          </div>
        </div>
      </div>

      {/* Study Mode Content */}
      {activeTab === 'study' && (
        <div className="space-y-6">
          {/* 1. Learning Objectives (أهداف الدرس) */}
          <div className="bg-amber-50/80 border-2 border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>أهداف الدرس (ماذا سنتعلم اليوم؟):</span>
            </h3>
            <ul className="space-y-2">
              {objectivesList.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-xs shrink-0 mt-0.5 font-black">
                    {i + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Quranic Ayahs (الآيات الكريمة) */}
          {lesson.quranVerses && lesson.quranVerses.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-emerald-900 flex items-center gap-2">
                <span>📖</span>
                <span>الآيات القرآنية المقررة</span>
              </h3>
              {lesson.quranVerses.map((verse, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50/60 border-2 border-emerald-300/80 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-xs"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200">
                      {verse.surah} · {verse.number}
                    </span>
                    <button
                      onClick={() => handleSpeak(verse.ayah)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{speakingText === verse.ayah ? 'جارِ التلاوة...' : 'استمع للتلاوة'}</span>
                    </button>
                  </div>

                  <p className="text-lg sm:text-2xl font-black text-emerald-950 leading-loose tracking-wide py-2 font-serif">
                    ﴿ {verse.ayah} ﴾
                  </p>

                  <div className="mt-4 pt-4 border-t border-emerald-200/80 text-right">
                    <span className="text-xs font-black text-emerald-900 block mb-1">
                      المعنى والتدبر:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                      {verse.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. Prophetic Hadiths (الحديث النبوي الشريف) */}
          {lesson.hadiths && lesson.hadiths.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-amber-900 flex items-center gap-2">
                <span>✨</span>
                <span>الحديث النبوي الشريف</span>
              </h3>
              {lesson.hadiths.map((h, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/70 border-2 border-amber-300/80 rounded-3xl p-6 relative shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-amber-900 bg-white px-3 py-1 rounded-full border border-amber-200">
                      {h.narrator}
                    </span>
                    <button
                      onClick={() => handleSpeak(h.text)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{speakingText === h.text ? 'جارِ القراءة...' : 'استمع للحديث'}</span>
                    </button>
                  </div>

                  <p className="text-base sm:text-lg font-black text-amber-950 leading-relaxed py-2">
                    « {h.text} »
                  </p>

                  <div className="mt-3 pt-3 border-t border-amber-200/70">
                    <span className="text-xs font-black text-amber-900 block mb-0.5">
                      ما يرشدنا إليه الحديث:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                      {h.lessonLearned}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Lesson Sections (فقرات الشرح الميسر) */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>عناصر وشرح الدرس</span>
            </h3>

            {sectionsList.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4"
              >
                <h4 className="text-base sm:text-lg font-black text-emerald-900 border-b border-slate-100 pb-2">
                  {sec.title}
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-semibold">
                  {sec.content}
                </p>

                {sec.keyPoints && sec.keyPoints.length > 0 && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-xs font-black text-slate-800 block">
                      نقاط ذهبية أساسية:
                    </span>
                    <ul className="space-y-1.5">
                      {sec.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-bold">
                          <span className="text-emerald-500 font-black mt-0.5">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {sec.takeaway && (
                  <div className="bg-emerald-50 text-emerald-950 p-3.5 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-black flex items-center gap-2">
                    <span className="text-base">💡</span>
                    <span>خلاصة مفيدة: {sec.takeaway}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 5. Mentor Guide Box (نصيحة أنس) */}
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-5 shadow-md">
            <img
              src={ASSETS.mentorGuide}
              alt="المرشد أنس"
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-300 shrink-0 shadow-sm"
            />
            <div className="flex-1 text-right">
              <span className="text-xs font-black text-amber-300 block mb-1">
                نصيحة وتوجيه المرشد أنس:
              </span>
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                "{lesson.mentorAdvice || 'بارك الله فيك يا بطل على حرصك واجتهادك في طلب العلم!'}"
              </p>
              <button
                onClick={() => handleSpeak(lesson.mentorAdvice || 'بارك الله فيك يا بطل!')}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-200" />
                <span>استمع لصوت أنس</span>
              </button>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <span className="text-xs font-bold text-slate-500 block">
                هل انتهيت من قراءة وفهم الدرس؟
              </span>
              <span className="text-sm font-black text-slate-800">
                انتقل للتدريب السريع لتثبيت معلوماتك واكتساب النقاط!
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveTab('quiz');
                }}
                className="btn-tactile-amber px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-sm rounded-xl cursor-pointer"
              >
                ابدأ التدريب السريع ❓
              </button>

              <button
                onClick={handleMarkAsCompleted}
                className="btn-tactile-emerald px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl cursor-pointer"
              >
                {isCompleted ? 'تم إتمام الدرس بنجاح ✓' : 'تسجيل إتمام الدرس ⭐'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Mode Content */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  اختبر معلوماتك في هذا الدرس
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  أجب عن الأسئلة التالية ثم اضغط على زر "تحقق من الإجابات"
                </p>
              </div>

              {quizSubmitted && (
                <div className="text-center px-4 py-2 bg-emerald-50 border border-emerald-300 rounded-2xl">
                  <span className="text-xs font-bold text-emerald-700 block">نتيجتك:</span>
                  <span className="text-lg font-black text-emerald-900 tabular-nums">
                    {correctCount} / {quizList.length}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {quizList.map((q, idx) => {
                const selected = userAnswers[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 sm:p-6 rounded-2xl border-2 transition-all ${
                      quizSubmitted
                        ? isCorrect
                          ? 'border-emerald-400 bg-emerald-50/40'
                          : 'border-rose-300 bg-rose-50/40'
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mr-10">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selected === oIdx;
                        let optionStyle = 'bg-white border-slate-200 hover:border-emerald-400 text-slate-700';

                        if (quizSubmitted) {
                          if (oIdx === q.correctIndex) {
                            optionStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                          } else if (isChosen && !isCorrect) {
                            optionStyle = 'bg-rose-500 text-white border-rose-500';
                          } else {
                            optionStyle = 'bg-white/60 text-slate-400 border-slate-100';
                          }
                        } else if (isChosen) {
                          optionStyle = 'bg-emerald-100 text-emerald-900 border-emerald-500 font-bold';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`p-3.5 rounded-xl border text-right text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-2 cursor-pointer ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && oIdx === q.correctIndex && (
                              <Check className="w-4 h-4 text-white shrink-0" />
                            )}
                            {quizSubmitted && isChosen && !isCorrect && (
                              <X className="w-4 h-4 text-white shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation after submit */}
                    {quizSubmitted && (
                      <div className="mt-4 mr-10 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                        <span className="font-bold text-emerald-800 block mb-0.5">التوضيح التعليمي:</span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Buttons */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(userAnswers).length === 0}
                  className="btn-tactile-emerald px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  تحقق من الإجابات الآن ✓
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة المحاولة</span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      setActiveTab('study');
                    }}
                    className="px-4 py-2.5 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl hover:bg-emerald-100 cursor-pointer"
                  >
                    العودة لمراجعة الشرح
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

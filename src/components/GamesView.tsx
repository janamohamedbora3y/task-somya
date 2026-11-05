import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  Volume2,
  Shuffle,
  Star,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { ASSETS } from '../data/assets';

interface GamesViewProps {
  onEarnReward: (xp: number, coins: number) => void;
  studentName: string;
}

// ---------------- GAME 1: KNOWLEDGE KNIGHTS QUESTIONS ----------------
const KNIGHTS_QUESTIONS = [
  {
    q: 'كم عدد أولي العزم من الرسل الكرام؟',
    opts: ['ثلاثة', 'أربعة', 'خمسة', 'سبعة'],
    ans: 2,
    exp: 'أولو العزم خمسة: نوح، إبراهيم، موسى، عيسى، ومحمد ﷺ.',
  },
  {
    q: 'الصحابي الجليل الذي نام في فراش النبي ﷺ ليلة الهجرة هو:',
    opts: ['أبو بكر الصديق', 'علي بن أبي طالب', 'عمر بن الخطاب', 'عثمان بن عفان'],
    ans: 1,
    exp: 'نام سيدنا علي بن أبي طالب لرد الأمانات وتمويه مشركي قريش.',
  },
  {
    q: 'ما حكم الإنصات لخطبة الجمعة أثناء إلقائها؟',
    opts: ['سنة مستحبة', 'واجب ومفروض', 'مباح', 'مكروه'],
    ans: 1,
    exp: 'الإنصات واجب ويبطل ثواب من يلغو أثناء الخطبة.',
  },
  {
    q: 'أم المؤمنين صاحبة الرأي الحكيم في صلح الحديبية هي:',
    opts: ['السيدة عائشة', 'السيدة خديجة', 'السيدة أم سلمة', 'السيدة حفصة'],
    ans: 2,
    exp: 'أشارت السيدة أم سلمة رضي الله عنها على النبي بالحلق والنحر فاقتدى به الصحابة.',
  },
  {
    q: 'في سورة الحشر، الاسم الإلهي الذي يعني المنزه عن كل نقص هو:',
    opts: ['الرحيم', 'القدوس', 'العزيز', 'الخالق'],
    ans: 1,
    exp: 'القدوس هو الطاهر المنزه عن كل عيب ونقص.',
  },
  {
    q: 'قال النبي ﷺ: «إن الصدق يهدي إلى البر وإن البر يهدي إلى...»',
    opts: ['الشهرة', 'الجنة', 'المال', 'الراحة فقط'],
    ans: 1,
    exp: 'الصدق يهدي إلى البر والبر يهدي إلى الجنة.',
  },
  {
    q: 'ماذا قرن الله سبحانه بتوحيده وعبادته في سورة الإسراء؟',
    opts: ['السفر للتجارة', 'الإحسان بالوالدين', 'بناء المساجد', 'طلب الرزق'],
    ans: 1,
    exp: 'قال تعالى: "وقضى ربك ألا تعبدوا إلا إياه وبالوالدين إحسانا".',
  },
  {
    q: 'ماذا قال النبي ﷺ لأبي بكر في غار ثور؟',
    opts: ['أسرع بالهرب', 'لا تحزن إن الله معنا', 'استسلم', 'قاتلهم'],
    ans: 1,
    exp: 'طمأنه النبي بيقين عظيم: "لا تحزن إن الله معنا".',
  },
];

// ---------------- GAME 2: AYAH & HADITH ORDER PUZZLES ----------------
const PUZZLE_LEVELS = [
  {
    id: 1,
    title: 'حديث الصدق والبر',
    source: 'حديث نبوي شريف',
    correctWords: ['عَلَيْكُمْ', 'بِالصِّدْقِ', 'فَإِنَّ', 'الصِّدْقَ', 'يَهْدِي', 'إِلَى', 'البِرِّ'],
  },
  {
    id: 2,
    title: 'آية الإحسان بالوالدين',
    source: 'سورة الإسراء: ٢٣',
    correctWords: ['وَقَضَىٰ', 'رَبُّكَ', 'أَلَّا', 'تَعْبُدُوا', 'إِلَّا', 'إِيَّاهُ', 'وَبِالْوَالِدَيْنِ', 'إِحْسَانًا'],
  },
  {
    id: 3,
    title: 'يقين الغار في الهجرة',
    source: 'سورة التوبة: ٤٠',
    correctWords: ['إِذْ', 'يَقُولُ', 'لِصَاحِبِهِ', 'لَا', 'تَحْزَنْ', 'إِنَّ', 'اللَّهَ', 'مَعَنَا'],
  },
];

// ---------------- GAME 3: MEMORY MATCH PAIRS ----------------
interface MemoryCard {
  id: number;
  pairId: number;
  text: string;
  category: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MEMORY_DATA = [
  { pairId: 1, text1: 'أولو العزم', text2: 'نوح، إبراهيم، موسى، عيسى، محمد ﷺ', category: 'عقيدة' },
  { pairId: 2, text1: 'صلاة الجمعة', text2: 'ركعتان جهريتان بعد خطبتين', category: 'عبادة' },
  { pairId: 3, text1: 'أبو بكر الصديق', text2: 'أول من آمن من الرجال ورفيق الغار', category: 'سيرة' },
  { pairId: 4, text1: 'السيدة أم سلمة', text2: 'صاحبة المشورة الحكيمة بالحديبية', category: 'سيرة' },
  { pairId: 5, text1: 'حق الوالدين', text2: 'قرنه الله بتوحيده ونهى عن التأفف', category: 'أخلاق' },
  { pairId: 6, text1: 'الصادق الأمين', text2: 'لقب النبي ﷺ في مكة قبل البعثة', category: 'سيرة' },
];

export const GamesView: React.FC<GamesViewProps> = ({ onEarnReward, studentName }) => {
  const [activeGame, setActiveGame] = useState<'knights' | 'puzzle' | 'memory' | 'wheel'>('knights');

  // ---------- GAME 1 STATE ----------
  const [knightIndex, setKnightIndex] = useState(0);
  const [knightScore, setKnightScore] = useState(0);
  const [knightStreak, setKnightStreak] = useState(0);
  const [knightFinished, setKnightFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // ---------- GAME 2 STATE ----------
  const [puzzleLevelIndex, setPuzzleLevelIndex] = useState(0);
  const currentPuzzle = PUZZLE_LEVELS[puzzleLevelIndex];
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [userSelectedWords, setUserSelectedWords] = useState<string[]>([]);
  const [puzzleSuccess, setPuzzleSuccess] = useState(false);

  // ---------- GAME 3 STATE ----------
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryFinished, setMemoryFinished] = useState(false);

  // ---------- GAME 4 STATE (WHEEL) ----------
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<{ label: string; text: string; coins: number } | null>(null);

  // Initialize Puzzle
  useEffect(() => {
    resetPuzzle();
  }, [puzzleLevelIndex]);

  const resetPuzzle = () => {
    const words = [...currentPuzzle.correctWords].sort(() => Math.random() - 0.5);
    setScrambledWords(words);
    setUserSelectedWords([]);
    setPuzzleSuccess(false);
  };

  // Initialize Memory Game
  useEffect(() => {
    initMemoryGame();
  }, []);

  const initMemoryGame = () => {
    const cards: MemoryCard[] = [];
    let idCounter = 0;
    MEMORY_DATA.forEach((item) => {
      cards.push({
        id: idCounter++,
        pairId: item.pairId,
        text: item.text1,
        category: item.category,
        isFlipped: false,
        isMatched: false,
      });
      cards.push({
        id: idCounter++,
        pairId: item.pairId,
        text: item.text2,
        category: item.category,
        isFlipped: false,
        isMatched: false,
      });
    });
    // Shuffle cards
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setFlippedIndices([]);
    setMemoryMoves(0);
    setMemoryFinished(false);
  };

  // ---------------- HANDLERS FOR GAME 1 (KNIGHTS) ----------------
  const handleKnightAnswer = (optIndex: number) => {
    if (isAnswerRevealed) return;
    sounds.playClick();
    setSelectedOption(optIndex);
    setIsAnswerRevealed(true);

    const isCorrect = optIndex === KNIGHTS_QUESTIONS[knightIndex].ans;
    if (isCorrect) {
      sounds.playSuccess();
      const streakBonus = (knightStreak + 1) * 20;
      setKnightScore((prev) => prev + 100 + streakBonus);
      setKnightStreak((prev) => prev + 1);
    } else {
      sounds.playIncorrect();
      setKnightStreak(0);
    }

    // Auto next after 1.5 seconds
    setTimeout(() => {
      if (knightIndex + 1 < KNIGHTS_QUESTIONS.length) {
        setKnightIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswerRevealed(false);
      } else {
        setKnightFinished(true);
        sounds.playFanfare();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        onEarnReward(300, 50);
      }
    }, 1500);
  };

  const resetKnightGame = () => {
    sounds.playClick();
    setKnightIndex(0);
    setKnightScore(0);
    setKnightStreak(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setKnightFinished(false);
  };

  // ---------------- HANDLERS FOR GAME 2 (PUZZLE) ----------------
  const handlePickWord = (word: string, index: number) => {
    if (puzzleSuccess) return;
    sounds.playClick();
    const newScrambled = [...scrambledWords];
    newScrambled.splice(index, 1);
    setScrambledWords(newScrambled);

    const newUserWords = [...userSelectedWords, word];
    setUserSelectedWords(newUserWords);

    // If all words are placed, check order
    if (newUserWords.length === currentPuzzle.correctWords.length) {
      const isCorrect = newUserWords.every((w, i) => w === currentPuzzle.correctWords[i]);
      if (isCorrect) {
        sounds.playFanfare();
        setPuzzleSuccess(true);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
        onEarnReward(150, 25);
      } else {
        sounds.playIncorrect();
      }
    }
  };

  const handleReturnWord = (word: string, index: number) => {
    if (puzzleSuccess) return;
    sounds.playClick();
    const newUserWords = [...userSelectedWords];
    newUserWords.splice(index, 1);
    setUserSelectedWords(newUserWords);

    setScrambledWords([...scrambledWords, word]);
  };

  // ---------------- HANDLERS FOR GAME 3 (MEMORY) ----------------
  const handleCardClick = (cardIdx: number) => {
    if (flippedIndices.length === 2) return;
    if (memoryCards[cardIdx].isFlipped || memoryCards[cardIdx].isMatched) return;

    sounds.playClick();
    const newCards = [...memoryCards];
    newCards[cardIdx].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, cardIdx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves((m) => m + 1);
      const firstCard = newCards[newFlipped[0]];
      const secondCard = newCards[newFlipped[1]];

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        sounds.playSuccess();
        setTimeout(() => {
          newCards[newFlipped[0]].isMatched = true;
          newCards[newFlipped[1]].isMatched = true;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);

          // Check if all matched
          if (newCards.every((c) => c.isMatched)) {
            setMemoryFinished(true);
            sounds.playFanfare();
            confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
            onEarnReward(250, 40);
          }
        }, 500);
      } else {
        // Not matched
        sounds.playIncorrect();
        setTimeout(() => {
          newCards[newFlipped[0]].isFlipped = false;
          newCards[newFlipped[1]].isFlipped = false;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  // ---------------- HANDLERS FOR GAME 4 (WHEEL) ----------------
  const spinWheel = () => {
    if (isSpinning) return;
    sounds.playClick();
    setIsSpinning(true);
    setWheelResult(null);

    const randomRot = 1440 + Math.floor(Math.random() * 360);
    const newRot = wheelRotation + randomRot;
    setWheelRotation(newRot);

    const outcomes = [
      { label: 'سؤال في العقيدة', text: 'ما الحكمة من إرسال الرسل؟ هداية الناس وتعليمهم عبادة الله الواحد.', coins: 30 },
      { label: 'تحدي عمل صالح', text: 'بادر الآن وقبّل يد والديك أو ارسل لهما دعاء طيباً!', coins: 50 },
      { label: 'كنز الحسنات الفوري', text: 'ردد الآن ثلاثاً: سبحان الله وبحمده سبحان الله العظيم.', coins: 40 },
      { label: 'سؤال في السيرة', text: 'من صاحب النبي في الغار؟ أبو بكر الصديق رضي الله عنه.', coins: 35 },
      { label: 'فقه الصلاة', text: 'ما هي سنن الجمعة؟ الغسل، الطيب، وقراءة الكهف، والإنصات للخطيب.', coins: 45 },
    ];

    setTimeout(() => {
      setIsSpinning(false);
      const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      setWheelResult(outcome);
      sounds.playSuccess();
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      onEarnReward(100, outcome.coins);
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-16 text-right">
      {/* Games Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-xs font-black rounded-full mb-3 backdrop-blur-xs">
            <Gamepad2 className="w-4 h-4 text-amber-200" />
            <span>واحة التحدي والمرح الإسلامي</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            الألعاب التعليمية الإسلامية
          </h1>
          <p className="text-xs sm:text-base text-amber-100 font-semibold mt-1">
            العب وتعلم وثبّت معلومات مقرر التربية الإسلامية واكسب العملات الذهبية وشارات التفوق!
          </p>
        </div>

        <div className="relative shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-white/40 shadow-md">
          <img
            src={ASSETS.gameAdventure}
            alt="الألعاب التعليمية"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-1.5 bg-white border border-slate-200 rounded-3xl shadow-xs">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveGame('knights');
          }}
          className={`p-3 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
            activeGame === 'knights'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Trophy className="w-5 h-5 text-amber-200 shrink-0" />
          <span>فرسان المعرفة</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveGame('puzzle');
          }}
          className={`p-3 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
            activeGame === 'puzzle'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Shuffle className="w-5 h-5 text-emerald-200 shrink-0" />
          <span>ترتيب الآيات والحديث</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveGame('memory');
          }}
          className={`p-3 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
            activeGame === 'memory'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-5 h-5 text-sky-200 shrink-0" />
          <span>بطاقات الذاكرة</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveGame('wheel');
          }}
          className={`p-3 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
            activeGame === 'wheel'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-5 h-5 text-purple-200 shrink-0" />
          <span>عجلة التحدي والفضائل</span>
        </button>
      </div>

      {/* ================= GAME 1: KNIGHTS QUIZ RUSH ================= */}
      {activeGame === 'knights' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          {!knightFinished ? (
            <div>
              {/* Knights Scoreboard */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-500">
                    السؤال {knightIndex + 1} من {KNIGHTS_QUESTIONS.length}
                  </span>
                  {knightStreak > 1 && (
                    <div className="flex items-center gap-1 text-xs font-black text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full animate-bounce">
                      <Flame className="w-4 h-4 fill-orange-500" />
                      <span>متتالي {knightStreak}x!</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-900 px-3 py-1 rounded-xl font-black text-sm tabular-nums">
                    النقاط: {knightScore}
                  </div>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {KNIGHTS_QUESTIONS[knightIndex].q}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {KNIGHTS_QUESTIONS[knightIndex].opts.map((opt, i) => {
                  let btnStyle = 'bg-slate-50 hover:bg-amber-50 border-slate-200 hover:border-amber-400 text-slate-800';

                  if (isAnswerRevealed) {
                    if (i === KNIGHTS_QUESTIONS[knightIndex].ans) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                    } else if (selectedOption === i) {
                      btnStyle = 'bg-rose-500 text-white border-rose-500';
                    } else {
                      btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswerRevealed}
                      onClick={() => handleKnightAnswer(i)}
                      className={`p-4 rounded-2xl border-2 text-right font-black text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      <span className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center text-xs">
                        {i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when revealed */}
              {isAnswerRevealed && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-bold">
                  {KNIGHTS_QUESTIONS[knightIndex].exp}
                </div>
              )}
            </div>
          ) : (
            /* Knight Victory Screen */
            <div className="text-center py-10 space-y-4">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-5xl shadow-inner">
                🏆
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                أحسنت يا فارس المعرفة {studentName}!
              </h3>
              <p className="text-slate-600 font-bold text-sm sm:text-base">
                أتممت جولة فرسان المعرفة بنجاح وحققت مجموع نقاط رائع:
              </p>
              <div className="inline-block px-6 py-2 bg-amber-500 text-white font-black text-2xl rounded-2xl shadow-md tabular-nums">
                {knightScore} نقطة + 50 عملة ذهبية!
              </div>

              <div className="pt-6">
                <button
                  onClick={resetKnightGame}
                  className="btn-tactile-emerald px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-sm cursor-pointer"
                >
                  العب جولة جديدة 🔄
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= GAME 2: PUZZLE SEQUENCER ================= */}
      {activeGame === 'puzzle' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {currentPuzzle.source}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                رتب الكلمات في مكانها الصحيح لتكوين: {currentPuzzle.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {PUZZLE_LEVELS.map((lvl, idx) => (
                <button
                  key={lvl.id}
                  onClick={() => {
                    sounds.playClick();
                    setPuzzleLevelIndex(idx);
                  }}
                  className={`w-8 h-8 rounded-xl font-black text-xs cursor-pointer ${
                    puzzleLevelIndex === idx
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Constructed Sentence Box (User Selection) */}
          <div className="min-h-28 p-5 rounded-2xl bg-slate-50 border-2 border-dashed border-emerald-300 flex flex-wrap items-center gap-2.5">
            {userSelectedWords.length === 0 ? (
              <span className="text-xs sm:text-sm text-slate-400 font-semibold mx-auto">
                اضغط على الكلمات بالأسفل لترتيبها هنا بالترتيب الصحيح...
              </span>
            ) : (
              userSelectedWords.map((word, i) => (
                <button
                  key={i}
                  onClick={() => handleReturnWord(word, i)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-xs transition-transform hover:scale-105 cursor-pointer"
                  title="اضغط لإعادة الكلمة"
                >
                  {word}
                </button>
              ))
            )}
          </div>

          {/* Available Words Pool */}
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-3">
              الكلمات المتاحة للترتيب:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {scrambledWords.map((word, i) => (
                <button
                  key={i}
                  onClick={() => handlePickWord(word, i)}
                  className="px-4 py-2.5 bg-amber-100/90 hover:bg-amber-200 text-amber-950 font-black text-sm rounded-xl border border-amber-300 shadow-2xs hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Status and Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={resetPuzzle}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة المحاولة</span>
            </button>

            {puzzleSuccess && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>أحسنت! ترتيب مبارك وصحيح (+150 XP)</span>
                </span>
                {puzzleLevelIndex + 1 < PUZZLE_LEVELS.length && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setPuzzleLevelIndex((p) => p + 1);
                    }}
                    className="btn-tactile-emerald px-4 py-2 bg-emerald-600 text-white text-xs font-black rounded-xl cursor-pointer"
                  >
                    اللغز التالي ⬅
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= GAME 3: MEMORY CARDS ================= */}
      {activeGame === 'memory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                بطاقات الذاكرة والمفاهيم الإسلامية
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                اقلب البطاقات وطابق بين كل مفهوم ومعناه أو شاهده في المقرر
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl tabular-nums">
                الحركات: {memoryMoves}
              </span>
              <button
                onClick={initMemoryGame}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                title="إعادة توزيع البطاقات"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {memoryCards.map((card, idx) => {
              const isVisible = card.isFlipped || card.isMatched;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={`h-32 sm:h-36 rounded-2xl p-4 text-center flex flex-col items-center justify-center transition-all duration-300 cursor-pointer select-none border-2 shadow-2xs ${
                    card.isMatched
                      ? 'bg-emerald-100/90 border-emerald-400 text-emerald-950 scale-95 opacity-80'
                      : isVisible
                      ? 'bg-white border-amber-400 text-slate-900 shadow-md rotate-0'
                      : 'bg-gradient-to-br from-teal-700 to-emerald-800 border-emerald-600 text-white hover:scale-102'
                  }`}
                >
                  {isVisible ? (
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
                        {card.category}
                      </span>
                      <p className="text-xs sm:text-sm font-black leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-2xl">🕌</span>
                      <span className="text-[11px] font-black text-emerald-200">
                        تربية إسلامية
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {memoryFinished && (
            <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl text-center space-y-3">
              <span className="text-4xl">🎉</span>
              <h4 className="text-xl font-black text-emerald-950">
                رائع جداً! طابقت جميع البطاقات بنجاح
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 font-bold">
                أنهيت اللعبة في {memoryMoves} حركة فقط. تم إضافة 250 XP و 40 عملة ذهبية!
              </p>
              <button
                onClick={initMemoryGame}
                className="btn-tactile-emerald px-6 py-2.5 bg-emerald-600 text-white font-black text-xs rounded-xl cursor-pointer"
              >
                العب مرة أخرى 🔄
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= GAME 4: WHEEL OF VIRTUES ================= */}
      {activeGame === 'wheel' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-center space-y-6">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-black text-slate-900">
              عجلة التحدي والفضائل الإسلامية
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              أدر العجلة لتحصل على سؤال، أو تحدٍ لعمل صالح، أو مكافأة عملات فورية!
            </p>
          </div>

          {/* Wheel Graphic */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-4 flex items-center justify-center">
            {/* Pointer arrow */}
            <div className="absolute top-0 z-20 -mt-2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-500 drop-shadow-md" />

            {/* Rotating Wheel */}
            <div
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transition: isSpinning ? 'transform 3s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
              }}
              className="w-full h-full rounded-full border-8 border-amber-300 shadow-xl overflow-hidden relative bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-600 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-400 flex items-center justify-center font-black text-amber-700 text-xs shadow-md z-10">
                ⭐
              </div>
              {/* Slices decoration */}
              <div className="absolute inset-0 flex items-center justify-center text-white font-black text-[11px] pointer-events-none">
                <span className="absolute top-6">عقيدة</span>
                <span className="absolute bottom-6">أخلاق</span>
                <span className="absolute right-6">سيرة</span>
                <span className="absolute left-6">عبادة</span>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className="btn-tactile-amber px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-base rounded-2xl cursor-pointer disabled:opacity-50"
            >
              {isSpinning ? 'العجلة تدور...' : 'أدر العجلة الآن 🎡'}
            </button>
          </div>

          {wheelResult && (
            <div className="max-w-lg mx-auto p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl text-right space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
                  {wheelResult.label}
                </span>
                <span className="text-xs font-black text-emerald-700">
                  +{wheelResult.coins} عملة ذهبية!
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-relaxed">
                {wheelResult.text}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

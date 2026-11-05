export type PageType =
  | 'intro'                // 1. مقدمة وتمهيد تفاعلي
  | 'objectives'           // 2. أهداف التعلم
  | 'content'              // 3. شرح مفصل للمحتوى الأصلي
  | 'quran'                // 6. تلاوة صوتية وتدبر الآيات القرآنية
  | 'hadith'               // حديث شريف وتدبر
  | 'media'                // 5. وسائط ورسوم ومقاطع مرئية
  | 'interactive_activity' // 7. أنشطة تفاعلية (ترتيب، مطابقة، صح وخطأ، ملء فراغات)
  | 'quick_question'       // 8. أسئلة أثناء الشرح مع تغذية راجعة فورية
  | 'final_quiz'           // 10. تقويم ختامي للدرس
  | 'summary';             // 11. ملخص ومراجعة وتتويج بالنجوم وفتح التالي

export type ActivityType =
  | 'single_choice'
  | 'true_false'
  | 'ordering'
  | 'matching'
  | 'fill_blank';

export interface InteractiveActivity {
  id: string;
  type: ActivityType;
  instruction: string;
  question: string;
  options?: string[];
  correctAnswer: string | number | string[];
  explanation: string;
  pairs?: { left: string; right: string }[];
  scrambledItems?: string[];
  correctSequence?: string[];
}

export interface LessonPage {
  id: string;
  pageNumber: number;
  type: PageType;
  title: string;
  subtitle?: string;
  mentorPrompt?: string;
  audioText?: string;
  
  audioRecording?: {
    audioUrl: string;
    title: string;
    subtitle?: string;
    badge?: string;
  };
  illustrationUrl?: string;
  
  introHook?: {
    question: string;
    storyText: string;
    illustration?: string;
  };
  objectivesList?: string[];
  contentParagraphs?: {
    heading?: string;
    text: string;
    illustration?: string;
    audioUrl?: string;
    bulletPoints?: string[];
    takeaway?: string;
  }[];
  quranVerse?: {
    ayahText: string;
    surahName: string;
    ayahNumber: string;
    recitationAudioUrl?: string;
    bismillahAudioUrl?: string;
    vocabularyMeanings?: { word: string; meaning: string }[];
    guidance: string;
  };
  hadithData?: {
    hadithText: string;
    narrator: string;
    audioUrl?: string;
    vocabularyMeanings?: { word: string; meaning: string }[];
    lessonsLearned: string[];
  };
  mediaPayload?: {
    mediaType: 'image' | 'video' | 'interactive_diagram';
    mediaUrl: string;
    caption: string;
    interactivePrompt?: string;
  };
  activity?: InteractiveActivity;
  quizQuestions?: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  summaryCard?: {
    keyTakeaways: string[];
    actionItem: string;
    awardedStars: number;
    awardedXp: number;
    nextLessonId?: string;
  };
}

export interface QuranVerse {
  ayah: string;
  surah: string;
  number: string;
  meaning: string;
}

export interface Hadith {
  text: string;
  narrator: string;
  lessonLearned: string;
}

export interface ContentSection {
  title: string;
  content: string;
  keyPoints?: string[];
  takeaway?: string;
}

export interface QuickQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  lessonNumber?: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  icon?: string;
  characterIllustration?: string;
  isUnlocked?: boolean;
  isCompleted?: boolean;
  earnedStars?: number;
  pages?: LessonPage[];
  
  // Legacy support for custom content additions
  objectives?: string[];
  quranVerses?: QuranVerse[];
  hadiths?: Hadith[];
  sections?: ContentSection[];
  mentorAdvice?: string;
  quiz?: QuickQuizQuestion[];
  isCustom?: boolean;
}

export interface Unit {
  id: string;
  unitNumber?: number;
  number?: number;
  title: string;
  theme: string;
  description: string;
  colorTheme?: 'emerald' | 'amber' | 'blue' | 'purple' | 'rose' | 'teal';
  color?: string;
  accentColor?: string;
  iconName?: string;
  islandImage?: string;
  lessons: Lesson[];
  unitExam?: {
    id: string;
    title: string;
    durationMinutes: number;
    passScorePercent: number;
    questionsCount: number;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'quiz' | 'game' | 'excellence';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface StudentProgress {
  studentName: string;
  level: number;
  levelTitle: string;
  xp: number;
  coins: number;
  starsCount: number;
  completedLessonIds: string[];
  unlockedLessonIds: string[];
  unitScores: Record<string, number>;
  unlockedBadgeIds: string[];
}

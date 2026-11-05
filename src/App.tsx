import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FinalHomeHero } from './components/FinalHomeHero';
import { TeamView } from './components/TeamView';
import { InstructionsView } from './components/InstructionsView';
import { CurriculumObjectivesView } from './components/CurriculumObjectivesView';
import { UnitsView } from './components/UnitsView';
import { UnitSpace } from './components/UnitSpace';
import { LessonPlayer } from './components/LessonPlayer';
import { GamesView } from './components/GamesView';
import { AssessmentsView } from './components/AssessmentsView';
import { AchievementsView } from './components/AchievementsView';
import { AddLessonModal } from './components/AddLessonModal';
import { CertificateModal } from './components/CertificateModal';
import { REGISTERED_UNITS } from './data/curriculumRegistry';
import { INITIAL_BADGES } from './data/curriculumData';
import { Lesson, Unit, Badge } from './types/curriculum';
import { sounds } from './utils/soundEffects';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'units' | 'games' | 'assessments' | 'achievements'>('home');
  const [homeSubView, setHomeSubView] = useState<'main' | 'team' | 'instructions' | 'objectives'>('main');
  const [activeUnitSpace, setActiveUnitSpace] = useState<Unit | null>(null);
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; unitTitle: string } | null>(null);

  // Curriculum State (Initialized from registered units, persisted to localStorage)
  const [units, setUnits] = useState<Unit[]>(() => {
    try {
      const saved = localStorage.getItem('islamic_curriculum_v7_units');
      return saved ? JSON.parse(saved) : REGISTERED_UNITS;
    } catch {
      return REGISTERED_UNITS;
    }
  });

  // Student Progress State
  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem('islamic_student_name') || 'عبد الرحمن';
    } catch {
      return 'عبد الرحمن';
    }
  });

  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('islamic_student_xp');
      return saved ? Number(saved) : 250;
    } catch {
      return 250;
    }
  });

  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('islamic_student_coins');
      return saved ? Number(saved) : 45;
    } catch {
      return 45;
    }
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('islamic_completed_lessons_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('islamic_badges');
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  // Modals State
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('islamic_curriculum_v7_units', JSON.stringify(units));
    } catch {}
  }, [units]);

  useEffect(() => {
    try {
      localStorage.setItem('islamic_student_name', studentName);
    } catch {}
  }, [studentName]);

  useEffect(() => {
    try {
      localStorage.setItem('islamic_student_xp', xp.toString());
    } catch {}
  }, [xp]);

  useEffect(() => {
    try {
      localStorage.setItem('islamic_student_coins', coins.toString());
    } catch {}
  }, [coins]);

  useEffect(() => {
    try {
      localStorage.setItem('islamic_completed_lessons_v2', JSON.stringify(completedLessonIds));
    } catch {}
  }, [completedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem('islamic_badges', JSON.stringify(badges));
    } catch {}
  }, [badges]);

  // Total lessons count
  const totalLessons = units.reduce((acc, u) => acc + u.lessons.length, 0);

  // Reward handler (games & quizzes)
  const handleEarnReward = (addedXp: number, addedCoins: number) => {
    setXp((prev) => prev + addedXp);
    setCoins((prev) => prev + addedCoins);

    // Unlock Game Master badge
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === 'badge-game-master' && !b.unlocked) {
          return { ...b, unlocked: true, unlockedAt: 'اليوم' };
        }
        return b;
      })
    );
  };

  // Lesson completion handler with unlocked progression
  const handleCompleteLesson = (lessonId: string, earnedStars: number, earnedXp: number) => {
    if (!completedLessonIds.includes(lessonId)) {
      const nextCompleted = [...completedLessonIds, lessonId];
      setCompletedLessonIds(nextCompleted);
      handleEarnReward(earnedXp, 30);

      // Unlock next lesson in the unit
      setUnits((prevUnits) =>
        prevUnits.map((u) => {
          const lIdx = u.lessons.findIndex((l) => l.id === lessonId);
          if (lIdx !== -1) {
            const updatedLessons = [...u.lessons];
            // Mark current as done with stars
            updatedLessons[lIdx] = {
              ...updatedLessons[lIdx],
              isCompleted: true,
              earnedStars: earnedStars || 3,
            };
            // Unlock next lesson if exists
            if (lIdx + 1 < updatedLessons.length) {
              updatedLessons[lIdx + 1] = {
                ...updatedLessons[lIdx + 1],
                isUnlocked: true,
              };
            }
            return {
              ...u,
              lessons: updatedLessons,
            };
          }
          return u;
        })
      );
    }
  };

  // Add custom lesson
  const handleAddLesson = (unitId: string, newLesson: any) => {
    // Adapt to new lesson structure if needed
    const adaptedLesson: Lesson = {
      id: newLesson.id || `custom-lesson-${Date.now()}`,
      unitId: unitId,
      lessonNumber: 99,
      title: newLesson.title,
      subtitle: newLesson.subtitle || 'درس مضاف من كتاب المنهج',
      durationMinutes: newLesson.durationMinutes || 20,
      isUnlocked: true,
      isCompleted: false,
      earnedStars: 0,
      pages: [
        {
          id: 'p-custom-1',
          pageNumber: 1,
          type: 'intro',
          title: `مقدمة وتمهيد: ${newLesson.title}`,
          mentorPrompt: newLesson.mentorAdvice || 'أهلاً بك في هذا الدرس المضاف من كتاب المنهج!',
          introHook: {
            question: `ماذا سنتعلم في هذا الدرس من موضوع ${newLesson.title}؟`,
            storyText: 'دعنا نستكشف هذا الموضوع المبارك ونطبق قيمه في حياتنا!',
          },
        },
        {
          id: 'p-custom-2',
          pageNumber: 2,
          type: 'objectives',
          title: 'أهداف التعلم',
          objectivesList: newLesson.objectives || ['استيعاب وفهم موضوع الدرس.'],
        },
        {
          id: 'p-custom-3',
          pageNumber: 3,
          type: 'content',
          title: 'شرح عناصر الدرس',
          contentParagraphs: [
            {
              heading: 'المحتوى الأصلي',
              text: newLesson.sections?.[0]?.content || 'شرح الدرس من كتاب المنهج...',
              takeaway: 'العلم النافع يتبعه عمل صالح.',
            },
          ],
        },
        {
          id: 'p-custom-4',
          pageNumber: 4,
          type: 'summary',
          title: 'ملخص وتتويج',
          summaryCard: {
            keyTakeaways: ['إتقان المفاهيم والعمل بمقتضاها.'],
            actionItem: 'تطبيق ما جاء في الدرس في حياتك اليومية.',
            awardedStars: 3,
            awardedXp: 100,
          },
        },
      ],
    };

    setUnits((prev) =>
      prev.map((u) => {
        if (u.id === unitId) {
          return {
            ...u,
            lessons: [...u.lessons, adaptedLesson],
          };
        }
        return u;
      })
    );
  };

  return (
    <div className="min-h-screen game-sky-bg relative overflow-x-hidden flex flex-col text-slate-800">
      {/* Decorative Puffy Cartoon Clouds in Sky Background */}
      <div className="fixed top-8 left-12 w-48 h-20 bg-white/40 rounded-full blur-[2px] animate-float-slow pointer-events-none -z-0" />
      <div className="fixed top-28 right-16 w-60 h-24 bg-white/35 rounded-full blur-[2px] animate-float-fast pointer-events-none -z-0" />
      <div className="fixed top-64 left-1/4 w-40 h-16 bg-white/30 rounded-full blur-[2px] animate-float-slow pointer-events-none -z-0" />

      {/* Top 3D Game HUD */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setActiveLesson(null);
          setActiveUnitSpace(null);
          setHomeSubView('main');
          setCurrentTab(tab);
        }}
        xp={xp}
        coins={coins}
        studentName={studentName}
        completedLessonsCount={completedLessonIds.length}
        onOpenAddLesson={() => setIsAddLessonOpen(true)}
      />

      {/* Main Game Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-7 relative z-10">
        {activeLesson ? (
          /* Multi-Page Interactive Lesson Player */
          <LessonPlayer
            lesson={activeLesson.lesson}
            unitTitle={activeLesson.unitTitle}
            onCompleteLesson={handleCompleteLesson}
            onExit={() => setActiveLesson(null)}
          />
        ) : activeUnitSpace ? (
          /* Dedicated Unit Exploration Space */
          <UnitSpace
            unit={activeUnitSpace}
            onSelectLesson={(lesson) => {
              setActiveLesson({ lesson, unitTitle: activeUnitSpace.title });
            }}
            onStartUnitExam={() => {
              setActiveUnitSpace(null);
              setCurrentTab('assessments');
            }}
            onBackToUnits={() => setActiveUnitSpace(null)}
          />
        ) : currentTab === 'home' ? (
          homeSubView === 'team' ? (
            /* 1. صفحة فريق الإعداد */
            <TeamView onBack={() => setHomeSubView('main')} />
          ) : homeSubView === 'instructions' ? (
            /* 2. صفحة تعليمات استخدام البرمجية */
            <InstructionsView
              onBack={() => setHomeSubView('main')}
              onGoToUnits={() => {
                setHomeSubView('main');
                setCurrentTab('units');
              }}
            />
          ) : homeSubView === 'objectives' ? (
            /* 3. صفحة الأهداف العامة للمقرر */
            <CurriculumObjectivesView
              onBack={() => setHomeSubView('main')}
              onGoToUnits={() => {
                setHomeSubView('main');
                setCurrentTab('units');
              }}
            />
          ) : (
            /* 4. الصفحة الرئيسية الكبرى (تحتوي على الأقسام الأربعة) */
            <FinalHomeHero
              onOpenSection={(section) => {
                if (section === 'team') setHomeSubView('team');
                else if (section === 'instructions') setHomeSubView('instructions');
                else if (section === 'objectives') setHomeSubView('objectives');
                else if (section === 'content') setCurrentTab('units');
              }}
              onOpenAddLesson={() => setIsAddLessonOpen(true)}
              studentName={studentName}
              completedLessonsCount={completedLessonIds.length}
              totalLessonsCount={totalLessons}
              xp={xp}
              coins={coins}
            />
          )
        ) : currentTab === 'units' ? (
          /* 3D Islands Syllabus View */
          <UnitsView
            units={units}
            completedLessonIds={completedLessonIds}
            onSelectLesson={(lesson, unitTitle) => {
              setActiveLesson({ lesson, unitTitle });
            }}
            onOpenUnitSpace={(unit) => {
              setActiveUnitSpace(unit);
            }}
            onOpenAddLesson={() => setIsAddLessonOpen(true)}
          />
        ) : currentTab === 'games' ? (
          /* Adventure Quest Games View */
          <GamesView
            onEarnReward={handleEarnReward}
            studentName={studentName}
          />
        ) : currentTab === 'assessments' ? (
          /* Championship Tournament Arena View */
          <AssessmentsView
            studentName={studentName}
            onEarnReward={handleEarnReward}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        ) : currentTab === 'achievements' ? (
          /* Royal Trophy Hall View */
          <AchievementsView
            studentName={studentName}
            onUpdateStudentName={(name) => setStudentName(name)}
            xp={xp}
            coins={coins}
            completedLessonsCount={completedLessonIds.length}
            totalLessonsCount={totalLessons}
            badges={badges}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        ) : null}
      </main>

      {/* Add Custom Lesson Modal */}
      <AddLessonModal
        isOpen={isAddLessonOpen}
        onClose={() => setIsAddLessonOpen(false)}
        units={units}
        onAddLesson={handleAddLesson}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={studentName}
        xp={xp}
        completedLessonsCount={completedLessonIds.length}
      />

      {/* Cartoon Game Footer */}
      <footer className="mt-auto bg-white/75 backdrop-blur-md border-t-2 border-sky-200 py-6 text-center text-xs text-slate-600 font-bold print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="flex items-center gap-1.5 justify-center">
            <span>✨</span>
            <span>رحلتي في عالم التربية الإسلامية · الصف السادس الابتدائي · الفصل الدراسي الأول</span>
          </p>
          <p className="text-slate-500 font-semibold">
            نظام تعليمي متكامل متعدد الصفحات والأنشطة والتلعيب جاهز لاستقبال وحدات المنهج
          </p>
        </div>
      </footer>
    </div>
  );
}

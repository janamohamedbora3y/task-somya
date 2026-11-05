import React from 'react';
import { ArrowRight, Target, BookOpen, Heart, Sparkles, Compass, CheckCircle2, Award, ShieldCheck, SunMedium } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface CurriculumObjectivesViewProps {
  onBack: () => void;
  onGoToUnits: () => void;
}

export const CurriculumObjectivesView: React.FC<CurriculumObjectivesViewProps> = ({ onBack, onGoToUnits }) => {
  const objectiveDomains = [
    {
      id: 'knowledge',
      title: 'أولاً: الأهداف المعرفية (العلم والمعرفة)',
      badge: 'الجانب المعرفي والإدراكي',
      icon: '🧠',
      color: 'from-sky-500 to-blue-600',
      borderColor: 'border-sky-300',
      items: [
        'معرفة أركان الإيمان وأثر الإيمان باليوم الآخر والبعث والنشور والحساب والجزاء في يقظة الضمير الإنساني.',
        'استظهار وفهم وتدبر الآيات الكريمة المقررة في سورة المعارج، وسورة الحاقة، وسورة القلم وتوضيح معاني مفرداتها.',
        'إتقان أحكام التجويد الأساسية: أحكام الاستعاذة والبسملة، وأحكام الميم الساكنة الثلاثة (الإظهار، الإدغام، الإخفاء الشفوي).',
        'معرفة فريضة الحج، وشروطه، وأركانه الأربعة (الإحرام، عرفة، طواف الإفاضة، السعي)، وآدابه السلوكية.',
        'الإحاطة بأحداث السيرة النبوية الكبرى: غزوة حنين، حصار الطائف، وغزوة تبوك (العسرة) وحكمة القيادة النبوية.',
        'التعرف على أعلام الأمة وأئمة المذاهب: الصحابي الجليل أبو هريرة، الإمام أبو حنيفة النعمان، والإمام مالك بن أنس.',
      ],
    },
    {
      id: 'skills',
      title: 'ثانياً: المهارات التي يكتسبها الطالب',
      badge: 'الجانب المهاري والتطبيقي',
      icon: '🎯',
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-300',
      items: [
        'تلاوة القرآن الكريم تلاوة صحيحة خاشعة ومجودة مطابقة لقواعد التجويد.',
        'القدرة على استخراج الأحكام الشرعية والعبر والدروس المستفادة من القصص القرآني والنبوي.',
        'مهارة المقارنة والتحليل بين مواقف الصدق والتضحية ومواقف النفاق والتكذيب.',
        'مهارة الترتيب الزمني والمنطقي لأحداث السيرة النبوية والمناسك الدينية.',
        'مهارة استثمار الوقت، وتنظيم الأولويات، وتطوير المهارات الذاتية والبحث عن المعلومة الموثقة.',
      ],
    },
    {
      id: 'values',
      title: 'ثالثاً: القيم والاتجاهات والسلوكيات الإسلامية',
      badge: 'الجانب الوجداني والأخلاقي',
      icon: '💎',
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-300',
      items: [
        'غرس خلق الرحمة والرفق بالخلق جميعاً وبالحيوان والضعفاء اقتداءً بالنبي المصطفى ﷺ.',
        'ترسيخ أواصر الأخوة في الدين والمحبة والتكافل والتناصح بين أفراد المجتمع المسلم.',
        'التحلي بالتقوى ومراقبة الله تعالى في السر والعلن استشعاراً لميزان الحساب والجزاء.',
        'التواضع ونبذ الكبر والغرور في المعاملات مع الناس وعند أداء العبادات كالحج.',
        'الحلم والعفو عند المقدرة والدعاء بالهداية للآخرين كما تجلى في موقف النبي ﷺ في حصار الطائف.',
        'حب العلم وتوقير المعلمين والعلماء والتواضع في طلب المعرفة.',
      ],
    },
    {
      id: 'daily_life',
      title: 'رابعاً: تطبيق التعاليم الإسلامية في الحياة اليومية',
      badge: 'التطبيق والممارسة العملية',
      icon: '🌱',
      color: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-300',
      items: [
        'المحافظة على الصلوات الخمس في أوقاتها بخشوع تام باعتبارها أول ما يحاسب عليه العبد.',
        'الالتزام بالصدق والأمانة في التعامل المدرسي والأسري وتجنب الغش والكذب والنميمة.',
        'مساعدة الوالدين، وبرهما، وصلة الأرحام، والإحسان إلى الجيران والمحتاجين.',
        'الصبر والتسامح في مواقف الزحام والتعامل اليومي ونبذ الخصومات والجدال العقيم.',
        'نظافة البيئة والمدرسة والمحافظة على الممتلكات العامة والمشاعر الشريفة.',
      ],
    },
  ];

  return (
    <div className="space-y-8 pb-16 text-right max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-4 sm:p-5 border-3 border-sky-300 shadow-[0_6px_0_#38bdf8] transition-all">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="game-btn-blue inline-flex items-center gap-2 px-5 py-2.5 text-white font-black text-xs sm:text-sm rounded-2xl cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 ml-1" />
          <span>الرجوع للصفحة الرئيسية</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-xl border-2 border-emerald-300 shadow-xs">
            🎯
          </div>
          <div className="text-right">
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              الأهداف العامة للمقرر
            </h1>
            <p className="text-[11px] font-bold text-slate-500">
              الصف السادس الابتدائي · الفصل الدراسي الأول
            </p>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-[0_12px_0_#065f46,0_20px_35px_rgba(0,0,0,0.18)] border-4 border-white relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black border border-white/30 text-amber-300">
            <Target className="w-4 h-4 text-amber-300" />
            <span>وثيقة معايير وأهداف مقرر التربية الدينية الإسلامية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight">
            الأهداف العامة لمقرر الصف السادس الابتدائي
          </h2>
          <p className="text-xs sm:text-sm font-bold text-emerald-100 leading-relaxed">
            استخرجت هذه الأهداف بدقة بالغة من كتاب وزارة التربية والتعليم المعتمد عبر وحداته الثلاث: «الرحمة والرفق»، «الأخوة في الدين»، و«التقوى والعمل الصالح»، لتشمل الجوانب المعرفية والمهارية والقيمية والتطبيقية.
          </p>
        </div>
      </section>

      {/* Domains Accordion / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {objectiveDomains.map((dom) => (
          <div
            key={dom.id}
            className="bg-white rounded-3xl p-6 border-3 border-sky-200 shadow-[0_8px_0_#bae6fd,0_12px_22px_rgba(0,0,0,0.06)] hover:border-sky-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                  {dom.badge}
                </span>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${dom.color} text-white flex items-center justify-center text-3xl shadow-sm border-2 border-white`}>
                  {dom.icon}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 border-b pb-2 border-slate-100">
                {dom.title}
              </h3>

              <ul className="space-y-2.5">
                {dom.items.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-emerald-300 shadow-[0_8px_0_#a7f3d0] text-center space-y-4">
        <h4 className="text-xl font-black text-slate-900">
          هل تريد استكشاف تطبيق هذه الأهداف في الدروس والأنشطة؟
        </h4>
        <p className="text-xs sm:text-sm font-bold text-slate-600 max-w-lg mx-auto">
          انتقل مباشرة إلى قائمة الوحدات الثلاث الدراسية وابدأ تعلمك خطوة بخطوة!
        </p>
        <button
          onClick={() => {
            sounds.playClick();
            onGoToUnits();
          }}
          className="game-btn-green inline-flex items-center gap-2 px-8 py-3 text-white font-black text-sm rounded-2xl cursor-pointer hover:scale-105 transition-transform shadow-md"
        >
          <span>تصفح المحتوى الدراسي الكامل 📚</span>
        </button>
      </section>
    </div>
  );
};

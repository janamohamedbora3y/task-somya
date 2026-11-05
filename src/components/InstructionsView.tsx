import React from 'react';
import { ArrowRight, HelpCircle, Compass, Volume2, Sparkles, Trophy, Star, RotateCcw, CheckCircle2, Award, BookOpen, Layers } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface InstructionsViewProps {
  onBack: () => void;
  onGoToUnits: () => void;
}

export const InstructionsView: React.FC<InstructionsViewProps> = ({ onBack, onGoToUnits }) => {
  const steps = [
    {
      num: 1,
      icon: '🗺️',
      title: 'الدخول إلى الوحدات والدروس',
      badge: 'الاستكشاف',
      color: 'from-sky-400 to-blue-500',
      borderColor: 'border-sky-300',
      description: 'من الصفحة الرئيسية أو شريط التنقل، اضغط على «المحتوى الدراسي» لتفتح لك جزر الوحدات الثلاث: الوحدة الأولى (الرحمة والرفق)، الوحدة الثانية (الأخوة في الدين)، والوحدة الثالثة (التقوى والعمل الصالح). اضغط على أي جزيرة لفتح مساحتها واختيار الدرس المطلوب.',
    },
    {
      num: 2,
      icon: '📖',
      title: 'مشاهدة الشرح والصور والآيات القرآنية',
      badge: 'المحتوى البصري',
      color: 'from-emerald-400 to-teal-500',
      borderColor: 'border-emerald-300',
      description: 'كل درس مقسم إلى صفحات تفاعلية مرقمة؛ تبدأ بالتمهيد والقصة الهادفة، ثم الأهداف الذهبية، ثم نصوص الشرح المزودة بلوحات تعليمية كرتونية 3D عالية الدقة، مع نصوص الآيات القرآنية المضبوطة بالرسم العثماني وجداول معاني المفردات.',
    },
    {
      num: 3,
      icon: '🔊',
      title: 'تشغيل والتحكم في الصوت والتلاوات',
      badge: 'الصوتيات الحقيقية',
      color: 'from-amber-400 to-orange-500',
      borderColor: 'border-amber-300',
      description: 'تحتوي صفحات القرآن والحديث على مشغلات صوت حقيقية تعمل بملفات MP3 مباشرة: يمكنك الضغط على زر «تشغيل» للاستماع لصوت التلاوة، وزر «إيقاف مؤقت»، وزر «إعادة» للبدء من جديد، وزر «كتم/تشغيل الصوت»، مع إمكانية تحميل أي ملف صوتي لجهازك الشخصي.',
    },
    {
      num: 4,
      icon: '🎮',
      title: 'تنفيذ الأنشطة التفاعلية والأسئلة',
      badge: 'التفاعل الفوري',
      color: 'from-purple-400 to-indigo-500',
      borderColor: 'border-purple-300',
      description: 'تتضمن الدروس أنشطة كتاب الوزارة بصيغ تفاعلية مشوقة: أسئلة الصواب والخطأ، الاختيار من متعدد، المطابقة بين الأزواج، وترتيب الأحداث زمنياً. ستحصل على تصحيح فوري لإجابتك مع توضيح مفصل لسبب الإجابة الصحيحة.',
    },
    {
      num: 5,
      icon: '⭐',
      title: 'الحصول على النقاط والنجوم والشارات',
      badge: 'التلعيب والمكافآت',
      color: 'from-yellow-400 to-amber-500',
      borderColor: 'border-amber-300',
      description: 'عند إكمال كل درس بنجاح في نهايته، ستحصل على نجوم التميز (3 نجوم) ونقاط خبرة (XP) وعملات ذهبية تضاف إلى حسابك في شريط التقدم العلوي، مما يرفع رتبتك في عالم التعلم من طالب مجتهد إلى بطل إسلامي!',
    },
    {
      num: 6,
      icon: '🏆',
      title: 'خوض الاختبارات والحصول على الشهادة',
      badge: 'التقويم المعتمد',
      color: 'from-rose-400 to-pink-500',
      borderColor: 'border-rose-300',
      description: 'في قسم «حلبة التحديات» ستجد تقويماً تشخيصياً شاملاً لكل وحدة دراسية بالإضافة للاختبار النهائي للمقرر. يمكنك معرفة درجتك فوراً، وتكرار المحاولة إن أردت تحسين نتيجتك، وطباعة شهادة التفوق والتقدير باسمك كطالب متفوق.',
    },
    {
      num: 7,
      icon: '🔄',
      title: 'أزرار التنقل والرجوع والتنقل بين الصفحات',
      badge: 'سهولة الاستخدام',
      color: 'from-teal-400 to-cyan-500',
      borderColor: 'border-teal-300',
      description: 'داخل مشغل الدرس، ستجد أزرار «الصفحة التالية» و«الصفحة السابقة» أسفل الشاشة، وشريط مؤشر يوضح رقم الصفحة والنسبة المئوية، وزر «خروج للدروس» في أعلى الزاوية للعودة في أي وقت لمساحة الوحدة دون فقدان تقدمك.',
    },
  ];

  return (
    <div className="space-y-8 pb-16 text-right max-w-6xl mx-auto">
      {/* Top Header Navigation */}
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
          <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-xl border-2 border-sky-300 shadow-xs">
            💡
          </div>
          <div className="text-right">
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              تعليمات استخدام البرمجية
            </h1>
            <p className="text-[11px] font-bold text-slate-500">
              دليلك الشامل لخوض رحلة تعليمية ممتعة وسهلة
            </p>
          </div>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <section className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-[0_12px_0_#1d4ed8,0_20px_35px_rgba(0,0,0,0.18)] border-4 border-white relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black border border-white/30 text-amber-300">
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span>إرشادات التلميذ البطل · دليل خطوة بخطوة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight">
            كيف تستمتع وتتفوق مع برمجية «رحلتي الإسلامية»؟
          </h2>
          <p className="text-xs sm:text-sm font-bold text-sky-100 leading-relaxed">
            صممت هذه البرمجية خصيصاً لك يا بطل الصف السادس، لتجمع بين متعة الألعاب التعليمية العالمية ورصانة العلم الشرعي النافع. اتبع الخطوات السبع التالية لتتقن كل مميزات البرمجية!
          </p>
        </div>
      </section>

      {/* Step by Step Visual Guide Cards */}
      <div className="space-y-5">
        {steps.map((st) => (
          <div
            key={st.num}
            className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-sky-200 shadow-[0_8px_0_#bae6fd,0_12px_22px_rgba(0,0,0,0.06)] hover:border-sky-400 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-tr ${st.color} text-white flex items-center justify-center text-3xl sm:text-4xl shadow-md border-3 border-white shrink-0`}>
              {st.icon}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 rounded-full font-black text-xs">
                  الخطوة {st.num}
                </span>
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full font-bold text-[11px]">
                  {st.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {st.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed">
                {st.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action to start learning */}
      <section className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 sm:p-8 text-white text-center space-y-4 shadow-[0_10px_0_#065f46]">
        <h3 className="text-xl sm:text-2xl font-black">
          جاهز لبدء رحلتك التعليمية الآن؟
        </h3>
        <p className="text-xs sm:text-sm font-bold text-emerald-100 max-w-lg mx-auto leading-relaxed">
          انتقل مباشرة إلى جزر المحتوى واكتشف الدروس الماتعة والأنشطة المشوقة للوحدات الثلاث!
        </p>
        <button
          onClick={() => {
            sounds.playClick();
            onGoToUnits();
          }}
          className="game-btn-gold inline-flex items-center gap-2 px-8 py-3 text-amber-950 font-black text-sm rounded-2xl cursor-pointer shadow-lg hover:scale-105 transition-transform"
        >
          <span>الانطلاق إلى جزر المحتوى الدراسي 🚀</span>
        </button>
      </section>
    </div>
  );
};

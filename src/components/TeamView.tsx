import React from 'react';
import { ArrowRight, Users, Crown, Sparkles, Award, Star, Heart, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface TeamViewProps {
  onBack: () => void;
}

interface TeamMember {
  name: string;
  role: string;
  isLeader?: boolean;
  avatar: string;
  badge: string;
  contribution: string;
  bgColor: string;
  borderColor: string;
  shadowColor: string;
}

export const TeamView: React.FC<TeamViewProps> = ({ onBack }) => {
  const teamMembers: TeamMember[] = [
    {
      name: 'جني محمد البرعي',
      role: 'قائدة الفريق (Team Leader)',
      isLeader: true,
      avatar: '👑',
      badge: 'القائدة والمشرفة العامة',
      contribution: 'إدارة وتنسيق العمل، الإشراف على صياغة المحتوى التعليمي والتربوي، مراجعة الأهداف والأنشطة.',
      bgColor: 'from-amber-500 via-orange-500 to-amber-600',
      borderColor: 'border-amber-300',
      shadowColor: '#b45309',
    },
    {
      name: 'أسماء عبدالحميد عبدالله',
      role: 'عضو فريق الإعداد',
      avatar: '🌟',
      badge: 'إعداد المحتوى والأنشطة',
      contribution: 'استخراج الأنشطة التفاعلية، تدقيق نصوص الآيات والأحاديث النبوية، ومراجعة تسلسل الدروس.',
      bgColor: 'from-sky-500 to-blue-600',
      borderColor: 'border-sky-300',
      shadowColor: '#0284c7',
    },
    {
      name: 'جني هاني أنور',
      role: 'عضو فريق الإعداد',
      avatar: '🎨',
      badge: 'التصميم والتنسيق البصري',
      contribution: 'اختيار الألوان الجاذبة للأطفال، تنظيم بطاقات التعلم والشخصيات الكرتونية التعليمية.',
      bgColor: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-300',
      shadowColor: '#059669',
    },
    {
      name: 'حبيبة أحمد عمر',
      role: 'عضو فريق الإعداد',
      avatar: '📖',
      badge: 'التدقيق اللغوي والتربوي',
      contribution: 'مراجعة المفردات والتراكيب اللغوية والتشكيل القرآني، والتأكد من ملاءمتها للمرحلة العمرية.',
      bgColor: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-300',
      shadowColor: '#7c3aed',
    },
    {
      name: 'حبيبة علي محمد',
      role: 'عضو فريق الإعداد',
      avatar: '✨',
      badge: 'بنك الأسئلة والتقويم',
      contribution: 'صياغة أسئلة التقويم التشخيصي والنهائي، إعداد التغذية الراجعة الفورية وشرح الإجابات.',
      bgColor: 'from-rose-500 to-pink-600',
      borderColor: 'border-rose-300',
      shadowColor: '#e11d48',
    },
    {
      name: 'رحمة محمود إبراهيم يوسف',
      role: 'عضو فريق الإعداد',
      avatar: '🌸',
      badge: 'الوسائط والتعليمات',
      contribution: 'تنظيم إرشادات الاستخدام الميسرة للتلميذ، والربط بين المحتوى النظري والمواقف التطبيقية.',
      bgColor: 'from-teal-500 to-cyan-600',
      borderColor: 'border-teal-300',
      shadowColor: '#0d9488',
    },
    {
      name: 'جنة خالد رضوان',
      role: 'عضو فريق الإعداد',
      avatar: '💎',
      badge: 'المراجعة النهائية والجودة',
      contribution: 'فحص تكامل الصفحات والأزرار، واختبار التفاعلات والتأكد من مطابقة الكتاب المدرسي بدقة.',
      bgColor: 'from-violet-500 to-purple-600',
      borderColor: 'border-violet-300',
      shadowColor: '#6d28d9',
    },
  ];

  return (
    <div className="space-y-8 pb-16 text-right max-w-6xl mx-auto">
      {/* Top Header Navigation Bar */}
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
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl border-2 border-amber-300 shadow-xs">
            👥
          </div>
          <div className="text-right">
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              فريق الإعداد والتطوير
            </h1>
            <p className="text-[11px] font-bold text-slate-500">
              نخبة الطالبات القائمات على إعداد البرمجية التعليمية
            </p>
          </div>
        </div>
      </div>

      {/* Hero Welcome Card */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-[0_12px_0_#1e3a8a,0_20px_35px_rgba(0,0,0,0.18)] border-4 border-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black border border-white/30 text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>مشروع برمجية التربية الدينية الإسلامية · الصف السادس الابتدائي</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight">
            فريق العمل والإعداد المتميز
          </h2>
          <p className="text-xs sm:text-sm font-bold text-sky-100 leading-relaxed">
            تم إعداد وتصميم هذه البرمجية التعليمية التفاعلية بجهد مخلص ورؤية تعليمية وتربوية حديثة، لتقديم مقرر التربية الدينية الإسلامية للفصل الدراسي الأول في قالب مشوق وجذاب لأبنائنا الطلاب.
          </p>
        </div>
      </section>

      {/* Featured Leader Card */}
      <section className="relative">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-[0_12px_0_#d97706,0_20px_30px_rgba(0,0,0,0.12)] relative overflow-hidden">
          <div className="absolute top-4 left-6 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-black text-xs sm:text-sm shadow-md border-2 border-white flex items-center gap-1.5 animate-pulse">
            <Crown className="w-4 h-4 text-yellow-200 fill-yellow-200" />
            <span>قائدة الفريق · Team Leader</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-6 sm:pt-2">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-5xl shadow-[0_8px_0_#b45309] border-4 border-white shrink-0">
                👑
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-black border-2 border-white shadow-xs">
                ★
              </div>
            </div>

            <div className="text-center sm:text-right space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-amber-950">
                  {teamMembers[0].name}
                </h3>
                <span className="px-3 py-0.5 bg-amber-400/30 text-amber-900 rounded-full text-xs font-black border border-amber-400">
                  {teamMembers[0].role}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed max-w-2xl">
                {teamMembers[0].contribution}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-black text-amber-900">
                <span className="px-3 py-1 bg-white rounded-xl border border-amber-300 shadow-2xs">
                  ✓ القيادة والتوجيه
                </span>
                <span className="px-3 py-1 bg-white rounded-xl border border-amber-300 shadow-2xs">
                  ✓ مراجعة المحتوى الشامل
                </span>
                <span className="px-3 py-1 bg-white rounded-xl border border-amber-300 shadow-2xs">
                  ✓ تنسيق مهام الفريق
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-sky-600" />
          <span>أعضاء فريق العمل المتميز</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teamMembers.slice(1).map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border-3 border-sky-200 shadow-[0_8px_0_#bae6fd,0_12px_20px_rgba(0,0,0,0.06)] hover:border-sky-400 hover:shadow-[0_10px_0_#7dd3fc,0_16px_25px_rgba(0,0,0,0.1)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
                    {member.badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center text-2xl shadow-xs border-2 border-white">
                    {member.avatar}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    {member.name}
                  </h4>
                  <span className="text-xs font-bold text-sky-700 block mt-0.5">
                    {member.role}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                  {member.contribution}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-black text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>إنجاز عالي الكفاءة والتميز</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supervisor & Academic Notice */}
      <section className="bg-white rounded-3xl p-6 border-3 border-amber-300 shadow-[0_8px_0_#fcd34d] text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-black text-xs">
          <Award className="w-4 h-4 text-amber-600" />
          <span>إشراف أكاديمي معتمد</span>
        </div>
        <h4 className="text-base sm:text-lg font-black text-slate-900">
          تم تصميم هذه البرمجية التعليمية لمقرر التربية الدينية الإسلامية
        </h4>
        <p className="text-xs font-bold text-slate-600 max-w-xl mx-auto leading-relaxed">
          وفق أحدث معايير التصميم التعليمي وإنتاج البرمجيات التفاعلية للطفل، بهدف تقديم نموذج إلكتروني رائد يحتذى به في التعليم الرقمي المبتكر.
        </p>
      </section>
    </div>
  );
};

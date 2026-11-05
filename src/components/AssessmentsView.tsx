import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface AssessmentsViewProps {
  studentName: string;
  onEarnReward: (xp: number, coins: number) => void;
  onOpenCertificate: () => void;
}

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  unit: string;
}

interface Exam {
  id: string;
  title: string;
  subtitle: string;
  unit: string;
  badge: string;
  color: string;
  timeMinutes: number;
  questions: ExamQuestion[];
}

const EXAMS: Exam[] = [
  {
    id: 'exam-unit-1',
    title: 'تقويم الوحدة الأولى: الرَّحْمَةُ وَالرِّفْقُ',
    subtitle: 'اختبار تشخيصي شامل في العقيدة والقرآن والتجويد والعبادات والسير والأخلاق',
    unit: 'الوحدة الأولى',
    badge: 'درع الرحمة والرفق',
    color: 'emerald',
    timeMinutes: 12,
    questions: [
      {
        id: 1,
        question: 'ما حكم الإيمان باليوم الآخر وما ترتيبه بين أركان الإيمان الستة؟',
        options: [
          'ركن أساسي من أركان الإيمان وهو الركن الخامس',
          'سنة مؤكدة وهو الركن السادس',
          'مستحب ونافلة',
          'واجب في رمضان فقط',
        ],
        correctAnswer: 0,
        explanation: 'الإيمان باليوم الآخر هو الركن الخامس من أركان الإيمان الستة، ولا يصح إيمان مسلم بدونه.',
        unit: 'عقيدة',
      },
      {
        id: 2,
        question: 'سورة المعارج سورة مكية، كم عدد آياتها الكريمة؟',
        options: ['30 آية', '44 آية', '25 آية', '52 آية'],
        correctAnswer: 1,
        explanation: 'سورة المعارج سورة مكية نزلت بمكة المكرمة وعدد آياتها 44 آية كريمة.',
        unit: 'قرآن وتفسير',
      },
      {
        id: 3,
        question: 'ما السورة الوحيدة في القرآن الكريم التي لا تبدأ بالبسملة؟',
        options: ['سورة الكهف', 'سورة التوبة (براءة)', 'سورة يس', 'سورة المعارج'],
        correctAnswer: 1,
        explanation: 'سورة التوبة (براءة) نزلت بالسيف والبراءة من عهود المشركين، فلم تبدأ بالبسملة التي هي أمان ورحمة.',
        unit: 'تجويد',
      },
      {
        id: 4,
        question: 'ما جزاء الحاج الذي حج لله فلم يرفث ولم يفسق كما في الحديث الشريف؟',
        options: [
          'يرجع كيوم ولدته أمه طاهراً مغفور الذنوب',
          'يصبح غنياً في تجارته فوراً',
          'يعفى من الصلوات الخمس',
          'لا يحتاج إلى عمل صالح بعده',
        ],
        correctAnswer: 0,
        explanation: 'قال النبي ﷺ: «من حج لله فلم يرفث ولم يفسق رجع كيوم ولدته أمه»، أي نقياً من الخطايا.',
        unit: 'عبادات',
      },
      {
        id: 5,
        question: 'ما هو الدرس الرئيسي المستفاد من أحداث غزوة حنين سنة 8 هجرية؟',
        options: [
          'أن النصر يتحقق دائماً بالكثرة العددية فقط',
          'أن النصر من عند الله وحده، والإعجاب بالكثرة والغرور يورث الهزيمة',
          'أن الانسحاب أفضل من الثبات في المعركة',
          'أن الغنائم هي الهدف الأساسي للجهاد',
        ],
        correctAnswer: 1,
        explanation: 'قال تعالى: {وَيَوْمَ حُنَيْنٍ إِذْ أَعْجَبَتْكُمْ كَثْرَتُكُمْ فَلَمْ تُغْنِ عَنكُمْ شَيْئًا}؛ ليعلمنا أن النصر بتأييد الله والتوكل عليه.',
        unit: 'سير وشخصيات',
      },
      {
        id: 6,
        question: 'ما اسم الصحابي الجليل أبو هريرة رضي الله عنه وكم حديثاً روى عن النبي ﷺ؟',
        options: [
          'عبد الرحمن بن صخر الدوسي، وروى 5374 حديثاً',
          'عبد الله بن عمر، وروى 1000 حديث',
          'سعد بن أبي وقاص، وروى 500 حديث',
          'أنس بن مالك، وروى 200 حديث',
        ],
        correctAnswer: 0,
        explanation: 'هو عبد الرحمن بن صخر الدوسي، وهو أحفظ الصحابة قاطبة وروى 5374 حديثاً نبوياً شريفاً.',
        unit: 'سير وشخصيات',
      },
      {
        id: 7,
        question: 'ما معنى قول النبي ﷺ: «فِي كُلِّ كَبِدٍ رَطْبَةٍ أَجْرٌ»؟',
        options: [
          'الأجر خاص بإطعام الطيور فقط',
          'في الإحسان وسقاية كل كائن حي ذي روح رطبة بالحياة أجر وثواب عظيم',
          'لا أجر في إطعام الحيوانات الضالة',
          'الأجر مقصور على علاج الحيوانات المريضة فقط',
        ],
        correctAnswer: 1,
        explanation: 'الكبد الرطبة كناية عن كل حيوان أو طائر أو دابة حية، وفي الإحسان إليه صدقة وأجر من الله.',
        unit: 'أخلاق وقيم',
      },
    ],
  },
  {
    id: 'exam-unit-2',
    title: 'تقويم الوحدة الثانية: الأُخُوَّةُ فِي الدِّينِ',
    subtitle: 'اختبار تشخيصي شامل في البعث والنشور وسورة الحاقة وأحكام الميم وأركان الحج والطائف وأبي حنيفة وطلب العلم',
    unit: 'الوحدة الثانية',
    badge: 'درع الأخوة في الدين',
    color: 'amber',
    timeMinutes: 15,
    questions: [
      {
        id: 1,
        question: 'ما هو المقصود بالبعث في العقيدة الإسلامية وما حكم الإيمان به؟',
        options: [
          'إحياء الله تعالى الموتى وإخراجهم من قبورهم بعد فناء الدنيا، والإيمان به فرض عين واجب',
          'سفر الإنسان في طلب الرزق، وهو مستحب',
          'نزول المطر على الزرع، وهو مباح',
          'قيام الليل بالصلاة، وهو سنة مؤكدة',
        ],
        correctAnswer: 0,
        explanation: 'البعث هو إحياء الموتى وإخراجهم من القبور بالنفخة الثانية، والإيمان به ركن أصيل من أركان الإيمان باليوم الآخر.',
        unit: 'عقيدة',
      },
      {
        id: 2,
        question: 'بماذا أهلك الله قوم عاد في سورة الحاقة؟',
        options: [
          'بريح صرصر عاتية سخرها عليهم سبع ليال وثمانية أيام حسوما',
          'بالصيحة الطاغية',
          'بالغرق في البحر كفرعون',
          'بزلزلة خسفت بهم الأرض',
        ],
        correctAnswer: 0,
        explanation: 'قال تعالى: {وَأَمَّا عَادٌ فَأُهْلِكُوا بِرِيحٍ صَرْصَرٍ عَاتِيَةٍ * سَخَّرَهَا عَلَيْهِمْ سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا}.',
        unit: 'قرآن وتفسير',
      },
      {
        id: 3,
        question: 'ما حكم الميم الساكنة في قوله تعالى: {تَرْمِيهِم بِحِجَارَةٍ}؟',
        options: [
          'إخفاء شفوي بغنة حركتين لوقوع حرف الباء بعد الميم الساكنة',
          'إظهار حلقي',
          'إدغام بغنة',
          'قلقلة كبرى',
        ],
        correctAnswer: 0,
        explanation: 'إذا وقع حرف الباء بعد الميم الساكنة فحكمها الإخفاء الشفوي مع بقاء الغنة وانطباق لطيف للشفتين.',
        unit: 'تجويد',
      },
      {
        id: 4,
        question: 'ما هو أعظم أركان الحج الذي قال عنه النبي ﷺ: «الحج...» ولا يصح الحج إلا بإدراكه؟',
        options: [
          'الوقوف بعرفة',
          'طواف الوداع',
          'رمي جمرة العقبة',
          'المبيت بمزدلفة',
        ],
        correctAnswer: 0,
        explanation: 'قال النبي ﷺ: «الحج عرفة»، ومن فاته الوقوف بعرفة في وقته المحدد فقد فاته الحج كله ولا يجبر بدم.',
        unit: 'عبادات',
      },
      {
        id: 5,
        question: 'ماذا دعا النبي ﷺ لأهل الطائف حين طلب منه بعض الصحابة أن يدعو عليهم؟',
        options: [
          '«اللَّهُمَّ اهْدِ ثَقِيفًا وَائْتِ بِهِمْ مُسْلِمِينَ»',
          '«اللهم خذهم أخذ عزيز مقتدر»',
          '«اللهم سلط عليهم الريح الصرصر»',
          '«اللهم أهلكهم بالسنين والجفاف»',
        ],
        correctAnswer: 0,
        explanation: 'تجلت الرحمة النبوية المهداة في رفعه يديه الكريمتين ودعائه: «اللهم اهد ثقيفاً وائت بهم مسلمين»، فأسلمت ثقيف طائعة.',
        unit: 'سير وشخصيات',
      },
      {
        id: 6,
        question: 'أين ولد الإمام أبو حنيفة النعمان وما هي المهنة التي كان يعمل بها قبل التفرغ التام للعلم؟',
        options: [
          'ولد في الكوفة سنة 80 هـ وكان تاجر حرير وأقمشة',
          'ولد في المدينة المنورة وكان نجاراً',
          'ولد في دمشق وكان مزارعاً',
          'ولد في مصر وكان حداداً',
        ],
        correctAnswer: 0,
        explanation: 'ولد الإمام أبو حنيفة النعمان بن ثابت بالكوفة سنة 80 هـ واشتهر ببيع الخز والحرير بأمانة وورع فائق.',
        unit: 'سير وشخصيات',
      },
      {
        id: 7,
        question: 'قال النبي ﷺ: «وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا...» ما تتمة البشارة النبوية في الحديث؟',
        options: [
          '«سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»',
          '«أعطاه الله أموالاً وكنوزاً»',
          '«صار ملكاً في قومه»',
          '«عوفي من الابتلاء»',
        ],
        correctAnswer: 0,
        explanation: 'رواه مسلم، وبشر فيه النبي ﷺ بأن السعي في تحصيل العلم النافع هو أضمن وأقصر طريق موصل لمرضاة الله وجنات النعيم.',
        unit: 'أخلاق وقيم',
      },
    ],
  },
  {
    id: 'exam-unit-3',
    title: 'تقويم الوحدة الثالثة: التَّقْوَى وَالْعَمَلُ الصَّالِحُ',
    subtitle: 'اختبار تشخيصي شامل في الحساب والجزاء وسورة القلم وآداب الحج وغزوة تبوك والإمام مالك والتقوى',
    unit: 'الوحدة الثالثة',
    badge: 'درع التقوى والعمل الصالح',
    color: 'blue',
    timeMinutes: 15,
    questions: [
      {
        id: 1,
        question: 'ما هي الأمور الأربعة التي يُسأل عنها العبد يوم القيامة بنص الحديث الشريف؟',
        options: [
          'عمره فيما أفناه، وعلمه فيم فعل، وماله من أين اكتسبه وفيم أنفقه، وجسمه فيم أبلاه',
          'عدد أبنائه، ومقدار ثروته، وبلده، وقبيلته',
          'طول بيته، ونوع سيارته، وسفرياته',
          'ألوان ثيابه ومطعمه ومشربه',
        ],
        correctAnswer: 0,
        explanation: 'قال النبي ﷺ: «لا تزول قدما عبد يوم القيامة حتى يسأل: عن عمره فيما أفناه، وعن علمه فيم فعل، وعن ماله من أين اكتسبه وفيم أنفقه، وعن جسمه فيم أبلاه».',
        unit: 'عقيدة',
      },
      {
        id: 2,
        question: 'بماذا رد الله تعالى في سورة القلم على المشركين الذين اتهموا النبي ﷺ بالجنون؟',
        options: [
          '{مَا أَنتَ بِنِعْمَةِ رَبِّكَ بِمَجْنُونٍ * وَإِنَّ لَكَ لَأَجْرًا غَيْرَ مَمْنُونٍ * وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ}',
          'أمر الله بإنزال حجارة من السماء تحرقهم',
          'سكت القرآن الكريم عن جوابهم',
          'أخبرهم بأنه شاعر كاهن',
        ],
        correctAnswer: 0,
        explanation: 'أقسم الله بالقلم وما يسطرون وبرأ رسوله ﷺ وأثنى على خلقه العظيم وأجره الدائم غير الممنون.',
        unit: 'قرآن وتفسير',
      },
      {
        id: 3,
        question: 'ما هو الدرس الرئيسي المستفاد من قصة أصحاب الجنة في سورة القلم؟',
        options: [
          'أن الصدقة وحق الفقير بركة للمال، وأن البخل وظلم المحتاجين سبب لمحق النعم وزوالها',
          'أن جني الثمار في الصباح الباكر أفضل من المساء',
          'أن بيع البساتين أفضل من زراعتها',
          'أن النوم يذهب الأمراض',
        ],
        correctAnswer: 0,
        explanation: 'عاقب الله أصحاب الجنة بصاعقة أحرقت بستانهم بعدما نووا حرمان المساكين من ثمارها، فندموا واستغفروا.',
        unit: 'قرآن وتفسير',
      },
      {
        id: 4,
        question: 'ما هي أهم آداب الحج التي ينبغي للحاج التحلي بها في أثناء أداء المناسك؟',
        options: [
          'الإخلاص لله، والتواضع، والصبر والتسامح في الزحام، واجتناب الرفث والفسوق والجدال',
          'التفاخر بالمال وكثرة الخدم والمتاع',
          'رفع الصوت والمخاصمة لإثبات الحق',
          'الاستعجال والتدافع بأي ثمن',
        ],
        correctAnswer: 0,
        explanation: 'قال تعالى: {فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ}، وأمر الحجاج بالتواضع والصبر ونظافة المشاعر.',
        unit: 'عبادات',
      },
      {
        id: 5,
        question: 'لماذا سُميت غزوة تبوك (السنة 9 هـ) بـ «غزوة العُسْرَةِ»؟',
        options: [
          'لشدة حرارة الصيف، وبُعد المسافة، ونقص الزاد والماء والمؤن',
          'لكثرة غنائمها في المعركة',
          'لقرب موقعها من المدينة المنورة',
          'لأنها وقعت في فصل الشتاء الممطر',
        ],
        correctAnswer: 0,
        explanation: 'سميت بغزوة العسرة لما لاقاه المسلمون من مشقة شديدة في الحر وقلة الظهر والزاد والمؤن.',
        unit: 'سير وشخصيات',
      },
      {
        id: 6,
        question: 'ما هو أشهر مؤلفات الإمام مالك بن أنس رحمه الله إمام دار الهجرة؟',
        options: [
          'كتاب «المُوَطَّأ» في الحديث الشريف والفقه',
          'كتاب «الأم»',
          'صحيح مسلم',
          'تفسير الطبري',
        ],
        correctAnswer: 0,
        explanation: 'كتاب «الموطأ» هو أعظم وأصح مؤلفات الإمام مالك، وطّأه للناس وجمع فيه السنن والآثار وفقه المدينة المنورة.',
        unit: 'سير وشخصيات',
      },
      {
        id: 7,
        question: 'ما هو ميزان التفاضل الحقيقي بين الناس عند الله تعالى في سورة الحجرات؟',
        options: [
          'التقوى والعمل الصالح: {إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ}',
          'كثرة الأموال والكنوز والقصور',
          'الحسب والنسب والشهرة والمكانة الاجتماعية',
          'القوة البدنية والجمال الخارجي',
        ],
        correctAnswer: 0,
        explanation: 'قرر القرآن الكريم أصلاً خالداً في قوله تعالى: {إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ}؛ فلا فضل لأحد إلا بالتقوى.',
        unit: 'أخلاق وقيم',
      },
    ],
  },
  {
    id: 'exam-final',
    title: 'الاختبار النهائي الشامل للفصل الدراسي الأول',
    subtitle: '10 أسئلة شاملة للعقيدة والعبادات والأخلاق والسيرة النبوية',
    unit: 'المقرر كاملاً',
    badge: 'التاج الذهبي للتفوق',
    color: 'purple',
    timeMinutes: 15,
    questions: [
      {
        id: 1,
        question: 'التفكر والتدبر في مخلوقات الله وبديع صنعه يعتبر في الإسلام:',
        options: ['مضيعة للوقت', 'عبادة قلبية عظيمة تزيد من الإيمان واليقين', 'أمراً غير مرغوب', 'خاصاً بالعلماء فقط'],
        correctAnswer: 1,
        explanation: 'التفكر عبادة ربانية أمرنا بها القرآن في مواضع لا تحصى.',
        unit: 'عقيدة',
      },
      {
        id: 2,
        question: 'النبي الذي تحمل دعوة قومه 950 سنة دون ملل هو سيدنا:',
        options: ['إبراهيم عليه السلام', 'نوح عليه السلام', 'موسى عليه السلام', 'يونس عليه السلام'],
        correctAnswer: 1,
        explanation: 'سيدنا نوح عليه السلام أول الرسل بعد آدم ومكث في قومه ألف سنة إلا خمسين عاماً.',
        unit: 'عقيدة',
      },
      {
        id: 3,
        question: 'ما هي ثمرة المحافظة على صلاة الجمعة مع الإنصات للخطبة كما ورد في الحديث؟',
        options: ['الحصول على مال', 'مغفرة ما بينها وبين الجمعة الأخرى وفضل ثلاثة أيام', 'الشهرة بين الناس', 'النوم العميق'],
        correctAnswer: 1,
        explanation: 'من اغتسل وتطيب ثم أنصت غفر له ما بينه وبين الجمعة الأخرى.',
        unit: 'عبادة',
      },
      {
        id: 4,
        question: 'في أي وقت تؤدى صلاة العيدين (الفطر والأضحى)؟',
        options: ['بعد صلاة الظهر مباشرة', 'بعد شروق الشمس بثلث ساعة تقريباً حتى الزوال', 'في منتصف الليل', 'قبل صلاة الفجر'],
        correctAnswer: 1,
        explanation: 'يبدأ وقت صلاة العيد بعد ارتفاع الشمس قيد رمح (نحو 20 دقيقة بعد الشروق).',
        unit: 'عبادة',
      },
      {
        id: 5,
        question: 'من مظاهر الأمانة لدى الطالب في دراسته واختباراته:',
        options: ['استخدام الغش لتحقيق مجموع عالٍ', 'الاعتماد على النفس والإخلاص والمذاكرة الجادة', 'الاعتماد على جهود زملائه', 'إخفاء الكتب عن الآخرين'],
        correctAnswer: 1,
        explanation: 'المسلم لا يغش، وقد قال النبي ﷺ: "من غشنا فليس منا".',
        unit: 'أخلاق',
      },
      {
        id: 6,
        question: 'صلة الرحم تكون بـ:',
        options: ['السؤال عن الأقارب وزيارتهم ومساعدتهم', 'مقاطعة من لا يزورنا', 'التحدث عنهم بسوء', 'التواصل فقط في حال المصلحة'],
        correctAnswer: 0,
        explanation: 'صلة الرحم تشمل الزيارة، والمهاتفة، ومواساتهم بالمال والكلمة الطيبة.',
        unit: 'أخلاق',
      },
      {
        id: 7,
        question: 'المرأة البطلة التي لقبت بـ «ذات النطاقين» لمساعدتها في الهجرة النبوية هي:',
        options: ['فاطمة الزهراء رضي الله عنها', 'أسماء بنت أبي بكر رضي الله عنهما', 'أم سلمة رضي الله عنها', 'عائشة رضي الله عنها'],
        correctAnswer: 1,
        explanation: 'أسماء بنت أبي بكر شقت نطاقها لتحمل به الزاد والماء للنبي وأبيها في الغار.',
        unit: 'سيرة',
      },
      {
        id: 8,
        question: 'أول ما بناه النبي ﷺ عند وصوله إلى قباء بالمدينة المنورة هو:',
        options: ['السوق التجاري', 'مسجد قباء', 'الحصن الحربي', 'الحديقة العامة'],
        correctAnswer: 1,
        explanation: 'بنى مسجد قباء كأول مسجد أسس على التقوى في الإسلام.',
        unit: 'سيرة',
      },
      {
        id: 9,
        question: 'الصحابي الذي أنفق كل ماله ولم يترك لأهله إلا الله ورسوله هو:',
        options: ['عمر بن الخطاب', 'عثمان بن عفان', 'أبو بكر الصديق', 'عبد الرحمن بن عوف'],
        correctAnswer: 2,
        explanation: 'جاء أبو بكر بكل ما يملك لرسول الله ﷺ في غزوة تبوك مؤثراً حب الله ورسوله.',
        unit: 'سيرة',
      },
      {
        id: 10,
        question: 'الدعاء المأثور الذي علمنا إياه الإسلام عند نزول أي مصيبة أو ابتلاء هو:',
        options: ['يا ويلنا', 'إنا لله وإنا إليه راجعون اللهم أجرني في مصيبتي واخلف لي خيراً منها', 'حسبي فقط', 'لماذا حدث هذا لي'],
        correctAnswer: 1,
        explanation: 'هذا الدعاء علمه النبي ﷺ لأمته، وكان سبباً في تعويض أم سلمة بزواجها من رسول الله ﷺ.',
        unit: 'أخلاق وسيرة',
      },
    ],
  },
];

export const AssessmentsView: React.FC<AssessmentsViewProps> = ({
  studentName,
  onEarnReward,
  onOpenCertificate,
}) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // If exam selected, run exam session
  if (selectedExam) {
    const currentQ = selectedExam.questions[currentQIndex];
    const totalQuestions = selectedExam.questions.length;

    // Calculate score
    const correctCount = selectedExam.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const isPassed = scorePercent >= 70;

    const handleSelect = (optionIdx: number) => {
      if (isSubmitted) return;
      sounds.playClick();
      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optionIdx,
      }));
    };

    const handleSubmitExam = () => {
      sounds.playClick();
      setIsSubmitted(true);

      if (scorePercent >= 80) {
        sounds.playFanfare();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        onEarnReward(400, 80);
      } else if (isPassed) {
        sounds.playSuccess();
        onEarnReward(200, 40);
      } else {
        sounds.playIncorrect();
      }
    };

    const handleExitExam = () => {
      sounds.playClick();
      setSelectedExam(null);
      setCurrentQIndex(0);
      setAnswers({});
      setIsSubmitted(false);
    };

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-16 text-right">
        {/* Exam Navigation Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <button
            onClick={handleExitExam}
            className="text-xs sm:text-sm font-bold text-slate-600 hover:text-emerald-700 cursor-pointer"
          >
            ← إنهاء والعودة لقائمة الاختبارات
          </button>

          <div className="text-center">
            <h2 className="text-sm sm:text-base font-black text-slate-900">
              {selectedExam.title}
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              السؤال {currentQIndex + 1} من {totalQuestions}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            <span>وقت مرن</span>
          </div>
        </div>

        {/* Questions Bubble Tracker */}
        <div className="flex items-center justify-center gap-2 flex-wrap bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          {selectedExam.questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentQIndex;

            let bubbleClass = 'bg-slate-100 text-slate-600';
            if (isSubmitted) {
              bubbleClass =
                answers[q.id] === q.correctAnswer
                  ? 'bg-emerald-500 text-white'
                  : 'bg-rose-500 text-white';
            } else if (isCurrent) {
              bubbleClass = 'bg-emerald-600 text-white ring-2 ring-emerald-300';
            } else if (isAnswered) {
              bubbleClass = 'bg-emerald-100 text-emerald-800 font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  sounds.playClick();
                  setCurrentQIndex(idx);
                }}
                className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${bubbleClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0">
              {currentQIndex + 1}
            </span>
            <div className="flex-1">
              <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                محور: {currentQ.unit}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mr-11">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = answers[currentQ.id] === optIdx;
              let style = 'bg-slate-50 hover:bg-emerald-50/50 border-slate-200 text-slate-800';

              if (isSubmitted) {
                if (optIdx === currentQ.correctAnswer) {
                  style = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                } else if (isSelected && optIdx !== currentQ.correctAnswer) {
                  style = 'bg-rose-500 text-white border-rose-500 font-bold';
                } else {
                  style = 'bg-slate-50 text-slate-400 border-slate-100 opacity-60';
                }
              } else if (isSelected) {
                style = 'bg-emerald-100 text-emerald-950 border-emerald-500 font-bold';
              }

              return (
                <button
                  key={optIdx}
                  disabled={isSubmitted}
                  onClick={() => handleSelect(optIdx)}
                  className={`w-full p-4 rounded-2xl border-2 text-right text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${style}`}
                >
                  <span>{option}</span>
                  <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center text-xs font-bold shrink-0">
                    {optIdx === 0 ? 'أ' : optIdx === 1 ? 'ب' : optIdx === 2 ? 'ج' : 'د'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="mr-11 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-semibold space-y-1">
              <span className="font-black block text-emerald-900">
                الشرح النموذجي للإجابة:
              </span>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              disabled={currentQIndex === 0}
              onClick={() => {
                sounds.playClick();
                setCurrentQIndex((p) => p - 1);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السؤال السابق</span>
            </button>

            {currentQIndex + 1 < totalQuestions ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  setCurrentQIndex((p) => p + 1);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl cursor-pointer"
              >
                <span>السؤال التالي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : !isSubmitted ? (
              <button
                onClick={handleSubmitExam}
                className="btn-tactile-emerald px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black rounded-xl cursor-pointer"
              >
                تسليم الإجابات والتقييم ✓
              </button>
            ) : null}
          </div>
        </div>

        {/* Final Result Card if submitted */}
        {isSubmitted && (
          <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 text-amber-950 flex items-center justify-center text-4xl shadow-md">
              {isPassed ? '🏆' : '📚'}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              {isPassed ? `مبارك التفوق والنجاح يا ${studentName}!` : `محاولة جيدة يا ${studentName}!`}
            </h3>
            <p className="text-emerald-100 font-semibold text-sm max-w-lg mx-auto">
              حصلت على {correctCount} من أصل {totalQuestions} أسئلة صحيحة ({scorePercent}%).
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              {scorePercent >= 80 && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenCertificate();
                  }}
                  className="btn-tactile-amber inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm rounded-2xl cursor-pointer"
                >
                  <Award className="w-5 h-5" />
                  <span>عرض وطباعة شهادة التفوق الرسمية 📜</span>
                </button>
              )}

              <button
                onClick={handleExitExam}
                className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-2xl border border-white/30 cursor-pointer"
              >
                العودة لقائمة الاختبارات
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // List of Exams
  return (
    <div className="space-y-8 pb-16 text-right">
      {/* Assessments Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100/70 text-sky-800 text-xs font-black rounded-full mb-2">
            <FileCheck2 className="w-3.5 h-3.5 text-sky-600" />
            <span>نظام التقويم والاختبارات المدرسية المعتمدة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            التقويم والاختبارات والشهادات
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
            اختبارات تشخيصية وشاملة لقياس تحصيل الطالب وإصدار شهادات التفوق والتميز
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onOpenCertificate();
          }}
          className="btn-tactile-amber inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs sm:text-sm rounded-2xl cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>شهادة التفوق للطباعة</span>
        </button>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {EXAMS.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-emerald-400 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {exam.unit}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{exam.timeMinutes} دقائق</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
                {exam.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mb-4 leading-relaxed">
                {exam.subtitle}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl">
                <span>📝 {exam.questions.length} أسئلة اختيار من متعدد</span>
                <span className="text-slate-300">•</span>
                <span>⭐ وسام: {exam.badge}</span>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setSelectedExam(exam);
                setCurrentQIndex(0);
                setAnswers({});
                setIsSubmitted(false);
              }}
              className="btn-tactile-emerald w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <span>بدء هذا الاختبار الآن</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

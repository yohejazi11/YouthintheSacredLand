import React from 'react'
import Header from '../components/Header';

import { useState } from 'react';

const SCENARIOS = [
    {
        title: 'مساعدة حاج تائه',
        image: '/public/introAssets/kaaba.webp',
        scenario: 'أثناء أداء المناسك، صادفت حاجًا يبدو عليه الارتباك ولا يعرف طريقه إلى مخيمه.',
        howToAct: 'اقترب منه بهدوء وابتسم، اسأله عن اسمه ورقم حملته أو مخيمه، استخدم تطبيقات الخرائط أو اسأل المشرفين لمساعدته في الوصول، وطمئنه حتى يصل بأمان.',
        tips: ['كن صبورًا وهادئًا.', 'تجنب إعطاء معلومات غير دقيقة.', 'تأكد من بقاء الحاج معك حتى يصل لمكانه.'],
    },
    {
        title: 'التعامل مع حاج مريض أو متعب',
        image: '/public/introAssets/manar2.webp',
        scenario: 'لاحظت حاجًا يشعر بالإعياء أو يشتكي من ألم شديد أثناء الزحام.',
        howToAct: 'اسأله عن حالته الصحية، إذا كان الأمر طارئًا اتصل فورًا بالهلال الأحمر أو أقرب نقطة إسعاف، ساعده على الجلوس في مكان مظلل وقدم له ماءً إذا كان واعيًا.',
        tips: ['لا تحاول إعطاء أدوية دون استشارة طبية.', 'ابقَ معه حتى تصل المساعدة.', 'سجّل موقعك بدقة عند طلب الإسعاف.'],
    },
    {
        title: 'إرشاد الحجاج حول أوقات المناسك',
        image: '/public/introAssets/manar3.webp',
        scenario: 'سألك حاج عن توقيت رمي الجمرات أو الطواف أو غيرها من المناسك.',
        howToAct: 'أجب بناءً على المعلومات الرسمية أو ارشده لمصادر موثوقة (مثل تطبيق "نسك" أو المشرفين)، ووضح له أهمية الالتزام بالتعليمات الرسمية.',
        tips: ['تجنب الفتوى من نفسك إذا لم تكن متأكدًا.', 'شجع الحاج على سؤال المختصين.', 'استخدم لغة بسيطة وواضحة.'],
    },
    {
        title: 'التعامل مع فقدان الأمتعة',
        image: '/public/introAssets/manar4.webp',
        scenario: 'جاءك حاج يشتكي من فقدان حقيبته أو أمتعته الشخصية.',
        howToAct: 'هدئ من روعه، اسأله عن تفاصيل الأمتعة، ساعده في التوجه إلى مكتب المفقودات أو التواصل مع الجهات المختصة، وطمئنه أن هناك إجراءات رسمية لاستعادة المفقودات.',
        tips: ['سجل بيانات الحاج والمفقودات بدقة.', 'تواصل مع مشرف الحملة فورًا.', 'لا تعد الحاج باستعادة المفقودات فورًا بل وضح الإجراءات.'],
    },
    {
        title: 'التعامل مع الزحام الشديد',
        image: '/public/introAssets/backBuild.webp',
        scenario: 'خلال رمي الجمرات أو الطواف، لاحظت ازدحامًا شديدًا قد يشكل خطرًا على الحجاج.',
        howToAct: 'وجه الحجاج للانتظار أو اختيار أوقات أقل ازدحامًا، ساعد كبار السن والنساء والأطفال على الابتعاد عن الزحام، وكن قدوة في الالتزام بالتعليمات.',
        tips: ['لا تدفع أو ترفع صوتك.', 'تواصل مع رجال الأمن عند الحاجة.', 'حافظ على هدوئك وطمئن الحجاج.'],
    },
];

const MAIN_COLOR = '#31B29C';

function SkillsGuid() {
    const [step, setStep] = useState(0);
    const current = SCENARIOS[step];

    return (
        <div className="min-h-screen w-full pt-[90px] bg-[#31B29C]/10 flex flex-col items-center py-8 px-2">
            <Header />
            <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-center" style={{ color: MAIN_COLOR, textShadow: '0 2px 8px #e0f7f7' }}>
                إرشادات المعين (المتطوع) في الحج
            </h1>
            <p className="mb-8 text-lg text-gray-700 text-center max-w-2xl">
                سيناريوهات واقعية ونصائح عملية لمساعدة الحجاج والتصرف في المواقف المختلفة.
            </p>
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-2 flex flex-col md:flex-row items-center p-6 md:p-10 mb-8 relative" style={{ borderColor: MAIN_COLOR }}>
                <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                    <img src={current.image} alt={current.title} className="rounded-2xl shadow-lg max-h-64 object-cover w-full" style={{ border: `3px solid ${MAIN_COLOR}` }} />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-3 md:pl-8 text-right">
                    <div className="text-2xl font-bold mb-2 text-[#31B29C]">{current.title}</div>
                    <div className="text-md text-gray-700 mb-2"><span className="font-semibold">السيناريو:</span> {current.scenario}</div>
                    <div className="bg-[#31B29C]/20 border-r-4 border-[#31B29C] p-3 rounded-xl text-gray-800 text-md font-medium shadow-sm mb-2">
                        <span className="font-semibold text-[#31B29C]">طريقة التصرف:</span> {current.howToAct}
                    </div>
                    <ul dir="rtl" className="list-disc list-outside text-gray-700 mt-2 text-right">
                        {current.tips.map((tip, i) => (
                            <li key={i} className="mb-1">{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className={`px-6 py-2 rounded-full font-bold shadow-md border-2 transition-colors ${step === 0 ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#31B29C] border-[#31B29C] hover:bg-[#31B29C] hover:text-white'}`}
                >
                    السيناريو السابق
                </button>
                <button
                    onClick={() => setStep((s) => Math.min(SCENARIOS.length - 1, s + 1))}
                    disabled={step === SCENARIOS.length - 1}
                    className={`px-6 py-2 rounded-full font-bold shadow-md border-2 transition-colors ${step === SCENARIOS.length - 1 ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#31B29C] border-[#31B29C] hover:bg-[#31B29C] hover:text-white'}`}
                >
                    السيناريو التالي
                </button>
            </div>
            <div className="mt-8 text-center text-sm text-gray-400">جميع الإرشادات مستمدة من تجارب المتطوعين وتعليمات الجهات الرسمية</div>
        </div>
    );
}

export default SkillsGuid

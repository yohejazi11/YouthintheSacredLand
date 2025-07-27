import React from 'react'


const DUAAS = [
    {
        category: 'عند الإحرام',
        items: [
            { text: 'اللهم لبيك عمرةً أو حجاً، اللهم اجعلها حجةً مبرورةً وسعياً مشكوراً وذنباً مغفوراً.' },
            { text: 'اللهم إني نويت الحج فيسره لي وتقبله مني.' },
            { text: 'اللهم اجعل الإحرام خالصاً لوجهك الكريم.' },
            { text: 'اللهم إني أحرمت لك فاغفر لي ذنوبي واقبلني من عبادك الصالحين.' },
        ],
    },
    {
        category: 'عند الطواف',
        items: [
            { text: 'اللهم اجعله طوافاً مقبولاً وذنباً مغفوراً وسعياً مشكوراً.' },
            { text: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.' },
            { text: 'اللهم طهر قلبي وزكّ عملي وتقبل مني طوافي.' },
            { text: 'اللهم اجعل هذا الطواف شاهداً لي لا عليّ، واكتب لي به رضاك والجنة.' },
            { text: 'يا الله، إنك عفو تحب العفو فاعف عني.' },
        ],
    },
    {
        category: 'عند السعي',
        items: [
            { text: 'رب اغفر وارحم وتجاوز عما تعلم إنك أنت الأعز الأكرم.' },
            { text: 'اللهم إني أسألك العفو والعافية في الدنيا والآخرة.' },
            { text: 'اللهم اجعل سعيي مشكوراً وذنبي مغفوراً وعملي متقبلاً.' },
            { text: 'اللهم ارزقني السعي بين الصفا والمروة كما سعت هاجر، واملأ قلبي يقيناً برحمتك.' },
            { text: 'اللهم اجعلني أسعى إليك بقلبٍ خاشع ونفسٍ مطمئنة.' },
        ],
    },
    {
        category: 'عند الوقوف بعرفة',
        items: [
            { text: 'اللهم اجعلني من عتقائك من النار.' },
            { text: 'اللهم اغفر لي وارحمني وتب علي إنك أنت التواب الرحيم.' },
            { text: 'اللهم إني أسألك من الخير كله عاجله وآجله، ما علمتُ منه وما لم أعلم.' },
            { text: 'اللهم اجعلني ممن طال وقوفه بعرفة وطابت صحيفته وغُفِر ذنبه.' },
            { text: 'اللهم لا تحرمني خير ما عندك بشر ما عندي، واغفر لي وتب علي.' },
            { text: 'اللهم اجعل دعائي في عرفات مستجاباً وسعيي مبروراً.' },
        ],
    },
    {
        category: 'عند رمي الجمرات',
        items: [
            { text: 'اللهم اجعله حجاً مبروراً وسعياً مشكوراً وذنباً مغفوراً.' },
            { text: 'اللهم اجعل رميي للجمرات رميًا للشيطان وفعلاً لطاعتك.' },
            { text: 'اللهم لا تجعل للشيطان علي سبيلاً، ووفقني لطاعتك في السر والعلن.' },
            { text: 'اللهم اجعلني أرمي كل همّ وذنب وخطيئة كما أرمي الجمرات.' },
        ],
    },
    {
        category: 'عند الحلق أو التقصير',
        items: [
            { text: 'اللهم اجعل لي بكل شعرة نوراً، وبكل شعرة أجراً، وبكل شعرة حسنة.' },
            { text: 'اللهم طهرني من الذنوب والخطايا كما يُنقّى الثوب الأبيض من الدنس.' },
        ],
    },
    {
        category: 'عند دخول الحرم المكي',
        items: [
            { text: 'اللهم إن هذا بيتك الحرام، فحرّمني على النار وحرّم النار عليّ.' },
            { text: 'اللهم افتح لي أبواب رحمتك، وأدخلني مدخل صدق، وأخرجني مخرج صدق.' },
        ],
    },
    {
        category: 'دعاء عام في الحج',
        items: [
            { text: 'اللهم اجعل حجي مقبولاً وسعيي مشكوراً وذنبي مغفوراً.' },
            { text: 'اللهم اجعل هذا الحج بدايةً جديدة لحياة ترضى عنها.' },
            { text: 'اللهم ارزقني حسن الخاتمة ولقاءك وأنت راضٍ عني.' },
        ],
    },
];


const MAIN_COLOR = '#FBC134';

function Duaa() {
    return (
        <div className="min-h-screen w-full bg-[#FBC134]/10 flex flex-col items-center py-8 px-2">
            <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-center" style={{ color: MAIN_COLOR, textShadow: '0 2px 8px #fff7e0' }}>
                أدعية الحج
            </h1>
            <p className="mb-8 text-lg text-gray-700 text-center max-w-2xl">
                استعرض الأدعية الخاصة بكل مرحلة من مراحل الحج، يمكنك ترديدها في وقتها أو مشاركتها مع الآخرين.
            </p>
            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {DUAAS.map((cat, idx) => (
                    <div key={idx} className="rounded-3xl shadow-xl bg-white border-2 flex flex-col items-center p-6 relative group hover:scale-105 transition-transform" style={{ borderColor: MAIN_COLOR }}>
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#FBC134] text-center text-white px-6 py-2 rounded-full text-lg font-bold shadow-md group-hover:scale-110 transition-transform" style={{ letterSpacing: '1px' }}>
                            {cat.category}
                        </div>
                        <ul className="mt-8 w-full flex flex-col gap-4">
                            {cat.items.map((duaa, i) => (
                                <li key={i} className="bg-[#FBC134] bg-opacity-10 border-l-4 border-[#FBC134] p-4 rounded-xl text-gray-800 text-md font-medium shadow-sm hover:bg-opacity-20 transition-colors">
                                    <span className="block text-right leading-relaxed">{duaa.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mt-12 text-center text-sm text-gray-400">جميع الأدعية مأخوذة من السنة النبوية أو الأدعية المأثورة للحج</div>
        </div>
    );
}

export default Duaa

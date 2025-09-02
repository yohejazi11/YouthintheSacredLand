
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
const MAIN_COLOR = '#FBC134';

function Footsteps() {
    const [steps, setSteps] = useState([]);
    const [tips, setTips] = useState({}); // step_id => [tips]
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // جلب الخطوات
                const stepsRes = await fetch('https://yafe3on.com/backend/api/manasek/getSteps.php');
                const stepsData = await stepsRes.json();
                if (!stepsData.success) throw new Error('خطأ في جلب الخطوات');
                // ترتيب الخطوات حسب رقم الترتيب أو id
                const sortedSteps = (stepsData.steps || []).sort((a, b) => {
                    // إذا فيه ترتيب رقمي واضح مثل order أو ترتيب id
                    if (a.order !== undefined && b.order !== undefined) {
                        return a.order - b.order;
                    }
                    if (a.id !== undefined && b.id !== undefined) {
                        return a.id - b.id;
                    }
                    return 0;
                });
                setSteps(sortedSteps);

                // جلب النصائح
                const tipsRes = await fetch('https://yafe3on.com/backend/api/manasek/getTips.php');
                const tipsData = await tipsRes.json();
                if (!tipsData.success) throw new Error('خطأ في جلب النصائح');
                // تحويل النصائح إلى كائن: step_id => [tips]
                const tipsMap = {};
                (tipsData.tips || []).forEach(tip => {
                    if (!tipsMap[tip.step_id]) tipsMap[tip.step_id] = [];
                    tipsMap[tip.step_id].push(tip.tip);
                });
                setTips(tipsMap);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const current = steps[step] || {};
    const currentTips = current.id ? (tips[current.id] || []) : [];

    return (
        <div className="min-h-screen w-full bg-[#FBC134]/10 flex flex-col items-center py-8 px-2 pt-[90px]">
            <Header/>
            <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-center" style={{ color: MAIN_COLOR, textShadow: '0 2px 8px #fff7e0' }}>
                خطوات الحج بالتفصيل
            </h1>
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-2 flex flex-col md:flex-row items-center p-6 md:p-10 mb-8 relative" style={{ borderColor: MAIN_COLOR }}>
                {loading ? (
                    <div className="w-full text-center py-12 text-gray-400">جاري تحميل الخطوات...</div>
                ) : error ? (
                    <div className="w-full text-center py-12 text-red-400">{error}</div>
                ) : (
                    <>
                        <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                            <img src={current.image_url} alt={current.title} className="rounded-2xl shadow-lg max-h-64 object-fill w-full" style={{ border: `3px solid ${MAIN_COLOR}` }} />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col gap-3 md:pl-8 text-right">
                            <div className="text-2xl font-bold mb-2 text-[#FBC134]">{current.title}</div>
                            <div className="text-md text-gray-700 mb-2"><span className="font-semibold">اليوم:</span> {current.day}</div>
                            <div className="text-md text-gray-700 mb-2"><span className="font-semibold">الشرح:</span> {current.description}</div>
                            <div className="bg-[#FBC134]/20 border-r-4 border-[#FBC134] p-3 rounded-xl text-gray-800 text-md font-medium shadow-sm mb-2">
                                <span className="font-semibold text-[#FBC134]">الدعاء:</span> {current.duaa}
                            </div>
                            <ul dir="rtl" className="list-disc list-outside text-gray-700 mt-2  text-right">
                                {currentTips.map((tip, i) => (
                                    <li key={i} className="mb-1">{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0 || loading || steps.length === 0}
                    className={`px-6 py-2 rounded-full font-bold shadow-md border-2 transition-colors ${step === 0 || loading || steps.length === 0 ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#FBC134] border-[#FBC134] hover:bg-[#FBC134] hover:text-white'}`}
                >
                    الخطوة السابقة
                </button>
                <button
                    onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                    disabled={step === steps.length - 1 || loading || steps.length === 0}
                    className={`px-6 py-2 rounded-full font-bold shadow-md border-2 transition-colors ${step === steps.length - 1 || loading || steps.length === 0 ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#FBC134] border-[#FBC134] hover:bg-[#FBC134] hover:text-white'}`}
                >
                    الخطوة التالية
                </button>
            </div>
            <div className="mt-8 text-center text-sm text-gray-400">جميع الخطوات مرتبة حسب التسلسل الزمني للحج مع أهم الأدعية والتنبيهات</div>
        </div>
    );
}

export default Footsteps;

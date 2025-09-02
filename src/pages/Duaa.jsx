
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const MAIN_COLOR = '#FBC134';

function Duaa() {
    const [categories, setCategories] = useState([]);
    const [duaas, setDuaas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // جلب التصنيفات
                const catRes = await fetch('https://yafe3on.com/backend/api/duaa/getDuaaCatagory.php');
                const catData = await catRes.json();
                if (!catData.success) throw new Error('خطأ في جلب التصنيفات');
                setCategories(catData.categories);

                // جلب الأدعية
                const duaaRes = await fetch('https://yafe3on.com/backend/api/duaa/getDuaa.php');
                const duaaData = await duaaRes.json();
                if (!duaaData.success) throw new Error('خطأ في جلب الأدعية');
                setDuaas(duaaData.duaas);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // ترتيب الأدعية حسب التصنيف
    const getDuaasByCategory = (catId) => duaas.filter(d => d.category_id === catId);

    // ترتيب التصنيفات حسب id تصاعدياً
    const sortedCategories = [...categories].sort((a, b) => a.id - b.id);

    return (
        <div className="min-h-screen w-full bg-[#FBC134]/10 flex flex-col items-center py-8 px-2 pt-[90px]">
            <Header/>
            <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-center" style={{ color: MAIN_COLOR, textShadow: '0 2px 8px #fff7e0' }}>
                أدعية الحج
            </h1>
            <p className="mb-8 text-lg text-gray-700 text-center max-w-2xl">
                استعرض الأدعية الخاصة بكل مرحلة من مراحل الحج، يمكنك ترديدها في وقتها أو مشاركتها مع الآخرين.
            </p>
            {loading ? (
                <div className="text-center text-lg text-gray-500 py-12">جاري تحميل الأدعية...</div>
            ) : error ? (
                <div className="text-center text-lg text-red-500 py-12">{error}</div>
            ) : (
                <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedCategories.map((cat, idx) => (
                        <div key={cat.id} className="rounded-3xl shadow-xl bg-white border-2 flex flex-col items-center p-6 relative group hover:scale-105 transition-transform" style={{ borderColor: MAIN_COLOR }}>
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#FBC134] text-center text-white px-6 py-2 rounded-full text-lg font-bold shadow-md group-hover:scale-110 transition-transform" style={{ letterSpacing: '1px' }}>
                                {cat.name_ar}
                            </div>
                            <ul className="mt-8 w-full flex flex-col gap-4">
                                {getDuaasByCategory(cat.id).length === 0 ? (
                                    <li className="text-gray-400 text-center">لا توجد أدعية في هذا التصنيف.</li>
                                ) : (
                                    getDuaasByCategory(cat.id).map((duaa, i) => (
                                        <li key={duaa.id} className="bg-[#FBC134] bg-opacity-10 border-l-4 border-[#FBC134] p-4 rounded-xl text-gray-800 text-md font-medium shadow-sm hover:bg-opacity-20 transition-colors">
                                            <span className="block text-right leading-relaxed">{duaa.text}</span>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-12 text-center text-sm text-gray-400">جميع الأدعية مأخوذة من السنة النبوية أو الأدعية المأثورة للحج</div>
        </div>
    );
}

export default Duaa;

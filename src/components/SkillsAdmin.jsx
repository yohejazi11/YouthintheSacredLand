import React, { useState, useRef, useEffect } from 'react';

const MAIN_COLOR = '#31B29C';

function SkillsAdmin() {
    const addFormRef = useRef(null);
    const editFormRef = useRef(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [scenarios, setScenarios] = useState([]);
    const [newScenario, setNewScenario] = useState({ title: '', image: '', scenario: '', how_to_act: '', tips: '' });
    const [editId, setEditId] = useState(null);
    const [editScenario, setEditScenario] = useState({ title: '', image: '', scenario: '', how_to_act: '', tips: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchScenarios() {
            setLoading(true);
            try {
                const res = await fetch('https://yafe3on.com/backend/api/skill/getScenarios.php');
                const data = await res.json();
                setScenarios(data || []);
            } catch {
                setError('تعذر جلب السيناريوهات');
            } finally {
                setLoading(false);
            }
        }
        fetchScenarios();
    }, []);

    const handleAddScenario = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tipsArr = newScenario.tips.split('\n').map(t => t.trim()).filter(Boolean);
            const res = await fetch('https://yafe3on.com/backend/api/skill/postScenario.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newScenario.title,
                    image: newScenario.image,
                    scenario: newScenario.scenario,
                    how_to_act: newScenario.how_to_act,
                    tips: tipsArr
                })
            });
            const data = await res.json();
            if (data.success) {
                setShowAddForm(false);
                setNewScenario({ title: '', image: '', scenario: '', how_to_act: '', tips: '' });
                // إعادة جلب السيناريوهات
                const res2 = await fetch('https://yafe3on.com/backend/api/skill/getScenarios.php');
                const data2 = await res2.json();
                setScenarios(data2 || []);
            } else {
                setError('تعذر إضافة السيناريو');
            }
        } catch {
            setError('تعذر إضافة السيناريو');
        }
        setLoading(false);
    };

    // تعديل السيناريو
    const handleEditScenario = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tipsArr = editScenario.tips.split('\n').map(t => t.trim()).filter(Boolean);
            const res = await fetch('https://yafe3on.com/backend/api/skill/putScenario.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editId,
                    title: editScenario.title,
                    image: editScenario.image,
                    scenario: editScenario.scenario,
                    how_to_act: editScenario.how_to_act,
                    tips: tipsArr
                })
            });
            const data = await res.json();
            if (data.success) {
                setEditId(null);
                setEditScenario({ title: '', image: '', scenario: '', how_to_act: '', tips: '' });
                // إعادة جلب السيناريوهات
                const res2 = await fetch('https://yafe3on.com/backend/api/skill/getScenarios.php');
                const data2 = await res2.json();
                setScenarios(data2 || []);
            } else {
                setError('تعذر تعديل السيناريو');
            }
        } catch {
            setError('تعذر تعديل السيناريو');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا السيناريو؟')) return;
        setLoading(true);
        try {
            const res = await fetch(`/backend/api/skill/deleteScenario.php?id=${id}`);
            const result = await res.json();
            if (result.success) {
                setScenarios(scenarios.filter(s => s.id !== id));
            } else {
                setError('تعذر حذف السيناريو');
            }
        } catch {
            setError('تعذر حذف السيناريو');
        }
        setLoading(false);
    };

    return (
        <div className='w-[75%] max-md:w-[100%] rounded-[15px] bg-white border border-gray-400 p-4 mb-12'>
            {/* زر إضافة سيناريو */}
            <div className="flex gap-2 mb-6">
                <button className="px-4 py-2 bg-[#31B29C] text-white rounded font-bold" onClick={() => { setShowAddForm(true); setEditId(null); }}>
                    إضافة سيناريو جديد
                </button>
            </div>

            {loading && <div className="text-center text-gray-500">جاري التحميل...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}

            {/* فورم إضافة سيناريو */}
            {showAddForm && (
                <form ref={addFormRef} onSubmit={handleAddScenario} className="mb-6 flex flex-col gap-4 bg-[#eafffa] p-6 rounded-xl border border-[#31B29C] shadow-lg">
                    <h2 className="text-xl font-bold text-[#31B29C] mb-2">إضافة سيناريو جديد مع نصائح</h2>
                    <input type="text" value={newScenario.title} onChange={e => setNewScenario({ ...newScenario, title: e.target.value })} placeholder="عنوان السيناريو..." className="border rounded px-3 py-2" required />
                    <input type="text" value={newScenario.image} onChange={e => setNewScenario({ ...newScenario, image: e.target.value })} placeholder="رابط الصورة..." className="border rounded px-3 py-2" />
                    <textarea value={newScenario.scenario} onChange={e => setNewScenario({ ...newScenario, scenario: e.target.value })} placeholder="وصف السيناريو..." className="border rounded px-3 py-2" required />
                    <textarea value={newScenario.how_to_act} onChange={e => setNewScenario({ ...newScenario, how_to_act: e.target.value })} placeholder="طريقة التصرف..." className="border rounded px-3 py-2" required />
                    <textarea value={newScenario.tips} onChange={e => setNewScenario({ ...newScenario, tips: e.target.value })} placeholder="النصائح (كل نصيحة في سطر منفصل)" className="border rounded px-3 py-2" />
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-4 py-2 bg-[#31B29C] text-white rounded font-bold">إضافة</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => setShowAddForm(false)}>إلغاء</button>
                    </div>
                </form>
            )}

            {/* فورم تعديل سيناريو */}
            {editId && (
                <form ref={editFormRef} onSubmit={handleEditScenario} className="mb-6 flex flex-col gap-4 bg-[#eafffa] p-6 rounded-xl border border-[#31B29C] shadow-lg">
                    <h2 className="text-xl font-bold text-[#31B29C] mb-2">تعديل السيناريو</h2>
                    <input type="text" value={editScenario.title} onChange={e => setEditScenario({ ...editScenario, title: e.target.value })} placeholder="عنوان السيناريو..." className="border rounded px-3 py-2" required />
                    <input type="text" value={editScenario.image} onChange={e => setEditScenario({ ...editScenario, image: e.target.value })} placeholder="رابط الصورة..." className="border rounded px-3 py-2" />
                    <textarea value={editScenario.scenario} onChange={e => setEditScenario({ ...editScenario, scenario: e.target.value })} placeholder="وصف السيناريو..." className="border rounded px-3 py-2" required />
                    <textarea value={editScenario.how_to_act} onChange={e => setEditScenario({ ...editScenario, how_to_act: e.target.value })} placeholder="طريقة التصرف..." className="border rounded px-3 py-2" required />
                    <textarea value={editScenario.tips} onChange={e => setEditScenario({ ...editScenario, tips: e.target.value })} placeholder="النصائح (كل نصيحة في سطر منفصل)" className="border rounded px-3 py-2" />
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-4 py-2 bg-[#31B29C] text-white rounded font-bold">تعديل</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => { setEditId(null); setEditScenario({ title: '', image: '', scenario: '', how_to_act: '', tips: '' }); }}>إلغاء</button>
                    </div>
                </form>
            )}

            {/* عرض السيناريوهات */}
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 text-[#31B29C]">السيناريوهات الحالية</h3>
                <ul className="space-y-4">
                    {scenarios.map(s => (
                        <li key={s.id} className="border-b pb-2 flex justify-between items-center">
                            <div>
                                <span className="block text-right leading-relaxed text-[#31B29C] font-bold">{s.title}</span>
                                {s.image && <img src={s.image} alt="scenario" className="w-20 h-20 object-cover rounded mt-2" />}
                                <span className="block text-xs text-gray-500">{s.scenario}</span>
                                <span className="block text-xs text-gray-500">{s.how_to_act}</span>
                                <ul className="list-disc list-inside text-gray-600 mt-2">
                                    {Array.isArray(s.tips) && s.tips.map((tip, i) => (
                                        <li key={i} className="mb-1">{tip}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-[#31B29C] text-white rounded" onClick={() => {
                                    setEditId(s.id);
                                    setShowAddForm(false);
                                    setEditScenario({
                                        title: s.title,
                                        image: s.image,
                                        scenario: s.scenario,
                                        how_to_act: s.how_to_act,
                                        tips: Array.isArray(s.tips) ? s.tips.join('\n') : ''
                                    });
                                    setTimeout(() => {
                                        if (editFormRef.current) {
                                            editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }
                                    }, 100);
                                }}>تعديل</button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(s.id)}>حذف</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SkillsAdmin

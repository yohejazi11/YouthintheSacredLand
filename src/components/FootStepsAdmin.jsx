import React, { useState, useRef, useEffect } from 'react';

function FootStepsAdmin() {
    const editFormRef = useRef(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [steps, setSteps] = useState([]);
    const [newStep, setNewStep] = useState({ title: '', image_url: '', day: '', description: '', duaa: '', tips: '' });
    const [editId, setEditId] = useState(null);
    const [editStep, setEditStep] = useState({ title: '', image_url: '', day: '', description: '', duaa: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSteps() {
            setLoading(true);
            try {
                const res = await fetch('https://yafe3on.com/backend/api/manasek/getSteps.php');
                const data = await res.json();
                setSteps(data.steps || []);
            } catch {
                setError('تعذر جلب الخطوات');
            } finally {
                setLoading(false);
            }
        }
        fetchSteps();
    }, []);

    const handleAddStep = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // أضف الخطوة أولاً
            const stepRes = await fetch('https://yafe3on.com/backend/api/manasek/postSteps.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newStep.title,
                    image_url: newStep.image_url,
                    day: newStep.day,
                    description: newStep.description,
                    duaa: newStep.duaa
                })
            });
            const stepData = await stepRes.json();
            // إذا تم إضافة الخطوة بنجاح، أضف النصائح
            if (stepData.success && stepData.id && newStep.tips.trim()) {
                const tipsArr = newStep.tips.split('\n').map(t => t.trim()).filter(Boolean);
                for (const tip of tipsArr) {
                    await fetch('https://yafe3on.com/backend/api/manasek/postTips.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ step_id: stepData.id, tip })
                    });
                }
            }
            setShowAddForm(false);
            setNewStep({ title: '', image_url: '', day: '', description: '', duaa: '', tips: '' });
            const res = await fetch('https://yafe3on.com/backend/api/manasek/getSteps.php');
            const data = await res.json();
            setSteps(data.steps || []);
        } finally {
            setLoading(false);
        }
    };

    const handleEditStep = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('https://yafe3on.com/backend/api/manasek/putSteps.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...editStep, id: editId })
            });
            setEditId(null);
            setEditStep({ title: '', image_url: '', day: '', description: '', duaa: '' });
            const res = await fetch('https://yafe3on.com/backend/api/manasek/getSteps.php');
            const data = await res.json();
            setSteps(data.steps || []);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteStep = async (id) => {
        setLoading(true);
        try {
            await fetch('https://yafe3on.com/backend/api/manasek/deleteSteps.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const res = await fetch('https://yafe3on.com/backend/api/manasek/getSteps.php');
            const data = await res.json();
            setSteps(data.steps || []);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-[75%] max-md:w-[100%] rounded-[15px] bg-white border border-gray-400 p-4 mb-12'>
            {/* زر إضافة خطوة */}
            <div className="flex gap-2 mb-6">
                <button className="px-4 py-2 bg-[#FBC134] text-white rounded font-bold" onClick={() => setShowAddForm(true)}>
                    إضافة خطوة جديدة
                </button>
            </div>

            {loading && <div className="text-center text-gray-500">جاري التحميل...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}

            {/* فورم إضافة خطوة */}
            {showAddForm && (
                <form onSubmit={handleAddStep} className="mb-6 flex flex-col gap-4 bg-[#fffbe6] p-6 rounded-xl border border-[#FBC134] shadow-lg">
                    <h2 className="text-xl font-bold text-[#FBC134] mb-2">إضافة خطوة جديدة مع نصائحها</h2>
                    <input type="text" value={newStep.title} onChange={e => setNewStep({ ...newStep, title: e.target.value })} placeholder="عنوان الخطوة..." className="border rounded px-3 py-2" required />
                    <input type="text" value={newStep.image_url} onChange={e => setNewStep({ ...newStep, image_url: e.target.value })} placeholder="رابط الصورة..." className="border rounded px-3 py-2" />
                    <input type="text" value={newStep.day} onChange={e => setNewStep({ ...newStep, day: e.target.value })} placeholder="اليوم..." className="border rounded px-3 py-2" />
                    <textarea value={newStep.description} onChange={e => setNewStep({ ...newStep, description: e.target.value })} placeholder="وصف الخطوة..." className="border rounded px-3 py-2" />
                    <textarea value={newStep.duaa} onChange={e => setNewStep({ ...newStep, duaa: e.target.value })} placeholder="الدعاء..." className="border rounded px-3 py-2" />
                    <textarea value={newStep.tips} onChange={e => setNewStep({ ...newStep, tips: e.target.value })} placeholder="النصائح (كل نصيحة في سطر منفصل)" className="border rounded px-3 py-2" />
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-4 py-2 bg-[#FBC134] text-white rounded font-bold">إضافة</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => setShowAddForm(false)}>إلغاء</button>
                    </div>
                </form>
            )}

            {/* فورم تعديل خطوة */}
            {editId && (
                <form ref={editFormRef} onSubmit={handleEditStep} className="mb-6 flex flex-col gap-4">
                    <input type="text" value={editStep.title} onChange={e => setEditStep({ ...editStep, title: e.target.value })} placeholder="عنوان الخطوة..." className="border rounded px-3 py-2" required />
                    <input type="text" value={editStep.image_url} onChange={e => setEditStep({ ...editStep, image_url: e.target.value })} placeholder="رابط الصورة..." className="border rounded px-3 py-2" />
                    <input type="text" value={editStep.day} onChange={e => setEditStep({ ...editStep, day: e.target.value })} placeholder="اليوم..." className="border rounded px-3 py-2" />
                    <textarea value={editStep.description} onChange={e => setEditStep({ ...editStep, description: e.target.value })} placeholder="وصف الخطوة..." className="border rounded px-3 py-2" />
                    <textarea value={editStep.duaa} onChange={e => setEditStep({ ...editStep, duaa: e.target.value })} placeholder="الدعاء..." className="border rounded px-3 py-2" />
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-[#31B29C] text-white rounded font-bold">تعديل</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => { setEditId(null); setEditStep({ title: '', image_url: '', day: '', description: '', duaa: '' }); }}>إلغاء</button>
                    </div>
                </form>
            )}

            {/* عرض الخطوات مع خيارات تعديل وحذف */}
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 text-[#024CAA]">الخطوات الحالية</h3>
                <ul className="space-y-4">
                    {steps.map(step => (
                        <li key={step.id} className="border-b pb-2 flex justify-between items-center">
                            <div>
                                <span className="block text-right leading-relaxed text-[#024CAA] font-bold">{step.title}</span>
                                {step.image_url && <img src={step.image_url} alt="step" className="w-20 h-20 object-cover rounded mt-2" />}
                                <span className="block text-xs text-gray-500">{step.day}</span>
                                <span className="block text-xs text-gray-500">{step.description}</span>
                                <span className="block text-xs text-gray-500">{step.duaa}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-[#31B29C] text-white rounded"
                                    onClick={() => {
                                        setEditId(step.id);
                                        setEditStep({ title: step.title, image_url: step.image_url, day: step.day, description: step.description, duaa: step.duaa });
                                        setShowAddForm(false);
                                        setTimeout(() => {
                                            if (editFormRef.current) {
                                                editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }, 100);
                                    }}
                                >تعديل</button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDeleteStep(step.id)}>حذف</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FootStepsAdmin

import React, { useState, useRef, useEffect } from 'react';

function DuaaAdmin() {
    const editFormRef = useRef(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAddCatForm, setShowAddCatForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [duaas, setDuaas] = useState([]);
    const [newDuaa, setNewDuaa] = useState({ text: '', category_id: '' });
    const [newCat, setNewCat] = useState('');
    const [editId, setEditId] = useState(null);
    const [editDuaa, setEditDuaa] = useState({ text: '', category_id: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const catRes = await fetch('https://yafe3on.com/backend/api/duaa/getDuaaCatagory.php');
                const catData = await catRes.json();
                setCategories(catData.categories || []);
                const duaaRes = await fetch('https://yafe3on.com/backend/api/duaa/getDuaa.php');
                const duaaData = await duaaRes.json();
                setDuaas(duaaData.duaas || []);
            } catch {
                setError('تعذر جلب البيانات');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleAddDuaa = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('https://yafe3on.com/backend/api/duaa/postDuaa.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDuaa)
            });
            setShowAddForm(false);
            setNewDuaa({ text: '', category_id: '' });
            const duaaRes = await fetch('https://yafe3on.com/backend/api/duaa/getDuaa.php');
            const duaaData = await duaaRes.json();
            setDuaas(duaaData.duaas || []);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCat = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('https://yafe3on.com/backend/api/duaa/postDuaaCatagory.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name_ar: newCat })
            });
            setShowAddCatForm(false);
            setNewCat('');
            const catRes = await fetch('https://yafe3on.com/backend/api/duaa/getDuaaCatagory.php');
            const catData = await catRes.json();
            setCategories(catData.categories || []);
        } finally {
            setLoading(false);
        }
    };

    const handleEditDuaa = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('https://yafe3on.com/backend/api/duaa/putDuaa.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...editDuaa, id: editId })
            });
            setEditId(null);
            setEditDuaa({ text: '', category_id: '' });
            const duaaRes = await fetch('https://yafe3on.com/backend/api/duaa/getDuaa.php');
            const duaaData = await duaaRes.json();
            setDuaas(duaaData.duaas || []);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDuaa = async (id) => {
        setLoading(true);
        try {
            await fetch('https://yafe3on.com/backend/api/duaa/deleteDuaa.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const duaaRes = await fetch('https://yafe3on.com/backend/api/duaa/getDuaa.php');
            const duaaData = await duaaRes.json();
            setDuaas(duaaData.duaas || []);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-[75%] max-md:w-[100%] rounded-[15px] bg-white border border-gray-400 p-4'>
            {loading && <div className="text-center text-gray-500">جاري التحميل...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}

            {/* أزرار إضافة دعاء وتصنيف */}
            <div className="flex gap-2 mb-6">
                <button className="px-4 py-2 bg-[#FBC134] text-white rounded font-bold" onClick={() => { setShowAddForm(true); setShowAddCatForm(false); setEditId(null); }}>إضافة دعاء</button>
                <button className="px-4 py-2 bg-[#31B29C] text-white rounded font-bold" onClick={() => { setShowAddCatForm(true); setShowAddForm(false); setEditId(null); }}>إضافة تصنيف دعاء</button>
            </div>

            {/* فورم تعديل دعاء أعلى القائمة */}
            {editId && (
                <form ref={editFormRef} onSubmit={handleEditDuaa} className="mb-6 flex flex-col gap-4" id="editDuaaForm">
                    <textarea value={editDuaa.text} onChange={e => setEditDuaa({ ...editDuaa, text: e.target.value })} placeholder="نص الدعاء..." className="border rounded px-3 py-2" required />
                    <select value={editDuaa.category_id} onChange={e => setEditDuaa({ ...editDuaa, category_id: e.target.value })} className="border rounded px-3 py-2" required>
                        <option value="">اختر التصنيف</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name_ar}</option>)}
                    </select>
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-[#31B29C] text-white rounded font-bold">تعديل</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => { setEditId(null); setEditDuaa({ text: '', category_id: '' }); }}>إلغاء</button>
                    </div>
                </form>
            )}

            {/* فورم إضافة دعاء */}
            {showAddForm && (
                <form onSubmit={handleAddDuaa} className="mb-6 flex flex-col gap-4">
                    <textarea value={newDuaa.text} onChange={e => setNewDuaa({ ...newDuaa, text: e.target.value })} placeholder="نص الدعاء..." className="border rounded px-3 py-2" required />
                    <select value={newDuaa.category_id} onChange={e => setNewDuaa({ ...newDuaa, category_id: e.target.value })} className="border rounded px-3 py-2" required>
                        <option value="">اختر التصنيف</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name_ar}</option>)}
                    </select>
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-[#FBC134] text-white rounded font-bold">إضافة</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => setShowAddForm(false)}>إلغاء</button>
                    </div>
                </form>
            )}

            {/* فورم إضافة تصنيف */}
            {showAddCatForm && (
                <form onSubmit={handleAddCat} className="mb-6 flex flex-col gap-4">
                    <input type="text" value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="اسم التصنيف..." className="border rounded px-3 py-2" required />
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-[#31B29C] text-white rounded font-bold">إضافة التصنيف</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => setShowAddCatForm(false)}>إلغاء</button>
                    </div>
                </form>
            )}

            {/* عرض الأدعية مع خيارات تعديل وحذف */}
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 text-[#024CAA]">الأدعية الحالية</h3>
                <ul className="space-y-4">
                    {duaas.map(duaa => (
                        <li key={duaa.id} className="border-b pb-2 flex justify-between items-center">
                            <div>
                                <span className="block text-right leading-relaxed text-[#024CAA]">{duaa.text}</span>
                                <span className="block text-xs text-gray-500">{categories.find(c => c.id == duaa.category_id)?.name_ar}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-[#31B29C] text-white rounded"
                                    onClick={() => {
                                        setEditId(duaa.id);
                                        setEditDuaa({ text: duaa.text, category_id: duaa.category_id });
                                        setShowAddForm(false);
                                        setShowAddCatForm(false);
                                        setTimeout(() => {
                                            if (editFormRef.current) {
                                                editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }, 100);
                                    }}
                                >تعديل</button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDeleteDuaa(duaa.id)}>حذف</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DuaaAdmin;

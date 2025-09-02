import React, { useState, useEffect, useRef } from 'react';

function PodcatsAdmin() {
    const addFormRef = useRef(null);
    const editFormRef = useRef(null);
    const [podcasts, setPodcasts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPodcast, setNewPodcast] = useState({ title: '', description: '', media_url: '', category_id: '' });
    const [editId, setEditId] = useState(null);
    const [editPodcast, setEditPodcast] = useState({ title: '', description: '', media_url: '', category_id: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAll() {
            setLoading(true);
            try {
                const resPod = await fetch('https://yafe3on.com/backend/api/podcasts/getPodcasts.php');
                const dataPod = await resPod.json();
                setPodcasts(dataPod || []);
                const resCat = await fetch('https://yafe3on.com/backend/api/podcasts/getCategories.php');
                const dataCat = await resCat.json();
                setCategories(dataCat || []);
            } catch {
                setError('تعذر جلب البيانات');
            } finally {
                setLoading(false);
            }
        }
        fetchAll();
    }, []);

    const handleAddPodcast = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('https://yafe3on.com/backend/api/podcasts/postPodcast.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPodcast)
            });
            const data = await res.json();
            if (data.success) {
                setShowAddForm(false);
                setNewPodcast({ title: '', description: '', media_url: '', category_id: '' });
                const resPod = await fetch('https://yafe3on.com/backend/api/podcasts/getPodcasts.php');
                const dataPod = await resPod.json();
                setPodcasts(dataPod || []);
            } else {
                setError('تعذر إضافة البودكاست');
            }
        } catch {
            setError('تعذر إضافة البودكاست');
        }
        setLoading(false);
    };

    const handleEditPodcast = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('https://yafe3on.com/backend/api/podcasts/putPodcast.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...editPodcast, id: editId })
            });
            const data = await res.json();
            if (data.success) {
                setEditId(null);
                setEditPodcast({ title: '', description: '', media_url: '', category_id: '' });
                const resPod = await fetch('https://yafe3on.com/backend/api/podcasts/getPodcasts.php');
                const dataPod = await resPod.json();
                setPodcasts(dataPod || []);
            } else {
                setError('تعذر تعديل البودكاست');
            }
        } catch {
            setError('تعذر تعديل البودكاست');
        }
        setLoading(false);
    };

    const handleDeletePodcast = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا البودكاست؟')) return;
        setLoading(true);
        try {
            const res = await fetch(`https://yafe3on.com/backend/api/podcasts/deletePodcast.php?id=${id}`);
            const data = await res.json();
            if (data.success) {
                setPodcasts(podcasts.filter(p => p.id !== id));
            } else {
                setError('تعذر حذف البودكاست');
            }
        } catch {
            setError('تعذر حذف البودكاست');
        }
        setLoading(false);
    };

    return (
        <div className='w-[75%] max-md:w-[100%] rounded-[15px] bg-white border border-gray-400 p-4 mb-12'>
            <div className="flex gap-2 mb-6">
                <button className="px-4 py-2 bg-[#FBC134] text-white rounded font-bold" onClick={() => { setShowAddForm(true); setEditId(null); }}>
                    إضافة بودكاست جديد
                </button>
            </div>

            {loading && <div className="text-center text-gray-500">جاري التحميل...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}

            {/* فورم إضافة بودكاست */}
            {showAddForm && (
                <form ref={addFormRef} onSubmit={handleAddPodcast} className="mb-6 flex flex-col gap-4 bg-[#fffbe6] p-6 rounded-xl border border-[#FBC134] shadow-lg">
                    <h2 className="text-xl font-bold text-[#FBC134] mb-2">إضافة بودكاست جديد</h2>
                    <input type="text" value={newPodcast.title} onChange={e => setNewPodcast({ ...newPodcast, title: e.target.value })} placeholder="عنوان البودكاست..." className="border rounded px-3 py-2" required />
                    <textarea value={newPodcast.description} onChange={e => setNewPodcast({ ...newPodcast, description: e.target.value })} placeholder="وصف البودكاست..." className="border rounded px-3 py-2" />
                    <input type="text" value={newPodcast.media_url} onChange={e => setNewPodcast({ ...newPodcast, media_url: e.target.value })} placeholder="رابط الملف الصوتي..." className="border rounded px-3 py-2" required />
                    <select value={newPodcast.category_id} onChange={e => setNewPodcast({ ...newPodcast, category_id: e.target.value })} className="border rounded px-3 py-2" required>
                        <option value="">اختر التصنيف</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-4 py-2 bg-[#FBC134] text-white rounded font-bold">إضافة</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => setShowAddForm(false)}>إلغاء</button>
                    </div>
                </form>
            )}

            {/* فورم تعديل بودكاست */}
            {editId && (
                <form ref={editFormRef} onSubmit={handleEditPodcast} className="mb-6 flex flex-col gap-4 bg-[#fffbe6] p-6 rounded-xl border border-[#FBC134] shadow-lg">
                    <h2 className="text-xl font-bold text-[#FBC134] mb-2">تعديل البودكاست</h2>
                    <input type="text" value={editPodcast.title} onChange={e => setEditPodcast({ ...editPodcast, title: e.target.value })} placeholder="عنوان البودكاست..." className="border rounded px-3 py-2" required />
                    <textarea value={editPodcast.description} onChange={e => setEditPodcast({ ...editPodcast, description: e.target.value })} placeholder="وصف البودكاست..." className="border rounded px-3 py-2" />
                    <input type="text" value={editPodcast.media_url} onChange={e => setEditPodcast({ ...editPodcast, media_url: e.target.value })} placeholder="رابط الملف الصوتي..." className="border rounded px-3 py-2" required />
                    <select value={editPodcast.category_id} onChange={e => setEditPodcast({ ...editPodcast, category_id: e.target.value })} className="border rounded px-3 py-2" required>
                        <option value="">اختر التصنيف</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-4 py-2 bg-[#FBC134] text-white rounded font-bold">تعديل</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => { setEditId(null); setEditPodcast({ title: '', description: '', media_url: '', category_id: '' }); }}>إلغاء</button>
                    </div>
                </form>
            )}

            {/* عرض البودكاست */}
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 text-[#FBC134]">البودكاست الحالي</h3>
                <ul className="space-y-4">
                    {podcasts.map(p => (
                        <li key={p.id} className="border-b pb-2 flex justify-between items-center">
                            <div>
                                <span className="block text-right leading-relaxed text-[#FBC134] font-bold">{p.title}</span>
                                <span className="block text-xs text-gray-500">{p.description}</span>
                                <span className="block text-xs text-gray-500">التصنيف: {p.category_name}</span>
                                <span className="block text-xs text-blue-600">{p.media_url}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-[#FBC134] text-white rounded" onClick={() => {
                                    setEditId(p.id);
                                    setShowAddForm(false);
                                    setEditPodcast({
                                        title: p.title,
                                        description: p.description,
                                        media_url: p.media_url,
                                        category_id: p.category_id
                                    });
                                    setTimeout(() => {
                                        if (editFormRef.current) {
                                            editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }
                                    }, 100);
                                }}>تعديل</button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDeletePodcast(p.id)}>حذف</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PodcatsAdmin;

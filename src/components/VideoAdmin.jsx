
import React, { useState, useEffect, useRef } from 'react';

function VideoAdmin() {
    const addFormRef = useRef(null);
    const [videos, setVideos] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        videoType: 'youtube',
        url: '',
        file: null,
        contentType: 'hajj'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // جلب المقاطع
    const fetchVideos = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://yafe3on.com/backend/api/video/getVideo.php');
            const data = await res.json();
            setVideos(data || []);
        } catch {
            setError('تعذر جلب المقاطع');
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchVideos();
    }, []);

    // إضافة مقطع
    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('videoType', form.videoType);
        formData.append('type', form.contentType); // نوع المحتوى للحاج أو معين
        formData.append('contentType', form.contentType);
        if (form.videoType === 'youtube') {
            formData.append('url', form.url);
        } else {
            if (form.file) formData.append('file', form.file);
        }
        try {
            const res = await fetch('https://yafe3on.com/backend/api/video/postVideo.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setShowAddForm(false);
                setForm({ title: '', description: '', videoType: 'youtube', url: '', file: null, contentType: 'hajj' });
                fetchVideos();
            } else {
                setError(data.message || 'تعذر إضافة المقطع');
            }
        } catch {
            setError('تعذر إضافة المقطع');
        }
        setLoading(false);
    };

    // حذف مقطع
    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا المقطع؟')) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('id', id);
        try {
            const res = await fetch('https://yafe3on.com/backend/api/video/deleteVideo.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setVideos(videos.filter(v => v.id !== id));
            } else {
                setError(data.message || 'تعذر حذف المقطع');
            }
        } catch {
            setError('تعذر حذف المقطع');
        }
        setLoading(false);
    };

    return (
        <div className='w-[75%] max-md:w-[100%] rounded-[15px] bg-white border border-gray-400 p-4 mb-12'>
            <div className="flex gap-2 mb-6">
                <button className="px-4 py-2 bg-[#2a7] text-white rounded font-bold" onClick={() => setShowAddForm(true)}>
                    إضافة مقطع جديد
                </button>
            </div>
            {loading && <div className="text-center text-gray-500">جاري التحميل...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            {/* فورم إضافة مقطع */}
            {showAddForm && (
                <form ref={addFormRef} onSubmit={handleAdd} className="mb-6 flex flex-col gap-4 bg-[#e6fff7] p-6 rounded-xl border border-[#2a7] shadow-lg">
                    <h2 className="text-xl font-bold text-[#2a7] mb-2">إضافة مقطع جديد</h2>
                    <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="عنوان المقطع..." className="border rounded px-3 py-2" required />
                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="وصف المقطع..." className="border rounded px-3 py-2" />
                    <select value={form.videoType} onChange={e => setForm({ ...form, videoType: e.target.value, url: '', file: null })} className="border rounded px-3 py-2">
                        <option value="youtube">رابط يوتيوب</option>
                        <option value="local">ملف فيديو</option>
                    </select>
                    {form.videoType === 'youtube' ? (
                        <input type="url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="رابط الفيديو (يوتيوب)..." className="border rounded px-3 py-2" required />
                    ) : (
                        <input type="file" accept="video/*" onChange={e => setForm({ ...form, file: e.target.files[0] })} className="border rounded px-3 py-2" required />
                    )}
                    <select value={form.contentType} onChange={e => setForm({ ...form, contentType: e.target.value })} className="border rounded px-3 py-2" required>
                        <option value="hajj">مقطع للحاج</option>
                        <option value="volunteer">مقطع للمعين/المتطوع</option>
                    </select>
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-4 py-2 bg-[#2a7] text-white rounded font-bold">إضافة</button>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-bold" onClick={() => setShowAddForm(false)}>إلغاء</button>
                    </div>
                </form>
            )}
            {/* عرض المقاطع */}
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 text-[#2a7]">المقاطع الحالية</h3>
                <ul className="space-y-4">
                    {videos.map(v => (
                        <li key={v.id} className="border-b pb-2 flex justify-between items-center">
                            <div>
                                <span className="block text-right leading-relaxed text-[#2a7] font-bold">{v.title}</span>
                                <span className="block text-xs text-gray-500">{v.description}</span>
                                <span className="block text-xs text-gray-500">نوع المحتوى: {v.type === 'hajj' ? 'الحاج' : 'المعين/المتطوع'}</span>
                                <span className="block text-xs text-blue-600">{v.url}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-[#2a7] text-white rounded" onClick={() => window.open(v.url, '_blank')}>مشاهدة</button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(v.id)}>حذف</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default VideoAdmin;

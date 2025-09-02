
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const COLORS = {
  hajj: '#FBC134', // برتقالي
  volunteer: '#31B29C', // أزرق
};

function PodcastPage() {
  const { content } = useParams();
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // جلب البودكاست من الباكند حسب التصنيف
    fetch(`https://yafe3on.com/backend/api/podcasts/getPodcasts.php`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        // تصفية حسب التصنيف
        let filtered = [];
        if (Array.isArray(data)) {
          if (content === 'hajj') {
            filtered = data.filter(p => p.category_name && p.category_name.trim().toLowerCase() === 'hajj');
          } else if (content === 'volunteer') {
            filtered = data.filter(p => p.category_name && p.category_name.trim().toLowerCase() === 'volunteer');
          } else {
            filtered = data;
          }
        }
        setPodcasts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError('تعذر جلب ملفات البودكاست');
        setLoading(false);
      });
  }, [content]);

  // ألوان حسب النوع
  const mainColor = COLORS[content] || '#ccc';
  const bgColor = content === 'hajj' ? 'bg-[#FBC134]/10' : content === 'volunteer' ? 'bg-[#31B29C]/10' : 'bg-gray-200';

  return (
    <div className={`min-h-screen  w-full ${bgColor} flex flex-col items-center py-6 px-2 pt-[90px]`}> 
      <Header />
      <h1 className="text-3xl font-bold mb-6" style={{ color: mainColor }}>
        {content === 'hajj' ? 'بودكاست الحاج' : content === 'volunteer' ? 'بودكاست المعين/المتطوع' : 'البودكاست'}
      </h1>
      {loading ? (
        <div className="text-lg text-gray-500">جاري التحميل...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : podcasts.length === 0 ? (
        <div className="text-gray-500">لا توجد ملفات بودكاست متاحة حالياً.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="rounded-xl shadow-lg p-5 flex flex-col items-center bg-white hover:scale-105 transition-transform border"
              style={{ borderColor: mainColor }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full mb-3" style={{ background: mainColor + '22' }}>
                <svg width="32" height="32" fill={mainColor} viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-center" style={{ color: mainColor }}>{podcast.title}</h2>
              <p className="text-gray-600 text-center mb-4 line-clamp-3">{podcast.description}</p>
              <audio controls className="w-full">
                <source src={podcast.media_url} type="audio/mpeg" />
                متصفحك لا يدعم تشغيل الصوت
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PodcastPage;

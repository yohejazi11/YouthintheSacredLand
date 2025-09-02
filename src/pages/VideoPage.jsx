
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
const bgGradient = {
    background: 'linear-gradient(135deg, #e6fff7 0%, #fbc134 100%)',
    minHeight: '100vh',
    padding: '0',
};

const cardStyle = {
    width: '350px',
    boxShadow: '0 4px 16px #fbc13444',
    borderRadius: '18px',
    padding: '1.2rem',
    background: '#fff',
    position: 'relative',
    transition: 'transform 0.2s',
};

const badgeStyle = {
    position: 'absolute',
    top: 16,
    left: 16,
    background: '#FBC134',
    color: '#fff',
    padding: '0.3rem 1rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px #fbc13433',
    zIndex: 2,
};

function VideoPage() {
    const { content } = useParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let type = 'hajj';
        if (content === 'volunteer' || content === 'moeen') {
            type = 'volunteer';
        }
        fetch(`https://yafe3on.com/backend/api/video/getVideo.php?type=${type}`)
            .then(res => res.json())
            .then(data => {
                setVideos(data);
                setLoading(false);
            })
            .catch(() => {
                setError('حدث خطأ أثناء جلب الفيديوهات');
                setLoading(false);
            });
    }, [content]);

    if (loading) return <div style={{ ...bgGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#2a7' }}>جاري التحميل...</div>;
    if (error) return <div style={{ ...bgGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#c00' }}>{error}</div>;

    return (
        <div style={bgGradient}>
            <Header />
            <div style={{ padding: '3rem 0 2rem 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#2a7', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                    {content === 'hajj' ? 'فيديوهات تعليمية للحج' : 'فيديوهات تعليمية للمعين/المتطوعين'}
                </h2>
                <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    استعرض أفضل المقاطع التعليمية المختارة بعناية لتسهيل رحلتك الروحانية أو التطوعية.
                </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center', paddingBottom: '3rem' }}>
                {videos.length === 0 ? (
                    <div style={{ fontSize: '1.2rem', color: '#888', marginTop: '2rem' }}>لا توجد فيديوهات متاحة حالياً.</div>
                ) : (
                    videos.map((video, idx) => (
                        <div key={idx} style={cardStyle} className="video-card">
                            <span style={badgeStyle}>{video.type === 'hajj' ? 'محتوى للحاج' : 'محتوى للمعين/المتطوع'}</span>
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: '1rem', overflow: 'hidden', borderRadius: '12px' }}>
                                {video.type === 'youtube' ? (
                                    <iframe
                                        src={video.url}
                                        title={video.title}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '12px', border: 'none' }}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <video controls style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '12px', background: '#000' }}>
                                        <source src={video.url} type="video/mp4" />
                                        المتصفح لا يدعم تشغيل الفيديو
                                    </video>
                                )}
                            </div>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#2a7', fontWeight: 'bold', letterSpacing: '0.5px' }}>{video.title}</h3>
                            <p style={{ color: '#555', fontSize: '1rem', marginBottom: '0.5rem', minHeight: '48px' }}>{video.description}</p>
                            <button onClick={() => window.open(video.url, '_blank')} style={{ background: '#FBC134', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1.5rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem', boxShadow: '0 2px 8px #fbc13433' }}>مشاهدة كاملة</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default VideoPage;

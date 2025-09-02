import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import { useEffect } from 'react';

// ضع هنا رابط ملف PDF الخاص بك
const PDF_URL = '/assets/book.pdf'; // غيّر المسار حسب مكان ملفك

function Book() {
    const [numPages, setNumPages] = useState(0);
    const [pageImages, setPageImages] = useState({}); // كاش للصفحات
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [pdfDoc, setPdfDoc] = useState(null);

    // استخدم pdfjs لتحويل صفحات PDF إلى صور
    // تحميل ملف PDF فقط مرة واحدة
    useEffect(() => {
        async function loadPDF() {
            setLoading(true);
            try {
                const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
                pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
                const pdf = await pdfjsLib.getDocument(PDF_URL).promise;
                setNumPages(pdf.numPages);
                setPdfDoc(pdf);
            } catch (e) {
                alert('PDF Error: ' + (e && e.message ? e.message : e));
            }
            setLoading(false);
        }
        loadPDF();
    }, []);
// لودينق دائري بسيط (CSS)
useEffect(() => {
    if (!document.getElementById('book-loader-style')) {
        const style = document.createElement('style');
        style.id = 'book-loader-style';
        style.innerHTML = `
        .loader {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #FBC134;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`;
        document.head.appendChild(style);
    }
}, []);
    // تحميل الصفحة الحالية فقط عند تغيير current أو pdfDoc
    useEffect(() => {
        async function renderPage() {
            if (!pdfDoc || pageImages[current]) return;
            setLoading(true);
            try {
                const page = await pdfDoc.getPage(current + 1);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: context, viewport }).promise;
                setPageImages(prev => ({ ...prev, [current]: canvas.toDataURL() }));
            } catch (e) {
                alert('PDF Render Error: ' + (e && e.message ? e.message : e));
            }
            setLoading(false);
        }
        renderPage();
    }, [current, pdfDoc]);

    return (
        <div id="book-section" className="w-full min-h-screen pt-[90px] bg-gradient-to-b from-[#091057] to-[#024CAA] flex flex-col items-center">
            <Header />
            <h2 className="text-3xl font-bold text-white mb-6 mt-4 drop-shadow-lg">الكتاب التفاعلي</h2>
            {loading && <div className="text-white text-xl mt-12">جاري تحميل الكتاب...</div>}
            {!loading && numPages > 0 && (
                <div className="flex flex-col items-center w-full">
                    
                    <div className="flex justify-center w-full">
                        <div className="bg-white rounded-xl shadow-2xl flex items-center justify-center overflow-hidden" style={{ width: 420, height: 600, maxWidth: '95vw', maxHeight: '80vh' }}>
                            {pageImages[current] ? (
                                <img src={pageImages[current]} alt={`صفحة ${current + 1}`} className="object-contain w-full h-full" />
                            ) : (
                                <span className="text-[#024CAA] text-lg">جاري تحميل الصفحة...</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 my-4">
                        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} className="px-4 py-2 bg-[#FBC134] text-white rounded font-bold disabled:opacity-50">السابق</button>
                        <span className="text-white font-bold text-lg">{current + 1} / {numPages}</span>
                        <button onClick={() => setCurrent(c => Math.min(numPages - 1, c + 1))} disabled={current === numPages - 1} className="px-4 py-2 bg-[#FBC134] text-white rounded font-bold disabled:opacity-50">التالي</button>
                    </div>
                </div>
            )}
            {!loading && numPages === 0 && (
                <div className="text-white text-xl mt-12">تعذر تحميل الكتاب</div>
            )}
        </div>
    );
}

export default Book;

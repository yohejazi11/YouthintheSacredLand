import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// تمرير سلس إلى قسم الكتاب
function scrollToBookSection() {
    const bookSection = document.getElementById('book-section');
    if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function NewHeroSection() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-[100vh] bg-gradient-to-b from-[#091057] to-[#024CAA] flex flex-col md:flex-row items-end justify-center overflow-hidden relative">
            {/* فيديو الخلفية */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                src="/introVedio.mp4"
            />
            {/* طبقة فلتر غامق شفافة جداً فوق الفيديو */}
            <div
                className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
                style={{ background: "rgba(0,0,0,0.5)" }}
            />
            {/* الجهة اليسرى: لوقو + عنوان ووصف وإعلان الكتاب */}
            <div className="w-full md:w-[50%] h-[40vh] md:h-[100vh] flex flex-col justify-center items-center px-4 md:px-12 z-20 order-2 md:order-1 bg-transparent">
                {/* اللوقو مع موشن */}
                <motion.div
                    initial={{ opacity: 0, y: -40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-4 md:mb-8 flex justify-center"
                >
                    <img src="/logo.svg" alt="شعار نسك" className="w-24 md:w-32 h-auto drop-shadow-xl" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 drop-shadow-lg text-center md:text-right"
                >
                    مبادرة حاج واعٍ - معين بارع
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.3 }}
                    className="text-base sm:text-lg md:text-2xl text-[#FBC134] font-semibold mb-6 md:mb-8 max-w-xl drop-shadow text-center md:text-right"
                >
                    منصة رقمية تفاعلية تجمع بين التوعية، الإرشاد، والتمكين للحاج والمعين، عبر محتوى متنوع وأدوات مبتكرة تسهّل رحلة الحج وتثري تجربة التطوع.
                </motion.p>
                {/* إعلان الكتاب */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.6 }}
                    className=" p-4 md:p-6  md:gap-4 flex justify-center  max-w-xs md:max-w-md w-full"
                >
                    <button
                        onClick={() => { navigate('/selectpage') }}
                        className="px-4 md:px-6 py-2 rounded-full bg-[#31B29C] text-white font-bold text-base md:text-lg shadow hover:bg-[#024CAA] transition-colors w-full md:w-auto"
                    >
                        أبداء الان
                    </button>
                </motion.div>
            </div>
        </div>
    )
}

export default NewHeroSection

import React from 'react'
import { motion } from 'framer-motion';
// تمرير سلس إلى قسم الكتاب
function scrollToBookSection() {
    const bookSection = document.getElementById('book-section');
    if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function HeroSection() {
    return (
        <div className="w-full h-[100vh] bg-gradient-to-b from-[#091057] to-[#024CAA] flex flex-col md:flex-row items-end justify-center overflow-hidden">
            {/* الجهة اليسرى: عنوان ووصف وإعلان الكتاب */}
            <div className="w-full md:w-[50%] h-[40vh] md:h-[100vh] flex flex-col justify-center items-center px-4 md:px-12 z-10 order-2 md:order-1 bg-transparent">
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
                        onClick={scrollToBookSection}
                        className="px-4 md:px-6 py-2 rounded-full bg-[#31B29C] text-white font-bold text-base md:text-lg shadow hover:bg-[#024CAA] transition-colors w-full md:w-auto"
                    >
                        أبداء الان
                    </button>
                </motion.div>
            </div>

            {/* الجهة اليمنى: صور مع أنميشن */}
            <div className="w-full md:w-[50%] h-[50vh] md:h-[100vh] relative flex items-center justify-center order-1 md:order-2">
                {/* BG */}
                <motion.img
                    src="introAssets/kaabaBG.svg"
                    alt="kaabaBG"
                    className="w-full h-[60%] md:h-[75%] absolute top-[40%] md:top-[50%] translate-y-[-30%] md:translate-y-[-25%] left-0 z-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                />
                {/* kaaba */}
                <motion.img
                    src="introAssets/kaaba.svg"
                    alt="kaaba"
                    className="w-full h-[60%] md:h-[75%] absolute top-6 md:top-10 left-0 z-10"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4 }}
                />
                {/* boys */}
                <motion.img
                    src="introAssets/boys.svg"
                    alt="boys"
                    className="w-full h-[60%] md:h-[75%] absolute bottom-0 left-0 z-20"
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.7 }}
                />
            </div>
        </div>
    )
}

export default HeroSection

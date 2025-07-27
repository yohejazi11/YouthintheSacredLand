import React from 'react'


function LoadingPage() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#091057] to-[#024CAA]">
            {/* كعبة متحركة */}
            <div className="relative flex flex-col items-center justify-center mb-8">
                <img
                    src="/introAssets/kaaba.svg"
                    alt="Kaaba"
                    className="w-32 h-32 animate-spin-slow drop-shadow-xl"
                    style={{ animationDuration: '2.5s' }}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <svg width="140" height="140" className="animate-pulse" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="60" fill="none" stroke="#FBC134" strokeWidth="6" strokeDasharray="12 12" />
                    </svg>
                </div>
            </div>
            {/* نص متحرك */}
            <div className="text-white text-2xl md:text-3xl font-extrabold tracking-widest animate-pulse mb-2 text-center">
                جاري تحميل منصة حاج واعٍ - معين بارع
            </div>
            <div className="text-[#FBC134] text-lg md:text-xl font-bold animate-bounce mt-2 text-center">
                نسعى لخدمة ضيوف الرحمن وتمكين المتطوعين
            </div>
        </div>
    );
}

export default LoadingPage

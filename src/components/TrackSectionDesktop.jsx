import React from 'react'
import { useNavigate } from 'react-router-dom';

function TrackSectionDesktop() {

    const navigate = useNavigate();
    return (
        <div className="relative w-full h-[100vh] flex items-center justify-center bg-gradient-to-br from-[#FBC134] via-white to-[#31B29C] overflow-hidden">
            {/* خلفية واضحة بدون ضبابية */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <img src="/BG/mainBG.png" alt="Track Section Desktop" className="w-full h-full object-cover " />
                <div className="absolute inset-0 bg-gradient-to-br from-[#091057]/50  to-[#024CAA]/50"></div>
            </div>

            <div className="relative w-[95%] h-[90vh] flex items-end justify-between gap-x-8 p-10 z-10">
                {/* معين بارع */}
                <div className="w-[50%] flex flex-col items-center justify-center">
                    <div className="h-[150px] flex flex-col items-center justify-center text-[#31B29C] drop-shadow-lg">
                        <h1 className="text-5xl font-extrabold mb-2 tracking-tight animate-pulse">معين بارع</h1>
                        <p className="text-lg mb-4 text-center font-medium">كن عونًا للحاج بلطفك ومهاراتك، عبر خطوات وأدوات تطوعية مؤثرة.</p>
                    </div>
                    <div className="w-full min-h-[120px] bg-white rounded-[32px] shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-[#31B29C]">
                        <div className="w-full grid grid-cols-4 gap-6">
                            <div onClick={() => { navigate('/skillsguid') }} className="h-[170px] flex flex-col items-center justify-center p-4 rounded-[25px] border-[8px] border-double border-[#31B29C] bg-[#E6FAF7] shadow-lg hover:scale-110 hover:bg-[#31B29C]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/skill-development.png" alt="مهارات التعامل" className="w-[70px] h-[70px] object-cover rounded-[20px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center font-bold text-[#31B29C] mt-2 truncate w-full">مهارات التعامل</p>
                            </div>
                            <div onClick={() => { navigate('/podcast/volunteer') }} className="h-[170px] flex flex-col items-center justify-center p-4 rounded-[25px] border-[8px] border-double border-[#31B29C] bg-[#E6FAF7] shadow-lg hover:scale-110 hover:bg-[#31B29C]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/podcast2.png" alt="بودكاست" className="w-[70px] h-[70px] object-cover rounded-[20px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center font-bold text-[#31B29C] mt-2 truncate w-full">بودكاست</p>
                            </div>
                            <div onClick={() => navigate('/book')} className="h-[170px] flex flex-col items-center justify-center p-4 rounded-[25px] border-[8px] border-double border-[#31B29C] bg-[#E6FAF7] shadow-lg hover:scale-110 hover:bg-[#31B29C]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/book.png" alt="دليل التطوع" className="w-[70px] h-[70px] object-cover rounded-[20px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center font-bold text-[#31B29C] mt-2 truncate w-full">دليل التطوع</p>
                            </div>
                            <div onClick={() => { navigate('/g') }} className="h-[170px] flex flex-col items-center justify-center p-4 rounded-[25px] border-[8px] border-double border-[#31B29C] bg-[#E6FAF7] shadow-lg hover:scale-110 hover:bg-[#31B29C]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/tour-guide.png" alt="مهام ميدانية" className="w-[70px] h-[70px] object-cover rounded-[20px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center font-bold text-[#31B29C] mt-2 truncate w-full">مهام ميدانية</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* فاصل جمالي */}
                <div className="h-[80%] w-[2px] bg-gradient-to-b from-[#31B29C] via-[#FBC134] to-[#FBC134]/0 rounded-full shadow-xl mx-4 animate-pulse"></div>

                {/* الحاج الواعي */}
                <div className="w-[50%] flex flex-col items-center justify-center">
                    <div className="h-[150px] flex flex-col items-center justify-center text-[#FBC134] drop-shadow-lg">
                        <h1 className="text-5xl font-extrabold mb-2 tracking-tight animate-pulse">الحاج الواعي</h1>
                        <p className="text-lg mb-4 text-center font-medium">ابدأ رحلتك للحج بوعي ويقين عبر أدعية، قصص، وخطوات مبسطة بالصوت والصورة.</p>
                    </div>
                    <div className="w-full min-h-[120px] bg-white rounded-[32px] shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-[#FBC134]">
                        <div className="w-full grid grid-cols-4 gap-6">
                            <div onClick={() => navigate('/hajjsteps')} className="h-[170px] grid grid-rows-[1fr_auto] items-center p-4 rounded-[25px] border-[8px] border-double border-[#FBC134] bg-[#FFF7E6] shadow-lg hover:scale-110 hover:bg-[#FBC134]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/footstep.png" alt="خطوات المناسك" className="w-[70px] h-[70px] object-cover place-self-center rounded-[20px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center text-sm leading-tight font-bold text-[#FBC134] mt-2 truncate w-full">خطوات المناسك</p>
                            </div>
                            <div onClick={() => navigate('/duaa')} className="h-[170px] grid grid-rows-[1fr_auto] items-center p-4 rounded-[25px] border-[8px] border-double border-[#FBC134] bg-[#FFF7E6] shadow-lg hover:scale-110 hover:bg-[#FBC134]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/prayer.png" alt="أدعية وأذكار" className="w-[70px] h-[70px] object-cover place-self-center rounded-[20px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center text-sm leading-tight font-bold text-[#FBC134] mt-2 truncate w-full">أدعية وأذكار</p>
                            </div>
                            <div className="h-[170px] grid grid-rows-[1fr_auto] items-center p-4 rounded-[25px] border-[8px] border-double border-[#FBC134] bg-[#FFF7E6] shadow-lg group-hover:scale-110 group-hover:bg-[#FBC134]/10 transition-all cursor-pointer">
                                <img src="/icons/trackIcons/video-camera.png" alt="فيديوهات تعليمية" className="w-[70px] h-[70px] object-cover place-self-center rounded-[20px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center text-sm leading-tight font-bold text-[#FBC134] mt-2 truncate w-full">فيديوهات تعليمية</p>
                            </div>
                            <div onClick={() => navigate('/podcast/hajj')} className="h-[170px] grid grid-rows-[1fr_auto] items-center p-4 rounded-[25px] border-[8px] border-double border-[#FBC134] bg-[#FFF7E6] shadow-lg hover:scale-110 hover:bg-[#FBC134]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/podcast.png" alt="بودكاست" className="w-[70px] h-[70px] object-cover place-self-center rounded-[20px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center text-sm leading-tight font-bold text-[#FBC134] mt-2 truncate w-full">بودكاست</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackSectionDesktop

import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
function TrackSectionMobile() {
        const navigate = useNavigate();

    return (
        <div className="relative w-full h-[100vh] flex flex-col items-center justify-end bg-gradient-to-b from-[#FBC134] via-white to-[#31B29C] overflow-hidden pt-[90px]">
            <Header bgColor={true}/>
            {/* خلفية واضحة بدون ضبابية */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <img src="/BG/mainMobileBG.png" alt="Track Section Desktop" className="w-full h-full object-full " />
            </div>

            <div className="relative  w-full flex items-end z-10 pb-4">
                {/* معين بارع */}
                <div className="w-full flex flex-col items-center justify-end ">
                    <div className="h-[90px] flex flex-col items-center justify-center text-[#31B29C] drop-shadow-lg">
                        <h1 className="text-3xl font-extrabold mb-2 tracking-tight ">معين بارع</h1>
                        <p className="text-base mb-2 text-center font-medium p-2">كن عونًا للحاج بلطفك ومهاراتك.</p>
                    </div>
                    <div className="w-full min-h-[80px]  p-4 flex flex-col items-center justify-center ">
                        <div className="w-full grid grid-cols-2 gap-4">
                            <div onClick={() => { navigate('/skillsguid') }} className="h-[120px] flex flex-col items-center justify-center p-2 rounded-[18px]  bg-[#FDFBEE] shadow-lg hover:scale-105 hover:bg-[#31B29C]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/skill-development.png" alt="مهارات التعامل" className="w-[50px] h-[50px] object-cover rounded-[14px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center font-bold text-[#31B29C] mt-1 truncate w-full text-sm">مهارات</p>
                            </div>
                            <div onClick={() => { navigate('/podcast/volunteer') }} className="h-[120px] flex flex-col items-center justify-center p-2 rounded-[18px]  bg-[#FDFBEE] shadow-lg hover:scale-105 hover:bg-[#31B29C]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/podcast2.png" alt="بودكاست" className="w-[50px] h-[50px] object-cover rounded-[14px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center font-bold text-[#31B29C] mt-1 truncate w-full text-sm">بودكاست</p>
                            </div>
                            <div onClick={() => navigate('/book')} className="h-[120px] flex flex-col items-center justify-center p-2 rounded-[18px]  bg-[#FDFBEE] shadow-lg hover:scale-105 hover:bg-[#31B29C]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/book.png" alt="دليل التطوع" className="w-[50px] h-[50px] object-cover rounded-[14px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center font-bold text-[#31B29C] mt-1 truncate w-full text-sm">الدليل</p>
                            </div>
                            <div onClick={() => { navigate('/video/volunteer') }} className="h-[120px] flex flex-col items-center justify-center p-2 rounded-[18px]  bg-[#FDFBEE] shadow-lg hover:scale-105 hover:bg-[#31B29C]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/video-camera-blue.png" alt="مهام ميدانية" className="w-[50px] h-[50px] object-cover rounded-[14px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center font-bold text-[#31B29C] mt-1 truncate w-full text-sm">مقاطع</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* فاصل جمالي (يظهر فقط في md وما فوق) */}
                <div className="hidden md:block h-[80%] w-[2px] bg-gradient-to-b from-[#31B29C] via-[#FBC134] to-[#FBC134]/0 rounded-full shadow-xl mx-4 animate-pulse"></div>

                {/* الحاج الواعي */}
                <div className="w-full flex flex-col items-center justify-center ">
                    <div className="h-[90px] flex flex-col items-center justify-center text-[#ec8300] drop-shadow-lg">
                        <h1 className="text-3xl font-extrabold mb-2 tracking-tight ">الحاج الواعي</h1>
                        <p className="text-base mb-2 text-center font-medium p-2">ابدأ رحلتك للحج بوعي ويقين .</p>
                    </div>
                    <div className="w-full min-h-[80px]  p-4 flex flex-col items-center justify-center ">
                        <div className="w-full grid grid-cols-2 gap-4">
                            <div onClick={() => navigate('/hajjsteps')} className="h-[120px] flex flex-col items-center justify-center p-2 rounded-[18px] bg-[#FFF6E9] shadow-lg hover:scale-105 hover:bg-[#FBC134]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/footstep.png" alt="خطوات المناسك" className="w-[50px] h-[50px]  object-cover place-self-center rounded-[14px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center text-sm leading-tight font-bold text-[#FBC134] mt-1 truncate w-full">المناسك</p>
                            </div>
                            <div onClick={() => navigate('/duaa')} className="h-[120px] flex flex-col items-center justify-center p-2 rounded-[18px]  bg-[#FFF6E9] shadow-lg hover:scale-105 hover:bg-[#FBC134]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/prayer.png" alt="أدعية وأذكار" className="w-[50px] h-[50px] object-cover place-self-center rounded-[14px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center text-xs leading-tight font-bold text-[#FBC134] mt-1 truncate w-full">أدعية</p>
                            </div>
                            <div onClick={()=>{navigate('/video/hajj')}} className="h-[120px] flex flex-col items-center justify-center p-2 rounded-[18px]  bg-[#FFF6E9] shadow-lg group-hover:scale-105 group-hover:bg-[#FBC134]/10 transition-all cursor-pointer">
                                <img src="/icons/trackIcons/video-camera.png" alt="فيديوهات تعليمية" className="w-[50px] h-[50px] object-cover place-self-center rounded-[14px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center text-xs leading-tight font-bold text-[#FBC134] mt-1 truncate w-full">فيديوهات</p>
                            </div>
                            <div onClick={() => navigate('/podcast/hajj')} className="h-[120px] flex flex-col items-center justify-center p-2 rounded-[18px]  bg-[#FFF6E9] shadow-lg hover:scale-105 hover:bg-[#FBC134]/10 transition-all cursor-pointer group">
                                <img src="/icons/trackIcons/podcast.png" alt="بودكاست" className="w-[50px] h-[50px] object-cover place-self-center rounded-[14px] group-hover:rotate-6 transition-transform" />
                                <p className="text-center text-xs leading-tight font-bold text-[#FBC134] mt-1 truncate w-full">بودكاست</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackSectionMobile

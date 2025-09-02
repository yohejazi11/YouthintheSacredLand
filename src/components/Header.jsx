import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Header({ bgColor = false }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={`fixed top-0 left-0 w-full z-50  bg-opacity-95 ${bgColor? 'bg-transparent': 'bg-[#091057]'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-2 h-[70px]">
                {/* شعار يمين */}
                <div className="flex items-center gap-2">
                    <img src="/vesion.svg" alt="شعار حاج واعٍ" className="w-12 h-12 md:w-14 md:h-14" />
                </div>

                {/* قائمة الصفحات - سطح المكتب */}
                <nav className="flex-1 hidden md:flex items-center justify-center">
                    <ul className="flex flex-row-reverse gap-2 md:gap-6 text-white font-bold text-sm md:text-lg">
                        <li><Link to="/" className="hover:text-[#FBC134] transition-colors">الرئيسية</Link></li>
                        <li><Link to="/hajjsteps" className="hover:text-[#FBC134]  transition-colors">خطوات الحج</Link></li>
                        <li><Link to="/duaa" className="hover:text-[#FBC134] transition-colors">الأدعية</Link></li>
                        <li><Link to="/skillsguid" className="hover:text-[#31B29C] transition-colors">إرشادات المعين</Link></li>
                        <li><Link to="/podcast/hajj" className="hover:text-[#FBC134] transition-colors">بودكاست الحاج</Link></li>
                        <li><Link to="/podcast/volunteer" className="hover:text-[#31B29C] transition-colors">بودكاست المعين</Link></li>
                        <li><Link to="/book" className="hover:text-[#31B29C] transition-colors">الكتاب</Link></li>
                    </ul>
                </nav>

                {/* زر البرجر منيو للجوال */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="فتح القائمة"
                >
                    <span className={`block w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-7 h-1 bg-white rounded my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* شعار يسار */}
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="شعار معين بارع" className="w-12 h-12 md:w-14 md:h-14" />
                </div>
            </div>

            {/* قائمة الجوال الجانبية */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex md:hidden justify-end" onClick={() => setMenuOpen(false)}>
                    <nav
                        className="bg-[#091057] w-64 h-full shadow-2xl border-r-2 border-[#024CAA] flex flex-col items-end p-6 gap-4 animate-slideInLeft"
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="mb-6 self-end text-white text-2xl" onClick={() => setMenuOpen(false)} aria-label="إغلاق القائمة">×</button>
                        <ul className="flex flex-col gap-4 text-white font-bold text-lg w-full text-right">
                            <li><Link to="/" className="hover:text-[#FBC134] transition-colors" onClick={() => setMenuOpen(false)}>الرئيسية</Link></li>
                            <li><Link to="/hajjsteps" className="hover:text-[#FBC134] transition-colors" onClick={() => setMenuOpen(false)}>خطوات الحج</Link></li>
                            <li><Link to="/duaa" className="hover:text-[#FBC134] transition-colors" onClick={() => setMenuOpen(false)}>الأدعية</Link></li>
                            <li><Link to="/skillsguid" className="hover:text-[#31B29C] transition-colors" onClick={() => setMenuOpen(false)}>إرشادات المعين</Link></li>
                            <li><Link to="/podcast/hajj" className="hover:text-[#FBC134] transition-colors" onClick={() => setMenuOpen(false)}>بودكاست الحاج</Link></li>
                            <li><Link to="/podcast/volunteer" className="hover:text-[#31B29C] transition-colors" onClick={() => setMenuOpen(false)}>بودكاست المعين</Link></li>
                            <li><Link to="/book" className="hover:text-[#31B29C] transition-colors" onClick={() => setMenuOpen(false)}>الكتاب</Link></li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;

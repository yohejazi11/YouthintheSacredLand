import React, { useState } from 'react';
import Header from '../components/Header';
import DuaaAdmin from '../components/DuaaAdmin';
import FootStepsAdmin from '../components/FootStepsAdmin';
import SkillsAdmin from '../components/SkillsAdmin';
import PodcatsAdmin from '../components/PodcatsAdmin';
import VideoAdmin from '../components/VideoAdmin';
function Admin() {
    // بيانات وهمية للتجربة

    // إضافة خطو

    // الأقسام المتاحة
    const sections = [
        { key: 'duas', label: 'إدارة الأدعية' },
        { key: 'footsteps', label: 'خطوات المناسك' },
        { key: 'skills', label: 'مهارات التعامل' },
        { key: 'podcastHajj', label: 'بودكاست الحاج' },
        { key: 'podcastMueen', label: 'بودكاست المعين' },
        { key: 'clip', label: 'مقاطع' },
    ];
    const [activeSection, setActiveSection] = useState('duas');


    // ...existing code...
    const renderSection = () => {
        switch (activeSection) {
            case 'duas':
                return (
                    <div className="mb-12 px-4 flex justify-center flex-row-reverse gap-4 max-md:flex-col">

                        <DuaaAdmin />
                    </div>
                );
            case 'footsteps':
                // ...existing code...
                return (
                    <div className="mb-12 px-4 flex justify-center flex-row-reverse gap-4 max-md:flex-col">

                        <FootStepsAdmin />
                    </div>
                );
            case 'skills':
                // ...existing code...
                return (
                    <div className="mb-12 px-4 flex justify-center flex-row-reverse gap-4 max-md:flex-col">
                        <SkillsAdmin />
                    </div>
                );
            case 'podcastHajj':
                // ...existing code...
                return (
                    <div className="mb-12 px-4 flex justify-center flex-row-reverse gap-4 max-md:flex-col">
                        <PodcatsAdmin />
                    </div>
                );
            case 'clip':
                // ...existing code...
                return (
                    <div className="mb-12 px-4 flex justify-center flex-row-reverse gap-4 max-md:flex-col">
                        <VideoAdmin/>
                    </div>
                );
            
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB]">
            <Header bgType="light" />
            <div className="pt-[90px] max-w-3xl mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-[#024CAA] mb-8 text-center">لوحة تحكم الأدمن</h1>

                {/* شريط خيارات الأقسام */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {sections.map(sec => (
                        <button
                            key={sec.key}
                            onClick={() => setActiveSection(sec.key)}
                            className={`px-4 py-2 rounded font-bold border transition-colors duration-150 ${activeSection === sec.key ? 'bg-[#024CAA] text-white border-[#024CAA]' : 'bg-white text-[#024CAA] border-[#FBC134] hover:bg-[#FBC134] hover:text-white'}`}
                        >
                            {sec.label}
                        </button>
                    ))}
                </div>

                {/* عرض القسم المختار فقط */}
                {renderSection()}
            </div>
        </div>
    );
}

export default Admin;

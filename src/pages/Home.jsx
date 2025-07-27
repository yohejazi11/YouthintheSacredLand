import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TrackSectionDesktop from '../components/TrackSectionDesktop'
import TrackSectionMobile from '../components/trackSectionMobile'
import HeroSection from '../components/HeroSection'
function Home() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHieght, setScreenHeight] = useState(window.innerHeight);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

        function updateContentContainer() {

            if (screenWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }
        // Log the screen dimensions whenever they change
        console.log(`Screen Width: ${screenWidth}, Screen Height: ${screenHieght}`);

    }, [screenWidth, screenHieght]);
    return (
        <div>
            <Header />

            {/* intro */}
            <HeroSection />


        </div>
    )
}

export default Home

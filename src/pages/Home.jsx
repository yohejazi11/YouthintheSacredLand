import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import NewHeroSection from '../components/NewHeroSection'
function Home() {

    return (
        <div>
            <Header bgColor={true}/>

            {/* intro */}
            <NewHeroSection></NewHeroSection>

        </div>
    )
}

export default Home

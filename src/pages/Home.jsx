import React from 'react';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
   

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center  gap-14 bg-light text-center">
            <Hero />
            
            <FeaturedSection />
            <Banner/>
            <Newsletter />
            <Footer/>
            
        </div>
    );
}
export default Home;
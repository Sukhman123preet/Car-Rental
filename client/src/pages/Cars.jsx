import React, { useState } from 'react';
import Title from '../components/Title';
import { assets, dummyCarData } from '../assets/assets';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';

const Cars = () => {
    const [input, setInput] = useState('');

    return (
        <div className='flex flex-col min-h-screen bg-light text-center'>

            {/* Header & Search Bar */}
            <div className='flex flex-col items-center py-20 w-full bg-blue-50 px-4'>
                <Title 
                    title='Available Cars' 
                    subTitle='Browse our selection of premium vehicles available for your next adventure' 
                />

                <div className='flex items-center justify-center bg-white px-4 mt-6 w-full max-w-xl h-12 rounded-full shadow'>
                    <img src={assets.search_icon} alt="Search" className='w-5 h-5 mr-2' />
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder='Search by make, model, or features'
                        className='w-full h-full outline-none text-gray-500'
                    />
                    <img src={assets.filter_icon} alt="Filter" className='w-5 h-5 ml-2' />
                </div>
            </div>

            {/* Car List */}
            <div className='px-4 md:px-16 lg:px-24 xl:px-32 py-8 w-full'>
                <p className='text-left text-gray-700 mb-4'>Showing {dummyCarData.length} Car(s)</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8'>
                    {dummyCarData.map((car, index) => (
                        <CarCard key={index} car={car} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Cars;

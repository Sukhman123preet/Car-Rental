import React from "react";
import { useState } from 'react';
import { assets, menuLinks, cityList } from '../assets/assets';
import { useAppContext } from "../context/AppContext";
const Hero = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const {navigate} =useAppContext()

    const handleSearch =(e)=>{
        e.preventDefault()
        navigate('/cars?pickupLocation='+pickupLocation+'&pickupDate='+pickupDate+'&returnDate='+returnDate)
    }
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen gap-8 md:gap-14  text-center px-4 py-8 overflow-hidden ">
            {/* Background SVG Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating geometric shapes */}
               
                
               
                
             
                
                
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-8 md:gap-14">
                {/* Title with enhanced styling */}
                <div className="relative">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                        Luxury Cars <span className="text-blue-600 relative">
                            On Rent
                            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12">
                                <path d="M0 8 Q100 2 200 8" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3"/>
                            </svg>
                        </span>
                    </h1>
                    
                    {/* Decorative elements around title */}
                   
                    
                    
                </div>

                {/* Enhanced Form */}
                <form className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 p-6 rounded-2xl md:rounded-full w-full max-w-sm md:max-w-5xl bg-white/90 backdrop-blur-sm shadow-[0px_20px_40px_rgba(0,0,0,0.2)] border border-white/20">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 rounded-2xl md:rounded-full bg-gradient-to-r from-blue-50/30 to-indigo-50/30 pointer-events-none"></div>
                    
                    {/* Form fields with enhanced styling */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
                        {/* Pickup Location */}
                        <div className="flex flex-col w-full md:w-auto group">
                            <label className="text-sm font-medium mb-1 text-gray-700 text-left group-hover:text-blue-600 transition-colors">
                                <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                
                                Pickup Location
                            </label>
                            <select
                                required
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full md:w-48 transition-all duration-300 hover:border-blue-300 bg-white/80"
                            >
                                <option value="">Select Location</option>
                                {cityList.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            
                            <p className="text-gray-500 px-1 text-sm mt-1 text-left">
                                {pickupLocation ? pickupLocation : "Please select location"}
                            </p>
                        </div>
                                 
                        {/* Pick-up Date */}
                        <div className="flex flex-col w-full md:w-auto group">
                            <label className="text-sm font-medium mb-1 text-gray-700 text-left group-hover:text-blue-600 transition-colors">
                                <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Pick-up Date
                            </label>
                            <input
                                type="date"
                                value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                                className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full md:w-48 transition-all duration-300 hover:border-blue-300 bg-white/80"
                                placeholder="dd-mm-yyyy"
                            />
                        </div>

                        {/* Return Date */}
                        <div className="flex flex-col w-full md:w-auto group">
                            <label className="text-sm font-medium mb-1 text-gray-700 text-left group-hover:text-blue-600 transition-colors">
                                <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Return Date
                            </label>
                            <input
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full md:w-48 transition-all duration-300 hover:border-blue-300 bg-white/80"
                                placeholder="dd-mm-yyyy"
                            />
                        </div>

                        {/* Enhanced Search Button */}
                        <button onClick={(e)=>{
                            handleSearch(e);
                        }}
                            type="submit"
                            className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full md:w-auto md:mt-6 group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                            <span className="relative z-10 font-medium">Search</span>
                        </button>
                    </div>
                </form>

                </div>
                  <div className="w-full max-w-4xl px-4">
                <img 
                    src={assets.main_car} 
                    alt="Main Car" 
                    className="w-full h-auto max-h-64 md:max-h-96 object-contain mx-auto" 
                />
            </div>     

        </div>
    )
}

export default Hero;
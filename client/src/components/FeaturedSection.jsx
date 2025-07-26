import React from "react";
import Title from "./Title";
import CarCard from "./CarCard";
import { dummyCarData, assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const FeaturedSection = () => {
  const Navigate = useNavigate();

  return (
    <section className="w-full bg-white relative z-10">
      <div className="flex flex-col items-center px-4 py-16 md:py-20 lg:py-24 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <Title
            title="Featured Vehicles"
            subtitle="Explore our selection of premium vehicles available for your next adventure."
          />
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {dummyCarData.slice(0, 6).map((car) => (
            <div key={car._id} className="transform transition-transform duration-300 hover:scale-105">
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {/* Explore All Button */}
        <button
          onClick={() => {
            Navigate("/cars");
            scrollTo(0, 0);
          }}
          className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 rounded-full mt-12 md:mt-16 cursor-pointer transition-all duration-300 font-semibold text-gray-700 shadow-sm hover:shadow-md"
        >
          Explore all cars
          <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedSection;
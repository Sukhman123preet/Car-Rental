import React from "react";
import { assets } from "../assets/assets";

const Banner = () => {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between px-1 md:px-14 md:mx-2 pt-10 pb-8 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-auto rounded-2xl overflow-hidden my-6 shadow-xl">

            {/* Text Content */}
            <div className="text-white px- 10 md:max-w-md">
                <h2 className="text-4xl font-semibold mb-4">Do You Own a Luxury Car?</h2>
                <p className="text-base mb-2">Monetize your vehicle effortlessly by listing it on <strong>CarRental</strong>.</p>
                <p className="text-sm text-white/90 mb-6">
                    We take care of insurance, driver verification, and secure payments —
                    so you can earn passive income, stress-free.
                </p>

                <button className="px-6 py-2 bg-white text-blue-900 font-medium rounded-lg text-sm transition-all duration-300 hover:bg-blue-200 hover:text-blue-950 shadow-md">
                    List your car
                </button>
            </div>

            {/* Banner Image */}
            <img
                src={assets.banner_car_image}
                alt="car"
                className="max-h-60 w-auto mt-8 md:mt-0 md:ml-10 drop-shadow-xl"
            />
        </div>
    );
};

export default Banner;

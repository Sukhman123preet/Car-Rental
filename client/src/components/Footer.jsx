import React from "react";
import { assets, menuLinks, cityList } from '../assets/assets';
const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-white">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <img
                        className="h-9"
                        src={assets.logo}
                        alt="dummyLogoDark"
                    />
                    <p className="mt-6 text-sm">
                        CarRental is your go-to platform for renting luxury vehicles effortlessly. We handle everything from insurance to driver verification, ensuring a seamless experience for both car owners and renters.
                    </p>
                </div>

                <div className="flex flex-row justify-center w-full md:w-auto gap-10">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-gray-700">Home</a></li>
                            <li><a href="#" className="hover:text-gray-700">Cars</a></li>
                            <li><a href="#" className="hover:text-gray-700">My Bokkings</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+91-8729011381</p>
                            <p>preetbadhan987@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-400">
                © 2025 CarRental All Rights Reserved.
            </p>
        </div>
    );
};

export default Footer;

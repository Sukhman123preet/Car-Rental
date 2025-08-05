import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CarCard = ({ car }) => {
    const currency = import.meta.env.currency || '₹';
    const Navigate = useNavigate();
const {cars}=useAppContext();
    return (
        <div className='group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer border border-gray-100/50 hover:border-white/60'>
            {/* Image Section with Enhanced Overlay */}
            <div className="relative overflow-hidden h-56" onClick={() => {Navigate(`/car-details/${car._id}`); scrollTo(0, 0);}}>
                <img
                    src={car.image}
                    alt="Car Image"
                    className='w-full h-full object-cover transition-transform duration-200 group-hover:scale-100'
                />
                
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                
                {/* Availability Badge */}
                {car.isAvaliable && (<p className='absolute top-4 left-4 bg-blue-100 text-gray-800 text-xs px-2.5 py-1 rounded-full'>                         Available Now                     </p>)}   
                
                {/* Price Badge with Glassmorphism */}
                <div className='absolute bottom-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2.5 rounded-xl shadow-lg group-hover:bg-white/30 transition-all duration-300'>
                    <span className='font-semibold text-lg'>{currency}{car.price_per_day}</span>
                    <span className='text-sm text-white/90 font-light'> / day</span>
                </div>
                
                {/* Hover Effect Shimmer */}
                <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12' />
            </div>
            
            {/* Content Section */}
            <div className="p-6 relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {car.brand} {car.model}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium mt-1">
                            {car.category} • {car.year}
                        </p>
                    </div>
                </div>
                
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 hover:bg-blue-50/80 transition-colors duration-300 group/item">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover/item:bg-blue-200 transition-colors duration-300">
                            <img src={assets.users_icon} alt="" className="h-4 w-4 opacity-70"></img>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{car.seating_capacity} Seats</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 hover:bg-green-50/80 transition-colors duration-300 group/item">
                        <div className="p-2 bg-green-100 rounded-lg group-hover/item:bg-green-200 transition-colors duration-300">
                            <img src={assets.fuel_icon} alt="" className="h-4 w-4 opacity-70"></img>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{car.fuel_type}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 hover:bg-purple-50/80 transition-colors duration-300 group/item">
                        <div className="p-2 bg-purple-100 rounded-lg group-hover/item:bg-purple-200 transition-colors duration-300">
                            <img src={assets.car_icon} alt="" className="h-4 w-4 opacity-70"></img>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{car.transmission}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 hover:bg-orange-50/80 transition-colors duration-300 group/item">
                        <div className="p-2 bg-orange-100 rounded-lg group-hover/item:bg-orange-200 transition-colors duration-300">
                            <img src={assets.location_icon} alt="" className="h-4 w-4 opacity-70"></img>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{car.location}</span>
                    </div>
                </div>
                
                {/* Bottom Accent Line */}
                
            </div>
        </div>
    );
};

export default CarCard;
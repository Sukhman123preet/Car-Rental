import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";

const Sidebar = () => {
  const user = dummyUserData;
  const location = useLocation();
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const updateImage = async () => {
    if (image) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        user.image = URL.createObjectURL(image);
        setImage('');
        setIsUploading(false);
      }, 500);
    }
  };

  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-16 md:max-w-72 w-full bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200/60 backdrop-blur-sm shadow-lg'>
      
      {/* Profile Section */}
      <div className='flex flex-col items-center mb-8'>
        {/* Profile Image Upload */}
        <div className='group relative mb-4'>
          <label htmlFor="image" className='cursor-pointer'>
            <div className='relative'>
              <img
                className="h-12 w-12 rounded-full object-cover mx-auto cursor-pointer md:h-20 md:w-20 ring-4 ring-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
                }
                alt="user avatar"
              />
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={e => setImage(e.target.files[0])}
              />
              <div className='absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm'>
                <div className='bg-white/90 rounded-full p-2 shadow-lg'>
                  <img src={assets.edit_icon} alt="edit icon" className='w-4 h-4' />
                </div>
              </div>
              {/* Online Status Indicator */}
              <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-lg'></div>
            </div>
          </label>
        </div>

        {/* Save Button */}
        {image && (
          <button 
            onClick={updateImage} 
            disabled={isUploading}
            className="mb-3 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                Save <img src={assets.check_icon} width={13} alt="check icon" />
              </>
            )}
          </button>
        )}

        {/* Username */}
        <div className="text-center max-md:hidden">
          <p className="text-lg font-semibold text-gray-800 mb-1">{user?.name}</p>
          <p className="text-sm text-gray-500 px-4">Welcome back!</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="w-full px-3 flex-1">
        <div className="space-y-2">
          {ownerMenuLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={`relative flex items-center gap-3 w-full py-3 px-4 rounded-xl transition-all duration-300 group hover:bg-gray-50 ${
                link.path === location.pathname
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-600 shadow-md border border-blue-100'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                link.path === location.pathname 
                  ? 'bg-blue-500 shadow-lg' 
                  : 'bg-gray-100 group-hover:bg-gray-200'
              }`}>
                <img
                  src={link.path === location.pathname ? link.coloredIcon : link.icon}
                  alt={`${link.name} icon`}
                  className={`w-5 h-5 ${link.path === location.pathname ? 'brightness-0 invert' : ''}`}
                />
              </div>
              <span className='max-md:hidden font-medium transition-all duration-300'>
                {link.name}
              </span>
              
              {/* Active Indicator */}
              {link.path === location.pathname && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-l-full shadow-sm"></div>
              )}
              
              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="w-full px-3 pb-6 mt-auto">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200/50 shadow-sm">
          <div className="flex items-center gap-3 max-md:justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600 max-md:hidden">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
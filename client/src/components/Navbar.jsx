import React, { useState } from 'react';
import { assets, menuLinks } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast'; // ✅ Needed for toast

const Navbar = () => {
  const {
    setShowLogin,
    user,
    logout,
    isOwner,
    axios,
    setIsOwner,
  } = useAppContext(); // ✅ Hook is called here

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role');
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

    return (
        <nav
            className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-2
        text-gray-600 border-b border-borderColor relative shadow-sm
        transition-all duration-500 ease-in-out
        ${location.pathname === "/" ? "bg-light" : "bg-white"}
        hover:shadow-lg`}
        >
            {/* Logo */}
            <Link to='/' className="flex-shrink-0 group">
                <img
                    src={assets.logo}
                    alt="logo"
                    className="h-8 transition-all duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-lg group-hover:brightness-110"
                />
            </Link>

            {/* Main Menu */}
            <div
                className={`max-sm:fixed max-sm:inset-0 max-sm:top-16 max-sm:h-screen max-sm:w-full
          max-sm:bg-white/90 max-sm:backdrop-blur-lg max-sm:z-40
          flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-6
          transition-transform duration-500 ease-in-out
          ${isMenuOpen ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
          ${location.pathname === "/" ? "bg-light" : "bg-white"}
        `}
            >
                {/* Links */}
                {menuLinks.map((link, idx) => (
                    <Link
                        key={idx}
                        to={link.path}
                        className={`relative px-4 py-2 font-medium transition-all duration-300 ease-in-out group
              ${isActive(link.path)
                                ? "text-primary"
                                : "text-gray-600 hover:text-primary"}
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
              hover:transform hover:-translate-y-0.5`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="relative z-10">{link.name}</span>

                        {/* Animated underline */}
                        <span
                            className={`absolute left-0 bottom-0 w-0 h-0.5 rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-500
                transition-all duration-300 ease-out
                ${isActive(link.path)
                                    ? "w-full opacity-100"
                                    : "group-hover:w-full group-hover:opacity-100"}
                `}
                        />

                        {/* Subtle background glow on hover */}
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 to-blue-500/0 
                            group-hover:from-primary/5 group-hover:to-blue-500/5 transition-all duration-300 ease-out" />
                    </Link>
                ))}

                {/* Search Bar (Desktop only) */}
                <div className="hidden lg:flex items-center gap-2 border border-borderColor px-4 py-2 rounded-full max-w-60 bg-white
                focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-lg
                transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary/50 group">
                    <input
                        type="text"
                        className="w-full bg-transparent outline-none placeholder-gray-400 text-sm
                        focus:placeholder-gray-300 transition-colors duration-200"
                        placeholder="Search products..."
                    />
                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="h-4 w-4 opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110"
                    />
                </div>

                {/* Buttons */}
                <div className="flex max-sm:flex-col items-start sm:items-center gap-4 mt-4 sm:mt-0">
                    {/* Dashboard Button */}
                    <button
                        onClick={() => {
                            isOwner?
                            navigate('/owner'):
                            changeRole()
                            setIsMenuOpen(false);
                        }}
                        className="px-6 py-2 rounded-full font-medium bg-gray-100 text-gray-800
      shadow-sm transition-all duration-200 ease-in-out
      hover:bg-primary/10 hover:text-primary hover:shadow-md
      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
      active:scale-95"
                    >
                    {isOwner?    'Dashboard':'List cars'}
                    </button>

                    {/* Login Button */}
                    <button
                        onClick={() => {
user?logout()    :                        setShowLogin(true);
                            setIsMenuOpen(false);
                         }}
                        className="px-6 py-2 rounded-full font-medium bg-blue-600 text-white
      shadow-sm transition-all duration-200 ease-in-out
      hover:bg-primary/10 hover:text-primary hover:shadow-[0px_0px_10px_1px_rgba(37,_99,_235,_.8)]
      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
      active:scale-95"
                    >
                       {user? 'Logout': 'Login'}
                    </button>
                </div>

            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="sm:hidden p-3 z-50 rounded-lg transition-all duration-300 group
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
                hover:bg-gray-100/70 hover:scale-110"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <img
                    src={isMenuOpen ? assets.close_icon : assets.menu_icon}
                    alt="menu"
                    className={`h-6 w-6 transition-all duration-300 ease-in-out group-hover:drop-shadow-md
                    ${isMenuOpen ? 'rotate-180 scale-90' : 'group-hover:rotate-12'}`}
                />
            </button>
        </nav>
    );
};

export default Navbar;
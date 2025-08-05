import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { assets, dummyDashboardData, ownerMenuLinks } from '../../assets/assets';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const DashBoard = () => {
    const {axios,isOwner}=useAppContext()
    const currency = import.meta.env.currency || '₹';
    
    const [data, setData] = useState({
        totalCars: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        recentBookings: [],
        monthlyRevenue: 0,
        monthlyTargetPercent: 0,
        statsChange: {},
        statsChangeType: {}
    });
    const [loading, setLoading] = useState(true);
    const [animateCards, setAnimateCards] = useState(false);

    const fetchDashboardData=async()=>{
        try{
            const {data}=await axios.get('/api/owner/dashboard')

             setData(data.dashboardData);
             
             toast.success(data.message)

        }
        catch(err){
            toast.error(err.message)
        }
    }

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            if(isOwner)
            fetchDashboardData()
            setLoading(false);
            setAnimateCards(true);
           
        }, 800);
    }, [isOwner]);

    const dashboardCards = [
        { 
            title: "Total Cars", 
            value: data.totalCars || 0, 
            icon: assets.carIconColored,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100/50",
            change: data.statsChange?.totalCars || "0%",
            changeType: data.statsChangeType?.totalCars || "neutral"
        },
        { 
            title: "Total Bookings", 
            value: data.totalBookings || 0, 
            icon: assets.listIconColored,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100/50",
            change: data.statsChange?.totalBookings || "0%",
            changeType: data.statsChangeType?.totalBookings || "neutral"
        },
        { 
            title: "Pending", 
            value: data.pendingBookings || 0, 
            icon: assets.cautionIconColored,
            gradient: "from-yellow-500 to-yellow-600",
            bgGradient: "from-yellow-50 to-yellow-100/50",
            change: data.statsChange?.pendingBookings || "0%",
            changeType: data.statsChangeType?.pendingBookings || "neutral"
        },
        { 
            title: "Confirmed", 
            value: data.completedBookings || 0, 
            icon: assets.check_icon,
            gradient: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100/50",
            change: data.statsChange?.completedBookings || "0%",
            changeType: data.statsChangeType?.completedBookings || "neutral"
        }
    ];

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className='px-4 pt-10 md:px-10 flex-1'>
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-8"></div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='px-4 pt-10 md:px-10 flex-1 bg-gradient-to-br from-gray-50/50 to-white min-h-screen'>
            <Title 
                title='Admin Dashboard' 
                subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
            />
            
            {/* Dashboard Cards */}
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8'>
                {dashboardCards.map((card, index) => (
                    <div
                        key={index}
                        className={`group relative overflow-hidden backdrop-blur-sm bg-white/80 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                            animateCards ? 'animate-fade-in-up' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        
                        <div className='relative p-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <img src={card.icon} alt="" className='h-6 w-6 brightness-0 invert' />
                                </div>
                                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    card.changeType === 'increase' 
                                        ? 'text-green-600 bg-green-100' 
                                        : card.changeType === 'decrease'
                                        ? 'text-red-600 bg-red-100'
                                        : 'text-gray-600 bg-gray-100'
                                }`}>
                                    {card.change}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className='text-sm font-medium text-gray-600 mb-1'>{card.title}</h3>
                                <p className='text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300'>
                                    {(card.value || 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className='grid lg:grid-cols-3 gap-8 mb-8'>
                {/* Recent Bookings */}
                <div className='lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='p-6 border-b border-gray-100'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h2 className='text-xl font-semibold text-gray-800'>Recent Bookings</h2>
                                <p className='text-gray-500 text-sm mt-1'>Latest customer bookings and their status</p>
                            </div>
                            <div className='flex items-center gap-2 text-sm text-gray-500'>
                                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                                Live Updates
                            </div>
                        </div>
                    </div>
                    
                    <div className='p-6 max-h-96 overflow-y-auto'>
                        <div className='space-y-4'>
                            {(data.recentBookings || []).map((booking, index) => (
                                <div 
                                    key={index} 
                                    className='group flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md'
                                >
                                    <div className='flex items-center gap-4'>
                                        <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md group-hover:scale-110 transition-transform duration-300'>
                                            <img src={assets.listIconColored} alt="" className='h-5 w-5 brightness-0 invert' />
                                        </div>
                                        <div>
                                            <p className='font-medium text-gray-800'>
                                                {booking.car?.brand || 'Unknown'} {booking.car?.model || 'Model'}
                                            </p>
                                            <p className='text-sm text-gray-500 flex items-center gap-1'>
                                                <span>📅</span>
                                                {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric', 
                                                    year: 'numeric' 
                                                }) : 'No date'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className='text-right'>
                                            <p className='font-semibold text-gray-800'>
                                                {currency}{(booking.price || 0).toLocaleString()}
                                            </p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                                {booking.status || 'Unknown'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {(!data.recentBookings || data.recentBookings.length === 0) && (
                            <div className='text-center py-12'>
                                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <img src={assets.carIconColored} alt="" className='h-8 w-8 opacity-50' />
                                </div>
                                <p className='text-gray-500'>No recent bookings</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Monthly Revenue */}
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='p-6 h-full'>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h2 className='text-xl font-semibold text-gray-800'>Monthly Revenue</h2>
                                <p className='text-gray-500 text-sm mt-1'>Revenue for current month</p>
                            </div>
                            <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg'>
                                <span className='text-white text-xl'>💰</span>
                            </div>
                        </div>
                        
                        <div className='space-y-4'>
                            <div className='relative'>
                                <p className='text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent'>
                                    {currency}{(data.monthlyRevenue || 0).toLocaleString()}
                                </p>
                                <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping'></div>
                            </div>
                            
                            <div className='bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl p-4 border border-green-200/50'>
                                <div className='flex items-center justify-between text-sm'>
                                    <span className='text-green-700 font-medium'>Monthly Target</span>
                                    <span className='text-green-600'>{data.monthlyTargetPercent || 0}% Complete</span>
                                </div>
                                <div className='mt-2 bg-green-200 rounded-full h-2'>
                                    <div className='bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000' style={{ width: `${data.monthlyTargetPercent || 0}%` }}></div>
                                </div>
                            </div>
                            
                            <div className='grid grid-cols-2 gap-4 pt-4'>
                                <div className='text-center'>
                                    <p className='text-2xl font-bold text-gray-800'>{data.totalBookings || 0}</p>
                                    <p className='text-xs text-gray-500'>Total Orders</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-2xl font-bold text-gray-800'>
                                        {currency}{Math.round((data.monthlyRevenue || 0) / (data.totalBookings || 1))}
                                    </p>
                                    <p className='text-xs text-gray-500'>Avg. Order</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className='bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg p-6 mb-8'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Quick Actions</h3>
                <div className='flex flex-wrap gap-3'>
                    {ownerMenuLinks.slice(0, 4).map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-300 text-sm font-medium text-gray-700 hover:text-blue-700 transform hover:scale-105'
                        >
                            <img src={link.icon} alt="" className='h-4 w-4' />
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
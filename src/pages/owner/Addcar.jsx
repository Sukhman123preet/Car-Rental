import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets';
import Title from '../../components/owner/Title'
import { useState } from 'react';   
import { Component } from 'lucide-react';
const Addcar = () => {
    const [data,setData] = useState({
        totalCars:0,
        totalBookings:0,
        pedingBookings:0,
        completedBookings:0,
        recentBookings:[],
        monthlyRevenue:0,
    });
    useEffect(()=>{
        setData(dummyUserData);
    });
    const dashboardCards = [
  { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
  { title: "Total Bookings", value: data.totalBookings, icon: assets.carIconColored },
  { title: "Pending", value: data.totalCars, icon: assets.carIconColored },
  { title: "Confirmed", value: data.totalCars, icon: assets.carIconColored }
];

    return (
        <div className='px-4pt-10 md:px-10 flex-1'>
            <Title title='Admin Dashboard' subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"/>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl'>
  {dashboardCards.map((card, index) => (
    <div
      key={index}
      className='flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor'
    >
      <div>
        <h1 className='text-xs text-gray-500'>{card.title}</h1>
        <p className='text-lg font-semibold'>{card.value}</p>
      </div>
      <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary/10'>
        <img src={card.icon} alt="" className='h-4 w-4' />
      </div>
    </div>
  ))}
</div>
<div>
    {/* recent booking */}
<div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full'>
  <h1 className='text-lg font-medium'>Recent Bookings</h1>
  <p className='text-gray-500'>Latest customer bookings</p>
  
  {data.recentBookings.map((booking, index) => (
    <div key={index} className='mt-4 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <div>
          <img src={assets.listIconColored} alt="." className='h-5 w-5' />
        </div>
        <div>
            <p>{booking.car.brand}{booking.car.model}</p>
            <p className='text-sm text-gray-500'>{booking.createdAt.split('T')[0]}</p>
            </div>
      </div>
    </div>
  ))}
</div>

    <div> </div>
</div>
        </div>
    );
}
export default Addcar;
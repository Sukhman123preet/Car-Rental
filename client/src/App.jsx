import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import {Toaster} from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import CarDetails from './pages/CarDetails';
import Layout from './pages/owner/Layout';
import DashBoard from './pages/owner/Dashboard';
import AddCar from './pages/owner/Addcar';
import ManageCars from './pages/owner/ManageCars';
import ManageBooking from './pages/owner/ManageBooking';
import { NavLink } from 'react-router-dom';
import Login from './components/Login';
import { useAppContext } from './context/AppContext';
const App = () => {
  const {showLogin} =useAppContext()

  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith('/owner');

  return (
    <>
    <Toaster/>
    {showLogin&&<Login/>}
    {! isOwnerPath&& <Navbar />}
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/car-details/:id" element={<CarDetails/>}/>
        <Route path="/cars" element={<Cars/>}/>
        <Route path="/my-bookings" element={<MyBookings/>}/>
        <Route path="/owner" element={<Layout/>}>
        <Route index element={<DashBoard/>}></Route>
        <Route path="add-car" element={<AddCar/>}/>
        <Route path="manage-cars" element={<ManageCars/>}/>
        <Route path="manage-bookings" element={<ManageBooking/>}/>
        </Route>
    </Routes>
    </>
      
      
  );
};

export default App;

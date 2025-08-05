import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


export const AppProvider = ({ children }) => {
  const navigate = useNavigate(); // ✅ This was missing
  const [loading, setLoading] = useState(true); // <-- add this


  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cars, setCars] = useState([]);

  const fetchUser = async () => {
  try {
    setLoading(true); // start loading
    const { data } = await axios.get('/api/user/data');
    if (data.success) {
      setUser(data.user);
      setIsOwner(data.user.role === 'owner');
    } else {
      navigate('/');
    }
  } catch (error) {
    toast.error('Failed to fetch user');
  } finally {
    setLoading(false); // stop loading
  }
};


  const fetchCars = async () => {
    console.log('hello')
    try {
      const { data } = await axios.get('/api/user/cars');
      data.success ? setCars(data.cars) : 1
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common['Authorization'] = '';
    toast.success('You have been logged out');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

useEffect(() => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
    fetchUser();
    fetchCars();
  } else {
    setLoading(false); // if no token, stop loading
  }
}, [token]);

 
  const value = {
    navigate,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
      loading,
  };

  return (
    <AppContext.Provider value={value}>
      
      {children}
    </AppContext.Provider>
  );
};

// ✅ This is what you use in other components
export const useAppContext = () => {
  return useContext(AppContext);
};

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // ✅ Add this line
import Title from '../components/Title';
import { assets, dummyCarData } from '../assets/assets';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import { useAppContext } from '../context/AppContext';


const Cars = () => {
    const [input, setInput] = useState('');

    // getting search params from url
const [searchParams] = useSearchParams();
const pickupLocation = searchParams.get('pickupLocation');
const pickupDate = searchParams.get('pickupDate');
const returnDate = searchParams.get('returnDate');

const {cars,axios} =useAppContext()

const isSearchData=pickupLocation && pickupDate && returnDate

const [fileteredCars,setFilteredCars]=useState([])
const applyFilter=async ()=>{
    if(input===' '){
        setFilteredCars(cars)
        return null
    }
    
    const filtered = cars.slice().filter((car) => {
  return (
    car.brand.toLowerCase().includes(input.toLowerCase()) ||
    car.model.toLowerCase().includes(input.toLowerCase()) ||
    car.category.toLowerCase().includes(input.toLowerCase()) ||
    car.transmission.toLowerCase().includes(input.toLowerCase())
  );
});

setFilteredCars(filtered);

}
const searchCarAvailability = async () => {
  const { data } = await axios.post('/api/bookings/check-availability', {
    location: pickupLocation,
    pickupDate,
    returnDate
  });

  if (data.success) {
    setFilteredCars(data.availableCars);
    if (data.availableCars.length === 0) {
      toast('No cars available');
    }
    return null;
  }
};

useEffect(() => {
  isSearchData && searchCarAvailability();
}, []);

useEffect(()=>{
    cars.length>0 && !isSearchData&&applyFilter()
},[input,cars])

    return (
        <div className='flex flex-col min-h-screen bg-light text-center'>

            {/* Header & Search Bar */}
            <div className='flex flex-col items-center py-20 w-full bg-blue-50 px-4'>
                <Title 
                    title='Available Cars' 
                    subTitle='Browse our selection of premium vehicles available for your next adventure' 
                />

                <div className='flex items-center justify-center bg-white px-4 mt-6 w-full max-w-xl h-12 rounded-full shadow'>
                    <img src={assets.search_icon} alt="Search" className='w-5 h-5 mr-2' />
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder='Search by make, model, or features'
                        className='w-full h-full outline-none text-gray-500'
                    />
                    <img src={assets.filter_icon} alt="Filter" className='w-5 h-5 ml-2' />
                </div>
            </div>

            {/* Car List */}
            <div className='px-4 md:px-16 lg:px-24 xl:px-32 py-8 w-full'>
                <p className='text-left text-gray-700 mb-4'>Showing {fileteredCars.length} Car(s)</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8'>
                    {fileteredCars.map((car, index) => (
                        <CarCard key={index} car={car} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Cars;

import react from 'react';
import { dummyUserData } from '../../assets/assets';
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { Link } from 'react-router-dom';
const NavbarOwner = () => {
   const { user, axios, fetchUser } = useAppContext();
    return (
        <div className='flex items-center justify-between px-4 pt-2 pb-4 border-b border-borderColor'>
            <Link  to='/'>
            <img src={assets.logo}/>
            </Link>
            
            {user ? (
  <p>Welcome, {user.name}</p>
) : (
  <p>Loading user...</p>
)}

        </div>
    )
}
export default NavbarOwner;
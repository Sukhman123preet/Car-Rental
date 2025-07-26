import react from 'react';
import { dummyUserData } from '../../assets/assets';
import { assets } from "../../assets/assets";
import { Link } from 'react-router-dom';
const NavbarOwner = () => {
    const user=dummyUserData;
    return (
        <div className='flex items-center justify-between px-4 pt-2 pb-4 border-b border-borderColor'>
            <Link  to='/'>
            <img src={assets.logo}/>
            </Link>
            <p>Welcome, {user.name||"Owner"}</p>
        </div>
    )
}
export default NavbarOwner;
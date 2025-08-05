import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import Car from "../models/Car.js"
const generateToken = (userId) => {
    const payload = { id: userId }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

export const registerUser = async (req, res) => {
    const { name, email, password, role, image } = req.body;
   

    if(!name||!email||!password||password.length<8){
        return res.json({success:false,message: "Please fill all the fields correctly"});

    }
    const userExists = await User.find({ email });
    if(userExists.length > 0){
        return res.json({success:false, message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name, email, password: hashedPassword, role, image});
    try {
        await user.save();
        const token = generateToken(user._id.toString() );
        res.json({success: true, token});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

export const loginUser = async (req, res) => {
    try{
        const {email,password} = req.body;
        const user= await User.findOne({ email });
        if(!user){ 
            return res.json({success: false, message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Invalid credentials"});
        }
        const token = generateToken(user._id.toString());
        res.json({success: true, token});

    }
    catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

// Get user data using token (JWT)
export const getUserData = async (req, res) =>{
  try {
    const { user } = req;
    res.json({ success: true, user })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Get All Cars for the Frontend
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

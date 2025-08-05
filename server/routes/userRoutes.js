import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "dotenv/config"; 

import { registerUser, loginUser, getUserData, getCars } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);  
userRouter.get('/data', protect,getUserData);
userRouter.get('/cars',protect,getCars)
export default userRouter;
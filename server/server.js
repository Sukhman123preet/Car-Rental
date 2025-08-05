import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';    
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRouter.js';
const app = express();
await connectDB();

app.use(cors());
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings',bookingRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
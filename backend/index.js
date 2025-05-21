


import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/booking.js';
import routeRoute from './routes/map.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true,
};

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb connected");
  } catch (err) {
    console.log('Connection Failed', err);
  }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/route", routeRoute);



app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});

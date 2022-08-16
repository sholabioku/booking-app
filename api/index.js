import express from 'express';
import mongoos from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';

const app = express();
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoos.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(err.red.bold);
    process.exit(1);
  }
};

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/hotels', hotelsRoute);
app.use('/api/v1/rooms', roomsRoute);

// error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : '',
  });
}),
  app.listen(8800, () => {
    connectDB();
    console.log('Server is running on port 8800'.yellow.bold);
  });

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

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/hotels', hotelsRoute);
app.use('/api/v1/rooms', roomsRoute);

app.listen(8800, () => {
  connectDB();
  console.log('Server is running on port 8800'.yellow.bold);
});

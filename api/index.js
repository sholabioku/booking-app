import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import roomsRouter from './routes/rooms.js';
import hotelsRouter from './routes/hotels.js';
const app = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/hotels', hotelsRouter);
app.use('/api/v1/rooms', roomsRouter);

// express error handler
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || 'Internal Server Error';

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

const port = process.env.PORT || 8800;

app.listen(8800, () => {
  console.log(`Server is running on port ${port}`.yellow.bold);
});

import express from 'express';
import mongoos from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

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

app.listen(8800, () => {
  connectDB();
  console.log('Server is running on port 8800'.yellow.bold);
});

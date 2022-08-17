import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createError } from '../utils/error.js';

// @desc Register User
// @route POST /api/v1/auth/register
// @access Public
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json('User has been created');
});

// @desc Login User
// @route POST /api/v1/auth/login
// @access Public
export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return next(createError(404, 'User not found'));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(createError(400, 'Invalid credentials'));
  res.status(200).json(user);
});

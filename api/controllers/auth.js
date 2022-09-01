import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
  const user = await User.findOne({ username: req.body.username });
  if (!user) return next(createError(404, 'User not found'));

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return next(createError(400, 'Invalid credentials'));

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  const { password, isAdmin, ...userData } = user._doc;
  res
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .status(200)
    .json({ details: { ...userData }, isAdmin });
});

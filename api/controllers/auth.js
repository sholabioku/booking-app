import asyncHandler from 'express-async-handler';

import User from '../models/User.js';

// @desc Register User
// @route POST /api/v1/auth/register
// @access Public
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json('User has been created');
});

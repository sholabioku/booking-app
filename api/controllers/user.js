import asyncHandler from 'express-async-handler';

import User from '../models/User.js';

// @desc Update User
// @route PUT /api/v1/users/:id
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedUser);
});

// @desc Delete User
// @route DELETE /api/v1/users/:id
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json('User has been deleted');
});

// @desc Get All Users
// @route GET /api/v1/users
// @access Public
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc Get User by ID
// @route GET /api/v1/users/:id
// @access Private
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
});

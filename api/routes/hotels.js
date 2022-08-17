import express from 'express';
import asyncHandler from 'express-async-handler';

import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

const router = express.Router();

// @desc Create Hotel
// @route POST /api/v1/hotels
// @access Private
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newHotel = new Hotel(req.body);

    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  })
);

// @desc Update Hotel
// @route PUT /api/v1/hotels/:id
// @access Private
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedHotel);
  })
);

// @desc Delete Hotel
// @route DELETE /api/v1/hotels/:id
// @access Private
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted');
  })
);

// @desc Get All Hotels
// @route GET /api/v1/hotels
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  })
);

// @desc Get Hotel by ID
// @route GET /api/v1/hotels/:id
// @access Private
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  })
);

export default router;

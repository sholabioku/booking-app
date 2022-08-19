import asyncHandler from 'express-async-handler';

import Hotel from '../models/Hotel.js';

// @desc Create Hotel
// @route POST /api/v1/hotels
// @access Private
export const createHotel = asyncHandler(async (req, res) => {
  const newHotel = new Hotel(req.body);

  const savedHotel = await newHotel.save();
  res.status(200).json(savedHotel);
});

// @desc Update Hotel
// @route PUT /api/v1/hotels/:id
// @access Private
export const updateHotel = asyncHandler(async (req, res) => {
  const updatedHotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedHotel);
});

// @desc Delete Hotel
// @route DELETE /api/v1/hotels/:id
// @access Private
export const deleteHotel = asyncHandler(async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.status(200).json('Hotel has been deleted');
});

// @desc Get All Hotels
// @route GET /api/v1/hotels
// @access Public
export const getHotels = asyncHandler(async (req, res, next) => {
  const hotels = await Hotel.find();
  res.status(200).json(hotels);
});

// @desc Get All Hotels By City
// @route GET /api/v1/hotels/countByCity
// @access Public
export const countByCity = asyncHandler(async (req, res, next) => {
  const cities = req.query.cities.split(',');
  const list = await Promise.all(
    cities.map((city) => Hotel.countDocuments({ city }))
  );
  res.status(200).json(list);
});

// @desc Get Hotel by ID
// @route GET /api/v1/hotels/:id
// @access Private
export const getHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.status(200).json(hotel);
});

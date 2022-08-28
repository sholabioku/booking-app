import asyncHandler from 'express-async-handler';

import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

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
  const { min, max, ...others } = req.query;

  const hotels = await Hotel.find({
    ...others,
    cheapestPrice: { $gte: min | 1, $lte: max || 999 },
  }).limit(req.query.limit);
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

// @desc Get All Hotels By Type
// @route GET /api/v1/hotels/countByType
// @access Public
export const countByType = asyncHandler(async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
  const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
  const resortCount = await Hotel.countDocuments({ type: 'resort' });
  const villaCount = await Hotel.countDocuments({ type: 'villa' });
  const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

  res.status(200).json([
    { type: 'hotel', count: hotelCount },
    { type: 'apartment', count: apartmentCount },
    { type: 'resort', count: resortCount },
    { type: 'villa', count: villaCount },
    { type: 'cabin', count: cabinCount },
  ]);
});

// @desc Get Hotel by ID
// @route GET /api/v1/hotels/:id
// @access Private
export const getHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.status(200).json(hotel);
});

// @desc Get Hotel Rooms
// @route GET /api/v1/hotels/room/:hotelId
// @access Private
export const getHotelRooms = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.hotelId);
  const hotelRooms = await Promise.all(
    hotel.rooms.map((room) => {
      return Room.findById(room);
    })
  );
  res.status(200).json(hotelRooms);
});

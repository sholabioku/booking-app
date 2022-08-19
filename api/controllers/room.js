import asyncHandler from 'express-async-handler';
import Hotel from '../models/Hotel';
import Room from '../models/Room';

// @desc Create Room
// @route POST /api/v1/rooms/:hotelId
// @access Private
export const createRoom = asyncHandler(async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  const savedRoom = await newRoom.save();

  await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

  res.status(201).json(savedRoom);
});

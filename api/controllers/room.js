import asyncHandler from 'express-async-handler';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

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

// @desc Update Room
// @route PUT /api/v1/rooms/:id
// @access Private
export const updateRoom = asyncHandler(async (req, res) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedRoom);
});

// @desc Delete Room
// @route DELETE /api/v1/rooms/:id/:hotelId
// @access Private
export const deleteRoom = asyncHandler(async (req, res) => {
  const hotelId = req.params.hotelId;
  await Room.findByIdAndDelete(req.params.id);

  await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
  res.status(200).json('Room has been deleted');
});

// @desc Get All Rooms
// @route GET /api/v1/rooms
// @access Public
export const getRooms = asyncHandler(async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
});

// @desc Get Room by ID
// @route GET /api/v1/rooms/:id
// @access Private
export const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json(rooms);
});

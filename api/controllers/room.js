import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

// @desc Create Room
// @route POST /api/vi/rooms/:hotelId
// @access  Private
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    await Hotel.findByIdAndUpdate(hotelId, {
      $push: {
        rooms: savedRoom._id,
      },
    });

    res.status(201).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

// @desc Update Room
// @route PUT /api/v1/rooms/:id
// @access Private
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

// @desc Update Room Availability
// @route PUT /api/v1/rooms/availability/:roomId
// @access Private
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: { 'roomNumbers.$.unavailableDates': req.body.dates },
      }
    );
    res.status(200).json('Room has been updated');
  } catch (error) {
    next(error);
  }
};

// @desc Delete Room
// @route DELETE /api/v1/rooms/:id/:hotelId
// @access Private
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  try {
    await Room.findByIdAndDelete(req.params.id);

    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: {
        rooms: req.params.id,
      },
    });

    res.status(200).json('Room has been deleted');
  } catch (error) {
    next(error);
  }
};

// @desc Get all Rooms
// @route GET /api/v1/rooms
// @access Private
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

// @desc Get a Single Room
// @route GET /api/v1/roomss/:id
// @access Private
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

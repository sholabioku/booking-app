import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

// @desc Create Hotel
// @route POST /api/v1/hotels
// @access Private
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

// @desc Update Hotel
// @route PUT /api/v1/hotels/:id
// @access Private
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

// @desc Delete Hotel
// @route DELETE /api/v1/hotels/:id
// @access Private
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted');
  } catch (error) {
    next(error);
  }
};

// @desc Get all Hotels
// @route GET /api/v1/hotels
// @access Public
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// @desc Get a Single Hotel
// @route GET /api/v1/hotels/:id
// @access Public
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// @desc Get all Hotels by cities
// @route GET /api/v1/hotels/countByCity?cities=berlin,madrid,london
// @access Private
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const listOfHotelsInACity = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city });
      })
    );
    res.status(200).json(listOfHotelsInACity);
  } catch (error) {
    next(error);
  }
};

// @desc Get all Hotels by Type
// @route GET /api/v1/hotels/countByCity?cities=berlin,madrid,london
// @access Private
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

// @desc Get all rooms in a hotel
// @route GET /api/v1/hotels/room/:id
// @access Private
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// @desc Create Hotel
// @route POST /api/v1/hotels
// @access Private
router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @desc Update Hotel
// @route PUT /api/v1/hotels/:id
// @access Private
router.put('/:id', async (req, res) => {
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
  } catch (err) {
    res.status(500).json(err);
  }
});

// @desc Delete Hotel
// @route DELETE /api/v1/hotels/:id
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

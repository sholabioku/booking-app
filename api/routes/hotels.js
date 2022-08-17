import express from 'express';
const router = express.Router();

import {
  createHotel,
  deleteHotel,
  getHotels,
  getHotel,
  updateHotel,
} from '../controllers/hotel.js';

router.post('/', createHotel);
router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);
router.get('/', getHotels);
router.get('/:id', getHotel);

export default router;

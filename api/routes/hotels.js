import express from 'express';
const router = express.Router();

import {
  createHotel,
  deleteHotel,
  getHotels,
  getHotel,
  updateHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

router.get('/', getHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.post('/', verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);
router.get('/:id', getHotel);
router.get('/room/:hotelId', getHotelRooms);

export default router;

import express from 'express';
const router = express.Router();

import {
  createHotel,
  deleteHotel,
  getHotels,
  getHotel,
  updateHotel,
  countByCity,
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

router.get('/', getHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', getHotels);
router.post('/', verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);
router.get('/:id', getHotel);

export default router;

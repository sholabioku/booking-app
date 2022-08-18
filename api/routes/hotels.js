import express from 'express';
const router = express.Router();

import {
  createHotel,
  deleteHotel,
  getHotels,
  getHotel,
  updateHotel,
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

router.post('/', verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);
router.get('/', getHotels);
router.get('/:id', getHotel);

export default router;

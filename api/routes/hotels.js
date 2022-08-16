import express from 'express';

const router = express.Router();

// @desc Create Hotel
// @route POST /api/v1/hotels
// @access Private
router.post('/', (req, res) => {
  res.send('Create Hotel');
});

export default router;

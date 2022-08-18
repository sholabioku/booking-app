import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/checkAuth', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated',
  });
});

router.get('/checkUser/:id', verifyUser, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated and you can delelte this account',
  });
});

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);
router.get('/:id', getUser);

export default router;

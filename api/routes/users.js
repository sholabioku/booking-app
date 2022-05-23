import express from 'express';

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.route('/').get(verifyAdmin, getUsers);
router
  .route('/:id')
  .get(verifyUser, getUser)
  .put(verifyUser, updateUser)
  .delete(verifyUser, deleteUser);

export default router;

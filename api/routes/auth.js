import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Auth');
});

router.get('/register', (req, res) => {
  res.send('Register');
});

export default router;

import express from 'express';
import colors from 'colors';

const app = express();

app.listen(8800, () => {
  console.log('Server is running on port 8800'.yellow.bold);
});

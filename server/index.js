require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

const storage = {};

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/data', (req, res) => {
  res.send(storage);
});

app.post('/saveData', (req, res) => {
  storage[req.body.location] = req.body.coordinates;
  res.send(storage);
});

app.listen(port, () => {
  console.log('Listening on port ', port);
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { save, get } = require('../database/index.js');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/data', (req, res) => {
  get((result) => {
    res.send(result);
  });
});

app.post('/saveData', (req, res) => {
  const data = req.body;

  save(data, (result) => {
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

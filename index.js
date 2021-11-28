require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { save, get, clear, remove } = require('./database/index.js');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/data', (req, res) => {
  get((result) => {
    res.send(result);
  });
});

app.get('/clearData', (req, res) => {
  clear((result) => {
    res.send(result);
  });
});

app.post('/data', (req, res) => {
  const data = req.body;

  save(data, () => {
    res.sendStatus(200);
  });
});

app.put('/deleteItem', (req, res) => {
  const id = req.body.id;

  remove(id, () => {
    res.sendStatus(204);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

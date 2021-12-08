require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { save, get } = require('./database/index.js');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/data', (req, res) => {
  const id = req.query.id;

  console.log('MONGO URI', process.env.MONGODB_URI);

  get(id)
    .then((result) => {
      console.log('GET RESULT', result, 'ID', id, 'QUERY', req.query);
      res.send(result);
    })
    .catch((err) => {
      console.log('GET ERR', err);
      console.log(err);
    });
});

app.post('/data', (req, res) => {
  const data = req.body;

  save(data)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

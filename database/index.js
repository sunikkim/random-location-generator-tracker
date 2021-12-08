const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error: '));
db.once('open', () => {
  console.log('mongoDB successfully connected');
});

const schema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  name: String,
  tokens: Number,
  weapons: [String],
  spells: [String]
});

const GameModel = mongoose.model('GameModel', schema);

const save = (data) => {
  const query = {
    id: data.id
  };

  const game = {
    tokens: data.tokens,
    weapons: data.weapons,
    spells: data.spells
  };

  return GameModel.findOneAndUpdate(query, game);
};

const get = (id) => {
  return GameModel.find({ id });
};

module.exports = {
  save,
  get
};
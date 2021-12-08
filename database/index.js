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
  level: Number,
  experience: Number,
  tokens: Number,
  weapons: [String],
  spells: [String]
});

const GameModel = mongoose.model('GameModel', schema);

const save = async (data) => {
  const query = {
    id: data.id
  };

  const game = {
    id: data.id,
    level: data.level,
    experience: data.experience,
    tokens: data.tokens,
    weapons: data.weapons,
    spells: data.spells
  };

  const newGame = new GameModel(game);
  const exists = await GameModel.find(query);

  if (exists.length) {
    return GameModel.findOneAndUpdate(query, game);
  } else {
    return newGame.save();
  }
};

const get = (id) => {
  return GameModel.find({ id });
};

module.exports = {
  save,
  get
};
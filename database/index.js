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
  id: String,
  name: String,
  tokens: Number,
  weapons: [String],
  spells: [String]
});

const GameModel = mongoose.model('GameModel', schema);

const save = (data) => {
  console.log('SAVE DB', data);

  const game = new GameModel({
    id: data.id,
    name: data.name,
    tokens: data.tokens,
    weapons: data.weapons,
    spells: data.spells
  });

  return game.save();
};

const get = () => {
  // GameModel.find({});
};

// const remove = (id, cb) => {
//   LocationModel.findByIdAndDelete(id)
//     .then((res) => {
//       cb(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

module.exports = {
  save,
  get
};
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error: '));
db.once('open', () => {
  console.log('mongoDB successfully connected');
});

const schema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  location: String,
});

const LocationModel = mongoose.model('LocationModel', schema);

const save = (data, cb) => {
  const location = new LocationModel({
    lat: data.coordinates.lat,
    lng: data.coordinates.lng,
    location: data.location
  });

  LocationModel.findOne({ location: data.location }, (err, savedLocation) => {
    if (err) {
      return console.error(err);
    }
    if (!savedLocation) {
      location.save((err, location) => {
        if (err) {
          return console.error(err);
        }
        cb('Successfully saved in DB!');
      });
    }
  });
};

const get = (cb) => {
  LocationModel.find({}, (err, locations) => {
    if (err) {
      console.log(err);
    }
    cb(locations);
  });
}

const clear = (cb) => {
  LocationModel.deleteMany({})
    .then((res) => {
      cb(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  save,
  get,
  clear
};
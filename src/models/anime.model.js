const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  id: String,
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
  categories: [String],
  episodesWatched: [String],
  minutesWatched: {
    type: Number,
    default: 0,
  }
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  idApi: String,
  title: String,
  season: Number,
  note: Number,
  episode: Number,
  anime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime',
    required: true,
  },
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
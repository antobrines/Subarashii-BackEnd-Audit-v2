const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  deletable: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // id / list of genres / episodes watched / minutes watched
  animes: [{
    type: Map,
    of: new mongoose.Schema({
      id: String,
      categories: [String],
      episodesWatched: {
        type: Number,
        default: 0,
      },
      minutesWatched: {
        type: Number,
        default: 0,
      },
    }),
    default: [],
  }]
});

const List = mongoose.model('List', listSchema);

module.exports = List;
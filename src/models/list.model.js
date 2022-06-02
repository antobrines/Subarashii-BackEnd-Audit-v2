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
});

const List = mongoose.model('List', listSchema);

module.exports = List;
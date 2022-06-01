const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
  content: {
    type: types.String,
    required: true,
  },
  animeId: {
    type: types.Number,
    required: true,
  },
  userId: {
    type: types.String,
    required: true,
  },
  created_at: {
    type: types.Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: types.Date,
    default: null,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
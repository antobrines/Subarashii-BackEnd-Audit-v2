const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const banSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: types.Date,
    required: true,
  },
  lastDate: {
    type: types.Date,
    required: false,
  },
  reason: {
    type: types.String,
    required: true,
  },
});


const Ban = mongoose.model('Ban', banSchema);

module.exports = Ban;
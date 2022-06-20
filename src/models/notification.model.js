const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.String,
    required: true,
    default: 'like'
  },
  reactor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Comment',
  },
  react_date: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now
  },
  view: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
const catchAsync = require('../utils/catchAsync');
const notificationService = require('./notification.service');
const {successF} = require('../utils/message');
const httpStatus = require('http-status');
const {
  Notification
} = require('../models');


const getNotifications = async (userId) => {
  const notificationsFilter = {
    poster: userId
  };
  const notifications = await Notification.find(notificationsFilter);


  return notifications;
};

const notifLikeComment = async (comment, user) => {
  return await Notification.create({
    reactor: user,
    comment: comment,
    type: 'like'
  });
};

const notifDislikeComment = async (comment, user) => {
  return await Notification.create({
    reactor: user,
    comment: comment,
    type: 'dislike'
  });
};

module.exports = {
  getNotifications,
  notifLikeComment,
  notifDislikeComment
};
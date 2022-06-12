const catchAsync = require('../utils/catchAsync');
const notificationsService = require('../services/notification.service');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const getNotifications = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const lists = await notificationsService.getNotifications(userId);
  successF('User lists recovered', lists, httpStatus.OK, res, next);
});


module.exports = {
  getNotifications
};
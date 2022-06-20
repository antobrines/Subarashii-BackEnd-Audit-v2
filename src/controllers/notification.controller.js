const catchAsync = require('../utils/catchAsync');
const notificationsService = require('../services/notification.service');
const httpStatus = require('http-status');
const {
  successF, errorF
} = require('../utils/message');

const getNotifications = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const notificationsList = await notificationsService.getNotifications(userId);
  return successF('User lists recovered', notificationsList, httpStatus.OK, res, next);
});

const readNotification = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { notificationId } = req.params;
  const message = await notificationsService.readNotification(notificationId, userId);
  if(message === 'The notification cannot be found or has already been viewed!'){
    const error = new Error(message);
    return errorF(message, error, httpStatus.BAD_REQUEST, res, next);
  }else{
    return successF('Notification has been readed !', message,  httpStatus.OK, res, next);
  }
});


module.exports = {
  getNotifications,
  readNotification
};
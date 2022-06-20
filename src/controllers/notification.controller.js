const catchAsync = require('../utils/catchAsync');
const notificationsService = require('../services/notification.service');
const httpStatus = require('http-status');
const {
  successF, errorF
} = require('../utils/message');

const getNotifications = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const notificationsList = await notificationsService.getNotifications(userId);
  return successF('Liste d\'utilisateur récupéré', notificationsList, httpStatus.OK, res, next);
});

const readNotification = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { notificationId } = req.params;
  const message = await notificationsService.readNotification(notificationId, userId);
  if(message === 'La notification n\'a pas été trouvé ou a déjà été vue !'){
    const error = new Error(message);
    return errorF(message, error, httpStatus.BAD_REQUEST, res, next);
  }else{
    return successF('La notification a bien été lu !', message,  httpStatus.OK, res, next);
  }
});


module.exports = {
  getNotifications,
  readNotification
};
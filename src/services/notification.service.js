const {
  Notification, User, Comment
} = require('../models');


const getNotifications = async (userId) => {
  let result = {
    notifications: []
  };

  const notificationsFilter = {
    poster: userId
  };
  const notifications = await Notification.find(notificationsFilter);

  for(const indexNotification in notifications){
    const notification = notifications[indexNotification];
    console.log(notification.reactor);
    notification.reactor = await User.findOne({_id: notification.reactor});
    result.notifications[result.notifications.length] = notification;
    notification.comment = await Comment.findOne({_id: notification.comment});
    result.notifications[result.notifications.length] = notification;
  }

  const numberNotification = await Notification.count({view: false, poster: userId});

  return {
    data: notifications,
    unreadCount: numberNotification
  };
};

const notifLikeComment = async (comment, user) => {
  return Notification.create({
    reactor: user,
    comment: comment,
    type: 'like'
  });
};

const notifDislikeComment = async (comment, user) => {
  return Notification.create({
    reactor: user,
    comment: comment,
    type: 'dislike'
  });
};

const readNotification = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate({poster: userId, _id:notificationId}, {view: true});
  if(notification){
    return notification;
  }else{
    return 'La notification n\'a pas été trouvé ou a déjà été vue !';
  }
};

module.exports = {
  getNotifications,
  notifLikeComment,
  notifDislikeComment,
  readNotification
};
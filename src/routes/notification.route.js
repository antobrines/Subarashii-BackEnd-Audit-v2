const express = require('express');
const {isConnected} = require('../middlewares/user.middleware');
const notificationController = require('../controllers/notification.controller');
const router = express.Router();

router.get(
  '/',
  [ isConnected ],
  notificationController.getNotifications
);
router.patch(
  '/:notificationId/view',
  [ isConnected ],
  notificationController.readNotification
);

module.exports = router;
const express = require('express');
// const commentController = require('../controllers/comment.controller');
// const adminController = require('../controllers/admin.controller');
// const commentValidation = require('../validations/comment.validation');
// const validate = require('../middlewares/validate');
const {isConnected} = require('../middlewares/user.middleware');
const notificationController = require('../controllers/notification.controller');
// const listController = require("../controllers/list.controller");
const router = express.Router();

router.get(
  '/',
  [ isConnected ],
  notificationController.getNotifications
);
const express = require('express');
const commentController = require('../controllers/comment.controller');
const adminController = require('../controllers/admin.controller');
const commentValidation = require('../validations/comment.validation');
const validate = require('../middlewares/validate');
const router = express.Router();
const {
  isConnected,
  isBanned,
  isAdmin
} = require('../middlewares/user.middleware');

router.post(
  '/',
  [isConnected, isBanned, validate(commentValidation.create)],
  commentController.create
);

router.put(
  '/:id',
  [isConnected, isBanned, validate(commentValidation.update)],
  commentController.update
);

router.delete(
  '/:id',
  [isConnected, isBanned, validate(commentValidation.remove)],
  commentController.remove
);

router.get(
  '/anime/:animeId',
  [isConnected, isBanned],
  commentController.getAllCommentByAnimeId
);

router.delete(
  '/remove/:id',
  [isConnected, isAdmin],
  adminController.removeComment
);

router.patch(
  '/:id/like',
  [isConnected, isBanned],
  commentController.likeComment
);

router.patch(
  '/:id/unlike',
  [isConnected, isBanned],
  commentController.dislikeComment
);

router.get(
  '/my',
  [isConnected, isBanned],
  commentController.getMyComments
);

router.get(
  '/:userId',
  [isConnected, isAdmin],
  commentController.getUserComments
);

module.exports = router;
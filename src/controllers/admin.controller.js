const catchAsync = require('../utils/catchAsync');
const commentService = require('../services/comment.service');
const userService = require('../services/user.service');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const ban = catchAsync(async (req, res, next) => {
  const {
    userId
  } = req.params;
  const user = await userService.ban(userId);
  successF('user Banned', user, httpStatus.OK, res, next);
});

const unban = catchAsync(async (req, res, next) => {
  const {
    userId
  } = req.params;
  const user = await userService.unban(userId);
  successF('user Unbanned', user, httpStatus.OK, res, next);
});


const removeComment = catchAsync(async (req, res, next) => {
  const {
    id
  } = req.params;
  const user = req.user;
  const comment = await commentService.remove(id, user.userId, true);
  successF('Comment Deleted', comment, httpStatus.OK, res, next);
});

module.exports = {
  ban,
  unban,
  removeComment
};
const catchAsync = require('../utils/catchAsync');
const commentService = require('../services/comment.service');
const userService = require('../services/user.service');
const banService = require('../services/ban.service');
const httpStatus = require('http-status');
const {
  successF,
  errorF
} = require('../utils/message');

const ban = catchAsync(async (req, res, next) => {
  const {
    userId
  } = req.params;
  const {
    date,
    reason
  } = req.body;
  const user = await banService.ban(userId, date, reason);
  successF('user Banned', user, httpStatus.OK, res, next);
});

const unban = catchAsync(async (req, res, next) => {
  const {
    userId
  } = req.params;
  const user = await banService.unban(userId);
  successF('user Unbanned', user, httpStatus.OK, res, next);
});

const isBanned = catchAsync(async (req, res, next) => {
  const {
    userId
  } = req.params;
  const banned = await banService.isBanned(userId);
  if (banned) {
    const err = new Error('Vous êtes banni');
    return errorF(err.message, err, httpStatus.UNAUTHORIZED, res, next);
  }
  successF('Vous n\'êtes pas banni', banned, httpStatus.OK, res, next);
});


const removeComment = catchAsync(async (req, res, next) => {
  const {
    id
  } = req.params;
  const user = req.user;
  const comment = await commentService.remove(id, user.userId, true);
  successF('Comment Deleted', comment, httpStatus.OK, res, next);
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const search = req.query.search;
  const paramsQuery = {
    limit: req.query.limit,
    page: req.query.page,
    sort: {
      username: 1
    }
  };
  const users = await userService.getAllUsers(paramsQuery, search);
  successF('users', users, httpStatus.OK, res, next);
});

const getUsers = async (req, res, next) => {
  const {
    userId
  } = req.params;
  const user = await userService.getUser(userId);
  successF('user', user, httpStatus.OK, res, next);
};



module.exports = {
  ban,
  unban,
  removeComment,
  getAllUsers,
  isBanned,
  getUsers
};
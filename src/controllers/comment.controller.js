const catchAsync = require('../utils/catchAsync');
const commentService = require('../services/comment.service');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const create = catchAsync(async (req, res, next) => {
  req.body.userId = req.user.userId;
  const commentCreated = await commentService.create(req.body);
  successF('Comment Created', commentCreated, httpStatus.OK, res, next);
});

const update = catchAsync(async (req, res, next) => {
  const user = req.user;
  const {
    id
  } = req.params;
  req.body.updated_at = Date.now();
  const commentUpdated = await commentService.update(id, user.userId, req.body);
  successF('Comment Updated', commentUpdated, httpStatus.OK, res, next);
});

const remove = catchAsync(async (req, res, next) => {
  const {
    id
  } = req.params;
  const user = req.user;
  const comment = await commentService.remove(id, user.userId);
  successF('Comment Deleted', comment, httpStatus.OK, res, next);
});

const getAllCommentByAnimeId = catchAsync(async (req, res, next) => {
  const {
    animeId
  } = req.params;
  const comments = await commentService.getAllCommentByAnimeId(animeId);
  successF('Comments', comments, httpStatus.OK, res, next);
});

const likeComment = catchAsync(async (req, res, next) => {
  const {
    id
  } = req.params;
  const user = req.user;
  const comment = await commentService.likeComment(id, user.userId);
  successF('Comment Liked', comment, httpStatus.OK, res, next);
});

const dislikeComment = catchAsync(async (req, res, next) => {
  const {
    id
  } = req.params;
  const user = req.user;
  const comment = await commentService.dislikeComment(id, user.userId);
  successF('Comment Disliked', comment, httpStatus.OK, res, next);
});

const getMyComments = catchAsync(async (req, res, next) => {
  const user = req.user;
  const comments = await commentService.getUserComments(user.userId);
  successF('Mes commentaires', comments, httpStatus.OK, res, next);
});

const getUserComments = catchAsync(async (req, res, next) => {
  const {
    userId
  } = req.params;
  console.log(req.params);
  const comments = await commentService.getUserComments(userId);
  successF('Mes commentaires', comments, httpStatus.OK, res, next);
});


module.exports = {
  create,
  update,
  remove,
  getAllCommentByAnimeId,
  likeComment,
  dislikeComment,
  getMyComments,
  getUserComments
};
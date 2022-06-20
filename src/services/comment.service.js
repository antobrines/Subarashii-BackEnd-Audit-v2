const {
  Comment
} = require('../models');
const frenchBadwordsList = require('french-badwords-list');
const BadWords = require('bad-words');
const notificationService = require('./notification.service');
const badWords = new BadWords({
  placeHolder: 'x',
  emptyList: true
});
badWords.addWords(...frenchBadwordsList.array);

const create = async (contentBody) => {
  if (badWords.isProfane(contentBody.content)) {
    throw new Error('Your comment contains bad words');
  }
  return Comment.create(contentBody);
};

const update = async (id, userdId, reqBody) => {
  const comment = await Comment.findOne({
    _id: id,
    userId: userdId
  });
  if (!comment) {
    throw new Error('You are not the owner of this comment');
  }
  return Comment.findOneAndUpdate({
    _id: id
  }, reqBody, {
    new: true
  });
};

const remove = async (id, userId, isAdmin = false) => {
  const comment = await Comment.findOne({
    _id: id
  });
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.userId !== userId && !isAdmin) {
    throw new Error('You are not authorized to delete this comment');
  }
  await Comment.findOneAndDelete({
    _id: id
  }, {
    new: true
  });
  return true;
};

const getAllCommentByAnimeId = async (animeId) => {
  return Comment.find({
    animeId: animeId
  }).sort({
    created_at: -1
  });
};

const getUserComments = async (userId) => {
  return Comment.find({
    userId: userId
  });
};

const likeComment = async (id, userId) => {
  const comment = await Comment.findOne({
    _id: id
  });
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.likedUsers.includes(userId)) {
    throw new Error('You already liked this comment');
  }
  if (comment.dislikedUsers.includes(userId)) {
    await Comment.findOneAndUpdate({
      _id: id
    }, {
      $pull: {
        dislikedUsers: userId
      }
    });
  }
  const commentObject = await Comment.findOneAndUpdate({
    _id: id
  }, {
    $push: {
      likedUsers: userId
    }
  }, {
    new: true
  });
  await notificationService.notifLikeComment(commentObject.id, userId);
  return comment;
};

const getNumberOfCommentsLiked = async (userId) => {
  const comments = await Comment.find({
    likedUsers: userId
  });
  return comments.length;
};


const dislikeComment = async (id, userId) => {
  const comment = await Comment.findOne({
    _id: id
  });
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.dislikedUsers.includes(userId)) {
    throw new Error('You already disliked this comment');
  }
  if (comment.likedUsers.includes(userId)) {
    await Comment.findOneAndUpdate({
      _id: id
    }, {
      $pull: {
        likedUsers: userId
      }
    });
  }
  const commentObject = await Comment.findOneAndUpdate({
    _id: id
  }, {
    $push: {
      dislikedUsers: userId
    }
  }, {
    new: true
  });
  await notificationService.notifDislikeComment(commentObject.id, userId);
  return commentObject;
};

module.exports = {
  create,
  update,
  remove,
  getAllCommentByAnimeId,
  getUserComments,
  likeComment,
  dislikeComment,
  getNumberOfCommentsLiked
};

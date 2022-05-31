const {
  Comment
} = require('../models');
const frenchBadwordsList = require('french-badwords-list');
const BadWords = require('bad-words');
const badWords = new BadWords({
  placeHolder: 'x',
  emptyList: true
});
badWords.addWords(...frenchBadwordsList.array);

const create = async (contentBody) => {
  if (badWords.isProfane(contentBody.content)) {
    throw new Error('Your comment contains bad words');
  }
  return await Comment.create(contentBody);
};

const update = async (id, userdId, reqBody) => {
  const comment = await Comment.findOne({
    _id: id,
    userId: userdId
  });
  if (!comment) {
    throw new Error('You are not the owner of this comment');
  }
  return await Comment.findOneAndUpdate({
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
  return await Comment.find({
    animeId: animeId
  }).sort({
    created_at: -1
  });
};


module.exports = {
  create,
  update,
  remove,
  getAllCommentByAnimeId
};
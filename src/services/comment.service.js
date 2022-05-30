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
  return Comment.create(contentBody);
};

const update = async (id, userdId, reqBody) => {
  console.log(id, userdId, reqBody);
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

const remove = async (id, userId) => {
  const comment = await Comment.findOne({
    _id: id
  });
  if (comment.userId !== userId) {
    throw new Error('You are not authorized to delete this comment');
  }
  return Comment.findOneAndDelete({
    _id: id
  });
};

const getAllCommentByAnimeId = async (animeId) => {
  return Comment.find({
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
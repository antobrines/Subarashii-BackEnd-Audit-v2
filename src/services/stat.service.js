/* eslint-disable no-unused-vars */
const commentService = require('../services/comment.service');
const getStat = async (userId) => {
  const commentsStat = await getCommentStat(userId);
  const animesStat = await getAnimeStat(userId);
  const listAnimesStat = await getListStat(userId);
  const genresStat = await getGenresStat(userId);
  return {
    commentsStat,
    animesStat,
    listAnimesStat,
    genresStat
  };
};

const getCommentStat = async (userId) => {
  const nbComments = await commentService.getMyComment(userId);
  const nbCommentsLiked = await commentService.getNumberOfCommentsLiked(userId);
  return {
    nbComments: nbComments.length,
    nbCommentsLiked: nbCommentsLiked
  };
};

const getAnimeStat = async (userId) => {
  return {
    'timeWatched': 100,
    'nbEpisodesWatched': 3
  };
};

const getListStat = async (userId) => {
  return [{
    name: 'A voir',
    nbAnime: 10
  }];
};

const getGenresStat = async (userId) => {
  return [{
    name: 'Action',
    nbTime: 10
  }, {
    name: 'Adventure',
    nbTime: 5
  }];
};

module.exports = {
  getStat
};
/* eslint-disable no-unused-vars */
const commentService = require('../services/comment.service');
const listService = require('../services/list.service');
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
  const lists = await listService.getUserLists(userId);
  const listsStat = [];
  lists.forEach(list => {
    const nbAnimes = list.animes.length;
    const listStat = {
      name: list.label,
      nbAnime: nbAnimes
    };
    listsStat.push(listStat);
  });
  return listsStat;
};

const getGenresStat = async (userId) => {
  const lists = await listService.getUserLists(userId);
  const genres = [];
  lists.forEach(list => list.animes.forEach(anime => {
    currentGenres = anime.get('categories');
    currentGenres.forEach(genre => {
      genres.push(genre);
    });
  }));
  const setGenres = [...new Set(genres)];
  const genresStat = [];
  setGenres.forEach(genre => {
    const nbTime = genres.filter(g => g === genre).length;
    genresStat.push({
      name: genre,
      nbTime: nbTime
    });
  });
  return genresStat;
};

module.exports = {
  getStat
};
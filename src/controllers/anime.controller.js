const animeService = require('../services/anime.service');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const getAll = (req, res) => {
  res.send('not ok');
};

const getAnime = async (req, res, next) => {
  const anime = await animeService.getAnimeById(req.params.id);
  successF('Anime recovered', anime, httpStatus.OK, res, next);
};

module.exports = {
  getAll,
  getAnime
};
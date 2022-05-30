const animeService = require('../services/anime.service');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const getMultiple = async (req, res, next) => {
  const { page, categories } = req.query;
  const animes = await animeService.getMultiple({ page, categories});
  successF('Get multiple animes', animes, httpStatus.OK, res, next);
};

const getAnime = async (req, res, next) => {
  const anime = await animeService.getAnimeById(req.params.id);
  successF('Get anime', anime, httpStatus.OK, res, next);
};

module.exports = {
  getMultiple,
  getAnime
};
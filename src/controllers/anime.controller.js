const animeService = require('../services/anime.service');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const getMultipleAnimes = async (req, res, next) => {
  const { page, categories, adult, status } = req.query;
  const animes = await animeService.getMultipleAnimes({ page, categories, adult, status});
  successF('Get multiple animes', animes, httpStatus.OK, res, next);
};

const getAnime = async (req, res, next) => {
  const { id } = req.params;
  const anime = await animeService.getAnimeById(id);
  successF('Get anime', anime, httpStatus.OK, res, next);
};

const getEpisodes = async (req, res, next) => {
  const { id, season } = req.params;
  const episodes = await animeService.getEpisodes({ id, season });
  successF(`Get episodes of season ${season}` , episodes, httpStatus.OK, res, next);
};

module.exports = {
  getMultipleAnimes,
  getAnime,
  getEpisodes
};
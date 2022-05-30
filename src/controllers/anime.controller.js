const animeService = require('../services/anime.service');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const getMultipleAnimes = catchAsync(async (req, res, next) => {
  const { page, categories, adult, status } = req.query;
  const animes = await animeService.getMultipleAnimes({ page, categories, adult, status});
  successF('Get multiple animes', animes, httpStatus.OK, res, next);
});

const getAnime = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const anime = await animeService.getAnimeById(id);
  successF('Get anime', anime, httpStatus.OK, res, next);
});

const getEpisodes = catchAsync(async (req, res, next) => {
  const { id, seasonId } = req.params;
  const episodes = await animeService.getEpisodes({ id, seasonId });
  successF(`Get episodes of season ${seasonId}` , episodes, httpStatus.OK, res, next);
});

module.exports = {
  getMultipleAnimes,
  getAnime,
  getEpisodes
};

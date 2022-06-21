const Joi = require('joi');

const getAllLists = {
  query: Joi.object().keys({
    containing: Joi.number().integer().min(1).optional(),
  }),
};

const getListAnimes = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1),
  }),
};

const create = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    deletable: Joi.boolean(),
  })
};

const addAnime = {
  body: Joi.object().keys({
    animeId: Joi.string().required(),
    animeCategories: Joi.array().items(Joi.string()).required(),
  }),
};

const seeEpisode = {
  body: Joi.object().keys({
    episodeId: Joi.number().integer().min(1),
  })
};

module.exports = {
  getAllLists,
  getListAnimes,
  create,
  addAnime,
  seeEpisode
};
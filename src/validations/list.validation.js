const Joi = require('joi');

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

module.exports = {
  getListAnimes,
  create,
  addAnime
};
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

const update = {
  body: Joi.object().keys({
    animeId: Joi.string().required(),
    action: Joi.string().valid('add', 'remove').required(),
  }),
};

module.exports = {
  getListAnimes,
  create,
  update
};
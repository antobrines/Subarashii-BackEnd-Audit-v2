const Joi = require('joi');

const getMultipleAnimes = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).max(1000),
    categories: Joi.string(),
    adult: Joi.boolean(),
    status: Joi.number().integer().valid(0, 1, 2, 3, 4, 5),
  })
};

module.exports = {
  getMultipleAnimes
};
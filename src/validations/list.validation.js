const Joi = require('Joi');

const create = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    deletable: Joi.boolean(),
  })
};

const update = {
  body: Joi.object().keys({
    animeId: Joi.string().required(),
  }),
};

module.exports = {
  create,
  update
};
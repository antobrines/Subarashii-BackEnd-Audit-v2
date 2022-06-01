const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    content: Joi.string().required(),
    animeId: Joi.number().required(),
  })
};

const update = {
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().required(),
  })
};

const remove = {
  body: Joi.object().keys({}),
  params: Joi.object().keys({
    id: Joi.string().required(),
  })
};

module.exports = {
  create,
  update,
  remove
};
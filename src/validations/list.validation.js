const Joi = require('Joi');

const create = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    deletable: Joi.boolean(),
  })
};

module.exports = {
  create
};
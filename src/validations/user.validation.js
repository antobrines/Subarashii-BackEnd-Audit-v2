const Joi = require('joi');
const NodeCache = require("node-cache");
const cache = require('../cache/memoryCache');

const register = {
  body: Joi.object().keys({
    username: Joi.string()
      .min(2)
      .max(30)
      .required(),
    password: Joi.string().trim().min(6).required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).required(),
    email: Joi.string().email().required()
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
};

const updatePassword = {
  body: Joi.object().keys({
    previousPassword: Joi.string().required(),
    password: Joi.string().trim().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  })
}

const resetPassword = {
  body: Joi.object().keys({
    key: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().trim().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  })
}

const generateResetPasswordKey = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  })
}

module.exports = {
  register,
  login,
  updatePassword,
  generateResetPasswordKey,
  resetPassword
};
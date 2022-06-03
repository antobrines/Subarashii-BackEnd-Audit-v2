const Joi = require('joi');

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
};

const update = {
  body: Joi.object().keys({
    username: Joi.string(),
    email: Joi.string().email().trim().min(6)
  })
};

const resetPassword = {
  body: Joi.object().keys({
    key: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().trim().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  })
};

const generateResetPasswordKey = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  })
};

const getAllUsers = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(1).required(),
    search: Joi.string().min(2).max(30).required(),
  })
}

module.exports = {
  register,
  login,
  update,
  updatePassword,
  generateResetPasswordKey,
  resetPassword,
  getAllUsers
};
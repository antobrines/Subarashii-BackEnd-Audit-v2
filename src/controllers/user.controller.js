const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const httpStatus = require('http-status');
const {
  errorF,
  successF
} = require('../utils/message');

const register = catchAsync(async (req, res, next) => {
  const userCreated = await userService.create(req.body);
  successF('User Created', userCreated, 200, res, next);
});

const login = catchAsync(async (req, res, next) => {
  const varLogged = await userService.login(req);
  if (varLogged == 'Invalid Credentiel') {
    const error = new Error('L\'adresse mail ou le mot de passe est invalide');
    errorF(error.message, error, httpStatus.BAD_REQUEST, res, next);
  } else {
    successF('La connexion à bien été effectué', varLogged, 200, res, next);
  }
});

const testConnection = catchAsync(async (req, res, next) => {
  const user = req.user;
  successF('User', user, 200, res, next);
});


module.exports = {
  register,
  login,
  testConnection
};
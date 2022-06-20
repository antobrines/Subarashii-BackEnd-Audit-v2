const httpStatus = require('http-status');
const {
  errorF
} = require('../utils/message');
const config = require('../config');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const banService = require('../services/ban.service');

const isConnected = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.token.secret, (error, user) => {
      if (error) {
        return errorF('Vous n\'êtes pas connecté', error, httpStatus.UNAUTHORIZED, res, next);
      }
      req.user = user;
      next();
    });
  } else {
    const err = new Error('Il semblerait qu\'il manque le token');
    errorF(err.message, err, httpStatus.UNAUTHORIZED, res, next);
  }
};

const isBanned = async (req, res, next) => {
  const banned = await banService.isBanned(req.user.userId);
  if (banned) {
    const lastBan = await banService.getLastBan(req.user.userId);
    const err = new Error(`Vous êtes jusqu'au ${lastBan.date} banni pour la raison suivante : ${lastBan.reason}`);
    return errorF(err.message, err, httpStatus.UNAUTHORIZED, res, next);
  }
  return next();
};

const isAdmin = async (req, res, next) => {
  const user = await userService.findOneById(req);
  const userRoles = user.roles;
  if (userRoles.includes('admin')) {
    return next();
  }
  const err = new Error('Vous n\'avez pas les droits pour effectuer cette action');
  return errorF(err.message, err, httpStatus.UNAUTHORIZED, res, next);
};

module.exports = {
  isConnected,
  isBanned,
  isAdmin
};
const httpStatus = require('http-status');
const {
  errorF
} = require('../utils/message');
const config = require('../config');
const jwt = require('jsonwebtoken');



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

module.exports = {
  isConnected
};
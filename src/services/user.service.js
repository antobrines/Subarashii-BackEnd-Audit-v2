const {
  User
} = require('../models');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');

const create = async (userBody) => {
  if (userBody.password)
    userBody.password = bcrypt.hashSync(userBody.password, 10);
  return User.create(userBody);
};

const userValidate = async (req) => {
  const filter = {
    email: req.body.email
  };
  const update = {
    is_validate: true
  };
  await User.findOneAndUpdate(filter, update);
  const user = await User.findOne(filter);
  return user;
};

const compareAsync = (param1, param2) => {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(param1, param2, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const login = async (req) => {
  const {
    email,
    password
  } = req.body;

  const user = await User.findOne({
    email: email
  });

  if (!user) {
    return 'Invalid Credentiel';
  }

  const accessToken = await jwt.sign({
    email: user.email,
    username: user.username,
    userId: user._id
  }, config.token.secret);

  const test = await compareAsync(password, user.password);
  if (test) {
    return accessToken;
  } else {
    return 'Invalid Credentiel';
  }
};

const getUser = async (req) => {
  const user = await User.findOne({
    _id: req.user.userId
  });
  return user;
};


module.exports = {
  create,
  userValidate,
  login,
  getUser
};
const {
  User
} = require('../models');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');
const {setSpecificCacheValue, getSpecificCacheValue} = require("../cache/memoryCache");
const {randomString} = require("../utils/random");

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

const updatePassword = async (req) => {
  const user = req.user

  const filter = {
    _id: user.userId
  };

  const userFromDB = await User.findOne(filter)
  // console.log(req.body)
  console.log(userFromDB.password)

  const hasSamePassword = await compareAsync(req.body.previousPassword, userFromDB.password);

  if(hasSamePassword === false){
    return "Password do not match"
  }

  userFromDB.password = bcrypt.hashSync(req.body.password, 10)

  await userFromDB.save()

};

const findOneById = async (req) => {
  const user = await User.findOne({
    _id: req.user.userId
  });
  return user;
};

const generateResetPasswordKey = async (requestBody) => {
  let filter = {
    email: requestBody.email
  }

  let user = await User.findOne(filter)

  if(user) {
    console.log(user.email)
    setSpecificCacheValue(["resetPasswordCache", user.email], randomString(64))
    console.log(getSpecificCacheValue(["resetPasswordCache", user.email]))
  }
}

const resetPassword = async (requestBody) => {
  let filter = {
    email: requestBody.email
  }

  let user = User.findOne(filter)

  return "L'utilisateur a été modifié avec succès"
}

module.exports = {
  create,
  userValidate,
  login,
  findOneById,
  updatePassword,
  generateResetPasswordKey,
  resetPassword
};
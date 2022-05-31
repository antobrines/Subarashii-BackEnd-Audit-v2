const {
  User
} = require('../models');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');
const memoryCache = require('../cache/memoryCache');
const {randomString} = require('../utils/random');
const {sendMail} = require('../utils/mailer');

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
  const user = req.user;

  const filter = {
    _id: user.userId
  };

  const userFromDB = await User.findOne(filter);

  const hasSamePassword = await compareAsync(req.body.previousPassword, userFromDB.password);

  if(hasSamePassword === false){
    return 'Password do not match';
  }

  userFromDB.password = bcrypt.hashSync(req.body.password, 10);

  const success = await userFromDB.save();
  if(!success){
    return 'Error when saving password';
  }
};

const findOneById = async (req) => {
  return User.findOne({
    _id: req.user.userId
  });
};

const generateResetPasswordKey = async (requestBody) => {
  const filter = {
    email: requestBody.email
  };

  let user = await User.findOne(filter);

  if(user) {
    const key = randomString(64);
    memoryCache.setSpecificCacheValue(['resetPasswordCache', user.email], key);
    await sendMail(
      user.email,
      '[Subarashii] Reset password',
      '<p>Reset password key : ' + key + ' </p>');
    console.log(memoryCache.getSpecificCacheValue(['resetPasswordCache', user.email]));
  }
};

const me = async (req) => {
  return User.findOne({
    _id: req.user.userId
  }, {roles: 0, password: 0});
};

const resetPassword = async (requestBody) => {
  const filter = {
    email: requestBody.email
  };

  let user = await User.findOne(filter);

  const resetPasswordKey = memoryCache.getSpecificCacheValue(['resetPasswordCache', user.email]);

  if(resetPasswordKey && user && resetPasswordKey === requestBody.key) {
    user.password = bcrypt.hashSync(requestBody.password, 10);
    const success = await user.save();
    if(success){
      return 'Password of user has been reset';
    }else{
      return 'Error when saving new password';
    }
  }else if(!resetPasswordKey){
    return 'Reset password key is invalid';
  }else{
    return 'Invalid credential';
  }
};

const ban = async (userId) => {
  return await User.findOneAndUpdate({
    _id: userId
  }, {
    banned: true
  }, {
    new: true
  });
};

const unban = async (userId) => {
  return await User.findOneAndUpdate({
    _id: userId
  }, {
    banned: false
  }, {
    new: true
  });
};



module.exports = {
  create,
  userValidate,
  login,
  findOneById,
  updatePassword,
  generateResetPasswordKey,
  resetPassword,
  me,
  ban,
  unban
};
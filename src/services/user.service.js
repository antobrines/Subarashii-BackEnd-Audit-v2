const {
  User
} = require('../models');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');
const memoryCache = require('../cache/memoryCache');
const {
  randomString
} = require('../utils/random');
const {
  sendMail
} = require('../utils/mailer');
const banService = require('./ban.service');

const create = async (userBody) => {
  if (userBody.password)
    userBody.password = await bcrypt.hashSync(userBody.password, 10);
  return User.create(userBody);
};

const userValidate = async (req) => {
  const filter = {
    email: req.body.email
  };
  const updateValidate = {
    is_validate: true
  };
  await User.findOneAndUpdate(filter, updateValidate);
  const user = await User.findOne(filter, {
    roles: 0,
    password: 0
  });
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

const login = async (body) => {
  const {
    email,
    password
  } = body;
  const user = await User.findOne({
    email: email
  });

  if (!user) {
    return 'Invalid Credentiel';
  }
  const isBanned = await banService.isBanned(user._id);
  if (isBanned) {
    const lastBan = await banService.getLastBan(user._id);
    return `Vous êtes banni jusqu'au ${lastBan.date} pour la raison suivante : ${lastBan.reason}`;
  }
  const accessToken = await jwt.sign({
    email: user.email,
    username: user.username,
    userId: user._id,
    roles: user.roles
  }, config.token.secret || 'c2prZG5ma25zZGtjcWtzLGRma2xkc2Y=');

  const test = await compareAsync(password, user.password);
  if (test) {
    return accessToken;
  } else {
    return 'Invalid Credentiel';
  }
};

const updatePassword = async (userId, body) => {

  const filter = {
    _id: userId
  };

  const userFromDB = await User.findOne(filter);

  const hasSamePassword = await compareAsync(body.previousPassword, userFromDB.password);

  if (hasSamePassword === false) {
    return 'Password do not match';
  }

  userFromDB.password = bcrypt.hashSync(body.password, 10);

  const success = await userFromDB.save();
  if (!success) {
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

  if (user) {
    const key = randomString(64);
    memoryCache.setSpecificCacheValue(['resetPasswordCache', user.email], key);
    const successSendMail = await sendMail(
      user.email,
      '[Subarashii] Reset password',
      '<p>Reset password key : http://localhost:4200/users/callback?key=' + key + ' </p>');

    if (!successSendMail) {
      return 'Error when send email';
    }
  }
};

const me = async (req) => {
  return User.findOne({
    _id: req.user.userId
  }, {
    roles: 0,
    password: 0
  });
};

const resetPassword = async (requestBody) => {
  const filter = {
    email: requestBody.email
  };

  let user = await User.findOne(filter);

  const resetPasswordKey = memoryCache.getSpecificCacheValue(['resetPasswordCache', user.email]);

  if (resetPasswordKey && user && resetPasswordKey === requestBody.key) {
    user.password = bcrypt.hashSync(requestBody.password, 10);
    const success = await user.save();
    if (success) {
      memoryCache.deleteSpecificCacheValue(['resetPasswordCache', user.email]);
      return 'Password of user has been reset';
    } else {
      return 'Error when saving new password';
    }
  } else if (!resetPasswordKey) {
    return 'Reset password key is invalid';
  } else {
    return 'Invalid credential';
  }
};

const update = async (userId, body) => {
  const filter = {
    _id: userId
  };

  return await User.findOneAndUpdate(filter, body, {
    new: true
  });
};

const getAllUsers = async (pagination, search) => {
  const user = await User.paginate({
    $or: [{
      username: {
        $regex: search,
        $options: 'i'
      }
    }, {
      email: {
        $regex: search,
        $options: 'i'
      }
    }]
  }, pagination);

  for await (const [i, userN] of user.docs.entries()) {
    const nUser = userN.toObject();
    delete nUser.password;
    delete nUser.roles;
    delete nUser.banned;
    nUser.ban = await banService.getLastBan(nUser._id);
    nUser.isBanned = await banService.isBanned(nUser._id);
    user.docs[i] = nUser;
  }

  return user;
};

const getUser = async (userId) => {
  const user = await User.findOne({
    _id: userId
  });
  const nUser = user.toObject();
  delete nUser.password;
  delete nUser.roles;
  delete nUser.banned;
  nUser.ban = await banService.getLastBan(nUser._id);
  nUser.isBanned = await banService.isBanned(nUser._id);
  return nUser;
};


module.exports = {
  create,
  userValidate,
  login,
  findOneById,
  update,
  updatePassword,
  generateResetPasswordKey,
  resetPassword,
  me,
  getAllUsers,
  compareAsync,
  getUser
};
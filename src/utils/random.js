const crypto = require('crypto');

const randomString = (length = 8) => {
  return crypto.randomBytes(length).toString('hex');
};

module.exports = {
  randomString
};
const {
  Ban
} = require('../models');

const isBanned = async (userId) => {
  const ban = await Ban.findOne({
    userId: userId
  });
  if (ban) {
    const date = new Date();
    const banDate = new Date(ban.date);
    if (date < banDate) {
      return true;
    }
  }
  return false;
};

const ban = async (userId, date, reason) => {
  const ban = await Ban.create({
    userId: userId,
    date: date,
    reason: reason
  });
  return ban;
};

const unban = async (userId) => {
  const bans = await Ban.find({
    userId: userId,
    date: {
      $gte: new Date()
    }
  });
  if (bans.length > 0) {
    // update all the bans the date to 1970-01-01 and add the date to lastDate
    bans.forEach(async ban => {
      ban.lastDate = ban.date;
      ban.date = new Date('1970-01-01');
      await ban.save();
    });
    return true;
  }
  return false;
};

const getLastBan = async (userId) => {
  return await Ban.findOne({
    userId: userId
  }).sort({
    date: -1
  });
};

module.exports = {
  isBanned,
  ban,
  unban,
  getLastBan
};
const {
  Ban
} = require('../models');

const isBanned = async (userId) => {
  const ban = await getLastBan(userId);
  if (ban) {
    const date = new Date().toLocaleDateString('fr-FR');
    const banDate = new Date(ban.date).toLocaleDateString('fr-FR');
    if (date < banDate) {
      return true;
    }
  }
  return false;
};

const ban = async (userId, date, reason) => {
  const newDate = new Date(date);
  const ban = await Ban.create({
    userId: userId,
    date: newDate,
    reason: reason
  });
  return ban;
};

const unban = async (userId) => {
  const bans = await Ban.find({
    userId: userId
  });
  if (bans.length > 0) {
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
  return Ban.findOne({
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
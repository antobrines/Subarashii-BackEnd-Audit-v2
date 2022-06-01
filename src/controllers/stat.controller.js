const {
  successF
} = require('../utils/message');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const statService = require('../services/stat.service');

const getStat = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;
  const stat = await statService.getStat(userId);
  successF('My stat', stat, httpStatus.OK, res, next);
});

module.exports = {
  getStat
};
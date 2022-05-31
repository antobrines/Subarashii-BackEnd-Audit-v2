const catchAsync = require('../utils/catchAsync');
const listService = require('../services/list.service');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const create = catchAsync(async (req, res, next) => {
  const list = await listService.create({ 
    owner: req.user.userId,
    ...req.body
  });
  successF('List created', list, httpStatus.OK, res, next);
});

const update = catchAsync(async (req, res, next) => {
  const { listId } = req.params;
  const { animeId } = req.body;
  const list = await listService.update(listId, animeId);
  successF('List updated', list, httpStatus.OK, res, next);
});

module.exports = {
  create,
  update,
};
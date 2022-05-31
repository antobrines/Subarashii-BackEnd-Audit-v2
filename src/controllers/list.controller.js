const catchAsync = require('../utils/catchAsync');
const listService = require('../services/list.service');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const createList = catchAsync(async (req, res, next) => {
  const list = await listService.create({ 
    owner: req.user.userId,
    ...req.body
  });
  successF('List created', list, httpStatus.OK, res, next);
});

const updateList = catchAsync(async (req, res, next) => {
  const { listId } = req.params;
  const { userId } = req.user;
  const { animeId, action } = req.body;
  const list = await listService.update({ listId, animeId, userId, action });
  successF('List updated', list, httpStatus.OK, res, next);
});

const deleteList = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { listId } = req.params;
  await listService.remove({ listId, userId });
  successF('List deleted', {}, httpStatus.OK, res, next);
});

module.exports = {
  createList,
  updateList,
  deleteList,
};
const catchAsync = require('../utils/catchAsync');
const listService = require('../services/list.service');
const httpStatus = require('http-status');
const {
  successF
} = require('../utils/message');

const getUserLists = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const lists = await listService.getUserLists(userId);
  successF('User lists recovered', lists, httpStatus.OK, res, next);
});

const getListAnimes = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { listId } = req.params;
  const { page } = req.query;
  const animes = await listService.getListAnimes({ userId, listId, page });
  successF('List animes recovered', animes, httpStatus.OK, res, next);
});

const getAllAnimes = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const animes = await listService.getAllAnimes({ userId });
  successF('All animes recovered', animes, httpStatus.OK, res, next);
});

const createList = catchAsync(async (req, res, next) => {
  const list = await listService.create({ 
    owner: req.user.userId,
    ...req.body
  });
  successF('List created', list, httpStatus.OK, res, next);
});

const addAnime = catchAsync(async (req, res, next) => {
  const { listId } = req.params;
  const { userId } = req.user;
  const { animeId, animeCategories } = req.body;
  const list = await listService.addAnime({ listId, animeId, animeCategories, userId });
  successF('List updated', list, httpStatus.OK, res, next);
});

const removeAnime = catchAsync(async (req, res, next) => {
  const { listId } = req.params;
  const { userId } = req.user;
  const { animeId } = req.body;
  await listService.removeAnime({ listId, animeId, userId });
  successF('List updated', {}, httpStatus.OK, res, next);
});

const deleteList = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { listId } = req.params;
  await listService.remove({ listId, userId });
  successF('List deleted', {}, httpStatus.OK, res, next);
});

module.exports = {
  getUserLists,
  getListAnimes,
  getAllAnimes,
  createList,
  addAnime,
  removeAnime,
  deleteList,
};
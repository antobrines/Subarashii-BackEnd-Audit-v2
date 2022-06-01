const List = require('../models/list.model');
const animeService = require('./anime.service');

const getUserLists = userId => List.find({ owner: userId });

const getListAnimes = async ({ userId, listId, page = 1 }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId)) {
    throw new Error('You cannot update this list');
  }
  const animesPerPage = 6;
  const animesIds = list.animes.slice((page - 1) * animesPerPage, page * animesPerPage);
  return await Promise.all(animesIds.map(id => animeService.getAnimeById(id) ));
};

const create = async list => List.create(list);

const createDefault = async userId => {
  const defaultLists = [
    { label: 'À voir', deletable: false, owner: userId },
    { label: 'En cours', deletable: false, owner: userId },
    { label: 'Terminée', deletable: false, owner: userId },
    { label: 'En attente', deletable: false, owner: userId },
    { label: 'Favoris', deletable: false, owner: userId },
  ];
  await List.insertMany(defaultLists);
};

const update = async ({ listId, animeId, userId, action }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId)) {
    throw new Error('You cannot update this list');
  }
  if (action === 'add') {
    list.animes.push(animeId);
  } else if (action === 'remove') {
    list.animes.filter(id => id !== animeId);
  }
  return list.save();
};

const remove = async ({ listId, userId }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId) || !list.deletable) {
    throw new Error('You cannot delete this list');
  }
  await list.remove();
};

module.exports = {
  getUserLists,
  getListAnimes,
  create,
  createDefault,
  update,
  remove,
};
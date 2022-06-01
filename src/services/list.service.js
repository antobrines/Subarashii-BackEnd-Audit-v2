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
  return Promise.all(animesIds.map(id => animeService.getAnimeById(id) ));
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

const addAnime = async ({ listId, animeId, animeCategories, userId }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId)) {
    throw new Error('You cannot update this list');
  }
  if (list.animes.find(a => a.get('id') === animeId)) {
    throw new Error('Anime already in list');
  }
  list.animes.push({
    id: animeId,
    categories: [ ...animeCategories ],
    episodesWatched: 0,
    minutesWatched: 0,
  });
  return list.save();
};

const removeAnime = async ({ listId, animeId, userId }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId)) {
    throw new Error('You cannot update this list');
  }
  list.animes = list.animes.filter(a => a.get('id') !== animeId);

  await list.save();
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
  removeAnime,
  addAnime,
  remove,
};
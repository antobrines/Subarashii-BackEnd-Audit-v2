const List = require('../models/list.model');
const Anime = require('../models/anime.model');
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
  const animes = await Anime.find({ list: listId });
  const animesPage = animes.slice((page - 1) * animesPerPage, page * animesPerPage);
  return Promise.all(animesPage.map(anime => animeService.getAnimeById(anime.id) ));
};

const getAllAnimes = async ({ userId }) => {
  const lists = await getUserLists(userId);
  const animes = Anime.find({ list: { $in: lists.map(l => l._id) } });
  return animes;
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
  const animeExists = await Anime.findOne({ id: animeId, list: listId });
  if (animeExists) {
    throw new Error('Anime already in list');
  }
  const anime = await Anime.create({
    id: animeId,
    list: listId,
    categories: animeCategories,
    episodesWatched: [],
    minutesWatched: 0,
  });

  return anime;
};

const removeAnime = async ({ listId, animeId, userId }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId)) {
    throw new Error('You cannot update this list');
  }
  const anime = await Anime.findOne({ id: animeId, list: listId });
  if (!anime) {
    throw new Error('Anime not found in this list');
  }

  await anime.remove();
};

const remove = async ({ listId, userId }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId) || !list.deletable) {
    throw new Error('You cannot delete this list');
  }
  await Anime.deleteMany({ list: listId });
  await list.remove();
};

const episodeSeen = async ({ listId, animeId, episodeId, userId }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId)) {
    throw new Error('You cannot update this list');
  }
  const anime = await Anime.findOne({ id: animeId, list: listId });
  if (!anime) {
    throw new Error('Anime not found in this list');
  }
  if (anime.episodesWatched.includes(episodeId)) {
    throw new Error('Episode already seen');
  }
  anime.episodesWatched.push(episodeId);
  return anime.save();
};

const episodeUnseen = async ({ listId, animeId, episodeId, userId }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId)) {
    throw new Error('You cannot update this list');
  }
  const anime = await Anime.findOne({ id: animeId, list: listId });
  if (!anime) {
    throw new Error('Anime not found in this list');
  }
  if (!anime.episodesWatched.includes(episodeId)) {
    throw new Error('Episode not seen');
  }

  anime.episodesWatched = anime.episodesWatched.filter(a => a !== episodeId);
  return anime.save();
};

module.exports = {
  getUserLists,
  getListAnimes,
  getAllAnimes,
  create,
  createDefault,
  removeAnime,
  addAnime,
  remove,
  episodeSeen,
  episodeUnseen,
};
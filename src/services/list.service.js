const List = require('../models/list.model');
const Anime = require('../models/anime.model');
const animeService = require('./anime.service');

const getUserLists = async ({ userId, containing }) => {
  if (containing) {
    const anime = await Anime.findOne({ owner: userId, id: containing });
    return anime.list;
  } else {
    return List.find({
      owner: userId,
    });
  }
};

const getListAnimes = async ({ userId, listId }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId)) {
    throw new Error('You cannot update this list');
  }
  //const animesPerPage = 6;
  const animesPage = await Anime.find({
    list: listId,
  });
  //const animesPage = animes.slice((page - 1) * animesPerPage, page * animesPerPage);
  return Promise.all(
    animesPage.map((anime) => animeService.getAnimeById(anime.id))
  );
};

const getAllAnimes = async ({ userId }) => {
  const lists = await getUserLists(userId);
  const animes = Anime.find({
    list: {
      $in: lists.map((l) => l._id),
    },
  });
  return animes;
};

const create = async (list) => List.create(list);

const createDefault = async (userId) => {
  const defaultLists = [
    {
      label: 'À voir',
      deletable: false,
      owner: userId,
    },
    {
      label: 'En cours',
      deletable: false,
      owner: userId,
    },
    {
      label: 'Terminée',
      deletable: false,
      owner: userId,
    },
    {
      label: 'En attente',
      deletable: false,
      owner: userId,
    },
    {
      label: 'Favoris',
      deletable: false,
      owner: userId,
    },
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
  const animeExists = await Anime.findOne({
    id: animeId,
    list: listId,
  });
  console.log(animeExists);
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
  const anime = await Anime.findOne({
    id: animeId,
    list: listId,
  });
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
  await Anime.deleteMany({
    list: listId,
  });
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
  const anime = await Anime.findOne({
    id: animeId,
    list: listId,
  });
  if (!anime) {
    throw new Error('Anime not found in this list');
  }
  if (anime.episodesWatched.includes(episodeId)) {
    throw new Error('Episode already seen');
  }
  if (anime.episodesWatched.length === 0) {
    const watchingList = await List.findOne({
      label: 'En cours',
      owner: userId,
    });
    anime.list = watchingList._id;
  } else {
    const animeDetails = await animeService.getAnimeById(animeId);
    if (anime.episodesWatched === animeDetails.number_of_episodes) {
      const seenList = await List.findOne({
        label: 'Terminée',
        owner: userId,
      });
      anime.list = seenList._id;
    }
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
  const anime = await Anime.findOne({
    id: animeId,
    list: listId,
  });
  if (!anime) {
    throw new Error('Anime not found in this list');
  }
  if (!anime.episodesWatched.includes(episodeId)) {
    throw new Error('Episode not seen');
  }
  anime.episodesWatched = anime.episodesWatched.filter(
    (a) => a !== String(episodeId)
  );

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

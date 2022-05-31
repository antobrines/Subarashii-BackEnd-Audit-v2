const List = require('../models/list.model');

const create = async list => await List.create(list);

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
  return await list.save();
};

const remove = async ({ listId, userId }) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId) || !list.deletable) {
    throw new Error('You cannot delete this list');
  }
};

module.exports = {
  create,
  createDefault,
  update,
  remove,
};
const List = require('../models/list.model');

const create = async list => await List.create(list);

const update = async ({ listId, animeId, userId }) => {
  console.log(listId, animeId);
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  if (!list.owner.equals(userId)) {
    throw new Error('You cannot update this list');
  }
  list.animes.push(animeId);
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
  update,
  remove,
};
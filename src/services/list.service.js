const List = require('../models/list.model');

const create = async list => await List.create(list);

const update = async (listId, animeId) => {
  console.log(listId, animeId);
  const list = await List.findById(listId);
  list.animes.push(animeId);
  return await list.save();
};

module.exports = {
  create,
  update,
};
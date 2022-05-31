const List = require('../models/list.model');

const create = async list => await List.create(list);

module.exports = {
  create,
};
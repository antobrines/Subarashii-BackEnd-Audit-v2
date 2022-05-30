const config = require('../config/index');
const fetch = require('node-fetch');

const tmdbRequest = async url => {
  const request = await fetch(`https://api.themoviedb.org/3/${url}`, {
    method: 'GET',
    headers: { Authorization: config.apiToken}
  });
  return await request.json();
};

const getAnimeById = async id => await tmdbRequest(`/tv/${id}`);

module.exports = {
  getAnimeById
};
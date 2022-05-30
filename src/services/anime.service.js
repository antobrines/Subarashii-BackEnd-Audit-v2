const config = require('../config/index');
const fetch = require('node-fetch');

const tmdbRequest = async url => {
  const request = await fetch(`https://api.themoviedb.org/3/${url}`, {
    method: 'GET',
    headers: { Authorization: config.apiToken}
  });
  return await request.json();
};

const getMultiple = async ({ page = 1, categories = '16' }) => await tmdbRequest(`/discover/tv?with_genres=${categories}&original_language=ja&page=${page || 1}&language=fr-Fr&sort_by=original_title.asc&original_language=ja`);

const getAnimeById = async id => await tmdbRequest(`/tv/${id}`);

module.exports = {
  getMultiple,
  getAnimeById
};
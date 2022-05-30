const config = require('../config/index');
const fetch = require('node-fetch');

const tmdbRequest = async url => {
  console.log('url', url);
  const request = await fetch(`https://api.themoviedb.org/3/${url}`, {
    method: 'GET',
    headers: { Authorization: config.apiToken}
  });
  return await request.json();
};

const getMultipleAnimes = async ({ page = 1, categories = '16' }) => await tmdbRequest(`/discover/tv?with_genres=${categories}&original_language=ja&page=${page}&language=fr-Fr&sort_by=original_title.asc&original_language=ja`);

const getAnimeById = async id => await tmdbRequest(`/tv/${id}`);

const getEpisodes = async ({ id, season }) => await tmdbRequest(`/tv/${id}/season/${season}`);

module.exports = {
  getMultipleAnimes,
  getAnimeById,
  getEpisodes
};
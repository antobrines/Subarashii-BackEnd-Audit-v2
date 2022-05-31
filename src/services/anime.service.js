const config = require('../config/index');
const fetch = require('node-fetch');

const tmdbRequest = async url => {
  const request = await fetch(`https://api.themoviedb.org/3/${url}`, {
    method: 'GET',
    headers: { Authorization: config.apiToken}
  });
  return await request.json();
};

const getMultipleAnimes = async ({ adults= false, page = 1, categories = '16', status = undefined }) => 
  await tmdbRequest(`/discover/tv?with_genres=${categories}&include_adult=${adults}&with_status=${status}&original_language=ja&page=${page}&language=fr-Fr&sort_by=original_title.asc&original_language=ja`);

const getAnimeById = async id => await tmdbRequest(`/tv/${id}`);

const getEpisodes = async ({ id, season }) => await tmdbRequest(`/tv/${id}/season/${season}`);

module.exports = {
  getMultipleAnimes,
  getAnimeById,
  getEpisodes
};

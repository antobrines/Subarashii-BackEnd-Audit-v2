const config = require('../config/index');
const Anime = require('../models/anime.model');
const fetch = require('node-fetch');

const tmdbRequest = async url => {
  const request = await fetch(`https://api.themoviedb.org/3${url}`, {
    method: 'GET',
    headers: { Authorization: config.apiToken}
  });
  return await request.json();
};

const getMultipleAnimes = async ({ 
  adults = false, 
  page = 1, 
  categories = '16', 
  status = null, 
  sort_by = 'original_title.asc' 
}) => {
  return await tmdbRequest(`/discover/tv?with_genres=${categories}&include_adult=${adults}${status && `&with_status=${status}`}&page=${page}&sort_by=${sort_by}&with_original_language=ja`);
};

const getAnimeById = async id => {
  const remoteAnime = await tmdbRequest(`/tv/${id}`);
  const localAnime = await Anime.findOne({ id });
  return { ...remoteAnime, ...localAnime.episodesWatched };
};

const getEpisodes = async ({ id, seasonNumber }) => await tmdbRequest(`/tv/${id}/season/${seasonNumber}`);

module.exports = {
  getMultipleAnimes,
  getAnimeById,
  getEpisodes
};

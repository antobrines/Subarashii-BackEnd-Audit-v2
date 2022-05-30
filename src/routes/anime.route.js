const express = require('express');
const animeController = require('../controllers/anime.controller');
const router = express.Router();

router.get('/', animeController.getMultipleAnimes);
router.get('/:id', animeController.getAnime);
router.get('/:id/season/:season', animeController.getEpisodes);

module.exports = router;

const express = require('express');
const animeController = require('../controllers/anime.controller');
const animeValidation = require('../validations/anime.validation');
const validate = require('../middlewares/validate');
const router = express.Router();

router.get('/', validate(animeValidation.getMultipleAnimes), animeController.getMultipleAnimes);
router.get('/:id', animeController.getAnime);
router.get('/:id/season/:seasonId', animeController.getEpisodes);

module.exports = router;

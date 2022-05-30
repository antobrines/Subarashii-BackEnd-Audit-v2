const express = require('express');
const animeController = require('../controllers/anime.controller');
const router = express.Router();

router.get('/', animeController.getAll);
router.get('/:id', animeController.getAnime);


module.exports = router;
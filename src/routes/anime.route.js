const express = require('express');
const animeController = require('../controllers/anime.controller');
const router = express.Router();

router.get('/', animeController.getMultiple);
router.get('/:id', animeController.getAnime);


module.exports = router;
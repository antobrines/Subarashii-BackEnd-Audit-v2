const express = require('express');
const listController = require('../controllers/list.controller');
const listValidation = require('../validations/list.validation');
const validate = require('../middlewares/validate');
const { isConnected } = require('../middlewares/user.middleware');
const { RuleTester } = require('eslint');
const router = express.Router();

router.get(
  '/',
  [ isConnected, validate(listValidation.getAllLists) ],
  listController.getUserLists
);

router.get(
  '/:listId/animes',
  [ isConnected, validate(listValidation.getListAnimes) ],
  listController.getListAnimes
);

router.get(
  '/animes',
  [ isConnected ],
  listController.getAllAnimes
);

router.post(
  '/',
  [ isConnected, validate(listValidation.create) ],
  listController.createList
);

router.patch(
  '/:listId/anime/:animeId/see',
  [ isConnected, validate(listValidation.episodeSeen) ],
  listController.episodeSeen
);

router.patch(
  '/:listId/anime/:animeId/unsee',
  [ isConnected, validate(listValidation.episodeUnseen) ],
  listController.episodeUnseen
);

router.post(
  '/:listId/anime/add',
  [ isConnected, validate(listValidation.addAnime) ],
  listController.addAnime
);

router.delete(
  '/:listId/anime/:animeId',
  [ isConnected ],
  listController.removeAnime
);

router.delete(
  '/:listId',
  [ isConnected ],
  listController.deleteList
);

module.exports = router;

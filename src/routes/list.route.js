const express = require('express');
const listController = require('../controllers/list.controller');
const listValidation = require('../validations/list.validation');
const validate = require('../middlewares/validate');
const { isConnected } = require('../middlewares/user.middleware');
const router = express.Router();

router.get(
  '/',
  [ isConnected ],
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
  '/:listId/anime/add',
  [ isConnected, validate(listValidation.addAnime) ],
  listController.addAnime
);

router.patch(
  '/:listId/anime/remove',
  [ isConnected, validate(listValidation.removeAnime) ],
  listController.removeAnime
);

router.delete(
  '/:listId',
  [ isConnected ],
  listController.deleteList
);

module.exports = router;

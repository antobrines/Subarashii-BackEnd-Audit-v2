const express = require('express');
const statController = require('../controllers/stat.controller');
const router = express.Router();
const {
  isConnected,
  isBanned,
} = require('../middlewares/user.middleware');

router.get('/', [isConnected, isBanned], statController.getStat);

module.exports = router;
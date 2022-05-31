const express = require('express');
const listController = require('../controllers/list.controller');
const listValidation = require('../validations/list.validation');
const validate = require('../middlewares/validate');
const { isConnected } = require('../middlewares/user.middleware');
const router = express.Router();

router.post(
  '/',
  [
    isConnected,
    validate(listValidation.create),
  ],
  listController.create
);

module.exports = router;

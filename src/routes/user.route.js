const express = require('express');
const userController = require('../controllers/user.controller');
const authValidation = require('../validations/user.validation');
const validate = require('../middlewares/validate');
const router = express.Router();
const {
  isConnected,
  isBanned
} = require('../middlewares/user.middleware');

router.post(
  '/register',
  validate(authValidation.register),
  userController.register
);
router.post('/login', validate(authValidation.login), userController.login);
router.get('/test-connection', [isConnected, isBanned], userController.testConnection);
router.put('/password', [isConnected, validate(authValidation.updatePassword)], userController.updatePassword)

router.post('/password/reset/key', validate(authValidation.generateResetPasswordKey), userController.generateResetPasswordKey)
router.post('/password/reset/', validate(authValidation.resetPassword), userController.resetPassword)


module.exports = router;
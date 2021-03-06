const express = require('express');
const userController = require('../controllers/user.controller');
const adminController = require('../controllers/admin.controller');
const authValidation = require('../validations/user.validation');
const validate = require('../middlewares/validate');
const router = express.Router();
const {
  isConnected,
  isBanned,
  isAdmin
} = require('../middlewares/user.middleware');

router.post(
  '/register',
  validate(authValidation.register),
  userController.register
);
router.post('/login', validate(authValidation.login), userController.login);

router.put('/', [isConnected, validate(authValidation.update)], userController.update);

router.get('/me', [isConnected, isBanned], userController.me);
router.put('/password', [isConnected, validate(authValidation.updatePassword)], userController.updatePassword);

router.post('/password/reset/key', validate(authValidation.generateResetPasswordKey), userController.generateResetPasswordKey);
router.post('/password/reset/', validate(authValidation.resetPassword), userController.resetPassword);

router.patch('/ban/:userId', [isConnected, isAdmin], adminController.ban);
router.patch('/unban/:userId', [isConnected, isAdmin], adminController.unban);
router.get('/isbanned/:userId', [isConnected, isAdmin], adminController.isBanned);

router.get('/all', [isConnected, isAdmin, validate(authValidation.getAllUsers)], adminController.getAllUsers);
router.get('/ban-informations/:userId', [isConnected, isAdmin], adminController.getUsers);


module.exports = router;
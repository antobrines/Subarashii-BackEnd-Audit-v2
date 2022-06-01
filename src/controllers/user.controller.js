const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const httpStatus = require('http-status');
const {
  errorF,
  successF
} = require('../utils/message');

const register = catchAsync(async (req, res, next) => {
  const userCreated = await userService.create(req.body);
  successF('User Created', userCreated, httpStatus.OK, res, next);
});

const login = catchAsync(async (req, res, next) => {
  const varLogged = await userService.login(req);
  if (varLogged === 'Invalid Credentiel') {
    const error = new Error('L\'adresse mail ou le mot de passe est invalide');
    errorF(error.message, error, httpStatus.BAD_REQUEST, res, next);
  } else {
    successF('La connexion à bien été effectué', varLogged, httpStatus.OK, res, next);
  }
});

const updatePassword = catchAsync(async (req, res, next) => {
  const varLogged = await userService.updatePassword(req);
  if (varLogged === 'Password do not match') {
    const error = new Error('Le mot de passe renseigné ne correspond pas au précédent');
    errorF(error.message, error, httpStatus.BAD_REQUEST, res, next);
  }else if(varLogged === 'Error when saving password'){
    const error = new Error('Une erreur est survenue lors de la mise à jour');
    errorF(error.message, error, httpStatus.BAD_REQUEST, res, next);
  } else {
    console.log(res.status);
    successF('Le mot de passe a bien été modifié', varLogged, httpStatus.OK, res, next);
  }
});

const update = catchAsync(async (req, res, next) => {
  const varLogged = await userService.update(req);
  if(varLogged === 'Error when saving data'){
    const error = new Error('Une erreur est survenue lors de la mise à jour des données');
    errorF(error.message, error, httpStatus.BAD_REQUEST, res, next);
  } else {
    console.log(res.status);
    successF('Les informations de l\'utilisateur ont bien été enregistrées', varLogged, httpStatus.OK, res, next);
  }
});

const generateResetPasswordKey = catchAsync(async (req, res, next) => {
  const varLogged = await userService.generateResetPasswordKey(req.body);
  if(varLogged === 'Error when send email'){
    const error = new Error('Une erreur est survenue lors de l\'envoie de l\'email');
    errorF(error.message, error, httpStatus.BAD_REQUEST, res, next);
  }
  successF('Si l\'email saisi existe, il recevra un email avec un lien pour reset son mot de passe !', varLogged, httpStatus.OK, res, next);
});

const resetPassword = catchAsync(async (req, res, next) => {
  const varLogged = await userService.resetPassword(req.body);
  if(['Reset password key is invalid', 'Invalid credential', 'Error when saving new password'].includes(varLogged)){
    const error = new Error('La clé n\'existe pas ou les informations saisies sont incorrect');
    errorF(error.message, error, httpStatus.BAD_REQUEST, res, next);
  }
  successF('Le mot de passe a bien été modifié', varLogged, httpStatus.OK, res, next);
});

const me = catchAsync(async (req, res, next) => {
  const user = await userService.me(req);
  successF('user', user, httpStatus.OK, res, next);
});


module.exports = {
  register,
  login,
  update,
  updatePassword,
  generateResetPasswordKey,
  resetPassword,
  me
};
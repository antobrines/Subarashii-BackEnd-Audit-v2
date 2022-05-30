/* eslint-disable indent */
const express = require('express');
const userRoute = require('./user.route');
const animeRoute = require('./anime.route');
const router = express.Router();

const defaultRoutes = [{
  path: '/users',
  route: userRoute,
}, {
  path: '/animes',
  route: animeRoute,
}];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
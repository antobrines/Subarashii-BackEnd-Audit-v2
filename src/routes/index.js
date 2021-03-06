/* eslint-disable indent */
const express = require('express');
const userRoute = require('./user.route');
const commentRoute = require('./comment.route');
const animeRoute = require('./anime.route');
const listRoutes = require('./list.route');
const statRoute = require('./stat.route');
const notificationRoutes = require('./notification.route');
const router = express.Router();

const defaultRoutes = [{
  path: '/users',
  route: userRoute,
}, {
  path: '/comments',
  route: commentRoute,
}, {
  path: '/animes',
  route: animeRoute,
} , {
  path: '/lists',
  route: listRoutes,
}, {
  path: '/stats',
  route: statRoute,
}, {
  path: '/notifications',
  route: notificationRoutes,
}];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
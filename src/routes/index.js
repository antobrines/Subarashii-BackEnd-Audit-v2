/* eslint-disable indent */
const express = require('express');
const userRoute = require('./user.route');
const commentRoute = require('./comment.route');
const router = express.Router();

const defaultRoutes = [{
  path: '/users',
  route: userRoute,
}, {
  path: '/comments',
  route: commentRoute,
}];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
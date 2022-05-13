/* eslint-disable indent */
const express = require('express');
const authRoute = require('./user.route');
const router = express.Router();

const defaultRoutes = [{
  path: '/user',
  route: authRoute,
}];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
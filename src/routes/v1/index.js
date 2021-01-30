const express = require('express');
const config = require('../../config/config');
const topsecretRoutes = require('../../topsecret-msg/routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: topsecretRoutes,
  },
];

// To do: planning to add open api documentation here
const devRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

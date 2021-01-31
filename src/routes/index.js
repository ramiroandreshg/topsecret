const express = require('express');
const config = require('../config/config');
const topsecretRoutes = require('../topsecret/routes');
const docsRoutes = require('./docs');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: topsecretRoutes,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

const express = require("express");

const { errorHandler } = require("bodymen");

module.exports = (apiRoot, router) => {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(errorHandler());

  app.use(apiRoot, router);
  return app;
};

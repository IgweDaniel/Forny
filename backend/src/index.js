const express = require("../src/services/express");
const mongoose = require("./services/mongoose");

const { port, mongo, apiRoot } = require("./config");
const api = require("./api");

mongoose.connect(mongo.uri).then(() => {
  console.log("DataBase connected successfully");
});

const app = express(apiRoot, api);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/* eslint-disable no-undef */
const mongoose = require("../src/services/mongoose");
const { mongo } = require("../src/config.js");

beforeAll(async () => {
  try {
    await mongoose.connect(mongo.uri);
  } catch (error) {
    console.error(error);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  const { collections } = mongoose.connection;
  const promises = [];
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].deleteMany({}));
  });
  await Promise.all(promises);
});

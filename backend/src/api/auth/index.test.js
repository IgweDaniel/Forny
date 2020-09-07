/* eslint-disable no-undef */
const request = require("supertest");

const { User } = require("../users/model");
const { apiRoot } = require("../../config");
const routes = require("./index");
const express = require("../../services/express");

const app = () => express(apiRoot, routes);

let user = {
  name: "user",
  email: "a@a.com",
  password: "123456",
};

beforeEach(async () => {
  await User.create(user);
});

test("POST /Login A user SuccessFully", async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .auth(user.email, user.password);

  expect(status).toBe(200);
  expect(body.data).toHaveProperty("acces_token");
});

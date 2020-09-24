/* eslint-disable no-undef */
const request = require("supertest");

const { User } = require("../users/model");
const { apiRoot } = require("../../config");
const routes = require("./index");
const express = require("../../services/express");
const { encode } = require("../../services/jwt");

const app = () => express(apiRoot, routes);

let user, token;

beforeEach(async () => {
  user = await User.create({
    name: "user",
    email: "b@b.com",
    password: "123456",
  });
  token = await encode(user.id);
});

test("POST /users 200 ", async () => {
  const { status, body } = await request(app()).post(apiRoot).send({
    name: "daniel",
    email: "d@ad.com",
    password: "123456",
  });

  expect(body.data).toHaveProperty("access_token");
  expect(body.error).toBeNull();
  expect(status).toBe(201);
});

test("POST /users 409 ", async () => {
  const { status, body } = await request(app()).post(apiRoot).send({
    name: user.name,
    email: user.email,
    password: "123456",
  });
  expect(body.data).toBeNull();
  expect(body.error).toBeTruthy();
  expect(status).toBe(409);
});

test("GET /user 200 ", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/me`)
    .set("Authorization", `Bearer ${token}`);

  expect(body.data).toHaveProperty("user");
  expect(body.error).toBeNull();
  expect(status).toBe(200);
});

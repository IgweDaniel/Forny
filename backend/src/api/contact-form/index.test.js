/* eslint-disable no-undef */
const request = require("supertest");

const { User } = require("../users/model");
const { ContactForm } = require("./model");
const { apiRoot } = require("../../config");
const routes = require("./index");
const express = require("../../services/express");
const { encode } = require("../../services/jwt");

const app = () => express(apiRoot, routes);

let user1, user2, token, token2, contactform, contactform2;

beforeEach(async () => {
  user1 = await User.create({
    name: "user",
    email: "q@q.com",
    password: "123456",
  });

  user2 = await User.create({
    name: "ama",
    email: "m@m.com",
    password: "123456",
    plan: {
      max_submissions: 1,
      max_forms: 1,
      webhook: false,
      autoResponses: false,
      fileUpload: false,
    },
  });

  contactform = await ContactForm.create({
    user: user2.id,
    name: "Doxy2",
    max_submissions: user2.plan.max_submissions,
  });

  contactform2 = await ContactForm.create({
    user: user2.id,
    name: "pORTY",
    max_submissions: user2.plan.max_submissions,
    submissions: [{ name: "daniel", email: "c@c.com", message: "Hello " }],
  });

  token = await encode(user1.id);
  token2 = await encode(user2.id);
});

test("POST /form 201", async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "doxy",
    });

  expect(status).toBe(201);
  expect(body.error).toBeNull();
  expect(body.data).toHaveProperty("form");
});

test("POST /form 403", async () => {
  const { status, body } = await request(app())
    .post(apiRoot)
    .set("Authorization", `Bearer ${token2}`)
    .send({
      name: "doxy",
    });

  expect(body.data).toBeNull();
  expect(body.error).toBeTruthy();
  expect(status).toBe(403);
});

test("GET /forms 200 ", async () => {
  const { status, body } = await request(app())
    .get(apiRoot)
    .set("Authorization", `Bearer ${token2}`);

  expect(body.error).toBeNull();
  expect(status).toBe(200);
  // expect(JSON.stringify(body.data).contains(form.id)).toBeTruthy();
});

test("GET /forms/:id 200 ", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${contactform2.id}`)
    .set("Authorization", `Bearer ${token2}`);
  // write more expectations
  expect(body.error).toBeNull();
  expect(status).toBe(200);
  // expect(JSON.stringify(body.data).contains(form.id)).toBeTruthy();
});

test("GET /forms/:id 404  ", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${contactform.id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(body.error).toBeTruthy();
  expect(status).toBe(404);
});

test("POST /forms/:id 200 (submissions)", async () => {
  const { status } = await request(app())
    .post(`${apiRoot}/${contactform.id}`)
    .set("Authorization", `Bearer ${token2}`)
    .send({
      name: "doxy",
      email: "doxy@gmail.com",
      message: "I want to hire thee",
    });

  expect(status).toBe(200);
});

test("POST /forms/:id 404 (submissions)", async () => {
  const { status } = await request(app())
    .post(`${apiRoot}/${"5ee4850e02eed4216895eb2c"}`)
    .set("Authorization", `Bearer ${token2}`)
    .send({
      name: "doxy",
      email: "doxy@gmail.com",
      message: "I want to hire thee",
    });

  expect(status).toBe(404);
});

test("POST /forms/:id 406 (submissions)", async () => {
  const { status } = await request(app())
    .post(`${apiRoot}/${contactform2.id}`)
    .set("Authorization", `Bearer ${token2}`)
    .send({
      name: "doxy",
      email: "doxy@gmail.com",
      message: "I want to hire thee",
    });

  expect(status).toBe(406);
});

// test("DELETE /forms/:id 200 (submissions)", async () => {});
// test("DELETE /forms/:id 404 (submissions)", async () => {});

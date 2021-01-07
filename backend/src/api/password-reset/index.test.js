/* eslint-disable no-undef */
const request = require("supertest");

// const { User } = require("../users/model");
const { apiRoot } = require("../../config");
const routes = require("./index");
const express = require("../../services/express");
const app = () => express(apiRoot, routes);

const sendMailMock = jest.fn();

jest.mock("../../services/nodemailer");

const nodemailer = require("../../services/nodemailer");
nodemailer.sendMail.mockImplementation(sendMailMock);

// let user = {
//   name: "user",
//   email: "a@a.com",
//   password: "123456",
// };

beforeEach(async () => {
  sendMailMock.mockClear();
});

test("POST /Password reset", async () => {
  const { status, body } = await request(app()).post(apiRoot).send({
    name: "daniel",
    email: "d@ad.com",
    password: "123456",
  });
  console.log({ status, body });
  expect(sendMailMock).toHaveBeenCalled();
});

test("POST /Password reset", async () => {
  // expect(sendMailMock.mock.calls.length).toBeGreaterThan(0);
});

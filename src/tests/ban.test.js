const userService = require('../services/user.service');
const banService = req
const assert = require('assert');
const {
  faker
} = require('@faker-js/faker');

const generateUser = () => {
  const password = faker.internet.password();
  const user = {
    email: faker.internet.email(),
    password: password,
    confirm_password: password,
    username: faker.internet.userName(),
  };
  return user;
};
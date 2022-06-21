const userService = require('../services/user.service');
const assert = require('assert');
const {
  User
} = require('../models');
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

describe('Users', () => {

  it('create', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    assert.equal(newUser.username, user.username);
    assert.equal(newUser.email, user.email);
    const count = await User.countDocuments();
    assert.equal(count, 1);
  }).timeout(5000);

  it('update', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const updateUser = await userService.update(newUser._id, {
      username: 'Test3'
    });
    assert.equal(updateUser.username, 'Test3');
  }).timeout(5000);

  it('login', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const auth = await userService.login({
      email: newUser.email,
      password: user.confirm_password
    });
    assert.notEqual(auth, 'Invalid Credentiel');
  }).timeout(5000);

  it('login with wrong password', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const auth = await userService.login({
      email: newUser.email,
      password: 'wrong password' //NOSONAR
    });
    assert.equal(auth, 'Invalid Credentiel');
  }).timeout(5000);

  it('update password', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const update = await userService.updatePassword(newUser._id, {
      previousPassword: user.confirm_password,
      password: 'new password' //NOSONAR
    });
    assert.equal(update, undefined);
  }).timeout(5000);

  it('update password with wrong previous password', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const update = await userService.updatePassword(newUser._id, {
      previousPassword: 'wrong password',
      password: 'new password' //NOSONAR
    });
    assert.equal(update, 'Password do not match');
  }).timeout(5000);

}).timeout(5000);
const userService = require('../services/user.service');
const banService = require('../services/ban.service');
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

const generateBan = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const ban = {
    date: date,
    reason: faker.lorem.sentence(),
  };
  return ban;
};


describe('Ban', () => {
  it('ban user', async () => {
    const banData = generateBan();
    const user = generateUser();
    const newUser = await userService.create(user);
    await banService.ban(newUser._id, banData.date, banData.reason);
    const isBanned = await banService.isBanned(newUser._id);
    assert.equal(isBanned, true);
  }).timeout(5000);

  it('unban user', async () => {
    const banData = generateBan();
    const user = generateUser();
    const newUser = await userService.create(user);
    await banService.ban(newUser._id, banData.date, banData.reason);
    const isBanned = await banService.isBanned(newUser._id);
    assert.equal(isBanned, true);
    await banService.unban(newUser._id);
    await banService.getLastBan(newUser._id);
    const isBannedAfterUnban = await banService.isBanned(newUser._id);
    assert.equal(isBannedAfterUnban, false);
  }).timeout(5000);

  it('get last ban', async () => {
    const banData = generateBan();
    const user = generateUser();
    const newUser = await userService.create(user);
    await banService.ban(newUser._id, banData.date, banData.reason);
    const ban = await banService.getLastBan(newUser._id);
    assert.equal(ban.reason, banData.reason);
  }).timeout(5000);

});
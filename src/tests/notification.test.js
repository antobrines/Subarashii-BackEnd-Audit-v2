const {
  faker
} = require('@faker-js/faker');
const userService = require('../services/user.service');
const commentService = require('../services/comment.service');
const notificationService = require('../services/notification.service');
const assert = require('assert');

const generateUser = () => {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: password,
    confirm_password: password,
    username: faker.internet.userName(),
  };
};

const generateComment = (userId) => {
  let content = faker.lorem.sentence();
  while (commentService.isProfane(content)) {
    content = faker.lorem.sentence();
  }
  return {
    content: content,
    animeId: faker.random.numeric(),
    userId: userId,
  };
};

describe('Notifications', () => {
  it('like comment', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    await commentService.likeComment(newComment._id, newUser._id);
    const notifications = await notificationService.getNotifications(newUser._id);
    assert.equal(notifications.unreadCount, 1);
    assert.equal(notifications.data[0].type, 'like');
    assert.equal(notifications.data[0].comment._id.toString(), newComment._id.toString());
    assert.equal(notifications.data[0].reactor._id.toString(), newUser._id.toString());
  }).timeout(5000);

  it('already like', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    await commentService.likeComment(newComment._id, newUser._id);
    try {
      await commentService.likeComment(newComment._id, newUser._id);
    } catch (error) {
      assert.equal(error.message, 'You already liked this comment');
    }
  }).timeout(5000);

  it('dislike comment', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    await commentService.dislikeComment(newComment._id, newUser._id);
    const notifications = await notificationService.getNotifications(newUser._id);
    assert.equal(notifications.unreadCount, 1);
    assert.equal(notifications.data[0].type, 'dislike');
    assert.equal(notifications.data[0].comment._id.toString(), newComment._id.toString());
    assert.equal(notifications.data[0].reactor._id.toString(), newUser._id.toString());
  }).timeout(5000);

  it('already dislike', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    await commentService.dislikeComment(newComment._id, newUser._id);
    try {
      await commentService.dislikeComment(newComment._id, newUser._id);
    } catch (error) {
      assert.equal(error.message, 'You already disliked this comment');
    }
  }).timeout(5000);

  it('read notification', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    await commentService.likeComment(newComment._id, newUser._id);
    const notifications = await notificationService.getNotifications(newUser._id);
    assert.equal(notifications.unreadCount, 1);
    await notificationService.readNotification(notifications.data[0]._id);
    const notifications2 = await notificationService.getNotifications(newUser._id);
    assert.equal(notifications2.unreadCount, 0);
  }).timeout(5000);

}).timeout(5000);
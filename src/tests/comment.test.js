const {
  faker
} = require('@faker-js/faker');
const userService = require('../services/user.service');
const commentService = require('../services/comment.service');
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

describe('Comments', () => {

  it('create', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    assert.equal(newComment.content, comment.content);
    assert.equal(newComment.userId, comment.userId);
  }).timeout(5000);

  it('create with bad words', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    comment.content = 'Connasse';
    try {
      await commentService.create(comment);
    } catch (error) {
      assert.equal(error.message, 'Your comment contains bad words');
    }
  }).timeout(5000);

  it('update', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    const updateComment = {
      content: faker.lorem.sentence()
    };
    const updatedComment = await commentService.update(newComment._id, newUser._id, updateComment);
    assert.equal(updatedComment.content, updateComment.content);
  }).timeout(5000);

  it('update with not the user owner', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    const updateComment = {
      content: faker.lorem.sentence()
    };
    const user2 = generateUser();
    const newUser2 = await userService.create(user2);
    try {
      await commentService.update(newComment._id, newUser2._id, updateComment);
    } catch (error) {
      assert.equal(error.message, 'You are not the owner of this comment');
    }
  }).timeout(5000);

  it('remove', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    const deletedComment = await commentService.remove(newComment._id, newUser._id.toString(), false);
    assert.equal(deletedComment, true);
  }).timeout(5000);

  it('remove with not the user owner', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const comment = generateComment(newUser._id);
    const newComment = await commentService.create(comment);
    const user2 = generateUser();
    const newUser2 = await userService.create(user2);
    try {
      await commentService.remove(newComment._id, newUser2._id.toString(), false);
    } catch (error) {
      assert.equal(error.message, 'You are not authorized to delete this comment');
    }
  }).timeout(5000);

  it('getAllCommentByAnimeId', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const animeId = faker.random.numeric();
    for (let i = 0; i < 10; i++) {
      let content = faker.lorem.sentence();
      while (commentService.isProfane(content)) {
        content = faker.lorem.sentence();
      }
      const comment = {
        content: content,
        animeId: animeId,
        userId: newUser._id,
      };
      await commentService.create(comment);
    }
    const comments = await commentService.getAllCommentByAnimeId(animeId);
    assert.equal(comments.length, 10);
  }).timeout(5000);

  it('getUserComments', async () => {
    const user = generateUser();
    const newUser = await userService.create(user);
    const animeId = faker.random.numeric();
    for (let i = 0; i < 10; i++) {
      let content = faker.lorem.sentence();
      while (commentService.isProfane(content)) {
        content = faker.lorem.sentence();
      }
      const comment = {
        content: content,
        animeId: animeId,
        userId: newUser._id,
      };
      await commentService.create(comment);
    }
    const comments = await commentService.getUserComments(newUser._id);
    assert.equal(comments.length, 10);
  }).timeout(5000);
}).timeout(5000);
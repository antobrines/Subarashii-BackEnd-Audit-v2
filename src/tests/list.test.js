const listService = require('../services/list.service');
const userService = require('../services/user.service');
const assert = require('assert');
const {
  List,
  Anime,
} = require('../models');
const {
  faker
} = require('@faker-js/faker');

describe('Lists', () => {

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

  it('should create a list', async () => {
    const list = { label: 'testList' };
    const newList = await listService.create(list);
    assert.equal(list.label, newList.label);
    assert.equal(newList.deletable, true);
    const count = await List.countDocuments();
    assert.equal(count, 1);
  }).timeout(5000);

  it('should create default lists', async () => {
    await listService.createDefault();
    const count = await List.countDocuments();
    assert.equal(count, 5);
  }).timeout(5000);

  it('getUserLists', async () => {
    const user = await userService.create(generateUser());
    const list = { label: 'testList', owner: user._id };
    await listService.create(list);
    const userLists = await listService.getUserLists(user._id);
    assert.equal(userLists.length, 1);
  }).timeout(5000);

  it('should get all animes', async () => {
    const user = await userService.create(generateUser());
    const list1 = await listService.create({ label: 'testList1', owner: user._id });
    const list2 = await listService.create({ label: 'testList2', owner: user._id });
    assert.equal(await List.countDocuments(), 2);
    await listService.addAnime({ 
      userId: user._id, 
      listId: list1._id, 
      animeId: '1', 
      animeCategories: ['test'] 
    });
    await listService.addAnime({ 
      userId: user._id, 
      listId: list2._id, 
      animeId: '3', 
      animeCategories: ['test'] 
    });
    assert.equal(await Anime.countDocuments(), 2);
    const animes = await listService.getAllAnimes({ userId: user._id });
    assert.equal(animes.length, 2);
    
  }).timeout(5000);

  describe('addAnime', () => {
    it('should add an anime to a list', async () => {
      const user = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user._id });
      assert.equal(await Anime.countDocuments(), 0);
      await listService.addAnime({ 
        userId: user._id, 
        listId: list._id, 
        animeId: '1', 
        animeCategories: ['test'] 
      });
      assert.equal(await Anime.countDocuments(), 1);
       
    }).timeout(5000);

    it('should not be able to update the list of another user', async () => {
      const user1 = await userService.create(generateUser());
      const user2 = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user1._id });
      
      await assert.rejects(
        async () => await listService.addAnime({ 
          userId: user2._id, 
          listId: list._id, 
          animeId: '1', 
          animeCategories: ['test'] 
        }), 
        {message: 'You cannot update this list'}
      );
       
    }).timeout(5000);

    it('should not be able to add anime already added', async () => {
      const user = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user._id });
      await listService.addAnime({ 
        userId: user._id, 
        listId: list._id, 
        animeId: '1', 
        animeCategories: ['test'] 
      });
      assert.equal(await Anime.countDocuments(), 1);
      
      await assert.rejects(
        async () => await listService.addAnime({ 
          userId: user._id, 
          listId: list._id, 
          animeId: '1', 
          animeCategories: ['test'] 
        }), 
        {message: 'Anime already in list'}
      );
       
    }).timeout(5000);
  });

  describe('removeAnime', () => {
    it('should remove an anime from a list', async () => {
      const user = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user._id });
      assert.equal(await Anime.countDocuments(), 0);
      await listService.addAnime({ 
        userId: user._id, 
        listId: list._id, 
        animeId: '1', 
        animeCategories: ['test'] 
      });
      assert.equal(await Anime.countDocuments(), 1);
      await listService.removeAnime({ 
        userId: user._id, 
        listId: list._id, 
        animeId: '1', 
      });
      assert.equal(await Anime.countDocuments(), 0);
       
    }).timeout(5000);

    it('should not be able to update the list of another user', async () => {
      const user1 = await userService.create(generateUser());
      const user2 = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user1._id });
      
      await assert.rejects(
        async () => await listService.removeAnime({ 
          userId: user2._id, 
          listId: list._id, 
          animeId: '1', 
          animeCategories: ['test'] 
        }), 
        {message: 'You cannot update this list'}
      );
       
    }).timeout(5000);

    it('should not be able to add anime already added', async () => {
      const user = await userService.create(generateUser());
      const list1 = await listService.create({ label: 'testList1', owner: user._id });
      const list2 = await listService.create({ label: 'testList2', owner: user._id });
      await listService.addAnime({ 
        userId: user._id, 
        listId: list1._id, 
        animeId: '1', 
        animeCategories: ['test'] 
      });
      assert.equal(await Anime.countDocuments(), 1);
      
      await assert.rejects(
        async () => await listService.removeAnime({ 
          userId: user._id, 
          listId: list2._id, 
          animeId: '1', 
          animeCategories: ['test'] 
        }), 
        {message: 'Anime not found in this list'}
      );
       
    }).timeout(5000);
  });

  describe('remove', async () => {
    const user = await userService.create(generateUser());

    it('should remove a list', async () => {
      const list = { label: 'testList', owner: user._id };
      const newList = await listService.create(list);
      assert.equal(await List.countDocuments(), 1);
      await listService.remove({ listId: newList._id, userId: newList.owner });
      assert.equal(await List.countDocuments(), 0);
    }).timeout(5000);
    it('should not be able to delete non deletable list', async () => {
      const list = { label: 'testList', owner: user._id, deletable: false };
      const newList = await listService.create(list);
      assert.equal(await List.countDocuments(), 1);
      await assert.rejects(
        async () => await listService.remove({ listId: newList._id, userId: newList.owner }),
        {message: 'You cannot delete this list'}
      );
    }).timeout(5000);
    it('should not be able to delete list of another user', async () => {
      const user1 = user;
      const user2 = await userService.create(generateUser());
      const list = { label: 'testList', owner: user1._id, deletable: true };
      const newList = await listService.create(list);
      assert.equal(await List.countDocuments(), 1);
      await assert.rejects(
        async () => await listService.remove({ listId: newList._id, userId: user2._id }),
        {message: 'You cannot delete this list'}
      );
    }).timeout(5000);
  });

  describe('getListAnimes', () => {
    it('should get animes from a list', async () => {
      const user = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user._id });
      assert.equal(await Anime.countDocuments(), 0);
      await listService.addAnime({ 
        userId: user._id, 
        listId: list._id, 
        animeId: '31091', 
        animeCategories: ['test'] 
      });
      const animes = await listService.getListAnimes({ listId: list._id, userId: user._id });
      assert.equal(animes.length, 1);
      assert.equal(animes[0].name, 'A.D. Police');
    }).timeout(5000);
    it('should not be able to get animes from a list', async () => {
      const user1 = await userService.create(generateUser());
      const user2 = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user1._id });
      assert.equal(await Anime.countDocuments(), 0);
      await listService.addAnime({ 
        userId: user1._id, 
        listId: list._id, 
        animeId: '31091', 
        animeCategories: ['test'] 
      });
      await assert.rejects(
        async () => await listService.getListAnimes({ listId: list._id, userId: user2._id }),
        {message: 'You cannot access this list'}
      );
    }).timeout(5000);
  });

  describe('episodeSeen', async () => {
    it('should mark an episode as seen', async () => {
      const user = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user._id });
      const anime = await listService.addAnime({ 
        userId: user._id, 
        listId: list._id, 
        animeId: '1', 
        animeCategories: ['test'] 
      });
      await listService.episodeSeen({
        animeId: '1',
        userId: user._id,
        listId: list._id,
        episodeId: '1'
      });

      const updatedAnime = await Anime.findById(anime._id);
      assert.equal(updatedAnime.episodesWatched.includes('1'), true);
    });
    it('should not see an episode already seen', async () => {
      const user = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user._id });
      await listService.addAnime({ 
        userId: user._id, 
        listId: list._id, 
        animeId: '1', 
        animeCategories: ['test'] 
      });
      await listService.episodeSeen({
        animeId: '1',
        userId: user._id,
        listId: list._id,
        episodeId: '1'
      });

      await assert.rejects(
        async () => await listService.episodeSeen({
          animeId: '1',
          userId: user._id,
          listId: list._id,
          episodeId: '1'
        }),
        {message: 'Episode already seen'}
      );

    });
  });

  describe('episodeUnseen', async () => {
    it('should remove episode from seen', async () => {
      const user = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user._id });
      const anime = await listService.addAnime({ 
        userId: user._id, 
        listId: list._id, 
        animeId: '1', 
        animeCategories: ['test'] 
      });
      await listService.episodeSeen({
        animeId: '1',
        userId: user._id,
        listId: list._id,
        episodeId: '1'
      });

      const updatedAnime = await Anime.findById(anime._id);
      assert.equal(updatedAnime.episodesWatched.includes('1'), true);
      await listService.episodeUnseen({
        animeId: '1',
        userId: user._id,
        listId: list._id,
        episodeId: '1'
      });
      const removedEpisode = await Anime.findById(anime._id);
      assert.equal(removedEpisode.episodesWatched.length, 0);
    });
    it('should not unsee an episode not seen', async () => {
      const user = await userService.create(generateUser());
      const list = await listService.create({ label: 'testList', owner: user._id });
      await listService.addAnime({ 
        userId: user._id, 
        listId: list._id, 
        animeId: '1', 
        animeCategories: ['test'] 
      });

      await assert.rejects(
        async () => await listService.episodeUnseen({
          animeId: '1',
          userId: user._id,
          listId: list._id,
          episodeId: '1'
        }),
        {message: 'Episode not seen'}
      );

    });
  });

}).timeout(5000);
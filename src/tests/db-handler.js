const mongoose = require('mongoose');
const {
  MongoMemoryServer
} = require('mongodb-memory-server');


const connect = async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const closeDatabase = async () => {
  const mongo = await MongoMemoryServer.create();
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  connect,
  closeDatabase,
  clearDatabase
};
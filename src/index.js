const app = require('./app');
const config = require('./config/index');
const mongoose = require('mongoose');
const port = config.port || 3000;

mongoose.connect(`${config.db.url}`).then(() => {
  console.log('Connected to MongoDB');
  app.listen(config.port, () => {
    console.log(`Server start at : ${config.url}:${port}`);
  });
});
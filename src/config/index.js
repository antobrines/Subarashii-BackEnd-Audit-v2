const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL
  },
  version: process.env.VERSION,
  environment: process.env.NODE_ENV,
  url: process.env.URL,
  token: {
    secret: process.env.TOKEN_SECRET,
    expire: process.env.TOKEN_EXPIRE
  },
  apiToken: process.env.API_TOKEN,
  email: {
    smtp: process.env.EMAIL_SMTP,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
  }
};
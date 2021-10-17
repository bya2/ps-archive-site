const path = require('path');
require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == 'production' ? '.env' : '.env.dev'
  ),
});
const express = require('express');
const cookie_parser = require('cookie-parser');
const session = require('express-session');

const redis = require('redis');

const HTTP_PORT = process.env.HTTP_PORT || 80;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

(() => {
  const app = express();

  const obj_redis_client_options = {
    host: '127.0.0.1',
    port: 6379,
  }
  let redis_client = redis.createClient(obj_redis_client_options);
  let redis_store = require('connect-redis')(session);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookie_parser());
  app.use(session({
    key: 'login_data',
    secret: process.env.COOKIE_SECRET || '',
    resave: false,
    saveUninitialized: false,
    store: new redis_store({ client: redis_client, logErrors: true }),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: false,
    },
  }));

  app.use('/', require('./src/routes'));

  const server = app.listen(HTTP_PORT, () => console.log(`LISTENING:\nhttp://127.0.0.1:${HTTP_PORT}`));
})();
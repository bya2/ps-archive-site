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

const HTTP_PORT = process.env.HTTP_PORT || 3000;

(() => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookie_parser());
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || '',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 10000,
      secure: false,
    },
  }));

  app.use('/', require('./src/routes'));

  const server = app.listen(HTTP_PORT, () => console.log(`LISTENING:\nhttp://127.0.0.1:${HTTP_PORT}`));
})();
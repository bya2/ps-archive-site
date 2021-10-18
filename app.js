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

const morgan = require('morgan');

const redis = require('redis');

const { AssertionError } = require('assert');
const { RedisError } = redis

const { ctrls__errors, ctrls__routes } = require('./src/controllers');

const HOST = process.env.HOST || '127.0.0.1';
const HTTP_PORT = process.env.HTTP_PORT || 80;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

(() => {
  const app = express();
  const router = express.Router();

  const obj_redis_client_options = {
    host: HOST,
    port: REDIS_PORT,
  }
  let redis_client = redis.createClient(obj_redis_client_options);
  let redis_store = require('connect-redis')(session);

  app.use(morgan('short'));
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

  router.get('/', fn__wrap_async(async (req, res, next) => {
    'use strict';
    const bool__is_login = req.session.user ? true : false;

    console.log(req.cookie);
    console.log(req.session);

    if (bool__is_login) {
      res.send(`Hi, ${req.session.user}`);
    } else {
      res.status(200)
         .sendFile('index.html', { root: path.join(process.cwd(), 'public')});
    }
  }));

  router.get('/signup', (req, res, next) => {
    'use strict';
  });

  router.get('/login', fn__wrap_async(async (req, res, next) => {
    'use strict';
    const bool__is_login = req.session.user ? true : false;

    if (bool__is_login) {
      res.redirect(303, '/');
    } else {
      res.status(200)
         .sendFile('login.html', { root: path.join(process.cwd(), 'public')});
    }
  }));

  router.post('/api/auth/login', fn__wrap_async(async (req, res, next) => {
    'use strict';
    const bool__is_login = req.session.user ? true : false;

    if (bool__is_login) {
      res.redirect(303, '/');
    } else {
      req.session.user = req.body.n_id;
      req.session.password = req.body.n_pw;
      res.redirect(301, '/');
    }
  }));

  router.post('/api/auth/logout', fn__wrap_async(async (req, res, next) => {
    'use strict';
    const bool__is_login = req.session.user ? true : false;

    if (bool__is_login) {
      req.session.destroy();
      res.redirect(301, '/');
    } else {
      res.redirect(303, '/');
    }
  }))

  app.use('/', router);

  app.use((req, res, next) => {
    res.status(404)
       .send('404. Not found.');
  })

  app.use((err, req, res, next) => {
    res.status(500)
       .json({
         message: err.stack
       });

    next(err);
  });

  const server = app.listen(HTTP_PORT, () => console.log(`LISTENING:\nhttp://${HOST}:${HTTP_PORT}`));

  function fn__wrap_async (_fn) {
    return (req, res, next) => {
      _fn(req, res, next).catch(next);
    }
  }
})();
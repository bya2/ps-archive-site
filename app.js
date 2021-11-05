// Mode ENV
const NODE_ENV = process.env.NODE_ENV;

// Modules
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, NODE_ENV === 'production' ? '.env' : '.env.dev')});

const express = require('express');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');

const Redis = require('ioredis');
const Store = require('connect-redis')(session);
const pg = require('pg');

const { AssertionError } = require('assert');
const { RedisError } = redis

// Loads
const { request_logger } = require('./middleware/logger');
const { ctrls__errors, ctrls__routes } = require('./src/controllers');
const routes = require('./routes');

// ENVs
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 80;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const COOKIE_SECRET = process.env.COOKIE_SECRET

// Functions & Instances
const app = express();
const redis = new Redis({
  host: HOST,
  port: REDIS_PORT,
  family: 4,
  db: 0,
});
const pool = new pg.Pool();

// Options
const obj_sess_opts = {
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 1,
    path: '/',
    secure: false,
  },
  genid: uuidv4,
  name: 'sessionID',
  proxy: undefined,
  resave: false,
  rolling: false,
  saveUninitialized: false,
  secret: COOKIE_SECRET || 'keyboard cat',
  store: new Store({ client: redis, logErrors: true }),
  unset: 'keep',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: false,
  },
  genid: uuidv4,
};

// Middlewares
app.use(request_logger);
app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(obj_sess_opts));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

module.exports = app;
const path = require('path');
const express = require('express');

const router = express.Router();

const fn__mw__err_handler = (req, res) => {
  const obj__err_info = {
    dir: __filename,
    instance: 'router',
    method: '',
    path: '',
    handler: 'callback',
  };

  console.error(`
    An error occurred at the following location:\n
    ${obj__err_info}\n
    Error:\n
    ${err}
  `);
}

router.get('/', (req, res) => {
  'use strict';
  try {
    const bool__is_login = req.session.user ? true : false;

    if (bool__is_login) {
      res.status(200)
         .sendFile('index.html', { root: path.join(process.cwd(), 'public') });
    } else {
      res.status(200)
         .sendFile('index.html', { root: path.join(process.cwd(), 'public') });
    }

  } catch (err) {
    const obj__err_info = {
      dir: __filename,
      instance: 'router',
      method: 'get',
      path: '/',
      handler: 'callback',
    };

    console.error(`
      An error occurred at the following location:\n
      ${obj__err_info}\n
      Error:\n
      ${err}
    `);
  }
});

router.get('/login', (req, res) => {
  'use strict';
  try {
    const bool__is_login = req.session.user ? true : false;

    if (bool__is_login) {
      res.status(200)
         .redirect(301, '/');
    } else {
      res.status(200)
         .sendFile('login.html', { root: path.join(process.cwd(), 'public') })
    }
  } catch (err) {
    const obj__err_info = {
      dir: __filename,
      instance: 'router',
      method: 'get',
      path: '/login',
      handler: 'callback',
    };

    console.error(`
      An error occurred at the following location:\n
      ${obj__err_info}\n
      Error:\n
      ${err}
    `);
  }
})

router.post('/api/auth/login_process', (req, res) => {
  'use strict';
  try {
    const bool__is_login = req.session.user ? true : false;

    if (bool__is_login) {

    } else {
      req.session.user = req.body.n_id;
    }

    res.status(200)
       .redirect(301, '/');
  } catch (err) {
    const obj__err_info = {
      dir: __filename,
      instance: 'router',
      method: 'get',
      path: '/api/auth/login_process',
      handler: 'callback',
    };

    console.error(`
      An error occurred at the following location:\n
      ${obj__err_info}\n
      Error:\n
      ${err}
    `);
  }
});

router.post('/api/auth/logout_process', (req, res) => {
  'use strict';
  try {
    const bool__is_login = req.session.user ? true : false;

    if (bool__is_login) {
      req.session.destroy(_err => {
        if (_err) throw _err;
        res.status(201)
           .redirect(301, '/');
      });
    }

    res.status(200)
       .redirect(301, '/');
  } catch (err) {
    const obj__err_info = {
      dir: __filename,
      instance: 'router',
      method: 'get',
      path: '/api/auth/logout_process',
      handler: 'callback',
    };

    console.error(`
      An error occurred at the following location:\n
      ${obj__err_info}\n
      Error:\n
      ${err}
    `);
  }
});

module.exports = router;
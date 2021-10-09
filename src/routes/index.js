const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  const req_cookie = req.cookies;
  console.log(req_cookie);

  console.log(req.query);
  console.log(req.body);

  res.sendFile('index.html', {
    root: path.join(process.cwd(), 'public'),
    
  });
});

router.post('/api/auth/logout', (req, res, next) => {
  console.log(req.query);
  console.log(req.body);
  res.redirect(301, '/');
})

router.post('/api/auth/login', (req, res, next) => {
  res
  .status(201)
  .cookie('ok2', 1)
  .redirect(301, '/');
});

module.exports = router;
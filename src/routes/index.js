const express = require('express');
const passport = require('passport');

const router = express.Router();


router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    
  }
})

module.exports = router;
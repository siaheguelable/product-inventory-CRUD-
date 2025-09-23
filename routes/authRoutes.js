const express = require('express');
const router = express.Router();

// GitHub login
router.get('/login', (req, res) => {
  res.render('Accounts/login');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;

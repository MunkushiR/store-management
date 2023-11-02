const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Product = require('../models/Product');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.register(new User({ username }), password, (err, user) => {
    if (err) {
      console.error(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/products'); 
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/products',
  failureRedirect: '/login', 
  failureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/products', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      console.error(err);
    } else {
      res.render('product', { products });
    }
  });
});


module.exports = router;

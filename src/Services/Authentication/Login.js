const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../Models/user');
const router = express.Router();
const { Auth } = require('../../Middleware/index')

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({ _id: user._id }, 'SECRET');
  res.send({ token });
});


router.get('/protected', Auth, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router

const express = require("express");
const jwt = require('jsonwebtoken')
const User = require('../../Models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = new User({ username, password })
    await user.save()
    
    const token = jwt.sign({ _id: user._id }, 'SECRET')
    res.send({ token })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router
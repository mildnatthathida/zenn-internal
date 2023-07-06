const jwt = require('jsonwebtoken')
const Auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  if (!token) {
    return res.status(401).send('No token provided')
  }

  try {
    const data = jwt.verify(token, 'SECRET')
    req.user = data
    next()
  } catch (error) {
    res.status(401).send('Invalid token')
  }
}

module.exports = { Auth }

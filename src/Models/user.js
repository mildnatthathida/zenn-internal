const mongoose = require('mongoose')
const bcrype = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
})

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrype.hash(this.password, 10)
  }
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User

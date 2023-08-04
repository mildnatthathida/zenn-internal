const mongoose = require('mongoose');
 
const Book = new mongoose.Schema(
  {
  name : String,
  price : Number,
  description: String,
  },{ 
  timestamps: true,
  versionKey: false 
  }
)

module.exports = mongoose.model('Book', Book)


const express = require('express')
const app = express();
const Book = require('../model/book');
const bookRoute = require('express').Router();

app.use(express.json());

//Post Book
bookRoute.post('/add-book', async (req, res) => {
  const data = new Book({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,      
  })

  try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
      
  }
  catch (error) {
      res.status(400).json({message: error.message})
  }
})

//Get all
bookRoute.get('/books-list', async (req, res) => {
  console.log('api/books-list');
  try{
    const data = await Book.find();
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
}
})

//Get by ID 
bookRoute.get('/books-list/:id',async (req,res)=>{
  try{
    const data = await Book.findById(req.params.id);
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
})

bookRoute.delete('/delete-book/:id' , (req,res) => {
  const bookId = req.params.id;

  Book.findByIdAndRemove(bookId)
  .then(deletedBook => {
    if(!deletedBook){
      return res.status(404).send(`No book found with id : ${bookId}`)
    }
    res.json({
      message: 'Book deleted successfully'
    });
  }).catch(error => {
    res.status(500).json({ 
      message: 'An error occurred while deleting the book', error 
    });
  });
})

module.exports = bookRoute;
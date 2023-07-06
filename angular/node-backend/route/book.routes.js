const express = require('express');
const app = express();
// const bookRoute = express.Router();
const Book = require('../model/book');
const bookRoute = require('express').Router();
 
bookRoute.post('/add-book', (req, res) => {
  const book = new Book({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  })

  book.save()
  .then((_) => {
    res.json({
      success:true, message: "Create Book"
    })
  })
  .catch((err) => {
    if(err.code === 11000){
      return res.json({success:false, message:"Book is Already"})
    }
    res.json({success:false, message:err})
  })
});

bookRoute.get('/books-list', (req, res) => {
  res.json("Add book work")
})

 
// exports.findAll = (req,res) => {
//   const name = req.query.name;
//   var codition = name ? {name: {$regex:new RegExp(name), $option: "i"}}:{};
//   const price = req.query.price;
//   const description = req.query.description;

//   // Get all Book
// bookRoute.route('/').get((req, res) => {
//     Book.find((error, data)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//         err.message || "Some error occurred while retrieving books."
//       })
//     })
//   )
// })
// }
 
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   // Get Book
// bookRoute.route('/read-book/:id').get((req, res) => {
//   Book.findById(id, (error, data)
//   .then(data => {
//     if(!data)
//     res.status(404).send({
//       message: 'Not found = ' + id
//     })
//     else res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({message: "Not found Book with id =" + id});
//   })
// )
// })
// }

// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }
//   const id = req.params.id;

// // Update Book
// bookRoute.route('/update-book/:id').put((req, res, next) => {
//     Book.findByIdAndUpdate(id, {
//     $set: req.body
//   }.then(data => {
//     if(!data){
//       res.status(404).sendStatus({
//         message: `Cannot update Book with id=${id}. Maybe Book was not found!`
//       });
//     }else res.send({ message: "Book was updated successfully." });
//   })
//   .catch(err => {
//     res.status(500).send ({
//       message: "Error updating Book with id=" + id
//     })
//   })

//   )
// })
// }
 
// exports.delete = (req, res) => {
//   const id = req.params.id;

// // Delete Book
// bookRoute.route('/delete-book/:id').delete((req, res, next) => {
//     Book.findByIdAndRemove(id, (error, data)
//     .then(data => {
//       if(!data) {
//         res.status(404).send({
//           message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
//         });
//       }else {
//         res.send({
//           message: "Book was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Book with id=" + id
//       });
//     })
//     //   if (error) {
//   //     return next(error);
//   //   } else {
//   //     res.status(200).json({
//   //       msg: data
//   //     })
//   //   }
//   // }
//   )
// })
// }

module.exports = bookRoute;
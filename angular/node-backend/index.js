const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const  cors = require('cors');
const  bodyParser = require('body-parser');
const  mongoDb = require('./database/db');
const createError = require('http-errors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// PORT
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('Listening on port ' + port)
});

//connect Database MongoDB
mongoose.connect(mongoDb.db, {
  useUnifiedTopology: true
})

const Book = mongoose.model('books', {name: String});//create collection

const book = new Book(); 
book.save()
.then(() => console.log('Connected data successfully!'))
.catch(() => console.log('Connected data failed!'));
 
const bookRoute = require('./route/book.routes');
const db = require('./database/db');
 
app.use(bodyParser.urlencoded({
  extended: false
}));
 
// Static directory path
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist/angular')));
 
// API root
app.use('/api', bookRoute)

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});
 
// Base Route
app.get('/', (req, res) => {
  res.send('welcome');
});
 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.post('/add-book', (req, res) => {
  book.get(Book, (err, results) => {
    if(err){
      console.log(err, 'error');
    }
    if(results.length > 0){
      res.send({
        message:'Add Book Data',
        book:results
      })
    }
  })
})

app.post('/add-book', (req, res) => {
  book.get(Book, (err, results) => {
    if(err){
      console.log(err, 'error');
    }
    if(results.length > 0){
      res.send({
        message:'Add Book Data',
        book:results
      })
    }
  })
})

app.get('/books-list', (req, res) => {
  console.log('Books');
  book.query(Book, (err, results) => {
    if(err){
      console.log(err, 'error');
    }
    if(results.length > 0){
      res.send({
        message:'All Book Data',
        book:results
      })
    }
  })
})

// app.get('/books-list', (req, res) => {
//   console.log('Get All Books');
// })
 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
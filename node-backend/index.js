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
// const UploadRoute = require('./route/upload.routes') ;

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
 
// Static directory path
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist/angular')));
 
// API root
app.use('/api', bookRoute)
// app.use('api', UploadRoute)

// 404 Handler
app.use((_req, _res, next) => {
  next(createError(404));
});
 
// Base Route
app.get('/', (_req, res) => {
  res.send('welcome');
});
 
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.post('/add-book', async (req, res) => {
  const data = req.body;
  const book = new Book(data);
  await book.save();
  res.status(201).end();
})

// app.get('/add-book', async (req, res) => {
//   const book = await Book.find({});
//   res.json(book)
// })

app.get('/books-list', async (_req, res) => {
  const book = await Book.find({});
  res.json(book)
})

// app.get('/books-list', (req, res) => {
//   book.query(Book, (err, results) => {
//     if(err){
//       console.log(err, 'error');
//     }
//     if(results.length > 0){
//       res.send({
//         message:'All Book Data',
//         book:results
//       })
//     }
//   })
// })

app.post('/upload-file', async (req, res) => {
})

// error handler
app.use(function (err, _req, res, _next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
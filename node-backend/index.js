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

//create collection
const Book = mongoose.model('books', {name: String});
const File = mongoose.model('files', {name: String});
const book = new Book(); 
const file = new File(); 

book.save()
.then(() => console.log('Connected data successfully!'))
.catch(() => console.log('Connected data failed!'));

file.save()
.then(() => console.log('Connected data file successfully!'))
.catch(() => console.log('Connected data file failed!'));

const bookRoute = require('./route/book.routes');
const fileRoute = require('./route/upload.routes');

app.use(express.json({limit: '24mb'}));
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '24mb'
}));

// Static directory path
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist/angular')));
 
// API root
app.use('/api', bookRoute)
app.use('/api', fileRoute)

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

// error handler
app.use(function (err, _req, res, _next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

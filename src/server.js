const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Login = require('./Services/Authentication/Login')
const Register = require('./Services/Authentication/Register')
const DigitalSigningPdf = require('./Services/DigitalSigningPdf')

const app = express()
const port = 3001

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

mongoose.connect('mongodb://admin:1234@localhost:27017/zenn_internal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Connected successfully')
})

app.use('/auth', Login)
app.use('', Register)
app.use('/digitalsigningpdf', DigitalSigningPdf)

app.get('/', (req, res) => {
  res.json({ message: 'APIs are running!!' })
})

app.listen(port, () => {
  console.log(`Application is running on port ${port}`)
})

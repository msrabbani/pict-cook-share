const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');
const port = process.env.PORT || 3000
const user = require('./routes/user'),
      vision = require('./routes/vision'),
      fbApi = require('./routes/fb-api')
const app = express()

var url = 'mongodb://localhost/food';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
   console.log(`You're connected in this database`)
});

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

// app.use('/', sign)
app.use('/', user)
app.use('/api', fbApi)
app.use('/vision', vision)

app.listen(port);
console.log('Your app is running on http://localhost:' + port);

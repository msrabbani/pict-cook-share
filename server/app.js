const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');
const port = process.env.PORT || 3000
const user = require('./routes/user')
const app = express()

var url = 'mongodb://anggraito:<PASSWORD>@mydb-shard-00-00-vv98n.mongodb.net:27017,mydb-shard-00-01-vv98n.mongodb.net:27017,mydb-shard-00-02-vv98n.mongodb.net:27017/recipe?ssl=true&replicaSet=mydb-shard-0&authSource=admin';
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

app.use('/', user)

app.listen(port);
console.log('Your app is running on http://localhost:' + port);
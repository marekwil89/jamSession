var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');



//initialize mongoose schemas
require('./models/models');
var get = require('./routes/get.js');
var add = require('./routes/add.js');
var put = require('./routes/put.js');

var authenticate = require('./routes/authenticate')(passport);
var mongoose = require('mongoose');                         //add for Mongo support
mongoose.connect('mongodb://localhost/jam');              //connect to Mongo
var app = express();




app.use(logger('dev'));
app.use(session({
    secret: 'keyboard cat',
    name: 'itsname',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authenticate);
app.use('/get', get);
app.use('/add', add);
app.use('/put', put);



var initPassport = require('./passport-init');
initPassport(passport);

app.listen(8003);
console.log('8003');

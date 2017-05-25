"use strict";
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const favicon = require('serve-favicon');
const path = require('path');
const logger = require('morgan');
let sqlite3 = require('sqlite3').verbose();

// const jsonParser = bodyParser.json();
// const textParser = bodyParser.text();

const route_index = require('./routes/index');
const route_adduser = require('./routes/adduser');
const route_authenticate = require('./routes/authenticate');
const route_deleteuser = require('./routes/deleteuser');
const route_skill = require('./routes/skill');
const route_status = require('./routes/status');
const route_svinfo = require('./routes/svinfo');
const route_updateskills = require('./routes/updateskills');
const route_updatesv = require('./routes/updatesv');
const route_updateuser = require('./routes/updateuser');
const route_userinfo = require('./routes/userinfo');
const route_usersinfo = require('./routes/usersinfo');
const route_users = require('./routes/users');
const route_offline = require('./routes/offline');
const route_log = require('./routes/log');
const route_getdata = require('./routes/getdata');

const route_onlinePoll = require('./routes/onlinePoll');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Setup database:
let dbFile = './workforce.sqlite';
//var dbExists = fs.existsSync(dbFile);
//console.log(dbExists);

// Initialize the database:
let db = new sqlite3.Database(dbFile);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// app.use('/', route_index);
app.use('/adduser', route_adduser);
app.use('/authenticate', route_authenticate);
app.use('/deleteuser', route_deleteuser);
app.use('/getdata', route_getdata);
app.use('/skill', route_skill);
app.use('/status', route_status);
app.use('/svinfo', route_svinfo);
app.use('/updateskills', route_updateskills);
app.use('/updatesv', route_updatesv);
app.use('/updateuser', route_updateuser);
app.use('/userinfo', route_userinfo);
app.use('/usersinfo', route_usersinfo);
app.use('/users', route_users);
app.use('/offline', route_offline);
app.use('/log', route_log);


//app.use('/onlinePoll', onlinePoll);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

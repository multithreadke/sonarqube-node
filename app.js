var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
var morgan = require('morgan');
var responseTime = require('response-time');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var winston = require("./config/winston");
const dbConfig = require('./config/mongo');
const mongoose = require('mongoose');
var uuid = require('uuid');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(responseTime());
// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  winston.log("info", "Successfully connected to the database", {
    TimeStamp: Date.now(),
    TransactionID: uuid.v1(),
    TransactionType: "ConnectDatabase",
    Action: "initiate connection to database",
    Response: "Success",
    ResponseTime: "0ms",
    ResponseCode: "200",
    SourceSystem: "http://localhost",
    TargetSystem: "http://localhost:2717",
    ErrorDescription: "Success",
    Extradata1: "",
    Extradata2: ""
  });
}).catch(err => {
  winston.log("error", "Could not connect to the database. Exiting now...", {
      TimeStamp: Date.now(),
      TransactionID: uuid.v1(),
      TransactionType: "ConnectDatabase",
      Action: "initiate connection to database",
      Response: "Failed",
      ResponseTime: "0ms",
      ResponseCode: "501",
      SourceSystem: "http://localhost",
      TargetSystem: "http://localhost:2717",
      ErrorDescription: err,
      Extradata1: "",
      Extradata2: ""
    });
  process.exit();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

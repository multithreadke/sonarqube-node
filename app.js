var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var responseTime = require('response-time');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var winston = require("./config/winston");
var app = express();
app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());

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

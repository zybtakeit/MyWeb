var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var partials = require('express-partials');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var app = express();
indexRouter(app);
app.use(partials());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {layout:'layout'});

app.use(function(req, res, next){
  res.local.user = res.session.user;
  var err = req.flash('error');
  var success = req.flash('success');

  res.locals.error = err.length ? err : null;
  res.locals.success = success.length ? success : null;
   
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080);

module.exports = app;

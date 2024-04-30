var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var session = require('express-session');



require('dotenv').config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { title } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'gousermau123456abcdef',
  resave: false,
  saveUninitialized: true
}));

// se usa para el formulario
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// para ver si el usuario es correcto o no
app.get('/', function (req, res) {
  // app.get ('/', indexRouter (req, res){
  var conocido = Boolean(req.session.username);
  res.render('index', {
    title: 'INICIAR SESSION',
    conocido: conocido,
    username: req.session.username
  });
});


app.post('/ingresar', function (req, res) {
  if (req.body.username) {
    req.session.username = req.body.username
  }
  res.redirect('/');

});
app.get('/salir', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

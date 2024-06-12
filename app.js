var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');






require('dotenv').config();
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/carrito_de_compras');


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
  secret: process.env.SESSION_SECRET || 'gousermau123456abcdef',
  resave: false,
  saveUninitialized: true
}));

const secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
}

// se usa para el formulario
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/carrito_de_compras', secured, adminRouter);

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

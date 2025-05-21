var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mysql'
});

connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Crear base de datos y tabla si no existen
let queryCreateDB = 'CREATE DATABASE IF NOT EXISTS mysql;';
let queryCreateTableGoals = `
  CREATE TABLE IF NOT EXISTS goals (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL DEFAULT '',
    description VARCHAR(250) NOT NULL DEFAULT '',
    dueDate VARCHAR(250) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
  );
`;

connection.query(queryCreateDB, (err) => {
  if (err) console.log('DB creation error:', err);
});

connection.query(queryCreateTableGoals, (err) => {
  if (err) console.log('Table creation error:', err);
});

connection.destroy();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks'); // corregido el nombre
var goalsRouter = require('./routes/goals');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de autenticación simple
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  if (req.headers.authorization && req.headers.authorization === '123456') {
    next();
  } else {
    res.status(401).json({ error: 'No credentials sent!' });
  }
});

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);

// Captura error 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

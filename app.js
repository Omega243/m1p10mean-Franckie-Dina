var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var app = express();

require('./database/connexion') ;

/*******************
*    MIDDLEWARE    *
*******************/
app.use(cors()) ;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/********************************************************************
*    LOGIN / INSCRIPTION / LOGOUT DO NOT NEED TOKEN VERIFICATION    *
********************************************************************/
app.use('/users', require('./routes/users'));

/***********************
*    CONTROLE TOKEN    *
***********************/
// const { controle } = require('./service/ControleService') ;
// app.use('*', controle) ;

/*************
*    PATH    *
*************/
app.use('/roles', require('./routes/roles'));
app.use('/voitures', require('./routes/voiture'));
app.use('/etatfiches', require('./routes/etatfiche')) ;
app.use('/fiches', require('./routes/fiche')) ;
app.use('/typedepenses', require('./routes/typedepense')) ;
app.use('/finances', require('./routes/finance')) ;

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

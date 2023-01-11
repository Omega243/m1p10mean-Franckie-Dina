/****************
*    EXPRESS    *
****************/
const express = require('express');
const app = express();
const cors = require('cors') ;

/**************
*    USAGE    *
**************/
app.use(express.json()) ;
app.use(cors()) ;
app.use(express.static('public')) ;

/********************
*    ENVIRONMENT    *
********************/
const port = 3000 ;

/***************
*    ROUTES    *
***************/
var users = require('./routes/user') ;
app.use('/users', users) ;

app.get('/', function (req, res) {
    console.log('index') ;
})

app.listen(port, function() {
    console.log('Server is running on Port : '.concat(port)) ;
}) ;
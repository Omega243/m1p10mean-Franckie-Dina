/****************
*    EXPRESS    *
****************/
const express = require('express');
const app = express();
const cors = require('cors') ;

/*******************
*    MIDDLEWARE    *
*******************/
app.use(express.json()) ;
app.use(cors()) ;

/********************
*    ENVIRONMENT    *
********************/
const port = 3000 ;

/***************
*    ROUTES    *
***************/
app.use('/users', require('./routes/users')) ;

/*************
*    PATH    *
*************/
app.get('/', function (req, res) {
    console.log('index') ;
})

app.listen(port, function() {
    console.log('Server is running on Port : '.concat(port)) ;
}) ;
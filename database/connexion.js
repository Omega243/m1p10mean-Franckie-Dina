require('dotenv').config() ;
const mongoose = require('mongoose') ;

mongoose.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected successfully") ;
    }).catch((err) => console.log(err)) ;
const mongoose = require('mongoose') ;
const ATLAS_URI = 'mongodb+srv://m1p10mean-Franckie-Dina:mdpprom13@m1p10mean-franckie-dina.agvb5pq.mongodb.net/?retryWrites=true&w=majority' ;

mongoose.connect(ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("=> Connected successfully") ;
    }).catch((err) => console.log(err)) ;
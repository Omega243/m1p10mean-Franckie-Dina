const jwt = require("jsonwebtoken");
const { idNotExist } = require('./UserService') ;

const SECRET_KEY = 'MEAN' ;

const controle = async (req, res, next) => {
    const headToken = req.headers.token ;
    if (headToken && headToken.split(' ').length == 2) {
        const token = headToken.split(' ')[1] ;
        if (token) {
            jwt.verify(token, SECRET_KEY, async (err, decoded) => {
                const error = {
                    'error': 'Veuillez vous connecter \'il vous plaît' ,
                    'body': req.body
                } ;
                if (err) res.status(200).json(error) ;
                else {
                    const notExist = await idNotExist(decoded.id) ;
                    if (notExist) res.status(200).json(error) ;
                    else next() ;
                }
            })
        } else {
            toLogin(res) ;
        }
    } else toLogin(res) ;
}

function toLogin(res) {
    res.redirect('https://www.google.com') ;
}

module.exports = {
    controle
}
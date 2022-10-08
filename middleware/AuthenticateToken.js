const jwt = require('jsonwebtoken')
require('dotenv').config()

// const ACCESS_TOKEN_SECRET = "e8710474cda3213c6857c8fc98c93ebb928c88c9464f09d522892799af14e41e17397ab729f3ee1f364a1993f09df91723fd6f1195005cd8be22df315ad4c1f8"


function AuthenticateToken(req,res,next){
    //Token comes from Authentication Header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)

    console.log(token)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //Status 403, we see that you have a token, but your token has no longer access
        if(err) return res.send(403)
        req.user = user
        next()
    })
}

// function AuthenticateToken(req,res,next){
//     //Token comes from Authentication Header
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if(token==null) return res.sendStatus(401)
//
//     jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
//         //Status 403, we see that you have a token, but your token has no longer access
//         if(err) return res.send(403)
//         req.user = user
//         next()
//     })
// }

module.exports = AuthenticateToken;

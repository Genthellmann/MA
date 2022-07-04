const jwt = require('jsonwebtoken')

function AuthenticateToken(req,res,next){
    //Token comes from Authentication Header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //Status 403, we see that you have a token, but your token has no longer access
        if(err) return res.send(403)
        req.user = user
        next()
    })

}
module.exports = AuthenticateToken;


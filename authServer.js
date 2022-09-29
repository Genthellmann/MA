//================================================
//user authentication
//================================================
require('dotenv').config()

const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')

//routes
const authRouter = require("./routes/auth.routes");

const AuthenticateToken = require("./middleware/AuthenticateToken");

// parse requests of content-type - application/json
app.use(express.json())

//parse requests from type -application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

// use cors

//================================================
//change when switching host
//================================================
const cors = require('cors')

// var corsOptions = {origin: "https://ux-trendradar.de"};
var corsOptions = {origin: "http://localhost:3000"};

app.use(cors(corsOptions))



//TO DO: Store refresh token in db
let refreshTokens = []

app.use("/login", authRouter)

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

//TO DO Delete Tokens from DB
app.delete('/logout', (req,res)=>{
    refreshTokens = refreshTokens.filter(token=> token !== req.body.token)
    //204 Sucessfully deleted
    res.sendStatus(204)
})

app.post('/login', (req, res) => {
    // Authenticate User

    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15000s' })
}

//connect to userdb
const user_db = require("./models/index.user")
user_db.sequelize.sync({alter: true}).then(()=>{
    console.log("Synced UserDB.");
})
    .catch((err)=>{
        console.log("Failed to sync UserDB: " + err.message);
    });

app.listen(4000)
const db = require("../models/index.user");
const User = db.user;
//There are lots of operators to use for the where clause, available as Symbols from Op
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require('dotenv').config()


exports.signup = (req,res) => {
    //Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(res.send({
            message: "User registered successfully!"
    }))
        .catch(err=>{
            res.status(500).send({ message: err.message });

        });
};

//TO DO: Store Tokens in DB
let refreshTokens = []

// const ACCESS_TOKEN_SECRET = "e8710474cda3213c6857c8fc98c93ebb928c88c9464f09d522892799af14e41e17397ab729f3ee1f364a1993f09df91723fd6f1195005cd8be22df315ad4c1f8"
//
// const REFRESH_TOKEN_SECRET = "f742c7fca74d9a443ecc3951eea89b55cee108a218ad2bb8fdcce338372fd6a397b32689f0953c6acc370d60077d0b7636cb9c5269d77c2a2b7386be40d34a4e"

exports.signin = (req,res) =>{
    User.findOne({
        where:{
            username: req.body.username
        },
        raw: true
    })
        .then(user => {
            if(!user){
                return res.status(404).send({message: "User Not Found!"});
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if(!passwordIsValid){
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            const accessToken = generateAccessToken(user)

            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            // const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET)

            refreshTokens.push(refreshToken)
            res.json({ id:user.id, username: user.username, email: user.email, accessToken: accessToken, refreshToken: refreshToken })
        }).catch(err => {
            res.status(500).send({message: err.message});
    });
};

// function generateAccessToken(user) {
//     return jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: '31536000s'})
// }

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '31536000s'})
}


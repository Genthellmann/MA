const db = require("../models/index.user");
const User = db.user;
//There are lots of operators to use for the where clause, available as Symbols from Op
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
            refreshTokens.push(refreshToken)
            res.json({ username: user.username, email: user.email, accessToken: accessToken, refreshToken: refreshToken })
        }).catch(err => {
            res.status(500).send({message: err.message});
    });
};

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}


//user authentication
require('dotenv').config()

const express = require("express");
const app = express();

//routes
const crudRouter = require("./routes/crud");
const img_web = require("./routes/web");
const position = require("./routes/position");

//database
const img_db = require("./models"); //connects to index.js in /models
const content_db = require("./models")

//Sync database
img_db.sequelize.sync({ alter: true }).then(() => {

    console.log("Synced db.");
})
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

//get a globally available reference to your app's root directory.
global.__basedir = __dirname;

// use cors
const cors = require('cors')
var corsOptions = { origin: "http://localhost:3000" };
app.use(cors(corsOptions))

//parse requests from type -application/json
app.use(express.json());

//parse requests from type -application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//routes
app.use("/crud", crudRouter);
app.use("/web", img_web);
app.use("/position", position);

//TO DO: remove later only for testing
//===============================
//get Authentication
const posts = [
    {
        username: 'Johannes',
        title: 'Post 1',
    },
    {
        username: 'Jim',
        title: 'Post 2',
    }
]
const AuthenticateToken = require("./middleware/AuthenticateToken");

app.get('/posts',AuthenticateToken, (req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})
//===============================



/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

//set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}.`);
});


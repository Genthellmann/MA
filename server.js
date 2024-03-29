//user authentication
require('dotenv').config()
let createError = require('http-errors');

const express = require("express");
const app = express();

//routes
const crudRouter = require("./routes/crud");
const img_web = require("./routes/web");
const position = require("./routes/position");
const projectRouter = require("./routes/project.routes");
const referenceRouter = require("./routes/reference.routes");
const explpictureRouter = require("./routes/explpicture.routes");
const rppictureRouter = require("./routes/rppicture.routes");
const vpaRouter = require("./routes/vpa.routes");
const benchmarkRouter = require("./routes/benchmark.routes");
const stratPosRouter = require("./routes/stratpos.routes");
const attributesRouter = require("./routes/attributes.routes");



//database
const db = require("./models"); //connects to index.js in /models

//Sync database

/*
User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync({ force: true }) - This creates the table, dropping it first if it already existed
User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
*/

db.sequelize.sync({ alter: true }).then(() => {

    console.log("Synced db.");
})
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

//get a globally available reference to your app's root directory.
global.__basedir = __dirname;

// use cors
const cors = require('cors')


//================================================
//change when switching host
//================================================

var corsOptions = { origin: "https://ux-trendradar.de"};
// var corsOptions = {origin: "http://localhost:3000"};


app.use(cors(corsOptions))

//parse requests from type -application/json
app.use(express.json());

//parse requests from type -application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//routes
app.use("/crud", crudRouter);
app.use("/web", img_web);
app.use("/position", position);
app.use("/projects", projectRouter);
app.use("/reference", referenceRouter);
app.use("/explpicture", explpictureRouter);
app.use("/rppicture", rppictureRouter);
app.use("/vpa", vpaRouter);
app.use("/benchmark", benchmarkRouter);
app.use("/stratpos", stratPosRouter);
app.use("/attributes", attributesRouter );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);

    //render error page
    res.status(statusCode).json({ message: err.message });
    return;

});

//set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}.`);
});


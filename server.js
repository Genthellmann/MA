const express = require("express");
const app = express();

//routes
const crudRouter = require("./routes/crud");
const img_web = require("./routes/web");


//img database
const img_db = require("./models");


//get a globally available reference to your app's root directory.
global.__basedir = __dirname;

// const corsOption = {
//     origin: "http://localhost:3000"
// };

// app.use(cors(corsOption));
var cors = require('cors')
app.use(cors())

//parse requests from type -application/json
app.use(express.json());

//parse requests from type -application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//simple route
// app.get("/",(req,res)=>{
//     res.json({message:"Welcome to Trend Application!"});
// });

app.use("/crud", crudRouter);
app.use("/web", img_web);
// app.use("/upload", img_web)

// For image upload
// app.use("/web", img_web);
// const initRoutes = require("./routes/web");
// initRoutes(app);

// // img_db.sequelize.sync();
// img_db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

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


const express = require("express");
const app = express();
const crudRouter = require("./routes/crud");
var cors = require('cors')


// const corsOption = {
//     origin: "http://localhost:3000"
// };
// app.use(cors(corsOption));

app.use(cors())

//parse requests from type -application/json
app.use(express.json());

//parse requests from type -application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//simple route
app.get("/",(req,res)=>{
    res.json({message:"Welcome to Thellmann application!"});
});

app.use("/crud", crudRouter);
//require("./routes/crud.js")(app);

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


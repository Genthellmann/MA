// trend object here, and use the database connection for the CRUD functions
// create a new Trend
// find a Trend by id
// get all Trends
// get all Trends by Condition
// update a Trend by id
// remove a Trend
// remove all Trends

const sql = require("./db.js");

//constructor
const Trend = function(trend){
    this.title = trend.title;
    this.description = trend.description;
};

Trend.create = (newTrend, result) => {
    sql.query("INSERT INTO Content SET ?", newTrend, (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        console.log("created trend: ", {id: res.insertId, ...newTrend})
        result(null, {id: res.insertId, ...newTrend });
    });
};

Trend.findById = (id,result) =>{
    sql.query(`SELECT * FROM Content WHERE id = ${id}`, (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        if (res.length) {
            console.log("found trend: ", res[0]);
            result(null, res[0]);
            return;
        }
        // trend not found
        result({ kind: "not_found" }, null);
    });
};

Trend.getAll = (title, result) => {
    let query = "SELECT * FROM Content";
    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("trend: ", res);
        result(null, res);
    });
};
Trend.getAllCond = result => {
    sql.query("SELECT * FROM Content WHERE Cond=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("trend: ", res);
        result(null, res);
    });
};
Trend.updateById = (id, trend, result) => {
    sql.query(
        "UPDATE Content SET title = ?, description = ? WHERE id = ?",
        [trend.title, trend.description, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated trend: ", { id: id, ...trend });
            result(null, { id: id, ...trend });
        }
    );
};
Trend.remove = (id, result) => {
    sql.query("DELETE FROM Content WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted trend: ", id);
        result(null, res);
    });
};
Trend.removeAll = result => {
    sql.query("DELETE FROM Content", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} trends`);
        result(null, res);
    });
};
module.exports = Trend;

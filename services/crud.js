// trend object here, and use the database connection for the CRUD functions
// create a new Trend
// find a Trend by id
// get all Trends
// get all Trends by Condition
// update a Trend by id
// remove a Trend
// remove all Trends

const helper_pos = require("./helper_pos");

const sql = require("./db.js");
const Console = require("console");


//constructor
const Trend = function(trend){
    this.title = trend.title;
    this.description = trend.description;
    this.implication = trend.implication;
    this.category = trend.category;
    this.probability = trend.probability;
    this.impact = trend.impact;
    this.maturity = trend.maturity;
    this.picture = trend.picture;
    this.xpos = null;
    this.ypos = null;


    // let position = helper_pos(trend.category,trend.probability);
    // console.log("constructor " + position[0])
    //
    // this.xpos = position[0];
    // this.ypos = position[1];
};

Trend.create = (newTrend, result) => {
    let position = helper_pos(newTrend.category,newTrend.probability);
    //console.log("constructor " + position[0])

    newTrend.xpos = position[0];
    newTrend.ypos = position[1];

    sql.query("INSERT INTO Content SET ?", newTrend, (err,res)=>{
        console.log("sql: " + newTrend)
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
    let position = helper_pos(trend.category,trend.probability);
    //console.log("constructor " + position[0])

    trend.xpos = position[0];
    trend.ypos = position[1];

    Console.log(trend.picture)

    sql.query(
        "UPDATE Content SET title = ?, description = ?, implication = ?, category = ?, probability = ?, maturity = ?, impact = ?, xpos=?, ypos=? WHERE id = ?",
        [trend.title, trend.description,trend.implication, trend.category, trend.probability, trend.maturity, trend.impact, trend.xpos, trend.ypos, id],
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

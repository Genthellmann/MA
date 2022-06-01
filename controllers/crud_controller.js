const Trend = require("../services/crud.js");

// Create/save trend
exports.create = (req, res) => {
    //Validate request
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }
    //create Trend
    const trend = new Trend({
        title: req.body.title,
        description: req.body.description,
        probability: req.body.probability,
        category: req.body.category,
        maturity: req.body.maturity,
        impact: req.body.impact,
    });
    //Save trend in db
    Trend.create(trend,(err,data)=>{
        if(err)
            res.status(500).send({
                message:err.message || "Error while creating trend"
            });
        else res.send(data);
    })
};
// Retrieve trend from db with condition
exports.findAll = (req, res) => {
    const title = req.query.title;
    Trend.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error while retrieving trend"
            });
        else res.send(data);
    });
};
// Find single trend with ID
exports.findOne = (req, res) => {
    Trend.findById(req.params.id,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Trend id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving trend id" + req.params.id
                });
            }
        } else res.send(data);
    });
};

// find all trends with condition
exports.findAllPublished = (req, res) => {

};
// Update trend
exports.update = (req, res) => {
    //request valid?
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        });
    }
    console.log(req.body);
    Trend.updateById(req.params.id, new Trend(req.body), (err,data)=>{
        if(err){
            if(err === "not_found"){
                res.status(404).send({
                    message: `Not found trend id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating trend id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Trend.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Trend id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Trend id " + req.params.id
                });
            }
        } else res.send({ message: `Trend deleted successfully!` });
    });

};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Trend.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
};

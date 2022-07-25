const db = require("../models")
// const {DataTypes} = require("@sequelize/core/types");
const Trend = db.content;
const {Op} = require("sequelize")
const helper_pos = require("../middleware/helper_pos");

exports.create = (req,res) => {

    //Validate request
    if(!req.body.title){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    //Create Trend
    let position = helper_pos(req.body.category,req.body.probability);

    let x_pos = position[0];
    let y_pos = position[1];

    const trend = {
            title:req.body.title,
            description:req.body.description,
            implication:req.body.implication,
            probability:req.body.probability,
            impact:req.body.impact,
            maturity:req.body.maturity,
            category:req.body.category,
            project: req.body.project,
            xpos: x_pos,
            ypos: y_pos,
    };
    //save Trend to db
    Trend.create(trend)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error while creating Trend"
            });
        });
};

// exports.findAll = (req, res) => {
//     console.log(req.query.title)
//     const title = req.query.title;
//     var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
//     console.log(condition)
//     Trend.findAll({ where: condition })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Error occurred while retrieving Trend."
//             });
//         });
// };


//find all trends belonging to project with id:
exports.findAll = (req, res) => {
    console.log("query")
    console.log(req.query.project)
    const project = req.query.project;
    var condition =  { project: { [Op.eq]: project } };
    console.log(condition)
    Trend.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving Trend."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Trend.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Trend with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Trend with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Trend.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Trend updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Trend with id=${id}. Maybe Trend not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Trend with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Trend.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Trend deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Trend with id=${id}. Maybe Trend not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Trend with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    console.log("query")
    console.log(req.query)
    const project = req.query.project;
    var condition =  { project: { [Op.eq]: project } };
    Trend.destroy({
        where: condition,
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Trends deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while removing all Trends."
            });
        });
};



//const Trend = require("../services/crud.js");

// // Create/save trend
// exports.create = (req, res) => {
//     //Validate request
//     if(!req.body){
//         res.status(400).send({
//             message:"Content can not be empty!"
//         });
//     }
//
//     //create Trend
//     const trend = new Trend({
//         title: req.body.title,
//         description: req.body.description,
//         implication: req.body.implication,
//         probability: req.body.probability,
//         category: req.body.category,
//         maturity: req.body.maturity,
//         impact: req.body.impact,
//         xpos: req.body.xpos,
//         ypos: req.body.ypos,
//     });
//     //Save trend in db
//     Trend.create(trend,(err,data)=>{
//         if(err)
//             res.status(500).send({
//                 message:err.message || "Error while creating trend"
//             });
//         else res.send(data);
//     })
// };
//
// // Retrieve trend from db with condition
// exports.findAll = (req, res) => {
//     const title = req.query.title;
//     Trend.getAll(title, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message: err.message || "Error while retrieving trend"
//             });
//         else res.send(data);
//     });
// };
//
// // Find single trend with ID
// exports.findOne = (req, res) => {
//     Trend.findById(req.params.id,(err,data)=>{
//         if(err){
//             if(err.kind === "not_found"){
//                 res.status(404).send({
//                     message: `Not found Trend id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error retrieving trend id" + req.params.id
//                 });
//             }
//         } else res.send(data);
//     });
// };
//
//
// // find all trends with condition
// exports.findAllCond = (req, res) => {
//     if(!req.body){
//         res.status(400).send({
//             message: "Content can not be empty"
//         });
//     }
//     console.log(req.body)
//     Trend.getAllCond(req, (err, data)=>{
//         if(err){
//             console.log(err)
//             res.send(500)
//         }else res.send(data)
//     })
// };
//
// // Update trend
// exports.update = (req, res) => {
//     //request valid?
//     if(!req.body){
//         res.status(400).send({
//             message: "Content can not be empty"
//         });
//     }
//     Trend.updateById(req.params.id, new Trend(req.body), (err,data)=>{
//         if(err){
//             if(err === "not_found"){
//                 res.status(404).send({
//                     message: `Not found trend id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error updating trend id " + req.params.id
//                 });
//             }
//         } else res.send(data);
//     });
// };
// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     Trend.remove(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Trend id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Could not delete Trend id " + req.params.id
//                 });
//             }
//         } else res.send({ message: `Trend deleted successfully!` });
//     });
//
// };
// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     Trend.removeAll((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all tutorials."
//             });
//         else res.send({ message: `All Tutorials were deleted successfully!` });
//     });
// };

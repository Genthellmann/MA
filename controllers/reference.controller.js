const db = require("../models")
const Reference = db.reference;
const sequelize = db.sequelize;
const {Op, QueryTypes} = require("sequelize")

exports.create = (req,res) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // console.log("create token " + token)

    //Validate request
    if(!req.body.rproduct){
        res.status(400).send({
            message: "Reference Product can not be empty!"
        });
        return;
    }

    console.log(req.body)

    const reference = {
        trendID: req.body.trendID,
        rproduct: req.body.rproduct,
        rsystemelements: req.body.rsystemelements,
        usabilityattributes: req.body.usabilityattributes,
        prior: req.body.prior,
    }
    //save Project to db
    Reference.create(reference)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while creating Reference Product."
            });
        });
};

// exports.create = (req,res) => {
//     // const authHeader = req.headers['authorization']
//     // const token = authHeader && authHeader.split(' ')[1]
//     // console.log("create token " + token)
//
//     //Validate request
//     if(!req.body.rproduct){
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//         return;
//     }
//
//     console.log(req.body)
//
//     const reference = {
//         trendID: req.body.trendID,
//         rproduct: req.body.rproduct,
//         rsystemelements: req.body.rsystemelements,
//         usabilityattributes: req.body.usabilityattributes,
//     }
//     //save Project to db
//     Reference.upsert(reference)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Error while creating Reference Product."
//             });
//         });
// };


exports.update = (req, res) => {
    const id = req.params.id;
    console.log(req.params.id)
    Reference.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reference Product updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Reference Product for Trend with id=${id}. Maybe Trend not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Reference Product for Trend with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Reference.destroy({
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

exports.findAll = (req, res) => {
    console.log("query")
    console.log(req.params.id)
    const trendID = req.params.id;
    var condition =  { trendID: { [Op.eq]: trendID } };
    Reference.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving Reference Product."
            });
        });
};

exports.findOne = (req, res) => {
    console.log("query")
    console.log(req.params.id)
    const refID = req.params.id;
    Reference.findByPk(refID)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    `Error occurred while retrieving Reference id=${refID}.`
            });
        });
};

exports.deleteAll = async(req,res)=>{
    console.log("query")
    console.log(req.query.trend)
    const trend = req.query.trend;
    var condition =  { trend: { [Op.eq]: trend } };
    Reference.destroy({ where: condition })
        .then(num => {
            if (num >= 1) {
                res.send({
                    message: "References deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete References at Trend with id=${id}. Maybe Trend not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete References of Trend with id=" + id
            });
        });
};
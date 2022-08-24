const db = require("../models")
const Benchmark = db.benchmark;
const sequelize = db.sequelize;
const {Op, QueryTypes} = require("sequelize")

exports.create = (req,res) => {
    //Validate request
    if(!req.body.ux){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const benchmark = {
        trendID: req.body.trendID,
        ux: req.body.ux,
        rse: req.body.rse,
    }
    //save Project to db
    Benchmark.create(benchmark)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while creating  Benchmark."
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    console.log(id)
    Benchmark.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Benchmark updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Benchmark id=${id}. Maybe Benchmark not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Benchmark with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Benchmark.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Benchmark deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Benchmark with id=${id}. Maybe Benchmark not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Benchmark with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    console.log(req.params)
    const trendID = req.params.id;
    var condition =  { trendID: { [Op.eq]: trendID } };
    Benchmark.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving Benchmarks."
            });
        });
};

// exports.findOne = (req, res) => {
//     console.log("query")
//     console.log(req.params.id)
//     const refID = req.params.id;
//     Reference.findByPk(refID)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     `Error occurred while retrieving Reference id=${refID}.`
//             });
//         });
// };
//
// exports.deleteAll = async(req,res)=>{
//     console.log("query")
//     console.log(req.query.trend)
//     const trend = req.query.trend;
//     var condition =  { trend: { [Op.eq]: trend } };
//     Reference.destroy({ where: condition })
//         .then(num => {
//             if (num >= 1) {
//                 res.send({
//                     message: "References deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete References at Trend with id=${id}. Maybe Trend not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete References of Trend with id=" + id
//             });
//         });
// };
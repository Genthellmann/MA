const db = require("../models")
const StratPos = db.stratpos;
const sequelize = db.sequelize;
const {Op, QueryTypes} = require("sequelize")

// exports.create = (req,res) => {
//     //Validate request
//     if(!req.body.ux){
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//         return;
//     }
//     const benchmark = {
//         trendID: req.body.trendID,
//         ux: req.body.ux,
//         rse: req.body.rse,
//     }
//     //save Project to db
//     Benchmark.create(benchmark)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Error while creating  Benchmark."
//             });
//         });
// };


exports.update = (req, res) => {
    const id = req.body.trendID;
    console.log(id)
    StratPos.upsert( {
        trendID: req.body.trendID,
        content: req.body.content,
    })
        .then(([rppicture, created]) => {
            res.send({
                message: "Strategic Positioning created: " + created + " with ID: " + id
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Strategic Positioning with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    StratPos.destroy({
        where: { trendID: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Strategic Positioning deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Strategic Positioning with id=${id}. Maybe Strategic Positioning not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Strategic Positioning with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    console.log(req.params)
    const trendID = req.params.id;
    var condition =  { trendID: { [Op.eq]: trendID } };
    StratPos.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving Strategic Positioning."
            });
        });
};


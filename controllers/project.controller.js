const db = require("../models")
const Project = db.project;
const sequelize = db.sequelize;
const {Op, QueryTypes} = require("sequelize")
const helper_pos = require("../middleware/helper_pos");

exports.create = (req,res) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // console.log("create token " + token)

    //Validate request
    if(!req.body.title){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const project = {
        title:req.body.title,
        description:req.body.description,
        users:req.body.users,
    };
    //save Project to db
    Project.create(project)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while creating Project"
            });
        });
};

// exports.findAll = (req, res) => {
//     console.log(req.query.title)
//     const title = req.query.title;
//     var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
//     console.log(condition)
//     Project.findAll({ where: condition })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Error occurred while retrieving Project."
//             });
//         });
// };

exports.findAll = (req, res) => {
    console.log(req.params)
    let sql = `select * from projects where  ${req.params.id} member of (users->"$.users[*].id")`;
    sequelize.query(sql,
        {
        type: QueryTypes.SELECT
        }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving Project."
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    Project.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Project updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Project with id=${id}. Maybe Project not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Project with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Project.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Project deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Project with id=${id}. Maybe Benchmark not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Project with id=" + id
            });
        });
};


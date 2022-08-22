const db = require("../models")
const Vpa = db.vpa;
const sequelize = db.sequelize;
const {Op, QueryTypes} = require("sequelize")

exports.create = (req,res) => {
    //Validate request
    if(!req.body.content){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const vpa = {
        content:req.body.content,
        trendID:req.body.trendID,
        xpos: req.body.xpos,
        ypos: req.body.ypos,
    };
    //save Project to db
    Vpa.create(vpa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error while creating Vpa element"
            });
        });
};


exports.findAll = (req, res) => {
    const id = req.params.id
    Vpa.findAll({
        where: {
            trendID : id,
    }}).then(result => res.json(result))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving Vpa element."
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    Vpa.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vpa element updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vpa element with id=${id}. Maybe Vpa element not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vpa element with id=" + id
            });
        });
};


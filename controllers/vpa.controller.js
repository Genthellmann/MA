const db = require("../models")
const Vpa = db.vpa;
const sequelize = db.sequelize;
const {Op, QueryTypes} = require("sequelize")

exports.create = (req,res) => {
    //Validate request
    if(!req.body.trendID){
        res.status(400).send({
            message: "Trend ID has to be set"
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

exports.bulkUpdate = (req, res) => {
    Vpa.bulkCreate(req.body, {
        updateOnDuplicate: ["id", "content", "trendID", "xpos", "ypos"]
    })
        .then(result => res.json(result))
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vpa elements with id=" + id
            });
        });
}


exports.multipleDelete = (req, res) => {
    console.log(req.headers)
    console.log(req.data)
    console.log(req.body)
    const ids = req.body.ids
    console.log(ids)
    Vpa.destroy({
        where: { id: ids }
    })
        .then(result => res.json(result))
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Vpa element with id=" + ids
            });
        });
}


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


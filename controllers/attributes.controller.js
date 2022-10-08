const db = require("../models")
const Attribute = db.attribute;
const sequelize = db.sequelize;
const {Op, QueryTypes} = require("sequelize")


exports.findAll = (req, res) => {
    const id = req.params.id
    Attribute.findAll({
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
    Attribute.bulkCreate(req.body, {
        updateOnDuplicate: ["id", "trendID", "title"]
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
    Attribute.destroy({
        where: { id: ids }
    })
        .then(result => res.json(result))
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Vpa element with id=" + ids
            });
        });
}
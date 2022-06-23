const db = require("../models");
const Image = db.images;

const returnFiles = async (req, res) => {
    try {
        console.log("req query" + req.query.trendID)
        Image.findAll({
            where: {
                trendID: req.query.trendID,
            }
        }).then((result) => res.json(result))
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying to return image: ${error}`);
    }
};
module.exports = {returnFiles};
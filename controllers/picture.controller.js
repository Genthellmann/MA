const fs = require("fs");
const db = require("../models");
const Image = db.images;

exports.uploadFiles = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send({ message: "You must select a file."});
        }
        Image.upsert({
            type: req.file.mimetype,
            name: req.file.originalname,
            trendID: req.query.trendID,
            data: fs.readFileSync(
                __basedir + "/resources/static/assets/uploads/" + req.file.filename
            ),
        }).then(([image, created]) => {
            fs.writeFileSync(
                __basedir + "/resources/static/assets/tmp/" + image.name,
                image.data
            );
            return res.send("File upload sucessful.");
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

exports.returnFiles = async (req, res) => {
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

exports.delete = async (req,res) =>{
    try{
        Image.destroy({
            where: {
                trendID: req.query.trendID,
            }
        }).then(res.send(`picture deleted ID: ${req.query.trendID}`))
    } catch(error){
        console.log(error);
        return res.send(`Error when trying to delete image: ${error}`);
    }
};

exports.deleteAll = async(req,res)=>{
    try{
        Image.destroy({
            truncate: true
        }).then(res.send("All pictures deleted. Table empty!"))
    }catch(error) {
        console.log(error);
        return res.send(`Error when trying to delete image: ${error}`);
    }

};
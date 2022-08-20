const fs = require("fs");
const db = require("../models");
const Explpicture = db.explpicture;

exports.uploadPicture = async (req, res) => {
    console.log(req.file)
    try {
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }
        Explpicture.upsert({
            type: req.file.mimetype,
            name: req.file.originalname,
            trendID: req.query.trendID,
            refID: req.query.refID,
            data: fs.readFileSync(
                __basedir + "/resources/static/assets/uploads/" + req.file.filename
            ),
        }).then(([explpicture, created]) => {
            fs.writeFileSync(
                __basedir + "/resources/static/assets/tmp/" + explpicture.name,
                explpicture.data
            );
            return res.send("File upload sucessful.");
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

exports.returnPicture = async (req, res) => {
    try {
        console.log("req query" + req.query.trendID)
        Explpicture.findAll({
            where: {
                trendID: req.query.trendID,
            }
        }).then((result) => res.json(result))
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying to return image: ${error}`);
    }
};

exports.returnOnePicture = async (req, res) => {
    const id = req.params.id;
    try {
        Explpicture.findByPk(id)
            .then((result) => res.json(result))
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying to return image: ${error}`);
    }
};

exports.deletePicture = async (req,res) =>{
    const id = req.params.id
    try{
        Explpicture.destroy({
            where: {
                refID: id,
            }
        }).then(res.send(`picture deleted ID: ${id}`))
    } catch(error){
        console.log(error);
        return res.send(`Error when trying to delete image ID: ${id}`);
    }
};

exports.deleteAllPictures = async(req,res)=>{
    try{
        Explpicture.destroy({
            truncate: true
        }).then(res.send("All pictures deleted. Table empty!"))
    }catch(error) {
        console.log(error);
        return res.send(`Error when trying to delete image: ${error}`);
    }

};
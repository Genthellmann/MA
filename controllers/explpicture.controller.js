const fs = require("fs");
const db = require("../models");
const Explpicture = db.explpicture;

exports.uploadPicture = async (req, res) => {
    console.log(req.file)
    try {
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }
        Explpicture.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            trendID: req.query.trendID,
            refID: req.query.refID,
            data: fs.readFileSync(
                __basedir + "/resources/static/assets/uploads/" + req.file.filename
            ),
        }).then((explpicture) => {
            fs.writeFileSync(
                __basedir + "/resources/static/assets/tmp/" + explpicture.name,
                explpicture.data
            );
            return res.send(`File has been uploaded.`);
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

exports.deletePicture = async (req,res) =>{
    try{
        Explpicture.destroy({
            where: {
                trendID: req.query.trendID,
            }
        }).then(res.send(`picture deleted ID: ${req.query.trendID}`))
    } catch(error){
        console.log(error);
        return res.send(`Error when trying to delete image: ${error}`);
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
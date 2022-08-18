const fs = require("fs");
const db = require("../models");
const {query} = require("express");
const Rppicture = db.rppicture;

exports.uploadPicture = async (req, res) => {

    try {
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }
        Rppicture.upsert({
            type: req.file.mimetype,
            name: req.file.originalname,
            trendID: req.query.trendID,
            refID: req.query.refID,
            data: fs.readFileSync(
                __basedir + "/resources/static/assets/uploads/" + req.file.filename
            ),
        }).then(([rppicture, created]) => {
            fs.writeFileSync(
                __basedir + "/resources/static/assets/tmp/" + rppicture.name,
                rppicture.data
            );
            return res.send(`File has been uploaded: ` + created);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

exports.returnPicture = async (req, res) => {
    try {
        console.log("req query" + req.query.trendID)
        Rppicture.findAll({
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
        Rppicture.destroy({
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
        Rppicture.destroy({
            truncate: true
        }).then(res.send("All pictures deleted. Table empty!"))
    }catch(error) {
        console.log(error);
        return res.send(`Error when trying to delete image: ${error}`);
    }
};
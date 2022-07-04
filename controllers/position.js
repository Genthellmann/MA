const db = require("../models")
PositionModel = db.content;

//find trend with id and return position
exports.findOne =  (req, res) => {
    const id = req.params.id;
    console.log(id)
    PositionModel.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }else {
                res.status(404).send({
                    message: `Cannot find Trend Position with id=${id}.`
                });
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message: "Error retrieving Trend position with id=" + id
            });
        });
};

//update position of trend with id
exports.update=(req,res)=>{
    const id = req.params.id;
    console.log("id update: " + id)
    console.log(req.body)
    PositionModel.update(req.body, {
        where:{id: id}
    }).then(num=>{
        if (num == 1) {
            res.send({
                message: "Trend Position updated sucessfully."
            });
        } else{
                res.send({
                    message: `Cannot update Trend Position with id=${id}. Tutorial not found or req.body is empty...`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Trend with id=" + id
            });
        });
};
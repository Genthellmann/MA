const router = require("express").Router();


const VpaController = require("../controllers/vpa.controller")
const AuthenticateToken = require("../middleware/AuthenticateToken");


// get all Vpa elements for trend with id
router.get("/:id", AuthenticateToken, VpaController.findAll);

//create new Vpa element for trend with id
router.post("", AuthenticateToken, VpaController.create);

//update Vpa element with id
router.put("/:id", AuthenticateToken, VpaController.update);

module.exports = router;
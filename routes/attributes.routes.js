const router = require("express").Router();


const AttributesController = require("../controllers/attributes.controller")
const AuthenticateToken = require("../middleware/AuthenticateToken");


// get all Attribute elements for trend with id
router.get("/:id", AuthenticateToken, AttributesController.findAll);

//create/updatemultiple
router.post("/multiple", AuthenticateToken, AttributesController.bulkUpdate);

//delete multiple
router.post("/deleteMultiple", AuthenticateToken, AttributesController.multipleDelete)

module.exports = router;
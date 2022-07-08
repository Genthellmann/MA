const router = require("express").Router();
const position = require("../controllers/position.js");
const AuthenticateToken = require("../middleware/AuthenticateToken");

//get Trend position
router.get("/:id", AuthenticateToken, position.findOne);

//post position update
router.put("/:id", AuthenticateToken, position.update);


module.exports = router;
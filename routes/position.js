const router = require("express").Router();
const position = require("../controllers/position.js");

//get Trend position
router.get("/:id", position.findOne);

//post position update
router.put("/:id", position.update);


module.exports = router;
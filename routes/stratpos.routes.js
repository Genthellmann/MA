const router = require("express").Router();
const stratposController = require("../controllers/stratpos.controller");
const AuthenticateToken = require("../middleware/AuthenticateToken");

// // Create a new benchmark
// router.post("", AuthenticateToken, benchmarkController.create);

// Update benchmark with id
router.put("", AuthenticateToken, stratposController.update);

// delete benchmark with id
router.delete("/:id", AuthenticateToken, stratposController.delete);

// Retrieve all benchmarks for trend with id
router.get("/:id", AuthenticateToken, stratposController.findAll);


module.exports = router;
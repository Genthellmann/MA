const router = require("express").Router();
const benchmarkController = require("../controllers/benchmark.controller");
const AuthenticateToken = require("../middleware/AuthenticateToken");

// Create a new benchmark
router.post("", AuthenticateToken, benchmarkController.create);

// Update benchmark with id
router.put("/:id", AuthenticateToken, benchmarkController.update);

// delete benchmark with id
router.delete("/:id", AuthenticateToken, benchmarkController.delete);

// Retrieve all benchmarks for trend with id
router.get("/all/:trendID", AuthenticateToken, benchmarkController.findAll);

// // Retrieve all reference with id
// router.get("/:id", AuthenticateToken, referenceController.findOne);


module.exports = router;
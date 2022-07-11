const router = require("express").Router();
const crud = require("../controllers/crud_controller.js");
const AuthenticateToken = require("../middleware/AuthenticateToken");

// Create a new Trend
router.post("/", AuthenticateToken, crud.create);

// Retrieve all Trend
router.get("/", AuthenticateToken, crud.findAll);

// // Retrieve all published Trends
// router.get("/published", crud.findAllPublished);

// Retrieve a single Trend with id
router.get("/:id", AuthenticateToken, crud.findOne);

// //Retrieve Trend with condition
router.post("/cond", AuthenticateToken, crud.findAllCond);

// Update a Trend with id
router.put("/:id", AuthenticateToken, crud.update);

// Delete a Trend with id
router.delete("/:id", AuthenticateToken, crud.delete);

// Delete all Trends
router.delete("/", AuthenticateToken, crud.deleteAll);

module.exports = router;
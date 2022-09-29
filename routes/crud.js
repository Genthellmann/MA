const router = require("express").Router();
const crud = require("../controllers/crud_controller.js");
const AuthenticateToken = require("../middleware/AuthenticateToken");

// Create a new Trend
router.post("/", AuthenticateToken, crud.create);

// Retrieve all Trends
router.get("/", crud.findAll);

// Retrieve a single Trend with id
router.get("/:id", AuthenticateToken, crud.findOne);

// Update a Trend with id
router.put("/:id", AuthenticateToken, crud.update);

// Delete a Trend with id
router.delete("/:id", AuthenticateToken, crud.delete);

// Delete all Trends
router.delete("/", AuthenticateToken, crud.deleteAll);

module.exports = router;
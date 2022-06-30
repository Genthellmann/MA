const router = require("express").Router();
const crud = require("../controllers/crud_controller.js");

// Create a new Trend
router.post("/", crud.create);

// Retrieve all Trend
router.get("/", crud.findAll);

// // Retrieve all published Trends
// router.get("/published", crud.findAllPublished);

// Retrieve a single Trend with id
router.get("/:id", crud.findOne);

// Update a Trend with id
router.put("/:id", crud.update);

// Delete a Trend with id
router.delete("/:id", crud.delete);

// Delete all Trends
router.delete("/", crud.deleteAll);

module.exports = router;
const router = require("express").Router();
const project = require("../controllers/project.controller.js");
const AuthenticateToken = require("../middleware/AuthenticateToken");

// Create a new Project
router.post("/", AuthenticateToken, project.create);

// Retrieve all Project for User
router.get("/:id", AuthenticateToken, project.findAll);

// Update Project properties, i.e. who has access to project
//Also delete project for specific user
router.put("/:id", AuthenticateToken, project.update);

router.delete("/:id", AuthenticateToken, project.delete)

// // Retrieve a single Trend with id
// router.get("/:id", AuthenticateToken, crud.findOne);
//
// // Delete a Trend with id
// router.delete("/:id", AuthenticateToken, crud.delete);
//
// // Delete all Trends
// router.delete("/", AuthenticateToken, crud.deleteAll);

module.exports = router;
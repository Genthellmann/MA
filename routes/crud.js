const router = require("express").Router();
const crud = require("../controllers/crud_controller.js");

// Create a new Tutorial
router.post("/", crud.create);

// Retrieve all Tutorials
router.get("/", crud.findAll);

// Retrieve all published Tutorials
router.get("/published", crud.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", crud.findOne);

// Update a Tutorial with id
router.put("/:id", crud.update);

// Delete a Tutorial with id
router.delete("/:id", crud.delete);

// Delete all Tutorials
router.delete("/", crud.deleteAll);

//app.use('/app/tutorials', router);


module.exports = router;
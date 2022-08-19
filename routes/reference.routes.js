const router = require("express").Router();
const referenceController = require("../controllers/reference.controller.js");
const AuthenticateToken = require("../middleware/AuthenticateToken");

// Create a new reference product
router.post("/", AuthenticateToken, referenceController.create);

// Update reference product with id
router.put("/:id", AuthenticateToken, referenceController.update);

// delete reference product with id
router.delete("/:id", AuthenticateToken, referenceController.delete);

// Retrieve all reference products for trend with id
router.get("/all/:id", AuthenticateToken, referenceController.findAll);

// Retrieve all reference with id
router.get("/:id", AuthenticateToken, referenceController.findOne);


module.exports = router;
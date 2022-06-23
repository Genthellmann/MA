const router = require("express").Router();

const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const returnController = require("../controllers/return");
const upload = require("../middleware/upload");

// router.get("/home", homeController.home);
router.get("/upload", returnController.returnFiles);
router.post("/upload", upload.single("file"), uploadController.uploadFiles);

module.exports = router;

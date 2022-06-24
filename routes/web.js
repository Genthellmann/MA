const router = require("express").Router();
const upload = require("../middleware/upload");

const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const returnController = require("../controllers/return");

const pictureController = require("../controllers/picture")


// router.get("/home", homeController.home);
router.get("/upload", pictureController.returnFiles);
router.post("/upload", upload.single("file"), pictureController.uploadFiles);
router.delete("/upload", pictureController.delete);
router.delete("/", pictureController.deleteAll)
module.exports = router;

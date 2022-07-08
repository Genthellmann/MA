const router = require("express").Router();
const upload = require("../middleware/upload");

const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const returnController = require("../controllers/return");

const pictureController = require("../controllers/picture")
const AuthenticateToken = require("../middleware/AuthenticateToken");


// router.get("/home", homeController.home);
router.get("/upload", AuthenticateToken, pictureController.returnFiles);
router.post("/upload", AuthenticateToken, upload.single("file"), pictureController.uploadFiles);
router.delete("/upload", AuthenticateToken, pictureController.delete);
router.delete("/", AuthenticateToken, pictureController.deleteAll)
module.exports = router;

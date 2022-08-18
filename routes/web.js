const router = require("express").Router();
const upload = require("../middleware/upload");


const pictureController = require("../controllers/picture.controller")
const AuthenticateToken = require("../middleware/AuthenticateToken");


// router.get("/home", homeController.home);
router.get("/upload", AuthenticateToken, pictureController.returnFiles);
router.post("/upload", upload.single("file"), pictureController.uploadFiles);
router.delete("/upload", AuthenticateToken, pictureController.delete);
router.delete("/", AuthenticateToken, pictureController.deleteAll)
module.exports = router;

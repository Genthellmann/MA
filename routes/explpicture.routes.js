const router = require("express").Router();
const upload = require("../middleware/upload");


const explpictureController = require("../controllers/explpicture.controller")
const AuthenticateToken = require("../middleware/AuthenticateToken");


// router.get("/home", homeController.home);
//get / create / delete  explpicture for reference product id
router.get("", AuthenticateToken, explpictureController.returnPicture);
router.post("", upload.single("file"), explpictureController.uploadPicture);
router.delete("", AuthenticateToken, explpictureController.deletePicture);

// delete all picture for trend id:
router.delete("/all", AuthenticateToken, explpictureController.deleteAllPictures)

module.exports = router;
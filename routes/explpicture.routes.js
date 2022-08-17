const router = require("express").Router();
const upload = require("../middleware/upload");


const explpictureController = require("../controllers/explpicture.controller")
const AuthenticateToken = require("../middleware/AuthenticateToken");


// router.get("/home", homeController.home);
//get / create / delete  explpicture for reference product id
router.get("/:id", AuthenticateToken, explpictureController.returnPicture);
router.post("/:id", upload.single("file"), explpictureController.uploadPicture);
router.delete("/:id", AuthenticateToken, explpictureController.deletePicture);

// delete all picture for trend id:
router.delete("/all/:id", AuthenticateToken, explpictureController.deleteAllPictures)

module.exports = router;
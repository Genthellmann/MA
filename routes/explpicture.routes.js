const router = require("express").Router();
const upload = require("../middleware/upload");


const explpictureController = require("../controllers/explpicture.controller")
const AuthenticateToken = require("../middleware/AuthenticateToken");
const rppictureController = require("../controllers/rppicture.controller");


// router.get("/home", homeController.home);
//get / create / delete  explpicture for reference product id
router.get("", AuthenticateToken, explpictureController.returnPicture);
router.get("/:id", AuthenticateToken, explpictureController.returnOnePicture);

router.post("", upload.single("file"), explpictureController.uploadPicture);
router.delete("", AuthenticateToken, explpictureController.deletePicture);

// delete all picture for trend id:
router.delete("/all", AuthenticateToken, explpictureController.deleteAllPictures)

module.exports = router;
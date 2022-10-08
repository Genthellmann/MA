const router = require("express").Router();
const upload = require("../middleware/upload");


const rppictureController = require("../controllers/rppicture.controller")
const AuthenticateToken = require("../middleware/AuthenticateToken");


// router.get("/home", homeController.home);
//get / create / delete  explpicture for reference product id
router.get("", AuthenticateToken, rppictureController.returnPicture);

router.get("/:id", AuthenticateToken, rppictureController.returnOnePicture);

router.post("", upload.single("file"), rppictureController.uploadPicture);
router.delete("/:id", AuthenticateToken, rppictureController.deletePicture);

// delete all picture for trend id:
router.delete("/all", AuthenticateToken, rppictureController.deleteAllPictures)

module.exports = router;
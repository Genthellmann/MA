const router = require("express").Router();
const upload = require("../middleware/upload");


const rppictureController = require("../controllers/rppicture.controller")
const AuthenticateToken = require("../middleware/AuthenticateToken");


// router.get("/home", homeController.home);
//get / create / delete  explpicture for reference product id
router.get("/:id", AuthenticateToken, rppictureController.returnPicture);
router.post("/:id", upload.single("file"), rppictureController.uploadPicture);
router.delete("/:id", AuthenticateToken, rppictureController.deletePicture);

// delete all picture for trend id:
router.delete("/all/:id", AuthenticateToken, rppictureController.deleteAllPictures)

module.exports = router;
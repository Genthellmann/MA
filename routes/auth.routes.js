const router = require("express").Router();
const {verifySignUp} = require("../middleware/verifySignUp");

const auth_controller = require("../controllers/auth.controller");

router.post("/signup", auth_controller.signup);
router.post("/signin", auth_controller.signin);


module.exports = router;
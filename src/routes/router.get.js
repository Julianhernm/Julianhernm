const { Router } = require("express");
const controller = require("../controller/controller")


const router = Router();

router.get("/home", controller.home)
router.get("/", controller.home2)

module.exports = router
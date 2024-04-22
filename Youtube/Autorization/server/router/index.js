const userController = require("../controllers/user-controller");
const validation = require("../validations/main-validation");

const Router = require("express").Router

const router = Router();

router.post("/registration",validation.registration,userController.registration)
router.post("/login",userController.login)
router.post("/logout",userController.logout)
router.get("/activate/:link",userController.activate)
router.get("/refresh",userController.refresh)
router.get("/users",userController.getUsers)

module.exports = router
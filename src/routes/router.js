// const user_service = require("../services/user_service");
const MailService = require("./mailService.js")
const WbRoute_controller = require("./wbRoute_controller")

// const authMiddleware = require("../middlewares/auth-middleware")

const Router = require("express").Router
// console.log(UserRout_controller)
const router = new Router()

router.get("/sellerProducts", WbRoute_controller.sellerProducts)
router.get("/cardInfo", WbRoute_controller.cardInfo)

router.post("/sendGmail", MailService.sendToOwner)


// router.post("/candidate/exists", UserRout_controller.checkUser);

// router.post("/registration", UserRout_controller.registration);
// router.post("/login", UserRout_controller.login);
// router.post("/logout", UserRout_controller.logout);
// router.get("/refresh", UserRout_controller.refresh);
// router.get("/users", authMiddleware , UserRout_controller.getUsers)

module.exports = router

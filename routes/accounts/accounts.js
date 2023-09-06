const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed")
const controller = require("./accounts.controller");

//not wise to do a list of all the accounts, query certain results, or remove
router.route("/").get(controller.list).post(controller.post).all(methodNotAllowed);

router.route("/current").get(controller.current).all(methodNotAllowed)

router.route("/login").post(controller.login).all(methodNotAllowed);


module.exports = router;

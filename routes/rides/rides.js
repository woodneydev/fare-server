const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed")
const controller = require("./rides.controller");

router.route("/").post(controller.post).all(methodNotAllowed);

router.route("/specific/:id").get(controller.read).all(methodNotAllowed);

router.route("/:id").get(controller.listPendingRides).all(methodNotAllowed);

router.route("/:id/booked").get(controller.list).all(methodNotAllowed);

module.exports = router;
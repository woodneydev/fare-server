const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const controller = require("./accounts.controller");

router.route("/").get(controller.list).post(controller.post).all(methodNotAllowed);

router.route("/login").post(controller.token).all(methodNotAllowed);


module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const controller = require("./accounts.controller");

router.route("/").get(controller.list)

router.route("/login").post(controller.token)


module.exports = router;

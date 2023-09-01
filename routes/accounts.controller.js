const service = require("./accounts.service");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hasRequiredProperties = require("../utilities/hasRequiredProperties");
const hasValidProperties = require("../utilities/hasValidProperties");

// =============== Validation Middleware ===============

//List of valid properties for login
const validLoginProps = ["email", "password"];

const validateLoginProps = hasValidProperties(validLoginProps);
const hasProperties = hasRequiredProperties(validLoginProps);

const userExists = async (req, res, next) => {

    const {email} = req.body.data

    try {
        const user = await service.search(email);

        if (!user) {
            next({status: 400, message: "Invalid Email"});
        }

        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error)
        next({status: 500, message: "Internal Server Error"});
    }
}

const isPasswordValid = (req, res, next) => {
    const {password} = req.body.data;
    const {user} = res.locals;

    // const isPasswordCorrect = bcrypt.compareSync(password, user.password)

    // if (!isPasswordCorrect) {
    //     next({status: 400, message: "Invalid password"});
    // }

    const isPasswordCorrect = (password === user.password)
    if (!isPasswordCorrect) {
        next({status: 400, message: "Invalid password"});
    }
    console.log("password matched")
    next();
}

const issueToken = (req, res, next) => {
    const {user} = res.locals;

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    )

    res.status(200).json(token)
}


// =============== Route Handlers ===============

const list = async (req, res, next) => {
    try {
        const data = await service.list()
        res.status(200).json({data})
    } catch (error) {
        console.log(error)
        next({status: 500, message: "Internal Server Error"})
    }
}

module.exports = {
    list,
    token: [hasProperties, validateLoginProps, userExists, isPasswordValid, issueToken],
}
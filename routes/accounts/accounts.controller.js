const service = require("./accounts.service");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hasRequiredProperties = require("../../utilities/hasRequiredProperties");
const hasValidProperties = require("../../utilities/hasValidProperties");
const authorize = require("../../utilities/authorize");

// =============== Validation Middleware ===============

//List of valid properties for login
const validLoginProps = ["email", "password"];
const validSignUpProps = ["first_name", "last_name", "email", "password"];

const validateLoginProps = hasValidProperties(validLoginProps);
const hasLoginProperties = hasRequiredProperties(validLoginProps);

const validateSignUpProps = hasValidProperties(validSignUpProps);
const hasSignUpProps = hasRequiredProperties(validSignUpProps);

const userExists = async (req, res, next) => {

    const {email} = req.body.data;

    try {
        const user = await service.findUserByEmail(email);

        if (!user) {
            return next({status: 400, message: "Invalid Email"});
        }

        res.locals.user = user;
        return next();
    } catch (error) {
        console.log(error);
        return next({status: 500, message: "Internal Server Error"});
    }
}

const isPasswordValid = (req, res, next) => {
    const {password} = req.body.data;
    const {user} = res.locals;

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
        return next({status: 401, message: "Invalid password"});
    }
    
    return next();
}

const ensureUniqueEmail = async (req, res, next) => {
    const user = req.body.data;

    try {
        const exists = await service.findUserByEmail(user.email);
        
        if (exists) {
            return next({status: 400, message: "The email address entered is already in use"});
        }

        res.locals.user = user
        return next();
    } catch (error) {
        return next({status: 500, message: "Internal Server Error"});
    }
}

const getAuthUser = async (req, res, next) => {
    const {user} = req
    
    try {
        const data = await service.findUserByEmail(user.email);
        res.locals.user = data;
        next();
    } catch (error) {
        console.log(error);
        return next({status: 500, message: "Internal Server Error"})
    }
}

// =============== Route Handlers ===============

const list = async (req, res, next) => {
    try {
        const data = await service.list()
        res.status(200).json({data})
    } catch (error) {
        console.log(error)
        return next({status: 500, message: "Internal Server Error"})
    }
}

const issueToken = (req, res) => {
    const {user} = res.locals;

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    )

    res.status(200).json({token})
}

const post = async (req, res, next) => {
const {user} = res.locals
    const hashedPassword = bcrypt.hashSync(user.password);
    user.password = hashedPassword;
    try {
        const data = await service.add(user);
        res.status(201).json({data});
    } catch (error) {
        console.log(error);
        return next({status: 500, message: "Internal Server Error"});
    }
}

const send = (req, res, next) => {
    const {user} = res.locals;
    res.status(200).json({data: user});
}

module.exports = {
    list,
    login: [hasLoginProperties, validateLoginProps, userExists, isPasswordValid, issueToken],
    post: [validateSignUpProps, hasSignUpProps, ensureUniqueEmail, post],
    current: [authorize, getAuthUser, send]
}
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const bearerTokenString = req.headers.authorization;

    if (!bearerTokenString) {
        return next({status: 401, message: "Resource requires Bearer token in Authorization header"});
    }

    const splitBearerTokenString = bearerTokenString.split(" ");

    if (splitBearerTokenString.length !== 2) {
        return next({status: 400, message: "Bearer token is malformed"})
    }

    if (splitBearerTokenString[0] !== "Bearer") {
        return next({status: 400, message: "Bearer token is malformed"});
    }

    const token = splitBearerTokenString[1];

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return next({status: 401, message: "Invalid JWT"});
        }
        req.user = decoded
        next();
    });
}

module.exports = authorize;
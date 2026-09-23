const JWT = require('jsonwebtoken');

const signJWT = (payload, { expiresIn }) => {
    return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

const verifyJWT = (token) => {
    return JWT.verify(token, process.env.JWT_SECRET);
}
module.exports = { signJWT, verifyJWT }
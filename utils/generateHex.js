const { randomBytes } = require('crypto');
const genHex = (bytes) => {
    return randomBytes(bytes).toString('hex');
}
module.exports = genHex;
const sharp = require('sharp');

const toPFP = async (image) => {
    return await sharp(image.data)
        .resize({ height: 256, width: 256 })
        .webp()
        .toBuffer();
}
module.exports = toPFP

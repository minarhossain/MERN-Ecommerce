require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 8000;
const mongodbUrl = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017/MERN-ECOMMERCE';

const defaultImagePath = process.env.USER_DEFAULT_IMAGE || 'public/images/default.png';


module.exports = {
    serverPort,
    mongodbUrl,
    defaultImagePath
}
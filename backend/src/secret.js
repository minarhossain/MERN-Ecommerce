require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 8000;
const mongodbUrl = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017/MERN-ECOMMERCE';


module.exports = {
    serverPort,
    mongodbUrl
}
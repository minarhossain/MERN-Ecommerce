require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 8000;
const mongodbUrl = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017/MERN-ECOMMERCE';

const defaultImagePath = process.env.USER_DEFAULT_IMAGE || 'public/images/default.png';
const jsonSecretKey = process.env.JWT_ACTIVATION_KEY;

const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;

const clientURL = process.env.CLIENT_URL;
const uploadFile = process.env.UPLOAD_FILE || 'public/images/users';



module.exports = {
    serverPort,
    mongodbUrl,
    defaultImagePath,
    jsonSecretKey,
    smtpUser,
    smtpPassword,
    clientURL,
    uploadFile
}
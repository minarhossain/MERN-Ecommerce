const multer = require('multer');
const path = require('path');
const createError = require('http-errors');
const uploadFile = process.env.UPLOAD_FILE || 'public/images/users'; // which folder store the image means default path declaration

const maxFileSize = process.env.FILE_SIZE || 1024 * 1024 * 2; // max file size 2/3 mb
const allowedFileExtension = process.env.FILE_TYPE || ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'tif', 'tiff', 'svg', 'webp', 'ico', 'raw']; // which extension file will be upload sytem

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadFile)
    },
    filename: function (req, file, cb) {
        const extensionName = path.extname(file.originalname);

        cb(null, Date.now() + '-' + file.originalname.replace(extensionName, "") + extensionName)
    }
});

const fileFilter = (req, file, cb) => {
    const extensionName = path.extname(file.originalname);
    if (!allowedFileExtension.includes(extensionName.substring(1).toLowerCase())) {
        console.log("coming 1 -> ");
        return cb(createError(400, "File Type not allowed"));
    }
    return cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: maxFileSize },
    fileFilter
});

module.exports = upload;

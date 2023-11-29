// Using multer Upload image in public/images/users folder in same project 
const multer = require('multer');


const maxFileSize = process.env.FILE_SIZE || 1024 * 1024 * 2; // max file size 2/3 mb
const allowedFileExtension = process.env.FILE_TYPE || ['image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/bmp',
    'image/tif',
    'image/tiff',
    'image/svg+xml',
    'image/webp',
    'image/ico',
    'image/raw']; // which extension file will be upload sytem

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error('Only image files are allowed'), false);
    }
    if (file.size > maxFileSize) {
        return cb(new Error('File size exceeds maximum limit'), false);
    }
    if (!allowedFileExtension.includes(file.mimetype)) {
        return cb(new Error('File extension is not allowed'), false)
    }
    cb(null, true)

};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;





/* 

const storage = multer.disStorage(
{

    destination: function (req, file, cb) {
        cb(null, uploadFile)
    },
    filename: function (req, file, cb) {
        const extensionName = path.extname(file.originalname);

        cb(null, Date.now() + '-' + file.originalname.replace(extensionName, "") + extensionName)
    }
}
)


const fileFilter = (req, file, cb) => {
    const extensionName = path.extname(file.originalname);
    if (!allowedFileExtension.includes(extensionName.substring(1).toLowerCase())) {
        console.log("coming 1 -> ");
        return cb(createError(400, "File Type not allowed"));
    }
    return cb(null, true);
};
*/
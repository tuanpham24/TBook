
const util = require("util");
const path = require('path');
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "resources/static/assets/uploads");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;

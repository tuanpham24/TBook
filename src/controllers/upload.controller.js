
const uploadFile = require("../middlewares/upload.middleware");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";

const upload = async (req, res, next) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res
                .status(400)
                .json({ 
                    success: false,
                    message: "Please upload a file!" 
                });
        }
        console.log('file name', req.file.filename)
        console.log('file name', req.file.path)
        res.status(200).json({
            success: true,
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).json({
            success: false,
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res, next) => {
    const directoryPath = "/resources/static/assets/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        const fileInfos = [];

        console.log('files',files)

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).json({
            success: true,
            files: fileInfos
        });
    });
};

const download = (req, res, next) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

const remove = (req, res, next) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    fs.unlink(directoryPath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not delete the file. " + err,
            });
        }

        res.status(200).send({
            message: "File is deleted.",
        });
    });
};

const removeSync = (req, res, next) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    try {
        fs.unlinkSync(directoryPath + fileName);

        res.status(200).send({
            message: "File is deleted.",
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete the file. " + err,
        });
    }
};

module.exports = {
    upload,
    getListFiles,
    download,
    remove,
    removeSync,
};
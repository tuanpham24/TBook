
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/single', verifyToken, uploadController.upload);
// router.post('/list', verifyToken, uploadController.getListFiles);

module.exports = router;

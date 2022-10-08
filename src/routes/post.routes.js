
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const postController = require('../controllers/post.controller');

router.post('/create', verifyToken, postController.createOne);

module.exports = router;

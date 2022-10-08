
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const postController = require('../controllers/post.controller');

router.post('/create', verifyToken, postController.createOne);
router.get('/:id', verifyToken, postController.getOne);
router.put('/:id', verifyToken, postController.updateOne);
router.delete('/:id', verifyToken, postController.deleteOne);
router.get('/', verifyToken, postController.getAll);

module.exports = router;

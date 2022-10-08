
const Post = require('../models/post.model');
const uploadFile = require("../middlewares/upload.middleware");

const postController = {}

/**
 * @api api/post/create
 * @method POST
 * @description create post by userId
 */
postController.createOne = async (req, res, next) => {
    const description = req.body.description;
    console.log('body', req.body); 
    console.log('descr', description); 
    if(!description && !req.file){
        return res
            .status(400)
            .json({
                success: false,
                message: 'Description or image can not empty'
            })
    }

    try {
        await uploadFile(req, res);
        console.log('file', req.file);
        const path = req.file.path || '';
        const newPost = new Post({
            description,
            image: path,
            user: res.locals.userId
        });
        await newPost.save();
        
        return res
            .status(200)
            .json({
                success: true,
                message: 'Post is saved'
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
} 

/**
 * @api api/post/
 * @method GET
 * @description get all posts by userId
 */
postController.getAll = async (req, res, next) => {
    try {
        const posts = await Post.find({user: res.locals.userId});

        return res
            .status(200)
            .json({
                success: true,
                message: 'Get post successfully',
                posts: posts
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

/**
 * @api api/post/:id
 * @method GET
 * @description get one post by userId and post id (_id)
 */
 postController.getOne = async (req, res, next) => {
    try {
        // console.log('id', req.params.id)
        const post = await Post.findOne({
            user: res.locals.userId,
            _id: req.params.id
        });

        return res
            .status(200)
            .json({
                success: true,
                message: 'Get post successfully',
                post: post
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

/**
 * @api api/post/:id
 * @method PUT
 * @description update one post by userId and post id (_id)
 */
 postController.updateOne = async (req, res, next) => {
    try {
        const dataUpdate = req.body;
        const post = await Post.findOneAndUpdate(
            { user: res.locals.userId, _id: req.params.id }, 
            dataUpdate,
            { new: true }
        );

        return res
            .status(200)
            .json({
                success: true,
                message: 'Post is updated',
                post: post
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

/**
 * @api api/post/:id
 * @method DELETE
 * @description delete one post by userId and post id (_id)
 */
 postController.deleteOne = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(
            { user: res.locals.userId, _id: req.params.id }, 
        );

        return res
            .status(200)
            .json({
                success: true,
                message: 'Post is removed',
                post: null
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}
module.exports = postController;

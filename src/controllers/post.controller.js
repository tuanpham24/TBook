
const Post = require('../models/post.model');
// const uploadFile = require("../middlewares/upload.middleware");

/**
 * @api /api/post/create
 * @method POST 
 * @description create post
 */
const createOne = async (req, res, next) => {
    const description = req.body.description;

    if(!description){
        return res
            .status(400)
            .json({
                success: false,
                message: 'Description can not empty'
            })
    }

    try {
        const newPost = new Post({
            description,
            // image: path,
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
 * @api /api/post/
 * @method GET 
 * @description get all posts by userId
 */
const getAll = async (req, res, next) => {
    try {
        const posts = await Post.find({user: res.locals.userId});
        // console.log('post', posts)
        return res
            .status(200)
            .json({
                success: true,
                message: 'Get post successfully',
                results: posts.length,
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
const getOne = async (req, res, next) => {
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
const updateOne = async (req, res, next) => {
    try {
        const dataUpdate = req.body;
        const post = await Post.findOneAndUpdate(
            { user: res.locals.userId, _id: req.params.id }, 
            dataUpdate,
            { new: true }
        );
        if(!post){
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Post is not found'
                })
        }
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
const deleteOne = async (req, res, next) => {
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
module.exports = {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
};

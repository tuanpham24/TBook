
const Post = require('../models/post.model');

const postController = {}

/**
 * @api api/post/create
 * @method POST
 * @description create post by userId
 */
postController.createOne = async (req, res, next) => {
    const {description, image} = req.body;
    if(!description && !image){
        return res
            .status(400)
            .json({
                success: false,
                message: 'Description or image can not empty'
            })
    }

    try {
        const newPost = new Post({
            description,
            image,
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


module.exports = postController;

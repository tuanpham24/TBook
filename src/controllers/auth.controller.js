
require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { registerValidator } = require('../validations/auth.validations');
const jwt = require('jsonwebtoken');

const authController = {}

/**
 * @api /api/auth/register
 * @method POST 
 * @description user register
 */
authController.register = async (req, res, next) => {
    const {name, email, password} = req.body;

    // Check empty
    if(!name || !email || !password){
        return res
            .status(400)
            .json({
                success: false,
                message: 'Name, username, password is not valid'
            });
    }

    // validate req.body
    // const {error} = await registerValidator(req.body);
    // if(error){
    //     return res
    //         .status(422)
    //         .json({
    //             success: false,
    //             message: 'Error validate'
    //         });
    // }

    // check email existed
    const emailExisted = await User.findOne({email: email});
    if(emailExisted){
        return res
            .status(422)
            .json({
                success: false,
                message: 'Email is existed'
            });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const pwdHashed = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: pwdHashed,
            // image
        });
        await newUser.save();

        // make token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30d' }
        )

        return res.status(200).json({
            success: true,
            message: 'Register successfully',
            accessToken
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

/**
 * @api /api/auth/login
 * @method POST 
 * @description user login
 */
authController.login = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res
            .status(400)
            .json({
                success: false,
                message: 'Email or password is not valid'
            });
    }

    try {
        const user = await User.findOne({email: email});
        if(!user){
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Email or password is not correct'
                });
        }

        // check password
        const checkPwd = await bcrypt.compare(password, user.password);
        if(!checkPwd){
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Email or password is not correct'
                });
        }

        // make token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30d' }
        )

        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            accessToken
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}


module.exports = authController;

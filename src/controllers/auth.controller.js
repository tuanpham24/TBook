
require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { registerValidator } = require('../validations/auth.validations');
const jwt = require('jsonwebtoken');

/**
 * @api /api/auth/register
 * @method POST 
 * @description user register
 */
const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    // console.log(req.body);
    // check empty
    if (!name || !email || !password) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Name, username, password is not valid'
            });
    }

    // check email existed
    const emailExisted = await User.findOne({ email: email });
    if (emailExisted) {
        return res
            .status(422)
            .json({
                success: false,
                message: 'Email is existed'
            });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPwd,
        });
        await newUser.save();

        // create token
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
const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Email or password is not valid'
            });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Email or password is not correct'
                });
        }

        // check password
        const checkPwd = await bcrypt.compare(password, user.password);
        if (!checkPwd) {
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

// /**
//  * @api /api/auth/editprofile
//  * @method PUT 
//  * @description user edit profile
//  */

// const editProfile = async (req, res, next) => {
//     try {
//         const dataUpdated = req.body;
//         const userUpdated = await User.findOneAndUpdate(
//             {_id: res.locals.userId},
//             dataUpdated,
//             {new: true}
//         );
//     } catch (error) {
        
//     }
// }

module.exports = {
    register,
    login
};




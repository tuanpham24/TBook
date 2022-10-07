
const User = require('../models/user.model');

const registerValidator = (data) => {
    const rule = User.object({
        name: User.string().min(6).max(225).required(),
        email: User.string().min(6).max(225).required().email(),
        password: User.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

module.exports = {
    registerValidator
};
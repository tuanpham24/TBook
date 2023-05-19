
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    avatar: {
        type: String,
        default: 'avatar.png'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('users', UserSchema);

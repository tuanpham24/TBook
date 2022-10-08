
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    description: {
        type: String,
        max: 255
    },
    image: {
        type: String
    },
    user: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('posts', PostSchema);

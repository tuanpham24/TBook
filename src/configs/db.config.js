
require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URL, {

        });
        console.log('Connect db successfully!');
    } catch (error) {
        console.log('Connect failed!');
    }
}

module.exports = { connectDB };

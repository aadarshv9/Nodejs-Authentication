const mongoose = require('mongoose');

// creating user Schema defination
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// creating collection in mongoDB
const User = mongoose.model('User', userSchema);

module.exports = User;
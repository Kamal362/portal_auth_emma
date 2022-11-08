const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true,
        unique: true,
        maxLength: 14
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    otherName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    programme: {
        type: String,
        required: true,
        trim: true
    },
    hall: {
        type: String,
        required: true,
        trim: true
    },
    sex: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        maxLength: 13
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

}, {timestamp: true })

const UserModel = mongoose.model('Users', userschema);

module.exports = UserModel

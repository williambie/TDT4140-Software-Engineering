const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'Name required'],
        maxlength: 32,
        minlength: 2
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email'],
        unique: [true, 'Email already in use']

    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [8, 'Password too short'],
        maxlength: [32, 'Password too long']
    },
    phone: { 
        type: Number,
        required: false,
        trim: true,
        unique: [true, 'Password already in database'],
        minlength: [2, 'Number too short'],
        maxlength: [32, 'Number too long']
    },
    admin: {
        default: 0,
        type: Number
    }
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);
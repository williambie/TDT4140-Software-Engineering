const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name required'],
        maxlength: [32, 'Name too long'],
        minlength: [2, 'Name too short']
    },
    price: {
        type: Number, 
        required: [true, 'Price required'],
    },
    category: {
        type: String,
        maxlength: [32, 'Category too long'],
        minlength: [2, 'Category too short']
    },
    lenderEmail: {
        type: String,
        trim: true,
        required: [true, 'Email required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email'],

    },
    renterEmail: {
        default: null,
        type: String,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email'],

    },
    description: {
        type: String,
        minlength: [2, 'Description too short'],
        maxlength: [100, 'Description too long']
    },
    image: {
        type: String,
    },


},{timestamps: true});

module.exports = mongoose.model("Tool", toolSchema);

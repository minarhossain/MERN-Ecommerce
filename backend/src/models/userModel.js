const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImagePath } = require('../secret');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name required'],
        trim: true,
        minlength: [3, 'User name must be at least 3 characters'],
        maxlength: [20, 'User name must be at most 20 characters']
    },
    email: {
        type: String,
        required: [true, 'User email required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'User password required'],
        minlength: [6, 'User password must be at least 6 characters'],
        set: (value) => {
            return bcrypt.hashSync(value, bcrypt.genSaltSync(10))
        }
    },
    image: {
        type: String,
        default: defaultImagePath,
    },
    address: {
        type: String,
        required: [true, "User address required"],

    },
    phone: {
        type: String,
        required: [true, "User phone number required"],

    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, versionKey: false });


const User = mongoose.model('users', userSchema);
module.exports = User;
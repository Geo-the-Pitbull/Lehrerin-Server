const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'You must specify a Name'],
    },
    email: {
        type: String,
        required: [true, 'You must specify an Email Address'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'You must specify a Phone Number or Cellphone Contact'],
    },
    password: {
        type: String,
        required: [true, 'You must specify a strong password'],
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User
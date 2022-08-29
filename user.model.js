const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    password2: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: false,
    },
     phoneNumber: {
        type: String,
        required: true,
    },
    shopName:{
        type:String,
        required:false,
    },
    shopNumber: {
        type: String,
        required: false,
    },
    shopEmail: {
        type: String,
        required: false,
    },
    houseNo: {
        type: String,
        required: true,
    },
    streetName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    landMark: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userType: {
        type: String,
        enum : ['user','admin','shopAdmin','owner'],
        default: 'user'
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
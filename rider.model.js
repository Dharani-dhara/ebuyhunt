const mongoose = require('mongoose');


const riderSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    img:
    {
       data: Buffer,
        contentType: String,
    },
    // Status: {
    //     type: String,
    //     enum: ['request', 'accept', 'reject'],
    //     default: 'request'
    // },
    
    path:[{
        type:String,
    }],
    start:{
        lang:{
            type:String,
           
        },
        lat:{
            type:String,
           
        },
    },
    end:{
        lang:{
            type:String,
            
        },
        lat:{
            type:String,
            
        },
    },
    password: {
        type: String,
        required: true,
    },
     phoneNumber: {
        type: String,
        required: true,
    },
    bikeName:{
        type:String,
        required:true,
    },
    bikeNumber: {
        type: String,
        required: true,
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
   
    
});

const Rider = mongoose.model("rider", riderSchema);

module.exports = Rider;
const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rider',
        required: true
    },
    creatorname:{
        type:String,
        required: true
    },
    ridename:{
        type:String,
        required:true
    },
    requestor: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rider',
            required: true
        },
        ridername:{
            type:String,
            required: true
        },
        ridernumber:{
            type:String,
            required: true
        },

        riderstatus: {
            type: String,
            enum: ['request', 'accept', 'reject'],
            default: 'request'
        },

    }],
    start: {
        lang: {
            type: String,

        },
        lat: {
            type: String,

        },
    },
    end: {
        lang: {
            type: String,

        },
        lat: {
            type: String,

        },
    },
rideStatus:{
    type:String,
    enum:['to start','on ride','end'],
    default:'to start'
},

});

const Ride = mongoose.model("ride", rideSchema);

module.exports = Ride;
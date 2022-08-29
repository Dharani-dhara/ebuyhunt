const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    
       ownerName : {
        type:String,
         required: true,
       },
       items: [{
        _id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product',
         required: true
      },
      name: String,
      quantity: {
         type: Number,
         required: true,
         min: 1,
         default: 1},
         price: Number,
         date: {
          type: Date
      }
       }],
      phoneNumber: {
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
    
      bill: {
          type: Number,
          required: true,
         default: 0
        }
    });
    
    const Order = mongoose.model("order", orderSchema);
    
    module.exports = Order;
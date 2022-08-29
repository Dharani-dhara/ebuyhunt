const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema(
    {
     name: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );

const productSchema = new Schema({
   
    product_name: {
        type: String,
        required: true,
    },

    product_price: {
        type: String,
        required: true,
        
    },
    product_image: {
        
        type: String,
        required: false,
        
    },
    secondary_image: {
        type: [],
        required: false,
    },
    product_description: {
        type: String,
        required: true,    
    },
    quantity:{
type:Number,
min:0,
    },
    product_isLikeMe: {
            type: [{
                user_id: {
                    type: Schema.Types.ObjectId,
                    ref:"user",
                }, 
            }],
            required: true,    
        },
        Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorys',
        required: true,
        },
        Cname:{
            type: String,
            ref: 'Categorys',
            required: true,
            },
    address:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
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
         }],
    subCategorys: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategorys',
        required: false,    
    },
   
    reviews:[reviewSchema],
    ratings:{type:Number,required:false},
    date: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;